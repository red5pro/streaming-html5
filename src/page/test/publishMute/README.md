# Publishing on Red5 Pro
This is the basic starter example on publishing to a Red5 Pro stream using the Red5 Pro HTML SDK.

### Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

> These examples use the WebRTC-based Publisher implementation from the Red5 Pro HTML SDK. However, there is failover support to allow for Flash-base publisher on unsupported browsers.

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

#### Publisher & Viewer
A Publisher instance - for the purposes of these examples, the `RTCPublisher` implementation - is required to attach a stream and request publishing. Additionally, a `PublisherView` is required to "preview" the stream in the browser:

```js
var publisher = new red5pro.RTCPublisher();
var view = new red5pro.PublisherView('red5pro-publisher-video');
```

<sup>
[index.js #57](index.js#L57)
</sup>

#### MediaStream
A `MediaStream` needs to be requested from the browser and provided to the `RTCPublisher` implementation. This is done using the `getUserMedia` method on the `navigator` instance of the page which will return the `MediaStream` on success callback:

```js
var nav = navigator.mediaDevice || navigator;
nav.getUserMedia({
    audio: true,
    video: true
  }, function (media) {
...
  }, function (error) {
    console.error('Error accessing media: ' + error);
  });
```

When requesting the `MediaStream` you provide a constraints declaration for the audio and video components.

> More information: [Media.getUserMedia from MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

<sup>
[index.js #64](index.js#L64)
</sup>

#### Preview the Stream
To preview a `MediaStream` returned from `getUserMedia`, add the stream to the Publisher instance and `PublisherView` which has a reference to a `video` DOM element:

```js
var nav = navigator.mediaDevice || navigator;
nav.getUserMedia({
    audio: true,
    video: true
  }, function (media) {

    // Upon access of user media,
    // 1. Attach the stream to the publisher.
    // 2. Show the stream as preview in view instance.
    // 3. Associate publisher & view (optional).
    publisher.attachStream(media);
    view.preview(media, true);
    view.attachPublisher(publisher);

  }, function (error) {
    console.error('Error accessing media: ' + error);
  });
```

<sup>
[index.js #71](index.js#L71)
</sup>

#### Configuration & Initialization
The Publisher instance needs to be initialized with a configuration describing the remote endpoint that it needs to connect and stream to:

```js
var configuration = {
  protocol: 'ws',
  host: 'localhost',
  port: 8081,
  app: 'live',
  streamName: 'stream1',
  iceServers: [
    {
      "urls": "stun:stun2.l.google.com:19302"
    }
  ]
};

publisher.init(configuration)
  .then(function () {
...
  })
  .catch(function (error) {
...
  });
```

<sup>
[index.js #88](index.js#L88)
</sup>

> Read more about configurations and their attributes from the [Red5 Pro HTML SDK Documentation](https://github.com/infrared5/red5pro-html-sdk#publisher).

#### Publishing
The `init` method of the Publisher instance returns a `Promise` which, when resolved, relays the capability to start a publishing session. Use the resolve of the `Promise` to start a Red5 Pro stream:

```js
publisher.init(configuration)
  .then(function () {
    return publisher.publish();
  })
  .then(function () {
    console.log('Successfully started a broadcast session!');
  })
  .catch(function () {
    console.error('Could not start a broadcast session: ' + error);
  })
```

<sup>
[index.js #101](index.js#L101)
</sup>

### View Your Stream
After you have started a broadcast session, open a browser window and navigate to your Red5 Pro server (e.g., [http://localhost:5080/live/subscribe.jsp](http://localhost:5080/live/subscribe.jsp) to see a list of streams. Select the stream name used from this example and view in the browser using WebRTC, Flash or HLS playback options.
