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

  var targetPublisher

  var clearStatusEvent = window.red5proClearPublisherEvent // defined in src/template/partial/status-field-publisher.hbs
  var updateStatusFromEvent = window.red5proHandlePublisherEvent // defined in src/template/partial/status-field-publisher.hbs
  var streamTitle = document.getElementById('stream-title')
  var statisticsField = document.getElementById('statistics-field')
  var addressField = document.getElementById('address-field')
  var bitrateField = document.getElementById('bitrate-field')
  var packetsField = document.getElementById('packets-field')
  var resolutionField = document.getElementById('resolution-field')
  var submitButton = document.getElementById('submit-button')
  var transcoderTypes = ['high', 'mid', 'low']
  var transcoderForms = (function (types) {
    var list = []
    var i,
      length = types.length
    for (i = 0; i < length; i++) {
      list.push(document.getElementById(['transcoder', types[i]].join('-')))
    }
    return list
  })(transcoderTypes)

  var settingsSection = document.querySelector('.settings-section')
  var qualityContainer = document.getElementById('quality-container')
  var qualitySubmit = document.getElementById('quality-submit')

  var cameraSelect = document.getElementById('camera-select')
  var micSelect = document.getElementById('mic-select')
  var sampleRateField = document.getElementById('sample-rate-field')
  var sampleSizeField = document.getElementById('sample-size-field')
  var channelField = document.getElementById('channel-field')
  var bandwidthAudioField = document.getElementById('audio-bitrate-field')
  var echoCheck = document.getElementById('echo-check')
  var noiseCheck = document.getElementById('noise-check')
  var gainCheck = document.getElementById('gain-check')

  submitButton.addEventListener('click', submitTranscode)
  streamTitle.innerText = configuration.stream1

  function setPublishState(isPublishing) {
    if (isPublishing) {
      qualityContainer.classList.add('hidden')
    } else {
      qualityContainer.classList.remove('hidden')
    }
  }
  qualitySubmit.addEventListener('click', setQualityAndPublish, false)

  var protocol = serverSettings.protocol
  var isSecure = protocol == 'https'
  function getSocketLocationFromProtocol() {
    return !isSecure
      ? { protocol: 'ws', port: serverSettings.wsport }
      : { protocol: 'wss', port: serverSettings.wssport }
  }

  streamTitle.innerText = configuration.stream1
  var defaultConfiguration = {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port,
    streamMode: configuration.recordBroadcast ? 'record' : 'live'
  }

  var auth = configuration.authentication
  var authName = auth.enabled ? auth.username : ''
  var authPass = auth.enabled ? auth.password : ''
  var authToken =
    auth.enabled && !window.isEmpty(auth.token) ? auth.token : undefined
  const { app, stream1 } = configuration
  var transcoderPOST = {
    provisionGuid: `${app}/${stream1}`,
    messageType: 'ProvisionCommand',
    credentials: auth.enabled
      ? {
          username: authName,
          password: authPass,
          token: authToken
        }
      : undefined,
    streams: []
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

  const displayServerAddress = (serverAddress, proxyAddress) => {
    addressField.classList.remove('hidden')
    proxyAddress = typeof proxyAddress === 'undefined' ? 'N/A' : proxyAddress
    addressField.innerText = `Proxy Address: ${proxyAddress} | Transcoder Address: ${serverAddress}`
  }

  var isShowingModal = false
  var constraintInfoNotices = []
  function showModal(content) {
    isShowingModal = true
    var div = document.createElement('div')
    div.classList.add('modal')
    var container = document.createElement('div')
    var button = document.createElement('a')
    var close = document.createTextNode('close')
    button.href = '#'
    button.appendChild(close)
    button.classList.add('modal-close')
    container.appendChild(button)
    container.appendChild(content)
    div.appendChild(container)
    document.body.appendChild(div)
    button.addEventListener('click', function (event) {
      event.preventDefault()
      document.body.removeChild(div)
      isShowingModal = false
      showConstraintInfo()
      return false
    })
  }
  function generateLine(text) {
    var p = document.createElement('p')
    var t = document.createTextNode(text)
    p.appendChild(t)
    return p
  }
  function contentFromConstraintInfo(info) {
    var content = document.createElement('div')
    var video
    var findDim = function (dimObject) {
      if (typeof dimObject === 'number') {
        return dimObject
      } else if (typeof dimObject === 'undefined') {
        return 'N/A'
      }
      if (typeof dimObject.exact !== 'undefined') {
        return dimObject.exact
      }
      return dimObject.min
    }
    if (info.accepted) {
      video = info.accepted.video
      content.appendChild(generateLine('Accepted!'))
      content.appendChild(document.createElement('br'))
      content.appendChild(
        generateLine('Resolution: ' + video.width + 'x' + video.height)
      )
      content.appendChild(document.createElement('br'))
      content.appendChild(generateLine('Framerate: ' + video.frameRate))
    } else if (info.constraints) {
      video = info.constraints.video
      content.appendChild(generateLine('Rejected.'))
      content.appendChild(document.createElement('br'))
      content.appendChild(
        generateLine(
          'Resolution: ' + findDim(video.width) + 'x' + findDim(video.height)
        )
      )
      content.appendChild(document.createElement('br'))
      content.appendChild(
        generateLine('Framerate: ' + findDim(video.frameRate))
      )
    }
    return content
  }
  function showConstraintInfo() {
    if (!isShowingModal && constraintInfoNotices.length > 0) {
      var info = constraintInfoNotices.shift()
      showModal(contentFromConstraintInfo(info))
    }
  }
  function showConstraintError(type, reason) {
    var content = document.createElement('div')
    content.appendChild(generateLine('Error'))
    content.appendChild(document.createElement('br'))
    content.appendChild(generateLine(type + ': ' + reason))
    showModal(content)
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
    setPublishState(true)
    try {
      var pc = publisher.getPeerConnection()
      var stream = publisher.getMediaStream()
      window.trackBitrate(pc, onBitrateUpdate)
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
    setPublishState(false)
  }
  function onUnpublishSuccess() {
    console.log('[Red5ProPublisher] Unpublish Complete.')
    setPublishState(false)
  }
  function onDeviceError(error) {
    console.error('Could not access devices: ' + error)
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

  function getUserMediaConfiguration(params) {
    var config = {
      audio: configuration.useAudio
        ? {
            autoGainControl: gainCheck.checked,
            channelCount: parseInt(channelField.value, 10),
            echoCancellation: echoCheck.checked,
            noiseSuppression: noiseCheck.checked,
            sampleRate: parseInt(sampleRateField.value, 10),
            sampleSize: parseInt(sampleSizeField.value, 10)
          }
        : false,
      video: configuration.useVideo
        ? {
            width: { exact: params.videoWidth },
            height: { exact: params.videoHeight }
          }
        : false
    }
    if (
      configuration.useVideo &&
      cameraSelect.value &&
      cameraSelect.value.length > 0
    ) {
      var v = Object.assign(config.video, {
        deviceId: { exact: cameraSelect.value }
      })
      config.video = v
    }
    if (micSelect.value && micSelect.value.length > 0) {
      config.audio.deviceId = { exact: micSelect.value }
    }
    return config
  }

  const getConfiguration = variant => {
    const {
      host,
      streamManagerAPI,
      preferWhipWhep,
      streamManagerNodeGroup: nodeGroup
    } = configuration
    const { protocol, port } = getSocketLocationFromProtocol()

    const { streamGuid, videoParams } = variant
    const streamName = streamGuid.split('/').pop()
    const stream1 = streamName

    const region = getRegionIfDefined()
    const params = region
      ? {
          region,
          strict: true
        }
      : undefined

    const httpProtocol = protocol === 'wss' ? 'https' : 'http'
    const endpoint = !preferWhipWhep
      ? `${protocol}://${host}:${port}/as/${streamManagerAPI}/proxy/ws/publish/${streamGuid}`
      : `${httpProtocol}://${host}:${port}/as/${streamManagerAPI}/proxy/whip/${streamGuid}`

    const connectionParams = params
      ? { ...params, ...getAuthenticationParams().connectionParams }
      : getAuthenticationParams().connectionParams

    const rtcConfig = {
      ...configuration,
      ...defaultConfiguration,
      mediaConstraints: getUserMediaConfiguration(videoParams),
      endpoint,
      stream1,
      bandwidth: {
        audio: parseInt(bandwidthAudioField.value, 10),
        video: videoParams.videoBitRate / 1000
      },
      connectionParams: {
        ...connectionParams,
        nodeGroup,
        transcode: true
      }
    }
    return rtcConfig
  }

  const startPublish = async variant => {
    try {
      setPublishState(true)
      const { RTCPublisher, WHIPClient } = red5prosdk
      const config = getConfiguration(variant)
      const { preferWhipWhep, stream1 } = config
      const publisher = preferWhipWhep ? new WHIPClient() : new RTCPublisher()
      publisher.on('*', onPublisherEvent)
      await publisher.init(config)
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
        type: red5prosdk.PublisherEventTypes.CONNECT_FAILURE
      })
      onPublishFail(jsonError)
    }
  }

  async function unpublish() {
    try {
      const publisher = targetPublisher
      await publisher.unpublish()
      onUnpublishSuccess()
    } catch (error) {
      var jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, 2, null)
      onUnpublishFail('Unmount Error ' + jsonError)
      throw error
    }
  }

  function getHighestVariant() {
    return transcoderPOST.streams.find(s => s.abrLevel === 1)
  }

  function start(variant) {
    let t = setTimeout(() => {
      clearTimeout(t)
      clearStatusEvent()
      onBitrateUpdate(0, 0)
      onResolutionUpdate(0, 0)
      startPublish(variant)
    }, 1000)
  }

  function setQualityAndPublish() {
    start(getHighestVariant())
  }

  function generateTranscoderPost(guid, forms) {
    var i = forms.length
    var formItem
    var bitrateField
    var widthField
    var heightField
    var setting
    var streams = []
    while (--i > -1) {
      const level = i + 1
      formItem = forms[i]
      bitrateField = formItem.getElementsByClassName('bitrate-field')[0]
      widthField = formItem.getElementsByClassName('width-field')[0]
      heightField = formItem.getElementsByClassName('height-field')[0]
      setting = {
        streamGuid: `${guid}_${level}`,
        abrLevel: level,
        videoParams: {
          videoWidth: parseInt(widthField.value, 10),
          videoHeight: parseInt(heightField.value, 10),
          videoBitRate: parseInt(bitrateField.value, 10)
        }
      }
      streams.push(setting)
    }
    return streams
  }

  // XXX nnn
  async function submitTranscode() {
    try {
      const {
        host,
        streamManagerUser,
        streamManagerPassword,
        streamManagerAPI: version,
        streamManagerNodeGroup: nodeGroup
      } = configuration
      const streams = generateTranscoderPost(
        transcoderPOST.provisionGuid,
        transcoderForms
      )
      transcoderPOST.streams = streams
      const token = await streamManagerUtil.authenticate(
        host,
        version,
        streamManagerUser,
        streamManagerPassword
      )
      const response = await streamManagerUtil.postProvision(
        host,
        version,
        nodeGroup,
        token,
        [transcoderPOST]
      )
      if (response.errorMessage) {
        if (!/Provision already exists/.exec(response.errorMessage)) {
          throw new Error(response.errorMessage)
        }
      }
      // Show controls.
      settingsSection.classList.add('hidden')
      qualityContainer.classList.remove('hidden')
      enableSettings(getHighestVariant())
    } catch (error) {
      const { message } = error
      console.error(
        '[Red5ProPublisher] :: Error in POST of transcode configuration: ' +
          message
      )
      updateStatusFromEvent({
        type: red5prosdk.PublisherEventTypes.CONNECT_FAILURE
      })
      qualityContainer.classList.add('hidden')
      alert('Error in POST of transcode configuration: ' + message)
    }
  }

  /* Custom Settings */
  function listDevices(devices) {
    var cameras = devices.filter(function (item) {
      return item.kind === 'videoinput'
    })
    var mics = devices.filter(function (item) {
      return item.kind === 'audioinput'
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
    var micOptions = mics.map(function (mic, index) {
      return (
        '<option value="' +
        mic.deviceId +
        '">' +
        (mic.label || 'mic ' + index) +
        '</option>'
      )
    })
    cameraSelect.innerHTML = options.join(' ')
    micSelect.innerHTML = micOptions.join(' ')
  }

  function clearEstablishedStream() {
    var pubElement = document.getElementById('red5pro-publisher')
    if (pubElement.srcObject) {
      pubElement.srcObject.getTracks().forEach(function (track) {
        track.stop()
      })
      return true
    }
    return false
  }

  function establishInitialStream(provision) {
    var stream
    const { videoParams } = provision
    var constraints = getUserMediaConfiguration(videoParams)
    var pubElement = document.getElementById('red5pro-publisher')
    var delay = clearEstablishedStream() ? 200 : 0
    var t = setTimeout(function () {
      clearTimeout(t)
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
          stream.getAudioTracks().forEach(function (track) {
            micSelect.value = track.getSettings().deviceId
          })
          pubElement.srcObject = stream
        })
        .catch(function (error) {
          console.error(error)
          showConstraintError(error.message, error.constraint || 'N/A')
        })
    }, delay)
  }

  function onMediaSelect() {
    if (!configuration.useVideo) {
      return
    }
    updateStatistics(0, 0, 0, 0)
    statisticsField.classList.add('hidden')
    unpublish()
      .then(restart)
      .catch(function (error) {
        console.error('[Red5ProPublisher] :: Error in unpublishing - ' + error)
        restart()
      })
  }

  function restart(provision) {
    establishInitialStream(provision || getHighestVariant())
  }

  async function enableSettings(provision) {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      listDevices(devices)
      establishInitialStream(provision)
    } catch (error) {
      onDeviceError(error)
    }
  }

  cameraSelect.addEventListener('change', onMediaSelect)
  micSelect.addEventListener('change', onMediaSelect)

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
})(this, document, window.red5prosdk, window.streamManagerUtil)
