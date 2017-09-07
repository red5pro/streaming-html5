(function(window, document, red5pro) {
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

  var targetPublisher;
  var targetPubView;

  var pubStatusField = document.getElementById('pub-status-field');
  var pubStreamTitle = document.getElementById('pub-stream-title');

  var protocol = serverSettings.protocol;
  var isSecure = protocol === 'https';
  function getSocketLocationFromProtocol () {
    return !isSecure
      ? {protocol: 'ws', port: serverSettings.wsport}
      : {protocol: 'wss', port: serverSettings.wssport};
  }

  var defaultConfiguration = {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port,
    app: 'live'
  };

  var streamsList = [];
  var callList = [];
  var subscribers = [];
  var failAttemps = [];
  var roomName;
  var chosenName;
  var publishing = false;

  var subBlock ="<div class=\"float-left float-left-conf\" id=\"FILLNAME\">" +
                  "<h2 class=\"centered\"><em>Suscriber Stream</em>: <span id=\"FILLNAME-title\"></span></h2>" +
                  "<p id=\"FILLNAME-status\" class=\"centered status-field\">On hold.</p>" +
                  "<div class=\"centered\">" +
                    "<video id=\"FILLNAME-video\" autoplay class=\"video-element\"></video>" +
                  "</div>" +
                "</div>";

  var roomText = document.getElementById('roomTxt');
  var nameText = document.getElementById('nameTxt');

  document.getElementById('submitBtn').addEventListener('click', function () {
    roomName = roomText.value;
    chosenName = nameText.value;

    var found = false;
    for (var i = streamsList.length - 1; i >= 0; i--) {
      found = streamsList[i] == roomName + "-" + chosenName;
      if (found) {break};
    };

    if(!found)
      publish( roomName + "-" + chosenName );
    else
      pubStatusField.innerText = "That name is already in use";
  });

  var pubFieldMessage;
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
      case pubTypes.PUBLISH_COMPLETE:
        status = 'Started publishing session.';
        var audioCheck = document.getElementById('audioCheck');
        if(audioCheck.checked){
          audioCheck.disabled = false
          audioCheck.onchange = function(){
            if(!audioCheck.checked){
              targetPublisher.mute();
            }
            else{
              targetPublisher.unmute();
            }
          }
        }
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
    field.innerText = pubFieldMessage = ['STATUS', status].join(': ');
    setTimeout(reSetPubField, 25);
  }

  function reSetPubField(){
    document.getElementById('pub-status-field').innerText = pubFieldMessage;
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
      targetPublisher = new red5pro.RTCPublisher();
      targetPubView = new red5pro.PublisherView(elementId);
      var gmd = navigator.mediaDevice || navigator;

      targetPublisher.on('*', onPublisherEvent);
      console.log('[Red5ProPublisher] gUM:: ' + JSON.stringify(gUM(), null, 2));

      gmd.getUserMedia(gUM(), function (media) {

        // Upon access of user media,
        // 1. Attach the stream to the publisher.
        // 2. Show the stream as preview in view instance.
        targetPublisher.attachStream(media);
        targetPubView.preview(media, true);
        resolve();

      }, function(error) {

        onPublishFail('Error - ' + error);
        reject(error);

      })
    });
  }

  function publish (publishName) {
    var publisher = targetPublisher;
    var view = targetPubView;
    var config = Object.assign({},
                    configuration,
                    defaultConfiguration,
                    getUserMediaConfiguration());
    config.cameraWidth = 320
    config.cameraHeight = 240
    config.bandwith = {audio:16, video:192}
    config.streamName = publishName;
    config.useVideo = document.getElementById('videoCheck').checked
    config.useAudio = document.getElementById('audioCheck').checked

    document.getElementById('videoCheck').disabled = true
    document.getElementById('audioCheck').disabled = true

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
    var port = serverSettings.httpport;
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

  var delayTime = 500;
  function recieveList (listIn) {
    console.log(listIn + " is " + JSON.stringify(listIn));
    streamsList = [];

    var i, j = 0;
    for ( i = 0; i < listIn.length; i++ ) {
      var inName = listIn[i].name;
      if( inName == roomName + '-' + chosenName )
        continue;

      streamsList.push( inName );
      if( inName.indexOf("-") >= 0 && inName.split("-")[0] == roomName){
        if( callList.length == 0 || callList.indexOf(inName) < 0 ){
          setCreateTime(inName, j*delayTime);
          j++;
        }
      }
    }
    for( i = callList.length - 1; i >= 0; i-- ){
      if(streamsList.indexOf(callList[i]) < 0 ){
        removeSubscriber(callList[i]);
      }
    }

    setWaitTime( j * delayTime );
  }

  function listError (err) {
    console.log( "Error recieved on streamListCall - " + err );
    setWaitTime(0);
  }

  function setWaitTime (plusWait) {
    setTimeout(beginStreamListCall, 5000 + plusWait);
  }
  function setCreateTime (subName, delayTime){
    setTimeout(function(){
      createSubcriber(subName);
    }, delayTime);
  }

  function updateStatusFromSubscribeEvent (event, subscribeName) {
    var field = document.getElementById(subscribeName + '-status');
    var subTypes = red5pro.SubscriberEventTypes;
    var rtcTypes = red5pro.RTCSubscriberEventTypes;
    var subIndex = callList.indexOf(subscribeName);
    var status;
    var answer;
    var candidate;
    switch (event.type) {
      case subTypes.CONNECT_SUCCESS:
        status = 'Connection established...';
        break;
      case subTypes.CONNECT_FAILURE:
        if(failAttemps[subIndex] < 3){
          failAttemps[subIndex]++;
          resubscribe(subscribeName);
          status = 'Retrying';
        }
        else{
          status = 'Error - Could not establish connection.';
        } 
        break;
      case subTypes.SUBSCRIBE_METADATA:
      case subTypes.SUBSCRIBE_START:
        status = 'Started subscribing session.';
        break;
      case subTypes.SUBSCRIBE_FAIL:
        if(failAttemps[subIndex] < 3){
          failAttemps[subIndex]++;
          resubscribe(subscribeName);
          status = 'Retrying';
        }
        else{
          status = 'Error - Could not start a subscribing session.';
        }
        break;
      case subTypes.SUBSCRIBE_INVALID_NAME:
        status = 'Error - Stream name not in use.';
        setTimeout(function(){
          removeSubscriber(subscribeName);
        }, 1000);
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
  function onSubscriberEvent (event, subscribeName) {
    console.log('[Red5ProSubsriber] ' + event.type + '.');
    updateStatusFromSubscribeEvent(event, subscribeName);
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

  function createSubcriber( subscribeName ){
    console.log("Creating subscriber for: " + subscribeName);
    callList.push( subscribeName );
    failAttemps.push(0);

    var addOut = subBlock.replace(/FILLNAME/g, subscribeName);
    document.getElementById("app").innerHTML += addOut;

    var config = Object.assign({}, configuration, defaultConfiguration);
    config.streamName = subscribeName;
    console.log('[Red5ProSubscriber] config:: ' + JSON.stringify(config, null, 2));

    // Setup view.
    var view = new red5pro.PlaybackView(subscribeName + '-video');
    var subscriber = new red5pro.RTCSubscriber();
    var origAttachStream = view.attachStream.bind(view);
    view.attachStream = function (stream, autoplay) {
      origAttachStream(stream, autoplay)
      view.attachStream = origAttachStream
    };
    view.attachSubscriber(subscriber);
    var subStreamTitle = document.getElementById(subscribeName + '-title');
    subStreamTitle.innerText = config.streamName;

    // Subscribe to events.
    subscriber.on('*', function(event){
      onSubscriberEvent(event, subscribeName);
    });
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
    subscribers.push(subscriber);
  }

  function resubscribe(subscribeName){
    removeSubscriber(subscribeName).then(function(){
      createSubcriber(subscribeName);
    }).catch(function(){
      createSubcriber(subscribeName);
    })
  }

  function unsubscribe(){
    for(var i = callList.length - 1; i >= 0; i--){
      removeSubscriber(callList[i]);
    }
  }

  function removeSubscriber( subscribeName ){
    return new Promise(function(resolve, reject) {
      var view = document.getElementById(subscribeName + '-video');
      var subscriber = subscribers[callList.indexOf(subscribeName)];
      if (subscriber) {
        subscriber.stop()
          .then(function () {
            try{
              view.view.src = ''
            }catch(err){console.log(err);}
            subscriber.setView(undefined)
            subscriber.off('*', function(event){
              onSubscriberEvent(event, subscribeName);
            });
            onUnsubscribeSuccess();
            resolve();

            document.getElementById('app').removeChild( document.getElementById(subscribeName) );
            subscribers.splice(callList.indexOf(subscribeName), 1);
            callList.splice(callList.indexOf(subscribeName), 1);
            failAttemps.splice(callList.indexOf(subscribeName), 1);
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

  window.addEventListener('beforeunload', function() {
    function clearRefs () {
      if (targetPublisher) {
        targetPublisher.off('*', onPublisherEvent);
      }
      targetPubView = targetPublisher = undefined;
    }
    unpublish().then(unsubscribe).then(clearRefs).catch(clearRefs);
  });

  preview();
  beginStreamListCall();

})(this, document, window.red5prosdk);
