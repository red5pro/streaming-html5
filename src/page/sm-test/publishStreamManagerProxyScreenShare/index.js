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

  var targetPublisher

  var updateStatusFromEvent = window.red5proHandlePublisherEvent // defined in src/template/partial/status-field-publisher.hbs
  var streamTitle = document.getElementById('stream-title')
  var statisticsField = document.getElementById('statistics-field')
  var addressField = document.getElementById('address-field')
  var bitrateField = document.getElementById('bitrate-field')
  var packetsField = document.getElementById('packets-field')
  var resolutionField = document.getElementById('resolution-field')
  var captureButton = document.getElementById('capture-button')

  var bandwidthVideoField = document.getElementById('video-bitrate-field')
  var keyFramerateField = document.getElementById('key-framerate-field')
  var cameraWidthField = document.getElementById('camera-width-field')
  var cameraHeightField = document.getElementById('camera-height-field')
  var framerateField = document.getElementById('framerate-field')

  bandwidthVideoField.value = configuration.bandwidth.video
  keyFramerateField.value = configuration.keyFramerate || 3000
  cameraWidthField.value =
    configuration.mediaConstraints.video !== true
      ? configuration.mediaConstraints.video.width.max
      : 640
  cameraHeightField.value =
    configuration.mediaConstraints.video !== true
      ? configuration.mediaConstraints.video.height.max
      : 480
  framerateField.value =
    configuration.mediaConstraints.video !== true
      ? configuration.mediaConstraints.video.frameRate.max
      : 24

  captureButton.addEventListener('click', function () {
    startup()
  })

  var protocol = serverSettings.protocol
  const isSecure =
    protocol == 'https' || window.location.hostname === 'localhost'
  function getSocketLocationFromProtocol() {
    return !isSecure
      ? { protocol: 'ws', port: serverSettings.wsport }
      : { protocol: 'wss', port: serverSettings.wssport }
  }

  const defaultConfiguration = {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port,
    streamMode: configuration.recordBroadcast ? 'record' : 'live',
  }

  streamTitle.innerText = configuration.stream1

  const displayServerAddress = (serverAddress, proxyAddress) => {
    addressField.classList.remove('hidden')
    proxyAddress = typeof proxyAddress === 'undefined' ? 'N/A' : proxyAddress
    addressField.innerText = `Proxy Address: ${proxyAddress} | Origin Address: ${serverAddress}`
  }

  var bitrate = 0
  var packetsSent = 0
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
    packetsSent = p
    updateStatistics(bitrate, packetsSent, frameWidth, frameHeight)
  }

  function onResolutionUpdate(w, h) {
    frameWidth = w
    frameHeight = h
    updateStatistics(bitrate, packetsSent, frameWidth, frameHeight)
  }

  function onPublisherEvent(event) {
    const { type } = event
    console.log('[Red5ProPublisher] ' + type + '.')
    updateStatusFromEvent(event)
    if (type === 'WebRTC.Endpoint.Changed') {
      const { host } = configuration
      const { data } = event
      const { endpoint } = data
      displayServerAddress(endpoint, host)
    }
  }
  function onPublishFail(message) {
    console.error('[Red5ProPublisher] Publish Error :: ' + message)
  }

  function onPublishSuccess(publisher) {
    console.log('[Red5ProPublisher] Publish Complete.')
    try {
      var pc = publisher.getPeerConnection()
      var stream = publisher.getMediaStream()
      window.trackBitrate(pc, onBitrateUpdate, onResolutionUpdate)
      statisticsField.classList.remove('hidden')
      stream.getVideoTracks().forEach(function (track) {
        var settings = track.getSettings()
        onResolutionUpdate(settings.width, settings.height)
      })
    } catch (e) {
      // no tracking for you!
    }
  }
  function onUnpublishFail(message) {
    console.error('[Red5ProPublisher] Unpublish Error :: ' + message)
  }
  function onUnpublishSuccess() {
    console.log('[Red5ProPublisher] Unpublish Complete.')
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

  function getAuthenticationParams() {
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

  async function capture() {
    captureButton.disabled = true
    var vw = parseInt(cameraWidthField.value)
    var vh = parseInt(cameraHeightField.value)
    var fr = parseInt(framerateField.value)
    var config = {
      audio: false,
      video: {
        width: vw, //{ maxWidth: vw },
        height: vh, //{ maxHeight: vh },
        frameRate: fr, //{ maxFrameRate: fr }
      },
    }
    console.log(
      'Using Capture Configuration:\r\n' + JSON.stringify(config, null, 2)
    )
    // Edge has getDisplayMedia on navigator and not media devices?
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia(config)
      const audio = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      })
      stream.addTrack(audio.getAudioTracks()[0].clone())
      return stream
    } catch (error) {
      captureButton.disabled = false
      console.error(error)
      updateStatusFromEvent({
        type: 'ERROR',
        data: error.message,
      })
    }
  }

  const getConfiguration = () => {
    const {
      host,
      app,
      stream1,
      streamManagerAPI,
      preferWhipWhep,
      streamManagerNodeGroup: nodeGroup,
    } = configuration
    const { protocol, port } = getSocketLocationFromProtocol()

    const region = getRegionIfDefined()
    const params = region
      ? {
          region,
          strict: true,
        }
      : undefined

    const httpProtocol = protocol === 'wss' ? 'https' : 'http'
    const endpoint = !preferWhipWhep
      ? `${protocol}://${host}:${port}/as/${streamManagerAPI}/proxy/ws/publish/${app}/${stream1}`
      : `${httpProtocol}://${host}:${port}/as/${streamManagerAPI}/proxy/whip/${app}/${stream1}`

    const connectionParams = params
      ? { ...params, ...getAuthenticationParams().connectionParams }
      : getAuthenticationParams().connectionParams

    const rtcConfig = {
      ...configuration,
      ...defaultConfiguration,
      endpoint,
      streamName: stream1,
      bandwidth: {
        video: parseInt(bandwidthVideoField.value),
      },
      keyFramerate: parseInt(keyFramerateField.value),
      connectionParams: {
        ...connectionParams,
        nodeGroup,
      },
    }
    return rtcConfig
  }

  const setupPublisher = async (stream) => {
    try {
      const { RTCPublisher, WHIPClient } = red5prosdk
      const { preferWhipWhep, stream1 } = configuration
      const config = getConfiguration()
      const publisher = preferWhipWhep ? new WHIPClient() : new RTCPublisher()
      publisher.on('*', onPublisherEvent)
      await publisher.initWithStream(config, stream)
      await publisher.publish()
      onPublishSuccess(publisher)
      streamTitle.innerText = stream1
      targetPublisher = publisher
    } catch (error) {
      var jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      console.error(
        '[Red5ProPublisher] :: Error in access of Origin IP: ' + jsonError
      )
      updateStatusFromEvent({
        type: red5prosdk.PublisherEventTypes.CONNECT_FAILURE,
      })
      onPublishFail(jsonError)
    }
  }

  function unpublish(publisher) {
    return new Promise(function (resolve, reject) {
      publisher
        .unpublish()
        .then(function () {
          onUnpublishSuccess()
          resolve()
        })
        .catch(function (error) {
          var jsonError =
            typeof error === 'string' ? error : JSON.stringify(error, 2, null)
          onUnpublishFail('Unmount Error ' + jsonError)
          reject(error)
        })
    })
  }

  const startup = async () => {
    // Kick off.
    const stream = await capture()
    await setupPublisher(stream)
  }

  let shuttingDown = false
  const shutdown = async () => {
    if (shuttingDown) return
    shuttingDown = true
    try {
      await unpublish()
    } catch (e) {
      console.error(e)
    } finally {
      if (targetPublisher) {
        targetPublisher.off('*', onPublisherEvent)
      }
      targetPublisher = undefined
    }
    window.untrackBitrate()
  }
  window.addEventListener('pagehide', shutdown)
  window.addEventListener('beforeunload', shutdown)
})(this, document, window.red5prosdk)
