<h3 align="center">
  <img src="../assets/Red5_Truetime_black.png" alt="Red5 Pro Logo" height="65" />
</h3>
<p align="center">
  <a href="../README.md">Quick Start</a> &bull;
  <a href="moq-publisher.md">MOQ Publishing</a> &bull;
  <a href="moq-subscriber.md">MOQ Subscribing</a> &bull;
  <a href="#">MOQ Catalog</a> &bull;
  <a href="moq-message-channel.md">MOQ Message Channel</a> &bull;
  <a href="whip-client.md">WHIP/WHEP Docs</a>
</p>

---

# MOQCatalog

`MOQCatalog` is a lightweight client for reading stream catalog data from a MOQ relay.

Use it when you want to inspect track metadata without starting full media playback. You can either:

- perform a one-shot `fetch()` (then close), or
- open a `subscribe()` session for catalog updates over time.

* [Usage](#usage)
* [Init Configuration](#init-configuration)
* [Events](#events)

# Usage

Initialize first, then call either `fetch()` or `subscribe()`.

```js
const { MOQCatalog, MOQCatalogEventTypes } = red5prosdk

const catalog = new MOQCatalog()
catalog.on('*', event => {
  console.log(event.type, event.data)
})

await catalog.init({
  endpoint: 'https://relay.example.com:4433',
  namespace: 'live/mystream'
})
```

## One-shot fetch

```js
// Namespace argument is optional when `init()` already set `namespace`.
await catalog.fetch('live/mystream')
// Catalog is emitted via CATALOG_RECEIVED, then the session closes (UNFETCH).
```

`fetch(namespace?, fetchOptions?)` issues a MoQ FETCH for the catalog track. `fetchOptions` is optional:

| Property | Default | Description |
| :--- | :---: | :--- |
| `startGroup` | `0` | First group to fetch. |
| `startObject` | `0` | First object in `startGroup`. |
| `endGroup` | `0` | Last group to fetch. |
| `endObject` | `0` | Last object in `endGroup`. |

```js
await catalog.fetch('live/mystream', {
  startGroup: 0,
  startObject: 0,
  endGroup: 0,
  endObject: 0
})
```

## Continuous subscribe

```js
// Namespace argument is optional when `init()` already set `namespace`.
await catalog.subscribe('live/mystream')
// Later:
await catalog.unsubscribe()
```

`subscribe(namespace?, joiningFetch = true)` issues a MoQ SUBSCRIBE for the catalog track (`LargestObject` filter).

When `joiningFetch` is `true` (the default), the client also sends a **relative joining FETCH** (offset `0`) so you receive the current catalog, not only later updates. On **draft 14**, subscribe waits up to 5 seconds for `SUBSCRIBE_OK` before that join. Pass `false` to subscribe only:

```js
await catalog.subscribe('live/mystream', false)
```

## Constructor with URL

Passing URL to constructor auto-runs internal init.

```js
const catalog = new MOQCatalog('https://relay.example.com:4433/live/mystream')
await catalog.fetch()
```

# Init Configuration

The `init()` call accepts `MOQCatalogConfigType`.

| Property | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `endpoint` | [-] | `undefined` | Full MOQ relay URL. If omitted, SDK uses `protocol://host:port`. |
| `host` | [x]* | `undefined` | Relay host when `endpoint` is omitted. |
| `streamName` | [x]* | `undefined` | Stream name used for namespace fallback. |
| `protocol` | [x] | `https` | Relay protocol (`ws`, `wss`, `http`, `https`). |
| `port` | [x] | `4433` | Relay port. |
| `app` | [x] | `live` | App scope used for namespace fallback. |
| `namespace` | [-] | `app/streamName` | Explicit namespace for fetch/subscribe calls. |
| `draftVersion` | [-] | `16` | MoQ transport draft version. |
| `certKey` | [-] | `undefined` | Certificate hash input for WebTransport setup. |
| `moqtLogLevel` | [-] | `none` | Log level for MOQ internals. |

`*` Required when `endpoint` is not provided.

# Events

`MOQCatalog` is an event emitter:

```js
const onCatalogEvent = event => {
  const { type, data } = event
  console.log(type, data)
}

catalog.on('*', onCatalogEvent)
// later
catalog.off('*', onCatalogEvent)
```

The following are emitted from `MOQCatalogEventTypes`:

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `FETCH` | `MOQ.Catalog.Fetch` | One-shot fetch started. |
| `UNFETCH` | `MOQ.Catalog.Unfetch` | One-shot fetch session closed. |
| `SUBSCRIBE` | `MOQ.Catalog.Subscribe` | Live catalog subscription started. |
| `UNSUBSCRIBE` | `MOQ.Catalog.Unsubscribe` | Live catalog subscription stopped. |
| `CATALOG_RECEIVED` | `MOQ.Catalog.Received` | Parsed catalog delivered. See payload below. |
| `CATALOG_PARSE_ERROR` | `MOQ.Catalog.Parse.Error` | Catalog payload parse failed. `data.error` is the thrown `Error`. |
| `MESSAGE` | `MOQ.Catalog.Message` | Other relay control messages. `data.message` is the raw control message. |
| `FAIL` | `MOQ.Catalog.Fail` | Session or request failure. `data.error` is the error object. |
| `CLOSE` | `MOQ.Catalog.Close` | Relay/session closed. |

### `CATALOG_RECEIVED` payload

`event.data.catalog` is an accumulator result (deltas are applied internally):

| Field | Meaning |
| :--- | :--- |
| `mode` | How this object was parsed: `cf01-independent`, `cf01-delta`, `msf-independent`, `msf-delta`, or `empty`. |
| `rawText` | UTF-8 catalog bytes as text. |
| `state` | Current catalog after this object: `{ version, tracks, generatedAt? }`. Track metadata lives on `state.tracks`. |

```js
catalog.on(MOQCatalogEventTypes.CATALOG_RECEIVED, event => {
  const { mode, state } = event.data.catalog
  console.log(mode, state.tracks)
})
```
