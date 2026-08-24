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

export type MediaTrackKind = 'video' | 'audio'

function mergeDeviceIntoTrackConstraint(
  base: boolean | MediaTrackConstraints | undefined,
  deviceId: string
): boolean | MediaTrackConstraints {
  if (base === false || base === undefined) {
    return deviceId ? { deviceId: { exact: deviceId } } : true
  }
  if (base === true) {
    return deviceId ? { deviceId: { exact: deviceId } } : true
  }

  const merged: MediaTrackConstraints = { ...base }
  if (deviceId) {
    merged.deviceId = { exact: deviceId }
  } else {
    delete merged.deviceId
  }
  return merged
}

export function buildDeviceSwapConstraints(
  baseConstraints: MediaStreamConstraints,
  kind: MediaTrackKind,
  deviceId: string
): MediaStreamConstraints {
  const otherKind = kind === 'video' ? 'audio' : 'video'
  return {
    [otherKind]: false,
    [kind]: mergeDeviceIntoTrackConstraint(baseConstraints[kind], deviceId),
  }
}

function findSenderForKind(
  peerConnection: RTCPeerConnection,
  kind: MediaTrackKind
): RTCRtpSender | undefined {
  return peerConnection.getSenders().find((sender) => sender.track?.kind === kind)
}

export async function swapPublisherTrack(options: {
  publisher: WHIPClient
  kind: MediaTrackKind
  deviceId: string
  baseConstraints: MediaStreamConstraints
  previewElement?: HTMLVideoElement | null
}): Promise<MediaStreamTrack> {
  const { publisher, kind, deviceId, baseConstraints, previewElement } = options
  const peerConnection = publisher.getPeerConnection()
  if (!peerConnection) {
    throw new Error('Peer connection is not available.')
  }

  const sender = findSenderForKind(peerConnection, kind)
  if (!sender) {
    throw new Error(`No ${kind} sender found on peer connection.`)
  }

  const previousTrack = sender.track ?? undefined
  if (previousTrack) {
    previousTrack.stop()
  }

  const constraints = buildDeviceSwapConstraints(baseConstraints, kind, deviceId)
  const acquired = await navigator.mediaDevices.getUserMedia(constraints)
  const newTrack = kind === 'video' ? acquired.getVideoTracks()[0] : acquired.getAudioTracks()[0]

  if (!newTrack) {
    acquired.getTracks().forEach((track) => track.stop())
    throw new Error(`Failed to acquire ${kind} track.`)
  }

  acquired.getTracks().forEach((track) => {
    if (track !== newTrack) {
      track.stop()
    }
  })

  await sender.replaceTrack(newTrack)

  const stream = publisher.getMediaStream()
  if (stream) {
    if (previousTrack) {
      stream.removeTrack(previousTrack)
    }
    stream.addTrack(newTrack)
  }

  if (stream && previewElement && kind === 'video') {
    previewElement.srcObject = stream
    void previewElement.play().catch(() => undefined)
  }

  return newTrack
}

export async function populateMediaDeviceSelect(
  select: HTMLSelectElement,
  kind: MediaDeviceKind,
  selectedDeviceId = ''
): Promise<void> {
  if (!navigator.mediaDevices?.enumerateDevices) {
    select.innerHTML = '<option value="">Device enumeration not supported</option>'
    select.disabled = true
    return
  }

  const devices = await navigator.mediaDevices.enumerateDevices()
  const inputs = devices.filter((device) => device.kind === kind)

  if (inputs.length === 0) {
    select.innerHTML = `<option value="">No ${kind === 'videoinput' ? 'cameras' : 'microphones'} found</option>`
    select.disabled = true
    return
  }

  const defaultLabel = kind === 'videoinput' ? 'Default camera' : 'Default microphone'
  select.innerHTML = [
    `<option value="">${defaultLabel}</option>`,
    ...inputs.map(
      (device, index) =>
        `<option value="${device.deviceId}">${device.label || `${kind === 'videoinput' ? 'Camera' : 'Microphone'} ${index + 1}`}</option>`
    ),
  ].join('')

  select.disabled = false
  if (selectedDeviceId && inputs.some((device) => device.deviceId === selectedDeviceId)) {
    select.value = selectedDeviceId
  }
}

export function readTrackDeviceId(track: MediaStreamTrack | undefined): string {
  if (!track) return ''
  const { deviceId } = track.getSettings()
  return typeof deviceId === 'string' ? deviceId : ''
}
