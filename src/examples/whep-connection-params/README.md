# WHEP Connection Params (`whep-connection-params`)

This example follows the standard `WHEPClient` subscribe setup and adds a form for custom `connectionParams`.

It demonstrates how any number of key/value pairs can be appended to `connectionParams` in `init` config and passed to the server on subscribe.

## What This Example Demonstrates

- standard WHEP subscribe lifecycle with `init(...)`
- adding arbitrary connection parameter key/value entries from UI
- merging settings-derived params with user-entered params
- passing merged `connectionParams` into subscribe init config

## Important Behavior

`connectionParams` is client-specific.

- subscriber params are sent with this WHEP subscribe request
- they do **not** depend on publisher params
- they are not automatically shared across clients

`whep-connection-params` can subscribe with one set of params while `whip-connection-params` publishes with another.

## How Params Are Built in This Example

On subscribe, the example builds:

```ts
const connectionParams = {
  ...resolveConnectionParamsFromSettings(settings),
  ...readConnectionParamsFromForm(connectionParamsForm),
}
```

Those merged params are then passed to:

```ts
await subscriber.init({
  endpoint,
  streamName,
  mediaElementId: 'subscriber-video',
  connectionParams,
  // ...
})
```

## Minimal Developer Snippet

```ts
const subscriber = new red5prosdk.WHEPClient()
const connectionParams = {
  tenantId: 'acme',
  role: 'viewer',
  traceId: 'sub-456',
}

await subscriber.init({
  endpoint,
  streamName,
  mediaElementId: 'subscriber-video',
  connectionParams,
})
await subscriber.subscribe()
```

## Reproducing This in Your Own App

1. Add a dynamic key/value form for custom connection params.
2. Build an object from non-empty form rows.
3. Merge it with your app/settings-derived params.
4. Pass the merged object to `connectionParams` in `WHEPClient` init config.
5. Log sent params during development to validate expected payload shape.

## Endpoint and `connectionParams`: Standalone vs Stream Manager

Custom connection params work in either deployment mode. Endpoint routing still follows the same WHEP pattern.

### Standalone Server

```ts
const endpoint = `https://${host}:443/live/whep/${streamName}`
const connectionParams = { customKey: 'customValue' }
```

### Stream Manager

```ts
const endpoint = `https://${host}/as/v1/proxy/whep/${app}/${streamName}`
const connectionParams = {
  customKey: 'customValue',
  // plus region/nodeGroup/auth metadata as needed
}
```

## Where to Look in This Example

- merged params builder: `resolveSubscribeConnectionParams()`
- subscribe flow: `startSubscribe()`
- param form wiring: `wireConnectionParamsForm()` in `src/lib/connection-params-form.ts`
- param object reader: `readConnectionParamsFromForm()`
- debug formatter: `formatConnectionParams()`

---

Pair this with `whip-connection-params` to see the same client-specific param pattern on publish.
