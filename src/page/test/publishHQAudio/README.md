# Publish HQ Audio

This is an example of broadcasting with High-Quality Audio.

**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup.**

### Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# How to Publish with HQ Audio

To publish with High-Quality Audio, define the `sampleRate` on the `audio` constraint passed in the intialization configuration through the `mediaConstraints` property.

```js
function getUserMediaConfiguration() {
  if (typeof configuration.mediaConstraints.audio === 'boolean') {
    configuration.mediaConstraints.audio = {}
  }
  configuration.mediaConstraints.audio.sampleRate = 44100
  return {
    mediaConstraints: {
      audio: configuration.useAudio
        ? configuration.mediaConstraints.audio
        : false,
      video: configuration.useVideo
        ? configuration.mediaConstraints.video
        : false,
    },
  }
}
```

> More information: [Media.getUserMedia from MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
