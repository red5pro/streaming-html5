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
        if (!hasRegistered) {
          hasRegistered = true;
          so.setProperty('streams', event.data.streams + ',' + configuration.stream1);
        }
        processStreams(event.data.streams.split(','), configuration.stream1);
      }
      else if (!hasRegistered) {
        hasRegistered = true;
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
                      streamName: config.stream1
                   });

    var publisher = new red5prosdk.RTCPublisher();
    return publisher.init(rtcConfig);

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

  window.addEventListener('beforeunload', function() {
    function clearRefs () {
      if (targetPublisher) {
        targetPublisher.off('*', onPublisherEvent);
      }
      targetPublisher = undefined;
    }
    unpublish().then(clearRefs).catch(clearRefs);
    window.untrackBitrate();
  });

  var subscriberMap = {};
  var subscribersEl = document.getElementById('subscribers');
  function processStreams (streamlist, exclusion) {
    var list = streamlist.filter(function (name, index, self) {
      return name !== exclusion &&
        (index == self.indexOf(name)) &&
        !document.getElementById(getSubscriberElementId(name));
    });
    var subscribers = list.map(function (name) {
      return new SubscriberItem(name, subscribersEl);
    });
    var i, length = subscribers.length - 1;
    var sub;
    for(i = 0; i < length; i++) {
      sub = subscribers[i];
      sub.next = subscribers[i+1];
    }
    subscribers[0].execute();
  }
  function getSubscriberElementId (streamName) {
    return ['red5pro', 'subscriber', streamName].join('-');
  }
  function generateNewSubscriberDOM (streamName) {
    var div = document.createElement('div');
    var video = document.createElement('video');
    div.appendChild(video);
    video.width = 320;
    video.height = 240;
    video.muted = true;
    video.autoplay = true;
    video.playsinline = true;
    video.controls = true;
    video.id = getSubscriberElementId(streamName);
    return div;
  }

  var SubscriberItem = function (streamName, parent) {
    this.streamName = streamName;
    this.next = undefined;
    parent.appendChild(generateNewSubscriberDOM(this.streamName));
  }
  SubscriberItem.prototype.resolve = function () {
    if (this.next) {
      this.next.execute();
    }
  }
  SubscriberItem.prototype.reject = function (event) {
    console.error(event);
    if (this.next) {
      this.next.execute();
    }
  }
  SubscriberItem.prototype.execute = function () {
    var name = this.streamName;
    var config = Object.assign({},
                    configuration,
                    getAuthenticationParams(),
                    getUserMediaConfiguration());

    var rtcConfig = Object.assign({}, config, {
                    protocol: getSocketLocationFromProtocol().protocol,
                    port: getSocketLocationFromProtocol().port,
                    streamName: this.streamName,
                    mediaElementId: getSubscriberElementId(name) });

    var subscriber = new red5prosdk.RTCSubscriber();
    subscriber.on('Connect.Success', this.resolve);
    subscriber.on('Connect.Failure', this.reject);
    //      subscriber.on('Subscribe.Fail', reject);
    subscriber.init(rtcConfig)
      .then(function (subscriber) {
        subscriberMap[name] = subscriber;
        return subscriber.subscribe();
       })
      .catch(function (error) {
        console.log('[subscriber:' + name + '] Error');
        this.reject(error);
      });
  }

})(this, document, window.red5prosdk);

