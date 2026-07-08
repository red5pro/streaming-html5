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
import '@/components/r5-subscriber-stats'
import type { R5SubscriberStatsElement } from '@/components/r5-subscriber-stats'
import {
  applyTheme,
  loadSettings,
  resolveConnectionParamsFromSettings,
  resolveEndpointFromSettings,
  resolveRtcConfigurationFromSettings,
  resolveStatisticsConfigurationFromSettings,
  type Settings,
} from '@/settings'
import { wireExampleLog } from '@/lib/example-log'
import {
  applyCastLabsSubForm,
  loadCastLabsSubSettings,
  readCastLabsSubForm,
  saveCastLabsSubSettings,
  type CastLabsSubFormElements,
} from '@/lib/castlabs-configuration'
import {
  rtcDrmGetVersion,
  rtcDrmEnvironments,
  rtcDrmConfigure,
  rtcDrmOnTrack,
} from '@public/libs/castlabs/rtc-drm-transform/rtc-drm-transform.min.js'

const sdk = window.red5prosdk
sdk.setLogLevel('debug')

let settings = loadSettings()
applyTheme(settings.theme)

const DecryptMode = {
  InPlace: 0,
  ClearKey: 1,
  ProdDrm: 2,
}

let baselineSubscriber: WHEPClient | null = null
let drmSubscriber: WHEPClient | null = null

const baselineSubscribeStatusEl = document.getElementById(
  'baseline-subscribe-status'
) as HTMLSpanElement
const baselineConnectionInfoEl = document.getElementById(
  'baseline-connection-info'
) as HTMLParagraphElement
const baselineSubscriberStatsEl = document.getElementById(
  'baseline-subscriber-stats'
) as R5SubscriberStatsElement

const drmSubscribeBtn = document.getElementById('drm-subscribe-btn') as HTMLButtonElement
const drmUnsubscribeBtn = document.getElementById('drm-unsubscribe-btn') as HTMLButtonElement
const drmSubscribeStatusEl = document.getElementById('drm-subscribe-status') as HTMLSpanElement
const drmConnectionInfoEl = document.getElementById('drm-connection-info') as HTMLParagraphElement
const drmSubscriberStatsEl = document.getElementById(
  'drm-subscriber-stats'
) as R5SubscriberStatsElement

const castLabsSettingsSectionEl = document.getElementById(
  'castlabs-settings-section'
) as HTMLDivElement
const castLabsSubForm: CastLabsSubFormElements = {
  environmentSelect: document.getElementById('castlabs-environment-select') as HTMLSelectElement,
  encryptModeSelect: document.getElementById('castlabs-encrypt-mode-select') as HTMLSelectElement,
  decryptModeSelect: document.getElementById('castlabs-decrypt-mode-select') as HTMLSelectElement,
  merchantInput: document.getElementById('castlabs-merchant-input') as HTMLInputElement,
  keyIdInput: document.getElementById('castlabs-key-id-input') as HTMLInputElement,
  ivInput: document.getElementById('castlabs-iv-input') as HTMLInputElement,
}

const { log } = wireExampleLog()
const subscriberFailureEvents = ['Subscribe.Fail', 'Connect.Failure', 'Subscribe.InvalidName']
const subscriberStopEvents = ['Subscribe.Stop', 'Subscribe.Play.Unpublish']

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

function getPlatform(): string | undefined {
  try {
    const platform =
      // @ts-expect-error - userAgentData is a property of the navigator object
      window?.navigator?.userAgentData?.platform || window?.navigator?.platform
    return platform
  } catch {
    // ignore
  }
  return undefined
}

function setSubscriberStatus(
  el: HTMLSpanElement,
  text: string,
  state: 'idle' | 'connecting' | 'connected' | 'error' | 'unknown'
): void {
  el.textContent = text
  if (state !== 'unknown') {
    el.className = `status status--${state}`
  }
}

