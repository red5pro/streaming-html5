# castLabs DRMtoday Integration for Decrypted Playback

This example demonstrates integrating with a 3rd Party library provided from `castLabs` to playback decrypted live video from the `DRMtoday` platform.

> This example requires a version of the Red5Pro WebRTC SDK that has supported for [Insertable Streams](https://developer.mozilla.org/en-US/docs/Web/API/Insertable_Streams_for_MediaStreamTrack_API).

# Requirements

This example uses the 3rd Party library provided from `castlabs`: [rtc-drm-transform](../../../../static/lib/castlabs/rtc-drm-transform/rtc-drm-transform.min.js). The library provides transform functions to be used in decrypting live stream that have been encrypted using `merchant` keys.

## Transforms

The transform utilities are imported from the `castLabs` library for use as such:

```js
import {
  getRtcDrmTransformVersion,
  setDrm,
  videoTransformFunction,
  audioTransformFunction,
  Environments,
} from '../../lib/castlabs/rtc-drm-transform/rtc-drm-transform.min.js'
```

And then provided to a Red5Pro `RTCSubscriber` during initialization:

```js
const transforms = {
  video: videoTransformFunction,
  audio: audioTransformFunction,
  worker: worker,
}
subscriber = await new red5prosdk.RTCSubscriber().init(config, transforms)
```

This will inform the Red5Pro WebRTC SDK to use the transform functions for decryption.

### WebWorker

`Insertable Streams` on Safari uses `RTCRtpScriptTransform` which takes a Web Worker to perform transformations on stream data. As such, included with this example is a basic [worker.js](worker.js) to handle description on Safari.

It is provided in the `transforms` argument of `init()` (see above) as a `worker` property. The SDK will determin if `RTCRtpScriptTransform` is supported in the browser environment and use it accordingly.

# Settings

This example displays the encrypted stream along with the ability to playback decrypted. In order to playback the decrypted stream, integration with `castLabs' DRMtoday` is required.

In particular, you will need to know the following that is provided as User Input settings on the interface for this example:

- `environment`: The environment on castLabs DRMtoday account that your encrypted stream resides.
- `merchant`: The merchant account within DRMtoday where the stream resides.
- `encryption scheme`: The type of DRM encryption used on the stream (such as `WideVine`, `FairPlay`, etc.).
- `key id / iv`: The key id and iv id values to be used in decryption. These should be provided to you by the `merchant`. _Currently this is a `base64` stream._

> It is not the intent of this document to describe the `DRMtoday` platform. Please refer to their documentation for more information.

## Code Example

After providing the transforms and/or web worker to the `RTCSubscriber` and started a subscribe session, you provide the settings defined in the previous section along with a reference to the `video` element to the `setDRM` function from the `rtc-drm-transform` library:

```js
const transforms = {
  video: videoTransformFunction,
  audio: audioTransformFunction,
  worker: worker,
}

subscriber = await new red5prosdk.RTCSubscriber().init(config, transforms)
await subscriber.subscribe()

const element = document.querySelector(`#${baseConfig.mediaElementId}`)
const keyIdOrIV = encryptKeyValue(getValueFromId('key-input'))

const drmConfig = {
  environment: Environments.Staging,
  merchant: `red5`,
  audioEncrypted: false,
  encryption: `cbcs`,
  keyId,
  iv,
}
// castLabs.
setDrm(element, drmConfig)
```
