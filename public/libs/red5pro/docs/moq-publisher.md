<h3 align="center">
  <img src="../assets/Red5_Truetime_black.png" alt="Red5 Pro Logo" height="65" />
</h3>
<p align="center">
  <a href="../README.md">Quick Start</a> &bull;
  <a href="#">MOQ Publishing</a> &bull;
  <a href="moq-subscriber.md">MOQ Subscribing</a> &bull;
  <a href="moq-catalog.md">MOQ Catalog</a> &bull;
  <a href="whip-client.md">WHIP/WHEP Docs</a>
</p>

---

# MOQPublisher

When you want to publish media over Media over QUIC (MoQ), the SDK provides `MOQPublisher`.

`MOQPublisher` captures media (`getUserMedia` by default, or your own stream), connects to a MOQ relay over WebTransport, publishes a namespace, and serves encoded tracks and catalog data to subscriber requests.

* [Usage](#usage)
* [Init Configuration](#init-configuration)
* [Events](#events)
* [Statistics](#statistics)

# Usage

There are two options to start a `MOQPublisher`:

1. Construct with a MOQ URL (auto init and publish).
2. Construct with no URL, then call `init()` and `publish()`.

## Using init() and publish()

```js
const { MOQPublisher, PublisherEventTypes, MOQPublisherEventTypes } = red5prosdk

const publisher = new MOQPublisher()
publisher.on('*', event => {
  console.log(event.type, event.data)
})

await publisher.init({
  endpoint: 'https://relay.example.com:4433',
  namespace: 'live/mystream',
  mediaElementId: 'red5pro-publisher',
  mediaConstraints: {
    audio: true,
    video: true
  }
})

await publisher.publish()
```

To stop publishing:

```js
await publisher.unpublish()
```

## Constructing with URL

Passing a URL to the constructor triggers internal init + publish automatically.

```js
const publisher = new MOQPublisher(
  'https://relay.example.com:4433/live/mystream',
  document.getElementById('red5pro-publisher'),
  {
    namespace: 'live/mystream'
  }
)
```

# Init Configuration

The `init()` call accepts `MOQPublisherConfigType`.

| Property | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `endpoint` | [-] | `undefined` | Full MOQ relay URL. If omitted, SDK uses `protocol://host:port`. |
| `host` | [x]* | `undefined` | Relay host when `endpoint` is omitted. |
| `streamName` | [x]* | `undefined` | Stream name used for namespace derivation and stats metadata. |
| `protocol` | [x] | `https` | Relay protocol (`ws`, `wss`, `http`, `https`). |
| `port` | [x] | `4433` | Relay port. |
| `app` | [x] | `live` | App scope used in namespace fallback. |
| `namespace` | [-] | `app/streamName` | MOQ namespace to publish. |
| `draftVersion` | [-] | auto | MoQ transport draft version. |
| `certKey` | [-] | `undefined` | Certificate hash input for WebTransport setup. |
| `keyFramerate` | [-] | `2000` | Keyframe interval in milliseconds. |
| `bandwidth` | [-] | `{ audio: 56, video: 750 }` | Target encode bandwidth settings. |
| `mediaConstraints` | [x] | camera+mic defaults | Constraints for SDK-managed `getUserMedia`. |
| `onGetUserMedia` | [-] | `undefined` | Optional override to provide your own media stream acquisition. |
| `videoEncoding` | [-] | `H264` | Video codec (`PublishVideoEncoder`). |
| `audioEncoding` | [-] | `OPUS` | Audio codec (`PublishAudioEncoder`). |
| `mediaElementId` | [-] | `red5pro-publisher` | Preview element id for local media display. |
| `clearMediaOnUnpublish` | [-] | `true` | Stop preview stream tracks on unpublish. |
| `stats` | [-] | `undefined` | Optional stats monitor configuration. |
| `connectionParams` | [-] | `undefined` | Additional params used for stats metadata and endpoint context. |
| `moqtLogLevel` | [-] | `none` | Log level passed to MOQ components. |

`*` Required when `endpoint` is not provided.

# Events

`MOQPublisher` is an event emitter. You can subscribe with wildcard (`*`) or by specific event name.

```js
const onPublisherEvent = event => {
  const { type, publisher, data } = event
  console.log(type, publisher, data)
}

publisher.on('*', onPublisherEvent)
// later
publisher.off('*', onPublisherEvent)
```

### Core publish lifecycle events (`PublisherEventTypes`)

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `PUBLISH_START` | `Publish.Start` | Publishing has started. |
| `PUBLISH_FAIL` | `Publish.Fail` | Publishing failed. |
| `UNPUBLISH_SUCCESS` | `Unpublish.Success` | Unpublish completed. |

### MOQ-specific events (`MOQPublisherEventTypes`)

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `CONSTRAINTS_ACCEPTED` | `MOQ.MediaConstraints.Accepted` | Media constraints accepted. |
| `CONSTRAINTS_REJECTED` | `MOQ.MediaConstraints.Rejected` | Media constraints rejected. |
| `MEDIA_STREAM_AVAILABLE` | `MOQ.MediaStream.Available` | Local `MediaStream` became available. |
| `NAMESPACE_PUBLISHED` | `MOQ.Namespace.Published` | Namespace announce/publish completed. |
| `RELAY_SUBSCRIBE` | `MOQ.Relay.Subscribe` | Relay requested a known track subscription. |
| `RELAY_SUBSCRIBE_FAILED` | `MOQ.Relay.Subscribe.Failed` | Relay requested unknown or rejected track. |
| `RELAY_MESSAGE` | `MOQ.Relay.Message` | Relay control message received. |
| `RELAY_ERROR` | `MOQ.Relay.Error` | Relay/session error reported. |
| `RELAY_CLOSE` | `MOQ.Relay.Close` | Relay/session closed. |
| `ENCODER_ERROR` | `MOQ.Encoder.Error` | Encoder or capture pipeline error. |
| `SEND_STATS` | `MOQ.Send.Stats` | Per-track send counters after a media object is published. Payload includes `trackName`, `role`, role-specific counters (`videoFrames`/`keyframeCount` or `audioChunks`), and a `tracks` snapshot keyed by track name with the same role-specific shape. |
| `STATS_REPORT` | `MOQ.Stats.Report` | Stats report emitted when monitoring is enabled. |

# Statistics

`MOQPublisher` supports the same stats pattern as other SDK clients:

```js
publisher.monitorStats({
  interval: 5000
})
```

You can also provide `stats` directly in `init()` options to start monitoring automatically once publishing starts.
