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

  red5pro.setLogLevel(configuration.verboseLogging ? red5pro.LogLevels.TRACE : red5pro.LogLevels.WARN);

  window.R5ProBase = {
    Publisher: {
      determinePublisher: function (configuration, order) {
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
            .catch(function (error) {
              reject(error);
            });

        });
      },
      getRTCPublisher: function (configuration) {
        return this.determinePublisher({
                rtc: configuration
                }, ['rtc']);
      },
      preview: function (publisher, elementId, gumConfiguration) {
        return new Promise(function (resolve, reject) {

          var view = new red5pro.PublisherView(elementId);
          var nav = navigator.mediaDevice || navigator;
          view.attachPublisher(publisher);

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
      },
      publish: function (publisher, streamName) {
        return publisher.publish()
      },
      unpublish: function (publisher, view) {
        return new Promise(function (resolve, reject) {
          if (publisher) {
            publisher.unpublish()
              .then(function () {
                view.view.src = '';
                publisher.setView(undefined);
                resolve();
              })
              .catch(function (error) {
                reject(error);
              });
          }
          else {
            resolve();
          }

        });
      },
      Subscriber: {
        determineSubscriber: function (configuration) {
        },
        getRTCSubscriber: function (configuration) {
        },
        subscribe: function (subscriber, streamName) {
        },
        unsubscribe: function (subscriber) {
        }
      }
    }
  };

})(this, document, window.red5prosdk);
