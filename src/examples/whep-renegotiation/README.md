# WHEP Renegotiation (`whep-renegotiation`)

This example is a standard `WHEPClient` subscriber with a pre-subscribe form that sets `renegotiationPolicy` in the `init()` configuration.

It demonstrates how the subscriber can detect unhealthy connection conditions and allow SDK-driven reconnect/renegotiation behavior when configured.

## What This Example Demonstrates

- standard WHEP subscribe lifecycle
- pre-subscribe `renegotiationPolicy` selection
- connection-health monitoring via WebRTC/statistics events
- reconnect/renegotiation signals during poor network conditions
- health/event visualization in a dedicated connection-health panel

## `renegotiationPolicy` Configuration

The `renegotiationPolicy` init attribute is used during health/statistics monitoring to determine when the SDK should treat negotiation as degraded and respond accordingly.

Type shape:

```ts
type RenegotiationPolicyType = {
  type: 'regression' | 'timeout' | 'disconnect' | 'excessive-rtt'
  iceTimeoutInterval: number
}
```

`type` options:

- `regression`: ICE state regresses from a previously successful state
- `timeout`: ICE negotiation takes too long (uses `iceTimeoutInterval`)
- `disconnect`: peer connection disconnect is observed after negotiation trouble
- `excessive-rtt`: RTT is considered too high (severe levels are highlighted)

`iceTimeoutInterval` is used with `timeout` policy type.  
Default behavior when `renegotiationPolicy` is omitted: no policy-driven action.

## How It Is Applied in This Example

Before subscribing, the form values are read and passed directly into `subscriber.init(...)`:

```ts
const renegotiationPolicy = {
  type: policyType,
  iceTimeoutInterval: timeoutMs,
}

await subscriber.init({
  endpoint,
  streamName,
  mediaElementId: 'subscriber-video',
  connectionParams,
  stats,
  rtcConfiguration,
  renegotiationPolicy,
})
```

## Health/Policy Events

The example listens for and surfaces these negotiation-health events:

- `WebRTC.Connection.StaleStats`
- `WebRTC.Connection.StateRegression`
- `WebRTC.Connection.ExcessiveRTT`
- `WebRTC.Connection.IceTimeout`

It also listens for reconnect-related subscriber events:

- `Reconnect.Start`
- `Reconnect.Failure`

These are reflected in:

- status text
- reconnection attempt counter
- health counters/severity badges
- time-stamped event log entries

## Testing Unstable Network Conditions

The page includes a testing section with browser throttling steps. Recommended flow:

1. Open Chrome DevTools.
2. Open the Network tab.
3. Enable network throttling and select `Slow 3G`.
4. Select policy type and timeout interval in the form.
5. Start subscribe and observe health events + renegotiation attempts.
6. Restore network to normal and confirm recovery behavior.

## Minimal Developer Snippet

```ts
const subscriber = new red5prosdk.WHEPClient()

subscriber.on('*', (event) => {
  if (event.type === red5prosdk.WebRTCConnectionEventTypes.CONNECTION_HEALTH_ICE_TIMEOUT) {
    console.log('ICE timeout detected')
  }
  if (event.type === red5prosdk.SubscriberEventTypes.RECONNECT_START) {
    console.log('Renegotiation/reconnect started')
  }
})

await subscriber.init({
  endpoint,
  streamName,
  mediaElementId: 'subscriber-video',
  renegotiationPolicy: {
    type: 'regression',
    iceTimeoutInterval: 3000,
  },
})

await subscriber.subscribe()
```

## Endpoint and `connectionParams`: Standalone vs Stream Manager

Renegotiation policy behavior is independent from deployment mode. Endpoint and `connectionParams` setup follows the same WHEP patterns as other subscriber examples.

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

- policy form read/enable state: `readRenegotiationPolicy()` and `setRenegotiationFormEnabled()`
- subscribe init wiring: `startSubscribe()`
- health event handling: `handleHealthEvent()`
- health severity/counters/log rendering: `updateHealthDisplay()` and `renderHealthLog()`
- subscriber event router: `onSubscriberEvent()`

---

Use this example as the baseline for policy-driven WHEP renegotiation handling in applications that need explicit responses to degraded ICE/RTT conditions.
