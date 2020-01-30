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
(function(window, document, red5prosdk) {
  'use strict';

  var serverSettings = (function() {
    var settings = sessionStorage.getItem('r5proServerSettings');
    try {
      return JSON.parse(settings);
    }
    catch (e) {
      console.error('Could not read server settings from sessionstorage: ' + e.message);
    }
    return {};
  })();

  var configuration = (function () {
    var conf = sessionStorage.getItem('r5proTestBed');
    try {
      return JSON.parse(conf);
    }
    catch (e) {
      console.error('Could not read testbed configuration from sessionstorage: ' + e.message);
    }
    return {}
  })();

  red5prosdk.setLogLevel(configuration.verboseLogging ? red5prosdk.LOG_LEVELS.TRACE : red5prosdk.LOG_LEVELS.WARN);
  var mediaConstraints = {
    audio: configuration.useAudio ? configuration.mediaConstraints.audio : false,
    video: configuration.useVideo ? configuration.mediaConstraints.video : false,
  };

  var targetPublisher;

  var updateStatusFromEvent = window.red5proHandlePublisherEvent; // defined in src/template/partial/status-field-publisher.hbs
  var streamTitle = document.getElementById('stream-title');
  var statisticsField = document.getElementById('statistics-field');
  var cameraSelect = document.getElementById('camera-select');
  var bitrateField = document.getElementById('bitrate-field');
  var packetsField = document.getElementById('packets-field');
  var resolutionField = document.getElementById('resolution-field');

  var bitrate = 0;
  var packetsSent = 0;
  var frameWidth = 0;
  var frameHeight = 0;

  function updateStatistics (b, p, w, h) {
    statisticsField.classList.remove('hidden');
    bitrateField.innerText = b === 0 ? 'N/A' : Math.floor(b);
    packetsField.innerText = p;
    resolutionField.innerText = (w || 0) + 'x' + (h || 0);
  }

  function onBitrateUpdate (b, p) {
    bitrate = b;
    packetsSent = p;
    updateStatistics(bitrate, packetsSent, frameWidth, frameHeight);
  }

  function onResolutionUpdate (w, h) {
    frameWidth = w;
    frameHeight = h;
    updateStatistics(bitrate, packetsSent, frameWidth, frameHeight);
  }

  var current_selection = undefined;
  var protocol = serverSettings.protocol;
  var isSecure = protocol == 'https';
  function getSocketLocationFromProtocol () {
    return !isSecure
      ? {protocol: 'ws', port: serverSettings.wsport}
      : {protocol: 'wss', port: serverSettings.wssport};
  }

  function onPublisherEvent (event) {
    console.log('[Red5ProPublisher] ' + event.type + '.');
    updateStatusFromEvent(event);
    if (event.type === 'WebRTC.MediaStream.Available') {
      var tracks = publisher.getMediaStream().getVideoTracks();
      tracks.forEach(function (track) {
        var settings = track.getSettings();
        setCameraSelection(settings.deviceId);
      });
    }
  }
  function onPublishFail (message) {
    console.error('[Red5ProPublisher] Publish Error :: ' + message);
  }
  function onPublishSuccess (publisher) {
    console.log('[Red5ProPublisher] Publish Complete.');
    try {
      var pc = publisher.getPeerConnection();
      var stream = publisher.getMediaStream();
      window.trackBitrate(pc, onBitrateUpdate);
      statisticsField.classList.remove('hidden');
      stream.getVideoTracks().forEach(function (track) {
        var settings = track.getSettings();
        onResolutionUpdate(settings.width, settings.height);
      });
    }
    catch (e) {
      // no tracking for you!
    }
  }
  function onUnpublishFail (message) {
    console.error('[Red5ProPublisher] Unpublish Error :: ' + message);
  }
  function onUnpublishSuccess () {
    console.log('[Red5ProPublisher] Unpublish Complete.');
  }

  function onDeviceError (error) {
    console.error('Could not access devices: ' + error);
  }

  function listDevices (devices) {
    var cameras = devices.filter(function (item) {
      return item.kind === 'videoinput';
    })
    var options = cameras.map(function (camera, index) {
      return '<option value="' + camera.deviceId + '">' + (camera.label || 'camera ' + index) + '</option>';
    });
    cameraSelect.innerHTML = options.join(' ');
    if (targetPublisher && targetPublisher.getMediaStream()) {
      var tracks = targetPublisher.getMediaStream().getVideoTracks();
      tracks.forEach(function (track) {
        var settings = track.getSettings();
        setCameraSelection(settings.deviceId);
      });
    }
  }

  function setCameraSelection (deviceId) {
    var options = cameraSelect.childNodes;
    var i = options.length;
    while( --i > -1) {
      if (options[i].value === deviceId) {
        options[i].selected = true;
        return
      }
    }
  }

  function getUserMediaConfiguration () {
    return {
      mediaConstraints: {
        audio: configuration.useAudio ? configuration.mediaConstraints.audio : false,
        video: configuration.useVideo ? configuration.mediaConstraints.video : false
      }
    };
  }

  function unpublish () {
    return new Promise(function (resolve, reject) {
      var publisher = targetPublisher;
      publisher.unpublish()
        .then(function () {
          onUnpublishSuccess();
          resolve();
        })
        .catch(function (error) {
          var jsonError = typeof error === 'string' ? error : JSON.stringify(error, 2, null);
          onUnpublishFail('Unmount Error ' + jsonError);
          reject(error);
        });
    });
  }

  function swapCamera () {
    var connection = targetPublisher.getPeerConnection();
    var selection = cameraSelect.value;
    if (selection === current_selection) {
      return;
    }
    current_selection = selection;
    if (mediaConstraints.video && typeof mediaConstraints.video !== 'boolean') {
      mediaConstraints.video.deviceId = { exact: selection }
      delete mediaConstraints.video.frameRate
    }
    else {
      mediaConstraints.video = {
        deviceId: { exact: selection }
      };
    }
    // 1. Grab new MediaStream from updated constraints.
    navigator.mediaDevices.getUserMedia(mediaConstraints)
      .then(function (stream) {
        // 2. Update the media tracks on senders through connection.
        var senders = connection.getSenders();
        var tracks = stream.getTracks();
        var i = senders.length;
        var j = tracks.length;
        while ( --i > -1) { // 3. Find the currently sending video stream
          if (senders[i].track.kind === 'video') {
            break;
          }
        }
        if ( i < 0 ) {
          console.error('Could not replace track : No video stream in connection');
          return;
        }
        var replacePromise;
        while ( --j > -1) { // 4. Get the new stream and apply it after cleaning up the previous one
          if (tracks[j].kind === 'video') {
            senders[i].track.stop();
            replacePromise = senders[i].replaceTrack(tracks[j]);
            break;
          }
        }
        // 3. Update the video display with new stream.
        document.getElementById('red5pro-publisher').srcObject = stream;
        return replacePromise;
      })
      .catch (function (error) {
        console.error('Could not replace track : ' + error.message);
      });
  }

  var config = Object.assign({},
    configuration,
    getUserMediaConfiguration());

  var rtcConfig = Object.assign({}, config, {
                      protocol: getSocketLocationFromProtocol().protocol,
                      port: getSocketLocationFromProtocol().port,
                      streamName: config.stream1,
                      streamMode: configuration.recordBroadcast ? 'record' : 'live'
                   });

  var publisher = new red5prosdk.RTCPublisher()
  publisher.init(rtcConfig)
    .then(function (publisherImpl) {
      streamTitle.innerText = configuration.stream1;
      targetPublisher = publisherImpl;
      targetPublisher.on('*', onPublisherEvent);
      return targetPublisher.publish();
    })
    .then(function () {
      return navigator.mediaDevices.enumerateDevices()
    })
    .then(listDevices)    
    .then(function () {
      onPublishSuccess(targetPublisher);
    })
    .catch(function (error) {
      var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
      console.error('[Red5ProPublisher] :: Error in publishing - ' + jsonError);
      onPublishFail(jsonError);
    });

  navigator.mediaDevices.enumerateDevices().then(listDevices).catch(onDeviceError);
  cameraSelect.addEventListener('change', swapCamera);

  var shuttingDown = false;
  function shutdown() {
    if (shuttingDown) return;
    shuttingDown = true;
    function clearRefs () {
      if (targetPublisher) {
        targetPublisher.off('*', onPublisherEvent);
      }
      targetPublisher = undefined;
    }
    unpublish().then(clearRefs).catch(clearRefs);
    window.untrackBitrate();
  }
  window.addEventListener('pagehide', shutdown);
  window.addEventListener('beforeunload', shutdown);

})(this, document, window.red5prosdk);

