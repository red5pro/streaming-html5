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
  function updateMediaStreamTrack (constraints, trackKind, publisher, element) {
    var connection = publisher.getPeerConnection();
    // 1. Grap new MediaStream from updated constraints.
    navigator.mediaDevices.getUserMedia(constraints)
      .then(function (stream) {
        // 2. Update the media tracks on senders through connection, if available (i.e., currently streaming).
        if (connection) {
          var senders = connection.getSenders();
          var tracks = stream.getTracks();
          var i = tracks.length;
          while ( --i > -1) {
            if (tracks[i].kind === trackKind) {
              senders[i].replaceTrack(tracks[i]);
            }
          }
        } else {
          // 3. Else, swap in new media constraints to publisher preview before stream start.
          publisher.init(Object.assign(publisher.getOptions(), {
            mediaConstraints: constraints
          }));
        }
        // 4. Update the video display with new stream.
        element.srcObject = stream;
      })
      .catch (function (error) {
        console.error('Could not replace track : ' + error.message);
      });
  }

  function onCameraSelect (camera, constraints, publisher, element) {
    var newConstraints = Object.assign({}, constraints);
    if (newConstraints.video && typeof newConstraints.video !== 'boolean') {
      newConstraints.video.deviceId = { exact: camera }
    }
    else {
      newConstraints.video = {
        deviceId: { exact: camera }
      };
    }
    updateMediaStreamTrack(newConstraints, 'video', publisher, element);
  }

  function onMicrophoneSelect (microphone, constraints, publisher, element) {
    var newConstraints = Object.assign({}, constraints);
    if (newConstraints.audio && typeof newConstraints.audio !== 'boolean') {
      newConstraints.audio.deviceId = { exact: microphone }
    }
    else {
      newConstraints.audio = {
        deviceId: { exact: microphone }
      };
    }
    updateMediaStreamTrack(newConstraints, 'audio', publisher, element);
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
  }

  function updateAudioDeviceList (audioTrack, constraints, publisher, element, devicePromise) {
    devicePromise.then(function (devices) {
        var mics = devices.filter(function (item) {
          return item.kind === 'audioinput';
        })
        var options = mics.map(function (mic, index) {
          return '<option value="' + mic.deviceId + '">' + (mic.label || 'camera ' + index) + '</option>';
        });
        microphoneSelect.innerHTML = options.join(' ');
        microphoneSelect.addEventListener('change', function () {
          onMicrophoneSelect(microphoneSelect.value, constraints, publisher, element);
        });
        setSelectedMicrophoneIndexFromTrack(audioTrack, mics);
      })
      .catch(function (error) {
        console.error('Could not access microphone devices: ' + error);
      });
  }

  function updateCameraDeviceList (videoTrack, constraints, publisher, element, devicePromise) {
    devicePromise.then(function (devices) {
        var cameras = devices.filter(function (item) {
          return item.kind === 'videoinput';
        })
        var options = cameras.map(function (camera, index) {
          return '<option value="' + camera.deviceId + '">' + (camera.label || 'camera ' + index) + '</option>';
        });
        cameraSelect.innerHTML = options.join(' ');
        cameraSelect.addEventListener('change', function () {
          onCameraSelect(cameraSelect.value, constraints, publisher, element);
        });
        setSelectedCameraIndexFromTrack(videoTrack, cameras);
      })
      .catch(function (error) {
        console.error('Could not access camera devices: ' + error);
      });
  }

  function beginMediaMonitor (publisher, constraints, element) {
    var mediaStream = publisher.getMediaStream();
    if (mediaStream && (cameraSelect && microphoneSelect)) {
      var tracks = mediaStream.getTracks();
      var audioTracks = tracks.filter(function (track) { return track.kind === 'audio' });
      var videoTracks = tracks.filter(function (track) { return track.kind === 'video' });
      var devicePromise = navigator.mediaDevices.enumerateDevices();
      updateCameraDeviceList(videoTracks[0], constraints, publisher, element, devicePromise);
      updateAudioDeviceList(audioTracks[0], constraints, publisher, element, devicePromise);
    }
  }

  var hasBegunMonitor = false;
  window.allowMediaStreamSwap = function (publisher, constraints, viewElement) {
    if (hasBegunMonitor) return;
    hasBegunMonitor = true;
    targetPublisher = publisher;
    mediaConstraints = constraints;
    beginMediaMonitor(targetPublisher, mediaConstraints, viewElement);
  }

})(window, navigator, window.red5prosdk);
