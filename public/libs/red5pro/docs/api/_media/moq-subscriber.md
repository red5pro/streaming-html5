<h3 align="center">
  <img src="../assets/Red5_Truetime_black.png" alt="Red5 Pro Logo" height="65" />
</h3>
<p align="center">
  <a href="../README.md">Quick Start</a> &bull;
  <a href="moq-publisher.md">MOQ Publishing</a> &bull;
  <a href="#">MOQ Subscribing</a> &bull;
  <a href="moq-catalog.md">MOQ Catalog</a> &bull;
  <a href="whep-client.md">WHIP/WHEP Docs</a>
</p>

---

# MOQSubscriber

When you want to play MoQ media streams in the browser, the SDK provides `MOQSubscriber`.

`MOQSubscriber` connects to a MOQ relay, receives catalog updates, chooses an internal render path (LOC/WebCodecs or CMAF/MSE), and provides playback and track-selection APIs.

* [Usage](#usage)
* [Init Configuration](#init-configuration)
* [Events](#events)
* [Playback API](#playback-api)
* [Statistics](#statistics)

# Usage

There are two options to start a `MOQSubscriber`:

1. Construct with a MOQ URL (auto init and subscribe).
2. Construct with no URL, then call `init()` and `subscribe()`.

## Using init() and subscribe()

```js
const { MOQSubscriber, MOQSubscriberEventTypes } = red5prosdk

const subscriber = new MOQSubscriber()
subscriber.on('*', event => {
  console.log(event.type, event.data)
})

await subscriber.init({
  endpoint: 'https://relay.example.com:4433',
  namespace: 'live/mystream',
  mediaElementId: 'red5pro-subscriber',
  prefetchCatalog: false,
  // Optional: internally managed MOQMessageChannel
  messageChannel: {
    enabled: true,
    mode: 'shared', // 'shared' reuses subscriber connection, 'sidecar' uses separate connection
    dataChannelConfiguration: {
      name: 'red5pro',
      keepEcho: false
    }
  }
})

await subscriber.subscribe()
```

To stop:

```js
await subscriber.unsubscribe()
```

`unsubscribe()` aborts any in-flight WebTransport handshake / `MoqtPlayer.load()` immediately, so Stop does not wait for a hung relay connection. An in-flight `subscribe()` promise rejects without `Subscribe.Fail`; teardown still emits `Subscribe.Stop` when the stop was user-initiated.

## Constructing with URL

Passing a URL to the constructor triggers internal init + subscribe automatically.

```js
const subscriber = new MOQSubscriber(
  'https://relay.example.com:4433/live/mystream',
  document.getElementById('red5pro-subscriber'),
  { namespace: 'live/mystream' }
)
```

# Init Configuration

The `init()` call accepts `MOQSubscriberConfigType`.

| Property | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `endpoint` | [-] | `undefined` | Full MOQ relay URL. If omitted, SDK uses `protocol://host:port`. |
| `host` | [x]* | `undefined` | Relay host when `endpoint` is omitted. |
| `streamName` | [x]* | `undefined` | Stream name used for namespace derivation. |
| `namespace` | [-] | `app/streamName` | Namespace to subscribe from. |
| `protocol` | [x] | `https` | Relay protocol (`ws`, `wss`, `http`, `https`). |
| `port` | [x] | `4433` | Relay port. |
| `app` | [x] | `live` | App scope for namespace fallback. |
| `mediaElementId` | [-] | `red5pro-subscriber` | Target render element id. |
| `canvasElementId` | [-] | `undefined` | Optional canvas element id used by LOC rendering path. |
| `videoAudioElementId` | [-] | `undefined` | Optional media element id used by alternate paths. |
| `draftVersion` | [-] | auto | MoQ transport draft version. |
| `certKey` | [-] | `undefined` | Certificate hash input for WebTransport setup. |
| `lateFrameThreshold` | [-] | `100` | Late frame threshold in ms for playback adaptation. |
| `gapTimeout` | [-] | `500` | Gap timeout in ms for recovery behavior. |
| `preferSoftwareDecoder` | [-] | `false` | Prefer software decode over hardware where supported. |
| `muted` | [-] | `true` | Initial mute state. |
| `showControls` | [-] | `true` | Enable built-in controls (where applicable). |
| `initialVolume` | [-] | `1` | Initial playback volume (0..1). |
| `muteOnAutoplayRestriction` | [-] | `true` | Auto-mute fallback for browser autoplay restrictions. |
| `stats` | [-] | `undefined` | Optional stats monitor configuration. |
| `prefetchCatalog` | [-] | `false` | Attempt HTTP catalog prefetch before MOQ playback session starts. |
| `connectionParams` | [-] | `undefined` | Additional connection parameters passed through options. |
| `moqtLogLevel` | [-] | `none` | Log level passed to MOQ components. |
| `mediaSource` | [-] | `none` | An instance of a `MediaSourceLike` (from [moq-playa](https://github.com/openmoq/moq-playa)) implementation. _Make sure you know what you are doing, as it carries responsibility for managing buffers and media playout._ |
| `mseMediaSourceOptions` | [-] | `undefined` | The desired `MseMediaSourceOptions` to apply when the video package format is received as `CMAF/CMSF`. Ignored when `mediaSource` is provided. |
| `locmafDecoding` | [-] | `mse` | How LOCMAF tracks are consumed: reconstructed CMAF chunks for MSE (`mse`), or coded frames for WebCodecs (`frame`). |
| `messageChannel` | [-] | `{ enabled: false, mode: 'shared' }` | Optional internally managed `MOQMessageChannel`. `mode: 'shared'` reuses subscriber/player `MoqtConnection`; `mode: 'sidecar'` creates a separate MoQT session for messaging. |

`*` Required when `endpoint` is not provided.

### Managed MessageChannel notes

- `messageChannel.enabled: true` makes `MOQSubscriber` create/manage a channel during `subscribe()` and close it during `unsubscribe()`.
- `mode: 'shared'`:
  - reuses the active subscriber/player `MoqtConnection`
  - keeps media + messaging on one transport/session
  - useful for same-connection troubleshooting
- `mode: 'sidecar'`:
  - creates a second `MoqtConnection` only for messaging
  - helps isolate transport contention from media playback
- `messageChannel.dataChannelConfiguration` supports the same semantics as standalone `MOQMessageChannel` (for example `name`, `clientId`, `keepEcho`, `unreliable`).
- In `sidecar` mode, messaging endpoint fields may be overridden under `messageChannel` (`endpoint`, `host`, `protocol`, `port`, `certKey`, `draftVersion`, `connectionParams`, `app`, `streamName`); otherwise subscriber values are used.

# Events

`MOQSubscriber` is an event emitter. You can subscribe with wildcard (`*`) or by specific event name.

```js
const onSubscriberEvent = event => {
  const { type, subscriber, data } = event
  console.log(type, subscriber, data)
}

subscriber.on('*', onSubscriberEvent)
// later
subscriber.off('*', onSubscriberEvent)
```

### Core subscriber lifecycle (`SubscriberEventTypes`)

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `CONNECT_SUCCESS` | `Connect.Success` | Session established. |
| `SUBSCRIBE_START` | `Subscribe.Start` | Playback started. |
| `SUBSCRIBE_STOP` | `Subscribe.Stop` | Playback stopped/unsubscribed. |
| `SUBSCRIBE_FAIL` | `Subscribe.Fail` | Subscribe failed. |
| `SUBSCRIBE_INVALID_NAME` | `Subscribe.InvalidName` | Invalid stream/namespace during prefetch or subscribe. |

### MOQ-specific events (`MOQSubscriberEventTypes`)

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `SESSION_CONNECTING` | `MOQ.Session.Connecting` | Session connect process started. |
| `SESSION_ESTABLISHED` | `MOQ.Session.Established` | Session connected. |
| `SESSION_ERROR` | `MOQ.Session.Error` | Session-level error. |
| `CATALOG_RECEIVED` | `MOQ.Catalog.Received` | Catalog received (prefetch or relay). |
| `CATALOG_UPDATED` | `MOQ.Catalog.Updated` | Catalog update observed. |
| `TRACK_SUBSCRIBE` | `MOQ.Track.Subscribe` | Track subscription succeeded. |
| `TRACK_SUBSCRIBE_FAILED` | `MOQ.Track.Subscribe.Failed` | Track subscription failed. |
| `TRACK_UNSUBSCRIBE` | `MOQ.Track.Unsubscribe` | Track unsubscribed. |
| `FIRST_FRAME` | `MOQ.FirstFrame` | First frame rendered. |
| `STATS_REPORT` | `MOQ.Stats.Report` | Stats report emitted when enabled. |
| `AUDIO_BLOCKED` | `MOQ.Audio.Blocked` | Browser blocked audio output pending user gesture. |
| `AUDIO_UNBLOCKED` | `MOQ.Audio.Unblocked` | Audio output resumed after user gesture. |
| `MESSAGE_CHANNEL_OPEN` | `MOQ.MessageChannel.Open` | Managed `MOQMessageChannel` opened successfully. |
| `MESSAGE_CHANNEL_SEND` | `MOQ.MessageChannel.Send` | Managed `MOQMessageChannel` sent a message/data payload. |
| `MESSAGE_CHANNEL_RECEIVE` | `MOQ.MessageChannel.Receive` | Managed `MOQMessageChannel` received a message/data payload. |
| `MESSAGE_CHANNEL_CLOSE` | `MOQ.MessageChannel.Close` | Managed `MOQMessageChannel` closed. |
| `MESSAGE_CHANNEL_FAIL` | `MOQ.MessageChannel.Fail` | Managed `MOQMessageChannel` failed to open. |
| `MESSAGE_CHANNEL_ERROR` | `MOQ.MessageChannel.Error` | Managed `MOQMessageChannel` reported an error. |

Managed MessageChannel events include metadata in `event.data`:

- `transport`: `'moq'`
- `mode`: `'shared' | 'sidecar'`
- `label`: configured channel label (`dataChannelConfiguration.name`)
- `streamName`: configured stream name used by the managed channel
- `configuredClientId`: configured sender identity if provided
- `event`: original underlying `MessageChannel` event payload

# Playback API

The subscriber provides playback controls and track switching helpers:

```js
await subscriber.play()
await subscriber.pause()
await subscriber.resume()
await subscriber.stop()
await subscriber.mute()
await subscriber.unmute()
await subscriber.setVolume(0.5)
await subscriber.resumeAudio() // call from user gesture if audio is blocked
await subscriber.selectVideoTrack('video')
```

You can access internals for advanced integrations:

```js
const options = subscriber.getOptions()
const player = subscriber.getPlayer()
const messageChannel = subscriber.getMessageChannel()
const view = subscriber.getRendererView()
```

# Statistics

```js
subscriber.monitorStats({
  interval: 5000
})
```

You can also provide `stats` in `init()` options to start monitoring automatically after subscription starts.
