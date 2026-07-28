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
import '@/components/r5-subscriber-link'
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
  resetBinaryRecordingUi,
  startBinaryRecording,
  type BinaryRecordingElements,
  type BinaryRecordingSession,
} from '@/lib/data-channel-binary-send'
import {
  extractDataChannelMessagePayload,
  parseIncomingDataChannelPayload,
  setBinaryAudioPlayback,
} from '@/lib/data-channel-receive'
import type { R5SubscriberLinkElement } from '@/components/r5-subscriber-link'
import { sendJsonDataChannelMessage } from '@/lib/data-channel-messaging'
import { wireExampleLog } from '@/lib/example-log'
import { updateSubscriberLink } from '@/lib/example-links'

const SUBSCRIBER_EXAMPLE_PATH = '../message-channel/index.html'

const sdk = window.red5prosdk
sdk.setLogLevel('debug')

let settings = loadSettings()
applyTheme(settings.theme)

const openSubscriberLinkEl = document.getElementById(
  'open-subscriber-link'
) as R5SubscriberLinkElement

function refreshSubscriberLink(): void {
  updateSubscriberLink(openSubscriberLinkEl, SUBSCRIBER_EXAMPLE_PATH, settings)
}

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

const binaryRecordingElements: BinaryRecordingElements = {
  recordBtn: document.getElementById('binary-record-btn') as HTMLButtonElement,
  recordingStatusEl: document.getElementById('binary-recording-status') as HTMLElement,
  playbackPanelEl: document.getElementById('binary-playback-panel') as HTMLElement,
  playbackAudioEl: document.getElementById('binary-playback-audio') as HTMLAudioElement,
  recordAgainBtn: document.getElementById('binary-record-again-btn') as HTMLButtonElement,
}

let messageChannel: InstanceType<typeof sdk.MessageChannel> | null = null
let activeStreamName: string | null = null
let binaryRecordingSession: BinaryRecordingSession | null = null
let dataChannelReady = false
let playbackObjectUrl: string | null = null
let binaryPlaybackObjectUrl: string | null = null
let binaryMicStream: MediaStream | null = null

const openBtn = document.getElementById('open-btn') as HTMLButtonElement
const closeBtn = document.getElementById('close-btn') as HTMLButtonElement
const channelStatusEl = document.getElementById('channel-status') as HTMLSpanElement
const connectionInfoEl = document.getElementById('connection-info') as HTMLParagraphElement
const streamNameInfoEl = document.getElementById('stream-name-info') as HTMLParagraphElement
const channelConfigSectionEl = document.getElementById('channel-config-section') as HTMLElement
const channelMessagingSectionEl = document.getElementById(
  'channel-messaging-section'
) as HTMLElement
const jsonMessageFormEl = document.getElementById('json-message-form') as HTMLFormElement
const jsonMessageInputEl = document.getElementById('json-message-input') as HTMLInputElement
const jsonMessageSendBtn = document.getElementById('json-message-send-btn') as HTMLButtonElement
const chatMessagesEl = document.getElementById('chat-messages') as HTMLElement
const chatMessagesClearBtn = document.getElementById('chat-messages-clear-btn') as HTMLButtonElement
const binaryReceiptPlaceholderEl = document.getElementById(
  'binary-receipt-placeholder'
) as HTMLParagraphElement
const binaryReceiptAudioEl = document.getElementById('binary-receipt-audio') as HTMLAudioElement
const { log } = wireExampleLog()

interface PeerMessagePayload {
  message?: string
  sender_id?: string
  senderName?: string
  timestamp?: number
}

type ChatMessageAlignment = 'sent' | 'received'

const recentSentFingerprints = new Set<string>()

const channelFailureEvents = ['MessageChannel.Fail', 'Connect.Failure']
const dataChannelEvents = [
  'WebRTC.DataChannel.Available',
  'WebRTC.DataChannel.Close',
  'WebRTC.DataChannel.Error',
  'WebRTC.DataChannel.Message',
]
const messageChannelEvents: string[] = [
  sdk.MessageChannelEventTypes.OPEN,
  sdk.MessageChannelEventTypes.SEND,
  sdk.MessageChannelEventTypes.RECEIVE,
  sdk.MessageChannelEventTypes.CLOSE,
  sdk.MessageChannelEventTypes.FAIL,
  sdk.MessageChannelEventTypes.ERROR,
]

