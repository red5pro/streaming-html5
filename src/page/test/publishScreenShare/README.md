# Publish Screen Share using Red5 Pro

This is an example of utilizing the `getDisplayMedia` API for screen sharing capabilities available in **Chrome**, **Edge** and **Firefox**.

> Browser Compatibility table for `getDisplayMedia`: [https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia)

> You will need to use the [Subscribe Screen Share](../subscribeScreenShare) test in order to check this test is working.

**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# How to Publish a Screen Share

Utilize the `getDisplayMedia` API along with the `initWithMedia` method of the Red5 Pro HTML SDK:

```js
async function capture() {
  captureButton.disabled = true
  var vw = parseInt(cameraWidthField.value)
  var vh = parseInt(cameraHeightField.value)
  var fr = parseInt(framerateField.value)
  var config = {
    audio: false,
    video: {
      width: vw, //{ maxWidth: vw },
      height: vh, //{ maxHeight: vh },
      frameRate: fr, //{ maxFrameRate: fr }
    },
  }
  console.log(
    'Using Capture Configuration:\r\n' + JSON.stringify(config, null, 2)
  )
  // Edge has getDisplayMedia on navigator and not media devices?
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia(config)
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    })
    stream.addTrack(audio.getAudioTracks()[0].clone())
    return stream
  } catch (error) {
    captureButton.disabled = false
    console.error(error)
    updateStatusFromEvent({
      type: 'ERROR',
      data: error.message,
    })
  }
}
```

The `capture` method in the example is invoked from a User click event on a button that assigns the callback to `setupPublisher`:

```js
captureButton.addEventListener('click', function () {
  capture(setupPublisher)
})
```

The `setupPublisher` method accepts the returned `MediaStream` from the `getDisplayMedia` and uses it to initialize the WebRTC-based publisher using the `initWithMedia` method:

```js
function setupPublisher(mediaStream) {
  const { preferWhipWhep } = configuration
  const { WHIPClient, RTCPublisher } = red5prosdk

  var rtcConfig = Object.assign({}, configuration, getAuthenticationParams(), {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port,
    streamName: configuration.stream1,
    bandwidth: {
      video: parseInt(bandwidthVideoField.value),
    },
    keyFramerate: parseInt(keyFramerateField.value),
    streamMode: configuration.recordBroadcast ? 'record' : 'live',
  })
  const publisher = preferWhipWhep ? new WHIPClient() : new RTCPublisher()
  publisher
    .initWithStream(rtcConfig, mediaStream)
    .then(function (publisherImpl) {
      streamTitle.innerText = configuration.stream1
      targetPublisher = publisherImpl
      targetPublisher.on('*', onPublisherEvent)
      return targetPublisher.publish()
    })
    .then(function () {
      onPublishSuccess(targetPublisher)
    })
    .catch(function (error) {
      var jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      console.error('[Red5ProPublisher] :: Error in publishing - ' + jsonError)
      onPublishFail(jsonError)
    })
}
```

# Settings

Included in the test is a form to provide any custom settings you would prefer. We attempt to override these settings for the media where applicable, but it is the plugin and/or browser that will most likely determine which to use.

# View Your Stream

Launch the [Subscriber Screen Share Test](../subscribeScreenShare) in another tab!
