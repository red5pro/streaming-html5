(function(window, document, red5prosdk, sm_extension) {
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
  sm_extension.setLogLevel(configuration.verboseLogging ? sm_extension.LOG_LEVELS.TRACE : sm_extension.LOG_LEVELS.WARN);
  sm_extension.decorate();

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
  var proxyLocal = window.query('local')
  var streamTitle = document.getElementById('stream-title');
  var statisticsField = document.getElementById('statistics-field');
  var addressField = document.getElementById('address-field');
  var validationForm = document.getElementById('validation-form');
  var validationSubmit = document.getElementById('validation-submit-btn');
  var validationAddButton = document.getElementById('add-param-btn');

  var protocol = proxyLocal ? 'https' : serverSettings.protocol;
  var isSecure = protocol === 'https';

  var bitrate = 0;
  var packetsReceived = 0;
  var frameWidth = 0;
  var frameHeight = 0;
  var retryLimit = 3;
  var retryDelay = 2000;

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

  var validationParamCount = 1;
  function getNewValidationParamForm () {
    validationParamCount += 1;
    var form = document.createElement('div');
    form.id = 'param-field' + validationParamCount;
    var innerForm = '<label for="param-name' + validationParamCount + '">Param Name:</label>' +
        '<input type="text" id="param-name' + validationParamCount + '" name="param_name' + validationParamCount + '">' +
        '<label for="param-value' + validationParamCount + '">Param Value:</label>' +
        '<input type="text" id="param-value' + validationParamCount + '" name="param_value' + validationParamCount + '">';
    form.innerHTML = innerForm;
    validationForm.appendChild(form);
    validationAddButton.parentElement.removeChild(validationAddButton);
    document.getElementById(form.id).appendChild(validationAddButton);
    return form;
  }

  function getValidationParams () {
    var kvObject = {}
    var nodes = validationForm.childNodes;
    var i = 0, length = nodes.length;
    var inputField, valueField;
    var fieldCount = 1;
    for(i; i < length; i++) {
      if (nodes[i].nodeType === 1) {
        inputField = document.getElementById('param-name' + (fieldCount));
        valueField = document.getElementById('param-value' + (fieldCount));
        if (inputField.value && valueField.value) {
          kvObject[inputField.value.trim()] = valueField.value.trim();
        }
        fieldCount = fieldCount + 1;
      }
    }
    return kvObject;
  }

  var autoscaleConfig = {
    action: 'subscribe',
    protocol: protocol,
    host: configuration.host,
    port: (isSecure || proxyLocal) ? undefined : serverSettings.httpport.toString(),
    scope: configuration.app,
    streamName: configuration.stream1,
    apiVersion: configuration.streamManagerAPI || '3.0',
    retryLimit: retryLimit,
    retryDelay: retryDelay
  };


  function shutdownVideoElement () {
    var videoElement = document.getElementById('red5pro-subscriber');
    if (videoElement) {
      videoElement.pause()
      videoElement.src = ''
    }
  }

  function displayhostname (hostname) {
    addressField.innerText =  'Edge Address: ' + hostname;
  }

  // Local lifecycle notifications.
  function onSubscriberEvent (event) {
    console.log('[Red5ProSubsriber] ' + event.type + '.');
    updateStatusFromEvent(event);
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

  function getAutoscaledSubscriber (config) {
    var rtcConfig = Object.assign({}, config, {
      protocol: getSocketLocationFromProtocol().protocol,
      port: getSocketLocationFromProtocol().port,
      streamName: config.stream1,
      subscriptionId: 'subscriber-' + Math.floor(Math.random() * 0x10000).toString(16),
      connectionParams: getValidationParams()
    })
    var rtmpConfig = Object.assign({}, config, {
      protocol: 'rtmp',
      port: serverSettings.rtmpport,
      streamName: name,
      embedHeight: '480px',
      width: config.cameraWidth,
      height: config.cameraHeight,
      buffer: 0.5,
      backgroundColor: '#000000',
      swf: '../../lib/red5pro/red5pro-subscriber.swf',
      swfobjectURL: '../../lib/swfobject/swfobject.js',
      productInstallURL: '../../lib/swfobject/playerProductInstall.swf',
      connectionParams: getValidationParams()
    })
    var hlsConfig = Object.assign({}, config, {
      protocol: 'http',
      port: serverSettings.hlsport,
      streamName: name,
      subscriptionId: 'subscriber-' + Math.floor(Math.random() * 0x10000).toString(16),
      connectionParams: getValidationParams()
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

    if (window.query('view')) {
      subscribeOrder = [window.query('view')];
    }

    var aConfig = Object.assign({}, autoscaleConfig, {
      connectionParams: getValidationParams()
    });

    var subscriber = new red5prosdk.Red5ProSubscriber();
    return subscriber.setPlaybackOrder(subscribeOrder)
      .autoscale(aConfig, {
        rtc: rtcConfig,
        rtmp: rtmpConfig,
        hls: hlsConfig
       });
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

  function startup () {
    validationSubmit.disabled = true;
    // Kick off.
    var config = Object.assign({}, configuration, defaultConfiguration);
    getAutoscaledSubscriber(config)
      .then(function (subscriberImpl) {
        streamTitle.innerText = configuration.stream1;
        targetSubscriber = subscriberImpl;
        // Subscribe to events.
        targetSubscriber.on('*', onSubscriberEvent);
        displayhostname(targetSubscriber.getOptions().host);
        return targetSubscriber.subscribe();
      })
      .then(function (sub) {
        onSubscribeSuccess(sub);
        validationSubmit.innerText = 'Stop Subscribing';
        validationSubmit.disabled = false;
   })
      .catch(function (error) {
        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
        console.error('[Red5ProSubscriber] :: Error in subscribing - ' + jsonError);
        onSubscribeFail(jsonError);
        validationSubmit.innerText = 'Start Subscribing';
        validationSubmit.disabled = false;
      });
  }

  function shutdown () {
    function clearRefs () {
      if (targetSubscriber) {
        targetSubscriber.off('*', onSubscriberEvent);
      }
      targetSubscriber = undefined;
      validationSubmit.innerText = 'Start Subscribing';
      validationSubmit.disabled = false;
    }
    unsubscribe().then(clearRefs).catch(clearRefs);
    window.untrackbitrate();
  }

  validationAddButton.addEventListener('click', getNewValidationParamForm);
  validationSubmit.addEventListener('click', function() {
    var wasSubscribing = targetSubscriber !== undefined;
    if (wasSubscribing) {
      shutdown();
    } else {
      startup();
    }
  });

  window.addEventListener('beforeunload', shutdown);

})(this, document, window.red5prosdk, window.red5prosdk_ext_stream_manager);

