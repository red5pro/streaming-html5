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

  function displayServerAddress(serverAddress, proxyAddress) {
    proxyAddress = typeof proxyAddress === 'undefined' ? 'N/A' : proxyAddress
    addressField.innerText =
      ' Proxy Address: ' +
      proxyAddress +
      ' | ' +
      ' Edge Address: ' +
      serverAddress
  }

  // Local lifecycle notifications.
  function onSubscriberEvent(event) {
    console.log('[Red5ProSubsriber] ' + event.type + '.')
    updateStatusFromEvent(event)
    if (event.type === 'Subscribe.VideoDimensions.Change') {
      onResolutionUpdate(event.data.width, event.data.height)
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

  function requestABRSettings(streamName) {
    var host = configuration.host
    var app = configuration.app
    var port = serverSettings.httpport
    var baseUrl = protocol + '://' + host + ':' + port
    var apiVersion = configuration.streamManagerAPI || '4.0'
    var url =
      baseUrl +
      '/streammanager/api/' +
      apiVersion +
      '/admin/event/meta/' +
      app +
      '/' +
      streamName +
      '?action=subscribe&accessToken=' +
      configuration.streamManagerAccessToken
    return new Promise(function (resolve, reject) {
      fetch(url)
        .then(function (res) {
          if (
            res.headers.get('content-type') &&
            res.headers
              .get('content-type')
              .toLowerCase()
              .indexOf('application/json') >= 0
          ) {
            return res.json()
          } else {
            throw new TypeError('Could not properly parse response.')
          }
        })
        .then(function (json) {
          resolve(json.data)
        })
        .catch(function (error) {
          var jsonError =
            typeof error === 'string' ? error : JSON.stringify(error, null, 2)
          console.error(
            '[SubscriberStreamManagerTest] :: Error - Could not GET transcode request. ' +
              jsonError
          )
          reject(error)
        })
    })
  }

  function determineSubscriber(jsonResponse) {
    var { app, proxy, preferWhipWhep } = configuration
    var { WHEPClient, RTCSubscriber } = red5prosdk
    var { params } = jsonResponse
    var host = jsonResponse.serverAddress
    var scope = jsonResponse.scope
    var name = jsonResponse.name
    var { protocol, port } = getSocketLocationFromProtocol()
    var instanceId = Math.floor(Math.random() * 0x10000).toString(16)

    var connectionParams = params
      ? { ...params, ...getAuthenticationParams().connectionParams }
      : getAuthenticationParams().connectionParams
    var rtcConfig = Object.assign({}, configuration, defaultConfiguration, {
      protocol,
      port,
      streamName: name,
      app: preferWhipWhep ? app : proxy,
      subscriptionId: 'subscriber-' + instanceId,
      connectionParams: preferWhipWhep
        ? connectionParams
        : {
            ...connectionParams,
            host: host,
            app: scope,
          },
    })
    var subscriber = preferWhipWhep ? new WHEPClient() : new RTCSubscriber()
    return subscriber.init(rtcConfig)
  }

  function showServerAddress(publisher) {
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

  // Request to unsubscribe.
  function unsubscribe() {
    return new Promise(function (resolve, reject) {
      var subscriber = targetSubscriber
      subscriber
        .unsubscribe()
        .then(function () {
          targetSubscriber.off('*', onSubscriberEvent)
          targetSubscriber = undefined
          onUnsubscribeSuccess()
          resolve()
        })
        .catch(function (error) {
          var jsonError =
            typeof error === 'string' ? error : JSON.stringify(error, null, 2)
          onUnsubscribeFail(jsonError)
          reject(error)
        })
    })
  }

  var retryCount = 0
  var retryLimit = 3
  function respondToEdge(response) {
    determineSubscriber(response)
      .then(function (subscriberImpl) {
        streamTitle.innerText = configuration.stream1
        targetSubscriber = subscriberImpl
        // Subscribe to events.
        targetSubscriber.on('*', onSubscriberEvent)
        showServerAddress(targetSubscriber)
        return targetSubscriber.subscribe()
      })
      .then(function () {
        onSubscribeSuccess(targetSubscriber)
      })
      .catch(function (error) {
        var jsonError =
          typeof error === 'string' ? error : JSON.stringify(error, null, 2)
        console.error(
          '[Red5ProSubscriber] :: Error in subscribing - ' + jsonError
        )
        onSubscribeFail(jsonError)
      })
  }

  function respondToEdgeFailure(error) {
    if (retryCount++ < retryLimit) {
      var retryTimer = setTimeout(function () {
        clearTimeout(retryTimer)
        startup(streamSelect.value)
      }, 1000)
    } else {
      var jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      console.error(
        '[Red5ProSubscriber] :: Retry timeout in subscribing - ' + jsonError
      )
    }
  }

  const requestEdge = async (configuration, streamName) => {
    const { preferWhipWhep, host, app } = configuration
    var region = getRegionIfDefined()
    if (!preferWhipWhep) {
      return streamManagerUtil.getOrigin(host, app, streamName, region)
    } else {
      // WHIP/WHEP knows how to handle proxy requests.
      return {
        serverAddress: host,
        scope: app,
        name: streamName,
        params: region
          ? {
              region,
              strict: true,
            }
          : undefined,
      }
    }
  }

  const startup = async (selectedStreamVariantName) => {
    try {
      await unsubscribe()
    } catch (e) {
      console.warn(e)
    } finally {
      // Kick off.
      requestEdge(configuration, selectedStreamVariantName)
        .then(respondToEdge)
        .catch(respondToEdgeFailure)
    }
  }

  requestABRSettings(configuration.stream1).then(function (settings) {
    try {
      var streams = settings.meta.stream
      var i,
        length = streams.length
      for (i = 0; i < length; i++) {
        var o = document.createElement('option')
        o.textContent = streams[i].name
        streamSelect.appendChild(o)
      }
      streamSelectContainer.classList.remove('hidden')
    } catch (e) {
      console.error(
        'Count not properly acces ABR stream based on settings: ' +
          JSON.stringify(settings, null, 0)
      )
    }
  })

  function setQualityAndSubscribe() {
    if (streamSelect.value !== 'Select...') {
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

  // Clean up.
  var shuttingDown = false
  function shutdown() {
    if (shuttingDown) return
    shuttingDown = true
    function clearRefs() {
      if (targetSubscriber) {
        targetSubscriber.off('*', onSubscriberEvent)
      }
      targetSubscriber = undefined
    }
    unsubscribe().then(clearRefs).catch(clearRefs)
    window.untrackBitrate()
  }
  window.addEventListener('pagehide', shutdown)
  window.addEventListener('beforeunload', shutdown)
})(this, document, window.red5prosdk, window.streamManagerUtil)
