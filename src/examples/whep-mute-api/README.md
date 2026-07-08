# WHEP Mute API (`whep-mute-api`)

This example shows how to subscribe with `WHEPClient` and reflect publisher mute state by reading `Subscribe.Metadata`.

It is the receiver-side pair for `whip-mute-api`.

## What This Example Demonstrates

- WHEP subscribe lifecycle with `WHEPClient`
- reading publisher delivery state from metadata `streamingMode`
- mapping metadata to `audioActive` / `videoActive` state
- updating subscriber UI indicators and streaming-mode label in real time

## How Mute State Is Received

The subscriber listens for:

- `Subscribe.Metadata`

When metadata arrives, the example parses `streamingMode` and resolves delivery state:

- `Video/Audio` -> both active
- `Audio` -> audio active, video muted
- `Video` -> video active, audio muted
- `Empty` -> both muted

The parsed state drives:

- **Publisher Streaming Mode** text
- audio/video overlay indicators on the subscriber preview

## Metadata Parsing Flow

The example uses helper functions:

1. `parseBroadcastDeliveryFromMetadata(data)` to extract/normalize streaming mode
2. `formatBroadcastStreamingMode(...)` for human-readable display
3. `syncVideoPreviewIndicators(...)` to update icon state and titles

If metadata has not arrived yet, the UI stays in a waiting state (`Waiting for metadata...`).

## Minimal Developer Snippet

```ts
const subscriber = new red5prosdk.WHEPClient()
subscriber.on('*', (event) => {
  if (event.type === 'Subscribe.Metadata') {
    const mode = (event.data as any)?.streamingMode ?? (event.data as any)?.data?.streamingMode
    console.log('Publisher streamingMode:', mode)
    // update your UI indicators based on mode
  }
})

await subscriber.init({
  endpoint,
  streamName,
  mediaElementId: 'subscriber-video',
})
await subscriber.subscribe()
```

## Endpoint and `connectionParams`: Standalone vs Stream Manager

Mute-state reflection behavior is independent from deployment mode. Endpoint and connection parameter setup follows the same WHEP pattern as other examples.

### Standalone Server

- `endpoint` targets the server directly for WHEP egress.
- `connectionParams` is optional unless your server/plugins require extra values.

```ts
const endpoint = `https://${host}:443/live/whep/${streamName}`
const connectionParams = {}
```

### Stream Manager

- `endpoint` targets Stream Manager proxy routing.
- `connectionParams` commonly includes Stream Manager and auth metadata.

```ts
const endpoint = `https://${host}/as/v1/proxy/whep/${app}/${streamName}`
const connectionParams = {
  // e.g. region, nodeGroup, auth metadata
}
```

## Where to Look in This Example

- subscribe flow: `startSubscribe()`
- metadata handling entry: `onSubscriberEvent()` (`Subscribe.Metadata`)
- metadata-to-state mapping: `applyStreamingModeMetadata()`
- delivery state sync: `syncDeliveryIndicators()`
- parser/formatter helpers: `src/lib/subscribe-metadata.ts`
- indicator renderer: `src/lib/video-preview-indicators.ts`

---

Pair this with `whip-mute-api` for the sender-side mute toggles (`muteAudio`, `unmuteAudio`, `muteVideo`, `unmuteVideo`) that drive this metadata.