function updateConnectionInfo(): void {
  if (!settings.host || !settings.streamName) {
    baselineConnectionInfoEl.textContent = 'Configure host and stream name in Settings'
    drmConnectionInfoEl.textContent = 'Configure host and stream name in Settings'
    return
  }
  const endpoint = resolveEndpointFromSettings(settings, 'whep')
  baselineConnectionInfoEl.textContent = endpoint
  drmConnectionInfoEl.textContent = endpoint
}

function syncCastLabsSettingsSection(visible: boolean): void {
  castLabsSettingsSectionEl.classList.toggle('is-hidden', !visible)
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

function onBaselineSubscriberEvent(event: Red5ProEvent): void {
  const { type, data } = event
  if (type === 'Subscribe.Metadata') {
    baselineSubscriberStatsEl.applySubscribeMetadata(data)
    return
  }
  if (type === 'WebRTC.Endpoint.Changed') {
    const endpoint = event.data?.endpoint as string | undefined
    if (!endpoint) return
    baselineSubscriberStatsEl.setEndpoint(endpoint)
    return
  }
  if (type === 'Subscribe.Start') {
    setSubscriberStatus(baselineSubscribeStatusEl, 'Subscribed', 'connected')
  } else if (subscriberFailureEvents.includes(type)) {
    setSubscriberStatus(baselineSubscribeStatusEl, 'Subscribe Error', 'error')
  } else if (subscriberStopEvents.includes(type)) {
    setSubscriberStatus(baselineSubscribeStatusEl, 'Subscriber Idle', 'idle')
    baselineSubscriberStatsEl.stop()
  } else {
    setSubscriberStatus(baselineSubscribeStatusEl, type, 'unknown')
  }
}

function onDrmSubscriberEvent(event: Red5ProEvent): void {
  const { type, data } = event
  if (type === 'Subscribe.Metadata') {
    drmSubscriberStatsEl.applySubscribeMetadata(data)
    return
  }
  if (type === 'WebRTC.Endpoint.Changed') {
    const endpoint = event.data?.endpoint as string | undefined
    if (!endpoint) return
    drmSubscriberStatsEl.setEndpoint(endpoint)
    return
  }
  if (type === 'Subscribe.Start') {
    setSubscriberStatus(drmSubscribeStatusEl, 'Subscribed', 'connected')
    drmSubscribeBtn.disabled = true
    drmUnsubscribeBtn.disabled = false
    syncCastLabsSettingsSection(false)
  } else if (subscriberFailureEvents.includes(type)) {
    setSubscriberStatus(drmSubscribeStatusEl, 'Subscribe Error', 'error')
    drmSubscribeBtn.disabled = false
    drmUnsubscribeBtn.disabled = true
    syncCastLabsSettingsSection(true)
  } else if (subscriberStopEvents.includes(type)) {
    setSubscriberStatus(drmSubscribeStatusEl, 'Subscriber Idle', 'idle')
    drmSubscribeBtn.disabled = false
    drmUnsubscribeBtn.disabled = true
    drmSubscriberStatsEl.stop()
    syncCastLabsSettingsSection(true)
  } else {
    setSubscriberStatus(drmSubscribeStatusEl, type, 'unknown')
  }
}

async function createSubscriber(
  mediaElementId: string | undefined,
  encodedInsertableStreams: boolean = false
): Promise<WHEPClient> {
  const { streamName } = settings
  const endpoint = resolveEndpointFromSettings(settings, 'whep')
  const connectionParams = resolveConnectionParamsFromSettings(settings)
  const stats = resolveStatisticsConfigurationFromSettings(settings)
  const rtcConfiguration = resolveRtcConfigurationFromSettings(settings)

  const subscriber = new sdk.WHEPClient()
  await subscriber.init({
    endpoint,
    streamName,
    mediaElementId,
    connectionParams,
    stats: stats ?? undefined,
    rtcConfiguration: {
      ...rtcConfiguration,
      // @ts-expect-error - encodedInsertableStreams is a legacy property of RTCConfiguration
      encodedInsertableStreams,
      // audio jitter buffer settings are part of an origin trial, not sure if they make any
      // difference at all atm: https://bugs.chromium.org/p/chromium/issues/detail?id=904764
      // https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/modules/peerconnection/rtc_configuration.idl;l=51
      rtcAudioJitterBufferMaxPackets: 10,
      rtcAudioJitterBufferFastAccelerate: true,
    },
  })
  return subscriber
}

async function startBaselineSubscribe(): Promise<void> {
  if (baselineSubscriber) return
  if (!ensureCoreSettings(settings)) return

  setSubscriberStatus(baselineSubscribeStatusEl, 'Connecting...', 'connecting')
  try {
    baselineSubscriber = await createSubscriber('baseline-subscriber-video', false)
    baselineSubscriber.on('*', (event) => {
      if (event.type === 'Subscribe.Time.Update') return
      log(`[WHEP baseline] ${event.type}`)
      onBaselineSubscriberEvent(event)
    })

    await baselineSubscriber.subscribe()
    const peerConnection = baselineSubscriber.getPeerConnection()
    if (peerConnection) {
      baselineSubscriberStatsEl.setPeerConnection(peerConnection)
      baselineSubscriberStatsEl.start()
    }

    setSubscriberStatus(baselineSubscribeStatusEl, 'Subscribed', 'connected')
    log('Baseline subscriber started (expected encrypted/garbled playback).', 'success')
  } catch (error) {
    setSubscriberStatus(baselineSubscribeStatusEl, 'Subscribe Error', 'error')
    baselineSubscriber = null
    log(`Baseline subscribe failed: ${String(error)}`, 'error')
  }
}

async function startDrmSubscribe(): Promise<void> {
  if (drmSubscriber) return
  if (!ensureCoreSettings(settings)) return

  const castLabsSettings = readCastLabsSubForm(castLabsSubForm)
  saveCastLabsSubSettings(castLabsSettings)
  log(`Using castLabs DRM transform v${rtcDrmGetVersion()}`)
  log(`CastLabs settings: ${JSON.stringify(castLabsSettings)}`)

  drmSubscribeBtn.disabled = true
  drmUnsubscribeBtn.disabled = true
  setSubscriberStatus(drmSubscribeStatusEl, 'Connecting...', 'connecting')

  try {
    const mediaElement = document.getElementById('drm-subscriber-video') as HTMLVideoElement
    const encryption = castLabsSettings.encryptMode
    const keyId = Uint8ArrayFromHex(castLabsSettings.keyId)
    const iv = Uint8ArrayFromHex(castLabsSettings.iv)
    if (!keyId || !iv) {
      throw new Error('Valid CastLabs Key Id and IV (hex) are required.')
    }

    let platform = getPlatform()
    const requestProdDRM = parseInt(castLabsSettings.decryptMode, 10) === DecryptMode.ProdDrm
    let video = {
      codec: 'H264',
      encryption: encryption.toUpperCase() === 'CTR' ? 'cenc' : 'cbcs',
      keyId: requestProdDRM ? keyId : undefined,
      iv: requestProdDRM ? iv : undefined,
      robustness: platform === 'Android' ? 'HW' : undefined,
    }
    let crt = {
      profile: {
        purchase: {},
      },
      outputProtection: {
        digital: true,
        analogue: true,
        enforce: false,
      },
    }
    let drmConfig = {
      environment: rtcDrmEnvironments.Staging,
      merchant: castLabsSettings.merchant,
      videoElement: mediaElement,
      video,
      sessionId: `crtjson:${JSON.stringify(crt)}`,
      logLevel: 4,
    }

    drmConfig.videoElement.addEventListener('rtcdrmerror', (event: unknown) => {
      // @ts-expect-error - event is an unknown type
      alert(`DRM error: ${event?.detail?.message}`)
    })
    await rtcDrmConfigure(drmConfig)

    drmSubscriber = await createSubscriber(undefined, true)
    drmSubscriber.on('*', (event) => {
      const { type } = event

      if (type === 'Subscribe.Time.Update') return
      else if (type === 'WebRTC.PeerConnection.Available') {
        // Listen for ontrack event to get the decrypted stream.
        log('[WHEP drm] Attaching ontrack handler for decrypted stream.')
        const pc = drmSubscriber!.getPeerConnection()
        // @ts-expect-error - ontrack is a property of the peer connection
        pc.ontrack = (e: unknown): void => {
          rtcDrmOnTrack(e, drmConfig)
        }
      }
      log(`[WHEP drm] ${event.type}`)
      onDrmSubscriberEvent(event)
    })

    await drmSubscriber.subscribe()
    const peerConnection = drmSubscriber.getPeerConnection()
    if (peerConnection) {
      drmSubscriberStatsEl.setPeerConnection(peerConnection)
      drmSubscriberStatsEl.start()
    }

    setSubscriberStatus(drmSubscribeStatusEl, 'Subscribed', 'connected')
    drmUnsubscribeBtn.disabled = false
    log(`DRM subscriber started for ${settings.streamName}.`, 'success')
  } catch (error) {
    setSubscriberStatus(drmSubscribeStatusEl, 'Subscribe Error', 'error')
    drmSubscribeBtn.disabled = false
    drmUnsubscribeBtn.disabled = true
    syncCastLabsSettingsSection(true)
    drmSubscriber = null
    log(`DRM subscribe failed: ${String(error)}`, 'error')
  }
}

async function stopDrmSubscribe(): Promise<void> {
  if (!drmSubscriber) return
  drmUnsubscribeBtn.disabled = true
  try {
    const mediaElement = document.getElementById('drm-subscriber-video') as HTMLVideoElement
    const mediaStream = mediaElement.srcObject as MediaStream
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop()
      })
    }
    mediaElement.srcObject = null
    await drmSubscriber.unsubscribe()
    log('DRM subscribe stopped', 'success')
  } catch (error) {
    log(`DRM unsubscribe failed: ${String(error)}`, 'error')
  } finally {
    drmSubscriberStatsEl.stop()
    drmSubscriberStatsEl.setPeerConnection(null)
    drmSubscriber = null
    drmSubscribeBtn.disabled = false
    drmUnsubscribeBtn.disabled = true
    setSubscriberStatus(drmSubscribeStatusEl, 'Subscriber Idle', 'idle')
    syncCastLabsSettingsSection(true)
  }
}

