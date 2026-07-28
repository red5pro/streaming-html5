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
  readDataChannelForm,
  setDataChannelFormEnabled,
  wireDataChannelForm,
  type DataChannelFormElements,
} from '@/lib/data-channel-configuration'
import {
  extractDataChannelMessagePayload,
  extractRpcInvokePayload,
  formatReceiptLine,
  formatRpcInvokeReceipt,
  parseIncomingDataChannelPayload,
  setBinaryAudioPlayback,
} from '@/lib/data-channel-receive'
import { wireExampleLog } from '@/lib/example-log'

const sdk = window.red5prosdk
sdk.setLogLevel('debug')

let settings = loadSettings()
applyTheme(settings.theme)

const dataChannelForm: DataChannelFormElements = {
  nameInput: document.getElementById('dc-name-input') as HTMLInputElement,
  modeSelect: document.getElementById('dc-mode-select') as HTMLSelectElement,
  orderedInput: document.getElementById('dc-ordered-input') as HTMLInputElement,
  maxRetransmitsInput: document.getElementById('dc-max-retransmits-input') as HTMLInputElement,
  maxPacketLifeTimeInput: document.getElementById(
    'dc-max-packet-lifetime-input'
  ) as HTMLInputElement,
  modeAdvancedOptionsEl: document.getElementById('dc-mode-advanced-options') as HTMLElement,
  maxRetransmitsFieldEl: document.getElementById('dc-max-retransmits-field') as HTMLElement,
  maxPacketLifeTimeFieldEl: document.getElementById('dc-max-packet-lifetime-field') as HTMLElement,
}

let subscriber: WHEPClient | null = null
let binaryPlaybackObjectUrl: string | null = null
let rpcReceiptHasContent = false
let jsonReceiptHasContent = false

const subscribeBtn = document.getElementById('subscribe-btn') as HTMLButtonElement
const unsubscribeBtn = document.getElementById('unsubscribe-btn') as HTMLButtonElement
const subscribeStatusEl = document.getElementById('subscribe-status') as HTMLSpanElement
const connectionInfoEl = document.getElementById('connection-info') as HTMLParagraphElement
const subscriberStatsEl = document.getElementById('subscriber-stats') as R5SubscriberStatsElement
const subscribeConfigSectionEl = document.getElementById('subscribe-config-section') as HTMLElement
const subscribeReceiptsSectionEl = document.getElementById(
  'subscribe-receipts-section'
) as HTMLElement
const rpcReceiptOutputEl = document.getElementById('rpc-receipt-output') as HTMLPreElement
const rpcReceiptClearBtn = document.getElementById('rpc-receipt-clear-btn') as HTMLButtonElement
const jsonReceiptOutputEl = document.getElementById('json-receipt-output') as HTMLPreElement
const jsonReceiptClearBtn = document.getElementById('json-receipt-clear-btn') as HTMLButtonElement
const binaryReceiptPlaceholderEl = document.getElementById(
  'binary-receipt-placeholder'
) as HTMLParagraphElement
const binaryReceiptAudioEl = document.getElementById('binary-receipt-audio') as HTMLAudioElement
const { log } = wireExampleLog()

const subscriberFailureEvents = ['Subscribe.Fail', 'Connect.Failure', 'Subscribe.InvalidName']
const subscriberStopEvents = ['Subscribe.Stop', 'Subscribe.Play.Unpublish']
const dataChannelEvents = [
  'WebRTC.DataChannel.Available',
  'WebRTC.DataChannel.Close',
  'WebRTC.DataChannel.Error',
  'WebRTC.DataChannel.Message',
]

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

function syncSubscribeConfigSection(visible: boolean): void {
  setDataChannelFormEnabled(dataChannelForm, visible)
  subscribeConfigSectionEl.classList.toggle('is-hidden', !visible)
}

function revokeBinaryPlaybackObjectUrl(): void {
  if (!binaryPlaybackObjectUrl) return
  URL.revokeObjectURL(binaryPlaybackObjectUrl)
  binaryPlaybackObjectUrl = null
}

function clearRpcReceipts(): void {
  rpcReceiptHasContent = false
  rpcReceiptOutputEl.textContent = 'Waiting for RPC message...'
  rpcReceiptOutputEl.classList.add('receive-section__output--empty')
}

function clearJsonReceipts(): void {
  jsonReceiptHasContent = false
  jsonReceiptOutputEl.textContent = 'Waiting for JSON message...'
  jsonReceiptOutputEl.classList.add('receive-section__output--empty')
}

function resetReceiptDisplays(): void {
  clearRpcReceipts()
  clearJsonReceipts()
  binaryReceiptPlaceholderEl.classList.remove('is-hidden')
  binaryReceiptPlaceholderEl.textContent = 'Waiting for binary audio message...'
  binaryReceiptAudioEl.classList.add('is-hidden')
  binaryReceiptAudioEl.removeAttribute('src')
  binaryReceiptAudioEl.load()
  revokeBinaryPlaybackObjectUrl()
}

function syncSubscribeReceiptsSection(visible: boolean): void {
  subscribeReceiptsSectionEl.classList.toggle('is-hidden', !visible)
  if (!visible) {
    resetReceiptDisplays()
  }
}

