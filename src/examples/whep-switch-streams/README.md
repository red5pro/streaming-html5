# WHEP Switch Streams (`whep-switch-streams`)

This example is a standard `WHEPClient` subscribe flow with an additional post-subscribe form that requests a stream switch using `callServer(...)`.

It is a single-subscriber switch request: the active subscriber asks to switch its own playback target to another stream path.

## What This Example Demonstrates

- normal WHEP subscribe lifecycle (`init`, `subscribe`, `unsubscribe`)
- invoking server-side stream switching via `subscriber.callServer('switchStreams', ...)`
- handling `SUBSCRIBE_STREAM_SWITCH` confirmation event on success
- keeping the same subscriber connection while playback target changes

## Core Flow

After subscribe starts:

1. Enter a target stream path (for example `live/stream2`).
2. Submit the switch form.
3. Example calls:

```ts
await subscriber.callServer('switchStreams', [
  {
    path: 'live/stream2',
    isImmediate: true,
  },
])
```

4. On successful switch, subscriber receives:
   - `sdk.RTCSubscriberEventTypes.SUBSCRIBE_STREAM_SWITCH`
5. UI updates status to **Stream switched**.

## How This Differs from Interstitial

Compared with `whep-interstitial`:

- **No additional server configuration required** for this switching flow.
- **Less expressive control surface**:
  - no interstitial insert scheduling types/timing window API
  - no rich insert/resume payload model
  - no global programming-oriented behavior targeting all subscribers

This example is intentionally lightweight and focused on one subscriber request to switch playback target.

## Minimal Developer Snippet

```ts
const subscriber = new red5prosdk.WHEPClient()
await subscriber.init({
  endpoint,
  streamName,
  mediaElementId: 'subscriber-video',
  connectionParams,
})
await subscriber.subscribe()

subscriber.on('*', (event) => {
  if (event.type === red5prosdk.RTCSubscriberEventTypes.SUBSCRIBE_STREAM_SWITCH) {
    console.log('Stream switch confirmed')
  }
})

await subscriber.callServer('switchStreams', [{ path: 'live/stream2', isImmediate: true }])
```

## Endpoint and `connectionParams`: Standalone vs Stream Manager

Switch-stream behavior is independent from deployment mode. Endpoint and `connectionParams` setup follows the same WHEP pattern as other subscriber examples.

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

- switch request submit handler: `submitSwitchStream()`
- switch event handling: `onSubscriberEvent()` (`SUBSCRIBE_STREAM_SWITCH`)
- form visibility + state: `syncSwitchStreamsSection()` and `resetSwitchState()`
- subscribe lifecycle: `startSubscribe()` and `stopSubscribe()`

---

Use this example as the baseline for per-subscriber stream switching with `callServer` when you want a simple switch operation without full interstitial programming controls.
