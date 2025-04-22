# castLabs DRMtoday Integration for Encrypted Broadcast

This example demonstrates integrating with a 3rd Party library provided from `castLabs` to encrypt live video utilizing the `DRMtoday` platform.

> This example requires a version of the Red5Pro WebRTC SDK that has supported for [Insertable Streams](https://developer.mozilla.org/en-US/docs/Web/API/Insertable_Streams_for_MediaStreamTrack_API).

# Requirements

This example uses the 3rd Party library provided from `castLabs`: [encrypt-worker.js](./encrypt-worker.js). The library provides transform functions to be used in encrypted live stream that have been encrypted using `merchant` keys.

> As such - though some polyfills are included - it is advised to run this example in browsers that support `Insertable Streams`.

# Settings

This example displays the encrypted stream along with the ability to playback decrypted. In order to playback the decrypted stream, integration with `castLabs' DRMtoday` is required.

In particular, you will need to know the following that is provided as User Input settings on the interface for this example:

- `environment`: The environment on castLabs DRMtoday account that your encrypted stream resides.
- `merchant`: The merchant account within DRMtoday where the stream resides.
- `encryption mode`: The type of AES (Advanced Encryption Standard) mode used on the stream.
- `key / key id / iv`: The key, key id and iv id values to be used in decryption. These should be provided to you by the `merchant`. _Currently this is a `base64` stream._

> It is not the intent of this document to describe the `DRMtoday` platform. Please refer to their documentation for more information.
