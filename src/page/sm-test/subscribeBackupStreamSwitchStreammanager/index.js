/*
Copyright © 2015 Infrared5, Inc. All rights reserved.

The accompanying code comprising examples for use solely in conjunction with Red5 Pro (the "Example Code") 
is  licensed  to  you  by  Infrared5  Inc.  in  consideration  of  your  agreement  to  the  following  
license terms  and  conditions.  Access,  use,  modification,  or  redistribution  of  the  accompanying  
code  constitutes your acceptance of the following license terms and conditions.

Permission is hereby granted, free of charge, to you to use the Example Code and associated documentation 
files (collectively, the "Software") without restriction, including without limitation the rights to use, 
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit 
persons to whom the Software is furnished to do so, subject to the following conditions:

The Software shall be used solely in conjunction with Red5 Pro. Red5 Pro is licensed under a separate end 
user  license  agreement  (the  "EULA"),  which  must  be  executed  with  Infrared5,  Inc.   
An  example  of  the EULA can be found on our website at: https://account.red5pro.com/assets/LICENSE.txt.

The above copyright notice and this license shall be included in all copies or portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,  INCLUDING  BUT  
NOT  LIMITED  TO  THE  WARRANTIES  OF  MERCHANTABILITY, FITNESS  FOR  A  PARTICULAR  PURPOSE  AND  
NONINFRINGEMENT.   IN  NO  EVENT  SHALL INFRARED5, INC. BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN  AN  ACTION  OF  CONTRACT,  TORT  OR  OTHERWISE,  ARISING  FROM,  OUT  OF  OR  IN CONNECTION 
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/* eslint-disable no-console */
(function (red5prosdk) {

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
  red5prosdk.setLogLevel(configuration.verboseLogging ? red5prosdk.LOG_LEVELS.TRACE : red5prosdk.LOG_LEVELS.WARN);

  var protocol = serverSettings.protocol;
  var isSecure = protocol == 'https';
  function getSocketLocationFromProtocol () {
    return !isSecure
      ? {protocol: 'ws', port: serverSettings.wsport}
      : {protocol: 'wss', port: serverSettings.wssport};
  }

  var subscriberAmount = 2

  var infoField = document.getElementById('info-field');

  var toggleOn = true;
  var streamManagerAddress = document.getElementById('stream-manager-address');
  var streamName = document.getElementById('stream-name');

  var startButton = document.getElementById('start-button');
  startButton.addEventListener('click', start);

  var toggleOverlapButton = document.getElementById('toggle-overlap');
  toggleOverlapButton.addEventListener('click', toggleOverlap);

  var container = document.getElementById('stream-swap-container');
  var noVideoAlert = document.getElementById('no-video-alert');
  var baseConfig = {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port,
    autoLayoutOrientation: false
  };

  var inactive = true;
  var activeSubscribers = {};
  var activeSubscriberModel = {
    hasDisconnected: false,
    isActive: false,
    id: null,
    subscriber: null,
    eventHandler: null
  };

  streamManagerAddress.value = configuration.host;
  streamName.value = configuration.stream1;

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

  function query(name, url) { // eslint-disable-line no-unused-vars
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  function generateVideoElement (id) {
    var div = document.createElement('div');
    div.classList.add('red5pro-media-container', 'hidden');
    var vid = document.createElement('video');
    vid.id = id
    vid.setAttribute('controls', 'controls');
    //  vid.setAttribute('autoplay', 'autoplay');
    vid.setAttribute('playsinline', 'playsinline');
    //  vid.setAttribute('muted', 'muted');
    vid.setAttribute('width', '640');
    vid.setAttribute('height', '480');
    vid.classList.add('red5pro-media', 'red5pro-media-background');
    div.appendChild(vid);
    return div;
  }

  function convertDashForKey (value) {
    return value.split('-').join('_');
  }

  function handleGenerateSubscriberError (error) {
    console.error('Could not generate subscriber: ' + error);
  }

  function findSubscriberById (id) {
    return activeSubscribers[convertDashForKey(id)];
  }

  function findNextActiveSubscriber () {
    var key, subscriber;
    for (key in activeSubscribers) {
      subscriber = activeSubscribers[key];
      if (!subscriber.isActive && !subscriber.hasDisconnected) {
        return subscriber;
      }
    }
    return undefined;
  }

  function removeSubscriberFromActiveMap (subscriber) {
    delete activeSubscribers[convertDashForKey(subscriber.id)];
  }

  function removeSubscriberFromUI (subscriber) {
    console.log('[OMG] removing ' + subscriber.id);
    var element = document.getElementById(subscriber.id);
    if (element) {
      var p = element.parentNode
      var p2 = p.parentNode
      p2.removeChild(p);
    }
  }

  function bundleSubscriberListener (subscriberId) {
    return function (event) {
      if (event.type === 'Subscribe.Time.Update' || event.type === 'Subscribe.Metadata') return;

      console.log('[Red5ProSubscriber_' + subscriberId + '] :: ' + event.type);
      if (event.type === 'Subscribe.Fail' ||
          event.type === 'Subscriber.Stop' ||
          event.type === 'Subscribe.Play.Unpublish' ||
          event.type === 'Subscribe.Connection.Closed') {
        var subscriber = findSubscriberById(subscriberId);
        var wasActive = subscriber.isActive;
        if (wasActive) {
          var replacement = findNextActiveSubscriber();
          if (replacement) {
            document.getElementById(replacement.id).parentNode.classList.remove('hidden');
            document.getElementById(replacement.id).parentNode.dataset.activeVideo = replacement.id;
            replacement.isActive = true;
            window.exposeSubscriberGlobally(replacement.subscriber);
            replacement.subscriber.play();
            replacement.subscriber.disableStandby();
            var options = replacement.subscriber._options;
            infoField.innerText = 'Subscribed to "' + options.streamName + '" on ' + options.connectionParams.host + ".";
          }
          else {
            container.appendChild(noVideoAlert);
            noVideoAlert.innerText = 'No videos to display.';
            infoField.innerText = '';
          }
        }
        if (subscriber) {
          subscriber.subscriber.off('*', subscriber.eventHandler);
          subscriber.hasDisconnected = true;
          subscriber.isActive = false;
          removeSubscriberFromUI(subscriber);
          removeSubscriberFromActiveMap(subscriber);
        }
      }
    }
  }

  function monitorSubscriber (id, subscriber) {
    var eventHandler = bundleSubscriberListener(id);
    var element = document.getElementById(id);
    activeSubscribers[convertDashForKey(id)] = Object.assign({}, activeSubscriberModel, {
      id: id,
      subscriber: subscriber,
      eventHandler: eventHandler,
      isActive: inactive
    });
    if (inactive) {
      inactive = false
      subscriber.play();
      element.parentNode.classList.remove('hidden');
      element.parentNode.dataset.activeVideo = id;
      console.log('[OMG] Subscriber ' + id + ' is the first one in!');
      console.log('[OMG] :: ' + JSON.stringify(subscriber._options, null, 2));
      var options = subscriber._options;
      infoField.innerText = 'Subscribed to "' + options.streamName + '" on ' + options.connectionParams.host + ".";
      if (noVideoAlert.parentNode) {
        noVideoAlert.parentNode.removeChild(noVideoAlert);
      }
    }
    else {
      subscriber.enableStandby();
    }
    subscriber.on('*', eventHandler);
  }

  function generateSubscriber (config) {
    return new Promise(function (resolve, reject) {
      new red5prosdk.RTCSubscriber()
        .init(config)
        .then(function (subscriber) {
          if (window.exposeSubscriberGlobally) {
            window.exposeSubscriberGlobally(subscriber);
          }
          return subscriber.subscribe();
        })
        .then(function (subscriber) {
          resolve(subscriber);
        })
        .catch(function (error) {
          console.error(error);
          reject(error);
        });
    });
  }

  function onSubscriberResolve (id) {
    return function (subscriber) {
      monitorSubscriber(id, subscriber);
    };
  }

  function setupSubscribers (edgeList) {
    var i = 0, length = edgeList.length;
    var id;
    for (i; i < length; i++) {
      id = ['red5pro-subscriber', edgeList[i].name, i].join('-');
      container.appendChild(generateVideoElement(id));
      var app = edgeList[i].scope;
      app = app.charAt(0) === '/' ? app.substr(1, app.length) : app;
      var subConfig = Object.assign({}, baseConfig, {
        mediaElementId: id,
        host: streamManagerAddress.value,
        app: 'streammanager',
        connectionParams: {
          host: edgeList[i].serverAddress,
          app: app 
        },
        streamName: edgeList[i].name
      });

      subConfig.connectionParams = Object.assign({}, 
        getAuthenticationParams().connectionParams,
        subConfig.connectionParams);

      generateSubscriber(subConfig)
        .then(onSubscriberResolve(id))
        .catch(handleGenerateSubscriberError);
    }

    if (length === 0) {
      noVideoAlert.innerText = "No videos found.";
    }
  }

  function getEdgeListFromStreamName (smHost, smApp, streamName, amount) {
    var version = configuration.streamManagerAPI;
    var url = 'https://' + smHost + '/streammanager/api/' + version + '/event/' + smApp + '/' + streamName + '?action=subscribe&endpoints=' + amount;
    return new Promise(function (resolve, reject) { // eslint-disable-line no-unused-vars
      fetch(url)
        .then(function (res) {
          if (res.headers.get("content-type") &&
            res.headers.get("content-type").toLowerCase().indexOf("application/json") >= 0) {
              return res.json();
          } else {
            throw new TypeError('Could not properly parse response.');
          }
        })
        .then(function (json) {
          resolve(json);
        })
        .catch(function (error) {
          var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
          console.error('[streammanager-subscriber] :: Error - Could not request Edge IPs from Stream Manager. ' + jsonError)
          // let pass.
          resolve([])
        });
    });
  }

  function getEdges (streamManagerAddress, streamName, amount) { // eslint-disable-line no-unused-vars
    return new Promise(function (resolve, reject) {
      getEdgeListFromStreamName(streamManagerAddress, configuration.app, streamName, amount)
        .then(function (list) {
          if (list.length === amount) {
            resolve(list);
          } else if (list.length > amount) {
            resolve(list.slice(0, amount));
          } else if (list.length > 0) {
            var padded = [];
            var i = 0;
            var index = 0;
            for(i; i < amount; i++) {
              if (index >= list.length) {
                index = 0;
              }
              padded.push(list[index]);
              index += 1;
            }
            resolve(padded);
          } else {
            resolve(list)
          }
        })
        .catch(function (e) {
          console.log('Error in getting edge list: ' + e.message);
          reject(e);
        });
    });
  }

  function toggleOverlap () {
    toggleOn = !toggleOn;
    var elements = document.getElementsByClassName('red5pro-media-container');
    var i = elements.length;
    var el;
    while (--i > -1) {
      el = elements[i];
      if (toggleOn) {
        el.classList.remove('inline-container', 'floater');
        if (el.dataset.activeVideo !== el.firstChild.id) {
          el.classList.add('hidden');
        }
      }
      else {
        el.classList.remove('hidden');
        el.classList.add('inline-container', 'floater');
      }
    }
  }

  function start () {
    noVideoAlert.innerText = "Gathering subscribers...";
    getEdges(streamManagerAddress.value, streamName.value, subscriberAmount)
      .then(setupSubscribers)
      .catch(function (error) {
        console.log('Error: ' + error);
      });
      startButton.classList.add('hidden');
      toggleOverlapButton.classList.remove('hidden');
  }

})(window.red5prosdk);

