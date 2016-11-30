(function(window, document, red5pro) {
  'use strict';

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

  red5pro.setLogLevel(configuration.verboseLogging ? red5pro.LogLevels.TRACE : red5pro.LogLevels.WARN);

  var updateStatusFromEvent = window.red5proHandlePublisherEvent; // defined in src/template/partial/status-field-publisher.hbs
  var targetPublisher;
  var targetView;
  var streamTitle = document.getElementById('stream-title');
  var statisticsField = document.getElementById('statistics-field');
  var cameraSelect = document.getElementById('camera-select');
  var protocol = configuration.protocol;
  var isSecure = protocol == 'https';
  function getSocketLocationFromProtocol () {
    return !isSecure
      ? {protocol: 'ws', port: configuration.wsport}
      : {protocol: 'wss', port: configuration.wssport};
  }

  var defaultConfiguration = {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port,
    app: 'live'
  };

  var userMedia = {
    audio: configuration.useAudio ? configuration.userMedia.audio : false,
    video: configuration.useVideo ? configuration.userMedia.video : false,
    frameRate: configuration.frameRate
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
        userMedia.video.sourceId = selection
      }
      else {
        userMedia.video = {
          sourceId: selection
        };
      }
      // Kick off.
      unpublish()
        .then(preview)
        .then(publish)
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
        var options = cameras.map(function (camera) {
          return '<option value="' + camera.deviceId + '">' + camera.label + '</option>';
        });
        cameraSelect.innerHTML = options.join(' ');
        cameraSelect.addEventListener('change', function () {
          onCameraSelect(cameraSelect.value);
        });
    });
  }

  function preview () {
    var gUM = getUserMediaConfiguration;
    return new Promise(function (resolve, reject) {

      var elementId = 'red5pro-publisher-video';
      var publisher = new red5pro.RTCPublisher();
      var view = new red5pro.PublisherView(elementId);
      var nav = navigator.mediaDevice || navigator;

      publisher.on('*', onPublisherEvent);
      console.log('[Red5ProPublisher] gUM:: ' + JSON.stringify(gUM(), null, 2));

      nav.getUserMedia(gUM(), function (media) {

        // Upon access of user media,
        // 1. Attach the stream to the publisher.
        // 2. Show the stream as preview in view instance.
        publisher.attachStream(media);
        view.preview(media, true);
        view.attachPublisher(publisher);

        targetPublisher = publisher;
        targetView = view;
        resolve();

      }, function(error) {

        onPublishFail('Error - ' + error);
        reject(error);

      })
    });
  }

  function publish () {
    var publisher = targetPublisher;
    var config = Object.assign({},
                    configuration,
                    defaultConfiguration,
                    getUserMediaConfiguration());
    config.streamName = config.stream1;
    streamTitle.innerText = config.streamName;
    console.log('[Red5ProPublisher] config:: ' + JSON.stringify(config, null, 2));

    // Initialize
    publisher.init(config)
      .then(function (pub) { // eslint-disable-line no-unused-vars
        // Invoke the publish action
        return publisher.publish();
      })
      .then(function () {
        onPublishSuccess(publisher);
      })
      .catch(function (error) {
        // A fault occurred while trying to initialize and publish the stream.
        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
        onPublishFail('Error - ' + jsonError);
      });
  }

  function unpublish () {
    return new Promise(function (resolve, reject) {
      var view = targetView;
      var publisher = targetPublisher;
      if (publisher) {
        publisher.unpublish()
          .then(function () {
            view.view.src = '';
            publisher.setView(undefined);
            publisher.off('*', onPublisherEvent);
            onUnpublishSuccess();
            resolve();
          })
          .catch(function (error) {
            var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
            onUnpublishFail('Unmount Error ' + jsonError);
            reject(error);
          });
      }
      else {
        onUnpublishSuccess();
        resolve();
      }
    });
  }

  // Kick off.
  waitForSelect();

  window.addEventListener('beforeunload', function() {
    function clearRefs () {
      targetPublisher.off('*', onPublisherEvent);
      targetView = targetPublisher = undefined;
    }
    unpublish().then(clearRefs).catch(clearRefs);
    window.untrackBitrate();
  });

})(this, document, window.red5prosdk);
