# Basic WHIP (`whip-basic`)

This example shows the smallest practical WHIP publish flow in the Red5 Pro WebRTC SDK:

- create a `WHIPClient`
- initialize it with endpoint + stream settings
- call `publish()`
- react to publisher events for UI/status updates

In the testbed app, this example auto-starts publish when required settings are present.

## What This Example Demonstrates

- WHIP-based ingest over HTTP(S)
- basic event handling (`Publish.Start`, `Publish.Fail`, `Unpublish.Success`, etc.)
- using a DOM video element for local preview during publish (`mediaElementId`)
- start/stop publish lifecycle

## Minimal Developer Snippet

The snippet below is intentionally simplified for learning and does not include every helper used in the testbed:

```ts
// If integrating as a script dependency from a CDN:
const sdk = window.red5prosdk
const { WHIPClient } = sdk

// OR, If integrating as a module from NPM install:
// import { WHIPClient } from red5pro-webrtc-sdk

const publisher = new WHIPClient()
publisher.on('*', (event) => {
  console.log('[WHIP]', event.type)
  // handle event UI/state transitions here
})

await publisher.init({
  endpoint, // resolved from your deployment mode
  streamName, // e.g. "mystream"
  mediaElementId: 'publisher-video',
  connectionParams, // optional auth/region/transcode metadata
  streamMode: 'live', // or 'record' or 'append'
})

await publisher.publish()
```

> Note: using `init` without a `mediaConstraints` configuration object will use the default media "ideal" setup of `1280x720`.

## Endpoint and `connectionParams`: Standalone vs Stream Manager

This is the key setup difference developers usually need to understand.

### Standalone Server

- `endpoint` targets the server directly (origin).
- `connectionParams` is optional unless your server/plugins require extra values (for example authentication credentials).

Example shape:

```ts
const endpoint = `https://${host}:443/live/whip/${streamName}`
const connectionParams = {
  // optional plugin/query params
}
```

### Stream Manager

- `endpoint` should target Stream Manager proxy routing (not a hardcoded origin/edge).
- `connectionParams` is where Stream Manager-related values (region/nodeGroup/transcoder/auth metadata) are commonly supplied.

Example shape:

```ts
const endpoint = `https://${host}/as/v1/proxy/whip/${app}/${streamName}`
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

Pair this with `whep-basic` to show the minimal end-to-end publish + subscribe path.
