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

import type {
  AppliedTrackSettings,
  MediaConstraintsSummary,
  PublisherMediaOptions,
} from '@/components/r5-publish-settings'
import { getResolutionPreset } from '@/lib/publish-presets'

function formatObject(value: unknown): string {
  return JSON.stringify(value, null, 2)
}

function formatVideoRequested(
  video: MediaTrackConstraints | boolean,
  publisherOptions: PublisherMediaOptions,
  resolutionId?: string
): string {
  if (video === false) return 'Disabled'
  if (video === true) return 'Default'

  const preset = resolutionId ? getResolutionPreset(resolutionId) : null
  const lines = [
    `Resolution: ${preset ? `${preset.width}×${preset.height} (ideal)` : 'Default'}`,
    `Device: ${typeof video.deviceId === 'object' ? JSON.stringify(video.deviceId) : 'Default'}`,
    `Publish bitrate: ${publisherOptions.bandwidth.video} kbps`,
    `Keyframe interval: ${publisherOptions.keyFramerate / 1000}s`,
  ]
  return lines.join('\n')
}

function formatAudioRequested(
  audio: MediaTrackConstraints | boolean,
  publisherOptions: PublisherMediaOptions
): string {
  if (audio === false) return 'Disabled'
  if (audio === true) return 'Default (browser-selected processing)'

  const lines = [
    `Device: ${typeof audio.deviceId === 'object' ? JSON.stringify(audio.deviceId) : 'Default'}`,
    ...(typeof audio.sampleRate === 'number' ? [`Sample rate: ${audio.sampleRate}`] : []),
    ...(typeof audio.sampleSize === 'number' ? [`Sample size: ${audio.sampleSize}`] : []),
    ...(typeof audio.channelCount === 'number' ? [`Channel count: ${audio.channelCount}`] : []),
    ...(typeof audio.echoCancellation === 'boolean'
      ? [`Echo cancellation: ${audio.echoCancellation}`]
      : []),
    ...(typeof audio.noiseSuppression === 'boolean'
      ? [`Noise suppression: ${audio.noiseSuppression}`]
      : []),
    ...(typeof audio.autoGainControl === 'boolean'
      ? [`Auto gain control: ${audio.autoGainControl}`]
      : []),
    `Publish bitrate: ${publisherOptions.bandwidth.audio} kbps`,
  ]
  return lines.join('\n')
}

export function renderMediaSummaryHtml(
  summary: MediaConstraintsSummary,
  resolutionId: string,
  streamMode: string
): string {
  const { requested, applied, publisherOptions } = summary
  const video = requested?.video ?? false
  const audio = requested?.audio ?? false

  return `
    <div class="media-summary__group">
      <h4 class="media-summary__heading">Requested</h4>
      <div class="media-summary__block">
        <div class="media-summary__label">Video</div>
        <pre class="media-summary__pre">${formatVideoRequested(video, publisherOptions, resolutionId)}</pre>
      </div>
      <div class="media-summary__block">
        <div class="media-summary__label">Audio</div>
        <pre class="media-summary__pre">${formatAudioRequested(audio, publisherOptions)}</pre>
      </div>
      <div class="media-summary__block">
        <div class="media-summary__label">Publish</div>
        <pre class="media-summary__pre">Stream mode: ${streamMode}</pre>
      </div>
    </div>
    <div class="media-summary__group">
      <h4 class="media-summary__heading">Applied (track.getSettings)</h4>
      <div class="media-summary__block">
        <div class="media-summary__label">Video</div>
        <pre class="media-summary__pre">${applied.video ? formatObject(applied.video) : 'No video track'}</pre>
      </div>
      <div class="media-summary__block">
        <div class="media-summary__label">Audio</div>
        <pre class="media-summary__pre">${applied.audio ? formatObject(applied.audio) : 'No audio track'}</pre>
      </div>
    </div>
  `
}

export function formatMediaSummaryForLog(
  summary: MediaConstraintsSummary,
  resolutionId: string,
  streamMode: string
): string[] {
  const { requested, applied, publisherOptions } = summary
  const video = requested?.video ?? false
  const audio = requested?.audio ?? false

  return [
    '--- Media summary ---',
    'Requested video:',
    formatVideoRequested(video, publisherOptions, resolutionId),
    'Requested audio:',
    formatAudioRequested(audio, publisherOptions),
    `Stream mode: ${streamMode}`,
    'Applied video:',
    applied.video ? formatObject(applied.video) : 'No video track',
    'Applied audio:',
    applied.audio ? formatObject(applied.audio) : 'No audio track',
  ]
}

export type { AppliedTrackSettings, MediaConstraintsSummary }