function appendReceiptLine(
  outputEl: HTMLPreElement,
  line: string,
  hasContentFlag: 'rpc' | 'json'
): void {
  if (hasContentFlag === 'rpc') {
    if (!rpcReceiptHasContent) {
      rpcReceiptHasContent = true
      outputEl.textContent = ''
      outputEl.classList.remove('receive-section__output--empty')
    }
  } else if (!jsonReceiptHasContent) {
    jsonReceiptHasContent = true
    outputEl.textContent = ''
    outputEl.classList.remove('receive-section__output--empty')
  }

  outputEl.textContent = outputEl.textContent ? `${outputEl.textContent}\n\n${line}` : line
  outputEl.scrollTop = outputEl.scrollHeight
}

function handleRpcInvoke(event: Red5ProEvent): void {
  const payload = extractRpcInvokePayload(event)
  const receipt = formatRpcInvokeReceipt(payload)
  appendReceiptLine(rpcReceiptOutputEl, formatReceiptLine(receipt), 'rpc')
  log(`RPC message received: ${receipt}`, 'success')
}

function handleDataChannelMessage(event: Red5ProEvent): void {
  void handleDataChannelMessageAsync(event)
}

function promptForBinaryPlayback(streamName: string): boolean {
  return window.confirm(`Binary audio received from ${streamName}. Click OK to play.`)
}

async function handleDataChannelMessageAsync(event: Red5ProEvent): Promise<void> {
  let rawPayload = extractDataChannelMessagePayload(event)
  const parsed = parseIncomingDataChannelPayload(rawPayload)
  if (!parsed) {
    log('Data channel message received with unsupported payload.', 'info')
    return
  }

  if (parsed.kind === 'binary') {
    revokeBinaryPlaybackObjectUrl()
    binaryPlaybackObjectUrl = setBinaryAudioPlayback(
      binaryReceiptAudioEl,
      parsed.buffer,
      parsed.mimeType
    )
    binaryReceiptPlaceholderEl.classList.add('is-hidden')
    log(`Binary audio received (${parsed.buffer.byteLength} bytes).`, 'success')
    const streamName = settings.streamName || 'stream'
    const shouldPlay = promptForBinaryPlayback(streamName)
    if (shouldPlay) {
      try {
        await binaryReceiptAudioEl.play()
      } catch (error) {
        log(`Unable to start audio playback: ${String(error)}`, 'error')
      }
    }
    return
  }

  if (parsed.kind === 'json') {
    appendReceiptLine(jsonReceiptOutputEl, formatReceiptLine(parsed.text), 'json')
    log(`JSON message received: ${parsed.text}`, 'success')
    return
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

function onSubscriberEvent(event: Red5ProEvent): void {
  const { type, data } = event
  if (type === 'Subscribe.Metadata') {
    subscriberStatsEl.applySubscribeMetadata(data)
    return
  } else if (type === 'WebRTC.Endpoint.Changed') {
    const endpoint = event.data?.endpoint as string | undefined
    if (!endpoint) return
    subscriberStatsEl.setEndpoint(endpoint)
    return
  }
  if (type === 'Subscribe.Start') {
    setSubscriberStatus('Subscribed', 'connected')
    subscribeBtn.disabled = true
    unsubscribeBtn.disabled = false
    syncSubscribeConfigSection(false)
    syncSubscribeReceiptsSection(true)
  } else if (type === 'Subscribe.Send.Invoke') {
    handleRpcInvoke(event)
  } else if (type === 'WebRTC.DataChannel.Message') {
    handleDataChannelMessage(event)
  } else if (subscriberFailureEvents.includes(type)) {
    setSubscriberStatus('Subscribe Error', 'error')
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
    syncSubscribeConfigSection(true)
    syncSubscribeReceiptsSection(false)
  } else if (subscriberStopEvents.includes(type)) {
    setSubscriberStatus('Subscriber Idle', 'idle')
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
    subscriberStatsEl.stop()
    syncSubscribeConfigSection(true)
    syncSubscribeReceiptsSection(false)
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

  const dataChannelConfiguration = readDataChannelForm(dataChannelForm)

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
      if (dataChannelEvents.includes(type)) {
        log(`[DataChannel] ${type}`, 'info')
        if (type === 'WebRTC.DataChannel.Message') {
          handleDataChannelMessage(event)
        }
        return
      }
      log(`[WHEP] ${event.type}`)
      onSubscriberEvent(event)
    })

    log(`Data channel config: ${JSON.stringify(dataChannelConfiguration)}`)

    await subscriber.init({
      endpoint,
      streamName,
      mediaElementId: 'subscriber-video',
      connectionParams,
      stats: stats ?? undefined,
      rtcConfiguration,
      includeDataChannel: true,
      dataChannelConfiguration,
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
    unsubscribeBtn.disabled = true
    syncSubscribeConfigSection(true)
    syncSubscribeReceiptsSection(false)
    subscriber = null
    log(`Subscribe failed: ${String(error)}`, 'error')
  }
}

async function stopSubscribe(): Promise<void> {
  if (!subscriber) return

  unsubscribeBtn.disabled = true
  syncSubscribeReceiptsSection(false)
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
    syncSubscribeConfigSection(true)
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

rpcReceiptClearBtn.addEventListener('click', () => {
  clearRpcReceipts()
})

jsonReceiptClearBtn.addEventListener('click', () => {
  clearJsonReceipts()
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

wireDataChannelForm(dataChannelForm)
syncSubscribeReceiptsSection(false)
updateConnectionInfo()
log('WHEP Data Channel loaded. Configure DataChannel settings, then start subscribing.')
