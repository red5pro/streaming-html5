# Publish Failover using Red5 Pro
This is an example of utilizing the failover mechanism of the Red5 Pro HTML SDK to select a publisher based on browser support.

The default failover order is:

1. WebRTC
2. RTMP/Flash

When utilizing the auto-failover mechanism, the SDK - by default - will first test for WebRTC support and if missing will attempt to embed a publisher SWF for the broadcast.

You can define the desired failover order from using `setPublishOrder`.

### Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

## How to Publish
Publishing to a Red5 Pro stream requires a few components to function fully.

#### Including the SDK
You will need to include the Red5 Pro SDK library on the page. The root of the library is accessible from `window.red5prosdk`:

```html
<!doctype html>
<html>
  <head>
...
  </head>
  <body>
    <video id="red5pro-publisher-video"></video>
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

#### Publisher Selection
A Publisher instance is required to attach a stream and request publishing. The SDK can determine browser support and instantiate the proper Publisher implementation based on the desired failover order.

A configuration for each tech implementation must be provided to the `init` invocation:

```js
function determinePublisher () {
    var config = Object.assign({},
                   configuration,
                   getUserMediaConfiguration());
    var rtcConfig = Object.assign({}, config, {
                      protocol: 'ws',
                      port: config.rtcport,
                      streamName: config.stream1,
                      streamType: 'webrtc'
                   });
    var rtmpConfig = Object.assign({}, config, {
                      protocol: 'rtmp',
                      port: config.rtmpport,
                      streamName: config.stream1,
                      width: config.cameraWidth,
                      height: config.cameraHeight,
                      swf: '../../lib/red5pro/red5pro-publisher.swf',
                      swfobjectURL: '../../lib/swfobject/swfobject.js',
                      productInstallURL: '../../lib/swfobject/playerProductInstall.swf'
                   });

  return new Promise(function (resolve, reject) {

    var publisher = new red5pro.Red5ProPublisher();

    publisher.setPublishOrder(publishOrder)
      .init({
        rtc: rtcConfig,
        rtmp: rtmpConfig
      })
      .then(function (selectedPublisher) {
...
      });
  });
}
```

<sup>
[index.js #76](index.js#L76)
</sup>

The `init` method of the `Red5ProPublisher` returns a `Promise` that will be resolved with the instantiated Publisher implementation based on the publish order and browser support.

You can determine the selected implementation by invoking `selectedPublisher.getType()`.

> Read more about configurations and their attributes from the [Red5 Pro HTML SDK Documentation](https://github.com/infrared5/red5pro-html-sdk#publisher).

#### RTCPublisher
If the browser supports WebRTC and the `Red5ProPublisher` has instantiated the `RTCPublisher` based on failover, a `MediaStream` needs to be requested from the browser and provided to the `RTCPublisher` implementation.

This is done using the `getUserMedia` method on the `navigator` instance of the page which will return the `MediaStream` on success callback:

```js
var nav = navigator.mediaDevice || navigator;
nav.getUserMedia({
    audio: true,
    video: true
  }, function (media) {

    selectedPublisher.attachMedia(media);
    view.preview(media, true);

  }, function (error) {
    console.error('Error accessing media: ' + error);
  });
```

When requesting the `MediaStream` you provide a constraints declaration for the audio and video components.

> More information: [Media.getUserMedia from MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

<sup>
[index.js #139](index.js#L139)
</sup>

#### Publishing
The `init` method of the `Red5ProPublisher` instance returns a `Promise` which, when resolved, relays the Publisher instance determined from the failover. To start a publishing session, call the `publish` method of the Publisher resolved:

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

<sup>
[index.js #106](index.js#L106)
</sup>

### View Your Stream
After you have started a broadcast session, open a browser window and navigate to your Red5 Pro server (e.g., [http://localhost:5080/live/subscribe.jsp](http://localhost:5080/live/subscribe.jsp) to see a list of streams. Select the stream name used from this example and view in the browser using WebRTC, Flash or HLS playback options.
