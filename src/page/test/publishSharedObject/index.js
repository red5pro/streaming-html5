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

  var SharedObject = red5prosdk.Red5ProSharedObject;
  var so = undefined; // @see onPublishSuccess

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

  var updateStatusFromEvent = window.red5proHandlePublisherEvent; // defined in src/template/partial/status-field-publisher.hbs
  var streamTitle = document.getElementById('stream-title');
  var statisticsField = document.getElementById('statistics-field');
  var sendButton = document.getElementById('send-button');
  var soField = document.getElementById('so-field');
  sendButton.addEventListener('click', function () {
    sendMessageOnSharedObject(document.getElementById('input-field').value);
  });
  var colorPicker = document.getElementById('color-picker');
  var bitrateField = document.getElementById('bitrate-field');
  var packetsField = document.getElementById('packets-field');
  var resolutionField = document.getElementById('resolution-field');

  var bitrate = 0;
  var packetsSent = 0;
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
    packetsSent = p;
    updateStatistics(bitrate, packetsSent, frameWidth, frameHeight);
  }

  function onResolutionUpdate (w, h) {
    frameWidth = w;
    frameHeight = h;
    updateStatistics(bitrate, packetsSent, frameWidth, frameHeight);
  }


  var protocol = serverSettings.protocol;
  var isSecure = protocol == 'https';
  function getSocketLocationFromProtocol () {
    return !isSecure
      ? {protocol: 'ws', port: serverSettings.wsport}
      : {protocol: 'wss', port: serverSettings.wssport};
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

    establishSharedObject(publisher);
    try {
      var pc = publisher.getPeerConnection();
      var stream = publisher.getMediaStream();
      window.trackBitrate(pc, onBitrateUpdate);
      statisticsField.classList.remove('hidden');
      stream.getVideoTracks().forEach(function (track) {
        var settings = track.getSettings();
        onResolutionUpdate(settings.width, settings.height);
      });
    }
    catch (e) {
      // no tracking for you!
    }
  }
  function onUnpublishFail (message) {
    console.error('[Red5ProPublisher] Unpublish Error :: ' + message);
  }
  function onUnpublishSuccess () {
    console.log('[Red5ProPublisher] Unpublish Complete.');
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

  colorPicker.addEventListener('input', handleColorChangeRequest);

  function handleColorChangeRequest (event) {
    if (so) {
      so.setProperty('color', event.target.value);
      /*
      so.send('messageTransmit', {
        user: configuration.stream1,
        message: 'Color changed to: ' + event.target.value.toString()
      });
      */
    }
  }

  function appendMessage (message) {
    soField.value = [message, soField.value].join('\n');
  }
  // Invoked from METHOD_UPDATE event on Shared Object instance.
  function messageTransmit (message) { // eslint-disable-line no-unused-vars
    soField.value = ['User "' + message.user + '": ' + message.message, soField.value].join('\n');
  }
  function establishSharedObject (publisher) {
    // Create new shared object.
    so = new SharedObject('sharedChatTest', publisher)
    var soCallback = {
      messageTransmit: messageTransmit
    };
    so.on(red5prosdk.SharedObjectEventTypes.CONNECT_SUCCESS, function (event) { // eslint-disable-line no-unused-vars
      console.log('[Red5ProPublisher] SharedObject Connect.');
      appendMessage('Connected.');
      colorPicker.removeAttribute('disabled');
    });
    so.on(red5prosdk.SharedObjectEventTypes.CONNECT_FAILURE, function (event) { // eslint-disable-line no-unused-vars
      console.log('[Red5ProPublisher] SharedObject Fail.');
    });
    so.on(red5prosdk.SharedObjectEventTypes.PROPERTY_UPDATE, function (event) {
      console.log('[Red5ProPublisher] SharedObject Property Update.');
      console.log(JSON.stringify(event.data, null, 2));
      if (event.data.hasOwnProperty('color')) {
        soField.style.color = event.data.color;
        colorPicker.value = event.data.color;
      }
    });
    so.on(red5prosdk.SharedObjectEventTypes.METHOD_UPDATE, function (event) {
      console.log('[Red5ProPublisher] SharedObject Method Update.');
      console.log(JSON.stringify(event.data, null, 2));
      soCallback[event.data.methodName].call(null, event.data.message);
    });
  }

  function sendMessageOnSharedObject (message) {
    so.send('messageTransmit', {
      user: configuration.stream1,
      message: message
    });
  }

  function determinePublisher () {

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
                      streamName: config.stream1
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

    if(window.query('view')) {
      publishOrder = [window.query('view')];
    }

    var publisher = new red5prosdk.Red5ProPublisher();
    return publisher.setPublishOrder(publishOrder)
            .init({
                rtc: rtcConfig,
                rtmp: rtmpConfig
              });
  }

  function unpublish () {
    if (so !== undefined) {
      so.close();
    }
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

  // Kick off.
  determinePublisher()
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
      console.error(error);
      onPublishFail(jsonError);
     });

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
    unpublish().then(clearRefs).catch(clearRefs);
    window.untrackBitrate();
  }
  window.addEventListener('pagehide', shutdown);
  window.addEventListener('beforeunload', shutdown);

})(this, document, window.red5prosdk);

