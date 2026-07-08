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

;(function () {
  const sdk = window.red5prosdk
  sdk.setLogLevel('debug')

  /** @type {import('@/settings').Settings | null} */
  let settings = null
  /** @type {Array<{ label: string, subscriber: WHEPClient, videoId: string }>} */
  let subscribers = []

  const subscribeAllBtn = document.getElementById('subscribe-all-btn')
  const unsubscribeAllBtn = document.getElementById('unsubscribe-all-btn')
  const pageStatusEl = document.getElementById('page-status')
  const connectionInfoEl = document.getElementById('connection-info')
  const promptEl = document.getElementById('prompt')
  const subscribersGridEl = document.getElementById('subscribers-grid')
  const logEl = document.getElementById('log')

  const subscriberFailureEvents = ['Subscribe.Fail', 'Connect.Failure', 'Subscribe.InvalidName']
  const subscriberStopEvents = ['Subscribe.Stop', 'Subscribe.Play.Unpublish']

  function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name)
  }

  function getSubscriberAmount() {
    const raw = getQueryParam('amount')
    if (raw === null || raw === '') return 1
    const parsed = parseInt(raw, 10)
    if (Number.isNaN(parsed) || parsed < 1) return 1
    return parsed
  }

  function log(message, level = 'info') {
    const line = document.createElement('div')
    line.className = `log__line log__line--${level}`
    const timestamp = new Date().toISOString().split('T')[1].slice(0, 12)
    line.textContent = `[${timestamp}] ${message}`
    logEl.appendChild(line)
    logEl.scrollTop = logEl.scrollHeight
  }

  function setPageStatus(text, state) {
    pageStatusEl.textContent = text
    if (state !== 'unknown') {
      pageStatusEl.className = `status status--${state}`
    }
  }

  function setPrompt(message, state) {
    promptEl.textContent = message
    promptEl.className = 'prompt'
    if (state) {
      promptEl.classList.add(`prompt--${state}`)
    }
  }

  function updateConnectionInfo() {
    if (!settings.host || !settings.streamName) {
      connectionInfoEl.textContent = 'Configure host and stream name in Settings'
      return
    }
    if (!settings.useStreamManager) {
      connectionInfoEl.textContent = 'Enable Stream Manager in Settings for this example'
      return
    }
    const amount = getSubscriberAmount()
    connectionInfoEl.textContent = `${window.webrtcTestbed.resolveEndpointFromSettings(settings, 'whep')} · amount=${amount}`
  }

  function ensureCoreSettings(current) {
    if (!current.host) {
      log('Missing host. Open Settings and configure host first.', 'error')
      return false
    }
    if (!current.streamName) {
      log('Missing stream name. Open Settings and configure stream name first.', 'error')
      return false
    }
    if (!current.useStreamManager) {
      log('Enable Stream Manager in Settings for this example.', 'error')
      return false
    }
    return true
  }

  function setSubscriberPrompt(promptEl, message, state) {
    promptEl.textContent = message
    promptEl.className = 'edge-subscriber__prompt'
    if (state) {
      promptEl.classList.add(`edge-subscriber__prompt--${state}`)
    }
  }

  function setSubscriberStatus(statusEl, text, state) {
    statusEl.textContent = text
    if (state !== 'unknown') {
      statusEl.className = `status status--${state}`
    }
  }

  function createSubscriberBlock(label, index) {
    const videoId = `subscriber-video-${index}`
    const block = document.createElement('article')
    block.className = 'edge-subscriber'
    block.dataset.subscriber = String(index)

    const header = document.createElement('div')
    header.className = 'edge-subscriber__header'

    const title = document.createElement('h3')
    title.className = 'edge-subscriber__title'
    title.textContent = label

    const status = document.createElement('span')
    status.className = 'status status--idle'
    status.textContent = 'Idle'

    header.appendChild(title)
    header.appendChild(status)

    const prompt = document.createElement('p')
    prompt.className = 'edge-subscriber__prompt edge-subscriber__prompt--progress'
    prompt.textContent = 'Connecting...'

    const video = document.createElement('video')
    video.id = videoId
    video.className = 'edge-subscriber__video'
    video.autoplay = true
    video.playsInline = true
    video.controls = true

    block.appendChild(header)
    block.appendChild(prompt)
    block.appendChild(video)

    return { block, videoId, promptEl: prompt, statusEl: status }
  }

  function onSubscriberEvent(event, label, ui) {
    const { type } = event
    if (type === 'Subscribe.Time.Update') return

    log(`[${label}] ${type}`)

    if (type === 'Subscribe.Start') {
      setSubscriberStatus(ui.statusEl, 'Subscribed', 'connected')
      setSubscriberPrompt(ui.promptEl, 'Subscribed', 'success')
    } else if (subscriberFailureEvents.includes(type)) {
      setSubscriberStatus(ui.statusEl, 'Error', 'error')
      setSubscriberPrompt(ui.promptEl, type, 'failure')
    } else if (subscriberStopEvents.includes(type)) {
      setSubscriberStatus(ui.statusEl, 'Idle', 'idle')
      setSubscriberPrompt(ui.promptEl, 'Stopped', 'idle')
    } else {
      setSubscriberStatus(ui.statusEl, type, 'unknown')
    }
  }

  async function subscribeOne(label, index) {
    const tb = window.webrtcTestbed
    const ui = createSubscriberBlock(label, index)
    subscribersGridEl.appendChild(ui.block)

    const endpoint = tb.resolveEndpointFromSettings(settings, 'whep')
    const connectionParams = tb.resolveConnectionParamsFromSettings(settings)
    const statsConfig = tb.resolveStatisticsConfigurationFromSettings(settings)
    const rtcConfiguration = tb.resolveRtcConfigurationFromSettings(settings)

    if (getQueryParam('nodeGroup')) {
      connectionParams.nodeGroup = getQueryParam('nodeGroup')
    }

    const subscriber = new sdk.WHEPClient()
    subscriber.on('*', (event) => onSubscriberEvent(event, label, ui))

    try {
      await subscriber.init({
        endpoint,
        streamName: settings.streamName,
        mediaElementId: ui.videoId,
        connectionParams,
        stats: statsConfig ?? undefined,
        rtcConfiguration,
      })
      await subscriber.subscribe()
      subscribers.push({ label, subscriber, videoId: ui.videoId })
      log(`Subscribed ${label}`, 'success')
    } catch (error) {
      setSubscriberStatus(ui.statusEl, 'Error', 'error')
      setSubscriberPrompt(ui.promptEl, 'Subscribe failed', 'failure')
      log(`Subscribe failed for ${label}: ${String(error)}`, 'error')
      throw error
    }
  }

  async function startAll() {
    if (subscribers.length > 0) return
    if (!ensureCoreSettings(settings)) return

    const amount = getSubscriberAmount()

    subscribeAllBtn.disabled = true
    unsubscribeAllBtn.disabled = true
    subscribersGridEl.innerHTML = ''
    setPageStatus('Connecting...', 'connecting')
    setPrompt(`Starting ${amount} subscriber(s)...`, 'progress')
    log(`Starting ${amount} subscriber(s) to Stream Manager proxy.`)

    const results = await Promise.allSettled(
      Array.from({ length: amount }, (_, index) =>
        subscribeOne(`Subscriber ${index + 1}`, index)
      )
    )

    const successCount = results.filter((result) => result.status === 'fulfilled').length
    const failureCount = amount - successCount

    if (successCount === amount) {
      setPageStatus(`${successCount} subscribed`, 'connected')
      setPrompt(`All ${successCount} subscriber(s) connected.`, 'success')
    } else if (successCount > 0) {
      setPageStatus(`${successCount}/${amount} subscribed`, 'connected')
      setPrompt(`${successCount} connected, ${failureCount} failed.`, 'success')
    } else {
      setPageStatus('Subscribe failed', 'error')
      setPrompt('All subscriptions failed.', 'failure')
    }

    if (successCount > 0) {
      unsubscribeAllBtn.disabled = false
    } else {
      subscribeAllBtn.disabled = false
    }
  }

  async function stopAll() {
    if (subscribers.length === 0) return

    unsubscribeAllBtn.disabled = true
    const active = [...subscribers]
    subscribers = []

    await Promise.allSettled(
      active.map(async ({ label, subscriber }) => {
        try {
          await subscriber.unsubscribe()
          log(`Unsubscribed ${label}`, 'success')
        } catch (error) {
          log(`Unsubscribe failed for ${label}: ${String(error)}`, 'error')
        }
      })
    )

    subscribeAllBtn.disabled = false
    unsubscribeAllBtn.disabled = true
    setPageStatus('Idle', 'idle')
    setPrompt('All subscribers stopped.', 'idle')
  }

  function initPage() {
    settings = window.webrtcTestbed.loadSettings()
    updateConnectionInfo()

    subscribeAllBtn.addEventListener('click', () => {
      void startAll()
    })
    unsubscribeAllBtn.addEventListener('click', () => {
      void stopAll()
    })

    document.addEventListener('webrtc-testbed-settings-changed', (e) => {
      settings = e.detail
      updateConnectionInfo()
      log(
        `Settings updated: ${window.webrtcTestbed.resolveEndpointFromSettings(settings, 'whep')} (${settings.streamName})`
      )
    })

    window.addEventListener('pagehide', () => {
      void stopAll()
    })
    window.addEventListener('beforeunload', () => {
      void stopAll()
    })

    log(
      `Proxy Subscriber (Amount) loaded. amount=${getSubscriberAmount()}. Auto-starting when settings are configured.`
    )
    void startAll()
  }

  function whenReady(callback) {
    if (window.webrtcTestbed) {
      callback()
      return
    }
    document.addEventListener('webrtc-testbed-ready', () => callback(), { once: true })
  }

  whenReady(initPage)
})()
