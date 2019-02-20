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
  var audioSubscriber;

  var updateStatusFromEvent = window.red5proHandleSubscriberEvent; // defined in src/template/partial/status-field-subscriber.hbs
  var proxyLocal = window.query('local')
  var instanceId = Math.floor(Math.random() * 0x10000).toString(16);
  var streamTitle = document.getElementById('stream-title');
  var statisticsField = document.getElementById('statistics-field');

  var protocol = serverSettings.protocol;
  var protocol = proxyLocal ? 'https' : serverSettings.protocol;
  var isSecure = protocol === 'https';

  var bitrate = 0;
  var packetsReceived = 0;
  var frameWidth = 0;
  var frameHeight = 0;
  function updateStatistics (b, p, w, h) {
    statisticsField.innerText = 'Bitrate: ' + Math.floor(b) + '. Packets Received: ' + p + '.' + ' Resolution: ' + w + ', ' + h + '.';
  }

  function onBitrateUpdate (b, p) {
    bitrate = b;
    packetsReceived = p;
    updateStatistics(bitrate, packetsReceived, frameWidth, frameHeight);
  }

  function onResolutionUpdate (w, h) {
    frameWidth = w;
    frameHeight = h;
    updateStatistics(bitrate, packetsReceived, frameWidth, frameHeight);
  }

  function requestEdge (configuration) {
    var host = configuration.host;
    var app = configuration.app;
    var port = proxyLocal ? '' : serverSettings.httpport.toString();
    var portURI = (port.length > 0 ? ':' + port : '');
    var baseUrl = isSecure || proxyLocal ? protocol + '://' + host : protocol + '://' + host + portURI;
    var streamName = configuration.stream1;
    var apiVersion = configuration.streamManagerAPI || '3.1';
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

  var retryCount = 0;
  var retryLimit = 3;
  function respondToEdge (response) {
    subscribe(response);
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

  // Local lifecycle notifications.
  function onSubscriberEvent (event) {
    if (event.type !== 'Subscribe.Time.Update') {
      console.log('[Red5ProSubscriber] ' + event.type + '.');
      updateStatusFromEvent(event);
    }
  }

  function onSubscriberAudioEvent (event) {
    if (event.type !== 'Subscribe.Time.Update') {
      console.log('[Red5ProSubscriber:AUDIO] ' + event.type + '.');
      updateStatusFromEvent(event);
    }
  }

  function onSubscribeFail (message) {
    console.error('[Red5ProSubsriber] Subscribe Error :: ' + message);
  }
  function onSubscribeSuccess (subscriber) {
    console.log('[Red5ProSubsriber] Subscribe Complete.');
    if (subscriber.getType().toLowerCase() === 'rtc') {
      try {
        window.trackBitrate(subscriber.getPeerConnection(), onBitrateUpdate, onResolutionUpdate, true);
      }
      catch (e) {
        //
      }
    }
  }
  function onUnsubscribeFail (message) {
    console.error('[Red5ProSubsriber] Unsubscribe Error :: ' + message);
  }
  function onUnsubscribeSuccess () {
    console.log('[Red5ProSubsriber] Unsubscribe Complete.');
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

  // Request to unsubscribe.
  function unsubscribe (subscriber) {
    return new Promise(function(resolve, reject) {
      subscriber.unscubscribe()
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

  function subscribe (edgeData) {

    var host = edgeData.serverAddress;
    var name = edgeData.name;
    var app = edgeData.scope;
    var config = Object.assign({},
      configuration,
      defaultConfiguration);
    config.mediaConstraints.audio = false;

    var rtcConfig = Object.assign({}, config, {
      protocol: getSocketLocationFromProtocol().protocol,
      port: getSocketLocationFromProtocol().port,
      host: configuration.host,
      app: configuration.proxy,
      connectionParams: {
        host: host,
        app: app
      },
      subscriptionId: 'subscriber-' + instanceId,
      streamName: name
    });

    rtcConfig.connectionParams = Object.assign({}, 
      getAuthenticationParams().connectionParams,
      rtcConfig.connectionParams);

    new red5prosdk.RTCSubscriber()
      .init(rtcConfig)
      .then(function (subscriberImpl) {
        streamTitle.innerText = configuration.stream1;
        targetSubscriber = subscriberImpl
        // Subscribe to events.
        targetSubscriber.on('*', onSubscriberEvent);
        return targetSubscriber.subscribe()
      })
      .then(function () {
        onSubscribeSuccess(targetSubscriber);
        setupAudio(edgeData);
      })
      .catch(function (error) {
        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
      console.error('[Red5ProSubscriber] :: Error in subscribing - ' + jsonError);
        onSubscribeFail(jsonError);
      });

  }

  function marshalMuteOperation (audioSub) {
    if (targetSubscriber) {
      var videoElement = document.getElementById('red5pro-subscriber');
      var muteButtonList = document.getElementsByClassName('red5pro-media-muteunmute-button');
      if (muteButtonList.length > 0) {
        muteButtonList[0].addEventListener('click', function () {
          if (videoElement.muted) {
            audioSub.mute();
          }
          else {
            audioSub.unmute();
          }
        });
      }
    }
  }

  function setupAudio (edgeData) {

    var host = edgeData.serverAddress;
    var name = edgeData.name;
    var app = edgeData.scope;
    var config = Object.assign({},
      configuration,
      defaultConfiguration);

    config.mediaConstraints.video = false;

    var audioConfig = Object.assign({}, config, {
      protocol: getSocketLocationFromProtocol().protocol,
      port: getSocketLocationFromProtocol().port,
      host: configuration.host,
      app: configuration.proxy,
      connectionParams: {
        host: host,
        app: app
      },
      subscriptionId: 'subscriber-' + instanceId + '-audio',
      streamName: name + '_audio',
      mediaElementId: 'red5pro-audio'
    });

    audioConfig.connectionParams = Object.assign({}, 
      getAuthenticationParams().connectionParams,
      audioConfig.connectionParams);

    new red5prosdk.RTCSubscriber()
      .init(audioConfig)
      .then(function (subscriberImpl) {
        audioSubscriber = subscriberImpl;
        audioSubscriber.on('*', onSubscriberAudioEvent);
        return audioSubscriber.subscribe();
      })
      .then(function () {
        console.log('[Red5ProSubscriber:AUDIO] :: Complete');
        marshalMuteOperation(audioSubscriber);
        checkForAudioMuteSafari(targetSubscriber, audioSubscriber);
      })
      .catch(function (error) {
        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
        console.error('[Red5ProSubscriber] :: Error in subscribing - ' + jsonError);
        onSubscribeFail(jsonError);
      });
  }

  function checkForAudioMuteSafari (videoSubscriber, audioSubscriber) {
    var videoElement = videoSubscriber.getPlayer()
    var audioElement = audioSubscriber.getPlayer()
    var timeout = setTimeout(function () {
      clearTimeout(timeout);
      if (videoElement.played.length === 0) {
        checkForAudioMuteSafari(videoSubscriber, audioSubscriber);
      } else {
        if (videoElement.played.length !== audioElement.played.length) {
          audioElement.muted = true;
          videoSubscriber.mute();
        }
      }
    }, 1000);
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
      if (audioSubscriber) {
        audioSubscriber.off('*', onSubscriberAudioEvent);
      }
      targetSubscriber = undefined;
      audioSubscriber = undefined;
    }
    unsubscribe(targetSubscriber)
      .then(function () {
        if (audioSubscriber) {
          return unsubscribe(audioSubscriber);
        }
        return true;
      })
      .then(clearRefs).catch(clearRefs);
    window.untrackbitrate();
  });

})(this, document, window.red5prosdk);

