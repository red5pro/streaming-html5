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

    connectingSub = "publisher";

    roomName = roomText.value;
    chosenName = nameText.value;

    var found = false;
    for (var i = streamsList.length - 1; i >= 0; i--) {
      found = streamsList[i] == roomName + "-" + chosenName;
      if (found) {break;}
    }

    if(!found)
      publish( roomName + "-" + chosenName );
    else{
      pubStatusField.innerText = "That name is already in use";
      clearPublish();
      connectingSub = null;
    }
  });

  var updateStatusFromPublishEvent = window.red5proHandlePublisherEvent; // defined in static/script/publisher-status.js
  var updateStatusFromSubscribeEvent = window.red5proHandleSubscriberEvent; // defined in static/script/subscription-status.js

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
    continueSubQueue();
  }
  function onPublishSuccess () {
    console.log('[Red5ProPublisher] Publish Complete.');
    publishing = true;
    continueSubQueue();
  }
  function onUnpublishFail (message) {
    console.error('[Red5ProPublisher] Unpublish Error :: ' + message);
  }
  function onUnpublishSuccess () {
    console.log('[Red5ProPublisher] Unpublish Complete.');
    publishing = false;
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

  function preview () {
    // var gUM = getUserMediaConfiguration;
    return new Promise(function (resolve, reject) {

      targetPublisher = new red5prosdk.Red5ProPublisher();

      targetPublisher.on('*', onPublisherEvent);

      determinePublisher(targetPublisher, "notTheStreamName");
      resolve();
    });
  }

  function determinePublisher (publisher, publishName) {

    var config = Object.assign({},
                    configuration,
                    defaultConfiguration,
                    getUserMediaConfiguration());
    //lowered settings to compensate for people recieving multiple streams
    config.cameraWidth = 320;
    config.cameraHeight = 240;
    config.bandwith = {audio:16, video:128};
    config.streamName = publishName;
    config.useVideo = true; //will be muted on publish
    config.useAudio = true;
    config.mediaElementId = 'red5pro-publisher-video';

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
                              return item.trim();
                        });

    if (window.query('view')) {
      publishOrder = [window.query('view')];
    }

    if(publishName != "notTheStreamName"){
      // console.log('[Red5ProPublisher] config:: ' + JSON.stringify(config, null, 2));
    }

    return publisher.setPublishOrder(publishOrder)
      .init({
        rtc: rtcConfig,
        rtmp: rtmpConfig
      });
  }

  function publish (publishName) {
    var publisher = targetPublisher;
    // var view = targetPubView;

    roomText.disabled = true;
    nameText.disabled = true;
    submitBtn.disabled = true;

    // Initialize
    determinePublisher(publisher, publishName)
      .then(function (pub) { // eslint-disable-line no-unused-vars
        targetPublisher = pub;
        // Invoke the publish action
        targetPublisher.on('*', onPublisherEvent);
        return targetPublisher.publish();
      })
      .then(function () {
        if(!videoCheck.checked){ targetPublisher.muteVideo(); }
        if(!audioCheck.checked){ targetPublisher.muteAudio(); }
        onPublishSuccess();
      })
      .catch(function (error) {
        // A fault occurred while trying to initialize and publish the stream.
        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
        onPublishFail('Error - ' + jsonError);

        clearPublish();
      });

    // view.attachPublisher(publisher);
    pubStreamTitle.innerText = publishName;
  }

  function clearPublish (){
    roomName = null;
    chosenName = null;

    roomText.disabled = false;
    nameText.disabled = false;
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

    setWaitTime();
  }

  function listError (err) {
    console.log( "Error recieved on streamListCall - " + err );
    setWaitTime();
  }

  function setWaitTime () {
    setTimeout(beginStreamListCall, 5000);
  }

  var delayedSubs = [];
  var connectingSub = null;
  function setToCreateSub (subName){

    var subObj = {
      subName : subName,
      minTime : Date.now() + (delayTime / 2),
      failCount : 0
    };
    delayedSubs.push(subObj);

    createSubcriber(subName);

    if(connectingSub === null ){
      continueSubQueue();
    }
  }
  function continueSubQueue(){
    if( typeof roomName !== 'string' ){
      delayedSubs = [];
      connectingSub = null;
      return;
    }

    if(delayedSubs.length > 0){

      delayedSubs.sort(function(a,b){
        return a.minTime - b.minTime;
      });

      var nextTime = delayedSubs[0].minTime;
      if( connectingSub === "delay" && nextTime < Date.now() ){
        connectSubscriber( delayedSubs[0].subName );
      }
      else{
        connectingSub = "delay";
        setTimeout( continueSubQueue, (delayTime / 2) );
      }
    }
    else{
      connectingSub = null;
    }
  }

  function popQueueObject(subName){
    for (var i =  0; i < delayedSubs.length; i++) {
      if( delayedSubs[i].subName === subName )
        return delayedSubs.splice(i, 1);
    }
  }

  // Local lifecycle notifications.
  function onSubscriberEvent (event, subscribeName) {
    console.log('[Red5ProSubsriber] ' + event.type + '.');
    updateStatusFromSubscribeEvent(event, document.getElementById( subscribeName + '-status' ));
  }
  function onSubscribeFail (message) {
    console.error('[Red5ProSubsriber] Subscribe Error :: ' + message);

    var failedSub = popQueueObject( connectingSub );
    failedSub.failCount++;
    if(failedSub.failCount < 4){
      failedSub.minTime = Date.now() + (delayTime * failedSub.failCount);
      delayedSubs.push(failedSub);
    }

    continueSubQueue();
  }
  function onSubscribeSuccess () {
    console.log('[Red5ProSubsriber] Subscribe Complete.');

    popQueueObject(connectingSub);
    continueSubQueue();
  }
  function onUnsubscribeFail (message) {
    console.error('[Red5ProSubsriber] Unsubscribe Error :: ' + message);
  }
  function onUnsubscribeSuccess () {
    console.log('[Red5ProSubsriber] Unsubscribe Complete.');
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

  function determineSubscriber ( subscribeName ) {
    var config = Object.assign({}, configuration, defaultSubscriberConfiguration);
    config.mediaElementId = subscribeName + '-video';

    var rtcConfig = Object.assign({}, config, {
      protocol: getSocketLocationFromProtocol().protocol,
      port: getSocketLocationFromProtocol().port,
      subscriptionId: 'subscriber-' + subscribeName + "-" + instanceId,
      streamName: subscribeName
    });
    var rtmpConfig = Object.assign({}, config, {
      protocol: 'rtmp',
      port: serverSettings.rtmpport,
      streamName: config.stream2,
      mimeType: 'rtmp/flv',
      useVideoJS: false,
      width: config.cameraWidth,
      height: config.cameraHeight,
      swf: '../../lib/red5pro/red5pro-subscriber.swf',
      swfobjectURL: '../../lib/swfobject/swfobject.js',
      productInstallURL: '../../lib/swfobject/playerProductInstall.swf'
    });
    var hlsConfig = Object.assign({}, config, {
      protocol: protocol,
      port: isSecure ? serverSettings.hlssport : serverSettings.hlsport,
      streamName: config.stream2,
      mimeType: 'application/x-mpegURL'
    });

    if (!config.useVideo) {
      rtcConfig.videoEncoding = 'NONE';
    }
    if (!config.useAudio) {
      rtcConfig.audioEncoding = 'NONE';
    }
    // console.log('[Red5ProSubscriber] config:: ' + JSON.stringify(config, null, 2));

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

  function createSubcriber( subscribeName ){
    console.log("Creating subscriber for: " + subscribeName);
    callList.push( subscribeName );
    subscribers[callList.indexOf(subscribeName)] = null;

    var blockToAdd = document.getElementById('FILLNAME').cloneNode(true);
    blockToAdd.id = subscribeName;
    blockToAdd.innerHTML = blockToAdd.innerHTML.replace(/FILLNAME/g, subscribeName);
    document.getElementById("app").appendChild( blockToAdd );

    var subStreamTitle = document.getElementById(subscribeName + '-title');
    subStreamTitle.innerText = subscribeName;
  }

  function connectSubscriber( subscribeName ){

    connectingSub = subscribeName;

    determineSubscriber( subscribeName )
      .then(function (subscriberImpl) {
        subscribers[callList.indexOf(subscribeName)] = subscriberImpl;
        // Subscribe to events.
        subscriberImpl.on('*', function(event){ onSubscriberEvent(event, subscribeName); });
        return subscriberImpl.subscribe();
      })
      .then(function () {
        onSubscribeSuccess();
      })
      .catch(function (error) {
        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
        onSubscribeFail('Error - ' + jsonError);
      });
  }

  function unsubscribeAll(){
    for(var i = callList.length - 1; i >= 0; i--){
      removeSubscriber(callList[i]);
    }
  }

  function removeSubscriber( subscribeName ){
    return new Promise(function(resolve, reject) {
      var subscriber = subscribers[callList.indexOf(subscribeName)];
      if (subscriber) {
        subscriber.unsubscribe()
          .then(function () {
            subscriber.off('*', function(event){ onSubscriberEvent(event, subscribeName); });
            onUnsubscribeSuccess();
            
            resolve();
          })
          .catch(function (error) {
            var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
            onUnsubscribeFail('Unmount Error = ' + jsonError);

            reject('Could not unsubscribe: ' + error);
          })
          .finally(function(){
            subscriberFinally(subscribeName);
          });
      }
      else {
        subscriberFinally(subscribeName);
        resolve();
      }
    });
  }

  function subscriberFinally(subscribeName){
    var subBlock = document.getElementById(subscribeName);
    if(subBlock != null && subBlock.parentNode != null){
      subBlock.parentNode.removeChild( subBlock );
    }
    else{
      var floatingBlocks = document.getElementsByClassName("float-left-conf");
      for (var i = 0; i < floatingBlocks.length; i++) {
        subBlock = floatingBlocks[i];
        if(subBlock.id != "" && ( subBlock.id == subscribeName || callList.indexOf(subBlock.id) < 0 ) && subBlock.parentNode != null){
          subBlock.parentNode.removeChild(subBlock);
        }
      };
    }
    subscribers.splice(callList.indexOf(subscribeName), 1);
    callList.splice(callList.indexOf(subscribeName), 1);
    popQueueObject(subscribeName);
  }

  window.addEventListener('beforeunload', function() {
    delayedSubs = [];
    function clearRefs () {
      if (targetPublisher) {
        targetPublisher.off('*', onPublisherEvent);
      }
      targetPubView = targetPublisher = undefined;
    }
    unpublish().then(unsubscribeAll).then(clearRefs).catch(clearRefs);
  });

  preview();
  beginStreamListCall();

})(this, document, window.red5prosdk);
