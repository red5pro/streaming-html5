# Recognizing Broadcast Mute with Subscribers using Red5 Pro

This is an example of utilizing the failover mechanism of the Red5 Pro HTML SDK to select a subscriber based on browser support.

The default failover order is:

1. WebRTC
2. RTMP/Flash
3. HLS

When utilizing the auto-failover mechanism, the SDK - by default - will first test for WebRTC support and if missing will attempt to embed a subscriber SWF for the broadcast. If Flash is not supported in the browser, it will finally attempt to playback using HLS.

You can define the desired failover order from using `setPlaybackOrder`.

> For more detailed information on Configuring and Subscribing with the Red5 Pro SDK, please visit the [Red5 Pro Documentation](https://www.red5pro.com/docs/streaming/subscriber.html).

## Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

# How to Subscribe

Subscribing to a Red5 Pro stream requires a few components to function fully.

> The examples in this repo also utilize various es2015 shims and polyfills to support ease in such things as `Object.assign` and `Promises`. You can find the list of these utilities used in [https://github.com/red5pro/streaming-html5/tree/master/static/lib/es6](feature/update_docs_RPRO-5153).

# How to Recognize Mute of Media from a Broadcast

The publisher can "mute" and "unmute" their Camera and Micrphone during a broadcast - meaning they can toggle sending stream data from their Camera or Microphone during a live broadcast session.

Subscribers are notified of the "mute/unmute" event in the form of Metadata from the server. The metadata property is `streamingMode` and can be defined with the following values:

* `Video/Audio` - Both Camera and Microphone are being streamed.
* `Video` - Only the Camera is being streamed.
* `Audio` - Only the Microphone is being streamed.
* `Empty` - Neither Camera nor Microphone are being streamed.

In addition to the `streamingMode` being provided on Metadata Events, the HTML SDK also has a specific event you - as a developer - can listen for to react to changes to "mute/unmute" from a publisher:

* SDK Access: `red5prosdk.SubscriberEventTypes.STREAMING_MODE_CHANGE`
* String Value: `Subscribe.StreamingMode.Change`

## Example

After having established a subscriber, assign a handler to the `Subscriber.StreamignMode.Change` event:

```js
new red5prosdk.Red5ProSubscriber()
  .init(config)
  .then(function (subscriber) {
    subscriber.on(red5prosdk.SubscriberEventTypes.STREAMING_MODE_CHANGE, handleStreamingModeChange);
    return subscriber.subscribe()
  })
```

The event handler:

```js
function handleStreamingModeChange (metadata) {
  console.log('[Red5ProSubscriber] Broadcast Streaming Mode changed from (' + metadata.previousStreamingMode + ') to (' + metadata.streamingMode + ').');
  switch (metadata.streamingMode) {
    case 'Empty':
      broadcastStatus.innerText = 'Publisher has turned off their Camera and Microphone.'
      broadcastStatus.classList.remove('hidden');
      break;
    case 'Audio':
      broadcastStatus.innerText = 'Publisher has turned off their Camera.'
      broadcastStatus.classList.remove('hidden');
      break;
    case 'Video':
      broadcastStatus.innerText = 'Publisher has turned off their Microphone.'
      broadcastStatus.classList.remove('hidden');
      break;
    default:
      broadcastStatus.classList.add('hidden');
      break;
  }
}
```
