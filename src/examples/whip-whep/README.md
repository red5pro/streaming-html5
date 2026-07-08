# WHIP / WHEP (Two Way) (`whip-whep`)

This example combines publish and subscribe in a single page to show the end-to-end path:

- publish with `WHIPClient`
- subscribe with `WHEPClient`
- observe both client states and stats side by side

It is a foundational bridge example for developers learning how the two client roles fit together.

## What This Example Demonstrates

- single-page WHIP ingest + WHEP playback workflow
- publisher and subscriber lifecycle controls in parallel
- publish-side explicit stream setup with `initWithStream(...)`
- subscribe-side setup with `init(...)` and playback binding
- handling key events and endpoint updates for both clients

## Architecture at a Glance

Publisher panel:

- acquires media from `r5-publish-settings`
- initializes `WHIPClient` using `initWithStream(...)`
- publishes to the configured stream

Subscriber panel:

- initializes `WHEPClient` with the same `streamName`
- subscribes to that stream
- renders playback and metadata/stats updates

This gives you a quick local verification loop for ingest and egress behavior from one page.

## Minimal Developer Snippet

```ts
// Publisher side (WHIP)
const publisher = new red5prosdk.WHIPClient()
await publisher.initWithStream(
  {
    endpoint: whipEndpoint,
    streamName,
    mediaElementId: 'publisher-video',
    connectionParams,
  },
  mediaStream
)
await publisher.publish()

// Subscriber side (WHEP)
const subscriber = new red5prosdk.WHEPClient()
await subscriber.init({
  endpoint: whepEndpoint,
  streamName,
  mediaElementId: 'subscriber-video',
  connectionParams,
})
await subscriber.subscribe()
```

## Why This Example Uses `initWithStream` + `init`

- **WHIP publisher** uses `initWithStream(...)` because it sends a locally acquired capture stream.
- **WHEP subscriber** uses `init(...)` because playback attaches to a media element and does not send a local publish stream.

## Endpoint and `connectionParams`: Standalone vs Stream Manager

This example resolves endpoints independently for publish and subscribe:

- publish endpoint via WHIP routing
- subscribe endpoint via WHEP routing

### Standalone Server

```ts
const whipEndpoint = `https://${host}:443/live/whip/${streamName}`
const whepEndpoint = `https://${host}:443/live/whep/${streamName}`
const connectionParams = {}
```

### Stream Manager

```ts
const whipEndpoint = `https://${host}/as/v1/proxy/whip/${app}/${streamName}`
const whepEndpoint = `https://${host}/as/v1/proxy/whep/${app}/${streamName}`
const connectionParams = {
  // e.g. region, nodeGroup, auth metadata
}
```

## Where to Look in This Example

- publish flow: `startPublish()` / `stopPublish()`
- subscribe flow: `startSubscribe()` / `stopSubscribe()`
- publisher events: `onPublisherEvent()`
- subscriber events: `onSubscriberEvent()`
- shared shutdown path: `shutdown()`

---

Use this as a reference example when building custom pages that need both sender and receiver behavior in one web application, such as a multi-party meeting/conference.
