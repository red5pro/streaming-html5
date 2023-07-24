<h3 align="center">
  <img src="assets/red5pro_logo.png" alt="Red5 Pro Logo" />
</h3>
<p align="center">
  <a href="PUBLISHER_README.md">publisher</a> &bull;
  <a href="SUBSCRIBER_README.md">subscriber</a> &bull;
  <a href="SHARED_OBJECT_README.md">shared object</a>
</p>

---

# Subscribing to Streams with Red5 Pro WebRTC SDK

This document describes how to use the Red5 Pro WebRTC SDK to subscribe to a broadcast session.

* [Requirements](#requirements)
* [Subscriber Types](#subscriber-types)
  * [WHEP](#whep)
  * [WebRTC](#webrtc)
    * [Configuration Parameters](#webrtc-configuration-parameters)
    * [Example](#webrtc-example)
  * [HLS](#hls)
    * [Configuration Parameters](#hls-configuration-parameters)
    * [Example](#hls-example)
* [Auto Failover](#auto-failover-and-order)
* [Lifecycle Events](#lifecycle-events)
* [Playback Controls](#playback-controls)
* [Other Information](#other-information)
  * [Autoplay Restrictions](#autoplay-restrictions)
  * [Insertable Streams](#insertable-streams)

# Requirements

The **Red5 Pro WebRTC SDK** is intended to communicate with a [Red5 Pro Server](https://www.red5pro.com/), which allows for broadcasting and consuming live streams utilizing [WebRTC](https://developer.mozilla.org/en-US/docs/Web/Guide/API/WebRTC) and other protocols, [HLS](https://en.wikipedia.org/wiki/HTTP_Live_Streaming).

As such, you will need a distribution of the [Red5 Pro Server](https://www.red5pro.com/) running locally or accessible from the web, such as [Amazon Web Services](https://www.red5pro.com/docs/server/awsinstall/).

> **[Click here to start using the Red5 Pro Server today!](https://account.red5pro.com/login)**

# Subscriber Types

The following subscriber types / protocols are supported:

* [WHEP](#whep)
* [WebRTC](#webrtc) (using [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API), [WebRTC](https://developer.mozilla.org/en-US/docs/Web/Guide/API/WebRTC) and the HTML5 [video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) Element or HTML5 [audio](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) Element).

* [HLS](#hls) (using the HTML5 Video/Audio Element)

Additionally, the **Red5 Pro WebRTC SDK** allows for automatic detection and failover to determine the correct playback option to use based on desired order and browser support. To learn more, visit the [Auto Failover](#auto-failover-and-order) section.

# WHEP

As of release `11.0.0`, the Red5 Pro WebRTC SDK supports [WHEP](https://www.ietf.org/archive/id/draft-murillo-whep-00.html) to egress/subscribe to streams!

Creating a `WHEPClient` for publishing is very similar to `RTCSubscriber` (as described later in [this document](#webrtc)), but allows for connection to go through HTTP/S instead of relying on a WebSocket.

If you know the endpoint you are targeting and do not need any additional customization in the playback stream, establishing a WHEP subscriber is as simple as:

```js
const whepEndpoint =
  'https://yourred5pro.com/live/whep/endpoint/stream1?resourceId=abc123'
const subscriber = new WHEPClient(
  whepEndpoint,
  document.querySelector('#red5pro-subscriber')
)
subscriber.on('*', (event) => console.log(event))
```

However, if you want more control over the configuration of a playback stream, establish a `WHEPClient` similar to how you would have established an `RTCSubscriber` in previous releases to `11.0.0`:

```js
const config = {
  host: 'yourred5pro.com',
  streamName: 'stream1',
  ...more,
}
const subscriber = await new WHEPClient().init(config)
subscriber.on('*', (event) => console.log(event))
await subscriber.subscribe()
```

> Read more from our [WHIP/WHEP documentation](WHIP_WHEP_README.md).

## WebRTC

The Red5 Pro WebRTC SDK WebRTC Subscriber solution utilizes WebSockets and WebRTC support in modern browsers.

_It is *highly* recommended to include [adapter.js](https://github.com/webrtcHacks/adapter) when targeting the WebRTC subscriber._

### WebRTC Configuration Properties

| Property | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| protocol | [x] | `wss` | The protocol for the WebSocket communication. |
| port | [x] | `443` | The port on the host that the WebSocket server listens on; `5080` or `443` (insecure or secure, respectively). |
| app | [x] | `live` | The webapp name that the WebSocket is listening on. |
| host | [x] | *None* | The IP or address that the WebSocket server resides on. |
| streamName | [x] | *None* | The name of the stream to subscribe to. |
| mediaElementId | [-] | `red5pro-subscriber` | The target `video` or `audio` element `id` attribute which will display the stream. |
| rtcConfiguration | [-] | *None* | The `RTCConfiguration` to user in setting up `RTCPeerConnection`. [RTCConfiguration](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary)|
| iceServers | [x] | *None* ([Test](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/)) | The list of ICE servers to use in requesting a Peer Connection. *Marked for Deprecation. Favor `rtcConfiguration`.* |
| iceTransport | [-] | `UDP` | The transport type to use in ICE negotiation. Either `UDP` or `TCP` |
| subscriptionId | [x] | auto-generated | A unique string representing the requesting client. |
| connectionParams | [-] | `undefined` | An object of connection parameters to send to the server upon connection request. |
| videoEncoding | [-] | *None* | Specifies target video encoder. |
| audioEncoding | [-] | *None* | Specifies target audio encoder. |
| autoLayoutOrientation | [-] | `true` | Flag to allow SDK to auto-orientation the layout of `video` element based on broadcast metadata. _Mobile publishers broadcast with orientation._ |
| muteOnAutoplayRestriction | [-] | `true` | Flag to attempt to mute the `video` element when `autoplay` is restricted in the browser. [See section on Autoplay Restrictions](#autoplay-restrictions) |
| maintainConnectionOnSubscribeErrors | [-] | `false` | Flag to maintain previously established `WebSocket` connection on any failure within the `subscribe` request flow. [Example](https://github.com/red5pro/streaming-html5/tree/master/src/page/test/subscribeRetryOnInvalidName) |
| signalingSocketOnly | [-] | `true` | Flag to indicate whether the `WebSocket` should only be used for signaling while establishing a connection. Afterward, all data between client and server will be sent over an `RTCDataChannel`.
| dataChannelConfiguration | [-] | `{name: "red5pro"}` | An object used in configuring a n `RTCDataChannel`. _Only used when `signalingSocketOnly` is defined as `true`_ |
| buffer | [-] | `0` | Request to set a buffer - in seconds - for playback.
| maintainStreamVariant | [-] | `false` | Flag to instruct the server - when utilizing transcoding - to not switch subscriber stream variants when network conditions change. By setting this to `true`, when you request to playback a stream that is transcoded, the server will not deliver a variant of higher or lower quality dependending on current network conditions. |
| liveSeek | [-] | *None* | Configuration object to enable live seek capability. See [Live Seek](#live-seek) for more information.

#### Live Seek

You can enable live seek capabilities for a live playback by providing a `liveSeek` configuration in the initialization configuration for `RTCSubscriber`.

The schema for the `liveSeek` configuration is as follows:

```js
{
  enabled: <boolean>,
  baseURL: <string | undefinde>,
  fullURL: <string | undefined>,
  hlsjsRef: <hls.js reference | undefined>,
  hlsElement: <HTMLVideoElement | undefined>,
  options: <object | undefined>,
  usePlaybackControlsUI: <boolean>
}
```

* `enabled` : a boolean flag of whether live seek is enabled or disabled.
* `baseURL` : (optional) the base URL to access the HLS files that are generated for live seek streams.
* `fullURL` : (optional) the full URL to access the HLS files that are generated for live seek streams.
* `hlsjsRef` : (optional) the [HLS.JS](https://github.com/video-dev/hls.js/) reference. If you load HLS.js in a script tag, the SDK will check the `window` global for `Hls`, otherwise provide a reference to the loaded HLS.js.
* `hlsElement` : (optional) the target `video` element to attach the HLS Media to. If left undefined, the SDK will create and maintain the target element (recommended).
* `options` : (optional) the configuration options for [HLS.JS](https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning). Default is: `{debug: false, backBufferLength: 0}`.
* `usePlaybackControlsUI` : (optional) flag to use the custom controls provided by the SDK. Default is `true`. **If setting this to `false`, you must provide your own UI controls and interface with the API to control playback.**

##### Server Requirements

To enable live seek capability, the following configuration properties are required on the server in order to allow HLS recording to support `FMP4` playback:

_File:_

**conf/hlsconfig.xml**

_Edits:_

```xml
<property name="outputFormat" value="FMP4"/>
<property name="forceVODRecord" value="true"/>
```

##### Client Requirements

**baseURL**

The `baseURL` is the base endpoint URL from which the SDK will access the recorded HLS files. By default, the SDK will assume the base URL is the `host` of the initialization configuration, but when utilizing autoscale, the HLS files will not be accessible from the edge. As such, the server should be configured to upload the HLS files to a remote location - such as a CDN.

The storage of the HLS files should follow the convention of `<baseURL>/<app scope>`, where `app scope` is where the live broadcast stream is streaming to and the bucket name within the CDN; do not include the `app scope` in the `baseURL` property.

> For example, if your live broadcast is streaming to the `live` app scope under the name of `stream1`, and your CDN resides at `https://yourcdn/company`, then just provide `https://yourcdn/company` as the `baseURL` and the SDK will attempt to access the HLS files at `https://yourcdn/company/live/stream1.m3u8`.

**fullURL**

The `fullURL` could be provided that will be the full URL path to the HLS file used in live seek. If this is provided, it will use this _untouched_ and load the file directly.

> For example, if you provide `https://yourcdn/company/live/stream1.m3u8` as the `fullURL`, that file will be requested.

**hlsjsRef**

The SDK requires the dependency of [HLS.JS](https://github.com/video-dev/hls.js/) 3rd-party library in order to achieve live seek of a stream.

If you include it as a `script` tag source in your page, you do not have to set the `hlsjsRef` property, as the SDK will check the `window` global for the existance of `Hls`. In the chance that you did not include the UMD distribution of the library and instead are using it modularly, you need to provide a reference to the `Hls` import.

**hlsElement**

The optional target `video` element to load the HLS files into. If left `undefined` (the default), the SDK with generate and maintain the backing video element. By providing a target `hlsElement` you may need to maintain its own lifecycle.

**options**

Provide an optional `options` configuration that will be assigned untouched to the underlying [HLS.JS](https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning) use.

**usePlaybackControlsUI**

Flag to use the default playback controls of the SDK to play, pause, live scrub, and additional actions. If setting this to `false`, you will need to create and manage your own controls to interact with the live and VOD content.

> You can also provide your own custom controls and/or class declarations easily following this [guideline](https://www.red5pro.com/docs/development/playbackcontrols/overview/).

#### Video Encoding Configuration

By not providing the `videoEncoding` attribute in the WebRTC Subscriber configuration, the server will choose the default encoder to use. If you do not wish for the server to default, you can provide the following values for the property:

* `VP8`
* `H264`
* `NONE`

#### Audio Encoding Configuration

By not providing the `audioEncoding` attribute in the WebRTC Subscriber configuration, the server will choose the default encoder to use. If you do not wish for the server to default, you can provide the following values for the property:

* `Opus`
* `PCMU`
* `PCMA`
* `Speex`
* `NONE`

### WebRTC Example

#### As a Module

```js
import { RTCSubscriber } from 'red5pro-webrtc-sdk'

const start = async () => {

  try {

    const subscriber = new RTCSubscriber()
    await subscriber.init({
      protocol: 'ws',
      port: 5080,
      host: 'localhost',
      app: 'live',
      streamName: 'mystream',
      rtcConfiguration: {
        iceServers: [{urls: 'stun:stun2.l.google.com:19302'}],
        iceCandidatePoolSize: 2,
        bundlePolicy: 'max-bundle'
      }, // See https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary
      mediaElementId: 'red5pro-subscriber',
      subscriptionId: 'mystream' + Math.floor(Math.random() * 0x10000).toString(16),
    })
    await subscriber.subscribe()

  } catch (e) {
    // An error occured in establishing a subscriber session.
  }

}
start()
```

#### In Browser
_index.html_:

```html
<!doctype html>
<html>
  <head>
    <!-- Recommended shim for cross-browser WebRTC support. -->
    <script src="https://webrtchacks.github.io/adapter/adapter-latest.js"></script>
    <!-- Default Red5 Pro Playback Control styles. -->
    <link href="lib/red5pro/red5pro-media.css" rel="stylesheet">
    <!-- Fullscreen shim. -->
    <script src="lib/screenfull/screenfull.min.js"></script>
  </head>
  <body>
    <video id="red5pro-subscriber"
           class="red5pro-media red5pro-media-background"
           autoplay controls>
    </video>
    <!-- Exposes `red5prosdk` on the window global. -->
    <script src="lib/red5pro/red5pro-sdk.min.js"></script>
    <!-- Example script below. -->
    <script src="main.js"></script>
  </body>
</html>
```

_main.js_:

```js
(function (red5prosdk) {

  // Create a new instance of the WebRTC subcriber.
  var subscriber = new red5prosdk.RTCSubscriber();

  // Initialize
  subscriber.init({
    protocol: 'ws',
    port: 5080,
    host: 'localhost',
    app: 'live',
    streamName: 'mystream',
    rtcConfiguration: {
      iceServers: [{urls: 'stun:stun2.l.google.com:19302'}],
      iceCandidatePoolSize: 2,
      bundlePolicy: 'max-bundle'
    }, // See https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary
    mediaElementId: 'red5pro-subscriber',
    subscriptionId: 'mystream' + Math.floor(Math.random() * 0x10000).toString(16),
    videoEncoding: 'NONE',
    audioEncoding: 'NONE'
  })
  .then(function(subscriber) {
    // `subcriber` is the WebRTC Subscriber instance.
    return subscriber.subscribe();
  })
  .then(function(subscriber) {
    // subscription is complete.
    // playback should begin immediately due to
    //   declaration of `autoplay` on the `video` element.
  })
  .catch(function(error) {
    // A fault occurred while trying to initialize and playback the stream.
    console.error(error)
  });

})(window.red5prosdk);
```

## HLS

The Red5 Pro WebRTC SDK HLS Subscriber.

### HLS Configuration Properties

| Property | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| protocol | [x] | `https` | The protocol uri that the stream source resides on. |
| port | [-] | `443` | The port uri that the stream source resides on. |
| app | [x] | `live` | The webapp name that the stream source resides in. |
| host | [x] | *None* | The IP or address that the stream resides on. |
| streamName | [x] | *None* | The stream name to subscribe to. |
| mediaElementId | [-] | `red5pro-subscriber` | The target `video` or `audio` element `id` attribute which will display the stream. |
| mimeType | [x] | `application/x-mpegURL` | The mime-type of the stream source. |
| autoLayoutOrientation | [-] | `true` | Flag to allow SDK to auto-orientation the layout of `video` element based on broadcast metadata. _Mobile publishers broadcast with orientation._ |
| muteOnAutoplayRestriction | [-] | `true` | Flag to attempt to mute the `video` element when `autoplay` is restricted in the browser. [See section on Autoplay Restrictions](#autoplay-restrictions) |
| socketParams | [-] | `undefined` | By providing a `socketParams` property, you turn on a verification system that will pass the provided `connectionParams` to a WebSocket endpoint (much like how the WebRTC subscriber does in verification). |
| connectionParams | [-] |  `undefined` | An object of connection parameters to send to the server upon connection request. |

### HLS Example

#### As a Module

```js
import { HLSSubscriber } from 'red5pro-webrtc-sdk'

const start = async () => {

  try {

    const subscriber = new HLSSubscriber()
    await subscriber.init({
      protocol: 'http',
      port: 5080,
      app: 'live',
      host: 'localhost',
      streamName: 'mystream',
      mediaElementId: 'red5pro-subscriber'
    })
    await subscriber.subscribe()

  } catch (e) {
    // An error occured in establishing a subscriber session.
  }

}
start()
```

#### In Browser

_index.html_:

```html
<!doctype html>
<html>
  <head>
    <!-- Default Red5 Pro Playback Control styles. -->
    <link href="lib/red5pro/red5pro-media.css" rel="stylesheet">
    <!-- Fullscreen shim. -->
    <script src="lib/screenfull/screenfull.min.js"></script>
  </head>
  <body>
    <video id="red5pro-subscriber"
           class="red5pro-media red5pro-media-background"
           autoplay controls>
    </video>
    <!-- Exposes `red5prosdk` on the window global. -->
    <script src="lib/red5pro/red5pro-sdk.min.js"></script>
    <!-- Example script below. -->
    <script src="main.js"></script>
  </body>
</html>
```

_main.js_:

```js
(function (red5prosdk) {

  // Create a new instance of the HLS subcriber.
  var subscriber = new red5prosdk.HLSSubscriber();

  // Initialize
  subscriber.init({
    protocol: 'http',
    port: 5080,
    app: 'live',
    host: 'localhost',
    streamName: 'mystream',
    mediaElementId: 'red5pro-subscriber'
  })
  .then(function(subscriber) {
    // `subcriber` is the HLS Subscriber instance.
    return subscriber.subscribe();
  })
  .then(function(subscriber) {
    // subscription is complete.
    // playback should begin immediately due to
    //   declaration of `autoplay` on the `video` element.
  })
  .catch(function(error) {
    // A fault occurred while trying to initialize and playback the stream.
    console.error(error)
  });

})(window.red5prosdk);
```

# Auto Failover and Order

While you can specifically target a player - as described in the previous sections - you may want to let the library select the optimal player based on browser compatibility per support flavors.

## Important Note

It is important to note that the failover mechanism of the SDK is driven by browser support and does not depend on any third-party libraries.

As such, specific failover targets - such as HLS - require native browser support. In the case of HLS, this means failover and playback are limited to Safari Mobile and Safari Desktop when using our SDK.

It is entirely possible to playback streams in HLS using a 3rd-Party library (such as [VideoJS](https://videojs.com/)), but you will not be able to do so while utilizing the Red5 Pro WebRTC SDK.

> For more information on how to playback HLS in browsers without native support, please refer to the *Using VideoJS for Playback* section of the [Migration Guide](https://www.red5pro.com/docs/streaming/migrationguide.html#migrating-from-350-to-400).

## Initialization

As you may have noticed form the previous section, the source configuration for each player has differing property requirements. This is due simply to the technologies and playback strategies that each use:

* The **WebRTC** player utilizes [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) and [WebRTC](https://developer.mozilla.org/en-US/docs/Glossary/WebRTC) to subscribe to a video to be displayed in an [HTML5 video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) element.
* The **HLS** player utilizes the [HTTP Live Streaming protocol](https://developer.mozilla.org/en-US/Apps/Fundamentals/Audio_and_video_delivery/Live_streaming_web_audio_and_video#HLS) to subscribe to a stream.

As such, the **init** configuration provided to the library to allow for auto-failover player selection should be provided with attributes defining the target source(s) - i.e., `rtc` and/or `hls`:

### As a module

```js
import { Red5ProSubscriber} from 'red5pro-webrtc-sdk'

const start = async () => {

  try {

    const subscriber =
      await new Red5ProSubscriber()
                .setPlaybackOrder(['rtc', 'hls'])
                .init({
                  "rtc": {
                    // See above documentation for WebRTC source option requirements.
                  },
                  "hls": {
                    // See above documentation for HLS source option requirements
                  }
                })
    await subscriber.subscribe()

  } catch (e) {
    console.error(e)
  }

}

start()
```

### In a Browser

_index.html_:

```html
<!doctype html>
<html>
  <head>
    <!-- WebRTC Shim -->
    <script src="https://webrtchacks.github.io/adapter/adapter-latest.js"></script>
    <!-- Default Red5 Pro Playback Control styles. -->
    <link href="lib/red5pro/red5pro-media.css" rel="stylesheet">
    <!-- Fullscreen shim. -->
    <script src="lib/screenfull/screenfull.min.js"></script>
  </head>
  <body>
    <video id="red5pro-subscriber"
           class="red5pro-media red5pro-media-background"
           autoplay controls>
    </video>
    <!-- Exposes `red5prosdk` on the window global. -->
    <script src="lib/red5pro/red5pro-sdk.min.js"></script>
    <!-- Example script below. -->
    <script src="main.js"></script>
  </body>
</html>
```

_main.js_:

```js
(function (red5prosdk) {

  // Create a new instance of the Red5 Pro failover subcriber.
  var subscriber = new red5prosdk.Red5ProSubscriber();

  subscriber
    .setPlaybackOrder(['rtc', 'hls'])
    .init({
        "rtc": {
          // See above documentation for WebRTC source option requirements.
        },
        "hls": {
          // See above documentation for HLS source option requirements
        }
    })
    .then(function(subscriber) {
      return subscriber.subscribe();
    })
    .then(function(subscriber) {
      // `subscriber` is the WebRTC Subscriber instance.
      // playback should begin immediately due to
      //   declaration of `autoplay` on the `video` element.
    })
    .catch(function(error) {
      // A fault occurred in finding failover subscriber and playing stream.
      console.error(error);
    });

})(window.red5prosdk);
```

Important things to note:

* Only `rtc` and `hls` are supported values for order and are also accessible as enums on `Red5ProVidepPlayer.playbackTypes`

# Lifecycle Events

This section describes the events dispatched from the Subscriber of the Red5 Pro WebRTC SDK.

* [Listening to Subscriber Events](#listening-to-subscriber-events)
* [Common Events](#common-events)
* [WebRTC Subscriber Events](#webrtc-subscriber-events)
* [HLS Subscriber Events](#hls-subscriber-events)

## Listening to Subscriber Events

The Subscriber(s) included in the SDK are event emitters that have a basic API to subscribing and unsubscribing to events either by name or by wildcard.

To subscribe to all events from a subscriber:

```js
function handleSubscriberEvent (event) {
  // The name of the event:
  const { type } = event
  // The dispatching publisher instance:
  const { subscriber } = event
  // Optional data releated to the event (not available on all events):
  const { data } = event
}

const subscriber = new RTCSubscriber()
subscriber.on('*', handleSubscriberEvent)
```

> The `*` type assignment is considered a "Wildcard" subscription - all events being issued by the subscriber instance will invoke the assign event handler.

To unsubscribe to all events from a subscriber after assinging an event handler:

```js
subscriber.off('*', handleSubscriberEvent)
```

The following sections of this document describe the event types that can also be listened to directly, instead of using the `*` wildcard.

## Common Events

The following events are common across all Subscriber implementations from the Red5 Pro WebRTC SDK. They can be accessed from the global `red5prosdk` object from the `SubscriberEventTypes` attribute.

| Access | Name | Meaning |
| :--- | :---: | :--- |
| CONNECT_SUCCESS | 'Connect.Success' | When the subscriber has established a required remote connection, such as to a WebSocket server. |
| CONNECT_FAILURE | 'Connect.Failure' | When the subscriber has failed to establish a required remote connection for consuming a stream. |
| SUBSCRIBE_START | 'Subscribe.Start' | When the subscriber has started a subscribing to a stream. |
| SUBSCRIBE_FAIL | 'Subscribe.Fail' | When the subscriber has failed to start subscribing to a stream. |
| SUBSCRIBE_INVALID_NAME | 'Subscribe.InvalidName' | When the subscriber is cannot start subscribing to stream because a stream associated with the `streamName` is not available. |
| SUBSCRIBE_STOP | 'Subscribe.Stop' | When the subscriber has successfully closed an active subscription to a stream. |
| SUBSCRIBE_METADATA | 'Subscribe.Metadata' | When metadata is received on the client from the server. |
| SUBSCRIBE_STATUS | 'Subscribe.Status' | When a status event of the subscriber has been receieved from the server. |
| SUBSCRIBE_SEND_INVOKE | 'Subscribe.Send.Invoke' | When a message is being sent by a subscribed-to publisher. |
| SUBSCRIBE_PUBLISHER_CONGESTION | 'Subscribe.Publisher.NetworkCongestion' | When a playback session is experiencing network congestion on the broadcast side. |
| SUBSCRIBE_PUBLISHER_RECOVERY | 'Subscribe.Publisher.NetworkRecovery' | When a playback session is recovering from network congestion on the broadcast side. |
| PLAY_UNPUBLISH | 'Subscribe.Play.Unpublish' | Notification of when a live broadcast has stopped publishing. |
| CONNECTION_CLOSED | 'Subscribe.Connection.Closed' | Invoked when a close to the connection is detected. |
| ORIENTATION_CHANGE | 'Subscribe.Orientation.Change' | Invoked when an orientation change is detected in metadata. Mobile (iOS and Android) broadcasts are sent with an orientation. |
| VIDEO_DIMENSIONS_CHANGE | 'Subscribe.VideoDimensions.Change' | Invoked when `video` element has loaded metadata and the incoming stream dimensions are available. |
| STREAMING_MODE_CHANGE | 'Subscribe.StreamingMode.Change' | Invoked when the broadcast has "muted" either or both their video and audio tracks. |
| VOLUME_CHANGE | 'Subscribe.Volume.Change' | Invoked when a change to volume is detected during playback. _From 0 to 1._ |
| PLAYBACK_TIME_UPDATE | 'Subscribe.Time.Update' | Invoked when a change in playhead time is detected during playback. _In seconds._ |
| PLAYBACK_STATE_CHANGE | 'Subscribe.Playback.Change' | Invoked when a change in playback state has occured, such as when going from a `Playback.PAUSED` state to `Playback.PLAYING` state. |
| FULL_SCREEN_STATE_CHANGE | 'Subscribe.FullScreen.Change' | Invoked when a change in fullscreen state occurs during playback. |
| AUTO_PLAYBACK_FAILURE | 'Subscribe.Autoplay.Failure' | Invoked when an attempt to `autoplay` on a media element throws a browser exception; typically due to browser security restrictions and their autoplay policies. (WebRTC and HLS, only) [See section on Autoplay Restrictions](#autoplay-restrictions) |
| AUTO_PLAYBACK_MUTED | 'Subscribe.Autoplay.Muted' | Invoked when an attempt to `autoplay` on a media element throws a browser exception and is muted based on the `muteOnAutoplayRestriction` config property; typically due to browser security restrictions and their autoplay policies. (WebRTC and HLS, only) [See section on Autoplay Restrictions](#autoplay-restrictions) |

## WebRTC Subscriber Events

The following events are specific to the `RTCSubscriber` implementation and accessible on the global `red5prosdk` object from the `RTCSubscriberEventTypes` attribute. These events are dispatched during the lifecycle of thre trickle ICE functionality required to start subscribing to a stream:

| Access | Name | Meaning |
| :--- | :---: | :--- |
| PEER_CONNECTION_AVAILABLE | 'WebRTC.PeerConnection.Available' | When the negotation process has produced a valid `PeerConnection`. |
| OFFER_START | 'WebRTC.Offer.Start' | When the subscriber requests to start an offer on the `PeerConnection`. |
| OFFER_END | 'WebRTC.Offer.End' | When the subscriber has received a `SessionDescription` from a requested offer over the `PeerConnection`. |
| ANSWER_START | 'WebRTC.Answer.Start' | When the subscriber requests to send an answer on the `PeerConnection`. |
| ANSWER_END | 'WebRTC.Answer.End' | When the subscriber has received an answer (in form of a `MediaStream`) over the `PeerConnection`. |
| CANDIDATE_START | 'WebRTC.Candidate.Start' | When the subscriber requests to send a candidate on the `PeerConnection`. |
| CANDIDATE_END | 'WebRTC.Candidate.End' | When the subscriber has received a candidate over the `PeerConnection`. |
| ICE_TRICKLE_COMPLETE | 'WebRTC.IceTrickle.Complete' | When the negotaiton process (a.k.a. trickle) has completed and the subscriber will attempt at consuming a stream. |
| DATA_CHANNEL_AVAILABLE | 'WebRTC.DataChannel.Available' |  the underlying `RTCDataChannel` is available when `signalingServerOnly` configuration is used. |
| DATA_CHANNEL_OPEN | 'WebRTC.DataChannel.Open' | When the underlying `RTCDataChannel` is opened when `signalingServerOnly` configuration is used.
| DATA_CHANNEL_CLOSE | 'WebRTC.DataChannel.Close' | When the underlying `RTCDataChannel` is closed when `signalingServerOnly` configuration is used. |
| DATA_CHANNEL_ERROR | 'WebRTC.DataChannel.Error' | When an error has occurred within the underlying `RTCDataChannel` when `signalingServerOnly` configuration is used. |
| DATA_CHANNEL_MESSAGE | 'WebRTC.DataChannel.Message' | When a message has been delivered over the underlying `RTCDataChannel` when `signalingServerOnly` configuration is used. |
| LIVE_SEEK_UNSUPPORTED | 'WebRTC.LiveSeek.Unsupported' | When `liveSeek` is specified but the browser does not support th integration of HLS.JS for Live VOD playback. |
| LIVE_SEEK_ENABLED | 'WebRTC.LiveSeek.Enabled' | When `liveSeek` is used to playback Live VOD and the HLS video has been loaded and available to seek. |
| LIVE_SEEK_DISABLED | 'WebRTC.LiveSeek.Disabled' | When `liveSeek` is used to playback Live VOD and HLS video has not been loaded nor available to seek. |
| LIVE_SEEK_ERROR | 'WebRTC.LiveSeek.Error' | When `liveSeek` is used to playback Live VOD and HLS video and an error in playback has occurred. Inspect the `error` attribute on the event for more details. |
| LIVE_SEEK_LOADING | 'WebRTC.LiveSeek.FragmentLoading' | When `liveSeek` is used to playback Live VOD and HLS video in currently loading a fragment during seeking. |
| LIVE_SEEK_LOADED | 'WebRTC.LiveSeek.FragmentLoaded' | When `liveSeek` is used to playback Live VOD and HLS video has completed loading a fragment during seeking. |
| LIVE_SEEK_CHANGE | 'WebRTC.LiveSeek.Change | When `liveSeek` is used, this event notifies on a change of state going from "live" to "vod" and vice versa.
| ON_ADD_STREAM | 'WebRTC.Add.Stream' | When a `MediaStream` object has become available for playback. |
| TRACK_ADDED | 'WebRTC.PeerConnection.OnTrack' | When a MediaTrack has become available on the underlying `RTCPeerConnection`. |
| UNSUPPORTED_FEATURE | 'WebRTC.Unsupported.Feature' | Notification that a feature attempting to use in WebRTC is not supported or available in the current browser that the SDK is being employed. e.g., [Insertable Streams](#insertable-streams). |
| TRANSFORM_ERROR | 'WebRTC.Transform.Error' | An error has occurred while trying to apply transform to a media track. See [Insertable Streams](#insertable-streams)|

## HLS Subscriber Events

> There are currently no HLS-specific events. Please refer to the [common events](#common-events).

# Playback Controls

The `4.0.0` release of the SDK introduces Playback API and Default Controls for all subscriber techs with the ability to customize logic and UI for your own branding. To learn more, please refer to the [Playback Controls Documentation](playbackcontrols.md).

# Other Information

## Autoplay Restrictions

In an attempt to provide a more pleasing user experience and reduce data consumption on mobile devices, browsers are continuing to evolve their `autoplay` policies. While generally and attempt to keep websites (read: *ads*) from playing back unwanted and/or unsolicited video and audio, these policies also affect those sites in which the sole intent _is to_ playback video and/or audio - such as from a conference web application built utilizing [Red5 Pro](https://red5pro.com).

Naturally, this can cause some confusion and frustration as `autoplay` may have worked as expected prior to latest browser updates. Thankfully, you do have options when using the *Red5 Pro WebRTC SDK* to provide a better user experience.

> It should be noted that the recent `autoplay` policies only affect the WebRTC and HLS subscribers from the Red5 Pro WebRTC SDK.

### Using autoplay with the SDK

If supporting autoplay is a requirement for your web application integrating the *Red5 Pro WebRTC SDK*, you have three implementation choices to choose from:

1. Declaring the `autoplay` and `muted` attributes of the target video element in tandem.
2. Declaring the `autoplay` attribute of the target video element and setting the `muteOnAutoplayRestriction` initialization property to `true`.
3. Delcaring the `autoplay` attribute of the target video element and setting the `muteOnAutoplayRestriction` initialization property to `false`.

#### Solution 1

> Declaring the `autoplay` and `muted` attributes of the target video element in tandem.

By declaring the `autoplay` and `muted` attribute together for a video element, the autoplay functionality will work - the video will begin playback with muted audio.

```html
<video id="red5pro-subscriber" class="red5pro-media" controls autoplay muted playsinline />
```

This is the general recommendation to allow for auto-playback and allow the user to unmute the audio.

> The `controls` and `playsinline` attributes have no correlation to the autoplay policy, but are included for better user experience.

#### Solution 2

> Declaring the `autoplay` attribute of the target video element and setting the `muteOnAutoplayRestriction` initialization property to `true`.

By declaring only the `autoplay` attribute on the video element and setting the `muteOnAutoplayRestriction` initialization property to `true` in the configuration, you can instruct the WebRTC SDK to:

* first attempt `autoplay` unmuted
* subsequently attempt to `autoplay` muted, if first attempt fails
* send event notification of `Subscribe.Autoplay.Muted`, if auto-playback is muted

Using this solution, `autoplay` can work as desired for browsers that do not enforce the policy (e.g., the policy may differ between desktop and mobile versions of the same browser). For those browsers that do enforce the policy, the *Red5 Pro WebRTC SDK* will attempt to autoplay the stream. If an exception is thrown on the `play` request of the video element, the SDK will then declare the `muted` attribute on the element on the video element and make a subsequent attempt to autoplay.

If the muted autoplay happens without exception, a `Subscribe.Autoplay.Muted` event is dispatched from the subscriber instance (refer to [Common Events](#common-events)). As a developer, you can handle this method as per your specifications - such as displaying an alert notifying the user that audio has been muted and instructing them to unmute to hear audio.

_declaration of video element in html:_

```html
<video id="red5pro-subscriber" class="red5pro-media" controls autoplay playsinline />
```

_usage of muteOnAutoplayRestriction in initialization:_

```js
const subscriber = new RTCSubscriber()
await subscriber.init({
  protocol: 'ws',
  port: 5080,
  host: 'localhost',
  app: 'live',
  streamName: 'mystream',
  muteOnAutoRestriction: true
})

subscriber.on(red5prosdk.SubscriberEventTypes.AUTO_PLAYBACK_MUTED, () => {
  alert('Audio has been muted.')
})

await subscriber.subscribe()
```

> The `muteOnAutoplayRestriction` property is `true` by default.

#### Solution 3

> Declaring the `autoplay` attribute of the target video element and setting the `muteOnAutoplayRestriction` initialization property to `false`.

By declaring only the `autoplay` attribute on the video element and setting the `muteOnAutoplayRestriction` initialization property to `false` in the configuration, you instruct the WebRTC SDK to not attempt to:

* first attempt `autoplay` unmuted
* send event notification of `Subscribe.Autoplay.Failed`, if first attempt fails

Using this solution, `autoplay` can work as desired for browsers that do not enforce the policy (e.g., the policy may differ between desktop and mobile versions of the same browser). For those browsers that do enforce the policy, the *Red5 Pro WebRTC SDK* will dispatch a `Subscribe.Autoplay.Failed` event from the subscriber instance (refer to [Common Events](#common-events)). As a developer, you can handle this method as per your specifications - such as displaying an alert notifying the user that autoplay did not occur and they will need to press the play button to begin playback.

_declaration of video element in html:_

```html
<video id="red5pro-subscriber" class="red5pro-media" controls autoplay playsinline />
```

_usage of muteOnAutoplayRestriction in initialization:_

```js
const subscriber = new RTCSubscriber()
await subscriber.init({
  protocol: 'ws',
  port: 5080,
  host: 'localhost',
  app: 'live',
  streamName: 'mystream',
  muteOnAutoRestriction: false
})

subscriber.on(red5prosdk.SubscriberEventTypes.AUTO_PLAYBACK_MUTED, () => {
  alert('Audio has been muted.')
})

await subscriber.subscribe()
```

## Insertable Streams

The Red5Pro WebRTC SDK now has support for [Inserable Streams](https://developer.mozilla.org/en-US/docs/Web/API/Insertable_Streams_for_MediaStreamTrack_API)!

What this entails for a WebRTC Subscriber is the ability to pass in a track (receiver) Transform function to process the incoming audio and video during playback.

### Usage in init()

To enable the use of Insertable Streams for a subscriber using the WebRTC SDK, provide an optional `mediaTransform` argument to the `init()` call that provides the optional video and/or audio function, or `Worker` to use in the Transform pipe.

The `mediaTransform` argument schema is the following:

```js
{
  video: <function>,
  audio: <function>,
  worker: {
    video: <Worker>,
    audio: <Worker>
  },r
  transformFrameType: <TransformFrameTypes>,
  pipeOptions: <Object>
}
```

All properties are optional, meaning you can have just a `video` or `audio` transform - you do not have to provide both. Or, you can define `Worker`(s) `video` and/or `audio` for operations that are computationally more expensive in which you want to send the processing to a [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).

Additionally, you can define the `transformFrameType` (either `TransformFrameTypes.ENCODED_FRAME` - the default - or `TransformFrameTypes.PACKET`). The default is `ENCODED_FRAME` which will pass an `RTCEncodedVideoFrame` or `RTCEncodedAudioFrame` to the transform. IF `PACKET` is defined, then a `VideoFrame` or `AudioData` will be passed to the transform. Choosing one over the other depends on what operations you wish to perform on the data being processed.

> The optional `pipeOptions` attribute is an object that will be passed along untouched through the piping and is described in more detail at [https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/pipeThrough](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/pipeThrough).

#### Transform Functions

The signature for the `video` and `audio` transform functions needs to conform to the following:

```js
{
  video: (frame: <RTCEncodedVideoFrame | VideoFrame>, controller: ReadableStreamDefaultController) => {
    // process incoming video
  },
  audio: (frame: <RTCEncodedAudioFrame | AudioData>, controller: ReadableStreamDefaultController) => {
    // process incoming audio
  }
}
```

#### Web Worker

If defining a `Web Worker` to process the media, you will need to listen for `decodeVideo` and `decodeAudio` messages invoked on the `Worker`:

_main.js_
```js
const worker = new Worker('worker.js')
worker.onmessage = event => {
  // handle any messaging from Worker.
}
```

_worker.js_
```js

const handleDecodeVideo = (readable, writable, options) => {
  const transformStream = new TransformStream({
    transform: async (frame, controller) => {
      // process incoming video
    }
  })
  if (options) {
    readable.pipeThrough(transformStream, options).pipeTo(writable)
  } else {
    readable.pipeThrough(transformStream).pipeTo(writable)
  }
}

const handleDecodeAudio = (readable, writable, options) => {
  const transformStream = new TransformStream({
    transform: async (frame, controller) => {
      // process incoming audio
    }
  })
  if (options) {
    readable.pipeThrough(transformStream, options).pipeTo(writable)
  } else {
    readable.pipeThrough(transformStream).pipeTo(writable)
  }
}

self.onmessage = (event) => {
  const { data, type } = event.data
  const { readable, writable, options } = data
  if (type === 'decodeVideo) {
    handleDecodeVideo(readable, writable, options)
  } else if (type === 'decodeAudio) {
    handleDecodeAudio(readable, writable, options)
  }
}
```

#### Example

```js
// Not provided by SDK. Import your custom transform processing to be passed to the SDK.
import { myVideoTransformFunction, myAudioTransformFunction } from 'my-custom-transform-library'

const initWithTransforms = async () => {

  try {

    const config = {
      host: 'myred5pro.domain',
      streamName: 'myencodedstream'
    }

    // The second argument to init() is an object that has optional `video` and `audio`
    // properties defining the transform functions to use in processing the video and audio tracks, respectively.
    // By not providing either, or defining them as `undefined`, no processing on the track(s) will occur.
    subscriber = await new red5prosdk.RTCSubscriber().init(config, {
      video: myVideoTransformFunction,
      audio: myAudioTransformFunction
    })
    subscriber.on('WebRTC.Unsupported.Feature', () => console.error('Bummer! This browser doesn\'t support Insertable Streams.'))
    subscriber.on('WebRTC.Transform.Error', event => console.error(`Error occured for ${event.data.type}!`, event.data.error))

    await subscriber.subscribe()

  } catch (e) {
    // handle error
  }

}

initWithTransforms()
```

The properties of the `mediaTransforms` argument of the `init()` call are:

* `video` : A function that will be piped into the transform of the video track. To not perform any video transformation, set as `undefined` or leave out.
* `audio` : A function that will be piped into the transform of the audio track. To not perfom any audio transformation, set as `undefined` or leave out.

There are two related events that can be dispatched from the `RTCSubscriber` instance with relation to utilizing Insertable Streams:

* `WebRTC.Unsupported.Feature` - This will be dispatched if the current browser does not support Insertable Streams.
* `WebRTC.Transform.Error` - This will be dispatched when an error has occurred in establishing a transform pipe for a media track.

## Usage through transform()

Alternatively, you can assign the transform _after_ initialization of the `RTCSubscriber`. This could be helpful in scenarios in which you want to display encoded video while providing a Paywall or other gating mechanism.

It is very similar in method signature as described above and the events to listen for are the same as well:

```js
// Not provided by SDK. Import your custom transform processing to be passed to the SDK.
import { myVideoTransformFunction, myAudioTransformFunction } from 'my-custom-transform-library'

const allowButton = document.querySelector('#allow-button')

const initThenTransform = async () => {

  try {

    subscriber = await new red5prosdk.RTCSubscriber().init(config)
    subscriber.on('WebRTC.Unsupported.Feature', () => console.error('Bummer! This browser doesn\'t support Insertable Streams.'))
    subscriber.on('WebRTC.Transform.Error', event => console.error(`Error occured for ${event.data.type}!`, event.data.error))

    await subscriber.subscribe()

    // Delay transform until some action.
    allowButton.addEventListener('click', () => {
      subscriber.transform({
        video: myVideoTransformFunction,
        audio: myAudioTransformFunction
      })
    })

  } catch (e) {
    // handle error
  }

}

initThenTransform()
```

*NOTE*

If assigning transforms using the `transform()` method instead of on initialization through the `init()` method, you will need to assign the `rtcConfiguration` property on the init configuration with the property of `encodedInsertableStreams` set to true. e.g.,

```js
const config = {
  host: 'myserver.domain',
  streamName: 'stream1',
  rtcConfiguration: {
    iceServers: [{urls: 'stun:stun2.l.google.com:19302'}],
    iceCandidatePoolSize: 2,
    bundlePolicy: 'max-bundle',
    encodedInsertableStreams: true
  }
}
```
