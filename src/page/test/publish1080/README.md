# Publishing at 1080p

This example demonstrates a request for a `MediaStream` with video contraints to publish at 1080p.

**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# MediaStream

Constraints for the audio and video components are defined when accessing a `MediaStream` from the browser.

To define a stream with 1080p constraints for publishing, initialize the Publisher with a `mediaConstraint` with those video constraints:

```js
const userMedia = {
  video: {
    width: {
      ideal: 1920,
    },
    height: {
      ideal: 1080,
    },
    frameRate: {
      ideal: 60,
    },
  },
}

const rtcConfig = {
  ...config,
  ...{
    mediaConstraints: userMedia,
    bandwidth: {
      video: 2500,
    },
  },
}

const publisher = new window.red5prosdk.RTCPublisher()
publisher
  .init(rtcConfig)
  .then(() => {
    return publisher.publish()
  })
  .catch((error) => {
    console.error(error)
  })
```

> More information: [Media.getUserMedia from MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

## Additional Information

To read more about Stream Quality and recommended settings, please visit [The Balancing Act of Stream Quality](https://red5pro.zendesk.com/hc/en-us/articles/235679488-Suggested-Resolution-and-Bitrate-Settings).
