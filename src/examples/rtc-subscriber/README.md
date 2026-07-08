# Basic RTC Subscriber (`rtc-subscriber`)

This example shows the smallest practical legacy RTC subscribe flow in the Red5 Pro WebRTC SDK:

- create an `RTCSubscriber`
- initialize it with endpoint + stream settings
- call `subscribe()`
- react to subscriber events for UI/status updates

In the testbed app, this example starts subscribing when you click **Start Subscribe**.

## What This Example Demonstrates

- legacy RTC-based egress (non-WHEP) utilizing `WebSocket` for signaling.
- basic event handling (`Subscribe.Start`, `Subscribe.Fail`, `Subscribe.Stop`, etc.)
- attaching playback to a DOM video element (`mediaElementId`)
- start/stop subscribe lifecycle

## Minimal Developer Snippet

The snippet below is intentionally simplified for learning and does not include every helper used in the testbed:

```ts
// If integrating as a script dependency from a CDN:
const sdk = window.red5prosdk
const { RTCSubscriber } = sdk

// OR, If integrating as a module from NPM install:
// import { RTCSubscriber } from red5pro-webrtc-sdk

const subscriber = new RTCSubscriber()
subscriber.on('*', (event) => {
  console.log('[RTC Subscriber]', event.type)
  // handle event UI/state transitions here
})

await subscriber.init({
  endpoint, // resolved from your deployment mode
  streamName, // e.g. "mystream"
  mediaElementId: 'subscriber-video',
  connectionParams, // optional auth/region/transcode metadata
})

await subscriber.subscribe()
```

## Endpoint and `connectionParams`: Standalone vs Stream Manager

This is the key setup difference developers usually need to understand.

### Standalone Server

- `endpoint` targets the server directly for RTC subscribe.
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
const endpoint = `wss://${host}:443/as/${streamManagerApiVersion}/proxy/ws/subscribe/${app}`
const connectionParams = {
  // e.g. region, nodeGroup, strict matching flags, authentication credentials, etc.
}
```

In this repository, those values are produced by shared settings helpers so each example stays focused on client behavior rather than config plumbing.

## Where to Look in This Example

- subscribe flow: `startSubscribe()`
- stop flow: `stopSubscribe()`
- event handling: `onSubscriberEvent()`

---

Pair this with `rtc-publisher` to show the minimal legacy RTC publish + subscribe path.
