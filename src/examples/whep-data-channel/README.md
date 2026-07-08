# WHEP Data Channel (`whep-data-channel`)

This example shows how to subscribe with `WHEPClient` and receive DataChannel payloads in three forms:

- RPC invoke messages
- JSON/text DataChannel messages
- binary audio payloads (`ArrayBuffer`) for playback

It also lets you configure `dataChannelConfiguration` to match publisher channel behavior.

## What This Example Demonstrates

- enabling DataChannel support during `WHEPClient.init(...)`
- configuring channel options (`name`, `ordered`, `maxRetransmits`, `maxPacketLifeTime`)
- receiving RPC messages from publisher `send(...)`
- receiving JSON/text payloads from `dataChannel.send(...)`
- receiving binary payloads and converting to playable audio

## DataChannel Setup in `init`

DataChannel is enabled by adding two fields to subscriber init:

```ts
await subscriber.init({
  endpoint,
  streamName,
  mediaElementId: 'subscriber-video',
  connectionParams,
  includeDataChannel: true,
  dataChannelConfiguration, // name + reliability/ordering options
})
```

## Receiving Paths in the SDK Event Stream

### 1) RPC-style invoke messages

Handled from subscriber event:

- `Subscribe.Send.Invoke`

The example extracts payload and appends a timestamped receipt (`RPC Message` section).

### 2) JSON/text DataChannel payloads

Handled from:

- `WebRTC.DataChannel.Message`

If payload resolves to text/JSON, the example appends it to the `JSON Message` receipt area.

### 3) Binary DataChannel payloads

Also handled from:

- `WebRTC.DataChannel.Message`

If payload resolves to `ArrayBuffer` (or typed-array view), the example:

1. infers a likely audio mime type
2. creates a `Blob`
3. sets an object URL on the audio element
4. reveals playback controls in the `Audio Snippet` section

## Parsing Strategy Used by the Example

`handleDataChannelMessageAsync(...)` delegates parsing to utilities that:

- normalize payload extraction from SDK event envelopes
- classify payload as JSON/text vs binary
- support `ArrayBuffer`, typed array views, strings, and object-like envelopes

This makes receive handling resilient across different payload shapes.

## Minimal Developer Snippet

```ts
const subscriber = new red5prosdk.WHEPClient()
subscriber.on('*', (event) => {
  if (event.type === 'Subscribe.Send.Invoke') {
    console.log('RPC payload:', event.data)
    return
  }
  if (event.type === 'WebRTC.DataChannel.Message') {
    const payload = event.data
    const data = (payload as any)?.message?.data ?? payload

    if (data instanceof ArrayBuffer) {
      console.log('Binary bytes:', data.byteLength)
      return
    }
    if (typeof data === 'string') {
      console.log('JSON/text:', data)
      return
    }
    console.log('Other payload:', data)
  }
})

await subscriber.init({
  endpoint,
  streamName,
  mediaElementId: 'subscriber-video',
  includeDataChannel: true,
  dataChannelConfiguration: {
    name: 'red5pro',
    ordered: true,
  },
})
await subscriber.subscribe()
```

## Channel Lifecycle and UI Behavior

- receipt panels are shown only during active subscribe
- receipts are reset/cleared on stop
- binary playback object URLs are revoked to avoid leaks
- DataChannel lifecycle events are logged:
  - `WebRTC.DataChannel.Available`
  - `WebRTC.DataChannel.Close`
  - `WebRTC.DataChannel.Error`
  - `WebRTC.DataChannel.Message`

## Where to Look in This Example

- init + DataChannel config wiring: `startSubscribe()`
- RPC receive path: `onSubscriberEvent()` → `handleRpcInvoke()`
- DataChannel message receive path: `onSubscriberEvent()` / listener → `handleDataChannelMessageAsync()`
- payload parsing helpers: `src/lib/data-channel-receive.ts`
- receipt UI/reset logic: `syncSubscribeReceiptsSection()` and `resetReceiptDisplays()`

---

Pair this with `whip-data-channel` for the send-side API usage (`send`, `dataChannel.send`, and `sendData`) that produces these receipts.
