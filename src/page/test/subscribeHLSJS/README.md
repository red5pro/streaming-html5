# Subscribe with hls.js (HLS Only)

This example uses the `hls.js` library to playback a live broadcast in HLS.

> More information: [https://github.com/video-dev/hls.js/tree/master](https://github.com/video-dev/hls.js/tree/master).

This example differs from the [Subscriber HLS](../subscribeHLS) example in that it forces the use of `hls.js` for playback. The [Subscriber HLS](../subscribeHLS) example uses `hls.js` as a failover if your browser does not support HLS natively (essentially, every browser but Safari and Mobile Safari).

## Note

Using `hls.js` directly to playback streams does not utilize the Red5 Pro HTML SDK. As such, you will not have the complete integration with server notifications and metadata updates.

> You can utilize standalone [Shared Objects](../sharedObject) for communication purposes if required for your application.

### Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**
