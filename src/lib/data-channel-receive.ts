/*
Copyright © 2015 Infrared5, Inc. All rights reserved.

The accompanying code comprising examples for use solely in conjunction with Red5 Pro (the "Example Code")
is  licensed  to  you  by  Infrared5  Inc.  in  consideration  of  your  agreement  to  the  following
license terms  and  conditions.  Access,  use,  modification,  or  redistribution  of  the  accompanying
code  constitutes your acceptance of the following license terms and conditions.

Permission is hereby granted, free of charge, to you to use the Example Code and associated documentation
files (collectively, the "Software") without restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The Software shall be used solely in conjunction with Red5 Pro. Red5 Pro is licensed under a separate end
user  license  agreement  (the  "EULA"),  which  must  be  executed  with  Infrared5,  Inc.
An  example  of  the EULA can be found on our website at: https://account.red5.net/assets/LICENSE.txt.

The above copyright notice and this license shall be included in all copies or portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,  INCLUDING  BUT
NOT  LIMITED  TO  THE  WARRANTIES  OF  MERCHANTABILITY, FITNESS  FOR  A  PARTICULAR  PURPOSE  AND
NONINFRINGEMENT.   IN  NO  EVENT  SHALL INFRARED5, INC. BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN  AN  ACTION  OF  CONTRACT,  TORT  OR  OTHERWISE,  ARISING  FROM,  OUT  OF  OR  IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

export type IncomingDataChannelPayload =
  | { kind: 'json'; text: string }
  | { kind: 'binary'; buffer: ArrayBuffer; mimeType: string }

export function formatRpcInvokeReceipt(data: unknown): string {
  if (data === undefined || data === null) {
    return '(empty payload)'
  }

  if (typeof data === 'string') {
    return data
  }

  return JSON.stringify(data, null, 2)
}

export function parseIncomingDataChannelPayload(data: unknown): IncomingDataChannelPayload | null {
  if (data instanceof ArrayBuffer) {
    return { kind: 'binary', buffer: data, mimeType: inferAudioMimeType(data) }
  }

  if (ArrayBuffer.isView(data)) {
    const view = data as ArrayBufferView
    const buffer = view.buffer.slice(
      view.byteOffset,
      view.byteOffset + view.byteLength
    ) as ArrayBuffer
    return { kind: 'binary', buffer, mimeType: inferAudioMimeType(buffer) }
  }

  if (typeof data === 'string') {
    return { kind: 'json', text: data }
  }

  if (typeof data === 'object' && data !== null) {
    const record = data as Record<string, unknown>
    if (record.data !== undefined) {
      return parseIncomingDataChannelPayload(record.data)
    }
    return { kind: 'json', text: JSON.stringify(data, null, 2) }
  }

  return null
}

function inferAudioMimeType(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer.slice(0, 12))

  if (
    bytes.length >= 4 &&
    bytes[0] === 0x1a &&
    bytes[1] === 0x45 &&
    bytes[2] === 0xdf &&
    bytes[3] === 0xa3
  ) {
    return 'audio/webm'
  }

  if (bytes.length >= 3 && bytes[0] === 0x49 && bytes[1] === 0x44 && bytes[2] === 0x33) {
    return 'audio/mpeg'
  }

  if (bytes.length >= 2 && bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0) {
    return 'audio/mpeg'
  }

  return 'audio/webm'
}

export function extractDataChannelMessagePayload(event: Red5ProEvent): unknown {
  if (event.data !== undefined) {
    const record = event.data as Record<string, unknown>
    if (record.message !== undefined) {
      const message = record.message as { data: unknown }
      if (message.data !== undefined) {
        return message.data
      }
    }
    return event.data
  }

  return undefined
}

export function extractRpcInvokePayload(event: Red5ProEvent): unknown {
  return event.data ?? event
}

export function setBinaryAudioPlayback(
  audioEl: HTMLAudioElement,
  buffer: ArrayBuffer,
  mimeType: string
): string {
  const blob = new Blob([buffer], { type: mimeType })
  const url = URL.createObjectURL(blob)
  audioEl.src = url
  audioEl.classList.remove('is-hidden')
  return url
}

export function formatReceiptLine(text: string): string {
  const timestamp = new Date().toLocaleTimeString()
  return `[${timestamp}] ${text}`
}
