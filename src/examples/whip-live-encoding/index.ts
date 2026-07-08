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

import '@/components/r5-header'
import '@/components/r5-publish-settings'
import '@/components/r5-publish-mode'
import '@/components/r5-publisher-stats'
import '@/components/r5-subscriber-link'
import type { R5PublishSettingsElement } from '@/components/r5-publish-settings'
import type { R5PublisherStatsElement } from '@/components/r5-publisher-stats'
import type { R5PublishModeElement, StreamMode } from '@/components/r5-publish-mode'
import type { R5SubscriberLinkElement } from '@/components/r5-subscriber-link'
import {
  applyTheme,
  loadSettings,
  resolveEndpointFromSettings,
  resolveConnectionParamsFromSettings,
  resolveStatisticsConfigurationFromSettings,
  resolveRtcConfigurationFromSettings,
  type Settings,
} from '@/settings'
import {
  applyLiveVideoEncoding,
  formatAppliedVideoEncodingSummary,
  formatVideoBandwidthLabel,
  formatVideoScaleLabel,
  isVideoBandwidthOption,
  isVideoScaleOption,
  type VideoBandwidthOption,
  type VideoScaleOption,
} from '@/lib/live-video-encoding'
import { wireExampleLog } from '@/lib/example-log'
import { updateSubscriberLink } from '@/lib/example-links'

const sdk = window.red5prosdk
sdk.setLogLevel('debug')

let settings = loadSettings()
applyTheme(settings.theme)

const SUBSCRIBER_EXAMPLE_PATH = '../whep-mute-api/index.html'

let publisher: WHIPClient | null = null
let audioMuted = false
let videoMuted = false
let encodingApplyInProgress = false

const publishBtn = document.getElementById('publish-btn') as HTMLButtonElement
const unpublishBtn = document.getElementById('unpublish-btn') as HTMLButtonElement
const publishStatusEl = document.getElementById('publish-status') as HTMLSpanElement
const publisherStatsEl = document.getElementById('publisher-stats') as R5PublisherStatsElement
const connectionInfoEl = document.getElementById('connection-info') as HTMLParagraphElement
const publishSettingsEl = document.getElementById('publish-settings') as R5PublishSettingsElement
const publishModeEl = document.getElementById('publish-mode') as R5PublishModeElement
const publishConfigSectionEl = document.getElementById('publish-config-section') as HTMLElement
const livePublishControlsEl = document.getElementById('live-publish-controls') as HTMLElement
const liveEncodingSectionEl = document.getElementById('live-encoding-section') as HTMLElement
const muteAudioBtn = document.getElementById('mute-audio-btn') as HTMLButtonElement
const muteVideoBtn = document.getElementById('mute-video-btn') as HTMLButtonElement
const encodingBandwidthSelectEl = document.getElementById(
  'encoding-bandwidth-select'
) as HTMLSelectElement
const encodingScaleSelectEl = document.getElementById('encoding-scale-select') as HTMLSelectElement
const encodingSetActiveOnMuteInputEl = document.getElementById(
  'encoding-set-active-on-mute'
) as HTMLInputElement
const liveEncodingStatusEl = document.getElementById('live-encoding-status') as HTMLParagraphElement
const videoAudioIndicatorEl = document.getElementById('video-audio-indicator') as HTMLSpanElement
const videoVideoIndicatorEl = document.getElementById('video-video-indicator') as HTMLSpanElement
const publisherVideoEl = document.getElementById('publisher-video') as HTMLVideoElement
const openSubscriberLinkEl = document.getElementById(
  'open-subscriber-link'
) as R5SubscriberLinkElement
const { log } = wireExampleLog()

const publisherFailureEvents = ['Publish.Fail', 'Connect.Failure', 'Publish.InvalidName']

function setPublisherStatus(
  text: string,
  state: 'idle' | 'connecting' | 'connected' | 'error' | 'unknown'
): void {
  publishStatusEl.textContent = text
  if (state !== 'unknown') {
    publishStatusEl.className = `status status--${state}`
  }
}

function setLiveEncodingStatus(message: string, isError = false): void {
  liveEncodingStatusEl.textContent = message
  liveEncodingStatusEl.classList.toggle('live-encoding-status--error', isError)
}

function readEncodingBandwidthOption(): VideoBandwidthOption {
  const value = encodingBandwidthSelectEl.value
  return isVideoBandwidthOption(value) ? value : 'unlimited'
}

function readEncodingScaleOption(): VideoScaleOption {
  const value = encodingScaleSelectEl.value
  return isVideoScaleOption(value) ? value : '1'
}

