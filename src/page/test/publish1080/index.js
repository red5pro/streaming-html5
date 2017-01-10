(function(window, document, red5pro) {
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

  red5pro.setLogLevel(configuration.verboseLogging ? red5pro.LogLevels.TRACE : red5pro.LogLevels.WARN);

  var updateStatusFromEvent = window.red5proHandlePublisherEvent; // defined in src/template/partial/status-field-publisher.hbs
  var targetPublisher;
  var targetView;
  var streamTitle = document.getElementById('stream-title');
  var statisticsField = document.getElementById('statistics-field');
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
    app: 'live',
    bandwidth: {
      video: 2500
    }
  };

  var userMedia = {
    video: {
      width: {
        min: 640,
        ideal: 1280,
        max: 1920
      },
      height: {
        min: 480,
        ideal: 720,
        max: 1080
      },
      frameRate: {
        min: 25,
        ideal: 40,
        max: 60
      }
    }
  };

  function onBitrateUpdate (bitrate, packetsSent) {
    statisticsField.innerText = 'Bitrate: ' + Math.floor(bitrate) + '. Packets Sent: ' + packetsSent + '.';
  }

  function onPublisherEvent (event) {
    console.log('[Red5ProPublisher] ' + event.type + '.');
    updateStatusFromEvent(event);
  }
  function onPublishFail (message) {
    updateStatusFromEvent(window.red5prosdk.PublisherEventTypes.PUBLISH_FAIL);
    statisticsField.innerText = message;
    statisticsField.style.color = '#ff0000';
    console.error('[Red5ProPublisher] Publish Error :: ' + message);
 }
  function onPublishSuccess (publisher) {
    console.log('[Red5ProPublisher] Publish Complete.');
    try {
      window.trackBitrate(publisher.getPeerConnection(), onBitrateUpdate);
    }
    catch (e) {
    }
  }
  function onUnpublishFail (message) {
    console.error('[Red5ProPublisher] Unpublish Error :: ' + message);
  }
  function onUnpublishSuccess () {
    console.log('[Red5ProPublisher] Unpublish Complete.');
  }

  function getUserMediaConfiguration () {
    return Object.assign({}, {
      audio: configuration.useAudio ? configuration.userMedia.audio : false,
      video: configuration.useVideo ? configuration.userMedia.video : false,
      frameRate: configuration.frameRate
    }, configuration.useVideo ? userMedia : {});
  }

  function determinePublisher () {

    var config = Object.assign({},
                   configuration,
                   getUserMediaConfiguration());
    var rtcConfig = Object.assign({}, config, defaultConfiguration, {
                      streamName: config.stream1,
                      streamType: 'webrtc'
                   });
    var rtmpConfig = Object.assign({}, config, {
                      protocol: 'rtmp',
                      port: serverSettings.rtmpport,
                      streamName: config.stream1,
                      width: config.cameraWidth,
                      height: config.cameraHeight,
                      swf: '../../lib/red5pro/red5pro-publisher.swf',
                      swfobjectURL: '../../lib/swfobject/swfobject.js',
                      productInstallURL: '../../lib/swfobject/playerProductInstall.swf'
                   });
    var publishOrder = config.publisherFailoverOrder.split(',').map(function (item) {
      return item.trim()
    });

    return new Promise(function (resolve, reject) {

      var publisher = new red5pro.Red5ProPublisher();
      publisher.on('*', onPublisherEvent);

      publisher.setPublishOrder(publishOrder)
        .init({
          rtc: rtcConfig,
          rtmp: rtmpConfig
        })
        .then(function (selectedPublisher) {
          var type = selectedPublisher ? selectedPublisher.getType() : undefined;
          var requiresPreview = type.toLowerCase() === publisher.publishTypes.RTC;
          publisher.off('*', onPublisherEvent);
          resolve({
            publisher: selectedPublisher,
            requiresPreview: requiresPreview
          });
        })
        .catch(function (error) {
          reject(error);
        });

    });
  }

  function preview (publisher, requiresGUM) {
    var gUM = getUserMediaConfiguration;
    return new Promise(function (resolve, reject) {

      var elementId = 'red5pro-publisher-video';
      var view = new red5pro.PublisherView(elementId);
      var nav = navigator.mediaDevice || navigator;

      view.attachPublisher(publisher);

      if (requiresGUM) {
        console.log('[Red5ProPublisher] gUM:: ' + JSON.stringify(gUM(), null, 2));
        nav.getUserMedia(gUM(), function (media) {

          // Upon access of user media,
          // 1. Attach the stream to the publisher.
          // 2. Show the stream as preview in view instance.
          publisher.attachStream(media);
          view.preview(media, true);

          targetPublisher = publisher;
          targetView = view;
          resolve(targetPublisher);

        }, function(error) {

          onPublishFail('Error - ' + error);
          reject(error);

        })
      }
      else {
        targetPublisher = publisher;
        targetView = view;
        resolve(targetPublisher);
      }
    });
  }

  function publish (publisher, streamName) {
    streamTitle.innerText = streamName;
    publisher.publish()
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
  determinePublisher()
    .then(function (payload) {
      var requiresPreview = payload.requiresPreview;
      var publisher = payload.publisher;
      publisher.on('*', onPublisherEvent);
      return preview(publisher, requiresPreview);
    })
    .then(function (publisher) {
      publish(publisher, configuration.stream1);
    })
    .catch(function (error) {
      console.error('[Red5ProPublisher] :: Error in publishing - ' + error);
     });

  window.addEventListener('beforeunload', function() {
    function clearRefs () {
      targetPublisher.off('*', onPublisherEvent);
      targetView = targetPublisher = undefined;
    }
    unpublish().then(clearRefs).catch(clearRefs);
    window.untrackBitrate();
  });

})(this, document, window.red5prosdk);
