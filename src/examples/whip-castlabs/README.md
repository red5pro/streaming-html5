# castLabs DRM Publisher (`whip-castlabs`)

This example extends a standard `WHIPClient` publish flow with castLabs encryption integration so the outgoing live video can be encrypted for DRMtoday workflows.

It is the publisher-side pair for `whep-castlabs`.

## What This Example Demonstrates

- WHIP publishing with `initWithStream(...)`
- integrating a 3rd-party castLabs encryption path through worker-based transforms
- applying CastLabs form settings to encryption initialization before publish
- publishing an encrypted stream intended for DRM-capable playback

## CastLabs Publisher Settings

The publisher form includes:

- `environment`: DRMtoday environment where your encrypted stream configuration resides.
- `merchant`: DRMtoday merchant account.
- `encryption mode`: AES mode used for stream encryption.
- `key` / `key id` / `iv`: values supplied by your merchant.

Notes:

- current key material handling in this example expects hex input values.
- form values are persisted and auto-restored with local storage helpers.

## Encryption Flow in This Example

Before publish starts, the example:

1. reads/saves CastLabs form settings
2. maps selected AES mode (`ctr`/`cbc`) to the transform encryption profile
3. initializes worker crypto (`initCrypto(...)`)
4. configures sender-side transforms on transceivers for encrypted output
5. publishes normally with `WHIPClient`

## Minimal Developer Snippet

```ts
const publisher = new red5prosdk.WHIPClient()

await initCrypto('H264', 'cbcs', keyBytes, ivBytes)

await publisher.initWithStream(
  {
    endpoint,
    streamName,
    mediaElementId: 'publisher-video',
    connectionParams,
    rtcConfiguration: {
      ...rtcConfiguration,
      // castLabs path requires insertable streams support
      encodedInsertableStreams: true,
    },
  },
  mediaStream
)
await publisher.publish()

for (const tr of publisher.getPeerConnection()?.getTransceivers() ?? []) {
  tr.direction = 'sendonly'
  setupSenderTransform(tr.sender)
}
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

CastLabs encryption behavior is independent from deployment mode. Endpoint and connection setup follows the same WHIP pattern as other examples.

### Standalone Server

```ts
const endpoint = `https://${host}:443/live/whip/${streamName}`
const connectionParams = {}
```

### Stream Manager

```ts
const endpoint = `https://${host}/as/v1/proxy/whip/${app}/${streamName}`
const connectionParams = {
  // e.g. region, nodeGroup, auth metadata
}
```

## Where to Look in This Example

- publish flow: `startPublish()`
- CastLabs form read/save: `readCastLabsForm()` / `saveCastLabsPubSettings()`
- crypto init: `initCrypto()`
- sender transform wiring: `setupSenderTransform()`
- worker bootstrap: `encrypt-worker-wrapper.js`

---

Pair this with `whep-castlabs` to validate encrypted baseline playback and DRM-decrypted playback paths.
