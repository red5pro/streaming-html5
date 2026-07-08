# Message Channel (`message-channel`)

This example demonstrates using `MessageChannel` (via `MessageClient`) for peer messaging without media publish/subscribe.

Under the hood, the SDK negotiates a WebRTC connection with a data channel and uses it for chat-style communication only (no camera/microphone video pipeline required for core messaging).

## What This Example Demonstrates

- data-channel-only messaging client flow
- opening/closing a message channel session
- configurable `RTCDataChannel` options (name, ordered/unordered, retransmit/lifetime modes)
- JSON text chat messaging between peers
- optional binary audio snippet send/receive over the same data channel

## Core Behavior

1. User configures DataChannel settings.
2. App creates a dynamic stream name from DataChannel name + random suffix.
3. `MessageChannel.init(...)` is called with `includeDataChannel: true`.
4. `open()` establishes the channel.
5. Peer messages are sent/received through DataChannel events.

## Minimal Developer Snippet

```ts
const channel = new red5prosdk.MessageChannel()

channel.on('*', (event) => {
  if (event.type === red5prosdk.MessageChannelEventTypes.RECEIVE) {
    console.log('Message received', event.data)
  }
})

await channel.init({
  endpoint,
  streamName,
  includeDataChannel: true,
  dataChannelConfiguration: {
    name: 'red5pro',
    ordered: true,
  },
})

await channel.open()
await channel.send(JSON.stringify({ message: 'hello' }))
```

## Peer Testing Pattern

The example includes an **Open Chat Peer** link that opens another `message-channel` instance.  
Use two tabs/windows to validate send/receive behavior between peers.

## Endpoint and `connectionParams`: Standalone vs Stream Manager

`MessageChannel` endpoint setup follows the same environment rules as other SDK clients, while still focusing on data-channel-only messaging behavior.

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

- channel open flow: `startChannel()`
- channel close flow: `stopChannel()`
- channel event handling: `onChannelEvent()`
- JSON send flow: `sendJsonMessage()`
- binary message flow: `startBinaryMessageRecording()` and `handleMessageChannelReceive()`
- DataChannel form wiring: `src/lib/data-channel-configuration.ts`

---

Use this example as the baseline for adding lightweight chat/messaging capabilities through Red5 Pro data channels when media streaming is not required.
