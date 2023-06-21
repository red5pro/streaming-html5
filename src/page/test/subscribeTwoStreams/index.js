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

  const { preferWhipWhep } = configuration
  const { WHEPClient, RTCSubscriber } = red5prosdk

  var targetSubscriber1
  var targetSubscriber2
  var statisticsFields = document.getElementsByClassName('statistics-field')

  var updateStatusFromEvent = window.red5proHandleSubscriberEvent // defined in src/template/partial/status-field-subscriber.hbs
  var instanceId = Math.floor(Math.random() * 0x10000).toString(16)
  var streamTitle1 = document.getElementById('stream1-title')
  var streamTitle2 = document.getElementById('stream2-title')

  var protocol = serverSettings.protocol
  var isSecure = protocol === 'https'

  // Determines the ports and protocols based on being served over TLS.
  function getSocketLocationFromProtocol() {
    return !isSecure
      ? { protocol: 'ws', port: serverSettings.wsport }
      : { protocol: 'wss', port: serverSettings.wssport }
  }

  // Base configuration to extend in ptoviding specific tech failover configurations.
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

  // Local lifecycle notifications.
  function onSubscriberEvent(event, field) {
    if (event.type !== 'Subscribe.Time.Update') {
      console.log('[Red5ProSubscriber] ' + event.type + '.')
      if (typeof updateStatusFromEvent === 'function') {
        updateStatusFromEvent(event, document.getElementById(field))
      }
      if (event.type === 'Subscribe.VideoDimensions.Change') {
        var index = field.indexOf(configuration.stream1) !== -1 ? 0 : 1
        var resolutionField =
          statisticsFields[1].getElementsByClassName('resolution-field')[index]
        if (resolutionField) {
          resolutionField.innerText = event.data.width + 'x' + event.data.height
        }
      }
    }
  }
  function onSubscribeFail(message) {
    console.error('[Red5ProSubsriber] Subscribe Error :: ' + message)
  }
  function onSubscribeSuccess(subscriber, id) {
    console.log('[Red5ProSubsriber] Subscribe ' + id + ' Complete.')
    ;(function (sub, index) {
      if (sub.getType().toLowerCase() === 'rtc') {
        try {
          var bitrate = 0
          var packets = 0
          var frameWidth = 0
          var frameHeight = 0
          var bitrateField =
            statisticsFields[index].getElementsByClassName('bitrate-field')[0]
          var packetsField =
            statisticsFields[index].getElementsByClassName('packets-field')[0]
          var resolutionField =
            statisticsFields[index].getElementsByClassName(
              'resolution-field'
            )[0]

          var updateStatisticsField = function (b, p, w, h) {
            statisticsFields[index].classList.remove('hidden')
            bitrateField.innerText = Math.floor(b)
            packetsField.innerText = p
            resolutionField.innerText = w + 'x' + h
          }
          var onBitrateUpdate = function (b, p) {
            bitrate = b
            packets = p
            updateStatisticsField(bitrate, packets, frameWidth, frameHeight)
          }
          var onResolutionUpdate = function (w, h) {
            frameWidth = w
            frameHeight = h
            updateStatisticsField(bitrate, packets, frameWidth, frameHeight)
          }
          window.trackBitrate(
            sub.getPeerConnection(),
            onBitrateUpdate,
            onResolutionUpdate,
            true,
            true
          )
        } catch (e) {
          //
        }
      }
    })(subscriber, id)
  }
  function onUnsubscribeFail(message) {
    console.error('[Red5ProSubsriber] Unsubscribe Error :: ' + message)
  }
  function onUnsubscribeSuccess(targ) {
    console.log('[Red5ProSubsriber] Unsubscribe ' + targ + ' Complete.')
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

  // Request to unsubscribe.
  function unsubscribe() {
    return new Promise(function (resolve, reject) {
      targetSubscriber1
        .unsubscribe()
        .then(function () {
          targetSubscriber1.off('*', sub1Event)
          targetSubscriber1 = undefined
          onUnsubscribeSuccess('stream1')
          return targetSubscriber2.unsubscribe()
        })
        .then(function () {
          targetSubscriber2.off('*', sub2Event)
          targetSubscriber2 = undefined
          onUnsubscribeSuccess('stream2')
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

  var rtcConfig = Object.assign(
    {},
    configuration,
    defaultConfiguration,
    getAuthenticationParams(),
    {
      protocol: getSocketLocationFromProtocol().protocol,
      port: getSocketLocationFromProtocol().port,
      streamName: configuration.stream1,
    }
  )

  // Request to initialization and start subscribing through failover support.
  var subscriber1 = preferWhipWhep ? new WHEPClient() : new RTCSubscriber()
  var sub1Event = function (e) {
    onSubscriberEvent(e, 'stream1-status')
  }
  var subscriber2 = preferWhipWhep ? new WHEPClient() : new RTCSubscriber()
  var sub2Event = function (e) {
    onSubscriberEvent(e, 'stream2-status')
  }

  subscriber1
    .init(
      Object.assign({}, rtcConfig, {
        streamName: configuration.stream1,
        mediaElementId: 'red5pro-stream1',
        subscriptionId: 'subscriber1-' + instanceId,
      })
    )
    .then(function (subscriberImpl) {
      streamTitle1.innerText = configuration.stream1
      targetSubscriber1 = subscriberImpl
      // Subscribe to events.
      targetSubscriber1.on('*', sub1Event)
      return targetSubscriber1.subscribe()
    })
    .then(function () {
      onSubscribeSuccess(targetSubscriber1, 0)
      //then the second sub
      return subscriber2
    })
    .then(function (sub) {
      return sub.init(
        Object.assign({}, rtcConfig, {
          streamName: configuration.stream2,
          mediaElementId: 'red5pro-stream2',
          subscriptionId: 'subscriber2-' + instanceId,
        })
      )
    })
    .then(function (subscriberImpl) {
      streamTitle2.innerText = configuration.stream2
      targetSubscriber2 = subscriberImpl
      // Subscribe to events.
      targetSubscriber2.on('*', sub2Event)
      return targetSubscriber2.subscribe()
    })
    .then(function () {
      onSubscribeSuccess(targetSubscriber2, 1)
    })
    .catch(function (error) {
      var jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      console.error(
        '[Red5ProSubscriber] :: Error in subscribing (1) - ' + jsonError
      )
      onSubscribeFail(jsonError)
    })

  // Clean up.
  window.addEventListener('beforeunload', function () {
    function clearRefs() {
      if (targetSubscriber1) {
        targetSubscriber1.off('*', sub1Event)
      }
      targetSubscriber1 = undefined

      if (targetSubscriber2) {
        targetSubscriber2.off('*', sub2Event)
      }
      targetSubscriber2 = undefined
    }
    unsubscribe().then(clearRefs).catch(clearRefs)
    window.untrackBitrate()
  })
})(this, document, window.red5prosdk)
