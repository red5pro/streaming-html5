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

  var streamTitle = document.getElementById('stream-title');
  var nameInput = document.getElementById('name-input');
  var submitButton = document.getElementById('submit-button');
  submitButton.addEventListener('click', function () {
    var filename = nameInput.value;
    if (filename.split('.').length < 2) {
      alert('Expecting filename to have an extension (e.g., "filname.flv").');
    }
    else {
      playback(filename);
    }
  });

  var mediaFilesLink = document.getElementById('mediafiles-link');
  var playlistsLink = document.getElementById('playlists-link');
  mediaFilesLink.setAttribute('href', [window.location.origin, configuration.app, 'mediafiles'].join('/'));
  playlistsLink.setAttribute('href', [window.location.origin, configuration.app, 'playlists'].join('/'));

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
    console.log('[Red5ProSubscriber] ' + event.type + '.');
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
      port: window.location.port,
      streamName: config.stream1,
      mimeType: 'application/x-mpegURL'
    })

    var subscriber = new red5prosdk.Red5ProSubscriber();
    return subscriber.setPlaybackOrder(['rtmp', 'hls'])
      .init({
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

  var formats = {
    rtmp: ['mp4', 'flv'],
    hls: ['m3u8']
  }

  function determineFailoverOrderFromFilename (filename) {
    var ext = filename.split('.')[1];
    for (var key in formats) {
      var i = formats[key].length;
      while (--i > -1) {
        if (formats[key][i] === ext) {
          return key;
        }
      }
    }
    return configuration.subscriberFailoverOrder;
  }

  function determineStreamNameFromFilename (filename) {
    var parts = filename.split('.');
    var ext = parts[1];
    if (ext === 'm3u8') {
      return parts[0];
    }
    return filename;
  }

  function playback(filename) {
    configuration.subscriberFailoverOrder = determineFailoverOrderFromFilename(filename);
    configuration.stream1 = determineStreamNameFromFilename(filename);

    var start = function () {
      // Kick off.
      determineSubscriber()
        .then(function(subscriberImpl) {
          streamTitle.innerText = configuration.stream1;
          targetSubscriber = subscriberImpl;
          // Subscribe to events.
          targetSubscriber.on('*', onSubscriberEvent);
          return targetSubscriber.subscribe();
        })
        .then(function() {
          onSubscribeSuccess();
        })
        .catch(function (error) {
          var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
          console.error('[Red5ProSubscriber] :: Error in subscribing - ' + jsonError);
          onSubscribeFail(jsonError);
        });
    };

    if (typeof targetSubscriber !== 'undefined') {
      var reset = function reset() {
        var container = document.getElementById('video-container');
        while (container.hasChildNodes()) {
          container.removeChild(container.lastChild);
        }
        container.innerHTML = '<video id="red5pro-subscriber-video" controls class="video-element"></video>';
        start();
      }
      unsubscribe().then(reset).catch(reset);
    }
    else {
      start();
    }
  }

  // Clean up.
  var shuttingDown = false;
  function shutdown() {
    if (shuttingDown) return;
    shuttingDown = true;
    function clearRefs () {
      if (targetSubscriber) {
        targetSubscriber.off('*', onSubscriberEvent);
      }
      targetSubscriber = undefined;
    }
    unsubscribe().then(clearRefs).catch(clearRefs);
  }
  window.addEventListener('pagehide', shutdown);
  window.addEventListener('beforeunload', shutdown);

})(this, document, window.red5prosdk);

