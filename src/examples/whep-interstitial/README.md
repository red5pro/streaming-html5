# WHEP Interstitial (`whep-interstitial`)

This example starts as a standard `WHEPClient` subscriber, then adds post-subscribe controls that tell the server to switch playback to an interstitial stream without disconnecting.

It also supports resuming the original target stream after an insert.

> A common example is ad insertion on a live stream.

## What This Example Demonstrates

- standard WHEP subscribe lifecycle (`init` + `subscribe`)
- server-directed interstitial switching during active playback
- resume command to return to the original target stream
- interstitial request UI that is enabled only after subscribe starts

## Core Behavior

Once subscribe is active:

- **Switch to Interstitial** posts an `inserts` payload to the interstitial endpoint.
- **Resume** posts a `resume` payload for the target stream.
- Playback remains connected; stream selection is changed server-side.

## Server-Side Requirements

### Standalone

- Interstitial support is preconfigured in the `live` webapp (default `app` context in most setups).
- Requests are sent directly to:
  - `/{app}/interstitial` (for example, `/live/interstitial`)

### Stream Manager

Stream Manager deployments must use `InterstitialStream` for `clientBroadcastStream`.

In `red5-common.xml`, switch this bean:

```xml
<!-- default -->
<bean
  id="clientBroadcastStream"
  scope="prototype"
  lazy-init="true"
  class="com.red5pro.override.ProStream"
/>

<!-- interstitial-enabled -->
<bean
  id="clientBroadcastStream"
  scope="prototype"
  lazy-init="true"
  class="com.red5pro.interstitial.InterstitialStream"
/>
```

## Interstitial Payload Notes

The server supports two payload modes:

- `inserts`: switch to interstitial content
- `resume`: return to target stream

If both `resume` and `inserts` are present, `resume` takes precedence and `inserts` is ignored.

### Example: Inserts

```json
{
  "user": "any",
  "digest": "any",
  "inserts": [
    {
      "id": 3,
      "target": "live/stream1",
      "uri": "live/stream2",
      "loop": true,
      "type": "INDEFINITE",
      "isInterstitialVideo": true,
      "isInterstitialAudio": true,
      "start": 0,
      "duration": 30000
    }
  ]
}
```

### Example: Resume

```json
{
  "user": "any",
  "digest": "any",
  "resume": "live/stream1"
}
```

## Field Reference

- `user`: required by API contract; passed through to request handlers
- `digest`: required by API contract; passed through to request handlers
- `inserts`: array of interstitial insert operations
- `id`: insert id; typically for request tracking
- `target`: target live stream path (`app/streamName`)
- `uri`: inserted stream path (or FLV name in `webapps/live/streams`)
- `loop`: whether inserted FLV loops
- `isInterstitialAudio`: whether audio channel is switched (default true)
- `isInterstitialVideo`: whether video channel is switched (default true)
- `type`: duration control (`INDEFINITE`, `STREAM_CLOCK`, `WALL_CLOCK`)
- `start`: start time in milliseconds
- `duration`: duration in milliseconds
- `resume`: stream path to resume (`app/streamName`)

In this testbed code, the insert field is named `interstitial` in `src/lib/interstitial-api.ts`, but it represents the same concept as `uri` in the generic API description.

## Endpoint Differences: Standalone vs Stream Manager

### Standalone

Direct POST to:

```ts
;`${protocol}://${host}:${port}/${app}/interstitial`
```

### Stream Manager

POST is forwarded through Stream Manager to the resolved origin interstitial endpoint:

```ts
;`http://${originHost}:5080/${app}/interstitial`
```

The helper handles this routing via `forwardPOSTRequest(...)` after origin resolution.

## Minimal Developer Snippet

```ts
const subscriber = new red5prosdk.WHEPClient()
await subscriber.init({
  endpoint,
  streamName,
  mediaElementId: 'subscriber-video',
  connectionParams,
})
await subscriber.subscribe()

await postInterstitialSwitch(
  { settings, user: 'admin', digest: 'changeme' },
  {
    target: 'live/stream1',
    interstitial: 'live/stream2',
    loop: true,
    type: 'INDEFINITE',
    isInterstitialAudio: true,
    isInterstitialVideo: true,
    start: '0',
    duration: '30000',
  }
)

await postInterstitialResume({ settings, user: 'admin', digest: 'changeme' }, 'live/stream1')
```

## Where to Look in This Example

- subscribe flow: `startSubscribe()`
- switch request submit: `submitInterstitialSwitch()`
- resume request submit: `submitInterstitialResume()`
- interstitial endpoint + POST routing: `src/lib/interstitial-api.ts`
- post-subscribe UI enable/disable: `syncInterstitialSection()`

---

Pair this with `whep-basic` to compare standard subscribe playback and interstitial-controlled playback.
