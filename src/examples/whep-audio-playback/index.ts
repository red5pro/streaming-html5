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
import { AudioLevelAnalyzer, getFirstAudioTrack } from '@/lib/audio-level-analyzer'
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
const subscriberAudioEl = document.getElementById('subscriber-audio') as HTMLAudioElement
const audioLevelMeterEl = document.getElementById('audio-level-meter') as HTMLElement
const audioLevelFillEl = document.getElementById('audio-level-fill') as HTMLElement
const audioLevelPeakEl = document.getElementById('audio-level-peak') as HTMLElement
const audioLevelDbEl = document.getElementById('audio-level-db') as HTMLElement
const { log } = wireExampleLog()

const audioLevelAnalyzer = new AudioLevelAnalyzer({
  meterEl: audioLevelMeterEl,
  barFillEl: audioLevelFillEl,
  peakEl: audioLevelPeakEl,
  dbEl: audioLevelDbEl,
})

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

function logIncomingTrackSummary(): void {
  const peerConnection = subscriber?.getPeerConnection()
  if (!peerConnection) return

  const receivers = peerConnection.getReceivers()
  const audioTracks = receivers.filter((r) => r.track?.kind === 'audio').length
  const videoTracks = receivers.filter((r) => r.track?.kind === 'video').length
  log(
    `Incoming tracks: ${audioTracks} audio, ${videoTracks} video (playback routed to audio element only)`,
    'success'
  )
}

function startAudioLevelAnalyzer(): void {
  if (audioLevelAnalyzer.isRunning) return

  try {
    // Prefer tapping the stream already assigned to the element. That stream
    // is what the browser is playing, so levels reflect what the user hears.
    if (subscriberAudioEl.srcObject instanceof MediaStream) {
      audioLevelAnalyzer.start(subscriberAudioEl)
      log('Audio level analyzer started', 'success')
      return
    }

    // Fallback: tap the receiver track directly.
    const peerConnection = subscriber?.getPeerConnection()
    const audioTrack = peerConnection ? getFirstAudioTrack(peerConnection) : null

    if (!audioTrack) {
      log('No live audio track available for level analyzer', 'error')
      return
    }

    audioLevelAnalyzer.start(audioTrack)
    log('Audio level analyzer started (track fallback)', 'success')
  } catch (error) {
    log(`Audio level analyzer failed: ${String(error)}`, 'error')
  }
}

function waitForAudioSrcObject(): Promise<void> {
  if (subscriberAudioEl.srcObject instanceof MediaStream) {
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    // `playing` fires once the browser is actively rendering audio frames,
    // meaning srcObject is assigned and the stream is flowing.
    const onPlaying = (): void => {
      subscriberAudioEl.removeEventListener('playing', onPlaying)
      resolve()
    }

    subscriberAudioEl.addEventListener('playing', onPlaying, { once: true })

    // Hard timeout so we never hang if the element never emits `playing`
    // (e.g. because the browser muted it due to autoplay policy).
    window.setTimeout(() => {
      subscriberAudioEl.removeEventListener('playing', onPlaying)
      resolve()
    }, 2000)
  })
}

function stopAudioLevelAnalyzer(): void {
  audioLevelAnalyzer.stop()
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
    logIncomingTrackSummary()
  } else if (subscriberFailureEvents.includes(type)) {
    stopAudioLevelAnalyzer()
    setSubscriberStatus('Subscribe Error', 'error')
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
  } else if (subscriberStopEvents.includes(type)) {
    stopAudioLevelAnalyzer()
    setSubscriberStatus('Subscriber Idle', 'idle')
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
    subscriberStatsEl.stop()
  } else if (type !== 'Subscribe.Time.Update') {
    setSubscriberStatus(type, 'unknown')
  }
}

async function startSubscribe(): Promise<void> {
  if (subscriber) return
  if (!ensureCoreSettings(settings)) return

  subscribeBtn.disabled = true
  unsubscribeBtn.disabled = true
  setSubscriberStatus('Connecting...', 'connecting')

  try {
    // Create AudioContext synchronously while the user gesture is still active.
    // This guarantees it starts in `running` state across all browsers.
    audioLevelAnalyzer.createContext()

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
      mediaElementId: 'subscriber-audio',
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

    // Wait for the element to receive its srcObject and begin playing before
    // starting the analyser — ensures the MediaStream is present and flowing.
    await waitForAudioSrcObject()
    startAudioLevelAnalyzer()

    setSubscriberStatus('Subscribed', 'connected')
    unsubscribeBtn.disabled = false
    log(`Subscribed to ${settings.streamName} from ${settings.host}`, 'success')
    // @ts-expect-error - global variable for debugging
    window.r5subscriber = subscriber
  } catch (error) {
    setSubscriberStatus('Subscribe Error', 'error')
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
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
    stopAudioLevelAnalyzer()
    subscriberStatsEl.stop()
    subscriberStatsEl.setPeerConnection(null)
    subscriber = null
    subscriberAudioEl.srcObject = null
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
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
  audioLevelAnalyzer.dispose()
  void stopSubscribe()
})

window.addEventListener('beforeunload', () => {
  audioLevelAnalyzer.dispose()
  void stopSubscribe()
})

updateConnectionInfo()
log('WHEP Audio Playback loaded. Configure Settings, then start subscribing.')
