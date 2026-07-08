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

  /** @type {WHIPClient | null} */
  let publisher = null
  /** @type {import('@/settings').Settings | null} */
  let settings = null
  /** @type {number | undefined} */
  let statsInterval
  /** @type {Map<string, RTCStats> | undefined} */
  let lastStatsResult

  const publishBtn = document.getElementById('publish-btn')
  const unpublishBtn = document.getElementById('unpublish-btn')
  const publishStatusEl = document.getElementById('publish-status')
  const connectionInfoEl = document.getElementById('connection-info')
  const promptEl = document.getElementById('prompt')
  const logEl = document.getElementById('log')

  const publisherFailureEvents = ['Publish.Fail', 'Connect.Failure', 'Publish.InvalidName']

  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search)
    return params.get(name)
  }

  function parseBoolParam(value, defaultValue) {
    if (value === null) return defaultValue
    return value !== '0' && value.toLowerCase() !== 'false'
  }

  function buildMediaConstraints() {
    const audio = parseBoolParam(getQueryParam('audio'), true)
    const videoEnabled = parseBoolParam(getQueryParam('video'), true)
    const cameraWidth = parseInt(getQueryParam('cameraWidth') || '640', 10)
    const cameraHeight = parseInt(getQueryParam('cameraHeight') || '480', 10)
    const frameRate = parseInt(getQueryParam('fr') || '24', 10)

    if (!videoEnabled) {
      return { audio, video: false }
    }

    return {
      audio,
      video: {
        width: { exact: cameraWidth },
        height: { exact: cameraHeight },
        frameRate: { exact: frameRate },
      },
    }
  }

  function buildBandwidth() {
    return {
      video: parseInt(getQueryParam('bwV') || '750', 10),
      audio: parseInt(getQueryParam('bwA') || '56', 10),
    }
  }

  function log(message, level = 'info') {
    const line = document.createElement('div')
    line.className = `log__line log__line--${level}`
    const timestamp = new Date().toISOString().split('T')[1].slice(0, 12)
    line.textContent = `[${timestamp}] ${message}`
    logEl.appendChild(line)
    logEl.scrollTop = logEl.scrollHeight
  }

  function setPublisherStatus(text, state) {
    publishStatusEl.textContent = text
    if (state !== 'unknown') {
      publishStatusEl.className = `status status--${state}`
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
    connectionInfoEl.textContent = window.webrtcTestbed.resolveEndpointFromSettings(settings, 'whip')
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

  function onPublisherEvent(event) {
    const { type } = event
    log(`[WHIP] ${type}`)

    if (type === 'Publish.Start') {
      setPublisherStatus('Publishing', 'connected')
      setPrompt('Publishing', 'success')
      publishBtn.disabled = true
      unpublishBtn.disabled = false
      const peerConnection = publisher && publisher.getPeerConnection()
      if (peerConnection) {
        startStatsInterval(peerConnection)
      }
    } else if (publisherFailureEvents.includes(type)) {
      setPublisherStatus('Publish Error', 'error')
      setPrompt(type, 'failure')
      publishBtn.disabled = false
      unpublishBtn.disabled = true
    } else if (type === 'Unpublish.Success') {
      setPublisherStatus('Publisher Idle', 'idle')
      setPrompt('Publish stopped', 'idle')
      publishBtn.disabled = false
      unpublishBtn.disabled = true
    } else {
      setPublisherStatus(type, 'unknown')
    }
  }

  function isOutboundReport(report) {
    return (
      report.type === 'outboundrtp' ||
      report.type === 'outbound-rtp' ||
      (report.type === 'ssrc' && report.bytesSent)
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

  function startStatsInterval(connection) {
    stopStatsInterval()
    lastStatsResult = undefined
    statsInterval = window.setInterval(() => {
      connection
        .getStats(null)
        .then((res) => {
          res.forEach((report) => {
            const now = report.timestamp
            if (!isOutboundReport(report)) return

            const bytes = report.bytesSent
            if (bytes === undefined) return

            if (isAudioReport(report)) {
              if (lastStatsResult && lastStatsResult.get(report.id)) {
                const previous = lastStatsResult.get(report.id)
                const bitrate = (8 * (bytes - previous.bytesSent)) / (now - previous.timestamp)
                setAudioBitrate(bitrate)
              }
            } else if (isVideoReport(report)) {
              if (lastStatsResult && lastStatsResult.get(report.id)) {
                const previous = lastStatsResult.get(report.id)
                const bitrate = (8 * (bytes - previous.bytesSent)) / (now - previous.timestamp)
                setVideoBitrate(bitrate)
              }
              if (report.frameWidth && report.frameHeight) {
                setVideoResolution(report.frameWidth, report.frameHeight)
              }
              if (report.framesPerSecond) {
                setVideoFrameRate(report.framesPerSecond)
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

  async function startPublish() {
    if (publisher) return
    if (!ensureCoreSettings(settings)) return

    publishBtn.disabled = true
    unpublishBtn.disabled = true
    setPublisherStatus('Connecting...', 'connecting')
    setPrompt('Connecting...', 'progress')

    try {
      const { streamName } = settings
      const tb = window.webrtcTestbed
      const endpoint = tb.resolveEndpointFromSettings(settings, 'whip')
      const connectionParams = tb.resolveConnectionParamsFromSettings(settings)
      const statsConfig = tb.resolveStatisticsConfigurationFromSettings(settings)
      const rtcConfiguration = tb.resolveRtcConfigurationFromSettings(settings)

      if (getQueryParam('nodeGroup')) {
        connectionParams.nodeGroup = getQueryParam('nodeGroup')
      }

      publisher = new sdk.WHIPClient()
      publisher.on('*', onPublisherEvent)

      await publisher.init({
        endpoint,
        streamName,
        mediaElementId: 'publisher-video',
        mediaConstraints: buildMediaConstraints(),
        bandwidth: buildBandwidth(),
        connectionParams,
        stats: statsConfig ?? undefined,
        rtcConfiguration,
      })
      await publisher.publish()

      setPublisherStatus('Publishing', 'connected')
      setPrompt('Publishing', 'success')
      unpublishBtn.disabled = false
      window.r5publisher = publisher
      log(`Publishing ${settings.streamName} to ${settings.host}`, 'success')
    } catch (error) {
      setPublisherStatus('Publish Error', 'error')
      setPrompt('Publish failed', 'failure')
      publishBtn.disabled = false
      unpublishBtn.disabled = true
      publisher = null
      log(`Publish failed: ${String(error)}`, 'error')
    }
  }

  async function stopPublish() {
    if (!publisher) return
    unpublishBtn.disabled = true
    try {
      await publisher.unpublish()
      log('Publish stopped', 'success')
    } catch (error) {
      log(`Unpublish failed: ${String(error)}`, 'error')
    } finally {
      stopStatsInterval()
      publisher = null
      publishBtn.disabled = false
      unpublishBtn.disabled = true
      setPublisherStatus('Publisher Idle', 'idle')
      setPrompt('Publish stopped', 'idle')
      delete window.r5publisher
    }
  }

  function initPage() {
    settings = window.webrtcTestbed.loadSettings()
    updateConnectionInfo()

    publishBtn.addEventListener('click', () => {
      void startPublish()
    })
    unpublishBtn.addEventListener('click', () => {
      void stopPublish()
    })

    document.addEventListener('webrtc-testbed-settings-changed', (e) => {
      settings = e.detail
      updateConnectionInfo()
      log(
        `Settings updated: ${window.webrtcTestbed.resolveEndpointFromSettings(settings, 'whip')} (${settings.streamName})`
      )
    })

    window.addEventListener('pagehide', () => {
      void stopPublish()
    })
    window.addEventListener('beforeunload', () => {
      void stopPublish()
    })

    log('Proxy Publisher loaded. Auto-starting publish when settings are configured.')
    void startPublish()
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
