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
  var instanceId = Math.floor(Math.random() * 0x10000).toString(16);
  var streamTitle = document.getElementById('stream-title');

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
  function onSubscribeSuccess () {
    console.log('[Red5ProSubsriber] Subscribe Complete.');
  }
  function onUnsubscribeFail (message) {
    console.error('[Red5ProSubsriber] Unsubscribe Error :: ' + message);
  }
  function onUnsubscribeSuccess () {
    console.log('[Red5ProSubsriber] Unsubscribe Complete.');
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

  var config = Object.assign({}, configuration, defaultConfiguration);
  config.mediaConstraints.audio = false;
  var rtcConfig = Object.assign({}, config, {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port,
    subscriptionId: 'subscriber-' + instanceId,
    streamName: config.stream1,
  });

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
      onSubscribeSuccess();
      setupAudio();
    })
    .catch(function (error) {
      var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
      console.error('[Red5ProSubscriber] :: Error in subscribing - ' + jsonError);
      onSubscribeFail(jsonError);
    });

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

  function setupAudio () {
    var config = Object.assign({}, configuration, defaultConfiguration);
    config.mediaConstraints.video = false;
    var audioConfig = Object.assign({}, config, {
      protocol: getSocketLocationFromProtocol().protocol,
      port: getSocketLocationFromProtocol().port,
      subscriptionId: 'subscriber-' + instanceId + '-audio',
      streamName: config.stream1 + '_audio',
      mediaElementId: 'red5pro-audio'
    });
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
      })
      .catch(function (error) {
        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
        console.error('[Red5ProSubscriber] :: Error in subscribing - ' + jsonError);
        onSubscribeFail(jsonError);
      });
  }

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
  });

})(this, document, window.red5prosdk);

