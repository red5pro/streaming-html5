# WHEP Remote Call (`whep-remote-call`)

This example shows how to subscribe with `WHEPClient` and receive RPC-style remote calls sent by a publisher.

It is the receive-side pair for `whip-remote-call`.

## What This Example Demonstrates

- WHEP subscribe lifecycle with `WHEPClient`
- enabling DataChannel in init to support remote-call delivery
- configuring DataChannel reliability/ordering options
- handling remote-call receipts from `Subscribe.Send.Invoke`
- rendering timestamped RPC receipts in the UI

## How Remote Call Receiving Works

When the publisher sends:

```ts
publisher.send(method, { message, timestamp })
```

the subscriber receives an event of type:

- `Subscribe.Send.Invoke`

The example then:

1. extracts payload (`extractRpcInvokePayload(...)`)
2. formats it (`formatRpcInvokeReceipt(...)`)
3. prepends a timestamp line (`formatReceiptLine(...)`)
4. appends to the `RPC Message` receipt panel

## DataChannel Setup

The example initializes subscriber with DataChannel options:

```ts
await subscriber.init({
  endpoint,
  streamName,
  mediaElementId: 'subscriber-video',
  connectionParams,
  includeDataChannel: true,
  dataChannelConfiguration,
})
```

As in other DataChannel examples, the config comes from the form:

- `name`
- `ordered`
- `maxRetransmits` (mode `max-retransmits`)
- `maxPacketLifeTime` (mode `max-lifetime`)

## Minimal Developer Snippet

```ts
const subscriber = new red5prosdk.WHEPClient()
subscriber.on('*', (event) => {
  if (event.type === 'Subscribe.Send.Invoke') {
    console.log('RPC received:', event.data)
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

## Endpoint and `connectionParams`: Standalone vs Stream Manager

Remote-call receipt behavior is independent from deployment mode. Endpoint and connection parameter setup follows the same WHEP pattern as other examples.

### Standalone Server

- `endpoint` targets the server directly for WHEP egress.
- `connectionParams` is optional unless your server/plugins require extra values.

```ts
const endpoint = `https://${host}:443/live/whep/${streamName}`
const connectionParams = {}
```

### Stream Manager

- `endpoint` targets Stream Manager proxy routing.
- `connectionParams` commonly includes Stream Manager and auth metadata.

```ts
const endpoint = `https://${host}/as/v1/proxy/whep/${app}/${streamName}`
const connectionParams = {
  // e.g. region, nodeGroup, auth metadata
}
```

## Where to Look in This Example

- init + DataChannel config wiring: `startSubscribe()`
- remote-call event handling: `onSubscriberEvent()` (`Subscribe.Send.Invoke`)
- receipt formatter/writer: `handleRpcInvoke()` and `appendRpcReceipt()`
- payload/format helpers: `src/lib/data-channel-receive.ts`
- receipt panel lifecycle: `syncSubscribeReceiptsSection()` and `clearRpcReceipts()`

---

Pair this with `whip-remote-call` for the sender-side `publisher.send(...)` flow.