function updateConnectionInfo(): void {
  if (!settings.host || !settings.streamName) {
    connectionInfoEl.textContent = 'Configure host and stream name in Settings'
    return
  }
  connectionInfoEl.textContent = resolveEndpointFromSettings(settings, 'whip')
}

function syncPublishConfigSection(visible: boolean): void {
  publishSettingsEl.enabled = visible
  publishModeEl.enabled = visible
  publishConfigSectionEl.classList.toggle('is-hidden', !visible)
}

function syncLivePublishControlsSection(visible: boolean): void {
  livePublishControlsEl.classList.toggle('is-hidden', !visible)
}

function updateMuteButtonState(button: HTMLButtonElement, muted: boolean, label: string): void {
  button.textContent = muted ? `Unmute ${label}` : `Mute ${label}`
  button.classList.toggle('is-muted', muted)
}

function syncLiveControls(): void {
  const { videoEnabled, audioEnabled } = publishSettingsEl.getMediaConfig()
  const publishing = publisher !== null

  muteAudioBtn.classList.toggle('is-hidden', !audioEnabled)
  muteVideoBtn.classList.toggle('is-hidden', !videoEnabled)
  liveEncodingSectionEl.classList.toggle('is-hidden', !videoEnabled)

  updateMuteButtonState(muteAudioBtn, audioMuted, 'Audio')
  updateMuteButtonState(muteVideoBtn, videoMuted, 'Video')

  muteAudioBtn.disabled = !publishing || !audioEnabled
  muteVideoBtn.disabled = !publishing || !videoEnabled

  const encodingDisabled = !publishing || !videoEnabled || encodingApplyInProgress
  encodingBandwidthSelectEl.disabled = encodingDisabled
  encodingScaleSelectEl.disabled = encodingDisabled
  encodingSetActiveOnMuteInputEl.disabled = encodingDisabled

  syncVideoOverlayIndicators()
}

function syncVideoOverlayIndicators(): void {
  const { videoEnabled, audioEnabled } = publishSettingsEl.getMediaConfig()
  const publishing = publisher !== null

  videoAudioIndicatorEl.classList.toggle('is-hidden', !audioEnabled)
  videoVideoIndicatorEl.classList.toggle('is-hidden', !videoEnabled)

  const audioActive = audioEnabled && (!publishing || !audioMuted)
  const videoActive = videoEnabled && (!publishing || !videoMuted)

  videoAudioIndicatorEl.classList.toggle('is-off', !audioActive)
  videoVideoIndicatorEl.classList.toggle('is-off', !videoActive)
  videoAudioIndicatorEl.title = audioActive ? 'Microphone on' : 'Microphone off'
  videoVideoIndicatorEl.title = videoActive ? 'Camera on' : 'Camera off'
}

function resetMuteState(): void {
  resetPreviewTrackMutes()
  audioMuted = false
  videoMuted = false
  syncLiveControls()
}

function resetEncodingControls(): void {
  encodingBandwidthSelectEl.value = 'unlimited'
  encodingScaleSelectEl.value = '1'
  encodingSetActiveOnMuteInputEl.checked = false
  setLiveEncodingStatus('')
}

function showLivePublishControlsSection(): void {
  syncPublishConfigSection(false)
  syncLivePublishControlsSection(true)
  syncLiveControls()
}

function hideLivePublishControlsSection(): void {
  syncLivePublishControlsSection(false)
  syncPublishConfigSection(true)
  resetMuteState()
  resetEncodingControls()
}

function refreshSubscriberLink(): void {
  updateSubscriberLink(openSubscriberLinkEl, SUBSCRIBER_EXAMPLE_PATH, settings)
}

function ensureCoreSettings(s: Settings): boolean {
  if (!s.host) {
    log('Missing host. Open Settings and configure host first.', 'error')
    return false
  }
  if (!s.streamName) {
    log('Missing stream name. Open Settings and configure stream name first.', 'error')
    return false
  }
  return true
}

function getPreviewMediaStream(): MediaStream | null {
  const publisherStream = publisher?.getMediaStream()
  if (publisherStream) return publisherStream

  const previewStream = publisherVideoEl.srcObject
  return previewStream instanceof MediaStream ? previewStream : null
}

function getTrackSender(
  connection: RTCPeerConnection,
  kind: 'audio' | 'video'
): RTCRtpSender | null {
  const sender = connection.getSenders().find((sender) => sender.track?.kind === kind)
  return sender ?? null
}

