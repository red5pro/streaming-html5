# Publish Screen Share over Stream Manager Proxy using Red5 Pro
This is an example of utilizing the screen sharing capabilities of **Chrome** and **Firefox**.

The example utilizes the `getScreenId` library from [https://www.webrtc-experiment.com/getScreenId/](https://www.webrtc-experiment.com/getScreenId/).

* In order to use this example in Chrome, you will first need to install the [Screen Capturing Extension](https://chrome.google.com/webstore/detail/screen-capturing/ajhifddimkapgcifgcodmmfdlknahffk) and restart your browser.
* In order to use this example in Firefox, it must be served over HTTPS; `localhost` testing will not work properly.

Additionally, it is currently not possible (as of the time of this writing, *November 30th, 2017*) to stream a screen capture along with audio. As such, this example actually creates two publisher connections on the Red5 Pro Server: one to stream the screen share, and another for audio.

> You will need to use the [Subscribe Screen Share](../subscribeScreenShare) test in order to check this test is working.

**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# How to Publish a Screen Share

Utilize the `onGetUserMedia` configuration attribute to provide the constraints returned from the [getScreenId](https://www.webrtc-experiment.com/getScreenId/) library, and include any custom defined fallback values:

```js
function capture (cb) {
  getScreenId(function (error, sourceId, screen_constraints) {
    cb(screen_constraints)
  });
}

function setupPublisher (constraints) {
  var vw = parseInt(cameraWidthField.value);
  var vh = parseInt(cameraHeightField.value);
  var fr = parseInt(framerateField.value);

  var config = {
    protocol: 'https',
    port: 443,
    streamName: 'mystream',
    onGetUserMedia: function () {
      var c = Object.assign({}, constraints);
      if (c.video.optional) {
        // chrome
        c.video.optional.push({
          maxWidth: vw
        }, {
          maxHeight: vh
        }, {
          maxFrameRate: fr
        });
      }
      else if (c.video.mediaSource === 'window') {
        // moz
        c.video.width = {
          exact: vw
        };
        c.video.height = {
          exact: vh
        };
        c.video.frameRate = {
          exact: fr
        }
      }
      return navigator.mediaDevices.getUserMedia(c);
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

# Settings

Included in the test is a form to provide any custom settings you would prefer. We attempt to override these settings for the media where applicable, but it is the plugin and/or browser that will most likely determine which to use.

# View Your Stream

Launch the [Subscriber Screen Share Test](../subscribeScreenShare) in another tab!
