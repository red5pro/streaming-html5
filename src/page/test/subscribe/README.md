# Subscribe Failover using Red5 Pro
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

## Including the SDK

You will need to include the Red5 Pro SDK library on the page. If you have not already done so, download the Red5 Pro HTML SDK from your account page: [https://account.red5pro.com/download](https://account.red5pro.com/download).

Once downloaded, unzip and move the library files - contained in the `lib` directory of the unzipped download - that makes sens for your project. _For the purposes of these examples, we have maked the entire `lib` directory into the top level of our project._

Once the required SDK files are provided and loaded on the page, the root of the library is accessible from `window.red5prosdk`:

```html
<!doctype html>
<html>
  <head>
    <title>Red5 Pro Subscriber</title>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <meta content="width=device-width, initial-scale=1, user-scalable=no" name="viewport">
    <!-- Recommended shim for WebRTC. -->
    <script src="//webrtc.github.io/adapter/adapter-latest.js"></script>
    <!-- Recommended shim for fullscreen support. -->
    <script src="lib/screenfull/screenfull.min.js"></script>
    <!-- CSS file included with Red5 Pro SDK to style playback controls of the target video element. -->
    <link rel="stylesheet" href="lib/red5pro/red5pro-media.css">
  </head>
  <body>
    <!-- Target video element to playback stream. -->
    <video id="red5pro-subscriber-video"
      autoplay controls playsinline
      class="red5pro-media red5pro-media-background"
      width="640" height="480"></video>
    <!-- Red5 Pro SDK library. -->
    <script src="lib/red5pro/red5pro.min.sdk"></script>
    <!-- The client code... -->
    <script>
      (function (window, red5pro) {

        // Turn on debugging, to be shown in the Dev Console.
        red5pro.setLogger('debug');

        // Continue with your code, more examples below.

      })(window, window.red5prosdk);
    </script>
  </body>
</html>
```

## Subscriber Selection & Initialization

A Subscriber instance is required to attach a stream and request subscription. The SDK can determine browser support and instantiate the proper Subscriber implementation based on the desired failover order.

The available Playback Techs supported by the Red5 Pro SDK are:

* WebRTC
* Flash/RTMP
* HLS

> *NOTE*: Aside from the recommendation to utilize the [adapter.js](https://github.com/webrtc/adapter) library to "shim" similar functionality across WebRTC-supported browesers, the Red5 Pro SDK itself does not provide any polyfills for support. As such, the SDK checks the inherent support of the browser in its failover process. For example, if your browser does not inherently support HLS (most browsers aside from Desktop and Mobile Safari), then you will need to use a 3rd Party library in order to provide such support.

When requesting to playback a stream using failover, you will need to provide an initialization configuration for each desired tech. To do so, provide a `rtc`, a `rtmp` and a `hls` configuration property within the configuraiton object passed through `init()` invocation:

```js
var config = {
  rtcport: 8081,
  rtmpport: 1935,
  hlsport: 5080
};
var rtcConfig = Object.assign({}, config, {
  protocol: 'ws',
  port: config.rtcport,
  subscriptionId: 'subscriber-' + instanceId,
  streamName: config.stream1
})
var rtmpConfig = Object.assign({}, config, {
  protocol: 'rtmp',
  port: config.rtmpport,
  streamName: config.stream1,
  mimeType: 'rtmp/flv',
  swf: '../../lib/red5pro/red5pro-subscriber.swf',
  swfobjectURL: '../../lib/swfobject/swfobject.js',
  productInstallURL: '../../lib/swfobject/playerProductInstall.swf'
})
var hlsConfig = Object.assign({}, config, {
  protocol: 'http',
  port: config.hlsport,
  streamName: config.stream1,
  mimeType: 'application/x-mpegURL'
})

  var subscriber = new red5pro.Red5ProSubscriber();
  subscriber.setPlaybackOrder(subscribeOrder)
    .init({
      rtc: rtcConfig,
      rtmp: rtmpConfig,
      hls: hlsConfig
    })
    .then(function (selectedSubscriber) {
      // We have successfully found a playback tech from the list...
    });
});
```

_The test in this section perfoms a similar request through `determineSubscriber`._

[index.js #42](index.js#L42)

The `init` method of the `Red5ProSubscriber` returns a `Promise`-like object that will be resolved with the instantiated Subscriber implementation based on the subscriber order and browser support.

You can determine the selected implementation by invoking `selectedSubscriber.getType()`.

> Read more about configurations and their attributes from the [Red5 Pro HTML SDK Documentation](https://github.com/infrared5/red5pro-html-sdk#subscriber).

### Subscribing

The `init` method of the `Red5ProSubscriber` instance returns a `Promise`-object which, when resolved, relays the Subscriber instance determined from the failover. To start a subscribing session, call the `subscribe` method of the Subscriber resolved:

```js
subscriber.setPlaybackOrder(subscribeOrder)
  .init({
    rtc: rtcConfig,
    rtmp: rtmpConfig,
    hls: hlsConfig
  })
  .then(function (selectedSubscriber) {
    return selectedSubscriber.subscribe();
  })
  .then(function () {
    console.log('Successfully started a subscription session!');
  })
  .catch(function () {
    console.error('Could not start a subscription session: ' + error);
  })
```

[index.js #93](index.js#L93)

