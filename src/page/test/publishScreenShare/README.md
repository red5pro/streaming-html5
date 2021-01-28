# Publish Screen Share using Red5 Pro
This is an example of utilizing the `getDisplayMedia` API for screen sharing capabilities available in **Chrome**, **Edge** and **Firefox**.

> Browser Compatibility table for `getDisplayMedia`: [https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia)

Additionally, it is currently not possible (as of the time of this writing, *November 30th, 2017*) to stream a screen capture along with audio. As such, this example actually creates two publisher connections on the Red5 Pro Server: one to stream the screen share, and another for audio.

> You will need to use the [Subscribe Screen Share](../subscribeScreenShare) test in order to check this test is working.

**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# How to Publish a Screen Share

Utilize the `getDisplayMedia` API along with the `initWithMedia` method of the Red5 Pro HTML SDK:

```js
function capture (cb) {
  var vw = parseInt(cameraWidthField.value);
  var vh = parseInt(cameraHeightField.value);
  var fr = parseInt(framerateField.value);
    // Edge has getDisplayMedia on navigator and not media devices?
    var p = undefined
    if (navigator.getDisplayMedia) {
      p = navigator.getDisplayMedia(config)
    } else {
      p = navigator.mediaDevices.getDisplayMedia(config)
    }
    p.then(cb).catch(function (error) {
      captureButton.disabled = false;
      console.error(error);
      updateStatusFromEvent({
        type: 'ERROR',
        data: error.message
      });
    });
}
```

The `capture` method in the example is invoked from a User click event on a button that assigns the callback to `setupPublisher`:

```js
captureButton.addEventListener('click', function() {
  capture(setupPublisher);
});
```

The `setupPublisher` method accepts the returned `MediaStream` from the `getDisplayMedia` and uses it to initialize the WebRTC-based publisher using the `initWithMedia` method:

```js
function setupPublisher (mediaStream) {
...
    new red5prosdk.RTCPublisher()
      .initWithStream(rtcConfig, mediaStream)
      .then(function (publisherImpl) {
        streamTitle.innerText = configuration.stream1;
        targetPublisher = publisherImpl;
        targetPublisher.on('*', onPublisherEvent);
        return targetPublisher.publish();
      })
      .then(function () {
        onPublishSuccess(targetPublisher);
        setupAudio();
      })
...
}
```

# Settings

Included in the test is a form to provide any custom settings you would prefer. We attempt to override these settings for the media where applicable, but it is the plugin and/or browser that will most likely determine which to use.

# View Your Stream

Launch the [Subscriber Screen Share Test](../subscribeScreenShare) in another tab!
