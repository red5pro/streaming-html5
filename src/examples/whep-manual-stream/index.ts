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
let manualMediaStream: MediaStream | null = null
let keyframeStatsInterval: ReturnType<typeof setInterval> | null = null

const subscribeBtn = document.getElementById('subscribe-btn') as HTMLButtonElement
const unsubscribeBtn = document.getElementById('unsubscribe-btn') as HTMLButtonElement
const subscribeStatusEl = document.getElementById('subscribe-status') as HTMLSpanElement
const connectionInfoEl = document.getElementById('connection-info') as HTMLParagraphElement
const subscriberStatsEl = document.getElementById('subscriber-stats') as R5SubscriberStatsElement
const keyframeSectionEl = document.getElementById('keyframe-section') as HTMLElement
const clientSideKeyframeInputEl = document.getElementById(
  'client-side-keyframe-input'
) as HTMLInputElement
const keyframeStatusEl = document.getElementById('keyframe-status') as HTMLParagraphElement
const subscriberVideoEl = document.getElementById('subscriber-video') as HTMLVideoElement
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

function setKeyframeFormEnabled(enabled: boolean): void {
  clientSideKeyframeInputEl.disabled = !enabled
  keyframeSectionEl.classList.toggle('is-disabled', !enabled)
}

function isClientSideKeyframeRecognitionEnabled(): boolean {
  return clientSideKeyframeInputEl.checked
}

function setKeyframeStatus(
  text: string | null,
  state: 'idle' | 'connecting' | 'connected' | 'error' = 'idle'
): void {
  if (!text) {
    keyframeStatusEl.textContent = ''
    keyframeStatusEl.className = 'keyframe-status is-hidden'
    return
  }

  keyframeStatusEl.textContent = text
  keyframeStatusEl.className = `keyframe-status status status--${state}`
}

function resetKeyframeStatus(): void {
  setKeyframeStatus(null)
}

function elementPlaybackState(element: HTMLMediaElement, available: boolean): void {
  element.classList.toggle('blurred-video', !available)
}

function stopKeyframeStatsPolling(): void {
  if (keyframeStatsInterval !== null) {
    clearInterval(keyframeStatsInterval)
    keyframeStatsInterval = null
  }
}

function resolvePeerConnectionFromEvent(
  data: Record<string, unknown> | undefined
): RTCPeerConnection | null {
  if (data instanceof RTCPeerConnection) {
    return data
  }

  return subscriber?.getPeerConnection() ?? null
}

function trackKeyframeRecognition(pc: RTCPeerConnection): void {
  stopKeyframeStatsPolling()

  keyframeStatsInterval = setInterval(() => {
    if (!pc) {
      stopKeyframeStatsPolling()
      return
    }

    void pc.getStats().then((stats) => {
      stats.forEach((stat) => {
        const inboundStat = stat as RTCStats & {
          mediaType?: string
          kind?: string
          keyFramesDecoded?: number
        }

        const statType = String(inboundStat.type)
        if (statType !== 'inbound-rtp' && statType !== 'inboundrtp') {
          return
        }

        if (inboundStat.mediaType !== 'video' && inboundStat.kind !== 'video') {
          return
        }

        console.log('[R5-MANUAL] KEYFRAME', inboundStat.keyFramesDecoded)
        if ((inboundStat.keyFramesDecoded ?? 0) <= 0) {
          return
        }

        stopKeyframeStatsPolling()
        console.log('[R5-MANUAL] KEYFRAME DETECTED', inboundStat.keyFramesDecoded)

        if (manualMediaStream) {
          attachMediaStream(subscriberVideoEl, manualMediaStream)
        }

        try {
          console.log('[R5-MANUAL] PLAYING ELEMENT')
          void subscriberVideoEl.play()
        } catch (error) {
          console.log('[R5-MANUAL] Error playing element', error)
          log(`Error playing video element: ${String(error)}`, 'error')
        } finally {
          elementPlaybackState(subscriberVideoEl, true)
          setKeyframeStatus('Keyframe received, playback started.', 'connected')
        }

        log(`Keyframe detected (${inboundStat.keyFramesDecoded} decoded)`, 'success')
      })
    })
  }, 1000)
}

function resetManualStreamState(): void {
  stopKeyframeStatsPolling()
  manualMediaStream = null
  resetKeyframeStatus()
}

