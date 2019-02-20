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
  var swapButton = document.getElementById('swap-button');

  swapButton.addEventListener('click', swapCamera);

  var SELECT_DEFAULT = 'Select a camera...';
  var deviceList;
  // Fill Camera listing.
  (function (cameraSelect) {
    navigator.mediaDevices.enumerateDevices()
      .then(function (devices) {
        var videoCameras = devices.filter(function (item) {
          return item.kind === 'videoinput';
        })
        var cameras = [{
          label: SELECT_DEFAULT
        }].concat(videoCameras);
        var options = cameras.map(function (camera, index) {
          return '<option value="' + camera.deviceId + '">' + (camera.label || 'camera ' + index) + '</option>';
        });
        deviceList = cameras.map(function (camera) {
          return camera.deviceId;
        });
        cameraSelect.innerHTML = options.join(' ');
      })
      .catch(function (error) {
        console.error('Could not access camera devices: ' + error);
      });
  })(cameraSelect);

  function getSelectedIndexFromTrack (track) {
    var i = deviceList.length;
    while (--i > -1) {
      var option = deviceList[i];
      if (option.value === track.id) {
        break;
      }
    }
    if (i > -1) {
      cameraSelect.selectedIndex = i;
    }
  }

  var protocol = serverSettings.protocol;
  var isSecure = protocol == 'https';
  function getSocketLocationFromProtocol () {
    return !isSecure
      ? {protocol: 'ws', port: serverSettings.wsport}
      : {protocol: 'wss', port: serverSettings.wssport};
  }

  function onBitrateUpdate (bitrate, packetsSent) {
    statisticsField.innerText = 'Bitrate: ' + Math.floor(bitrate) + '. Packets Sent: ' + packetsSent + '.';
  }

  function onPublisherEvent (event) {
    console.log('[Red5ProPublisher] ' + event.type + '.');
    updateStatusFromEvent(event);
    if (event.type === 'WebRTC.MediaStream.Available') {
      // var stream = event.data;
      // TODO: set cameraSelect.selectedIndex from getSelectedIndexFromTrack(data.getVideoTracks[0]);
    }
  }
  function onPublishFail (message) {
    console.error('[Red5ProPublisher] Publish Error :: ' + message);
  }
  function onPublishSuccess (publisher) {
    console.log('[Red5ProPublisher] Publish Complete.');
    try {
      window.trackBitrate(publisher.getPeerConnection(), onBitrateUpdate);
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
    if (selection === SELECT_DEFAULT) {
      return;
    }
    if (mediaConstraints.video && typeof mediaConstraints.video !== 'boolean') {
      mediaConstraints.video.deviceId = { exact: selection }
    }
    else {
      mediaConstraints.video = {
        deviceId: { exact: selection }
      };
    }
    // 1. Grap new MediaStream from updated constraints.
    navigator.mediaDevices.getUserMedia(mediaConstraints)
      .then(function (stream) {
        // 2. Update the media tracks on senders through connection.
        var senders = connection.getSenders();
        var tracks = stream.getTracks();
        var i = tracks.length;
        while ( --i > -1) {
          if (tracks[i].kind === 'video') {
            senders[i].replaceTrack(tracks[i]);
          }
        }
        // 3. Update the video display with new stream.
        document.getElementById('red5pro-publisher').srcObject = stream;
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
      onPublishSuccess(targetPublisher);
    })
    .catch(function (error) {
      var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
      console.error('[Red5ProPublisher] :: Error in publishing - ' + jsonError);
      onPublishFail(jsonError);
     });

  window.addEventListener('beforeunload', function() {
    function clearRefs () {
      if (targetPublisher) {
        targetPublisher.off('*', onPublisherEvent);
      }
      targetPublisher = undefined;
    }
    unpublish().then(clearRefs).catch(clearRefs);
    window.untrackBitrate();
  });

})(this, document, window.red5prosdk);

