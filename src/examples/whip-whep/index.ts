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
import '@/components/r5-subscriber-stats'
import type { R5PublishSettingsElement } from '@/components/r5-publish-settings'
import type { R5PublisherStatsElement } from '@/components/r5-publisher-stats'
import type { R5SubscriberStatsElement } from '@/components/r5-subscriber-stats'
import type { R5PublishModeElement, StreamMode } from '@/components/r5-publish-mode'
import {
  applyTheme,
  loadSettings,
  resolveEndpointFromSettings,
  resolveConnectionParamsFromSettings,
  resolveStatisticsConfigurationFromSettings,
  resolveRtcConfigurationFromSettings,
  type Settings,
} from '@/settings'
import { wireExampleLog } from '@/lib/example-log'

const sdk = window.red5prosdk
sdk.setLogLevel('debug')

let settings = loadSettings()
applyTheme(settings.theme)

let publisher: WHIPClient | null = null
let subscriber: WHEPClient | null = null

const publishBtn = document.getElementById('publish-btn') as HTMLButtonElement
const unpublishBtn = document.getElementById('unpublish-btn') as HTMLButtonElement
const subscribeBtn = document.getElementById('subscribe-btn') as HTMLButtonElement
const unsubscribeBtn = document.getElementById('unsubscribe-btn') as HTMLButtonElement
const publishStatusEl = document.getElementById('publish-status') as HTMLSpanElement
const subscribeStatusEl = document.getElementById('subscribe-status') as HTMLSpanElement
const publisherStatsEl = document.getElementById('publisher-stats') as R5PublisherStatsElement
const publishSettingsEl = document.getElementById('publish-settings') as R5PublishSettingsElement
const subscriberStatsEl = document.getElementById('subscriber-stats') as R5SubscriberStatsElement
const publishModeEl = document.getElementById('publish-mode') as R5PublishModeElement
const { log } = wireExampleLog()

function setPublisherStatus(
  text: string,
  state: 'idle' | 'connecting' | 'connected' | 'error' | 'unknown'
): void {
  publishStatusEl.textContent = text
  if (state !== 'unknown') {
    publishStatusEl.className = `status status--${state}`
  }
}

function setSubscriberStatus(
  text: string,
  state: 'idle' | 'connecting' | 'connected' | 'error' | 'unknown'
): void {
  subscribeStatusEl.textContent = text
  if (state !== 'unknown') {
    subscribeStatusEl.className = `status status--${state}`
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

const publisherFailureEvents = ['Publish.Fail', 'Connect.Failure', 'Publish.InvalidName']
function onPublisherEvent(event: any): void {
  const { type } = event
  if (type === 'Publish.Start') {
    setPublisherStatus('Publishing', 'connected')
  } else if (publisherFailureEvents.includes(type)) {
    setPublisherStatus('Publish Error', 'error')
  } else if (type === 'Unpublish.Success') {
    setPublisherStatus('Publisher Idle', 'idle')
  } else if (type === 'WebRTC.Endpoint.Changed') {
    const endpoint = event.data?.endpoint as string | undefined
    if (!endpoint) return
    publisherStatsEl.setEndpoint(endpoint)
  } else {
    setPublisherStatus(`${type}`, 'unknown')
  }
}

const subscriberFailureEvents = ['Subscribe.Fail', 'Connect.Failure', 'Subscribe.InvalidName']
const subscriberStopEvents = ['Subscribe.Stop', 'Subscribe.Play.Unpublish']
function onSubscriberEvent(event: Red5ProEvent): void {
  const { type, data } = event
  if (type === 'Subscribe.Metadata') {
    subscriberStatsEl.applySubscribeMetadata(data)
    return
  }
  if (type === 'Subscribe.Start') {
    setSubscriberStatus('Subscribed', 'connected')
  } else if (subscriberFailureEvents.includes(type)) {
    setSubscriberStatus('Subscribe Error', 'error')
  } else if (subscriberStopEvents.includes(type)) {
    setSubscriberStatus('Subscriber Idle', 'idle')
    subscriberStatsEl.stop()
  } else if (type === 'WebRTC.Endpoint.Changed') {
    const endpoint = event.data?.endpoint as string | undefined
    if (!endpoint) return
    subscriberStatsEl.setEndpoint(endpoint)
  } else {
    setSubscriberStatus(`${type}`, 'unknown')
  }
}

async function startPublish(): Promise<void> {
  if (!ensureCoreSettings(settings)) return
  publishBtn.disabled = true
  publishSettingsEl.enabled = false
  publishModeEl.enabled = false
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
    publishSettingsEl.enabled = true
    publishModeEl.enabled = true
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
    publishSettingsEl.enabled = true
    publishModeEl.enabled = true
    setPublisherStatus('Publisher Idle', 'idle')
    // @ts-expect-error - global variable for debugging
    delete window.r5publisher
  }
}

async function startSubscribe(): Promise<void> {
  if (!ensureCoreSettings(settings)) return
  subscribeBtn.disabled = true
  setSubscriberStatus('Connecting...', 'connecting')

  try {
    const { streamName } = settings
    const endpoint = resolveEndpointFromSettings(settings, 'whep')
    const connectionParams = resolveConnectionParamsFromSettings(settings)
    const stats = resolveStatisticsConfigurationFromSettings(settings)
    const rtcConfiguration = resolveRtcConfigurationFromSettings(settings)
    subscriber = new sdk.WHEPClient()
    subscriber.on('*', (event) => {
      const { type } = event
      if (type === 'Subscribe.Time.Update') {
        return
      }
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
    setSubscriberStatus('Subscribe Error', 'error')
    subscribeBtn.disabled = false
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
    setSubscriberStatus('Subscriber Idle', 'idle')
    // @ts-expect-error - global variable for debugging
    delete window.r5subscriber
  }
}

async function shutdown(): Promise<void> {
  await stopPublish()
  await stopSubscribe()
}

publishBtn.addEventListener('click', () => {
  void startPublish()
})
unpublishBtn.addEventListener('click', () => {
  void stopPublish()
})
subscribeBtn.addEventListener('click', () => {
  void startSubscribe()
})
unsubscribeBtn.addEventListener('click', () => {
  void stopSubscribe()
})

document.addEventListener('webrtc-settings-applied', (e) => {
  settings = (e as CustomEvent).detail as Settings
  const endpoint = resolveEndpointFromSettings(settings, 'whip')
  log(`Settings updated: ${endpoint} (${settings.streamName})`)
})

window.addEventListener('pagehide', () => {
  void shutdown()
})
window.addEventListener('beforeunload', () => {
  void shutdown()
})

log('Ready. Configure host and stream name in Settings, then publish and subscribe.')
