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
  postInterstitialResume,
  postInterstitialSwitch,
  resolveInterstitialEndpointUrl,
  type InterstitialDurationType,
} from '@/lib/interstitial-api'
import { wireExampleLog } from '@/lib/example-log'

const sdk = window.red5prosdk
sdk.setLogLevel('debug')

let settings = loadSettings()
applyTheme(settings.theme)

let subscriber: WHEPClient | null = null
let interstitialRequestInFlight = false

const subscribeBtn = document.getElementById('subscribe-btn') as HTMLButtonElement
const unsubscribeBtn = document.getElementById('unsubscribe-btn') as HTMLButtonElement
const subscribeStatusEl = document.getElementById('subscribe-status') as HTMLSpanElement
const connectionInfoEl = document.getElementById('connection-info') as HTMLParagraphElement
const subscriberStatsEl = document.getElementById('subscriber-stats') as R5SubscriberStatsElement
const interstitialSectionEl = document.getElementById('interstitial-section') as HTMLElement
const interstitialStatusEl = document.getElementById('interstitial-status') as HTMLSpanElement
const interstitialFormEl = document.getElementById('interstitial-form') as HTMLFormElement
const interstitialUserInputEl = document.getElementById(
  'interstitial-user-input'
) as HTMLInputElement
const interstitialPasswordInputEl = document.getElementById(
  'interstitial-password-input'
) as HTMLInputElement
const interstitialTargetInputEl = document.getElementById(
  'interstitial-target-input'
) as HTMLInputElement
const interstitialStreamInputEl = document.getElementById(
  'interstitial-stream-input'
) as HTMLInputElement
const interstitialSwitchAudioInputEl = document.getElementById(
  'interstitial-switch-audio-input'
) as HTMLInputElement
const interstitialSwitchVideoInputEl = document.getElementById(
  'interstitial-switch-video-input'
) as HTMLInputElement
const interstitialLoopInputEl = document.getElementById(
  'interstitial-loop-input'
) as HTMLInputElement
const interstitialDurationTypeSelectEl = document.getElementById(
  'interstitial-duration-type-select'
) as HTMLSelectElement
const interstitialStartInputEl = document.getElementById(
  'interstitial-start-input'
) as HTMLInputElement
const interstitialDurationInputEl = document.getElementById(
  'interstitial-duration-input'
) as HTMLInputElement
const interstitialSwitchBtn = document.getElementById(
  'interstitial-switch-btn'
) as HTMLButtonElement
const interstitialResumeBtn = document.getElementById(
  'interstitial-resume-btn'
) as HTMLButtonElement
const { log } = wireExampleLog()

const subscriberFailureEvents = ['Subscribe.Fail', 'Connect.Failure', 'Subscribe.InvalidName']
const subscriberStopEvents = ['Subscribe.Stop', 'Subscribe.Play.Unpublish']

function syncStandaloneAuthFieldsVisibility(): void {
  const showStandaloneFields = !settings.useStreamManager
  document.querySelectorAll('.standalone-option').forEach((el) => {
    el.classList.toggle('is-hidden', !showStandaloneFields)
  })
}

function defaultStreamPath(streamName: string): string {
  return `${settings.app}/${streamName}`
}

