# WHIP Resiliency (`whip-resiliency`)

This example is a standard `WHIPClient` publish flow with an additional pre-publish form for reconnect resiliency.

The reconnect form maps directly to the `reconnect` init configuration so the SDK can automatically attempt recovery when network conditions are lost.

## Prerequisite

This workflow requires the related server-side reconnect/resiliency plugin support to be enabled.

Without server support, reconnect behavior and events may not function as expected even when client reconnect settings are enabled.

## What This Example Demonstrates

- WHIP publishing with explicit reconnect configuration
- pre-publish reconnect controls in UI:
  - enable/disable reconnect
  - timeout delay between reconnect attempts
  - maximum reconnect attempts
- SDK-managed reconnect sequence (no custom reconnect loop required)
- reconnect event handling and status updates:
  - `Reconnect.Start`
  - `Reconnect.Success`
  - `Reconnect.Failure`

> Common scenarios in which having resiliency enabled and configured may for situations in which unexpected network loss or change (WiFi -> data plan) occurs for a publisher, yet you would like subscribers to still be connected until the the publisher stream starts again.

## Reconnect Configuration

The reconnect form feeds this init shape:

```ts
reconnect: {
  enabled: boolean,
  timeoutDelay: number,
  maximumReconnectAttempts: number
}
```

If `enabled` is `true`, the SDK handles reconnect internally and emits reconnect events during attempts and completion/failure.

## How It Is Applied in This Example

Before `initWithStream(...)`, the example reads the form and passes reconnect into publisher init:

```ts
const reconnect = readReconnectConfig(resiliencyForm)

await publisher.initWithStream(
  {
    endpoint,
    streamName,
    mediaElementId: 'publisher-video',
    connectionParams,
    streamMode,
    reconnect,
  },
  mediaStream
)
```

No manual reconnect orchestration is required in your app when reconnect is enabled; the SDK handles it.

## Minimal Developer Snippet

```ts
const publisher = new red5prosdk.WHIPClient()
publisher.on('*', (event) => {
  if (event.type === 'Reconnect.Start') console.log('Reconnect started')
  if (event.type === 'Reconnect.Success') console.log('Reconnect succeeded')
  if (event.type === 'Reconnect.Failure') console.log('Reconnect failed')
})

await publisher.initWithStream(
  {
    endpoint,
    streamName,
    mediaElementId: 'publisher-video',
    reconnect: {
      enabled: true,
      timeoutDelay: 3000,
      maximumReconnectAttempts: 10,
    },
  },
  mediaStream
)
await publisher.publish()
```

## Endpoint and `connectionParams`: Standalone vs Stream Manager

Reconnect settings are independent from deployment mode. Endpoint and connection parameter setup follows the same WHIP pattern as other examples.

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

- reconnect form parsing: `readReconnectConfig()` in `src/lib/publish-resiliency.ts`
- reconnect form enable/disable: `setPublishResiliencyFormEnabled()`
- reconnect form logging: `formatReconnectConfig()`
- publish flow + init wiring: `startPublish()`
- reconnect event handling: `onPublisherEvent()` (`Reconnect.Start`, `Reconnect.Success`, `Reconnect.Failure`)

---

Use this example as the baseline for enabling SDK-managed publish reconnect behavior in WHIP workflows where transient network interruptions are expected.
