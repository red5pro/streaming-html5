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

  var targetPublisher;
  var pubStatusField = document.getElementById('pub-status-field');
  var pubStreamTitle = document.getElementById('pub-stream-title');

  var targetSubscriber;
  var subStatusField = document.getElementById('sub-status-field');
  var subStreamTitle = document.getElementById('sub-stream-title');
  var statisticsFields = document.getElementsByClassName('statistics-field');

  var instanceId = Math.floor(Math.random() * 0x10000).toString(16);
  var protocol = serverSettings.protocol;
  var isSecure = protocol === 'https';
  function getSocketLocationFromProtocol () {
    return !isSecure
      ? {protocol: 'ws', port: serverSettings.wsport}
      : {protocol: 'wss', port: serverSettings.wssport};
  }

  var defaultSubscriberConfiguration = (function(useVideo, useAudio) {
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

  var updateStatusFromPublishEvent = window.red5proHandlePublisherEvent; // defined in src/template/partial/status-field-publisher.hbs
  var updateStatusFromSubscribeEvent = window.red5proHandleSubscriberEvent; // defined in src/template/partial/status-field-subscriber.hbs

  function onPublisherEvent (event) {
    console.log('[Red5ProPublisher] ' + event.type + '.');
    updateStatusFromPublishEvent(event, pubStatusField);
  }
  function onPublishFail (message) {
    console.error('[Red5ProPublisher] Publish Error :: ' + message);
  }
  function onPublishSuccess (publisher) {
    console.log('[Red5ProPublisher] Publish Complete.');
    if (window.exposePublisherGlobally) {
      window.exposePublisherGlobally(publisher);
    }
    (function (pub, index) {
      if (pub.getType().toLowerCase() === 'rtc') {
        try {
          var bitrate = 0;
          var packets = 0;
          var frameWidth = 0;
          var frameHeight = 0;
          var bitrateField = statisticsFields[index].getElementsByClassName('bitrate-field')[0];
          var packetsField = statisticsFields[index].getElementsByClassName('packets-field')[0];
          var resolutionField = statisticsFields[index].getElementsByClassName('resolution-field')[0];

          var updateStatisticsField = function (b, p, w, h) {
            statisticsFields[index].classList.remove('hidden');
            bitrateField.innerText =  Math.floor(b);
            packetsField.innerText = p;
            resolutionField.innerText = w + 'x' + h;
          }
          var onBitrateUpdate = function (b, p) {
            bitrate = b;
            packets = p
            updateStatisticsField(bitrate, packets, frameWidth, frameHeight);
          }
          var onResolutionUpdate = function (w, h) {
            frameWidth = w;
            frameHeight = h;
            updateStatisticsField(bitrate, packets, frameWidth, frameHeight);
          }
          var pc = pub.getPeerConnection();
          var stream = pub.getMediaStream();
          window.trackBitrate(pc, onBitrateUpdate, null, false, true);
          stream.getVideoTracks().forEach(function (track) {
          var settings = track.getSettings();
            onResolutionUpdate(settings.width, settings.height);
          });
        } catch (e) {
          //
        }
      }
    })(publisher, 0);
  }
  function onUnpublishFail (message) {
    console.error('[Red5ProPublisher] Unpublish Error :: ' + message);
  }
  function onUnpublishSuccess () {
    console.log('[Red5ProPublisher] Unpublish Complete.');
  }
  function onSubscriberEvent (event) {
    console.log('[Red5ProSubsriber] ' + event.type + '.');
    updateStatusFromSubscribeEvent(event, subStatusField);
    if (event.type === 'Subscribe.VideoDimensions.Change') {
      var resolutionField = statisticsFields[1].getElementsByClassName('resolution-field')[0];
      resolutionField.text = event.data.width + 'x' + event.data.height;
    }
  }
  function onSubscribeFail (message) {
    console.error('[Red5ProSubsriber] Subscribe Error :: ' + message);
  }
  function onSubscribeSuccess (subscriber) {
    console.log('[Red5ProSubsriber] Subscribe Complete.');
    if (window.exposeSubscriberGlobally) {
      window.exposeSubscriberGlobally(subscriber);
    }
    (function (sub, index) {
      if (sub.getType().toLowerCase() === 'rtc') {
        try {
          var bitrate = 0;
          var packets = 0;
          var frameWidth = 0;
          var frameHeight = 0;
          var bitrateField = statisticsFields[index].getElementsByClassName('bitrate-field')[0];
          var packetsField = statisticsFields[index].getElementsByClassName('packets-field')[0];
          var resolutionField = statisticsFields[index].getElementsByClassName('resolution-field')[0];

          var updateStatisticsField = function (b, p, w, h) {
            statisticsFields[index].classList.remove('hidden');
            bitrateField.innerText =  Math.floor(b);
            packetsField.innerText = p;
            resolutionField.innerText = w + 'x' + h;
          }
          var onBitrateUpdate = function (b, p) {
            bitrate = b;
            packets = p
            updateStatisticsField(bitrate, packets, frameWidth, frameHeight);
          }
          var onResolutionUpdate = function (w, h) {
            frameWidth = w;
            frameHeight = h;
            updateStatisticsField(bitrate, packets, frameWidth, frameHeight);
          }
          window.trackBitrate(sub.getPeerConnection(), onBitrateUpdate, onResolutionUpdate, true, true);
        } catch (e) {
          //
        }
      }
    })(subscriber, 1);
 }
  function onUnsubscribeFail (message) {
    console.error('[Red5ProSubsriber] Unsubscribe Error :: ' + message);
  }
  function onUnsubscribeSuccess () {
    console.log('[Red5ProSubsriber] Unsubscribe Complete.');
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
        video: configuration.useVideo ? configuration.mediaConstraints.video : false,
        frameRate: configuration.frameRate
      }
    };
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
                      productInstallURL: '../../lib/swfobject/playerProductInstall.swf',
                      mediaConstraint: {
                        video: {
                          width: config.cameraWidth,
                          height: config.cameraHeight,
                        }
                      }
                   });

    var publishOrder = config.publisherFailoverOrder
                            .split(',')
                            .map(function (item) {
                              return item.trim()
                        });

    if (window.query('view')) {
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

  function beginStreamListCall () {
    var host = configuration.host;
    var port = serverSettings.hlsport.toString();
    var portURI = (port.length > 0 ? ':' + port : '');
    var baseUrl = isSecure ? protocol + '://' + host : protocol + '://' + host + portURI;
    var url = baseUrl + '/' + configuration.app + '/streams.jsp';
    fetch(url)
      .then(function (res) {
        if (res.headers.get('content-type') &&
            res.headers.get('content-type').toLowerCase().indexOf('application/json') >= 0) {
          return res.json();
        }
        else {
          return res.text();
        }
      })
      .then(function (jsonOrString) {
        var json = jsonOrString;
        if (typeof jsonOrString === 'string') {
          try {
            json = JSON.parse(json);
          }
          catch(e) {
            throw new TypeError('Could not properly parse response: ' + e.message);
          }
        }
        recieveList(json);
      })
      .catch(function (error) {
        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
        console.error('[Two-Way] :: Error - Could not request Stream List. ' + jsonError);
        listError(error);
       });
  }

  function recieveList (listIn) {
    var found = false;
    for (var i = listIn.length - 1; i >= 0; i--) {
      found = listIn[i].name == configuration.stream2;
      if(found) break;
    }

    if (found) {
      startSubscribing();
    }
    else {
      setWaitTime();
    }
  }

  function listError (err) {
    console.log( "Error recieved on streamListCall - " + err );
    setWaitTime();
  }

  function setWaitTime () {
    setTimeout(beginStreamListCall, 5000);
  }

  function startSubscribing () {
    // Kick off.
    determineSubscriber()
    .then(function(subscriberImpl) {
        subStreamTitle.innerText = configuration.stream2;
        targetSubscriber = subscriberImpl;
        // Subscribe to events.
        targetSubscriber.on('*', onSubscriberEvent);
        return targetSubscriber.subscribe();
      })
      .then(function() {
        onSubscribeSuccess(targetSubscriber);
      })
      .catch(function (error) {
        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
        console.error('[Red5ProSubscriber] :: Error in subscribing - ' + jsonError);
        onSubscribeFail(jsonError);
      });
  }

  function determineSubscriber () {

    var config = Object.assign({},
      configuration,
      defaultSubscriberConfiguration,
      getAuthenticationParams());

    var rtcConfig = Object.assign({}, config, {
      protocol: getSocketLocationFromProtocol().protocol,
      port: getSocketLocationFromProtocol().port,
      subscriptionId: 'subscriber-' + instanceId,
      streamName: config.stream2
    })

    var rtmpConfig = Object.assign({}, config, {
      protocol: 'rtmp',
      port: serverSettings.rtmpport,
      streamName: config.stream2,
      useVideoJS: false,
      width: config.cameraWidth,
      height: config.cameraHeight,
      swf: '../../lib/red5pro/red5pro-subscriber.swf',
      swfobjectURL: '../../lib/swfobject/swfobject.js',
      productInstallURL: '../../lib/swfobject/playerProductInstall.swf'
    })

    var hlsConfig = Object.assign({}, config, {
      protocol: protocol,
      port: isSecure ? serverSettings.hlssport : serverSettings.hlsport,
      streamName: config.stream2,
      mimeType: 'application/x-mpegURL'
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

    var subscriber = new red5prosdk.Red5ProSubscriber();
    return subscriber.setPlaybackOrder(subscribeOrder)
      .init({
        rtc: rtcConfig,
        rtmp: rtmpConfig,
        hls: hlsConfig
      });
  }

  // Request to unsubscribe.
  function unsubscribe () {
    return new Promise(function(resolve, reject) {
      var subscriber = targetSubscriber;
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

  // Kick off.
  determinePublisher()
    .then(function (publisherImpl) {
      pubStreamTitle.innerText = configuration.stream1;
      targetPublisher = publisherImpl;
      targetPublisher.on('*', onPublisherEvent);
      return targetPublisher.publish();
    })
    .then(function () {
      onPublishSuccess(targetPublisher);
      beginStreamListCall();
    })
    .catch(function (error) {
      var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
      console.error('[Red5ProPublisher] :: Error in publishing - ' + jsonError);
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
      if (targetSubscriber) {
        targetSubscriber.off('*', onSubscriberEvent);
      }
      targetPublisher = undefined;
      targetSubscriber = undefined;
    }
    unpublish().then(unsubscribe).then(clearRefs).catch(clearRefs);
      window.untrackBitrate();
  }

  window.addEventListener('pagehide', shutdown);
  window.addEventListener('beforeunload', shutdown);

})(this, document, window.red5prosdk);

