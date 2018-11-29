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

  var transcoderManifest;

  var updateStatusFromEvent = window.red5proHandlePublisherEvent; // defined in src/template/partial/status-field-publisher.hbs
  var streamTitle = document.getElementById('stream-title');
  var provisionLink = document.getElementById('provision-link');
  var streamListing = document.getElementById('stream-listing');
  var submitButton = document.getElementById('submit-button');
  var transcoderTypes = ['high', 'mid', 'low'];
  var transcoderForms = (function (types) {
    var list = [];
    var i, length = types.length;
    for (i = 0; i < length; i++) {
      list.push(document.getElementById(['transcoder', types[i]].join('-')));
    }
    return list;
  })(transcoderTypes);
  var qualityContainer = document.getElementById('quality-container');

  submitButton.addEventListener('click', submitTranscode);
  streamTitle.innerText = configuration.stream1;

  var protocol = serverSettings.protocol;
  var isSecure = protocol == 'https';
  var accessToken = configuration.streamManagerAccessToken;
  var authName = '';
  var authPass = '';
  var transcoderPOST = {
    meta: {
      authentication: {
        username: authName,
        password: authPass
      },
      stream: [],
      georules: {
        regions: ['US', 'UK'],
        restricted: false
      },
      qos: 3
    }
  }

  function postTranscode (transcode) {
    var host = configuration.host;
    var app = configuration.app;
    var streamName = configuration.stream1;
    var port = serverSettings.httpport.toString();
    var portURI = (port.length > 0 ? ':' + port : '');
    var baseUrl = isSecure ? protocol + '://' + host : protocol + '://' + host + portURI;
    var apiVersion = configuration.streamManagerAPI || '3.1';
    var url = baseUrl + '/streammanager/api/' + apiVersion + '/admin/event/meta/' + app + '/' + streamName + '?accessToken=' + accessToken;
    return new Promise(function (resolve, reject) {
      fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(transcode)
        })
        .then(function (res) {
          if (res.headers.get("content-type") &&
            res.headers.get("content-type").toLowerCase().indexOf("application/json") >= 0) {
              return res.json();
          }
          else {
            throw new TypeError('Could not properly parse response.');
          }
        })
        .then(function (json) {
          resolve(json);
          provisionLink.href = url;
          provisionLink.innerText = url;
        })
        .catch(function (error) {
            var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
            console.error('[PublisherStreamManagerTest] :: Error - Could not POST transcode request. ' + jsonError)
            reject(error)
        });
    });
  }

  function requestOrigin (configuration) {
    var host = configuration.host;
    var app = configuration.app;
    var streamName = configuration.stream1;
    var port = serverSettings.httpport.toString();
    var portURI = (port.length > 0 ? ':' + port : '');
    var baseUrl = isSecure ? protocol + '://' + host : protocol + '://' + host + portURI;
    var apiVersion = configuration.streamManagerAPI || '3.1';
    var url = baseUrl + '/streammanager/api/' + apiVersion + '/event/' + app + '/' + streamName + '?action=broadcast';
      return new Promise(function (resolve, reject) {
        fetch(url)
          .then(function (res) {
            if (res.headers.get("content-type") &&
              res.headers.get("content-type").toLowerCase().indexOf("application/json") >= 0) {
                return res.json();
            }
            else {
              throw new TypeError('Could not properly parse response.');
            }
          })
          .then(function (json) {
            resolve(json);
          })
          .catch(function (error) {
            var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
            console.error('[PublisherStreamManagerTest] :: Error - Could not request Origin IP from Stream Manager. ' + jsonError)
            reject(error)
          });
    });
  }

  var retryCount = 0;
  var retryLimit = 3;
  function respondToOrigin (response) {
    var i = 0;
    var length = transcoderManifest.length;
    for(i; i < length; i++) {
      var p = document.createElement('p');
      p.style.margin = '12px 0';
      p.textContent = 'rtmp://' + response.serverAddress + ':1935/' + configuration.app + '/' + transcoderManifest[i].name;
      streamListing.appendChild(p);
    }
  }

  function respondToOriginFailure (error) {
    if (retryCount++ < retryLimit) {
      var retryTimer = setTimeout(function () {
        clearTimeout(retryTimer);
        startup();
      }, 1000);
    }
    else {
      var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
      updateStatusFromEvent({
        type: red5prosdk.PublisherEventTypes.CONNECT_FAILURE
      });
      console.error('[Red5ProPublisher] :: Retry timeout in publishing - ' + jsonError);
    }
  }

  function startup () {
    // Kick off.
    requestOrigin(configuration)
      .then(respondToOrigin)
      .catch(respondToOriginFailure);
  }

  function generateTranscoderPost (streamName, forms) {
    var i = forms.length;
    var formItem;
    var bitrateField;
    var widthField;
    var heightField;
    var setting;
    var streams = [];
    while (--i > -1) {
      formItem = forms[i];
      bitrateField = formItem.getElementsByClassName('bitrate-field')[0];
      widthField = formItem.getElementsByClassName('width-field')[0];
      heightField = formItem.getElementsByClassName('height-field')[0];
      setting = {
        name: [streamName, (i + 1)].join('_'),
        level: (i + 1),
        properties: {
          videoWidth: parseInt(widthField.value, 10),
          videoHeight: parseInt(heightField.value, 10),
          videoBR: parseInt(bitrateField.value, 10)
        }
      }
      streams.push(setting);
    }
    return streams;
  }

  function submitTranscode () {
    var streams = generateTranscoderPost(configuration.stream1, transcoderForms);
    transcoderPOST.meta.stream = streams;
    postTranscode(transcoderPOST)
      .then(function (response) {
        if (response.errorMessage) {
          console.error('[Red5ProPublisher] :: Error in POST of transcode configuration: ' + response.errorMessage);
          updateStatusFromEvent({
            type: red5prosdk.PublisherEventTypes.CONNECT_FAILURE
          });
        }
        else {
          transcoderManifest = streams;
          qualityContainer.classList.remove('hidden');
          startup();
        }
      })
      .catch(function (error) {
        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
        console.error('[Red5ProPublisher] :: Error in POST of transcode configuration: ' + jsonError);
        updateStatusFromEvent({
          type: red5prosdk.PublisherEventTypes.CONNECT_FAILURE
        });
      });
  }

})(this, document, window.red5prosdk);

