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

export type VideoBandwidthOption = '300' | '500' | '750' | '1500' | 'unlimited'
export type VideoScaleOption = '8' | '4' | '2' | '1'

const VIDEO_BANDWIDTH_KBPS: Record<Exclude<VideoBandwidthOption, 'unlimited'>, number> = {
  '300': 300,
  '500': 500,
  '750': 750,
  '1500': 1500,
}

const VIDEO_SCALE_FACTOR: Record<VideoScaleOption, number> = {
  '8': 8,
  '4': 4,
  '2': 2,
  '1': 1,
}

export interface AppliedVideoEncoding {
  maxBitrate: number | null
  scaleResolutionDownBy: number
  active: boolean | null
}

export function isVideoBandwidthOption(value: string): value is VideoBandwidthOption {
  return (
    value === '300' ||
    value === '500' ||
    value === '750' ||
    value === '1500' ||
    value === 'unlimited'
  )
}

export function isVideoScaleOption(value: string): value is VideoScaleOption {
  return value === '8' || value === '4' || value === '2' || value === '1'
}

export function formatVideoBandwidthLabel(option: VideoBandwidthOption): string {
  if (option === 'unlimited') return 'Unlimited'
  return `${option} kbps`
}

export function formatVideoScaleLabel(option: VideoScaleOption): string {
  switch (option) {
    case '8':
      return '1/8'
    case '4':
      return '1/4'
    case '2':
      return '1/2'
    default:
      return 'Original'
  }
}

export function findVideoSender(peerConnection: RTCPeerConnection): RTCRtpSender | undefined {
  return peerConnection.getSenders().find((sender) => sender.track?.kind === 'video')
}

export async function applyLiveVideoEncoding(options: {
  peerConnection: RTCPeerConnection
  bandwidth: VideoBandwidthOption
  scale: VideoScaleOption
  setActiveOnMute: boolean
  videoMuted: boolean
}): Promise<AppliedVideoEncoding> {
  const sender = findVideoSender(options.peerConnection)
  if (!sender) {
    throw new Error('No video sender found on peer connection.')
  }

  const params = sender.getParameters()
  if (!params.encodings || params.encodings.length === 0) {
    params.encodings = [{}]
  }

  const encoding = params.encodings[0]

  if (options.bandwidth === 'unlimited') {
    delete encoding.maxBitrate
  } else {
    encoding.maxBitrate = VIDEO_BANDWIDTH_KBPS[options.bandwidth] * 1000
  }

  encoding.scaleResolutionDownBy = VIDEO_SCALE_FACTOR[options.scale]

  if (options.setActiveOnMute) {
    encoding.active = !options.videoMuted
  }

  await sender.setParameters(params)

  return {
    maxBitrate: typeof encoding.maxBitrate === 'number' ? encoding.maxBitrate : null,
    scaleResolutionDownBy: encoding.scaleResolutionDownBy ?? VIDEO_SCALE_FACTOR[options.scale],
    active: options.setActiveOnMute ? (encoding.active ?? !options.videoMuted) : null,
  }
}

export function formatAppliedVideoEncodingSummary(applied: AppliedVideoEncoding): string {
  const bandwidth =
    applied.maxBitrate === null ? 'Unlimited' : `${Math.round(applied.maxBitrate / 1000)} kbps`
  const scale =
    applied.scaleResolutionDownBy === 1
      ? 'Original (1.0)'
      : `scaleResolutionDownBy ${applied.scaleResolutionDownBy}`

  return `maxBitrate=${bandwidth}, ${scale}`
}
