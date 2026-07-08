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

export interface VideoResolution {
  width: number
  height: number
}

export interface MediaSample {
  videoResolution: VideoResolution | null
  audioBytes: number | null
  videoBytes: number | null
  audioTimestamp: number | null
  videoTimestamp: number | null
}

function getRtpKind(stat: RTCStats): string | undefined {
  if ('kind' in stat && typeof stat.kind === 'string') return stat.kind
  if ('mediaType' in stat && typeof stat.mediaType === 'string') return stat.mediaType
  return undefined
}

function parseRtpStats(
  report: RTCStatsReport,
  type: 'inbound-rtp' | 'outbound-rtp',
  byteField: 'bytesReceived' | 'bytesSent'
): MediaSample {
  let videoResolution: VideoResolution | null = null
  let maxVideoBytes = -1
  let audioBytes: number | null = null
  let videoBytes: number | null = null
  let audioTimestamp: number | null = null
  let videoTimestamp: number | null = null

  report.forEach((stat) => {
    if (stat.type !== type) return

    const kind = getRtpKind(stat)

    if (kind === 'video') {
      const bytes = stat[byteField]
      if (typeof bytes !== 'number') return

      const width = stat.frameWidth
      const height = stat.frameHeight
      if (typeof width === 'number' && typeof height === 'number' && width > 0 && height > 0) {
        const area = width * height
        const currentArea = videoResolution ? videoResolution.width * videoResolution.height : 0
        if (area >= currentArea) {
          videoResolution = { width, height }
        }
      }

      if (bytes >= maxVideoBytes) {
        maxVideoBytes = bytes
        videoBytes = bytes
        videoTimestamp = stat.timestamp
      }
      return
    }

    if (kind === 'audio') {
      const bytes = stat[byteField]
      if (typeof bytes !== 'number') return
      audioBytes = bytes
      audioTimestamp = stat.timestamp
    }
  })

  return {
    videoResolution,
    audioBytes,
    videoBytes,
    audioTimestamp,
    videoTimestamp,
  }
}

export function parseOutboundStats(report: RTCStatsReport): MediaSample {
  return parseRtpStats(report, 'outbound-rtp', 'bytesSent')
}

export function parseInboundStats(report: RTCStatsReport): MediaSample {
  return parseRtpStats(report, 'inbound-rtp', 'bytesReceived')
}

export function computeBitrate(
  bytesNow: number,
  bytesBefore: number,
  timeNow: number,
  timeBefore: number
): number | null {
  const deltaBytes = bytesNow - bytesBefore
  const deltaMs = timeNow - timeBefore
  if (deltaMs <= 0 || deltaBytes < 0) return null
  return (deltaBytes * 8 * 1000) / deltaMs
}

export class BitrateTracker {
  private previousBytes: number | null = null
  private previousTimestamp: number | null = null
  private smoothed: number | null = null

  constructor(private readonly alpha = 0.3) {}

  update(bytes: number, timestamp: number): number | null {
    if (this.previousBytes === null || this.previousTimestamp === null) {
      this.previousBytes = bytes
      this.previousTimestamp = timestamp
      return null
    }

    const instant = computeBitrate(bytes, this.previousBytes, timestamp, this.previousTimestamp)
    this.previousBytes = bytes
    this.previousTimestamp = timestamp

    if (instant === null) return this.smoothed

    this.smoothed =
      this.smoothed === null ? instant : this.alpha * instant + (1 - this.alpha) * this.smoothed
    return this.smoothed
  }

  reset(): void {
    this.previousBytes = null
    this.previousTimestamp = null
    this.smoothed = null
  }
}

export function formatResolution(resolution: VideoResolution | null): string {
  if (!resolution) return '—'
  return `${resolution.width}×${resolution.height}`
}

export function formatBitrate(bps: number | null): string {
  if (bps === null || bps <= 0) return '—'
  if (bps >= 1_000_000) return `${(bps / 1_000_000).toFixed(1)} Mbps`
  return `${Math.round(bps / 1000)} kbps`
}

export function formatSessionDuration(elapsedMs: number): string {
  const totalSeconds = Math.max(0, Math.floor(elapsedMs / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}
