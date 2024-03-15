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
  var addressField = document.getElementById('address-field')
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

  const displayServerAddress = (serverAddress, proxyAddress) => {
    addressField.classList.remove('hidden')
    proxyAddress = typeof proxyAddress === 'undefined' ? 'N/A' : proxyAddress
    addressField.innerText = `Proxy Address: ${proxyAddress} | Edge Address: ${serverAddress}`
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

  // Local lifecycle notifications.
  function onSubscriberEvent(event) {
    console.log('[Red5ProSubsriber] ' + event.type + '.')
    updateStatusFromEvent(event)
    if (event.type === 'WebRTC.Endpoint.Changed') {
      const { host } = configuration
      const { data } = event
      const { endpoint } = data
      displayServerAddress(endpoint, host)
    }
  }
  function onSubscribeFail(message) {
    console.error('[Red5ProSubsriber] Subscribe Error :: ' + message)
  }
  function onSubscribeSuccess(subscriber) {
    console.log('[Red5ProSubsriber] Subscribe Complete.')
    if (window.exposeSubscriberGlobally) {
      window.exposeSubscriberGlobally(subscriber)
    }
  }
  function onUnsubscribeFail(message) {
    console.error('[Red5ProSubsriber] Unsubscribe Error :: ' + message)
  }
  function onUnsubscribeSuccess() {
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
    const config = getConfiguration(streamGuid)
    const url = `${config.endpoint}.m3u8`
    var video = document.getElementById('red5pro-subscriber')
    video.classList.add('video-js')
    var videoSrc = url
    if (window.Hls.isSupported()) {
      var hls = new window.Hls()
      // bind them together
      hls.attachMedia(video)
      hls.on(window.Hls.Events.MEDIA_ATTACHED, function () {
        hls.loadSource(videoSrc)
        hls.on(window.Hls.Events.MANIFEST_PARSED, function (event, data) {
          video.play()
          video.currentTime = 1
          console.log(
            'manifest loaded, found ' + data.levels.length + ' quality level'
          )
        })
      })
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc
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

  requestABRSettings(configuration.stream1).then((settings) => {
    try {
      const { streams } = settings
      // Try to find the middle one
      let index =
        Math.floor(streams.length / 2) < -1 ? 0 : Math.floor(streams.length / 2)
      startup(streams[index].streamGuid)
    } catch (e) {
      console.error(
        'Count not properly acces ABR stream based on settings: ' +
          JSON.stringify(settings, null, 0)
      )
    }
  })

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
