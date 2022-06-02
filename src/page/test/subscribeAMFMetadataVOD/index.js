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
(function (window, document, red5prosdk) {
  'use strict';

  var serverSettings = (function () {
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
  //red5prosdk.setLogLevel(configuration.verboseLogging ? red5prosdk.LOG_LEVELS.TRACE : red5prosdk.LOG_LEVELS.WARN);
  red5prosdk.setLogLevel(red5prosdk.LOG_LEVELS.TRACE);

  var targetSubscriber;

  var nameInput = document.getElementById('name-input');
  var submitButton = document.getElementById('submit-button');
  submitButton.addEventListener('click', onsubmit)

  function onsubmit(event) {
    event.preventDefault()
    event.stopImmediatePropagation();
    var filename = nameInput.value;
    if (filename.split('.').length < 2) {
      alert('Expecting filename to have an extension (e.g., "filname.m3u8").');
    }
    else {
      playback(filename);
    }
    return false
  }

  var mediaFilesLink = document.getElementById('mediafiles-link');
  var playlistsLink = document.getElementById('playlists-link');
  mediaFilesLink.setAttribute('href', [window.location.origin, configuration.app, 'mediafiles'].join('/'));
  playlistsLink.setAttribute('href', [window.location.origin, configuration.app, 'playlists'].join('/'));

  var protocol = serverSettings.protocol;
  var isSecure = protocol === 'https';
  function getSocketLocationFromProtocol() {
    return !isSecure
      ? { protocol: 'ws', port: serverSettings.wsport }
      : { protocol: 'wss', port: serverSettings.wssport };
  }

  var defaultConfiguration = (function (useVideo, useAudio) {
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
  function onSubscriberEvent(event) {
    console.log('[Red5ProSubscriber] ' + event.type + '.');
  }
  function onSubscribeFail(message) {
    console.error('[Red5ProSubsriber] Subscribe Error :: ' + message);
  }
  function onSubscribeSuccess() {
    console.log('[Red5ProSubsriber] Subscribe Complete.');
  }
  function onUnsubscribeFail(message) {
    console.error('[Red5ProSubsriber] Unsubscribe Error :: ' + message);
  }
  function onUnsubscribeSuccess() {
    console.log('[Red5ProSubsriber] Unsubscribe Complete.');
  }

  function isMP4File(filename) {
    return filename.indexOf('.mp4') !== -1;
  }

  function isHLSFile(filename) {
    return filename.indexOf('.m3u8') !== -1;
  }

  function getAuthQueryParams() {
    var auth = configuration.authentication
    var kv = []
    for (var key in auth) {
      if (key === 'enabled' || auth[key] === '') continue
      kv.push(`${key}=${auth[key]}`)
    }
    return kv.join('&')
  }

  function getFileURL(filename) {
    var baseURL = protocol + '://' + configuration.host +
      ':' + (isSecure ? serverSettings.hlssport : serverSettings.hlsport) +
      '/' + configuration.app;
    if (isMP4File(filename)) {
      return baseURL + '/streams/' + filename;
    }
    return [baseURL, filename].join('/');
  }

  function useMP4Fallback(url) {
    if (configuration.authentication.enabled) {
      url += `?${getAuthQueryParams()}`
    }
    console.log('[subscribe] Playback MP4: ' + url);
    if (url.indexOf('streams/') === -1) {
      var paths = url.split('/');
      paths.splice(paths.length - 1, 0, 'streams');
      url = paths.join('/');
    }
    var element = document.getElementById('red5pro-subscriber');
    var source = document.createElement('source');
    source.type = 'video/mp4;codecs="avc1.42E01E, mp4a.40.2"';
    source.src = url;
    element.appendChild(source);
  }

  function enableMetadataMonitor(video) {
    console.log('enabled metadata monitor');
    const textTracks = typeof video.textTracks === 'function' ? video.textTracks() : video.textTracks
    if (textTracks) {
      video.addTextTrack('metadata')
      textTracks.addEventListener('addtrack', addTrackEvent => {
        let track = addTrackEvent.track
        track.mode = 'hidden'
        track.addEventListener('cuechange', cueChangeEvent => {
          let cues
          let i
          // Mostly Chrome.
          if (cueChangeEvent && cueChangeEvent.currentTarget) {
            cues = cueChangeEvent.currentTarget.cues
          }
          else if (undefined === this) {
            cues = track.cues
            cues = cues && cues.length > 0 ? cues : track.activeCues
          }
          else if (undefined !== this) {
            // Mostly Firefox & Safari.
            cues = cues && cues.length > 0 ? cues : this.activeCues
          }
          // Mostly failure.
          cues = cues || []
          for (i = 0; i < cues.length; i++) {
            let data = cues[i]
            if (data.value) {
              if (data.value.key === 'TXXX') {
                let metadata = JSON.parse(data.value.data)
                //console.log(metadata)
                processAMFData(metadata, video)
              }
            }
          }

        })

      })
    }
  }

  let metadataSet = new Set()
  function processAMFData(data, video) {
    //console.log('received data: ', data);
    const eventTimeMs = data.eventTimeMs
    if (!metadataSet.has(eventTimeMs)) {
      metadataSet.add(eventTimeMs)
      let now = new Date().getTime()
      if (now > playbackStart + eventTimeMs) {
        const p = document.getElementById('metadata')
        if (p) {
          p.innerHTML = JSON.stringify(data)
        }
      } else {
        setTimeout(() => {
          let now = new Date().getTime();
          console.log('showing', data, 'after', now - playbackStart, 'ms');
          const p = document.getElementById('metadata')
          if (p) {
            p.innerHTML = JSON.stringify(data)
          }
        }, (playbackStart + eventTimeMs) - now)
      }
    }
  }

  let playbackStart
  function useHLSJSFallback(url) {
    if (configuration.authentication.enabled) {
      url += `?${getAuthQueryParams()}`
    }
    console.log('[subscribe] Playback HLS: ' + url);
    var video = document.getElementById('red5pro-subscriber');
    video.classList.add('video-js');
    var videoSrc = url;
    if (window.Hls.isSupported()) {
      var hls = new window.Hls();
      // bind them together
      hls.attachMedia(video);
      hls.on(window.Hls.Events.MEDIA_ATTACHED, function () {
        console.log('video and hls.js are now bound together !');
        hls.loadSource(videoSrc);
        hls.on(window.Hls.Events.MANIFEST_PARSED, function (event, data) {
          video.play();
          video.currentTime = 1;
          playbackStart = new Date().getTime()
          console.log('manifest loaded, found ' + data.levels.length + ' quality level');
        });
      });
      enableMetadataMonitor(video)
    }
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
      enableMetadataMonitor(video)
    }
  }

  function determineSubscriber(streamName) {
    var config = Object.assign({}, configuration, defaultConfiguration);
    var hlsConfig = Object.assign({}, config, {
      protocol: protocol,
      port: isSecure ? serverSettings.hlssport : serverSettings.hlsport,
      streamName: streamName,
    });

    var subscriber = new red5prosdk.HLSSubscriber();
    return subscriber.init(hlsConfig)
  }

  // Request to unsubscribe.
  function unsubscribe() {
    return new Promise(function (resolve, reject) {
      var subscriber = targetSubscriber
      if (subscriber) {
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
      } else {
        resolve();
      }
    });
  }

  function determineStreamNameFromFilename(filename) {
    var parts = filename.split('.');
    var ext = parts[1];
    if (ext === 'm3u8') {
      return parts[0];
    }
    return filename;
  }

  function playback(filename) {
    var streamName = determineStreamNameFromFilename(filename);
    var start = function () {
      if (isMP4File(filename)) {
        useMP4Fallback(getFileURL(filename));
        return
      }
      // Kick off.
      determineSubscriber(streamName)
        .then(function (subscriberImpl) {
          targetSubscriber = subscriberImpl;
          // Subscribe to events.
          targetSubscriber.on('*', onSubscriberEvent);
          return targetSubscriber.subscribe();
        })
        .then(function () {
          onSubscribeSuccess();
        })
        .catch(function (error) {
          var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
          console.error('[Red5ProSubscriber] :: Error in subscribing - ' + jsonError);
          onSubscribeFail(jsonError);
          if (isHLSFile(filename)) {
            useHLSJSFallback(getFileURL(filename));
          } else if (isMP4File(filename)) {
            useMP4Fallback(getFileURL(filename));
          }
        });
    };

    if (typeof targetSubscriber !== 'undefined') {
      var reset = function reset() {
        var container = document.getElementById('video-container');
        while (container.hasChildNodes()) {
          container.removeChild(container.lastChild);
        }
        container.innerHTML = '<video id="red5pro-subscriber" controls playsinline autoplay class="video-element red5pro-subscriber red5pro-media red5pro-media-background"></video>';
        start();
      }
      unsubscribe().then(reset).catch(reset);
    } else {
      start();
    }
  }

  // Clean up.
  var shuttingDown = false;
  function shutdown() {
    if (shuttingDown) return;
    shuttingDown = true;
    function clearRefs() {
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