// Chrome & Firefox
// Firefox needs to be over https - no localhost support.
// Required: https://www.webrtc-experiment.com/getScreenId/
// @see https://medium.com/@chris_82106/implementing-webrtc-screen-sharing-in-a-web-app-late-2016-51c1a2642e4
(function(window, document, red5prosdk, getScreenId) {
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
  var audioPublisher;

  var updateStatusFromEvent = window.red5proHandlePublisherEvent; // defined in src/template/partial/status-field-publisher.hbs
  var streamTitle = document.getElementById('stream-title');
  var statisticsField = document.getElementById('statistics-field');
  var captureButton = document.getElementById('capture-button');
  //  var audioButton = document.getElementById('audio-button');

  captureButton.addEventListener('click', function() {
    capture(setupPublisher);
  });

  /*
  audioButton.addEventListener('click', function() {
    setupAudio();
  })
  */

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
  }

  function onPublisherAudioEvent (event) {
    console.log('[Red5ProPublisher:AUDIO] ' + event.type + '.');
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

  function capture (cb) {
    getScreenId(function(error, sourceId, screen_constraints) {
      if (error) {
        console.error('[Red5ProPublisher] Desktop Capture Error: ' + error);
        return;
      }
      navigator.mediaDevices.enumerateDevices()
        .then(function (devices) { // eslint-disable-line no-unused-vars
          // Can't send audio along with constraints for desktop.
          /*
          var device, i = devices.length;
          while(--i > -1) {
            device = devices[i];
            if (device.kind.toLowerCase() === 'audioinput') {
              screen_constraints.audio = {
                optional: [
                    {deviceId: device.label || 'microphone1'}
                  ]
                }
              break;
            }
            }
          */
          cb(screen_constraints);
        });
    });
  }

  function unpublish (publisher) {
    return new Promise(function (resolve, reject) {
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

  function setupAudio () {
    var audioConfig = Object.assign({}, configuration, {
      mediaElementId: 'red5pro-audio',
      protocol: getSocketLocationFromProtocol().protocol,
      port: getSocketLocationFromProtocol().port,
      streamName: configuration.stream1 + '_audio',
      mediaConstraints: {
        audio: true,
        video: false
      }
    });
    new red5prosdk.RTCPublisher()
      .init(audioConfig)
      .then(function (publisherImpl) {
        audioPublisher = publisherImpl;
        audioPublisher.on('*', onPublisherAudioEvent);
        return audioPublisher.publish();
      })
      .then(function () {
      })
      .catch(function (error) {
        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
        console.error('[Red5ProPublisher:AUDIO] :: Error in publishing audio - ' + jsonError);
      });
  }

  function setupPublisher (constraints) {

    var config = Object.assign({},
                     configuration);

    var rtcConfig = Object.assign({}, config, {
                        protocol: getSocketLocationFromProtocol().protocol,
                        port: getSocketLocationFromProtocol().port,
                        streamName: config.stream1,
                        onGetUserMedia: function () {
                          var c = Object.assign({}, constraints);
                          if (c.video.optional) {
                            // chrome
                            c.video.optional.push({
                              maxWidth: 640
                            }, {
                              maxHeight: 480
                            });
                          }
                          else if (c.video.mediaSource === 'window') {
                            // moz
                            c.video.width = {
                              exact: 640
                            };
                            c.video.height = {
                              exact: 480
                            }
                          }
                          return navigator.mediaDevices.getUserMedia(c);
                        }
                    });

    new red5prosdk.RTCPublisher()
      .init(rtcConfig)
      .then(function (publisherImpl) {
        streamTitle.innerText = configuration.stream1;
        targetPublisher = publisherImpl;
        targetPublisher.on('*', onPublisherEvent);
        return targetPublisher.publish();
      })
      .then(function () {
        onPublishSuccess(targetPublisher);
        setupAudio();
      })
      .catch(function (error) {
        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
        console.error('[Red5ProPublisher] :: Error in publishing - ' + jsonError);
        onPublishFail(jsonError);
      });

  }

  window.addEventListener('beforeunload', function() {
    function clearRefs () {
      if (targetPublisher) {
        targetPublisher.off('*', onPublisherEvent);
      }
      if (audioPublisher) {
        audioPublisher.off('*', onPublisherAudioEvent);
      }
      targetPublisher = undefined;
      audioPublisher = undefined;
    }
    unpublish(targetPublisher)
      .then(function () {
        if (audioPublisher) {
          return unpublish(audioPublisher);
        }
        return true;
      })
      .then(clearRefs).catch(clearRefs);
    window.untrackBitrate();
  });

})(this, document, window.red5prosdk, window.getScreenId);

