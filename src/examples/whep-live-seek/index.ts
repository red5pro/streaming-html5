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
  resolveStatisticsConfigurationFromSettings,
  resolveRtcConfigurationFromSettings,
  type Settings,
} from '@/settings'
import { wireExampleLog } from '@/lib/example-log'
import CustomControls from './custom-controls'

const sdk = window.red5prosdk
sdk.setLogLevel('debug')

let settings = loadSettings()
applyTheme(settings.theme)

type LiveSeekClientInstance = {
  on: (type: string, handler: (event: Red5ProEvent) => void) => void
  init: (config: unknown) => Promise<void>
  subscribe: () => Promise<void>
  unsubscribe: () => Promise<void>
  getPeerConnection: () => RTCPeerConnection | null
}

let subscriber: LiveSeekClientInstance | null = null

const subscribeBtn = document.getElementById('subscribe-btn') as HTMLButtonElement
const unsubscribeBtn = document.getElementById('unsubscribe-btn') as HTMLButtonElement
const subscribeStatusEl = document.getElementById('subscribe-status') as HTMLSpanElement
const connectionInfoEl = document.getElementById('connection-info') as HTMLParagraphElement
const optionalUrlInput = document.getElementById('optional-url-input') as HTMLInputElement
const useBaseUrlCheck = document.getElementById('use-base-url-check') as HTMLInputElement
const useFullUrlCheck = document.getElementById('use-full-url-check') as HTMLInputElement
const useCustomControlsCheck = document.getElementById(
  'use-custom-controls-check'
) as HTMLInputElement
const customControlsEl = document.querySelector('.custom-controls') as HTMLDivElement
const subscriberStatsEl = document.getElementById('subscriber-stats') as R5SubscriberStatsElement
const { log } = wireExampleLog()

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

function ensureCoreSettings(s: Settings): boolean {
  if (!s.useStreamManager) {
    log('Enable Stream Manager in Settings for this example.', 'error')
    return false
  }
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

function resolveLiveSeekUrlValues(): {
  baseURL: string | undefined
  fullURL: string | undefined
  useCustomControls: boolean
} | null {
  const url = optionalUrlInput.value.trim()
  const useBaseURL = useBaseUrlCheck.checked
  const useFullURL = useFullUrlCheck.checked

  if (!url) {
    log('Provide a URL value to use as baseURL or fullURL.', 'error')
    alert('Provide a URL value to use as baseURL or fullURL.')
    return null
  }

  if (!useBaseURL && !useFullURL) {
    log('Select either "Use as baseURL" or "Use as fullURL".', 'error')
    alert('Select either "Use as baseURL" or "Use as fullURL".')
    return null
  }

  return {
    baseURL: useBaseURL ? url : undefined,
    fullURL: useFullURL ? url : undefined,
    useCustomControls: useCustomControlsCheck.checked,
  }
}

function syncCustomControlsVisibility(): void {
  customControlsEl.classList.toggle('is-hidden', !useCustomControlsCheck.checked)
}

function syncLiveSeekPanelVisibility(isHidden: boolean): void {
  const liveSeekPanelEls = document.querySelectorAll(
    '.live-seek-panel'
  ) as NodeListOf<HTMLDivElement>
  liveSeekPanelEls.forEach((el) => el.classList.toggle('is-hidden', isHidden))
}

const subscriberFailureEvents = ['Subscribe.Fail', 'Connect.Failure', 'Subscribe.InvalidName']
const subscriberStopEvents = ['Subscribe.Stop', 'Subscribe.Play.Unpublish']

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
  } else if (subscriberFailureEvents.includes(type)) {
    setSubscriberStatus('Subscribe Error', 'error')
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
  } else if (subscriberStopEvents.includes(type)) {
    setSubscriberStatus('Subscriber Idle', 'idle')
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
    subscriberStatsEl.stop()
  } else {
    setSubscriberStatus(type, 'unknown')
  }
}

async function startSubscribe(): Promise<void> {
  if (subscriber) return
  if (!ensureCoreSettings(settings)) return

  const liveSeekSettings = resolveLiveSeekUrlValues()
  if (!liveSeekSettings) return

  subscribeBtn.disabled = true
  unsubscribeBtn.disabled = true
  setSubscriberStatus('Connecting...', 'connecting')
  syncLiveSeekPanelVisibility(true)

  try {
    const { streamName } = settings
    const endpoint = resolveEndpointFromSettings(settings, 'whep')
    const connectionParams = resolveConnectionParamsFromSettings(settings)
    const stats = resolveStatisticsConfigurationFromSettings(settings)
    const rtcConfiguration = resolveRtcConfigurationFromSettings(settings)

    const ctor = (sdk as unknown as { LiveSeekClient?: new () => LiveSeekClientInstance })
      .LiveSeekClient
    if (!ctor) {
      throw new Error('LiveSeekClient is not available in this SDK build.')
    }
    subscriber = new ctor()
    subscriber.on('*', (event) => {
      const { type } = event
      if (type === 'Subscribe.Time.Update') return
      log(`[LiveSeek] ${event.type}`)
      onSubscriberEvent(event)
    })

    await subscriber.init({
      endpoint,
      streamName,
      mediaElementId: 'subscriber-video',
      connectionParams,
      stats: stats ?? undefined,
      rtcConfiguration,
      liveSeek: {
        enabled: true,
        baseURL: liveSeekSettings.baseURL,
        fullURL: liveSeekSettings.fullURL,
        usePlaybackControlsUI: !liveSeekSettings.useCustomControls,
        options: { debug: true, backBufferLength: 0 },
      },
    })

    if (liveSeekSettings.useCustomControls) {
      // Create external controls between init and subscribe when requested.
      new CustomControls(subscriber)
    }

    await subscriber.subscribe()

    const peerConnection = subscriber.getPeerConnection()
    if (peerConnection) {
      subscriberStatsEl.setPeerConnection(peerConnection)
      subscriberStatsEl.start()
    }

    setSubscriberStatus('Subscribed', 'connected')
    unsubscribeBtn.disabled = false
    log(`Subscribed with LiveSeek to ${settings.streamName} from ${settings.host}`, 'success')
  } catch (error) {
    setSubscriberStatus('Subscribe Error', 'error')
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
    subscriber = null
    syncLiveSeekPanelVisibility(true)
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
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
    setSubscriberStatus('Subscriber Idle', 'idle')
    syncLiveSeekPanelVisibility(true)
  }
}

subscribeBtn.addEventListener('click', () => {
  void startSubscribe()
})
unsubscribeBtn.addEventListener('click', () => {
  void stopSubscribe()
})
useCustomControlsCheck.addEventListener('change', () => {
  syncCustomControlsVisibility()
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
syncCustomControlsVisibility()
log('Live Seek subscriber loaded. Configure URL option and start subscribe.')
