# WHIP Audio Constraints (`whip-audio-constraints`)

This example builds on the basic `WHIPClient` publish flow and focuses on how audio/video UI selections become concrete media constraints and an acquired `MediaStream`.

At a high level:

- configure capture settings in `r5-publish-settings` (including advanced audio options)
- generate a requested `MediaStreamConstraints` object
- acquire media with `navigator.mediaDevices.getUserMedia(...)`
- publish with `WHIPClient.initWithStream(...)`
- compare requested constraints vs applied track settings in the UI

## What This Example Demonstrates

- WHIP publishing with explicit media constraint control
- advanced microphone constraint handling (`sampleRate`, `sampleSize`, `channelCount`, `echoCancellation`, `noiseSuppression`, `autoGainControl`)
- resolution/device/publish option controls that feed capture + publish setup
- side-by-side visibility of:
  - what was requested
  - what the browser/device actually applied

## How Settings Generate the `MediaStream`

The flow is:

1. `r5-publish-settings` reads current UI state (device picks, toggles, resolution, advanced audio fields).
2. `buildMediaConstraints()` composes a `MediaStreamConstraints` object.
3. `refreshStream()` calls `acquireUserMediaStream()` which runs `getUserMedia(constraints)`.
4. On success, the new stream is attached to preview and emitted via `publish-settings-updated`.
5. `startPublish()` retrieves that stream (`refreshStream()` return value) and calls `WHIPClient.initWithStream(config, mediaStream)`.

The publisher is initialized with a stream that already reflects your selected constraints, rather than relying on a default SDK-captured stream.

## Requested vs Resultant Settings in the UI

This example intentionally teaches a key WebRTC concept: requested constraints are hints/requirements, but the final track settings may differ.

The **Media Summary** panel shows both:

- **Requested**: built from your current form values (`buildMediaConstraints()`)
- **Applied (track.getSettings)**: read from the acquired audio/video tracks (`readAppliedTrackSettings()`)

So if a browser or device cannot fully honor a request (for example a specific sample rate), the panel makes that visible immediately.

The same summary is also logged before publish so you can inspect it in the Log panel during test runs.

## Minimal Developer Snippet

The snippet below is intentionally simplified for learning and does not include every helper used in the testbed:

```ts
// If integrating as a script dependency from a CDN:
const sdk = window.red5prosdk
const { WHIPClient } = sdk

// OR, If integrating as a module from NPM install:
// import { WHIPClient } from 'red5pro-webrtc-sdk'

const requestedConstraints: MediaStreamConstraints = {
  video: { width: { ideal: 1280 }, height: { ideal: 720 } },
  audio: {
    sampleRate: 48000,
    sampleSize: 16,
    channelCount: 2,
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
  },
}

const mediaStream = await navigator.mediaDevices.getUserMedia(requestedConstraints)
const audioSettings = mediaStream.getAudioTracks()[0]?.getSettings()
const videoSettings = mediaStream.getVideoTracks()[0]?.getSettings()

console.log('Requested:', requestedConstraints)
console.log('Applied audio:', audioSettings)
console.log('Applied video:', videoSettings)

const publisher = new WHIPClient()
await publisher.initWithStream(
  {
    endpoint,
    streamName,
    mediaElementId: 'publisher-video',
    connectionParams,
    streamMode: 'live',
  },
  mediaStream
)
await publisher.publish()
```

## Reproducing This in Your Own App

Use this sequence in your own webapp:

1. Build a publish form for audio/video toggles, device selections, and advanced audio fields.
2. Generate constraints from form state every time settings change.
3. Refresh preview stream with `getUserMedia` so users can validate before publish.
4. Read `track.getSettings()` from the acquired stream.
5. Render a "Requested vs Applied" panel so differences are transparent.
6. Pass the acquired stream into `initWithStream(...)` and publish.

## Endpoint and `connectionParams`: Standalone vs Stream Manager

Media constraints are independent from deployment mode. Endpoint and connection setup follows the standard WHIP pattern.

### Standalone Server

- `endpoint` targets the server directly (origin).
- `connectionParams` is optional unless your server/plugins require extra values (for example authentication credentials).

Example shape:

```ts
const endpoint = `https://${host}:443/live/whip/${streamName}`
const connectionParams = {
  // optional plugin/query params
}
```

### Stream Manager

- `endpoint` should target Stream Manager proxy routing (not a hardcoded origin/edge).
- `connectionParams` is where Stream Manager-related values (region/nodeGroup/transcoder/auth metadata) are commonly supplied.

Example shape:

```ts
const endpoint = `https://${host}/as/v1/proxy/whip/${app}/${streamName}`
const connectionParams = {
  // e.g. region, nodeGroup, strict matching flags, authentication credentials, etc.
}
```

## Where to Look in This Example

- publish flow: `startPublish()`
- media summary rendering: `updateMediaSummary()`
- summary logging: `logMediaSummary()`
- publish settings UI wiring: `r5-publish-settings` with `audio-advanced` in `index.html`
- requested constraint builder: `buildMediaConstraints()` in `src/components/r5-publish-settings/index.ts`
- audio advanced mapping: `buildAudioConstraint()` in `src/components/r5-publish-settings/index.ts`
- applied track settings capture: `readAppliedTrackSettings()` in `src/components/r5-publish-settings/index.ts`

---

Pair this with a WHEP-focused playback example to compare publish-time capture constraints with subscribe-time playback behavior.
