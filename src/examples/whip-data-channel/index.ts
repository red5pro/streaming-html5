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
import '@/components/r5-publisher-stats'
import '@/components/r5-publish-mode'
import '@/components/r5-subscriber-link'
import type { R5PublisherStatsElement } from '@/components/r5-publisher-stats'
import type { R5PublishModeElement, StreamMode } from '@/components/r5-publish-mode'
import type { R5SubscriberLinkElement } from '@/components/r5-subscriber-link'
import {
  applyTheme,
  loadSettings,
  resolveConnectionParamsFromSettings,
  resolveEndpointFromSettings,
  resolveStatisticsConfigurationFromSettings,
  resolveRtcConfigurationFromSettings,
  type Settings,
} from '@/settings'
import {
  readDataChannelForm,
  setDataChannelFormEnabled,
  wireDataChannelForm,
  type DataChannelFormElements,
} from '@/lib/data-channel-configuration'
import {
  resetBinaryRecordingUi,
  startBinaryRecording,
  type BinaryRecordingElements,
  type BinaryRecordingSession,
} from '@/lib/data-channel-binary-send'
import { sendJsonDataChannelMessage, sendRpcToSubscribers } from '@/lib/data-channel-messaging'
import { wireExampleLog } from '@/lib/example-log'
import { updateSubscriberLink } from '@/lib/example-links'

const sdk = window.red5prosdk
sdk.setLogLevel('debug')

let settings = loadSettings()
applyTheme(settings.theme)

const SUBSCRIBER_EXAMPLE_PATH = '../whep-data-channel/index.html'

const dataChannelForm: DataChannelFormElements = {
  nameInput: document.getElementById('dc-name-input') as HTMLInputElement,
  modeSelect: document.getElementById('dc-mode-select') as HTMLSelectElement,
  orderedInput: document.getElementById('dc-ordered-input') as HTMLInputElement,
  maxRetransmitsInput: document.getElementById('dc-max-retransmits-input') as HTMLInputElement,
  maxPacketLifeTimeInput: document.getElementById(
    'dc-max-packet-lifetime-input'
  ) as HTMLInputElement,
  modeAdvancedOptionsEl: document.getElementById('dc-mode-advanced-options') as HTMLElement,
  maxRetransmitsFieldEl: document.getElementById('dc-max-retransmits-field') as HTMLElement,
  maxPacketLifeTimeFieldEl: document.getElementById('dc-max-packet-lifetime-field') as HTMLElement,
}

const binaryRecordingElements: BinaryRecordingElements = {
  recordBtn: document.getElementById('binary-record-btn') as HTMLButtonElement,
  recordingStatusEl: document.getElementById('binary-recording-status') as HTMLElement,
  playbackPanelEl: document.getElementById('binary-playback-panel') as HTMLElement,
  playbackAudioEl: document.getElementById('binary-playback-audio') as HTMLAudioElement,
  recordAgainBtn: document.getElementById('binary-record-again-btn') as HTMLButtonElement,
}

let publisher: WHIPClient | null = null
let binaryRecordingSession: BinaryRecordingSession | null = null
let dataChannelReady = false
let playbackObjectUrl: string | null = null

const publishBtn = document.getElementById('publish-btn') as HTMLButtonElement
const unpublishBtn = document.getElementById('unpublish-btn') as HTMLButtonElement
const publishStatusEl = document.getElementById('publish-status') as HTMLSpanElement
const connectionInfoEl = document.getElementById('connection-info') as HTMLParagraphElement
const publisherStatsEl = document.getElementById('publisher-stats') as R5PublisherStatsElement
const publishModeEl = document.getElementById('publish-mode') as R5PublishModeElement
const publishConfigSectionEl = document.getElementById('publish-config-section') as HTMLElement
const publishMessagingSectionEl = document.getElementById(
  'publish-messaging-section'
) as HTMLElement
const rpcMessageFormEl = document.getElementById('rpc-message-form') as HTMLFormElement
const rpcMessageInputEl = document.getElementById('rpc-message-input') as HTMLInputElement
const rpcMessageSendBtn = document.getElementById('rpc-message-send-btn') as HTMLButtonElement
const jsonMessageFormEl = document.getElementById('json-message-form') as HTMLFormElement
const jsonMessageInputEl = document.getElementById('json-message-input') as HTMLInputElement
const jsonMessageSendBtn = document.getElementById('json-message-send-btn') as HTMLButtonElement
const openSubscriberLinkEl = document.getElementById(
  'open-subscriber-link'
) as R5SubscriberLinkElement
const { log } = wireExampleLog()