async function stopAllSubscribers(): Promise<void> {
  if (baselineSubscriber) {
    try {
      await baselineSubscriber.unsubscribe()
    } catch (error) {
      log(`Baseline unsubscribe failed: ${String(error)}`, 'error')
    } finally {
      baselineSubscriberStatsEl.stop()
      baselineSubscriberStatsEl.setPeerConnection(null)
      baselineSubscriber = null
      setSubscriberStatus(baselineSubscribeStatusEl, 'Subscriber Idle', 'idle')
    }
  }
  await stopDrmSubscribe()
}

drmSubscribeBtn.addEventListener('click', () => {
  void startDrmSubscribe()
})
drmUnsubscribeBtn.addEventListener('click', () => {
  void stopDrmSubscribe()
})

document.addEventListener('webrtc-settings-applied', (e) => {
  settings = (e as CustomEvent).detail as Settings
  updateConnectionInfo()
  log(`Settings updated: ${resolveEndpointFromSettings(settings, 'whep')} (${settings.streamName})`)
})

window.addEventListener('pagehide', () => {
  void stopAllSubscribers()
})
window.addEventListener('beforeunload', () => {
  void stopAllSubscribers()
})

updateConnectionInfo()
const savedCastLabsSettings = loadCastLabsSubSettings()
if (savedCastLabsSettings) {
  applyCastLabsSubForm(castLabsSubForm, savedCastLabsSettings)
}
log('castLabs DRM Subscriber loaded. Baseline auto-subscribes; start DRM subscribe with form.')
void startBaselineSubscribe()
