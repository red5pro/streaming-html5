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
import {
  applyTheme,
  loadSettings,
  type Settings,
} from '@/settings'
import {
  hasNativeHlsPlaybackSupport,
  resolveHlsInitConfig,
  resolveHlsManifestFromSettings,
} from '@/lib/hls-subscriber-config'
import {
  startHlsJsPlayback,
  stopHlsJsPlayback,
  type HlsJsInstance,
} from '@/lib/hls-playback-fallback'
import { wireExampleLog } from '@/lib/example-log'

const sdk = window.red5prosdk
sdk.setLogLevel('debug')

let settings = loadSettings()
applyTheme(settings.theme)

type PlaybackEngine = 'sdk' | 'hlsjs' | null

let subscriber: HLSSubscriber | null = null
let hlsInstance: HlsJsInstance | null = null
let playbackEngine: PlaybackEngine = null

const subscribeBtn = document.getElementById('subscribe-btn') as HTMLButtonElement
const unsubscribeBtn = document.getElementById('unsubscribe-btn') as HTMLButtonElement
const subscribeStatusEl = document.getElementById('subscribe-status') as HTMLSpanElement
const connectionInfoEl = document.getElementById('connection-info') as HTMLParagraphElement
const playbackInfoEl = document.getElementById('playback-info') as HTMLParagraphElement
const playbackModeEl = document.getElementById('playback-mode') as HTMLParagraphElement
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

function setPlaybackEngineLabel(engine: PlaybackEngine): void {
  playbackEngine = engine
  if (engine === 'sdk') {
    playbackModeEl.textContent = 'Playback engine: HLSSubscriber (native)'
    return
  }
  if (engine === 'hlsjs') {
    playbackModeEl.textContent = 'Playback engine: HLS.js (fallback)'
    return
  }
  playbackModeEl.textContent = 'Playback engine: —'
}

function updateConnectionInfo(): void {
  if (!settings.host || !settings.streamName) {
    connectionInfoEl.textContent = 'Configure host and stream name in Settings'
    return
  }
  connectionInfoEl.textContent = resolveHlsManifestFromSettings(settings)
}

function updatePlaybackInfo(): void {
  playbackInfoEl.textContent = hasNativeHlsPlaybackSupport()
    ? 'Native HLS support: available in this browser'
    : 'Native HLS support: not available in this browser'
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
  const { type } = event

  if (type === 'Subscribe.Start') {
    setSubscriberStatus('Subscribed', 'connected')
    subscribeBtn.disabled = true
    unsubscribeBtn.disabled = false
    setPlaybackEngineLabel('sdk')
  } else if (subscriberFailureEvents.includes(type)) {
    setSubscriberStatus('Subscribe Error', 'error')
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
    setPlaybackEngineLabel(null)
  } else if (subscriberStopEvents.includes(type)) {
    setSubscriberStatus('Subscriber Idle', 'idle')
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
    setPlaybackEngineLabel(null)
  } else if (type !== 'Subscribe.Time.Update') {
    setSubscriberStatus(type, 'unknown')
  }
}

async function startSdkSubscriber(): Promise<HLSSubscriber> {
  const instance = new sdk.HLSSubscriber()
  instance.on('*', (event) => {
    const { type } = event
    if (type === 'Subscribe.Time.Update') return
    log(`[HLS] ${event.type}`)
    onSubscriberEvent(event)
  })

  const initConfig = resolveHlsInitConfig(settings)
  await instance.init(initConfig)
  await instance.subscribe()
  return instance
}

async function startHlsJsFallback(manifestUrl: string): Promise<void> {
  hlsInstance = await startHlsJsPlayback(subscriberVideoEl, manifestUrl)
  setPlaybackEngineLabel('hlsjs')
  setSubscriberStatus('Subscribed', 'connected')
  subscribeBtn.disabled = true
  unsubscribeBtn.disabled = false
}

async function startSubscribe(): Promise<void> {
  if (!ensureCoreSettings(settings)) return

  subscribeBtn.disabled = true
  unsubscribeBtn.disabled = true
  setSubscriberStatus('Connecting...', 'connecting')

  const manifestUrl = resolveHlsManifestFromSettings(settings)
  let sdkAttempt: HLSSubscriber | null = null

  try {
    log(`Starting HLSSubscriber for ${manifestUrl}`)
    sdkAttempt = await startSdkSubscriber()
    subscriber = sdkAttempt
    log('Subscribed via HLSSubscriber', 'success')
    // @ts-expect-error - global variable for debugging
    window.r5subscriber = subscriber
  } catch (sdkError) {
    log(`HLSSubscriber failed: ${String(sdkError)}`, 'error')

    const fallbackUrl = sdkAttempt?.getFileURL() ?? manifestUrl

    if (sdkAttempt) {
      try {
        await sdkAttempt.unsubscribe()
      } catch {
        // Ignore cleanup errors before fallback.
      }
    }

    log('Falling back to HLS.js playback...')

    try {
      await startHlsJsFallback(fallbackUrl)
      log(`Playback started via HLS.js (${fallbackUrl})`, 'success')
    } catch (fallbackError) {
      setSubscriberStatus('Subscribe Error', 'error')
      subscribeBtn.disabled = false
      unsubscribeBtn.disabled = true
      setPlaybackEngineLabel(null)
      log(`HLS.js fallback failed: ${String(fallbackError)}`, 'error')
    }
  }
}

async function stopSubscribe(): Promise<void> {
  unsubscribeBtn.disabled = true

  try {
    if (playbackEngine === 'sdk' && subscriber) {
      await subscriber.unsubscribe()
      log('Subscribe stopped', 'success')
    } else if (playbackEngine === 'hlsjs') {
      stopHlsJsPlayback(hlsInstance, subscriberVideoEl)
      hlsInstance = null
      log('HLS.js playback stopped', 'success')
    }
  } catch (error) {
    log(`Unsubscribe failed: ${String(error)}`, 'error')
  } finally {
    subscriber = null
    hlsInstance = null
    playbackEngine = null
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
    setSubscriberStatus('Subscriber Idle', 'idle')
    setPlaybackEngineLabel(null)
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
  log(
    `Settings updated: ${resolveHlsManifestFromSettings(settings)} (${settings.streamName})`
  )
})

window.addEventListener('pagehide', () => {
  void stopSubscribe()
})

window.addEventListener('beforeunload', () => {
  void stopSubscribe()
})

updateConnectionInfo()
updatePlaybackInfo()
log('HLS Subscriber loaded. Configure Settings, then start subscribing.')
