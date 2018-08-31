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

  var updateStatusFromEvent = window.red5proHandleSubscriberEvent; // defined in src/template/partial/status-field-subscriber.hbs
  var instanceId = Math.floor(Math.random() * 0x10000).toString(16);
  var streamTitle = document.getElementById('stream-title');
  var callButton = document.getElementById('call-button');
  var callList = document.getElementById('call-list');

  callButton.addEventListener('click', function() {
    if (!targetSubscriber) return;

    targetSubscriber.callServer('getLiveStreams', [])
      .then(function (data) {
        while (callList.hasChildNodes()) {
          callList.removeChild(callList.lastChild);
        }
        var list = data;
        var i, length = list.length;
        for (i = 0; i < length; i++) {
          var li = document.createElement('li');
          li.classList.add(i % 2 !== 0 ? 'call-list-item-odd' : 'call-list-item-even');
          li.innerText = list[i];
          callList.appendChild(li);
        }
        console.log('getLiveStreams return!');
      })
      .catch(function (e) {
        console.error('getLiveStreams error: ' + e);
      });
  });

  var protocol = serverSettings.protocol;
  var isSecure = protocol === 'https';
  function getSocketLocationFromProtocol () {
    return !isSecure
      ? {protocol: 'ws', port: serverSettings.wsport}
      : {protocol: 'wss', port: serverSettings.wssport};
  }

  function enableCallButton () {
    callButton.removeAttribute('disabled');
  }

  function disableCallButton () {
    callButton.setAttribute('disabled', 'disabled');
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
    if (event.type === 'Publisher.Connection.Closed') {
      disableCallButton();
    }
  }
  function onSubscribeFail (message) {
    console.error('[Red5ProSubsriber] Subscribe Error :: ' + message);
    disableCallButton();
  }
  function onSubscribeSuccess () {
    console.log('[Red5ProSubsriber] Subscribe Complete.');
  }
  function onUnsubscribeFail (message) {
    console.error('[Red5ProSubsriber] Unsubscribe Error :: ' + message);
    disableCallButton();
  }
  function onUnsubscribeSuccess () {
    console.log('[Red5ProSubsriber] Unsubscribe Complete.');
    disableCallButton();
  }

  // Request to unsubscribe.
  function unsubscribe () {
    return new Promise(function(resolve, reject) {
      var subscriber = targetSubscriber
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

    var config = Object.assign({},
      configuration,
      defaultConfiguration,
      getAuthenticationParams());
    var rtcConfig = Object.assign({}, config, {
      protocol: getSocketLocationFromProtocol().protocol,
      port: getSocketLocationFromProtocol().port,
      subscriptionId: 'subscriber-' + instanceId,
      streamName: config.stream1,
    })
    var rtmpConfig = Object.assign({}, config, {
      protocol: 'rtmp',
      port: serverSettings.rtmpport,
      streamName: config.stream1,
      width: config.cameraWidth,
      height: config.cameraHeight,
      backgroundColor: '#000000',
      swf: '../../lib/red5pro/red5pro-subscriber.swf',
      swfobjectURL: '../../lib/swfobject/swfobject.js',
      productInstallURL: '../../lib/swfobject/playerProductInstall.swf'
    })
    var hlsConfig = Object.assign({}, config, {
      protocol: protocol,
      port: isSecure ? serverSettings.hlssport : serverSettings.hlsport,
      streamName: config.stream1,
      mimeType: 'application/x-mpegURL'
    })

    var subscribeOrder = config.subscriberFailoverOrder
                          .split(',').map(function (item) {
                            return item.trim();
                          });

    if (window.query('view')) {
      subscribeOrder = [window.query('view')];
    }

    var subscriber = new red5prosdk.Red5ProSubscriber()
    subscriber.setPlaybackOrder(subscribeOrder)
      .init({
              rtc: rtcConfig,
              rtmp: rtmpConfig,
              hls: hlsConfig
      })
      .then(function (subscriberImpl) {
        streamTitle.innerText = configuration.stream1;
        targetSubscriber = subscriberImpl
        // Subscribe to events.
        targetSubscriber.on('*', onSubscriberEvent);
        return targetSubscriber.subscribe()
      })
      .then(function () {
        onSubscribeSuccess();
      if (targetSubscriber.getType().toLowerCase() === 'rtc') {
        enableCallButton();
      }
      })
      .catch(function (error) {
        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
        console.error('[Red5ProSubscriber] :: Error in subscribing - ' + jsonError);
        onSubscribeFail(jsonError);
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

