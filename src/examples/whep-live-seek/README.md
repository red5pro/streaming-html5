# WHEP Live Seek (`whep-live-seek`)

This example uses `LiveSeekClient` to subscribe to a live stream and scrub backward in that live feed without disconnecting.

`LiveSeekClient` is effectively a WHEP-based subscriber with additional live-seek behavior layered on top.

## What This Example Demonstrates

- Stream Manager based subscribe flow with `LiveSeekClient`
- live playback plus seek-back (DVR-style) capability during an active session
- selecting either a `baseURL` or `fullURL` for HLS recording access
- HLS.js-assisted playback under the hood for recorded fragment seeking

## Stream Manager Only

This example is intended for Stream Manager deployments.

In code, the example enforces this requirement and blocks subscribe when Stream Manager is disabled.

## VideoPackager Requirement

For live seek to work, your deployment must include a VideoPackager node.

The VideoPackager is responsible for:

- recording/packaging live output
- making HLS artifacts available to storage/endpoints (for example CDN, S3, NFS)
- providing the recorded content source used by `baseURL` / `fullURL`

Without this packaging path, there is no seekable HLS recording for `LiveSeekClient` to load.

## How Live Seek Works

At runtime, the client subscribes over WebRTC and also uses HLS playback data for time-shifted seeking.

In practice:

1. WebRTC handles low-latency live playback.
2. HLS.js handles fragment/manifest loading for seek-back playback.
3. The SDK coordinates between live playback and recorded content access.

## `liveSeek` Initialization Config

Enable live-seek by adding `liveSeek` to the `LiveSeekClient` init configuration.

```js
{
  enabled: <boolean>,
  baseURL: <string | undefined>,
  fullURL: <string | undefined>,
  hlsjsRef: <hls.js reference | undefined>,
  hlsElement: <HTMLVideoElement | undefined>,
  options: <object | undefined>
}
```

- `enabled`: enables/disables live seek behavior.
- `baseURL`: optional base endpoint where HLS files are hosted.
- `fullURL`: optional full path to the target HLS manifest.
- `hlsjsRef`: optional [HLS.js](https://github.com/video-dev/hls.js/) reference; if omitted, SDK checks global `window.Hls`.
- `hlsElement`: optional target video element for HLS media attachment; SDK can manage this when omitted.
- `options`: optional HLS.js options (example default in this testbed: `{ debug: true, backBufferLength: 0 }`).

Example shape:

```ts
await subscriber.init({
  endpoint,
  streamName,
  mediaElementId: 'subscriber-video',
  connectionParams,
  liveSeek: {
    enabled: true,
    baseURL,
    fullURL,
    options: { debug: true, backBufferLength: 0 },
  },
})
```

## `baseURL` vs `fullURL`

Use one or the other for HLS access:

- `baseURL`: provide the parent location; SDK resolves the app/stream manifest path.
- `fullURL`: provide the exact `.m3u8` URL; SDK uses it directly.

Examples:

- base URL: `https://yourcdn/company`
- full URL: `https://yourcdn/company/live/stream1.m3u8`

## Standalone vs Stream Manager Endpoint Notes

This example still subscribes through the WHEP endpoint resolution from Settings, but operationally it is documented and validated as Stream Manager-only due to VideoPackager and remote HLS workflow expectations.

## Minimal Developer Snippet

```ts
const subscriber = new red5prosdk.LiveSeekClient()

await subscriber.init({
  endpoint,
  streamName,
  mediaElementId: 'subscriber-video',
  connectionParams,
  liveSeek: {
    enabled: true,
    // choose one:
    baseURL: 'https://yourcdn/company',
    // fullURL: 'https://yourcdn/company/live/stream1.m3u8',
  },
})

await subscriber.subscribe()
```

## Events to Watch

When live seek is enabled, useful SDK events include:

- `WebRTC.LiveSeek.Enabled`
- `WebRTC.LiveSeek.Disabled`
- `WebRTC.LiveSeek.FragmentLoading`
- `WebRTC.LiveSeek.FragmentLoaded`

## Where to Look in This Example

- subscribe setup + `liveSeek` config: `startSubscribe()`
- settings validation (Stream Manager requirement): `ensureCoreSettings()`
- URL mode handling (`baseURL` / `fullURL`): `resolveLiveSeekUrlValues()`
- HTML URL mode controls: `src/examples/whep-live-seek/index.html`

---

Use this as the reference pattern for adding live time-shift playback on top of WHEP subscribe when packaged HLS recording is available.
