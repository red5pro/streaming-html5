# Publishing and Muting Audio & Video using Red5 Pro

This example shows how to "mute" the audio and video of a publisher while streaming; essentially, turning off the microphone and camera feeds for the stream, respectively.

**Please refer to the [Basic Publisher Documentation](../publishStreamManagerProxy/README.md) to learn more about the basic setup.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

> These examples use the WebRTC-based Publisher implementation from the Red5 Pro HTML SDK.

# Important Note

A server configuration related to WebRTC plugin is required in order for this example to work properly:

In the server distribution, under `conf`, update the following line in `webrtc-plugin.properties`:

```sh
# Idle checking for transport layer
idle.check.enabled=false
```

The reason it needs to be switched from the default of `true` to `false` is to properly notify the server to not consider a subscriber who is not receiving video data (in the case of a publisher having muted their audio and video) to be considered a lost connection.

# Mute & Unmute

## Mute API in the SDK

The WebRTC-based publisher exposes the following API to mute and unmute audio and video:

| Method Name | Description |
| :-- | :-- |
| `muteAudio` | Turns off sending audio data during a live broadcast. |
| `unmuteAudio` | Turns on sending audio data during a live broadcast. |
| `muteVideo` | Turns off sending video data during a live broadcast. |
| `unmuteVideo` | Turns on sending video data during a live broadcast. |

These methods are used to communicate to the server that the broadcaster is going to be shutting off their audio and/or video stream(s), respectively.

This notification is first made prior to actually stopping the sending of packets to the server using the `active` encoding parameter of the `RTCRtspSender` of a `RTCPeerConnection`.

## active Encoding in RTCRtspSender

After notifying the server that packets will stop being sent, we utilize the `active` encoding parameter of each `RTCRtspSender` of the underlying connection to toggle on or off the audio and/or video stream.

For example, the following will stop sending audio packets out on the target publisher:

```js
var pc = publisher.getPeerConnection();
var sender = pc.getSenders()[0]; // Assuming Audio is first in list.
var params = sender.getParameters();
params.encodings[0].active = wasMuted ? true : false;
sender.setParameters(params);
```

> More information: [https://developer.mozilla.org/en-US/docs/Web/API/RTCRtpSendParameters/encodings](https://developer.mozilla.org/en-US/docs/Web/API/RTCRtpSendParameters/encodings)

## UI

Included on the page are buttons that allow you to mute and unmute both audio and video during a broadcast. Upon initialization and broadcast of a publisher, the button handlers are set to toggle these stream states:

```
function addMuteListener (publisher) {
    muteAudioButton.addEventListener('click', function () {
      var wasMuted = muteAudioButton.innerText === 'Unmute Audio (Client)';
      muteAudioButton.innerText = wasMuted ? 'Mute Audio (Client)' : 'Unmute Audio (Client)';
      if (wasMuted) {
        publisher.unmuteAudio();
      }
      else {
        publisher.muteAudio();
      }
      var pc = publisher.getPeerConnection();
      var sender = pc.getSenders()[0]; // Assuming Audio is first in list.
      var params = sender.getParameters();
      params.encodings[0].active = wasMuted ? true : false;
      sender.setParameters(params);
    });
    muteVideoButton.addEventListener('click', function () {
      var wasMuted = muteVideoButton.innerText === 'Unmute Video (Client)';
      muteVideoButton.innerText = wasMuted ? 'Mute Video (Client)' : 'Unmute Video (Client)';
      if (wasMuted) {
        publisher.unmuteVideo();
      }
      else {
        publisher.muteVideo();
      }
      var pc = publisher.getPeerConnection();
      var sender = pc.getSenders()[1]; // Assuming Video is second in list.
      var params = sender.getParameters();
      params.encodings[0].active = wasMuted ? true : false;
      sender.setParameters(params);
    });
  }
}
```
