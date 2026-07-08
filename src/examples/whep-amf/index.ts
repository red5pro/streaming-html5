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

const sdk = window.red5prosdk
sdk.setLogLevel('debug')

let settings = loadSettings()
applyTheme(settings.theme)

let subscriber: WHEPClient | null = null

const subscribeBtn = document.getElementById('subscribe-btn') as HTMLButtonElement
const unsubscribeBtn = document.getElementById('unsubscribe-btn') as HTMLButtonElement
const subscribeStatusEl = document.getElementById('subscribe-status') as HTMLSpanElement
const connectionInfoEl = document.getElementById('connection-info') as HTMLParagraphElement
const subscriberStatsEl = document.getElementById('subscriber-stats') as R5SubscriberStatsElement
const metadataReceiptsSectionEl = document.getElementById(
  'metadata-receipts-section'
) as HTMLElement
const metadataReceiptListEl = document.getElementById('metadata-receipt-list') as HTMLUListElement
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

function clearMetadataReceipts(): void {
  metadataReceiptListEl.innerHTML = ''
  const empty = document.createElement('li')
  empty.className = 'amf-metadata-receipts-list__empty'
  empty.id = 'metadata-receipt-empty'
  empty.textContent = 'Waiting for metadata...'
  metadataReceiptListEl.appendChild(empty)
}

function syncMetadataReceiptsSection(visible: boolean): void {
  metadataReceiptsSectionEl.classList.toggle('is-hidden', !visible)
  if (!visible) {
    clearMetadataReceipts()
  }
}

function appendMetadataReceipt(data: unknown): void {
  metadataReceiptListEl.querySelector('#metadata-receipt-empty')?.remove()

  const item = document.createElement('li')
  item.className = 'amf-metadata-receipt'

  const timeEl = document.createElement('time')
  timeEl.className = 'amf-metadata-receipt__time'
  timeEl.dateTime = new Date().toISOString()
  timeEl.textContent = timeEl.dateTime

  const payloadEl = document.createElement('pre')
  payloadEl.className = 'amf-metadata-receipt__payload'
  payloadEl.textContent = JSON.stringify(data)

  item.appendChild(timeEl)
  item.appendChild(payloadEl)
  metadataReceiptListEl.appendChild(item)
  metadataReceiptListEl.scrollTop = metadataReceiptListEl.scrollHeight
}

function onSubscriberEvent(event: Red5ProEvent): void {
  const { type, data } = event

  if (type === 'Subscribe.Metadata') {
    subscriberStatsEl.applySubscribeMetadata(data)
    appendMetadataReceipt(data)
    log(`[WHEP] Subscribe.Metadata: ${JSON.stringify(data)}`, 'success')
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
    syncMetadataReceiptsSection(true)
  } else if (subscriberFailureEvents.includes(type)) {
    setSubscriberStatus('Subscribe Error', 'error')
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
    syncMetadataReceiptsSection(false)
  } else if (subscriberStopEvents.includes(type)) {
    setSubscriberStatus('Subscriber Idle', 'idle')
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
    subscriberStatsEl.stop()
    syncMetadataReceiptsSection(false)
  } else if (type !== 'Subscribe.Time.Update') {
    setSubscriberStatus(type, 'unknown')
  }
}

async function startSubscribe(): Promise<void> {
  if (subscriber) return
  if (!ensureCoreSettings(settings)) return

  subscribeBtn.disabled = true
  unsubscribeBtn.disabled = true
  syncMetadataReceiptsSection(false)
  setSubscriberStatus('Connecting...', 'connecting')

  try {
    const { streamName } = settings
    const endpoint = resolveEndpointFromSettings(settings, 'whep')
    const connectionParams = resolveConnectionParamsFromSettings(settings)
    const stats = resolveStatisticsConfigurationFromSettings(settings)
    const rtcConfiguration = resolveRtcConfigurationFromSettings(settings)

    subscriber = new sdk.WHEPClient()
    subscriber.on('*', (event) => {
      onSubscriberEvent(event)
      if (event.type !== 'Subscribe.Time.Update' && event.type !== 'Subscribe.Metadata') {
        log(`[WHEP] ${event.type}`)
      }
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
    syncMetadataReceiptsSection(true)
    // @ts-expect-error - global variable for debugging
    window.r5subscriber = subscriber
    log(`Subscribed to ${settings.streamName} from ${settings.host}`, 'success')
  } catch (error) {
    setSubscriberStatus('Subscribe Error', 'error')
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
    syncMetadataReceiptsSection(false)
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
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
    setSubscriberStatus('Subscriber Idle', 'idle')
    syncMetadataReceiptsSection(false)
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
  void stopSubscribe()
  log(`Settings updated: ${resolveEndpointFromSettings(settings, 'whep')} (${settings.streamName})`)
})

window.addEventListener('pagehide', () => {
  void stopSubscribe()
})

window.addEventListener('beforeunload', () => {
  void stopSubscribe()
})

updateConnectionInfo()
syncMetadataReceiptsSection(false)
log('WHEP AMF loaded. Configure Settings, then start subscribing.')