function buildStreamName(dataChannelName: string): string {
  const suffix = Math.floor(Math.random() * 0x10000).toString(16)
  return `${dataChannelName}-dc-${suffix}`
}

function setChannelStatus(
  text: string,
  state: 'idle' | 'connecting' | 'connected' | 'error' | 'unknown'
): void {
  channelStatusEl.textContent = text
  if (state !== 'unknown') {
    channelStatusEl.className = `status status--${state}`
  }
}

function updateConnectionInfo(): void {
  if (!settings.host) {
    connectionInfoEl.textContent = 'Configure host in Settings'
    return
  }

  if (activeStreamName) {
    connectionInfoEl.textContent = resolveEndpointFromSettings(
      { ...settings, streamName: activeStreamName },
      'whip'
    )
    streamNameInfoEl.textContent = `Name: ${activeStreamName}`
    streamNameInfoEl.classList.remove('is-hidden')
    return
  }

  connectionInfoEl.textContent = `${settings.host} — stream name assigned on open`
  streamNameInfoEl.textContent = ''
  streamNameInfoEl.classList.add('is-hidden')
}

function syncChannelConfigSection(visible: boolean): void {
  setDataChannelFormEnabled(dataChannelForm, visible)
  channelConfigSectionEl.classList.toggle('is-hidden', !visible)
}

function syncMessagingControlsEnabled(enabled: boolean): void {
  jsonMessageInputEl.disabled = !enabled
  jsonMessageSendBtn.disabled = !enabled
  binaryRecordingElements.recordBtn.disabled = !enabled || !dataChannelReady
}

function revokePlaybackObjectUrl(): void {
  if (!playbackObjectUrl) return
  URL.revokeObjectURL(playbackObjectUrl)
  playbackObjectUrl = null
}

function revokeBinaryPlaybackObjectUrl(): void {
  if (!binaryPlaybackObjectUrl) return
  URL.revokeObjectURL(binaryPlaybackObjectUrl)
  binaryPlaybackObjectUrl = null
}

function resetBinaryReceiptDisplay(): void {
  binaryReceiptPlaceholderEl.classList.remove('is-hidden')
  binaryReceiptPlaceholderEl.textContent = 'Waiting for binary audio message...'
  binaryReceiptAudioEl.classList.add('is-hidden')
  binaryReceiptAudioEl.removeAttribute('src')
  binaryReceiptAudioEl.load()
  revokeBinaryPlaybackObjectUrl()
}

function stopBinaryMicStream(): void {
  binaryMicStream?.getTracks().forEach((track) => track.stop())
  binaryMicStream = null
}

function clearChatMessages(): void {
  recentSentFingerprints.clear()
  chatMessagesEl.replaceChildren()
  const placeholder = document.createElement('p')
  placeholder.className = 'chat-messages__placeholder'
  placeholder.textContent = 'No messages yet...'
  chatMessagesEl.appendChild(placeholder)
  chatMessagesEl.classList.add('chat-messages--empty')
}

function scrollChatToBottom(): void {
  chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight
}

function formatChatTimestamp(timestamp?: number): string {
  return (timestamp ? new Date(timestamp) : new Date()).toLocaleTimeString()
}

function sentMessageFingerprint(message: string, timestamp: number): string {
  return `${timestamp}:${message}`
}

