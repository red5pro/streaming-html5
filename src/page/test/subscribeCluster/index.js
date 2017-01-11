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

  var targetSubscriber;
  var targetView;

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
    var config = Object.assign({}, configuration);
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
      host,
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

    var subscribeOrder = config.subscriberFailoverOrder.split(',').map(function (item) {
      return item.trim();
    });

    return new Promise(function (resolve, reject) {
      var subscriber = new red5pro.Red5ProSubscriber();
      var view = new red5pro.PlaybackView('red5pro-subscriber-video');
      var origAttachStream = view.attachStream.bind(view);
      view.attachStream = function (stream, autoplay) {
        origAttachStream(stream, autoplay)
        view.attachStream = origAttachStream
      };
      view.attachSubscriber(subscriber);

      subscriber.on('*', onSubscriberEvent);

      subscriber.setPlaybackOrder(subscribeOrder)
        .init({
          rtc: rtcConfig,
          rtmp: rtmpConfig,
          hls: hlsConfig
        })
        .then(function (selectedSubscriber) {
          if (selectedSubscriber.getType().toLowerCase() === subscriber.playbackTypes.HLS.toLowerCase()) {
            view.view.classList.add('video-js', 'vjs-default-skin')
          }
          subscriber.off('*', onSubscriberEvent);
          resolve({
            subscriber: selectedSubscriber,
            view: view
          });
        })
        .catch(function (error) {
          reject(error);
        });

    });
  }

  // Request to start subscribing using an overlayed configuration from local default and local storage.
  function subscribe (subscriber, view, streamName) {
    streamTitle.innerText = streamName;

    targetSubscriber = subscriber;
    targetView = view;

    // Initiate playback.
    subscriber.play()
      .then(function () {
        onSubscribeSuccess()
      })
      .catch(function (error) {
        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
        onSubscribeFail('Error - ' + jsonError);
      });
  }

  // Request to unsubscribe.
  function unsubscribe () {
    return new Promise(function(resolve, reject) {
      var view = targetView
      var subscriber = targetSubscriber
      if (subscriber) {
        subscriber.stop()
          .then(function () {
            view.view.src = ''
            subscriber.setView(undefined)
            subscriber.off('*', onSubscriberEvent);
            onUnsubscribeSuccess();
            resolve();
          })
          .catch(function (error) {
            var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
            onUnsubscribeFail('Unmount Error = ' + jsonError);
            reject('Could not unsubscribe: ' + error);
          });
      }
      else {
        resolve()
      }
    });
  }

  // Kick off.
  requestEdge(configuration)
    .then(determineSubscriber)
    .then(function(payload) {
      var subscriber = payload.subscriber;
      var view = payload.view
      // Subscribe to events.
      subscriber.on('*', onSubscriberEvent);
      subscribe(subscriber, view, configuration.stream1);
    })
    .catch(function (error) {
      onSubscribeFail(error);
      console.error('Could not subscriber with Edge IP: ' + error);
    });

  // Clean up.
  window.addEventListener('beforeunload', function() {
    function clearRefs () {
      targetSubscriber.off('*', onSubscriberEvent);
      targetSubscriber = targetView = undefined;
    }
    unsubscribe().then(clearRefs).catch(clearRefs);
  });

})(this, document, window.red5prosdk);
