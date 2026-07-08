# WHIP Supported Resolutions (`whip-supported-resolutions`)

This example builds directly on the basic `WHIPClient` publish flow and allows you to select from pre-defined standard resolutions that are supported by the target browser.

At a high level:

- create a `WHIPClient`
- provide a "preview" of media to be streamed
- discover browser-supported resolutions (through `getUserMedia`)
  - through the use of `probeSupportedResolutions()` + `acquireStreamForPreset()` from this example
- use that resolution in the preview and broadcast
- publish normally

## What This Example Demonstrates

- Utilizing the generated MediaStream in preview based on resolution selection
- WHIP publishing with explicit resolution
- the same start/stop/event lifecycle used by the basic publisher examples

## Why Check Resolution Support First

The browser throws an `OverconstrainedError` exception on any call to `getUserMedia` that is not supported with its constraints - in this case resolution.

As such, it may be beneficial to first check the current browser support prior to starting a broadcast with a requested resolution.

- **Browser capability source:** `navigator.mediaDevices.getUserMedia()`

## Minimal Developer Snippet

The snippet below is intentionally simplified for learning and does not include every helper used in the testbed:

```ts
// If integrating as a script dependency from a CDN:
const sdk = window.red5prosdk
const { WHIPClient } = sdk

// OR, If integrating as a module from NPM install:
// import { WHIPClient } from 'red5pro-webrtc-sdk'

async function acquireStreamForPreset(
  deviceId: string,
  preset: WhipSupportedResolution
): Promise<MediaStream> {
  return navigator.mediaDevices.getUserMedia({
    audio: true,
    video: {
      ...(deviceId ? { deviceId: { exact: deviceId } } : {}),
      width: { exact: preset.width },
      height: { exact: preset.height },
      frameRate: { ideal: preset.frameRate },
    },
  })
}

const mediaStream = await acquireStreamForPreset(selectedDeviceId, preset)
const publisher = new WHIPClient()
await publisher.initWithStream(
  {
    endpoint,
    streamName,
    mediaElementId: 'publisher-video',
    connectionParams,
  },
  mediaStream
)
await publisher.publish()
```

## Reproducing This in Your Own App

Use this sequence in your own webapp:

1. Use a predefined list of resolutions you wish to probe for support (see (lib/whip-supported-resolutions)[../lib/whip-supported-resolutions.ts])
2. Allow selection of supported resolutions to update the preview stream
3. Use the preview media stream as the stream to broadcast with in `initWithStream`

## Endpoint and `connectionParams`: Standalone vs Stream Manager

Resolution preferences are inherent in the `MediaStream` provided in `initWithStream`. The endpoint and connection parameter setup is still the same pattern as other WHIP examples.

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

- view the pre-defined list of common browser resolutions: `src/lib/whip-supported-resolutions.ts`
- probe resolutions for support: `probeSupportedResolutions()`
- access stream with target resolution: `acquireStreamForPreset()`
- publish flow: `startPublish()`
- stop flow: `stopPublish()`
- event handling: `onPublisherEvent()`

---

Pair this with `whep-basic` to validate subscriber playback after selecting a probed resolution.
