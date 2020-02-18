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
  var edgeData;

  var streamTitle = document.getElementById('stream-title');
  var errorNotification = document.getElementById('error-notification');
  var mediaListing = document.getElementById('media-file-listing');
  var playlistListing = document.getElementById('playlist-listing');

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
  function onSubscribeFail (message) {
    console.error('[Red5ProSubsriber] Subscribe Error :: ' + message);
    showErrorNotification(message);
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


  var generateFlashEmbedObject = function (id) {
    var obj = document.createElement('object');
    obj.type = 'application/x-shockwave-flash';
    obj.id = id;
    obj.name = id;
    obj.align = 'middle';
    obj.data = '../../lib/red5pro/red5pro-subscriber.swf';
    obj.width = '100%';
    obj.height = '480';
    obj.classList.add('red5pro-subscriber', 'red5pro-media-background', 'red5pro-media');
    obj.innerHTML = '<param name="quality" value="high">' +
              '<param name="wmode" value="opaque">' +
              '<param name="bgcolor" value="#000000">' +
              '<param name="allowscriptaccess" value="always">' +
              '<param name="allowfullscreen" value="true">' +
              '<param name="allownetworking" value="all">';
    return obj;
  }

  function isMP4File (url) {
    return url.indexOf('.mp4') !== -1;
  }

  function useMP4Fallback (url) {
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

  function useFLVFallback (host, app, streamName) {
    console.log('[subscribe] Playback FLV: ' + streamName);
    var container = document.getElementById('red5pro-subscriber');
    var parent = container ? container.parentNode : document.getElementById('video-container');
    if (container && parent) {
      parent.removeChild(container);
    }
    var flashElement = generateFlashEmbedObject('red5pro-subscriber');
    var flashvars = document.createElement('param');
      flashvars.name = 'flashvars';
      flashvars.value = 'stream='+streamName+'&'+
                        'app='+app+'&'+
                        'host='+host+'&'+
                        'muted=false&'+
                        'autoplay=true&'+
                        'backgroundColor=#000000&'+
                        'buffer=0.5&'+
                        'autosize=true';
    flashElement.appendChild(flashvars);
    parent.appendChild(flashElement);
  }

  function useVideoJSFallback (url) {
    console.log('[subscribe] Playback HLS: ' + url);
    var videoElement = document.getElementById('red5pro-subscriber');
    videoElement.classList.add('video-js');
    var source = document.createElement('source');
    source.type = 'application/x-mpegURL';
    source.src = url;
    videoElement.appendChild(source);
    new window.videojs(videoElement, {
      techOrder: ['html5', 'flash']
    }, function () {
      // success.
    });
  }

  function showErrorNotification (message) {
    errorNotification.innerText = message;
    errorNotification.classList.remove('hidden');
  }
  function hideErrorNotification () {
    errorNotification.classList.add('hidden');
  }

  function requestVOD (configuration, vodType /* mediafiles | playlists */) {
    var host = configuration.host;
    var app = configuration.app;
    var port = serverSettings.httpport;
    var baseUrl = protocol + '://' + host + ':' + port;
    var apiVersion = configuration.streamManagerAPI || '3.1';
    var url = baseUrl + '/streammanager/api/' + apiVersion + '/media/' + app + '/' + vodType;
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

  function requestEdge (configuration, vod) {
    var host = configuration.host;
    var app = configuration.app;
    var port = serverSettings.httpport;
    var baseUrl = protocol + '://' + host + ':' + port;
    var apiVersion = configuration.streamManagerAPI || '3.1';
    var url = baseUrl + '/streammanager/api/' + apiVersion + '/media/' + app + '/' + vod;
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
              resolve(json);
            }
          })
          .catch(function (error) {
            console.error('[SubscribeStreamManagerTest] :: Error - Could not request Edge IP from Stream Manager. ' + error.message)
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
        requestEdge(configuration, mediafiles[index].name)
          .then(respondToEdge)
          .catch(function (error) {
            console.error(error);
            showErrorNotification(error);
          });
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

  function forceFallback (edgeData) {
    if (isMP4File(edgeData.url)) {
      useMP4Fallback(edgeData.url);
    } else {
      useFLVFallback(edgeData.serverAddress, edgeData.scope, edgeData.name);
    }
  }

  // Request to unsubscribe.
  function unsubscribe () {
    return new Promise(function(resolve, reject) {
      var subscriber = targetSubscriber
      if (!subscriber) {
        resolve();
        return;
      }
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

  function respondToPlaylist (response) {
    var pathReg = /([^/]+)/g;
    var url = response.url;
    var name = response.name;
    var location = url.match(pathReg);
    var protocol = location[0].substring(0, location[0].length-1);
    var host = location[1].split(':').length > 1 ? location[1].split(':')[0] : location[1]
    var port = location[1].split(':').length > 1 ? location[1].split(':')[1] : ''
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
        streamTitle.innerText = name;
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

  function respondToEdge (response) {
    edgeData = response;
    var host = edgeData.serverAddress;
    var name = edgeData.name;
    var app = edgeData.scope;
    var config = Object.assign({}, configuration, defaultConfiguration);
    var rtmpConfig = Object.assign({}, config, {
      host: host,
      app: app,
      protocol: 'rtmp',
      port: serverSettings.rtmpport,
      streamName: name,
      backgroundColor: '#000000',
      width: config.cameraWidth,
      height: config.cameraHeight,
      swf: '../../lib/red5pro/red5pro-subscriber.swf',
      swfobjectURL: '../../lib/swfobject/swfobject.js',
      productInstallURL: '../../lib/swfobject/playerProductInstall.swf'
    });

    new red5prosdk.RTMPSubscriber().init(rtmpConfig)
      .then(function (subscriberImpl) {
        streamTitle.innerText = configuration.stream1;
        targetSubscriber = subscriberImpl;
        // Subscribe to events.
        targetSubscriber.on('*', onSubscriberEvent);
        return targetSubscriber.subscribe();
      })
      .then(function () {
        onSubscribeSuccess();
      })
      .catch(function (error) { // eslint-disable-line no-unused-vars
        try {
          forceFallback(edgeData)
        } catch (e) {
          console.error('[Red5ProSubscriber] :: Error in subscribing - ' + e.message);
          onSubscribeFail(e.message);
        }
      });
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

