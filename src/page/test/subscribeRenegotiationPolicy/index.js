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
;((window, document, red5prosdk) => {
  'use strict'

  const configuration = (function () {
    let conf = sessionStorage.getItem('r5proTestBed')
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

  let targetSubscriber
  let reconnectionAttempts = 0
  const typeSelect = document.getElementById('type-select')
  const timeoutIntervalSelect = document.getElementById(
    'timeout-interval-select'
  )
  const reconnectionAttemptsField = document.getElementById(
    'reconnection-attempts'
  )
  const subscribeButton = document.getElementById('subscribe-button')
  typeSelect.addEventListener('change', event => {
    timeoutIntervalSelect.disabled = event.target.value !== 'TIMEOUT'
  })
  timeoutIntervalSelect.disabled = typeSelect.value !== 'TIMEOUT'

  const updateStatusFromEvent = window.red5proHandleSubscriberEvent // defined in src/template/partial/status-field-subscriber.hbs
  const instanceId = Math.floor(Math.random() * 0x10000).toString(16)
  const streamTitle = document.getElementById('stream-title')
  const statisticsField = document.getElementById('statistics-field')
  const bitrateField = document.getElementById('bitrate-field')
  const packetsField = document.getElementById('packets-field')
  const resolutionField = document.getElementById('resolution-field')

  let bitrate = 0
  let packetsReceived = 0
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
    packetsReceived = p
    updateStatistics(bitrate, packetsReceived, frameWidth, frameHeight)
  }

  const onResolutionUpdate = (w, h) => {
    frameWidth = w
    frameHeight = h
    updateStatistics(bitrate, packetsReceived, frameWidth, frameHeight)
  }

  // Base configuration to extend in providing specific tech failover configurations.
  let defaultConfiguration = ((useVideo, useAudio) => {
    let c = configuration
    if (!useVideo) {
      c.videoEncoding = red5prosdk.PlaybackVideoEncoder.NONE
    }
    if (!useAudio) {
      c.audioEncoding = red5prosdk.PlaybackAudioEncoder.NONE
    }
    return c
  })(configuration.useVideo, configuration.useAudio)

  // Local lifecycle notifications.
  const onSubscriberEvent = event => {
    const { type, target, data } = event
    if (type !== 'Subscribe.Time.Update') {
      console.log('[Red5ProSubscriber] ' + type + '.')
      updateStatusFromEvent(event)
      if (event.type === 'Subscribe.VideoDimensions.Change') {
        onResolutionUpdate(data.width, data.height)
      } else if (event.type === 'Reconnect.Start') {
        reconnectionAttempts++
        reconnectionAttemptsField.innerText = reconnectionAttempts
      } else if (event.type === 'Subscribe.Start') {
        onSubscribeSuccess(target ?? targetSubscriber)
      }
    }
  }
  const onSubscribeFail = message => {
    console.error('[Red5ProSubsriber] Subscribe Error :: ' + message)
  }
  const onSubscribeSuccess = subscriber => {
    console.log('[Red5ProSubsriber] Subscribe Complete.')
    if (window.exposeSubscriberGlobally) {
      window.exposeSubscriberGlobally(subscriber)
    }
    if (subscriber.getType().toLowerCase() === 'rtc') {
      try {
        window.untrackBitrate()
        window.trackBitrate(
          subscriber.getPeerConnection(),
          onBitrateUpdate,
          onResolutionUpdate,
          true
        )
      } catch (e) {
        //
      }
    }
  }
  const onUnsubscribeFail = message => {
    console.error('[Red5ProSubsriber] Unsubscribe Error :: ' + message)
  }
  const onUnsubscribeSuccess = () => {
    console.log('[Red5ProSubsriber] Unsubscribe Complete.')
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

  // Request to unsubscribe.
  const unsubscribe = async () => {
    try {
      await targetSubscriber.unsubscribe()
      targetSubscriber.off('*', onSubscriberEvent)
      onUnsubscribeSuccess()
    } catch (error) {
      var jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      onUnsubscribeFail(jsonError)
    } finally {
      targetSubscriber = undefined
    }
  }
  const start = async () => {
    subscribeButton.disabled = true
    const { stream1: streamName } = configuration
    const { WHEPClient } = red5prosdk
    let rtcConfig = {
      ...configuration,
      ...defaultConfiguration,
      ...getAuthenticationParams(),
      streamName,
      subscriptionId: 'subscriber-' + instanceId,
      renegotiationPolicy: {
        type: typeSelect.value,
        timeoutInterval: parseInt(timeoutIntervalSelect.value, 10)
      }
    }

    try {
      streamTitle.innerText = streamName

      targetSubscriber = new WHEPClient()
      targetSubscriber.on('*', onSubscriberEvent)
      await targetSubscriber.init(rtcConfig)
      await targetSubscriber.subscribe()
      onSubscribeSuccess(targetSubscriber)
    } catch (error) {
      var jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      console.error(
        '[Red5ProSubscriber] :: Error in subscribing - ' + jsonError
      )
      onSubscribeFail(jsonError)
      subscribeButton.disabled = false
    }
  }

  // Clean up.
  let shuttingDown = false
  const shutdown = async () => {
    if (shuttingDown) return
    shuttingDown = true
    window.untrackBitrate()
    await unsubscribe()
  }
  window.addEventListener('pagehide', shutdown)
  window.addEventListener('beforeunload', shutdown)

  subscribeButton.addEventListener('click', start)
})(this, document, window.red5prosdk)
