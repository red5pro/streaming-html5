# WebRTC Subscriber Switch over stream manager proxy

Through WebRTC over stream manager proxy, the current subscriber's stream may be switched to another live stream. This example demonstrates that the process is essentially the same as with a standalone server.

This example is based on the _subscribestreamManagerProxy_ example. See that example's [README](../subscribestreamManagerProxy/README.md) for details on subscribing. Like the subscriber example, this example assumes there is a live stream by default named "stream1".

This example demonstrates using the `callServer` API to invoke a method on the Application Adapter of the target app. The `callServer` method returns a `Promise`-like object that can additional deliver return data from the server.

[WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
[WebRTC](https://developer.mozilla.org/en-US/docs/Web/Guide/API/WebRTC)

### Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# Calling the server

The `switchStreams` server call requires two pieces of data:

- **`path`** to the live stream. This includes the context path and stream name, e.g., "live/stream1".
- **`isImmediate`** -- if **true**, the audio will switch immediately and the original stream's video will freeze, and the video will switch to the new stream at the next keyframe. If **false**, the original continues uninterrupted until a new keyframe is received on the new stream, at which point audio and video switch simultaneously.

The server call then contains a JSON array with a single entry containing these two parameters:

```javascript
targetSubscriber.callServer('switchStreams', [
  {
    path: streamPath.value,
    isImmediate: true,
  },
])
```

The server responds with a message:

```javascript
{
  "data": {
    "type": "result",
    "message": "Stream switch: Success"
  }
}
```
