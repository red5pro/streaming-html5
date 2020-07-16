# Publishing and Muting Audio & Video using Red5 Pro

This example shows how to "mute" the audio and video of a publisher while streaming; essentially, turning off the microphone and camera feeds for the stream, respectively.

**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

> These examples use the WebRTC-based Publisher implementation from the Red5 Pro HTML SDK.

# Mute & Unmute

The WebRTC-based publisher exposes the following API to mute and unmute audio and video:

| Method Name | Description |
| :-- | :-- |
| `muteAudio` | Turns off sending audio data during a live broadcast. |
| `unmuteAudio` | Turns on sending audio data during a live broadcast. |
| `muteVideo` | Turns off sending video data during a live broadcast. |
| `unmuteVideo` | Turns on sending video data during a live broadcast. |

These methods cn be thought of as "muting" and "unmuting" the microphone and camer during a live broadcast.

## UI

Included on the page are buttons that allow you to mute and unmute both audio and video during a broadcast. Upon initialization and broadcast of a publisher, the button handlers are set to toggle these stream states:

```
function addMuteListener (publisher) {
  muteAudioButton.addEventListener('click', function () {
    var wasMuted = muteAudioButton.innerText === 'unmute';
    muteAudioButton.innerText = wasMuted ? 'mute' : 'unmute';
    if (wasMuted) {
      publisher.unmuteAudio();
    }
    else {
      publisher.muteAudio();
    }
  });
  muteVideoButton.addEventListener('click', function () {
    var wasMuted = muteVideoButton.innerText === 'unmute';
    muteVideoButton.innerText = wasMuted ? 'mute' : 'unmute';
    if (wasMuted) {
      publisher.unmuteVideo();
    }
    else {
      publisher.muteVideo();
    }
  });
}
```

[index #48](index#L48)

