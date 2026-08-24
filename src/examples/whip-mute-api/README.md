# WHIP Mute API (`whip-mute-api`)

This example shows how to publish with `WHIPClient` and toggle live audio/video transmission without stopping the publish session.

It is the sender-side pair for `whep-mute-api`.

## What This Example Demonstrates

- WHIP publish with explicit preview stream via `initWithStream(...)`
- runtime mute/unmute controls:
  - `publisher.muteAudio()` / `publisher.unmuteAudio()`
  - `publisher.muteVideo()` / `publisher.unmuteVideo()`
- preserving session continuity while media delivery state changes
- local preview indicator updates for audio/video on/off state

## Mute API Flow

After publish starts, the **Mute Controls** section is shown.

Audio button flow:

```ts
if (audioMuted) {
  publisher.unmuteAudio()
} else {
  publisher.muteAudio()
}
```

Video button flow:

```ts
if (videoMuted) {
  publisher.unmuteVideo()
} else {
  publisher.muteVideo()
}
```

> The example also mirrors that state to live preview tracks (`track.enabled`). This ensures that the media is also not being delivered to the server when mute is request, while just calling `mute*` signals to the server that it should not deliver media to all subscribing clients while still receiving media.

## Publish Setup

This example uses `initWithStream(...)` so the stream is acquired from publish settings first, then passed into the client:

```ts
const mediaStream = await publishSettingsEl.refreshStream()

await publisher.initWithStream(
  {
    endpoint,
    streamName,
    mediaElementId: 'publisher-video',
    connectionParams,
    streamMode,
  },
  mediaStream
)
await publisher.publish()
```

## Minimal Developer Snippet

```ts
const publisher = new red5prosdk.WHIPClient()
await publisher.initWithStream(
  {
    endpoint,
    streamName,
    mediaElementId: 'publisher-video',
  },
  mediaStream
)
await publisher.publish()

// Toggle audio
publisher.muteAudio()
publisher.unmuteAudio()

// Toggle video
publisher.muteVideo()
publisher.unmuteVideo()
```

## Endpoint and `connectionParams`: Standalone vs Stream Manager

Mute API behavior is independent from deployment mode. Endpoint and connection parameter setup follows the same WHIP pattern as other examples.

### Standalone Server

- `endpoint` targets the server directly (origin).
- `connectionParams` is optional unless your server/plugins require extra values.

```ts
const endpoint = `https://${host}:443/live/whip/${streamName}`
const connectionParams = {}
```

### Stream Manager

- `endpoint` targets Stream Manager proxy routing.
- `connectionParams` commonly includes Stream Manager and auth metadata.

```ts
const endpoint = `https://${host}/as/v1/proxy/whip/${app}/${streamName}`
const connectionParams = {
  // e.g. region, nodeGroup, auth metadata
}
```

## Where to Look in This Example

- publish flow: `startPublish()`
- mute UI section transitions: `showMuteControlsSection()` / `hideMuteControlsSection()`
- audio mute handler: `toggleAudioMute()`
- video mute handler: `toggleVideoMute()`
- preview sync helpers: `syncPreviewTrackMute()` and `syncVideoOverlayIndicators()`
- status/event handling: `onPublisherEvent()`

---

Pair this with `whep-mute-api` to see how subscriber-side UI reflects publisher mute state from metadata.
