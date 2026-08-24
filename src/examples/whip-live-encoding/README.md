# WHIP Live Encoding (`whip-live-encoding`)

This example starts from a standard `WHIPClient` publish flow and adds runtime control of outgoing video encoding parameters while the stream is live.

It demonstrates a client-side adaptive pattern (often called client-side ABR) where bitrate and resolution scale can be adjusted in response to changing network conditions.

## What This Example Demonstrates

- standard WHIP publish lifecycle with `initWithStream(...)`
- updating encoder parameters without reconnecting:
  - `maxBitrate`
  - `scaleResolutionDownBy`
- optional active-state linkage when video is muted (`encoding.active`)
- live status feedback for applied encoding values

## How Live Encoding Updates Work

After publish starts, the **Live Video Encoding** controls are enabled.

On control changes, the example:

1. finds the active video sender on the peer connection
2. reads sender parameters (`sender.getParameters()`)
3. updates the first encoding entry:
   - set/clear `maxBitrate`
   - set `scaleResolutionDownBy`
   - optionally set `active` based on mute state
4. applies updates with `sender.setParameters(params)`

No reconnect is required because encoding parameters are updated in place on the existing sender.

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
const sender = pc?.getSenders().find((s) => s.track?.kind === 'video')
if (!sender) throw new Error('No video sender')

const params = sender.getParameters()
params.encodings = params.encodings?.length ? params.encodings : [{}]
params.encodings[0].maxBitrate = 750_000 // 750 kbps
params.encodings[0].scaleResolutionDownBy = 2 // half-resolution
await sender.setParameters(params)
```

## Reproducing This in Your Own App

1. Keep publish running and expose live encoding controls in your UI.
2. On each user/network decision, compute target bitrate/scale.
3. Update `RTCRtpSender` encoding parameters via `setParameters`.
4. Log and display applied values so operators can confirm state.
5. Optionally pair with mute state (`encoding.active`) for advanced behavior.

## Endpoint and `connectionParams`: Standalone vs Stream Manager

Live encoding updates are independent from deployment mode. Endpoint and connection setup follows the same WHIP pattern as other examples.

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
- live encoding apply path: `applyLiveVideoEncodingFromControls()`
- control readers: `readEncodingBandwidthOption()` / `readEncodingScaleOption()`
- encoding helper implementation: `applyLiveVideoEncoding()` in `src/lib/live-video-encoding.ts`
- applied summary formatter: `formatAppliedVideoEncodingSummary()`

---

Use this as a reference for client-side runtime video adaptation (bitrate/scaling control) without reconnecting an active WHIP broadcast.
