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
* [Capture timestamp pins](#capture-timestamp-pins)
* [Send timing diagnostics](#send-timing-diagnostics)
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
  },
  // Optional: internally managed MOQMessageChannel
  messageChannel: {
    enabled: true,
    mode: 'shared', // 'shared' reuses publisher connection, 'sidecar' uses separate connection
    dataChannelConfiguration: {
      name: 'red5pro',
      keepEcho: false
    }
  }
})

await publisher.publish()
```

To stop publishing:

```js
await publisher.unpublish()
```

`unpublish()` retires the current publish generation immediately and aborts any in-flight WebTransport handshake / `connect()`, so Stop does not wait for a hung relay connection. The in-flight `publish()` promise rejects without a `Publish.Fail` event; teardown still emits `Unpublish.Success`.

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
| `messageChannel` | [-] | `{ enabled: false, mode: 'shared' }` | Optional internally managed `MOQMessageChannel`. `mode: 'shared'` reuses publisher's `MoqtConnection`; `mode: 'sidecar'` creates a separate MoQT session for messaging. |
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

### Managed MessageChannel notes

- `messageChannel.enabled: true` makes `MOQPublisher` create/manage a channel during `publish()` and close it during `unpublish()`.
- `mode: 'shared'`:
  - reuses the active publisher `MoqtConnection`
  - useful to keep media + messaging on one transport/session
  - supports troubleshooting same-connection behavior under load
- `mode: 'sidecar'`:
  - creates a second `MoqtConnection` only for messaging
  - helps isolate transport contention from media publishing
- `messageChannel.dataChannelConfiguration` supports the same semantics as standalone `MOQMessageChannel` (for example `name`, `clientId`, `keepEcho`, `unreliable`).
- In `sidecar` mode, messaging endpoint fields may be overridden under `messageChannel` (`endpoint`, `host`, `protocol`, `port`, `certKey`, `draftVersion`, `connectionParams`, `app`, `streamName`); otherwise publisher values are used.

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
| `PUBLISH_FAIL` | `Publish.Fail` | Publishing failed. Payload includes `error` and `terminal` (`true` when setup cannot continue, for example when `MediaStreamTrackProcessor` is unavailable). |
| `UNPUBLISH_SUCCESS` | `Unpublish.Success` | Unpublish completed. |

### MOQ-specific events (`MOQPublisherEventTypes`)

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `CONSTRAINTS_ACCEPTED` | `MOQ.MediaConstraints.Accepted` | Media constraints accepted. |
| `CONSTRAINTS_REJECTED` | `MOQ.MediaConstraints.Rejected` | Media constraints rejected. |
| `MEDIA_STREAM_AVAILABLE` | `MOQ.MediaStream.Available` | Local `MediaStream` became available. |
| `NAMESPACE_PUBLISHED` | `MOQ.Namespace.Published` | Namespace announce/publish completed. |
| `CATALOG_PUBLISHED` | `MOQ.Catalog.Published` | Catalog tracks announced to the session. |
| `RELAY_SUBSCRIBE` | `MOQ.Relay.Subscribe` | Relay requested a known track subscription. |
| `RELAY_SUBSCRIBE_FAILED` | `MOQ.Relay.Subscribe.Failed` | Relay requested unknown or rejected track. |
| `RELAY_MESSAGE` | `MOQ.Relay.Message` | Relay control message received. |
| `RELAY_ERROR` | `MOQ.Relay.Error` | Relay/session error reported. |
| `RELAY_CLOSE` | `MOQ.Relay.Close` | Relay/session closed. |
| `ENCODER_ERROR` | `MOQ.Encoder.Error` | Encoder or capture pipeline error. Payload includes `encoder` (`media` / `video` / `audio` / `catalog`), `error` (message), and `terminal` (`true` when publish setup cannot continue). Missing `MediaStreamTrackProcessor` emits `{ encoder: 'media', code: 'MEDIA_STREAM_TRACK_PROCESSOR_UNAVAILABLE', feature: 'MediaStreamTrackProcessor', terminal: true }` and then `PUBLISH_FAIL`. |
| `SEND_STATS` | `MOQ.Send.Stats` | Per-track send counters after a media object is published. Payload includes `trackName`, `role`, role-specific counters (`videoFrames`/`keyframeCount` or `audioChunks`), send-timing fields (see **Send timing diagnostics** below), a `tracks` snapshot keyed by track name with the same per-track fields, and capture-pin fields (see **Capture timestamp pins** below). |
| `TIMESTAMP_PINNED` | `MOQ.Timestamp.Pinned` | Fired once when both audio and video capture clocks have been pinned and the video warm-up has finished. Same pin-field shape as `SEND_STATS`. |
| `TIMESTAMP_REPINNED` | `MOQ.Timestamp.Repinned` | A capture offset was corrected by ≥100ms after objects of that kind were already sent. Payload adds `track` (`'audio'` / `'video'`) and `correctionMs` to the pin fields. For video, the SDK forces a keyframe so the corrected timeline starts on a new group. |
| `CAPTURE_COLD_START` | `MOQ.Capture.ColdStart` | Fired once per kind when that kind's first capture sample reached the SDK at least 500ms late, typically a camera waking from idle. The correction is already applied. Payload: `track`, `lateByMs`, `timeToFirstFrameMs`, `beforeFirstSend`, `audioCorrectionMs`, `videoCorrectionMs`. |
| `MESSAGE_CHANNEL_OPEN` | `MOQ.MessageChannel.Open` | Managed `MOQMessageChannel` opened successfully. |
| `MESSAGE_CHANNEL_SEND` | `MOQ.MessageChannel.Send` | Managed `MOQMessageChannel` sent a message/data payload. |
| `MESSAGE_CHANNEL_RECEIVE` | `MOQ.MessageChannel.Receive` | Managed `MOQMessageChannel` received a message/data payload. |
| `MESSAGE_CHANNEL_CLOSE` | `MOQ.MessageChannel.Close` | Managed `MOQMessageChannel` closed. |
| `MESSAGE_CHANNEL_FAIL` | `MOQ.MessageChannel.Fail` | Managed `MOQMessageChannel` failed to open. |
| `MESSAGE_CHANNEL_ERROR` | `MOQ.MessageChannel.Error` | Managed `MOQMessageChannel` reported an error. |
| `STATS_REPORT` | `MOQ.Stats.Report` | Stats report emitted when monitoring is enabled. |

Managed MessageChannel events include metadata in `event.data`:

- `transport`: `'moq'`
- `mode`: `'shared' | 'sidecar'`
- `label`: configured channel label (`dataChannelConfiguration.name`)
- `streamName`: configured stream name used by the managed channel
- `configuredClientId`: configured sender identity if provided
- `event`: original underlying `MessageChannel` event payload

### Capture timestamp pins

LOC capture timestamps are Unix-epoch microseconds. Each media kind (audio, video) maps its WebCodecs timestamps to wall clock with its own offset, because browsers often use different timestamp bases for audio and video.

The first capture observation of a kind sets that offset. Every later capture observation can only **lower** it: the SDK keeps the smallest `wall − timestamp` it has seen. A sample that reaches the SDK late (for example, the first frame from a camera that was idle) would otherwise push that kind's stamps ahead of real time for the whole broadcast, and subscribers would hold that kind back by the same amount.

When the stream has video, the first 5 video frames are observed but not encoded. This warm-up lets the offset settle before any video object is stamped, and the first encoded frame is a keyframe. If a correction of 100ms or more happens after objects of that kind were sent, the SDK emits `TIMESTAMP_REPINNED` and, for video, forces a keyframe.

Pins, corrections, and the warm-up reset on each `start()`.

`TIMESTAMP_PINNED`, `TIMESTAMP_REPINNED`, and `SEND_STATS` share these fields:

| Field | Meaning |
| :--- | :--- |
| `audioPin` / `videoPin` | First capture observation per kind: `{ wallUs, mediaTimestampUs, offsetUs }`, or `null`. |
| `audioCorrectionMs` / `videoCorrectionMs` | Total amount the offset has been lowered since the first observation. Large values mean the first sample arrived late; the correction is already applied. |
| `pinSeverity` | Based on the larger correction: `ok` (<200ms), `warn` (≥200ms), `error` (≥1500ms). `null` until a kind has pinned. Describes the capture condition, not remaining A/V error. |
| `pinSkewMs` | `(videoPin.wallUs − audioPin.wallUs)` in milliseconds: when each kind was first observed. Informational. `null` until both kinds have pinned. |

```js
publisher.on(MOQPublisherEventTypes.TIMESTAMP_PINNED, event => {
  const { videoCorrectionMs, audioCorrectionMs, pinSeverity } = event.data
})
publisher.on(MOQPublisherEventTypes.TIMESTAMP_REPINNED, event => {
  const { track, correctionMs } = event.data
})
```

#### Cold capture start

`CAPTURE_COLD_START` reports a first sample that reached the SDK late by at least 500ms. The SDK only detects this once a fresher sample arrives to compare against, so video is checked when its warm-up ends, before any video object is sent. Audio is checked whenever its correction first crosses the threshold.

| Field | Meaning |
| :--- | :--- |
| `track` | `'video'` or `'audio'`. |
| `lateByMs` | How late the first sample arrived (the kind's total correction). |
| `timeToFirstFrameMs` | From capture start to the first sample of that kind. |
| `beforeFirstSend` | `true` when the correction landed before any object of that kind was sent, so subscribers never saw the bad stamps. |
| `audioCorrectionMs` / `videoCorrectionMs` | Both kinds' corrections at that moment. A large video value with small audio means the stall was in video capture specifically, not a busy page. |

A camera that is only slow to *start* (late but fresh first frame) does not trigger this event; it causes no timestamp error.

```js
publisher.on(MOQPublisherEventTypes.CAPTURE_COLD_START, event => {
  const { track, lateByMs, beforeFirstSend } = event.data
})
```

### Send timing diagnostics

Each track in `SEND_STATS` (top-level for the emitting track, and in every `tracks` entry) reports:

| Field | Meaning |
| :--- | :--- |
| `sendLatencyMs` | Wall clock minus the object's LOC capture timestamp at hand-off to the transport. Covers encode time plus SDK queue wait. `null` before the first send. |
| `minSendLatencyMs` | Lowest `sendLatencyMs` since `start()`. |
| `queueDepth` | Objects waiting in the SDK send queue for this track. |
| `encoderQueueDepth` | Frames waiting inside the WebCodecs encoder (`encodeQueueSize`). |

Compare audio and video to diagnose A/V offset seen by all subscribers:

- Video `sendLatencyMs` well **below zero**: video capture timestamps are ahead of real time. The SDK corrects late first samples automatically (see **Capture timestamp pins**), so a value that stays negative after the first few seconds is unexpected and worth reporting. `minSendLatencyMs` keeps the lowest value since `start()`, so it can stay negative after a `TIMESTAMP_REPINNED` correction.
- Video `sendLatencyMs` **seconds above** audio: video is delivered late even though its stamps are correct. A high `queueDepth` points at transport backpressure; a high `encoderQueueDepth` points at a slow encoder.
- Both near audio: the publisher is not the source; check subscriber-side playback sync.

```js
publisher.on(MOQPublisherEventTypes.SEND_STATS, event => {
  const { trackName, sendLatencyMs, minSendLatencyMs, queueDepth, encoderQueueDepth } = event.data
})
```

# Statistics

`MOQPublisher` supports the same stats pattern as other SDK clients:

```js
publisher.monitorStats({
  interval: 5000
})
```

You can also provide `stats` directly in `init()` options to start monitoring automatically once publishing starts.
