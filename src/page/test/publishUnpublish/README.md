# Unpublishing and optionally removing preview

This is an example of requesting to remove the video preview and release Media browser access when calling to `unpublish` a broadcast stream.

> **WebRTC Only**

## Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

# Unpublish

The `unpublish` API of the `RTCPublisher` has a default parameter that keeps the preview video of an establshed publisher as the source for the target `video` element. Additionally, this maintains the browser Media connection of the Camera and Microphone.

This is by design for some frontends that require to maintain the Camera and Microphone connections between broadcasting sessions.

However, this default design can be overriden by providing a `true` argument value when invoking `unpublish` on an `RTCPublisher`. The result of doing so will be:

* Removal of media video in the target `video` element
* Release of the Camera from the browser
* Release of the Microphone from the browser

> To the end-user, this will turn off the camera light of the Camera being used.

```js

var publisher = new RTCPublisher()
publisher
  .init(config)
  .then(() => {
    return publisher.publish()
  })

...

// Providing `true` will release the video preview and browser connection of Media.
publisher.unpublish(true)
```
