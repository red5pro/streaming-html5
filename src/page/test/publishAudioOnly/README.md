# Publishing with Audio Only
This example demonstrates a request for a `MediaStream` with audio contraints only.

**Please refer to the [Basic Publisher Documentation](../publish/README.md) to leanr more about the basic setup.**

### Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

> These examples use the WebRTC-based Publisher implementation from the Red5 Pro HTML SDK. However, there is failover support to allow for Flash-base publisher on unsupported browsers.

## MediaStream
Constraints for the audio and video components are defined when accessing a `MediaStream` from the browser.

To define a stream with only audio for publishing, request the `MediaStream` on `getUserMedia` with the `audio` constraint on and `video` off, then provide the stream to a Publisher instance:

```js
var userMedia = {
  video: {
    width: true,
    height: false
  }
};

function getUserMediaConfiguration () {
  return Object.assign({}, {
    audio: configuration.audio,
    video: configuration.video
   }, userMedia);
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
[index.js #70](index.js#L70)
</sup>

> More information: [Media.getUserMedia from MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
