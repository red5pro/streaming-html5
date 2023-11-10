# Subscribing RTC Streams over stream manager proxy

The streammanager WebRTC proxy is a communication layer built inside streammanager web application which allows it to act as a proxy gateway for webrtc publishers / subscribers. The target use case of this communication layer is to facilitate a secure browser client to be able to connect to a "unsecure" remote websocket endpoint for consuming WebRTC services offered by Red5pro.

Streammanager autoscaling works with dynamic nodes which are associated with dynamic IP addresses and cannot have a SSL attached to them. The proxy layer helps subscribers to connect and initiate a WebRTC `subscribe` session from a `secure` (ssl enabled) domain to a `unsecure` Red5pro origin having using an IP address.

**Please refer to the [Basic Subscriber Documentation](../subscribeStreamManagerProxy/README.md) to learn more about the basic setup.**

> In order to properly run the Stream Manager examples, you will need to configure you server for cluster infrastructure as described in the following documentation: [https://www.red5.net/docs/installation/](https://www.red5.net/docs/installation/).

## Server Configuration

> Please read about [WHIP/WHEP Configuration for Standalone and Stream Manager support.](https://www.red5.net/docs/special/user-guide/whip-whep-configuration/)

You also need to ensure that the stream manager proxy layer is `enabled`. The configuration section can be found in stream manager's config file - `red5-web.properties`

```sh
## WEBSOCKET PROXY SECTION

proxy.enabled=false
```

### Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# Encoders

The following encoders are available for playback of a WebRTC-based stream.

## Video Encoding Configuration

By not providing the videoEncoding attribute in the WebRTC Subscriber configuration, the server will choose the default encoder to use. If you do not wish for the server to default, you can provide the following values for the property:

- VP8
- H264
- NONE

## Audio Encoding Configuration

By not providing the audioEncoding attribute in the WebRTC Subscriber configuration, the server will choose the default encoder to use. If you do not wish for the server to default, you can provide the following values for the property:

- Opus
- PCMU
- PCMA
- Speex
- NONE

# VP8

To request VP8 video encoding for playback, provide the `VP8` option from the SDK in the intialization configuration for a WebRTC-based subscriber:

```js
var defaultConfiguration = (function (useVideo, useAudio) {
  var c = {
    protocol: getSocketLocationFromProtocol().protocol,
    videoEncoding: red5prosdk.PlaybackVideoEncoder.VP8,
    port: getSocketLocationFromProtocol().port,
  }
  if (!useAudio) {
    c.audioEncoding = red5prosdk.PlaybackAudioEncoder.NONE
  }
  return c
})(configuration.useVideo, configuration.useAudio)
```
