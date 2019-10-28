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

    establishSharedObject(publisher);
    try {
      window.trackBitrate(publisher.getPeerConnection(), onBitrateUpdate);
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

  var hasRegistered = false;
  function appendMessage (message) {
    soField.value = [message, soField.value].join('\n');
  }
  // Invoked from METHOD_UPDATE event on Shared Object instance.
  function messageTransmit (message) { // eslint-disable-line no-unused-vars
    soField.value = ['User "' + message.user + '": ' + message.message, soField.value].join('\n');
  }
  function establishSharedObject (publisher) {
    // Create new shared object.
    so = new SharedObject('sharedStreamTest', publisher)
    var soCallback = {
      messageTransmit: messageTransmit
    };
    so.on(red5prosdk.SharedObjectEventTypes.CONNECT_SUCCESS, function (event) { // eslint-disable-line no-unused-vars
      console.log('[Red5ProPublisher] SharedObject Connect.');
      appendMessage('Connected.');
    });
    so.on(red5prosdk.SharedObjectEventTypes.CONNECT_FAILURE, function (event) { // eslint-disable-line no-unused-vars
      console.log('[Red5ProPublisher] SharedObject Fail.');
    });
    so.on(red5prosdk.SharedObjectEventTypes.PROPERTY_UPDATE, function (event) {
      console.log('[Red5ProPublisher] SharedObject Property Update.');
      console.log(JSON.stringify(event.data, null, 2));
      if (event.data.hasOwnProperty('streams')) {
        appendMessage('Stream list is: ' + event.data.streams + '.');
        var streams = event.data.streams.length > 0 ? event.data.streams.split(',') : [];
        if (!hasRegistered) {
          hasRegistered = true;
          so.setProperty('streams', streams.concat([configuration.stream1]).join(','));
        }
        streamsPropertyList = streams;
        processStreams(streamsPropertyList, configuration.stream1);
      }
      else if (!hasRegistered) {
        hasRegistered = true;
        streamsPropertyList = [configuration.stream1];
        so.setProperty('streams', configuration.stream1);
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
                      getAuthenticationParams(),
                      getUserMediaConfiguration());

    var rtcConfig = Object.assign({}, config, {
                      protocol: getSocketLocationFromProtocol().protocol,
                      port: getSocketLocationFromProtocol().port,
                      bandwidth: {
                        video: 256
                      },
                      mediaConstraints: {
                        audio: true,
                        video: {
                          width: {
                            exact: 320
                          },
                          height: {
                            exact: 240
                          },
                          frameRate: {
                            exact: 15
                          }
                        }
                      },
                      streamName: config.stream1
                   });

    var publisher = new red5prosdk.RTCPublisher();
    return publisher.init(rtcConfig);

  }

  function unpublish () {
    if (so !== undefined)  {
      var name = configuration.stream1;
      var updateList = streamsPropertyList.filter(function (item) {
        return item !== name;
      });
      streamsPropertyList = updateList;
      so.setProperty('streams', updateList.join(','));
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
  function shutdown () {
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
  window.addEventListener('beforeunload', shutdown);
  window.addEventListener('pagehide', shutdown);

  var subscriberMap = {};
  var streamsPropertyList = [];
  var subscribersEl = document.getElementById('subscribers');
  function processStreams (streamlist, exclusion) {
    var list = streamlist.filter(function (name, index, self) {
      return name !== exclusion &&
        (index == self.indexOf(name)) &&
        !document.getElementById(getSubscriberElementId(name));
    });
    var subscribers = list.map(function (name, index) {
      return new SubscriberItem(name, subscribersEl, index);
    });
    var i, length = subscribers.length - 1;
    var sub;
    for(i = 0; i < length; i++) {
      sub = subscribers[i];
      sub.next = subscribers[sub.index+1];
    }
    if (subscribers.length > 0) {
      subscribers[0].execute();
    }
  }
  function getSubscriberElementId (streamName) {
    return ['red5pro', 'subscriber', streamName].join('-');
  }
  function generateNewSubscriberDOM (streamName, subId) {
    var div = document.createElement('div');
    var p = document.createElement('p');
    var title = document.createTextNode(streamName + ' (' + subId + ')');
    p.appendChild(title);
    div.appendChild(p);
    var video = document.createElement('video');
    video.width = 320;
    video.height = 240;
    video.autoplay = true;
    video.controls = true;
    video.muted = true;
    video.setAttribute('playsinline', true);
    video.id = getSubscriberElementId(streamName);
    div.id = video.id + '-container';
    div.appendChild(video);
    var log = document.createElement('p');
    log.style = 'max-width:320px;max-height:240px;border:1 solid black;overflow:scroll;font-size:12px;';
    div.appendChild(log);
    return [div, log];
  }

  var SubscriberItem = function (streamName, parent, index) {
    var uid = Math.floor(Math.random() * 0x10000).toString(16);
    this.subscriptionId = [configuration.stream1, 'sub', uid].join('-')
    this.streamName = streamName;
    this.index = index;
    this.next = undefined;
    this.parent = parent;
    var elems = generateNewSubscriberDOM(this.streamName, this.subscriptionId);
    this.log = elems[1];
    parent.appendChild(elems[0]);
  }
  SubscriberItem.prototype.resolve = function () {
    var name = this.streamName;
    this.log.innerText += '[subscriber:' + name + '] success.\r\n'
    if (this.next) {
      this.log.innerText += '[subscriber:' + name + '] next() =>\r\n'
      this.next.execute();
    }
  }
  SubscriberItem.prototype.reject = function (event) {
    console.error(event);
    var name = this.streamName;
    this.log.innerText += '[subscriber:' + name + '] failed. ' + event.type + '.\r\n';
    if (this.next) {
      this.log.innerText += '[subscriber:' + name + '] next() =>\r\n'
      this.next.execute();
    }
  }
  SubscriberItem.prototype.execute = function () {
    var self = this;
    var name = this.streamName;
    var config = Object.assign({},
                    configuration,
                    getAuthenticationParams(),
                    getUserMediaConfiguration());

    var rtcConfig = Object.assign({}, config, {
                    protocol: getSocketLocationFromProtocol().protocol,
                    port: getSocketLocationFromProtocol().port,
                    streamName: this.streamName,
                    subscriptionId: this.subscriptionId,
                    mediaElementId: getSubscriberElementId(name) });

    this.subscriber = new red5prosdk.RTCSubscriber();
    this.subscriber.on('Connect.Success', this.resolve.bind(this));
    this.subscriber.on('Connect.Failure', this.reject.bind(this));
    var sub = this.subscriber;
    var log = this.log;
    var reject = this.reject.bind(this);
    var close = function (event) { // eslint-disable-line no-unused-vars
      function cleanup () {
        var el = document.getElementById(getSubscriberElementId(name) + '-container')
        el.parentNode.removeChild(el);
        sub.off('*', respond);
        sub.off('Subscribe.Fail', fail);
      }
      sub.off('Subscribe.Connection.Closed', close);
      sub.unsubscribe().then(cleanup).catch(cleanup);
      delete subscriberMap[name];
    };
    var fail = function (event) { // eslint-disable-line no-unused-vars
      close();
      var t = setTimeout(function () {
        clearTimeout(t);
        new SubscriberItem(self.streamName, self.parent, self.index).execute();
      }, 2000);
    };
    var respond = function (event) {
      if (event.type === 'Subscribe.Time.Update') return;
      console.log('[subscriber:' + name + '] ' + event.type);
      log.innerText += '[subscriber:' + name + '] ' + event.type + '\r\n';
    };

    this.subscriber.on('Subscribe.Connection.Closed', close);
    this.subscriber.on('Subscribe.Fail', fail);
    this.subscriber.on('*', respond);

    this.subscriber.init(rtcConfig)
      .then(function (subscriber) {
        subscriberMap[name] = subscriber;
        return subscriber.subscribe();
       })
      .catch(function (error) {
        console.log('[subscriber:' + name + '] Error');
        reject(error);
      });
  }

})(this, document, window.red5prosdk);

