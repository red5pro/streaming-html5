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

  var targetSubscriber;

  var updateStatusFromEvent = function (event) {
    var subTypes = red5prosdk.SubscriberEventTypes;
    switch (event.type) {
        case subTypes.CONNECT_FAILURE:
        case subTypes.SUBSCRIBE_FAIL:
          shutdownVideoElement();
          break;
    }
    window.red5proHandleSubscriberEvent(event); // defined in src/template/partial/status-field-subscriber.hbs
  };
  var streamTitle = document.getElementById('stream-title');
  var addressField = document.getElementById('address-field');
  var streamInfoField = document.getElementById('stream-info-field');
  var upBtn = document.getElementById('uplevel-btn');
  var downBtn = document.getElementById('downlevel-btn');
  var startBtn = document.getElementById('start-btn');
  var stopBtn = document.getElementById('stop-btn');

  upBtn.addEventListener('click', function () {
    if (targetSubscriber) {
      abrLevel = (--abrLevel < 1 ? 1 : abrLevel);
      targetSubscriber.setABRLevel(abrLevel);
    }
  });
  downBtn.addEventListener('click', function () {
    if (targetSubscriber) {
      abrLevel = (++abrLevel > 3 ? 3 : abrLevel);
      targetSubscriber.setABRLevel(abrLevel);
    }
  });
  startBtn.addEventListener('click', function () {
    if (targetSubscriber) {
      targetSubscriber.startABRController();
    }
  });
  stopBtn.addEventListener('click', function () {
    if (targetSubscriber) {
      targetSubscriber.stopABRController();
    }
  });

  var abrLevel = 1;
  var abrSettings;

  var protocol = serverSettings.protocol;
  var isSecure = protocol === 'https';
  function getSocketLocationFromProtocol () {
    return !isSecure
      ? {protocol: 'ws', port: serverSettings.wsport}
      : {protocol: 'wss', port: serverSettings.wssport};
  }

  var defaultConfiguration = (function(useVideo, useAudio) {
    var c = {
      protocol: getSocketLocationFromProtocol().protocol,
      port: getSocketLocationFromProtocol().port
    };
    if (!useVideo) {
      c.videoEncoding = red5prosdk.PlaybackVideoEncoder.NONE;
    }
    if (!useAudio) {
      c.audioEncoding = red5prosdk.PlaybackAudioEncoder.NONE;
    }
    return c;
  })(configuration.useVideo, configuration.useAudio);

  function shutdownVideoElement () {
    var videoElement = document.getElementById('red5pro-subscriber');
    if (videoElement) {
      videoElement.pause()
      videoElement.src = ''
    }
  }

  function displayhostname (hostname, type) {
    addressField.innerText = type + ' Address: ' + hostname;
  }

  // Local lifecycle notifications.
  function onSubscriberEvent (event) {
    console.log('[Red5ProSubsriber] ' + event.type + '.');
    updateStatusFromEvent(event);
    if (event.type === 'FlashPlayer.Embed.Success') {
      targetSubscriber.setABRVariants(abrSettings, abrLevel);
    }
    else if (event.type === 'RTMP.AdaptiveBitrate.Level') {
      abrLevel = event.data.level;
      streamInfoField.innerText = "Stream Level: " + event.data.stream.name;
    }
  }
  function onSubscribeFail (message) {
    console.error('[Red5ProSubsriber] Subscribe Error :: ' + message);
  }
  function onSubscribeSuccess () {
    console.log('[Red5ProSubsriber] Subscribe Complete.');
  }
  function onUnsubscribeFail (message) {
    console.error('[Red5ProSubsriber] Unsubscribe Error :: ' + message);
  }
  function onUnsubscribeSuccess () {
    console.log('[Red5ProSubsriber] Unsubscribe Complete.');
  }

  function requestEdge (configuration, streamName) {
    var host = configuration.host;
    var app = configuration.app;
    var port = serverSettings.httpport.toString();
    var portURI = (port.length > 0 ? ':' + port : '');
    var baseUrl = isSecure ? protocol + '://' + host : protocol + '://' + host + portURI;
    var apiVersion = configuration.streamManagerAPI || '3.0';
    var url = baseUrl + '/streammanager/api/' + apiVersion + '/event/' + app + '/' + streamName + '?action=subscribe';
      return new Promise(function (resolve, reject) {
        fetch(url)
          .then(function (res) {
            if (res.headers.get("content-type") &&
              res.headers.get("content-type").toLowerCase().indexOf("application/json") >= 0) {
                return res.json();
            }
            else {
              throw new TypeError('Could not properly parse response.');
            }
          })
          .then(function (json) {
            resolve(json);
          })
          .catch(function (error) {
            var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
            console.error('[SubscribeStreamManagerTest] :: Error - Could not request Edge IP from Stream Manager. ' + jsonError)
            reject(error)
          });
    });
  }

  function requestABRSettings (streamName) {
    var host = configuration.host;
    var app = configuration.app;
    var port = serverSettings.httpport.toString();
    var portURI = (port.length > 0 ? ':' + port : '');
    var baseUrl = isSecure ? protocol + '://' + host : protocol + '://' + host + portURI;
    var apiVersion = configuration.streamManagerAPI || '3.0';
    var url = baseUrl + '/streammanager/api/' + apiVersion + '/admin/event/meta/' + app + '/' + streamName + '?action=subscribe&accessToken=' + configuration.streamManagerAccessToken;
    return new Promise(function (resolve, reject) {
      fetch(url)
        .then(function (res) {
          if (res.headers.get("content-type") &&
            res.headers.get("content-type").toLowerCase().indexOf("application/json") >= 0) {
              return res.json();
          }
          else {
            throw new TypeError('Could not properly parse response.');
          }
        })
        .then(function (json) {
          resolve(json.data);
        })
        .catch(function (error) {
            var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
            console.error('[PublisherStreamManagerTest] :: Error - Could not POST transcode request. ' + jsonError)
            reject(error)
        });
    });
  }

  function determineSubscriber (jsonResponse) {
    var isSecureHost = typeof jsonResponse.hostname !== 'undefined';

    var host = isSecureHost ? jsonResponse.hostname : jsonResponse.serverAddress;
    var name = jsonResponse.name;
    var app = jsonResponse.scope;
    var config = Object.assign({}, configuration, defaultConfiguration);
    displayhostname(host, 'Edge');
    var rtmpConfig = Object.assign({}, config, {
      host: host,
      app: app,
      port: serverSettings.rtmpport,
      streamName: name,
      buffer: 0.2,
      width: config.cameraWidth,
      height: config.cameraHeight,
      useAdaptiveBitrateController: true,
      backgroundColor: '#000000',
      swf: '../../lib/red5pro/red5pro-subscriber.swf',
      swfobjectURL: '../../lib/swfobject/swfobject.js',
      productInstallURL: '../../lib/swfobject/playerProductInstall.swf'
    })
    var subscriber = new red5prosdk.RTMPSubscriber();
    return subscriber.init(rtmpConfig);
  }

  // Request to unsubscribe.
  function unsubscribe () {
    return new Promise(function(resolve, reject) {
      var subscriber = targetSubscriber
      subscriber.unsubscribe()
        .then(function () {
          targetSubscriber.off('*', onSubscriberEvent);
          targetSubscriber = undefined;
          onUnsubscribeSuccess();
          resolve();
        })
        .catch(function (error) {
          var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
          onUnsubscribeFail(jsonError);
          reject(error);
        });
    });
  }

  var retryCount = 0;
  var retryLimit = 3;
  function respondToEdge (response) {
    determineSubscriber(response)
      .then(function (subscriberImpl) {
        streamTitle.innerText = configuration.stream1;
        targetSubscriber = subscriberImpl;
        // Subscribe to events.
        targetSubscriber.on('*', onSubscriberEvent);
        return targetSubscriber.subscribe();
      })
      .then(function () {
        onSubscribeSuccess(targetSubscriber);
      })
      .catch(function (error) {
        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
        console.error('[Red5ProSubscriber] :: Error in subscribing - ' + jsonError);
        onSubscribeFail(jsonError);
      });
  }

  function respondToEdgeFailure (error) {
    if (retryCount++ < retryLimit) {
      var retryTimer = setTimeout(function () {
        clearTimeout(retryTimer);
        startup();
      }, 1000);
    }
    else {
      var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
      console.error('[Red5ProSubscriber] :: Retry timeout in subscribing - ' + jsonError);
    }
  }

  function startup (selectedStreamVariantName) {
    // Kick off.
    requestEdge(configuration, selectedStreamVariantName)
      .then(respondToEdge)
      .catch(respondToEdgeFailure);
  }

  requestABRSettings(configuration.stream1)
    .then(function (settings) {
      abrSettings = settings;
      try {
        var streams = settings.meta.stream;
        if (streams.length > 0) {
          abrLevel = streams.length > 1 ? 2 : 1;
          var selectedStream = streams[abrLevel-1];
          startup(selectedStream.name);
        } else {
          throw new Error('Could not parse settings.');
        }
      } catch (e) {
        console.error("Count not properly acces ABR stream based on settings: " + JSON.stringify(settings, null, 0));
      }
    });

  // Clean up.
  window.addEventListener('beforeunload', function() {
    function clearRefs () {
      if (targetSubscriber) {
        targetSubscriber.off('*', onSubscriberEvent);
      }
      targetSubscriber = undefined;
    }
    unsubscribe().then(clearRefs).catch(clearRefs);
  });

})(this, document, window.red5prosdk);

