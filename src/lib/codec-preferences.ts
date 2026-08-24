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

export type CodecKind = 'audio' | 'video'

export function getUniqueCodecListing(codecType: CodecKind): string[] {
  const { PublishVideoEncoder, PublishAudioEncoder } = window.red5prosdk
  const encoder = codecType === 'video' ? PublishVideoEncoder : PublishAudioEncoder

  if (!RTCRtpSender?.getCapabilities) {
    return []
  }

  const capabilities = RTCRtpSender.getCapabilities(codecType)
  if (!capabilities) {
    return []
  }

  let codecs = capabilities.codecs
    .map((codec) => {
      const match = codec.mimeType.match(new RegExp(`${codecType}/(.*)`, 'i'))
      return match?.[1]?.toUpperCase() ?? null
    })
    .filter((codec): codec is string => codec !== null)

  codecs = codecs.filter((codec) => codec in encoder)

  return [...new Set(codecs)].sort()
}

export function populateCodecSelect(select: HTMLSelectElement, codecs: string[]): void {
  select.innerHTML = '<option value="default">Default</option>'
  for (const codec of codecs) {
    const option = document.createElement('option')
    option.value = codec
    option.textContent = codec
    select.appendChild(option)
  }
}

export function resolvePublishVideoEncoding(
  value: string
): (typeof window.red5prosdk.PublishVideoEncoder)[keyof typeof window.red5prosdk.PublishVideoEncoder] | undefined {
  if (value === 'default') return undefined
  const { PublishVideoEncoder } = window.red5prosdk
  return PublishVideoEncoder[value as keyof typeof PublishVideoEncoder]
}

export function resolvePublishAudioEncoding(
  value: string
): (typeof window.red5prosdk.PublishAudioEncoder)[keyof typeof window.red5prosdk.PublishAudioEncoder] | undefined {
  if (value === 'default') return undefined
  const { PublishAudioEncoder } = window.red5prosdk
  return PublishAudioEncoder[value as keyof typeof PublishAudioEncoder]
}

export function getUniquePlaybackCodecListing(codecType: CodecKind): string[] {
  const { PlaybackVideoEncoder, PlaybackAudioEncoder } = window.red5prosdk
  const encoder = codecType === 'video' ? PlaybackVideoEncoder : PlaybackAudioEncoder

  if (!RTCRtpReceiver?.getCapabilities) {
    return []
  }

  const capabilities = RTCRtpReceiver.getCapabilities(codecType)
  if (!capabilities) {
    return []
  }

  let codecs = capabilities.codecs
    .map((codec) => {
      const match = codec.mimeType.match(new RegExp(`${codecType}/(.*)`, 'i'))
      return match?.[1]?.toUpperCase() ?? null
    })
    .filter((codec): codec is string => codec !== null)

  codecs = codecs.filter((codec) => codec in encoder && codec !== 'NONE')

  return [...new Set(codecs)].sort()
}

export function resolveSubscribeVideoEncoding(
  value: string
): (typeof window.red5prosdk.PlaybackVideoEncoder)[keyof typeof window.red5prosdk.PlaybackVideoEncoder] | undefined {
  if (value === 'default') return undefined
  const { PlaybackVideoEncoder } = window.red5prosdk
  return PlaybackVideoEncoder[value as keyof typeof PlaybackVideoEncoder]
}

export function resolveSubscribeAudioEncoding(
  value: string
): (typeof window.red5prosdk.PlaybackAudioEncoder)[keyof typeof window.red5prosdk.PlaybackAudioEncoder] | undefined {
  if (value === 'default') return undefined
  const { PlaybackAudioEncoder } = window.red5prosdk
  return PlaybackAudioEncoder[value as keyof typeof PlaybackAudioEncoder]
}
