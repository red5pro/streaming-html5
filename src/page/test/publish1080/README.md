# Publishing at 1080p
This example demonstrates a request for a `MediaStream` with video contraints to publish at 1080p.

**Please refer to the [Basic Publisher Documentation](../publish/README.md) to leanr more about the basic setup.**

### Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

> These examples use the WebRTC-based Publisher implementation from the Red5 Pro HTML SDK. However, there is failover support to allow for Flash-base publisher on unsupported browsers.

## MediaStream
Constraints for the audio and video components are defined when accessing a `MediaStream` from the browser.

To define a stream with 1080p constraints for publishing, request the `MediaStream` on `getUserMedia` and provide the stream to a Publisher instance:

```js
var userMedia = {
  video: {
    width: 1920,
    height: 1080
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
[index.js #71](index.js#L71)
</sup>

> More information: [Media.getUserMedia from MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

### Additional Information
To read more about Stream Quality and recommended settings, please visit [The Balancing Act of Stream Quality](https://blog.red5pro.com/stream-settings-for-live-broadcasts-balancing-latency-and-video-quality/) on the [Red5 Pro Blog](https://blog.red5pro.com).
