# WHIP Data Channel (`whip-data-channel`)

This example shows how to publish with `WHIPClient` and use an RTCDataChannel for three outbound payload styles:

- RPC-style message fan-out via `publisher.send(...)`
- direct JSON messages over the DataChannel
- binary audio (`ArrayBuffer`) over the DataChannel

It also includes UI controls for `dataChannelConfiguration` so you can test ordered/reliability behavior.

## What This Example Demonstrates

- enabling DataChannel support during `WHIPClient.init(...)`
- configuring channel options (`name`, `ordered`, `maxRetransmits`, `maxPacketLifeTime`)
- detecting readiness with `WebRTC.DataChannel.Available`
- sending text/JSON payloads
- sending binary payloads from a recorded microphone snippet

## DataChannel Setup in `init`

DataChannel is enabled by adding two fields to publisher init:

```ts
await publisher.init({
  endpoint,
  streamName,
  mediaElementId: 'publisher-video',
  connectionParams,
  includeDataChannel: true,
  dataChannelConfiguration, // name + reliability/ordering options
})
```

The UI section **DataChannel Settings** maps directly to `dataChannelConfiguration`.

## Sending Messages: Three Paths

### 1) RPC-style to subscribers (server fan-out)

The example sends RPC with:

```ts
await publisher.send('incomingNotification', {
  message: trimmedText,
  timestamp: Date.now(),
})
```

In this repo, this is wrapped by `sendRpcToSubscribers(...)`.

### 2) JSON payload on the DataChannel

The example gets the channel and uses `dataChannel.send(...)`:

```ts
const dc = publisher.getDataChannel()
dc.send(JSON.stringify({ message, sender_id, timestamp: Date.now() }))
```

In this repo, this is wrapped by `sendJsonDataChannelMessage(...)`.

### 3) Binary payload (`ArrayBuffer`) on the DataChannel

The example records ~5 seconds from the active microphone, creates an `ArrayBuffer`, then sends with:

```ts
await publisher.sendData?.(arrayBuffer)
```

In this repo, recording/sending is handled by `startBinaryRecording(...)`.

## Readiness and Error Handling

- send UI is enabled only after publish starts and DataChannel is open
- `WebRTC.DataChannel.Available` marks channel-ready state
- sends are rejected when the channel is missing or not `open`
- channel lifecycle events are logged:
  - `WebRTC.DataChannel.Available`
  - `WebRTC.DataChannel.Close`
  - `WebRTC.DataChannel.Error`
  - `WebRTC.DataChannel.Message`

## Minimal Developer Snippet

```ts
const publisher = new red5prosdk.WHIPClient()
await publisher.init({
  endpoint,
  streamName,
  mediaElementId: 'publisher-video',
  includeDataChannel: true,
  dataChannelConfiguration: {
    name: 'red5pro',
    ordered: true,
  },
})
await publisher.publish()

// RPC-style message
await publisher.send('incomingNotification', { message: 'hello', timestamp: Date.now() })

// JSON DataChannel message
const dc = publisher.getDataChannel()
if (dc && dc.readyState === 'open') {
  dc.send(JSON.stringify({ kind: 'chat', message: 'hello json' }))
}

// Binary DataChannel message
const bytes = new Uint8Array([1, 2, 3, 4]).buffer
await publisher.sendData?.(bytes)
```

## Where to Look in This Example

- init + DataChannel config wiring: `startPublish()`
- RPC send path: `sendRpcMessage()` and `sendRpcToSubscribers()`
- JSON send path: `sendJsonMessage()` and `sendJsonDataChannelMessage()`
- binary recording/send path: `startBinaryMessageRecording()` and `startBinaryRecording()`
- DataChannel readiness/events: `onPublisherEvent()`

---

Pair this with `whep-data-channel` to see how RPC, JSON, and binary messages are received and rendered on subscribe.