function appendChatMessage(alignment: ChatMessageAlignment, payload: PeerMessagePayload): void {
  chatMessagesEl.classList.remove('chat-messages--empty')

  const row = document.createElement('div')
  row.className = `chat-message chat-message--${alignment}`

  const bubble = document.createElement('div')
  bubble.className = 'chat-message__bubble'

  if (alignment === 'received' && payload.senderName) {
    const sender = document.createElement('span')
    sender.className = 'chat-message__sender'
    sender.textContent = payload.senderName
    bubble.appendChild(sender)
  }

  const text = document.createElement('p')
  text.className = 'chat-message__text'
  text.textContent = payload.message ?? '(empty message)'
  bubble.appendChild(text)

  const time = document.createElement('time')
  time.className = 'chat-message__time'
  time.dateTime = payload.timestamp ? String(payload.timestamp) : ''
  time.textContent = formatChatTimestamp(payload.timestamp)
  bubble.appendChild(time)

  row.appendChild(bubble)
  chatMessagesEl.appendChild(row)
  scrollChatToBottom()
}

function parsePeerMessagePayload(raw: unknown): PeerMessagePayload | null {
  if (!raw || typeof raw !== 'object') {
    try {
      raw = JSON.parse(raw as string)
    } catch {
      return null
    }
  }

  const record = raw as Record<string, unknown>
  const message = typeof record.message === 'string' ? record.message : undefined
  const senderId = typeof record.sender_id === 'string' ? record.sender_id : undefined
  const senderName = typeof record.senderName === 'string' ? record.senderName : undefined
  const timestamp = typeof record.timestamp === 'number' ? record.timestamp : undefined

  if (message === undefined && timestamp === undefined) {
    return null
  }
  return { message, senderName: senderId ?? senderName, timestamp }
}

function formatPeerMessagePayload(raw: unknown): PeerMessagePayload {
  const peerPayload = parsePeerMessagePayload(raw)
  if (peerPayload?.message !== undefined) {
    return peerPayload
  }

  const fallbackText =
    typeof raw === 'string'
      ? raw
      : raw === undefined || raw === null
        ? '(empty message)'
        : JSON.stringify(raw)

  return { message: fallbackText, timestamp: Date.now() }
}

function promptForBinaryPlayback(streamName: string): boolean {
  return window.confirm(`Binary audio received from ${streamName}. Click OK to play.`)
}

function handleMessageChannelReceive(event: Red5ProEvent): void {
  const rawPayload = extractDataChannelMessagePayload(event)
  const parsed = parseIncomingDataChannelPayload(rawPayload)

  if (parsed?.kind === 'binary') {
    revokeBinaryPlaybackObjectUrl()
    binaryPlaybackObjectUrl = setBinaryAudioPlayback(
      binaryReceiptAudioEl,
      parsed.buffer,
      parsed.mimeType
    )
    binaryReceiptPlaceholderEl.classList.add('is-hidden')
    log(`Binary audio received (${parsed.buffer.byteLength} bytes).`, 'success')
    const streamName = activeStreamName || settings.streamName || 'stream'
    const shouldPlay = promptForBinaryPlayback(streamName)
    if (shouldPlay) {
      void binaryReceiptAudioEl.play().catch((error) => {
        log(`Unable to start audio playback: ${String(error)}`, 'error')
      })
    }
    return
  }

  const payload = formatPeerMessagePayload(rawPayload)

  if (
    payload.message !== undefined &&
    payload.timestamp !== undefined &&
    recentSentFingerprints.delete(sentMessageFingerprint(payload.message, payload.timestamp))
  ) {
    return
  }

  appendChatMessage('received', payload)
  log(
    `Peer message received: ${payload.message}${payload.senderName ? ` from ${payload.senderName}` : ''}`,
    'success'
  )
}

function resetMessagingForms(): void {
  binaryRecordingSession?.stop()
  binaryRecordingSession = null
  stopBinaryMicStream()
  jsonMessageInputEl.value = ''
  revokePlaybackObjectUrl()
  resetBinaryRecordingUi(binaryRecordingElements)
  resetBinaryReceiptDisplay()
}

function syncChannelMessagingSection(visible: boolean): void {
  channelMessagingSectionEl.classList.toggle('is-hidden', !visible)
  syncMessagingControlsEnabled(visible)
  if (!visible) {
    dataChannelReady = false
    resetMessagingForms()
    clearChatMessages()
  }
}

