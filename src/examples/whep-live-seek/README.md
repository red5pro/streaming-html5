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

## Stream Manager Proxy HLS

When the video packager writes HLS to local files (`output.type=file`) instead of S3, check
**Use Stream Manager proxy**. The example then uses this as `fullURL`:

`https://{host}/as/{version}/proxy/packager/{nodeGroup}/hls/{app}/{stream}/playlist.m3u8`

## Player Controls

By default the example uses its own control bar (untick **Use example player controls** for the
SDK's built-in one). Its timeline spans the whole recording the HLS playlist lists, from the first
segment to the live edge: click or drag to seek, and the far right end returns to live. It shows
the position and total length, the playhead's wall-clock time, and the clip range in yellow.

LiveSeekClient behaviours the example works around: its `pause()` drops its arguments, so during
HLS playback it pauses only the hidden WebRTC video, and the bar plays and pauses the video on
screen directly instead; after a switch between WebRTC and HLS it
only starts the new video if the old one was playing, so the bar restarts playback unless the
viewer paused; and it calls hls.js `recoverMediaError()` on every media error, including
non-fatal buffer stalls, which reloads the playlist at the live edge, so the example's hls.js
subclass only recovers fatal errors.

## MP4 Clip Creation

The **Playing** badge shows whether the player is on live WebRTC or the HLS recording (after a
seek back). The **● LIVE** button in the player's control bar returns to live WebRTC
(`seekTo(1)`); it is red at live and grey on HLS. When playback drops from HLS back to live, the
log says whether HLS reached the end of its duration or which hls.js error came last. The **MP4 Clip** panel cuts a range of the HLS recording into an MP4:

1. Seek the player to the clip's start and press **Set Start Time**, then seek to its end and
   press **Set End Time**. While on HLS each takes the playhead's wall-clock time (hls.js `playingDate`, from
   `EXT-X-PROGRAM-DATE-TIME`); at live, the live edge. The example passes an hls.js
   subclass as `liveSeek.hlsjsRef` to get at the player's hls.js instance.
2. Optionally add a title and press **Create MP4 Clip**.
3. The page posts `{from, to, title}` (wall-clock ISO times) to
   `POST /as/{version}/streams/package/{nodeGroup}/clip/{app}/{stream}`, then polls
   `GET .../clip/{app}/{stream}/{clipId}` until the clip is `DONE` or `FAILED`.

The video packager stream-copies the segments (no re-encode), up to 3 hours per clip. The start is
exact where the player honors MP4 edit lists. Requirements:

- Non-partitioned HLS (`hls.partition.seconds=0`).
- The playlist must still list the range: use `hls.playlist.type=event` or a large
  `hls.playlist.length.segments`.
- A range across a publisher reconnect is refused.
- S3 output: the MP4 goes to `clips/{app}/{stream}/{clipId}.mp4` in the bucket and the link is a
  presigned URL.
- File output: the MP4 is written next to the stream's HLS and downloaded through the Stream
  Manager proxy, so it is reachable only while the stream is being packaged.

When the packager has `webhook.url` set, it posts `clip_ready` or `clip_failed` once a clip
finishes (`guid` is the stream GUID):

```json
{
  "event": "clip_ready",
  "guid": "live/stream1",
  "timestamp": 1791200000000,
  "value": {
    "clipId": "6f1c…",
    "title": "Goal",
    "from": "2026-10-05T12:00:01.400Z",
    "to": "2026-10-05T12:05:01.400Z",
    "requestedDuration": 300.0,
    "duration": 300.16,
    "sizeBytes": 187654321,
    "segments": 151,
    "renderSecs": 9.8,
    "location": { "bucket": "my-bucket", "objectKey": "clips/live/stream1/6f1c….mp4" }
  }
}
```

`duration` is the MP4's probed duration (null if the probe failed). With file output `location`
is `{ "mp4Path": "hls/live/stream1/clip-6f1c….mp4" }`. `clip_failed` carries `error` instead of
`duration` and `sizeBytes`.

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
- Stream Manager proxy URL and MP4 clip panel: `src/examples/whep-live-seek/clip-panel.ts`

---

Use this as the reference pattern for adding live time-shift playback on top of WHEP subscribe when packaged HLS recording is available.
