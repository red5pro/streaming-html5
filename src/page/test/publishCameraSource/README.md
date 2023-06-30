# Publishing with User-Selected Camera Source

This example demonstrates a request for a `MediaStream` with a defined `video` source for the constraint.

**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# Camera Selection

Allow the User to select from a list of cameras detected by their browser. To access the list of camera devices, use the `enumerateDevices` API:

```js
function listDevices(devices) {
  var cameras = devices.filter(function (item) {
    return item.kind === 'videoinput'
  })
  var options = cameras.map(function (camera, index) {
    return (
      '<option value="' +
      camera.deviceId +
      '">' +
      (camera.label || 'camera ' + index) +
      '</option>'
    )
  })
  cameraSelect.innerHTML = options.join(' ')
}

navigator.mediaDevices.enumerateDevices().then(listDevices).catch(onDeviceError)
```

The camera devices are filtered out from the list returned on `enumerateDevices` based on the `kind` attribute being of `videoinput` value. The list is then provided a a `select` element with an event handler assigned.

Upon a `change` event, the camera `deviceId` is used to assign the `video` constraint for the `MediaStream`.

# Selection & Assignment

Constraints for the audio and video components are defined when accessing a `MediaStream` from the browser.

To define a stream with a specific camera device for publishing, update the `video` constraint used in requesting a `MediaStream` and declare a `sourceId` with the selected camera `deviceId`.

The following `change` event handler is invoked upon User selection of a camera from the `select` element populated in the previous section:

```js
var mediaConstraints = {
  audio: configuration.useAudio ? configuration.mediaConstraints.audio : false,
  video: configuration.useVideo ? configuration.mediaConstraints.video : false,
}

function onCameraSelect() {
  if (!configuration.useVideo) {
    return
  }
  var selection = cameraSelect.value
  if (mediaConstraints.video && typeof mediaConstraints.video !== 'boolean') {
    mediaConstraints.video.deviceId = { exact: selection }
    delete mediaConstraints.video.frameRate
  } else {
    mediaConstraints.video = {
      deviceId: { exact: selection },
    }
  }
  updateStatistics(0, 0, 0, 0)
  statisticsField.classList.add('hidden')
  unpublish()
    .then(restart)
    .catch(function (error) {
      console.error('[Red5ProPublisher] :: Error in unpublishing - ' + error)
      restart()
    })
  publishButton.disabled = false
}
```

# Publishing

With the `mediaConstraints` object updated with the target camera, the initialization configuration is set to start a new publishing session using the `onGetUserMedia` override to ensure proper listing of devices and labels:

```js
var config = Object.assign(
  {},
  configuration,
  defaultConfiguration,
  getAuthenticationParams(),
  {
    onGetUserMedia: function () {
      return new Promise(function (resolve, reject) {
        if (targetPublisher && targetPublisher.getMediaStream()) {
          targetPublisher
            .getMediaStream()
            .getTracks()
            .forEach(function (track) {
              track.stop()
            })
        }
        var stream
        var constraints = mediaConstraints
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(function (mediastream) {
            stream = mediastream
            return navigator.mediaDevices.enumerateDevices()
          })
          .then(function (devices) {
            listDevices(devices)
            stream.getVideoTracks().forEach(function (track) {
              cameraSelect.value = track.getSettings().deviceId
            })
            resolve(stream)
          })
          .catch(function (error) {
            reject(error)
          })
      })
    },
  }
)

var rtcConfig = {
  ...config,
  ...{
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port,
    streamName: config.stream1,
  },
}
return new red5prosdk.WHIPClient().init(rtcConfig)
```

> More information: [Media.getUserMedia from MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
