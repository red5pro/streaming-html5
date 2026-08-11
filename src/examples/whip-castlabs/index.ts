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
  applyCastLabsForm,
  loadCastLabsPubSettings,
  readCastLabsForm,
  saveCastLabsPubSettings,
  setCastLabsFormEnabled,
  type CastLabsFormElements,
} from '@/lib/castlabs-configuration'
import { wireExampleLog } from '@/lib/example-log'
import { updateSubscriberLink } from '@/lib/example-links'

const sdk = window.red5prosdk
sdk.setLogLevel('debug')

let settings = loadSettings()
applyTheme(settings.theme)

let publisher: WHIPClient | null = null

const castLabsForm: CastLabsFormElements = {
  environmentSelect: document.getElementById('castlabs-environment-select') as HTMLSelectElement,
  encryptModeSelect: document.getElementById('castlabs-encrypt-mode-select') as HTMLSelectElement,
  merchantInput: document.getElementById('castlabs-merchant-input') as HTMLInputElement,
  keyIdInput: document.getElementById('castlabs-key-id-input') as HTMLInputElement,
  keyInput: document.getElementById('castlabs-key-input') as HTMLInputElement,
  ivInput: document.getElementById('castlabs-iv-input') as HTMLInputElement,
}

const publishBtn = document.getElementById('publish-btn') as HTMLButtonElement
const unpublishBtn = document.getElementById('unpublish-btn') as HTMLButtonElement
const publishStatusEl = document.getElementById('publish-status') as HTMLSpanElement
const connectionInfoEl = document.getElementById('connection-info') as HTMLParagraphElement
const publisherStatsEl = document.getElementById('publisher-stats') as R5PublisherStatsElement
const publishSettingsEl = document.getElementById('publish-settings') as R5PublishSettingsElement
const publishModeEl = document.getElementById('publish-mode') as R5PublishModeElement
const publishConfigSectionEl = document.getElementById('publish-config-section') as HTMLElement
const castlabsSettingsSectionEl = document.getElementById(
  'castlabs-settings-section'
) as HTMLElement
const openSubscriberLinkEl = document.getElementById(
  'open-subscriber-link'
) as R5SubscriberLinkElement
const { log } = wireExampleLog()

const publisherFailureEvents = [
  'Publish.Fail',
  'Connect.Failure',
  'Publish.InvalidName',
  'Publisher.Connection.Closed',
]
const SUBSCRIBER_EXAMPLE_PATH = '../whep-castlabs/index.html'

const encryptWorker = new Worker(new URL('./encrypt-worker-wrapper.js', window.location.href), {
  name: 'encrypt worker',
})

function setPublisherStatus(
  text: string,
  state: 'idle' | 'connecting' | 'connected' | 'error' | 'unknown'
): void {
  publishStatusEl.textContent = text
  if (state !== 'unknown') {
    publishStatusEl.className = `status status--${state}`
  }
}

function syncPublishConfigSection(visible: boolean): void {
  publishSettingsEl.enabled = visible
  publishModeEl.enabled = visible
  setCastLabsFormEnabled(castLabsForm, visible)
  publishConfigSectionEl.classList.toggle('is-hidden', !visible)
  castlabsSettingsSectionEl.classList.toggle('is-hidden', !visible)
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

// function Uint8ArrayFromHex(hex: string): Uint8Array | null {
//   try {
//     if (!hex) return null
//     if (hex.length % 2 !== 0) {
//       console.error(`Malformed hex string (${hex}), odd length`)
//       return null
//     }
//     // @ts-expect-error - Uint8Array.from(m) is a Uint8Array
//     return Uint8Array.from(hex.match(/.{1,2}/g)).map((byte) => parseInt(byte, 16))
//   } catch (e) {
//     console.error(e)
//   }
//   return null
// }

const Uint8ArrayFromHex = (hex: unknown): Uint8Array | null => {
  if (!hex) return null
  // @ts-expect-error - hex is a string
  if (hex.length % 2 !== 0) {
    console.error(`Malformed hex string (${hex}), odd length`)
    return null
  }
  // @ts-expect-error - hex is a string
  return Uint8Array.from(hex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)))
}