function syncPreviewTrackMute(kind: 'audio' | 'video', muted: boolean): void {
  const stream = getPreviewMediaStream()
  if (!stream) return

  const connection = publisher?.getPeerConnection()
  if (!connection) return

  const sender = getTrackSender(connection, kind)
  if (!sender) return

  const params = sender!.getParameters()
  if (!params.encodings) {
    params.encodings = [{}]
  }
  params.encodings[0].active = !muted

  // Setting enabled on tracks causes recovery issues. Use encodings instead.
  // const tracks = kind === 'audio' ? stream.getAudioTracks() : stream.getVideoTracks()
  // for (const track of tracks) {
  //   track.enabled = !muted
  // }
}

function resetPreviewTrackMutes(): void {
  syncPreviewTrackMute('audio', false)
  syncPreviewTrackMute('video', false)
}

async function applyLiveVideoEncodingFromControls(context: string): Promise<void> {
  if (!publisher || !publishSettingsEl.getMediaConfig().videoEnabled) return

  const peerConnection = publisher.getPeerConnection()
  if (!peerConnection) {
    setLiveEncodingStatus('Peer connection is not available.', true)
    return
  }

  const bandwidth = readEncodingBandwidthOption()
  const scale = readEncodingScaleOption()
  const setActiveOnMute = encodingSetActiveOnMuteInputEl.checked

  encodingApplyInProgress = true
  syncLiveControls()
  setLiveEncodingStatus('Applying video encoding parameters...')

  try {
    const applied = await applyLiveVideoEncoding({
      peerConnection,
      bandwidth,
      scale,
      setActiveOnMute,
      videoMuted,
    })

    const summary = formatAppliedVideoEncodingSummary(applied)
    setLiveEncodingStatus(`Applied: ${summary}`)
    log(
      `${context} video encoding updated (${formatVideoBandwidthLabel(bandwidth)}, ${formatVideoScaleLabel(scale)}): ${summary}`,
      'success'
    )
  } catch (error) {
    setLiveEncodingStatus(`Unable to apply encoding: ${String(error)}`, true)
    log(`Live video encoding update failed: ${String(error)}`, 'error')
  } finally {
    encodingApplyInProgress = false
    syncLiveControls()
  }
}

function toggleAudioMute(): void {
  if (!publisher) return

  if (audioMuted) {
    publisher.unmuteAudio()
    audioMuted = false
    log('Audio unmuted.', 'success')
  } else {
    publisher.muteAudio()
    audioMuted = true
    log('Audio muted.', 'success')
  }

  syncPreviewTrackMute('audio', audioMuted)
  syncLiveControls()
}

async function toggleVideoMute(): Promise<void> {
  if (!publisher) return

  if (videoMuted) {
    publisher.unmuteVideo()
    videoMuted = false
    log('Video unmuted.', 'success')
  } else {
    publisher.muteVideo()
    videoMuted = true
    log('Video muted.', 'success')
  }

  syncPreviewTrackMute('video', videoMuted)
  syncLiveControls()

  if (encodingSetActiveOnMuteInputEl.checked) {
    await applyLiveVideoEncodingFromControls('Mute state changed:')
  }
}

function onPublisherEvent(event: Red5ProEvent): void {
  const { type } = event
  if (type === 'Publish.Start') {
    setPublisherStatus('Publishing', 'connected')
    publishBtn.disabled = true
    unpublishBtn.disabled = false
    showLivePublishControlsSection()
  } else if (type === 'Publish.Available') {
    refreshSubscriberLink()
    openSubscriberLinkEl.disabled = false
  } else if (publisherFailureEvents.includes(type)) {
    setPublisherStatus('Publish Error', 'error')
    publishBtn.disabled = false
    unpublishBtn.disabled = true
    hideLivePublishControlsSection()
  } else if (type === 'Unpublish.Success') {
    setPublisherStatus('Publisher Idle', 'idle')
    publishBtn.disabled = false
    unpublishBtn.disabled = true
    hideLivePublishControlsSection()
    openSubscriberLinkEl.disabled = true
  } else if (type === 'WebRTC.Endpoint.Changed') {
    const endpoint = event.data?.endpoint as string | undefined
    if (!endpoint) return
    publisherStatsEl.setEndpoint(endpoint)
  } else {
    setPublisherStatus(type, 'unknown')
  }
}

