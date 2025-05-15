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
  var cameraSelect = document.getElementById('camera-select')
  var publishButton = document.getElementById('publish-button')
  var bitrateField = document.getElementById('bitrate-field')
  var packetsField = document.getElementById('packets-field')
  var resolutionField = document.getElementById('resolution-field')

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

  const displayServerAddress = (serverAddress, proxyAddress) => {
    addressField.classList.remove('hidden')
    proxyAddress = typeof proxyAddress === 'undefined' ? 'N/A' : proxyAddress
    addressField.innerText = `Proxy Address: ${proxyAddress} | Origin Address: ${serverAddress}`
  }

  streamTitle.innerText = configuration.stream1

  var protocol = serverSettings.protocol
  var isSecure = protocol == 'https'
  function getSocketLocationFromProtocol() {
    return !isSecure
      ? { protocol: 'ws', port: serverSettings.wsport }
      : { protocol: 'wss', port: serverSettings.wssport }
  }

  var defaultConfiguration = {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port,
    streamMode: configuration.recordBroadcast ? 'record' : 'live'
  }

  var mediaConstraints = {
    audio: configuration.useAudio
      ? configuration.mediaConstraints.audio
      : false,
    video: configuration.useVideo ? configuration.mediaConstraints.video : false
  }

  function onPublisherEvent(event) {
    console.log('[Red5ProPublisher] ' + event.type + '.')
    updateStatusFromEvent(event)
    if (event.type === 'WebRTC.Endpoint.Changed') {
      const { host } = configuration
      const { data } = event
      const { endpoint } = data
      displayServerAddress(endpoint, host)
    } else if (event.type === 'WebRTC.MediaStream.Available') {
      navigator.mediaDevices.enumerateDevices().then(function (devices) {
        listDevices(devices)
        var stream = targetPublisher.getMediaStream()
        stream.getVideoTracks().forEach(function (track) {
          cameraSelect.value = track.getSettings().deviceId
        })
      })
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
      publishButton.disabled = true
    } catch (e) {
      // no tracking for you!
    }
  }
  function onUnpublishFail(message) {
    console.error('[Red5ProPublisher] Unpublish Error :: ' + message)
  }
  function onUnpublishSuccess() {
    console.log('[Red5ProPublisher] Unpublish Complete.')
    publishButton.disabled = false
  }

  function getAuthenticationParams() {
    var auth = configuration.authentication
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

  function onCameraSelect() {
    if (!configuration.useVideo) {
      return
    }
    var selection = cameraSelect.value
    if (mediaConstraints.video && typeof mediaConstraints.video !== 'boolean') {
      mediaConstraints.video.deviceId = { exact: selection }
      delete mediaConstraints.video.frameRate
    } else {
      mediaConstraints.video = {
        deviceId: { exact: selection }
      }
    }
    updateStatistics(0, 0, 0, 0)
    statisticsField.classList.add('hidden')
    unpublish()
      .then(restart)
      .catch(function (error) {
        console.error('[Red5ProPublisher] :: Error in unpublishing - ' + error)
        restart()
      })
    publishButton.disabled = false
  }

  function onDeviceError(error) {
    console.error('Could not access devices: ' + error)
  }

  function listDevices(devices) {
    var cameras = devices.filter(function (item) {
      return item.kind === 'videoinput'
    })
    var options = cameras.map(function (camera, index) {
      return (
        '<option value="' +
        camera.deviceId +
        '">' +
        (camera.label || 'camera ' + index) +
        '</option>'
      )
    })
    cameraSelect.innerHTML = options.join(' ')
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

  const getConfiguration = () => {
    const {
      host,
      app,
      stream1,
      streamManagerAPI,
      preferWhipWhep,
      streamManagerNodeGroup: nodeGroup
    } = configuration
    const { protocol, port } = getSocketLocationFromProtocol()

    const region = getRegionIfDefined()
    const params = region
      ? {
          region,
          strict: true
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
      mediaConstraints,
      endpoint,
      streamName: stream1,
      connectionParams: {
        ...connectionParams,
        nodeGroup
      }
    }
    return rtcConfig
  }

  function startPublishSession() {
    targetPublisher
      .publish()
      .then(function () {
        onPublishSuccess(targetPublisher)
      })
      .catch(function (error) {
        var jsonError =
          typeof error === 'string' ? error : JSON.stringify(error, null, 2)
        console.error(
          '[Red5ProPublisher] :: Error in publishing - ' + jsonError
        )
        onPublishFail(jsonError)
      })
    return true
  }

  function determinePublisher() {
    const { preferWhipWhep } = configuration
    const { WHIPClient, RTCPublisher } = red5prosdk
    var rtcConfig = {
      ...getConfiguration(),
      ...{
        onGetUserMedia: function () {
          return new Promise(function (resolve, reject) {
            if (targetPublisher && targetPublisher.getMediaStream()) {
              targetPublisher
                .getMediaStream()
                .getTracks()
                .forEach(function (track) {
                  track.stop()
                })
            }
            var stream
            var constraints = mediaConstraints
            navigator.mediaDevices
              .getUserMedia(constraints)
              .then(function (mediastream) {
                stream = mediastream
                return navigator.mediaDevices.enumerateDevices()
              })
              .then(function (devices) {
                listDevices(devices)
                stream.getVideoTracks().forEach(function (track) {
                  cameraSelect.value = track.getSettings().deviceId
                })
                resolve(stream)
              })
              .catch(function (error) {
                reject(error)
              })
          })
        }
      }
    }
    const publisher = preferWhipWhep ? new WHIPClient() : new RTCPublisher()
    return publisher.init(rtcConfig)
  }

  function unpublish() {
    return new Promise(function (resolve, reject) {
      if (targetPublisher) {
        targetPublisher.off('*', onPublisherEvent)
        targetPublisher
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
      } else {
        resolve()
      }
    })
  }

  function restart() {
    determinePublisher()
      .then(function (publisher) {
        targetPublisher = publisher
        targetPublisher.on('*', onPublisherEvent)
        streamTitle.innerText = configuration.stream1
        publishButton.disabled = false
      })
      .catch(function (error) {
        console.error('Could not access devices: ' + error.message)
      })
  }

  navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then(listDevices)
      .catch(onDeviceError)
  })
  restart()

  cameraSelect.addEventListener('change', function () {
    onCameraSelect(cameraSelect.value)
  })
  publishButton.addEventListener('click', startPublishSession)

  var shuttingDown = false
  function shutdown() {
    if (shuttingDown) return
    shuttingDown = true
    function clearRefs() {
      if (targetPublisher) {
        targetPublisher.off('*', onPublisherEvent)
      }
      targetPublisher = undefined
    }
    unpublish().then(clearRefs).catch(clearRefs)
    window.untrackBitrate()
  }
  window.addEventListener('pagehide', shutdown)
  window.addEventListener('beforeunload', shutdown)
})(this, document, window.red5prosdk)
