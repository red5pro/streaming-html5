# WHIP AMF (`whip-amf`)

This example shows how to publish with `WHIPClient` and send AMF metadata during an active stream.

It is the sender-side pair for `whep-amf`.

## What This Example Demonstrates

- WHIP publish lifecycle with explicit media stream setup (`initWithStream(...)`)
- sending AMF metadata after publish starts
- keeping publish active while dispatching metadata updates
- pairing publish-side metadata send with subscriber-side metadata receipts

## How AMF Metadata Is Sent

After publish starts, the **AMF Metadata** form is enabled.

Submitting the form triggers:

```ts
publisher.send('onMetaData', { metadata: data })
```

Where:

- `'onMetaData'` is the method name used for metadata dispatch
- payload contains the metadata text entered in the UI

## Publish Setup

This example acquires media from `r5-publish-settings` and initializes with `initWithStream(...)`:

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

// Send AMF metadata while publishing
publisher.send('onMetaData', {
  metadata: 'chapter=1'
})
```

## Endpoint and `connectionParams`: Standalone vs Stream Manager

AMF metadata behavior is independent from deployment mode. Endpoint and connection parameter setup follows the standard WHIP pattern.

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
- metadata send handler: `sendAmfMetadata()`
- AMF form enable/disable state: `syncAmfMetadataControls()`
- publisher event handling: `onPublisherEvent()`

---

Pair this with `whep-amf` to see how `Subscribe.Metadata` receives and displays these metadata updates.
