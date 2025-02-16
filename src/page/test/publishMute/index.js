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
  //  var muteAudioButton = document.getElementById('mute-audio-button');
  //  var muteVideoButton = document.getElementById('mute-video-button');
  var muteAudioButton2 = document.getElementById('mute-audio2-button')
  var muteVideoButton2 = document.getElementById('mute-video2-button')
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

  var protocol = serverSettings.protocol
  function getSocketLocationFromProtocol() {
    return window.getSocketProtocolPort(
      protocol,
      serverSettings,
      configuration.usePortMux
    )
  }

  var defaultConfiguration = {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port,
    streamMode: configuration.recordBroadcast ? 'record' : 'live',
  }

  function addMuteListener(publisher) {
    // Favoring the client mute functionality over the legacy server mute.
    /**
    muteAudioButton.addEventListener('click', function () {
      var wasMuted = muteAudioButton.innerText === 'Unmute Audio (Server)';
      muteAudioButton.innerText = wasMuted ? 'Mute Audio (Server)' : 'Unmute Audio (Server)';
      if (wasMuted) {
        publisher.unmuteAudio();
      }
      else {
        publisher.muteAudio();
      }
    });
    muteVideoButton.addEventListener('click', function () {
      var wasMuted = muteVideoButton.innerText === 'Unmute Video (Server)';
      muteVideoButton.innerText = wasMuted ? 'Mute Video (Server)' : 'Unmute Video (Server)';
      var videoElement = document.getElementById('red5pro-publisher');
      if (wasMuted) {
        publisher.unmuteVideo();
        var connection = publisher.getPeerConnection();
        navigator.mediaDevices.getUserMedia(getUserMediaConfiguration())
          .then(function (stream) {
            var senders = connection.getSenders();
            var tracks = stream.getTracks();
            var i = tracks.length;
            while ( --i > -1) {
              if (tracks[i].kind === 'video') {
                senders[i].replaceTrack(tracks[i]);
              }
            }
            videoElement.srcObject = stream;
          })
          .catch (function (error) {
            console.error('Could not replace track : ' + error.message);
          });
      }
      else {
        publisher.muteVideo();
        var stream = videoElement.srcObject
        stream.getVideoTracks().forEach(track => {
          track.stop();
        })
      }
    });
    */
    muteAudioButton2.addEventListener('click', function () {
      var wasMuted = muteAudioButton2.innerText === 'Unmute Audio (Client)'
      muteAudioButton2.innerText = wasMuted
        ? 'Mute Audio (Client)'
        : 'Unmute Audio (Client)'
      if (wasMuted) {
        publisher.unmuteAudio()
      } else {
        publisher.muteAudio()
      }
      var pc = publisher.getPeerConnection()
      var sender = pc.getSenders()[0] // Assuming Audio is first in list.
      var params = sender.getParameters()
      params.encodings[0].active = wasMuted ? true : false
      sender.setParameters(params)
    })
    muteVideoButton2.addEventListener('click', function () {
      var wasMuted = muteVideoButton2.innerText === 'Unmute Video (Client)'
      muteVideoButton2.innerText = wasMuted
        ? 'Mute Video (Client)'
        : 'Unmute Video (Client)'
      if (wasMuted) {
        publisher.unmuteVideo()
      } else {
        publisher.muteVideo()
      }
      var pc = publisher.getPeerConnection()
      var sender = pc.getSenders()[1] // Assuming Video is second in list.
      var params = sender.getParameters()
      params.encodings[0].active = wasMuted ? true : false
      sender.setParameters(params)
    })
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
      audio: configuration.useAudio
        ? configuration.mediaConstraints.audio
        : false,
      video: configuration.useVideo
        ? configuration.mediaConstraints.video
        : false,
      frameRate: configuration.frameRate,
    }
  }

  function determinePublisher() {
    const { preferWhipWhep } = configuration
    const { WHIPClient, RTCPublisher } = red5prosdk

    var rtcConfig = Object.assign(
      {},
      configuration,
      defaultConfiguration,
      getAuthenticationParams(),
      getUserMediaConfiguration(),
      {
        protocol: getSocketLocationFromProtocol().protocol,
        port: getSocketLocationFromProtocol().port,
        streamName: configuration.stream1,
      }
    )
    const publisher = preferWhipWhep ? new WHIPClient() : new RTCPublisher()
    return publisher.init(rtcConfig)
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

  // Kick off.
  determinePublisher()
    .then(function (publisherImpl) {
      streamTitle.innerText = configuration.stream1
      targetPublisher = publisherImpl
      targetPublisher.on('*', onPublisherEvent)
      return targetPublisher.publish()
    })
    .then(function () {
      addMuteListener(targetPublisher)
      onPublishSuccess(targetPublisher)
    })
    .catch(function (error) {
      var jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      console.error('[Red5ProPublisher] :: Error in publishing - ' + jsonError)
      onPublishFail(jsonError)
    })

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
