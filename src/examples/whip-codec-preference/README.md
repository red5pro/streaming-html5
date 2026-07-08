# WHIP Codec Preference (`whip-codec-preference`)

This example builds directly on the basic `WHIPClient` publish flow and adds codec selection controls before publish starts.

At a high level:

- create a `WHIPClient`
- provide a "preview" of media to be streamed
- discover browser-supported codecs
- filter that list to codecs the SDK can request
- pass selected `videoEncoding` and `audioEncoding` into publisher initialization
- publish normally

## What This Example Demonstrates

- Utilizing the generated MediaStream in preview for streaming
- WHIP publishing with explicit codec preference hints
- dynamic codec option generation from browser + SDK support overlap
- graceful fallback to default codec behavior when no explicit codec is selected
- the same start/stop/event lifecycle used by the basic publisher examples

## Why Codec Filtering Is Needed

The browser may report codecs that are not valid choices for the Red5 Pro publish encoder enums, and the SDK enums can contain values the current browser does not support.

This example avoids invalid combinations by intersecting both sources:

- **Browser capability source:** `RTCRtpSender.getCapabilities('video' | 'audio')`
- **SDK publish enums:** `PublishVideoEncoder` and `PublishAudioEncoder`

Only codec names present in both are shown to the user.

## Minimal Developer Snippet

The snippet below is intentionally simplified for learning and does not include every helper used in the testbed:

```ts
// If integrating as a script dependency from a CDN:
const sdk = window.red5prosdk
const { WHIPClient, PublishVideoEncoder, PublishAudioEncoder } = sdk

// OR, If integrating as a module from NPM install:
// import { WHIPClient, PublishVideoEncoder, PublishAudioEncoder } from 'red5pro-webrtc-sdk'

function getSupportedCodecNames(kind: 'audio' | 'video'): string[] {
  if (!RTCRtpSender?.getCapabilities) return []
  const caps = RTCRtpSender.getCapabilities(kind)
  if (!caps) return []
  const encoderEnum = kind === 'video' ? PublishVideoEncoder : PublishAudioEncoder

  return [
    ...new Set(
      caps.codecs
        .map((codec) => codec.mimeType.split('/')[1]?.toUpperCase())
        .filter((name): name is string => Boolean(name) && name in encoderEnum)
    ),
  ].sort()
}

const selectedVideo = 'H264' // from UI select, or "default"
const selectedAudio = 'OPUS' // from UI select, or "default"

const videoEncoding =
  selectedVideo === 'default'
    ? undefined
    : PublishVideoEncoder[selectedVideo as keyof typeof PublishVideoEncoder]
const audioEncoding =
  selectedAudio === 'default'
    ? undefined
    : PublishAudioEncoder[selectedAudio as keyof typeof PublishAudioEncoder]

const publisher = new WHIPClient()
await publisher.initWithStream(
  {
    endpoint,
    streamName,
    mediaElementId: 'publisher-video',
    connectionParams,
    videoEncoding,
    audioEncoding,
  },
  mediaStream
)
await publisher.publish()
```

## Reproducing This in Your Own App

Use this sequence in your own webapp:

1. Build your normal WHIP publish form (`streamName`, host/endpoint settings, media selection).
2. Add video/audio codec `<select>` controls with a `default` option.
3. On load, compute codec options from browser capabilities and filter against SDK publish enums.
4. On publish click, resolve selected strings to SDK enum values.
5. Pass `videoEncoding` and `audioEncoding` in your `WHIPClient` init config.
6. Keep `undefined` for either field when you want automatic browser/server negotiation.

## Endpoint and `connectionParams`: Standalone vs Stream Manager

Codec preferences are independent from deployment mode. The endpoint and connection parameter setup is still the same pattern as other WHIP examples.

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

- codec option initialization: `initCodecSelects()`
- codec discovery/filtering helpers: `getUniqueCodecListing()` in `src/lib/codec-preferences.ts`
- publish codec resolution: `resolvePublishVideoEncoding()` / `resolvePublishAudioEncoding()`
- publish flow: `startPublish()`
- stop flow: `stopPublish()`
- event handling: `onPublisherEvent()`

---

Pair this with `whep-codec-preference` to explain codec preference behavior on subscribe/playback.
