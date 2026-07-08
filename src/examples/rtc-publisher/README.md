# Basic RTC Publisher (`rtc-publisher`)

This example shows the smallest practical legacy RTC publish flow in the Red5 Pro WebRTC SDK:

- create an `RTCPublisher`
- initialize it with endpoint + stream settings
- call `publish()`
- react to publisher events for UI/status updates

In the testbed app, this example starts publishing when you click **Start Publish**.

## What This Example Demonstrates

- legacy RTC-based ingest (non-WHIP) utilizing `WebSocket` for signaling.
- basic event handling (`Publish.Start`, `Publish.Fail`, `Unpublish.Success`, etc.)
- using a DOM video element for local preview during publish (`mediaElementId`)
- start/stop publish lifecycle with explicit publish settings controls

## Minimal Developer Snippet

The snippet below is intentionally simplified for learning and does not include every helper used in the testbed:

```ts
// If integrating as a script dependency from a CDN:
const sdk = window.red5prosdk
const { RTCPublisher } = sdk

// OR, If integrating as a module from NPM install:
// import { RTCPublisher } from red5pro-webrtc-sdk

const publisher = new RTCPublisher()
publisher.on('*', (event) => {
  console.log('[RTC Publisher]', event.type)
  // handle event UI/state transitions here
})

await publisher.initWithStream(
  {
    endpoint, // resolved from your deployment mode
    streamName, // e.g. "mystream"
    mediaElementId: 'publisher-video',
    connectionParams, // optional auth/region/transcode metadata
    streamMode: 'live',
  },
  mediaStream // from getUserMedia() or equivalent UI capture flow
)

await publisher.publish()
```

## Endpoint and `connectionParams`: Standalone vs Stream Manager

This is the key setup difference developers usually need to understand.

### Standalone Server

- `endpoint` targets the server directly.
- `connectionParams` is optional unless your server/plugins require extra values (for example authentication credentials).

Example shape:

```ts
const endpoint = `wss://${host}:443/live`
const connectionParams = {
  // optional plugin/query params
}
```

### Stream Manager

- `endpoint` is still the RTC websocket endpoint, but host selection is commonly derived from Stream Manager settings.
- `connectionParams` is where Stream Manager-related values (region/nodeGroup/transcoder/auth metadata) are commonly supplied.

Example shape:

```ts
const endpoint = `wss://${host}:443/as/${streamManagerApiVersion}/proxy/ws/publish/${app}`
const connectionParams = {
  // e.g. region, nodeGroup, strict matching flags, authentication credentials, etc.
}
```

In this repository, those values are produced by shared settings helpers so each example stays focused on client behavior rather than config plumbing.

## Where to Look in This Example

- publish flow: `startPublish()`
- stop flow: `stopPublish()`
- event handling: `onPublisherEvent()`

---

Pair this with `rtc-subscriber` to show the minimal legacy RTC publish + subscribe path.
