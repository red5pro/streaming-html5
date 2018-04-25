# Publish Screen Share using Red5 Pro
This is an example of utilizing the screen sharing capabilities of **Chrome** and **Firefox**.

The example utilizes the `getScreenId` library from [https://www.webrtc-experiment.com/getScreenId/](https://www.webrtc-experiment.com/getScreenId/).

* In order to use this example in Chrome, you will first need to install the [Screen Capturing Extension](https://chrome.google.com/webstore/detail/screen-capturing/ajhifddimkapgcifgcodmmfdlknahffk) and restart your browser.
* In order to use this example in Firefox, it must be served over HTTPS; `localhost` testing will not work properly.

Additionally, it is currently not possible (as of the time of this writing, *November 30th, 2017*) to stream a screen capture along with audio. As such, this example actually creates two publisher connections on the Red5 Pro Server: one to stream the screen share, and another for audio.

> You will need to use the [Subscribe Screen Share](../subscribeScreenShare) test in order to check this test is working.

### Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

## How to Publish a Screen Share

Utilize the `onGetUserMedia` configuration attribute to provide the constraints returned from the [getScreenId](https://www.webrtc-experiment.com/getScreenId/) library:

```js
function capture (cb) {
  getScreenId(function (error, sourceId, screen_constraints) {
    cb(screen_constraints)
  });
}

function setupPublisher (constraints) {
  var config = {
    protocol: 'https',
    port: '8083',
    streamName: 'mystream',
    onGetUserMedia: function () {
      return navigator.mediaDevices.getUserMedia(constraints)
    }
  };

  new RTCPublisher()
    .init(config)
    .then(function (publisherImpl) {
      return publisherImpl.publish();
    })
    .catch(function (error) {
      // handle any errors.
    });
}

capture(setupPublisher);
```

### View Your Stream

Launch the [Subscriber Screen Share Test](../subscribeScreenShare) in another tab!
