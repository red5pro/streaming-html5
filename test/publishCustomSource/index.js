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

  var updateStatusFromEvent = window.red5proHandlePublisherEvent; // defined in src/template/partial/status-field-publisher.hbs
  var targetPublisher;
  var streamTitle = document.getElementById('stream-title');
  var canvasElement = document.getElementById('red5pro-publisher-video');

  var defaultConfiguration = {
    protocol: 'ws',
    port: 8081,
    app: 'live'
  };

  function onPublisherEvent (event) {
    console.log('[Red5ProPublisher] ' + event.type + '.');
    updateStatusFromEvent(event);
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

  function preview () {
    return new Promise(function (resolve, reject) {

      try {
        var context = canvasElement.getContext('2d');
        context.fillStyle = '#a1a1a1';
        context.fillRect(0, 0, canvasElement.offsetWidth, canvasElement.offsetHeight);

        var publisher = new red5pro.RTCPublisher();
        var media = canvasElement.captureStream();
        publisher.attachStream(media);
        targetPublisher = publisher;
        publisher.on('*', onPublisherEvent);
        resolve();
      }
      catch(e) {
          onPublishFail('Error - ' + e.message);
          reject(e.message);
      }

    });
  }

  function publish () {
    var publisher = targetPublisher;
    var config = Object.assign({},
                    configuration,
                    defaultConfiguration);
    config.streamName = config.stream1;
    streamTitle.innerText = config.streamName;
    console.log('[Red5ProPublisher] config:: ' + JSON.stringify(config, null, 2));

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
      var publisher = targetPublisher;
      if (publisher) {
        publisher.unpublish()
          .then(function () {
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

  // Kick off.
  preview()
    .then(publish)
    .catch(function (error) {
      console.error('[Red5ProPublisher] :: Error in publishing - ' + error);
     });

  window.addEventListener('beforeunload', function() {
    function clearRefs () {
      targetPublisher.off('*', onPublisherEvent);
      targetPublisher = undefined;
    }
    unpublish().then(clearRefs).catch(clearRefs);
  });

})(this, document, window.red5prosdk);
