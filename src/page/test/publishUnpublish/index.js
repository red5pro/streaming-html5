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


  var targetPublisher;

  var previewControl = document.getElementById('remove-preview-control');
  var previewCheck = document.getElementById('remove-preview-check');
  var pubUnpubButton = document.getElementById('publish-unpublish-btn');

  var currentState = '';
  var STATE_PUBLISHING = 'publishingState';
  var STATE_UNPUBLISHED = 'unpublishedState';
  function enablePreview (toEnable) {
    previewCheck.setAttribute('disabled', toEnable);
    pubUnpubButton.setAttribute('disabled', toEnable);
    pubUnpubButton.disabled = previewCheck.disabled = false;
  }
  function setUIState (state) {
    currentState = state;
    if (state === STATE_PUBLISHING) {
      enablePreview(true);
      previewControl.classList.remove('hidden');
      pubUnpubButton.innerText = 'Unpublish';
    } else if (state === STATE_UNPUBLISHED) {
      previewControl.classList.add('hidden');
      pubUnpubButton.innerText = 'Publish';
      pubUnpubButton.setAttribute('disabled', false);
      pubUnpubButton.disabled = false;
    }
  }
  pubUnpubButton.addEventListener('click', function () {
    if (currentState === STATE_PUBLISHING) {
      var removePreview = previewCheck.checked;
      unpublish(removePreview);
    } else {
      beginPublish();
    }
  })

  var updateStatusFromEvent = window.red5proHandlePublisherEvent; // defined in src/template/partial/status-field-publisher.hbs
  var streamTitle = document.getElementById('stream-title');
  var statisticsField = document.getElementById('statistics-field');

  var protocol = serverSettings.protocol;
  var isSecure = protocol == 'https';
  function getSocketLocationFromProtocol () {
    return !isSecure
      ? {protocol: 'ws', port: serverSettings.wsport}
      : {protocol: 'wss', port: serverSettings.wssport};
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
    setUIState(STATE_PUBLISHING);
    try {
      window.trackBitrate(publisher.getPeerConnection(), onBitrateUpdate);
    }
    catch (e) {
      // no tracking for you!
    }
  }
  function onUnpublishFail (message) {
    console.error('[Red5ProPublisher] Unpublish Error :: ' + message);
    targetPublisher = undefined;
    setUIState(STATE_UNPUBLISHED);
  }
  function onUnpublishSuccess () {
    console.log('[Red5ProPublisher] Unpublish Complete.');
    targetPublisher = undefined;
    setUIState(STATE_UNPUBLISHED);
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

  function unpublish (removePreview) {
    return new Promise(function (resolve, reject) {
      var publisher = targetPublisher;
      publisher.unpublish(removePreview)
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

  var config = Object.assign({},
    configuration,
    {
      streamMode: configuration.recordBroadcast ? 'record' : 'live'
    },
    getAuthenticationParams(),
    getUserMediaConfiguration());

  var rtcConfig = Object.assign({}, config, {
                      protocol: getSocketLocationFromProtocol().protocol,
                      port: getSocketLocationFromProtocol().port,
                      streamName: config.stream1,
                   });
  var rtmpConfig = Object.assign({}, config, {
                      protocol: 'rtmp',
                      port: serverSettings.rtmpport,
                      streamName: config.stream1,
                      backgroundColor: '#000000',
                      swf: '../../lib/red5pro/red5pro-publisher.swf',
                      swfobjectURL: '../../lib/swfobject/swfobject.js',
                      productInstallURL: '../../lib/swfobject/playerProductInstall.swf'
                    }, getRTMPMediaConfiguration());
  var publishOrder = config.publisherFailoverOrder
                            .split(',')
                            .map(function (item) {
                              return item.trim()
                        });

  if (window.query('view')) {
    publishOrder = [window.query('view')];
  }

  function beginPublish () {
    var publisher = new red5prosdk.Red5ProPublisher()
    publisher.setPublishOrder(publishOrder)
      .init({
        rtc: rtcConfig,
        rtmp: rtmpConfig
      })
      .then(function (publisherImpl) {
        streamTitle.innerText = configuration.stream1;
        targetPublisher = publisherImpl;
        targetPublisher.on('*', onPublisherEvent);
        return targetPublisher.publish();
      })
      .then(function () {
        onPublishSuccess(targetPublisher);
      })
      .catch(function (error) {
        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
        console.error('[Red5ProPublisher] :: Error in publishing - ' + jsonError);
        onPublishFail(jsonError);
       });
  }

  var shuttingDown = false;
  function shutdown() {
    if (shuttingDown) return;
    shuttingDown = true;
    function clearRefs () {
      if (targetPublisher) {
        targetPublisher.off('*', onPublisherEvent);
      }
      targetPublisher = undefined;
    }
    var removePreview = previewCheck.checked;
    unpublish(removePreview).then(clearRefs).catch(clearRefs);
    window.untrackBitrate();
  }
  window.addEventListener('pagehide', shutdown);
  window.addEventListener('beforeunload', shutdown);

  beginPublish();

})(this, document, window.red5prosdk);

