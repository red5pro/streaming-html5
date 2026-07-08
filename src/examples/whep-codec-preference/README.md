# WHEP Codec Preference (`whep-codec-preference`)

This example builds directly on the basic `WHEPClient` subscribe flow and adds codec selection controls before subscribe starts.

At a high level:

- create a `WHEPClient`
- discover browser-supported playback codecs
- filter that list to codecs the SDK can request
- pass selected `videoEncoding` and `audioEncoding` into subscriber initialization
- subscribe normally

## What This Example Demonstrates

- WHEP subscribe with explicit playback codec preference hints
- dynamic codec option generation from browser + SDK support overlap
- graceful fallback to default codec behavior when no explicit codec is selected
- the same start/stop/event lifecycle used by the basic subscriber examples

## Important WHEP Note: `init` vs `initWithStream`

For WHEP subscribe examples, you initialize with `subscriber.init(...)`, not `initWithStream(...)`.

- WHEP does not need an outbound local publish `MediaStream`
- playback is attached through `mediaElementId` in the subscribe config
- any "preview" in WHEP contexts is playback-oriented, not a local capture stream passed into init

## Why Codec Filtering Is Needed

The browser may report codecs that are not valid choices for the Red5 Pro playback encoder enums, and the SDK enums can contain values the current browser does not support.

This example avoids invalid combinations by intersecting both sources:

- **Browser capability source:** `RTCRtpReceiver.getCapabilities('video' | 'audio')`
- **SDK playback enums:** `PlaybackVideoEncoder` and `PlaybackAudioEncoder`

Only codec names present in both are shown to the user.

## Minimal Developer Snippet

The snippet below is intentionally simplified for learning and does not include every helper used in the testbed:

```ts
// If integrating as a script dependency from a CDN:
const sdk = window.red5prosdk
const { WHEPClient, PlaybackVideoEncoder, PlaybackAudioEncoder } = sdk

// OR, If integrating as a module from NPM install:
// import { WHEPClient, PlaybackVideoEncoder, PlaybackAudioEncoder } from 'red5pro-webrtc-sdk'

function getSupportedPlaybackCodecNames(kind: 'audio' | 'video'): string[] {
  if (!RTCRtpReceiver?.getCapabilities) return []
  const caps = RTCRtpReceiver.getCapabilities(kind)
  if (!caps) return []
  const encoderEnum = kind === 'video' ? PlaybackVideoEncoder : PlaybackAudioEncoder

  return [...new Set(
    caps.codecs
      .map((codec) => codec.mimeType.split('/')[1]?.toUpperCase())
      .filter((name): name is string => Boolean(name) && name in encoderEnum && name !== 'NONE')
  )].sort()
}

const selectedVideo = 'H264' // from UI select, or "default"
const selectedAudio = 'OPUS' // from UI select, or "default"

const videoEncoding = selectedVideo === 'default'
  ? undefined
  : PlaybackVideoEncoder[selectedVideo as keyof typeof PlaybackVideoEncoder]
const audioEncoding = selectedAudio === 'default'
  ? undefined
  : PlaybackAudioEncoder[selectedAudio as keyof typeof PlaybackAudioEncoder]

const subscriber = new WHEPClient()
await subscriber.init({
  endpoint,
  streamName,
  mediaElementId: 'subscriber-video',
  connectionParams,
  videoEncoding,
  audioEncoding,
})
await subscriber.subscribe()
```

## Reproducing This in Your Own App

Use this sequence in your own webapp:

1. Build your normal WHEP subscribe form (`streamName`, host/endpoint settings).
2. Add video/audio codec `<select>` controls with a `default` option.
3. On load, compute playback codec options from browser receiver capabilities and filter against SDK playback enums.
4. On subscribe click, resolve selected strings to SDK enum values.
5. Pass `videoEncoding` and `audioEncoding` in your `WHEPClient` init config.
6. Keep `undefined` for either field when you want automatic browser/server negotiation.

## Endpoint and `connectionParams`: Standalone vs Stream Manager

Codec preferences are independent from deployment mode. The endpoint and connection parameter setup is still the same pattern as other WHEP examples.

### Standalone Server

- `endpoint` targets the server directly for WHEP egress.
- `connectionParams` is optional unless your server/plugins require extra values (for example authentication credentials).

Example shape:

```ts
const endpoint = `https://${host}:443/live/whep/${streamName}`
const connectionParams = {
  // optional plugin/query params
}
```

### Stream Manager

- `endpoint` should target Stream Manager proxy routing (not a hardcoded edge).
- `connectionParams` is where Stream Manager-related values (region/nodeGroup/transcoder/auth metadata) are commonly supplied.

Example shape:

```ts
const endpoint = `https://${host}/as/v1/proxy/whep/${app}/${streamName}`
const connectionParams = {
  // e.g. region, nodeGroup, strict matching flags, authentication credentials, etc.
}
```

## Where to Look in This Example

- codec option initialization: `initCodecSelects()`
- codec discovery/filtering helpers: `getUniquePlaybackCodecListing()` in `src/lib/codec-preferences.ts`
- subscribe codec resolution: `resolveSubscribeVideoEncoding()` / `resolveSubscribeAudioEncoding()`
- subscribe flow: `startSubscribe()`
- stop flow: `stopSubscribe()`
- event handling: `onSubscriberEvent()`

---

Use this as a reference pattern for additional WHEP feature examples built on the same subscribe foundation.
