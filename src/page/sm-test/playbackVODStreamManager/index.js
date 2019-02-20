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
  var nameInput = document.getElementById('name-input');
  var submitButton = document.getElementById('submit-button');
  submitButton.addEventListener('click', function () {
    var filename = nameInput.value;
    if (filename.split('.').length < 2) {
      alert('Expecting filename to have an extension (e.g., "filname.flv" or "filename.m3u8").');
    }
    else {
      playback(filename);
    }
  });

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

  function requestPlaylist (configuration, vod) {
    var host = configuration.host;
    var app = configuration.app;
    var port = serverSettings.httpport.toString();
    var portURI = (port.length > 0 ? ':' + port : '');
    var baseUrl = isSecure ? protocol + '://' + host : protocol + '://' + host + portURI;
    var apiVersion = configuration.streamManagerAPI || '3.1';
    var url = baseUrl + '/streammanager/api/' + apiVersion + '/media/' + app + '/playlists';
    return new Promise(function (resolve, reject) {
        fetch(url)
          .then(function (res) {
            if (res.headers.get("content-type") &&
              res.headers.get("content-type").toLowerCase().indexOf("application/json") >= 0) {
                return res.json();
            }
            else {
              throw new TypeError('Could not properly parse response.');
            }
          })
          .then(function (json) {
            if (json.errorMessage) {
              throw new Error(json.errorMessage);
            } else {
              if (json.playlists && json.playlists.length > 0) {
                var i = json.playlists.length;
                var fileInfo;
                while (--i > -1) {
                  if (json.playlists[i].name === vod) {
                    fileInfo = json.playlists[i];
                    break;
                  }
                }
                if (fileInfo) {
                  resolve(fileInfo);
                } else {
                  throw new Error('File not found');
                }
              } else {
                throw new Error('File not found.');
              }
            }
          })
          .catch(function (error) {
            var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
            console.error('[SubscribeStreamManagerTest] :: Error - Could not request Edge IP from Stream Manager. ' + jsonError)
            reject(error)
          });
    });
  }

  function requestEdge (configuration, vod) {
    var host = configuration.host;
    var app = configuration.app;
    var port = serverSettings.httpport.toString();
    var portURI = (port.length > 0 ? ':' + port : '');
    var baseUrl = isSecure ? protocol + '://' + host : protocol + '://' + host + portURI;
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
              throw new TypeError('Could not properly parse response.');
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
            var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
            console.error('[SubscribeStreamManagerTest] :: Error - Could not request Edge IP from Stream Manager. ' + jsonError)
            reject(error)
          });
    });
  }

  function forceFallback (type) {
    if (type.toLowerCase() === 'hls') {
      throw new Error('HLS not supported natively by browser.');
    } else {
      useFLVFallback(edgeData.serverAddress, edgeData.scope, edgeData.name);
    }
  }

  /*
   * Quick FLV embed fallback if Flash not explicitly allowed in browser.
   */
  function addPlayer(tmpl, container) {
    var $el = document.importNode(tmpl.content, true);
    container.appendChild($el);
    return $el;
  }

  function useFLVFallback (host, app, streamName) {
    var container = document.getElementById('red5pro-subscriber')
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
    addPlayer(document.getElementById('flash-playback'), document.getElementById('video-container'));
    var flashObject = document.getElementById('red5pro-subscriber');
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
    flashObject.appendChild(flashvars);
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

  var retryCount = 0;
  var retryLimit = 3;

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
        streamTitle.innerText = configuration.stream1;
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
        console.error('[Red5ProSubscriber] :: Error in HLS playback. ' + jsonError)
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
          forceFallback(configuration.subscriberFailoverOrder)
        } catch (e) {
          console.error('[Red5ProSubscriber] :: Error in subscribing - ' + e.message);
          onSubscribeFail(e.message);
        }
      });
  }

  function respondToEdgeFailure (error) {
    if (retryCount++ < retryLimit) {
      var retryTimer = setTimeout(function () {
        clearTimeout(retryTimer);
        startup();
      }, 1000);
    }
    else {
      var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
      console.error('[Red5ProSubscriber] :: Retry timeout in subscribing - ' + jsonError);
    }
  }

  function startup () {
    // Kick off.
    if (configuration.subscriberFailoverOrder.toLowerCase() === 'hls') {
      requestPlaylist(configuration, configuration.stream1)
        .then(respondToPlaylist)
        .catch(respondToEdgeFailure)
    } else {
      requestEdge(configuration, configuration.stream1)
        .then(respondToEdge)
        .catch(respondToEdgeFailure);
    }
  }

  function playback (filename) {

    configuration.subscriberFailoverOrder = determineFailoverOrderFromFilename(filename);
    configuration.stream1 = filename;

    if (typeof targetSubscriber !== 'undefined') {
      unsubscribe().then(startup).catch(startup);
    }
    else {
      startup();
    }
  }

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

