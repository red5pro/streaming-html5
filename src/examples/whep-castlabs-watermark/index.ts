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
import {
  applyCastLabsWatermarkForm,
  loadCastLabsWatermarkSettings,
  readCastLabsWatermarkForm,
  saveCastLabsWatermarkSettings,
  setCastLabsWatermarkFormEnabled,
  type CastLabsWatermarkFormElements,
  type CastLabsWatermarkSettings,
} from '@/lib/castlabs-watermark-configuration'
import { wireExampleLog } from '@/lib/example-log'
import CastlabsWatermarkService from '@/service/castlabs'

const sdk = window.red5prosdk
sdk.setLogLevel('debug')

let settings = loadSettings()
applyTheme(settings.theme)

let subscriber: WHEPClient | null = null

let subscriberVideoContainerEl = document.getElementById(
  'subscriber-video-container'
) as HTMLDivElement
const subscribeBtn = document.getElementById('subscribe-btn') as HTMLButtonElement
const unsubscribeBtn = document.getElementById('unsubscribe-btn') as HTMLButtonElement
const subscribeStatusEl = document.getElementById('subscribe-status') as HTMLSpanElement
const connectionInfoEl = document.getElementById('connection-info') as HTMLParagraphElement
const subscriberStatsEl = document.getElementById('subscriber-stats') as R5SubscriberStatsElement
const watermarkSettingsSectionEl = document.getElementById(
  'castlabs-watermark-settings-section'
) as HTMLElement

const watermarkForm: CastLabsWatermarkFormElements = {
  accessKeyIdInput: document.getElementById('castlabs-access-key-id-input') as HTMLInputElement,
  secretAccessKeyInput: document.getElementById(
    'castlabs-secret-access-key-input'
  ) as HTMLInputElement,
  organizationUrnInput: document.getElementById(
    'castlabs-organization-urn-input'
  ) as HTMLInputElement,
  userUrnInput: document.getElementById('castlabs-user-urn-input') as HTMLInputElement,
  watermarkIdInput: document.getElementById('castlabs-watermark-id-input') as HTMLInputElement,
  overlayCountInput: document.getElementById('castlabs-overlay-count-input') as HTMLInputElement,
}

const { log } = wireExampleLog()

const subscriberFailureEvents = ['Subscribe.Fail', 'Connect.Failure', 'Subscribe.InvalidName']
const subscriberStopEvents = ['Subscribe.Stop', 'Subscribe.Play.Unpublish']

function setSubscriberStatus(
  text: string,
  state: 'idle' | 'connecting' | 'connected' | 'error' | 'unknown'
): void {
  subscribeStatusEl.textContent = text
  if (state !== 'unknown') {
    subscribeStatusEl.className = `status status--${state}`
  }
}

function updateConnectionInfo(): void {
  if (!settings.host || !settings.streamName) {
    connectionInfoEl.textContent = 'Configure host and stream name in Settings'
    return
  }
  connectionInfoEl.textContent = resolveEndpointFromSettings(settings, 'whep')
}

function syncWatermarkSettingsSection(visible: boolean): void {
  setCastLabsWatermarkFormEnabled(watermarkForm, visible)
  watermarkSettingsSectionEl.classList.toggle('is-hidden', !visible)
}

function syncWatermarkLoadingState(loading: boolean): void {
  if (loading) {
    syncWatermarkSettingsSection(false)
    const loadingOverlay = document.createElement('div')
    loadingOverlay.className = 'loading-overlay'
    const spinner = document.createElement('div')
    spinner.className = 'loading-overlay__spinner'
    loadingOverlay.appendChild(spinner)
    subscriberVideoContainerEl.appendChild(loadingOverlay)
  } else {
    const loadingOverlay = subscriberVideoContainerEl.querySelector('.loading-overlay')
    if (loadingOverlay) {
      loadingOverlay.remove()
    }
  }
}

