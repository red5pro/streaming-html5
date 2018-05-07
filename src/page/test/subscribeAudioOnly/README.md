# Subscribing with Audio Only
This example demonstrates playback of a stream with audio only.

**Please refer to the [Basic Subscriber Documentation](../subscribe/README.md) to learn more about the basic setup.**

### Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

> These examples use the WebRTC-based Subscriber implementation from the Red5 Pro HTML SDK. However, there is failover support to allow for Flash-based subscriber on unsupported browsers.

## Audio Element
The `audio` element is used for the assignment of the media stream blob:

```html
<audio id="red5pro-subscriber-audio" controls class="video-element"></audio>
```

## Subscribing & Playback
Initialization and playback of a Red5 Pro stream in an `audio` element is similar to one in a `video` element:

```js
var view = new red5pro.PlaybackView('red5pro-subscriber-audio');
var subscriber = new red5pro.RTCSubscriber();
view.attachSubscriber(subscriber);

subscriber.init(config)
  .then(function () {
    return subscriber.play();
  })
  .then(function () {
    console.log('Successfully started a subscription session!');
  })
  .catch(function (error) {
    console.error('Could not start a subscription session: ' + error);
  });
```

<sup>
[index.js #76](index.js#L76]
</sup>
