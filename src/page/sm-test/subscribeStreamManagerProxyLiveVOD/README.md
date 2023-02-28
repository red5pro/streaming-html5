# Subscribe Live VOD

This is an example of being able to seek to a specific time within a live stream. It uses Fragmented MP4 (a.k.a. FMP4) to save `ts` files on a server that are appended to a `m3u8` and loaded and played back within a `video` container utilizing the [HLS.JS](https://github.com/video-dev/hls.js/) library.

**Please refer to the [Basic Subscriber Documentation](../subscribe/README.md) to learn more about the basic setup.**

## Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

# Server Requirements

This example requires the following configuration properties in order to allow HLS recording on the server to support `FMP4` playback:

_File:_

**conf/hlsconfig.xml**

_Edits:_

```xml
<property name="outputFormat" value="FMP4"/>
<property name="dvrPlaylist" value="true"/>
```

# Client Requirements

## HLS.JS

The SDK requires the dependency of [HLS.JS](https://github.com/video-dev/hls.js/) 3rd-party library in order to achieve live seek of a stream.

As a page script dependency:

```html
<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
```

As a module import (requires `hlsjsRef` configuration, see [liveSeek](#liveseek))

```js
import Hls from 'hls.js'
```

> Other 3rd-Party integrations are on the road map.

## liveSeek

You can enable live seek capabilities for a live playback by providing a `liveSeek` configuration in the initialization configuration for `RTCSubscriber`.

The schema for the `liveSeek` configuration is as follows:

```js
{
  enabled: <boolean>,
  baseURL: <string>,
  hlsjsRef: <hls.js reference>
}
```

* `enabled` : a boolean flag of whether live seek is enabled or disabled.
* `baseURL` : (optional) the base URL to access the HLS files that are generated for live seek streams.
* `hlsjsRef` : (optional) the [HLS.JS](https://github.com/video-dev/hls.js/) reference. If you load HLS.js in a script tag, the SDK will check the `window` global for `Hls`, otherwise provide a reference to the loaded HLS.js.

```js
const rtcConfig = {...config, ...{
  subscriptionId: 'subscriber-' + instanceId,
  liveSeek: {
    enabled: true,
    // Point to the CDN that will store the HLS DVR files...
    baseURL: 'https://mycdn.com'
  }
}}
```

**baseURL**

> NOTE: This is required when employing Live Seek over Stream Manager.

The `baseURL` is the base endpoint URL from which the SDK will access the recorded HLS files. By default, the SDK will assume the base URL is the `host` of the initialization configuration, but when utilizing autoscale, the HLS files will not be accessible from the edge. As such, the server should be configured to upload the HLS files to a remote location - such as a CDN.

The storage of the HLS files should follow the convention of `<baseURL>/<app scope>`, where `app scope` is where the live broadcast stream is streaming to and the bucket name within the CDN; do not include the `app scope` in the `baseURL` property.

> For example, if your live broadcast is streaming to the `live` app scope under the name of `stream1`, and your CDN resides at `https://yourcdn/company`, then just provide `https://yourcdn/company` as the `baseURL` and the SDK will attempt to access the HLS files at `https://yourcdn/company/live/stream1.m3u8`.

**hlsjsRef**

The SDK requires the dependency of [HLS.JS](https://github.com/video-dev/hls.js/) 3rd-party library in order to achieve live seek of a stream.

If you include it as a `script` tag source in your page, you do not have to set the `hlsjsRef` property, as the SDK will check the `window` global for the existance of `Hls`. In the chance that you did not include the UMD distribution of the library and instead are using it modularly, you need to provide a reference to the `Hls` import.

## Custom Controls

Additionally, the `video` element used in playback of the live and VOD streams requires using the custom controls provided by the SDK.

To turn them on, you will need to define the `controls` property on the `video` element along with assigning the `red5pro-media` class to the element. The `red5pro-media` class declaration can be found i the **red5pro-media.css** CSS file shipped with the SDK.

```html
<video id="red5pro-subscriber"
  controls="controls"
  autoplay="autoplay"
  playsinline
  class="red5pro-media"
</video>
```

> You can provide your own custom controls and/or class declarations easily following this [guideline](https://www.red5pro.com/docs/development/playbackcontrols/overview/).

# Example

Aside from the initialization configuration of `enableLiveSeek` described above, the subscription to a live stream is the same as you would normally do as a developer.

## Events

The following events are available when `enableLiveSeek` is set to `true`:

| Access | Name | Meaning |
| :--- | :---: | :--- |
| LIVE_SEEK_ENABLED | 'WebRTC.LiveSeek.Enabled' | When `enableLiveSeek` is used to playback Live VOD and the HLS video has been loaded and available to seek. |
| LIVE_SEEK_DISABLED | 'WebRTC.LiveSeek.Disabled' | When `enableLiveSeek` is used to playback Live VOD and HLS video has not been loaded nor available to seek. |
| LIVE_SEEK_LOADING | 'WebRTC.LiveSeek.FragmentLoading' | When `enableLiveSeek` is used to playback Live VOD and HLS video in currently loading a fragment during seeking. |
| LIVE_SEEK_LOADED | 'WebRTC.LiveSeek.FragmentLoaded' | When `enableLiveSeek` is used to playback Live VOD and HLS video has completed loading a fragment during seeking. |