function ensureCoreSettings(s: Settings): boolean {
  if (!s.host) {
    log('Missing host. Open Settings and configure host first.', 'error')
    return false
  }
  return true
}

function onChannelEvent(event: Red5ProEvent): void {
  const { type } = event

  if (type === sdk.MessageChannelEventTypes.OPEN) {
    setChannelStatus('Channel Open', 'connected')
    openBtn.disabled = true
    closeBtn.disabled = false
    syncChannelConfigSection(false)
    syncChannelMessagingSection(true)
    if (messageChannel?.getDataChannel()?.readyState === 'open') {
      dataChannelReady = true
      binaryRecordingElements.recordBtn.disabled = false
    }
    log('Message channel is open for messaging.', 'success')
    refreshSubscriberLink()
    openSubscriberLinkEl.disabled = false
  } else if (type === sdk.MessageChannelEventTypes.RECEIVE) {
    handleMessageChannelReceive(event)
  } else if (type === sdk.MessageChannelEventTypes.CLOSE) {
    setChannelStatus('Channel Idle', 'idle')
    openBtn.disabled = false
    closeBtn.disabled = true
    activeStreamName = null
    syncChannelConfigSection(true)
    syncChannelMessagingSection(false)
    updateConnectionInfo()
  } else if (type === 'WebRTC.DataChannel.Available') {
    dataChannelReady = true
    binaryRecordingElements.recordBtn.disabled = false
    log('Data channel is available for messaging.', 'success')
  } else if (channelFailureEvents.includes(type)) {
    setChannelStatus('Channel Error', 'error')
    openBtn.disabled = false
    closeBtn.disabled = true
    activeStreamName = null
    syncChannelConfigSection(true)
    syncChannelMessagingSection(false)
    updateConnectionInfo()
  } else if (type !== 'unknown') {
    setChannelStatus(type, 'unknown')
  }
}

async function startChannel(): Promise<void> {
  if (messageChannel) return
  if (!ensureCoreSettings(settings)) return

  openBtn.disabled = true
  closeBtn.disabled = true
  setChannelStatus('Connecting...', 'connecting')

  const dataChannelConfiguration = readDataChannelForm(dataChannelForm)
  activeStreamName = buildStreamName(dataChannelConfiguration.name)
  updateConnectionInfo()

  try {
    const streamName = activeStreamName
    const endpoint = resolveEndpointFromSettings({ ...settings, streamName }, 'whip')
    const connectionParams = resolveConnectionParamsFromSettings(settings)
    const stats = resolveStatisticsConfigurationFromSettings(settings)
    const rtcConfiguration = resolveRtcConfigurationFromSettings(settings)

    messageChannel = new sdk.MessageChannel()
    messageChannel.on('*', (event) => {
      const { type } = event
      if (messageChannelEvents.includes(type)) {
        log(
          `[MessageChannel] ${type}`,
          type === sdk.MessageChannelEventTypes.RECEIVE ? 'info' : undefined
        )
        onChannelEvent(event)
        return
      }
      if (dataChannelEvents.includes(type)) {
        log(`[DataChannel] ${type}`, 'info')
        if (type === 'WebRTC.DataChannel.Available') {
          onChannelEvent(event)
        }
        return
      }
      log(`[MessageChannel] ${event.type}`)
      onChannelEvent(event)
    })

    log(`Data channel config: ${JSON.stringify(dataChannelConfiguration)}`)
    log(`Name: ${streamName}`)

    await messageChannel.init({
      endpoint,
      streamName,
      connectionParams,
      stats: stats ?? undefined,
      rtcConfiguration,
      includeDataChannel: true,
      dataChannelConfiguration,
    })
    await messageChannel.open()

    closeBtn.disabled = false
    log(`Message channel opened on ${settings.host} (${streamName})`, 'success')
    // @ts-expect-error - global variable for debugging
    window.r5messageChannel = messageChannel
  } catch (error) {
    setChannelStatus('Channel Error', 'error')
    openBtn.disabled = false
    closeBtn.disabled = true
    activeStreamName = null
    syncChannelConfigSection(true)
    syncChannelMessagingSection(false)
    updateConnectionInfo()
    messageChannel = null
    log(`Open failed: ${String(error)}`, 'error')
  }
}

