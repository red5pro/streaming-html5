# Publishing with Camera Swap
This example demonstrates a request for a `MediaStream` with a defined `video` source for the constraint based on the Rear and Front facing cameras of a mobile device and a browser that supports `facingMode` media contraints.

**Please refer to the [Basic Publisher Documentation](../publish/README.md) to leanr more about the basic setup.**

### Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

> These examples use the WebRTC-based Publisher implementation from the Red5 Pro HTML SDK. However, there is failover support to allow for Flash-base publisher on unsupported browsers.

## Facing Mode Constraint & Support
You switch between camera device support on a mobile browser using the `facingMode` values of:

* **user**: front-facing
* **environment**: rear-facing

To determine if the mobile browser supports setting the constraint values when accessing the `MediaStream`, you can detect the `facingMode` property available on `getSupportedConstraints`:

```js
var FACING_MODE_FRONT = 'user';
var FACING_MODE_REAR = 'environment';
var isSupported = navigator.mediaDevices.getSupportedConstraints()["facingMode"];
var userMedia = (function (isSupported) {
  return isSupported
    ? {
      audio: true,
      video: {
        facingMode: FACING_MODE_FRONT
      }
    }
    : {
      audio: true,
      video: true
    }
})(isSupported);
```

<sup>
[index.js #28](index.js#L28)
</sup>

> To read more about `facingMode` visit the [MDN Documentation on facingMode](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSupportedConstraints/facingMode)

## Running the Example
To switch the camera switch from `user` to `environment` and bck again, click on the video display. Doing so will toggle the `video` constraint defined when requesting a new `MediaStream` to publish, and kick of a "reset" of the broadcast session:

```js
var videoContainer = document.getElementById('video-container');
videoContainer.addEventListener('click', function () {
  userMedia.video.facingMode = userMedia.video.facingMode === FACING_MODE_FRONT
    ? FACING_MODE_REAR : FACING_MODE_FRONT;
  resetSession();
});

function resetSession () {
  unpublish()
    .then(preview)
    .then(publish)
    .catch(function (error) {
      console.error('[Red5ProPublisher] :: Error in publishing - ' + error);
    });
}
```

<sup>
[index.js #167](index.js#L167)
</sup>

> More information: [Media.getUserMedia from MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
