# Publishing with User-Selected Camera Source
This example demonstrates a request for a `MediaStream` with a defined `video` source for the constraint.

**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup.**

### Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

> These examples use the WebRTC-based Publisher implementation from the Red5 Pro HTML SDK. However, there is failover support to allow for Flash-base publisher on unsupported browsers.

## Camera Selection
Allow the User to select from a list of cameras detected by their browser. To access the list of camera devices, use the `enumerateDevices` API:

```js
var SELECT_DEFAULT = 'Select a camera...';
var cameraSelect = document.getElementById('camera-select');

function waitForSelect () {
  navigator.mediaDevices.enumerateDevices()
    .then(function (devices) {
      var videoCameras = devices.filter(function (item) {
        return item.kind === 'videoinput';
      })
      var cameras = [{
        label: SELECT_DEFAULT
      }].concat(videoCameras);
      var options = cameras.map(function (camera) {
        return '<option value="' + camera.deviceId + '">' + camera.label + '</option>';
      });
      cameraSelect.innerHTML = options.join(' ');
      cameraSelect.addEventListener('change', function () {
        onCameraSelect(cameraSelect.value);
      });
  });
}
```

<sup>
[index.js #73](index.js#L73)
</sup>

The camera devices are filtered out from the list returned on `enumerateDevices` based on the `kind` attribute being of `videoinput` value. The list is then provided a a `select` element with an event handler assigned.

Upon a `change` event, the camera `deviceId` is used to assign the `video` constraint for the `MediaStream`.

## Selection & Assignment
Constraints for the audio and video components are defined when accessing a `MediaStream` from the browser.

To define a stream with a specific camera device for publishing, update the `video` constraint used in requesting a `MediaStream` and declare a `sourceId` with the selected camera `deviceId`.

The following `change` event handler is invoked upon User selection of a camera from the `select` element populated in the previous section:

```js
var userMedia = {
  audio: true,
  video: true
};

function onCameraSelect (selection) {
  if (selection && selection !== SELECT_DEFAULT) {
    // assign selected camere to defined UserMedia.
    userMedia.video = {
      optional: [{
        sourceId: selection
      }]
    };
}
```

## MediaStream & Publishing
With the `userMedia` updated, a new `MediaStream` can be requested with the selected camera device and broadcast started:

```js
function getUserMediaConfiguration () {
  return Object.assign({}, configuration.userMedia, userMedia);
}

 nav.getUserMedia(getUserMediaConfiguration(), function (media) {

     // Upon access of user media,
    // 1. Attach the stream to the publisher.
    // 2. Show the stream as preview in view instance.
    // 3. Associate publisher & view (optional).
    publisher.attachStream(media);
    view.preview(media, true);
    view.attachPublisher(publisher);

    targetPublisher = publisher;
    targetView = view;
    resolve();

  }, function(error) {
    onPublishFail('Error - ' + error);
    reject(error);
  });
```

<sup>
[index.js #104](index.js#L104)
</sup>

> More information: [Media.getUserMedia from MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
