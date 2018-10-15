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

  var targetPublisher;

  var updateStatusFromEvent = window.red5proHandlePublisherEvent; // defined in src/template/partial/status-field-publisher.hbs
  var streamTitle = document.getElementById('stream-title');
  var statisticsField = document.getElementById('statistics-field');
  var addressField = document.getElementById('address-field');
  var validationForm = document.getElementById('validation-form');
  var validationSubmit = document.getElementById('validation-submit-btn');
  var validationAddButton = document.getElementById('add-param-btn');

  var proxyLocal = window.query('local')
  var protocol = proxyLocal ? 'https' : serverSettings.protocol;
  var isSecure = protocol == 'https';
  var retryLimit = 3;
  var retryDelay = 2000;

  function getSocketLocationFromProtocol () {
    return !isSecure
      ? {protocol: 'ws', port: serverSettings.wsport}
      : {protocol: 'wss', port: serverSettings.wssport};
  }

  var defaultConfiguration = {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port
  };

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
    action: 'broadcast',
    protocol: protocol,
    host: configuration.host,
    port: (isSecure || proxyLocal) ? undefined : serverSettings.httpport.toString(),
    scope: configuration.app,
    streamName: configuration.stream1,
    apiVersion: configuration.streamManagerAPI || '3.1',
    retryLimit: retryLimit,
    retryDelay: retryDelay,
    useProxy: true 
  };

  function displayServerAddress (serverAddress, proxyAddress) {
    proxyAddress = (typeof proxyAddress === 'undefined') ? 'N/A' : proxyAddress;
    addressField.innerText = ' Proxy Address: ' + proxyAddress + ' | ' + ' Origin Address: ' + serverAddress;
  }

  function onBitrateUpdate (bitrate, packetsSent) {
    statisticsField.innerText = 'Bitrate: ' + Math.floor(bitrate) + '. Packets Sent: ' + packetsSent + '.';
  }

  function onPublisherEvent (event) {
    console.log('[Red5ProPublisher] ' + event.type + '.');
    updateStatusFromEvent(event);
  }
  function onPublishFail (message) {
    console.error('[Red5ProPublisher] Publish Error :: ' + message);
  }
  function onPublishSuccess (publisher) {
    console.log('[Red5ProPublisher] Publish Complete.');
    try {
      window.trackBitrate(publisher.getPeerConnection(), onBitrateUpdate);
    }
    catch (e) {
      //
    }
  }
  function onUnpublishFail (message) {
    console.error('[Red5ProPublisher] Unpublish Error :: ' + message);
  }
  function onUnpublishSuccess () {
    console.log('[Red5ProPublisher] Unpublish Complete.');
  }

  function showAddress (publisher) {
    var config = publisher.getOptions();
    console.log("Host = " + config.host + " | " + "app = " + config.app);
    if (publisher.getType().toLowerCase() === 'rtc') {
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

  function getUserMediaConfiguration () {
    return {
      mediaConstraints: {
        audio: configuration.useAudio ? configuration.mediaConstraints.audio : false,
        video: configuration.useVideo ? configuration.mediaConstraints.video : false
      }
    };
  }

  function getRTMPMediaConfiguration () {
    return {
      mediaConstraints: {
        audio: configuration.useAudio ? configuration.mediaConstraints.audio : false,
        video: configuration.useVideo ? {
                width: configuration.cameraWidth,
                height: configuration.cameraHeight
              } : false
      }
    }
  }

  function getAutoscaledPublisher (config) {
    var rtcConfig = Object.assign({}, config, {
                      protocol: getSocketLocationFromProtocol().protocol,
                      port: getSocketLocationFromProtocol().port,
                      streamName: name,
                      connectionParams: getValidationParams()
                      }, getUserMediaConfiguration());
    var rtmpConfig = Object.assign({}, config, {
                      protocol: 'rtmp',
                      port: serverSettings.rtmpport,
                      streamName: name,
                      backgroundColor: '#000000',
                      connectionParams: getValidationParams(),
                      swf: '../../lib/red5pro/red5pro-publisher.swf',
                      swfobjectURL: '../../lib/swfobject/swfobject.js',
                      productInstallURL: '../../lib/swfobject/playerProductInstall.swf'
                      }, getRTMPMediaConfiguration());

    var publishOrder = config.publisherFailoverOrder
                            .split(',')
                            .map(function (item) {
                              return item.trim()
                        });

    if(window.query('view')) {
      publishOrder = [window.query('view')];
    }

    var aConfig = Object.assign({}, autoscaleConfig, {
      connectionParams: getValidationParams()
    });

    var publisher = new red5prosdk.Red5ProPublisher();
    return publisher.setPublishOrder(publishOrder)
            .autoscale(aConfig, {
                rtc: rtcConfig,
                rtmp: rtmpConfig
              });
  }

  function unpublish () {
    return new Promise(function (resolve, reject) {
      var publisher = targetPublisher;
      publisher.unpublish()
        .then(function () {
          onUnpublishSuccess();
          resolve();
        })
        .catch(function (error) {
          var jsonError = typeof error === 'string' ? error : JSON.stringify(error, 2, null);
          onUnpublishFail('Unmount Error ' + jsonError);
          reject(error);
        });
    });
  }

  function startup () {
    validationSubmit.classList.add('hidden');

    // Kick off.
    var config = Object.assign({},
                configuration,
                defaultConfiguration);

    getAutoscaledPublisher(config)
      .then(function (publisherImpl) {
        streamTitle.innerText = configuration.stream1;
        targetPublisher = publisherImpl;
        targetPublisher.on('*', onPublisherEvent);
        showAddress(targetPublisher);
        return targetPublisher.publish();
      })
      .then(function () {
        onPublishSuccess(targetPublisher);
      })
      .catch(function (error) {
        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
        console.error('[Red5ProPublisher] :: Error in access of Origin IP: ' + jsonError);
        updateStatusFromEvent({
          type: red5prosdk.PublisherEventTypes.CONNECT_FAILURE
        });
        onPublishFail(jsonError);
        validationSubmit.classList.remove('hidden');
      });

  }

  validationAddButton.addEventListener('click', getNewValidationParamForm);
  validationSubmit.addEventListener('click', startup);

  window.addEventListener('beforeunload', function() {
    function clearRefs () {
      if (targetPublisher) {
        targetPublisher.off('*', onPublisherEvent);
      }
      targetPublisher = undefined;
    }
    unpublish().then(clearRefs).catch(clearRefs);
    window.untrackBitrate();
  });
})(this, document, window.red5prosdk, window.red5prosdk_ext_stream_manager);

