# PubNub Client (`pubnub-client`)

This example demonstrates a standalone messaging client using `PubNubClient` from the Red5 Pro WebRTC SDK.

It is a chat-style workflow without media streaming: the client connects to PubNub, subscribes to a channel, and sends/receives messages.

## What This Example Demonstrates

- using `PubNubClient` independently of `WHIPClient`/`WHEPClient`
- PubNub auth setup options:
  - cloud endpoint token generation
  - backend service token generation
  - direct auth token input
- channel subscribe + message publish flow
- basic chat UI with sent/received message rendering

## Core Behavior

1. Configure PubNub keys, user, channel, and auth mode.
2. Initialize client with `pubnubClient.init(config)`.
3. Subscribe with `pubnubClient.subscribe(channelId)`.
4. Publish messages with `pubnubClient.publishMessage(channelId, message)`.
5. Receive messages through `PubNubEventTypes.MESSAGE_RECEIVED`.
6. Destroy client with `pubnubClient.destroy()`.

## Minimal Developer Snippet

```ts
const { PubNubClient } = window.red5prosdk

const pubnubClient = new PubNubClient()
pubnubClient.on('*', (event) => {
  console.log(`[PubNub] ${event.type}`, event.data)
})

await pubnubClient.init({
  publishKey: 'pub-c-xxxx',
  subscribeKey: 'sub-c-xxxx',
  userId: 'user-1234',
  channelId: 'red5',
  // choose exactly one auth mode:
  // authToken: 'pre-issued-token'
  // OR cloudEndpoint: 'userid-1234-abcd.cloud.red5.net'
  // OR backendUrl: 'https://your-backend-service'
})

await pubnubClient.subscribe('red5')
await pubnubClient.publishMessage('red5', 'hello from PubNubClient')
```

## Initialization Notes

The example form maps to the common init fields:

- `publishKey`: PubNub publish key
- `subscribeKey`: PubNub subscribe key
- `userId`: PubNub user identity
- `channelId`: target PubNub channel
- authentication mode (**exactly one is required**):
  - `authToken`: pre-issued token
  - `cloudEndpoint`: Red5 Cloud endpoint for token generation
  - `backendUrl`: custom backend token service

Auth behavior:

- `authToken` mode: client uses provided token directly.
- `cloudEndpoint` mode: SDK requests/generates token from Red5 Cloud endpoint.
- `backendUrl` mode: SDK requests token from your custom backend service.
- Only one of these modes should be defined for init.

## Event Highlights

Useful events surfaced in this example include:

- `AUTH_TOKEN_GENERATED`
- `AUTH_TOKEN_GENERATION_ERROR`
- `CONNECTED`
- `DISCONNECTED`
- `SUBSCRIBE_SUCCESS`
- `SUBSCRIBE_FAILURE`
- `MESSAGE_RECEIVED`
- `ERROR`

## Relation to Other Messaging Examples

Unlike `message-channel`, this example uses PubNub transport integration rather than an SDK-managed WebRTC data channel session.

Use `pubnub-client` when you want PubNub-backed messaging only; use `message-channel` when you want messaging over negotiated WebRTC DataChannel.

## Where to Look in This Example

- init + subscribe flow: `startSubscribe()`
- publish flow: `sendPubNubMessage()`
- event handling: `onPubNubEvent()`
- auth/settings form parsing: `src/lib/pubnub-configuration.ts`
- client teardown: `destroyClient()`

---

Use this example as the baseline for lightweight PubNub chat integration through the Red5 Pro SDK without coupling messaging to media streaming.
