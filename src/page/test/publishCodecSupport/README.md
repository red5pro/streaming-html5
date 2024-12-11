# Publishing Using Codec Support

This example demonstrates specifying desired Video and Audio encoders for publishing.

**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# Codec Selection

The list of available codecs provided from the browser vendor (e.g., Chrome, Firefox, etc) can be found on the `RTCRtpSender` of the WebRTC API:

```js
const getUniqueCodecListing = (codecType) => {
  const { PublishVideoEncoder, PublishAudioEncoder } = red5prosdk
  const encoder =
    codecType === 'video' ? PublishVideoEncoder : PublishAudioEncoder
  let capabilities = RTCRtpSender.getCapabilities(codecType)
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

Before publishing, you have the ability to select the Video and/or Audio encoder to request - or leave the default to allow Red5 to decide based on listing in the Offer SDP.

Once publishing is requested, any selections will be relayed in the `videoEncoding` and `audioEncoding` init conifuguration params:

```js
const rtcConfig = {
  ...configuration,
  ...defaultConfiguration,
  ...getAuthenticationParams(),
  protocol,
  port,
  streamName,
  videoEncoding:
    videoSelect.value === 'default'
      ? undefined
      : PublishVideoEncoder[videoSelect.value.toUpperCase()],
  audioEncoding:
    audioSelect.value === 'default'
      ? undefined
      : PublishAudioEncoder[audioSelect.value.toUpperCase()],
}
```

> The supported codecs for a publisher can be found on the `PublishVideoEncoder` and `PublishAudioEncoder` enums from the Red5 WebRTC SDK.
