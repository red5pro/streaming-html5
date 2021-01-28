# Publish Failover using Red5 Pro

This is an example of utilizing the failover mechanism of the Red5 Pro HTML SDK to select a publisher based on browser support.

The default failover order is:

1. WebRTC
2. RTMP/Flash

When utilizing the auto-failover mechanism, the SDK - by default - will first test for WebRTC support and if missing will attempt to embed a publisher SWF for the broadcast.

You can define the desired failover order from using `setPublishOrder`.

## Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

# How to Publish

Publishing to a Red5 Pro stream requires a few components to function fully.

## Including the SDK

You will need to include the Red5 Pro SDK library on the page. If you have not already done so, download the Red5 Pro HTML SDK from your account page: [https://account.red5pro.com/download](https://account.red5pro.com/download).

Once downloaded, unzip and move the library files - contained in the `lib` directory of the unzipped download - that makes sens for your project. _For the purposes of these examples, we have maked the entire `lib` directory into the top level of our project._

Once the required SDK files are provided and loaded on the page, the root of the library is accessible from `window.red5prosdk`:

```html
<!doctype html>
<html>
  <head>
    <title>Red5 Pro Publisher</title>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <meta content="width=device-width, initial-scale=1, user-scalable=no" name="viewport">
    <!-- Recommended shim for WebRTC. -->
    <script src="//webrtc.github.io/adapter/adapter-latest.js"></script>
  </head>
  <body>
    <!-- Target video element to playback stream. -->
    <video id="red5pro-publisher"
      autoplay controls playsinline
      width="640" height="480"></video>
    <!-- Red5 Pro SDK library. -->
    <script src="lib/red5pro/red5pro.min.sdk"></script>
    <!-- The client code... -->
    <script>
      (function (window, red5pro) {

        // Turn on debugging, to be shown in the Dev Console.
        red5pro.setLogger(red5pro.LOG_LEVELS.DEBUG);

        // Continue with your code, more examples below.

      })(window, window.red5prosdk);
    </script>
  </body>
</html>
```

## Publisher Selection & Initialization

A Publisher instance is required to attach a stream and request publishing. The SDK can determine browser support and instantiate the proper Publisher implementation based on the desired failover order.

The available Publisher Techs supported by the Red5 Pro SDK are:

* WebRTC
* Flash/RTMP

> *NOTE*: Aside from the recommendation to utilize the [adapter.js](https://github.com/webrtc/adapter) library to "shim" similar functionality across WebRTC-supported browesers, the Red5 Pro SDK itself does not provide any polyfills for support. As such, the SDK checks the inherent support of the browser in its failover process.

When requesting to publish a stream using failover, you will need to provide an initialization configuration for each desired tech. To do so, provide a `rtc`, and a `rtmp` configuration property within the configuraiton object passed through `init()` invocation:

```js
var config = {
  rtcport: 5080,
  rtmpport: 1935
};
var rtcConfig = Object.assign({}, config, {
  protocol: 'ws',
  port: config.rtcport,
  streamName: config.stream1
})
var rtmpConfig = Object.assign({}, config, {
  protocol: 'rtmp',
  port: config.rtmpport,
  streamName: config.stream1,
  mediaConstraints: {
    video: {
      width: config.cameraWidth,
      height: config.cameraHeight
     },
     audio: true
  },
  swf: 'lib/red5pro/red5pro-subscriber.swf',
  swfobjectURL: 'lib/swfobject/swfobject.js',
  productInstallURL: 'lib/swfobject/playerProductInstall.swf'
})


var publisher = new red5pro.Red5ProPublisher();
publisher.setPublishOrder(['rtc', 'rtmp'])
  .init({
    rtc: rtcConfig,
    rtmp: rtmpConfig
  })
  .then(function (selectedPublisher) {
    // We have successfully found a publisher tech from the list...
  });
```

[index.js #95](index.js#L95)

The `init` method of the `Red5ProPublisher` returns a `Promise`-like object that will be resolved with the instantiated Publisher implementation based on the publish order and browser support.

You can determine the selected implementation by invoking `selectedPublisher.getType()`.

> Read more about configurations and their attributes from the [Red5 Pro HTML SDK Documentation](https://red5pro.com/docs/client/webrtc/publisher/overview/).

### Publishing

The `init` method of the `Red5ProPublisher` instance returns a `Promise`-like object which, when resolved, relays the Publisher instance determined from the failover. To start a publishing session, call the `publish` method of the Publisher resolved:

```js
publisher.setPublishOrder(publishOrder)
  .init({
    rtc: rtcConfig,
    rtmp: rtmpConfig
  })
  .then(function (selectedPublisher) {
    return selectedPublisher.publish();
  })
  .then(function () {
    console.log('Successfully started a broadcast session!');
  })
  .catch(function () {
    console.error('Could not start a broadcast session: ' + error);
  })
```

[index.js #130](index.js#L130)

## View Your Stream

After you have started a broadcast session, open a browser window and navigate to your Red5 Pro server (e.g., [http://localhost:5080/live/subscribe.jsp](http://localhost:5080/live/subscribe.jsp) to see a list of streams. Select the stream name used from this example and view in the browser using WebRTC, Flash or HLS playback options.
