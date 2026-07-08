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
import { applyTheme, loadSettings } from '@/settings'
import {
  generateUserId,
  readPubNubInitConfig,
  setPubNubFormEnabled,
  validatePubNubForm,
  wirePubNubForm,
  type PubNubFormElements,
} from '@/lib/pubnub-configuration'
import { wireExampleLog } from '@/lib/example-log'

const sdk = window.red5prosdk
sdk.setLogLevel('debug')

applyTheme(loadSettings().theme)

const pubnubForm: PubNubFormElements = {
  cloudEndpointRadio: document.getElementById('pubnub-cloud-endpoint-radio') as HTMLInputElement,
  backendUrlRadio: document.getElementById('pubnub-backend-url-radio') as HTMLInputElement,
  authTokenRadio: document.getElementById('pubnub-auth-token-radio') as HTMLInputElement,
  cloudEndpointInput: document.getElementById('pubnub-cloud-endpoint-input') as HTMLInputElement,
  backendUrlInput: document.getElementById('pubnub-backend-url-input') as HTMLInputElement,
  authTokenInput: document.getElementById('pubnub-auth-token-input') as HTMLInputElement,
  channelIdInput: document.getElementById('pubnub-channel-id-input') as HTMLInputElement,
  userIdInput: document.getElementById('pubnub-user-id-input') as HTMLInputElement,
  publishKeyInput: document.getElementById('pubnub-publish-key-input') as HTMLInputElement,
  subscribeKeyInput: document.getElementById('pubnub-subscribe-key-input') as HTMLInputElement,
}

let pubnubClient: InstanceType<typeof sdk.PubNubClient> | null = null
let defaultUserId: string | null = null
let defaultChannelId: string | null = null

const subscribeBtn = document.getElementById('subscribe-btn') as HTMLButtonElement
const destroyBtn = document.getElementById('destroy-btn') as HTMLButtonElement
const pubnubStatusEl = document.getElementById('pubnub-status') as HTMLSpanElement
const pubnubConfigSectionEl = document.getElementById('pubnub-config-section') as HTMLElement
const pubnubMessagingSectionEl = document.getElementById('pubnub-messaging-section') as HTMLElement
const chatMessagesEl = document.getElementById('chat-messages') as HTMLElement
const chatMessagesClearBtn = document.getElementById('chat-messages-clear-btn') as HTMLButtonElement
const pubnubMessageFormEl = document.getElementById('pubnub-message-form') as HTMLFormElement
const pubnubMessageInputEl = document.getElementById('pubnub-message-input') as HTMLInputElement
const pubnubMessageSendBtn = document.getElementById('pubnub-message-send-btn') as HTMLButtonElement
const { log } = wireExampleLog()

type ChatMessageAlignment = 'sent' | 'received'

function setPubNubStatus(
  text: string,
  state: 'idle' | 'connecting' | 'connected' | 'error' | 'unknown'
): void {
  pubnubStatusEl.textContent = text
  if (state !== 'unknown') {
    pubnubStatusEl.className = `status status--${state}`
  }
}

function syncPubNubConfigSection(visible: boolean): void {
  setPubNubFormEnabled(pubnubForm, visible)
  pubnubConfigSectionEl.classList.toggle('is-hidden', !visible)
}

function syncPubNubMessagingSection(visible: boolean): void {
  pubnubMessagingSectionEl.classList.toggle('is-hidden', !visible)
  pubnubMessageInputEl.disabled = !visible
  pubnubMessageSendBtn.disabled = !visible
  if (!visible) {
    clearChatMessages()
    pubnubMessageInputEl.value = ''
  }
}

