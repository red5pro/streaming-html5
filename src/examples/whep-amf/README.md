# WHEP AMF (`whep-amf`)

This example shows how to subscribe with `WHEPClient` and display AMF metadata received during playback.

It is the receiver-side pair for `whip-amf`.

## What This Example Demonstrates

- WHEP subscribe lifecycle with `WHEPClient`
- receiving metadata through `Subscribe.Metadata`
- applying metadata to stats display
- rendering a timestamped metadata receipt list for inspection

## How Metadata Is Received

The subscriber listens for:

- `Subscribe.Metadata`

On each metadata event, the example:

1. applies metadata to `r5-subscriber-stats`
2. appends a receipt row with timestamp and JSON payload
3. logs the metadata event in the log panel

This makes it easy to verify each metadata dispatch from the publisher over time.

## Receipt UI Behavior

- receipt section is shown only during an active subscription
- on stop/failure, the section is hidden and reset
- default empty state is `Waiting for metadata...`

## Minimal Developer Snippet

```ts
const subscriber = new red5prosdk.WHEPClient()
subscriber.on('*', (event) => {
  if (event.type === 'Subscribe.Metadata') {
    console.log('Metadata received:', event.data)
    // append to your UI / state here
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

Metadata receipt behavior is independent from deployment mode. Endpoint and connection parameter setup follows the standard WHEP pattern.

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
- metadata event handling: `onSubscriberEvent()` (`Subscribe.Metadata`)
- receipt list append logic: `appendMetadataReceipt()`
- receipt section lifecycle: `syncMetadataReceiptsSection()` and `clearMetadataReceipts()`

---

Pair this with `whip-amf` for the sender-side `publisher.send('onMetaData', payload)` flow that drives these receipts.
