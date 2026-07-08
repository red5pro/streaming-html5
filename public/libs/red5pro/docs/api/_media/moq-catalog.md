<h3 align="center">
  <img src="../assets/Red5_Truetime_black.png" alt="Red5 Pro Logo" height="65" />
</h3>
<p align="center">
  <a href="../README.md">Quick Start</a> &bull;
  <a href="moq-publisher.md">MOQ Publishing</a> &bull;
  <a href="moq-subscriber.md">MOQ Subscribing</a> &bull;
  <a href="#">MOQ Catalog</a> &bull;
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
// Note: Namespace argument is optional.
await catalog.fetch('live/mystream')
// Catalog is emitted via events, then session closes automatically.
```

## Continuous subscribe

```js
// Note: Namespace argument is optional.
await catalog.subscribe('live/mystream')
// Later:
await catalog.unsubscribe()
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
| `CATALOG_RECEIVED` | `MOQ.Catalog.Received` | Parsed catalog payload delivered. |
| `CATALOG_PARSE_ERROR` | `MOQ.Catalog.Parse.Error` | Catalog payload parse failed. |
| `MESSAGE` | `MOQ.Catalog.Message` | Control message from relay. |
| `FAIL` | `MOQ.Catalog.Fail` | Session or request failure. |
| `CLOSE` | `MOQ.Catalog.Close` | Relay/session closed. |
