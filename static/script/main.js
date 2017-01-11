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

  function Publisher() {}
  Publisher.prototype.determinePublisher = function (configuration, order) {

    console.log('[Red5ProPublisher] config:\n' + JSON.stringify(configuration, null, 2));
    return new Promise(function (resolve, reject) {
      var publisher = new red5pro.Red5ProPublisher();
      publisher.setPublishOrder(order)
        .init(configuration)
        .then(function (selectedPublisher) {
          var type = selectedPublisher ? selectedPublisher.getType() : undefined;
          var requiresPreview = type.toLowerCase() === publisher.publishTypes.RTC;
          resolve({
            publisher: selectedPublisher,
            requiresPreview: requiresPreview
          });
        })
        .catch(reject);
    });

  };

  Publisher.prototype.getRTCPublisher = function (configuration) {
    return this.determinePublisher({
              rtc: configuration
            }, ['rtc']);
  };

  Publisher.prototype.preview = function (publisher, elementId, gumConfiguration) {

    return new Promise(function (resolve, reject) {
      var view = new red5pro.PublisherView(elementId);
      view.attachPublisher(publisher);

      var nav = navigator.mediaDevice || navigator;
      if (typeof gumConfiguration !== 'undefined') {
        console.log('[Red5ProPublisher] gUM:: ' + JSON.stringify(gumConfiguration, null, 2));
        nav.getUserMedia(gumConfiguration, function (media) {
          // Upon access of user media,
          // 1. Attach the stream to the publisher.
          // 2. Show the stream as preview in view instance.
          publisher.attachStream(media);
          view.preview(media, true);
          resolve({
            publisher: publisher,
            view: view
          });
        }, function(error) {
          reject(error);
        })
      }
      else {
        resolve({
          publisher: publisher,
          view: view
        });
      }
    });

  };

  Publisher.prototype.publish = function (publisher, streamName) { //eslint-disable-line no-unused-vars
        return publisher.publish()
  };

  Publisher.prototype.unpublish = function (publisher, view) {

    return new Promise(function (resolve, reject) {
      if (publisher) {
        publisher.unpublish()
          .then(function () {
            view.view.src = '';
            publisher.setView(undefined);
            resolve();
          })
          .catch(reject);
      }
      else {
        resolve();
      }
    });

  };

  function Subscriber() {}
  Subscriber.prototype.determineSubscriber = function (configuration, order) {

    console.log('[Red5ProSubscriber] config:\n' + JSON.stringify(configuration, null, 2));

    return new Promise(function (resolve, reject) {
      var subscriber = new red5pro.Red5ProSubscriber();
      subscriber.setPlaybackOrder(order)
        .init(configuration)
        .then(function (selectedSubscriber) {
          resolve({
            subscriber: selectedSubscriber
          });
        })
        .catch(reject);
    });

  };

  Subscriber.prototype.getRTCSubscriber = function (configuration) {
    return this.determineSubscriber({
              rtc: configuration
            }, ['rtc']);
  };

  Subscriber.prototype.view = function (subscriber, elementId) {

    return new Promise(function (resolve, reject) {
      try {
        var view = new red5pro.PlaybackView(elementId);
        view.attachSubscriber(subscriber);
        resolve({
          subscriber: subscriber,
          view: view
        });
      }
      catch(e) {
        reject(e.message);
      }
    });

  };

  Subscriber.prototype.subscribe = function (subscriber, streamName) { //eslint-disable-line no-unused-vars
    return subscriber.play()
  };

  Subscriber.prototype.unsubscribe = function (subscriber, view) {

    return new Promise(function (resolve, reject) {
      if (subscriber) {
        subscriber.stop()
         .then(function () {
            view.view.src = ''
            subscriber.setView(undefined);
            resolve();
        })
        .catch(reject);
      }
      else {
        resolve();
      }
    });

  };

  window.R5ProBase = {
    Publisher: Publisher,
    Subscriber: Subscriber
  };

})(this, document, window.red5prosdk);
