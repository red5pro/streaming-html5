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

  var updateStatusFromEvent = window.red5proHandlePublisherEvent // defined in src/template/partial/status-field-publisher.hbs
  var streamTitle = document.getElementById('stream-title')
  var statisticsField = document.getElementById('statistics-field')
  var addressField = document.getElementById('address-field')
  var bitrateField = document.getElementById('bitrate-field')
  var packetsField = document.getElementById('packets-field')
  var resolutionField = document.getElementById('resolution-field')
  var validationForm = document.getElementById('validation-form')
  var validationSubmit = document.getElementById('validation-submit-btn')
  var validationAddButton = document.getElementById('add-param-btn')

  var proxyLocal = window.query('local')
  var protocol = proxyLocal ? 'https' : serverSettings.protocol
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
  }

  var validationParamCount = 1
  function getNewValidationParamForm() {
    validationParamCount += 1
    var form = document.createElement('div')
    form.id = 'param-field' + validationParamCount
    form.classList.add('param-field')
    var pName = 'param-name' + validationParamCount
    var pValue = 'param-value' + validationParamCount
    var innerForm =
      '<p class="param-setting"><label for="' +
      pName +
      '">Param Name:</label>' +
      '<input type="text" id="' +
      pName +
      '" name="' +
      pName +
      '"></p>' +
      '<p class="param-setting"><label for="' +
      pValue +
      '">Param Value:</label>' +
      '<input type="text" id="' +
      pValue +
      '" name="' +
      pValue +
      '"></p>'
    form.innerHTML = innerForm
    validationForm.appendChild(form)
    validationAddButton.parentElement.removeChild(validationAddButton)
    document.getElementById(form.id).appendChild(validationAddButton)
    return form
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

  function getValidationParams() {
    var kvObject = {}
    var region = getRegionIfDefined()
    if (region) {
      kvObject.region = region
    }
    var nodes = validationForm.childNodes
    var i = 0,
      length = nodes.length
    var inputField, valueField
    var fieldCount = 1
    for (i; i < length; i++) {
      if (nodes[i].nodeType === 1) {
        inputField = document.getElementById('param-name' + fieldCount)
        valueField = document.getElementById('param-value' + fieldCount)
        if (inputField.value && valueField.value) {
          kvObject[inputField.value.trim()] = encodeURIComponent(
            valueField.value.trim()
          )
        }
        fieldCount = fieldCount + 1
      }
    }
    return kvObject
  }

  function displayServerAddress(serverAddress, proxyAddress) {
    proxyAddress = typeof proxyAddress === 'undefined' ? 'N/A' : proxyAddress
    addressField.innerText =
      ' Proxy Address: ' +
      proxyAddress +
      ' | ' +
      ' Origin Address: ' +
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
  }
  function onUnpublishSuccess() {
    console.log('[Red5ProPublisher] Unpublish Complete.')
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

  function getUserMediaConfiguration() {
    return {
      mediaConstraints: {
        audio: configuration.useAudio
          ? configuration.mediaConstraints.audio
          : false,
        video: configuration.useVideo
          ? configuration.mediaConstraints.video
          : false,
      },
    }
  }

  function determinePublisher(jsonResponse) {
    var { app, proxy, preferWhipWhep } = configuration
    var { WHIPClient, RTCPublisher } = red5prosdk
    var { params } = jsonResponse
    var host = jsonResponse.serverAddress
    var scope = jsonResponse.scope
    var name = jsonResponse.name
    var { protocol, port } = getSocketLocationFromProtocol()

    var connectionParams = params
      ? {
          ...params,
          ...getAuthenticationParams().connectionParams,
          ...getValidationParams(),
        }
      : {
          ...getAuthenticationParams().connectionParams,
          ...getValidationParams(),
        }
    var rtcConfig = Object.assign(
      {},
      configuration,
      defaultConfiguration,
      getUserMediaConfiguration(),
      {
        protocol,
        port,
        streamName: name,
        app: preferWhipWhep ? app : proxy,
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
    determinePublisher(response)
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
          '[Red5ProPublisher] :: Error in access of Origin IP: ' + jsonError
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
      return streamManagerUtil.getOrigin(host, app, stream1, region)
    } else {
      // WHIP/WHEP knows how to handle proxy requests.
      return {
        serverAddress: host,
        scope: app,
        name: stream1,
        params: region
          ? {
              region,
            }
          : undefined,
      }
    }
  }

  function startup() {
    // Kick off.
    requestOrigin(configuration)
      .then(respondToOrigin)
      .catch(respondToOriginFailure)
  }

  validationAddButton.addEventListener('click', getNewValidationParamForm)
  validationSubmit.addEventListener('click', startup)

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