function setLoadingOverlayText(text: string, display: boolean): void {
  const loadingOverlay = subscriberVideoContainerEl.querySelector('.loading-overlay')
  const loadingOverlayContent = loadingOverlay?.querySelector('.loading-overlay__content')
  if (loadingOverlay && display) {
    const content = document.createElement('div')
    content.className = 'loading-overlay__content'
    content.textContent = text
    loadingOverlay.appendChild(content)
  } else if (loadingOverlayContent && !display) {
    loadingOverlayContent.remove()
  }
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

function addOverlay(pngData: unknown): void {
  const overlay = document.createElement('img')
  overlay.className = 'demo-img watermark-overlay'
  // @ts-expect-error - pngData is an unknown type
  overlay.src = URL.createObjectURL(new Blob([pngData], { type: 'image/png' }))
  overlay.style.opacity = '0.5'
  subscriberVideoContainerEl.prepend(overlay)
  overlay.onload = (): void => URL.revokeObjectURL(overlay.src)
}

function clearOverlays(): void {
  subscriberVideoContainerEl.querySelectorAll('.watermark-overlay').forEach((overlay) => {
    overlay.remove()
  })
  CastlabsWatermarkService.reset()
}

async function requestOverlays(watermarkSettings: CastLabsWatermarkSettings): Promise<void> {
  const { numOverlays } = watermarkSettings
  const loadingOverlay = subscriberVideoContainerEl.querySelector(
    '.loading-overlay'
  ) as HTMLDivElement | null

  try {
    clearOverlays()
    let count = 0
    const overlayDataList = await Promise.all(
      Array.from({ length: numOverlays }, async () => {
        count++
        if (loadingOverlay) {
          setLoadingOverlayText(`Requesting ${count} of ${numOverlays} overlays...`, true)
        }
        const overlayData = await CastlabsWatermarkService.getOverlays(watermarkSettings, {
          skipAuth: false,
        })
        setLoadingOverlayText('', false)
        return overlayData
      })
    )
    overlayDataList.forEach((overlayData) => addOverlay(overlayData))
  } catch (e: unknown) {
    clearOverlays()
    const message = 'Could not acquire overlays: ' + (e as Error).message
    log(message, 'error')
    alert(message)
    throw e
  }
}

function onSubscriberEvent(event: Red5ProEvent): void {
  const { type, data } = event
  if (type === 'Subscribe.Metadata') {
    subscriberStatsEl.applySubscribeMetadata(data)
    return
  }
  if (type === 'WebRTC.Endpoint.Changed') {
    const endpoint = event.data?.endpoint as string | undefined
    if (!endpoint) return
    subscriberStatsEl.setEndpoint(endpoint)
    return
  }
  if (type === 'Subscribe.Start') {
    setSubscriberStatus('Subscribed', 'connected')
    subscribeBtn.disabled = true
    unsubscribeBtn.disabled = false
    syncWatermarkSettingsSection(false)
  } else if (subscriberFailureEvents.includes(type)) {
    setSubscriberStatus('Subscribe Error', 'error')
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
    syncWatermarkSettingsSection(true)
  } else if (subscriberStopEvents.includes(type)) {
    setSubscriberStatus('Subscriber Idle', 'idle')
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
    subscriberStatsEl.stop()
    syncWatermarkSettingsSection(true)
  } else if (type !== 'Subscribe.Time.Update') {
    setSubscriberStatus(type, 'unknown')
  }
}

async function startSubscribe(): Promise<void> {
  if (subscriber) return
  if (!ensureCoreSettings(settings)) return

  const watermarkSettings = readCastLabsWatermarkForm(watermarkForm)
  saveCastLabsWatermarkSettings(watermarkSettings)
  log(`CastLabs watermark playback settings: ${JSON.stringify(watermarkSettings)}`)

  subscribeBtn.disabled = true
  unsubscribeBtn.disabled = true
  syncWatermarkSettingsSection(false)
  setSubscriberStatus('Connecting...', 'connecting')

  try {
    syncWatermarkLoadingState(true)
    await requestOverlays(watermarkSettings)
    syncWatermarkLoadingState(false)

    const { streamName } = settings
    const endpoint = resolveEndpointFromSettings(settings, 'whep')
    const connectionParams = resolveConnectionParamsFromSettings(settings)
    const stats = resolveStatisticsConfigurationFromSettings(settings)
    const rtcConfiguration = resolveRtcConfigurationFromSettings(settings)

    subscriber = new sdk.WHEPClient()
    subscriber.on('*', (event) => {
      const { type } = event
      if (type === 'Subscribe.Time.Update') return
      log(`[WHEP] ${event.type}`)
      onSubscriberEvent(event)
    })

    await subscriber.init({
      endpoint,
      streamName,
      mediaElementId: 'subscriber-video',
      connectionParams,
      stats: stats ?? undefined,
      rtcConfiguration,
    })
    await subscriber.subscribe()

    const peerConnection = subscriber.getPeerConnection()
    if (peerConnection) {
      subscriberStatsEl.setPeerConnection(peerConnection)
      subscriberStatsEl.start()
    }

    setSubscriberStatus('Subscribed', 'connected')
    unsubscribeBtn.disabled = false
    log(`Subscribed to ${settings.streamName} from ${settings.host}`, 'success')
    // @ts-expect-error - global variable for debugging
    window.r5subscriber = subscriber
  } catch (error) {
    syncWatermarkLoadingState(false)
    clearOverlays()
    setSubscriberStatus('Subscribe Error', 'error')
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
    syncWatermarkSettingsSection(true)
    subscriber = null
    log(`Subscribe failed: ${String(error)}`, 'error')
  }
}

async function stopSubscribe(): Promise<void> {
  if (!subscriber) return

  unsubscribeBtn.disabled = true
  try {
    await subscriber.unsubscribe()
    log('Subscribe stopped', 'success')
  } catch (error) {
    log(`Unsubscribe failed: ${String(error)}`, 'error')
  } finally {
    subscriberStatsEl.stop()
    subscriberStatsEl.setPeerConnection(null)
    subscriber = null
    clearOverlays()
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
    syncWatermarkSettingsSection(true)
    setSubscriberStatus('Subscriber Idle', 'idle')
    // @ts-expect-error - global variable for debugging
    delete window.r5subscriber
  }
}

subscribeBtn.addEventListener('click', () => {
  void startSubscribe()
})
unsubscribeBtn.addEventListener('click', () => {
  void stopSubscribe()
})

document.addEventListener('webrtc-settings-applied', (e) => {
  settings = (e as CustomEvent).detail as Settings
  updateConnectionInfo()
  log(`Settings updated: ${resolveEndpointFromSettings(settings, 'whep')} (${settings.streamName})`)
})

window.addEventListener('pagehide', () => {
  void stopSubscribe()
})
window.addEventListener('beforeunload', () => {
  void stopSubscribe()
})

updateConnectionInfo()
const savedWatermarkSettings = loadCastLabsWatermarkSettings()
if (savedWatermarkSettings) {
  applyCastLabsWatermarkForm(watermarkForm, savedWatermarkSettings)
}
log('castLabs Watermark Playback loaded. Configure watermark settings and start subscribe.')
