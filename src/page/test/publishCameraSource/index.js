(function(window, document, red5pro, PublisherBase /* see: src/static/script/main.js */) {
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

  var targetPublisher;
  var targetView;

  var updateStatusFromEvent = window.red5proHandlePublisherEvent; // defined in src/template/partial/status-field-publisher.hbs
  var streamTitle = document.getElementById('stream-title');
  var statisticsField = document.getElementById('statistics-field');
  var cameraSelect = document.getElementById('camera-select');

  var protocol = serverSettings.protocol;
  var isSecure = protocol == 'https';
  function getSocketLocationFromProtocol () {
    return !isSecure
      ? {protocol: 'ws', port: serverSettings.wsport}
      : {protocol: 'wss', port: serverSettings.wssport};
  }

  var defaultConfiguration = {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port,
    app: 'live'
  };

  var userMedia = {
    audio: configuration.useAudio ? configuration.userMedia.audio : false,
    video: configuration.useVideo ? configuration.userMedia.video : false
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

  function getUserMediaConfiguration () {
    return Object.assign({}, userMedia);
  }

  var SELECT_DEFAULT = 'Select a camera...';
  function onCameraSelect (selection) {

    if (!configuration.useVideo) {
      return;
    }

    if (selection && selection !== 'undefined' && selection !== SELECT_DEFAULT) {
      // assign selected camera to defined UserMedia.
      if (userMedia.video && typeof userMedia.video !== 'boolean') {
        userMedia.video.deviceId = { exact: selection }
      }
      else {
        userMedia.video = {
          deviceId: { exact: selection }
        };
      }
      // Kick off.
      unpublish()
        .then(startPublishSession)
        .catch(function (error) {
          console.error('[Red5ProPublisher] :: Error in publishing - ' + error);
         });
    }
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
      })
      .catch(function (error) {
        console.error('Could not access camera devices: ' + error);
      });
  }

  function startPublishSession () {
    // Kick off.
    determinePublisher()
      .then(function (payload) {
        var requiresPreview = payload.requiresPreview;
        var publisher = payload.publisher;
        publisher.on('*', onPublisherEvent);
        return preview(publisher, requiresPreview);
      })
      .then(function (payload) {
        var publisher = payload.publisher;
        var view = payload.view;
        return publish(publisher, view, configuration.stream1);
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
                    {mediaConstraints: getUserMediaConfiguration()});
    var rtcConfig = Object.assign({}, config, {
                      protocol: getSocketLocationFromProtocol().protocol,
                      port: getSocketLocationFromProtocol().port,
                      streamName: config.stream1,
                      streamType: 'webrtc'
                   });
    return PublisherBase.getRTCPublisher(rtcConfig);
  }

  function preview (publisher) {
    var elementId = 'red5pro-publisher-video';
    return PublisherBase.preview(publisher, elementId);
  }

  function publish (publisher, view, streamName) {
    streamTitle.innerText = streamName;
    targetPublisher = publisher;
    targetView = view;
    return new Promise(function (resolve, reject) {
      PublisherBase.publish(publisher, streamName)
        .then(function () {
          onPublishSuccess(publisher);
        })
        .catch(function (error) {
          reject(error);
        })
    });
  }

  function unpublish () {
    return new Promise(function (resolve, reject) {
      var view = targetView;
      var publisher = targetPublisher;
      PublisherBase.unpublish(publisher, view)
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

  // Kick off.
  waitForSelect();

  window.addEventListener('beforeunload', function() {
    function clearRefs () {
      if (targetPublisher) {
        targetPublisher.off('*', onPublisherEvent);
      }
      targetView = targetPublisher = undefined;
    }
    unpublish().then(clearRefs).catch(clearRefs);
    window.untrackBitrate();
  });
})(this, document, window.red5prosdk, new window.R5ProBase.Publisher());

