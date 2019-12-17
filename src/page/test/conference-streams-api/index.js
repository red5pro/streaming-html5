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
    return {};
  })();

  red5prosdk.setLogLevel(configuration.verboseLogging ? red5prosdk.LOG_LEVELS.TRACE : red5prosdk.LOG_LEVELS.WARN);

  var updateStatusFromPublishEvent = window.red5proHandlePublisherEvent; // defined in static/script/publisher-status.js
  var updateStatusFromSubscribeEvent = window.red5proHandleSubscriberEvent; // defined in static/script/subscription-status.js

  var targetPublisher;
  var pubStatusField = document.getElementById('pub-status-field');
  var pubStreamTitle = document.getElementById('pub-stream-title');

  var getInstanceId = function () {
    return Math.floor(Math.random() * 0x10000);
  }
  var protocol = serverSettings.protocol;
  var isSecure = protocol === 'https';

  function getSocketLocationFromProtocol () {
    return !isSecure
      ? {protocol: 'ws', port: serverSettings.wsport}
      : {protocol: 'wss', port: serverSettings.wssport};
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

  var defaultConfiguration = {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port,
    app: 'live'
  };

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

  var streamsList = [];
  var subscribers = [];

  var roomName;
  var chosenName;
  var publishing = false;

  var roomText = document.getElementById('roomTxt');
  var nameText = document.getElementById('nameTxt');
  var audioCheck = document.getElementById('audioCheck');
  var videoCheck = document.getElementById('videoCheck');
  var submitBtn = document.getElementById('submitBtn');

  audioCheck.onchange = function(){
    if(publishing){
      if (audioCheck.checked) { targetPublisher.unmuteAudio(); }
      else { targetPublisher.muteAudio(); }
    }
  };
  videoCheck.onchange = function(){
    if(publishing){
      if (videoCheck.checked) { targetPublisher.unmuteVideo(); }
      else { targetPublisher.muteVideo(); }
    }
  };

  audioCheck.checked = configuration.useAudio;
  videoCheck.checked = configuration.useVideo;

  submitBtn.addEventListener('click', submitPublish);

  function getFormattedStreamName (roomName, contact) {
    return [roomName, contact].join('-');
  }
  function getRoomNameFromFormattedStreamName (name) {
    return name.indexOf('-') === -1 ? undefined : name.split('-')[0];
  }

  function onPublisherEvent (event) {
    console.log('[Red5ProPublisher] ' + event.type + '.');
    updateStatusFromPublishEvent(event, pubStatusField);
    if(event.type == red5prosdk.PublisherEventTypes.CONNECTION_CLOSED){
      publishing = false;
    }
  }
  function onPublishFail (message) {
    console.error('[Red5ProPublisher] Publish Error :: ' + message);
    clearPublish();
  }
  function onPublishSuccess () {
    console.log('[Red5ProPublisher] Publish Complete.');
    publishing = true;
    getStreamList();
  }
  function onUnpublishFail (message) {
    console.error('[Red5ProPublisher] Unpublish Error :: ' + message);
  }
  function onUnpublishSuccess () {
    console.log('[Red5ProPublisher] Unpublish Complete.');
    publishing = false;
  }

  // Local lifecycle notifications.
  function onSubscriberEvent (event, name) {
    if (event.type !== 'Subscribe.Time.Update') {
      console.log('[Red5ProSubscriber:' + name + '] ' + event.type + '.');
      updateStatusFromSubscribeEvent(event, document.getElementById( name + '-status' ));
      if (event.type === 'Subscribe.Play.Unpublish' ||
          event.type === 'Subscribe.Connection.Closed') {
          removeSubscriberByName(name);
    }
    }
  }
  function onSubscribeFail (message, name) {
    console.error('[Red5ProSubscriber:' + name + '] Subscribe Error :: ' + message);
  }
  function onSubscribeSuccess (name) {
    console.log('[Red5ProSubscriber:' + name + '] Subscribe Complete.');
  }
  function onUnsubscribeFail (message, name) {
    console.error('[Red5ProSubscriber:' + name + '] Unsubscribe Error :: ' + message);
  }
  function onUnsubscribeSuccess (name) {
    console.log('[Red5ProSubscriber:' + name + '] Unsubscribe Complete.');
  }

  function determinePublisher (publishName) {

    var config = Object.assign({},
                    configuration,
                    defaultConfiguration,
                    getUserMediaConfiguration(),
                    // lowered settings to compensate for people recieving multiple streams
                    {
                      cameraWidth: 320,
                      cameraHeight: 240,
                      bandwith: {
                        audio:16, video:128
                      },
                      useVideo: true, // will be muted on publish
                      useAudio: true,
                      mediaElementId: 'red5pro-publisher-video'
                    });

    var rtcConfig = Object.assign({}, config, {
                      streamName: publishName
                    });
    return new red5prosdk.RTCPublisher().init(rtcConfig);

  }

  function publish (publishName) {

    roomText.disabled = true;
    nameText.disabled = true;
    submitBtn.disabled = true;

    // Initialize
    determinePublisher(publishName)
      .then(function (pub) { // eslint-disable-line no-unused-vars
        targetPublisher = pub;
        // Invoke the publish action
        targetPublisher.on('*', onPublisherEvent);
        return targetPublisher.publish();
      })
      .then(function () {
        if (!videoCheck.checked) {
          targetPublisher.muteVideo();
        }
        if (!audioCheck.checked) {
          targetPublisher.muteAudio();
        }
        onPublishSuccess();
      })
      .catch(function (error) {
        // A fault occurred while trying to initialize and publish the stream.
        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
        onPublishFail('Error - ' + jsonError);
        clearPublish();
      });

    pubStreamTitle.innerText = publishName;

  }

  function submitPublish () {

    roomName = roomText.value;
    chosenName = nameText.value;

    var streamName = getFormattedStreamName(roomName, chosenName);
    var found = streamsList.filter(function (item) {
      return item === streamName;
    }).length > 0;

    if (!found) {
      publish( roomName + "-" + chosenName );
    } else {
      pubStatusField.innerText = "That name is already in use";
      clearPublish();
    }

  }

  function clearPublish () {
    roomName = undefined;
    chosenName = undefined;
    roomText.disabled = false;
    nameText.disabled = false;
    submitBtn.disabled = false;
  }

  function unpublish () {
    return new Promise(function (resolve, reject) {
      clearPublish();

      var publisher = targetPublisher;
      if (publisher) {
        publisher.unpublish()
          .then(function () {
            onUnpublishSuccess();
            resolve();
          })
          .catch(function (error) {
            var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
            onUnpublishFail('Unmount Error ' + jsonError);
            reject(error);
          });
      }
      else {
        onUnpublishSuccess();
        resolve();
      }
    });
  }

  function getStreamList () {

    clearTimeout(listCallTimeout);
    var host = configuration.host;
    var port = '5080';//serverSettings.httpport;
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
        console.error('[Conference] :: Error - Could not request Stream List. ' + jsonError);
        listError(error);
      });

  }

  function recieveList (listIn) {

    var publisherName = getFormattedStreamName(roomName, chosenName);
    var flatList = listIn.map(function (object) {
      return object.name;
    });
    var subscriberStreamList = flatList.filter(function (name) {
      var room = getRoomNameFromFormattedStreamName(name);
      return (roomName === undefined) || (room === roomName && name !== publisherName);
    });
    var newSubscribers = subscriberStreamList.filter(function (name) {
      return document.getElementById(name) === null;
    });
    var lostSubscribers = streamsList.filter(function (name) {
      return subscriberStreamList.indexOf(name) === -1;
    });

    var index = streamsList.length;
    while (--index > -1) {
      var name = streamsList[index];
      if (lostSubscribers.indexOf(name) > -1) {
        removeSubscriberByName(name);
        streamsList.splice(index, 1);
      }
    }

    if (publishing && newSubscribers.length > 0) {
      loadNewSubscribers(newSubscribers);
    } else {
      setWaitTime();
    }
    streamsList = subscriberStreamList;
    console.log('[Conference] :: Active Streams: ' + streamsList.join(', '));

    var subscriberElements = Array.prototype.slice.call( document.getElementsByClassName('float-left-conf'), 0 )
      .filter(function (el) {
        return !el.classList.contains('publisher') && el.id !== 'FILLNAME';
      }).map(function (el) {
        return el.id;
      });
    var missingList = subscriberElements.filter(function (id) {
      return streamsList.indexOf(id) === -1;
    });
    doDeadSweep(missingList);
  }

  function doDeadSweep (deadList) {
    console.log('[Conference] :: Found dead nodes:' + deadList.join(', '));
    while (deadList.length > 0) {
      var id = deadList.shift();
      var el = document.getElementById(id);
      if (el) {
        el.parentNode.removeChild(el);
      }
    }
  }

  var SubscriberItem = function (parent, configuration) {
    this.stopped = false;
    this.parent = parent;
    this.element = undefined;
    this.configuration = configuration;
    this.nextItem = undefined;
    this.subscriber = undefined;
  }
  SubscriberItem.prototype.load = function () {
    if (this.stopped) {
      return;
    }
    var self = this;
    var blockToAdd = document.getElementById('FILLNAME').cloneNode(true);
    blockToAdd.id = this.configuration.streamName;
    blockToAdd.innerHTML = blockToAdd.innerHTML.replace(/FILLNAME/g, blockToAdd.id);
    this.parent.appendChild( blockToAdd );
    this.element = blockToAdd;

    new red5prosdk.RTCSubscriber().init(this.configuration)
      .then(function (subscriber) {
        if (self.stopped) {
          return true;
        }
        self.subscriber = subscriber;
        subscriber.on('*', function(event){
          onSubscriberEvent(event, self.getName());
        });
        return subscriber.subscribe();
      })
      .then(function () {
        onSubscribeSuccess(self.getName());
        self.next();
      })
      .catch(function (error) {
        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
        onSubscribeFail('Error - ' + jsonError, self.getName());
        removeSubscriberByName(self.getName());
        self.next();
      });
  }
  SubscriberItem.prototype.next = function () {
    if (this.stopped) {
      return;
    }
    if (this.nextItem) {
      var self = this;
      var timeout = setTimeout(function () {
        clearTimeout(timeout);
        self.nextItem.load();
      }, 500);
    } else {
      setWaitTime();
    }
  }
  SubscriberItem.prototype.stop = function () {
    this.stopped = true;
  }
  SubscriberItem.prototype.unload = function () {
    var self = this;
    if (this.subscriber) {
      this.subscriber.unsubscribe()
        .then(function () {
          onUnsubscribeSuccess(self.getName());
          try {
            self.parent.removeChild(self.element);
          } catch (e) {
            console.warn(e);
          }
          self.clear();
        })
        .catch(function (error) {
          onUnsubscribeFail(error, self.getName());
          try {
            self.parent.removeChild(self.element);
          } catch (e) {
            console.warn(e);
          }
          self.clear();
        });
    } else {
      try {
        self.parent.removeChild(self.element);
      } catch (e) {
        console.warn(e);
      }
    }
  }
  SubscriberItem.prototype.clear = function () {
    this.stopped = false;
    this.parent = undefined;
    this.element = undefined;
    this.nextItem = undefined;
    this.configuration = undefined;
    this.subscriber = undefined;
  }
  SubscriberItem.prototype.getName = function () {
    return this.configuration ? this.configuration.streamName : undefined;
  }

  function loadNewSubscribers (list) {
    var parent = document.getElementById('app');
    function getSubscriberConfiguration (name) {
      return Object.assign({},
      configuration,
      defaultSubscriberConfiguration,
      {
        subscriptionId: ['subscriber', name, getInstanceId().toString(16)].join('-'),
        streamName: name,
        mediaElementId: [name, 'video'].join('-')
      });
    }

    var nonExistant = list.filter(function (name) {
      return document.getElementById(name) === null;
    });
    var subscribersToLoad = nonExistant.map(function(name) {
      return new SubscriberItem(parent, getSubscriberConfiguration(name));
    });
    if (subscribersToLoad.length > 0) {
      var i = 0, length = subscribersToLoad.length -1;
      for (i; i < length; i++) {
        subscribersToLoad[i].nextItem = subscribersToLoad[i+1];
      }
      subscribersToLoad[0].load();
    }
    subscribers = subscribersToLoad;
  }

  function listError (err) {
    console.log( "Error recieved on streamListCall - " + err );
    clearTimeout(listCallTimeout);
    setWaitTime();
  }

  var listCallTimeout;
  // var delayTime = 500;
  function setWaitTime () {
    clearTimeout(listCallTimeout);
    listCallTimeout = setTimeout(getStreamList, 5000);
  }

  function unsubscribeAll() {
    while (streamsList.length > 0) {
      removeSubscriberByName(streamsList.shift());
    }
  }

  function removeSubscriberByName (name) {

    var i = subscribers.length;
    while (--i > -1) {
      var subscriberItem = subscribers[i];
      if (subscriberItem.getName() === name) {
        subscribers.splice(i, 1);
        subscriberItem.stop();
        subscriberItem.unload();
      }
    }

  }

  window.addEventListener('beforeunload', function() {
    function clearRefs () {
      if (targetPublisher) {
        targetPublisher.off('*', onPublisherEvent);
      }
      targetPublisher = undefined;
    }
    unpublish().then(unsubscribeAll).then(clearRefs).catch(clearRefs);
  });

  getStreamList();

})(this, document, window.red5prosdk);
