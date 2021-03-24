# Unpublishing and optionally removing preview

This is an example of removing the video preview and releasing Media browser access when using the `clearMediaOnUnpublish` configuration property of a broadcast stream.

> **WebRTC Only**

## Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

# clearMediaOnUnpublish

The `clearMediaOnUnpublish` configuration property for a publisher is a `boolean` value that either retains Media capture and preview in a `video` element if left as default (`false`), or releases the Media (camera, microphone and tab indicator of a browser) and removes the preview from the `video` element if set to `true`.

The default of `false` is by design for some frontends that require to maintain the Camera and Microphone connections between broadcasting sessions.

However, this default design can be overriden by setting the `clearMediaOnUnpublish` config property value to `true`. When requesting to `unpublish`, this will affectively:

* Removal of media video in the target `video` element
* Release of the Camera from the browser
* Release of the Microphone from the browser

> To the end-user, this will turn off the camera light of the Camera being used.

Internally, what the SDK does is:

1. Set the `srcObject` on the target `video` element to `null`.
2. Traverses and stops all the `MediaStreamTracks` of the underlying `MediaStream`.
