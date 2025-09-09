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
  var qualitySelect = document.getElementById('quality-select')
  var qualitySubmit = document.getElementById('quality-submit')

  submitButton.addEventListener('click', submitTranscode)
  streamTitle.innerText = configuration.stream1

  function setQualitySubmitState(isPublishing) {
    if (isPublishing) {
      qualitySubmit.removeEventListener('click', setQualityAndPublish, false)
      qualitySubmit.innerText = 'Stop Publishing'
      qualitySubmit.addEventListener('click', unpublish, false)
    } else {
      qualitySubmit.removeEventListener('click', unpublish, false)
      qualitySubmit.innerText = 'Start Publishing'
      qualitySubmit.addEventListener('click', setQualityAndPublish, false)
    }
  }
  setQualitySubmitState(false)

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
    streamMode: configuration.recordBroadcast ? 'record' : 'live',
    bandwidth: {
      video: 1000,
    },
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
          token: authToken,
        }
      : undefined,
    streams: [],
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

  const displayServerAddress = (serverAddress, proxyAddress) => {
    addressField.classList.remove('hidden')
    proxyAddress = typeof proxyAddress === 'undefined' ? 'N/A' : proxyAddress
    addressField.innerText = `Proxy Address: ${proxyAddress} | Transcoder Address: ${serverAddress}`
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
    if (type === 'WebRTC.Endpoint.Changed') {
      const { host } = configuration
      const { data } = event
      const { endpoint } = data
      displayServerAddress(endpoint, host)
    }
    updateStatusFromEvent(event)
  }
  function onPublishFail(message) {
    console.error('[Red5ProPublisher] Publish Error :: ' + message)
  }
  function onPublishSuccess(publisher) {
    console.log('[Red5ProPublisher] Publish Complete.')
    setQualitySubmitState(true)
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
    setQualitySubmitState(false)
  }
  function onUnpublishSuccess() {
    console.log('[Red5ProPublisher] Unpublish Complete.')
    setQualitySubmitState(false)
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
    return {
      mediaConstraints: {
        audio: configuration.useAudio
          ? configuration.mediaConstraints.audio
          : false,
        video: configuration.useVideo
          ? {
              width: { exact: params.videoWidth },
              height: { exact: params.videoHeight },
            }
          : false,
      },
    }
  }

  const getConfiguration = (variant) => {
    const {
      host,
      streamManagerAPI,
      preferWhipWhep,
      streamManagerNodeGroup: nodeGroup,
    } = configuration
    const { protocol, port } = getSocketLocationFromProtocol()

    const { streamGuid, videoParams } = variant
    const streamName = streamGuid.split('/').pop()

    const region = getRegionIfDefined()
    const params = region
      ? {
          region,
          strict: true,
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
      ...getUserMediaConfiguration(videoParams),
      endpoint,
      streamName,
      bandwidth: {
        video: videoParams.videoBitRate / 1000,
      },
      connectionParams: {
        ...connectionParams,
        nodeGroup,
        transcode: streamName.endsWith('_1'),
      },
    }
    return rtcConfig
  }

  const startPublish = async (variant) => {
    try {
      setQualitySubmitState(true)
      const { RTCPublisher, WHIPClient } = red5prosdk
      const { preferWhipWhep, stream1 } = configuration
      const config = getConfiguration(variant)
      const publisher = preferWhipWhep ? new WHIPClient() : new RTCPublisher()
      publisher.on('*', onPublisherEvent)
      await publisher.init(config)
      await publisher.publish()
      onPublishSuccess(publisher)
      streamTitle.innerText = stream1
      targetPublisher = publisher
    } catch (error) {
      console.error(
        '[Red5ProPublisher] :: startPublish failed: ' + error
      )
      updateStatusFromEvent({
        type: red5prosdk.PublisherEventTypes.CONNECT_FAILURE,
      })
      onPublishFail(error)
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
    return transcoderPOST.streams.find((s) => s.abrLevel === 1)
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
          videoBitRate: parseInt(bitrateField.value, 10),
        },
      }
      streams.push(setting)
    }
    return streams
  }

  async function submitTranscode() {
    try {
      const {
        host,
        streamManagerUser,
        streamManagerPassword,
        streamManagerAPI: version,
        streamManagerNodeGroup: nodeGroup,
      } = configuration
      const streams = generateTranscoderPost(transcoderPOST.provisionGuid, transcoderForms)
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
      // Show controls to begin publish session.
      settingsSection.classList.add('hidden')
      qualityContainer.classList.remove('hidden')
    } catch (error) {
      const { message } = error
      console.error(
        '[Red5ProPublisher] :: Error in POST of transcode configuration: ' +
          message
      )
      updateStatusFromEvent({
        type: red5prosdk.PublisherEventTypes.CONNECT_FAILURE,
      })
      qualityContainer.classList.add('hidden')
      alert('Error in POST of transcode configuration: ' + message)
    }
  }


//  function setQualityAndPublish() {
//    start(getHighestVariant())
//  }

  function setQualityAndPublish() {
    var selectedQuality = qualitySelect.value
    var targetName = [configuration.stream1, selectedQuality].join('_')
    var i = transcoderPOST.streams.length,
      config
	const targetGuid = configuration.app + "/" + targetName;
    while (--i > -1) {
      config = transcoderPOST.streams[i]

      if (config.streamGuid === targetGuid) {
        break
      }
      config = null
    }

    if (config) {
      start(config)
    }
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
})(this, document, window.red5prosdk, window.streamManagerUtil)
