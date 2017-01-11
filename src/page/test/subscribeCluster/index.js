(function(window, document, red5pro, SubscriberBase) {
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

  var targetSubscriber;
  var targetView;
  var instanceId = Math.floor(Math.random() * 0x10000).toString(16);
  var updateStatusFromEvent = function (event) {
    var subTypes = red5pro.SubscriberEventTypes;
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
  var protocol = serverSettings.protocol;
  var isSecure = protocol == 'https';
  function getSocketLocationFromProtocol () {
    return !isSecure
      ? {protocol: 'ws', port: serverSettings.wsport}
      : {protocol: 'wss', port: serverSettings.wssport};
  }

  var defaultConfiguration = (function(useVideo, useAudio) {
    var c = {
      protocol: getSocketLocationFromProtocol().protocol,
      port: getSocketLocationFromProtocol().port,
      app: 'live',
      bandwidth: {
        audio: 50,
        video: 256,
        data: 30 * 1000 * 1000
      }
    };
    if (!useVideo) {
      c.videoEncoding = red5pro.PlaybackVideoEncoder.NONE;
    }
    if (!useAudio) {
      c.audioEncoding = red5pro.PlaybackAudioEncoder.NONE;
    }
    return c;
  })(configuration.useVideo, configuration.useAudio);

  function shutdownVideoElement () {
    var videoElement = document.getElementById('red5pro-subscriber-video');
    if (videoElement) {
      videoElement.pause()
      videoElement.src = ''
    }
  }

  function displayServerAddress (serverAddress) {
    addressField.innerText = 'Origin Address: ' + serverAddress;
  }

  // Local lifecycle notifications.
  function onSubscriberEvent (event) {
    console.log('[Red5ProSubsriber] ' + event.type + '.');
    updateStatusFromEvent(event);
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
    var host = configuration.host;
    var port = serverSettings.httpport;
    var portURI = (port.length > 0 ? ':' + port : '');
    var baseUrl = isSecure ? protocol + '://' + host : protocol + '://' + host + portURI;
    var url = baseUrl + '/cluster';
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(function (res) {
          if (res.headers.get("content-type") &&
              res.headers.get("content-type").toLowerCase().indexOf("text/plain") >= 0) {
            res.text().then(value => {
              resolve(value.substring(0, value.indexOf(':')))
            })
          }
          else {
            reject(res)
          }
        })
        .catch(function (error) {
          var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
          console.error('[SubscriberClusterTest] :: Error - Could not requst Edge IP. ' + jsonError)
          reject(error)
        });
    });
  }

  function determineSubscriber (host) {
     displayServerAddress(host);
    var config = Object.assign({}, configuration, defaultConfiguration);
    var rtcConfig = Object.assign({}, config, {
      host: host,
      protocol: 'ws', // cluster is not over secure, at this time
      port: serverSettings.wsport, // cluster is not over secure, at this time
      subscriptionId: 'subscriber-' + instanceId,
      streamName: config.stream1,
      bandwidth: {
        audio: 50,
        video: 256,
        data: 30 * 1000 * 1000
      }
    })
    var rtmpConfig = Object.assign({}, config, {
      host: host,
      protocol: 'rtmp',
      port: serverSettings.rtmpport,
      streamName: config.stream1,
      mimeType: 'rtmp/flv',
      useVideoJS: false,
      width: config.cameraWidth,
      height: config.cameraHeight,
      swf: '../../lib/red5pro/red5pro-subscriber.swf',
      swfobjectURL: '../../lib/swfobject/swfobject.js',
      productInstallURL: '../../lib/swfobject/playerProductInstall.swf'
    })
    var hlsConfig = Object.assign({}, config, {
      host: host,
      protocol: protocol,
      port: isSecure ? serverSettings.hlssport : serverSettings.hlsport,
      streamName: config.stream1,
      mimeType: 'application/x-mpegURL',
      swf: '../../lib/red5pro/red5pro-video-js.swf',
      swfobjectURL: '../../lib/swfobject/swfobject.js',
      productInstallURL: '../../lib/swfobject/playerProductInstall.swf'
    })

    if (!config.useVideo) {
      rtcConfig.videoEncoding = 'NONE';
    }
    if (!config.useAudio) {
      rtcConfig.audioEncoding = 'NONE';
    }

    var subscribeOrder = config.subscriberFailoverOrder
                          .split(',').map(function (item) {
                            return item.trim();
                          });

    return SubscriberBase.determineSubscriber({
              rtc: rtcConfig,
              rtmp: rtmpConfig,
              hls: hlsConfig
            }, subscribeOrder);
  }

  function view (subscriber) {
    var elementId = 'red5pro-subscriber-video';
    return SubscriberBase.view(subscriber, elementId);
  }

  // Request to start subscribing using an overlayed configuration from local default and local storage.
  function subscribe (subscriber, view, streamName) {
    streamTitle.innerText = streamName;
    targetSubscriber = subscriber;
    targetView = view;
    if (targetSubscriber.getType().toLowerCase() === 'hls') {
      targetView.view.classList.add('video-js', 'vjs-default-skin')
    }
    // Initiate playback.
    return new Promise(function (resolve, reject) {
      SubscriberBase.subscribe(subscriber, view)
        .then(function () {
          onSubscribeSuccess();
          resolve();
        })
        .catch(reject);
    });
  }

  // Request to unsubscribe.
  function unsubscribe () {
    return new Promise(function(resolve, reject) {
      var view = targetView
      var subscriber = targetSubscriber
      SubscriberBase.unsubscribe(subscriber, view)
        .then(function () {
          targetSubscriber.off('*', onSubscriberEvent);
          targetSubscriber = undefined;
          targetView = undefined;
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

  // Kick off.
  requestEdge(configuration)
    .then(determineSubscriber)
    .then(function(payload) {
      var subscriber = payload.subscriber;
      // Subscribe to events.
      subscriber.on('*', onSubscriberEvent);
      return view(subscriber);
    })
    .then(function(payload) {
      var subscriber = payload.subscriber;
      var view = payload.view;
      subscribe(subscriber, view, configuration.stream1);
    })
    .catch(function (error) {
      var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
      console.error('[Red5ProSubscriber] :: Error in subscribing - ' + jsonError);
      onSubscribeFail(jsonError);
    });

  // Clean up.
  window.addEventListener('beforeunload', function() {
    function clearRefs () {
      targetSubscriber.off('*', onSubscriberEvent);
      targetSubscriber = targetView = undefined;
    }
    unsubscribe().then(clearRefs).catch(clearRefs);
  });

})(this, document, window.red5prosdk, new window.R5ProBase.Subscriber());

