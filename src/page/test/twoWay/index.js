(function(window, document, red5pro) {
  'use strict';

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

  red5pro.setLogLevel(configuration.verboseLogging ? red5pro.LogLevels.TRACE : red5pro.LogLevels.WARN);

  var targetPublisher;
  var targetPubView;

  var pubStatusField = document.getElementById('pub-status-field');
  var pubStreamTitle = document.getElementById('pub-stream-title');

  var targetSubscriber;
  var targetSubView;

  var subStatusField = document.getElementById('sub-status-field');
  var subStreamTitle = document.getElementById('sub-stream-title');

  var protocol = configuration.protocol;
  var isSecure = protocol === 'https';
  function getSocketLocationFromProtocol () {
    return !isSecure
      ? {protocol: 'ws', port: configuration.wsport}
      : {protocol: 'wss', port: configuration.wssport};
  }

  var defaultConfiguration = {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port,
    app: 'live'
  };

  function updateStatusFromPublishEvent (event, field) {
    var pubTypes = red5pro.PublisherEventTypes;
    var rtcTypes = red5pro.RTCPublisherEventTypes;
    var status;
    switch (event.type) {
      case pubTypes.CONNECT_SUCCESS:
        status = 'Connection established...';
        break;
      case pubTypes.CONNECT_FAILURE:
        status = 'Error - Could not establish connection.';
        break;
      case pubTypes.PUBLISH_START:
        status = 'Started publishing session.';
        beginStreamListCall();
        break;
      case pubTypes.PUBLISH_FAIL:
        status = 'Error - Could not start a publishing session.';
        break;
      case pubTypes.PUBLISH_INVALID_NAME:
        status = 'Error - Stream name already in use.';
        break;
      case rtcTypes.MEDIA_STREAM_AVAILABLE:
        status = 'Stream available...';
        break;
      case rtcTypes.PEER_CONNECTION_AVAILABLE:
        status = 'Peer Connection available...';
        break;
      case rtcTypes.OFFER_START:
        status = 'Begin offer...';
        break;
      case rtcTypes.OFFER_END:
        status = 'Offer accepted...';
        break;
      case rtcTypes.ICE_TRICKLE_COMPLETE:
        status = 'Negotiation complete. Waiting Publish Start...';
        break;
    }
    field.innerText = ['STATUS', status].join(': ');
  }

  function onPublisherEvent (event) {
    console.log('[Red5ProPublisher] ' + event.type + '.');
    updateStatusFromPublishEvent(event, pubStatusField);
  }
  function onPublishFail (message) {
    console.error('[Red5ProPublisher] Publish Error :: ' + message);
  }
  function onPublishSuccess () {
    console.log('[Red5ProPublisher] Publish Complete.');
  }
  function onUnpublishFail (message) {
    console.error('[Red5ProPublisher] Unpublish Error :: ' + message);
  }
  function onUnpublishSuccess () {
    console.log('[Red5ProPublisher] Unpublish Complete.');
  }

  function getUserMediaConfiguration () {
    return {
      audio: configuration.useAudio ? configuration.userMedia.audio : false,
      video: configuration.useVideo ? configuration.userMedia.video : false,
      frameRate: configuration.frameRate
    };
  }

  function preview () {
    var gUM = getUserMediaConfiguration;
    return new Promise(function (resolve, reject) {

      var elementId = 'red5pro-publisher-video';
      var publisher = new red5pro.RTCPublisher();
      var view = new red5pro.PublisherView(elementId);
      var gmd = navigator.mediaDevice || navigator;

      publisher.on('*', onPublisherEvent);
      console.log('[Red5ProPublisher] gUM:: ' + JSON.stringify(gUM(), null, 2));

      gmd.getUserMedia(gUM(), function (media) {

        // Upon access of user media,
        // 1. Attach the stream to the publisher.
        // 2. Show the stream as preview in view instance.
        publisher.attachStream(media);
        view.preview(media, true);
        targetPublisher = publisher;
        targetPubView = view;
        resolve();

      }, function(error) {

        onPublishFail('Error - ' + error);
        reject(error);

      })
    });
  }

  function publish () {
    var publisher = targetPublisher;
    var view = targetPubView;
    var config = Object.assign({},
                    configuration,
                    defaultConfiguration,
                    getUserMediaConfiguration());
    config.streamName = config.stream1;
    console.log('[Red5ProPublisher] config:: ' + JSON.stringify(config, null, 2));

    view.attachPublisher(publisher);
    pubStreamTitle.innerText = config.streamName;

    // Initialize
    publisher.init(config)
      .then(function (pub) { // eslint-disable-line no-unused-vars
        // Invoke the publish action
        return publisher.publish();
      })
      .then(function () {
        onPublishSuccess();
      })
      .catch(function (error) {
        // A fault occurred while trying to initialize and publish the stream.
        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
        onPublishFail('Error - ' + jsonError);
      });
  }

  function unpublish () {
    return new Promise(function (resolve, reject) {
      var view = targetPubView;
      var publisher = targetPublisher;
      if (publisher) {
        publisher.unpublish()
          .then(function () {
            view.view.src = '';
            publisher.setView(undefined);
            publisher.off('*', onPublisherEvent);
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

  function beginStreamListCall () {

    var host = configuration.host;
    var port = configuration.httpport;
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
      subscribe();
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

  // Displays in status field based on events from subscriber instance.
  function updateStatusFromSubscribeEvent (event, field) {
    var subTypes = red5pro.SubscriberEventTypes;
    var rtcTypes = red5pro.RTCSubscriberEventTypes;
    var status;
    var answer;
    var candidate;
    switch (event.type) {
      case subTypes.CONNECT_SUCCESS:
        status = 'Connection established...';
        break;
      case subTypes.CONNECT_FAILURE:
        status = 'Error - Could not establish connection.';
        break;
      case subTypes.SUBSCRIBE_START:
        status = 'Started subscribing session.';
        break;
      case subTypes.SUBSCRIBE_FAIL:
        status = 'Error - Could not start a subscribing session.';
        break;
      case subTypes.SUBSCRIBE_INVALID_NAME:
        status = 'Error - Stream name not in use.';
        break;
      case rtcTypes.OFFER_START:
        status = 'Begin offer...';
        break;
      case rtcTypes.OFFER_END:
        status = 'Offer accepted...';
        break;
      case rtcTypes.ANSWER_START:
        status = 'Sending answer...';
        answer = JSON.stringify(event.data, null, 2);
        console.log('[SubscriberStatus] ' + event.type + ': ' + answer);
        break
      case rtcTypes.ANSWER_END:
        status = 'Answer received...';
        break
      case rtcTypes.CANDIDATE_START:
        status = 'Sending candidate...';
        candidate = JSON.stringify(event.data, null, 2);
        console.log('[SubscriberStatus] ' + event.type + ': ' + candidate);
        break
      case rtcTypes.CANDIDATE_END:
        status = 'Candidate received...';
        break;
      case rtcTypes.ICE_TRICKLE_COMPLETE:
        status = 'Negotiation complete. Waiting Subscription Start...';
        break;
    }
    field.innerText = ['STATUS', status].join(': ');
  }

  // Local lifecycle notifications.
  function onSubscriberEvent (event) {
    console.log('[Red5ProSubsriber] ' + event.type + '.');
    updateStatusFromSubscribeEvent(event, subStatusField);
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

  // Request to start subscribing using an overlayed configuration from local default and local storage.
  function subscribe () {
    var config = Object.assign({}, configuration, defaultConfiguration);
    config.streamName = config.stream2;
    console.log('[Red5ProSubscriber] config:: ' + JSON.stringify(config, null, 2));

    // Setup view.
    var view = new red5pro.PlaybackView('red5pro-subscriber-video');
    var subscriber = new red5pro.RTCSubscriber();
    var origAttachStream = view.attachStream.bind(view);
    view.attachStream = function (stream, autoplay) {
      origAttachStream(stream, autoplay)
      view.attachStream = origAttachStream
    };
    view.attachSubscriber(subscriber);
    subStreamTitle.innerText = config.streamName;

    targetSubscriber = subscriber;
    targetSubView = view;

    // Subscribe to events.
    subscriber.on('*', onSubscriberEvent);
    // Initiate playback.
    subscriber.init(config)
      .then(function (player) {
        return player.play();
      })
      .then(function () {
        onSubscribeSuccess()
      })
      .catch(function (error) {
        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
        onSubscribeFail('Error - ' + jsonError);
      });
  }

  // Request to unsubscribe.
  function unsubscribe () {
    return new Promise(function(resolve, reject) {
      var view = targetSubView
      var subscriber = targetSubscriber
      if (subscriber) {
        subscriber.stop()
          .then(function () {
            view.view.src = ''
            subscriber.setView(undefined)
            subscriber.off('*', onSubscriberEvent);
            onUnsubscribeSuccess();
            resolve();
          })
          .catch(function (error) {
            var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
            onUnsubscribeFail('Unmount Error = ' + jsonError);
            reject('Could not unsubscribe: ' + error);
          });
      }
      else {
        resolve()
      }
    });
  }

  // Kick off.
  preview()
    .then(publish)
    .catch(function (error) {
      console.error('[Red5ProPublisher] :: Error in publishing - ' + error);
     });

  window.addEventListener('beforeunload', function() {
    function clearRefs () {
      targetPublisher.off('*', onPublisherEvent);
      targetPubView = targetPublisher = undefined;
      targetSubscriber.off('*', onSubscriberEvent);
      targetSubscriber = targetSubView = undefined;
    }
    unpublish().then(unsubscribe).then(clearRefs).catch(clearRefs);
  });

})(this, document, window.red5prosdk);

