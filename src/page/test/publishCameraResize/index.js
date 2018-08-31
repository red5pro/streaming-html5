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

  var targetPublisher;

  var updateStatusFromEvent = window.red5proHandlePublisherEvent; // defined in src/template/partial/status-field-publisher.hbs
  var streamTitle = document.getElementById('stream-title');
  var statisticsField = document.getElementById('statistics-field');
  var dimsField = document.getElementById('dimensions-field');
  var swapCameraButton = document.getElementById('swap-camera-btn');

  function swapCamera () {
    document.getElementsByTagName('object')[0].swapCameraSize();
  }

  function setUpSwapCamera () {
    swapCameraButton.addEventListener('click', swapCamera);
  }

  function tearDownSwapCamera () {
    swapCameraButton.removeEventListener('click', swapCamera);
  }

  var dimsLog = /^Change camera to: ([0-9]+),([0-9]+)/gi
  var cameraLog = /^Set Camera to \(([0-9]+), ([0-9]+)\)/gi
  var logFn = window.publisherLog;
  window.publisherLog = function (message) {
    logFn(message);
    var results = dimsLog.exec(message);
    results = results ? results : cameraLog.exec(message);
    if (results && results.length > 2) {
      var width = results[1];
      var height = results[2];
      var changeToDims = "Camera Size: " + width + ", " + height;
      dimsField.innerText = changeToDims;
    }
  }

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
    return {
      audio: configuration.useAudio ? configuration.mediaConstraints.audio : false,
      video: configuration.useVideo ? configuration.mediaConstraints.video : false,
      frameRate: configuration.frameRate
    };
  }

  function getRTMPMediaConfiguration () {
    return {
      mediaConstraints: {
        audio: configuration.useAudio ? configuration.mediaConstraints.audio : false,
        video: configuration.useVideo ? {
                width: configuration.cameraWidth,
                height: configuration.cameraHeight
              } : false
      }
    }
  }

  var config = Object.assign({},
                    configuration,
                    getAuthenticationParams(),
                    getUserMediaConfiguration());

  var rtmpConfig = Object.assign({}, config, {
                    protocol: 'rtmp',
                    port: serverSettings.rtmpport,
                    streamName: config.stream1,
                    swf: 'red5pro-camera-resize-publisher.swf',
                    swfobjectURL: '../../lib/swfobject/swfobject.js',
                    productInstallURL: '../../lib/swfobject/playerProductInstall.swf'
                  }, getRTMPMediaConfiguration());

  function unpublish () {
    return new Promise(function (resolve, reject) {
      var publisher = targetPublisher;
      tearDownSwapCamera();
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

  targetPublisher = new red5prosdk.RTMPPublisher();
  targetPublisher.init(rtmpConfig)
    .then(function () {
      streamTitle.innerText = configuration.stream1;
      targetPublisher.on('*', onPublisherEvent);
      setUpSwapCamera();
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

