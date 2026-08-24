# WHEP Manual Stream (`whep-manual-stream`)

This example is a standard `WHEPClient` subscribe flow, but demonstrates a manual media-attachment pattern commonly used in state-driven frameworks like React or Vue.

Instead of letting the SDK bind playback automatically, the app receives the subscribed `MediaStream` from events and attaches it to the media element when your UI state is ready.

## What This Example Demonstrates

- standard WHEP subscribe lifecycle (`init`, `subscribe`, `unsubscribe`)
- disabling automatic media assignment with `mediaElementId: undefined`
- manually assigning the generated `MediaStream` from subscriber events
- optional client-side keyframe recognition before starting visible playback

## Why This Pattern Matters (React/Vue Style Apps)

In component-based frameworks, media element refs may not exist yet, may be remounted, or may be controlled by app state transitions.

This pattern gives you control to:

- wait until your component tree is ready
- attach stream to a specific element reference
- gate visual playback until additional conditions are met

## Core Configuration Difference

The key init change is:

```ts
await subscriber.init({
  endpoint,
  streamName,
  mediaElementId: undefined,
  connectionParams,
})
```

With `mediaElementId` omitted/undefined, the SDK does not auto-assign playback media to an element.

## Manual Stream Assignment Flow

In this example:

1. subscribe starts normally
2. `TRACK_ADDED` (`WebRTC.PeerConnection.OnTrack`) provides stream data
3. `handlePeerConnectionOnTrack(...)` stores `manualMediaStream`
4. app calls `attachMediaStream(subscriberVideoEl, stream)` when ready
5. on teardown, `detachMediaStream(...)` clears `srcObject`/blob URL

This mirrors the same control flow a React/Vue component would do with refs and lifecycle hooks.

## Optional Client-Side Keyframe Gating

The example includes an optional toggle: **Enable Client-Side Keyframe Recognition**.

When enabled:

- playback remains visually gated first
- `PEER_CONNECTION_AVAILABLE` starts `getStats()` polling
- inbound video stats are checked for `keyFramesDecoded > 0`
- once keyframe is detected, stream is attached/played and blur is removed

This can reduce early black-frame artifacts in some rendering flows.

## Minimal Developer Snippet

```ts
const subscriber = new red5prosdk.WHEPClient()

subscriber.on('*', (event) => {
  if (event.type === red5prosdk.RTCSubscriberEventTypes.TRACK_ADDED) {
    const stream = event.data?.streams?.[0]
    if (stream) {
      videoRef.srcObject = stream // manual assignment
      void videoRef.play()
    }
  }
})

await subscriber.init({
  endpoint,
  streamName,
  mediaElementId: undefined,
  connectionParams,
})

await subscriber.subscribe()
```

## Endpoint and `connectionParams`: Standalone vs Stream Manager

This example uses the same endpoint and `connectionParams` resolution pattern as a normal WHEP subscriber. The difference is media attachment strategy, not network routing.

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

- subscriber init with manual stream mode: `startSubscribe()`
- on-track stream handling: `handlePeerConnectionOnTrack()`
- keyframe polling logic: `trackKeyframeRecognition()`
- manual attach helper: `attachMediaStream()`
- teardown helper: `detachMediaStream()`

---

Pair this with `whep-basic` to compare automatic `mediaElementId` playback attachment versus manual stream assignment.
