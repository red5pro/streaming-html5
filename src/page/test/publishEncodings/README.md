# Publish with Live Encoding Parameters

This example demonstrates how to update the encoding parameters of an audio/video stream to affect how a broadcast is delivered to the server and - ulitimately - to all subscribers.

> To best see how these settings affect the stream, it is recommended to also open a [Basic Subscriber](../subscribe).

**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# RTCRtspSender Parameters

The underlying `RTCPeerConnection` of a Red5 Pro `WHIPClient` and `RTCPublisher` from the HTML SDK contains [RTCRtspSender](https://developer.mozilla.org/en-US/docs/Web/API/RTCRtpSender) instances related to the audio and video tracks of the stream.

While broadcasting a live stream, the encoding parameters of a `RTCRtspSender` can be modified and affect how the stream is encoded and delivered to subscribers.

Among others, the most widely supported encoding parameters that are available to modify during a streaming session are:

| Property              | Description                                                                |
| :-------------------- | :------------------------------------------------------------------------- |
| active                | Flag that stops (`false`) and (re)starts (`true`) the audio or video track |
| maxBitrate            | The maximum bitrate (in bps) to send out the audio or video track          |
| scaleResolutionDownBy | The factor at which to scale the outgoing resolution of the video track    |

> For more information see [https://developer.mozilla.org/en-US/docs/Web/API/RTCRtpSendParameters/encodings](https://developer.mozilla.org/en-US/docs/Web/API/RTCRtpSendParameters/encodings).

# Test Usage

**After starting a publisher stream, it is recommended to open a [Subscriber](../subscribe) test in a separate browser, window or tab in order to see how the stream being consumed is affected.**

The test provides UI to update the encodings described in the previous section during a live broadcast stream.

## maxBitrate

The `maxBitrate` setting has an `Unlimited` option. When selecting `Unlimited` the browser determines the bitrate based on its internal logic for WebRTC streaming. It is important to note that `Unlimited` will most likely set the limit to any initial bitrate/bandwidth setting specified prior to start of the stream. In our test case, we have set that initial value to `2500`.

## scaleResolutionDownBy

The settings for scale resolution are factors represented by fractions. For example, setting the scale to `1/4` means it will set the scale of the outgoing stream down by a factor of 4 from the original resolution. By setting it to the `Original` value, there will be no scaling down and broadcast out at the original resolution.

> By default we request the original resolution at `720p` in order to see the scaling more affectively. The word "request" should be noted here, as some browser and camera combinations may not respect or support `720p`, at which point the browser and HTML SDK will determine the next best option.

## active

The `active` flag is used based on the selection of `Set Active On Mute` checkbox. If selected, it will use the `active` encoding flag along with our Mute API.

The HTML SDK has a Mute API for audio and video. This Mute API actually informs the server to not send stream data to subscribers. It does not stop the broadcast of data going to the server.

By using the `active` flag, you will stop and (re)start sending stream data to the server when setting it to `false` and `true`, respectively.

> If you choose to select `Set Active On Mute`, you will also need to update a setting in the `webrtc-plugin.properties` of the Red5 Pro Server being streamed to. This is in order to ensure the server does not consider subscribers not receiving any data as "idle" and disconnect them.

# Example

As an example of updating the encoding parameters of an `RTCRtspSender`, here is the logic to update the `maxBitrate` within this test:

```js
function getTrackSender(connection, kind) {
  var senders = connection.getSenders()
  var i = senders.length
  while (--i > -1) {
    if (senders[i].track.kind === kind) {
      return senders[i]
    }
  }
  return undefined
}

function addPublisherControls(publisher) {
  bandwidthSelect.addEventListener('change', function () {
    var value = bandwidthSelect.options[bandwidthSelect.selectedIndex].value
    var sender = getTrackSender(publisher.getPeerConnection(), 'video')
    var params = sender.getParameters()
    if (!params.encodings) {
      params.encodings = [{}]
    }
    if (value === 'unlimited') {
      delete params.encodings[0].maxBitrate
    } else {
      params.encodings[0].maxBitrate = parseInt(value, 10) * 1000
    }
    sender.setParameters(params)
  })
}
```

You will first access the `RTCRtspSender` related to the `video` track, then access its current parameters from `getParameters()`. You will then update the `encodings` property within the parameters by accessing its first element and setting the `maxBitrate`.

You should see the `Bitrate` value within the Publisher UI change accordingly, as well as the `Bitrate` value in the Subscriber UI if subscribing to the stream to see how encodings affect playback.

> Additionally, you can open `chrome://webrtc-internals` if using Google Chrome to see how the encodings affect the outgoing and incoming streams while live streaming.
