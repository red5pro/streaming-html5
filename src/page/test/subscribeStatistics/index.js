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

  const serverSettings = (() => {
    const settings = sessionStorage.getItem('r5proServerSettings')
    try {
      return JSON.parse(settings)
    } catch (e) {
      console.error(
        'Could not read server settings from sessionstorage: ' + e.message
      )
    }
    return {}
  })()

  const configuration = (() => {
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

  const searchParams = new URLSearchParams(window.location.search)
  const query = (param, defaultValue) => {
    return searchParams.has(param) ? searchParams.get(param) : defaultValue
  }
  let endpoint = query('endpoint', undefined)
  let interval = parseInt(query('interval', 5), 10)

  let targetSubscriber

  const updateStatusFromEvent = window.red5proHandleSubscriberEvent // defined in src/template/partial/status-field-subscriber.hbs
  const instanceId = Math.floor(Math.random() * 0x10000).toString(16)
  const streamTitle = document.getElementById('stream-title')

  const statsForm = document.getElementById('stats-form')
  const endpointField = document.getElementById('endpoint-field')
  const intervalField = document.getElementById('interval-field')
  const submitButton = document.getElementById('submit-button')
  const statisticsField = document.getElementById('statistics-field')
  const bitrateField = document.getElementById('bitrate-field')
  const packetsField = document.getElementById('packets-field')
  const resolutionField = document.getElementById('resolution-field')

  endpointField.value = endpoint
  intervalField.value = interval
  streamTitle.innerText = configuration.stream1

  const protocol = serverSettings.protocol
  const isSecure = protocol === 'https'

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

  const getSocketLocationFromProtocol = () => {
    return !isSecure
      ? { protocol: 'ws', port: serverSettings.wsport }
      : { protocol: 'wss', port: serverSettings.wssport }
  }

  const defaultConfiguration = ((useVideo, useAudio) => {
    let c = {
      protocol: getSocketLocationFromProtocol().protocol,
      port: getSocketLocationFromProtocol().port,
    }
    if (!useVideo) {
      c.videoEncoding = red5prosdk.PlaybackVideoEncoder.NONE
    }
    if (!useAudio) {
      c.audioEncoding = red5prosdk.PlaybackAudioEncoder.NONE
    }
    return c
  })(configuration.useVideo, configuration.useAudio)

  // Local lifecycle notifications.
  const onSubscriberEvent = (event) => {
    const { type, data } = event
    console.log(`[Red5ProSubscriber] ${type}.`)
    updateStatusFromEvent(event)
    if (type === 'Subscribe.VideoDimensions.Change') {
      onResolutionUpdate(data.width, data.height)
    }
  }
  const onSubscribeFail = (message) => {
    console.error(`[Red5ProSubsriber] Subscribe Error :: ${message}`)
  }
  const onSubscribeSuccess = (subscriber) => {
    console.log('[Red5ProSubsriber] Subscribe Complete.')
    if (window.exposeSubscriberGlobally) {
      window.exposeSubscriberGlobally(subscriber)
    }
    if (subscriber.getType().toLowerCase() === 'rtc') {
      try {
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
  const onUnsubscribeFail = (message) => {
    console.error(`[Red5ProSubsriber] Unsubscribe Error :: ${message}`)
  }
  const onUnsubscribeSuccess = () => {
    console.log('[Red5ProSubsriber] Unsubscribe Complete.')
  }

  // Request to unsubscribe.
  const unsubscribe = async () => {
    try {
      await targetSubscriber.unsubscribe()
      targetSubscriber.off('*', onSubscriberEvent)
      onUnsubscribeSuccess()
    } catch (error) {
      const jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      onUnsubscribeFail(jsonError)
      throw new Error(jsonError)
    } finally {
      targetSubscriber = undefined
    }
  }

  const start = async (statsConfig) => {
    const { preferWhipWhep } = configuration
    const { WHEPClient, RTCSubscriber } = red5prosdk

    // Kick off.
    statsForm.classList.add('hidden')

    const rtcConfig = {
      ...configuration,
      ...defaultConfiguration,
      ...{
        protocol: getSocketLocationFromProtocol().protocol,
        port: getSocketLocationFromProtocol().port,
        subscriptionId: 'subscriber-' + instanceId,
        streamName: configuration.stream1,
        stats: statsConfig,
      },
    }

    try {
      const subscriber = preferWhipWhep ? new WHEPClient() : new RTCSubscriber()
      await subscriber.init(rtcConfig)
      targetSubscriber = subscriber
      targetSubscriber.on('*', onSubscriberEvent)
      await targetSubscriber.subscribe()
      onSubscribeSuccess(targetSubscriber)
    } catch (error) {
      var jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      console.error(
        '[Red5ProSubscriber] :: Error in subscribing - ' + jsonError
      )
      statsForm.classList.remove('hidden')
      onSubscribeFail(jsonError)
      unsubscribe()
    }
  }

  submitButton.addEventListener('click', function () {
    const newEndpoint =
      endpointField.value.length > 0 ? endpointField.value : undefined
    const newInterval = parseInt(intervalField.value, 10) * 1000
    start({
      endpoint: newEndpoint,
      interval: newInterval,
    })
  })

  // Clean up.
  let shuttingDown = false
  const shutdown = async () => {
    if (shuttingDown) return
    shuttingDown = true
    try {
      await unsubscribe()
    } catch (e) {
      // no-op
    }
    window.untrackBitrate()
  }
  window.addEventListener('pagehide', shutdown)
  window.addEventListener('beforeunload', shutdown)
})(this, document, window.red5prosdk)
