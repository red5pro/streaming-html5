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
  },
  bandwidth: {
    audio: 56,
    video: 3000
  },
  // Optional: publish a 3-rung video ladder (source + 2 generated tracks)
  simulcast: {
    enabled: true,
    rungs: 3
    // Or explicit variants (index 0 kept as original track; 1..n generated):
    // rungs: [
    //   { width: 1280, height: 720, fps: 60, bitrate: 3000 },
    //   { width: 640, height: 360, fps: 30, bitrate: 1500 },
    //   { width: 320, height: 180, fps: 15, bitrate: 750 }
    // ]
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
| `maxVideoQueue` | [-] | `120` | Max queued encoded video chunks per track before shed policy. |
| `maxAudioQueue` | [-] | `240` | Max queued encoded audio chunks per track before shed policy. |
| `simulcast` | [-] | `{ enabled: false, rungs: 3 }` | Optional simulcast ladder. When `enabled`, `rungs` is either a count (`1..3`) or an explicit `SimulcastVariant[]`. Source/captured video is always the top rung; lower rungs are generated (auto: ½ resolution/bitrate each step, and ½ fps when top FPS ≥ 60). |
| `stats` | [-] | `undefined` | Optional stats monitor configuration. |
| `connectionParams` | [-] | `undefined` | Additional params used for stats metadata and endpoint context. |
| `moqtLogLevel` | [-] | `none` | Log level passed to MOQ components. |

`*` Required when `endpoint` is not provided.

### Simulcast notes

- `simulcast.rungs` may be:
  - a `number` (clamped to `1..3`) for automatic ladder generation
  - a `SimulcastVariant[]` (`{ width, height, fps, bitrate }`, bitrate in kbps) for an explicit ladder
- With an explicit array, index `0` is **not generated** — the original source track is kept as `video-0`. Entries `1..n-1` are generated. Top-tier encode fps/bitrate may still come from index `0`.
- `rungs: 1` / a single-variant array skips generation (single source track only).
- Lower rungs are produced with `OffscreenCanvas` + `MediaStreamTrackGenerator` and published as additional catalog video tracks (`video-0`, `video-1`, …).
- Additional non-ladder video tracks already present on the input stream (for example screenshare) are preserved after the ladder tracks.
- Requires Chromium insertable-streams APIs (`MediaStreamTrackProcessor` / `MediaStreamTrackGenerator`).

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