async function initCrypto(
  videoCodec: string,
  aesMode: string,
  key: Uint8Array,
  iv: Uint8Array
): Promise<boolean> {
  encryptWorker.postMessage({
    operation: 'init',
    videoCodec,
    aesMode,
    key,
    iv,
  })
  const encryptInit = await Promise.race([
    new Promise((resolve) => {
      encryptWorker.onmessage = (event: MessageEvent): void => resolve(event.data === 'init-done')
    }),
    new Promise((resolve) => setTimeout(resolve, 15000, false)),
  ])
  return encryptInit as boolean
}

function setupSenderTransform(sender: RTCRtpSender): void {
  const operation = `encrypt-${sender.track!.kind}`
  console.log(`[castlabs] Setting up sender transform for ${operation}`)
  if (window.RTCRtpScriptTransform) {
    sender.transform = new window.RTCRtpScriptTransform(encryptWorker, {
      operation,
    })
    return
  }
  // @ts-expect-error - createEncodedStreams is only supported in Chrome/Edge
  const senderStreams = sender.createEncodedStreams()
  const { readable, writable } = senderStreams
  encryptWorker.postMessage(
    {
      operation,
      readable,
      writable,
    },
    [readable, writable]
  )
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
    setPublisherStatus('Publisher Available', 'connected')
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

  const castLabsSettings = readCastLabsForm(castLabsForm)
  saveCastLabsPubSettings(castLabsSettings)
  log(`CastLabs settings: ${JSON.stringify(castLabsSettings)}`)

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

    const aesMode = castLabsSettings.encryptMode.toUpperCase() === 'CTR' ? 'cenc' : 'cbcs'
    const key = Uint8ArrayFromHex(castLabsSettings.key)
    const iv = Uint8ArrayFromHex(castLabsSettings.iv)
    if (!key || !iv) {
      throw new Error('Valid CastLabs Key and IV (hex) are required.')
    }
    await initCrypto('H264', aesMode, key, iv)
    log(`Encryption initialized: ${aesMode}`)

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
        bandwidth,
        keyFramerate,
        streamMode,
        rtcConfiguration: {
          ...rtcConfiguration,
          // @ts-expect-error - encodedInsertableStreams is a legacy property of RTCConfiguration
          encodedInsertableStreams: true,
          // audio jitter buffer settings are part of an origin trial, not sure if they make any
          // difference at all atm: https://bugs.chromium.org/p/chromium/issues/detail?id=904764
          // https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/modules/peerconnection/rtc_configuration.idl;l=51
          rtcAudioJitterBufferMaxPackets: 10,
          rtcAudioJitterBufferFastAccelerate: true,
        },
      },
      mediaStream
    )
    await publisher.publish()

    const peerConnection = publisher.getPeerConnection()
    if (peerConnection) {
      publisherStatsEl.setPeerConnection(peerConnection)
      publisherStatsEl.start()

      const transceivers = peerConnection.getTransceivers()
      for (const tr of transceivers) {
        tr.direction = 'sendonly'
        setupSenderTransform(tr.sender)
      }
    }

    setPublisherStatus('Publishing', 'connected')
    unpublishBtn.disabled = false
    syncPublishConfigSection(false)
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

document.addEventListener('webrtc-settings-applied', (e) => {
  settings = (e as CustomEvent).detail as Settings
  const endpoint = resolveEndpointFromSettings(settings, 'whip')
  updateConnectionInfo()
  log(`Settings updated: ${endpoint} (${settings.streamName})`)
})

window.addEventListener('pagehide', () => {
  void stopPublish()
})

window.addEventListener('beforeunload', () => {
  void stopPublish()
})

refreshSubscriberLink()
updateConnectionInfo()
const savedCastLabsSettings = loadCastLabsPubSettings()
if (savedCastLabsSettings) {
  applyCastLabsForm(castLabsForm, savedCastLabsSettings)
}
log(
  'castLabs Publisher loaded. Configure CastLabs settings, publish controls, and Settings, then start publishing.'
)
