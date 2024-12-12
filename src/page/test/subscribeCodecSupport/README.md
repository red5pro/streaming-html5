# Subscribing Using Codec Support

This example demonstrates specifying desired Video and Audio decoders for playback.

**Please refer to the [Basic Subscriber Documentation](../subscribe/README.md) to learn more about the basic setup.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# Codec Selection

The list of available codecs provided from the browser vendor (e.g., Chrome, Firefox, etc) can be found on the `RTCRtpReceiver` of the WebRTC API:

```js
const getUniqueCodecListing = (codecType) => {
  const { PlaybackVideoEncoder, PlaybackAudioEncoder } = red5prosdk
  const encoder =
    codecType === 'video' ? PlaybackVideoEncoder : PlaybackAudioEncoder
  let capabilities = RTCRtpReceiver.getCapabilities(codecType)
  let codecs = capabilities.codecs.map((codec) =>
    codec.mimeType.match(new RegExp(codecType + '/(.*)'))[1].toUpperCase()
  )
  codecs = codecs.filter((codec) => {
    return encoder[codec]
  })
  codecs = codecs
    .filter((value, index, self) => {
      return self.indexOf(value) === index
    })
    .sort()
  return codecs
}
```

The previous code snippet will assemble a list of available codecs from the browser and filter them based on the codec support of the Red5 Server.

# Selection & Assignment

Before subscribing, you have the ability to select the Video and/or Audio encoder to request - or leave the default to allow Red5 to decide based on listing in the Offer/Answer SDP.

Once playback is requested, any selections will be relayed in the `videoEncoding` and `audioEncoding` init conifuguration params:

```js
let rtcConfig = {
  ...configuration,
  ...defaultConfiguration,
  ...getAuthenticationParams(),
  streamName,
  protocol,
  port,
  subscriptionId: 'subscriber-' + instanceId,
  videoEncoding:
    videoSelect.value === 'default'
      ? undefined
      : PlaybackVideoEncoder[videoSelect.value.toUpperCase()],
  audioEncoding:
    audioSelect.value === 'default'
      ? undefined
      : PlaybackAudioEncoder[audioSelect.value.toUpperCase()],
}
```

> The supported codecs for a subscriber can be found on the `PlaybackVideoEncoder` and `PlaybackAudioEncoder` enums from the Red5 WebRTC SDK.
