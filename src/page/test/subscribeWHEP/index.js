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

  let targetSubscriber

  const channelCheck = document.querySelector('#channel-check')
  const trickleCheck = document.querySelector('#trickle-check')
  const postCheck = document.querySelector('#post-check')
  const subscribeButton = document.querySelector('#subscribe-btn')

  const updateStatusFromEvent = window.red5proHandleSubscriberEvent // defined in src/template/partial/status-field-subscriber.hbs
  const instanceId = Math.floor(Math.random() * 0x10000).toString(16)
  const streamTitle = document.getElementById('stream-title')
  const statisticsField = document.getElementById('statistics-field')
  const bitrateField = document.getElementById('bitrate-field')
  const packetsField = document.getElementById('packets-field')
  const resolutionField = document.getElementById('resolution-field')

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

  // Determines the ports and protocols based on being served over TLS.
  const getSocketLocationFromProtocol = () => {
    return !isSecure
      ? { protocol: 'ws', port: serverSettings.wsport }
      : { protocol: 'wss', port: serverSettings.wssport }
  }

  // Base configuration to extend in providing specific tech failover configurations.
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
    if (type !== 'Subscribe.Time.Update') {
      console.log('[Red5ProSubscriber] ' + type + '.')
      updateStatusFromEvent(event)
      if (type === 'Subscribe.VideoDimensions.Change') {
        onResolutionUpdate(data.width, data.height)
      } else if (type === 'WebRTC.PeerConnection.Open') {
        try {
          window.trackBitrate(
            targetSubscriber.getPeerConnection(),
            onBitrateUpdate,
            onResolutionUpdate,
            true
          )
        } catch (e) {
          //
        }
      }
    }
  }
  const onSubscribeFail = (message) => {
    console.error('[Red5ProSubscriber] Subscribe Error :: ' + message)
  }
  const onSubscribeSuccess = (subscriber) => {
    console.log('[Red5ProSubscriber] Subscribe Complete.')
    if (window.exposeSubscriberGlobally) {
      window.exposeSubscriberGlobally(subscriber)
    }
  }
  const onUnsubscribeFail = (message) => {
    console.error('[Red5ProSubscriber] Unsubscribe Error :: ' + message)
  }
  const onUnsubscribeSuccess = () => {
    console.log('[Red5ProSubscriber] Unsubscribe Complete.')
  }

  const getAuthenticationParams = () => {
    var auth = configuration.authentication
    return auth && auth.enabled
      ? {
          connectionParams: {
            username: auth.username,
            password: auth.password,
            token: auth.token,
          },
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
      trickleCheck.disabled = false
      postCheck.disabled = false
      channelCheck.disabled = false
      subscribeButton.disabled = false
      subscribeButton.innerText = 'Subscribe'
      updateStatistics(0, 0, 0, 0)
    }
  }

  const authParams = getAuthenticationParams()
  const config = {
    ...configuration,
    ...defaultConfiguration,
    ...authParams,
    streamName: configuration.stream1,
  }

  const start = async () => {
    subscribeButton.disabled = true
    trickleCheck.disabled = true
    postCheck.disabled = true
    channelCheck.disabled = true
    try {
      const rtcConfig = {
        ...config,
        protocol: getSocketLocationFromProtocol().protocol,
        port: getSocketLocationFromProtocol().port,
        streamName: config.stream1,
        enableChannelSignaling: channelCheck.checked,
        trickleIce: trickleCheck.checked,
        postEmptyOffer: postCheck.checked,
      }
      const protocol = rtcConfig.protocol === 'ws' ? 'http' : 'https'
      const { host, port, app, streamName } = rtcConfig
      const baseUrl = `${protocol}://${host}:${port}`
      const whepUrl = `${baseUrl}/${app}/whep/endpoint/${streamName}`
      // If you want to keep all the internal default settings for a Subscriber,
      //  you would just send the `whepUrl` and reference to the target `video` element
      //  in the constructor call:
      // targetSubscriber = new red5prosdk.WHEPClient(whepUrl, document.querySelector('#red5pro-subscriber'))

      // Since we have additionally settings that may differ from the default configuration for a Subscriber
      //  we will use the API similar to an `RTCSubscriber` with empty constructor args:

      targetSubscriber = await new red5prosdk.WHEPClient().init(rtcConfig)
      targetSubscriber.on('*', onSubscriberEvent)
      await targetSubscriber.subscribe()
      streamTitle.innerText = streamName
      onSubscribeSuccess(targetSubscriber)
      subscribeButton.disabled = false
      subscribeButton.innerText = 'Unsubscribe'
    } catch (error) {
      const jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      console.error(
        '[Red5ProSubscriber] :: Error in subscribing - ' + jsonError
      )
      onSubscribeFail(jsonError)
      if (targetSubscriber) {
        targetSubscriber.off('*', onSubscriberEvent)
      }
      targetSubscriber = undefined
      subscribeButton.disabled = false
      trickleCheck.disabled = false
      postCheck.disabled = false
      channelCheck.disabled = false
    }
  }

  subscribeButton.addEventListener('click', async () => {
    if (targetSubscriber) {
      await unsubscribe()
      return
    }
    start()
  })

  // Clean up.
  let shuttingDown = false
  const shutdown = () => {
    if (shuttingDown) return
    shuttingDown = true
    window.untrackBitrate()
    unsubscribe()
  }
  window.addEventListener('pagehide', shutdown)
  window.addEventListener('beforeunload', shutdown)
})(this, document, window.red5prosdk)
