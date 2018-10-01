# Publish with Swap MediaStream Source

This is an example of using the `RTCRtpSender.replaceTrack` to swap video source while maintaining the already established `RTCPeerConnection` within the Red5 Pro HTML SDK for a WebRTC-based Publisher.

**To use this example, you will need to have at least 2 camera sources. Most mobile browsers on devices will recognize the back-facing and front-facing cameras.**

> More information [https://developer.mozilla.org/en-US/docs/Web/API/RTCRtpSender/replaceTrack](https://developer.mozilla.org/en-US/docs/Web/API/RTCRtpSender/replaceTrack).

## Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

# RTCRtpSender.replaceTrack

The `RTCRtpSender.replaceTrack` API allows you to swap in a new `MediaStream` source for tracks on a current `RTCRtpSender` instance. This allows you to maintain an already established `RTCPeerConnection` with subscribers that receive new media content without having to go through the renogitation process.

# Running the Example

When the page loads, the default camera is selected for the Publisher and a broadcast is begun.

Within the UI on the page for the example - below the video playback - you will find a `select` element and a `button`.

From the `select` element, you can choose a different camera source. When your desired camera source to switch to is selected, click the `button` to swap in the new video source.

All your subscribers (WebRTC, Flash, HLS, and Mobile SDK) should be updated with the video stream source.

## Usage

The live swapping of a video stream source on the current connection is achieved used the `RTCRtpSender.replaceTrack` API after requesting a new `MediaStream` instance with the target `deviceId` using the `MediaDevices.getUserMedia` API.

Upon change of camera source and request to change, the `swapCamera` method is invoked from the example:

```js
function swapCamera () {
  var connection = targetPublisher.getPeerConnection();
  var selection = cameraSelect.value;
  if (selection === SELECT_DEFAULT) {
    return;
  }
  if (mediaConstraints.video && typeof mediaConstraints.video !== 'boolean') {
    mediaConstraints.video.deviceId = { exact: selection }
  } else {
    mediaConstraints.video = {
      deviceId: { exact: selection }
    };
  }
  // 1. Grap new MediaStream from updated constraints.
  navigator.mediaDevices.getUserMedia(mediaConstraints)
    .then(function (stream) {
      // 2. Update the media tracks on senders through connection.
      var senders = connection.getSenders();
      var tracks = stream.getTracks();
      var i = tracks.length;
      while ( --i > -1) {
        if (tracks[i].kind === 'video') {
          senders[i].replaceTrack(tracks[i]);
        }
      }
      // 3. Update the video display with new stream.
      document.getElementById('red5pro-publisher').srcObject = stream;
    })
    .catch (function (error) {
      console.error('Could not replace track : ' + error.message);
    });
}
```

[index.js #123](index.js#L123)

After accessing a new `MediaStream` instance using `getUserMedia`, the previously and currently established `RTCPeerConnection` of the Publisher is used to access the `RTCRtpSender` listing and their tracks.

Once the `video` track is detected, the `RTCRtpSender.replaceTrack` API is used to swap in the video track of the newly accessed `MediStream` video track.

Additionally, the `video` element that displays the broadcast back to the publisher is updated with the `MediaStream` instance.

# View Your Stream

After you have started a broadcast session, open a browser window and navigate to your Red5 Pro server (e.g., [http://localhost:5080/live/subscribe.jsp](http://localhost:5080/live/subscribe.jsp) to see a list of streams. Select the stream name used from this example and view in the browser using WebRTC, Flash or HLS playback options.

> Optionally, you can connect using the Mobile SDK testbed examples from [https://github.com/red5pro/streaming-ios](https://github.com/red5pro/streaming-ios) and [https://github.com/red5pro/streaming-android](https://github.com/red5pro/streaming-android).

Once a subscriber is connect, go back to the Publisher page and swap the camera source to see the playback source update live.
