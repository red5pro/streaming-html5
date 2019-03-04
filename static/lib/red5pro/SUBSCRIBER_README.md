<h3 align="center">
  <img src="assets/red5pro_logo.png" alt="Red5 Pro Logo" />
</h3>
<p align="center">
  <a href="PUBLISHER_README.md">publisher</a> &bull;
  <a href="SUBSCRIBER_README.md">subscriber</a> &bull;
  <a href="SHARED_OBJECT_README.md">shared object</a>
</p>

---

# Subscribing to Streams with Red5 Pro HTML SDK

This document describes how to use the Red5 Pro HTML SDK to subscribe to a broadcast session.

* [Requirements](#requirements)
* [Subscriber Types](#subscriber-types)
  * [WebRTC](#webrtc)
    * [Configuration Parameters](#webrtc-configuration-parameters)
    * [Example](#webrtc-example)
  * [Flash/RTMP](#flashrtmp)
    * [Configuration Parameters](#flash-configuration-parameters)
    * [Example](#flashrtmp-example)
  * [HLS](#hls)
    * [Configuration Parameters](#hls-configuration-parameters)
    * [Example](#hls-example)
* [Auto Failover](#auto-failover-and-order)
* [Lifecycle Events](#lifecycle-events)
* [Playback Controls](#playback-controls)
* [Other Information](#other-information)
  * [Autoplay Restrictions](#autoplay-restrictions)

# Requirements

The **Red5 Pro HTML SDK** is intended to communicate with a [Red5 Pro Server](https://www.red5pro.com/), which allows for broadcasting and consuming live streams utilizing [WebRTC](https://developer.mozilla.org/en-US/docs/Web/Guide/API/WebRTC) and other protocols, including [RTMP](https://en.wikipedia.org/wiki/Real_Time_Messaging_Protocol) and [HLS](https://en.wikipedia.org/wiki/HTTP_Live_Streaming).

As such, you will need a distribution of the [Red5 Pro Server](https://www.red5pro.com/) running locally or accessible from the web, such as [Amazon Web Services](https://www.red5pro.com/docs/server/awsinstall/).

> **[Click here to start using the Red5 Pro Server today!](https://account.red5pro.com/login)**

# Subscriber Types

The following subscriber types / protocols are supported:

* [WebRTC](#webrtc) (using [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API), [WebRTC](https://developer.mozilla.org/en-US/docs/Web/Guide/API/WebRTC) and the HTML5 [video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) Element or HTML5 [audio](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) Element).

* [RTMP](#flashrtmp) (using the custom Flash-based player developed for Red5 Pro)
* [HLS](#hls) (using the HTML5 Video/Audio Element)

Additionally, the **Red5 Pro HTML SDK** allows for automatic detection and failover to determine the correct playback option to use based on desired order and browser support. To learn more, visit the [Auto Failover](#auto-failover-and-order) section.

## WebRTC

The Red5 Pro HTML SDK WebRTC Subscriber solution utilizes WebSockets and WebRTC support in modern browsers.

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
| audio Encoding | [-] | *None* | Specifies target audio encoder. |
| autoLayoutOrientation | [-] | `true` | Flag to allow SDK to auto-orientation the layout of `video` element based on broadcast metadata. _Mobile publishers broadcast with orientation._ |
| muteOnAutoplayRestriction | [-] | `true` | Flag to attempt to mute the `video` element when `autoplay` is restricted in the browser. [See section on Autoplay Restrictions](#autoplay-restrictions) |
| maintainConnectionOnSubscribeErrors | [-] | `false` | Flag to maintain previously established `WebSocket` connection on any failure within the `subscribe` request flow. [Example](https://github.com/red5pro/streaming-html5/tree/master/src/page/test/subscribeRetryOnInvalidName) |

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

## Flash/RTMP

The Red5 Pro HTML SDK Flash-based Subscriber embeds a SWF file - utilizing [swfobject](https://github.com/swfobject/swfobject) - to incorporate playback over RTMP.

The **Red5 Pro HTML SDK** supports the following SWF integration:

* A bare-bones RTMP playback viewer - included in the `src` directory as **red5pro-subscriber.swf** - and distributed with the `live` webapp of the [Red5 Pro Server](https://account.red5pro.com/login) install.
  * _Note: You will need to provide a URL to the [swfobject](https://github.com/swfobject/swfobject) library which will be dynamically injected at runtime if not - by default - found relative to the page at `lib/swfobject`._

### Flash Configuration Properties

| Property | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| protocol | [x] | `rtmp` | The protocol of the RTMP streaming endpoint; `rtmp` or `rtmps`) |
| port | [x] | `1935` | The port that the stream is accessible on. |
| app | [x] | `live` | The application to locate the stream. |
| host | [x] | *None* | The IP or address that the stream resides on. |
| streamName | [x] | *None* | The stream name to subscribe to. |
| mediaElementId | [-] | `red5pro-subscriber` | The target `video` or `audio` element `id` attribute which will display the stream. |
| buffer | [-] | `1` | The amount ot buffer the stream (in seconds). |
| connectionParams | [-] | `undefined` | An object of connection parameters to send to the server upon connection request. |
| width | [x] | `640` | The width of the video element within the SWF movie. |
| height | [x] | `480` | The height of the video element within the SWF movie. |
| embedWidth | [x] | `100%` | The width of the object element for the SWF movie embed. (`Integer` or `100%`) |
| embedHeight | [x] | `100%` | The height of the object element for the SWF movie embed. (`Integer` or `100%`) |
| swf | [x] | `lib/red5pro/red5pro-subscriber.swf` | The swf file location to use as the Flash client subscriber. |
| minFlashVersion | [x] | `10.0.0` | Minimum semversion of the target Flash Player. |
| backgroundColor | [-] | `0x000000` | The color to show in the background of the SWF movie. |
| swfobjectURL | [x] | `lib/swfobject/swfobject.js` | Location of the [swfobject](https://github.com/swfobject/swfobject) dependency library that will be dynamically injected. |
| productInstallURL | [x] | `lib/swfobject/playerProductInstall.swf` | Location of the **playerProductInstall** SWF used by [swfobject](https://github.com/swfobject/swfobject). |

### Flash Example

_index.html_

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

  // Create a new instance of the Flash/RTMP subcriber.
  var subscriber = new red5prosdk.RTMPSubscriber();

  // Initialize
  subscriber.init({
    protocol: 'rtmp',
    port: 1935,
    host: 'localhost',
    app: 'live',
    streamName: 'mystream',
    swf: 'lib/red5pro-subscriber.swf'
    productInstallURL: 'lib/swfobject/playerProductInstall.swf',
    minFlashVersion: '10.0.0',
    buffer: 1,
    width: 640,
    height: 480,
    embedWidth: '100%',
    embedHeight: '100%'
  })
  .then(function(subscriber) {
    // `subcriber` is the Flash/RTMP Subscriber instance.
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

The Red5 Pro HTML SDK HLS Subscriber.

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
    mimeType: 'application/x-mpegURL',
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

It is entirely possible to playback streams in HLS using a 3rd-Party library (such as [VideoJS](https://videojs.com/)), but you will not be able to do so while utilizing the Red5 Pro HTML SDK.

> For more information on how to playback HLS in browsers without native support, please refer to the *Using VideoJS for Playback* section of the [Migration Guide](https://www.red5pro.com/docs/streaming/migrationguide.html#migrating-from-350-to-400).

## Initialization

As you may have noticed form the previous section, the source configuration for each player has differing property requirements. This is due simply to the technologies and playback strategies that each use:

* The **WebRTC** player utilizes [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) and [WebRTC](https://developer.mozilla.org/en-US/docs/Glossary/WebRTC) to subscribe to a video to be displayed in an [HTML5 video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) element.
* The **Flash/RTMP** player utilizes a SWF file to playback streaming video in the Flash Player plugin.
* The **HLS** player utilizes the [HTTP Live Streaming protocol](https://developer.mozilla.org/en-US/Apps/Fundamentals/Audio_and_video_delivery/Live_streaming_web_audio_and_video#HLS) to subscribe to a stream.

As such, the **init** configuration provided to the library to allow for auto-failover player selection should be provided with attributes defining the target source(s) - i.e., `rtc`, `rtmp` and/or `hls`:

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
    .setPlaybackOrder(['rtc', 'rtmp', 'hls'])
    .init({
       "rtmp": {
          // See above documentation for RTMP source option requirements.
        },
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

* Only `rtc`, `rtmp` and `hls` are supported values for order and are also accessible as enums on `Red5ProVidepPlayer.playbackTypes`

# Lifecycle Events

This section describes the events dispatched from the Subscriber of the Red5 Pro HTML SDK.

* [Listening to Subscriber Events](#listening-to-subscriber-events)
* [Common Events](#common-events)
* [WebRTC Subscriber Events](#webrtc-subscriber-events)
* [RTMP Subscriber Events](#rtmp-subscriber-events)
* [HLS Subscriber Events](#hls-subscriber-events)

## Listening to Subscriber Events

The Subscriber(s) included in the SDK are event emitters that have a basic API to subscribing and unsubscribing to events either by name or by wildcard.

To subscribe to all events from a subscriber:

```js
function handleSubscriberEvent (event) {
  // The name of the event:
  var type = event.type;
  // The dispatching publisher instance:
  var subscriber = event.subscriber;
  // Optional data releated to the event (not available on all events):
  var data = event.data;
}

var subscriber = new red5prosdk.RTCSubscriber();
subscriber.on('*', handleSubscriberEvent);
```

> The `*` type assignment is considered a "Wildcard" subscription - all events being issued by the subscriber instance will invoke the assign event handler.

To unsubscribe to all events from a subscriber after assinging an event handler:

```js
subscriber.off('*', handleSubscriberEvent);
```

The following sections of this document describe the event types that can also be listened to directly, instead of using the `*` wildcard.

## Common Events

The following events are common across all Subscriber implementations from the Red5 Pro HTML SDK. They can be accessed from the global `red5prosdk` object from the `SubscriberEventTypes` attribute.

| Access | Name | Meaning |
| :--- | :---: | :--- |
| CONNECT_SUCCESS | 'Connect.Success' | When the subscriber has established a required remote connection, such as to a WebSocket or RTMP-based server. |
| CONNECT_FAILURE | 'Connect.Failure' | When the subscriber has failed to establish a required remote connection for consuming a stream. |
| SUBSCRIBE_START | 'Subscribe.Start' | When the subscriber has started a subscribing to a stream. |
| SUBSCRIBE_FAIL | 'Subscribe.Fail' | When the subscriber has failed to start subscribing to a stream. |
| SUBSCRIBE_INVALID_NAME | 'Subscribe.InvalidName' | When the subscriber is cannot start subscribing to stream because a stream associated with the `streamName` is not available. |
| SUBSCRIBE_STOP | 'Subscribe.Stop' | When the subscriber has successfully closed an active subscription to a stream. |
| SUBSCRIBE_METADATA | 'Subscribe.Metadata' | When metadata is received on the client from the server. |
| SUBSCRIBE_SEND_INVOKE | 'Subscribe.Send.Invoke' | When a message is being sent by a subscribed-to publisher. |
| PLAY_UNPUBLISH | 'Subscribe.Play.Unpublish' | Notification of when a live broadcast has stopped publishing. |
| CONNECTION_CLOSED | 'Subscribe.Connection.Closed' | Invoked when a close to the connection is detected. |
| ORIENTATION_CHANGE | 'Subscribe.Orientation.Change' | Invoked when an orientation change is detected in metadata. Mobile (iOS and Android) broadcasts are sent with an orientation. |
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

## RTMP Subscriber Events

The following events are specific to the `RTMPSubscriber` implementation and accessible on the global `red5prosk` object from the `RTMPSubscriberEventTypes` attribute:

| Access | Name | Meaning |
| :--- | :---: | :--- |
| EMBED_SUCCESS | 'FlashPlayer.Embed.Success' | When the subscriber-based SWF is successfully embedded in the page. |
| EMBED_FAILURE | 'FlashPlayer.Embed.Failure' | When the subscriber-based SWF fails to be embedded properly in the page. |

## HLS Subscriber Events

> There are currently no HLS-specific events. Please refer to the [common events](#common-events).

# Playback Controls

The `4.0.0` release of the SDK introduces Playback API and Default Controls for all subscriber techs with the ability to customize logic and UI for your own branding. To learn more, please refer to the [Playback Controls Documentation](playbackcontrols.md).

# Other Information

## Autoplay Restrictions

In an attempt to provide a more pleasing user experience and reduce data consumption on mobile devices, browsers are continuing to evolve their `autoplay` policies. While generally and attempt to keep websites (read: *ads*) from playing back unwanted and/or unsolicited video and audio, these policies also affect those sites in which the sole intent _is to_ playback video and/or audio - such as from a conference web application built utilizing [Red5 Pro](https://red5pro.com).

Naturally, this can cause some confusion and frustration as `autoplay` may have worked as expected prior to latest browser updates. Thankfully, you do have options when using the *Red5 Pro HTML SDK* to provide a better user experience.

> It should be noted that the recent `autoplay` policies only affect the WebRTC and HLS subscribers from the Red5 Pro HTML SDK.

### Using autoplay with the SDK

If supporting autoplay is a requirement for your web application integrating the *Red5 Pro HTML SDK*, you have three implementation choices to choose from:

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

By declaring only the `autoplay` attribute on the video element and setting the `muteOnAutoplayRestriction` initialization property to `true` in the configuration, you can instruct the HTML SDK to:

* first attempt `autoplay` unmuted
* subsequently attempt to `autoplay` muted, if first attempt fails
* send event notification of `Subscribe.Autoplay.Muted`, if auto-playback is muted

Using this solution, `autoplay` can work as desired for browsers that do not enforce the policy (e.g., the policy may differ between desktop and mobile versions of the same browser). For those browsers that do enforce the policy, the *Red5 Pro HTML SDK* will attempt to autoplay the stream. If an exception is thrown on the `play` request of the video element, the SDK will then declare the `muted` attribute on the element on the video element and make a subsequent attempt to autoplay.

If the muted autoplay happens without exception, a `Subscribe.Autoplay.Muted` event is dispatched from the subscriber instance (refer to [Common Events](#common-events)). As a developer, you can handle this method as per your specifications - such as displaying an alert notifying the user that audio has been muted and instructing them to unmute to hear audio.

_declaration of video element in html:_

```html
<video id="red5pro-subscriber" class="red5pro-media" controls autoplay playsinline />
```

_usage of muteOnAutoplayRestriction in initialization:_

```js
var subscriber = new red5prosdk.RTCSubscriber()
subscriber.init({
    protocol: 'ws',
    port: 5080,
    host: 'localhost',
    app: 'live',
    streamName: 'mystream',
    muteOnAutoRestriction: true
  })
  .then(subscriber => {
    subscriber.on(red5prosdk.SubscriberEventTypes.AUTO_PLAYBACK_MUTED, () => {
      alert('Audio has been muted.')
    })
    return subscriber.subscribe()
  })
  .then(subscriber => {
    subscriber.
  })
```

> The `muteOnAutoplayRestriction` property is `true` by default.

#### Solution 3

> Declaring the `autoplay` attribute of the target video element and setting the `muteOnAutoplayRestriction` initialization property to `false`.

By declaring only the `autoplay` attribute on the video element and setting the `muteOnAutoplayRestriction` initialization property to `false` in the configuration, you instruct the HTML SDK to not attempt to:

* first attempt `autoplay` unmuted
* send event notification of `Subscribe.Autoplay.Failed`, if first attempt fails

Using this solution, `autoplay` can work as desired for browsers that do not enforce the policy (e.g., the policy may differ between desktop and mobile versions of the same browser). For those browsers that do enforce the policy, the *Red5 Pro HTML SDK* will dispatch a `Subscribe.Autoplay.Failed` event from the subscriber instance (refer to [Common Events](#common-events)). As a developer, you can handle this method as per your specifications - such as displaying an alert notifying the user that autoplay did not occur and they will need to press the play button to begin playback.

_declaration of video element in html:_

```html
<video id="red5pro-subscriber" class="red5pro-media" controls autoplay playsinline />
```

_usage of muteOnAutoplayRestriction in initialization:_

```js
var subscriber = new red5prosdk.RTCSubscriber()
subscriber.init({
    protocol: 'ws',
    port: 5080,
    host: 'localhost',
    app: 'live',
    streamName: 'mystream',
    muteOnAutoRestriction: false
  })
  .then(subscriber => {
    subscriber.on(red5prosdk.SubscriberEventTypes.AUTO_PLAYBACK_MUTED, () => {
      alert('Audio has been muted.')
    })
    return subscriber.subscribe()
  })
  .then(subscriber => {
    subscriber.
  })
```