function attachMediaStream(element: HTMLMediaElement, stream: MediaStream): void {
  console.log('[R5-MANUAL] ATTACH')
  if (element.srcObject === stream) {
    return
  }
  try {
    element.srcObject = stream
  } catch {
    try {
      element.src = URL.createObjectURL(stream as unknown as Blob)
    } catch (error) {
      console.log('[R5-MANUAL] Error attaching stream to element', error, ['RED5', 'ERROR'])
      log(`Error attaching stream to element: ${String(error)}`, 'error')
    }
  }
}

function detachMediaStream(element: HTMLMediaElement): void {
  if (element.srcObject) {
    element.srcObject = null
  }
  if (element.src.startsWith('blob:')) {
    URL.revokeObjectURL(element.src)
    element.src = ''
  }
  element.removeAttribute('autoplay')
}

function resolveOnTrackStream(data: Record<string, unknown> | undefined): MediaStream {
  const streams = data?.streams as MediaStream[] | undefined
  return streams && streams.length > 0 ? streams[0] : new MediaStream()
}

function handlePeerConnectionOnTrack(data: Record<string, unknown> | undefined): void {
  const stream = resolveOnTrackStream(data)
  manualMediaStream = stream

  if (isClientSideKeyframeRecognitionEnabled()) {
    subscriberVideoEl.removeAttribute('autoplay')
    elementPlaybackState(subscriberVideoEl, false)
    attachMediaStream(subscriberVideoEl, stream)
    log('Attached MediaStream; waiting for keyframe before playback', 'success')
    return
  }

  subscriberVideoEl.autoplay = true
  subscriberVideoEl.setAttribute('autoplay', '')
  elementPlaybackState(subscriberVideoEl, true)
  attachMediaStream(subscriberVideoEl, stream)
  log('Attached MediaStream from WebRTC.PeerConnection.OnTrack', 'success')
}

function handlePeerConnectionAvailable(data: Record<string, unknown> | undefined): void {
  if (!isClientSideKeyframeRecognitionEnabled()) {
    return
  }

  const pc = resolvePeerConnectionFromEvent(data)
  if (!pc) {
    log('PeerConnection.Available received without RTCPeerConnection', 'error')
    return
  }

  trackKeyframeRecognition(pc)
  log('Started client-side keyframe stats polling', 'success')
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

  if (type === sdk.RTCSubscriberEventTypes.TRACK_ADDED) {
    handlePeerConnectionOnTrack(data)
    return
  }

  if (type === sdk.RTCSubscriberEventTypes.PEER_CONNECTION_AVAILABLE) {
    handlePeerConnectionAvailable(data)
    return
  }

  if (type === 'Subscribe.Start') {
    setSubscriberStatus('Subscribed', 'connected')
    subscribeBtn.disabled = true
    unsubscribeBtn.disabled = false
    setKeyframeFormEnabled(false)
    if (isClientSideKeyframeRecognitionEnabled()) {
      setKeyframeStatus('Waiting for keyframe...', 'connecting')
    }
  } else if (subscriberFailureEvents.includes(type)) {
    setSubscriberStatus('Subscribe Error', 'error')
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
    setKeyframeFormEnabled(true)
    resetManualStreamState()
  } else if (subscriberStopEvents.includes(type)) {
    setSubscriberStatus('Subscriber Idle', 'idle')
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
    subscriberStatsEl.stop()
    setKeyframeFormEnabled(true)
    resetManualStreamState()
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
  setKeyframeFormEnabled(false)
  resetManualStreamState()

  if (isClientSideKeyframeRecognitionEnabled()) {
    setKeyframeStatus('Subscribing...', 'connecting')
  }

  log(
    `Client-side keyframe recognition: ${isClientSideKeyframeRecognitionEnabled() ? 'enabled' : 'disabled'}`
  )

  try {
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
      mediaElementId: undefined,
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
    // @ts-expect-error - global variable for debugging
    window.r5subscriber = subscriber
    log(`Subscribed to ${settings.streamName} from ${settings.host}`, 'success')
  } catch (error) {
    setSubscriberStatus('Subscribe Error', 'error')
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
    setKeyframeFormEnabled(true)
    resetManualStreamState()
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
    setKeyframeFormEnabled(true)
    resetManualStreamState()
    detachMediaStream(subscriberVideoEl)
    // @ts-expect-error - global variable for debugging
    delete window.r5subscriber
    subscriberVideoEl.classList.add('blurred-video')
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
log('WHEP manual stream example loaded. Click Start Subscribe to begin.')
