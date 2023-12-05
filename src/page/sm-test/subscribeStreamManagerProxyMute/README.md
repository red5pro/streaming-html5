# Subscribe Mute API using Red5 Pro

This is an example of using the Mute API to request a "pause" in receiving video and audio data on the MediaStream while also maintaining a connection of the client to the server; the audio and video packets will be held back on the server-side and not delivered to the subscriber client. This allows for freeing-up of bandwidth when having multiple subscribers on a single page while only focusing on the playback of one.

> For more detailed information on Configuring and Subscribing with the Red5 Pro SDK, please visit the [Red5 Pro Documentation](https://www.red5.net/docs/development/subscriber/webrtc).

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# How to use the Mute API

Exposed on the WebRTC-based Subscriber are the following methods for the Mute API:

- `muteAudio` - Requests the server to stop sending audio packets.
- `unmuteAudio` - Requests the server to resume sending audio packets.
- `muteVideo` - Requests the server to stop sending video packets.
- `unmuteVideo` - Requests the server to resume sending video packets.

Toggling of audio from the Mute API:

```javascript
function allowAudioMute() {
  var inStandby = false
  muteAudioButton.removeAttribute('disabled')
  muteAudioButton.addEventListener('click', function () {
    if (!inStandby && targetSubscriber) {
      targetSubscriber.muteAudio()
      muteAudioButton.innerText = 'Unmute Audio'
      inStandby = !inStandby
    } else if (inStandby && targetSubscriber) {
      targetSubscriber.unmuteAudio()
      muteAudioButton.innerText = 'Mute Audio'
      inStandby = !inStandby
    }
  })
}
```

Toggling of video from the Mute API:

```javascript
function allowVideoMute() {
  var inStandby = false
  muteVideoButton.removeAttribute('disabled')
  muteVideoButton.addEventListener('click', function () {
    if (!inStandby && targetSubscriber) {
      targetSubscriber.muteVideo()
      muteVideoButton.innerText = 'Unmute Video'
      inStandby = !inStandby
    } else if (inStandby && targetSubscriber) {
      targetSubscriber.unmuteVideo()
      muteVideoButton.innerText = 'Mute Video'
      inStandby = !inStandby
    }
  })
}
```
