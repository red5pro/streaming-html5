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
import {
  SubscriberReconnectController,
  isSubscriberReconnectEvent,
} from '@/lib/subscriber-reconnect'
import { wireExampleLog } from '@/lib/example-log'

const sdk = window.red5prosdk
sdk.setLogLevel('debug')

let settings = loadSettings()
applyTheme(settings.theme)

let subscriber: WHEPClient | null = null

const subscribeBtn = document.getElementById('subscribe-btn') as HTMLButtonElement
const unsubscribeBtn = document.getElementById('unsubscribe-btn') as HTMLButtonElement
const subscribeStatusEl = document.getElementById('subscribe-status') as HTMLSpanElement
const connectionInfoEl = document.getElementById('connection-info') as HTMLParagraphElement
const reconnectInfoEl = document.getElementById('reconnect-info') as HTMLParagraphElement
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

function updateReconnectInfo(): void {
  const attempts = reconnectController.attempts
  reconnectInfoEl.textContent =
    attempts > 0 ? `Reconnect attempts: ${attempts}` : 'Reconnect attempts: 0'
}

function updateConnectionInfo(): void {
  if (!settings.host || !settings.streamName) {
    connectionInfoEl.textContent = 'Configure host and stream name in Settings'
    return
  }
  connectionInfoEl.textContent = resolveEndpointFromSettings(settings, 'whep')
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

async function teardownSubscriber(): Promise<void> {
  if (!subscriber) return

  try {
    await subscriber.unsubscribe()
  } catch (error) {
    log(`Unsubscribe during teardown failed: ${String(error)}`, 'error')
  } finally {
    subscriberStatsEl.stop()
    subscriberStatsEl.setPeerConnection(null)
    subscriber = null
    // @ts-expect-error - global variable for debugging
    delete window.r5subscriber
  }
}

async function connectSubscriber(): Promise<boolean> {
  if (!ensureCoreSettings(settings)) return false

  try {
    const { streamName } = settings
    const endpoint = resolveEndpointFromSettings(settings, 'whep')
    const connectionParams = resolveConnectionParamsFromSettings(settings)
    const stats = resolveStatisticsConfigurationFromSettings(settings)
    const rtcConfiguration = resolveRtcConfigurationFromSettings(settings)

    subscriber = new sdk.WHEPClient()
    subscriber.on('*', (event) => {
      const { type } = event
      if (type === sdk.SubscriberEventTypes.PLAYBACK_TIME_UPDATE) return
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

    // @ts-expect-error - global variable for debugging
    window.r5subscriber = subscriber
    log(`Subscribed to ${settings.streamName} from ${settings.host}`, 'success')
    return true
  } catch (error) {
    await teardownSubscriber()
    log(`Subscribe failed: ${String(error)}`, 'error')
    return false
  }
}

const reconnectController = new SubscriberReconnectController({
  reconnect: async (): Promise<boolean> => {
    setSubscriberStatus('Reconnecting...', 'connecting')
    await teardownSubscriber()
    const ok = await connectSubscriber()
    if (ok) {
      setSubscriberStatus('Subscribed', 'connected')
      subscribeBtn.disabled = true
      unsubscribeBtn.disabled = false
    }
    return ok
  },
  onScheduled: (reason, delayMs) => {
    setSubscriberStatus(`Reconnect scheduled (${delayMs / 1000}s)`, 'connecting')
    log(`Reconnect scheduled in ${delayMs / 1000}s (${reason})`)
    updateReconnectInfo()
  },
  onAttempt: (attempt, reason) => {
    updateReconnectInfo()
    log(`Reconnect attempt ${attempt} (${reason})`)
  },
  onSuccess: (attempt) => {
    updateReconnectInfo()
    log(`Reconnect succeeded after ${attempt} attempt(s)`, 'success')
  },
  onFailure: (attempt, error) => {
    updateReconnectInfo()
    log(`Reconnect attempt ${attempt} failed: ${String(error)}`, 'error')
  },
})

function onSubscriberEvent(event: Red5ProEvent): void {
  const { type, data } = event

  if (type === sdk.SubscriberEventTypes.SUBSCRIBE_METADATA) {
    subscriberStatsEl.applySubscribeMetadata(data)
    return
  }

  if (type === 'WebRTC.Endpoint.Changed') {
    const endpoint = event.data?.endpoint as string | undefined
    if (!endpoint) return
    subscriberStatsEl.setEndpoint(endpoint)
    return
  }

  if (type === sdk.SubscriberEventTypes.SUBSCRIBE_START) {
    reconnectController.notifyConnected()
    updateReconnectInfo()
    setSubscriberStatus('Subscribed', 'connected')
    subscribeBtn.disabled = true
    unsubscribeBtn.disabled = false
    return
  }

  if (isSubscriberReconnectEvent(type, sdk.SubscriberEventTypes)) {
    if (!reconnectController.isActive) return
    setSubscriberStatus('Connection lost', 'error')
    reconnectController.scheduleReconnect(type)
    return
  }

  if (
    type === sdk.SubscriberEventTypes.SUBSCRIBE_FAIL ||
    type === sdk.SubscriberEventTypes.SUBSCRIBE_INVALID_NAME
  ) {
    if (!reconnectController.isActive) return
    setSubscriberStatus('Subscribe Error', 'error')
    reconnectController.scheduleReconnect(type)
    return
  }

  if (type !== sdk.SubscriberEventTypes.PLAYBACK_TIME_UPDATE) {
    setSubscriberStatus(type, 'unknown')
  }
}

async function startSubscribe(): Promise<void> {
  if (reconnectController.isActive && subscriber) return
  if (!ensureCoreSettings(settings)) return

  reconnectController.markActive()
  subscribeBtn.disabled = true
  unsubscribeBtn.disabled = false
  setSubscriberStatus('Connecting...', 'connecting')

  const ok = await connectSubscriber()
  if (ok) {
    reconnectController.notifyConnected()
    updateReconnectInfo()
    setSubscriberStatus('Subscribed', 'connected')
  } else {
    reconnectController.scheduleReconnect('init/subscribe failure')
  }
}

async function stopSubscribe(): Promise<void> {
  reconnectController.markStopped()
  unsubscribeBtn.disabled = true

  await teardownSubscriber()

  subscribeBtn.disabled = false
  unsubscribeBtn.disabled = true
  setSubscriberStatus('Subscriber Idle', 'idle')
  subscriberStatsEl.stop()
  updateReconnectInfo()
  log('Subscribe stopped', 'success')
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
updateReconnectInfo()
log('WHEP reconnect example loaded. Click Start Subscribe to begin.')
