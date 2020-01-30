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

  var targetPublisher;

  var updateStatusFromEvent = window.red5proHandlePublisherEvent; // defined in src/template/partial/status-field-publisher.hbs
  var streamTitle = document.getElementById('stream-title');
  var statisticsField = document.getElementById('statistics-field');

  var bandwidthAudioField = document.getElementById('audio-bitrate-field');
  var bandwidthVideoField = document.getElementById('video-bitrate-field');
  var keyFramerateField = document.getElementById('key-framerate-field');
  var cameraSelect = document.getElementById('camera-select');
  var cameraWidthField = document.getElementById('camera-width-field');
  var cameraHeightField = document.getElementById('camera-height-field');
  var framerateField =document.getElementById('framerate-field');
  var publishButton = document.getElementById('publish-button');

  var settingsControls = document.getElementsByClassName('settings-control');

  bandwidthAudioField.value = configuration.bandwidth.audio;
  bandwidthVideoField.value = configuration.bandwidth.video;
  keyFramerateField.value = configuration.keyFramerate || 3000;
  cameraWidthField.value = configuration.mediaConstraints.video !== true ? configuration.mediaConstraints.video.width.max : 640;
  cameraHeightField.value = configuration.mediaConstraints.video !== true ? configuration.mediaConstraints.video.height.max : 480;
  framerateField.value = configuration.mediaConstraints.video !== true ? configuration.mediaConstraints.video.frameRate.max : 30;

  var bitrateField = document.getElementById('bitrate-field');
  var packetsField = document.getElementById('packets-field');
  var resolutionField = document.getElementById('resolution-field');

  var isShowingModal = false;
  var constraintInfoNotices = [];
  function showModal (content) {
    isShowingModal = true;
    var div = document.createElement('div');
    div.classList.add('modal');
    var container = document.createElement('div');
    var button = document.createElement('a');
    var close = document.createTextNode('close');
    button.href = "#";
    button.appendChild(close);
    button.classList.add('modal-close');
    container.appendChild(button);
    container.appendChild(content);
    div.appendChild(container);
    document.body.appendChild(div);
    button.addEventListener('click', function (event) {
      event.preventDefault();
      document.body.removeChild(div);
      isShowingModal = false;
      showConstraintInfo();
      return false;
    });
  }
  function generateLine (text) {
    var p = document.createElement('p');
    var t = document.createTextNode(text);
    p.appendChild(t);
    return p;
  }  
  function contentFromConstraintInfo (info) {
    var content = document.createElement('div');
    var video;
    var findDim = function (dimObject) {
      if (typeof dimObject === 'number') {
        return dimObject;
      }
      else if (typeof dimObject === 'undefined') {
        return 'N/A';
      }
      if (dimObject.hasOwnProperty('exact')) {
        return dimObject.exact;
      }
      return dimObject.min;
    }
    if (info.accepted) {
      video = info.accepted.video;
      content.appendChild(generateLine('Accepted!'))
      content.appendChild(document.createElement('br'));
      content.appendChild(generateLine('Resolution: ' + video.width + 'x' + video.height))
      content.appendChild(document.createElement('br'));
      content.appendChild(generateLine('Framerate: ' + video.frameRate));
    } else if (info.constraints) {
      video = info.constraints.video;
      content.appendChild(generateLine('Rejected.'))
      content.appendChild(document.createElement('br'));
      content.appendChild(generateLine('Resolution: ' + findDim(video.width) + 'x' + findDim(video.height)))
      content.appendChild(document.createElement('br'));
      content.appendChild(generateLine('Framerate: ' + findDim(video.frameRate)));
    }
    return content;
  }
  function showConstraintInfo () {
    if (!isShowingModal && constraintInfoNotices.length > 0) {
      var info = constraintInfoNotices.shift();
      showModal(contentFromConstraintInfo(info));
    }
  }
  function showConstraintError (type, reason) {
    var content = document.createElement('div');
    content.appendChild(generateLine('Error'));
    content.appendChild(document.createElement('br'));
    content.appendChild(generateLine(type + ': ' + reason));
    showModal(content);
  }

  var bitrate = 0;
  var packetsSent = 0;
  var frameWidth = 0;
  var frameHeight = 0;

  function updateStatistics (b, p, w, h) {
    statisticsField.classList.remove('hidden');
    bitrateField.innerText = b === 0 ? 'N/A' : Math.floor(b);
    packetsField.innerText = p;
    resolutionField.innerText = (w || 0) + 'x' + (h || 0);
  }

  function onBitrateUpdate (b, p) {
    bitrate = b;
    packetsSent = p;
    updateStatistics(bitrate, packetsSent, frameWidth, frameHeight);
  }

  function onResolutionUpdate (w, h) {
    frameWidth = w;
    frameHeight = h;
    updateStatistics(bitrate, packetsSent, frameWidth, frameHeight);
  }

  streamTitle.innerText = configuration.stream1;

  var protocol = serverSettings.protocol;
  var isSecure = protocol == 'https';

  var isPublishable = true;
  function setPublishableState (isPublishableFlag) {
    isPublishable = isPublishableFlag;
    var i = settingsControls.length;
    while (--i > -1) {
      if (!isPublishable) {
        settingsControls[i].setAttribute('disabled', 'disabled');
      } else {
        settingsControls[i].removeAttribute('disabled');
      }
    }
    publishButton.innerText = isPublishable ? 'Start Publish' : 'Stop Publish';
  }
  setPublishableState(true);

  function getSocketLocationFromProtocol () {
    return !isSecure
      ? {protocol: 'ws', port: serverSettings.wsport}
      : {protocol: 'wss', port: serverSettings.wssport};
  }
  var defaultConfiguration = {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port,
    streamMode: configuration.recordBroadcast ? 'record' : 'live'
  };

  function onPublisherEvent (event) {
    console.log('[Red5ProPublisher] ' + event.type + '.');
    updateStatusFromEvent(event);
    if (event.type === 'WebRTC.MediaConstraints.Accepted' ||
      event.type === 'WebRTC.MediaConstraints.Rejected') {
      constraintInfoNotices.push(event.data);
      showConstraintInfo();
    }
  }
  function onPublishFail (message) {
    console.error('[Red5ProPublisher] Publish Error :: ' + message);
    setPublishableState(true);
  }
  function onPublishSuccess (publisher) {
    console.log('[Red5ProPublisher] Publish Complete.');
    setPublishableState(false);
    try {
      var pc = publisher.getPeerConnection();
      var stream = publisher.getMediaStream();
      window.trackBitrate(pc, onBitrateUpdate);
      statisticsField.classList.remove('hidden');
      stream.getVideoTracks().forEach(function (track) {
        var settings = track.getSettings();
        onResolutionUpdate(settings.width, settings.height);
      });
    }
    catch (e) {
      // no tracking for you!
    }
  }
  function onUnpublishFail (message) {
    console.error('[Red5ProPublisher] Unpublish Error :: ' + message);
    statisticsField.classList.add('hidden');
    setPublishableState(true);
  }
  function onUnpublishSuccess () {
    console.log('[Red5ProPublisher] Unpublish Complete.');
    statisticsField.classList.add('hidden');
    setPublishableState(true);
  }

  function onDeviceError (error) {
    console.error('Could not access devices: ' + error);
  }

  function listDevices (devices) {
    var cameras = devices.filter(function (item) {
      return item.kind === 'videoinput';
    })
    var options = cameras.map(function (camera, index) {
      return '<option value="' + camera.deviceId + '">' + (camera.label || 'camera ' + index) + '</option>';
    });
    cameraSelect.innerHTML = options.join(' ');
  }

  function clearEstablishedStream () {
    var pubElement = document.getElementById('red5pro-publisher');
    if (pubElement.srcObject) {
      pubElement.srcObject.getTracks().forEach(function (track) {
        track.stop();
      });
      return true;
    }
    return false;
  }

  function establishInitialStream (deviceId) {
    var stream;
    var constraints = {audio:false, video: (deviceId ? { deviceId: {exact: deviceId} } : true) };
    var pubElement = document.getElementById('red5pro-publisher');
    var delay = clearEstablishedStream() ? 200 : 0;
    var t = setTimeout(function () {
      clearTimeout(t);
      navigator.mediaDevices.getUserMedia(constraints)
        .then(function (mediastream) {
          stream = mediastream;
          return navigator.mediaDevices.enumerateDevices()
        })
        .then(function (devices) {
          listDevices(devices);
          stream.getVideoTracks().forEach(function (track) {
            cameraSelect.value = track.getSettings().deviceId;
          });
          pubElement.srcObject = stream;
        })
        .catch(function (error) {
          console.error(error);
          showConstraintError(error.message, error.constraint || 'N/A');
        });
    }, delay);
  }

  function onCameraSelect () {
    if (!configuration.useVideo) {
      return;
    }
    updateStatistics(0, 0, 0, 0);
    statisticsField.classList.add('hidden');
    unpublish()
      .then(restart)
      .catch(function (error) {
        console.error('[Red5ProPublisher] :: Error in unpublishing - ' + error);
        restart();
       });
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

  function getUserMediaConfiguration () {
    var config = {
      audio: configuration.useAudio ? configuration.mediaConstraints.audio : false,
      video: configuration.useVideo ? {
        width: { exact: parseInt(cameraWidthField.value) },
        height: { exact: parseInt(cameraHeightField.value) },
        frameRate: { min: parseInt(framerateField.value) }
      } : false
    };
    if (configuration.useVideo && cameraSelect.value && cameraSelect.value.length > 0) {
      var v = Object.assign(config.video, {deviceId: { exact: cameraSelect.value }});
      config.video = v;
    }
    return config;
  }

  function determinePublisher () {
    var config = Object.assign({},
                      configuration,
                      defaultConfiguration,
                      getAuthenticationParams(),
                      {
                        keyFramerate: parseInt(keyFramerateField.value),
                        bandwidth: {
                          audio: parseInt(bandwidthAudioField.value),
                          video: parseInt(bandwidthVideoField.value)
                        },
                        mediaConstraints: getUserMediaConfiguration()
                      });

    console.log('-----');
    console.log(JSON.stringify(config, null, 2));
    console.log('-----');
    var rtcConfig = Object.assign({}, config, {
                      protocol: getSocketLocationFromProtocol().protocol,
                      port: getSocketLocationFromProtocol().port,
                      streamName: config.stream1
                   });
    var pub = new red5prosdk.RTCPublisher();
    pub.on('*', onPublisherEvent);
    return pub.init(rtcConfig);
  }

  function unpublish () {
    return new Promise(function (resolve, reject) {
      if (!targetPublisher) {
        resolve();
        return;
      }
      var publisher = targetPublisher;
      publisher.unpublish()
        .then(function () {
          onUnpublishSuccess();
          publisher.off('*', onPublisherEvent);
          resolve();
        })
        .catch(function (error) {
          var jsonError = typeof error === 'string' ? error : JSON.stringify(error, 2, null);
          onUnpublishFail('Unmount Error ' + jsonError);
          reject(error);
        });
      targetPublisher = undefined;
    });
  }

  function startStopPublish () {
    if (isPublishable) {
      setPublishableState(false);
      // delay by 200 milliseconds to allow for clearage of previous stream.
      var delay = clearEstablishedStream() ? 200 : 0;
      var t = setTimeout(function (){
        clearTimeout(t);
        determinePublisher()
          .then(function (publisherImpl) {
            streamTitle.innerText = configuration.stream1;
            targetPublisher = publisherImpl;
            return targetPublisher.publish()
          })
          .then(function () {
            onPublishSuccess(targetPublisher);
          })
          .catch(function (error) {
            var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
            console.error('[Red5ProPublisher] :: Error in publishing - ' + jsonError);
            onPublishFail(jsonError);
          });
      }, delay);
    } else {
      shutdown(false);
    }
  }

  function restart() {
    establishInitialStream((cameraSelect.value && cameraSelect.value.length > 0) ? cameraSelect.value : undefined);
  }

  navigator.mediaDevices.enumerateDevices()
    .then(function (devices) {
      listDevices(devices);
      establishInitialStream();
    })
    .catch(onDeviceError);

  cameraSelect.addEventListener('change', function () {
    onCameraSelect(cameraSelect.value);
  });

  publishButton.addEventListener('click', startStopPublish);

  var shuttingDown = false;
  function shutdown (trackShutdown) {
    if (shuttingDown) return;
    shuttingDown = (typeof trackShutdown === 'boolean') ? trackShutdown : true;
    function clearRefs () {
      if (targetPublisher) {
        targetPublisher.off('*', onPublisherEvent);
      }
      targetPublisher = undefined;
    }
    unpublish().then(clearRefs).catch(clearRefs);
    window.untrackBitrate();
  }
  window.addEventListener('pagehide', shutdown);
  window.addEventListener('beforeunload', shutdown);

})(this, document, window.red5prosdk);
