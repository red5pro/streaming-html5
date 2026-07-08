# WHIP Media Source Swap (`whip-media-source-swap`)

This example starts from a standard `WHIPClient` publish flow and adds live source replacement controls while the broadcast is active.

At a high level:

- publish with `WHIPClient`
- keep the same live connection active
- swap outgoing video and/or audio input devices on demand
- continue broadcasting without unpublish/republish

## What This Example Demonstrates

- standard WHIP publish lifecycle with `initWithStream(...)`
- live camera/microphone swap while publishing
- replacing sender tracks on an active peer connection
- keeping preview and publisher stream in sync after swaps

## How Live Source Swap Works

After publish starts, the **Live Source Swap** section is shown.

When a device selection changes:

1. build one-track acquisition constraints for the selected kind (`audio` or `video`)
2. request a new track from `getUserMedia`
3. find the matching sender on the active `RTCPeerConnection`
4. call `sender.replaceTrack(newTrack)`
5. update the publisher `MediaStream` and preview element

No reconnect is required because only the sender track is replaced.

> A common modern use-case for this example is to exchange the front-facing camera input with the back-facing camera on a mobile device while keeping the stream alive.

## Minimal Developer Snippet

```ts
const publisher = new red5prosdk.WHIPClient()
await publisher.initWithStream(
  {
    endpoint,
    streamName,
    mediaElementId: 'publisher-video',
    connectionParams,
    streamMode: 'live',
  },
  mediaStream
)
await publisher.publish()

// Later, while publishing:
const pc = publisher.getPeerConnection()
const videoSender = pc?.getSenders().find((s) => s.track?.kind === 'video')
const swapStream = await navigator.mediaDevices.getUserMedia({
  video: { deviceId: { exact: newCameraDeviceId } },
  audio: false,
})
const newVideoTrack = swapStream.getVideoTracks()[0]
await videoSender?.replaceTrack(newVideoTrack)
```

## Reproducing This in Your Own App

1. Keep a stable publish session active (do not unpublish on device changes).
2. Capture initial constraints from your publish settings as a base.
3. Enumerate cameras/microphones and present swap controls only while publishing.
4. On change, acquire only the requested kind and call `replaceTrack`.
5. Update your local preview stream and UI status after each swap.

## Endpoint and `connectionParams`: Standalone vs Stream Manager

Device swap behavior is independent from deployment mode. Endpoint and connection setup follows the same WHIP pattern as other examples.

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
- swap section lifecycle: `showMediaSwapSection()` / `hideMediaSwapSection()`
- swap handler: `handleMediaDeviceSwap()`
- track replacement helper: `swapPublisherTrack()` in `src/lib/media-source-swap.ts`
- constraint helper for swap requests: `buildDeviceSwapConstraints()`

---

Use this as a reference for live input-device switching (camera/mic handoff) without reconnecting a WHIP publish session.
