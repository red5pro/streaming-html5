<h3 align="center">
  <img src="../assets/Red5_Truetime_black.png" alt="Red5 Pro Logo" height="65" />
</h3>
<p align="center">
  <a href="../README.md">Quick Start</a> &bull;
  <a href="whip-client.md">Publishing</a> &bull;
  <a href="#">Subscribing</a>
</p>

---

# WHEPClient

When it comes time to subscribe to a live stream from your Red5 Server deployment, the SDK provides the WebRTC-based `WHEPClient`.

The `WHEPClient` - under the hood - is based on the [WebRTC-HTTP egress](https://www.ietf.org/archive/id/draft-ietf-wish-whep-03.html)(WHEP) protocol providing the ability to negotation and establish a connection using HTTP/S requests. This removes the requirement for a WebSocket, which historically has been used for the role of negotiation and connection.

This provides a standardized - and _blazingly fast_ - way to establish and playback a live stream using WebRTC.

* [Usage](#usage)
* [Init Configuration](#init-configuration)
* [Events](#events)
* [Statistics](#statistics)
* [Live Seek](#live-seek)
* [Stream Manager 2.0](#stream-manager-20)

# Usage

There are two options to initiate a `WHEPClient`:

1. From instantiation with a full WHEP endpoint URL (if known).
2. From an `init()` call on this instance with an init configuration object.

> If using the second option (most widely used), the SDK will properly construct the endpoints required for negotiation and streaming.

## Providing a WHEP endpoint

If you want to allow the usual default configuration properties of a subscriber client (of which the `WHEPClient` is an extension), you can simply provide the **WHEP** endpoint and target media element to the constructor of `WHEPClient`:

```js
const whepEndpoint =
  'https://yourred5pro.com/live/whep/endpoint/stream1'

const additionalOptions = {...}

const subscriber = new WHEPClient(
  whepEndpoint,
  document.querySelector('#red5pro-subscriber'),
  additionalOptions
)
subscriber.on('*', (event) => console.log(event))
```

When providing the endpoint, the _optional_ target media element and the _optional_ additional init configuration properties in the constructor for `WHEPClient`, the SDK will automatically start the connection calls and continue on to playback once available.

The construction of the **WHEP** endpoint URL is the following when integrating with a standalone deployment of the Red5 Server:

```sh
https://<your server deployment FQDN>/<app scope>/whep/endpoint/<stream name>
```

When integrating with a Red5 Cloud deployment (using autoscaling and the Stream Manager), the **WHEP** endpoint will have the following structure:

```sh
https://<your cloud deployment FQDN>/as/v1/proxy/whep/<app scope>/<stream name>
```

Where:

- `your deployment FQDN` - the host endpoint of your deployment.
- `app scope` - the target webapp scope to stream to. Typically `live`.
- `stream name` - the name of the stream to subscribe to.

> It is important to note that in using the **WHEP** endpoint as such, the `WHEPClient` will attempt its own playback - you do not have to make an additional `subscribe()` call.

## Using Init with a Configuration

If not using the first option of providing a **WHEP** endpoint in the constructor, you would simply instantiate the `WHEPClient` and use the `init()` and `subscribe()` calls to establish a connection and playback:

```js
try {
    const subscriber = new WHEPClient()
    subscriber.on('*', , (event) => console.log(event))

    // See next section: Init Configuration, for more details.
    await subscriber.init(configuration)
    await subscriber.subscribe()
} catch (error) {
    // Something went wrong...
}
```

> Note: If integrating with Red5 Cloud deployment with Stream Manager, you will need to provide an `endpoint` init configuration property. More details in next section of this document.

# Init Configuration

When using the `init()` call of a `WHEPClient` - or, alternatively, when using a **WHEP** endpoint with additional options in the constructor - the following initialization properties are available:

| Property | Required | Default | Description |
| :--- | :---: | :--- | :--- |
| `host` | [x] | *None* | The IP or address that the WebSocket server resides on. |
| `streamName` | [x] | *None* | The name of the stream to subscribe to. |
| `protocol` | [x] | `https` | The protocol of the host for the signaling communication. |
| `port` | [x] | `443` | The port on the host that the Red5 server listens on; `5080` or `443` (insecure or secure, respectively). |
| `app` | [x] | `live` | The webapp context name that the stream is on. |
| `endpoint` | [-] | `undefined` | The full URL of the endpoint to stream to. **This is primarily used in Stream Manager 2.0 integration for clients.**
| `mediaElementId` | [-] | `red5pro-subscriber` | The target `video` or `audio` element `id` attribute which will display the stream. |
| `rtcConfiguration` | [-] | _Basic_ | The `RTCConfiguration` to use in setting up `RTCPeerConnection`. [RTCConfiguration](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary)|
| `includeDataChannel` | [-] | `true` | Flag to open a datachannel for messaging between server and client once connection is established.
| `dataChannelConfiguration` | [-] | `{name: "red5pro"}` | An object used in configuring a n `RTCDataChannel`. _Only used when `includeDataChannel` is defined as `true`_ |
| `iceTransport` | [-] | `UDP` | The transport type to use in ICE negotiation. Either `UDP` or `TCP` |
| `subscriptionId` | [x] | auto-generated | A unique string representing the requesting client. |
| `connectionParams` | [-] | `undefined` | An object of additional connection parameters to send to the server upon connection request. |
| `videoEncoding` | [-] | *None* | Specifies target video encoder. |
| `audioEncoding` | [-] | *None* | Specifies target audio encoder. |
| `muteOnAutoplayRestriction` | [-] | `true` | Flag to attempt to mute the `video` element when `autoplay` is restricted in the browser. [See section on Autoplay Restrictions](../articles/autoplay/autoplay_policy.md) |
| `buffer` | [-] | `0` | Request to set a buffer - in seconds - for playback.
| `maintainStreamVariant` | [-] | `false` | Flag to instruct the server - when utilizing transcoding - to not switch subscriber stream variants when network conditions change. By setting this to `true`, when you request to playback a stream that is transcoded, the server will not deliver a variant of higher or lower quality dependending on current network conditions. |
| `stats` | [-] | *None* | Configuration object to enable stats reporting. See [Stats Reporting](#statistics) for more information. |
| `liveSeek` | [-] | *None* | Configuration object to enable live seek capability. See [Live Seek](#live-seek) for more information. |

# Events

The `WHEPClient` included in the SDK is an event emitter that provides a basic API to subscribe and unsubscribe to events either by name or by wildcard.

To subscribe to all events from a subscriber:

```js
const handleSubscriberEvent = (event) => {
  // The name of the event:
  const { type } = event
  // The dispatching subscriber instance:
  const { subscriber } = event
  // Optional data releated to the event (not available on all events):
  const { data } = event
}

const subscriber = new WHEPClient()
subscriber.on('*', handleSubscriberEvent)
```

> The `*` type assignment is considered a "Wildcard" subscription - all events being issued by the subscriber instance will invoke the assign event handler.

To unsubscribe to all events from a subscriber after assinging an event handler:

```js
subscriber.off('*', handleSubscriberEvent)
```

The following sections of this document describe the event types that can also be listened to directly, instead of using the `*` wildcard.

You can also listen to events individually. The following describe the various events that can be listened for on the `WHEPClient` and enumerated on the `SubscriberEventTypes` object:

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `CONNECT_SUCCESS` | 'Connect.Success' | When the subscriber has established a required remote connection, such as to a WebSocket server. |
| `CONNECT_FAILURE` | 'Connect.Failure' | When the subscriber has failed to establish a required remote connection for consuming a stream. |
| `SUBSCRIBE_START` | 'Subscribe.Start' | When the subscriber has started a subscribing to a stream. |
| `SUBSCRIBE_STOP` | 'Subscribe.Stop' | When the subscriber has successfully closed an active subscription to a stream. |
| `SUBSCRIBE_METADATA` | 'Subscribe.Metadata' | When metadata is received on the client from the server. |
| `VIDEO_DIMENSIONS_CHANGE` | 'Subscribe.VideoDimensions.Change' | Invoked when `video` element has loaded metadata and the incoming stream dimensions are available. |
| `ORIENTATION_CHANGE` | 'Subscribe.Orientation.Change' | Invoked when an orientation change is detected in metadata. Mobile (iOS and Android) broadcasts are sent with an orientation. |
| `STREAMING_MODE_CHANGE` | 'Subscribe.StreamingMode.Change' | Invoked when the broadcast has "muted" either or both their video and audio tracks. |
| `VOLUME_CHANGE` | 'Subscribe.Volume.Change' | Invoked when a change to volume is detected during playback. _From 0 to 1._ |
| `PLAYBACK_TIME_UPDATE` | 'Subscribe.Time.Update' | Invoked when a change in playhead time is detected during playback. _In seconds._ |
| `PLAYBACK_STATE_CHANGE` | 'Subscribe.Playback.Change' | Invoked when a change in playback state has occured, such as when going from a `Playback.PAUSED` state to `Playback.PLAYING` state. |
| `FULL_SCREEN_STATE_CHANGE` | 'Subscribe.FullScreen.Change' | Invoked when a change in fullscreen state occurs during playback. |
| `AUTO_PLAYBACK_FAILURE` | 'Subscribe.Autoplay.Failure' | Invoked when an attempt to `autoplay` on a media element throws a browser exception; typically due to browser security restrictions and their autoplay policies. (WebRTC and HLS, only) [See section on Autoplay Restrictions](../articles/autoplay/autoplay_policy.md) |
| `AUTO_PLAYBACK_MUTED` | 'Subscribe.Autoplay.Muted' | Invoked when an attempt to `autoplay` on a media element throws a browser exception and is muted based on the `muteOnAutoplayRestriction` config property; typically due to browser security restrictions and their autoplay policies. (WebRTC and HLS, only) [See section on Autoplay Restrictions](../articles/autoplay/autoplay_policy.md) |

In addition to the above events, the following events are also dispatched from a `WHEPClient` and are defined on the `RTCSubscriberEventTypes` enum:

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `PEER_CONNECTION_AVAILABLE` | 'WebRTC.PeerConnection.Available' | When the negotation process has produced a valid `PeerConnection`. |
| `OFFER_START` | 'WebRTC.Offer.Start' | When the subscriber requests to start an offer on the `PeerConnection`. |
| `OFFER_END` | 'WebRTC.Offer.End' | When the subscriber has received a `SessionDescription` from a requested offer over the `PeerConnection`. |
| `ANSWER_START` | 'WebRTC.Answer.Start' | When the subscriber requests to send an answer on the `PeerConnection`. |
| `ANSWER_END` | 'WebRTC.Answer.End' | When the subscriber has received an answer (in form of a `MediaStream`) over the `PeerConnection`. |
| `CANDIDATE_CREATE` | 'WebRTC.Candidate.Create' | When the subscriber requests to send a candidate on the `PeerConnection`. |
| `CANDIDATE_RECEIVE` | 'WebRTC.Candidate.Receive' | When the subscriber has received a candidate over the `PeerConnection`. |
| `ICE_TRICKLE_COMPLETE` | 'WebRTC.IceTrickle.Complete' | When the negotaiton process (a.k.a. trickle) has completed and the subscriber will attempt at consuming a stream. |
| `ON_ADD_STREAM` | 'WebRTC.Add.Stream' | When a `MediaStream` object has become available for playback. |
| `TRACK_ADDED` | 'WebRTC.PeerConnection.OnTrack' | When a MediaTrack has become available on the underlying `RTCPeerConnection`. |
| `DATA_CHANNEL_AVAILABLE` | 'WebRTC.DataChannel.Available' |  the underlying `RTCDataChannel` is available when `includeDataChannel` configuration is used. |
| `DATA_CHANNEL_OPEN` | 'WebRTC.DataChannel.Open' | When the underlying `RTCDataChannel` is opened when `signalingServerOnly` configuration is used.
| `DATA_CHANNEL_CLOSE` | 'WebRTC.DataChannel.Close' | When the underlying `RTCDataChannel` is closed when `includeDataChannel` configuration is used. |
| `DATA_CHANNEL_ERROR` | 'WebRTC.DataChannel.Error' | When an error has occurred within the underlying `RTCDataChannel` when `includeDataChannel` configuration is used. |
| `DATA_CHANNEL_MESSAGE` | 'WebRTC.DataChannel.Message' | When a message has been delivered over the underlying `RTCDataChannel` when `includeDataChannel` configuration is used. |
| `HOST_ENDPOINT_CHANGED` | 'WebRTC.Endpoint.Changed' | Notification when the endpoint on which to signal and stream from has been asigned. |
| `SUBSCRIBE_STREAM_SWITCH` | 'WebRTC.Subscribe.StreamSwitch' | Notification when request to switch stream on the connection is completed. |
| `STATS_REPORT` | 'WebRTC.Stats.Report' | Notification of a statistics report generated from the stream connection. _Statistics are only reported based on the availability of `stats` on the init configuration or after calling [monitorStats](#statistics)._
| `LIVE_SEEK_UNSUPPORTED` | 'WebRTC.LiveSeek.Unsupported' | When `liveSeek` is specified but the browser does not support th integration of HLS.JS for Live VOD playback. |
| `LIVE_SEEK_ENABLED` | 'WebRTC.LiveSeek.Enabled' | When `liveSeek` is used to playback Live VOD and the HLS video has been loaded and available to seek. |
| `LIVE_SEEK_DISABLED` | 'WebRTC.LiveSeek.Disabled' | When `liveSeek` is used to playback Live VOD and HLS video has not been loaded nor available to seek. |
| `LIVE_SEEK_ERROR` | 'WebRTC.LiveSeek.Error' | When `liveSeek` is used to playback Live VOD and HLS video and an error in playback has occurred. Inspect the `error` attribute on the event for more details. |
| `LIVE_SEEK_LOADING` | 'WebRTC.LiveSeek.FragmentLoading' | When `liveSeek` is used to playback Live VOD and HLS video in currently loading a fragment during seeking. |
| `LIVE_SEEK_LOADED` | 'WebRTC.LiveSeek.FragmentLoaded' | When `liveSeek` is used to playback Live VOD and HLS video has completed loading a fragment during seeking. |
| `LIVE_SEEK_CHANGE` | 'WebRTC.LiveSeek.Change | When `liveSeek` is used, this event notifies on a change of state going from "live" to "vod" and vice versa.

# Statistics

With the `15.0.0` release of the SDK, we introduced statistics monitoring for `WHEPClient` to support the ability to monitor and POST statistics report data based on the underlying `RTCPeerConnection` of the client.

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

The polling interval (in milliseconds) to access the `RTCStatsReport` from the underlying `RTCPeerConnection` of the subscriber client.

### include

An array of static type strings. These directly map to the listing of type available for `RTCStatsReport` objects. If left empty or undefined, the SDK will report the statistics it deems suitable for tracking proper broadcast conditions.

e.g.,
```js
include: ['inbound-rtp', 'transport']
```

> More information about the statistic types are available at [https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport#the_statistic_types](https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport#the_statistic_types)

## Invocation

To start statistics monitoring, you have a couple of options:

* You can provide a `stats` attribute with the [stats configuration object](#stats-configuration) to the [init configuration](#webrtc-configuration-parameters).
* You can call `monitorStats` on the subscriber client with the optional [stats configuration object](#stats-configuration) parameter.

> Additionally, you can stop monitoring by calling `unmonitorStats` on the subscriber client.

## Additional Information

Attached to the metadata that is reported are additional properties that pertain to the subscriber client.

As well, Along with the metadata releated to the `RTCStatsReport` objects emitted by the underlying `RTCPeerConnection`, the statistics monitoring also sends out a few event and action metadata related to the operation of a subscriber client.

> See the following section for examples.

## Example of Statistics Metadata

The following is an example of a statistics metadata that is emitted in a `WebRTC.StatsReport` event and POSTed to any defined optional endpoint:

```json
{
  "name": "RTCSubscriberStats",
  "created": 1727789134165,
  "device": {
    "browser": "chrome",
    "version": 129,
    "appVersion": "5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
    "platform": "MacIntel",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
    "vendor": "Google Inc."
  },
  "client": {
    "enabled": true,
    "endpoint": null,
    "host": "myred5.deploy",
    "app": "live",
    "streamName": "stream1",
    "subscriptionId": "subscriber-922e"
  },
  "type": "stats-report",
  "timestamp": 1727789139169,
  "data": {
    "type": "inbound-rtp",
    "kind": "video",
    "codecId": "CIT01_102_level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f",
    "jitter": 0.005,
    "packetsLost": 0,
    "packetsReceived": 439,
    "bytesReceived": 412627,
    "firCount": 0,
    "frameWidth": 640,
    "frameHeight": 480,
    "framesDecoded": 143,
    "framesDropped": 0,
    "framesPerSecond": 30,
    "framesReceived": 143,
    "freezeCount": 0,
    "keyFramesDecoded": 3,
    "nackCount": 0,
    "pauseCount": 0,
    "pliCount": 0,
    "totalFreezesDuration": 0,
    "totalPausesDuration": 0,
    "estimatedBitrate": 660
  }
}
```

# Live Seek

Included in the SDK is the ability to subscribe to a live stream and provide capabilities to seek and playback to previous segments of the stream.

This capability is not inherent in browsers nor the live `MediaStream`. As such, this feature of "live seek" requires [HLS.JS](https://github.com/video-dev/hls.js/) as a dependency in order to load and playback historical HLS segments stored on the server or in cloud storage.

> This feature also requires some server-side configurations in order to capture and server HLS: [https://www.red5.net/docs/red5-pro/users-guide/dvr/](https://www.red5.net/docs/red5-pro/users-guide/dvr/)

## LiveSeekClient

To enable live seek capabilities for a live stream on the client-side, the SDK provides a `LiveSeekClient`. It is an extension of the `WHEPClient`, providing its familiar API and additional logic to be able to playback historical segments of a live stream by using playback controls and events.

This example demonstrates using the `LiveSeekClient` with its default configuration attributes:

```js
try {
    const subscriber = new LiveSeekClient()
    // Events related to live seek start with type: `WebRTC.LiveSeek`
    subscriber.on('*', , (event) => console.log(event))

    await subscriber.init({
      ...configuration,
      liveSeek: {
        baseURL: undefined, // Base endpoint URL to locate the associated m3u8 manifest. Undefined, will look for files on the `host`
        fullURL: undefined, // Full endpoint URL to locate the assocated m3u8 manifest. Undefined, will look for files on the `host`
        hlsjsRef: undefined, // Explicit reference to HLS.JS dependency. Undefined, the SDK will look for window.HLS
        hlsElement: undefined, // Explicit reference to the target video element to load the HLS stream. Undefined, the SDK will autogenerate one
        usePlaybackControlsUI: true, // Flag to use custom player controls from the SDK for scrubbing. False requires that you provide your own controls and interactive with the Playback API
        options: { debug: false, backBufferLength: 0 } // Options to provide to HLS.JS instance directly
      }
    })
    await subscriber.subscribe()
} catch (error) {
    // Something went wrong...
}
```

## LiveSeek Configuration

The `liveSeek` configuration object has the following signature:

```js
  baseURL: <string | undefinde>,
  fullURL: <string | undefined>,
  hlsjsRef: <hls.js reference | undefined>,
  hlsElement: <HTMLVideoElement | undefined>,
  usePlaybackControlsUI: <boolean>,
  options: <object | undefined>
```

### baseURL

- Base endpoint URL to locate the associated m3u8 manifest. If `undefined`, will look for files on the `host`.
- Default: `undefined`
- Example: `https://myserver.cloud/streams`

### fullURL

- Full endpoint URL to locate the assocated `m3u8` manifest. If `undefined`, will look for files on the `host`.
- Default: `undefined`
- Example: `https://mycdn.cloud/streams/mystream.m3u8`

### hlsjsRef

- Explicit reference to HLS.JS dependency. If `undefined`, the SDK will look for `window.HLS`.
- Default: `undefined`

### hlsElement

- Explicit reference to the target `video` element to load the HLS stream. If `undefined`, the SDK will autogenerate one.
- Default: `undefined`

### usePlaybackControlsUI

- Flag to use custom player controls UI from the SDK for scrubbing.
- Setting to `false` requires that you provide your own controls and interactive with the Playback API.
- Default: `true`

### options

- Options to provide to HLS.JS instance directly. _Please refer to [their documentation](https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning)_.
- Example: `{ debug: false, backBufferLength: 0 }`

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
