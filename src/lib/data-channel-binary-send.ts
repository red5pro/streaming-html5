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

const RECORD_DURATION_MS = 5000
const RECORDER_TIMESLICE_MS = 1000

export interface BinaryRecordingElements {
  recordBtn: HTMLButtonElement
  recordingStatusEl: HTMLElement
  playbackPanelEl: HTMLElement
  playbackAudioEl: HTMLAudioElement
  recordAgainBtn: HTMLButtonElement
}

export interface BinaryRecordingSession {
  stop: () => void
}

function getSctpMaxMessageSize(publisher: WHIPClient): number | undefined {
  const pc = publisher.getPeerConnection()
  const sctp = pc?.sctp
  return sctp?.maxMessageSize
}

function packChunksForDataChannel(chunks: Blob[], maxMessageSize: number | undefined): Blob[] {
  if (chunks.length === 0) return []
  if (!maxMessageSize || maxMessageSize <= 0) return chunks

  const packed: Blob[] = [chunks[0]]
  let remaining = maxMessageSize - chunks[0].size

  for (let index = 1; index < chunks.length; index++) {
    const chunk = chunks[index]
    if (remaining - chunk.size <= 0) break
    packed.push(chunk)
    remaining -= chunk.size
  }

  return packed
}

export function resetBinaryRecordingUi(elements: BinaryRecordingElements): void {
  elements.recordBtn.classList.remove('is-hidden')
  elements.recordingStatusEl.classList.add('is-hidden')
  elements.playbackPanelEl.classList.add('is-hidden')
  elements.recordingStatusEl.textContent = ''
  elements.playbackAudioEl.removeAttribute('src')
  elements.playbackAudioEl.load()
}

export function startBinaryRecording(
  publisher: WHIPClient,
  elements: BinaryRecordingElements,
  onLog: (message: string, level?: 'info' | 'success' | 'error') => void,
  onPlaybackUrl?: (url: string) => void,
  mediaStreamOverride?: MediaStream
): BinaryRecordingSession | null {
  const mediaStream = mediaStreamOverride ?? publisher.getMediaStream()
  const audioTrack = mediaStream?.getAudioTracks()[0]
  if (!audioTrack) {
    onLog('No audio track available for recording.', 'error')
    return null
  }

  const dataChannel = publisher.getDataChannel()
  if (!dataChannel || dataChannel.readyState !== 'open') {
    onLog('Data channel is not open. Wait for WebRTC.DataChannel.Available.', 'error')
    return null
  }

  if (typeof MediaRecorder === 'undefined') {
    onLog('MediaRecorder is not supported in this browser.', 'error')
    return null
  }

  const recordStream = new MediaStream()
  recordStream.addTrack(audioTrack)

  const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
    ? 'audio/webm;codecs=opus'
    : MediaRecorder.isTypeSupported('audio/webm')
      ? 'audio/webm'
      : ''

  const recorder = new MediaRecorder(recordStream, mimeType ? { mimeType } : undefined)
  const chunks: Blob[] = []

  elements.recordBtn.classList.add('is-hidden')
  elements.playbackPanelEl.classList.add('is-hidden')
  elements.recordingStatusEl.classList.remove('is-hidden')
  elements.recordingStatusEl.textContent = 'Recording... 0s'

  let elapsedSeconds = 0
  const statusTimer = window.setInterval(() => {
    elapsedSeconds += 1
    elements.recordingStatusEl.textContent = `Recording... ${elapsedSeconds}s`
  }, 1000)

  recorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      chunks.push(event.data)
    }
  }

  recorder.onerror = () => {
    window.clearInterval(statusTimer)
    onLog('Recording failed.', 'error')
    resetBinaryRecordingUi(elements)
  }

  recorder.onstop = () => {
    window.clearInterval(statusTimer)
    void finalizeRecording(publisher, chunks, recorder.mimeType, elements, onLog, onPlaybackUrl)
  }

  recorder.start(RECORDER_TIMESLICE_MS)

  const stopTimer = window.setTimeout(() => {
    if (recorder.state === 'recording') {
      recorder.stop()
    }
  }, RECORD_DURATION_MS)

  return {
    stop: () => {
      window.clearTimeout(stopTimer)
      window.clearInterval(statusTimer)
      if (recorder.state === 'recording') {
        recorder.stop()
      }
    },
  }
}

async function finalizeRecording(
  publisher: WHIPClient,
  chunks: Blob[],
  mimeType: string,
  elements: BinaryRecordingElements,
  onLog: (message: string, level?: 'info' | 'success' | 'error') => void,
  onPlaybackUrl?: (url: string) => void
): Promise<void> {
  elements.recordingStatusEl.classList.add('is-hidden')

  if (chunks.length === 0) {
    onLog('No audio was recorded.', 'error')
    resetBinaryRecordingUi(elements)
    return
  }

  const maxMessageSize = getSctpMaxMessageSize(publisher)
  const packedChunks = packChunksForDataChannel(chunks, maxMessageSize)
  const blobType = mimeType || packedChunks[0]?.type || 'audio/webm'
  const blob = new Blob(packedChunks, { type: blobType })

  try {
    const buffer = await new Response(blob).arrayBuffer()
    const dataChannel = publisher.getDataChannel()
    if (!dataChannel || dataChannel.readyState !== 'open') {
      throw new Error('Data channel is not open')
    }

    // await publisher.getMessageTransport()?.sendData?.(buffer)
    await dataChannel.send(buffer)
    onLog(`Sent binary message (${buffer.byteLength} bytes).`, 'success')

    const audioUrl = URL.createObjectURL(blob)
    onPlaybackUrl?.(audioUrl)
    elements.playbackAudioEl.src = audioUrl
    elements.playbackPanelEl.classList.remove('is-hidden')
  } catch (error) {
    onLog(`Failed to send binary message: ${String(error)}`, 'error')
    resetBinaryRecordingUi(elements)
  }
}
