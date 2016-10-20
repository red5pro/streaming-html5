(function(window, document, red5pro) {
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

  var defaultConfiguration = {
    protocol: 'ws',
    port: 8081,
    app: 'live',
    streamType: 'webrtc'
  };

  var streamsList = [];
  var roomName;
  var chosenName;
  var publishing = false;

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
      publish();
    else
      //return an error about unique stream names
  });

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
      audio: configuration.audio,
      video: configuration.video
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

    var url = 'http://' + configuration.host + ':5080/' + configuration.app + '/streams.jsp';
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
        if (typeof jsonOnString === 'string') {
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
    streamsList = [];

    // var found = false;

    for (var i = listIn.length - 1; i >= 0; i--) {
      streamsList.push(listIn[i].name);
    //   found = listIn[i].name == configuration.stream2;
    //   if(found) break;
    }

    // if (found) {
    //   subscribe();
    // }

    setWaitTime();
  }

  function listError (err) {
    console.log( "Error recieved on streamListCall - " + err );
    setWaitTime();
  }

  function setWaitTime () {
    setTimeout(beginStreamListCall, 5000);
  }

  function createSubcriber( subscribeName ){
    var subObj = {};
    subObj[streamName] = subscribeName;
    //add all of the views here
  }

  beginStreamListCall();

})(this, document, window.red5prosdk);
