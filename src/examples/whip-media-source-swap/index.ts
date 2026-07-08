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
  populateMediaDeviceSelect,
  readTrackDeviceId,
  swapPublisherTrack,
  type MediaTrackKind,
} from '@/lib/media-source-swap'
import { wireExampleLog } from '@/lib/example-log'
import { updateSubscriberLink } from '@/lib/example-links'

const sdk = window.red5prosdk
sdk.setLogLevel('debug')

let settings = loadSettings()
applyTheme(settings.theme)

const SUBSCRIBER_EXAMPLE_PATH = '../whep-basic/index.html'

let publisher: WHIPClient | null = null
let publishConstraints: MediaStreamConstraints | null = null
let swapInProgress = false

const publishBtn = document.getElementById('publish-btn') as HTMLButtonElement
const unpublishBtn = document.getElementById('unpublish-btn') as HTMLButtonElement
const publishStatusEl = document.getElementById('publish-status') as HTMLSpanElement
const publisherStatsEl = document.getElementById('publisher-stats') as R5PublisherStatsElement
const connectionInfoEl = document.getElementById('connection-info') as HTMLParagraphElement
const publishSettingsEl = document.getElementById('publish-settings') as R5PublishSettingsElement
const publishModeEl = document.getElementById('publish-mode') as R5PublishModeElement
const publishConfigSectionEl = document.getElementById('publish-config-section') as HTMLElement
const mediaSwapSectionEl = document.getElementById('media-swap-section') as HTMLElement
const swapVideoFieldEl = document.getElementById('swap-video-field') as HTMLLabelElement
const swapAudioFieldEl = document.getElementById('swap-audio-field') as HTMLLabelElement
const swapVideoSelectEl = document.getElementById('swap-video-select') as HTMLSelectElement
const swapAudioSelectEl = document.getElementById('swap-audio-select') as HTMLSelectElement
const mediaSwapStatusEl = document.getElementById('media-swap-status') as HTMLParagraphElement
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

function setMediaSwapStatus(message: string, isError = false): void {
  mediaSwapStatusEl.textContent = message
  mediaSwapStatusEl.classList.toggle('media-swap-section__status--error', isError)
}

function syncPublishConfigSection(visible: boolean): void {
  publishSettingsEl.enabled = visible
  publishModeEl.enabled = visible
  publishConfigSectionEl.classList.toggle('is-hidden', !visible)
}

function syncMediaSwapSection(visible: boolean): void {
  mediaSwapSectionEl.classList.toggle('is-hidden', !visible)
}

function syncMediaSwapControls(enabled: boolean): void {
  swapVideoSelectEl.disabled =
    !enabled || swapInProgress || !publishSettingsEl.getMediaConfig().videoEnabled
  swapAudioSelectEl.disabled =
    !enabled || swapInProgress || !publishSettingsEl.getMediaConfig().audioEnabled
}

