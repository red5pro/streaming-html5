# Subscriber Using VP8 Video Encoding

This example demonstrates requesting VP8 Video Encoding for a playback stream.

**Please refer to the [Basic Subscriber Documentation](../subscribe/README.md) to learn more about the basic setup.**

## Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

# Encoders

The following encoders are available for playback of a WebRTC-based stream.

## Video Encoding Configuration
By not providing the videoEncoding attribute in the WebRTC Subscriber configuration, the server will choose the default encoder to use. If you do not wish for the server to default, you can provide the following values for the property:

* VP8
* H264
* NONE

## Audio Encoding Configuration

By not providing the audioEncoding attribute in the WebRTC Subscriber configuration, the server will choose the default encoder to use. If you do not wish for the server to default, you can provide the following values for the property:

* Opus
* PCMU
* PCMA
* Speex
* NONE

# VP8

To request VP8 video encoding for playback, provide the `VP8` option from the SDK in the intialization configuration for a WebRTC-based subscriber:

```js
  var defaultConfiguration = (function(useVideo, useAudio) {
    var c = {
      protocol: getSocketLocationFromProtocol().protocol,
      videoEncoding: red5prosdk.PlaybackVideoEncoder.VP8,
      port: getSocketLocationFromProtocol().port
    };
    if (!useAudio) {
      c.audioEncoding = red5prosdk.PlaybackAudioEncoder.NONE;
    }
    return c;
  })(configuration.useVideo, configuration.useAudio);
```

[index #41](index#L41)
