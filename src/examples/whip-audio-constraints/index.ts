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
import { formatMediaSummaryForLog, renderMediaSummaryHtml } from '@/lib/media-summary'
import { wireExampleLog } from '@/lib/example-log'
import { updateSubscriberLink } from '@/lib/example-links'

const sdk = window.red5prosdk
sdk.setLogLevel('debug')

let settings = loadSettings()
applyTheme(settings.theme)

const SUBSCRIBER_EXAMPLE_PATH = '../whep-basic/index.html'

let publisher: WHIPClient | null = null

const publishBtn = document.getElementById('publish-btn') as HTMLButtonElement
const unpublishBtn = document.getElementById('unpublish-btn') as HTMLButtonElement
const publishStatusEl = document.getElementById('publish-status') as HTMLSpanElement
const publisherStatsEl = document.getElementById('publisher-stats') as R5PublisherStatsElement
const publishSettingsEl = document.getElementById('publish-settings') as R5PublishSettingsElement
const connectionInfoEl = document.getElementById('connection-info') as HTMLParagraphElement
const publishModeEl = document.getElementById('publish-mode') as R5PublishModeElement
const publishConfigSectionEl = document.getElementById('publish-config-section') as HTMLElement
const mediaSummaryEl = document.getElementById('media-summary') as HTMLDivElement
const mediaCapabilitiesVideoEl = document.getElementById(
  'media-capabilities-video'
) as HTMLPreElement
const mediaCapabilitiesAudioEl = document.getElementById(
  'media-capabilities-audio'
) as HTMLPreElement
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

function getResolutionId(): string {
  return publishSettingsEl.getSelectedResolutionId()
}

function formatTrackCapabilities(track: MediaStreamTrack | undefined): string {
  if (!track) {
    return 'No track'
  }
  const withCapabilities = track as MediaStreamTrack & {
    getCapabilities?: () => MediaTrackCapabilities
  }
  if (typeof withCapabilities.getCapabilities !== 'function') {
    return 'getCapabilities() not supported in this browser'
  }
  try {
    return JSON.stringify(withCapabilities.getCapabilities(), null, 2)
  } catch (error) {
    return `Unable to read capabilities: ${String(error)}`
  }
}

function updateTrackCapabilitiesSummary(): void {
  const stream = publishSettingsEl.getStream()
  const videoTrack = stream?.getVideoTracks()?.[0]
  const audioTrack = stream?.getAudioTracks()?.[0]
  mediaCapabilitiesVideoEl.textContent = formatTrackCapabilities(videoTrack)
  mediaCapabilitiesAudioEl.textContent = formatTrackCapabilities(audioTrack)
}

function updateMediaSummary(): void {
  const summary = publishSettingsEl.getConstraintsSummary()
  mediaSummaryEl.innerHTML = renderMediaSummaryHtml(
    summary,
    getResolutionId(),
    publishModeEl.streamMode
  )
  updateTrackCapabilitiesSummary()
}

function logMediaSummary(context: string): void {
  const summary = publishSettingsEl.getConstraintsSummary()
  for (const line of formatMediaSummaryForLog(
    summary,
    getResolutionId(),
    publishModeEl.streamMode
  )) {
    log(`${context} ${line}`)
  }
}

function syncPublishConfigSection(visible: boolean): void {
  publishSettingsEl.enabled = visible
  publishModeEl.enabled = visible
  publishConfigSectionEl.classList.toggle('is-hidden', !visible)
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

function onPublisherEvent(event: Red5ProEvent): void {
  const { type } = event
  if (type === 'Publish.Start') {
    setPublisherStatus('Publishing', 'connected')
    publishBtn.disabled = true
    unpublishBtn.disabled = false
    syncPublishConfigSection(false)
  } else if (type === 'Publish.Available') {
    refreshSubscriberLink()
    openSubscriberLinkEl.disabled = false
  } else if (publisherFailureEvents.includes(type)) {
    setPublisherStatus('Publish Error', 'error')
    publishBtn.disabled = false
    unpublishBtn.disabled = true
    syncPublishConfigSection(true)
  } else if (type === 'Unpublish.Success') {
    setPublisherStatus('Publisher Idle', 'idle')
    publishBtn.disabled = false
    unpublishBtn.disabled = true
    syncPublishConfigSection(true)
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
    logMediaSummary('Publishing with settings.')
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
    syncPublishConfigSection(false)
    updateMediaSummary()
    log(`Publishing ${settings.streamName} to ${settings.host}`, 'success')
    // @ts-expect-error - global variable for debugging
    window.r5publisher = publisher
  } catch (error) {
    setPublisherStatus('Publish Error', 'error')
    publishBtn.disabled = false
    unpublishBtn.disabled = true
    syncPublishConfigSection(true)
    publisher = null
    log(`Publish failed: ${String(error)}`, 'error')
  }
}

async function stopPublish(): Promise<void> {
  if (!publisher) return

  unpublishBtn.disabled = true
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
    syncPublishConfigSection(true)
    setPublisherStatus('Publisher Idle', 'idle')
    openSubscriberLinkEl.disabled = true
    updateMediaSummary()
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

publishSettingsEl.addEventListener('publish-settings-updated', () => {
  updateMediaSummary()
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
updateMediaSummary()
log('WHIP Audio Constraints loaded. Adjust audio settings and devices, then start publishing.')
