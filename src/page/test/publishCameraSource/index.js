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

  var targetPublisher;

  var updateStatusFromEvent = window.red5proHandlePublisherEvent; // defined in src/template/partial/status-field-publisher.hbs
  var streamTitle = document.getElementById('stream-title');
  var statisticsField = document.getElementById('statistics-field');
  var cameraSelect = document.getElementById('camera-select');
  var publishButton = document.getElementById('publish-button');

  var protocol = serverSettings.protocol;
  var isSecure = protocol == 'https';
  function getSocketLocationFromProtocol () {
    return !isSecure
      ? {protocol: 'ws', port: serverSettings.wsport}
      : {protocol: 'wss', port: serverSettings.wssport};
  }

  var defaultConfiguration = {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port
  };

  var mediaConstraints = {
    audio: configuration.useAudio ? configuration.mediaConstraints.audio : false,
    video: configuration.useVideo ? configuration.mediaConstraints.video : false,
  };

  function onBitrateUpdate (bitrate, packetsSent) {
    statisticsField.innerText = 'Bitrate: ' + Math.floor(bitrate) + '. Packets Sent: ' + packetsSent + '.';
  }

  function onPublisherEvent (event) {
    console.log('[Red5ProPublisher] ' + event.type + '.');
    updateStatusFromEvent(event);
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

  function getAuthenticationParams () {
    var auth = configuration.authentication;
    return auth && auth.enabled
      ? {
        connectionParams: {
          username: auth.username,
          password: auth.password
        }
      }
      : {};
  }

  function getUserMediaConfiguration () {
    return Object.assign({}, {
      mediaConstraints: mediaConstraints
    });
  }

  var SELECT_DEFAULT = 'Select a camera...';
  function onCameraSelect (selection) {

    if (!configuration.useVideo) {
      return;
    }

    var validSelection = selection && selection !== 'undefined' && selection !== SELECT_DEFAULT;
    publishButton.disabled = !validSelection;
  }

  function onPublishRequest () {
    var selection = cameraSelect.value;
    if (mediaConstraints.video && typeof mediaConstraints.video !== 'boolean') {
      mediaConstraints.video.deviceId = { exact: selection }
    }
    else {
      mediaConstraints.video = {
        deviceId: { exact: selection }
      };
    }
    // Kick off.
    unpublish()
      .then(startPublishSession)
      .catch(function (error) {
        console.error('[Red5ProPublisher] :: Error in unpublishing - ' + error);
        startPublishSession();
       });
  }

  function waitForSelect () {
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
        cameraSelect.innerHTML = options.join(' ');
        cameraSelect.addEventListener('change', function () {
          onCameraSelect(cameraSelect.value);
        });
        publishButton.addEventListener('click', function() {
          onPublishRequest();
        });
      })
      .catch(function (error) {
        console.error('Could not access camera devices: ' + error);
      });
  }

  function startPublishSession () {
    // Kick off.
    determinePublisher()
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
    return true;
  }

  function determinePublisher () {
    var config = Object.assign({},
                      configuration,
                      defaultConfiguration,
                      getAuthenticationParams(),
                      getUserMediaConfiguration());

    var rtcConfig = Object.assign({}, config, {
                      protocol: getSocketLocationFromProtocol().protocol,
                      port: getSocketLocationFromProtocol().port,
                      streamName: config.stream1
                   });
    return new red5prosdk.RTCPublisher().init(rtcConfig);
  }

  function unpublish () {
    return new Promise(function (resolve, reject) {
      if (targetPublisher) {
        targetPublisher.unpublish()
          .then(function () {
            onUnpublishSuccess();
            resolve();
          })
          .catch(function (error) {
            var jsonError = typeof error === 'string' ? error : JSON.stringify(error, 2, null);
            onUnpublishFail('Unmount Error ' + jsonError);
            reject(error);
          });
      }
      else {
        resolve();
      }

    });
  }

  // Kick off.
  waitForSelect();

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

