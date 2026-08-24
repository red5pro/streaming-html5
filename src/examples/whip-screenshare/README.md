# WHIP Screenshare (`whip-screenshare`)

This example builds on the standard `WHIPClient` publish flow, but captures the outbound stream from screen sharing (`getDisplayMedia`) instead of camera-first capture.

At a high level:

- create a `WHIPClient`
- acquire a screen-share `MediaStream` from publish settings (`screenshare` mode)
- optionally add microphone audio to that stream
- initialize with `initWithStream(...)`
- publish and handle normal WHIP lifecycle events

## What This Example Demonstrates

- WHIP publishing with display capture as the primary video source
- optional microphone audio mixed into the screenshare stream
- using a preview stream before and during publish
- automatically stopping publish when browser screenshare ends

## How Screenshare Capture Works

In this example, `startPublish()` calls:

```ts
const mediaStream = await publishSettingsEl.refreshStream()
```

Because the element is configured with `screenshare` in `index.html`, `r5-publish-settings` uses display capture internally (`getDisplayMedia`) and returns that stream.

The stream is then passed into:

```ts
await publisher.initWithStream(config, mediaStream)
```

So publish uses the already-acquired display stream, rather than an SDK-default camera acquisition path.

## Browser-End Handling

When the browser-level screen share is ended by the user (for example from native browser UI), this example listens for `screenshare-ended` and calls `stopPublish()` so the publisher state and UI stay consistent.

## Minimal Developer Snippet

The snippet below is intentionally simplified for learning and does not include every helper used in the testbed:

```ts
const sdk = window.red5prosdk
const { WHIPClient } = sdk

const displayStream = await navigator.mediaDevices.getDisplayMedia({
  video: { width: { ideal: 1920 }, height: { ideal: 1080 } },
  audio: false,
})

// Optional: add microphone audio track(s)
const micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
micStream.getAudioTracks().forEach((track) => displayStream.addTrack(track))

const publisher = new WHIPClient()
await publisher.initWithStream(
  {
    endpoint,
    streamName,
    mediaElementId: 'publisher-video',
    connectionParams,
    streamMode: 'live',
  },
  displayStream
)
await publisher.publish()
```

## Endpoint and `connectionParams`: Standalone vs Stream Manager

Screenshare capture is independent from deployment mode. Endpoint and connection parameter setup follows the same WHIP pattern as other examples.

### Standalone Server

- `endpoint` targets the server directly (origin).
- `connectionParams` is optional unless your server/plugins require extra values (for example authentication credentials).

```ts
const endpoint = `https://${host}:443/live/whip/${streamName}`
const connectionParams = {}
```

### Stream Manager

- `endpoint` should target Stream Manager proxy routing (not a hardcoded origin/edge).
- `connectionParams` is where Stream Manager-related values (region/nodeGroup/transcoder/auth metadata) are commonly supplied.

```ts
const endpoint = `https://${host}/as/v1/proxy/whip/${app}/${streamName}`
const connectionParams = {
  // e.g. region, nodeGroup, strict matching flags, authentication credentials, etc.
}
```

## Where to Look in This Example

- publish flow: `startPublish()`
- stop flow: `stopPublish()`
- screenshare end handling: `publish-settings` `screenshare-ended` listener
- event handling: `onPublisherEvent()`
- display capture internals: `acquireDisplayStream()` in `src/components/r5-publish-settings/index.ts`

---

Pair this with `whep-basic` to validate subscriber playback of a WHIP screenshare stream.
