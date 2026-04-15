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
;(function (window, document, red5prosdk) {
  'use strict'

  let configuration = (function () {
    const conf = sessionStorage.getItem('r5proTestBed')
    try {
      return JSON.parse(conf)
    } catch (e) {
      console.error(
        'Could not read testbed configuration from sessionstorage: ' + e.message
      )
    }
    return {}
  })()
  red5prosdk.setLogLevel(
    configuration.verboseLogging
      ? red5prosdk.LOG_LEVELS.TRACE
      : red5prosdk.LOG_LEVELS.WARN
  )

  const STATES = {
    IDLE: 'idle',
    ESTABLISHING: 'establishing',
    PUBLISHED: 'published',
    UNPUBLISHED: 'unpublished'
  }

  let targetPublisher
  let state = STATES.IDLE

  const updateStatusFromEvent = window.red5proHandlePublisherEvent // defined in src/template/partial/status-field-publisher.hbs
  const streamTitle = document.getElementById('stream-title')
  const statisticsField = document.getElementById('statistics-field')
  const reconnectEnabledCheckbox = document.getElementById(
    'reconnect-enabled-checkbox'
  )
  const timeoutDelaySelect = document.getElementById('timeout-delay-select')
  const maximumReconnectAttemptsSelect = document.getElementById(
    'maximum-reconnect-attempts-select'
  )
  const publishButton = document.getElementById('publish-button')
  const reconnectEnabledField = document.getElementById('reconnect-enabled')
  const bitrateField = document.getElementById('bitrate-field')
  const packetsField = document.getElementById('packets-field')
  const resolutionField = document.getElementById('resolution-field')

  let bitrate = 0
  let packetsSent = 0
  let frameWidth = 0
  let frameHeight = 0

  const updateStatistics = (b, p, w, h) => {
    statisticsField.classList.remove('hidden')
    bitrateField.innerText = b === 0 ? 'N/A' : Math.floor(b)
    packetsField.innerText = p
    resolutionField.innerText = (w || 0) + 'x' + (h || 0)
  }

  const onBitrateUpdate = (b, p) => {
    bitrate = b
    packetsSent = p
    updateStatistics(bitrate, packetsSent, frameWidth, frameHeight)
  }

  const onResolutionUpdate = (w, h) => {
    frameWidth = w
    frameHeight = h
    updateStatistics(bitrate, packetsSent, frameWidth, frameHeight)
  }

  streamTitle.innerText = configuration.stream1

  let defaultConfiguration = {
    streamMode: configuration.recordBroadcast ? 'record' : 'live'
  }

  const mediaConstraints = {
    audio: configuration.useAudio
      ? configuration.mediaConstraints.audio
      : false,
    video: configuration.useVideo ? configuration.mediaConstraints.video : false
  }

  const updateState = state => {
    let disabled = true
    let label = 'Publish'
    switch (state) {
      default:
      case STATES.IDLE:
        disabled = false
        label = 'Publish'
        break
      case STATES.ESTABLISHING:
        disabled = true
        label = 'Establishing...'
        break
      case STATES.PUBLISHED:
        disabled = false
        label = 'Unpublish'
        break
      case STATES.UNPUBLISHED:
        disabled = false
        label = 'Publish'
        break
    }
    publishButton.disabled = disabled
    publishButton.innerText = label
    const selectAndInputFields = Array.from(
      document.querySelectorAll('.settings-field .control')
    )
    selectAndInputFields.forEach(field => {
      field.disabled = state === STATES.PUBLISHED
    })
  }

  const onPublisherEvent = event => {
    const { type } = event
    console.log('[Red5ProPublisher] ' + type + '.')
    updateStatusFromEvent(event)
    if (type === 'WebRTC.PeerConnection.Open') {
      try {
        const pc = targetPublisher.getPeerConnection()
        const stream = targetPublisher.getMediaStream()
        window.trackBitrate(pc, onBitrateUpdate, onResolutionUpdate)
        statisticsField.classList.remove('hidden')
        stream.getVideoTracks().forEach(track => {
          var settings = track.getSettings()
          onResolutionUpdate(settings.width, settings.height)
        })
      } catch (e) {
        // no tracking for you!
      }
    }
  }
  const onPublishFail = message => {
    console.error('[Red5ProPublisher] Publish Error :: ' + message)
  }
  const onPublishSuccess = publisher => {
    console.log('[Red5ProPublisher] Publish Complete.')
  }
  const onUnpublishFail = message => {
    console.error('[Red5ProPublisher] Unpublish Error :: ' + message)
  }
  const onUnpublishSuccess = () => {
    console.log('[Red5ProPublisher] Unpublish Complete.')
  }

  const getAuthenticationParams = () => {
    const auth = configuration.authentication
    return auth && auth.enabled
      ? {
          connectionParams: {
            username: auth.username,
            password: auth.password,
            token: auth.token
          }
        }
      : {}
  }

  const startPublishSession = async mediaStream => {
    state = STATES.ESTABLISHING
    updateState(state)
    const { stream1: streamName } = configuration
    const { WHIPClient } = red5prosdk
    const rtcConfig = {
      ...configuration,
      ...defaultConfiguration,
      ...getAuthenticationParams(),
      streamName,
      reconnect: {
        enabled: reconnectEnabledCheckbox.checked,
        timeoutDelay: parseInt(timeoutDelaySelect.value),
        maximumReconnectAttempts: parseInt(maximumReconnectAttemptsSelect.value)
      }
    }
    try {
      targetPublisher = new WHIPClient()
      targetPublisher.on('*', onPublisherEvent)
      await targetPublisher.initWithStream(rtcConfig, mediaStream)
      await targetPublisher.publish()
      onPublishSuccess(targetPublisher)
      state = STATES.PUBLISHED
      updateState(state)
      reconnectEnabledField.innerText = rtcConfig.reconnect.enabled
        ? 'Yes'
        : 'No'
    } catch (error) {
      var jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      console.error(jsonError)
      onPublishFail(jsonError)
      reconnectEnabledField.innerText = 'No'
      state = STATES.IDLE
      updateState(state)
    }
  }

  const unpublish = async () => {
    state = STATES.UNPUBLISHING
    updateState(state)
    try {
      if (targetPublisher) {
        await targetPublisher.unpublish()
        targetPublisher.off('*', onPublisherEvent)
        onUnpublishSuccess()
      }
    } catch (error) {
      var jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, 2, null)
      onUnpublishFail('Unmount Error ' + jsonError)
    } finally {
      targetPublisher = undefined
      reconnectEnabledField.innerText = 'Pending'
      state = STATES.IDLE
      updateState(state)
      updateStatistics(0, packetsSent, frameWidth, frameHeight)
    }
  }

  const start = async () => {
    updateState(state)
    const mediaStream = await navigator.mediaDevices.getUserMedia(
      mediaConstraints
    )
    document.querySelector('#red5pro-publisher').srcObject = mediaStream

    timeoutDelaySelect.value = 3000
    maximumReconnectAttemptsSelect.value = 10

    publishButton.addEventListener('click', () => {
      if (state === STATES.IDLE) {
        startPublishSession(mediaStream)
      } else {
        unpublish()
      }
    })
  }

  let shuttingDown = false
  const shutdown = async () => {
    if (shuttingDown) return
    shuttingDown = true
    window.untrackBitrate()
    await unpublish()
  }
  window.addEventListener('pagehide', shutdown)
  window.addEventListener('beforeunload', shutdown)

  start()
})(this, document, window.red5prosdk)
