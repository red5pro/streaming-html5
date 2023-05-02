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
An  example  of  the EULA can be found on our website at: https://account.red5pro.com/assets/LICENSE.txt.

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
  var transcoderManifest
  var selectedTranscoderToPublish

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
  var transcoderPOST = {
    meta: {
      authentication: {
        username: authName,
        password: authPass,
        token: authToken,
      },
      stream: [],
      georules: {
        regions: ['US', 'UK'],
        restricted: false,
      },
      qos: 3,
    },
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

  function displayServerAddress(serverAddress, proxyAddress) {
    proxyAddress = typeof proxyAddress === 'undefined' ? 'N/A' : proxyAddress
    addressField.innerText =
      ' Proxy Address: ' +
      proxyAddress +
      ' | ' +
      ' Transcoder Address: ' +
      serverAddress
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
    console.log('[Red5ProPublisher] ' + event.type + '.')
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

  function getUserMediaConfiguration(config) {
    return {
      mediaConstraints: {
        audio: configuration.useAudio
          ? configuration.mediaConstraints.audio
          : false,
        video: configuration.useVideo
          ? {
              width: { exact: config.properties.videoWidth },
              height: { exact: config.properties.videoHeight },
            }
          : false,
      },
    }
  }

  function determinePublisher(jsonResponse, transcoderConfig) {
    var { app, proxy, preferWhipWhep } = configuration
    var { WHIPClient, RTCPublisher } = red5prosdk
    var { params } = jsonResponse
    var host = jsonResponse.serverAddress
    var scope = jsonResponse.scope
    var name = transcoderConfig.name
    var { protocol, port } = getSocketLocationFromProtocol()

    var connectionParams = params
      ? { ...params, ...getAuthenticationParams().connectionParams }
      : getAuthenticationParams().connectionParams
    var rtcConfig = Object.assign(
      {},
      configuration,
      defaultConfiguration,
      getUserMediaConfiguration(transcoderConfig),
      {
        protocol,
        port,
        streamName: name,
        app: preferWhipWhep ? app : proxy,
        bandwidth: {
          video: transcoderConfig.properties.videoBR / 1000,
        },
        connectionParams: preferWhipWhep
          ? connectionParams
          : {
              ...connectionParams,
              host: host,
              app: scope,
            },
      }
    )
    var publisher = preferWhipWhep ? new WHIPClient() : new RTCPublisher()
    return publisher.init(rtcConfig)
  }

  function showAddress(publisher) {
    var config = publisher.getOptions()
    const { protocol, port, host, app, connectionParams } = config
    console.log(`Host = ${host} | app = ${app}`)
    if (connectionParams && connectionParams.host && connectionParams.app) {
      displayServerAddress(config.connectionParams.host, host)
      console.log('Using streammanager proxy for rtc.')
      console.log(
        'Proxy target = ' +
          config.connectionParams.host +
          ' | ' +
          'Proxy app = ' +
          config.connectionParams.app
      )
      console.log(
        `Operation over ${
          isSecure ? 'secure' : 'unsecure'
        } connection | protocol: ${protocol} | port: ${port}`
      )
    } else {
      displayServerAddress(host)
    }
  }

  function unpublish() {
    return new Promise(function (resolve, reject) {
      var publisher = targetPublisher
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

  var retryCount = 0
  var retryLimit = 3
  function respondToOrigin(response) {
    determinePublisher(response, selectedTranscoderToPublish)
      .then(function (publisherImpl) {
        streamTitle.innerText = configuration.stream1
        targetPublisher = publisherImpl
        targetPublisher.on('*', onPublisherEvent)
        showAddress(targetPublisher)
        return targetPublisher.publish()
      })
      .then(function () {
        onPublishSuccess(targetPublisher)
      })
      .catch(function (error) {
        var jsonError =
          typeof error === 'string' ? error : JSON.stringify(error, null, 2)
        console.error(
          '[Red5ProPublisher] :: Error in access of Transcoder IP: ' + jsonError
        )
        updateStatusFromEvent({
          type: red5prosdk.PublisherEventTypes.CONNECT_FAILURE,
        })
        onPublishFail(jsonError)
      })
  }

  function respondToOriginFailure(error) {
    if (retryCount++ < retryLimit) {
      var retryTimer = setTimeout(function () {
        clearTimeout(retryTimer)
        startup()
      }, 1000)
    } else {
      var jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      updateStatusFromEvent({
        type: red5prosdk.PublisherEventTypes.CONNECT_FAILURE,
      })
      console.error(
        '[Red5ProPublisher] :: Retry timeout in publishing - ' + jsonError
      )
    }
  }

  const requestOrigin = async (configuration) => {
    const { preferWhipWhep, host, app, stream1 } = configuration
    var region = getRegionIfDefined()
    if (!preferWhipWhep) {
      return streamManagerUtil.getOrigin(
        host,
        app,
        stream1,
        region,
        NaN,
        false,
        true
      )
    } else {
      // WHIP/WHEP knows how to handle proxy requests.
      return {
        serverAddress: host,
        scope: app,
        name: stream1,
        params: region ? { region, transcode: true } : { transcode: true },
      }
    }
  }

  function startup() {
    clearStatusEvent()
    onBitrateUpdate(0, 0)
    onResolutionUpdate(0, 0)
    // Kick off.
    requestOrigin(configuration)
      .then(respondToOrigin)
      .catch(respondToOriginFailure)
  }

  function generateTranscoderPost(streamName, forms) {
    var i = forms.length
    var formItem
    var bitrateField
    var widthField
    var heightField
    var setting
    var streams = []
    while (--i > -1) {
      formItem = forms[i]
      bitrateField = formItem.getElementsByClassName('bitrate-field')[0]
      widthField = formItem.getElementsByClassName('width-field')[0]
      heightField = formItem.getElementsByClassName('height-field')[0]
      setting = {
        name: [streamName, i + 1].join('_'),
        level: i + 1,
        properties: {
          videoWidth: parseInt(widthField.value, 10),
          videoHeight: parseInt(heightField.value, 10),
          videoBR: parseInt(bitrateField.value, 10),
        },
      }
      streams.push(setting)
    }
    return streams
  }

  function submitTranscode() {
    const { host, app, stream1 } = configuration
    var streams = generateTranscoderPost(configuration.stream1, transcoderForms)
    transcoderPOST.meta.stream = streams
    streamManagerUtil
      .postTranscode(host, app, stream1, transcoderPOST)
      .then(function (response) {
        if (response.errorMessage) {
          console.error(
            '[Red5ProPublisher] :: Error in POST of transcode configuration: ' +
              response.errorMessage
          )
          if (/Provision already exists/.exec(response.errorMessage)) {
            transcoderManifest = streams
            qualityContainer.classList.remove('hidden')
          } else {
            updateStatusFromEvent({
              type: red5prosdk.PublisherEventTypes.CONNECT_FAILURE,
            })
            onPublishFail(response.errorMessage)
          }
        } else {
          transcoderManifest = streams
          qualityContainer.classList.remove('hidden')
        }
      })
      .catch(function (error) {
        var jsonError =
          typeof error === 'string' ? error : JSON.stringify(error, null, 2)
        console.error(
          '[Red5ProPublisher] :: Error in POST of transcode configuration: ' +
            jsonError
        )
        updateStatusFromEvent({
          type: red5prosdk.PublisherEventTypes.CONNECT_FAILURE,
        })
        onPublishFail(jsonError)
      })
  }

  function setQualityAndPublish() {
    var selectedQuality = qualitySelect.value
    var targetName = [configuration.stream1, selectedQuality].join('_')
    var i = transcoderManifest.length,
      config
    while (--i > -1) {
      config = transcoderManifest[i]
      if (config.name === targetName) {
        break
      }
      config = null
    }

    if (config) {
      selectedTranscoderToPublish = config
      startup()
    }
  }

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
})(this, document, window.red5prosdk, window.streamManagerUtil)
