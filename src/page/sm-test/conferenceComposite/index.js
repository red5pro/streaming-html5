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

  var groupField = document.getElementById('group-field');
  var submitButton = document.getElementById('submit-button');
  var conferenceContainer = document.querySelector('.conference')

  var protocol = serverSettings.protocol;
  var isSecure = protocol == 'https';
  function getSocketLocationFromProtocol () {
    return !isSecure
      ? {protocol: 'ws', port: serverSettings.wsport}
      : {protocol: 'wss', port: serverSettings.wssport};
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

  var config = Object.assign({},
    configuration,
    getAuthenticationParams());

  var rtcConfig = Object.assign({}, config, {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port
  });

  // https://nextechar-test.red5pro.cloud/live/groupinfo.jsp?group=live/group03
  var port = isSecure ? 443 : 5080
  var baseQueryURL = `${protocol}://${rtcConfig.host}:${port}/live/groupinfo.jsp`

  var groupName;
  var POLL_INTERVAL = 5000
  var pollInterval = 0
  var currentStreams = []

  function onSubscriberEvent (event) {
    var subscriber = event.subscriber
    if (event.type === red5prosdk.SubscriberEventTypes.CONNECTION_CLOSED ||
      event.type === red5prosdk.SubscriberEventTypes.CONNECT_FAILURE ||
      event.type === red5prosdk.SubscriberEventTypes.PLAY_UNPUBLISH) {
      var el = subscriber.getPlayer()
      if (el && el.parentNode) {
        el.parentNode.removeChild(el)
      }
      subscriber.off('*', onSubscriberEvent)
      subscriber.unsubscribe().catch(function (e) {
        console.warn(e)
      })
    }
  }

  function getRegionIfDefined () {
    var region = configuration.streamManagerRegion;
    if (typeof region === 'string' && region.length > 0 && region !== 'undefined') {
      return region;
    }
    return undefined
  }

  function requestEdge (configuration) {
    var host = configuration.host;
    var app = configuration.app;
    var port = serverSettings.httpport;
    var baseUrl = protocol + '://' + host + ':' + port;
    var streamName = configuration.stream1;
    var apiVersion = configuration.streamManagerAPI || '4.0';
    var url = baseUrl + '/streammanager/api/' + apiVersion + '/event/' + app + '/' + streamName + '?action=subscribe';
    var region = getRegionIfDefined();
    if (region) {
      url += '&region=' + region;
    }
    return new Promise(function (resolve, reject) {
        fetch(url)
          .then(function (res) {
            if(res.status == 200){
                if (res.headers.get("content-type") && res.headers.get("content-type").toLowerCase().indexOf("application/json") >= 0) {
                  return res.json();
                } else {
                  throw new TypeError('Could not properly parse response.');
                }
            } else {
              var msg = "";
              if(res.status == 400) {
                msg = "An invalid request was detected";
              } else if(res.status == 404) {
                msg = "Data for the request could not be located/provided.";
              } else if(res.status == 500) {
                msg = "Improper server state error was detected.";              } else {
                msg = "Unkown error";
              }
              throw new TypeError(msg);
            }
          })
          .then(function (json) {
            resolve(json);
          })
          .catch(function (error) {
            var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
            console.error('[SubscribeStreamManagerTest] :: Error - Could not request Edge IP from Stream Manager. ' + jsonError)
            reject(error)
          });
    });
  }

  function generateSubscriber (stream) {
    var el = document.createElement('video')
    el.autoplay = 'autoplay'
    el.controls = 'controls'
    el.muted = 'muted'
    el.classList.add('conference-video')
    el.id = stream.stream
    var c = Object.assign({}, rtcConfig, {
      app: stream.contextpath,
      streamName: stream.stream,
      mediaElementId: stream.stream
    })
    requestEdge(c)
      .then(function (response) {
        var conf = Object.assign({}, c, {
          app: configuration.proxy,
          connectionParams: {
            host: response.serverAddress
          }
        })
        new red5prosdk.RTCSubscriber()
          .init(conf)
          .then(function (sub) {
            sub.on('*', onSubscriberEvent)
            return sub.subscribe()
          })
          .catch(function (error) {
            console.error(error)
          });
      })
      .catch(function (e) {
        console.error(e);
      });

    return el;
  }

  function addNewStreams (list) {
    list.forEach(function (streamName) {
      conferenceContainer.appendChild(generateSubscriber(streamName))
    })
  }

  function parseGroup (data) {
    console.log(data)
    var streams = data.data.streams
    var newStreams = streams.filter(function (entry) {
      return currentStreams.indexOf(entry.stream) === -1 && entry.stream !== groupName
    })
    currentStreams = streams.map(function (entry) {
      return entry.stream
    })
    addNewStreams(newStreams)
  }

  function runCompositePoll () {
    if (shuttingDown) return

    var url = `${baseQueryURL}?group=${rtcConfig.app}/${groupName}`
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
          } catch(e) {
            throw new TypeError('Could not properly parse response: ' + e.message);
          }
        }
        parseGroup(json);
      })
      .catch(function (e) {
        console.error(e)
      })
  }

  function start () {
    if (groupField.value.length === 0) {
      console.warn('Please provide a group name.')
      return
    }
    submitButton.disabled = true
    groupName = groupField.value;
    pollInterval = setInterval(runCompositePoll, POLL_INTERVAL)
    runCompositePoll()
  }

  submitButton.addEventListener('click', start)

  var shuttingDown = false;
  function shutdown() {
    clearInterval(pollInterval)
    if (shuttingDown) return;
    shuttingDown = true;
  }
  window.addEventListener('pagehide', shutdown);
  window.addEventListener('beforeunload', shutdown);

})(this, document, window.red5prosdk);
