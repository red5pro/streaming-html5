(function(window, document, red5prosdk) {
  'use strict';

  var SharedObject = red5prosdk.Red5ProSharedObject;
  var so = undefined; // @see onPublishSuccess
  var isPublishing = false;

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

  var updateStatusFromEvent = window.red5proHandlePublisherEvent; // defined in src/template/partial/status-field-publisher.hbs
  var updateSuscriberStatusFromEvent = window.red5proHandleSubscriberEvent;

  var targetPublisher;
  var roomName = window.query('room') || 'red5pro'; // eslint-disable-line no-unused-vars
  var streamName = window.query('streamName') || ['publisher', Math.floor(Math.random() * 0x10000).toString(16)].join('-');

  var roomField = document.getElementById('room-field');
  var publisherContainer = document.getElementById('publisher-container');
  var publisherSession = document.getElementById('publisher-session');
  var publisherNameField = document.getElementById('publisher-name-field');
  var streamNameField = document.getElementById('streamname-field');
  var audioCheck = document.getElementById('audio-check');
  var videoCheck = document.getElementById('video-check');
  var joinButton = document.getElementById('join-button');
  var statisticsField = document.getElementById('statistics-field');

  roomField.value = roomName;
  streamNameField.value = streamName;
  audioCheck.checked = configuration.useAudio;
  videoCheck.checked = configuration.useVideo;

  joinButton.addEventListener('click', function () {
    saveSettings();
    doPublish(streamName);
    setPublishingUI(streamName);
  });

  audioCheck.addEventListener('change', updateMutedAudioOnPublisher);
  videoCheck.addEventListener('change', updateMutedVideoOnPublisher);

  var subscriberTemplate = '' +
        '<div class="subscriber-session centered">' +
          '<p class="subscriber-status-field">On hold.</p>' +
        '</div>' +
        '<video autoplay controls playsinline class="red5pro-media red5pro-background"></video>' +
        '<div class="centered status-field">' +
          '<p>' +
            '<span class="subscriber-name-field"></span>' +
            '<span class="subscriber-id-field"></span>' +
          '</p>' +
        '</div>';

  var soField = document.getElementById('so-field');

  var protocol = serverSettings.protocol;
  var isSecure = protocol == 'https';

  function saveSettings () {
    streamName = streamNameField.value;
    roomName = roomField.value;
  }

  function updateMutedAudioOnPublisher () {
    if (targetPublisher && isPublishing) {
      if (audioCheck.checked) { 
        targetPublisher.unmuteAudio(); 
      } else { 
        targetPublisher.muteAudio(); 
      }
    }
  }

  function updateMutedVideoOnPublisher () {
    if (targetPublisher && isPublishing) {
      if (videoCheck.checked)
      { targetPublisher.unmuteVideo();
      } else { 
        targetPublisher.muteVideo(); 
      }
    }
  }

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
    isPublishing = false;
    console.error('[Red5ProPublisher] Publish Error :: ' + message);
  }
  function onPublishSuccess (publisher) {
    isPublishing = true;
    console.log('[Red5ProPublisher] Publish Complete.');
    establishSharedObject(publisher, roomField.value, streamNameField.value);
    try {
      window.trackBitrate(publisher.getPeerConnection(), onBitrateUpdate);
    }
    catch (e) {
      // no tracking for you!
    }
  }
  function onUnpublishFail (message) {
    isPublishing = false;
    console.error('[Red5ProPublisher] Unpublish Error :: ' + message);
  }
  function onUnpublishSuccess () {
    isPublishing = false;
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

  function setPublishingUI (streamName) {
    publisherNameField.innerText = streamName;
    roomField.setAttribute('disabled', true);
    publisherSession.classList.remove('hidden');
    publisherNameField.classList.remove('hidden');
    Array.prototype.forEach.call(document.getElementsByClassName('remove-on-broadcast'), function (el) {
      el.classList.add('hidden');
    });
  }

  function updatePublishingUIOnStreamCount (streamCount) {
    if (streamCount > 0) {
      publisherContainer.classList.remove('auto-margined');
      publisherContainer.classList.add('spaced');
      publisherContainer.classList.add('float-left');
    } else {
      publisherContainer.classList.add('auto-margined');
      publisherContainer.classList.remove('spaced');
      publisherContainer.classList.remove('float-left');
    }
  }

  function templateContent (templateHTML) {
    var div = document.createElement('div');
    div.classList.add('subscriber-container', 'float-left', 'spaced');
    div.innerHTML = templateHTML;
    return div;
  }

  var hasRegistered = false;
  function appendMessage (message) {
    soField.value = [message, soField.value].join('\n');
  }
  // Invoked from METHOD_UPDATE event on Shared Object instance.
  function messageTransmit (message) { // eslint-disable-line no-unused-vars
    soField.value = ['User "' + message.user + '": ' + message.message, soField.value].join('\n');
  }
  function establishSharedObject (publisher, roomName, streamName) {
    // Create new shared object.
    so = new SharedObject(roomName, publisher)
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
          so.setProperty('streams', streams.concat([streamName]).join(','));
        }
        streamsPropertyList = streams;
        processStreams(streamsPropertyList, streamName);
      }
      else if (!hasRegistered) {
        hasRegistered = true;
        streamsPropertyList = [streamName];
        so.setProperty('streams', streamName);
      }
    });
    so.on(red5prosdk.SharedObjectEventTypes.METHOD_UPDATE, function (event) {
      console.log('[Red5ProPublisher] SharedObject Method Update.');
      console.log(JSON.stringify(event.data, null, 2));
      soCallback[event.data.methodName].call(null, event.data.message);
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
                      streamName: streamName
                   });

    var publisher = new red5prosdk.RTCPublisher();
    return publisher.init(rtcConfig);

  }

  function doPublish (name) {
    targetPublisher.publish(name)
      .then(function () {
        onPublishSuccess(targetPublisher);
        updateMutedAudioOnPublisher();
        updateMutedVideoOnPublisher();
      })
      .catch(function (error) {
        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
        console.error('[Red5ProPublisher] :: Error in publishing - ' + jsonError);
        console.error(error);
        onPublishFail(jsonError);
       });
  }

  function unpublish () {
    if (so !== undefined)  {
      var name = streamName;
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
      targetPublisher = publisherImpl;
      targetPublisher.on('*', onPublisherEvent);
      return targetPublisher.preview();
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
    var nonPublishers = streamlist.filter(function (name) {
      return name !== exclusion;
    });
    var list = nonPublishers.filter(function (name, index, self) {
      return (index == self.indexOf(name)) &&
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

    updatePublishingUIOnStreamCount(nonPublishers.length);
  }

  function getSubscriberElementId (streamName) {
    return ['red5pro', 'subscriber', streamName].join('-');
  }
  function generateNewSubscriberDOM (streamName, subId, parent) {
    var card = templateContent(subscriberTemplate);
    parent.appendChild(card);
    var videoId = getSubscriberElementId(streamName);
    var videoElement = card.getElementsByClassName('red5pro-media')[0];
    var subscriberNameField = card.getElementsByClassName('subscriber-name-field')[0];
    var subscriberIdField = card.getElementsByClassName('subscriber-id-field')[0];
    subscriberNameField.innerText = streamName;
    subscriberIdField.innerText = '(' + subId + ')';
    videoElement.id = videoId;
    card.id = [videoId, 'container'].join('-');
    return card;
  }

  var SubscriberItem = function (subStreamName, parent, index) {
    var uid = Math.floor(Math.random() * 0x10000).toString(16);
    this.subscriptionId = [streamNameField.value, 'sub', uid].join('-')
    this.streamName = subStreamName;
    this.index = index;
    this.next = undefined;
    this.parent = parent;
    this.card = generateNewSubscriberDOM(this.streamName, this.subscriptionId, this.parent);
    this.statusField = this.card.getElementsByClassName('subscriber-status-field')[0];
  }
  SubscriberItem.prototype.resolve = function () {
    //    var name = this.streamName;
    //    this.log.innerText += '[subscriber:' + name + '] success.\r\n'
    if (this.next) {
      //      this.log.innerText += '[subscriber:' + name + '] next() =>\r\n'
      this.next.execute();
    }
  }
  SubscriberItem.prototype.reject = function (event) {
    console.error(event);
    //    var name = this.streamName;
    //    this.log.innerText += '[subscriber:' + name + '] failed. ' + event.type + '.\r\n';
    if (this.next) {
      //      this.log.innerText += '[subscriber:' + name + '] next() =>\r\n'
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
    var statusField = this.statusField;
    //    var log = this.log;
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
      updateSuscriberStatusFromEvent(event, statusField);
      //      log.innerText += '[subscriber:' + name + '] ' + event.type + '\r\n';
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

