# Publishing at 1080p
This example demonstrates a request for a `MediaStream` with video contraints to publish at 1080p.

**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup.**

### Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

> These examples use the WebRTC-based Publisher implementation from the Red5 Pro HTML SDK. However, there is failover support to allow for Flash-base publisher on unsupported browsers.

## MediaStream
Constraints for the audio and video components are defined when accessing a `MediaStream` from the browser.

To define a stream with 1080p constraints for publishing, initialize the Publisher with a `mediaConstraint` with those video constraints:

```js
var userMedia = {
  video: {
    width: {
      ideal: 1920
    },
    height: {
      ideal: 1080
    },
    frameRate: {
      ideal: 60
    }
  }
};

var rtcConfig = Object.assign({}, config, {
  mediaConstraints: userMedia
});

var publisher = new window.red5prosdk.RTCPublisher();
publisher.init(rtcConfig)
  .then(function (publisher) {
    return publisher.publish();
  })
  .catch(function (error) {
  });

```

<sup>
[index.js #49](index.js#L49)
</sup>

> More information: [Media.getUserMedia from MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

### Additional Information
To read more about Stream Quality and recommended settings, please visit [The Balancing Act of Stream Quality](https://blog.red5pro.com/stream-settings-for-live-broadcasts-balancing-latency-and-video-quality/) on the [Red5 Pro Blog](https://blog.red5pro.com).
