# Publish with Optimization Params (WebRTC)

This example is the non–Stream Manager counterpart to [Publish Stream Manager Proxy Optimization Params](../../sm-test/publishStreamManagerProxyOptimizationParams/). It uses the same testbed settings as [Publish - Live Encodings](../publishEncodings/) (direct `WHIPClient` to your configured host) but configures and updates **`optimizationParams`** instead of RTCRtpSender encoding controls.

> To see how changes affect playback, open a [Basic Subscriber](../subscribe) in another tab or window.

**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

## `optimizationParams`

The Red5 Pro HTML SDK `WHIPClient` accepts an optional init property `optimizationParams`:

```typescript
{
  degradationPreference?:
    | 'balanced'
    | 'maintain-framerate'
    | 'maintain-resolution'
    | 'maintain-framerate-and-resolution'
  contentHint?:
    | 'speech'
    | 'speech-recognition'
    | 'text'
    | 'music'
    | 'detail'
    | 'motion'
}
```

These map to [MediaStreamTrack.contentHint](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/contentHint) and WebRTC sender [degradation preference](https://developer.mozilla.org/en-US/docs/Web/API/RTCRtpSender/setParameters#degradationpreference). If your SDK typings use an alternate spelling for the preference field, match the published `OptimizationParams` type from your SDK version.

## Test usage

1. Choose **`contentHint`** and **`degradationPreference`** (or `(not set)` to omit a field).
2. Click **Start Publish** — publishing does not start on page load.
3. After the stream is live, adjust the selects and click **Apply optimization params** to call **`WHIPClient.updateOptimizationParams`** without reconnecting.

## Init snippet

```js
const rtcConfig = Object.assign({}, configuration, {
  mediaConstraints: { /* ... */ },
  streamName: configuration.stream1,
  optimizationParams: {
    contentHint: 'motion',
    degradationPreference: 'balanced'
  }
})
const publisher = new WHIPClient()
await publisher.init(rtcConfig)
await publisher.publish()
```

## Live update snippet

```js
publisher.updateOptimizationParams({
  contentHint: 'detail',
  degradationPreference: 'maintain-framerate'
})
```