function clearChatMessages(): void {
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

function formatPubNubMessage(message: unknown): string {
  if (message === undefined || message === null) {
    return '(empty message)'
  }
  if (typeof message === 'string') {
    return message
  }
  return JSON.stringify(message, null, 2)
}

function appendChatMessage(
  alignment: ChatMessageAlignment,
  publisher: string,
  messageText: string
): void {
  chatMessagesEl.classList.remove('chat-messages--empty')

  const row = document.createElement('div')
  row.className = `chat-message chat-message--${alignment}`

  const bubble = document.createElement('div')
  bubble.className = 'chat-message__bubble'

  if (alignment === 'received') {
    const sender = document.createElement('span')
    sender.className = 'chat-message__sender'
    sender.textContent = publisher
    bubble.appendChild(sender)
  }

  const text = document.createElement('p')
  text.className = 'chat-message__text'
  text.textContent = messageText
  bubble.appendChild(text)

  const time = document.createElement('time')
  time.className = 'chat-message__time'
  time.textContent = new Date().toLocaleTimeString()
  bubble.appendChild(time)

  row.appendChild(bubble)
  chatMessagesEl.appendChild(row)
  scrollChatToBottom()
}

function handleMessageReceived(data: Record<string, unknown> | undefined): void {
  if (!data) {
    log('PubNub message received with no payload.', 'info')
    return
  }

  const publisher = typeof data.publisher === 'string' ? data.publisher : 'unknown'
  const messageText = formatPubNubMessage(data.message)
  const isUserMessage = publisher === defaultUserId

  appendChatMessage(isUserMessage ? 'sent' : 'received', publisher, messageText)
  log(`Message received from ${publisher}`, 'success')
}

function onPubNubEvent(event: Red5ProEvent): void {
  const { type, data } = event
  const detail = data !== undefined ? `: ${JSON.stringify(data)}` : ''
  log(`[PubNub] ${type}${detail}`)

  if (type === sdk.PubNubEventTypes.AUTH_TOKEN_GENERATED) {
    console.log('[PubNub]:: AuthToken Generated', JSON.stringify(data, null, 2))
    log('Auth token generated', 'success')
    return
  }

  if (type === sdk.PubNubEventTypes.AUTH_TOKEN_GENERATION_ERROR) {
    alert('Error generating authentication token.')
    setPubNubStatus('Client Error', 'error')
    return
  }

  if (type === sdk.PubNubEventTypes.MESSAGE_RECEIVED) {
    handleMessageReceived(data as Record<string, unknown> | undefined)
    return
  }

  switch (type) {
    case sdk.PubNubEventTypes.CONNECTED:
      setPubNubStatus('Connected', 'connected')
      break
    case sdk.PubNubEventTypes.DISCONNECTED:
      setPubNubStatus('Disconnected', 'idle')
      break
    case sdk.PubNubEventTypes.SUBSCRIBE_SUCCESS:
      setPubNubStatus('Subscribed', 'connected')
      log(`PubNub subscribed to channel ${defaultChannelId}`, 'success')
      break
    case sdk.PubNubEventTypes.SUBSCRIBE_FAILURE:
    case sdk.PubNubEventTypes.ERROR:
      setPubNubStatus('Client Error', 'error')
      log(`PubNub subscribe failed: ${JSON.stringify(data)}`, 'error')
      break
    default:
      break
  }
}

async function startSubscribe(): Promise<void> {
  if (pubnubClient) return

  const validation = validatePubNubForm(pubnubForm)
  if (!validation.valid) {
    log(validation.message, 'error')
    return
  }

  subscribeBtn.disabled = true
  destroyBtn.disabled = true
  setPubNubStatus('Connecting...', 'connecting')

  const config = readPubNubInitConfig(pubnubForm)
  const channelId = config.channelId
  defaultUserId = config.userId
  defaultChannelId = channelId

  try {
    pubnubClient = new sdk.PubNubClient()
    pubnubClient.on('*', onPubNubEvent)

    log(`PubNub init config: ${JSON.stringify(config)}`)

    await pubnubClient.init(config)
    await pubnubClient.subscribe(channelId)

    subscribeBtn.disabled = true
    destroyBtn.disabled = false
    syncPubNubConfigSection(false)
    syncPubNubMessagingSection(true)
    setPubNubStatus('Subscribed', 'connected')
    // @ts-expect-error - global variable for debugging
    window.r5pubnubClient = pubnubClient
  } catch (error) {
    pubnubClient?.off('*', onPubNubEvent)
    pubnubClient = null
    defaultUserId = null
    defaultChannelId = null
    subscribeBtn.disabled = false
    destroyBtn.disabled = true
    syncPubNubConfigSection(true)
    syncPubNubMessagingSection(false)
    setPubNubStatus('Client Error', 'error')
    log(`Subscribe failed: ${String(error)}`, 'error')
  }
}

async function sendPubNubMessage(event: SubmitEvent): Promise<void> {
  event.preventDefault()
  if (!pubnubClient || !defaultChannelId) return

  const message = pubnubMessageInputEl.value.trim()
  if (!message) {
    log('Message is empty.', 'error')
    return
  }

  pubnubMessageSendBtn.disabled = true
  try {
    const success = await pubnubClient.publishMessage(defaultChannelId, message)
    if (success) {
      pubnubMessageInputEl.value = ''
      log('Message sent', 'success')
    } else {
      log('Message send failed.', 'error')
    }
  } catch (error) {
    log(`Message send failed: ${String(error)}`, 'error')
  } finally {
    pubnubMessageSendBtn.disabled = false
  }
}

async function destroyClient(): Promise<void> {
  if (!pubnubClient) return

  destroyBtn.disabled = true
  try {
    await pubnubClient.destroy()
    log('PubNub client destroyed', 'success')
  } catch (error) {
    log(`Destroy failed: ${String(error)}`, 'error')
  } finally {
    pubnubClient.off('*', onPubNubEvent)
    pubnubClient = null
    defaultUserId = null
    defaultChannelId = null
    subscribeBtn.disabled = false
    destroyBtn.disabled = true
    syncPubNubConfigSection(true)
    syncPubNubMessagingSection(false)
    setPubNubStatus('Client Idle', 'idle')
    // @ts-expect-error - global variable for debugging
    delete window.r5pubnubClient
  }
}

subscribeBtn.addEventListener('click', () => {
  void startSubscribe()
})

destroyBtn.addEventListener('click', () => {
  void destroyClient()
})

chatMessagesClearBtn.addEventListener('click', clearChatMessages)
pubnubMessageFormEl.addEventListener('submit', (event) => {
  void sendPubNubMessage(event)
})

window.addEventListener('pagehide', () => {
  void destroyClient()
})

window.addEventListener('beforeunload', () => {
  void destroyClient()
})

wirePubNubForm(pubnubForm)
syncPubNubMessagingSection(false)
clearChatMessages()
pubnubForm.userIdInput.value = generateUserId()
log('PubNub Client loaded. Configure settings, then start subscribe.')
