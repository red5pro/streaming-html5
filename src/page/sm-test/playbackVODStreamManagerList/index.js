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

  var videoContainer = document.getElementById('video-container');
  var errorNotification = document.getElementById('error-notification');
  var mediaListing = document.getElementById('media-file-listing');
  var playlistListing = document.getElementById('playlist-listing');
  var useCloudStorageCheckbox = document.getElementById('use-cloudstorage-checkbox');
  useCloudStorageCheckbox.addEventListener('change', refreshList);

  var subscriberNode = '<video id="red5pro-subscriber" controls autoplay playsinline class="red5pro-subscriber red5pro-media red5pro-media-background" width="640" height="480"></video>';

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
    if (event.type === 'Subscribe.Time.Update') return;
    console.log('[Red5ProSubscriber] ' + event.type + '.');
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

  function isMP4File (url) {
    return url.indexOf('.mp4') !== -1;
  }

  function useMP4Fallback (url) {
    if (configuration.authentication.enabled) {
      url += `?${getAuthQueryParams()}`
    }
    console.log('[subscribe] Playback MP4: ' + url);
    var element = document.getElementById('red5pro-subscriber');
    var source = document.createElement('source');
    source.type = 'video/mp4;codecs="avc1.42E01E, mp4a.40.2"';
    source.src = url;
    element.appendChild(source);
  }

  function useVideoJSFallback (url) {
    if (configuration.authentication.enabled) {
      url += `?${getAuthQueryParams()}`
    }
    console.log('[subscribe] Playback HLS: ' + url);
    var videoElement = document.getElementById('red5pro-subscriber');
    videoElement.classList.add('video-js');
    var source = document.createElement('source');
    source.type = 'application/x-mpegURL';
    source.src = url;
    videoElement.appendChild(source);
    var v = new window.videojs('red5pro-subscriber', {
      techOrder: ['html5']
    }, function () {
      // success.
    });
    v.play();
  }

  function showErrorNotification (message) {
    errorNotification.innerText = message;
    errorNotification.classList.remove('hidden');
  }
  function hideErrorNotification () {
    errorNotification.classList.add('hidden');
  }

  function getAuthQueryParams () {
    var auth = configuration.authentication
    var kv = []
    for (var key in auth) {
      if (key === 'enabled' || auth[key] === '') continue
      kv.push(`${key}=${auth[key]}`)
    }
    return kv.join('&')
  }

  function requestVOD (configuration, vodType /* mediafiles | playlists */) {
    var host = configuration.host;
    var app = configuration.app;
    var port = serverSettings.httpport;
    var baseUrl = protocol + '://' + host + ':' + port;
    var apiVersion = configuration.streamManagerAPI || '4.0';
    var url = baseUrl + '/streammanager/api/' + apiVersion + '/media/' + app + '/' + vodType + '?useCloud=' + useCloudStorageCheckbox.checked;
    if (configuration.authentication.enabled) {
      url += `&${getAuthQueryParams()}`
    }
    return new Promise(function (resolve, reject) {
        fetch(url)
          .then(function (res) {
            if (res.headers.get("content-type") &&
              res.headers.get("content-type").toLowerCase().indexOf("application/json") >= 0) {
                return res.json();
            }
            else {
              throw new TypeError('[RequestVOD] :: Could not properly parse response.');
            }
          })
          .then(function (json) {
            if (json.errorMessage) {
              throw new Error(json.errorMessage);
            } else {
              if (json[vodType]) {
                resolve(json[vodType]);
              } else {
                throw new Error('[RequestVOD] :: File not found');
              }
            }
          })
          .catch(function (error) {
            console.error('[SubscribeStreamManagerTest] :: Error - Could not request Playlists from Stream Manager. ' + error.message)
            showErrorNotification(error.message);
            reject(error)
          });
    });
  }

  var mediafiles = [];
  var playlists = [];

  function handlePlaylistSelect (event) {
    hideErrorNotification();
    var el = event.target;
    var index = parseInt(el.dataset.index, 10);
    if (!isNaN(index) && playlists.length > index) {
      var next = function () {
        respondToPlaylist(playlists[index]);
      }
      unsubscribe().then(next).catch(next);
    }
  }

  function handleMediafileSelect (event) {
    hideErrorNotification();
    var el = event.target;
    var index = parseInt(el.dataset.index, 10);
    if (!isNaN(index) && mediafiles.length > index) {
      var next = function () {
        var f = mediafiles[index];
        var url = f.url;
        var location = url.split('/');
        mediafiles[index] = Object.assign({}, f, {
          serverAddress: location[2],
          scope: [location[3], location[4]].join('/'),
          name: location[5]
        })
        var mediafile = mediafiles[index]
        if (isMP4File(mediafile.url)) {
          useMP4Fallback(mediafile.url);
        } else {
          copyFLVLocationToClipboard(mediafile)
        }
      }
      unsubscribe().then(next).catch(next);
     }
  }

  function displayPlaylists (list) {
    playlists = list;
    var i, length = list.length;
    var element;
    var textNode;
    while (playlistListing.firstChild) {
      playlistListing.removeChild(playlistListing.firstChild);
    }
    if (length > 0) {
      for (i = 0; i < length; i++) {
        element = document.createElement('p');
        textNode = document.createTextNode(list[i].name);
        element.dataset.index = i;
        element.appendChild(textNode);
        playlistListing.appendChild(element);
        if (i < length -1) {
          element.classList.add('item-separator')
        }
        element.addEventListener('click', handlePlaylistSelect);
      }
    } else {
      element = document.createElement('p');
      element.classList.add('load-listing');
      textNode = document.createTextNode('None found.');
      element.appendChild(textNode);
      playlistListing.appendChild(element);
    }
  }

  function displayMediaFiles (list) {
    mediafiles = list;
    var i, length = list.length;
    var element;
    var textNode;
    while (mediaListing.firstChild) {
      mediaListing.removeChild(mediaListing.firstChild);
    }
    if (length > 0) {
      for (i = 0; i < length; i++) {
        element = document.createElement('p');
        textNode = document.createTextNode(list[i].name);
        element.dataset.index = i;
        element.appendChild(textNode);
        mediaListing.appendChild(element);
        if (i < length -1) {
          element.classList.add('item-separator')
        }
        element.addEventListener('click', handleMediafileSelect);
      }
    } else {
      element = document.createElement('p');
      element.classList.add('load-listing');
      textNode = document.createTextNode('None found.');
      element.appendChild(textNode);
      mediaListing.appendChild(element);
    }
  }

  // Request to unsubscribe.
  function unsubscribe () {
    var cleanup = function () {
      try {
        document.getElementById('red5pro-subscriber').pause();
      } catch (e) {
        console.log('WARN: tried to stop playback. ' + e.message);
      } finally {
        while(videoContainer.firstChild) {
          videoContainer.removeChild(videoContainer.firstChild)
        }
        videoContainer.innerHTML = subscriberNode;
      }
    }
    return new Promise(function(resolve, reject) {
      var subscriber = targetSubscriber
      if (!subscriber) {
        cleanup();
        resolve();
        return;
      }
      subscriber.unsubscribe()
        .then(function () {
          targetSubscriber.off('*', onSubscriberEvent);
          targetSubscriber = undefined;
          cleanup();
          onUnsubscribeSuccess();
          resolve();
        })
        .catch(function (error) {
          cleanup();
          var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
          onUnsubscribeFail(jsonError);
          reject(error);
        });
    });
  }

  function respondToPlaylist (response) {
    var pathReg = /([^/]+)/g;
    var url = response.url;
    var name = response.name;
    var location = url.match(pathReg);
    var protocol = window.location.protocol.substring(0, window.location.protocol.length - 1)
    var host = window.location.hostname
    var port = window.location.port.length > 0 ? window.location.port : 443
    if (location.length > 1) {
      protocol = location[0].substring(0, location[0].length-1)
      host = location[1].split(':').length > 1 ? location[1].split(':')[0] : location[1]
      port = location[1].split(':').length > 1 ? location[1].split(':')[1] : ''
    }
    var app  = configuration.app;
    if (location.length > 4) {
      var paths = [location[2]]
      var pathIndex = 3;
      for (pathIndex; pathIndex < location.length - 1; pathIndex++) {
        paths.push(location[pathIndex]);
      }
      app = paths.join('/');
    }
    var config = Object.assign({}, configuration, defaultConfiguration);
    var hlsConfig = Object.assign({}, config, {
      host: host,
      app: app,
      protocol: protocol,
      port: port,
      streamName: name.split('.m3u8')[0],
      mimeType: 'application/x-mpegURL'
    });
    new red5prosdk.HLSSubscriber().init(hlsConfig)
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
        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
        console.error('[Red5ProSubscriber] :: Error in HLS playback. ' + jsonError);
        useVideoJSFallback(response.url);
//        showErrorNotification('[Red5ProSubscriber] :: Error in HLS playback. ' + jsonError);
      });
  }

  function copyFLVLocationToClipboard (response) {
    console.log(response)
    try {
      navigator.clipboard.writeText(response.url)
        .then(function () {
          console.log(response.url + ' add to clipboard!')
        })
        .catch(function (e) {
          console.error(e)
        })
    } catch (e) {
      console.error(e)
    }
  }

  function getPlaylists () {
    requestVOD(configuration, 'playlists')
      .then(function (listing) {
        displayPlaylists(listing);
      })
      .catch(function (error) {
        displayPlaylists([]);
        console.info(error);
      });
  }

  function getMediaFiles () {
    requestVOD(configuration, 'mediafiles')
      .then(function (listing) {
        displayMediaFiles(listing);
        getPlaylists();
      })
      .catch(function (error) {
        displayMediaFiles([]);
        getPlaylists();
        console.info(error);
      });
  }

  function refreshList() {
    getMediaFiles();
  }

  // start.
  getMediaFiles();
  // getPlaylists();

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