const publisherFailureEvents = ['Publish.Fail', 'Connect.Failure', 'Publish.InvalidName']
const dataChannelEvents = [
  'WebRTC.DataChannel.Available',
  'WebRTC.DataChannel.Close',
  'WebRTC.DataChannel.Error',
  'WebRTC.DataChannel.Message',
]

function setPublisherStatus(
  text: string,
  state: 'idle' | 'connecting' | 'connected' | 'error' | 'unknown'
): void {
  publishStatusEl.textContent = text
  if (state !== 'unknown') {
    publishStatusEl.className = `status status--${state}`
  }
}

function updateConnectionInfo(): void {
  if (!settings.host || !settings.streamName) {
    connectionInfoEl.textContent = 'Configure host and stream name in Settings'
    return
  }
  connectionInfoEl.textContent = resolveEndpointFromSettings(settings, 'whip')
}

function syncPublishConfigSection(visible: boolean): void {
  publishModeEl.enabled = visible
  setDataChannelFormEnabled(dataChannelForm, visible)
  publishConfigSectionEl.classList.toggle('is-hidden', !visible)
}

function syncMessagingControlsEnabled(enabled: boolean): void {
  rpcMessageInputEl.disabled = !enabled
  rpcMessageSendBtn.disabled = !enabled
  jsonMessageInputEl.disabled = !enabled
  jsonMessageSendBtn.disabled = !enabled
  binaryRecordingElements.recordBtn.disabled = !enabled || !dataChannelReady
}

function revokePlaybackObjectUrl(): void {
  if (!playbackObjectUrl) return
  URL.revokeObjectURL(playbackObjectUrl)
  playbackObjectUrl = null
}

function resetMessagingForms(): void {
  binaryRecordingSession?.stop()
  binaryRecordingSession = null
  rpcMessageInputEl.value = ''
  jsonMessageInputEl.value = ''
  revokePlaybackObjectUrl()
  resetBinaryRecordingUi(binaryRecordingElements)
}

function syncPublishMessagingSection(visible: boolean): void {
  publishMessagingSectionEl.classList.toggle('is-hidden', !visible)
  syncMessagingControlsEnabled(visible)
  if (!visible) {
    dataChannelReady = false
    resetMessagingForms()
  }
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
    syncPublishMessagingSection(true)
    if (publisher?.getDataChannel()?.readyState === 'open') {
      dataChannelReady = true
      binaryRecordingElements.recordBtn.disabled = false
    }
  } else if (type === 'WebRTC.DataChannel.Available') {
    dataChannelReady = true
    binaryRecordingElements.recordBtn.disabled = false
    log('Data channel is available for messaging.', 'success')
  } else if (type === 'Publish.Available') {
    refreshSubscriberLink()
    openSubscriberLinkEl.disabled = false
  } else if (publisherFailureEvents.includes(type)) {
    setPublisherStatus('Publish Error', 'error')
    publishBtn.disabled = false
    unpublishBtn.disabled = true
    syncPublishConfigSection(true)
    syncPublishMessagingSection(false)
  } else if (type === 'Unpublish.Success') {
    setPublisherStatus('Publisher Idle', 'idle')
    publishBtn.disabled = false
    unpublishBtn.disabled = true
    syncPublishConfigSection(true)
    syncPublishMessagingSection(false)
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
  setPublisherStatus('Connecting...', 'connecting')

  const dataChannelConfiguration = readDataChannelForm(dataChannelForm)

  try {
    const { streamName } = settings
    const endpoint = resolveEndpointFromSettings(settings, 'whip')
    const connectionParams = resolveConnectionParamsFromSettings(settings)
    const stats = resolveStatisticsConfigurationFromSettings(settings)
    const rtcConfiguration = resolveRtcConfigurationFromSettings(settings)
    const streamMode = publishModeEl.streamMode as StreamMode

    publisher = new sdk.WHIPClient()
    publisher.on('*', (event) => {
      const { type } = event
      if (type === 'Publish.Time.Update') return
      if (dataChannelEvents.includes(type)) {
        log(`[DataChannel] ${type}`, 'info')
        if (type === 'WebRTC.DataChannel.Available') {
          onPublisherEvent(event)
        }
        return
      }
      log(`[WHIP] ${event.type}`)
      onPublisherEvent(event)
    })

    log(`Data channel config: ${JSON.stringify(dataChannelConfiguration)}`)

    await publisher.init({
      endpoint,
      streamName,
      mediaElementId: 'publisher-video',
      connectionParams,
      stats: stats ?? undefined,
      rtcConfiguration,
      streamMode,
      includeDataChannel: true,
      dataChannelConfiguration,
    })
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
    syncPublishConfigSection(true)
    syncPublishMessagingSection(false)
    publisher = null
    log(`Publish failed: ${String(error)}`, 'error')
  }
}

