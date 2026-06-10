# Publish with Stream Manager Proxy — Optimization Params

This example is the same Stream Manager proxy WHIP publish path as [Publish Stream Manager Proxy Live Encodings](../publishStreamManagerProxyEncodings/), but it configures and updates **`optimizationParams`** instead of raw RTCRtpSender encoding controls.

For the same behavior against a direct (non–Stream Manager) origin, see [Publish - Optimization Params](../../test/publishOptimizationParams/).

**Please refer to the [Basic Publisher Documentation](../../test/publish/README.md) to learn more about the basic setup.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

## What `optimizationParams` does

The Red5 Pro HTML SDK `WHIPClient` accepts an optional init property `optimizationParams` with the following shape (from the SDK typings / documentation):

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

These align with [MediaStreamTrack.contentHint](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/contentHint) and WebRTC sender [degradation preference](https://developer.mozilla.org/en-US/docs/Web/API/RTCRtpSender/setParameters#degradationpreference). The SDK property name is spelled **`degradationPreference`** (matching the published type definition).

## Test behavior

1. Choose **`contentHint`** and **`degradationPreference`** from the form (use `(not set)` to omit a field).
2. Click **Start Publish** — publishing does **not** start on page load.
3. After the stream is live, change the selects and click **Apply optimization params** to call **`WHIPClient.updateOptimizationParams`** without tearing down the session.

For the clearest comparison, open a subscriber in another browser or tab while you change values.

## Init snippet

```js
const rtcConfig = {
  // ...endpoint, streamName, mediaConstraints, etc.
  optimizationParams: {
    contentHint: 'motion',
    degradationPreference: 'balanced'
  }
}
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
