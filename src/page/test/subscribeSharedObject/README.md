# Subscribe Failover using Red5 Pro
This is an example of utilizing the failover mechanism of the Red5 Pro HTML SDK to select a subscriber based on browser support.

The default failover order is:

1. WebRTC
2. RTMP/Flash
3. HLS

When utilizing the auto-failover mechanism, the SDK - by default - will first test for WebRTC support and if missing will attempt to embed a subscriber SWF for the broadcast. If Flash is not supported in the browser, it will finally attempt to playback using HLS.

You can define the desired failover order from using `setPlaybackOrder`.

### Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

## How to Subscribe
Subscribing to a Red5 Pro stream requires a few components to function fully.

#### Including the SDK
You will need to include the Red5 Pro SDK library on the page. The root of the library is accessible from `window.red5prosdk`:

```html
<!doctype html>
<html>
  <head>
...
  </head>
  <body>
    <video id="red5pro-subscriber-video"></video>
...
    <script src="lib/red5pro/red5pro.min.sdk"></script>
    <script>
      (function (window, red5pro) {
...
      })(window, window.red5prosdk);
    </script>
...
  </body>
</html>
```

#### Subscriber Selection
A Subscriber instance is required to attach a stream and request subscription. The SDK can determine browser support and instantiate the proper Subscriber implementation based on the desired failover order.

A configuration for each tech implementation must be provided to the `init` invocation:

```js
function determineSubscriber () {
  var config = Object.assign({}, configuration);
  var rtcConfig = Object.assign({}, config, {
    protocol: 'ws',
    port: config.rtcport,
    subscriptionId: 'subscriber-' + instanceId,
    streamName: config.stream1,
    bandwidth: {
      audio: 50,
      video: 256,
      data: 30 * 1000 * 1000
    }
  })
  var rtmpConfig = Object.assign({}, config, {
    protocol: 'rtmp',
    port: config.rtmpport,
    streamName: config.stream1,
    mimeType: 'rtmp/flv',
    useVideoJS: false,
    width: config.cameraWidth,
    height: config.cameraHeight,
    swf: '../../lib/red5pro/red5pro-subscriber.swf',
    swfobjectURL: '../../lib/swfobject/swfobject.js',
    productInstallURL: '../../lib/swfobject/playerProductInstall.swf'
  })
  var hlsConfig = Object.assign({}, config, {
    protocol: 'http',
    port: config.hlsport,
    streamName: config.stream1,
    mimeType: 'application/x-mpegURL',
    swf: '../../lib/red5pro/red5pro-video-js.swf',
    swfobjectURL: '../../lib/swfobject/swfobject.js',
    productInstallURL: '../../lib/swfobject/playerProductInstall.swf'
  })

  return new Promise(function (resolve, reject) {

    var subscriber = new red5pro.Red5ProSubscriber();

    subscriber.setPlaybackOrder(subscribeOrder)
      .init({
        rtc: rtcConfig,
        rtmp: rtmpConfig,
        hls: hlsConfig
      })
      .then(function (selectedSubscriber) {
...
      });
  });
}
```

<sup>
[index.js #42](index.js#L42)
</sup>

The `init` method of the `Red5ProSubscriber` returns a `Promise` that will be resolved with the instantiated Subscriber implementation based on the subscriber order and browser support.

You can determine the selected implementation by invoking `selectedSubscriber.getType()`.

> Read more about configurations and their attributes from the [Red5 Pro HTML SDK Documentation](https://github.com/infrared5/red5pro-html-sdk#subscriber).

#### Subscribing
The `init` method of the `Red5ProSubscriber` instance returns a `Promise` which, when resolved, relays the Subscriber instance determined from the failover. To start a subscribing session, call the `playback` method of the Subscriber resolved:

```js
subscriber.setPlaybackOrder(subscribeOrder)
  .init({
    rtc: rtcConfig,
    rtmp: rtmpConfig,
    hls: hlsConfig
  })
  .then(function (selectedSubscriber) {
    return selectedSubscriber.play();
  })
  .then(function () {
    console.log('Successfully started a subscription session!');
  })
  .catch(function () {
    console.error('Could not start a subscription session: ' + error);
  })
```

<sup>
[index.js #93](index.js#L93)
</sup>
