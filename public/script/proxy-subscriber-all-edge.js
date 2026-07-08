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
  /** @type {Array<{ edge: string, subscriber: WHEPClient, videoId: string }>} */
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

  function getSmCredentials(current) {
    const adminUsername = current.streamManagerAdminUsername?.trim()
    const adminPassword = current.streamManagerAdminPassword
    if (adminUsername && adminPassword) {
      return { username: adminUsername, password: adminPassword }
    }
    if (current.useAuthentication && current.username && current.password) {
      return { username: current.username, password: current.password }
    }
    return null
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
    connectionInfoEl.textContent = `Node group: ${settings.nodeGroupName || 'default'} · Stream: ${settings.streamName}`
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
    if (!getSmCredentials(current)) {
      log(
        'Stream Manager admin credentials required. Set Admin Username and Admin Password in Stream Manager Settings, or enable Authentication.',
        'error'
      )
      return false
    }
    return true
  }

  function setEdgePrompt(promptEl, message, state) {
    promptEl.textContent = message
    promptEl.className = 'edge-subscriber__prompt'
    if (state) {
      promptEl.classList.add(`edge-subscriber__prompt--${state}`)
    }
  }

  function setEdgeStatus(statusEl, text, state) {
    statusEl.textContent = text
    if (state !== 'unknown') {
      statusEl.className = `status status--${state}`
    }
  }

  function createEdgeSubscriberBlock(edgeAddress, index) {
    const videoId = `subscriber-video-${index}`
    const block = document.createElement('article')
    block.className = 'edge-subscriber'
    block.dataset.edge = edgeAddress

    const header = document.createElement('div')
    header.className = 'edge-subscriber__header'

    const title = document.createElement('h3')
    title.className = 'edge-subscriber__title'
    title.textContent = edgeAddress

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

  function onSubscriberEvent(event, edgeAddress, ui) {
    const { type } = event
    if (type === 'Subscribe.Time.Update') return

    log(`[${edgeAddress}] ${type}`)

    if (type === 'Subscribe.Start') {
      setEdgeStatus(ui.statusEl, 'Subscribed', 'connected')
      setEdgePrompt(ui.promptEl, 'Subscribed', 'success')
    } else if (subscriberFailureEvents.includes(type)) {
      setEdgeStatus(ui.statusEl, 'Error', 'error')
      setEdgePrompt(ui.promptEl, type, 'failure')
    } else if (subscriberStopEvents.includes(type)) {
      setEdgeStatus(ui.statusEl, 'Idle', 'idle')
      setEdgePrompt(ui.promptEl, 'Stopped', 'idle')
    } else {
      setEdgeStatus(ui.statusEl, type, 'unknown')
    }
  }

  async function subscribeToEdge(edgeAddress, index) {
    const tb = window.webrtcTestbed
    const ui = createEdgeSubscriberBlock(edgeAddress, index)
    subscribersGridEl.appendChild(ui.block)

    const endpoint = tb.resolveDirectNodeEndpointForHost(edgeAddress, settings, 'whep')
    const connectionParams = tb.resolveConnectionParamsFromSettings(settings)
    const statsConfig = tb.resolveStatisticsConfigurationFromSettings(settings)
    const rtcConfiguration = tb.resolveRtcConfigurationFromSettings(settings)

    if (getQueryParam('nodeGroup')) {
      connectionParams.nodeGroup = getQueryParam('nodeGroup')
    }

    const subscriber = new sdk.WHEPClient()
    subscriber.on('*', (event) => onSubscriberEvent(event, edgeAddress, ui))

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
      subscribers.push({ edge: edgeAddress, subscriber, videoId: ui.videoId })
      log(`Subscribed to ${edgeAddress}`, 'success')
    } catch (error) {
      setEdgeStatus(ui.statusEl, 'Error', 'error')
      setEdgePrompt(ui.promptEl, 'Subscribe failed', 'failure')
      log(`Subscribe failed for ${edgeAddress}: ${String(error)}`, 'error')
      throw error
    }
  }

  async function startAll() {
    if (subscribers.length > 0) return
    if (!ensureCoreSettings(settings)) return

    const credentials = getSmCredentials(settings)
    if (!credentials) return

    subscribeAllBtn.disabled = true
    unsubscribeAllBtn.disabled = true
    subscribersGridEl.innerHTML = ''
    setPageStatus('Discovering edges...', 'connecting')
    setPrompt('Fetching edge nodes from Stream Manager...', 'progress')

    try {
      const edges = await window.webrtcTestbed.getAllEdges(
        credentials.username,
        credentials.password,
        settings
      )

      if (edges.length === 0) {
        subscribersGridEl.innerHTML =
          '<div class="subscribers-grid__empty">No in-service edge nodes found.</div>'
        setPageStatus('No edges found', 'error')
        setPrompt('No in-service edge nodes found for the configured node group.', 'failure')
        log('No in-service edge nodes found.', 'error')
        subscribeAllBtn.disabled = false
        return
      }

      log(`Discovered ${edges.length} edge node(s).`, 'success')
      setPrompt(`Subscribing to ${edges.length} edge node(s)...`, 'progress')

      const results = await Promise.allSettled(
        edges.map((edgeAddress, index) => subscribeToEdge(edgeAddress, index))
      )

      const successCount = results.filter((result) => result.status === 'fulfilled').length
      const failureCount = edges.length - successCount

      if (successCount === edges.length) {
        setPageStatus(`${successCount} subscribed`, 'connected')
        setPrompt(`All ${successCount} edge subscriber(s) connected.`, 'success')
      } else if (successCount > 0) {
        setPageStatus(`${successCount}/${edges.length} subscribed`, 'connected')
        setPrompt(`${successCount} connected, ${failureCount} failed.`, 'success')
      } else {
        setPageStatus('Subscribe failed', 'error')
        setPrompt('All edge subscriptions failed.', 'failure')
      }

      if (successCount > 0) {
        unsubscribeAllBtn.disabled = false
      } else {
        subscribeAllBtn.disabled = false
      }
    } catch (error) {
      setPageStatus('Discovery failed', 'error')
      setPrompt('Failed to discover edge nodes.', 'failure')
      log(`Edge discovery failed: ${String(error)}`, 'error')
      subscribeAllBtn.disabled = false
    }
  }

  async function stopAll() {
    if (subscribers.length === 0) return

    unsubscribeAllBtn.disabled = true
    const active = [...subscribers]
    subscribers = []

    await Promise.allSettled(
      active.map(async ({ edge, subscriber }) => {
        try {
          await subscriber.unsubscribe()
          log(`Unsubscribed from ${edge}`, 'success')
        } catch (error) {
          log(`Unsubscribe failed for ${edge}: ${String(error)}`, 'error')
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
      log(`Settings updated for node group "${settings.nodeGroupName || 'default'}".`)
    })

    window.addEventListener('pagehide', () => {
      void stopAll()
    })
    window.addEventListener('beforeunload', () => {
      void stopAll()
    })

    log('Proxy Subscriber (All Edge) loaded. Auto-starting when settings are configured.')
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
