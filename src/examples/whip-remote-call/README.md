# WHIP Remote Call (`whip-remote-call`)

This example shows how to publish with `WHIPClient` and send RPC-style remote calls to subscribers.

Unlike `whip-data-channel`, this page focuses on remote-call messaging (`publisher.send(...)`) rather than JSON/binary payload handling.

## What This Example Demonstrates

- WHIP publish lifecycle with `WHIPClient`
- enabling DataChannel in init so remote-call paths are available
- configuring DataChannel reliability/ordering options
- sending RPC invokes with a user-selected method name
- pairing with `whep-remote-call` for receive-side receipts

## How Remote Call Sending Works

After publish starts, the UI exposes an RPC form:

- **Method**: remote-call method name (default: `incomingNotification`)
- **Message**: payload text

Submit triggers:

```ts
await publisher.send(method, {
  message: trimmedText,
  timestamp: Date.now(),
})
```

In this repo, that call is wrapped by `sendRpcToSubscribers(...)`.

## DataChannel Setup

The example includes DataChannel settings in publisher init:

```ts
await publisher.init({
  endpoint,
  streamName,
  mediaElementId: 'publisher-video',
  connectionParams,
  includeDataChannel: true,
  dataChannelConfiguration,
})
```

`dataChannelConfiguration` is built from the UI:

- `name`
- `ordered`
- `maxRetransmits` (when mode is `max-retransmits`)
- `maxPacketLifeTime` (when mode is `max-lifetime`)

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

// Remote call / RPC fan-out to subscribers
await publisher.send('incomingNotification', {
  message: 'Hello from publisher',
  timestamp: Date.now(),
})
```

## Endpoint and `connectionParams`: Standalone vs Stream Manager

Remote-call behavior is independent from deployment mode. Endpoint and connection parameter setup follows the same WHIP pattern as other examples.

### Standalone Server

- `endpoint` targets the server directly (origin).
- `connectionParams` is optional unless your server/plugins require extra values.

```ts
const endpoint = `https://${host}:443/live/whip/${streamName}`
const connectionParams = {}
```

### Stream Manager

- `endpoint` targets Stream Manager proxy routing.
- `connectionParams` commonly includes Stream Manager and auth metadata.

```ts
const endpoint = `https://${host}/as/v1/proxy/whip/${app}/${streamName}`
const connectionParams = {
  // e.g. region, nodeGroup, auth metadata
}
```

## Where to Look in This Example

- init + DataChannel config wiring: `startPublish()`
- RPC send handler: `sendRpcMessage()`
- RPC send helper: `sendRpcToSubscribers()` in `src/lib/data-channel-messaging.ts`
- DataChannel options form wiring: `wireDataChannelForm()` in `src/lib/data-channel-configuration.ts`
- publisher event/status handling: `onPublisherEvent()`

---

Pair this with `whep-remote-call` to see how `Subscribe.Send.Invoke` is handled on the subscriber side.
