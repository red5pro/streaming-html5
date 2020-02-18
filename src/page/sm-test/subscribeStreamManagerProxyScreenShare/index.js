/*
Copyright © 2015 Infrared5, Inc. All rights reserved.

The accompanying code comprising examples for use solely in conjunction with Red5 Pro (the "Example Code") 
is  licensed  to  you  by  Infrared5  Inc.  in  consideration  of  your  agreement  to  the  following  
license terms  and  conditions.  Access,  use,  modification,  or  redistribution  of  the  accompanying  
code  constitutes your acceptance of the following license terms and conditions.

Permission is hereby granted, free of charge, to you to use the Example Code and associated documentation 
files (collectively, the "Software") without restriction, including without limitation the rights to use, 
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit 
persons to whom the Software is furnished to do so, subject to the following conditions:

The Software shall be used solely in conjunction with Red5 Pro. Red5 Pro is licensed under a separate end 
user  license  agreement  (the  "EULA"),  which  must  be  executed  with  Infrared5,  Inc.   
An  example  of  the EULA can be found on our website at: https://account.red5pro.com/assets/LICENSE.txt.

The above copyright notice and this license shall be included in all copies or portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,  INCLUDING  BUT  
NOT  LIMITED  TO  THE  WARRANTIES  OF  MERCHANTABILITY, FITNESS  FOR  A  PARTICULAR  PURPOSE  AND  
NONINFRINGEMENT.   IN  NO  EVENT  SHALL INFRARED5, INC. BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN  AN  ACTION  OF  CONTRACT,  TORT  OR  OTHERWISE,  ARISING  FROM,  OUT  OF  OR  IN CONNECTION 
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
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
  var bitrateField = document.getElementById('bitrate-field');
  var packetsField = document.getElementById('packets-field');
  var resolutionField = document.getElementById('resolution-field');

  var addressField = document.getElementById('address-field');

  var protocol = proxyLocal ? 'https' : serverSettings.protocol;
  var isSecure = protocol === 'https';

  var bitrate = 0;
  var packetsReceived = 0;
  var frameWidth = 0;
  var frameHeight = 0;
  function updateStatistics (b, p, w, h) {
    statisticsField.classList.remove('hidden');
    bitrateField.innerText = b === 0 ? 'N/A' : Math.floor(b);
    packetsField.innerText = p;
    resolutionField.innerText = (w || 0) + 'x' + (h || 0);
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
    var port = serverSettings.httpport;
    var baseUrl = protocol + '://' + host + ':' + port;
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

  function displayServerAddress (serverAddress, proxyAddress) {
    proxyAddress = (typeof proxyAddress === 'undefined') ? 'N/A' : proxyAddress;
    addressField.innerText = ' Proxy Address: ' + proxyAddress + ' | ' + ' Edge Address: ' + serverAddress;
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

  // Local lifecycle notifications.
  function onSubscriberEvent (event) {
    if (event.type !== 'Subscribe.Time.Update') {
      console.log('[Red5ProSubscriber] ' + event.type + '.');
      updateStatusFromEvent(event);
      if (event.type === 'Subscribe.VideoDimensions.Change') {
        onResolutionUpdate(event.data.width, event.data.height);
      }  
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
    if (window.exposeSubscriberGlobally) {
      window.exposeSubscriberGlobally(subscriber);
    }
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
    rtcConfig.connectionParams = Object.assign(getAuthenticationParams(), rtcConfig.connectionParams);

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
        showServerAddress(targetSubscriber);
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
    audioConfig.connectionParams = Object.assign(getAuthenticationParams(), audioConfig.connectionParams);

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
  var shuttingDown = false;
  function shutdown() {
    if (shuttingDown) return;
    shuttingDown = true;
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
    window.untrackBitrate();
  }
  window.addEventListener('pagehide', shutdown);
  window.addEventListener('beforeunload', shutdown);

})(this, document, window.red5prosdk);

