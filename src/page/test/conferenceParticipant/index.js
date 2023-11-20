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

  var updateStatusFromEvent = window.red5proHandlePublisherEvent // defined in src/template/partial/status-field-publisher.hbs
  var groupField = document.getElementById('group-field')
  var submitButton = document.getElementById('submit-button')

  var streamTitle = document.getElementById('stream-title')
  var statisticsField = document.getElementById('statistics-field')
  var bitrateField = document.getElementById('bitrate-field')
  var packetsField = document.getElementById('packets-field')
  var resolutionField = document.getElementById('resolution-field')
  var conferenceVideo = document.getElementById('red5pro-conference')

  var groupName
  var participant

  var protocol = serverSettings.protocol
  var isSecure = protocol == 'https'
  function getSocketLocationFromProtocol() {
    return !isSecure
      ? { protocol: 'ws', port: serverSettings.wsport }
      : { protocol: 'wss', port: serverSettings.wssport }
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
    if (event.type === 'Conference.MediaStream') {
      try {
        var pc = participant.getPeerConnection()
        window.trackBitrate(pc, onBitrateUpdate, onResolutionUpdate, true)
        statisticsField.classList.remove('hidden')
      } catch (e) {
        // no tracking for you!
      }
      conferenceVideo.srcObject = event.data.stream
    } else if (
      event.type === 'WebRTC.Socket.Message' ||
      event.type === 'WebRTC.DataChannel.Message'
    ) {
      try {
        var data = JSON.parse(event.data.message.data)
        if (hasGroupStream(data.streams || data.data.streams)) {
          showGroupStream()
        } else {
          removeGroupStream()
        }
      } catch (e) {
        console.warn(e)
      }
    }
  }
  function onPublishFail(message) {
    console.error('[Red5ProPublisher] Publish Error :: ' + message)
    submitButton.disabled = false
  }
  function onPublishSuccess() {
    console.log('[Red5ProPublisher] Publish Complete.')
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

  function unpublish() {
    if (typeof conferenceVideo.srcObject !== 'undefined') {
      conferenceVideo.srcObject.getTracks().forEach(function (track) {
        track.stop()
      })
    }
    return new Promise(function (resolve, reject) {
      var publisher = participant
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

  function hasGroupStream(streams) {
    var i = streams ? streams.length : 0
    while (--i > -1) {
      if (streams[i].stream === groupName) {
        return true
      }
    }
    return false
  }

  function showGroupStream() {
    conferenceVideo.classList.remove('hidden')
    document.getElementById('red5pro-publisher').classList.add('minimized')
  }

  function removeGroupStream() {
    document.getElementById('red5pro-publisher').classList.remove('minimized')
    conferenceVideo.classList.add('hidden')
  }

  var config = Object.assign(
    {},
    configuration,
    {
      streamMode: configuration.recordBroadcast ? 'record' : 'live',
    },
    getAuthenticationParams(),
    getUserMediaConfiguration()
  )

  var rtcConfig = Object.assign({}, config, {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port,
    streamName: config.stream1,
    autoGenerateMediaStream: true,
  })

  var provision = {
    guid: undefined,
    context: undefined,
    name: undefined,
    level: 0,
    isRestricted: false,
    parameters: {
      group: 'webrtc',
      audiotracks: 3,
      videotracks: 1,
    },
    restrictions: [],
    primaries: [],
    secondaries: [],
  }

  function postProvision(groupName, context) {
    provision = Object.assign(provision, {
      guid: context,
      context: context,
      name: groupName,
    })
    var host = rtcConfig.host
    var port = serverSettings.httpport
    var baseUrl = protocol + '://' + host + ':' + port
    var provisionUrl = baseUrl + '/cluster/api?action=provision.create'
    return new Promise(function (resolve, reject) {
      fetch(provisionUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ provisions: [provision] }),
      })
        .then(function (res) {
          if (res.status === 200) {
            resolve(true)
          }
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }

  function startParticipant(config) {
    new red5prosdk.RTCConferenceParticipant()
      .init(config)
      .then(function (publisher) {
        streamTitle.innerText = configuration.stream1
        participant = publisher
        participant.on('*', onPublisherEvent)
        return participant.publish()
      })
      .then(function () {
        onPublishSuccess(participant)
      })
      .catch(function (error) {
        var jsonError =
          typeof error === 'string' ? error : JSON.stringify(error, null, 2)
        console.error(
          '[Red5ProPublisher] :: Error in publishing - ' + jsonError
        )
        onPublishFail(jsonError)
      })
  }

  function start() {
    if (groupField.value.length === 0) {
      console.warn('Please provide a group name.')
      return
    }
    submitButton.disabled = true
    groupName = groupField.value

    rtcConfig.groupName = groupName
    rtcConfig.app = [config.app, groupName].join('/')

    // postProvision(groupName, rtcConfig.app)
    // .then(function () {
    startParticipant(rtcConfig)
    // })
    // .catch(function (error) {
    // console.error(error)
    // })
  }

  submitButton.addEventListener('click', start)

  var shuttingDown = false
  function shutdown() {
    if (shuttingDown) return
    shuttingDown = true
    function clearRefs() {
      if (participant) {
        participant.off('*', onPublisherEvent)
      }
      participant = undefined
    }
    unpublish().then(clearRefs).catch(clearRefs)
    window.untrackBitrate()
  }
  window.addEventListener('pagehide', shutdown)
  window.addEventListener('beforeunload', shutdown)
})(this, document, window.red5prosdk)
