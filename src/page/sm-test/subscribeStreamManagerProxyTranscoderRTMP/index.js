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
      port: getSocketLocationFromProtocol().port,
      bandwidth: {
        audio: 50,
        video: 256
      }
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

  function displayServerAddress (serverAddress, proxyAddress) {
    proxyAddress = (typeof proxyAddress === 'undefined') ? 'N/A' : proxyAddress;
    addressField.innerText = ' Proxy Address: ' + proxyAddress + ' | ' + ' Edge Address: ' + serverAddress;
  }

  // Local lifecycle notifications.
  function onSubscriberEvent (event) {
    console.log('[Red5ProSubsriber] ' + event.type + '.');
    updateStatusFromEvent(event);
    if (event.type === 'FlashPlayer.Embed.Success') {
      requestABRSettings(targetSubscriber.getOptions().streamName)
        .then(function (settings) {
          targetSubscriber.setABRVariants(settings, abrLevel);
        });
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

  function requestEdge (configuration) {
    return new Promise(function (resolve) {
      resolve({
        name: configuration.stream1,
        serverAddress: 'localhost',
        scope: 'live'
      });
    });
    /*
    var host = configuration.host;
    var app = configuration.app;
    var port = serverSettings.httpport.toString();
    var portURI = (port.length > 0 ? ':' + port : '');
    var baseUrl = isSecure ? protocol + '://' + host : protocol + '://' + host + portURI;
    var streamName = configuration.stream1;
    var apiVersion = configuration.streamManagerAPI || '3.0';
    var url = baseUrl + '/streammanager/api/' + apiVersion + '/event/' + app + '/' + streamName + '?action=subscribe&transcoder=true';
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
    */
  }

  var authName = '';
  var authPass = '';
  function requestABRSettings (streamName) {
    // TODO: Assuming this goes out to some service?
    return new Promise(function (resolve, reject) { //eslint-disable-line no-unused-vars
      resolve({
        meta: {
          authentication: {
            username: authName,
            password: authPass
          },
          stream: [
            {
              name: streamName + '_high',
              level: 1,
              properties: {
                videoWidth: 640,
                videoHeight: 480,
                videoBR: 500000 
              }
            },
            {
              name: streamName + '_mid',
              level: 2,
              properties: {
                videoWidth: 320,
                videoHeight: 240,
                videoBR: 256000 
              }
            },
            {
              name: streamName + '_low',
              level: 3,
              properties: {
                videoWidth: 160,
                videoHeight: 120,
                videoBR: 128000 
              }
            }
          ],
          georules: {
            regions: ['US', 'UK'],
            restricted: false
          },
          qos: 3
        }
      });
    });
  }

  function determineSubscriber (jsonResponse) {
    var host = jsonResponse.serverAddress;
    var name = jsonResponse.name;
    var app = jsonResponse.scope;
    var config = Object.assign({}, configuration, defaultConfiguration);
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

  function showServerAddress (subscriber) {
    var config = subscriber.getOptions();
    console.log("Host = " + config.host + " | " + "app = " + config.app);
    if (subscriber.getType().toLowerCase() === 'rtc') {
      displayServerAddress(config.connectionParams.host, config.host);
      console.log("Using streammanager proxy for rtc");
      console.log("Proxy target = " + config.connectionParams.host + " | " + "Proxy app = " + config.connectionParams.app)
      if(isSecure) {
        console.log("Operating over secure connection | protocol: " + config.protocol + " | port: " +  config.port);
      }
      else {
        console.log("Operating over unsecure connection | protocol: " + config.protocol + " | port: " +  config.port);
      }
    }
    else {
      displayServerAddress(config.host);
    }
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
        showServerAddress(targetSubscriber);
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

  function startup () {
    // Kick off.
    requestEdge(configuration)
      .then(respondToEdge)
      .catch(respondToEdgeFailure);
  }
  startup();

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