async function startPublish(): Promise<void> {
  if (publisher) return
  if (!ensureCoreSettings(settings)) return

  publishBtn.disabled = true
  unpublishBtn.disabled = true
  syncPublishConfigSection(false)
  syncLivePublishControlsSection(false)
  setPublisherStatus('Connecting...', 'connecting')

  try {
    const { streamName } = settings
    const endpoint = resolveEndpointFromSettings(settings, 'whip')
    const connectionParams = resolveConnectionParamsFromSettings(settings)
    const stats = resolveStatisticsConfigurationFromSettings(settings)
    const rtcConfiguration = resolveRtcConfigurationFromSettings(settings)
    const streamMode = publishModeEl.streamMode as StreamMode
    const mediaStream = await publishSettingsEl.refreshStream()
    const { videoEnabled, audioEnabled } = publishSettingsEl.getMediaConfig()

    if (!mediaStream) {
      throw new Error('Unable to acquire media stream. Check Publish Settings.')
    }
    if (!videoEnabled && !audioEnabled) {
      throw new Error('Enable video or audio in Publish Settings.')
    }

    const { bandwidth, keyFramerate } = publishSettingsEl.getPublisherOptions()
    publisher = new sdk.WHIPClient()
    publisher.on('*', (event) => {
      log(`[WHIP] ${event.type}`)
      onPublisherEvent(event)
    })

    await publisher.initWithStream(
      {
        endpoint,
        streamName,
        clearMediaOnUnpublish: false,
        mediaElementId: 'publisher-video',
        connectionParams,
        stats: stats ?? undefined,
        rtcConfiguration,
        bandwidth,
        keyFramerate,
        streamMode,
      },
      mediaStream
    )
    await publisher.publish()

    const peerConnection = publisher.getPeerConnection()
    if (peerConnection) {
      publisherStatsEl.setPeerConnection(peerConnection)
      publisherStatsEl.start()
    }

    setPublisherStatus('Publishing', 'connected')
    unpublishBtn.disabled = false
    log(`Publishing ${settings.streamName} to ${settings.host}`, 'success')
    // @ts-expect-error - global variable for debugging
    window.r5publisher = publisher
  } catch (error) {
    setPublisherStatus('Publish Error', 'error')
    publishBtn.disabled = false
    unpublishBtn.disabled = true
    hideLivePublishControlsSection()
    publisher = null
    log(`Publish failed: ${String(error)}`, 'error')
  }
}

async function stopPublish(): Promise<void> {
  if (!publisher) return

  unpublishBtn.disabled = true
  muteAudioBtn.disabled = true
  muteVideoBtn.disabled = true
  encodingBandwidthSelectEl.disabled = true
  encodingScaleSelectEl.disabled = true
  encodingSetActiveOnMuteInputEl.disabled = true
  try {
    await publisher.unpublish()
    log('Publish stopped', 'success')
  } catch (error) {
    log(`Unpublish failed: ${String(error)}`, 'error')
  } finally {
    publisherStatsEl.stop()
    publisherStatsEl.setPeerConnection(null)
    publisher = null
    publishBtn.disabled = false
    unpublishBtn.disabled = true
    hideLivePublishControlsSection()
    setPublisherStatus('Publisher Idle', 'idle')
    openSubscriberLinkEl.disabled = true
    // @ts-expect-error - global variable for debugging
    delete window.r5publisher
  }
}

publishBtn.addEventListener('click', () => {
  void startPublish()
})

unpublishBtn.addEventListener('click', () => {
  void stopPublish()
})

muteAudioBtn.addEventListener('click', () => {
  toggleAudioMute()
})

muteVideoBtn.addEventListener('click', () => {
  void toggleVideoMute()
})

encodingBandwidthSelectEl.addEventListener('change', () => {
  void applyLiveVideoEncodingFromControls('Bandwidth changed:')
})

encodingScaleSelectEl.addEventListener('change', () => {
  void applyLiveVideoEncodingFromControls('Scale changed:')
})

encodingSetActiveOnMuteInputEl.addEventListener('change', () => {
  void applyLiveVideoEncodingFromControls('Set Active on Mute toggled:')
})

publishSettingsEl.addEventListener('publish-settings-updated', () => {
  syncVideoOverlayIndicators()
})

publishSettingsEl.addEventListener('publish-settings-error', (event) => {
  const detail = (event as CustomEvent<{ error: string; constraint?: string }>).detail
  const suffix = detail.constraint ? ` (constraint: ${detail.constraint})` : ''
  log(`Media refresh failed: ${detail.error}${suffix}`, 'error')
})

document.addEventListener('webrtc-settings-applied', (e) => {
  settings = (e as CustomEvent).detail as Settings
  refreshSubscriberLink()
  updateConnectionInfo()
  log(`Settings updated: ${resolveEndpointFromSettings(settings, 'whip')} (${settings.streamName})`)
})

window.addEventListener('pagehide', () => {
  void stopPublish()
})

window.addEventListener('beforeunload', () => {
  void stopPublish()
})

refreshSubscriberLink()
syncLivePublishControlsSection(false)
syncVideoOverlayIndicators()
updateConnectionInfo()
log('WHIP Live Encoding loaded. Configure publish settings, then start publishing.')
