<h3 align="center">
  <img src="assets/red5pro_logo.png" alt="Red5 Pro Logo" />
</h3>
<p align="center">
  <a href="PUBLISHER_README.md">publisher</a> &bull;
  <a href="SUBSCRIBER_README.md">subscriber</a> &bull;
  <a href="SHARED_OBJECT_README.md">shared object</a>
</p>

---

# Publishing Live Streams with Red5 Pro WebRTC SDK

This document describes how to use the Red5 Pro WebRTC SDK to start a broadcast session.

> Grab the lastest Red5 Pro WebRTC SDK [here](https://account.red5pro.com/download).

* [Requirements](#requirements)
* [WHIP](#whip)
* [WebRTC](#webrtc)
  * [Configuration Parameters](#webrtc-configuration-parameters)
  * [Example](#webrtc-example)
* [Lifecycle Events](#lifecycle-events)

# Requirements

The **Red5 Pro WebRTC SDK** is intended to communicate with a [Red5 Pro Server](https://www.red5pro.com/), which allows for broadcasting and consuming live streams utilizing [WebRTC](https://developer.mozilla.org/en-US/docs/Web/Guide/API/WebRTC) and other protocols, including [RTMP](https://en.wikipedia.org/wiki/Real_Time_Messaging_Protocol) and [HLS](https://en.wikipedia.org/wiki/HTTP_Live_Streaming).

As such, you will need a distribution of the [Red5 Pro Server](https://www.red5pro.com/) running locally or accessible from the web, such as [Amazon Web Services](https://www.red5pro.com/docs/server/awsinstall/).

> **[Click here to start using the Red5 Pro Server today!](https://account.red5pro.com/login)**

# WHIP

As of release `11.0.0`, the Red5 Pro WebRTC SDK supports [WHIP](https://www.ietf.org/archive/id/draft-ietf-wish-whip-01.html) to ingest/broadcast of streams!

Creating a `WHIPClient` for publishing is very similar to `RTCPublisher` (as described later in [this document](#webrtc)), but allows for connection to go through HTTP/S instead of relying on a WebSocket.

If you know the endpoint you are targeting and do not need any additional customization in the broadcast stream, establishing a WHIP broadcast is as simple as:

```js
const whipEndpoint = 'https://yourred5pro.com/live/whip/endpoint/stream1'
const publisher = new WHIPClient(
  whipEndpoint,
  document.querySelector('#red5pro-publisher')
)
publisher.on('*', (event) => console.log(event))
```

However, if you want more control over the configuration of a broadcast stream, establish a `WHIPClient` similar to how you would have established an `RTCPublisher` in previous releases to `11.0.0`:

```js
const config = {
  host: 'yourred5pro.com',
  streamName: 'stream1',
  ...more,
}
const publisher = await new WHIPClient().init(config)
publisher.on('*', (event) => console.log(event))
await publisher.publish()
```

> Read more from our [WHIP/WHEP documentation](WHIP_WHEP_README.md).

# WebRTC

The Red5 Pro WebRTC SDK WebRTC Publisher solution utilizes WebSockets and WebRTC support in modern browsers.

_It is *highly* recommended to include [adapter.js](https://github.com/webrtcHacks/adapter) when targeting the WebRTC publisher._

> WebRTC-based Publishers need to be delivered over HTTPS due to browser security restrictions related to `getUserMedia` which accesses the Camera and Microphone of your machine. [Read more here](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins).

## WebRTC Configuration Properties

| Property | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| protocol | [x] | `wss` | The protocol for the WebSocket communication; `ws` or `wss`. |
| port | [x] | `443` | The port on the host that the WebSocket listens on; `5080` or `443` (insecure or secure, respectively). |
| app | [x] | `live` | The webapp name that the WebSocket is listening on. |
| streamMode | [x] | `live` | The mode to broadcast; `live`, `record` or `append`. |
| keyFramerate | [-] | `3000` | The framerate (in milliseconds) between sending key frames in broadcast. |
| host | [x] | *None* | The IP or address that the WebSocket server resides on. |
| streamName | [x] | *None* | The name of the stream to subscribe to. |
| mediaElementId | [-] | `red5pro-publisher` | The target `video` or `audio` element `id` attribute which will display the preview media. |
| rtcConfiguration | [-] | *None* | The `RTCConfiguration` to user in setting up `RTCPeerConnection`. [RTCConfiguration](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary)|
| iceServers | [x] | *None* ([Test](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/)) | The list of ICE servers to use in requesting a Peer Connection. *Marked for Deprecation. Favor `rtcConfiguration`.* |
| iceTransport | [-] | `UDP` | The transport type to use in ICE negotiation. Either `UDP` or `TCP` |
| bandwidth | [-] |`{audio: 56, video: 512}` | A configuration object to setup bandwidth setting in publisher. |
| connectionParams | [-] | `undefined` | An object of connection parameters to send to the server upon connection request. |
| mediaConstraints | [x] | [see below](#webrtc-mediaconstraints) | A object representative of the [Media Constraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints) to use while setting up the Media (via `getUserMedia` internally to the SDK). |
| onGetUserMedia | [-] | [see below](#using-mediaconstraints-and-ongetusermedia) | An override method for performing your own `getUserMedia` request. |
| signalingSocketOnly | [-] | `true` | Flag to indicate whether the `WebSocket` should only be used for signaling while establishing a connection. Afterward, all data between client and server will be sent over an `RTCDataChannel`.
| dataChannelConfiguration | [-] | `{name: "red5pro"}` | An object used in configuring a n `RTCDataChannel`. _Only used when `signalingSocketOnly` is defined as `true`_ |
| forceVP8 | [-] | `false` | Flag to force VP8 as the encoder for the outgoing stream. |

## WebRTC Example

### As a Module

```js
import { RTCPublisher } from 'red5pro-webrtc-sdk'

const start = async () => {
  try {
    const publisher = new RTCPublisher()
    await publisher.init({
      protocol: 'ws',
      port: 5080,
      host: 'localhost',
      app: 'live',
      streamName: 'mystream',
      rtcConfiguration: {
        iceServers: [{urls: 'stun:stun2.l.google.com:19302'}],
        iceCandidatePoolSize: 2,
        bundlePolicy: 'max-bundle'
      }, // See https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary
      streamMode: 'live',
      mediaElementId: 'red5pro-publisher',
      bandwidth: {
        audio: 56,
        video: 512
      },
      mediaConstraints: {
        audio: true,
        video: {
          width: {
            exact: 640
          },
          height: {
            exact: 480
          },
          frameRate: {
            min: 8
            max: 24
          }
        }
      }
    })
    await publisher.publish()
  } catch (e) {
    // An error occured in establishing a broadcast session.
  }
}

```

### In a Browser

_index.html_:

```html
<!doctype html>
<html>
  <head>
    <!-- Recommended shim for cross-browser WebRTC support. -->
    <script src="https://webrtchacks.github.io/adapter/adapter-latest.js"></script>
  </head>
  <body>
    <!-- `autoplay` will immediately show preview video. `muted` will mute the audio to avoid feedback noise. -->
    <video id="red5pro-publisher" autoplay muted></video>
    <!-- Exposes `red5prosdk` on the window global. -->
    <script src="lib/red5pro/red5pro-sdk.min.js"></script>
    <!-- Example script below. -->
    <script src="main.js"></script>
  </body>
</html>
```

_main.js_:

```js
(function (red5prosdk) {

  // Create a new instance of the WebRTC publisher.
  var publisher = new red5prosdk.RTCPublisher();

  // Initialize
  publisher.init({
      protocol: 'ws',
      port: 5080,
      host: 'localhost',
      app: 'live',
      streamName: 'mystream',
      rtcConfiguration: {
        iceServers: [{urls: 'stun:stun2.l.google.com:19302'}],
        iceCandidatePoolSize: 2,
        bundlePolicy: 'max-bundle'
      }, // See https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary
      streamMode: 'live',
      mediaElementId: 'red5pro-publisher',
      bandwidth: {
        audio: 56,
        video: 512
      },
      mediaConstraints: {
        audio: true,
        video: {
          width: {
            exact: 640
          },
          height: {
            exact: 480
          },
          frameRate: {
            min: 8
            max: 24
          }
        }
      }
    })
    .then(function() {
      // Invoke the publish action.
      return publisher.publish();
    })
    .catch(function(error) {
      // A fault occurred while trying to initialize and publish the stream.
      console.error(error);
    });

})(window.red5prosdk);
```

Because this example demonstrates publishing to a Red5 Pro Server located on `localhost`, we set the *protocol* to `ws` and *port* to `5080`, which are the default values for non-secure socket connection. If you are publishing to a remote Red5 Pro Server, it will need to be delivered securely - upon which you can rely on the default property values of `wss` and `443`, respectively.

The `video` or `audio` element has the `autoplay` and `muted` attributes defined. This will ensure:

* `autoplay`: Once access to your Camera and Microphone are available, it will show a preview of your broadcast to yourself.
* `muted`: You don't get noise feedback when you start publishing, since it will mute your _playback_ volume. Your publishing session will still have audio.

### Using mediaConstraints and onGetUserMedia

The Red5 Pro WebRTC SDK will handle the `getUserMedia` requirements internally to set up your Camera and/or Microphone for a broadcast. As such, you can provide the [Media Constraint](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints) object to be used.

#### WebRTC mediaConstraints

_The `mediaConstraints` default configuration property for WebRTC Publishers._

```js
{
  audio: true,
  video:{
    width: {
      exact: 640
    },
    height: {
      exact: 480
    }
  }
}
```

Internally, the Red5 Pro WebRTC SDK will use the provided *Media Constraint* to test if the resolutions requested are supported by the browser. If not, it will find the nearest supported lower neighbor based on the originally provided area dimension(s) of the resolutions.

For example, if you provide the following for `mediaConstraints`:

```js
{
  audio: true,
  video:{
    width: {
      exact: 1280
    },
    height: {
      exact: 720
    }
  }
}
```

... and your browser does not support **720p(HD)**, most likely the nearest neighbor supported by the browser will be either **800x600(SVGA)** or **640x480(VGA)**, and either of those resolutions will be used in your broadcast.

> If you would like to bypass the internal determination of resolution, you can use the `onGetUserMedia` override of the configuration properties.

#### onGetUserMedia

The `onGetUserMedia` method - when defined on the configuration provide to a WebRTC-based Publisher - will override the internal call to `getUserMedia` in the Red5 Pro WebRTC SDK.

You can provide your own logic on how `getUserMedia` is invoked and a [Media Stream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) attained by setting the `onGetUserMedia` attribute to a method that conforms to the following guidelines:

* No input arguments are provided to `onGetUserMedia`.
* It is *expected* that a `Promise` object is returned.
* A `MediaStream` object must be provided in the resolve of the `Promise`.
* The error provided in the reject of the `Promise` is optional, but recommended as a `String`.

An example of providing `onGetUserMedia` as a configuration:

```js
{
  host: "localhost",
  protocol: "ws",
  port: 5080,
  streamName: "mystream",
  rtcConfiguration: {
    iceServers: [{urls: 'stun:stun2.l.google.com:19302'}],
    iceCandidatePoolSize: 2,
    bundlePolicy: 'max-bundle'
  }, // See https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary
  onGetUserMedia: function () {
    return navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: {
          max: 1920,
          ideal: 1280,
          min: 640
        },
        width: {
          max: 1080,
          ideal: 720,
          min: 360
        }
      }
    })
  }
}
```

> The `navigator.mediaDevices.getUserMedia` API returns a `Promise`, but you can define any other method, as long as it returns a `Promise` and provides a `MediaStream` on resolve.

Be aware that overriding `onGetUserMedia` you are losing the logic from the Red5 Pro WebRTC SDK that attempts to pick the optimal resolution supported by your browser. **Use with descretion.**

> To read more about `getUserMedia` please read the following document from Mozilla Developer Network: [https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

# Lifecycle Events

This section describes the events dispatched from the Publisher of the Red5 Pro WebRTC SDK.

* [Listening to Publisher Events](#listening-to-publisher-events)
* [Common Events](#common-events)
* [WebRTC Publisher Events](#webrtc-publisher-events)

## Listening to Publisher Events

The Publisher(s) included in the SDK are event emitters that have a basic API to subscribing and unsubscribing to events either by name or by wildcard.

To subscribe to all events from a publisher:

```js
function handlePublisherEvent (event) {
  // The name of the event:
  const { type } = event
  // The dispatching publisher instance:
  const { publisher } = event
  // Optional data releated to the event (not available on all events):
  const { data } = event
}

const publisher = new RTCPublisher()
publisher.on('*', handlePublisherEvent)
```

> The `*` type assignment is considered a "Wildcard" subscription - all events being issued by the publisher instance will invoke the assign event handler.

To unsubscribe to all events from a publisher after assinging an event handler:

```js
publisher.off('*', handlePublisherEvent);
```

The following sections of this document describe the event types that can also be listened to directly, instead of using the `*` wildcard.

## Common Events

The following events are common across all Publisher implementations from the Red5 Pro WebRTC SDK. They can be accessed from the global `red5prosdk` object from the `PublisherEventTypes` attribute.

| Access | Name | Meaning |
| :--- | :---: | :--- |
| CONNECT_SUCCESS | 'Connect.Success' | When the publisher has established a required remote connection, such as to a WebSocket or RTMP-based server. |
| CONNECT_FAILURE | 'Connect.Failure' | When the publisher has failed to establish a required remote connection for streaming. |
| PUBLISH_START | 'Publish.Start' | When the publisher has started a broadcast stream. |
| PUBLISH_FAIL | 'Publish.Fail' | When the publisher has failed to start a broadcast stream. |
| PUBLISH_INVALID_NAME | 'Publish.InvalidName' | When the publisher is rejected from starting a broadcast stream because the `streamName` provided is already in use. |
| UNPUBLISH_SUCCESS | 'Unpublish.Success' | When the publisher has successfully closed an active broadcast stream. |
| PUBLISH_METADATA | 'Publish.Metadata' | When the publisher receives metadata from the server. |
| PUBLISH_STATUS | 'Publish.Status' | When a status event of the publisher has been receieved from the server. |
| PUBLISH_AVAILABLE | 'Publish.Available' | When the publisher stream has become available on the origin server to be consumed. This will follow the connection setup and `Publish.Start` event. |
| PUBLISH_INSUFFICIENT_BANDWIDTH | 'Publish.InsufficientBW' | When the current broadcast session is experiencing insufficient bandwidth conditions. |
| PUBLISH_RECOVERING_BANDWIDTH | 'Publish.RecoveringBW' | Then the current broadcast has updated information related to bandwidth condition recovery. |
| PUBLISH_SUFFICIENT_BANDWIDTH | 'Publish.SufficientBW' | When the current broadcast session has sufficient bandwidth conditions from previously experiencing network issues. |
| CONNECTION_CLOSED | 'Publisher.Connection.Closed' | Invoked when a close to the connection is detected. |
| DIMENSION_CHANGE | 'Publisher.Video.DimensionChange' | Notification when the Camera resolution has been set or change. |

## WebRTC Publisher Events

The following events are specific to the `RTCPublisher` implementation and accessible on the global `red5prosdk` object from the `RTCPublisherEventTypes` attribute. These events are dispatched during the lifecycle of thre trickle ICE functionality required to start a broadcast:
| Access | Name | Meaning |
| :--- | :---: | :--- |
| CONSTRAINTS_ACCEPTED | 'WebRTC.MediaConstraints.Accepted' | When constraints have been accepted from the internal request to `getUserMedia`. The `data` property of this event contains a `requested` object detailing the constraints used in the `getUserMedia` request and an `accepted` object which is the current constraint settings for the media. |
| CONSTRAINTS_REJECTED | 'WebRTC.MediaConstraints.Rejected' | Then constraints have been rejected from the internal request to `getUserMedia`. The `data` property of this event contains a `constraints` object detailing the constraints that were used and rejected from `getUserMedia`. |
| MEDIA_STREAM_AVAILABLE | 'WebRTC.MediaStream.Available' | When the negotation process has returned a `MediaStream` object to use. |
| PEER_CONNECTION_AVAILABLE | 'WebRTC.PeerConnection.Available' | When the negotation process has produced a valid `PeerConnection`. |
| OFFER_START | 'WebRTC.Offer.Start' | When the publisher requests to send an offer using a `SessionDescription` on the `PeerConnection`. |
| OFFER_END | 'WebRTC.Offer.End' | When the publisher has received an answer from the `SDP` offer on the `PeerConnection`. |
| ICE_TRICKLE_COMPLETE | 'WebRTC.IceTrickle.Complete' | When the negotaiton process (a.k.a. trickle) has completed and the publisher will attempt at opening a broadcast stream. |
| DATA_CHANNEL_AVAILABLE | 'WebRTC.DataChannel.Available' |  the underlying `RTCDataChannel` is available when `signalingSocketOnly` configuration is used. |
| DATA_CHANNEL_OPEN | 'WebRTC.DataChannel.Open' | When the underlying `RTCDataChannel` is opened when `signalingSocketOnly` configuration is used.
| DATA_CHANNEL_CLOSE | 'WebRTC.DataChannel.Close' | When the underlying `RTCDataChannel` is closed when `signalingSocketOnly` configuration is used. |
| DATA_CHANNEL_ERROR | 'WebRTC.DataChannel.Error' | When an error has occurred within the underlying `RTCDataChannel` when `signalingSocketOnly` configuration is used. |
| DATA_CHANNEL_MESSAGE | 'WebRTC.DataChannel.Message' | When a message has been delivered over the underlying `RTCDataChannel` when `signalingSocketOnly` configuration is used. |
| UNSUPPORTED_FEATURE | 'WebRTC.Unsupported.Feature' | Notification that a feature attempting to use in WebRTC is not supported or available in the current browser that the SDK is being employed. e.g., [Insertable Streams](#insertable-streams). |
| TRANSFORM_ERROR | 'WebRTC.Transform.Error' | An error has occurred while trying to apply transform to a media track. See [Insertable Streams](#insertable-streams)|

