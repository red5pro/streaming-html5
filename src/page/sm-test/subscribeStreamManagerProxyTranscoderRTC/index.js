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
;(function (window, document, red5prosdk, streamManagerUtil) {
  'use strict'

  var serverSettings = (function () {
    var settings = sessionStorage.getItem('r5proServerSettings')
    try {
      return JSON.parse(settings)
    } catch (e) {
      console.error(
        'Could not read server settings from sessionstorage: ' + e.message
      )
    }
    return {}
  })()

  var configuration = (function () {
    var conf = sessionStorage.getItem('r5proTestBed')
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

  var targetSubscriber

  var updateStatusFromEvent = function (event) {
    var subTypes = red5prosdk.SubscriberEventTypes
    switch (event.type) {
      case subTypes.CONNECT_FAILURE:
      case subTypes.SUBSCRIBE_FAIL:
        shutdownVideoElement()
        break
    }
    window.red5proHandleSubscriberEvent(event) // defined in src/template/partial/status-field-subscriber.hbs
  }

  const instanceId = Math.floor(Math.random() * 0x10000).toString(16)
  var streamTitle = document.getElementById('stream-title')
  var statisticsField = document.getElementById('statistics-field')
  var bitrateField = document.getElementById('bitrate-field')
  var packetsField = document.getElementById('packets-field')
  var resolutionField = document.getElementById('resolution-field')
  var addressField = document.getElementById('address-field')
  var streamSelect = document.getElementById('stream-select')
  var streamSelectContainer = document.getElementById('stream-select-container')
  var streamSelectButton = document.getElementById('stream-select-btn')
  var protocol = serverSettings.protocol
  var isSecure = protocol === 'https'

  function getSocketLocationFromProtocol() {
    return !isSecure
      ? { protocol: 'ws', port: serverSettings.wsport }
      : { protocol: 'wss', port: serverSettings.wssport }
  }

  var defaultConfiguration = (function (useVideo, useAudio) {
    var c = {
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

  function shutdownVideoElement() {
    var videoElement = document.getElementById('red5pro-subscriber')
    if (videoElement) {
      videoElement.pause()
      videoElement.src = ''
    }
  }

  var bitrate = 0
  var packetsReceived = 0
  var frameWidth = 0
  var frameHeight = 0
  function updateStatistics(b, p, w, h) {
    statisticsField.classList.remove('hidden')
    bitrateField.innerText = b === 0 ? 'N/A' : Math.floor(b)
    packetsField.innerText = p
    resolutionField.innerText = (w || 0) + 'x' + (h || 0)
  }

  function onBitrateUpdate(b, p) {
    bitrate = b
    packetsReceived = p
    updateStatistics(bitrate, packetsReceived, frameWidth, frameHeight)
  }
  function onResolutionUpdate(w, h) {
    frameWidth = w
    frameHeight = h
    updateStatistics(bitrate, packetsReceived, frameWidth, frameHeight)
  }

  function getAuthenticationParams() {
    var auth = configuration.authentication
    var authToken =
      auth.enabled && !window.isEmpty(auth.token) ? auth.token : undefined
    var params = {}
    if (auth && auth.enabled) {
      params = {
        connectionParams: {
          username: auth.username,
          password: auth.password,
          token: auth.token,
        },
      }
      if (authToken) {
        params.connectionParams.token = authToken
      }
    }
    return params
  }

  const displayServerAddress = (serverAddress, proxyAddress) => {
    addressField.classList.remove('hidden')
    proxyAddress = typeof proxyAddress === 'undefined' ? 'N/A' : proxyAddress
    addressField.innerText = `Proxy Address: ${proxyAddress} | Edge Address: ${serverAddress}`
  }

  // Local lifecycle notifications.
  function onSubscriberEvent(event) {
    console.log('[Red5ProSubsriber] ' + event.type + '.')
    updateStatusFromEvent(event)
    if (event.type === 'Subscribe.VideoDimensions.Change') {
      onResolutionUpdate(event.data.width, event.data.height)
    } else if (event.type === 'WebRTC.Endpoint.Changed') {
      const { host } = configuration
      const { data } = event
      const { endpoint } = data
      displayServerAddress(endpoint, host)
    }
  }
  function onSubscribeFail(message) {
    setQualitySubmitState(false)
    console.error('[Red5ProSubsriber] Subscribe Error :: ' + message)
  }
  function onSubscribeSuccess(subscriber) {
    console.log('[Red5ProSubsriber] Subscribe Complete.')
    setQualitySubmitState(true)
    if (window.exposeSubscriberGlobally) {
      window.exposeSubscriberGlobally(subscriber)
    }
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
  function onUnsubscribeFail(message) {
    setQualitySubmitState(false)
    console.error('[Red5ProSubsriber] Unsubscribe Error :: ' + message)
  }
  function onUnsubscribeSuccess() {
    setQualitySubmitState(false)
    console.log('[Red5ProSubsriber] Unsubscribe Complete.')
  }

  function getRegionIfDefined() {
    var region = configuration.streamManagerRegion
    if (
      typeof region === 'string' &&
      region.length > 0 &&
      region !== 'undefined'
    ) {
      return region
    }
    return undefined
  }

  const requestABRSettings = async (streamName) => {
    const {
      host,
      app,
      streamManagerAPI: version,
      streamManagerUser: username,
      streamManagerPassword: password,
      streamManagerNodeGroup: nodeGroup,
    } = configuration
    const token = await streamManagerUtil.authenticate(host, username, password)
    const streamGuid = `${app}/${streamName}`
    const provision = await streamManagerUtil.getProvision(
      host,
      version,
      nodeGroup,
      streamGuid,
      token
    )
    return provision
  }

  const getConfiguration = (streamGuid) => {
    const {
      host,
      app,
      streamManagerAPI,
      preferWhipWhep,
      streamManagerNodeGroup: nodeGroup,
    } = configuration
    const { protocol, port } = getSocketLocationFromProtocol()
    const streamName = streamGuid.split('/').pop()

    const region = getRegionIfDefined()
    const params = region
      ? {
          region,
          strict: true,
        }
      : undefined
    const appContext = preferWhipWhep
      ? `as/${streamManagerAPI}/proxy/${app}`
      : `as/${streamManagerAPI}/proxy/ws/subscribe/${app}`

    const httpProtocol = protocol === 'wss' ? 'https' : 'http'
    const endpoint = !preferWhipWhep
      ? `${protocol}://${host}:${port}/as/${streamManagerAPI}/proxy/ws/subscribe/${streamGuid}`
      : `${httpProtocol}://${host}:${port}/as/${streamManagerAPI}/proxy/whep/${streamGuid}`

    var connectionParams = params
      ? { ...params, ...getAuthenticationParams().connectionParams }
      : getAuthenticationParams().connectionParams

    var rtcConfig = {
      ...configuration,
      ...defaultConfiguration,
      endpoint,
      protocol,
      port,
      host,
      streamName,
      app: appContext,
      subscriptionId: 'subscriber-' + instanceId,
      connectionParams: preferWhipWhep
        ? {
            ...connectionParams,
            nodeGroup,
          }
        : {
            ...connectionParams,
            nodeGroup,
            host,
            app,
          },
    }
    return rtcConfig
  }

  const startSubscriber = async (streamGuid) => {
    try {
      const { RTCSubscriber, WHEPClient } = red5prosdk
      const { preferWhipWhep, stream1 } = configuration
      const config = getConfiguration(streamGuid)
      const subscriber = preferWhipWhep ? new WHEPClient() : new RTCSubscriber()
      subscriber.on('*', onSubscriberEvent)
      await subscriber.init(config)
      await subscriber.subscribe()
      onSubscribeSuccess(subscriber)
      streamTitle.innerText = stream1
      targetSubscriber = subscriber
    } catch (error) {
      var jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      console.error(
        '[Red5ProSubscriber] :: Error in access of Edge IP: ' + jsonError
      )
      updateStatusFromEvent({
        type: red5prosdk.SubscriberEventTypes.CONNECT_FAILURE,
      })
      onSubscribeFail(jsonError)
    }
  }

  // Request to unsubscribe.
  const unsubscribe = async () => {
    try {
      var subscriber = targetSubscriber
      await subscriber.unsubscribe()
      onUnsubscribeSuccess()
    } catch (error) {
      var jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, 2, null)
      onUnsubscribeFail('Unmount Error ' + jsonError)
      throw error
    }
  }

  const startup = async (streamGuid) => {
    try {
      await unsubscribe()
    } catch (e) {
      console.warn(e)
    } finally {
      startSubscriber(streamGuid)
    }
  }

  requestABRSettings(configuration.stream1).then((provision) => {
    try {
      const { streams } = provision
      const elements = streams.map((stream) => {
        const { streamGuid } = stream
        const o = document.createElement('option')
        o.textContent = streamGuid
        o.value = streamGuid
        return o
      })
      elements.forEach((element) => streamSelect.appendChild(element))
      streamSelectContainer.classList.remove('hidden')
    } catch (e) {
      console.error(
        'Count not properly access ABR stream based on settings: ' +
          JSON.stringify(provision, null, 0)
      )
    }
  })

  function setQualityAndSubscribe() {
    if (streamSelect.value !== '-1') {
      startup(streamSelect.value)
    }
  }

  function setQualitySubmitState(isSubscribing) {
    if (isSubscribing) {
      streamSelectButton.removeEventListener(
        'click',
        setQualityAndSubscribe,
        false
      )
      streamSelectButton.innerText = 'Stop Subscribing'
      streamSelectButton.addEventListener('click', unsubscribe, false)
    } else {
      updateStatistics(0, 0, 0, 0)
      streamSelectButton.removeEventListener('click', unsubscribe, false)
      streamSelectButton.innerText = 'Start Subscribing'
      streamSelectButton.addEventListener(
        'click',
        setQualityAndSubscribe,
        false
      )
    }
  }
  setQualitySubmitState(false)

  let shuttingDown = false
  const shutdown = async () => {
    if (shuttingDown) return
    shuttingDown = true
    try {
      await unsubscribe()
    } catch (e) {
      console.error(e)
    } finally {
      if (targetSubscriber) {
        targetSubscriber.off('*', onSubscriberEvent)
      }
      targetSubscriber = undefined
    }
    window.untrackBitrate()
  }
  window.addEventListener('pagehide', shutdown)
  window.addEventListener('beforeunload', shutdown)
})(this, document, window.red5prosdk, window.streamManagerUtil)