function updateConnectionInfo(): void {
  if (!settings.host || !settings.streamName) {
    connectionInfoEl.textContent = 'Configure host and stream name in Settings'
    return
  }
  connectionInfoEl.textContent = resolveEndpointFromSettings(settings, 'whip')
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

async function refreshMediaSwapDeviceLists(): Promise<void> {
  const stream = publisher?.getMediaStream()
  const videoTrack = stream?.getVideoTracks()[0]
  const audioTrack = stream?.getAudioTracks()[0]
  const { videoEnabled, audioEnabled } = publishSettingsEl.getMediaConfig()

  swapVideoFieldEl.classList.toggle('is-hidden', !videoEnabled)
  swapAudioFieldEl.classList.toggle('is-hidden', !audioEnabled)

  if (videoEnabled) {
    await populateMediaDeviceSelect(swapVideoSelectEl, 'videoinput', readTrackDeviceId(videoTrack))
  }

  if (audioEnabled) {
    await populateMediaDeviceSelect(swapAudioSelectEl, 'audioinput', readTrackDeviceId(audioTrack))
  }

  syncMediaSwapControls(true)
}

async function showMediaSwapSection(): Promise<void> {
  syncPublishConfigSection(false)
  syncMediaSwapSection(true)
  setMediaSwapStatus('')
  await refreshMediaSwapDeviceLists()
}

function hideMediaSwapSection(): void {
  syncMediaSwapSection(false)
  syncPublishConfigSection(true)
  syncMediaSwapControls(false)
  setMediaSwapStatus('')
  publishConstraints = null
}

async function handleMediaDeviceSwap(kind: MediaTrackKind, deviceId: string): Promise<void> {
  if (!publisher || !publishConstraints || swapInProgress) return

  const previousDeviceId = readTrackDeviceId(
    kind === 'video'
      ? publisher.getMediaStream()?.getVideoTracks()[0]
      : publisher.getMediaStream()?.getAudioTracks()[0]
  )
  if (deviceId === previousDeviceId) return

  swapInProgress = true
  syncMediaSwapControls(true)
  setMediaSwapStatus(`Swapping ${kind} source...`)

  try {
    const track = await swapPublisherTrack({
      publisher,
      kind,
      deviceId,
      baseConstraints: publishConstraints,
      previewElement: publisherVideoEl,
    })
    const appliedSettings = track.getSettings()
    const deviceLabel =
      (kind === 'video' ? swapVideoSelectEl : swapAudioSelectEl).selectedOptions[0]?.textContent ??
      appliedSettings.deviceId ??
      'default'
    log(`${kind === 'video' ? 'Video' : 'Audio'} source swapped to ${deviceLabel}.`, 'success')
    setMediaSwapStatus(`${kind === 'video' ? 'Camera' : 'Microphone'} source updated.`)
  } catch (error) {
    setMediaSwapStatus(`Unable to swap ${kind} source: ${String(error)}`, true)
    log(`Media source swap failed (${kind}): ${String(error)}`, 'error')
    await refreshMediaSwapDeviceLists()
  } finally {
    swapInProgress = false
    syncMediaSwapControls(true)
  }
}

function onPublisherEvent(event: Red5ProEvent): void {
  const { type } = event
  if (type === 'Publish.Start') {
    setPublisherStatus('Publishing', 'connected')
    publishBtn.disabled = true
    unpublishBtn.disabled = false
    void showMediaSwapSection()
  } else if (type === 'Publish.Available') {
    refreshSubscriberLink()
    openSubscriberLinkEl.disabled = false
  } else if (publisherFailureEvents.includes(type)) {
    setPublisherStatus('Publish Error', 'error')
    publishBtn.disabled = false
    unpublishBtn.disabled = true
    hideMediaSwapSection()
  } else if (type === 'Unpublish.Success') {
    setPublisherStatus('Publisher Idle', 'idle')
    publishBtn.disabled = false
    unpublishBtn.disabled = true
    hideMediaSwapSection()
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
  syncMediaSwapSection(false)
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

    publishConstraints = publishSettingsEl.getRequestedConstraints()
    if (!publishConstraints) {
      throw new Error('Unable to read publish constraints from Publish Settings.')
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
    hideMediaSwapSection()
    publisher = null
    log(`Publish failed: ${String(error)}`, 'error')
  }
}

async function stopPublish(): Promise<void> {
  if (!publisher) return

  unpublishBtn.disabled = true
  syncMediaSwapControls(false)
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
    hideMediaSwapSection()
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

swapVideoSelectEl.addEventListener('change', () => {
  void handleMediaDeviceSwap('video', swapVideoSelectEl.value)
})

swapAudioSelectEl.addEventListener('change', () => {
  void handleMediaDeviceSwap('audio', swapAudioSelectEl.value)
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
updateConnectionInfo()
log('WHIP Media Source Swap loaded. Configure publish settings, then start publishing.')
