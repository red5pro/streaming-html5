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

  var updateStatusFromEvent = function (event) {
    var subTypes = red5pro.SubscriberEventTypes;
    switch (event.type) {
        case subTypes.CONNECT_FAILURE:
        case subTypes.SUBSCRIBE_FAIL:
          shutdownAudioElement();
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

  var defaultConfiguration = {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port,
    app: 'live',
    bandwidth: {
      audio: 50,
      video: 256,
      data: 30 * 1000 * 1000
    },
    videoEncoding: 'NONE'
  }

  function shutdownAudioElement () {
    var audioElement = document.getElementById('red5pro-subscriber-audio');
    if (audioElement) {
      audioElement.pause()
      audioElement.src = ''
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

  function determineSubscriber () {
    var config = Object.assign({}, configuration, defaultConfiguration);
    config.streamName = config.stream1;
    return SubscriberBase.getRTCSubscriber(config);
  }

  // Request to start subscribing using an overlayed configuration from local default and local storage.
  function subscribe (subscriber, view, streamName) {
    streamTitle.innerText = streamName;
    targetSubscriber = subscriber;
    targetView = view;
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

  function view (subscriber) {
    var elementId = 'red5pro-subscriber-audio';
    return SubscriberBase.view(subscriber, elementId);
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
  determineSubscriber()
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

