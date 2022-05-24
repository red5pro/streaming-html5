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
(function (window, navigator, red5prosdk) { // eslint-disable-line no-unused-vars
  'use strict';

  var targetPublisher;
  var mediaConstraints;
  var cameraSelect = document.getElementById('camera-select');
  var microphoneSelect = document.getElementById('microphone-select');

  /*
  function getPeerConnection () {
    return targetPublisher.getPeerConnection();
  }
  */
  function updateMediaStreamTrack (constraints, trackKind, callback, element) {
    navigator.mediaDevices.getUserMedia(constraints)
      .then(function (stream) {
        callback(stream, constraints)
        element.srcObject = stream
      })
      .catch (function (error) {
        console.error('Could not replace track : ' + error.message);
      });
  }

  function onCameraSelect (camera, constraints, callback, element) {
    var newConstraints = Object.assign({}, constraints);
    if (newConstraints.video && typeof newConstraints.video !== 'boolean') {
      newConstraints.video.deviceId = camera
    }
    else {
      newConstraints.video = {
        deviceId: camera
      };
    }
    updateMediaStreamTrack(newConstraints, 'video', callback, element);
  }

  function onMicrophoneSelect (microphone, constraints, callback, element) {
    var newConstraints = Object.assign({}, constraints);
    if (newConstraints.audio && typeof newConstraints.audio !== 'boolean') {
      newConstraints.audio.deviceId = { exact: microphone }
    }
    else {
      newConstraints.audio = {
        deviceId: { exact: microphone }
      };
    }
    updateMediaStreamTrack(newConstraints, 'audio', callback, element);
  }

  function setSelectedCameraIndexFromTrack (track, deviceList) {
    var i = deviceList.length;
    while (--i > -1) {
      var option = deviceList[i];
      if (option.label === track.label) {
        break;
      }
    }
    if (i > -1) {
      cameraSelect.selectedIndex = i;
    }
    return i
  }

  function setSelectedMicrophoneIndexFromTrack (track, deviceList) {
    var i = deviceList.length;
    while (--i > -1) {
      var option = deviceList[i];
      if (option.label === track.label) {
        break;
      }
    }
    if (i > -1) {
      microphoneSelect.selectedIndex = i;
    }
    return i
  }

  function updateAudioDeviceList (mics, audioTrack, constraints, callback, element) {
    var options = mics.map(function (mic, index) {
      return '<option value="' + mic.deviceId + '">' + (mic.label || 'camera ' + index) + '</option>';
    });
    microphoneSelect.innerHTML = options.join(' ');
    microphoneSelect.addEventListener('change', function () {
      onMicrophoneSelect(microphoneSelect.value, constraints, callback, element);
    });
    return setSelectedMicrophoneIndexFromTrack(audioTrack, mics);
  }

  function updateCameraDeviceList (cameras, videoTrack, constraints, callback, element) {
    var options = cameras.map(function (camera, index) {
      return '<option value="' + camera.deviceId + '">' + (camera.label || 'camera ' + index) + '</option>';
    });
    cameraSelect.innerHTML = options.join(' ');
    cameraSelect.addEventListener('change', function () {
      onCameraSelect(cameraSelect.value, constraints, callback, element);
    });
    return setSelectedCameraIndexFromTrack(videoTrack, cameras);
  }

  const beginMediaMonitor = async (mediaStream, callback, constraints, element) => {
    var tracks = mediaStream.getTracks();
    var audioTracks = tracks.filter(function (track) { return track.kind === 'audio' });
    var videoTracks = tracks.filter(function (track) { return track.kind === 'video' });
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const cameraDevices = devices.filter(d => d.kind === 'videoinput')
      const audioDevices = devices.filter(d => d.kind === 'audioinput')
      const cameraId = updateCameraDeviceList(cameraDevices, videoTracks[0], constraints, callback, element);
      const audioId = updateAudioDeviceList(audioDevices, audioTracks[0], constraints, callback, element);
      if (cameraId > -1) {
        if (!constraints.video.deviceId) {
          constraints.video.deviceId = {}
        }
        constraints.video.deviceId.exact = cameraDevices[cameraId].deviceId
      }
      if (audioId > -1) {
        if (typeof constraints.audio === 'boolean') {
          constraints.audio = {}
        }
        if (!constraints.audio.deviceId) {
          constraints.audio.deviceId = {}
        }
        constraints.audio.deviceId.exact = audioDevices[audioId].deviceId
      }
      callback(mediaStream, constraints)
    } catch (e) {
      console.error('Could not access media devices: ' + e.message)
    }
  }

  var hasBegunMonitor = false;
  window.allowMediaStreamSwap = function (viewElement, constraints, mediaStream, callback) {
    if (hasBegunMonitor) return;
    hasBegunMonitor = true;
    callback = callback;
    mediaConstraints = constraints;
    beginMediaMonitor(mediaStream, callback, mediaConstraints, viewElement);
  }
})(window, navigator, window.red5prosdk);
