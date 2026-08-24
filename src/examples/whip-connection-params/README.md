# WHIP Connection Params (`whip-connection-params`)

This example follows the standard `WHIPClient` publish setup and adds a form for custom `connectionParams`.

It demonstrates how any number of key/value pairs can be appended to `connectionParams` in `init` config and passed to the server on publish.

## What This Example Demonstrates

- standard WHIP publish lifecycle with `initWithStream(...)`
- adding arbitrary connection parameter key/value entries from UI
- merging settings-derived params with user-entered params
- passing merged `connectionParams` into publish init config

## Important Behavior

`connectionParams` is client-specific.

- publisher params are sent with this WHIP publish request
- they do **not** depend on subscriber params
- they are not automatically shared with other clients

In other words, `whip-connection-params` and `whep-connection-params` can use completely different parameter sets.

## How Params Are Built in This Example

On publish, the example builds:

```ts
const connectionParams = {
  ...resolveConnectionParamsFromSettings(settings),
  ...readConnectionParamsFromForm(connectionParamsForm),
}
```

Those merged params are then passed to:

```ts
await publisher.initWithStream({
  endpoint,
  streamName,
  mediaElementId: 'publisher-video',
  connectionParams,
  // ...
}, mediaStream)
```

## Minimal Developer Snippet

```ts
const publisher = new red5prosdk.WHIPClient()
const connectionParams = {
  region: 'us-east',
  tenantId: 'acme',
  traceId: 'abc-123',
}

await publisher.initWithStream(
  {
    endpoint,
    streamName,
    mediaElementId: 'publisher-video',
    connectionParams,
  },
  mediaStream
)
await publisher.publish()
```

## Reproducing This in Your Own App

1. Add a dynamic key/value form for custom connection params.
2. Build an object from non-empty form rows.
3. Merge it with your app/settings-derived params.
4. Pass the merged object to `connectionParams` in `WHIPClient` init config.
5. Log sent params during development to validate expected payload shape.

## Endpoint and `connectionParams`: Standalone vs Stream Manager

Custom connection params work in either deployment mode. Endpoint routing still follows the same WHIP pattern.

### Standalone Server

```ts
const endpoint = `https://${host}:443/live/whip/${streamName}`
const connectionParams = { customKey: 'customValue' }
```

### Stream Manager

```ts
const endpoint = `https://${host}/as/v1/proxy/whip/${app}/${streamName}`
const connectionParams = {
  customKey: 'customValue',
  // plus region/nodeGroup/auth metadata as needed
}
```

## Where to Look in This Example

- merged params builder: `resolvePublishConnectionParams()`
- publish flow: `startPublish()`
- param form wiring: `wireConnectionParamsForm()` in `src/lib/connection-params-form.ts`
- param object reader: `readConnectionParamsFromForm()`
- debug formatter: `formatConnectionParams()`

---

Pair this with `whep-connection-params` to see the same client-specific param pattern on subscribe.
