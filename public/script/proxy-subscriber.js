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

  /** @type {WHEPClient | null} */
  let subscriber = null
  /** @type {import('@/settings').Settings | null} */
  let settings = null
  /** @type {number | undefined} */
  let statsInterval
  /** @type {Map<string, RTCStats> | undefined} */
  let lastStatsResult

  const subscribeBtn = document.getElementById('subscribe-btn')
  const unsubscribeBtn = document.getElementById('unsubscribe-btn')
  const subscribeStatusEl = document.getElementById('subscribe-status')
  const connectionInfoEl = document.getElementById('connection-info')
  const promptEl = document.getElementById('prompt')
  const logEl = document.getElementById('log')

  const subscriberFailureEvents = ['Subscribe.Fail', 'Connect.Failure', 'Subscribe.InvalidName']
  const subscriberStopEvents = ['Subscribe.Stop', 'Subscribe.Play.Unpublish']

  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search)
    return params.get(name)
  }

  function log(message, level = 'info') {
    const line = document.createElement('div')
    line.className = `log__line log__line--${level}`
    const timestamp = new Date().toISOString().split('T')[1].slice(0, 12)
    line.textContent = `[${timestamp}] ${message}`
    logEl.appendChild(line)
    logEl.scrollTop = logEl.scrollHeight
  }

  function setSubscriberStatus(text, state) {
    subscribeStatusEl.textContent = text
    if (state !== 'unknown') {
      subscribeStatusEl.className = `status status--${state}`
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
    connectionInfoEl.textContent = window.webrtcTestbed.resolveEndpointFromSettings(
      settings,
      'whep'
    )
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

  function onSubscriberEvent(event) {
    const { type } = event
    if (type === 'Subscribe.Time.Update') return

    log(`[WHEP] ${type}`)

    if (type === 'Subscribe.Start') {
      setSubscriberStatus('Subscribed', 'connected')
      setPrompt('Subscribed', 'success')
      subscribeBtn.disabled = true
      unsubscribeBtn.disabled = false
      const peerConnection = subscriber && subscriber.getPeerConnection()
      if (peerConnection) {
        startStatsInterval(peerConnection)
      }
    } else if (subscriberFailureEvents.includes(type)) {
      setSubscriberStatus('Subscribe Error', 'error')
      setPrompt(type, 'failure')
      subscribeBtn.disabled = false
      unsubscribeBtn.disabled = true
    } else if (subscriberStopEvents.includes(type)) {
      setSubscriberStatus('Subscriber Idle', 'idle')
      setPrompt('Subscribe stopped', 'idle')
      subscribeBtn.disabled = false
      unsubscribeBtn.disabled = true
    } else {
      setSubscriberStatus(type, 'unknown')
    }
  }

  function isInboundReport(report) {
    return (
      report.type === 'inboundrtp' ||
      report.type === 'inbound-rtp' ||
      (report.type === 'ssrc' && report.bytesReceived)
    )
  }

  function isAudioReport(report) {
    return report.mediaType === 'audio' || report.kind === 'audio' || /AudioStream/.test(report.id)
  }

  function isVideoReport(report) {
    return report.mediaType === 'video' || report.kind === 'video' || /VideoStream/.test(report.id)
  }

  function setAudioBitrate(bitrate) {
    document.getElementById('audio-stats-label').textContent = 'Audio'
    document.getElementById('audio-bitrate').textContent = `${Math.round(bitrate)} bps`
  }

  function setAudioPacketsLost(packetsLost) {
    document.getElementById('audio-stats-label').textContent = 'Audio'
    document.getElementById('audio-packets-lost').textContent = String(packetsLost)
  }

  function setVideoBitrate(bitrate) {
    document.getElementById('video-stats-label').textContent = 'Video'
    document.getElementById('video-bitrate').textContent = `${Math.round(bitrate)} bps`
  }

  function setVideoResolution(width, height) {
    document.getElementById('video-stats-label').textContent = 'Video'
    document.getElementById('video-resolution').textContent = `${width}x${height}`
  }

  function setVideoFrameRate(frameRate) {
    document.getElementById('video-stats-label').textContent = 'Video'
    document.getElementById('video-framerate').textContent = String(frameRate)
  }

  function setVideoPacketsLost(packetsLost) {
    document.getElementById('video-stats-label').textContent = 'Video'
    document.getElementById('video-packets-lost').textContent = String(packetsLost)
  }

  function startStatsInterval(connection) {
    stopStatsInterval()
    lastStatsResult = undefined
    statsInterval = window.setInterval(() => {
      connection
        .getStats(null)
        .then((res) => {
          res.forEach((report) => {
            const now = report.timestamp
            if (!isInboundReport(report)) return

            const bytes = report.bytesReceived
            if (isAudioReport(report)) {
              if (lastStatsResult && lastStatsResult.get(report.id)) {
                const previous = lastStatsResult.get(report.id)
                const bitrate = (8 * (bytes - previous.bytesReceived)) / (now - previous.timestamp)
                setAudioBitrate(bitrate)
              }
              if (report.packetsLost !== undefined) {
                setAudioPacketsLost(report.packetsLost)
              }
            } else if (isVideoReport(report)) {
              if (lastStatsResult && lastStatsResult.get(report.id)) {
                const previous = lastStatsResult.get(report.id)
                const bitrate = (8 * (bytes - previous.bytesReceived)) / (now - previous.timestamp)
                setVideoBitrate(bitrate)
              }
              if (report.frameWidth && report.frameHeight) {
                setVideoResolution(report.frameWidth, report.frameHeight)
              }
              if (report.framesPerSecond) {
                setVideoFrameRate(report.framesPerSecond)
              }
              if (report.packetsLost !== undefined) {
                setVideoPacketsLost(report.packetsLost)
              }
            }
          })
          lastStatsResult = res
        })
        .catch((error) => {
          console.error(error)
        })
    }, 1000)
  }

  function stopStatsInterval() {
    if (statsInterval !== undefined) {
      window.clearInterval(statsInterval)
      statsInterval = undefined
    }
    lastStatsResult = undefined
  }

  async function startSubscribe() {
    if (subscriber) return
    if (!ensureCoreSettings(settings)) return

    subscribeBtn.disabled = true
    unsubscribeBtn.disabled = true
    setSubscriberStatus('Connecting...', 'connecting')
    setPrompt('Connecting...', 'progress')

    try {
      const { streamName } = settings
      const tb = window.webrtcTestbed
      const endpoint = tb.resolveEndpointFromSettings(settings, 'whep')
      const connectionParams = tb.resolveConnectionParamsFromSettings(settings)
      const statsConfig = tb.resolveStatisticsConfigurationFromSettings(settings)
      const rtcConfiguration = tb.resolveRtcConfigurationFromSettings(settings)

      subscriber = new sdk.WHEPClient()
      subscriber.on('*', onSubscriberEvent)

      // legacy support for nodeGroup query param
      if (getQueryParam('nodeGroup')) {
        connectionParams.nodeGroup = getQueryParam('nodeGroup')
      }

      await subscriber.init({
        endpoint,
        streamName,
        mediaElementId: 'subscriber-video',
        connectionParams,
        stats: statsConfig ?? undefined,
        rtcConfiguration,
      })
      await subscriber.subscribe()

      setSubscriberStatus('Subscribed', 'connected')
      setPrompt('Subscribed', 'success')
      unsubscribeBtn.disabled = false
      window.r5subscriber = subscriber
      log(`Subscribed to ${settings.streamName} from ${settings.host}`, 'success')
    } catch (error) {
      setSubscriberStatus('Subscribe Error', 'error')
      setPrompt('Subscribe failed', 'failure')
      subscribeBtn.disabled = false
      unsubscribeBtn.disabled = true
      subscriber = null
      log(`Subscribe failed: ${String(error)}`, 'error')
    }
  }

  async function stopSubscribe() {
    if (!subscriber) return
    unsubscribeBtn.disabled = true
    try {
      await subscriber.unsubscribe()
      log('Subscribe stopped', 'success')
    } catch (error) {
      log(`Unsubscribe failed: ${String(error)}`, 'error')
    } finally {
      stopStatsInterval()
      subscriber = null
      subscribeBtn.disabled = false
      unsubscribeBtn.disabled = true
      setSubscriberStatus('Subscriber Idle', 'idle')
      setPrompt('Subscribe stopped', 'idle')
      delete window.r5subscriber
    }
  }

  function initPage() {
    settings = window.webrtcTestbed.loadSettings()
    updateConnectionInfo()

    subscribeBtn.addEventListener('click', () => {
      void startSubscribe()
    })
    unsubscribeBtn.addEventListener('click', () => {
      void stopSubscribe()
    })

    document.addEventListener('webrtc-testbed-settings-changed', (e) => {
      settings = e.detail
      updateConnectionInfo()
      log(
        `Settings updated: ${window.webrtcTestbed.resolveEndpointFromSettings(settings, 'whep')} (${settings.streamName})`
      )
    })

    window.addEventListener('pagehide', () => {
      void stopSubscribe()
    })
    window.addEventListener('beforeunload', () => {
      void stopSubscribe()
    })

    log('Proxy Subscriber loaded. Auto-starting subscribe when settings are configured.')
    void startSubscribe()
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
