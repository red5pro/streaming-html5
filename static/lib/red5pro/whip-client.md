i<h3 align="center">
  <img src="../assets/Red5_Truetime_black.png" alt="Red5 Pro Logo" height="65" />
</h3>
<p align="center">
  <a href="../README.md">Quick Start</a> &bull;
  <a href="#">Publishing</a> &bull;
  <a href="whep-client.md">Subscribing</a>
</p>

---

# WHIPClient

When it comes time to broadcast a live stream from your Red5 Server deployment, the SDK provides the WebRTC-based `WHIPClient`.

The `WHIPClient` - under the hood - is based on the [WebRTC-HTTP ingestion](https://www.ietf.org/archive/id/draft-ietf-wish-whip-01.html)(WHIP) protocol providing the ability to negotation and establish a connection using HTTP/S requests. This removes the requirement for a WebSocket, which historically has been used for the role of negotiation and connection.

This provides a standardized - and _blazingly fast_ - way to establish and broadcast a live stream using WebRTC.

* [Usage](#usage)
* [Init Configuration](#init-configuration)
* [Events](#events)
* [Statistics](#statistics)
* [Stream Manager 2.0](#stream-manager-20)

# Usage

There are two options to initiate a `WHIPClient`:

1. From instantiation with a full WHIP endpoint URL (if known).
2. From an `init()` call on this instance with an init configuration object.

> If using the second option (most widely used), the SDK will properly construct the endpoints required for negotiation and streaming.

## Providing a WHIP endpoint

If you want to allow the usual default configuration properties of a publisher client (of which the `WHIPClient` is an extension), you can simply provide the **WHIP** endpoint and target media element to the constructor of `WHIPClient`:

```js
const whipEndpoint =
  'https://yourred5pro.com/live/whip/endpoint/stream1'

const additionalOptions = {...}

const publisher = new WHIPClient(
  whipEndpoint,
  document.querySelector('#red5pro-publisher'),
  additionalOptions
)
publisher.on('*', (event) => console.log(event))
```

When providing the endpoint, the _optional_ target media element and the _optional_ additional init configuration properties in the constructor for `WHIPClient`, the SDK will automatically start the connection calls and continue on to broadcast once available.

The construction of the **WHIP** endpoint URL is the following when integrating with a standalone deployment of the Red5 Server:

```sh
https://<your server deployment FQDN>/<app scope>/whip/endpoint/<stream name>
```

When integrating with a Red5 Cloud deployment (using autoscaling and the Stream Manager), the **WHIP** endpoint will have the following structure:

```sh
https://<your cloud deployment FQDN>/as/v1/proxy/whip/<app scope>/<stream name>
```

Where:

- `your deployment FQDN` - the host endpoint of your deployment.
- `app scope` - the target webapp scope to stream to. Typically `live`.
- `stream name` - the name of the stream to subscribe to.

> It is important to note that in using the **WHIP** endpoint as such, the `WHIPClient` will attempt its own broadcast - you do not have to make an additional `publish()` call.

## Using Init with a Configuration

If not using the first option of providing a **WHIP** endpoint in the constructor, you would simply instantiate the `WHIPClient` and use the `init()` and `publish()` calls to establish a connection and broadcast:

```js
try {
    const publisher = new WHIPClient()
    publisher.on('*', , (event) => console.log(event))

    // See next section: Init Configuration, for more details.
    await publisher.init(configuration)
    await publisher.publish()
} catch (error) {
    // Something went wrong...
}
```

> Note: If integrating with Red5 Cloud deployment with Stream Manager, you will need to provide an `endpoint` init configuration property. More details in next section of this document.

# Init Configuration

When using the `init()` call of a `WHIPClient` - or, alternatively, when using a **WHIP** endpoint with additional options in the constructor - the following initialization properties are available:

| Property | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `host` | [x] | *None* | The IP or address that the WebSocket server resides on. |
| `streamName` | [x] | *None* | The name of the stream to subscribe to. |
| `protocol` | [x] | `https` | The protocol of the host for the signaling communication. |
| `port` | [x] | `443` | The port on the host that the Red5 server listens on; `5080` or `443` (insecure or secure, respectively). |
| `app` | [x] | `live` | The webapp context name that the stream is on. |
| `endpoint` | [-] | `undefined` | The full URL of the endpoint to stream to. **This is primarily used in Stream Manager 2.0 integration for clients.**
| `streamMode` | [x] | `live` | The mode to broadcast; `live`, `record` or `append`. |
| `keyFramerate` | [-] | `3000` | The framerate (in milliseconds) between sending key frames in broadcast. |
| `mediaElementId` | [-] | `red5pro-publisher` | The target `video` or `audio` element `id` attribute which will display the preview media. |
| `rtcConfiguration` | [-] | _Basic_ | The `RTCConfiguration` to use in setting up `RTCPeerConnection`. [RTCConfiguration](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary)|
| `includeDataChannel` | [-] | `true` | Flag to open a datachannel for messaging between server and client once connection is established.
| `dataChannelConfiguration` | [-] | `{name: "red5pro"}` | An object used in configuring a n `RTCDataChannel`. _Only used when `includeDataChannel` is defined as `true`_ |
| `iceTransport` | [-] | `UDP` | The transport type to use in ICE negotiation. Either `UDP` or `TCP` |
| `bandwidth` | [-] |`{audio: 56, video: 750}` | A configuration object to setup bandwidth setting in publisher. |
| `connectionParams` | [-] | `undefined` | An object of connection parameters to send to the server upon connection request. |
| `mediaConstraints` | [x] | [see below](#using-mediaconstraints-and-ongetusermedia) | A object representative of the [Media Constraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints) to use while setting up the Media (via `getUserMedia` internally to the SDK). |
| `onGetUserMedia` | [-] | [see below](#using-mediaconstraints-and-ongetusermedia) | An override method for performing your own `getUserMedia` request. Expected return is a `Promise` |
| `videoEncoding` | [-] | `undefined` | `PublishVideoEncoder` enum: `VP8` | `H264` | `H265` . |
| `audioEncoding` | [-] | `undefined` | `PublishAudioEncoder` enum. |
| `offerSDPResolution` | [-] | `false` | Request to send the initial resolution on the SDP offer in an attribute line with the following format: `a=framesize:${width}-${height}` |
| `stats` | [-] | *None* | Configuration object to enable stats reporting. See [Stats Reporting](#statistics) for more information. |

## Using MediaConstraints and onGetUserMedia

The Red5 Pro WebRTC SDK will handle the `getUserMedia` requirements internally to set up your Camera and/or Microphone for a broadcast. As such, you can provide the [Media Constraint](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints) object to be used on the `init` configuration:

```js
const config = {
  host: 'mycloud.red5',
  streamName: 'mystream',
  mediaConstraints: {
    audio: true,
    video: {
      width: {
        min: 640,
        max: 1280
      },
      height: {
        min: 360,
        max: 720
      },
      frameRate: {
        min: 15,
        max: 60
      }
    }
  }
}

const publisher = new WHIPClient()
await publisher.init(config)
await publisher.publish()
```

Internally, the Red5 Pro WebRTC SDK will use the provided *Media Constraint* to test if the resolutions requested are supported by the browser. If not, it will find the nearest supported lower neighbor based on the originally provided area dimension(s) of the resolutions.

> If you would like to bypass the internal determination of resolution, you can use the `onGetUserMedia` override of the configuration properties.

If you know exactly the proper configurations needed for your requirements and would like to fine-tune the generated `MediaStream` to be used in the broadcast, you can also optionally return that using the `onGetUserMedia` init configuration:

```js
const config = {
  host: 'mycloud.red5',
  streamName: 'mystream',
  onGetUserMedia: () => {
    return navigator.getUserMedia({
      audio: true,
      video: {
        width: {
          min: 640,
          max: 1280
        },
        height: {
          min: 360,
          max: 720
        },
        frameRate: {
          min: 15,
          max: 60
        }
      }
    })
  }
}

const publisher = new WHIPClient()
await publisher.init(config)
await publisher.publish()
```

The `onGetUserMedia` method - when defined on the configuration provide to a WebRTC-based Publisher - will override the internal call to `getUserMedia` in the Red5 Pro WebRTC SDK.

You can provide your own logic on how `getUserMedia` is invoked and a [Media Stream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) attained by setting the `onGetUserMedia` attribute to a method that conforms to the following guidelines:

* No input arguments are provided to `onGetUserMedia`.
* It is *expected* that a `Promise` object is returned.
* A `MediaStream` object must be provided in the resolve of the `Promise`.
* The error provided in the reject of the `Promise` is optional, but recommended as a `String`.

Be aware that overriding `onGetUserMedia` you are losing the logic from the Red5 Pro WebRTC SDK that attempts to pick the optimal resolution supported by your browser. **Use with descretion.**

> To read more about `getUserMedia` please read the following document from Mozilla Developer Network: [https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

# Events

The `WHIPClient` included in the SDK is an event emitter that provides a basic API to subscribe and unsubscribe to events either by name or by wildcard.

To subscribe to all events from a publisher:

```js
const handlePublisherEvent = (event) => {
  // The name of the event:
  const { type } = event
  // The dispatching publisher instance:
  const { publisher } = event
  // Optional data releated to the event (not available on all events):
  const { data } = event
}

const publisher = new WHIPClient()
publisher.on('*', handlePublisherEvent)
```

> The `*` type assignment is considered a "Wildcard" subscription - all events being issued by the publisher instance will invoke the assign event handler.

To unsubscribe to all events from a publisher after assinging an event handler:

```js
publisher.off('*', handlePublisherEvent)
```

The following sections of this document describe the event types that can also be listened to directly, instead of using the `*` wildcard.

You can also listen to events individually. The following describe the various events that can be listened for on the `WHIPClient` and enumerated on the `PublisherEventTypes` object:

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `CONNECT_SUCCESS` | 'Connect.Success' | When the publisher has established a required remote connection, such as to a WebSocket or RTMP-based server. |
| `CONNECT_FAILURE` | 'Connect.Failure' | When the publisher has failed to establish a required remote connection for streaming. |
| `PUBLISH_START` | 'Publish.Start' | When the publisher has started a broadcast stream. |
| `PUBLISH_FAIL` | 'Publish.Fail' | When the publisher has failed to start a broadcast stream. |
| `PUBLISH_INVALID_NAME` | 'Publish.InvalidName' | When the publisher is rejected from starting a broadcast stream because the `streamName` provided is already in use. |
| `UNPUBLISH_SUCCESS` | 'Unpublish.Success' | When the publisher has successfully closed an active broadcast stream. |
| `PUBLISH_METADATA` | 'Publish.Metadata' | When the publisher receives metadata from the server. |
| `PUBLISH_STATUS` | 'Publish.Status' | When a status event of the publisher has been receieved from the server. |
| `PUBLISH_AVAILABLE` | 'Publish.Available' | When the publisher stream has become available on the origin server to be consumed. This will follow the connection setup and `Publish.Start` event. |
| `PUBLISH_INSUFFICIENT_BANDWIDTH` | 'Publish.InsufficientBW' | When the current broadcast session is experiencing insufficient bandwidth conditions. |
| `PUBLISH_RECOVERING_BANDWIDTH` | 'Publish.RecoveringBW' | Then the current broadcast has updated information related to bandwidth condition recovery. |
| `PUBLISH_SUFFICIENT_BANDWIDTH` | 'Publish.SufficientBW' | When the current broadcast session has sufficient bandwidth conditions from previously experiencing network issues. |
| `CONNECTION_CLOSED` | 'Publisher.Connection.Closed' | Invoked when a close to the connection is detected. |
| `DIMENSION_CHANGE` | 'Publisher.Video.DimensionChange' | Notification when the Camera resolution has been set or change. |
| `STATISTICS_ENDPOINT_CHANGE` | 'Publisher.StatisticsEndpoint.Change' | Notification that the server has signaled a change in endpoint to deliver WebRTC Statistics based on RTCStatsReports. _Statistics are only reported after calling [monitorStats](#statistics)._ |

In addition to the above events, the following events are also dispatched from a `WHIPClient` and are defined on the `RTCPublisherEventTypes` enum:

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `CONSTRAINTS_ACCEPTED` | 'WebRTC.MediaConstraints.Accepted' | When constraints have been accepted from the internal request to `getUserMedia`. The `data` property of this event contains a `requested` object detailing the constraints used in the `getUserMedia` request and an `accepted` object which is the current constraint settings for the media. |
| `CONSTRAINTS_REJECTED` | 'WebRTC.MediaConstraints.Rejected' | Then constraints have been rejected from the internal request to `getUserMedia`. The `data` property of this event contains a `constraints` object detailing the constraints that were used and rejected from `getUserMedia`. |
| `MEDIA_STREAM_AVAILABLE` | 'WebRTC.MediaStream.Available' | When the negotation process has returned a `MediaStream` object to use. |
| `PEER_CONNECTION_AVAILABLE` | 'WebRTC.PeerConnection.Available' | When the negotation process has produced a valid `PeerConnection`. |
| `OFFER_START` | 'WebRTC.Offer.Start' | When the publisher requests to send an offer using a `SessionDescription` on the `PeerConnection`. |
| `OFFER_END` | 'WebRTC.Offer.End' | When the publisher has received an answer from the `SDP` offer on the `PeerConnection`. |
| `CANDIDATE_CREATE` | 'WebRTC.Candidate.Create' | When the publisher requests to send a candidate on the `PeerConnection`. |
| `CANDIDATE_RECEIVE` | 'WebRTC.Candidate.Receive' | When the publisher has received a candidate over the `PeerConnection`. |
| `ICE_TRICKLE_COMPLETE` | 'WebRTC.IceTrickle.Complete' | When the negotaiton process (a.k.a. trickle) has completed and the publisher will attempt at opening a broadcast stream. |
| `DATA_CHANNEL_AVAILABLE` | 'WebRTC.DataChannel.Available' |  the underlying `RTCDataChannel` is available when `signalingSocketOnly` configuration is used. |
| `DATA_CHANNEL_OPEN` | 'WebRTC.DataChannel.Open' | When the underlying `RTCDataChannel` is opened when `signalingSocketOnly` configuration is used.
| `DATA_CHANNEL_CLOSE` | 'WebRTC.DataChannel.Close' | When the underlying `RTCDataChannel` is closed when `signalingSocketOnly` configuration is used. |
| `DATA_CHANNEL_ERROR` | 'WebRTC.DataChannel.Error' | When an error has occurred within the underlying `RTCDataChannel` when `signalingSocketOnly` configuration is used. |
| `DATA_CHANNEL_MESSAGE` | 'WebRTC.DataChannel.Message' | When a message has been delivered over the underlying `RTCDataChannel` when `signalingSocketOnly` configuration is used. |
| `STATS_REPORT` | 'WebRTC.Stats.Report' | An RTCStatsReport has been captured by the WebRTC client based on configurations from calling [monitorStats](#statistics). |

# Statistics

With the `15.0.0` release of the SDK, we introduced statistics monitoring for `WHIPClient` to support the ability to monitor and POST statistics report data based on the underlying `RTCPeerConnection` of the client.

## Stats Configuration

The configuration used for statistics monitoring has the following structure:

```js
{
  // Optional.
  // If provided, it will POST stats to this endpoint.
  // If undefined, it will post stats to message transport.
  // If null, it will only emit status events.
  endpoint: undefined,
  additionalHeaders: undefined,
  interval: 5000, // Interval to poll stats, in milliseconds.
  include: [], // Empty array allows SDK to be judicious about what stats to include.
}
```

### endpoint

* If the `endpoint` is defined, the SDK will attempt to make `POST` requests with a JSON body representing each individual report.
* If the `endpoint` is left `undefined`, the SDK will post metadata with type `stats-report` on the underlying message transport (DataChannel) if available.
* If the `endpoint` is set to `null`, the SDK will only emit events with the metadata on the `WebRTC.StatsReport` event.

### additionalHeaders

By default, if an `endpoint` is defined, the `POST` request body will be in JSON and have the `{ 'Content-Type': 'application/json' }` header set. If requirements - such as authentication - are required, a map of additional headers can be provided to be sent along with the request.

### interval

The polling interval (in milliseconds) to access the `RTCStatsReport` from the underlying `RTCPeerConnection` of the publisher client.

### include

An array of static type strings. These directly map to the listing of type available for `RTCStatsReport` objects. If left empty or undefined, the SDK will report the statistics it deems suitable for tracking proper broadcast conditions.

e.g.,
```js
include: ['outbound-rtp', 'transport']
```

> More information about the statistic types are available at [https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport#the_statistic_types](https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport#the_statistic_types)

## Invocation

To start statistics monitoring, you have a couple of options:

* You can provide a `stats` attribute with the [stats configuration object](#stats-configuration) to the [init configuration](#webrtc-configuration-parameters).
* You can call `monitorStats` on the publisher client with the optional [stats configuration object](#stats-configuration) parameter.

> Additionally, you can stop monitoring by calling `unmonitorStats` on the publisher client.

## Additional Information

Attached to the metadata that is reported are additional properties that pertain to the publisher client.

As well, Along with the metadata releated to the `RTCStatsReport` objects emitted by the underlying `RTCPeerConnection`, the statistics monitoring also sends out a few event and action metadata related to the operation of a publisher client.

> See the following section for examples.

## Example of Statistics Metadata

The following is an example of a statistics metadata that is emitted in a `WebRTC.StatsReport` event and POSTed to any defined optional endpoint:

```json
{
  "name": "RTCPublisherStats",
  "created": 1758037554636,
  "device": {
    "browser": "chrome",
    "version": 140,
    "appVersion": "5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
    "platform": "MacIntel",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
    "vendor": "Google Inc."
  },
  "client": {
    "enabled": true,
    "endpoint": null,
    "host": "myred5.deploy",
    "app": "live",
    "streamName": "todd"
  },
  "type": "stats-report",
  "timestamp": 1758037561373,
  "data": {
    "type": "outbound-rtp",
    "kind": "video",
    "codecId": "COT01_96_level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f;sps-pps-idr-in-keyframe=1",
    "mediaType": "video",
    "active": true,
    "bytesSent": 212534,
    "packetsSent": 245,
    "firCount": 0,
    "pliCount": 3,
    "frameWidth": 640,
    "frameHeight": 360,
    "framesEncoded": 128,
    "framesPerSecond": 29,
    "framesSent": 128,
    "keyFramesEncoded": 4,
    "qualityLimitationReason": "bandwidth",
    "qualityLimitationDurations": {
      "bandwidth": 4.734,
      "cpu": 0,
      "none": 0.004,
      "other": 0
    },
    "estimatedBitrate": 435
  }
}
```

# Stream Manager 2.0

> This section provides information that relate to the release of Stream Manager 2.0 and its integration with WHIP/WHEP clients.

The Stream Manager 2.0 simplifies the proxying of web clients to Origin and Edge nodes. As such, an initialization configuration property called `endpoint` was added to the WebRTC SDK. This `endpoint` value should be the full URL path to the proxy endpoint on the Stream Manager as is used as such:

## WHIP Proxy

```javascript
const host = 'my-deployment'
const streamName = 'mystream'
const nodeGroup = 'my-node-group'
const endpoint = `https://${host}/as/v1/proxy/whip/live/${streamName}`
const config = {
  endpoint,
  streamName,
  connectionParams: {
    nodeGroup
  },
  // additional configurations
}
const publisher = await new WHIPClient().init(config)
publisher.on('*', (event) => console.log(event))
await publisher.publish()
```

## WHEP Proxy

```javascript
const host = 'my-deployment'
const streamName = 'mystream'
const nodeGroup = 'my-node-group'
const endpoint = `https://${host}/as/v1/proxy/whep/live/${streamName}`
const config = {
  endpoint,
  streamName,
  connectionParams: {
    nodeGroup
  },
  // additional configurations
}
const subscriber = await new WHEPClient().init(config)
subscriber.on('*', (event) => console.log(event))
await subscriber.subscribe()
```

There are a few things to note here:

* The difference of `/whip` and `/whep` in the URI for the endpoint calls between `WHIPClient` and `WHEPClient`, respecively.
* The requirement of a `nodeGroup` connection parameter that is the target nodegroup within your Stream Manager deployment on which you want to proxy the WHIP/WHEP client(s).
