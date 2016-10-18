# Subscribing on Red5 Pro
This is the basic starter example on subscribing to a Red5 Pro stream using the Red5 Pro HTML SDK.

### Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

> These examples use the WebRTC-based Subscriber implementation from the Red5 Pro HTML SDK. However, there is failover support to allow for Flash-based and HLS-based subscribers on unsupported browsers.

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

#### Subscriber & Viewer
A Subscriber instance - for the purposes of these examples, the `RTCSubscriber` implementation - is required to attach a stream and request playback. Additionally, a `PlaybackView` is required to view the stream in the browser:

```js
var view = new red5pro.PlaybackView('red5pro-subscriber-video');
var subscriber = new red5pro.RTCSubscriber();
view.attachSubscriber(subscriber);
```

<sup>
[index.js #77](index.js#L77)
</sup>

#### Configuration & Initialization
The Subscriber instance needs to be initialized with a configuration describing the remote endpoint that it needs to connect and consume streams from:

```js
var configuration = {
  protocol: 'ws',
  host: 'localhost',
  port: 8081,
  app: 'live',
  streamName: 'stream1',
  bandwidth: {
    audio: 50,
    video: 256,
    data: 30 * 1000 * 1000
  }
};

subscriber.init(configuration)
  .then(function () {
...
  })
  .catch(function (error) {
...
  });
```

<sup>
[index.js #97](index.js#L97)
</sup>

> Read more about configurations and their attributes from the [Red5 Pro HTML SDK Documentation](https://github.com/infrared5/red5pro-html-sdk#publisher).

#### Subscribing & Playback
The `init` method of the Subscriber instance returns a `Promise` which, when resolved, relays the capability to start a subscription session. Use the resolve of the `Promise` to start a Red5 Pro stream playback:

```js
subscriber.init(configuration)
  .then(function () {
    return subscriber.play();
  })
  .then(function () {
    console.log('Successfully started a subscription session!');
  })
  .catch(function () {
    console.error('Could not start a subscription session: ' + error);
  })
```

<sup>
[index.js #92](index.js#L92)
</sup>
