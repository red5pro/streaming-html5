# Publish Toggle Camera

This is an example of turning the Camera off and then back on during a live stream without having to restart the connection. This allows for the audio stream to continue to be provided to subscribers while the Camera stream can be variable.

Additionally, the example uses the `Send API` to notify any subscribers of the Camera being turned on or off by the publisher.

**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup.**

## Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

# Running the example

Once the publisher has started a broadcast, you can use the button provided to toggle the Camera capture and stream on or off.

Once the Camera is turn off, no video data is sent to the server and consequently to all subscribers - only audio data will be sent; additionally, the Camera resource is freed by the browser.

Once the Camera is turned back on, video data will again start being sent to the server and delivered to all subscribers.

## Camera Off

When the Camera is set to an off state, the current `MediaStream` instance is accessed and its `MediaStreamTrack` that is associated with the video stream is disabled (will stop sending data) and stopped (will release the Camera from the browser).

```js
let cameraIsOff = false

function turnCameraOff () {
  const options = targetPublisher.getOptions()
  const {
    mediaElementId
  } = options
  const stream = document.querySelector(`#${mediaElementId}`).srcObject
  const track = stream.getVideoTracks()[0]
  track.enabled = false
  track.stop()
  cameraIsOff = true
  targetPublisher.send("cameraToggle", {
    isToggledOff: cameraIsOff
  })
}
```

## Camera On/Resume

When the Camera is set to an on state, the transceivers of the current `RTCPeerConnection` are updated with the newly accessed media in order for the stream to start flowing again with video and audio data.

First a new `MediaStream` needs to be accessed from the `navigator` as we release the previous Camera media when turning off the Camera. Once it is accessed, then the transceivers can be updated using `replaceTrack` and the video and audio data will start flowing on the already established stream on the connection:

```js
function turnCameraOn () {
  const senders = targetPublisher.getPeerConnection().getSenders()
  const options = targetPublisher.getOptions()
  const {
    mediaConstraints,
    mediaElementId
  } = options
  navigator.mediaDevices.getUserMedia(mediaConstraints)
    .then(stream => {
      var i = senders.length
      while ( --i > -1) {
        senders[i].track.stop()
        if (senders[i].track.kind === 'video') {
          senders[i].replaceTrack(stream.getVideoTracks()[0])
        } else {
          senders[i].replaceTrack(stream.getAudioTracks()[0])
        }
      }
      document.querySelector(`#${mediaElementId}`).srcObject = stream
      cameraIsOff = false
      targetPublisher.send("cameraToggle", {
        isToggledOff: cameraIsOff
      })
    })
}
```

## Subscriber Notification

In addition to toggling the Camera on and off, the example also uses the `Send API` to notify all current subscribers of the current Camera state:

```js
targetPublisher.send("cameraToggle", {
  isToggledOff: cameraIsOff
})
```

You can use this notification to update the UI on the subscriber side, which the [Subscriber - Camera Toggle](../subscribeCameraToggle) test demonstrates.