async function stopPublish(): Promise<void> {
  if (!publisher) return

  unpublishBtn.disabled = true
  syncPublishMessagingSection(false)
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
    // @ts-expect-error - global variable for debugging
    delete window.r5publisher
  }
}

function sendRpcMessage(event: SubmitEvent): void {
  event.preventDefault()
  if (!publisher) return

  const message = rpcMessageInputEl.value
  void sendRpcToSubscribers('incomingNotification', publisher, message)
    .then(() => {
      log(`RPC message sent: ${message}`, 'success')
      rpcMessageInputEl.value = ''
    })
    .catch((error) => {
      log(`RPC send failed: ${String(error)}`, 'error')
    })
}

function sendJsonMessage(event: SubmitEvent): void {
  event.preventDefault()
  if (!publisher) return

  const message = jsonMessageInputEl.value
  void sendJsonDataChannelMessage(
    publisher,
    JSON.stringify({ message, sender_id: settings.streamName })
  )
    .then((payload) => {
      log(`JSON message sent: ${JSON.stringify(payload)}`, 'success')
      console.log('JSON message sent payload', payload)
      jsonMessageInputEl.value = ''
    })
    .catch((error) => {
      log(`JSON send failed: ${String(error)}`, 'error')
    })
}

function startBinaryMessageRecording(): void {
  if (!publisher) return

  binaryRecordingSession?.stop()
  binaryRecordingSession = startBinaryRecording(
    publisher,
    binaryRecordingElements,
    (message, level) => log(message, level ?? 'info'),
    (url) => {
      revokePlaybackObjectUrl()
      playbackObjectUrl = url
      console.log('Binary message recording URL', url)
    }
  )
}

rpcMessageFormEl.addEventListener('submit', sendRpcMessage)
jsonMessageFormEl.addEventListener('submit', sendJsonMessage)
binaryRecordingElements.recordBtn.addEventListener('click', startBinaryMessageRecording)
binaryRecordingElements.recordAgainBtn.addEventListener('click', () => {
  revokePlaybackObjectUrl()
  resetBinaryRecordingUi(binaryRecordingElements)
  startBinaryMessageRecording()
})

publishBtn.addEventListener('click', () => {
  void startPublish()
})

unpublishBtn.addEventListener('click', () => {
  void stopPublish()
})

document.addEventListener('webrtc-settings-applied', (e) => {
  settings = (e as CustomEvent).detail as Settings
  updateConnectionInfo()
  log(`Settings updated: ${resolveEndpointFromSettings(settings, 'whip')} (${settings.streamName})`)
})

window.addEventListener('pagehide', () => {
  binaryRecordingSession?.stop()
  binaryRecordingSession = null
  void stopPublish()
})

window.addEventListener('beforeunload', () => {
  binaryRecordingSession?.stop()
  binaryRecordingSession = null
  void stopPublish()
})

wireDataChannelForm(dataChannelForm)
syncPublishMessagingSection(false)
updateConnectionInfo()
refreshSubscriberLink()
log(
  'WHIP Data Channel loaded. Configure DataChannel settings and publish mode, then start publishing.'
)
