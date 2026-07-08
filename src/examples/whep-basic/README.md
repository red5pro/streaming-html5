# Basic WHEP (`whep-basic`)

This example shows the smallest practical WHEP subscribe flow in the Red5 Pro WebRTC SDK:

- create a `WHEPClient`
- initialize it with endpoint + stream settings
- call `subscribe()`
- react to subscriber events for UI/status updates

In the testbed app, this example auto-starts subscribe when required settings are present.

## What This Example Demonstrates

- WHEP-based egress over HTTP(S)
- basic event handling (`Subscribe.Start`, `Subscribe.Fail`, `Subscribe.Stop`, etc.)
- attaching playback to a DOM video element (`mediaElementId`)
- start/stop subscribe lifecycle

## Minimal Developer Snippet

The snippet below is intentionally simplified for learning and does not include every helper used in the testbed:

```ts
// If integrating as a script dependency from a CDN:
const sdk = window.red5prosdk
const { WHEPClient } = sdk

// OR, If integrating as a module from NPM install:
// import { WHEPClient } from red5pro-webrtc-sdk

const subscriber = new WHEPClient()
subscriber.on('*', (event) => {
  console.log('[WHEP]', event.type)
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

In this repository, those values are produced by shared settings helpers so each example stays focused on client behavior rather than config plumbing.

## Where to Look in This Example

- subscribe flow: `startSubscribe()`
- stop flow: `stopSubscribe()`
- event handling: `onSubscriberEvent()`

---

Pair this with `whip-basic` to show the minimal end-to-end publish + subscribe path.
