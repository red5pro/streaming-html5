# castLabs DRM Subscriber (`whep-castlabs`)

This example extends a standard `WHEPClient` subscribe flow with castLabs DRMtoday integration to compare encrypted baseline playback and DRM-decrypted playback.

It is the subscriber-side pair for `whip-castlabs`.

## What This Example Demonstrates

- dual subscriber paths in one page:
  - baseline subscriber (expected encrypted/garbled playback)
  - DRM subscriber (castLabs/decrypted playback path)
- applying CastLabs subscriber settings to DRM configuration
- wiring peer `ontrack` handling through castLabs transform APIs
- start/stop lifecycle for DRM subscriber while baseline can run continuously

## CastLabs Subscriber Settings

The subscriber form includes:

- `environment`: DRMtoday environment where your encrypted stream configuration resides.
- `merchant`: DRMtoday merchant account.
- `encryption mode` / scheme setting: encryption profile associated with the stream.
- `decrypt mode`: ClearKey or Production DRM flow.
- `key id` / `iv`: values supplied by your merchant.

Notes:

- current key material handling in this example expects hex input values.
- form values are persisted and auto-restored with local storage helpers.

## Subscriber Flow in This Example

### Baseline Subscriber

- starts automatically on page load
- standard WHEP path without DRM transform
- useful for validating that encrypted content is not directly viewable

### DRM Subscriber

On DRM subscribe start, the example:

1. reads/saves CastLabs settings
2. builds DRM config (`environment`, `merchant`, encryption/decrypt mode, keyId/iv)
3. runs `rtcDrmConfigure(...)`
4. creates WHEP subscriber with insertable streams enabled
5. routes peer `ontrack` to `rtcDrmOnTrack(...)` for decrypted playback

## Minimal Developer Snippet

```ts
import { rtcDrmConfigure } from '@public/libs/castlabs/rtc-drm-transform/rtc-drm-transform.min.js'

await rtcDrmConfigure(drmConfig)

const subscriber = new red5prosdk.WHEPClient()
await subscriber.init({
  endpoint,
  streamName,
  connectionParams,
  rtcConfiguration: {
    ...rtcConfiguration,
    encodedInsertableStreams: true,
  },
})

subscriber.on('*', (event) => {
  if (event.type === 'WebRTC.PeerConnection.Available') {
    const pc = subscriber.getPeerConnection()
    pc.ontrack = (e) => {
      rtcDrmOnTrack(e, drmConfig)
    }
  }
})

await subscriber.subscribe()
```

## Browser Requirements

This example requires modern browser support for:

- Web Workers
- Insertable Streams
- TransformStream

Polyfills are included in the example page for track processor/generator APIs where needed.

## DRMtoday Context

This README does not attempt to document DRMtoday platform configuration.
Use castLabs DRMtoday documentation for environment, merchant, and key provisioning details.

## Endpoint and `connectionParams`: Standalone vs Stream Manager

CastLabs subscriber behavior is independent from deployment mode. Endpoint and connection setup follows the same WHEP pattern as other examples.

### Standalone Server

```ts
const endpoint = `https://${host}:443/live/whep/${streamName}`
const connectionParams = {}
```

### Stream Manager

```ts
const endpoint = `https://${host}/as/v1/proxy/whep/${app}/${streamName}`
const connectionParams = {
  // e.g. region, nodeGroup, auth metadata
}
```

## Where to Look in This Example

- baseline subscriber startup: `startBaselineSubscribe()`
- DRM subscriber startup: `startDrmSubscribe()`
- castLabs form read/save: `readCastLabsSubForm()` / `saveCastLabsSubSettings()`
- DRM config + configure call: `rtcDrmConfigure(...)`
- decrypted playback hook: `rtcDrmOnTrack(...)`
- shared subscriber factory: `createSubscriber()`

---

Pair this with `whip-castlabs` for the sender-side encryption worker/transform setup.
