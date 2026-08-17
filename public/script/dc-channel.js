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
  'use strict'

  const sdk = window.red5prosdk
  sdk.setLogLevel('debug')

  /** @type {import('@/settings').Settings | null} */
  let settings = null

  /** @type {MessageChannel | null} */
  let publisher = null
  /** @type {RTCDataChannel | null} */
  let dataChannel = null
  /** @type {number | null} */
  let floodTimer = null
  let floodPaused = false
  /** @type {((this: RTCDataChannel, ev: Event) => void) | null} */
  let floodPauseListener = null
  let packetCounter = 0

  const $ = (id) => document.getElementById(id)
  const logEl = $('log')
  const statusEl = $('status')
  const dcStateEl = $('dcState')
  const connectionInfoEl = $('connection-info')

  function logLine(msg) {
    const ts = new Date().toISOString().substring(11, 23)
    logEl.textContent += `[${ts}] ${msg}\n`
    logEl.scrollTop = logEl.scrollHeight
    console.log(msg)
  }

  function setStatus(text, cls) {
    statusEl.textContent = text
    statusEl.className = 'pill' + (cls ? ' ' + cls : '')
  }

  function setDcState(text, cls) {
    dcStateEl.textContent = text
    dcStateEl.className = 'pill' + (cls ? ' ' + cls : '')
  }

  function ensureCoreSettings(current) {
    if (!current.host) {
      logLine('Missing host. Open Settings and configure host first.')
      return false
    }
    return true
  }

  function syncSettingsToForm() {
    if (!settings) return

    const tb = window.webrtcTestbed
    const { protocol, port } = tb.resolveConnectionFromHost(settings.host)

    $('host').value = settings.host || ''
    $('app').value = settings.app || 'live'
    $('port').value = String(port)
    $('useTls').checked = protocol === 'https'

    if (settings.streamName) {
      $('streamName').value = settings.streamName
    }
  }

  function updateConnectionInfo() {
    if (!settings || !settings.host) {
      connectionInfoEl.textContent = 'Configure host in Settings'
      return
    }

    const streamName = resolveStreamName()
    const endpointSettings = resolveEndpointSettings()
    const { host, protocol, port } = endpointSettings
    console.log('updateConnectionInfo', endpointSettings)
    const endpoint = window.webrtcTestbed.resolveEndpointFromSettings(
      { ...settings, ...endpointSettings, streamName },
      'whip'
    )
    connectionInfoEl.textContent = endpoint.replace(
      /^((https|http)?:\/\/[^:/]+):\d+(\/.*)?$/i,
      (m, protocolHost, path = '') => `${protocol}://${host}:${port}/${path}`
    )
  }

  function buildDataChannelConfig() {
    const mode = $('dcMode').value
    const name = $('dcName').value || 'red5pro'
    /** @type {Record<string, unknown>} */
    const cfg = { name }
    if (mode === 'reliable-ordered') {
      cfg.ordered = true
    } else if (mode === 'reliable-unordered') {
      cfg.ordered = false
    } else if (mode === 'max-retransmits') {
      cfg.ordered = $('dcOrderedPartial').checked
      cfg.maxRetransmits = parseInt($('dcParam').value, 10) || 0
    } else if (mode === 'max-lifetime') {
      cfg.ordered = $('dcOrderedPartial').checked
      cfg.maxPacketLifeTime = parseInt($('dcParam').value, 10) || 0
    }
    return cfg
  }

  function resolveStreamName() {
    const fromForm = $('streamName').value.trim()
    if (fromForm) return fromForm

    const fromSettings = settings?.streamName?.trim()
    if (fromSettings) return fromSettings

    const stream = 'sw_' + Date.now()
    $('streamName').value = stream
    return stream
  }

  function resolveEndpointSettings() {
    const host = $('host').value.trim()
    const port = parseInt($('port').value.trim(), 10)
    const useTls = $('useTls').checked
    const app = $('app').value.trim()
    const streamName = resolveStreamName()
    return { host, port, protocol: useTls ? 'https' : 'http', app, streamName }
  }

  function buildPublisherConfig(dcCfg) {
    const tb = window.webrtcTestbed
    const streamName = resolveStreamName()
    const endpointSettings = resolveEndpointSettings()
    const useAudio = $('useAudio').checked
    const useVideo = $('useVideo').checked
    const { port } = endpointSettings

    return {
      endpoint: tb.resolveEndpointFromSettings(
        { ...settings, ...endpointSettings, streamName },
        'whip'
      ),
      port,
      streamName,
      connectionParams: tb.resolveConnectionParamsFromSettings(settings),
      stats: tb.resolveStatisticsConfigurationFromSettings(settings) ?? undefined,
      rtcConfiguration: tb.resolveRtcConfigurationFromSettings(settings),
      includeDataChannel: true,
      dataChannelConfiguration: dcCfg,
      mediaElementId:
        useAudio && !useVideo ? 'red5pro-audio' : useVideo ? 'red5pro-video' : undefined,
      ...(useAudio || useVideo
        ? {
            mediaConstraints: {
              audio: useAudio,
              video: useVideo,
            },
          }
        : {}),
    }
  }

  function updateMediaElement() {
    const useAudio = $('useAudio').checked
    const useVideo = $('useVideo').checked
    $('red5pro-audio').setAttribute('hidden', true)
    if (useVideo) {
      $('red5pro-video').removeAttribute('hidden')
    } else {
      $('red5pro-video').setAttribute('hidden', true)
    }
    if (useAudio && !useVideo) {
      $('red5pro-audio').removeAttribute('hidden')
    }
  }

  function markDcOpen(dc) {
    setDcState('open', 'open')
    logLine(
      `DC open: ordered=${dc.ordered} maxRetransmits=${dc.maxRetransmits} maxPacketLifeTime=${dc.maxPacketLifeTime} protocol="${dc.protocol}"`
    )
    $('sendTextBtn').disabled = false
    $('floodStartBtn').disabled = false
  }

  function markDcClosed() {
    setDcState('closed', 'closed')
    $('sendTextBtn').disabled = true
    $('floodStartBtn').disabled = true
    $('floodStopBtn').disabled = true
    stopFlood()
  }

  function attachDataChannelHandlers(dc) {
    if (!dc || dc === dataChannel) return
    dataChannel = dc
    setDcState(dc.readyState, dc.readyState === 'open' ? 'open' : 'closed')
    if (dc.readyState === 'open') {
      markDcOpen(dc)
    }
    dc.addEventListener('open', () => markDcOpen(dc))
    dc.addEventListener('close', () => {
      logLine('DC closed')
      markDcClosed()
    })
    dc.addEventListener('error', (e) =>
      logLine('DC error: ' + (e.error?.message || e.message || e))
    )
    dc.addEventListener('message', (e) => {
      if (typeof e.data === 'string') {
        logLine('DC msg (string): ' + e.data)
      } else {
        logLine('DC msg (binary): ' + (e.data.byteLength ?? e.data.size) + ' bytes')
      }
    })
  }

  async function connect() {
    if (publisher) {
      logLine('Already connected; disconnect first')
      return
    }
    if (!ensureCoreSettings(settings)) return

    const dcCfg = buildDataChannelConfig()
    const config = buildPublisherConfig(dcCfg)

    const { mediaConstraints } = config
    const { WHIPClient, MessageChannel } = sdk

    if (mediaConstraints) {
      logLine('Media constraints: ' + JSON.stringify(mediaConstraints))
    } else {
      logLine('No media constraints')
    }

    logLine('Connect: endpoint=' + config.endpoint)
    logLine('DC config: ' + JSON.stringify(dcCfg))
    setStatus('connecting')
    $('connectBtn').disabled = true
    $('disconnectBtn').disabled = false
    updateMediaElement()

    try {
      publisher = mediaConstraints ? new WHIPClient() : new MessageChannel()
      publisher.on('*', (event) => {
        if (event.type === 'WebRTC.DataChannel.Available') {
          logLine('event: DataChannel.Available')
          setStatus('connected')
          const dc = publisher.getDataChannel ? publisher.getDataChannel() : null
          if (dc) attachDataChannelHandlers(dc)
          if (dc) {
            console.log(
              'DC negotiated:',
              'ordered=',
              dc.ordered,
              'maxRetransmits=',
              dc.maxRetransmits,
              'maxPacketLifeTime=',
              dc.maxPacketLifeTime
            )
          }
        } else if (event.type === 'WebRTC.DataChannel.Message') {
          const data = event.data?.message?.data
          logLine('event: DataChannel.Message ' + (typeof data === 'string' ? data : '<binary>'))
        } else if (event.type === 'Connect.Success') {
          setStatus('connected', 'open')
          logLine('event: Connect.Success')
        } else if (event.type === 'Publish.Start') {
          setStatus('publishing', 'open')
          logLine('event: Publish.Start')
          const dc = publisher.getDataChannel ? publisher.getDataChannel() : null
          if (dc && dc !== dataChannel) attachDataChannelHandlers(dc)
        } else if (
          event.type === 'Connect.Failure' ||
          event.type === 'Publish.Fail' ||
          event.type === 'WebRTC.IceConnection.Failure'
        ) {
          setStatus('failed', 'closed')
          logLine('event: ' + event.type + ' ' + (event.data ? JSON.stringify(event.data) : ''))
        } else if (
          event.type === 'WebSocket.Close' ||
          event.type === 'Connect.Close' ||
          event.type === 'Publish.Close'
        ) {
          setStatus('closed', 'closed')
          logLine('event: ' + event.type)
        }
      })
      await publisher.init(config)
      await publisher.publish()
      window.r5publisher = publisher
    } catch (e) {
      logLine('connect failed: ' + (e.message || e))
      setStatus('failed', 'closed')
      $('connectBtn').disabled = false
      $('disconnectBtn').disabled = true
      publisher = null
      delete window.r5publisher
    }
  }

  async function disconnect() {
    stopFlood()
    try {
      if (publisher) {
        await publisher.unpublish()
      }
    } catch (e) {
      logLine('unpublish error: ' + (e.message || e))
    }
    publisher = null
    dataChannel = null
    setStatus('idle')
    setDcState('closed', 'closed')
    $('connectBtn').disabled = false
    $('disconnectBtn').disabled = true
    $('sendTextBtn').disabled = true
    $('floodStartBtn').disabled = true
    $('floodStopBtn').disabled = true
    delete window.r5publisher
  }

  function sendText() {
    if (!dataChannel || dataChannel.readyState !== 'open') {
      logLine('DC not open')
      return
    }
    const text = $('textMsg').value
    if (!text) return
    const msg = JSON.stringify({ message: text, timestamp: Date.now() })
    dataChannel.send(msg)
    logLine('sent text: ' + msg)
  }

  function setFlowState(text, cls) {
    const el = $('flowState')
    el.textContent = text
    el.className = 'pill' + (cls ? ' ' + cls : '')
  }

  function detachFloodPauseListener() {
    if (floodPauseListener && dataChannel) {
      dataChannel.removeEventListener('bufferedamountlow', floodPauseListener)
    }
    floodPauseListener = null
  }

  function startFlood() {
    if (floodTimer !== null) return
    if (!dataChannel || dataChannel.readyState !== 'open') {
      logLine('DC not open')
      return
    }
    const packetSize = parseInt($('packetSize').value, 10) || 2048
    const intervalMs = parseInt($('intervalMs').value, 10) || 20
    const useBp = $('backpressure').checked
    const bpHigh = parseInt($('bpHigh').value, 10) || 1048576
    const bpLow = parseInt($('bpLow').value, 10) || 262144
    logLine(
      `flood start: size=${packetSize} interval=${intervalMs}ms backpressure=${useBp}${useBp ? ` high=${bpHigh} low=${bpLow}` : ''}`
    )
    $('floodStartBtn').disabled = true
    $('floodStopBtn').disabled = false
    floodPaused = false
    detachFloodPauseListener()
    if (useBp) {
      try {
        dataChannel.bufferedAmountLowThreshold = bpLow
      } catch (e) {
        /* read-only on some shims */
      }
      floodPauseListener = () => {
        if (floodPaused) {
          floodPaused = false
          setFlowState('running', 'open')
          logLine(`flow resumed at buffered=${dataChannel.bufferedAmount}`)
        }
      }
      dataChannel.addEventListener('bufferedamountlow', floodPauseListener)
    }
    setFlowState('running', 'open')
    floodTimer = window.setInterval(() => {
      if (!dataChannel || dataChannel.readyState !== 'open') {
        stopFlood()
        return
      }
      if (useBp) {
        if (floodPaused) {
          $('bufferedAmount').textContent = dataChannel.bufferedAmount
          return
        }
        if (dataChannel.bufferedAmount >= bpHigh) {
          floodPaused = true
          setFlowState('paused (back-pressure)', 'closed')
          logLine(`flow paused at buffered=${dataChannel.bufferedAmount} (high=${bpHigh})`)
          $('bufferedAmount').textContent = dataChannel.bufferedAmount
          return
        }
      }
      const payload = new Uint8Array(packetSize)
      for (let i = 0; i < payload.length; i++) {
        payload[i] = (packetCounter + i) & 0xff
      }
      const json = { command: 200, ts: Date.now(), packet: packetCounter++ }
      const jsonArr = new TextEncoder().encode(JSON.stringify(json))
      const dv = new DataView(new ArrayBuffer(8))
      dv.setUint32(0, 777, true)
      dv.setUint32(4, jsonArr.length, true)
      const headerArr = new Uint8Array(dv.buffer)
      const out = new Uint8Array(headerArr.length + jsonArr.length + payload.length)
      out.set(headerArr, 0)
      out.set(jsonArr, headerArr.length)
      out.set(payload, headerArr.length + jsonArr.length)
      try {
        dataChannel.send(out)
      } catch (e) {
        logLine('send failed: ' + (e.message || e))
        stopFlood()
        return
      }
      $('sentCount').textContent = packetCounter
      $('bufferedAmount').textContent = dataChannel.bufferedAmount
    }, intervalMs)
  }

  function stopFlood() {
    if (floodTimer !== null) {
      window.clearInterval(floodTimer)
      floodTimer = null
      logLine('flood stop')
    }
    detachFloodPauseListener()
    floodPaused = false
    setFlowState('idle')
    $('floodStartBtn').disabled = !(dataChannel && dataChannel.readyState === 'open')
    $('floodStopBtn').disabled = true
  }

  function updateDcParamUI() {
    const mode = $('dcMode').value
    const row = $('dcParamRow')
    const label = $('dcParamLabel')
    const param = $('dcParam')
    const ordered = $('dcOrderedPartial')
    if (mode === 'max-retransmits') {
      row.classList.remove('is-hidden')
      label.textContent = 'maxRetransmits'
      param.value = param.value || '0'
      ordered.checked = false
    } else if (mode === 'max-lifetime') {
      row.classList.remove('is-hidden')
      label.textContent = 'maxPacketLifeTime (ms)'
      param.value = param.value || '1000'
      ordered.checked = false
    } else {
      row.classList.add('is-hidden')
    }
  }

  function wireControls() {
    $('connectBtn').addEventListener('click', () => {
      void connect()
    })
    $('disconnectBtn').addEventListener('click', () => {
      void disconnect()
    })
    $('sendTextBtn').addEventListener('click', sendText)
    $('floodStartBtn').addEventListener('click', startFlood)
    $('floodStopBtn').addEventListener('click', stopFlood)
    $('dcMode').addEventListener('change', updateDcParamUI)
    $('backpressure').addEventListener('change', () => {
      $('backpressureRow').classList.toggle('is-hidden', !$('backpressure').checked)
    })

    Array.from(['streamName', 'host', 'port', 'useTls', 'app']).forEach((id) => {
      const el = $('' + id)
      if (el) {
        el.addEventListener('change', updateConnectionInfo)
      } else {
        console.error('Element not found: ' + id)
      }
    })
  }

  function initPage() {
    settings = window.webrtcTestbed.loadSettings()
    syncSettingsToForm()
    updateConnectionInfo()
    wireControls()
    updateDcParamUI()

    document.addEventListener('webrtc-testbed-settings-changed', (e) => {
      settings = e.detail
      syncSettingsToForm()
      updateConnectionInfo()
      logLine(
        `Settings updated: ${window.webrtcTestbed.resolveEndpointFromSettings(
          { ...settings, streamName: resolveStreamName() },
          'whip'
        )}`
      )
    })

    window.addEventListener('pagehide', () => {
      void disconnect()
    })
    window.addEventListener('beforeunload', () => {
      void disconnect()
    })

    setStatus('idle')
    setDcState('closed', 'closed')
    logLine('Data Channel test loaded. Configure Settings, then click Connect.')
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
