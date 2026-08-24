# WHEP Reconnect (`whep-reconnect`)

This example demonstrates application-managed reconnect for `WHEPClient` subscribers.

The SDK does not provide built-in auto-reconnect for WHEP subscribers, so your app must decide when to retry and how to schedule reconnect attempts.

## What This Example Demonstrates

- standard WHEP subscribe flow
- reconnect trigger on init/subscribe exception
- reconnect trigger on subscriber events via `isSubscriberReconnectEvent(...)`
- debounced retry orchestration using a reconnect controller (2s delay)
- reconnect attempt tracking and UI/log visibility

## Reconnect Triggers Used in This Example

This example retries in two broad cases:

1. **Init/Subscribe exception**
   - if `init(...)` or `subscribe()` throws, initial connect is considered failed and a reconnect is scheduled
2. **Reconnect signal events**
   - event type matches `isSubscriberReconnectEvent(...)`
   - currently:
     - `Connect.Failure`
     - `Subscribe.Connection.Closed`
     - `Subscribe.Play.Unpublish`

## About `Subscribe.Play.Unpublish`

`Subscribe.Play.Unpublish` is server-originated and indicates the publisher stream is currently unavailable.

Common causes include upstream publisher disconnect or transient publisher-side network disruption. The publisher may return later, so subscriber reconnect retries can be appropriate.

## How Reconnect Is Structured

Reconnect flow is handled by `SubscriberReconnectController` in `src/lib/subscriber-reconnect.ts`:

- `scheduleReconnect(reason)` sets a delayed retry (2 seconds)
- `runReconnect(...)` executes reconnect callback and tracks attempts
- success resets attempts and cancels pending timers
- failure/error schedules the next retry
- user stop (`markStopped()`) cancels retries and resets attempt state

In `src/examples/whep-reconnect/index.ts`, reconnect callback does:

1. teardown existing subscriber instance
2. create/init/subscribe a fresh `WHEPClient`
3. restore status/buttons on success

## Minimal Developer Snippet

```ts
const reconnectController = new SubscriberReconnectController({
  reconnect: async () => {
    await teardownSubscriber()
    return connectSubscriber()
  },
})

async function startSubscribe() {
  const ok = await connectSubscriber()
  if (!ok) reconnectController.scheduleReconnect('init/subscribe failure')
}

subscriber.on('*', (event) => {
  if (isSubscriberReconnectEvent(event.type, red5prosdk.SubscriberEventTypes)) {
    reconnectController.scheduleReconnect(event.type)
  }
})
```

## Endpoint and `connectionParams`: Standalone vs Stream Manager

Reconnect logic is independent from deployment mode. Endpoint and `connectionParams` resolution follows the same WHEP pattern as other subscriber examples.

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

## Important Distinction from WHIP Reconnect

This example is not paired with publisher reconnect examples (`whip-resiliency` / `whip-reconnect`) and does not use publisher-side reconnect configuration.

Publisher reconnect uses a different mechanism (`reconnect` init config for `WHIPClient`) with server-assisted handling.  
This WHEP example shows subscriber-side retry logic implemented in application code.

## Where to Look in This Example

- reconnect trigger utility: `isSubscriberReconnectEvent()` in `src/lib/subscriber-reconnect.ts`
- reconnect scheduler/controller: `SubscriberReconnectController`
- initial connect path: `connectSubscriber()`
- reconnect kickoff on first failure: `startSubscribe()`
- event-driven reconnect scheduling: `onSubscriberEvent()`
- subscriber teardown between attempts: `teardownSubscriber()`

---

Use this example as the baseline for implementing resilient WHEP playback when your app needs subscriber retry behavior after transient disconnects or upstream publisher loss.