function syncInterstitialDefaults(): void {
  interstitialTargetInputEl.value = defaultStreamPath(settings.streamName)
  interstitialStreamInputEl.value = defaultStreamPath(`${settings.streamName}2`)
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

function setInterstitialStatus(
  text: string,
  state: 'idle' | 'connecting' | 'connected' | 'error' | 'unknown'
): void {
  interstitialStatusEl.textContent = text
  if (state !== 'unknown') {
    interstitialStatusEl.className = `status status--${state}`
  }
}

function updateConnectionInfo(): void {
  if (!settings.host || !settings.streamName) {
    connectionInfoEl.textContent = 'Configure host and stream name in Settings'
    return
  }

  if (settings.useStreamManager) {
    connectionInfoEl.textContent = `${resolveEndpointFromSettings(settings, 'whep')} · interstitial via origin forward`
    return
  }

  connectionInfoEl.textContent = resolveInterstitialEndpointUrl(settings)
}

function syncInterstitialSection(visible: boolean): void {
  interstitialSectionEl.classList.toggle('is-hidden', !visible)
  interstitialUserInputEl.disabled = !visible || interstitialRequestInFlight
  interstitialPasswordInputEl.disabled = !visible || interstitialRequestInFlight
  interstitialTargetInputEl.disabled = !visible || interstitialRequestInFlight
  interstitialStreamInputEl.disabled = !visible || interstitialRequestInFlight
  interstitialSwitchAudioInputEl.disabled = !visible || interstitialRequestInFlight
  interstitialSwitchVideoInputEl.disabled = !visible || interstitialRequestInFlight
  interstitialLoopInputEl.disabled = !visible || interstitialRequestInFlight
  interstitialDurationTypeSelectEl.disabled = !visible || interstitialRequestInFlight
  interstitialStartInputEl.disabled = !visible || interstitialRequestInFlight
  interstitialDurationInputEl.disabled = !visible || interstitialRequestInFlight
  interstitialSwitchBtn.disabled = !visible || interstitialRequestInFlight
  interstitialResumeBtn.disabled = !visible || interstitialRequestInFlight
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

function resolveInterstitialCredentials(): { user: string; digest: string } {
  return {
    user: interstitialUserInputEl.value.trim() || 'foo',
    digest: interstitialPasswordInputEl.value.trim() || 'bar',
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
    subscriberStatsEl.startSubscriptionLength()
    setSubscriberStatus('Subscribed', 'connected')
    subscribeBtn.disabled = true
    unsubscribeBtn.disabled = false
    syncInterstitialSection(true)
    setInterstitialStatus('Ready', 'idle')
  } else if (subscriberFailureEvents.includes(type)) {
    setSubscriberStatus('Subscribe Error', 'error')
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
    syncInterstitialSection(false)
    setInterstitialStatus('Idle', 'idle')
  } else if (subscriberStopEvents.includes(type)) {
    setSubscriberStatus('Subscriber Idle', 'idle')
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
    subscriberStatsEl.stop()
    syncInterstitialSection(false)
    setInterstitialStatus('Idle', 'idle')
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
  syncInterstitialSection(false)

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
    syncInterstitialSection(true)
    setInterstitialStatus('Ready', 'idle')
    log(`Subscribed to ${settings.streamName} from ${settings.host}`, 'success')
    // @ts-expect-error - global variable for debugging
    window.r5subscriber = subscriber
  } catch (error) {
    setSubscriberStatus('Subscribe Error', 'error')
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
    syncInterstitialSection(false)
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
    syncInterstitialSection(false)
    setSubscriberStatus('Subscriber Idle', 'idle')
    setInterstitialStatus('Idle', 'idle')
    // @ts-expect-error - global variable for debugging
    delete window.r5subscriber
  }
}

async function submitInterstitialSwitch(event: SubmitEvent): Promise<void> {
  event.preventDefault()
  if (interstitialRequestInFlight) return

  const credentials = resolveInterstitialCredentials()
  interstitialRequestInFlight = true
  syncInterstitialSection(true)
  setInterstitialStatus('Switching...', 'connecting')

  const result = await postInterstitialSwitch(
    {
      settings,
      user: credentials.user,
      digest: credentials.digest,
    },
    {
      target: interstitialTargetInputEl.value.trim(),
      interstitial: interstitialStreamInputEl.value.trim(),
      loop: interstitialLoopInputEl.checked,
      type: interstitialDurationTypeSelectEl.value as InterstitialDurationType,
      isInterstitialAudio: interstitialSwitchAudioInputEl.checked,
      isInterstitialVideo: interstitialSwitchVideoInputEl.checked,
      start: interstitialStartInputEl.value.trim(),
      duration: interstitialDurationInputEl.value.trim(),
    }
  )

  interstitialRequestInFlight = false
  syncInterstitialSection(true)

  if (result.ok) {
    setInterstitialStatus('Switch OK', 'connected')
    log(`Interstitial switch succeeded (HTTP ${result.status})`, 'success')
    return
  }

  setInterstitialStatus('Switch Error', 'error')
  log(`Interstitial switch failed: ${result.error ?? `HTTP ${result.status}`}`, 'error')
}

async function submitInterstitialResume(): Promise<void> {
  if (interstitialRequestInFlight) return

  const credentials = resolveInterstitialCredentials()
  interstitialRequestInFlight = true
  syncInterstitialSection(true)
  setInterstitialStatus('Resuming...', 'connecting')

  const result = await postInterstitialResume(
    {
      settings,
      user: credentials.user,
      digest: credentials.digest,
    },
    interstitialTargetInputEl.value.trim()
  )

  interstitialRequestInFlight = false
  syncInterstitialSection(true)

  if (result.ok) {
    setInterstitialStatus('Resume OK', 'connected')
    log(`Interstitial resume succeeded (HTTP ${result.status})`, 'success')
    return
  }

  setInterstitialStatus('Resume Error', 'error')
  log(`Interstitial resume failed: ${result.error ?? `HTTP ${result.status}`}`, 'error')
}

subscribeBtn.addEventListener('click', () => {
  void startSubscribe()
})

unsubscribeBtn.addEventListener('click', () => {
  void stopSubscribe()
})

interstitialFormEl.addEventListener('submit', (event) => {
  void submitInterstitialSwitch(event)
})

interstitialResumeBtn.addEventListener('click', () => {
  void submitInterstitialResume()
})

document.addEventListener('webrtc-settings-applied', (e) => {
  settings = (e as CustomEvent).detail as Settings
  syncStandaloneAuthFieldsVisibility()
  syncInterstitialDefaults()
  updateConnectionInfo()
  log(`Settings updated: ${resolveEndpointFromSettings(settings, 'whep')} (${settings.streamName})`)
})

window.addEventListener('pagehide', () => {
  void stopSubscribe()
})

window.addEventListener('beforeunload', () => {
  void stopSubscribe()
})

syncStandaloneAuthFieldsVisibility()
syncInterstitialDefaults()
updateConnectionInfo()
log('WHEP Interstitial loaded. Configure Settings, subscribe, then use interstitial controls.')
