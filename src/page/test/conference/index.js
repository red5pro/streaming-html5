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

  var targetPublisher;
  var pubStatusField = document.getElementById('pub-status-field');
  var pubStreamTitle = document.getElementById('pub-stream-title');
  var targetPubView;

  var instanceId = Math.floor(Math.random() * 0x10000).toString(16);
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
  var failCount = 0;
  var roomName;
  var chosenName;
  var publishing = false;

  var subBlock ="<div class=\"float-left float-left-conf\" id=\"FILLNAME\">" +
                  "<h2 class=\"centered\"><em>Subscriber Stream</em>: <span id=\"FILLNAME-title\"></span></h2>" +
                  "<p id=\"FILLNAME-status\" class=\"centered status-field\">On hold.</p>" +
                  "<div class=\"centered\">" +
                    "<video id=\"FILLNAME-video\"" +
                            "controls autoplay" +
                            "class=\"red5pro-media red5pro-media-background\"" +
                            "width=\"640\" height=\"480\"></video>" +
                  "</div>" +
                "</div>";

  var roomText = document.getElementById('roomTxt');
  var nameText = document.getElementById('nameTxt');
  var audioCheck = document.getElementById('audioCheck');
  var videoCheck = document.getElementById('videoCheck');
  var submitBtn = document.getElementById('submitBtn');

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

  audioCheck.checked = configuration.useAudio;
  videoCheck.checked = configuration.useVideo;

  submitBtn.addEventListener('click', function () {
    roomName = roomText.value;
    chosenName = nameText.value;

    var found = false;
    for (var i = streamsList.length - 1; i >= 0; i--) {
      found = streamsList[i] == roomName + "-" + chosenName;
      if (found) {break;}
    }

    if(!found)
      publish( roomName + "-" + chosenName );
    else
      pubStatusField.innerText = "That name is already in use";
  });

  var updateStatusFromPublishEvent = window.red5proHandlePublisherEvent; // defined in src/template/partial/status-field-publisher.hbs
  var updateStatusFromSubscribeEvent = window.red5proHandleSubscriberEvent; // defined in src/template/partial/status-field-subscriber.hbs

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
      mediaConstraints: {
        audio: configuration.useAudio ? configuration.mediaConstraints.audio : false,
        video: configuration.useVideo ? { "width": { "min": 160, "max": 320 }, "height": { "min": 120, "max": 240 } } : false,
        frameRate: configuration.frameRate
      }
    };
  }

  function preview () {
    var gUM = getUserMediaConfiguration;
    return new Promise(function (resolve, reject) {

      var elementId = 'red5pro-publisher-video';
      targetPublisher = new red5prosdk.Red5ProPublisher();
      targetPubView = new red5prosdk.PublisherView(elementId);
      var gmd = navigator.mediaDevice || navigator;

      targetPublisher.on('*', onPublisherEvent);
      console.log('[Red5ProPublisher] gUM:: ' + JSON.stringify(gUM(), null, 2));

      gmd.getUserMedia(gUM(), function (media) {

        // Upon access of user media,
        // 1. Attach the stream to the publisher.
        // 2. Show the stream as preview in view instance.
        targetPublisher.attachStream(media);
        targetPubView.preview(media);
        resolve();

      }, function(error) {

        onPublishFail('Error - ' + error);
        reject(error);

      });
    });
  }

  function initPublisher (publisher, publishName) {

    var config = Object.assign({},
                    configuration,
                    defaultConfiguration,
                    getUserMediaConfiguration());
    //lowered settings to compensate for people recieving multiple streams
    config.cameraWidth = 320;
    config.cameraHeight = 240;
    config.bandwith = {audio:16, video:192};
    config.streamName = publishName;
    config.useVideo = videoCheck.checked;
    config.useAudio = audioCheck.checked;

    var rtcConfig = Object.assign({}, config, {
                      protocol: getSocketLocationFromProtocol().protocol,
                      port: getSocketLocationFromProtocol().port,
                      streamName: publishName,
                      streamType: 'webrtc'
                   });
    var rtmpConfig = Object.assign({}, config, {
                      protocol: 'rtmp',
                      port: serverSettings.rtmpport,
                      streamName: publishName,
                      width: config.cameraWidth,
                      height: config.cameraHeight,
                      backgroundColor: '#000000',
                      swf: '../../lib/red5pro/red5pro-publisher.swf',
                      swfobjectURL: '../../lib/swfobject/swfobject.js',
                      productInstallURL: '../../lib/swfobject/playerProductInstall.swf'
                   });
    var publishOrder = config.publisherFailoverOrder
                            .split(',')
                            .map(function (item) {
                              return item.trim();
                        });

    if (window.query('view')) {
      publishOrder = [window.query('view')];
    }

    return publisher.setPublishOrder(publishOrder)
      .init({
        rtc: rtcConfig,
        rtmp: rtmpConfig
      });
  }

  function publish (publishName) {
    var publisher = targetPublisher;
    var view = targetPubView;

    roomText.disabled = true;
    nameText.disabled = true;
    videoCheck.disabled = true;
    audioCheck.disabled = true;
    submitBtn.disabled = true;

    console.log('[Red5ProPublisher] config:: ' + JSON.stringify(config, null, 2));

    view.attachPublisher(publisher);
    pubStreamTitle.innerText = config.streamName;

    // Initialize
    initPublisher(publisher, publishName)
      .then(function (pub) { // eslint-disable-line no-unused-vars
        // Invoke the publish action
        return pub.publish();
      })
      .then(function () {
        onPublishSuccess();
      })
      .catch(function (error) {
        // A fault occurred while trying to initialize and publish the stream.
        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
        onPublishFail('Error - ' + jsonError);

        clearPublish();
      });
  }

  function clearPublish (){
    roomName = null;
    chosenName = null;

    roomText.disabled = false;
    nameText.disabled = false;
    videoCheck.disabled = false;
    audioCheck.disabled = false;
    submitBtn.disabled = false;
  }

  function unpublish () {
    return new Promise(function (resolve, reject) {
      clearPublish();

      var view = targetPubView;
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

  var listBreak = false;
  function beginStreamListCall () {
    if(listBreak){
      return;
    }

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
    if(listBreak){
      return;
    }

    console.log(listIn + " is " + JSON.stringify(listIn));
    streamsList = [];

    var i = 0;
    for ( i = 0; i < listIn.length; i++ ) {
      var inName = listIn[i].name;
      if( inName == roomName + '-' + chosenName )
        continue;

      streamsList.push( inName );
      if( typeof roomName === 'string' && inName.indexOf("-") >= 0 && inName.split("-")[0] == roomName){
        if( callList.length == 0 || callList.indexOf(inName) < 0 ){
          setToCreateSub(inName);
        }
      }
    }
    for( i = callList.length - 1; i >= 0; i-- ){
      if( typeof roomName !== 'string' || streamsList.indexOf(callList[i]) < 0 ){
        removeSubscriber(callList[i]);
      }
    }

    setWaitTime( 0 );
  }

  function listError (err) {
    console.log( "Error recieved on streamListCall - " + err );
    setWaitTime(0);
  }

  function setWaitTime (plusWait) {
    setTimeout(beginStreamListCall, 5000 + plusWait);
  }

  var delayedSubs = [];
  function setToCreateSub (subName){
    if(delayedSubs.indexOf(subName) < 0){
      delayedSubs.push(subName);
      if(delayedSubs.length == 1){
        createSubcriber( delayedSubs[0] );
      }
    }
  }
  function continueSubQueue(){
    failCount = 0;
    if( typeof roomName !== 'string' ){
      delayedSubs = [];
      return;
    }

    delayedSubs.shift();
    if(delayedSubs.length > 0){
      createSubcriber( delayedSubs[0] );
    }
  }

  // Local lifecycle notifications.
  function onSubscriberEvent (event, subscribeName) {
    console.log('[Red5ProSubsriber] ' + event.type + '.');
    updateStatusFromSubscribeEvent(event, subscribeName);
  }
  function onSubscribeFail (message) {
    console.error('[Red5ProSubsriber] Subscribe Error :: ' + message);

    var failedName = delayedSubs[0];
    if(delayedSubs.length > 1){
      delayedSubs.push(failedName);
      removeSubscriber(failedName);
      continueSubQueue();
    }
    else{
      var index = callList.length - 1;
      failCount++;
      if(failCount < 4){
        setTimeout(function(){
          if(delayedSubs.length > 0){
            resubscribe(failedName);
          }
        }, delayTime * failCount);
      }
      else{
        // I guess the block just sits there in failure, and we move along?
        continueSubQueue();
      }
    }
  }
  function onSubscribeSuccess () {
    console.log('[Red5ProSubsriber] Subscribe Complete.');

    continueSubQueue();
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

    var blockToAdd = subBlock.replace(/FILLNAME/g, subscribeName);
    document.getElementById("app").innerHTML += blockToAdd;

    var config = Object.assign({}, configuration, defaultConfiguration);
    config.streamName = subscribeName;
    console.log('[Red5ProSubscriber] config:: ' + JSON.stringify(config, null, 2));

    // Setup view.
    var view = new red5prosdk.PlaybackView(subscribeName + '-video');
    var subscriber = new red5prosdk.RTCSubscriber();
    var origAttachStream = view.attachStream.bind(view);
    view.attachStream = function (stream, autoplay) {
      origAttachStream(stream, autoplay);
      view.attachStream = origAttachStream;
    };
    view.attachSubscriber(subscriber);
    var subStreamTitle = document.getElementById(subscribeName + '-title');
    subStreamTitle.innerText = config.streamName;

    subscribers.push(subscriber);

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
        onSubscribeSuccess();
      })
      .catch(function (error) {
        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
        onSubscribeFail('Error - ' + jsonError);
      });
  }

  function resubscribe(subscribeName){
    removeSubscriber(subscribeName).then(function(){
      createSubcriber(subscribeName);
    }).catch(function(){
      createSubcriber(subscribeName);
    });
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
              view.view.src = '';
            }catch(err){console.log(err);}
            subscriber.off('*', function(event){
              onSubscriberEvent(event, subscribeName);
            });
            onUnsubscribeSuccess();

            document.getElementById('app').removeChild( document.getElementById(subscribeName) );
            subscribers.splice(callList.indexOf(subscribeName), 1);
            callList.splice(callList.indexOf(subscribeName), 1);
            
            resolve();
          })
          .catch(function (error) {
            var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
            onUnsubscribeFail('Unmount Error = ' + jsonError);
            reject('Could not unsubscribe: ' + error);
          });
      }
      else {
        resolve();
      }
    });
  }

  window.addEventListener('beforeunload', function() {
    delayedSubs = [];
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
