# WHEP Audio Playback (`whep-audio-playback`)

This example is a standard `WHEPClient` subscribe flow, but routes playback to an HTML `audio` element instead of a `video` element.

It also includes a basic analyzer UI that visualizes incoming audio level while subscribed.

## What This Example Demonstrates

- standard WHEP subscribe lifecycle with `WHEPClient`
- assigning subscribed `MediaStream` playback to an `audio` element (`mediaElementId`)
- receiving streams that may include video tracks while rendering audio-only playback
- basic real-time level meter (fill, peak, dB readout) from the live stream

## Audio Playback Behavior

The key configuration difference is:

```ts
await subscriber.init({
  endpoint,
  streamName,
  mediaElementId: 'subscriber-audio',
  connectionParams,
})
```

With this setup, playback is attached to the `audio` element even if the incoming stream includes video tracks.

## Analyzer Flow

After subscribe:

1. wait for playback readiness (`waitForAudioSrcObject()`)
2. start analyzer with the stream assigned to the audio element (`startAudioLevelAnalyzer()`)
3. update meter UI continuously while subscribed
4. stop/dispose analyzer on unsubscribe and page unload

The analyzer prefers tapping the element stream so displayed levels reflect what users actually hear.

## Minimal Developer Snippet

```ts
const subscriber = new red5prosdk.WHEPClient()
await subscriber.init({
  endpoint,
  streamName,
  mediaElementId: 'subscriber-audio',
  connectionParams,
})
await subscriber.subscribe()

// Optional analysis
const audioEl = document.getElementById('subscriber-audio') as HTMLAudioElement
const analyzer = new AudioContext()
const source = analyzer.createMediaElementSource(audioEl)
const meter = analyzer.createAnalyser()
source.connect(meter)
meter.connect(analyzer.destination)
```

## Reproducing This in Your Own App

1. Build a normal WHEP subscribe flow.
2. Use an `audio` element and pass its id through `mediaElementId`.
3. Keep event handling for `Subscribe.Start`, `Subscribe.Fail`, `Subscribe.Stop`.
4. Start analyzer only after playback stream is present/flowing.
5. Stop and dispose analyzer when subscription ends.

## Endpoint and `connectionParams`: Standalone vs Stream Manager

Audio-element playback behavior is independent from deployment mode. Endpoint and connection setup follows the same WHEP pattern as other examples.

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

- subscribe flow: `startSubscribe()`
- playback readiness gate: `waitForAudioSrcObject()`
- analyzer startup: `startAudioLevelAnalyzer()`
- analyzer teardown: `stopAudioLevelAnalyzer()` and `audioLevelAnalyzer.dispose()`
- analyzer helper implementation: `src/lib/audio-level-analyzer.ts`

---

Pair this with `whep-basic` to compare video-element playback and audio-element playback patterns.
