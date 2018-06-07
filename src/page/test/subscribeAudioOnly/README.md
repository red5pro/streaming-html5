# Subscribing with Audio Only
This example demonstrates playback of a stream with audio only.

**Please refer to the [Basic Subscriber Documentation](../subscribe/README.md) to learn more about the basic setup.**

## Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

> These examples use the WebRTC-based Subscriber implementation from the Red5 Pro HTML SDK. However, there is failover support to allow for Flash-based subscriber on unsupported browsers.

# Audio Element

The `audio` element is used for the assignment of the media stream blob:

```html
<audio id="red5pro-subscriber" controls autoplay class="red5pro-media"></audio>
```

# Subscribing & Playback

Initialization and playback of a Red5 Pro stream in an `audio` element is similar to one in a `video` element:

```js
var subscriber = new red5pro.RTCSubscriber();
subscriber.init(config)
  .then(function () {
    return subscriber.subscribe();
  })
  .then(function () {
    console.log('Successfully started a subscription session!');
  })
  .catch(function (error) {
    console.error('Could not start a subscription session: ' + error);
  });
```

[index.js #112](index.js#L112]