async function stopChannel(): Promise<void> {
  if (!messageChannel) return

  closeBtn.disabled = true
  syncChannelMessagingSection(false)
  try {
    await messageChannel.close()
    log('Message channel closed', 'success')
  } catch (error) {
    log(`Close failed: ${String(error)}`, 'error')
  } finally {
    messageChannel = null
    activeStreamName = null
    openBtn.disabled = false
    closeBtn.disabled = true
    syncChannelConfigSection(true)
    setChannelStatus('Channel Idle', 'idle')
    updateConnectionInfo()
    openSubscriberLinkEl.disabled = true
    // @ts-expect-error - global variable for debugging
    delete window.r5messageChannel
  }
}

function sendJsonMessage(event: SubmitEvent): void {
  event.preventDefault()
  if (!messageChannel) return

  const message = { message: jsonMessageInputEl.value, sender_id: activeStreamName }
  void sendJsonDataChannelMessage(messageChannel, JSON.stringify(message))
    .then((payload) => {
      const record = payload as PeerMessagePayload
      const text =
        typeof record.message === 'string' ? record.message : jsonMessageInputEl.value.trim()
      const timestamp = typeof record.timestamp === 'number' ? record.timestamp : Date.now()
      const chatPayload: PeerMessagePayload = { message: text, timestamp }
      recentSentFingerprints.add(sentMessageFingerprint(text, timestamp))
      appendChatMessage('sent', chatPayload)
      log(`Message sent: ${text}`, 'success')
      console.log('JSON message sent payload', payload)
      jsonMessageInputEl.value = ''
    })
    .catch((error) => {
      log(`JSON send failed: ${String(error)}`, 'error')
    })
}

async function startBinaryMessageRecording(): Promise<void> {
  if (!messageChannel) return

  try {
    stopBinaryMicStream()
    binaryMicStream = await navigator.mediaDevices.getUserMedia({ audio: true })
  } catch (error) {
    log(`Microphone access failed: ${String(error)}`, 'error')
    return
  }

  binaryRecordingSession?.stop()
  binaryRecordingSession = startBinaryRecording(
    messageChannel,
    binaryRecordingElements,
    (message, level) => log(message, level ?? 'info'),
    (url) => {
      revokePlaybackObjectUrl()
      playbackObjectUrl = url
      console.log('Binary message recording URL', url)
    },
    binaryMicStream
  )
}

jsonMessageFormEl.addEventListener('submit', sendJsonMessage)
chatMessagesClearBtn.addEventListener('click', clearChatMessages)
binaryRecordingElements.recordBtn.addEventListener('click', () => {
  void startBinaryMessageRecording()
})
binaryRecordingElements.recordAgainBtn.addEventListener('click', () => {
  revokePlaybackObjectUrl()
  resetBinaryRecordingUi(binaryRecordingElements)
  void startBinaryMessageRecording()
})

openBtn.addEventListener('click', () => {
  void startChannel()
})

closeBtn.addEventListener('click', () => {
  void stopChannel()
})

document.addEventListener('webrtc-settings-applied', (e) => {
  settings = (e as CustomEvent).detail as Settings
  updateConnectionInfo()
  log(`Settings updated: host ${settings.host}`)
})

window.addEventListener('pagehide', () => {
  binaryRecordingSession?.stop()
  binaryRecordingSession = null
  stopBinaryMicStream()
  void stopChannel()
})

window.addEventListener('beforeunload', () => {
  binaryRecordingSession?.stop()
  binaryRecordingSession = null
  stopBinaryMicStream()
  void stopChannel()
})

wireDataChannelForm(dataChannelForm)
syncChannelMessagingSection(false)
clearChatMessages()
updateConnectionInfo()
log(
  'Message Channel loaded. Configure DataChannel settings, then open the channel. Stream name is derived from the DataChannel name on open.'
)
