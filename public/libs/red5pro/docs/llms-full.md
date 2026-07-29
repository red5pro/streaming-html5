# Red5 Pro HTML SDK - LLM Reference

- project: red5pro-html-sdk-ts
- version: 16.0.0-beta.3
- generated_at: 2026-07-29T19:49:45.674Z

## Included Files

- CHANGES.md
- docs/api/_media/hls-subscriber.md
- docs/api/_media/message-channel.md
- docs/api/_media/moq-catalog.md
- docs/api/_media/moq-publisher.md
- docs/api/_media/moq-subscriber.md
- docs/api/_media/pubnub-client.md
- docs/api/_media/whep-client.md
- docs/api/_media/whip-client.md
- docs/api/classes/Event.md
- docs/api/classes/EventEmitter.md
- docs/api/classes/HLSSubscriber.md
- docs/api/classes/LiveSeekClient.md
- docs/api/classes/MessageChannel.md
- docs/api/classes/MessageChannelEvent.md
- docs/api/classes/MessageTransportStateEvent.md
- docs/api/classes/MOQCatalog.md
- docs/api/classes/MOQPublisher.md
- docs/api/classes/MOQSubscriber.md
- docs/api/classes/PlaybackController.md
- docs/api/classes/PlaybackControls.md
- docs/api/classes/PublisherEvent.md
- docs/api/classes/PubNubClient.md
- docs/api/classes/PubNubEvent.md
- docs/api/classes/SourceHandler.md
- docs/api/classes/SourceHandlerImpl.md
- docs/api/classes/SubscriberEvent.md
- docs/api/classes/WHEPClient.md
- docs/api/classes/WHIPClient.md
- docs/api/enumerations/MessageChannelEventTypes.md
- docs/api/enumerations/MessageTransportStateEventTypes.md
- docs/api/enumerations/PlaybackAudioEncoder.md
- docs/api/enumerations/PlaybackState.md
- docs/api/enumerations/PlaybackVideoEncoder.md
- docs/api/enumerations/PublishAudioEncoder.md
- docs/api/enumerations/PublisherEventTypes.md
- docs/api/enumerations/PublishVideoEncoder.md
- docs/api/enumerations/PubNubEventTypes.md
- docs/api/enumerations/RTCPublisherEventTypes.md
- docs/api/enumerations/RTCSubscriberEventTypes.md
- docs/api/enumerations/StatsEndpointType.md
- docs/api/enumerations/SubscriberEventTypes.md
- docs/api/enumerations/WebRTCConnectionEventTypes.md
- docs/api/functions/getRecordedLogs.md
- docs/api/functions/getVersion.md
- docs/api/functions/setLogLevel.md
- docs/api/globals.md
- docs/api/interfaces/EventEmitterInterface.md
- docs/api/README.md
- docs/api/type-aliases/BandwidthConfig.md
- docs/api/type-aliases/HLSSubscriberConfigType.md
- docs/api/type-aliases/LiveSeekConfigType.md
- docs/api/type-aliases/LiveSeekOptions.md
- docs/api/type-aliases/MediaConstraintRange.md
- docs/api/type-aliases/MediaConstraints.md
- docs/api/type-aliases/RTCPublisherConfigType.md
- docs/api/type-aliases/RTCSubscriberConfigType.md
- docs/api/type-aliases/RTCWhepSubscriberConfigType.md
- docs/api/type-aliases/RTCWhipPublisherConfigType.md
- docs/api/type-aliases/StatsConfig.md
- docs/api/type-aliases/VideoConstraints.md
- docs/api/variables/Capability.md
- docs/api/variables/default.md
- docs/api/variables/defaultHLSSubscriberConfig.md
- docs/api/variables/defaultLiveSeekConfig.md
- docs/api/variables/defaultStatsConfig.md
- docs/api/variables/defaultWhepSubscriberConfig.md
- docs/api/variables/defaultWhipPublisherConfig.md
- docs/api/variables/LOG_LEVELS.md
- docs/api/variables/PlaybackStateReadableMap.md
- docs/hls-subscriber.md
- docs/message-channel.md
- docs/moq-catalog.md
- docs/moq-publisher.md
- docs/moq-subscriber.md
- docs/pubnub-client.md
- docs/whep-client.md
- docs/whip-client.md
- MIGRATION_GUIDE.md
- README.md

## Consolidated Content

### Source: `CHANGES.md`

# Changes

## 15.6.0

- feat: Optimization Params for `WHIPClient` (Todd Anderson).
- feat: adding AV1 to codec listings (Todd Anderson).
- fix: DataChannel Configuration supports all properties (Todd Anderson).
- fix: expose PubNubEvents onindex (Todd Anderson).
- fix: pubnub sub fail on channel (Todd Anderson).

## 15.5.0

- fix: DataChannel Configuration supports all properties.
- [See 15.4.0-beta.1](#1540-beta1)
- [See 15.4.0-alpha.1](#1540-alpha1)

## 15.4.0-beta.1

- feat: Introduction of `reconnect` configuration parameter for `WHIPClient` (Todd Anderson).
    * This feature allows for graceful reconnect on network loss for publishers.
    * NOTE: Requires `15.4.0` release of Red5 Server with the `resilient-stream` plugin enabled.

## 15.4.0-alpha.1

- feat: Introduction of `MessageChannel` for message communication over a data-channel enabled client (Todd Anderson). _There is no underlying media streaming logic in this client._
- fix: null pointer on lost ref for setRemoteDescription during SDP exchange (Todd Anderson).
- fix: additional stats reporting (Todd Anderson).

## 15.2.0

- fix: ICE configuration order preference (Todd Anderson).
- feat: PubNub Integration and introduction of `PubNubClient` (Todd Anderson).
- feat: Connection health monitoring for WebRTC publishers and subscribers with automatic detection of stale stats, ICE state regression, excessive RTT, and ICE negotiation timeouts (Todd Anderson)
- feat: Added new WebRTC connection health events: `WebRTC.Connection.StaleStats`, `WebRTC.Connection.StateRegression`, `WebRTC.Connection.ExcessiveRTT`, `WebRTC.Connection.IceTimeout` (Todd Anderson)
- feat: `renegotiationPolicy` init configuration property for defining monitor and handling of ICE negotiation failures.

## 15.0.0

**ALERT: Breaking Changes**

- feat: Removal of WebSocket based clients, `RTCPublisher`, `RTCSubscriber` and `RTCConferenceParticipant`
- feat: WHIP/WHEP clients become main players: `WHIPClient` and `WHEPClient`
- feat: Complete rewrite of SDK in `TypeScript` - allowing for types available in module installation.

## 14.3.0

- fix: viewless subscriber/whep response to metadata (Todd Anderson)

## 14.2.0

- fix: viewless subscriber and websocket signaling. (Todd Anderson)
- feat: sending publish resolution on SDP. (Todd Anderson)
- fix: transport type query paramms on whip/whep (Todd Anderson)

## 14.0.0

- fix: publish codec listings. (Todd Anderson)
- fix: viewless subscriber for WHEPClient. (Todd Anderson)
- feat: codec init param support for WHIP and RTC publishers. (Todd Anderson)

## 13.0.0

- fix: removal of SharedObject functionality. (Todd Anderson)
- fix: NPE check for mute check util. (Todd Anderson)
- feat: allowing for endpoint init config to explicitly provide endpoint to connect to for WS and WHIP/WHEP (Todd Anderson)

## 12.5.1

- fix: baseline munge for in and out. (Todd Anderson)

## 12.2.0

- default for WHIP/WHEP to use Session-Host if provided. (Todd Anderson)
- fix for check on queries for WHIP/WHEP. (Todd Anderson)
- monitoring streamingMode on WHEP client initial connection. (Todd Anderson)

## 12.0.0

- Fix for safari VOD/HLS playback and playhead time. (Todd Anderson)
- Fix for connectionParams tacked on WHIP/WHEP calls. (Todd Anderson)
- Fix for Firefox issue with Bundle order (Todd Anderson)

    > The issue was that the offer provided by the server has a BUNDLE order of 0 1
    > 2. When the WHEP client set that as their remote SDP and generated an offer,
    > the BUNDLE order changed to 2 1 0 in the answer SDP. This would cause
    > subscription issues and non-existant candidates.

    > Solution was the munge in the incoming offer BUNDLE line order to that of the
    > answer.

- Using host query param when Location provided to WHIP/WHEP clients. (Todd Anderson)
- Fix for live seek fullURL switching. (Todd Anderson)
- Endpoint header recognition in whip/whep and event bubble. (Todd Anderson)

## 11.0.0

- Introducing WHIP/WHEP for ingest and egress of WebRTC streams, respectively. (Todd Anderson)

## 10.9.3

- SDK update and switch to live seek config. (Todd Anderson)
- Adding support for live vod on unpublish to continue scrubbing. (Todd Anderson)
- adding in some error management for hls vod. (Todd Anderson)
- hls endpoint for SM support on live vod. (Todd Anderson)
- better cleanup on stop of seekable media. (bustardcelly)
- using Hls.js fallback for Safari and seek feature. (bustardcelly)
- Allow playback on scrub when unpublish (bustardcelly)

    > If the live stream becomes unpublished, but the video has been scrubbed to VOD time segment, then we want to allow for playback until the end of the live stream termination.

## 10.6.0

- Adding doNotSwitch to subscriber offer. (Todd Anderson)
- Fix for stereo subscribers with Chrome (Paul Gregoire)

## 10.0.0

- update to MUTE API post schema. (Todd Anderson)
- adding Mute API to RTCSubscriber. (Todd Anderson)
- introduction of RTCConferenceParticipant. (bustardcelly)

## 9.1.2

- Fix for `detachView` bug in WebRTC subscriber. (bustardcelly)

## 9.1.0

- Added `sendLog` API for `RTCPublisher` and `RTCSubscriber` to send log-level messages to server. (bustardcelly)

## 8.0.2

- Fix for unsubscribe and close of RTCPeerConnection upon notification of `unpublish`. (bustardcelly)

## 8.0.1

- Fix for rejection on publish when in peer negotation. (bustardcelly)

## 8.0.0

- support for DataChannel usage after signalling is complete for WebRTC. See [Migration Guid](MIGRATION_GUIDE.md). (bustardcelly)

## 7.2.1

- fix for unpreview turning autoplay to false in publisher. (bustardcelly)
- fix for non-DOM manipulation if not using custom controls. (bustardcelly)

## 7.0.0

- defaulting pub clear to false for backward compatability. (bustardcelly)
- adding clear on media unpublish. (bustardcelly)
- fixed issue with RTC retry sub removing video element if not available. (bustardcelly)

## 6.0.0

- listening to onresize for video resolution change in transcode. (bustardcelly)
- setting delay off controls in mobile to 6 seconds. (bustardcelly)
- adding rejection and acceptance notifications for gUM in RTC publishers. (bustardcelly)
- added Video Dimensions Change to bubble up playback dimensions. (bustardcelly)
- Fix for flash stalled playback. (bustardcelly)
- Added notifications for RTCPeerConnection open event. (bustardcelly)

    > This will allow for clients to recognize when they can start using peer connection APIs such as mute/unmute.

- fix for HLS socket authentication failure capture. (bustardcelly)
- Fix for Safari Publisher issue. (bustardcelly)

    > When `gUM` returns with `video` track listed before `audio`, there is an issue on delivering the media to the server. Most likely due to mismatched candidates.

- Fixed improper spelling of `productInstallUrl` config option. (bustardcelly)

    > Is now `productInstallURL` for both rtmp publisher and subscriber.

- fix for unpublish not resolving if not currently publishing. (bustardcelly)
- API update to allow for providing MediaStream for publish to bypass gUM in SDK internally. (bustardcelly)
- some cleanup on how streamingMode is handled for HLS. (bustardcelly)

## 5.7.0

- fix for WebRTC API deprecation of addStream. (bustardcelly)

## 5.6.0

- No Changes.

## 5.5.0

- default to srcObject in try...catch for modern browsers. (bustardcelly)
- fix for bandwidth inject in latest chrome browser. (bustardcelly)
- adding notification and retry support for autoplay restriction of subscribers. (bustardcelly)

    > * WebRTC, RTMP and HLS Subscriber support
    > * muteOnAutoplayRestriction configuration property added
    > * Additional subscriber events for client-side notifications of autoplay restrictions

- allowing for decoupled socket for sharedobject connections. (bustardcelly)

## 5.4.0

- screenfull dep update. (bustardcelly)
- gum rejection capture. (bustardcelly)
- improper pass of of metadata in webrtc publisher. (bustardcelly)
- allow for backward compatiblity on default websocket ports. (bustardcelly)
- updating documentation on websocket ports. (bustardcelly)
- trailing slash and change to default ports for WebSocket connections. (bustardcelly)
- hotfix for handling promise rejection on sub availability. (bustardcelly)
- Adding send invoke support on publisher side socket messaging. (bustardcelly)
- ortc support. (bustardcelly)
- adding keyFramerate init attribute. (bustardcelly)
- fix for promise resolve on peer connection setup. (bustardcelly)
- subscribe start event for hls subscriber. (bustardcelly)
- fix for DOM cleanup on unsubscribe. (bustardcelly)
- Adding `rtcConfiguration` support (bustardcelly)

    > * WebRTC Publisher
    > * WebRTC Subscriber
    > * defaults to `iceServers` if rtcConfiguration is undefined
    > * Provides a default rtcConfiguration

## 5.2.0

- moving ws.error invoke to promise.reject on timeout of ws connect. (bustardcelly)
- change to warn on capture of exceptions for play on pause. (bustardcelly)
- update to SDK to properly mute with UI update on controls. (bustardcelly)
- removal of socket retry to socket check on ready state. (bustardcelly)
- removal of onaddstream delegate for deprecation. (bustardcelly)
- remove of duplicate event handler. (bustardcelly)
- Adding check for empty candidate from server (bustardcelly)

    > * Server at times (depending on client) will send a `candidate` object as empty during the negotiation process.
    > * A new event type has been added to notify listeners of this empty candidate

- Pub/Sub support for mobile device orientation recognition. (bustardcelly)

## 5.0.0

- removing onbeforeunload hook to dismantle sockets. (bustardcelly)
- Allowing for auth/validation on HLS Subscribers (bustardcelly)

    > Enabling auth/validation using connectionParam options on HLS Subscribers. This will internally attempt to make a connection on a WebSocket using the connection parameters. If the socket is opened, it is considered successful validation. If rejected, the client is shutdown.

- fix for mutiple property updates on shared object integration. (bustardcelly)
- offload translation logic for orientation to focus on dynamic layout updates. (bustardcelly)
- adding iceTransport config option. (bustardcelly)
- WebRTC subscriber config prop maintainConnectionOnSubscribeErrors (bustardcelly)
- removal of unnecessary bandwidth config prop on subscribers. (bustardcelly)
- Exposing autoLayoutOrientation (bustardcelly)

    > Defaulted to true.
    > When set to false, it is up to the developer to assign transitions as related to orientation of broadcasts.

## 4.5.0

- docs update. (bustardcelly)

## 4.2.0

- Firefox SDP munge for bandwidth RPRO-4625 (bustardcelly)
- End of Candidates support for publisher and subscriber (requires Server update) RPRO-4654 (bustardcelly)
- Multiple Subscribe.Connection.Closed events 4653 via red5pro/streaming-html5#113 (bustardcelly)
- Attribute recognition fix for controls and autoplay (bustardcelly)
- Encoding connection params for WebRTC and RTMP pub/sub requires PR from simple-auth infrared5/red5pro-simple-auth-plugin#3 (bustardcelly)
- adding peer connection configs for possible speed up of ice gather. (bustardcelly)
- adding promise check on video element playback for mobile safari 11. (bustardcelly)
- more logs for disconnect timeout. (bustardcelly)
- putting disconnect on a timeout for rtc peers. (bustardcelly)
- remove of bundle form isAvailable call in websocket api. (bustardcelly)
- encoding connect params for rtc and rtmp. (bustardcelly)
- fix per [https://www.w3.org/wiki/HTML/Elements/video](https://www.w3.org/wiki/HTML/Elements/video) (bustardcelly)
- debug info for hls playback. (bustardcelly)
- accounting for NetConnection Fail on rtc connections. (bustardcelly)
- one close notification from subscriber. (bustardcelly)
- adding subscriber side of empty candidate socket notification. (bustardcelly)
- injecting b=AS: for a/v on FF. (bustardcelly)

## 4.0.0

- removing babel-polyfill compilation. (bustardcelly)
- better handling of swfobject success. (bustardcelly)
- found that CSS issue and squashed it (bustardcelly)
- removing rtcpmux policy peer config attribute. (bustardcelly)
- retry limiter failover for FF websocket timeout. (bustardcelly)
- proper assignment of close handlers. (bustardcelly)
- fix for events on shared objects. (bustardcelly)
- proper cleanup on subscribers when unsubscribe. (bustardcelly)
- fix for unpublish on flash side. disconnect and close to lower connection count on server. (bustardcelly)
- start on jsdoc inclusion. (bustardcelly)
- refining the documentation on tagging for changelog. (bustardcelly)
- responding with error message for failure on RTMP subscriber. (bustardcelly)
- fix for default mediaContraints for publisher. (bustardcelly)
- huge oversight on parseInt. (bustardcelly)
- auto preview for rtc publisher. (bustardcelly)
- example and documentation on custom playback controls. (bustardcelly)
- documenting playback events API. (bustardcelly)
- allowing for RC builds. (bustardcelly)
- migration guide. (bustardcelly)
- updating documentation. (bustardcelly)
- proper dim failover and promise chain. (bustardcelly)
- using curry/filter to locate best resolution. (bustardcelly)
- moving gUM to internal in SDK. (bustardcelly)
- allow controls and API for flash, webrtc & hls clients. (bustardcelly)

## 3.5.0

- regex on level for rtmp pub setting. (bustardcelly)
- exposing media settings of the rtmp publisher. (bustardcelly)
- check for empty candidate on RTC subscription. (bustardcelly)

## 3.4.3


- fix for test of `srcObject` in video element. (bustardcelly)
- fix for subscriber.stop event dispatch. (bustardcelly)

## 3.4.1

- readme updates (bustardcelly)
- offloading subscriber start event to websocket notification. (bustardcelly)
- Update for API change in browsers. (bustardcelly)

    Though latest adapter.js should handle, adding for legacy and new browsers.


## 3.4.0


## 3.3.0

- using std camera sizes for RPRO-3787 (bustardcelly)
- contrib doc updates (bustardcelly)
- update to commit docs for changelog. (bustardcelly)

## 3.2.7

- added changelog. (bustardcelly)

## 3.2.6

- proper removal of child in flash embed. (bustardcelly)
- support for IE and remove element on flash fallback. (bustardcelly)

### Source: `docs/api/_media/hls-subscriber.md`

<h3 align="center">
  <img src="../assets/Red5_Truetime_black.png" alt="Red5 Pro Logo" height="65" />
</h3>
<p align="center">
  <a href="../README.md">Quick Start</a> &bull;
  <a href="whip-client.md">Publishing</a> &bull;
  <a href="whip-client.md">Subscribing</a> &bull;
  <a href="message-channel.md">Message Channel</a> &bull;
  <a href="pubnub-client.md">PubNub Client</a>
</p>

---

# Native HLS Playback

This document intends to describe how to use the `HLSSubscriber` client included with the SDK to playback HLS content native in a browser (currently only available in Mobile and Desktop Safari).

> HLS content playback from Red5 is still supported in browser with non-native HLS support by using a 3rd-Party HLS library. We recommend using [HLS.js](https://github.com/video-dev/hls.js/).

* [HLSSubscriber](#hlssubscriber)
    * [Usage](#usage)
    * [Init Configuration](#init-configuration)
    * [Events](#events)

# HLSSubscriber

The `HLSSubscriber` available from the SDK provides an easy way to setup HLS playback of a stream from Red5 in a browser that supports native HLS playback (i.e., Mobile and Desktop Safari).

## Usage

The follow example demonstrates the usage of `HLSSubscriber` from the SDK loaded in a browser as a script dependency. The example is easily transferrable to one in which the SDK is loaded as a module - either through NPM dependency - or as a script declaration - using `import`.

### Cloud Red5 Server

If your app is targeting a Cloud-based deployment of Red5 Server (such as from [https://cloud.red5.net](https://cloud.red5.net)) you will need to rely on remote storage for live and VOD HLS stream content. This could be a storage bucket in a cloud environment or an NFS mount.

> Such storage parameters can be set in your Red5 Cloud deployment if using [https://cloud.red5.net](https://cloud.red5.net) or refer to the [NFS documentation from our site](https://www.red5.net/docs/red5-pro/users-guide/protocols/converting/red5-pro-ffmpeg-server-configuration/).

Because of Cross-Origin policies in browsers, you will not be able to load HLS files that would reside in an Origin node served over HTTP. As such, you will need to know the remote location of the HLS manifest (`.m3u8`) file and provide the full URL as the `endpoint` value of the init configuration:

```html
...
<video id="red5pro-subscriber" controls autoplay playsinline></video>
...
```

```js
const { HLSSubscriber } = red5prosdk

const startHLSSubscriber = async () => {
  try {
    const subscriber = new HLSSubscriber()
    await subscriber.init({
       endpoint: 'https://nfs.myred5-deployment.cloud.red5.net/live/mystream.m3u8',
       streamName: 'mystream'
    })
    await subscriber.subscribe()
  } catch (error) {
    // Handle error.
    // Most likely due to non-native HLS Playback support in browser.
    // Integration with 3rd-Party library - such as HLS.js - is recommended in such a scenario.
  }
}

startHLSSubscriber()
```

### Standalone Red5 Server

If your app is targeting a standalone self-deployed version of the Red5 Server, the following example demonstrates native playback of HLS using `HLSSubscriber`:

```html
...
<video id="red5pro-subscriber" controls autoplay playsinline></video>
...
```

```js
const { HLSSubscriber } = red5prosdk

const startHLSSubscriber = async () => {
  try {
    const subscriber = new HLSSubscriber()
    subscriber.on('*', event => {
        const { type, data } = event
        console.log(type, data)
    })
    await subscriber.init({
       protocol: 'https',
       port: 443,
       host: 'my-red5-server.com',
       streamName: 'mystream'
    })
    await subscriber.subscribe()
  } catch (error) {
    // Handle error.
    // Most likely due to non-native HLS Playback support in browser.
    // Integration with 3rd-Party library - such as HLS.js - is recommended in such a scenario.
  }
}

startHLSSubscriber()
```

## Init Configuration

The following are the available properties that can be defined in the init configuration provided to the `HLSSubscriber` client:

| Property | Required | Default | Description |
| :--- | :---: | :--- | :--- |
| protocol | [x] | `https` | The protocol uri that the stream source resides on. |
| port | [-] | `443` | The port uri that the stream source resides on. |
| app | [x] | `live` | The webapp name that the stream source resides in. |
| host | [x] | *None* | The IP or FQDN address that the stream resides on. |
| streamName | [x] | *None* | The stream name to subscribe to. |
| endpoint | [-] | `undefined` | The full URL of the `m3u8` file to load, if known. |
| mediaElementId | [-] | `red5pro-subscriber` | The target `video` or `audio` element `id` attribute which will display the stream. |
| muteOnAutoplayRestriction | [-] | `true` | Flag to attempt to mute the `video` element when `autoplay` is restricted in the browser. [See documentation on Autoplay Restrictions](../articles/autoplay/autoplay_policy.md) |
| connectionParams | [-] |  `undefined` | An object of connection parameters to send to the server upon connection request. |

## Events

The following describe the various events that can be listened for on the `HLSSubscriber` and enumerated on the `SubscriberEventTypes` object:

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `CONNECT_SUCCESS` | 'Connect.Success' | When the subscriber has established a required remote connection, such as to a WebSocket server. |
| `CONNECT_FAILURE` | 'Connect.Failure' | When the subscriber has failed to establish a required remote connection for consuming a stream. |
| `SUBSCRIBE_START` | 'Subscribe.Start' | When the subscriber has started a subscribing to a stream. |
| `SUBSCRIBE_STOP` | 'Subscribe.Stop' | When the subscriber has successfully closed an active subscription to a stream. |
| `SUBSCRIBE_METADATA` | 'Subscribe.Metadata' | When metadata is received on the client from the server. |
| `VIDEO_DIMENSIONS_CHANGE` | 'Subscribe.VideoDimensions.Change' | Invoked when `video` element has loaded metadata and the incoming stream dimensions are available. |
| `ORIENTATION_CHANGE` | 'Subscribe.Orientation.Change' | Invoked when an orientation change is detected in metadata. Mobile (iOS and Android) broadcasts are sent with an orientation. |
| `STREAMING_MODE_CHANGE` | 'Subscribe.StreamingMode.Change' | Invoked when the broadcast has "muted" either or both their video and audio tracks. |
| `VOLUME_CHANGE` | 'Subscribe.Volume.Change' | Invoked when a change to volume is detected during playback. _From 0 to 1._ |
| `PLAYBACK_TIME_UPDATE` | 'Subscribe.Time.Update' | Invoked when a change in playhead time is detected during playback. _In seconds._ |
| `PLAYBACK_STATE_CHANGE` | 'Subscribe.Playback.Change' | Invoked when a change in playback state has occured, such as when going from a `Playback.PAUSED` state to `Playback.PLAYING` state. |
| `FULL_SCREEN_STATE_CHANGE` | 'Subscribe.FullScreen.Change' | Invoked when a change in fullscreen state occurs during playback. |
| `AUTO_PLAYBACK_FAILURE` | 'Subscribe.Autoplay.Failure' | Invoked when an attempt to `autoplay` on a media element throws a browser exception; typically due to browser security restrictions and their autoplay policies. (WebRTC and HLS, only) [See section on Autoplay Restrictions](../articles/autoplay/autoplay_policy.md) |
| `AUTO_PLAYBACK_MUTED` | 'Subscribe.Autoplay.Muted' | Invoked when an attempt to `autoplay` on a media element throws a browser exception and is muted based on the `muteOnAutoplayRestriction` config property; typically due to browser security restrictions and their autoplay policies. (WebRTC and HLS, only) [See section on Autoplay Restrictions](../articles/autoplay/autoplay_policy.md) |

### Listening for Events

The `HLSSubscriber` included in the SDK is an event emitter that provides a basic API to subscribe and unsubscribe to events either by name or by wildcard.

To subscribe to all events from a subscriber:

```js
const handleSubscriberEvent = (event) => {
  // The name of the event:
  const { type } = event
  // The dispatching subscriber instance:
  const { subscriber } = event
  // Optional data releated to the event (not available on all events):
  const { data } = event
}

const subscriber = new HLSSubscriber()
subscriber.on('*', handleSubscriberEvent)
```

> The `*` type assignment is considered a "Wildcard" subscription - all events being issued by the subscriber instance will invoke the assign event handler.

To unsubscribe to all events from a subscriber after assinging an event handler:

```js
subscriber.off('*', handleSubscriberEvent)
```

The following sections of this document describe the event types that can also be listened to directly, instead of using the `*` wildcard.

### Source: `docs/api/_media/message-channel.md`

<h3 align="center">
  <img src="../assets/Red5_Truetime_black.png" alt="Red5 Pro Logo" height="65" />
</h3>
<p align="center">
  <a href="../README.md">Quick Start</a> &bull;
  <a href="whip-client.md">Publishing</a> &bull;
  <a href="whep-client.md">Subscribing</a> &bull;
  <a href="#">Message Channel</a> &bull;
  <a href="pubnub-client.md">PubNub Client</a>
</p>

---

# MessageChannel

The `MessageChannel` client is an ingest-based (read: "broadcast") client that extends `WHIPClient` as its underlying framework and capabilities are very similar, with the differing aspect of `MessageChannel` not supporting any media streaming.

## A Note on WHIP/WHEP & DataChannel

It should be noted if that `WHIPClient` and `WHEPClient` - used for publishing and subscribing streams, respectively - by default, include a messaging channel (a.k.a., `DataChannel`) through their underlying `RTCPeerConnection`.

Due to these clients' streaming nature, that underlying messaging channel will be closed once the respective stream is closed - meaning the messaging channel will not remain open if not broadcasting or consuming a stream.

In most cases, this is common scenario. However, if you would like to maintain a messaging channel _along-side_ a streaming client, you can utilize the `MessageChannel` client.

> Be aware that since the `MessageChannel` is not inherently associated with a stream, synchronizations between messages and any associative, external streams will not be available.

* [Usage](#usage)
* [Init Configuration](#init-configuration)
* [Send API](#send-api)
* [Events](#events)
* [Statistics](#statistics)
* [Stream Manager 2.0](#stream-manager-20)

# Usage

Because `MessageChannel` is a subclass of `WHIPClient` (the media streaming broadcaster), much of the init setup and event structure is similar.

To create and use a `MessageChannel` client:

```js
let messageChannel
try {
    messageChannel = new MessageChannel()
    messageChannel.on('*', , (event) => console.log(event))

    // See next section: Init Configuration, for more details.
    await messageChannel.init(configuration)
    await messageChannel.open()
} catch (error) {
    // Something went wrong...
}

// ... when ready to close the connection ...
messageChannel?.close()
```

## MessageChannel & the SDK

Dependening on how you include the SDK into your project, you can access the `MessageClient` from the following:

_NPM install_:

```js
import { MessageChannel } from 'red5pro-webrtc-sdk'
```

_Browser, CDN_:

```js
const { MessageChannel } = red5prosdk
```

> For more in-depth information related to usage, please refer to the [WHIPClient](whip-client.md#usage) documentation.

# Init Configuration

Because `MessageChannel` inherits from `WHIPClient`, its initialization configuration shares the same properties and structure, however many attributes will be ignored as they pertain to streaming media on a `WHIPClient` which have no regard to the role of a `MessageChannel`.

The following properties are respected by the `MessageChannel` client:

| Property | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `host` | [x] | *None* | The IP or address that the WebSocket server resides on. |
| `streamName` | [x] | *None* | The name of the message channel to use in association. |
| `protocol` | [x] | `https` | The protocol of the host for the signaling communication. |
| `port` | [x] | `443` | The port on the host that the Red5 server listens on; `5080` or `443` (insecure or secure, respectively). |
| `app` | [x] | `live` | The webapp context name that the stream is on. |
| `endpoint` | [-] | `undefined` | The full URL of the endpoint to stream to. **This is primarily used in Stream Manager 2.0 integration for clients.**
| `rtcConfiguration` | [-] | _Basic_ | The `RTCConfiguration` to use in setting up `RTCPeerConnection`. [RTCConfiguration](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary)|
| `dataChannelConfiguration` | [-] | `{name: "red5pro"}` | An object used in configuring a n `RTCDataChannel`. _Only used when `includeDataChannel` is defined as `true`_ |
| `connectionParams` | [-] | `undefined` | An object of connection parameters to send to the server upon connection request. |

## Init Example

The following is an example of using the init configuration for a `MessageChannel` client on a Standalone deployment of the Red5 Server:

```js
try {
    // If the standalone Red5 server is hosted over HTTPS, most other attributes can be left to default.
    const configuration = {
      host: 'mydeployment.red5.net',
      streamName: `${uuid}-message-channel`,
      dataChannelConfiguration: {
        name: 'my-channel-name'
      }
    }
    const messageChannel = new MessageChannel()
    messageChannel.on('*', , (event) => console.log(event))
    await messageChannel.init(configuration)
    await messageChannel.open()
} catch (error) {
    // Something went wrong...
}
```

# Send API

The `MessageChannel` has a few options for broadcasting messages out to other clients connected to the channel:

## send(methodName: string, data: any)

The `send` method is an override of the `MessageChannel` underlying `WHIPClient` implementation. It essentially is an override to ensure the message data is delivered on other connected clients to the specified DataChannel.

> The `data` is expected as either a string or an `Object` that can be serialized to JSON.

## sendMessage(message: any)

The `sendMessage` method is a convenience method of which the `send()` call invokes - delivering JSON data to all clients connected to the specified DataChannel

> The `message` is expected as either a string or an `Object` that can be serialized to JSON.

## sendData(data: any)

The `sendData` method will attempt to send any type of data, untouched, along the DataChannel - as such, with it comes great power; use wisely.

# Events

Because `MessageChannel` inherits from `WHIPClient`, events unrelated to streaming - such as those related to the underlying WebRTC connection (e.g., `WebRTC.*`) - will be dispatched from `MessageChannel`.

There are a few that are specific to `MessageChannel` that are available and enumerated on the `MessageChannelEventTypes` object:

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `OPEN` | 'MessageChannel.Open' | When the message channel has successfully opened and available to send and receive messages. |
| `SEND` | 'MessageChannel.Send' | When the message channel has sent a message along the message channel. _Note: This is not confirmation that the server received the actual message._ |
| `RECEIVE` | 'MessageChannel.Receive' | When the message channel has received a message. |
| `CLOSE` | 'MessageChannel.Close' | When the message channel has been closed. |
| `FAIL` | 'MessageChannel.Fail' | When the message channel has failed to open properly. |
| `ERROR` | 'MessageChannel.Error' | When an error has occurred in opening or during a message channel session. |

> Please visit the [WHIPClient](whip-client.md#events) documentation for more in-depth listing of events.

# Statistics

Similar to being able to monitor for statistics on the underlying `RTCPeerConnection` of other clients from the SDK, statistics related to the `MessageChannel` can be monitored as well - though the data gathered will pertain mostly to the connection and `data-channel`.

## Stats Configuration

The configuration used for statistics monitoring has the following structure:

```js
{
  // Optional.
  // If provided, it will POST stats to this endpoint.
  // If undefined or `data-channel`, it will post stats to message transport.
  // If null or `event-transport`, it will only emit status events.
  endpoint: red5prosdk.StatsEndpointType.DATA_CHANNEL,
  additionalHeaders: undefined,
  interval: 5000, // Interval to poll stats, in milliseconds.
  include: [], // Empty array allows SDK to be judicious about what stats to include.
}
```

### endpoint

* If the `endpoint` is defined with a URL, the SDK will attempt to make `POST` requests with a JSON body representing each individual report.
* If the `endpoint` is set to `data-channel` or `undefined`, the SDK will post metadata with type `stats-report` on the underlying message transport (DataChannel) if available.
* If the `endpoint` is set to `event-transport` or `null`, the SDK will only emit events with the metadata on the `WebRTC.StatsReport` event.

### additionalHeaders

By default, if an `endpoint` is defined, the `POST` request body will be in JSON and have the `{ 'Content-Type': 'application/json' }` header set. If requirements - such as authentication - are required, a map of additional headers can be provided to be sent along with the request.

### interval

The polling interval (in milliseconds) to access the `RTCStatsReport` from the underlying `RTCPeerConnection` of the publisher client.

### include

An array of static type strings. These directly map to the listing of type available for `RTCStatsReport` objects. If left empty or undefined, the SDK will report the statistics it deems suitable for tracking proper broadcast conditions.

e.g.,

```js
include: ['data-channel', 'transport']
```

> More information about the statistic types are available at [https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport#the_statistic_types](https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport#the_statistic_types)

## Invocation

To start statistics monitoring, you have a couple of options:

* You can provide a `stats` attribute with the [stats configuration object](#stats-configuration) to the [init configuration](#webrtc-configuration-parameters).
* You can call `monitorStats` on the publisher client with the optional [stats configuration object](#stats-configuration) parameter.

> Additionally, you can stop monitoring by calling `unmonitorStats` on the publisher client.

## Additional Information

Attached to the metadata that is reported are additional properties that pertain to the publisher client.

As well, Along with the metadata releated to the `RTCStatsReport` objects emitted by the underlying `RTCPeerConnection`, the statistics monitoring also sends out a few event and action metadata related to the operation of a publisher client.

> See the following section for examples.

## Example of Statistics Metadata

The following is an example of a statistics metadata that is emitted in a `WebRTC.StatsReport` event and POSTed to any defined optional endpoint:

```json
{
  "name": "MessageChannelStats",
  "created": 1771514183637,
  "fingerprint": "165799de-87ac-4c13-95d3-66c7512080fe",
  "device": {
    "appVersion": "5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36",
    "platform": "MacIntel",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36",
    "vendor": "Google Inc."
  },
  "client": {
    "host": "myred5.deploy",
    "streamName": "dc-1771514183635",
    "connectionParams": {
      "capabilities": 4
    }
  },
  "publicIP": "174.169.251.174",
  "type": "stats-report",
  "timestamp": 1771514658751,
  "data": {
    "id": "D159",
    "timestamp": 1771514658751.39,
    "type": "data-channel",
    "label": "red5pro",
    "state": "open",
    "messagesSent": 45,
    "messagesReceived": 93,
    "bytesSent": 4815,
    "bytesReceived": 12556
  }
}
```
# Stream Manager 2.0

> This section provides information that relate to the release of Stream Manager 2.0 and its integration with WHIP/WHEP clients, and MessageChannel.

The Stream Manager 2.0 simplifies the proxying of web clients to Origin and Edge nodes. As such, an initialization configuration property called `endpoint` was added to the WebRTC SDK. This `endpoint` value should be the full URL path to the proxy endpoint on the Stream Manager as is used as such:

## WHIP Proxy

```javascript
const host = 'my-deployment.red5.net'
const streamName = `${uuid}-message-channel`
const nodeGroup = 'my-node-group'
const endpoint = `https://${host}/as/v1/proxy/whip/live/${streamName}`
const config = {
  endpoint,
  streamName,
  connectionParams: {
    nodeGroup
  },
  dataChannelConfiguration: {
    name: 'my-channel'
  }
  // additional configurations
}
const messageChannel = await new MessageChannel().init(config)
messageChannel.on('*', (event) => console.log(event))
await messageChannel.open()
```

### Source: `docs/api/_media/moq-catalog.md`

<h3 align="center">
  <img src="../assets/Red5_Truetime_black.png" alt="Red5 Pro Logo" height="65" />
</h3>
<p align="center">
  <a href="../README.md">Quick Start</a> &bull;
  <a href="moq-publisher.md">MOQ Publishing</a> &bull;
  <a href="moq-subscriber.md">MOQ Subscribing</a> &bull;
  <a href="#">MOQ Catalog</a> &bull;
  <a href="whip-client.md">WHIP/WHEP Docs</a>
</p>

---

# MOQCatalog

`MOQCatalog` is a lightweight client for reading stream catalog data from a MOQ relay.

Use it when you want to inspect track metadata without starting full media playback. You can either:

- perform a one-shot `fetch()` (then close), or
- open a `subscribe()` session for catalog updates over time.

* [Usage](#usage)
* [Init Configuration](#init-configuration)
* [Events](#events)

# Usage

Initialize first, then call either `fetch()` or `subscribe()`.

```js
const { MOQCatalog, MOQCatalogEventTypes } = red5prosdk

const catalog = new MOQCatalog()
catalog.on('*', event => {
  console.log(event.type, event.data)
})

await catalog.init({
  endpoint: 'https://relay.example.com:4433',
  namespace: 'live/mystream'
})
```

## One-shot fetch

```js
// Note: Namespace argument is optional.
await catalog.fetch('live/mystream')
// Catalog is emitted via events, then session closes automatically.
```

## Continuous subscribe

```js
// Note: Namespace argument is optional.
await catalog.subscribe('live/mystream')
// Later:
await catalog.unsubscribe()
```

## Constructor with URL

Passing URL to constructor auto-runs internal init.

```js
const catalog = new MOQCatalog('https://relay.example.com:4433/live/mystream')
await catalog.fetch()
```

# Init Configuration

The `init()` call accepts `MOQCatalogConfigType`.

| Property | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `endpoint` | [-] | `undefined` | Full MOQ relay URL. If omitted, SDK uses `protocol://host:port`. |
| `host` | [x]* | `undefined` | Relay host when `endpoint` is omitted. |
| `streamName` | [x]* | `undefined` | Stream name used for namespace fallback. |
| `protocol` | [x] | `https` | Relay protocol (`ws`, `wss`, `http`, `https`). |
| `port` | [x] | `4433` | Relay port. |
| `app` | [x] | `live` | App scope used for namespace fallback. |
| `namespace` | [-] | `app/streamName` | Explicit namespace for fetch/subscribe calls. |
| `draftVersion` | [-] | `16` | MoQ transport draft version. |
| `certKey` | [-] | `undefined` | Certificate hash input for WebTransport setup. |
| `moqtLogLevel` | [-] | `none` | Log level for MOQ internals. |

`*` Required when `endpoint` is not provided.

# Events

`MOQCatalog` is an event emitter:

```js
const onCatalogEvent = event => {
  const { type, data } = event
  console.log(type, data)
}

catalog.on('*', onCatalogEvent)
// later
catalog.off('*', onCatalogEvent)
```

The following are emitted from `MOQCatalogEventTypes`:

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `FETCH` | `MOQ.Catalog.Fetch` | One-shot fetch started. |
| `UNFETCH` | `MOQ.Catalog.Unfetch` | One-shot fetch session closed. |
| `SUBSCRIBE` | `MOQ.Catalog.Subscribe` | Live catalog subscription started. |
| `UNSUBSCRIBE` | `MOQ.Catalog.Unsubscribe` | Live catalog subscription stopped. |
| `CATALOG_RECEIVED` | `MOQ.Catalog.Received` | Parsed catalog payload delivered. |
| `CATALOG_PARSE_ERROR` | `MOQ.Catalog.Parse.Error` | Catalog payload parse failed. |
| `MESSAGE` | `MOQ.Catalog.Message` | Control message from relay. |
| `FAIL` | `MOQ.Catalog.Fail` | Session or request failure. |
| `CLOSE` | `MOQ.Catalog.Close` | Relay/session closed. |

### Source: `docs/api/_media/moq-publisher.md`

<h3 align="center">
  <img src="../assets/Red5_Truetime_black.png" alt="Red5 Pro Logo" height="65" />
</h3>
<p align="center">
  <a href="../README.md">Quick Start</a> &bull;
  <a href="#">MOQ Publishing</a> &bull;
  <a href="moq-subscriber.md">MOQ Subscribing</a> &bull;
  <a href="moq-catalog.md">MOQ Catalog</a> &bull;
  <a href="whip-client.md">WHIP/WHEP Docs</a>
</p>

---

# MOQPublisher

When you want to publish media over Media over QUIC (MoQ), the SDK provides `MOQPublisher`.

`MOQPublisher` captures media (`getUserMedia` by default, or your own stream), connects to a MOQ relay over WebTransport, publishes a namespace, and serves encoded tracks and catalog data to subscriber requests.

* [Usage](#usage)
* [Init Configuration](#init-configuration)
* [Events](#events)
* [Statistics](#statistics)

# Usage

There are two options to start a `MOQPublisher`:

1. Construct with a MOQ URL (auto init and publish).
2. Construct with no URL, then call `init()` and `publish()`.

## Using init() and publish()

```js
const { MOQPublisher, PublisherEventTypes, MOQPublisherEventTypes } = red5prosdk

const publisher = new MOQPublisher()
publisher.on('*', event => {
  console.log(event.type, event.data)
})

await publisher.init({
  endpoint: 'https://relay.example.com:4433',
  namespace: 'live/mystream',
  mediaElementId: 'red5pro-publisher',
  mediaConstraints: {
    audio: true,
    video: true
  }
})

await publisher.publish()
```

To stop publishing:

```js
await publisher.unpublish()
```

## Constructing with URL

Passing a URL to the constructor triggers internal init + publish automatically.

```js
const publisher = new MOQPublisher(
  'https://relay.example.com:4433/live/mystream',
  document.getElementById('red5pro-publisher'),
  {
    namespace: 'live/mystream'
  }
)
```

# Init Configuration

The `init()` call accepts `MOQPublisherConfigType`.

| Property | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `endpoint` | [-] | `undefined` | Full MOQ relay URL. If omitted, SDK uses `protocol://host:port`. |
| `host` | [x]* | `undefined` | Relay host when `endpoint` is omitted. |
| `streamName` | [x]* | `undefined` | Stream name used for namespace derivation and stats metadata. |
| `protocol` | [x] | `https` | Relay protocol (`ws`, `wss`, `http`, `https`). |
| `port` | [x] | `4433` | Relay port. |
| `app` | [x] | `live` | App scope used in namespace fallback. |
| `namespace` | [-] | `app/streamName` | MOQ namespace to publish. |
| `draftVersion` | [-] | auto | MoQ transport draft version. |
| `certKey` | [-] | `undefined` | Certificate hash input for WebTransport setup. |
| `keyFramerate` | [-] | `2000` | Keyframe interval in milliseconds. |
| `bandwidth` | [-] | `{ audio: 56, video: 750 }` | Target encode bandwidth settings. |
| `mediaConstraints` | [x] | camera+mic defaults | Constraints for SDK-managed `getUserMedia`. |
| `onGetUserMedia` | [-] | `undefined` | Optional override to provide your own media stream acquisition. |
| `videoEncoding` | [-] | `H264` | Video codec (`PublishVideoEncoder`). |
| `audioEncoding` | [-] | `OPUS` | Audio codec (`PublishAudioEncoder`). |
| `mediaElementId` | [-] | `red5pro-publisher` | Preview element id for local media display. |
| `clearMediaOnUnpublish` | [-] | `true` | Stop preview stream tracks on unpublish. |
| `stats` | [-] | `undefined` | Optional stats monitor configuration. |
| `connectionParams` | [-] | `undefined` | Additional params used for stats metadata and endpoint context. |
| `moqtLogLevel` | [-] | `none` | Log level passed to MOQ components. |

`*` Required when `endpoint` is not provided.

# Events

`MOQPublisher` is an event emitter. You can subscribe with wildcard (`*`) or by specific event name.

```js
const onPublisherEvent = event => {
  const { type, publisher, data } = event
  console.log(type, publisher, data)
}

publisher.on('*', onPublisherEvent)
// later
publisher.off('*', onPublisherEvent)
```

### Core publish lifecycle events (`PublisherEventTypes`)

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `PUBLISH_START` | `Publish.Start` | Publishing has started. |
| `PUBLISH_FAIL` | `Publish.Fail` | Publishing failed. |
| `UNPUBLISH_SUCCESS` | `Unpublish.Success` | Unpublish completed. |

### MOQ-specific events (`MOQPublisherEventTypes`)

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `CONSTRAINTS_ACCEPTED` | `MOQ.MediaConstraints.Accepted` | Media constraints accepted. |
| `CONSTRAINTS_REJECTED` | `MOQ.MediaConstraints.Rejected` | Media constraints rejected. |
| `MEDIA_STREAM_AVAILABLE` | `MOQ.MediaStream.Available` | Local `MediaStream` became available. |
| `NAMESPACE_PUBLISHED` | `MOQ.Namespace.Published` | Namespace announce/publish completed. |
| `RELAY_SUBSCRIBE` | `MOQ.Relay.Subscribe` | Relay requested a known track subscription. |
| `RELAY_SUBSCRIBE_FAILED` | `MOQ.Relay.Subscribe.Failed` | Relay requested unknown or rejected track. |
| `RELAY_MESSAGE` | `MOQ.Relay.Message` | Relay control message received. |
| `RELAY_ERROR` | `MOQ.Relay.Error` | Relay/session error reported. |
| `RELAY_CLOSE` | `MOQ.Relay.Close` | Relay/session closed. |
| `ENCODER_ERROR` | `MOQ.Encoder.Error` | Encoder or capture pipeline error. |
| `STATS_REPORT` | `MOQ.Stats.Report` | Stats report emitted when monitoring is enabled. |

# Statistics

`MOQPublisher` supports the same stats pattern as other SDK clients:

```js
publisher.monitorStats({
  interval: 5000
})
```

You can also provide `stats` directly in `init()` options to start monitoring automatically once publishing starts.

### Source: `docs/api/_media/moq-subscriber.md`

<h3 align="center">
  <img src="../assets/Red5_Truetime_black.png" alt="Red5 Pro Logo" height="65" />
</h3>
<p align="center">
  <a href="../README.md">Quick Start</a> &bull;
  <a href="moq-publisher.md">MOQ Publishing</a> &bull;
  <a href="#">MOQ Subscribing</a> &bull;
  <a href="moq-catalog.md">MOQ Catalog</a> &bull;
  <a href="whep-client.md">WHIP/WHEP Docs</a>
</p>

---

# MOQSubscriber

When you want to play MoQ media streams in the browser, the SDK provides `MOQSubscriber`.

`MOQSubscriber` connects to a MOQ relay, receives catalog updates, chooses an internal render path (LOC/WebCodecs or CMAF/MSE), and provides playback and track-selection APIs.

* [Usage](#usage)
* [Init Configuration](#init-configuration)
* [Events](#events)
* [Playback API](#playback-api)
* [Statistics](#statistics)

# Usage

There are two options to start a `MOQSubscriber`:

1. Construct with a MOQ URL (auto init and subscribe).
2. Construct with no URL, then call `init()` and `subscribe()`.

## Using init() and subscribe()

```js
const { MOQSubscriber, MOQSubscriberEventTypes } = red5prosdk

const subscriber = new MOQSubscriber()
subscriber.on('*', event => {
  console.log(event.type, event.data)
})

await subscriber.init({
  endpoint: 'https://relay.example.com:4433',
  namespace: 'live/mystream',
  mediaElementId: 'red5pro-subscriber',
  prefetchCatalog: false
})

await subscriber.subscribe()
```

To stop:

```js
await subscriber.unsubscribe()
```

## Constructing with URL

Passing a URL to the constructor triggers internal init + subscribe automatically.

```js
const subscriber = new MOQSubscriber(
  'https://relay.example.com:4433/live/mystream',
  document.getElementById('red5pro-subscriber'),
  { namespace: 'live/mystream' }
)
```

# Init Configuration

The `init()` call accepts `MOQSubscriberConfigType`.

| Property | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `endpoint` | [-] | `undefined` | Full MOQ relay URL. If omitted, SDK uses `protocol://host:port`. |
| `host` | [x]* | `undefined` | Relay host when `endpoint` is omitted. |
| `streamName` | [x]* | `undefined` | Stream name used for namespace derivation. |
| `namespace` | [-] | `app/streamName` | Namespace to subscribe from. |
| `protocol` | [x] | `https` | Relay protocol (`ws`, `wss`, `http`, `https`). |
| `port` | [x] | `4433` | Relay port. |
| `app` | [x] | `live` | App scope for namespace fallback. |
| `mediaElementId` | [-] | `red5pro-subscriber` | Target render element id. |
| `canvasElementId` | [-] | `undefined` | Optional canvas element id used by LOC rendering path. |
| `videoAudioElementId` | [-] | `undefined` | Optional media element id used by alternate paths. |
| `draftVersion` | [-] | auto | MoQ transport draft version. |
| `certKey` | [-] | `undefined` | Certificate hash input for WebTransport setup. |
| `lateFrameThreshold` | [-] | `100` | Late frame threshold in ms for playback adaptation. |
| `gapTimeout` | [-] | `500` | Gap timeout in ms for recovery behavior. |
| `preferSoftwareDecoder` | [-] | `false` | Prefer software decode over hardware where supported. |
| `muted` | [-] | `true` | Initial mute state. |
| `showControls` | [-] | `true` | Enable built-in controls (where applicable). |
| `initialVolume` | [-] | `1` | Initial playback volume (0..1). |
| `muteOnAutoplayRestriction` | [-] | `true` | Auto-mute fallback for browser autoplay restrictions. |
| `stats` | [-] | `undefined` | Optional stats monitor configuration. |
| `prefetchCatalog` | [-] | `false` | Attempt HTTP catalog prefetch before MOQ playback session starts. |
| `connectionParams` | [-] | `undefined` | Additional connection parameters passed through options. |
| `moqtLogLevel` | [-] | `none` | Log level passed to MOQ components. |

`*` Required when `endpoint` is not provided.

# Events

`MOQSubscriber` is an event emitter. You can subscribe with wildcard (`*`) or by specific event name.

```js
const onSubscriberEvent = event => {
  const { type, subscriber, data } = event
  console.log(type, subscriber, data)
}

subscriber.on('*', onSubscriberEvent)
// later
subscriber.off('*', onSubscriberEvent)
```

### Core subscriber lifecycle (`SubscriberEventTypes`)

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `CONNECT_SUCCESS` | `Connect.Success` | Session established. |
| `SUBSCRIBE_START` | `Subscribe.Start` | Playback started. |
| `SUBSCRIBE_STOP` | `Subscribe.Stop` | Playback stopped/unsubscribed. |
| `SUBSCRIBE_FAIL` | `Subscribe.Fail` | Subscribe failed. |
| `SUBSCRIBE_INVALID_NAME` | `Subscribe.InvalidName` | Invalid stream/namespace during prefetch or subscribe. |

### MOQ-specific events (`MOQSubscriberEventTypes`)

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `SESSION_CONNECTING` | `MOQ.Session.Connecting` | Session connect process started. |
| `SESSION_ESTABLISHED` | `MOQ.Session.Established` | Session connected. |
| `SESSION_ERROR` | `MOQ.Session.Error` | Session-level error. |
| `CATALOG_RECEIVED` | `MOQ.Catalog.Received` | Catalog received (prefetch or relay). |
| `CATALOG_UPDATED` | `MOQ.Catalog.Updated` | Catalog update observed. |
| `TRACK_SUBSCRIBE` | `MOQ.Track.Subscribe` | Track subscription succeeded. |
| `TRACK_SUBSCRIBE_FAILED` | `MOQ.Track.Subscribe.Failed` | Track subscription failed. |
| `TRACK_UNSUBSCRIBE` | `MOQ.Track.Unsubscribe` | Track unsubscribed. |
| `FIRST_FRAME` | `MOQ.FirstFrame` | First frame rendered. |
| `STATS_REPORT` | `MOQ.Stats.Report` | Stats report emitted when enabled. |
| `AUDIO_BLOCKED` | `MOQ.Audio.Blocked` | Browser blocked audio output pending user gesture. |
| `AUDIO_UNBLOCKED` | `MOQ.Audio.Unblocked` | Audio output resumed after user gesture. |

# Playback API

The subscriber provides playback controls and track switching helpers:

```js
await subscriber.play()
await subscriber.pause()
await subscriber.resume()
await subscriber.stop()
await subscriber.mute()
await subscriber.unmute()
await subscriber.setVolume(0.5)
await subscriber.resumeAudio() // call from user gesture if audio is blocked
await subscriber.selectVideoTrack('video')
```

You can access internals for advanced integrations:

```js
const options = subscriber.getOptions()
const player = subscriber.getPlayer()
const view = subscriber.getRendererView()
```

# Statistics

```js
subscriber.monitorStats({
  interval: 5000
})
```

You can also provide `stats` in `init()` options to start monitoring automatically after subscription starts.

### Source: `docs/api/_media/pubnub-client.md`

# PubNub Integration

Our goal at [Red5](https://red5.net) has always been to give developers the tools they need to deliver real-time streaming without complexity, bottlenecks, or hidden limitations. The Red5 integration with [PubNub](https://www.pubnub.com/) represents a major step toward that mission, combining sub-250 ms video streaming with sub-100 ms data delivery to power chat, reactions, synchronized metadata, and other interactive features at global scale.

The intent of this document is to describe the integration points within our HTML SDK in which you can take advantage of PubNub and its services.

> Read more about our thoughts and goals regarding PubNub Integration [here](https://www.red5.net/blog/red5-cloud-integrates-pubnub-to-deliver-interactivity-intelligence-global-scalability-for-real-time-streaming/).

# PubNubClient

The Red5 HTML SDK provides a basic `PubNubClient` to establish a connection to PubNub services for message communication. Its interface is very similar to that of the `WHIPClient` and `WHEPClient` provided in the SDK - both of which also provide easy init parameters and hooks for include PubNub intergation.

This document details the use of `PubNubClient` itself and may provide clearer details of the integration with the publisher and subscriber clients.

> To learn more about how to include PubNub integration for a `WHIPClient` and `WHEPClient`, please review [WHIPClient - PubNub](./whip-client.md#pubnub-integration) and [WHEPClient - PubNub](./whep-client.md#pubnub-integration), respectively.

* [Usage](#usage)
* [Init Configuration](#init-configuration)
* [Events](#events)

# Usage

A `PubNubClient` can be used singularly without taking advantage of the streaming capabilities of the `WHIPClient` and `WHEPClient` clients of the SDK.

```js
// import { PubNubClient } from red5pro-webrtc-sdk
// OR, if loaded from CDN
const { PubNubClient } = red5prosdk
...
const config = {
  publishKey: 'pub-c-XXXX',
  subscribeKey: 'sub-c-XXXX',
  userId: 'user-1234',
  channelId: 'red5',
  authToken: 'XXXX='
}
const pubnubClient = new PubNubClient()
pubnub.on('*', (event) => {
  const { type, data } = event
  console.log(`[PubNub]:: ${type}`, data)
})
await pubnub.init(pubnubConfig)
await pubnub.subscribe(channelId)
```

## Messaging API

The following methods relate to the Message API of the `PubNubClient` that integrates with the PubNub service.

### subscribe(channelId: string)

Request to subscribe to messages on the given channel. In most cases, this will be the same as the `channelId` provided in the `init()` configuration, as that is used to generate a valid token in the system.

### publishMessage(channelId: string, message: any)

Request to deliver a message on the target channel. In most cases, this will be the same as the `channelId` provided in the `init()` configuration, as that is used to generate a valid token in the system.

### unsubscribe(channelId: string)

Request to stop receiving messages on the given channel.

### destroy()

Request to shut down the PubNub client integration and any channel subscriptions.

> To respond to message-associated events, please visit the [Events](#events) section.

# Init Configuration

When using the `init()` call of a `PubNubClient`, the following initialization properties are available:

| Property | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `pubnub` | [x] | `window.PubNub` | Reference to the [PubNub](https://www.npmjs.com/package/pubnub) library to utilize. |
| `publishKey` | [x] | _None_ | The registered publish key from PubNub. This can be found in your [Red5 Cloud](https://cloud.red5.net) deployment. |
| `subscribeKey` | [x] | _None_ | The registered subscribe key from PubNub. This can be found in your [Red5 Cloud](https://cloud.red5.net) deployment. |
| `userId` | [x] | Auto-generated if not provided. | The associated User ID for PubNub. |
| `channelId` | [x] | `red5` | Default Channel ID to subscribe to in PubNub messaging. |
| `expiryMinutes` | [-] | `120` | Default expiration of issued token associated with client. |
| `authToken` | [-] | _None_ | Optional authentication token issues from PubNub - if known. |
| `cloudEndpoint` | [-] | _None_ | Optional endpoint of Red5 Cloud deployment to attempt access of `authToken` from PubNub system. |
| `backendUrl` | [-] | _None_ | Optional full URL of service endpoint to access `authToken` from PubNub system. [See documentation on deploying your own service.](https://www.red5.net/docs/red5-cloud/development/sdks/backend-sdk/) |
| `logLevel` | [-] | `trace` | The default log level of the PubNub client. |

## Authentication

The `PubNubClient` requires an authentication token to connect to the PubNub system for messaging. If a valid token is generated by a means outside of the SDK, you can define the token on the `authToken` attribute of the ini configuration.

If the `authToken` is not known prior to initialization, there are two ways that can be used through the SDK to access and utilize the token for connection:

### cloudEndpoint

If you have a [Red5 Cloud](https://cloud.red5.net) account and deployment, you can provide the `cloudEndpoint` attribute pointing to your deployment (e.g., `userid-1234-abcd.cloud.red5.net`). The SDK will attempt to generate the authentication token using a service that may be available from your deployment.

### backendUrl

If the `authToken` is not known or your [Red5 Cloud](https://cloud.red5.net) deployment does not provide an means for retrieving the authentication token, we have released open sourced Backend SDKs which can be used to provide your own custom service in generating a authentication token to be used.

To learn more about the Backend SDKs and authentication token generation, [please refer to the documentation](https://www.red5.net/docs/red5-cloud/development/sdks/backend-sdk/).


> This init configuration is also the same used when enabling PubNub integration for WHIP/WHEP Clients. View documentation related to [WHIPClient](./whip-client.md#pubnub-integration) and [WHEPClient](./whep-client.md#pubnub-integration).

# Events

The following events are dispatched by the `PubNubClient` and enumerated on the `PubNubEventTypes` object:

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `CONNECTED` | 'PubNub.Connected' | Dispatched when the PubNub client has successfully connected to the PubNub service. |
| `DISCONNECTED` | 'PubNub.Disconnected' | Dispatched when the PubNub client has disconnected from the PubNub service. |
| `SUBSCRIBE_SUCCESS` | 'PubNub.Subscribe.Success' | Dispatched when a channel subscription request has completed successfully. The `data` property contains details about the subscription. |
| `SUBSCRIBE_FAILURE` | 'PubNub.Subscribe.Failure' | Dispatched when a channel subscription request has failed. The `data` property contains error information. |
| `UNSUBSCRIBE_SUCCESS` | 'PubNub.Unsubscribe.Success' | Dispatched when a channel unsubscribe request has completed successfully. The `data` property contains details about the unsubscription. |
| `UNSUBSCRIBE_FAILURE` | 'PubNub.Unsubscribe.Failure' | Dispatched when a channel unsubscribe request has failed. The `data` property contains error information. |
| `MESSAGE_RECEIVED` | 'PubNub.Message.Received' | Dispatched when a message is received on a subscribed channel. The `data` property contains the message payload. |
| `MESSAGE_SEND_SUCCESS` | 'PubNub.Message.Send.Success' | Dispatched when a message has been successfully published to a channel. The `data` property contains confirmation details. |
| `MESSAGE_SEND_FAILURE` | 'PubNub.Message.Send.Failure' | Dispatched when a message publish request has failed. The `data` property contains error information. |
| `AUTH_TOKEN_GENERATED` | 'PubNub.AuthToken.Generated' | Dispatched when an authentication token has been successfully generated. The `data` property contains the token information. |
| `AUTH_TOKEN_GENERATION_ERROR` | 'PubNub.AuthToken.Generation.Error' | Dispatched when authentication token generation has failed. The `data` property contains error information. |
| `STATUS` | 'PubNub.Status' | Dispatched on general status notification. The `data` property contains the status. |
| `ERROR` | 'PubNub.Error' | Dispatched when a general error occurs in the PubNub client. The `data` property contains error details. |

### Source: `docs/api/_media/whep-client.md`

<h3 align="center">
  <img src="../assets/Red5_Truetime_black.png" alt="Red5 Pro Logo" height="65" />
</h3>
<p align="center">
  <a href="../README.md">Quick Start</a> &bull;
  <a href="whip-client.md">Publishing</a> &bull;
  <a href="#">Subscribing</a> &bull;
  <a href="message-channel.md">Message Channel</a> &bull;
  <a href="pubnub-client.md">PubNub Client</a>
</p>

---

# WHEPClient

When it comes time to subscribe to a live stream from your Red5 Server deployment, the SDK provides the WebRTC-based `WHEPClient`.

The `WHEPClient` - under the hood - is based on the [WebRTC-HTTP egress](https://www.ietf.org/archive/id/draft-ietf-wish-whep-03.html)(WHEP) protocol providing the ability to negotation and establish a connection using HTTP/S requests. This removes the requirement for a WebSocket, which historically has been used for the role of negotiation and connection.

This provides a standardized - and _blazingly fast_ - way to establish and playback a live stream using WebRTC.

* [Usage](#usage)
* [Init Configuration](#init-configuration)
* [Events](#events)
* [Statistics](#statistics)
* [Renegotiation Policy](#renegotiation-policy)
* [Live Seek](#live-seek)
* [Stream Manager 2.0](#stream-manager-20)
* [PubNub Integration](#pubnub-integration)

# Usage

There are two options to initiate a `WHEPClient`:

1. From instantiation with a full WHEP endpoint URL (if known).
2. From an `init()` call on this instance with an init configuration object.

> If using the second option (most widely used), the SDK will properly construct the endpoints required for negotiation and streaming.

## Providing a WHEP endpoint

If you want to allow the usual default configuration properties of a subscriber client (of which the `WHEPClient` is an extension), you can simply provide the **WHEP** endpoint and target media element to the constructor of `WHEPClient`:

```js
const whepEndpoint =
  'https://yourred5pro.com/live/whep/endpoint/stream1'

const additionalOptions = {...}

const subscriber = new WHEPClient(
  whepEndpoint,
  document.querySelector('#red5pro-subscriber'),
  additionalOptions
)
subscriber.on('*', (event) => console.log(event))
```

When providing the endpoint, the _optional_ target media element and the _optional_ additional init configuration properties in the constructor for `WHEPClient`, the SDK will automatically start the connection calls and continue on to playback once available.

The construction of the **WHEP** endpoint URL is the following when integrating with a standalone deployment of the Red5 Server:

```sh
https://<your server deployment FQDN>/<app scope>/whep/endpoint/<stream name>
```

When integrating with a Red5 Cloud deployment (using autoscaling and the Stream Manager), the **WHEP** endpoint will have the following structure:

```sh
https://<your cloud deployment FQDN>/as/v1/proxy/whep/<app scope>/<stream name>
```

Where:

- `your deployment FQDN` - the host endpoint of your deployment.
- `app scope` - the target webapp scope to stream to. Typically `live`.
- `stream name` - the name of the stream to subscribe to.

> It is important to note that in using the **WHEP** endpoint as such, the `WHEPClient` will attempt its own playback - you do not have to make an additional `subscribe()` call.

## Using Init with a Configuration

If not using the first option of providing a **WHEP** endpoint in the constructor, you would simply instantiate the `WHEPClient` and use the `init()` and `subscribe()` calls to establish a connection and playback:

```js
try {
    const subscriber = new WHEPClient()
    subscriber.on('*', , (event) => console.log(event))

    // See next section: Init Configuration, for more details.
    await subscriber.init(configuration)
    await subscriber.subscribe()
} catch (error) {
    // Something went wrong...
}
```

> Note: If integrating with Red5 Cloud deployment with Stream Manager, you will need to provide an `endpoint` init configuration property. More details in next section of this document.

# Init Configuration

When using the `init()` call of a `WHEPClient` - or, alternatively, when using a **WHEP** endpoint with additional options in the constructor - the following initialization properties are available:

| Property | Required | Default | Description |
| :--- | :---: | :--- | :--- |
| `host` | [x] | *None* | The IP or address that the WebSocket server resides on. |
| `streamName` | [x] | *None* | The name of the stream to subscribe to. |
| `protocol` | [x] | `https` | The protocol of the host for the signaling communication. |
| `port` | [x] | `443` | The port on the host that the Red5 server listens on; `5080` or `443` (insecure or secure, respectively). |
| `app` | [x] | `live` | The webapp context name that the stream is on. |
| `endpoint` | [-] | `undefined` | The full URL of the endpoint to stream to. **This is primarily used in Stream Manager 2.0 integration for clients.**
| `mediaElementId` | [-] | `red5pro-subscriber` | The target `video` or `audio` element `id` attribute which will display the stream. |
| `rtcConfiguration` | [-] | _Basic_ | The `RTCConfiguration` to use in setting up `RTCPeerConnection`. [RTCConfiguration](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary)|
| `includeDataChannel` | [-] | `true` | Flag to open a datachannel for messaging between server and client once connection is established.
| `dataChannelConfiguration` | [-] | `{name: "red5pro"}` | An object used in configuring a n `RTCDataChannel`. _Only used when `includeDataChannel` is defined as `true`_ |
| `iceTransport` | [-] | `UDP` | The transport type to use in ICE negotiation. Either `UDP` or `TCP` |
| `subscriptionId` | [x] | auto-generated | A unique string representing the requesting client. |
| `connectionParams` | [-] | `undefined` | An object of additional connection parameters to send to the server upon connection request. |
| `videoEncoding` | [-] | *None* | Specifies target video encoder. |
| `audioEncoding` | [-] | *None* | Specifies target audio encoder. |
| `muteOnAutoplayRestriction` | [-] | `true` | Flag to attempt to mute the `video` element when `autoplay` is restricted in the browser. [See section on Autoplay Restrictions](../articles/autoplay/autoplay_policy.md) |
| `buffer` | [-] | `0` | Request to set a buffer - in seconds - for playback.
| `maintainStreamVariant` | [-] | `false` | Flag to instruct the server - when utilizing transcoding - to not switch subscriber stream variants when network conditions change. By setting this to `true`, when you request to playback a stream that is transcoded, the server will not deliver a variant of higher or lower quality dependending on current network conditions. |
| `stats` | [-] | *None* | Configuration object to enable stats reporting. See [Stats Reporting](#statistics) for more information. |
| `liveSeek` | [-] | *None* | Configuration object to enable live seek capability. See [Live Seek](#live-seek) for more information. |
| `renegotiationPolicy` | [-] | *None* | Configuration object for renegotiation of ICE. See [Renegotiation Policy](#renegotiation-policy) for more information. |
| `pubnub` | [-] | *None* | Configuration object for PubNub integration. See [PubNub Integration](#pubnub-integration) for more information. |

# Events

The `WHEPClient` included in the SDK is an event emitter that provides a basic API to subscribe and unsubscribe to events either by name or by wildcard.

To subscribe to all events from a subscriber:

```js
const handleSubscriberEvent = (event) => {
  // The name of the event:
  const { type } = event
  // The dispatching subscriber instance:
  const { subscriber } = event
  // Optional data releated to the event (not available on all events):
  const { data } = event
}

const subscriber = new WHEPClient()
subscriber.on('*', handleSubscriberEvent)
```

> The `*` type assignment is considered a "Wildcard" subscription - all events being issued by the subscriber instance will invoke the assign event handler.

To unsubscribe to all events from a subscriber after assinging an event handler:

```js
subscriber.off('*', handleSubscriberEvent)
```

The following sections of this document describe the event types that can also be listened to directly, instead of using the `*` wildcard.

You can also listen to events individually. The following describe the various events that can be listened for on the `WHEPClient` and enumerated on the `SubscriberEventTypes` object:

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `CONNECT_SUCCESS` | 'Connect.Success' | When the subscriber has established a required remote connection, such as to a WebSocket server. |
| `CONNECT_FAILURE` | 'Connect.Failure' | When the subscriber has failed to establish a required remote connection for consuming a stream. |
| `RECONNECT_START` | 'Reconnect.Start' | Signal when attempt on reconnect has begun. This is used in conjunction with the `renegotiationPolicy` of the `init()` configuration. |
| `RECONNECT_FAILURE` | 'Reconnect.Failure' | Signal when attempt on reconnect has failed. |
| `SUBSCRIBE_START` | 'Subscribe.Start' | When the subscriber has started a subscribing to a stream. |
| `SUBSCRIBE_STOP` | 'Subscribe.Stop' | When the subscriber has successfully closed an active subscription to a stream. |
| `SUBSCRIBE_METADATA` | 'Subscribe.Metadata' | When metadata is received on the client from the server. |
| `VIDEO_DIMENSIONS_CHANGE` | 'Subscribe.VideoDimensions.Change' | Invoked when `video` element has loaded metadata and the incoming stream dimensions are available. |
| `ORIENTATION_CHANGE` | 'Subscribe.Orientation.Change' | Invoked when an orientation change is detected in metadata. Mobile (iOS and Android) broadcasts are sent with an orientation. |
| `STREAMING_MODE_CHANGE` | 'Subscribe.StreamingMode.Change' | Invoked when the broadcast has "muted" either or both their video and audio tracks. |
| `VOLUME_CHANGE` | 'Subscribe.Volume.Change' | Invoked when a change to volume is detected during playback. _From 0 to 1._ |
| `PLAYBACK_TIME_UPDATE` | 'Subscribe.Time.Update' | Invoked when a change in playhead time is detected during playback. _In seconds._ |
| `PLAYBACK_STATE_CHANGE` | 'Subscribe.Playback.Change' | Invoked when a change in playback state has occured, such as when going from a `Playback.PAUSED` state to `Playback.PLAYING` state. |
| `FULL_SCREEN_STATE_CHANGE` | 'Subscribe.FullScreen.Change' | Invoked when a change in fullscreen state occurs during playback. |
| `AUTO_PLAYBACK_FAILURE` | 'Subscribe.Autoplay.Failure' | Invoked when an attempt to `autoplay` on a media element throws a browser exception; typically due to browser security restrictions and their autoplay policies. (WebRTC and HLS, only) [See section on Autoplay Restrictions](../articles/autoplay/autoplay_policy.md) |
| `AUTO_PLAYBACK_MUTED` | 'Subscribe.Autoplay.Muted' | Invoked when an attempt to `autoplay` on a media element throws a browser exception and is muted based on the `muteOnAutoplayRestriction` config property; typically due to browser security restrictions and their autoplay policies. (WebRTC and HLS, only) [See section on Autoplay Restrictions](../articles/autoplay/autoplay_policy.md) |

In addition to the above events, the following events are also dispatched from a `WHEPClient` and are defined on the `RTCSubscriberEventTypes` enum:

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `PEER_CONNECTION_AVAILABLE` | 'WebRTC.PeerConnection.Available' | When the negotation process has produced a valid `PeerConnection`. |
| `OFFER_START` | 'WebRTC.Offer.Start' | When the subscriber requests to start an offer on the `PeerConnection`. |
| `OFFER_END` | 'WebRTC.Offer.End' | When the subscriber has received a `SessionDescription` from a requested offer over the `PeerConnection`. |
| `ANSWER_START` | 'WebRTC.Answer.Start' | When the subscriber requests to send an answer on the `PeerConnection`. |
| `ANSWER_END` | 'WebRTC.Answer.End' | When the subscriber has received an answer (in form of a `MediaStream`) over the `PeerConnection`. |
| `CANDIDATE_CREATE` | 'WebRTC.Candidate.Create' | When the subscriber requests to send a candidate on the `PeerConnection`. |
| `CANDIDATE_RECEIVE` | 'WebRTC.Candidate.Receive' | When the subscriber has received a candidate over the `PeerConnection`. |
| `ICE_TRICKLE_COMPLETE` | 'WebRTC.IceTrickle.Complete' | When the negotaiton process (a.k.a. trickle) has completed and the subscriber will attempt at consuming a stream. |
| `ON_ADD_STREAM` | 'WebRTC.Add.Stream' | When a `MediaStream` object has become available for playback. |
| `TRACK_ADDED` | 'WebRTC.PeerConnection.OnTrack' | When a MediaTrack has become available on the underlying `RTCPeerConnection`. |
| `DATA_CHANNEL_AVAILABLE` | 'WebRTC.DataChannel.Available' |  the underlying `RTCDataChannel` is available when `includeDataChannel` configuration is used. |
| `DATA_CHANNEL_OPEN` | 'WebRTC.DataChannel.Open' | When the underlying `RTCDataChannel` is opened when `signalingServerOnly` configuration is used.
| `DATA_CHANNEL_CLOSE` | 'WebRTC.DataChannel.Close' | When the underlying `RTCDataChannel` is closed when `includeDataChannel` configuration is used. |
| `DATA_CHANNEL_ERROR` | 'WebRTC.DataChannel.Error' | When an error has occurred within the underlying `RTCDataChannel` when `includeDataChannel` configuration is used. |
| `DATA_CHANNEL_MESSAGE` | 'WebRTC.DataChannel.Message' | When a message has been delivered over the underlying `RTCDataChannel` when `includeDataChannel` configuration is used. |
| `HOST_ENDPOINT_CHANGED` | 'WebRTC.Endpoint.Changed' | Notification when the endpoint on which to signal and stream from has been asigned. |
| `SUBSCRIBE_STREAM_SWITCH` | 'WebRTC.Subscribe.StreamSwitch' | Notification when request to switch stream on the connection is completed. |
| `STATS_REPORT` | 'WebRTC.Stats.Report' | Notification of a statistics report generated from the stream connection. _Statistics are only reported based on the availability of `stats` on the init configuration or after calling [monitorStats](#statistics)._
| `LIVE_SEEK_UNSUPPORTED` | 'WebRTC.LiveSeek.Unsupported' | When `liveSeek` is specified but the browser does not support th integration of HLS.JS for Live VOD playback. |
| `LIVE_SEEK_ENABLED` | 'WebRTC.LiveSeek.Enabled' | When `liveSeek` is used to playback Live VOD and the HLS video has been loaded and available to seek. |
| `LIVE_SEEK_DISABLED` | 'WebRTC.LiveSeek.Disabled' | When `liveSeek` is used to playback Live VOD and HLS video has not been loaded nor available to seek. |
| `LIVE_SEEK_ERROR` | 'WebRTC.LiveSeek.Error' | When `liveSeek` is used to playback Live VOD and HLS video and an error in playback has occurred. Inspect the `error` attribute on the event for more details. |
| `LIVE_SEEK_LOADING` | 'WebRTC.LiveSeek.FragmentLoading' | When `liveSeek` is used to playback Live VOD and HLS video in currently loading a fragment during seeking. |
| `LIVE_SEEK_LOADED` | 'WebRTC.LiveSeek.FragmentLoaded' | When `liveSeek` is used to playback Live VOD and HLS video has completed loading a fragment during seeking. |
| `LIVE_SEEK_CHANGE` | 'WebRTC.LiveSeek.Change' | When `liveSeek` is used, this event notifies on a change of state going from "live" to "vod" and vice versa. |

Additionally, the following events are related to ICE connection monitoring when integrating with Statistics:
| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `CONNECTION_HEALTH_STALE_STATS` | 'WebRTC.Connection.StaleStats' | When monitored statistics for ice connection do not seem to be changing through intervals. |
| `CONNECTION_HEALTH_STATE_REGRESSION` | 'WebRTC.Connection.StateRegression' | When monitored statistics for ice connection and the status reverts from previously being `success`. |
| `CONNECTION_HEALTH_EXCESSIVE_RTT` | 'WebRTC.Connection.ExcessiveRTT' | When monitored statistics for ice connection and the Round-Trip-Time being report does not change or rises between intervals. |
| `CONNECTION_HEALTH_ICE_TIMEOUT` | 'WebRTC.Connection.IceTimeout' | When monitored statistics for ice connection and the timeout of ICE Connection has been reached. Can be defined in the `renegotiationPolicy` attribute of the `init()` configuration. |

# Statistics

With the `15.0.0` release of the SDK, we introduced statistics monitoring for `WHEPClient` to support the ability to monitor and POST statistics report data based on the underlying `RTCPeerConnection` of the client.

## Stats Configuration

The configuration used for statistics monitoring has the following structure:

```js
{
  // Optional.
  // If provided, it will POST stats to this endpoint.
  // If undefined or `data-channel`, it will post stats to message transport.
  // If null or `event-transport`, it will only emit status events.
  endpoint: red5prosdk.StatsEndpointType.DATA_CHANNEL,
  additionalHeaders: undefined,
  interval: 5000, // Interval to poll stats, in milliseconds.
  include: [], // Empty array allows SDK to be judicious about what stats to include.
}
```

### endpoint

* If the `endpoint` is defined with a URL, the SDK will attempt to make `POST` requests with a JSON body representing each individual report.
* If the `endpoint` is set to `data-channel` or `undefined`, the SDK will post metadata with type `stats-report` on the underlying message transport (DataChannel) if available.
* If the `endpoint` is set to `event-transport` or `null`, the SDK will only emit events with the metadata on the `WebRTC.StatsReport` event.

### additionalHeaders

By default, if an `endpoint` is defined, the `POST` request body will be in JSON and have the `{ 'Content-Type': 'application/json' }` header set. If requirements - such as authentication - are required, a map of additional headers can be provided to be sent along with the request.

### interval

The polling interval (in milliseconds) to access the `RTCStatsReport` from the underlying `RTCPeerConnection` of the subscriber client.

### include

An array of static type strings. These directly map to the listing of type available for `RTCStatsReport` objects. If left empty or undefined, the SDK will report the statistics it deems suitable for tracking proper broadcast conditions.

e.g.,

```js
include: ['inbound-rtp', 'transport']
```

> More information about the statistic types are available at [https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport#the_statistic_types](https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport#the_statistic_types)

## Invocation

To start statistics monitoring, you have a couple of options:

* You can provide a `stats` attribute with the [stats configuration object](#stats-configuration) to the [init configuration](#webrtc-configuration-parameters).
* You can call `monitorStats` on the subscriber client with the optional [stats configuration object](#stats-configuration) parameter.

> Additionally, you can stop monitoring by calling `unmonitorStats` on the subscriber client.

## Additional Information

Attached to the metadata that is reported are additional properties that pertain to the subscriber client.

As well, Along with the metadata releated to the `RTCStatsReport` objects emitted by the underlying `RTCPeerConnection`, the statistics monitoring also sends out a few event and action metadata related to the operation of a subscriber client.

> See the following section for examples.

## Example of Statistics Metadata

The following is an example of a statistics metadata that is emitted in a `WebRTC.StatsReport` event and POSTed to any defined optional endpoint:

```json
{
  "name": "RTCSubscriberStats",
  "created": 1727789134165,
  "device": {
    "browser": "chrome",
    "version": 129,
    "appVersion": "5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
    "platform": "MacIntel",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
    "vendor": "Google Inc."
  },
  "client": {
    "enabled": true,
    "endpoint": null,
    "host": "myred5.deploy",
    "app": "live",
    "streamName": "stream1",
    "subscriptionId": "subscriber-922e"
  },
  "type": "stats-report",
  "timestamp": 1727789139169,
  "data": {
    "type": "inbound-rtp",
    "kind": "video",
    "codecId": "CIT01_102_level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f",
    "jitter": 0.005,
    "packetsLost": 0,
    "packetsReceived": 439,
    "bytesReceived": 412627,
    "firCount": 0,
    "frameWidth": 640,
    "frameHeight": 480,
    "framesDecoded": 143,
    "framesDropped": 0,
    "framesPerSecond": 30,
    "framesReceived": 143,
    "freezeCount": 0,
    "keyFramesDecoded": 3,
    "nackCount": 0,
    "pauseCount": 0,
    "pliCount": 0,
    "totalFreezesDuration": 0,
    "totalPausesDuration": 0,
    "estimatedBitrate": 660
  }
}
```

# Renegotiation Policy

The `renegotiationPolicy` attribute of the `init()` configuration object is used during monitoring - in conjunction with (Statistics)(#statistics), to determine the health lifecycle of the ICE negotiation process and act accodingly.

The policy has the following type structure:

```typescript
type RenegotiationPolicyType = {
  type: 'regression' | 'timeout' | 'disconnect' | 'excessive-rtt'
  iceTimeoutInterval: number
}
```

The following `type` values are:

| Name | Meaning |
| :--- | :--- |
| `regression` | When the ICE status has changed from a previously designated `success`. This will not always occur during ICE negotiation failures. |
| `timeout` | When it has been determined (in conjunction with the `iceTimeoutInterval`), that too much time has elapsed since the start of the negotiation process in order for it to conclude successfully. |
| `disconnect` | When the peer connection has decided to disconnect after a failure of ICE negotiation. |
| `excessive-rtt` | Then the round-trip time determined through statistics is considered excessive (anything over `600ms` is considered severe.)

Typically, these will be executed in the order defined in the table above, however it should be noted that sometimes a `regression` may not occur in poor connection scenarios. If the process were to fail, both `timeout` and `disconnect` will occur.

The `iceTimeoutInterval` value will be used in conjunction with the `timeout` policy type to take reconnect action. _The default is 5 seconds._

> By default, the `renegotiationPolicy` is not set and will not take action unless defined in the `init()` configuration.

# Live Seek

Included in the SDK is the ability to subscribe to a live stream and provide capabilities to seek and playback to previous segments of the stream.

This capability is not inherent in browsers nor the live `MediaStream`. As such, this feature of "live seek" requires [HLS.JS](https://github.com/video-dev/hls.js/) as a dependency in order to load and playback historical HLS segments stored on the server or in cloud storage.

> This feature also requires some server-side configurations in order to capture and server HLS: [https://www.red5.net/docs/red5-pro/users-guide/dvr/](https://www.red5.net/docs/red5-pro/users-guide/dvr/)

## LiveSeekClient

To enable live seek capabilities for a live stream on the client-side, the SDK provides a `LiveSeekClient`. It is an extension of the `WHEPClient`, providing its familiar API and additional logic to be able to playback historical segments of a live stream by using playback controls and events.

This example demonstrates using the `LiveSeekClient` with its default configuration attributes:

```js
try {
    const subscriber = new LiveSeekClient()
    // Events related to live seek start with type: `WebRTC.LiveSeek`
    subscriber.on('*', , (event) => console.log(event))

    await subscriber.init({
      ...configuration,
      liveSeek: {
        baseURL: undefined, // Base endpoint URL to locate the associated m3u8 manifest. Undefined, will look for files on the `host`
        fullURL: undefined, // Full endpoint URL to locate the assocated m3u8 manifest. Undefined, will look for files on the `host`
        hlsjsRef: undefined, // Explicit reference to HLS.JS dependency. Undefined, the SDK will look for window.HLS
        hlsElement: undefined, // Explicit reference to the target video element to load the HLS stream. Undefined, the SDK will autogenerate one
        usePlaybackControlsUI: true, // Flag to use custom player controls from the SDK for scrubbing. False requires that you provide your own controls and interactive with the Playback API
        options: { debug: false, backBufferLength: 0 } // Options to provide to HLS.JS instance directly
      }
    })
    await subscriber.subscribe()
} catch (error) {
    // Something went wrong...
}
```

## LiveSeek Configuration

The `liveSeek` configuration object has the following signature:

```js
  baseURL: <string | undefinde>,
  fullURL: <string | undefined>,
  hlsjsRef: <hls.js reference | undefined>,
  hlsElement: <HTMLVideoElement | undefined>,
  usePlaybackControlsUI: <boolean>,
  options: <object | undefined>
```

### baseURL

- Base endpoint URL to locate the associated m3u8 manifest. If `undefined`, will look for files on the `host`.
- Default: `undefined`
- Example: `https://myserver.cloud/streams`

### fullURL

- Full endpoint URL to locate the assocated `m3u8` manifest. If `undefined`, will look for files on the `host`.
- Default: `undefined`
- Example: `https://mycdn.cloud/streams/mystream.m3u8`

### hlsjsRef

- Explicit reference to HLS.JS dependency. If `undefined`, the SDK will look for `window.HLS`.
- Default: `undefined`

### hlsElement

- Explicit reference to the target `video` element to load the HLS stream. If `undefined`, the SDK will autogenerate one.
- Default: `undefined`

### usePlaybackControlsUI

- Flag to use custom player controls UI from the SDK for scrubbing.
- Setting to `false` requires that you provide your own controls and interactive with the Playback API.
- Default: `true`

### options

- Options to provide to HLS.JS instance directly. _Please refer to [their documentation](https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning)_.
- Example: `{ debug: false, backBufferLength: 0 }`

# Stream Manager 2.0

> This section provides information that relate to the release of Stream Manager 2.0 and its integration with WHIP/WHEP clients.

The Stream Manager 2.0 simplifies the proxying of web clients to Origin and Edge nodes. As such, an initialization configuration property called `endpoint` was added to the WebRTC SDK. This `endpoint` value should be the full URL path to the proxy endpoint on the Stream Manager as is used as such:

## WHIP Proxy

```javascript
const host = 'my-deployment'
const streamName = 'mystream'
const nodeGroup = 'my-node-group'
const endpoint = `https://${host}/as/v1/proxy/whip/live/${streamName}`
const config = {
  endpoint,
  streamName,
  connectionParams: {
    nodeGroup
  },
  // additional configurations
}
const publisher = await new WHIPClient().init(config)
publisher.on('*', (event) => console.log(event))
await publisher.publish()
```

## WHEP Proxy

```javascript
const host = 'my-deployment'
const streamName = 'mystream'
const nodeGroup = 'my-node-group'
const endpoint = `https://${host}/as/v1/proxy/whep/live/${streamName}`
const config = {
  endpoint,
  streamName,
  connectionParams: {
    nodeGroup
  },
  // additional configurations
}
const subscriber = await new WHEPClient().init(config)
subscriber.on('*', (event) => console.log(event))
await subscriber.subscribe()
```

There are a few things to note here:

* The difference of `/whip` and `/whep` in the URI for the endpoint calls between `WHIPClient` and `WHEPClient`, respecively.
* The requirement of a `nodeGroup` connection parameter that is the target nodegroup within your Stream Manager deployment on which you want to proxy the WHIP/WHEP client(s).

# PubNub Integration

While the SDK provides a way to [utilize PubNub integration](./pubnub-client.md) outside of its media streaming capabilities, when utilizing the `WHEPClient` for broadcasting, the SDK also affords the ability to integrate PubNub messaging for your application.

> For more information about the standalone `PubNubClient` that can be used outside of `WHEPClient`, please visit the [PubNubClient Documentation](./pubnub-client.md).

## pubnub - Initialization Attribute

Exposed on the [init configuration](#init-configuration) is the `pubnub` attribute. The following `pubnub` object configuration attributes are supported:

| Property | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `pubnub` | [x] | `window.PubNub` | Reference to the [PubNub](https://www.npmjs.com/package/pubnub) library to utilize. |
| `publishKey` | [x] | _None_ | The registered publish key from PubNub. This can be found in your [Red5 Cloud](https://cloud.red5.net) deployment. |
| `subscribeKey` | [x] | _None_ | The registered subscribe key from PubNub. This can be found in your [Red5 Cloud](https://cloud.red5.net) deployment. |
| `userId` | [x] | Auto-generated if not provided. | The associated User ID for PubNub. |
| `channelId` | [x] | `red5` | Default Channel ID to subscribe to in PubNub messaging. |
| `expiryMinutes` | [-] | `120` | Default expiration of issued token associated with client. |
| `authToken` | [-] | _None_ | Optional authentication token issues from PubNub - if known. |
| `cloudEndpoint` | [-] | _None_ | Optional endpoint of Red5 Cloud deployment to attempt access of `authToken` from PubNub system. |
| `backendUrl` | [-] | _None_ | Optional full URL of service endpoint to access `authToken` from PubNub system. [See documentation on deploying your own service.](https://www.red5.net/docs/red5-cloud/development/sdks/backend-sdk/) |
| `logLevel` | [-] | `trace` | The default log level of the PubNub client. |

## Authentication

The `PubNubClient` requires an authentication token to connect to the PubNub system for messaging. If a valid token is generated by a means outside of the SDK, you can define the token on the `authToken` attribute of the ini configuration.

If the `authToken` is not known prior to initialization, there are two ways that can be used through the SDK to access and utilize the token for connection:

### cloudEndpoint

If you have a [Red5 Cloud](https://cloud.red5.net) account and deployment, you can provide the `cloudEndpoint` attribute pointing to your deployment (e.g., `userid-1234-abcd.cloud.red5.net`). The SDK will attempt to generate the authentication token using a service that may be available from your deployment.

### backendUrl

If the `authToken` is not known or your [Red5 Cloud](https://cloud.red5.net) deployment does not provide an means for retrieving the authentication token, we have released open sourced Backend SDKs which can be used to provide your own custom service in generating a authentication token to be used.

To learn more about the Backend SDKs and authentication token generation, [please refer to the documentation](https://www.red5.net/docs/red5-cloud/development/sdks/backend-sdk/).

## PubNub Message API

Once PubNub authentication and connection has been established through initialization, the following API can be used to as it relates to sending and receiving messages:

### subscribePubNub(channelId: string, options: any | undefined)

Request to subscribe to target channel with optional `options`.

### sendPubNub(channelId: string, message: any)

Request to publish a message on the target channel.

> Any `PubNub` client connected and subscribed to channels will be cleaned up upon call to `unsubscribe` of the `WHEPClient`.

## PubNub Events

# Events

The following events are dispatched by the underlying pubnub integration and bubbled out through the `WHEPClient` and enumerated on the `PubNubEventTypes` object:

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `CONNECTED` | 'PubNub.Connected' | Dispatched when the PubNub client has successfully connected to the PubNub service. |
| `DISCONNECTED` | 'PubNub.Disconnected' | Dispatched when the PubNub client has disconnected from the PubNub service. |
| `SUBSCRIBE_SUCCESS` | 'PubNub.Subscribe.Success' | Dispatched when a channel subscription request has completed successfully. The `data` property contains details about the subscription. |
| `SUBSCRIBE_FAILURE` | 'PubNub.Subscribe.Failure' | Dispatched when a channel subscription request has failed. The `data` property contains error information. |
| `UNSUBSCRIBE_SUCCESS` | 'PubNub.Unsubscribe.Success' | Dispatched when a channel unsubscribe request has completed successfully. The `data` property contains details about the unsubscription. |
| `UNSUBSCRIBE_FAILURE` | 'PubNub.Unsubscribe.Failure' | Dispatched when a channel unsubscribe request has failed. The `data` property contains error information. |
| `MESSAGE_RECEIVED` | 'PubNub.Message.Received' | Dispatched when a message is received on a subscribed channel. The `data` property contains the message payload. |
| `MESSAGE_SEND_SUCCESS` | 'PubNub.Message.Send.Success' | Dispatched when a message has been successfully published to a channel. The `data` property contains confirmation details. |
| `MESSAGE_SEND_FAILURE` | 'PubNub.Message.Send.Failure' | Dispatched when a message publish request has failed. The `data` property contains error information. |
| `AUTH_TOKEN_GENERATED` | 'PubNub.AuthToken.Generated' | Dispatched when an authentication token has been successfully generated. The `data` property contains the token information. |
| `AUTH_TOKEN_GENERATION_ERROR` | 'PubNub.AuthToken.Generation.Error' | Dispatched when authentication token generation has failed. The `data` property contains error information. |
| `STATUS` | 'PubNub.Status' | Dispatched on general status notification. The `data` property contains the status. |
| `ERROR` | 'PubNub.Error' | Dispatched when a general error occurs in the PubNub client. The `data` property contains error details. |

### Source: `docs/api/_media/whip-client.md`

<h3 align="center">
  <img src="../assets/Red5_Truetime_black.png" alt="Red5 Pro Logo" height="65" />
</h3>
<p align="center">
  <a href="../README.md">Quick Start</a> &bull;
  <a href="#">Publishing</a> &bull;
  <a href="whep-client.md">Subscribing</a> &bull;
  <a href="message-channel.md">Message Channel</a> &bull;
  <a href="pubnub-client.md">PubNub Client</a>
</p>

---

# WHIPClient

When it comes time to broadcast a live stream from your Red5 Server deployment, the SDK provides the WebRTC-based `WHIPClient`.

The `WHIPClient` - under the hood - is based on the [WebRTC-HTTP ingestion](https://www.ietf.org/archive/id/draft-ietf-wish-whip-01.html)(WHIP) protocol providing the ability to negotation and establish a connection using HTTP/S requests. This removes the requirement for a WebSocket, which historically has been used for the role of negotiation and connection.

This provides a standardized - and _blazingly fast_ - way to establish and broadcast a live stream using WebRTC.

* [Usage](#usage)
* [Init Configuration](#init-configuration)
* [Events](#events)
* [Reconnect](#reconnect)
* [Statistics](#statistics)
* [Stream Manager 2.0](#stream-manager-20)
* [PubNub Integration](#pubnub-integration)

# Usage

There are two options to initiate a `WHIPClient`:

1. From instantiation with a full WHIP endpoint URL (if known).
2. From an `init()` call on this instance with an init configuration object.

> If using the second option (most widely used), the SDK will properly construct the endpoints required for negotiation and streaming.

## Providing a WHIP endpoint

If you want to allow the usual default configuration properties of a publisher client (of which the `WHIPClient` is an extension), you can simply provide the **WHIP** endpoint and target media element to the constructor of `WHIPClient`:

```js
const whipEndpoint =
  'https://yourred5pro.com/live/whip/endpoint/stream1'

const additionalOptions = {...}

const publisher = new WHIPClient(
  whipEndpoint,
  document.querySelector('#red5pro-publisher'),
  additionalOptions
)
publisher.on('*', (event) => console.log(event))
```

When providing the endpoint, the _optional_ target media element and the _optional_ additional init configuration properties in the constructor for `WHIPClient`, the SDK will automatically start the connection calls and continue on to broadcast once available.

The construction of the **WHIP** endpoint URL is the following when integrating with a standalone deployment of the Red5 Server:

```sh
https://<your server deployment FQDN>/<app scope>/whip/endpoint/<stream name>
```

When integrating with a Red5 Cloud deployment (using autoscaling and the Stream Manager), the **WHIP** endpoint will have the following structure:

```sh
https://<your cloud deployment FQDN>/as/v1/proxy/whip/<app scope>/<stream name>
```

Where:

- `your deployment FQDN` - the host endpoint of your deployment.
- `app scope` - the target webapp scope to stream to. Typically `live`.
- `stream name` - the name of the stream to subscribe to.

> It is important to note that in using the **WHIP** endpoint as such, the `WHIPClient` will attempt its own broadcast - you do not have to make an additional `publish()` call.

## Using Init with a Configuration

If not using the first option of providing a **WHIP** endpoint in the constructor, you would simply instantiate the `WHIPClient` and use the `init()` and `publish()` calls to establish a connection and broadcast:

```js
try {
    const publisher = new WHIPClient()
    publisher.on('*', , (event) => console.log(event))

    // See next section: Init Configuration, for more details.
    await publisher.init(configuration)
    await publisher.publish()
} catch (error) {
    // Something went wrong...
}
```

> Note: If integrating with Red5 Cloud deployment with Stream Manager, you will need to provide an `endpoint` init configuration property. More details in next section of this document.

# Init Configuration

When using the `init()` call of a `WHIPClient` - or, alternatively, when using a **WHIP** endpoint with additional options in the constructor - the following initialization properties are available:

| Property | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `host` | [x] | *None* | The IP or address that the WebSocket server resides on. |
| `streamName` | [x] | *None* | The name of the stream to subscribe to. |
| `protocol` | [x] | `https` | The protocol of the host for the signaling communication. |
| `port` | [x] | `443` | The port on the host that the Red5 server listens on; `5080` or `443` (insecure or secure, respectively). |
| `app` | [x] | `live` | The webapp context name that the stream is on. |
| `endpoint` | [-] | `undefined` | The full URL of the endpoint to stream to. **This is primarily used in Stream Manager 2.0 integration for clients.**
| `streamMode` | [x] | `live` | The mode to broadcast; `live`, `record` or `append`. |
| `keyFramerate` | [-] | `3000` | The framerate (in milliseconds) between sending key frames in broadcast. |
| `mediaElementId` | [-] | `red5pro-publisher` | The target `video` or `audio` element `id` attribute which will display the preview media. |
| `rtcConfiguration` | [-] | _Basic_ | The `RTCConfiguration` to use in setting up `RTCPeerConnection`. [RTCConfiguration](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary)|
| `includeDataChannel` | [-] | `true` | Flag to open a datachannel for messaging between server and client once connection is established.
| `dataChannelConfiguration` | [-] | `{name: "red5pro"}` | An object used in configuring a n `RTCDataChannel`. _Only used when `includeDataChannel` is defined as `true`_ |
| `iceTransport` | [-] | `UDP` | The transport type to use in ICE negotiation. Either `UDP` or `TCP` |
| `bandwidth` | [-] |`{audio: 56, video: 750}` | A configuration object to setup bandwidth setting in publisher. |
| `connectionParams` | [-] | `undefined` | An object of connection parameters to send to the server upon connection request. |
| `mediaConstraints` | [x] | [see below](#using-mediaconstraints-and-ongetusermedia) | A object representative of the [Media Constraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints) to use while setting up the Media (via `getUserMedia` internally to the SDK). |
| `onGetUserMedia` | [-] | [see below](#using-mediaconstraints-and-ongetusermedia) | An override method for performing your own `getUserMedia` request. Expected return is a `Promise` |
| `videoEncoding` | [-] | `undefined` | `PublishVideoEncoder` enum: `VP8` | `H264` | `H265` | `AV1` . |
| `audioEncoding` | [-] | `undefined` | `PublishAudioEncoder` enum. |
| `offerSDPResolution` | [-] | `false` | Request to send the initial resolution on the SDP offer in an attribute line with the following format: `a=framesize:${width}-${height}` |
| `stats` | [-] | *None* | Configuration object to enable stats reporting. See [Stats Reporting](#statistics) for more information. |
| `reconnect` | [-] | *None* | Configuration object to enable auto re-connect on lost connection, due to such things as change in network. See [Reconnect](#reconnect) for more information. |
| `optimizationParams` | [-] | *None* | Properties that can be assign on encodings and delivery of the published stream. See [OptimizationParams](#optimization-params) for more information. |
| `pubnub` | [-] | *None* | Configuration object for PubNub integration. See [PubNub Integration](#pubnub-integration) for more information. |

## Using MediaConstraints and onGetUserMedia

The Red5 HTML SDK will handle the `getUserMedia` requirements internally to set up your Camera and/or Microphone for a broadcast. As such, you can provide the [Media Constraint](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints) object to be used on the `init` configuration:

```js
const config = {
  host: 'mycloud.red5',
  streamName: 'mystream',
  mediaConstraints: {
    audio: true,
    video: {
      width: {
        min: 640,
        max: 1280
      },
      height: {
        min: 360,
        max: 720
      },
      frameRate: {
        min: 15,
        max: 60
      }
    }
  }
}

const publisher = new WHIPClient()
await publisher.init(config)
await publisher.publish()
```

Internally, the Red5 HTML SDK will use the provided *Media Constraint* to test if the resolutions requested are supported by the browser. If not, it will find the nearest supported lower neighbor based on the originally provided area dimension(s) of the resolutions.

> If you would like to bypass the internal determination of resolution, you can use the `onGetUserMedia` override of the configuration properties.

If you know exactly the proper configurations needed for your requirements and would like to fine-tune the generated `MediaStream` to be used in the broadcast, you can also optionally return that using the `onGetUserMedia` init configuration:

```js
const config = {
  host: 'mycloud.red5',
  streamName: 'mystream',
  onGetUserMedia: () => {
    return navigator.getUserMedia({
      audio: true,
      video: {
        width: {
          min: 640,
          max: 1280
        },
        height: {
          min: 360,
          max: 720
        },
        frameRate: {
          min: 15,
          max: 60
        }
      }
    })
  }
}

const publisher = new WHIPClient()
await publisher.init(config)
await publisher.publish()
```

The `onGetUserMedia` method - when defined on the configuration provide to a WebRTC-based Publisher - will override the internal call to `getUserMedia` in the Red5 HTML SDK.

You can provide your own logic on how `getUserMedia` is invoked and a [Media Stream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) attained by setting the `onGetUserMedia` attribute to a method that conforms to the following guidelines:

* No input arguments are provided to `onGetUserMedia`.
* It is *expected* that a `Promise` object is returned.
* A `MediaStream` object must be provided in the resolve of the `Promise`.
* The error provided in the reject of the `Promise` is optional, but recommended as a `String`.

Be aware that overriding `onGetUserMedia` you are losing the logic from the Red5 HTML SDK that attempts to pick the optimal resolution supported by your browser. **Use with descretion.**

> To read more about `getUserMedia` please read the following document from Mozilla Developer Network: [https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

# Events

The `WHIPClient` included in the SDK is an event emitter that provides a basic API to subscribe and unsubscribe to events either by name or by wildcard.

To subscribe to all events from a publisher:

```js
const handlePublisherEvent = (event) => {
  // The name of the event:
  const { type } = event
  // The dispatching publisher instance:
  const { publisher } = event
  // Optional data releated to the event (not available on all events):
  const { data } = event
}

const publisher = new WHIPClient()
publisher.on('*', handlePublisherEvent)
```

> The `*` type assignment is considered a "Wildcard" subscription - all events being issued by the publisher instance will invoke the assign event handler.

To unsubscribe to all events from a publisher after assinging an event handler:

```js
publisher.off('*', handlePublisherEvent)
```

The following sections of this document describe the event types that can also be listened to directly, instead of using the `*` wildcard.

You can also listen to events individually. The following describe the various events that can be listened for on the `WHIPClient` and enumerated on the `PublisherEventTypes` object:

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `CONNECT_SUCCESS` | 'Connect.Success' | When the publisher has established a required remote connection, such as to a WebSocket or RTMP-based server. |
| `CONNECT_FAILURE` | 'Connect.Failure' | When the publisher has failed to establish a required remote connection for streaming. |
| `PUBLISH_START` | 'Publish.Start' | When the publisher has started a broadcast stream. |
| `PUBLISH_FAIL` | 'Publish.Fail' | When the publisher has failed to start a broadcast stream. |
| `PUBLISH_INVALID_NAME` | 'Publish.InvalidName' | When the publisher is rejected from starting a broadcast stream because the `streamName` provided is already in use. |
| `UNPUBLISH_SUCCESS` | 'Unpublish.Success' | When the publisher has successfully closed an active broadcast stream. |
| `PUBLISH_METADATA` | 'Publish.Metadata' | When the publisher receives metadata from the server. |
| `PUBLISH_STATUS` | 'Publish.Status' | When a status event of the publisher has been receieved from the server. |
| `PUBLISH_AVAILABLE` | 'Publish.Available' | When the publisher stream has become available on the origin server to be consumed. This will follow the connection setup and `Publish.Start` event. |
| `PUBLISH_INSUFFICIENT_BANDWIDTH` | 'Publish.InsufficientBW' | When the current broadcast session is experiencing insufficient bandwidth conditions. |
| `PUBLISH_RECOVERING_BANDWIDTH` | 'Publish.RecoveringBW' | Then the current broadcast has updated information related to bandwidth condition recovery. |
| `PUBLISH_SUFFICIENT_BANDWIDTH` | 'Publish.SufficientBW' | When the current broadcast session has sufficient bandwidth conditions from previously experiencing network issues. |
| `CONNECTION_CLOSED` | 'Publisher.Connection.Closed' | Invoked when a close to the connection is detected. |
| `DIMENSION_CHANGE` | 'Publisher.Video.DimensionChange' | Notification when the Camera resolution has been set or change. |
| `STATISTICS_ENDPOINT_CHANGE` | 'Publisher.StatisticsEndpoint.Change' | Notification that the server has signaled a change in endpoint to deliver WebRTC Statistics based on RTCStatsReports. _Statistics are only reported after calling [monitorStats](#statistics)._ |
| `RECONNECT_START` | 'Reconnect.Start' | Notification when a reconnection sequence has started. Requires `reconnect` initialization property to be enabled. |
| `RECONNECT_FAILURE` | 'Reconnect.Failure' | Notification when a reconnection sequence has failed. Requires `reconnect` initialization property to be enabled. |
| `RECONNECT_SUCCESS` | 'Reconnect.Success' | Notification when a reconnection sequence has been successful. Requires `reconnect` initialization property to be enabled.|

In addition to the above events, the following events are also dispatched from a `WHIPClient` and are defined on the `RTCPublisherEventTypes` enum:

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `CONSTRAINTS_ACCEPTED` | 'WebRTC.MediaConstraints.Accepted' | When constraints have been accepted from the internal request to `getUserMedia`. The `data` property of this event contains a `requested` object detailing the constraints used in the `getUserMedia` request and an `accepted` object which is the current constraint settings for the media. |
| `CONSTRAINTS_REJECTED` | 'WebRTC.MediaConstraints.Rejected' | Then constraints have been rejected from the internal request to `getUserMedia`. The `data` property of this event contains a `constraints` object detailing the constraints that were used and rejected from `getUserMedia`. |
| `MEDIA_STREAM_AVAILABLE` | 'WebRTC.MediaStream.Available' | When the negotation process has returned a `MediaStream` object to use. |
| `PEER_CONNECTION_AVAILABLE` | 'WebRTC.PeerConnection.Available' | When the negotation process has produced a valid `PeerConnection`. |
| `OFFER_START` | 'WebRTC.Offer.Start' | When the publisher requests to send an offer using a `SessionDescription` on the `PeerConnection`. |
| `OFFER_END` | 'WebRTC.Offer.End' | When the publisher has received an answer from the `SDP` offer on the `PeerConnection`. |
| `CANDIDATE_CREATE` | 'WebRTC.Candidate.Create' | When the publisher requests to send a candidate on the `PeerConnection`. |
| `CANDIDATE_RECEIVE` | 'WebRTC.Candidate.Receive' | When the publisher has received a candidate over the `PeerConnection`. |
| `ICE_TRICKLE_COMPLETE` | 'WebRTC.IceTrickle.Complete' | When the negotaiton process (a.k.a. trickle) has completed and the publisher will attempt at opening a broadcast stream. |
| `DATA_CHANNEL_AVAILABLE` | 'WebRTC.DataChannel.Available' |  the underlying `RTCDataChannel` is available when `signalingSocketOnly` configuration is used. |
| `DATA_CHANNEL_OPEN` | 'WebRTC.DataChannel.Open' | When the underlying `RTCDataChannel` is opened when `signalingSocketOnly` configuration is used.
| `DATA_CHANNEL_CLOSE` | 'WebRTC.DataChannel.Close' | When the underlying `RTCDataChannel` is closed when `signalingSocketOnly` configuration is used. |
| `DATA_CHANNEL_ERROR` | 'WebRTC.DataChannel.Error' | When an error has occurred within the underlying `RTCDataChannel` when `signalingSocketOnly` configuration is used. |
| `DATA_CHANNEL_MESSAGE` | 'WebRTC.DataChannel.Message' | When a message has been delivered over the underlying `RTCDataChannel` when `signalingSocketOnly` configuration is used. |
| `STATS_REPORT` | 'WebRTC.Stats.Report' | An RTCStatsReport has been captured by the WebRTC client based on configurations from calling [monitorStats](#statistics). |

# Reconnect

With the `15.4.0` release of the SDK, we introduced the possibility to auto re-connect a `WHIPClient` upon disconnection for such situations as network loss.

> NOTE: This feature requires a server-side configuration for the `resilient-stream` plugin to work.

## Reconnect Configuration

The configuration used for statistics monitoring has the following structure (and their defaults):

```js
{
  enabled: false,
  timeout: 2000,
  maxAttempts: 10
}
```

### enabled

Flag of having reconnection sequence enabled when detection of connection is lost.

### timeout

The amount of delay between attempts to re-connect.

### maxAttempts

The total amount of attempts to make before considering the possiblity of reconnect unavailable.

# Optimization Params

The `optimizationParams` configuration has the following type definition:

```typescript
{
  degradationPreference?:
    | 'balanced'
    | 'maintain-framerate'
    | 'maintain-resolution'
    | 'maintain-framerate-and-resolution'
  contentHint?:
    | 'speech'
    | 'speech-recognition'
    | 'text'
    | 'music'
    | 'detail'
    | 'motion'
}
```

The properties directly relate to the [contentHint](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/contentHint) and [degradationPreference](https://developer.mozilla.org/en-US/docs/Web/API/RTCRtpSender/setParameters#degradationpreference) properties on the `MediaStreamTrack` and `RTCRtpSender` entities of a WebRTC stream.

# Statistics

With the `15.0.0` release of the SDK, we introduced statistics monitoring for `WHIPClient` to support the ability to monitor and POST statistics report data based on the underlying `RTCPeerConnection` of the client.

## Stats Configuration

The configuration used for statistics monitoring has the following structure:

```js
{
  // Optional.
  // If provided, it will POST stats to this endpoint.
  // If undefined or `data-channel`, it will post stats to message transport.
  // If null or `event-transport`, it will only emit status events.
  endpoint: red5prosdk.StatsEndpointType.DATA_CHANNEL,
  additionalHeaders: undefined,
  interval: 5000, // Interval to poll stats, in milliseconds.
  include: [], // Empty array allows SDK to be judicious about what stats to include.
}
```

### endpoint

* If the `endpoint` is defined with a URL, the SDK will attempt to make `POST` requests with a JSON body representing each individual report.
* If the `endpoint` is set to `data-channel` or `undefined`, the SDK will post metadata with type `stats-report` on the underlying message transport (DataChannel) if available.
* If the `endpoint` is set to `event-transport` or `null`, the SDK will only emit events with the metadata on the `WebRTC.StatsReport` event.

### additionalHeaders

By default, if an `endpoint` is defined, the `POST` request body will be in JSON and have the `{ 'Content-Type': 'application/json' }` header set. If requirements - such as authentication - are required, a map of additional headers can be provided to be sent along with the request.

### interval

The polling interval (in milliseconds) to access the `RTCStatsReport` from the underlying `RTCPeerConnection` of the publisher client.

### include

An array of static type strings. These directly map to the listing of type available for `RTCStatsReport` objects. If left empty or undefined, the SDK will report the statistics it deems suitable for tracking proper broadcast conditions.

e.g.,

```js
include: ['outbound-rtp', 'transport']
```

> More information about the statistic types are available at [https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport#the_statistic_types](https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport#the_statistic_types)

## Invocation

To start statistics monitoring, you have a couple of options:

* You can provide a `stats` attribute with the [stats configuration object](#stats-configuration) to the [init configuration](#webrtc-configuration-parameters).
* You can call `monitorStats` on the publisher client with the optional [stats configuration object](#stats-configuration) parameter.

> Additionally, you can stop monitoring by calling `unmonitorStats` on the publisher client.

## Additional Information

Attached to the metadata that is reported are additional properties that pertain to the publisher client.

As well, Along with the metadata releated to the `RTCStatsReport` objects emitted by the underlying `RTCPeerConnection`, the statistics monitoring also sends out a few event and action metadata related to the operation of a publisher client.

> See the following section for examples.

## Example of Statistics Metadata

The following is an example of a statistics metadata that is emitted in a `WebRTC.StatsReport` event and POSTed to any defined optional endpoint:

```json
{
  "name": "RTCPublisherStats",
  "created": 1758037554636,
  "device": {
    "browser": "chrome",
    "version": 140,
    "appVersion": "5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
    "platform": "MacIntel",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
    "vendor": "Google Inc."
  },
  "client": {
    "enabled": true,
    "endpoint": null,
    "host": "myred5.deploy",
    "app": "live",
    "streamName": "todd"
  },
  "type": "stats-report",
  "timestamp": 1758037561373,
  "data": {
    "type": "outbound-rtp",
    "kind": "video",
    "codecId": "COT01_96_level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f;sps-pps-idr-in-keyframe=1",
    "mediaType": "video",
    "active": true,
    "bytesSent": 212534,
    "packetsSent": 245,
    "firCount": 0,
    "pliCount": 3,
    "frameWidth": 640,
    "frameHeight": 360,
    "framesEncoded": 128,
    "framesPerSecond": 29,
    "framesSent": 128,
    "keyFramesEncoded": 4,
    "qualityLimitationReason": "bandwidth",
    "qualityLimitationDurations": {
      "bandwidth": 4.734,
      "cpu": 0,
      "none": 0.004,
      "other": 0
    },
    "estimatedBitrate": 435
  }
}
```

# Stream Manager 2.0

> This section provides information that relate to the release of Stream Manager 2.0 and its integration with WHIP/WHEP clients.

The Stream Manager 2.0 simplifies the proxying of web clients to Origin and Edge nodes. As such, an initialization configuration property called `endpoint` was added to the WebRTC SDK. This `endpoint` value should be the full URL path to the proxy endpoint on the Stream Manager as is used as such:

## WHIP Proxy

```javascript
const host = 'my-deployment'
const streamName = 'mystream'
const nodeGroup = 'my-node-group'
const endpoint = `https://${host}/as/v1/proxy/whip/live/${streamName}`
const config = {
  endpoint,
  streamName,
  connectionParams: {
    nodeGroup
  },
  // additional configurations
}
const publisher = await new WHIPClient().init(config)
publisher.on('*', (event) => console.log(event))
await publisher.publish()
```

## WHEP Proxy

```javascript
const host = 'my-deployment'
const streamName = 'mystream'
const nodeGroup = 'my-node-group'
const endpoint = `https://${host}/as/v1/proxy/whep/live/${streamName}`
const config = {
  endpoint,
  streamName,
  connectionParams: {
    nodeGroup
  },
  // additional configurations
}
const subscriber = await new WHEPClient().init(config)
subscriber.on('*', (event) => console.log(event))
await subscriber.subscribe()
```

There are a few things to note here:

* The difference of `/whip` and `/whep` in the URI for the endpoint calls between `WHIPClient` and `WHEPClient`, respecively.
* The requirement of a `nodeGroup` connection parameter that is the target nodegroup within your Stream Manager deployment on which you want to proxy the WHIP/WHEP client(s).

# PubNub Integration

While the SDK provides a way to [utilize PubNub integration](./pubnub-client.md) outside of its media streaming capabilities, when utilizing the `WHIPClient` for broadcasting, the SDK also affords the ability to integrate PubNub messaging for your application.

> For more information about the standalone `PubNubClient` that can be used outside of `WHIPClient`, please visit the [PubNubClient Documentation](./pubnub-client.md).

## pubnub - Initialization Attribute

Exposed on the [init configuration](#init-configuration) is the `pubnub` attribute. The following `pubnub` object configuration attributes are supported:

| Property | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `pubnub` | [x] | `window.PubNub` | Reference to the [PubNub](https://www.npmjs.com/package/pubnub) library to utilize. |
| `publishKey` | [x] | _None_ | The registered publish key from PubNub. This can be found in your [Red5 Cloud](https://cloud.red5.net) deployment. |
| `subscribeKey` | [x] | _None_ | The registered subscribe key from PubNub. This can be found in your [Red5 Cloud](https://cloud.red5.net) deployment. |
| `userId` | [x] | Auto-generated if not provided. | The associated User ID for PubNub. |
| `channelId` | [x] | `red5` | Default Channel ID to subscribe to in PubNub messaging. |
| `expiryMinutes` | [-] | `120` | Default expiration of issued token associated with client. |
| `authToken` | [-] | _None_ | Optional authentication token issues from PubNub - if known. |
| `cloudEndpoint` | [-] | _None_ | Optional endpoint of Red5 Cloud deployment to attempt access of `authToken` from PubNub system. |
| `backendUrl` | [-] | _None_ | Optional full URL of service endpoint to access `authToken` from PubNub system. [See documentation on deploying your own service.](https://www.red5.net/docs/red5-cloud/development/sdks/backend-sdk/) |
| `logLevel` | [-] | `trace` | The default log level of the PubNub client. |

## Authentication

The `PubNubClient` requires an authentication token to connect to the PubNub system for messaging. If a valid token is generated by a means outside of the SDK, you can define the token on the `authToken` attribute of the ini configuration.

If the `authToken` is not known prior to initialization, there are two ways that can be used through the SDK to access and utilize the token for connection:

### cloudEndpoint

If you have a [Red5 Cloud](https://cloud.red5.net) account and deployment, you can provide the `cloudEndpoint` attribute pointing to your deployment (e.g., `userid-1234-abcd.cloud.red5.net`). The SDK will attempt to generate the authentication token using a service that may be available from your deployment.

### backendUrl

If the `authToken` is not known or your [Red5 Cloud](https://cloud.red5.net) deployment does not provide an means for retrieving the authentication token, we have released open sourced Backend SDKs which can be used to provide your own custom service in generating a authentication token to be used.

To learn more about the Backend SDKs and authentication token generation, [please refer to the documentation](https://www.red5.net/docs/red5-cloud/development/sdks/backend-sdk/).

## PubNub Message API

Once PubNub authentication and connection has been established through initialization, the following API can be used to as it relates to sending and receiving messages:

### subscribePubNub(channelId: string, options: any | undefined)

Request to subscribe to target channel with optional `options`.

### sendPubNub(channelId: string, message: any)

Request to publish a message on the target channel.

> Any `PubNub` client connected and subscribed to channels will be cleaned up upon call to `unpublish` of the `WHIPClient`.

## PubNub Events

# Events

The following events are dispatched by the underlying pubnub integration and bubbled out through the `WHIPClient` and enumerated on the `PubNubEventTypes` object:

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `CONNECTED` | 'PubNub.Connected' | Dispatched when the PubNub client has successfully connected to the PubNub service. |
| `DISCONNECTED` | 'PubNub.Disconnected' | Dispatched when the PubNub client has disconnected from the PubNub service. |
| `SUBSCRIBE_SUCCESS` | 'PubNub.Subscribe.Success' | Dispatched when a channel subscription request has completed successfully. The `data` property contains details about the subscription. |
| `SUBSCRIBE_FAILURE` | 'PubNub.Subscribe.Failure' | Dispatched when a channel subscription request has failed. The `data` property contains error information. |
| `UNSUBSCRIBE_SUCCESS` | 'PubNub.Unsubscribe.Success' | Dispatched when a channel unsubscribe request has completed successfully. The `data` property contains details about the unsubscription. |
| `UNSUBSCRIBE_FAILURE` | 'PubNub.Unsubscribe.Failure' | Dispatched when a channel unsubscribe request has failed. The `data` property contains error information. |
| `MESSAGE_RECEIVED` | 'PubNub.Message.Received' | Dispatched when a message is received on a subscribed channel. The `data` property contains the message payload. |
| `MESSAGE_SEND_SUCCESS` | 'PubNub.Message.Send.Success' | Dispatched when a message has been successfully published to a channel. The `data` property contains confirmation details. |
| `MESSAGE_SEND_FAILURE` | 'PubNub.Message.Send.Failure' | Dispatched when a message publish request has failed. The `data` property contains error information. |
| `AUTH_TOKEN_GENERATED` | 'PubNub.AuthToken.Generated' | Dispatched when an authentication token has been successfully generated. The `data` property contains the token information. |
| `AUTH_TOKEN_GENERATION_ERROR` | 'PubNub.AuthToken.Generation.Error' | Dispatched when authentication token generation has failed. The `data` property contains error information. |
| `STATUS` | 'PubNub.Status' | Dispatched on general status notification. The `data` property contains the status. |
| `ERROR` | 'PubNub.Error' | Dispatched when a general error occurs in the PubNub client. The `data` property contains error details. |

### Source: `docs/api/classes/Event.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / Event

# Class: Event

Base class for an Event within the Red5 Pro WebRTC SDK.

## Extended by

- [`SubscriberEvent`](SubscriberEvent.md)
- [`PublisherEvent`](PublisherEvent.md)
- [`MessageTransportStateEvent`](MessageTransportStateEvent.md)
- [`PubNubEvent`](PubNubEvent.md)
- [`MessageChannelEvent`](MessageChannelEvent.md)

## Constructors

### Constructor

> **new Event**(`type`, `data?`): `Event`

#### Parameters

##### type

`string`

##### data?

`any`

#### Returns

`Event`

## Accessors

### data

#### Get Signature

> **get** **data**(): `any`

Get the data associated with the event.

##### Returns

`any`

***

### type

#### Get Signature

> **get** **type**(): `string`

Get the type of event.

##### Returns

`string`

### Source: `docs/api/classes/EventEmitter.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / EventEmitter

# Class: EventEmitter

Base class for an Event Emitter.

## Extended by

- [`WHIPClient`](WHIPClient.md)
- [`PlaybackControls`](PlaybackControls.md)
- [`PlaybackController`](PlaybackController.md)
- [`PubNubClient`](PubNubClient.md)
- [`MOQSubscriber`](MOQSubscriber.md)
- [`MOQPublisher`](MOQPublisher.md)
- [`MOQCatalog`](MOQCatalog.md)

## Implements

- [`EventEmitterInterface`](../interfaces/EventEmitterInterface.md)

## Constructors

### Constructor

> **new EventEmitter**(): `EventEmitter`

#### Returns

`EventEmitter`

## Methods

### off()

> **off**(`type`, `fn`): `void`

Remove a callback handler for an event type.

#### Parameters

##### type

`string`

##### fn

(`event`) => `void`

#### Returns

`void`

#### Implementation of

[`EventEmitterInterface`](../interfaces/EventEmitterInterface.md).[`off`](../interfaces/EventEmitterInterface.md#off)

***

### on()

> **on**(`type`, `fn`): `void`

Assign a callback handler to an event type.

#### Parameters

##### type

`string`

##### fn

(`event`) => `void`

#### Returns

`void`

#### Implementation of

[`EventEmitterInterface`](../interfaces/EventEmitterInterface.md).[`on`](../interfaces/EventEmitterInterface.md#on)

***

### trigger()

> **trigger**(`event`): `void`

Dispatch an event to be handled by any assigned callbacks.

#### Parameters

##### event

[`Event`](Event.md)

#### Returns

`void`

#### Implementation of

[`EventEmitterInterface`](../interfaces/EventEmitterInterface.md).[`trigger`](../interfaces/EventEmitterInterface.md#trigger)

### Source: `docs/api/classes/HLSSubscriber.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / HLSSubscriber

# Class: HLSSubscriber

HLS Subscriber. Supports playback of HLS streams using the native HLS player in browsers that support it (i.e., Mobile and Desktop Safari).

## Extends

- [`PlaybackController`](PlaybackController.md)

## Constructors

### Constructor

> **new HLSSubscriber**(): `HLSSubscriber`

#### Returns

`HLSSubscriber`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`constructor`](PlaybackController.md#constructor)

## Accessors

### fileURL

#### Get Signature

> **get** **fileURL**(): `string` \| `undefined`

Get the file URL of the HLS stream.

##### Returns

`string` \| `undefined`

***

### options

#### Get Signature

> **get** **options**(): [`HLSSubscriberConfigType`](../type-aliases/HLSSubscriberConfigType.md) \| `undefined`

Get the options of the HLS stream.

##### Returns

[`HLSSubscriberConfigType`](../type-aliases/HLSSubscriberConfigType.md) \| `undefined`

## Methods

### getFileURL()

> **getFileURL**(): `string` \| `undefined`

Get the file URL of the HLS stream.

#### Returns

`string` \| `undefined`

***

### getOptions()

> **getOptions**(): [`HLSSubscriberConfigType`](../type-aliases/HLSSubscriberConfigType.md) \| `undefined`

Get the options of the HLS stream.

#### Returns

[`HLSSubscriberConfigType`](../type-aliases/HLSSubscriberConfigType.md) \| `undefined`

***

### getPlayer()

> **getPlayer**(): `HTMLMediaElement` \| `undefined`

Get the playback element of the HLS stream.

#### Returns

`HTMLMediaElement` \| `undefined`

***

### getType()

> **getType**(): `string`

Get the type of the subscriber (HLS).

#### Returns

`string`

***

### getVolume()

> **getVolume**(): `number`

Get the volume of the HLS stream.

#### Returns

`number`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`getVolume`](PlaybackController.md#getvolume)

***

### init()

> **init**(`options`): `Promise`\<`HLSSubscriber`\>

Initialize the HLS Subscriber.

#### Parameters

##### options

[`HLSSubscriberConfigType`](../type-aliases/HLSSubscriberConfigType.md)

#### Returns

`Promise`\<`HLSSubscriber`\>

***

### mute()

> **mute**(): `void`

Mute the HLS stream.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`mute`](PlaybackController.md#mute)

***

### off()

> **off**(`event`, `fn`): `void`

Remove an event listener from the PlaybackController.

#### Parameters

##### event

`string`

The event to remove the listener from.

##### fn

(...`args`) => `void`

The function to remove the listener from.

#### Returns

`void`

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`off`](PlaybackController.md#off)

***

### on()

> **on**(`event`, `fn`): `void`

Add an event listener to the PlaybackController.

#### Parameters

##### event

`string`

The event to listen for.

##### fn

(...`args`) => `void`

The function to call when the event is triggered.

#### Returns

`void`

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`on`](PlaybackController.md#on)

***

### pause()

> **pause**(): `void`

Pause the HLS stream.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`pause`](PlaybackController.md#pause)

***

### play()

> **play**(): `void`

Play the HLS stream.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`play`](PlaybackController.md#play)

***

### resume()

> **resume**(): `void`

Resume the HLS stream.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`resume`](PlaybackController.md#resume)

***

### seekTo()

> **seekTo**(`time`): `void`

Seek to a specific time in the HLS stream.

#### Parameters

##### time

`number`

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`seekTo`](PlaybackController.md#seekto)

***

### setVolume()

> **setVolume**(`value`): `void`

Set the volume of the HLS stream.

#### Parameters

##### value

`number`

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`setVolume`](PlaybackController.md#setvolume)

***

### stop()

> **stop**(): `void`

Stop the HLS stream.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`stop`](PlaybackController.md#stop)

***

### subscribe()

> **subscribe**(): `Promise`\<`HLSSubscriber`\>

Subscribe to the HLS stream.

#### Returns

`Promise`\<`HLSSubscriber`\>

***

### toggleFullScreen()

> **toggleFullScreen**(): `void`

Toggle the full screen of the HLS stream.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`toggleFullScreen`](PlaybackController.md#togglefullscreen)

***

### trigger()

> **trigger**(`event`): `void`

Trigger an event on the PlaybackController.

#### Parameters

##### event

[`Event`](Event.md)

The event to trigger.

#### Returns

`void`

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`trigger`](PlaybackController.md#trigger)

***

### unmute()

> **unmute**(): `void`

Unmute the HLS stream.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`unmute`](PlaybackController.md#unmute)

***

### unsubscribe()

> **unsubscribe**(): `Promise`\<`HLSSubscriber`\>

Unsubscribe from the HLS stream.

#### Returns

`Promise`\<`HLSSubscriber`\>

### Source: `docs/api/classes/LiveSeekClient.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / LiveSeekClient

# Class: LiveSeekClient

WHEP-based Subscriber with Live Seek support.

## Extends

- [`WHEPClient`](WHEPClient.md)

## Constructors

### Constructor

> **new LiveSeekClient**(`url?`, `element?`, `additionalOptions?`): `LiveSeekClient`

Constructor for the WHEP-based Subscriber with Live Seek support.

#### Parameters

##### url?

`string`

Optional WHEP endpoint URL for the live stream.

##### element?

`HTMLMediaElement`

Optional HTMLMediaElement to use for live stream playback.

##### additionalOptions?

[`LiveSeekConfigType`](../type-aliases/LiveSeekConfigType.md)

Optional LiveSeekConfigType to use for configuration.

#### Returns

`LiveSeekClient`

#### Overrides

[`WHEPClient`](WHEPClient.md).[`constructor`](WHEPClient.md#constructor)

## Accessors

### options

#### Get Signature

> **get** **options**(): [`RTCWhepSubscriberConfigType`](../type-aliases/RTCWhepSubscriberConfigType.md) \| `undefined`

Get the options for the WHEP-based Subscriber.

##### Returns

[`RTCWhepSubscriberConfigType`](../type-aliases/RTCWhepSubscriberConfigType.md) \| `undefined`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`options`](WHEPClient.md#options)

## Methods

### callServer()

> **callServer**(`methodName`, `args`): `Promise`\<`any`\>

Call a method on the Red5 Pro Server over the message transport (DataChannel).

#### Parameters

##### methodName

`string`

The method name to call.

##### args

`any`

The arguments to call the method with.

#### Returns

`Promise`\<`any`\>

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`callServer`](WHEPClient.md#callserver)

***

### disableStandby()

> **disableStandby**(): `void`

Disable standby mode for the WHEP-based Subscriber. This will signal to the server to resume audio and video.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`disableStandby`](WHEPClient.md#disablestandby)

***

### emit()

> **emit**(`type`, `data`): `void`

Emit an event on the WHEP-based Subscriber.

#### Parameters

##### type

`string`

The type of event to emit.

##### data

`any`

The data to emit.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`emit`](WHEPClient.md#emit)

***

### enableStandby()

> **enableStandby**(): `void`

Enable standby mode for the WHEP-based Subscriber. This will signal to the server to hold back audio and video.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`enableStandby`](WHEPClient.md#enablestandby)

***

### getDataChannel()

> **getDataChannel**(): `RTCDataChannel` \| `undefined`

Get the data channel for the WHEP-based Subscriber.

#### Returns

`RTCDataChannel` \| `undefined`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`getDataChannel`](WHEPClient.md#getdatachannel)

***

### getMediaStream()

> **getMediaStream**(): `MediaStream` \| `undefined`

Get the media stream being played back by the subscriber.

#### Returns

`MediaStream` \| `undefined`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`getMediaStream`](WHEPClient.md#getmediastream)

***

### getMessageTransport()

> **getMessageTransport**(): `MessageTransport` \| `undefined`

Get the message transport for the WHEP-based Subscriber.

#### Returns

`MessageTransport` \| `undefined`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`getMessageTransport`](WHEPClient.md#getmessagetransport)

***

### getOptions()

> **getOptions**(): [`RTCWhepSubscriberConfigType`](../type-aliases/RTCWhepSubscriberConfigType.md) \| `undefined`

Get the options for the WHEP-based Subscriber.

#### Returns

[`RTCWhepSubscriberConfigType`](../type-aliases/RTCWhepSubscriberConfigType.md) \| `undefined`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`getOptions`](WHEPClient.md#getoptions)

***

### getPeerConnection()

> **getPeerConnection**(): `RTCPeerConnection` \| `undefined`

Get the peer connection for the WHEP-based Subscriber.

#### Returns

`RTCPeerConnection` \| `undefined`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`getPeerConnection`](WHEPClient.md#getpeerconnection)

***

### getPlayer()

> **getPlayer**(): `HTMLMediaElement` \| `undefined`

Get the media element for the WHEP-based Subscriber.

#### Returns

`HTMLMediaElement` \| `undefined`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`getPlayer`](WHEPClient.md#getplayer)

***

### getPubNubClient()

> **getPubNubClient**(): [`PubNubClient`](PubNubClient.md) \| `undefined`

Get the PubNub client for the WHEP-based Subscriber.

#### Returns

[`PubNubClient`](PubNubClient.md) \| `undefined`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`getPubNubClient`](WHEPClient.md#getpubnubclient)

***

### getType()

> **getType**(): `string`

Get the type of the WHEP-based Subscriber (RTC).

#### Returns

`string`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`getType`](WHEPClient.md#gettype)

***

### getVolume()

> **getVolume**(): `number`

Get the volume of the media being delivered to the subscriber.

#### Returns

`number`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`getVolume`](WHEPClient.md#getvolume)

***

### init()

> **init**(`options`): `Promise`\<[`WHEPClient`](WHEPClient.md)\>

Initialize the WHEP-based Subscriber with Live Seek support.

#### Parameters

##### options

[`LiveSeekConfigType`](../type-aliases/LiveSeekConfigType.md)

LiveSeekConfigType to use for configuration.

#### Returns

`Promise`\<[`WHEPClient`](WHEPClient.md)\>

#### Overrides

[`WHEPClient`](WHEPClient.md).[`init`](WHEPClient.md#init)

***

### monitorStats()

> **monitorStats**(`stats?`, `renegotiationPolicy?`): [`WHEPClient`](WHEPClient.md)

Monitor the statistics of the media being delivered to the subscriber over the underlying RTCPeerConnection.

#### Parameters

##### stats?

[`StatsConfig`](../type-aliases/StatsConfig.md)

The statistics configuration.

##### renegotiationPolicy?

`RenegotiationPolicyType`

The renegotiation policy configuration.

#### Returns

[`WHEPClient`](WHEPClient.md)

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`monitorStats`](WHEPClient.md#monitorstats)

***

### mute()

> **mute**(): `void`

Mute the audio playback on the media being delivered to the subscriber.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`mute`](WHEPClient.md#mute)

***

### muteAudio()

> **muteAudio**(): `void`

Mute the audio being delivered to the subscriber.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`muteAudio`](WHEPClient.md#muteaudio)

***

### muteVideo()

> **muteVideo**(): `void`

Mute the video being delivered to the subscriber.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`muteVideo`](WHEPClient.md#mutevideo)

***

### off()

> **off**(`type`, `fn`): `void`

Remove an event listener from the WHEP-based Subscriber.

#### Parameters

##### type

`string`

The type of event to listen for.

##### fn

(`event`) => `void`

The function to call when the event is triggered.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`off`](WHEPClient.md#off)

***

### on()

> **on**(`type`, `fn`): `void`

Add an event listener to the WHEP-based Subscriber.

#### Parameters

##### type

`string`

The type of event to listen for.

##### fn

(`event`) => `void`

The function to call when the event is triggered.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`on`](WHEPClient.md#on)

***

### pause()

> **pause**(): `void`

Pause the media being delivered to the subscriber.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`pause`](WHEPClient.md#pause)

***

### play()

> **play**(): `void`

Play the media being delivered to the subscriber.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`play`](WHEPClient.md#play)

***

### resume()

> **resume**(): `void`

Resume the media being delivered to the subscriber.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`resume`](WHEPClient.md#resume)

***

### seekTo()

> **seekTo**(`time`): `void`

Seek to a specific time in the media being delivered to the subscriber.

#### Parameters

##### time

`number`

The time to seek to.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`seekTo`](WHEPClient.md#seekto)

***

### send()

> **send**(`methodName`, `data`): `Promise`\<`boolean` \| `undefined`\>

Send a message to the Red5 Pro Server over the message transport (DataChannel).

#### Parameters

##### methodName

`string`

The method name to send.

##### data

`any`

The data to send.

#### Returns

`Promise`\<`boolean` \| `undefined`\>

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`send`](WHEPClient.md#send)

***

### sendLog()

> **sendLog**(`level`, `message`): `void`

Send a log message to the Red5 Pro Server over the message transport (DataChannel).

#### Parameters

##### level

`string`

The level of the log message.

##### message

`any`

The message to send.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`sendLog`](WHEPClient.md#sendlog)

***

### sendPubNub()

> **sendPubNub**(`channel`, `message`): `Promise`\<`boolean`\>

Send a message to the PubNub channel.

#### Parameters

##### channel

`string`

The channel to send the message to.

##### message

`any`

The message to send.

#### Returns

`Promise`\<`boolean`\>

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`sendPubNub`](WHEPClient.md#sendpubnub)

***

### setVolume()

> **setVolume**(`value`): `void`

Set the volume of the media being delivered to the subscriber.

#### Parameters

##### value

`number`

The volume to set.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`setVolume`](WHEPClient.md#setvolume)

***

### stop()

> **stop**(): `void`

Stop the media being delivered to the subscriber.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`stop`](WHEPClient.md#stop)

***

### subscribe()

> **subscribe**(): `Promise`\<[`WHEPClient`](WHEPClient.md)\>

Subscribe to the WHEP-based Subscriber.

#### Returns

`Promise`\<[`WHEPClient`](WHEPClient.md)\>

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`subscribe`](WHEPClient.md#subscribe)

***

### subscribePubNub()

> **subscribePubNub**(`channel`, `options`): `Promise`\<`boolean`\>

Subscribe to a PubNub channel.

#### Parameters

##### channel

`string`

The channel to subscribe to.

##### options

`any`

The options to use for subscription.

#### Returns

`Promise`\<`boolean`\>

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`subscribePubNub`](WHEPClient.md#subscribepubnub)

***

### toggleFullScreen()

> **toggleFullScreen**(): `void`

Toggle the full screen mode of the media being delivered to the subscriber.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`toggleFullScreen`](WHEPClient.md#togglefullscreen)

***

### trigger()

> **trigger**(`event`): `void`

Trigger an event on the WHEP-based Subscriber.

#### Parameters

##### event

[`Event`](Event.md)

The event to trigger.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`trigger`](WHEPClient.md#trigger)

***

### unmonitorStats()

> **unmonitorStats**(): [`WHEPClient`](WHEPClient.md)

Unmonitor the statistics of the media being delivered to the subscriber over the underlying RTCPeerConnection.

#### Returns

[`WHEPClient`](WHEPClient.md)

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`unmonitorStats`](WHEPClient.md#unmonitorstats)

***

### unmute()

> **unmute**(): `void`

Unmute the audio playback on the media being delivered to the subscriber.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`unmute`](WHEPClient.md#unmute)

***

### unmuteAudio()

> **unmuteAudio**(): `void`

Unmute the audio being delivered to the subscriber.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`unmuteAudio`](WHEPClient.md#unmuteaudio)

***

### unmuteVideo()

> **unmuteVideo**(): `void`

Unmute the video being delivered to the subscriber.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`unmuteVideo`](WHEPClient.md#unmutevideo)

***

### unsubscribe()

> **unsubscribe**(`internal?`): `Promise`\<`void`\>

Unsubscribe from the WHEP-based Subscriber.

#### Parameters

##### internal?

`boolean` = `false`

Optional boolean to indicate if the unsubscribe is internal.

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`unsubscribe`](WHEPClient.md#unsubscribe)

***

### unsubscribePubNub()

> **unsubscribePubNub**(`channel`): `Promise`\<`boolean`\>

Unsubscribe from a PubNub channel.

#### Parameters

##### channel

`string`

The channel to unsubscribe from.

#### Returns

`Promise`\<`boolean`\>

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`unsubscribePubNub`](WHEPClient.md#unsubscribepubnub)

### Source: `docs/api/classes/MessageChannel.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / MessageChannel

# Class: MessageChannel

MessageChannel is a subclass of WHIPClient that provides a data channel for sending and receiving messages only.
_There is no underlying media streaming logic in this client._

This ingest-based client is useful for sending and receiving messages to and from the server over a designated data channel.

## Extends

- [`WHIPClient`](WHIPClient.md)

## Constructors

### Constructor

> **new MessageChannel**(`url`, `additionalOptions?`): `MessageChannel`

#### Parameters

##### url

`string` \| `undefined`

##### additionalOptions?

[`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md)

#### Returns

`MessageChannel`

#### Overrides

[`WHIPClient`](WHIPClient.md).[`constructor`](WHIPClient.md#constructor)

## Accessors

### options

#### Get Signature

> **get** **options**(): [`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md) \| `undefined`

Get the options for the WHIPClient.

##### Returns

[`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md) \| `undefined`

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`options`](WHIPClient.md#options)

## Methods

### callServer()

> **callServer**(`methodName`, `args`): `Promise`\<`any`\>

Call a method on the server.

#### Parameters

##### methodName

`string`

The name of the method to call.

##### args

`any`

The arguments to call the method with.

#### Returns

`Promise`\<`any`\>

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`callServer`](WHIPClient.md#callserver)

***

### close()

> **close**(): `Promise`\<`void`\>

Close the MessageChannel.

#### Returns

`Promise`\<`void`\>

***

### emit()

> **emit**(`type`, `data`): `void`

Emit an event on the WHIPClient.

#### Parameters

##### type

`string`

The type of event to emit.

##### data

`any`

The data to emit.

#### Returns

`void`

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`emit`](WHIPClient.md#emit)

***

### getDataChannel()

> **getDataChannel**(): `RTCDataChannel` \| `undefined`

Get the DataChannel for the WHIPClient.

#### Returns

`RTCDataChannel` \| `undefined`

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`getDataChannel`](WHIPClient.md#getdatachannel)

***

### getMediaStream()

> **getMediaStream**(): `MediaStream` \| `undefined`

Get the MediaStream generated for the WHIPClient.

#### Returns

`MediaStream` \| `undefined`

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`getMediaStream`](WHIPClient.md#getmediastream)

***

### getMessageTransport()

> **getMessageTransport**(): `MessageTransport` \| `undefined`

Get the MessageTransport for the WHIPClient.

#### Returns

`MessageTransport` \| `undefined`

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`getMessageTransport`](WHIPClient.md#getmessagetransport)

***

### getOptions()

> **getOptions**(): [`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md) \| `undefined`

Get the options for the WHIPClient.

#### Returns

[`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md) \| `undefined`

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`getOptions`](WHIPClient.md#getoptions)

***

### getPeerConnection()

> **getPeerConnection**(): `RTCPeerConnection` \| `undefined`

Get the PeerConnection for the WHIPClient.

#### Returns

`RTCPeerConnection` \| `undefined`

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`getPeerConnection`](WHIPClient.md#getpeerconnection)

***

### getPubNubClient()

> **getPubNubClient**(): [`PubNubClient`](PubNubClient.md) \| `undefined`

Get the PubNub client for the WHIPClient.

#### Returns

[`PubNubClient`](PubNubClient.md) \| `undefined`

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`getPubNubClient`](WHIPClient.md#getpubnubclient)

***

### getType()

> **getType**(): `string`

Get the type of the MessageChannel.

#### Returns

`string`

#### Overrides

[`WHIPClient`](WHIPClient.md).[`getType`](WHIPClient.md#gettype)

***

### init()

> **init**(`options`): `Promise`\<`MessageChannel`\>

Initialize the MessageChannel.

#### Parameters

##### options

[`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md)

The options to initialize the MessageChannel with. See [RTCWhipPublisherConfigType](../type-aliases/RTCWhipPublisherConfigType.md) for more details.

#### Returns

`Promise`\<`MessageChannel`\>

#### Overrides

[`WHIPClient`](WHIPClient.md).[`init`](WHIPClient.md#init)

***

### initWithStream()

> **initWithStream**(`options`, `stream`): `Promise`\<`MessageChannel`\>

Initialize the WHIPClient with a MediaStream. Doing so will skip the SDK attempting to generate a MediaStream through browser-based media APIs.

#### Parameters

##### options

[`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md)

The options to use for initialization.

##### stream

`MediaStream`

The stream to use for initialization.

#### Returns

`Promise`\<`MessageChannel`\>

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`initWithStream`](WHIPClient.md#initwithstream)

***

### monitorStats()

> **monitorStats**(`stats?`): [`WHIPClient`](WHIPClient.md)

Monitor the statistics of the MediaStream being published to the server over the underlying RTCPeerConnection..

#### Parameters

##### stats?

[`StatsConfig`](../type-aliases/StatsConfig.md)

The statistics configuration.

#### Returns

[`WHIPClient`](WHIPClient.md)

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`monitorStats`](WHIPClient.md#monitorstats)

***

### muteAudio()

> **muteAudio**(): `void`

Mute the audio being published to the server.

#### Returns

`void`

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`muteAudio`](WHIPClient.md#muteaudio)

***

### muteVideo()

> **muteVideo**(): `void`

Mute the video being published to the server.

#### Returns

`void`

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`muteVideo`](WHIPClient.md#mutevideo)

***

### off()

> **off**(`type`, `fn`): `void`

Remove an event listener from the WHIPClient.

#### Parameters

##### type

`string`

The type of event to remove the listener from.

##### fn

(`event`) => `void`

The function to remove the listener from.

#### Returns

`void`

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`off`](WHIPClient.md#off)

***

### on()

> **on**(`type`, `fn`): `void`

Add an event listener to the WHIPClient.

#### Parameters

##### type

`string`

The type of event to listen for.

##### fn

(`event`) => `void`

The function to call when the event is triggered.

#### Returns

`void`

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`on`](WHIPClient.md#on)

***

### open()

> **open**(`inactivePingIntervalMS?`): `Promise`\<`MessageChannel`\>

Open the MessageChannel.

#### Parameters

##### inactivePingIntervalMS?

`number` = `10000`

The interval in milliseconds to send an inactive ping.

#### Returns

`Promise`\<`MessageChannel`\>

***

### publish()

> **publish**(): `Promise`\<`MessageChannel`\>

Publish the MediaStream to the server.

#### Returns

`Promise`\<`MessageChannel`\>

#### Overrides

[`WHIPClient`](WHIPClient.md).[`publish`](WHIPClient.md#publish)

***

### send()

> **send**(`methodName`, `data`): `Promise`\<`boolean` \| `undefined`\>

Send a JSON message to the server over the data channel.
 - Overrides the send method in the WHIPClient class to properly wrap the data in a message object with methodName.

#### Parameters

##### methodName

`string`

The name of the method to send.

##### data

`any`

The data to send.

#### Returns

`Promise`\<`boolean` \| `undefined`\>

#### Overrides

[`WHIPClient`](WHIPClient.md).[`send`](WHIPClient.md#send)

***

### sendData()

> **sendData**(`data`): `Promise`\<`boolean`\>

Send data to the server over the data channel.

#### Parameters

##### data

`any`

The data to send. Can be of any type, such as an arraybuffer.

#### Returns

`Promise`\<`boolean`\>

***

### sendLog()

> **sendLog**(`level`, `message`): `void`

Send a log message to the server.

#### Parameters

##### level

`string`

The level of the log message.

##### message

`any`

The message to send.

#### Returns

`void`

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`sendLog`](WHIPClient.md#sendlog)

***

### sendMessage()

> **sendMessage**(`message`): `Promise`\<`boolean`\>

Send a message to the server over the data channel. This will attempt to wrap and send the message as a JSON payload.

#### Parameters

##### message

`any`

The message to send.

#### Returns

`Promise`\<`boolean`\>

#### See

[sendData](#senddata) for sending raw data to the server over the data channel.

***

### sendPubNub()

> **sendPubNub**(`channel`, `message`): `Promise`\<`boolean`\>

Send a message to the PubNub channel.

#### Parameters

##### channel

`string`

The channel to send the message to.

##### message

`any`

The message to send.

#### Returns

`Promise`\<`boolean`\>

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`sendPubNub`](WHIPClient.md#sendpubnub)

***

### subscribePubNub()

> **subscribePubNub**(`channel`, `options`): `Promise`\<`boolean`\>

Subscribe to a PubNub channel.

#### Parameters

##### channel

`string`

The channel to subscribe to.

##### options

`any`

The options to use for subscription.

#### Returns

`Promise`\<`boolean`\>

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`subscribePubNub`](WHIPClient.md#subscribepubnub)

***

### trigger()

> **trigger**(`event`): `void`

Trigger an event on the MessageChannel.

#### Parameters

##### event

[`Event`](Event.md)

The event to trigger.
 - Overrides the trigger method in the WHIPClient class to properly trigger the event on the MessageChannel.

#### Returns

`void`

#### Overrides

[`WHIPClient`](WHIPClient.md).[`trigger`](WHIPClient.md#trigger)

***

### unmonitorStats()

> **unmonitorStats**(): [`WHIPClient`](WHIPClient.md)

Unmonitor the statistics of the MediaStream being published to the server over the underlying RTCPeerConnection.

#### Returns

[`WHIPClient`](WHIPClient.md)

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`unmonitorStats`](WHIPClient.md#unmonitorstats)

***

### unmuteAudio()

> **unmuteAudio**(): `void`

Unmute the audio being published to the server.

#### Returns

`void`

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`unmuteAudio`](WHIPClient.md#unmuteaudio)

***

### unmuteVideo()

> **unmuteVideo**(): `void`

Unmute the video being published to the server.

#### Returns

`void`

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`unmuteVideo`](WHIPClient.md#unmutevideo)

***

### unpublish()

> **unpublish**(): `Promise`\<`void`\>

Unpublish the MediaStream from the server.

#### Returns

`Promise`\<`void`\>

#### Overrides

[`WHIPClient`](WHIPClient.md).[`unpublish`](WHIPClient.md#unpublish)

***

### unsubscribePubNub()

> **unsubscribePubNub**(`channel`): `Promise`\<`boolean`\>

Unsubscribe from a PubNub channel.

#### Parameters

##### channel

`string`

The channel to unsubscribe from.

#### Returns

`Promise`\<`boolean`\>

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`unsubscribePubNub`](WHIPClient.md#unsubscribepubnub)

***

### updateOptimizationParams()

> **updateOptimizationParams**(`optimizationParams`): `void`

Update the optimization parameters for the published stream.

#### Parameters

##### optimizationParams

`OptimizationParams`

The optimization parameters to update.

#### Returns

`void`

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`updateOptimizationParams`](WHIPClient.md#updateoptimizationparams)

### Source: `docs/api/classes/MessageChannelEvent.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / MessageChannelEvent

# Class: MessageChannelEvent

Event for a MessageChannel within the Red5 Pro WebRTC SDK.

## Extends

- [`Event`](Event.md)

## Constructors

### Constructor

> **new MessageChannelEvent**(`type`, `messageChannel`, `data?`): `MessageChannelEvent`

Constructor for a MessageChannelEvent.

#### Parameters

##### type

`string`

The type of event.

##### messageChannel

`any`

The message channel (MessageChannel) that triggered the event.

##### data?

`any`

The data associated with the event.

#### Returns

`MessageChannelEvent`

#### Overrides

[`Event`](Event.md).[`constructor`](Event.md#constructor)

## Accessors

### data

#### Get Signature

> **get** **data**(): `any`

Get the data associated with the event.

##### Returns

`any`

#### Inherited from

[`Event`](Event.md).[`data`](Event.md#data)

***

### messageChannel

#### Get Signature

> **get** **messageChannel**(): `any`

Get the message channel (MessageChannel) that triggered the event.

##### Returns

`any`

***

### type

#### Get Signature

> **get** **type**(): `string`

Get the type of event.

##### Returns

`string`

#### Inherited from

[`Event`](Event.md).[`type`](Event.md#type)

### Source: `docs/api/classes/MessageTransportStateEvent.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / MessageTransportStateEvent

# Class: MessageTransportStateEvent

Event for a Message Transport (e.g., RTCDataChannel) State within the Red5 Pro WebRTC SDK.

## Extends

- [`Event`](Event.md)

## Constructors

### Constructor

> **new MessageTransportStateEvent**(`type`, `name`, `data?`): `MessageTransportStateEvent`

Constructor for a MessageTransportStateEvent.

#### Parameters

##### type

`string`

The type of event.

##### name

`any`

The name of the message transport.

##### data?

`any`

The data associated with the event.

#### Returns

`MessageTransportStateEvent`

#### Overrides

[`Event`](Event.md).[`constructor`](Event.md#constructor)

## Accessors

### data

#### Get Signature

> **get** **data**(): `any`

Get the data associated with the event.

##### Returns

`any`

#### Inherited from

[`Event`](Event.md).[`data`](Event.md#data)

***

### name

#### Get Signature

> **get** **name**(): `any`

Get the name of the message transport.

##### Returns

`any`

***

### type

#### Get Signature

> **get** **type**(): `string`

Get the type of event.

##### Returns

`string`

#### Inherited from

[`Event`](Event.md).[`type`](Event.md#type)

### Source: `docs/api/classes/MOQCatalog.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / MOQCatalog

# Class: MOQCatalog

Base class for an Event Emitter.

## Extends

- [`EventEmitter`](EventEmitter.md)

## Constructors

### Constructor

> **new MOQCatalog**(`url?`, `additionalOptions?`): `MOQCatalog`

#### Parameters

##### url?

`string`

##### additionalOptions?

`MOQCatalogConfigType`

#### Returns

`MOQCatalog`

#### Overrides

[`EventEmitter`](EventEmitter.md).[`constructor`](EventEmitter.md#constructor)

## Methods

### \_generateConnection()

> **\_generateConnection**(`options`): `Promise`\<\{ `adapter`: `MoqtConnection`; `transport`: `WebTransportLike`; \}\>

#### Parameters

##### options

`MOQCatalogConfigType`

#### Returns

`Promise`\<\{ `adapter`: `MoqtConnection`; `transport`: `WebTransportLike`; \}\>

***

### fetch()

> **fetch**(`namespace?`, `fetchOptions?`): `Promise`\<`MOQCatalog`\>

#### Parameters

##### namespace?

`string`

##### fetchOptions?

###### endGroup

`number`

###### endObject

`number`

###### startGroup

`number`

###### startObject

`number`

#### Returns

`Promise`\<`MOQCatalog`\>

***

### getOptions()

> **getOptions**(): `MOQCatalogConfigType`

#### Returns

`MOQCatalogConfigType`

***

### init()

> **init**(`options`): `Promise`\<`MOQCatalog`\>

#### Parameters

##### options

`MOQCatalogConfigType`

#### Returns

`Promise`\<`MOQCatalog`\>

***

### off()

> **off**(`type`, `fn`): `void`

Remove a callback handler for an event type.

#### Parameters

##### type

`string`

##### fn

(`event`) => `void`

#### Returns

`void`

#### Inherited from

[`EventEmitter`](EventEmitter.md).[`off`](EventEmitter.md#off)

***

### on()

> **on**(`type`, `fn`): `void`

Assign a callback handler to an event type.

#### Parameters

##### type

`string`

##### fn

(`event`) => `void`

#### Returns

`void`

#### Inherited from

[`EventEmitter`](EventEmitter.md).[`on`](EventEmitter.md#on)

***

### subscribe()

> **subscribe**(`namespace?`): `Promise`\<`MOQCatalog`\>

#### Parameters

##### namespace?

`string`

#### Returns

`Promise`\<`MOQCatalog`\>

***

### trigger()

> **trigger**(`event`): `void`

Dispatch an event to be handled by any assigned callbacks.

#### Parameters

##### event

[`Event`](Event.md)

#### Returns

`void`

#### Inherited from

[`EventEmitter`](EventEmitter.md).[`trigger`](EventEmitter.md#trigger)

***

### unsubscribe()

> **unsubscribe**(`_internal?`): `Promise`\<`void`\>

#### Parameters

##### \_internal?

`boolean` = `false`

#### Returns

`Promise`\<`void`\>

### Source: `docs/api/classes/MOQPublisher.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / MOQPublisher

# Class: MOQPublisher

Base class for an Event Emitter.

## Extends

- [`EventEmitter`](EventEmitter.md)

## Constructors

### Constructor

> **new MOQPublisher**(`url?`, `element?`, `additionalOptions?`, `stream?`): `MOQPublisher`

#### Parameters

##### url?

`string`

##### element?

`HTMLElement`

##### additionalOptions?

`MOQPublisherConfigType`

##### stream?

`MediaStream`

#### Returns

`MOQPublisher`

#### Overrides

[`EventEmitter`](EventEmitter.md).[`constructor`](EventEmitter.md#constructor)

## Methods

### emit()

> **emit**(`type`, `data`): `void`

#### Parameters

##### type

`string`

##### data

`any`

#### Returns

`void`

***

### getOptions()

> **getOptions**(): `MOQPublisherConfigType`

#### Returns

`MOQPublisherConfigType`

***

### getType()

> **getType**(): `string`

#### Returns

`string`

***

### init()

> **init**(`options`): `Promise`\<`MOQPublisher`\>

#### Parameters

##### options

`MOQPublisherConfigType`

#### Returns

`Promise`\<`MOQPublisher`\>

***

### initWithStream()

> **initWithStream**(`options`, `stream?`): `Promise`\<`MOQPublisher`\>

#### Parameters

##### options

`MOQPublisherConfigType`

##### stream?

`MediaStream`

#### Returns

`Promise`\<`MOQPublisher`\>

***

### monitorStats()

> **monitorStats**(`stats?`): `MOQPublisher`

#### Parameters

##### stats?

[`StatsConfig`](../type-aliases/StatsConfig.md)

#### Returns

`MOQPublisher`

***

### off()

> **off**(`type`, `fn`): `void`

Remove a callback handler for an event type.

#### Parameters

##### type

`string`

##### fn

(`event`) => `void`

#### Returns

`void`

#### Inherited from

[`EventEmitter`](EventEmitter.md).[`off`](EventEmitter.md#off)

***

### on()

> **on**(`type`, `fn`): `void`

Assign a callback handler to an event type.

#### Parameters

##### type

`string`

##### fn

(`event`) => `void`

#### Returns

`void`

#### Inherited from

[`EventEmitter`](EventEmitter.md).[`on`](EventEmitter.md#on)

***

### preview()

> **preview**(`mediaStream`): `void`

#### Parameters

##### mediaStream

`MediaStream`

#### Returns

`void`

***

### publish()

> **publish**(`streamName?`): `Promise`\<`MOQPublisher`\>

#### Parameters

##### streamName?

`string`

#### Returns

`Promise`\<`MOQPublisher`\>

***

### trigger()

> **trigger**(`event`): `void`

Dispatch an event to be handled by any assigned callbacks.

#### Parameters

##### event

[`Event`](Event.md)

#### Returns

`void`

#### Inherited from

[`EventEmitter`](EventEmitter.md).[`trigger`](EventEmitter.md#trigger)

***

### unmonitorStats()

> **unmonitorStats**(): `MOQPublisher`

#### Returns

`MOQPublisher`

***

### unpreview()

> **unpreview**(): `void`

#### Returns

`void`

***

### unpublish()

> **unpublish**(`_internal?`): `Promise`\<`MOQPublisher`\>

#### Parameters

##### \_internal?

`boolean` = `false`

#### Returns

`Promise`\<`MOQPublisher`\>

### Source: `docs/api/classes/MOQSubscriber.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / MOQSubscriber

# Class: MOQSubscriber

Base class for an Event Emitter.

## Extends

- [`EventEmitter`](EventEmitter.md)

## Constructors

### Constructor

> **new MOQSubscriber**(`url?`, `element?`, `additionalOptions?`): `MOQSubscriber`

#### Parameters

##### url?

`string`

##### element?

`HTMLElement`

##### additionalOptions?

`MOQSubscriberConfigType`

#### Returns

`MOQSubscriber`

#### Overrides

[`EventEmitter`](EventEmitter.md).[`constructor`](EventEmitter.md#constructor)

## Methods

### emit()

> **emit**(`type`, `data`): `void`

#### Parameters

##### type

`string`

##### data

`any`

#### Returns

`void`

***

### getOptions()

> **getOptions**(): `MOQSubscriberConfigType`

#### Returns

`MOQSubscriberConfigType`

***

### getPlayer()

> **getPlayer**(): `MoqtPlayer` \| `undefined`

#### Returns

`MoqtPlayer` \| `undefined`

***

### getRendererView()

> **getRendererView**(): `HTMLVideoElement` \| `HTMLCanvasElement` \| `undefined`

#### Returns

`HTMLVideoElement` \| `HTMLCanvasElement` \| `undefined`

***

### getType()

> **getType**(): `string`

#### Returns

`string`

***

### init()

> **init**(`options`): `Promise`\<`MOQSubscriber`\>

#### Parameters

##### options

`MOQSubscriberConfigType`

#### Returns

`Promise`\<`MOQSubscriber`\>

***

### initWithAudioContext()

> **initWithAudioContext**(`options`, `audioCtx`): `Promise`\<`MOQSubscriber`\>

#### Parameters

##### options

`MOQSubscriberConfigType`

##### audioCtx

`AudioContext`

#### Returns

`Promise`\<`MOQSubscriber`\>

***

### monitorStats()

> **monitorStats**(`stats?`): `MOQSubscriber`

#### Parameters

##### stats?

[`StatsConfig`](../type-aliases/StatsConfig.md)

#### Returns

`MOQSubscriber`

***

### mute()

> **mute**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

***

### off()

> **off**(`type`, `fn`): `void`

Remove a callback handler for an event type.

#### Parameters

##### type

`string`

##### fn

(`event`) => `void`

#### Returns

`void`

#### Inherited from

[`EventEmitter`](EventEmitter.md).[`off`](EventEmitter.md#off)

***

### on()

> **on**(`type`, `fn`): `void`

Assign a callback handler to an event type.

#### Parameters

##### type

`string`

##### fn

(`event`) => `void`

#### Returns

`void`

#### Inherited from

[`EventEmitter`](EventEmitter.md).[`on`](EventEmitter.md#on)

***

### pause()

> **pause**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

***

### play()

> **play**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

***

### resume()

> **resume**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

***

### resumeAudio()

> **resumeAudio**(): `Promise`\<`void`\>

Resume the AudioContext after a user gesture.
Call from a click/tap/keydown handler when `MOQ.Audio.Blocked` fires.

#### Returns

`Promise`\<`void`\>

***

### selectAudioTrack()

> **selectAudioTrack**(`trackName`, `autoQualityResume?`): `Promise`\<`void`\>

#### Parameters

##### trackName

`string`

##### autoQualityResume?

`boolean` = `true`

#### Returns

`Promise`\<`void`\>

***

### selectVideoTrack()

> **selectVideoTrack**(`trackName`, `autoQualityResume?`): `Promise`\<`void`\>

#### Parameters

##### trackName

`string`

##### autoQualityResume?

`boolean` = `true`

#### Returns

`Promise`\<`void`\>

***

### setVolume()

> **setVolume**(`value`): `Promise`\<`void`\>

#### Parameters

##### value

`number`

#### Returns

`Promise`\<`void`\>

***

### stop()

> **stop**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

***

### subscribe()

> **subscribe**(): `Promise`\<`MOQSubscriber`\>

#### Returns

`Promise`\<`MOQSubscriber`\>

***

### trigger()

> **trigger**(`event`): `void`

Dispatch an event to be handled by any assigned callbacks.

#### Parameters

##### event

[`Event`](Event.md)

#### Returns

`void`

#### Inherited from

[`EventEmitter`](EventEmitter.md).[`trigger`](EventEmitter.md#trigger)

***

### unmonitorStats()

> **unmonitorStats**(): `MOQSubscriber`

#### Returns

`MOQSubscriber`

***

### unmute()

> **unmute**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

***

### unsubscribe()

> **unsubscribe**(`_internal?`): `Promise`\<`MOQSubscriber`\>

#### Parameters

##### \_internal?

`boolean` = `false`

#### Returns

`Promise`\<`MOQSubscriber`\>

### Source: `docs/api/classes/PlaybackController.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / PlaybackController

# Abstract Class: PlaybackController

Base class for a PlaybackController within the Red5 Pro WebRTC SDK.
A PlaybackController is responsible for managing the playback and state of a media element.

## Extends

- [`EventEmitter`](EventEmitter.md)

## Extended by

- [`WHEPClient`](WHEPClient.md)
- [`HLSSubscriber`](HLSSubscriber.md)
- [`SourceHandler`](SourceHandler.md)

## Constructors

### Constructor

> **new PlaybackController**(): `PlaybackController`

#### Returns

`PlaybackController`

#### Inherited from

[`EventEmitter`](EventEmitter.md).[`constructor`](EventEmitter.md#constructor)

## Methods

### getVolume()

> `abstract` **getVolume**(): `number`

Get the volume of the media element.

#### Returns

`number`

***

### mute()

> `abstract` **mute**(): `void`

Mute the media element.

#### Returns

`void`

***

### off()

> **off**(`event`, `fn`): `void`

Remove an event listener from the PlaybackController.

#### Parameters

##### event

`string`

The event to remove the listener from.

##### fn

(...`args`) => `void`

The function to remove the listener from.

#### Returns

`void`

#### Overrides

[`EventEmitter`](EventEmitter.md).[`off`](EventEmitter.md#off)

***

### on()

> **on**(`event`, `fn`): `void`

Add an event listener to the PlaybackController.

#### Parameters

##### event

`string`

The event to listen for.

##### fn

(...`args`) => `void`

The function to call when the event is triggered.

#### Returns

`void`

#### Overrides

[`EventEmitter`](EventEmitter.md).[`on`](EventEmitter.md#on)

***

### pause()

> `abstract` **pause**(`fromControls?`, `fromSeekAction?`): `void`

Pause the media element.

#### Parameters

##### fromControls?

`boolean`

Whether the pause was triggered from the controls.

##### fromSeekAction?

`boolean`

Whether the pause was triggered from a seek action.

#### Returns

`void`

***

### play()

> `abstract` **play**(`fromControls?`): `void`

Play the media element.

#### Parameters

##### fromControls?

`boolean`

Whether the play was triggered from the controls.

#### Returns

`void`

***

### resume()

> `abstract` **resume**(`fromControls?`, `fromSeekAction?`): `void`

Resume the media element.

#### Parameters

##### fromControls?

`boolean`

Whether the resume was triggered from the controls.

##### fromSeekAction?

`boolean`

Whether the resume was triggered from a seek action.

#### Returns

`void`

***

### seekTo()

> `abstract` **seekTo**(`value`, `duration?`, `fromControls?`): `void`

Seek to a specific time in the media element.

#### Parameters

##### value

`number`

The time to seek to.

##### duration?

`number`

The duration of the media element.

##### fromControls?

`boolean`

Whether the seek was triggered from the controls.

#### Returns

`void`

***

### setVolume()

> `abstract` **setVolume**(`value`, `fromControls?`): `void`

Set the volume of the media element.

#### Parameters

##### value

`number`

The volume to set.

##### fromControls?

`boolean`

Whether the volume was triggered from the controls.

#### Returns

`void`

***

### stop()

> `abstract` **stop**(`fromControls?`): `void`

#### Parameters

##### fromControls?

`boolean`

#### Returns

`void`

***

### toggleFullScreen()

> `abstract` **toggleFullScreen**(`element?`, `fromControls?`): `void`

Toggle the full screen mode of the media element.

#### Parameters

##### element?

`HTMLElement`

The element to toggle the full screen mode of.

##### fromControls?

`boolean`

Whether the full screen was triggered from the controls.

#### Returns

`void`

***

### trigger()

> **trigger**(`event`): `void`

Trigger an event on the PlaybackController.

#### Parameters

##### event

[`Event`](Event.md)

The event to trigger.

#### Returns

`void`

#### Overrides

[`EventEmitter`](EventEmitter.md).[`trigger`](EventEmitter.md#trigger)

***

### unmute()

> `abstract` **unmute**(): `void`

Unmute the media element.

#### Returns

`void`

### Source: `docs/api/classes/PlaybackControls.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / PlaybackControls

# Abstract Class: PlaybackControls

Base class for a PlaybackControls within the Red5 Pro WebRTC SDK.
A PlaybackControls is responsible for managing the playback and state of an HTML media element through UI controls.

## Extends

- [`EventEmitter`](EventEmitter.md)

## Constructors

### Constructor

> **new PlaybackControls**(): `PlaybackControls`

#### Returns

`PlaybackControls`

#### Inherited from

[`EventEmitter`](EventEmitter.md).[`constructor`](EventEmitter.md#constructor)

## Methods

### detach()

> `abstract` **detach**(): `void`

Detach the playback controls from the media element.

#### Returns

`void`

***

### enable()

> `abstract` **enable**(`enable`): `void`

Enable or disable the playback controls.

#### Parameters

##### enable

`boolean`

Whether the playback controls are enabled.

#### Returns

`void`

***

### getPlaybackDuration()

> `abstract` **getPlaybackDuration**(): `number`

Get the playback duration of the media element.

#### Returns

`number`

***

### getVolume()

> `abstract` **getVolume**(): `number`

Get the volume of the media element.

#### Returns

`number`

***

### off()

> **off**(`type`, `fn`): `void`

Remove an event listener from the PlaybackControls.

#### Parameters

##### type

`string`

The type of event to remove the listener from.

##### fn

(...`args`) => `void`

The function to remove the listener from.

#### Returns

`void`

#### Overrides

[`EventEmitter`](EventEmitter.md).[`off`](EventEmitter.md#off)

***

### on()

> **on**(`type`, `fn`): `void`

Add an event listener to the PlaybackControls.

#### Parameters

##### type

`string`

The type of event to listen for.

##### fn

(...`args`) => `void`

The function to call when the event is triggered.

#### Returns

`void`

#### Overrides

[`EventEmitter`](EventEmitter.md).[`on`](EventEmitter.md#on)

***

### setAsVOD()

> `abstract` **setAsVOD**(`isVOD`): `void`

Set the VOD state of the media element.

#### Parameters

##### isVOD

`boolean`

Whether the media element is a VOD.

#### Returns

`void`

***

### setMutedState()

> `abstract` **setMutedState**(`muted`): `void`

Set the muted state of the media element.

#### Parameters

##### muted

`boolean`

Whether the media element is muted.

#### Returns

`void`

***

### setPlaybackDuration()

> `abstract` **setPlaybackDuration**(`duration`): `void`

Set the playback duration of the media element.

#### Parameters

##### duration

`number`

The duration to set.

#### Returns

`void`

***

### setSeekTime()

> `abstract` **setSeekTime**(`time`, `duration?`): `void`

Set the seek time of the media element.

#### Parameters

##### time

`number`

The time to seek to.

##### duration?

`number`

The duration of the media element.

#### Returns

`void`

***

### setState()

> `abstract` **setState**(`state`): `void`

Set the state of the media element.

#### Parameters

##### state

[`PlaybackState`](../enumerations/PlaybackState.md)

The state to set.

#### Returns

`void`

***

### setVolume()

> `abstract` **setVolume**(`volume`): `void`

Set the volume of the media element.

#### Parameters

##### volume

`number`

The volume to set.

#### Returns

`void`

***

### trigger()

> **trigger**(`event`): `void`

Trigger an event on the PlaybackControls.

#### Parameters

##### event

[`Event`](Event.md)

The event to trigger.

#### Returns

`void`

#### Overrides

[`EventEmitter`](EventEmitter.md).[`trigger`](EventEmitter.md#trigger)

### Source: `docs/api/classes/PublisherEvent.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / PublisherEvent

# Class: PublisherEvent

Event for a Publisher within the Red5 Pro WebRTC SDK.

## Extends

- [`Event`](Event.md)

## Constructors

### Constructor

> **new PublisherEvent**(`type`, `publisher`, `data?`): `PublisherEvent`

Constructor for a PublisherEvent.

#### Parameters

##### type

`string`

The type of event.

##### publisher

`any`

The publisher (WHIPClient) that triggered the event.

##### data?

`any`

The data associated with the event.

#### Returns

`PublisherEvent`

#### Overrides

[`Event`](Event.md).[`constructor`](Event.md#constructor)

## Accessors

### data

#### Get Signature

> **get** **data**(): `any`

Get the data associated with the event.

##### Returns

`any`

#### Inherited from

[`Event`](Event.md).[`data`](Event.md#data)

***

### publisher

#### Get Signature

> **get** **publisher**(): `any`

Get the publisher (WHIPClient) that triggered the event.

##### Returns

`any`

***

### type

#### Get Signature

> **get** **type**(): `string`

Get the type of event.

##### Returns

`string`

#### Inherited from

[`Event`](Event.md).[`type`](Event.md#type)

### Source: `docs/api/classes/PubNubClient.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / PubNubClient

# Class: PubNubClient

Base class for an Event Emitter.

## Extends

- [`EventEmitter`](EventEmitter.md)

## Constructors

### Constructor

> **new PubNubClient**(): `PubNubClient`

#### Returns

`PubNubClient`

#### Overrides

[`EventEmitter`](EventEmitter.md).[`constructor`](EventEmitter.md#constructor)

## Accessors

### config

#### Get Signature

> **get** **config**(): `PubnubConfigType` \| `undefined`

##### Returns

`PubnubConfigType` \| `undefined`

***

### pubnub

#### Get Signature

> **get** **pubnub**(): `any`

##### Returns

`any`

## Methods

### destroy()

> **destroy**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

***

### getOptions()

> **getOptions**(): `PubnubConfigType` \| `undefined`

#### Returns

`PubnubConfigType` \| `undefined`

***

### init()

> **init**(`config`): `Promise`\<`PubNubClient`\>

#### Parameters

##### config

`any`

#### Returns

`Promise`\<`PubNubClient`\>

***

### off()

> **off**(`type`, `fn`): `void`

Remove a callback handler for an event type.

#### Parameters

##### type

`string`

##### fn

(`event`) => `void`

#### Returns

`void`

#### Inherited from

[`EventEmitter`](EventEmitter.md).[`off`](EventEmitter.md#off)

***

### on()

> **on**(`type`, `fn`): `void`

Assign a callback handler to an event type.

#### Parameters

##### type

`string`

##### fn

(`event`) => `void`

#### Returns

`void`

#### Inherited from

[`EventEmitter`](EventEmitter.md).[`on`](EventEmitter.md#on)

***

### publishMessage()

> **publishMessage**(`channel`, `message`): `Promise`\<`boolean`\>

#### Parameters

##### channel

`string`

##### message

`any`

#### Returns

`Promise`\<`boolean`\>

***

### subscribe()

> **subscribe**(`channel`, `options`): `Promise`\<`boolean`\>

#### Parameters

##### channel

`string`

##### options

`any`

#### Returns

`Promise`\<`boolean`\>

***

### trigger()

> **trigger**(`event`): `void`

Dispatch an event to be handled by any assigned callbacks.

#### Parameters

##### event

[`Event`](Event.md)

#### Returns

`void`

#### Inherited from

[`EventEmitter`](EventEmitter.md).[`trigger`](EventEmitter.md#trigger)

***

### unsubscribe()

> **unsubscribe**(`channel`): `Promise`\<`boolean`\>

#### Parameters

##### channel

`string`

#### Returns

`Promise`\<`boolean`\>

### Source: `docs/api/classes/PubNubEvent.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / PubNubEvent

# Class: PubNubEvent

Event for a PubNub within the Red5 Pro WebRTC SDK.

## Extends

- [`Event`](Event.md)

## Constructors

### Constructor

> **new PubNubEvent**(`type`, `pubnub`, `data?`): `PubNubEvent`

Constructor for a PubNubEvent.

#### Parameters

##### type

`string`

The type of event.

##### pubnub

`any`

The pubnub (PubNubClient) that triggered the event.

##### data?

`any`

The data associated with the event.

#### Returns

`PubNubEvent`

#### Overrides

[`Event`](Event.md).[`constructor`](Event.md#constructor)

## Accessors

### data

#### Get Signature

> **get** **data**(): `any`

Get the data associated with the event.

##### Returns

`any`

#### Inherited from

[`Event`](Event.md).[`data`](Event.md#data)

***

### pubnub

#### Get Signature

> **get** **pubnub**(): `any`

Get the pubnub (PubNubClient) that triggered the event.

##### Returns

`any`

***

### type

#### Get Signature

> **get** **type**(): `string`

Get the type of event.

##### Returns

`string`

#### Inherited from

[`Event`](Event.md).[`type`](Event.md#type)

### Source: `docs/api/classes/SourceHandler.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / SourceHandler

# Abstract Class: SourceHandler

Base class for a SourceHandler within the Red5 Pro WebRTC SDK.
A SourceHandler is responsible for managing the MediaStream source of a media element.

## Extends

- [`PlaybackController`](PlaybackController.md)

## Extended by

- [`SourceHandlerImpl`](SourceHandlerImpl.md)

## Constructors

### Constructor

> **new SourceHandler**(): `SourceHandler`

#### Returns

`SourceHandler`

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`constructor`](PlaybackController.md#constructor)

## Methods

### attemptAutoplay()

> `abstract` **attemptAutoplay**(`muteOnAutoplay`): `void`

Attempt to autoplay the media element.

#### Parameters

##### muteOnAutoplay

`boolean`

Whether to mute the media element on autoplay if the browser has a restriction.

#### Returns

`void`

***

### disconnect()

> `abstract` **disconnect**(): `void`

Disconnect the media element.

#### Returns

`void`

***

### getControls()

> `abstract` **getControls**(): [`PlaybackControls`](PlaybackControls.md) \| `undefined`

Get the controls for the media element.

#### Returns

[`PlaybackControls`](PlaybackControls.md) \| `undefined`

***

### getVolume()

> `abstract` **getVolume**(): `number`

Get the volume of the media element.

#### Returns

`number`

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`getVolume`](PlaybackController.md#getvolume)

***

### isMuted()

> `abstract` **isMuted**(): `boolean`

Check if the media element is muted.

#### Returns

`boolean`

***

### mute()

> `abstract` **mute**(): `void`

Mute the media element.

#### Returns

`void`

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`mute`](PlaybackController.md#mute)

***

### off()

> **off**(`event`, `fn`): `void`

Remove an event listener from the PlaybackController.

#### Parameters

##### event

`string`

The event to remove the listener from.

##### fn

(...`args`) => `void`

The function to remove the listener from.

#### Returns

`void`

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`off`](PlaybackController.md#off)

***

### on()

> **on**(`event`, `fn`): `void`

Add an event listener to the PlaybackController.

#### Parameters

##### event

`string`

The event to listen for.

##### fn

(...`args`) => `void`

The function to call when the event is triggered.

#### Returns

`void`

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`on`](PlaybackController.md#on)

***

### pause()

> `abstract` **pause**(`fromControls?`, `fromSeekAction?`): `void`

Pause the media element.

#### Parameters

##### fromControls?

`boolean`

Whether the pause was triggered from the controls.

##### fromSeekAction?

`boolean`

Whether the pause was triggered from a seek action.

#### Returns

`void`

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`pause`](PlaybackController.md#pause)

***

### play()

> `abstract` **play**(`fromControls?`): `void`

Play the media element.

#### Parameters

##### fromControls?

`boolean`

Whether the play was triggered from the controls.

#### Returns

`void`

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`play`](PlaybackController.md#play)

***

### resume()

> `abstract` **resume**(`fromControls?`, `fromSeekAction?`): `void`

Resume the media element.

#### Parameters

##### fromControls?

`boolean`

Whether the resume was triggered from the controls.

##### fromSeekAction?

`boolean`

Whether the resume was triggered from a seek action.

#### Returns

`void`

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`resume`](PlaybackController.md#resume)

***

### seekTo()

> `abstract` **seekTo**(`value`, `duration?`, `fromControls?`): `void`

Seek to a specific time in the media element.

#### Parameters

##### value

`number`

The time to seek to.

##### duration?

`number`

The duration of the media element.

##### fromControls?

`boolean`

Whether the seek was triggered from the controls.

#### Returns

`void`

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`seekTo`](PlaybackController.md#seekto)

***

### setVolume()

> `abstract` **setVolume**(`value`, `fromControls?`): `void`

Set the volume of the media element.

#### Parameters

##### value

`number`

The volume to set.

##### fromControls?

`boolean`

Whether the volume was triggered from the controls.

#### Returns

`void`

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`setVolume`](PlaybackController.md#setvolume)

***

### stop()

> `abstract` **stop**(`fromControls?`): `void`

#### Parameters

##### fromControls?

`boolean`

#### Returns

`void`

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`stop`](PlaybackController.md#stop)

***

### toggleFullScreen()

> `abstract` **toggleFullScreen**(`element?`, `fromControls?`): `void`

Toggle the full screen mode of the media element.

#### Parameters

##### element?

`HTMLElement`

The element to toggle the full screen mode of.

##### fromControls?

`boolean`

Whether the full screen was triggered from the controls.

#### Returns

`void`

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`toggleFullScreen`](PlaybackController.md#togglefullscreen)

***

### trigger()

> **trigger**(`event`): `void`

Trigger an event on the PlaybackController.

#### Parameters

##### event

[`Event`](Event.md)

The event to trigger.

#### Returns

`void`

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`trigger`](PlaybackController.md#trigger)

***

### unmute()

> `abstract` **unmute**(): `void`

Unmute the media element.

#### Returns

`void`

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`unmute`](PlaybackController.md#unmute)

***

### unpublish()

> `abstract` **unpublish**(): `void`

Unpublish the media element.

#### Returns

`void`

### Source: `docs/api/classes/SourceHandlerImpl.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / SourceHandlerImpl

# Class: SourceHandlerImpl

A base implementation of the SourceHandler class.

## Extends

- [`SourceHandler`](SourceHandler.md)

## Constructors

### Constructor

> **new SourceHandlerImpl**(`view`, `type`): `SourceHandlerImpl`

Constructor for the SourceHandlerImpl class.

#### Parameters

##### view

`HTMLMediaElement`

The HTML media element to manage.

##### type

`string`

The type of the source handler.

#### Returns

`SourceHandlerImpl`

#### Overrides

[`SourceHandler`](SourceHandler.md).[`constructor`](SourceHandler.md#constructor)

## Methods

### attemptAutoplay()

> **attemptAutoplay**(`muteOnAutoplay?`): `Promise`\<`void`\>

Attempt to autoplay the media element.

#### Parameters

##### muteOnAutoplay?

`boolean` = `false`

Whether to mute the media element on autoplay if the browser has a restriction.

#### Returns

`Promise`\<`void`\>

#### Overrides

[`SourceHandler`](SourceHandler.md).[`attemptAutoplay`](SourceHandler.md#attemptautoplay)

***

### disconnect()

> **disconnect**(): `void`

Disconnect the media element.

#### Returns

`void`

#### Overrides

[`SourceHandler`](SourceHandler.md).[`disconnect`](SourceHandler.md#disconnect)

***

### getControls()

> **getControls**(): [`PlaybackControls`](PlaybackControls.md) \| `undefined`

Get the controls for the media element.

#### Returns

[`PlaybackControls`](PlaybackControls.md) \| `undefined`

#### Overrides

[`SourceHandler`](SourceHandler.md).[`getControls`](SourceHandler.md#getcontrols)

***

### getVolume()

> **getVolume**(): `number`

Get the volume of the media element.

#### Returns

`number`

#### Overrides

[`SourceHandler`](SourceHandler.md).[`getVolume`](SourceHandler.md#getvolume)

***

### isMuted()

> **isMuted**(): `boolean`

Check if the media element is muted.

#### Returns

`boolean`

#### Overrides

[`SourceHandler`](SourceHandler.md).[`isMuted`](SourceHandler.md#ismuted)

***

### isVOD()

> **isVOD**(): `boolean`

#### Returns

`boolean`

***

### mute()

> **mute**(): `void`

Mute the media element.

#### Returns

`void`

#### Overrides

[`SourceHandler`](SourceHandler.md).[`mute`](SourceHandler.md#mute)

***

### off()

> **off**(`event`, `fn`): `void`

Remove an event listener from the PlaybackController.

#### Parameters

##### event

`string`

The event to remove the listener from.

##### fn

(...`args`) => `void`

The function to remove the listener from.

#### Returns

`void`

#### Inherited from

[`SourceHandler`](SourceHandler.md).[`off`](SourceHandler.md#off)

***

### on()

> **on**(`event`, `fn`): `void`

Add an event listener to the PlaybackController.

#### Parameters

##### event

`string`

The event to listen for.

##### fn

(...`args`) => `void`

The function to call when the event is triggered.

#### Returns

`void`

#### Inherited from

[`SourceHandler`](SourceHandler.md).[`on`](SourceHandler.md#on)

***

### pause()

> **pause**(): `Promise`\<`boolean`\>

Pause the media element.

#### Returns

`Promise`\<`boolean`\>

#### Overrides

[`SourceHandler`](SourceHandler.md).[`pause`](SourceHandler.md#pause)

***

### play()

> **play**(): `Promise`\<`boolean`\>

Play the media element.

#### Returns

`Promise`\<`boolean`\>

#### Overrides

[`SourceHandler`](SourceHandler.md).[`play`](SourceHandler.md#play)

***

### resume()

> **resume**(): `Promise`\<`boolean`\>

Resume the media element.

#### Returns

`Promise`\<`boolean`\>

#### Overrides

[`SourceHandler`](SourceHandler.md).[`resume`](SourceHandler.md#resume)

***

### seekTo()

> **seekTo**(`percentage`, `duration?`): `void`

Seek to a specific time in the media element.

#### Parameters

##### percentage

`number`

##### duration?

`undefined` = `undefined`

The duration of the media element.

#### Returns

`void`

#### Overrides

[`SourceHandler`](SourceHandler.md).[`seekTo`](SourceHandler.md#seekto)

***

### setVolume()

> **setVolume**(`value`): `void`

Set the volume of the media element.

#### Parameters

##### value

`number`

The volume to set.

#### Returns

`void`

#### Overrides

[`SourceHandler`](SourceHandler.md).[`setVolume`](SourceHandler.md#setvolume)

***

### stop()

> **stop**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Overrides

[`SourceHandler`](SourceHandler.md).[`stop`](SourceHandler.md#stop)

***

### toggleFullScreen()

> **toggleFullScreen**(`element?`): `void`

Toggle the full screen mode of the media element.

#### Parameters

##### element?

`HTMLElement`

The element to toggle the full screen mode of.

#### Returns

`void`

#### Overrides

[`SourceHandler`](SourceHandler.md).[`toggleFullScreen`](SourceHandler.md#togglefullscreen)

***

### trigger()

> **trigger**(`event`): `void`

Trigger an event on the PlaybackController.

#### Parameters

##### event

[`Event`](Event.md)

The event to trigger.

#### Returns

`void`

#### Inherited from

[`SourceHandler`](SourceHandler.md).[`trigger`](SourceHandler.md#trigger)

***

### unmute()

> **unmute**(): `void`

Unmute the media element.

#### Returns

`void`

#### Overrides

[`SourceHandler`](SourceHandler.md).[`unmute`](SourceHandler.md#unmute)

***

### unpublish()

> **unpublish**(): `Promise`\<`void`\>

Unpublish the media element.

#### Returns

`Promise`\<`void`\>

#### Overrides

[`SourceHandler`](SourceHandler.md).[`unpublish`](SourceHandler.md#unpublish)

### Source: `docs/api/classes/SubscriberEvent.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / SubscriberEvent

# Class: SubscriberEvent

Event for a Subscriber within the Red5 Pro WebRTC SDK.

## Extends

- [`Event`](Event.md)

## Constructors

### Constructor

> **new SubscriberEvent**(`type`, `subscriber`, `data?`): `SubscriberEvent`

Constructor for a SubscriberEvent.

#### Parameters

##### type

`string`

The type of event.

##### subscriber

`any`

The subscriber (WHEPClient) that triggered the event.

##### data?

`any`

The data associated with the event.

#### Returns

`SubscriberEvent`

#### Overrides

[`Event`](Event.md).[`constructor`](Event.md#constructor)

## Accessors

### data

#### Get Signature

> **get** **data**(): `any`

Get the data associated with the event.

##### Returns

`any`

#### Inherited from

[`Event`](Event.md).[`data`](Event.md#data)

***

### subscriber

#### Get Signature

> **get** **subscriber**(): `any`

Get the subscriber (WHEPClient) that triggered the event.

##### Returns

`any`

***

### type

#### Get Signature

> **get** **type**(): `string`

Get the type of event.

##### Returns

`string`

#### Inherited from

[`Event`](Event.md).[`type`](Event.md#type)

### Source: `docs/api/classes/WHEPClient.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / WHEPClient

# Class: WHEPClient

WHEP-based Subscriber.

The `WHEPClient` - under the hood - is based on the [WebRTC-HTTP egress](https://www.ietf.org/archive/id/draft-ietf-wish-whep-03.html)(WHEP) protocol providing the ability to negotation and establish a connection using HTTP/S requests. This removes the requirement for a WebSocket, which historically has been used for the role of negotiation and connection.
This provides a standardized - and _blazingly fast_ - way to establish and playback a live stream using WebRTC.

## Extends

- [`PlaybackController`](PlaybackController.md)

## Extended by

- [`LiveSeekClient`](LiveSeekClient.md)

## Constructors

### Constructor

> **new WHEPClient**(`url?`, `element?`, `additionalOptions?`): `WHEPClient`

Constructor for the WHEP-based Subscriber.

#### Parameters

##### url?

`string`

Optional WHEP endpoint URL for the live stream.

##### element?

`HTMLMediaElement`

Optional HTMLMediaElement to use for live stream playback.

##### additionalOptions?

[`RTCWhepSubscriberConfigType`](../type-aliases/RTCWhepSubscriberConfigType.md)

Optional RTCWhepSubscriberConfigType to use for configuration.

#### Returns

`WHEPClient`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`constructor`](PlaybackController.md#constructor)

## Accessors

### options

#### Get Signature

> **get** **options**(): [`RTCWhepSubscriberConfigType`](../type-aliases/RTCWhepSubscriberConfigType.md) \| `undefined`

Get the options for the WHEP-based Subscriber.

##### Returns

[`RTCWhepSubscriberConfigType`](../type-aliases/RTCWhepSubscriberConfigType.md) \| `undefined`

## Methods

### callServer()

> **callServer**(`methodName`, `args`): `Promise`\<`any`\>

Call a method on the Red5 Pro Server over the message transport (DataChannel).

#### Parameters

##### methodName

`string`

The method name to call.

##### args

`any`

The arguments to call the method with.

#### Returns

`Promise`\<`any`\>

***

### disableStandby()

> **disableStandby**(): `void`

Disable standby mode for the WHEP-based Subscriber. This will signal to the server to resume audio and video.

#### Returns

`void`

***

### emit()

> **emit**(`type`, `data`): `void`

Emit an event on the WHEP-based Subscriber.

#### Parameters

##### type

`string`

The type of event to emit.

##### data

`any`

The data to emit.

#### Returns

`void`

***

### enableStandby()

> **enableStandby**(): `void`

Enable standby mode for the WHEP-based Subscriber. This will signal to the server to hold back audio and video.

#### Returns

`void`

***

### getDataChannel()

> **getDataChannel**(): `RTCDataChannel` \| `undefined`

Get the data channel for the WHEP-based Subscriber.

#### Returns

`RTCDataChannel` \| `undefined`

***

### getMediaStream()

> **getMediaStream**(): `MediaStream` \| `undefined`

Get the media stream being played back by the subscriber.

#### Returns

`MediaStream` \| `undefined`

***

### getMessageTransport()

> **getMessageTransport**(): `MessageTransport` \| `undefined`

Get the message transport for the WHEP-based Subscriber.

#### Returns

`MessageTransport` \| `undefined`

***

### getOptions()

> **getOptions**(): [`RTCWhepSubscriberConfigType`](../type-aliases/RTCWhepSubscriberConfigType.md) \| `undefined`

Get the options for the WHEP-based Subscriber.

#### Returns

[`RTCWhepSubscriberConfigType`](../type-aliases/RTCWhepSubscriberConfigType.md) \| `undefined`

***

### getPeerConnection()

> **getPeerConnection**(): `RTCPeerConnection` \| `undefined`

Get the peer connection for the WHEP-based Subscriber.

#### Returns

`RTCPeerConnection` \| `undefined`

***

### getPlayer()

> **getPlayer**(): `HTMLMediaElement` \| `undefined`

Get the media element for the WHEP-based Subscriber.

#### Returns

`HTMLMediaElement` \| `undefined`

***

### getPubNubClient()

> **getPubNubClient**(): [`PubNubClient`](PubNubClient.md) \| `undefined`

Get the PubNub client for the WHEP-based Subscriber.

#### Returns

[`PubNubClient`](PubNubClient.md) \| `undefined`

***

### getType()

> **getType**(): `string`

Get the type of the WHEP-based Subscriber (RTC).

#### Returns

`string`

***

### getVolume()

> **getVolume**(): `number`

Get the volume of the media being delivered to the subscriber.

#### Returns

`number`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`getVolume`](PlaybackController.md#getvolume)

***

### init()

> **init**(`options`): `Promise`\<`WHEPClient`\>

Initialize the WHEP-based Subscriber.

#### Parameters

##### options

[`RTCWhepSubscriberConfigType`](../type-aliases/RTCWhepSubscriberConfigType.md)

RTCWhepSubscriberConfigType to use for configuration.

#### Returns

`Promise`\<`WHEPClient`\>

***

### monitorStats()

> **monitorStats**(`stats?`, `renegotiationPolicy?`): `WHEPClient`

Monitor the statistics of the media being delivered to the subscriber over the underlying RTCPeerConnection.

#### Parameters

##### stats?

[`StatsConfig`](../type-aliases/StatsConfig.md)

The statistics configuration.

##### renegotiationPolicy?

`RenegotiationPolicyType`

The renegotiation policy configuration.

#### Returns

`WHEPClient`

***

### mute()

> **mute**(): `void`

Mute the audio playback on the media being delivered to the subscriber.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`mute`](PlaybackController.md#mute)

***

### muteAudio()

> **muteAudio**(): `void`

Mute the audio being delivered to the subscriber.

#### Returns

`void`

***

### muteVideo()

> **muteVideo**(): `void`

Mute the video being delivered to the subscriber.

#### Returns

`void`

***

### off()

> **off**(`type`, `fn`): `void`

Remove an event listener from the WHEP-based Subscriber.

#### Parameters

##### type

`string`

The type of event to listen for.

##### fn

(`event`) => `void`

The function to call when the event is triggered.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`off`](PlaybackController.md#off)

***

### on()

> **on**(`type`, `fn`): `void`

Add an event listener to the WHEP-based Subscriber.

#### Parameters

##### type

`string`

The type of event to listen for.

##### fn

(`event`) => `void`

The function to call when the event is triggered.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`on`](PlaybackController.md#on)

***

### pause()

> **pause**(): `void`

Pause the media being delivered to the subscriber.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`pause`](PlaybackController.md#pause)

***

### play()

> **play**(): `void`

Play the media being delivered to the subscriber.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`play`](PlaybackController.md#play)

***

### resume()

> **resume**(): `void`

Resume the media being delivered to the subscriber.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`resume`](PlaybackController.md#resume)

***

### seekTo()

> **seekTo**(`time`): `void`

Seek to a specific time in the media being delivered to the subscriber.

#### Parameters

##### time

`number`

The time to seek to.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`seekTo`](PlaybackController.md#seekto)

***

### send()

> **send**(`methodName`, `data`): `Promise`\<`boolean` \| `undefined`\>

Send a message to the Red5 Pro Server over the message transport (DataChannel).

#### Parameters

##### methodName

`string`

The method name to send.

##### data

`any`

The data to send.

#### Returns

`Promise`\<`boolean` \| `undefined`\>

***

### sendLog()

> **sendLog**(`level`, `message`): `void`

Send a log message to the Red5 Pro Server over the message transport (DataChannel).

#### Parameters

##### level

`string`

The level of the log message.

##### message

`any`

The message to send.

#### Returns

`void`

***

### sendPubNub()

> **sendPubNub**(`channel`, `message`): `Promise`\<`boolean`\>

Send a message to the PubNub channel.

#### Parameters

##### channel

`string`

The channel to send the message to.

##### message

`any`

The message to send.

#### Returns

`Promise`\<`boolean`\>

***

### setVolume()

> **setVolume**(`value`): `void`

Set the volume of the media being delivered to the subscriber.

#### Parameters

##### value

`number`

The volume to set.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`setVolume`](PlaybackController.md#setvolume)

***

### stop()

> **stop**(): `void`

Stop the media being delivered to the subscriber.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`stop`](PlaybackController.md#stop)

***

### subscribe()

> **subscribe**(): `Promise`\<`WHEPClient`\>

Subscribe to the WHEP-based Subscriber.

#### Returns

`Promise`\<`WHEPClient`\>

***

### subscribePubNub()

> **subscribePubNub**(`channel`, `options`): `Promise`\<`boolean`\>

Subscribe to a PubNub channel.

#### Parameters

##### channel

`string`

The channel to subscribe to.

##### options

`any`

The options to use for subscription.

#### Returns

`Promise`\<`boolean`\>

***

### toggleFullScreen()

> **toggleFullScreen**(): `void`

Toggle the full screen mode of the media being delivered to the subscriber.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`toggleFullScreen`](PlaybackController.md#togglefullscreen)

***

### trigger()

> **trigger**(`event`): `void`

Trigger an event on the WHEP-based Subscriber.

#### Parameters

##### event

[`Event`](Event.md)

The event to trigger.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`trigger`](PlaybackController.md#trigger)

***

### unmonitorStats()

> **unmonitorStats**(): `WHEPClient`

Unmonitor the statistics of the media being delivered to the subscriber over the underlying RTCPeerConnection.

#### Returns

`WHEPClient`

***

### unmute()

> **unmute**(): `void`

Unmute the audio playback on the media being delivered to the subscriber.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`unmute`](PlaybackController.md#unmute)

***

### unmuteAudio()

> **unmuteAudio**(): `void`

Unmute the audio being delivered to the subscriber.

#### Returns

`void`

***

### unmuteVideo()

> **unmuteVideo**(): `void`

Unmute the video being delivered to the subscriber.

#### Returns

`void`

***

### unsubscribe()

> **unsubscribe**(`internal?`): `Promise`\<`void`\>

Unsubscribe from the WHEP-based Subscriber.

#### Parameters

##### internal?

`boolean` = `false`

Optional boolean to indicate if the unsubscribe is internal.

#### Returns

`Promise`\<`void`\>

***

### unsubscribePubNub()

> **unsubscribePubNub**(`channel`): `Promise`\<`boolean`\>

Unsubscribe from a PubNub channel.

#### Parameters

##### channel

`string`

The channel to unsubscribe from.

#### Returns

`Promise`\<`boolean`\>

### Source: `docs/api/classes/WHIPClient.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / WHIPClient

# Class: WHIPClient

WHIP-based Publisher.

The `WHIPClient` - under the hood - is based on the [WebRTC-HTTP ingestion](https://www.ietf.org/archive/id/draft-ietf-wish-whip-01.html)(WHIP) protocol providing the ability to negotation and establish a connection using HTTP/S requests. This removes the requirement for a WebSocket, which historically has been used for the role of negotiation and connection.
This provides a standardized - and _blazingly fast_ - way to establish and publish a live stream using WebRTC.

## Extends

- [`EventEmitter`](EventEmitter.md)

## Extended by

- [`MessageChannel`](MessageChannel.md)

## Constructors

### Constructor

> **new WHIPClient**(`url?`, `element?`, `additionalOptions?`): `WHIPClient`

Constructor. Providing arguments will automatically kick of connection sequence.
Leaving arguments unset allows for more control and follows same pattern of init.

#### Parameters

##### url?

`string`

Optional endpoint for WHIP. Example: https://your-red5pro.com/live/whip/endpoint/stream1

##### element?

`HTMLMediaElement`

Optional media element to play media in.

##### additionalOptions?

[`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md)

Optional additional options to override defaults.

#### Returns

`WHIPClient`

#### Overrides

[`EventEmitter`](EventEmitter.md).[`constructor`](EventEmitter.md#constructor)

## Accessors

### options

#### Get Signature

> **get** **options**(): [`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md) \| `undefined`

Get the options for the WHIPClient.

##### Returns

[`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md) \| `undefined`

## Methods

### callServer()

> **callServer**(`methodName`, `args`): `Promise`\<`any`\>

Call a method on the server.

#### Parameters

##### methodName

`string`

The name of the method to call.

##### args

`any`

The arguments to call the method with.

#### Returns

`Promise`\<`any`\>

***

### emit()

> **emit**(`type`, `data`): `void`

Emit an event on the WHIPClient.

#### Parameters

##### type

`string`

The type of event to emit.

##### data

`any`

The data to emit.

#### Returns

`void`

***

### getDataChannel()

> **getDataChannel**(): `RTCDataChannel` \| `undefined`

Get the DataChannel for the WHIPClient.

#### Returns

`RTCDataChannel` \| `undefined`

***

### getMediaStream()

> **getMediaStream**(): `MediaStream` \| `undefined`

Get the MediaStream generated for the WHIPClient.

#### Returns

`MediaStream` \| `undefined`

***

### getMessageTransport()

> **getMessageTransport**(): `MessageTransport` \| `undefined`

Get the MessageTransport for the WHIPClient.

#### Returns

`MessageTransport` \| `undefined`

***

### getOptions()

> **getOptions**(): [`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md) \| `undefined`

Get the options for the WHIPClient.

#### Returns

[`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md) \| `undefined`

***

### getPeerConnection()

> **getPeerConnection**(): `RTCPeerConnection` \| `undefined`

Get the PeerConnection for the WHIPClient.

#### Returns

`RTCPeerConnection` \| `undefined`

***

### getPubNubClient()

> **getPubNubClient**(): [`PubNubClient`](PubNubClient.md) \| `undefined`

Get the PubNub client for the WHIPClient.

#### Returns

[`PubNubClient`](PubNubClient.md) \| `undefined`

***

### getType()

> **getType**(): `string`

Get the type of the WHIPClient (RTC).

#### Returns

`string`

***

### init()

> **init**(`options`): `Promise`\<`WHIPClient`\>

Initialize the WHIPClient.

#### Parameters

##### options

[`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md)

The options to use for initialization.

#### Returns

`Promise`\<`WHIPClient`\>

***

### initWithStream()

> **initWithStream**(`options`, `stream`): `Promise`\<`WHIPClient`\>

Initialize the WHIPClient with a MediaStream. Doing so will skip the SDK attempting to generate a MediaStream through browser-based media APIs.

#### Parameters

##### options

[`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md)

The options to use for initialization.

##### stream

`MediaStream`

The stream to use for initialization.

#### Returns

`Promise`\<`WHIPClient`\>

***

### monitorStats()

> **monitorStats**(`stats?`): `WHIPClient`

Monitor the statistics of the MediaStream being published to the server over the underlying RTCPeerConnection..

#### Parameters

##### stats?

[`StatsConfig`](../type-aliases/StatsConfig.md)

The statistics configuration.

#### Returns

`WHIPClient`

***

### muteAudio()

> **muteAudio**(): `void`

Mute the audio being published to the server.

#### Returns

`void`

***

### muteVideo()

> **muteVideo**(): `void`

Mute the video being published to the server.

#### Returns

`void`

***

### off()

> **off**(`type`, `fn`): `void`

Remove an event listener from the WHIPClient.

#### Parameters

##### type

`string`

The type of event to remove the listener from.

##### fn

(`event`) => `void`

The function to remove the listener from.

#### Returns

`void`

#### Overrides

[`EventEmitter`](EventEmitter.md).[`off`](EventEmitter.md#off)

***

### on()

> **on**(`type`, `fn`): `void`

Add an event listener to the WHIPClient.

#### Parameters

##### type

`string`

The type of event to listen for.

##### fn

(`event`) => `void`

The function to call when the event is triggered.

#### Returns

`void`

#### Overrides

[`EventEmitter`](EventEmitter.md).[`on`](EventEmitter.md#on)

***

### publish()

> **publish**(`streamName?`): `Promise`\<`WHIPClient`\>

Publish the MediaStream to the server.

#### Parameters

##### streamName?

`string`

The name of the stream to publish.

#### Returns

`Promise`\<`WHIPClient`\>

***

### send()

> **send**(`methodName`, `data`): `Promise`\<`boolean` \| `undefined`\>

Send a message to the server.

#### Parameters

##### methodName

`string`

The name of the method to send.

##### data

`any`

The data to send.

#### Returns

`Promise`\<`boolean` \| `undefined`\>

***

### sendLog()

> **sendLog**(`level`, `message`): `void`

Send a log message to the server.

#### Parameters

##### level

`string`

The level of the log message.

##### message

`any`

The message to send.

#### Returns

`void`

***

### sendPubNub()

> **sendPubNub**(`channel`, `message`): `Promise`\<`boolean`\>

Send a message to the PubNub channel.

#### Parameters

##### channel

`string`

The channel to send the message to.

##### message

`any`

The message to send.

#### Returns

`Promise`\<`boolean`\>

***

### subscribePubNub()

> **subscribePubNub**(`channel`, `options`): `Promise`\<`boolean`\>

Subscribe to a PubNub channel.

#### Parameters

##### channel

`string`

The channel to subscribe to.

##### options

`any`

The options to use for subscription.

#### Returns

`Promise`\<`boolean`\>

***

### trigger()

> **trigger**(`event`): `void`

Trigger an event on the WHIPClient.

#### Parameters

##### event

[`Event`](Event.md)

The event to trigger.

#### Returns

`void`

#### Overrides

[`EventEmitter`](EventEmitter.md).[`trigger`](EventEmitter.md#trigger)

***

### unmonitorStats()

> **unmonitorStats**(): `WHIPClient`

Unmonitor the statistics of the MediaStream being published to the server over the underlying RTCPeerConnection.

#### Returns

`WHIPClient`

***

### unmuteAudio()

> **unmuteAudio**(): `void`

Unmute the audio being published to the server.

#### Returns

`void`

***

### unmuteVideo()

> **unmuteVideo**(): `void`

Unmute the video being published to the server.

#### Returns

`void`

***

### unpublish()

> **unpublish**(`_internal?`, `_isReconnect?`): `Promise`\<`void`\>

Unpublish the MediaStream from the server.

#### Parameters

##### \_internal?

`boolean` = `false`

##### \_isReconnect?

`boolean` = `false`

#### Returns

`Promise`\<`void`\>

***

### unsubscribePubNub()

> **unsubscribePubNub**(`channel`): `Promise`\<`boolean`\>

Unsubscribe from a PubNub channel.

#### Parameters

##### channel

`string`

The channel to unsubscribe from.

#### Returns

`Promise`\<`boolean`\>

***

### updateOptimizationParams()

> **updateOptimizationParams**(`optimizationParams`): `void`

Update the optimization parameters for the published stream.

#### Parameters

##### optimizationParams

`OptimizationParams`

The optimization parameters to update.

#### Returns

`void`

### Source: `docs/api/enumerations/MessageChannelEventTypes.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / MessageChannelEventTypes

# Enumeration: MessageChannelEventTypes

## Enumeration Members

### CLOSE

> **CLOSE**: `"MessageChannel.Close"`

***

### ERROR

> **ERROR**: `"MessageChannel.Error"`

***

### FAIL

> **FAIL**: `"MessageChannel.Fail"`

***

### OPEN

> **OPEN**: `"MessageChannel.Open"`

***

### RECEIVE

> **RECEIVE**: `"MessageChannel.Receive"`

***

### SEND

> **SEND**: `"MessageChannel.Send"`

### Source: `docs/api/enumerations/MessageTransportStateEventTypes.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / MessageTransportStateEventTypes

# Enumeration: MessageTransportStateEventTypes

## Enumeration Members

### CHANGE

> **CHANGE**: `"MessageTransport.Change"`

***

### CLOSE

> **CLOSE**: `"MessageTransport.Close"`

***

### ERROR

> **ERROR**: `"MessageTransport.Error"`

***

### OPEN

> **OPEN**: `"MessageTransport.Open"`

### Source: `docs/api/enumerations/PlaybackAudioEncoder.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / PlaybackAudioEncoder

# Enumeration: PlaybackAudioEncoder

## Enumeration Members

### NONE

> **NONE**: `"NONE"`

***

### OPUS

> **OPUS**: `"OPUS"`

### Source: `docs/api/enumerations/PlaybackState.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / PlaybackState

# Enumeration: PlaybackState

## Enumeration Members

### AVAILABLE

> **AVAILABLE**: `0`

***

### IDLE

> **IDLE**: `1`

***

### PAUSED

> **PAUSED**: `3`

***

### PLAYING

> **PLAYING**: `2`

***

### UNAVAILABLE

> **UNAVAILABLE**: `1000`

### Source: `docs/api/enumerations/PlaybackVideoEncoder.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / PlaybackVideoEncoder

# Enumeration: PlaybackVideoEncoder

## Enumeration Members

### AV1

> **AV1**: `"AV1"`

***

### H264

> **H264**: `"H264"`

***

### H265

> **H265**: `"H265"`

***

### NONE

> **NONE**: `"NONE"`

***

### VP8

> **VP8**: `"VP8"`

### Source: `docs/api/enumerations/PublishAudioEncoder.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / PublishAudioEncoder

# Enumeration: PublishAudioEncoder

Enumeration of Audio Encoder types to request for Broadcast.

## Enumeration Members

### OPUS

> **OPUS**: `"OPUS"`

### Source: `docs/api/enumerations/PublisherEventTypes.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / PublisherEventTypes

# Enumeration: PublisherEventTypes

## Enumeration Members

### CONNECT\_FAILURE

> **CONNECT\_FAILURE**: `"Connect.Failure"`

***

### CONNECT\_SUCCESS

> **CONNECT\_SUCCESS**: `"Connect.Success"`

***

### CONNECTION\_CLOSED

> **CONNECTION\_CLOSED**: `"Publisher.Connection.Closed"`

***

### DIMENSION\_CHANGE

> **DIMENSION\_CHANGE**: `"Publisher.Video.DimensionChange"`

***

### PUBLISH\_AVAILABLE

> **PUBLISH\_AVAILABLE**: `"Publish.Available"`

***

### PUBLISH\_FAIL

> **PUBLISH\_FAIL**: `"Publish.Fail"`

***

### PUBLISH\_INSUFFICIENT\_BANDWIDTH

> **PUBLISH\_INSUFFICIENT\_BANDWIDTH**: `"Publish.InsufficientBW"`

***

### PUBLISH\_INVALID\_NAME

> **PUBLISH\_INVALID\_NAME**: `"Publish.InvalidName"`

***

### PUBLISH\_METADATA

> **PUBLISH\_METADATA**: `"Publish.Metadata"`

***

### PUBLISH\_RECOVERING\_BANDWIDTH

> **PUBLISH\_RECOVERING\_BANDWIDTH**: `"Publish.RecoveringBW"`

***

### PUBLISH\_SEND\_INVOKE

> **PUBLISH\_SEND\_INVOKE**: `"Publish.Send.Invoke"`

***

### PUBLISH\_START

> **PUBLISH\_START**: `"Publish.Start"`

***

### PUBLISH\_STATUS

> **PUBLISH\_STATUS**: `"Publish.Status"`

***

### PUBLISH\_SUFFICIENT\_BANDWIDTH

> **PUBLISH\_SUFFICIENT\_BANDWIDTH**: `"Publish.SufficientBW"`

***

### RECONNECT\_FAILURE

> **RECONNECT\_FAILURE**: `"Reconnect.Failure"`

***

### RECONNECT\_START

> **RECONNECT\_START**: `"Reconnect.Start"`

***

### RECONNECT\_SUCCESS

> **RECONNECT\_SUCCESS**: `"Reconnect.Success"`

***

### STATISTICS\_ENDPOINT\_CHANGE

> **STATISTICS\_ENDPOINT\_CHANGE**: `"Publisher.StatisticsEndpoint.Change"`

***

### UNPUBLISH\_SUCCESS

> **UNPUBLISH\_SUCCESS**: `"Unpublish.Success"`

### Source: `docs/api/enumerations/PublishVideoEncoder.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / PublishVideoEncoder

# Enumeration: PublishVideoEncoder

Enumeration of Video Encoder types to request for Broadcast.

## Enumeration Members

### AV1

> **AV1**: `"AV1"`

***

### H264

> **H264**: `"H264"`

***

### H265

> **H265**: `"H265"`

***

### VP8

> **VP8**: `"VP8"`

### Source: `docs/api/enumerations/PubNubEventTypes.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / PubNubEventTypes

# Enumeration: PubNubEventTypes

## Enumeration Members

### AUTH\_TOKEN\_GENERATED

> **AUTH\_TOKEN\_GENERATED**: `"PubNub.AuthToken.Generated"`

***

### AUTH\_TOKEN\_GENERATION\_ERROR

> **AUTH\_TOKEN\_GENERATION\_ERROR**: `"PubNub.AuthToken.Generation.Error"`

***

### CONNECTED

> **CONNECTED**: `"PubNub.Connected"`

***

### DISCONNECTED

> **DISCONNECTED**: `"PubNub.Disconnected"`

***

### ERROR

> **ERROR**: `"PubNub.Error"`

***

### MESSAGE\_RECEIVED

> **MESSAGE\_RECEIVED**: `"PubNub.Message.Received"`

***

### MESSAGE\_SEND\_FAILURE

> **MESSAGE\_SEND\_FAILURE**: `"PubNub.Message.Send.Failure"`

***

### MESSAGE\_SEND\_SUCCESS

> **MESSAGE\_SEND\_SUCCESS**: `"PubNub.Message.Send.Success"`

***

### STATUS

> **STATUS**: `"PubNub.Status"`

***

### SUBSCRIBE\_FAILURE

> **SUBSCRIBE\_FAILURE**: `"PubNub.Subscribe.Failure"`

***

### SUBSCRIBE\_SUCCESS

> **SUBSCRIBE\_SUCCESS**: `"PubNub.Subscribe.Success"`

***

### UNSUBSCRIBE\_FAILURE

> **UNSUBSCRIBE\_FAILURE**: `"PubNub.Unsubscribe.Failure"`

***

### UNSUBSCRIBE\_SUCCESS

> **UNSUBSCRIBE\_SUCCESS**: `"PubNub.Unsubscribe.Success"`

### Source: `docs/api/enumerations/RTCPublisherEventTypes.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / RTCPublisherEventTypes

# Enumeration: RTCPublisherEventTypes

## Enumeration Members

### CANDIDATE\_CREATE

> **CANDIDATE\_CREATE**: `"WebRTC.Candidate.Create"`

***

### CANDIDATE\_RECEIVE

> **CANDIDATE\_RECEIVE**: `"WebRTC.Candidate.Receive"`

***

### CONSTRAINTS\_ACCEPTED

> **CONSTRAINTS\_ACCEPTED**: `"WebRTC.MediaConstraints.Accepted"`

***

### CONSTRAINTS\_REJECTED

> **CONSTRAINTS\_REJECTED**: `"WebRTC.MediaConstraints.Rejected"`

***

### DATA\_CHANNEL\_AVAILABLE

> **DATA\_CHANNEL\_AVAILABLE**: `"WebRTC.DataChannel.Available"`

***

### DATA\_CHANNEL\_CLOSE

> **DATA\_CHANNEL\_CLOSE**: `"WebRTC.DataChannel.Close"`

***

### DATA\_CHANNEL\_ERROR

> **DATA\_CHANNEL\_ERROR**: `"WebRTC.DataChannel.Error"`

***

### DATA\_CHANNEL\_MESSAGE

> **DATA\_CHANNEL\_MESSAGE**: `"WebRTC.DataChannel.Message"`

***

### DATA\_CHANNEL\_OPEN

> **DATA\_CHANNEL\_OPEN**: `"WebRTC.DataChannel.Open"`

***

### HOST\_ENDPOINT\_CHANGED

> **HOST\_ENDPOINT\_CHANGED**: `"WebRTC.Endpoint.Changed"`

***

### ICE\_TRICKLE\_COMPLETE

> **ICE\_TRICKLE\_COMPLETE**: `"WebRTC.IceTrickle.Complete"`

***

### MEDIA\_STREAM\_AVAILABLE

> **MEDIA\_STREAM\_AVAILABLE**: `"WebRTC.MediaStream.Available"`

***

### OFFER\_END

> **OFFER\_END**: `"WebRTC.Offer.End"`

***

### OFFER\_START

> **OFFER\_START**: `"WebRTC.Offer.Start"`

***

### PEER\_CANDIDATE\_END

> **PEER\_CANDIDATE\_END**: `"WebRTC.PeerConnection.CandidateEnd"`

***

### PEER\_CONNECTION\_AVAILABLE

> **PEER\_CONNECTION\_AVAILABLE**: `"WebRTC.PeerConnection.Available"`

***

### PEER\_CONNECTION\_OPEN

> **PEER\_CONNECTION\_OPEN**: `"WebRTC.PeerConnection.Open"`

***

### SOCKET\_MESSAGE

> **SOCKET\_MESSAGE**: `"WebRTC.Socket.Message"`

***

### STATS\_REPORT

> **STATS\_REPORT**: `"WebRTC.Stats.Report"`

***

### TRACK\_ADDED

> **TRACK\_ADDED**: `"WebRTC.PeerConnection.OnTrack"`

***

### TRANSFORM\_ERROR

> **TRANSFORM\_ERROR**: `"WebRTC.Transform.Error"`

***

### UNSUPPORTED\_FEATURE

> **UNSUPPORTED\_FEATURE**: `"WebRTC.Unsupported.Feature"`

### Source: `docs/api/enumerations/RTCSubscriberEventTypes.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / RTCSubscriberEventTypes

# Enumeration: RTCSubscriberEventTypes

## Enumeration Members

### ANSWER\_END

> **ANSWER\_END**: `"WebRTC.Answer.End"`

***

### ANSWER\_START

> **ANSWER\_START**: `"WebRTC.Answer.Start"`

***

### CANDIDATE\_CREATE

> **CANDIDATE\_CREATE**: `"WebRTC.Candidate.Create"`

***

### CANDIDATE\_RECEIVE

> **CANDIDATE\_RECEIVE**: `"WebRTC.Candidate.Receive"`

***

### DATA\_CHANNEL\_AVAILABLE

> **DATA\_CHANNEL\_AVAILABLE**: `"WebRTC.DataChannel.Available"`

***

### DATA\_CHANNEL\_CLOSE

> **DATA\_CHANNEL\_CLOSE**: `"WebRTC.DataChannel.Close"`

***

### DATA\_CHANNEL\_ERROR

> **DATA\_CHANNEL\_ERROR**: `"WebRTC.DataChannel.Error"`

***

### DATA\_CHANNEL\_MESSAGE

> **DATA\_CHANNEL\_MESSAGE**: `"WebRTC.DataChannel.Message"`

***

### DATA\_CHANNEL\_OPEN

> **DATA\_CHANNEL\_OPEN**: `"WebRTC.DataChannel.Open"`

***

### HOST\_ENDPOINT\_CHANGED

> **HOST\_ENDPOINT\_CHANGED**: `"WebRTC.Endpoint.Changed"`

***

### ICE\_TRICKLE\_COMPLETE

> **ICE\_TRICKLE\_COMPLETE**: `"WebRTC.IceTrickle.Complete"`

***

### OFFER\_END

> **OFFER\_END**: `"WebRTC.Offer.End"`

***

### OFFER\_START

> **OFFER\_START**: `"WebRTC.Offer.Start"`

***

### ON\_ADD\_STREAM

> **ON\_ADD\_STREAM**: `"WebRTC.Add.Stream"`

***

### PEER\_CANDIDATE\_END

> **PEER\_CANDIDATE\_END**: `"WebRTC.PeerConnection.CandidateEnd"`

***

### PEER\_CONNECTION\_AVAILABLE

> **PEER\_CONNECTION\_AVAILABLE**: `"WebRTC.PeerConnection.Available"`

***

### PEER\_CONNECTION\_OPEN

> **PEER\_CONNECTION\_OPEN**: `"WebRTC.PeerConnection.Open"`

***

### SOCKET\_MESSAGE

> **SOCKET\_MESSAGE**: `"WebRTC.Socket.Message"`

***

### STATS\_REPORT

> **STATS\_REPORT**: `"WebRTC.Stats.Report"`

***

### SUBSCRIBE\_STREAM\_SWITCH

> **SUBSCRIBE\_STREAM\_SWITCH**: `"WebRTC.Subscribe.StreamSwitch"`

***

### TRACK\_ADDED

> **TRACK\_ADDED**: `"WebRTC.PeerConnection.OnTrack"`

***

### TRANSFORM\_ERROR

> **TRANSFORM\_ERROR**: `"WebRTC.Transform.Error"`

### Source: `docs/api/enumerations/StatsEndpointType.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / StatsEndpointType

# Enumeration: StatsEndpointType

## Enumeration Members

### DATA\_CHANNEL

> **DATA\_CHANNEL**: `"data-channel"`

***

### DEV\_NULL

> **DEV\_NULL**: `"dev/null"`

***

### EVENT\_TRANSPORT

> **EVENT\_TRANSPORT**: `"event-transport"`

### Source: `docs/api/enumerations/SubscriberEventTypes.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / SubscriberEventTypes

# Enumeration: SubscriberEventTypes

## Enumeration Members

### AUTO\_PLAYBACK\_FAILURE

> **AUTO\_PLAYBACK\_FAILURE**: `"Subscribe.Autoplay.Failure"`

***

### AUTO\_PLAYBACK\_MUTED

> **AUTO\_PLAYBACK\_MUTED**: `"Subscribe.Autoplay.Muted"`

***

### CONNECT\_FAILURE

> **CONNECT\_FAILURE**: `"Connect.Failure"`

***

### CONNECT\_SUCCESS

> **CONNECT\_SUCCESS**: `"Connect.Success"`

***

### CONNECTION\_CLOSED

> **CONNECTION\_CLOSED**: `"Subscribe.Connection.Closed"`

***

### FULL\_SCREEN\_STATE\_CHANGE

> **FULL\_SCREEN\_STATE\_CHANGE**: `"Subscribe.FullScreen.Change"`

***

### LOADED\_METADATA

> **LOADED\_METADATA**: `"Subscribe.LoadedMetadata"`

***

### ORIENTATION\_CHANGE

> **ORIENTATION\_CHANGE**: `"Subscribe.Orientation.Change"`

***

### PLAY\_UNPUBLISH

> **PLAY\_UNPUBLISH**: `"Subscribe.Play.Unpublish"`

***

### PLAYBACK\_STATE\_CHANGE

> **PLAYBACK\_STATE\_CHANGE**: `"Subscribe.Playback.Change"`

***

### PLAYBACK\_TIME\_UPDATE

> **PLAYBACK\_TIME\_UPDATE**: `"Subscribe.Time.Update"`

***

### RECONNECT\_FAILURE

> **RECONNECT\_FAILURE**: `"Reconnect.Failure"`

***

### RECONNECT\_START

> **RECONNECT\_START**: `"Reconnect.Start"`

***

### SEEK\_CHANGE

> **SEEK\_CHANGE**: `"Subscribe.Seek.Change"`

***

### STATISTICS\_ENDPOINT\_CHANGE

> **STATISTICS\_ENDPOINT\_CHANGE**: `"Subscribe.StatisticsEndpoint.Change"`

***

### STREAMING\_MODE\_CHANGE

> **STREAMING\_MODE\_CHANGE**: `"Subscribe.StreamingMode.Change"`

***

### SUBSCRIBE\_FAIL

> **SUBSCRIBE\_FAIL**: `"Subscribe.Fail"`

***

### SUBSCRIBE\_INVALID\_NAME

> **SUBSCRIBE\_INVALID\_NAME**: `"Subscribe.InvalidName"`

***

### SUBSCRIBE\_METADATA

> **SUBSCRIBE\_METADATA**: `"Subscribe.Metadata"`

***

### SUBSCRIBE\_PUBLISHER\_CONGESTION

> **SUBSCRIBE\_PUBLISHER\_CONGESTION**: `"Subscribe.Publisher.NetworkCongestion"`

***

### SUBSCRIBE\_PUBLISHER\_RECOVERY

> **SUBSCRIBE\_PUBLISHER\_RECOVERY**: `"Subscribe.Publisher.NetworkRecovery"`

***

### SUBSCRIBE\_SEND\_INVOKE

> **SUBSCRIBE\_SEND\_INVOKE**: `"Subscribe.Send.Invoke"`

***

### SUBSCRIBE\_START

> **SUBSCRIBE\_START**: `"Subscribe.Start"`

***

### SUBSCRIBE\_STATUS

> **SUBSCRIBE\_STATUS**: `"Subscribe.Status"`

***

### SUBSCRIBE\_STOP

> **SUBSCRIBE\_STOP**: `"Subscribe.Stop"`

***

### VIDEO\_DIMENSIONS\_CHANGE

> **VIDEO\_DIMENSIONS\_CHANGE**: `"Subscribe.VideoDimensions.Change"`

***

### VOLUME\_CHANGE

> **VOLUME\_CHANGE**: `"Subscribe.Volume.Change"`

### Source: `docs/api/enumerations/WebRTCConnectionEventTypes.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / WebRTCConnectionEventTypes

# Enumeration: WebRTCConnectionEventTypes

## Enumeration Members

### CONNECTION\_HEALTH\_EXCESSIVE\_RTT

> **CONNECTION\_HEALTH\_EXCESSIVE\_RTT**: `"WebRTC.Connection.ExcessiveRTT"`

***

### CONNECTION\_HEALTH\_ICE\_TIMEOUT

> **CONNECTION\_HEALTH\_ICE\_TIMEOUT**: `"WebRTC.Connection.IceTimeout"`

***

### CONNECTION\_HEALTH\_STALE\_STATS

> **CONNECTION\_HEALTH\_STALE\_STATS**: `"WebRTC.Connection.StaleStats"`

***

### CONNECTION\_HEALTH\_STATE\_REGRESSION

> **CONNECTION\_HEALTH\_STATE\_REGRESSION**: `"WebRTC.Connection.StateRegression"`

### Source: `docs/api/functions/getRecordedLogs.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / getRecordedLogs

# Function: getRecordedLogs()

> **getRecordedLogs**(): `string`[]

Returns the stored logs if requested to `record` on establishment of logger.

## Returns

`string`[]

Array of recorded log messages.

### Source: `docs/api/functions/getVersion.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / getVersion

# Function: getVersion()

> **getVersion**(): `string`

Get the version of the SDK.

## Returns

`string`

### Source: `docs/api/functions/setLogLevel.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / setLogLevel

# Function: setLogLevel()

> **setLogLevel**(`level`, `record?`): `void`

## Parameters

### level

`string`

### record?

`boolean` = `false`

## Returns

`void`

### Source: `docs/api/globals.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](README.md)

***

# Red5 Pro WebRTC SDK v16.0.0-beta.3

Red5 Pro WebRTC SDK

## Enumerations

- [MessageChannelEventTypes](enumerations/MessageChannelEventTypes.md)
- [MessageTransportStateEventTypes](enumerations/MessageTransportStateEventTypes.md)
- [PlaybackAudioEncoder](enumerations/PlaybackAudioEncoder.md)
- [PlaybackState](enumerations/PlaybackState.md)
- [PlaybackVideoEncoder](enumerations/PlaybackVideoEncoder.md)
- [PublishAudioEncoder](enumerations/PublishAudioEncoder.md)
- [PublisherEventTypes](enumerations/PublisherEventTypes.md)
- [PublishVideoEncoder](enumerations/PublishVideoEncoder.md)
- [PubNubEventTypes](enumerations/PubNubEventTypes.md)
- [RTCPublisherEventTypes](enumerations/RTCPublisherEventTypes.md)
- [RTCSubscriberEventTypes](enumerations/RTCSubscriberEventTypes.md)
- [StatsEndpointType](enumerations/StatsEndpointType.md)
- [SubscriberEventTypes](enumerations/SubscriberEventTypes.md)
- [WebRTCConnectionEventTypes](enumerations/WebRTCConnectionEventTypes.md)

## Classes

- [Event](classes/Event.md)
- [EventEmitter](classes/EventEmitter.md)
- [HLSSubscriber](classes/HLSSubscriber.md)
- [LiveSeekClient](classes/LiveSeekClient.md)
- [MessageChannel](classes/MessageChannel.md)
- [MessageChannelEvent](classes/MessageChannelEvent.md)
- [MessageTransportStateEvent](classes/MessageTransportStateEvent.md)
- [MOQCatalog](classes/MOQCatalog.md)
- [MOQPublisher](classes/MOQPublisher.md)
- [MOQSubscriber](classes/MOQSubscriber.md)
- [PlaybackController](classes/PlaybackController.md)
- [PlaybackControls](classes/PlaybackControls.md)
- [PublisherEvent](classes/PublisherEvent.md)
- [PubNubClient](classes/PubNubClient.md)
- [PubNubEvent](classes/PubNubEvent.md)
- [SourceHandler](classes/SourceHandler.md)
- [SourceHandlerImpl](classes/SourceHandlerImpl.md)
- [SubscriberEvent](classes/SubscriberEvent.md)
- [WHEPClient](classes/WHEPClient.md)
- [WHIPClient](classes/WHIPClient.md)

## Interfaces

- [EventEmitterInterface](interfaces/EventEmitterInterface.md)

## Type Aliases

- [BandwidthConfig](type-aliases/BandwidthConfig.md)
- [HLSSubscriberConfigType](type-aliases/HLSSubscriberConfigType.md)
- [LiveSeekConfigType](type-aliases/LiveSeekConfigType.md)
- [LiveSeekOptions](type-aliases/LiveSeekOptions.md)
- [MediaConstraintRange](type-aliases/MediaConstraintRange.md)
- [MediaConstraints](type-aliases/MediaConstraints.md)
- [RTCPublisherConfigType](type-aliases/RTCPublisherConfigType.md)
- [RTCSubscriberConfigType](type-aliases/RTCSubscriberConfigType.md)
- [RTCWhepSubscriberConfigType](type-aliases/RTCWhepSubscriberConfigType.md)
- [RTCWhipPublisherConfigType](type-aliases/RTCWhipPublisherConfigType.md)
- [StatsConfig](type-aliases/StatsConfig.md)
- [VideoConstraints](type-aliases/VideoConstraints.md)

## Variables

- [Capability](variables/Capability.md)
- [default](variables/default.md)
- [defaultHLSSubscriberConfig](variables/defaultHLSSubscriberConfig.md)
- [defaultLiveSeekConfig](variables/defaultLiveSeekConfig.md)
- [defaultStatsConfig](variables/defaultStatsConfig.md)
- [defaultWhepSubscriberConfig](variables/defaultWhepSubscriberConfig.md)
- [defaultWhipPublisherConfig](variables/defaultWhipPublisherConfig.md)
- [LOG\_LEVELS](variables/LOG_LEVELS.md)
- [PlaybackStateReadableMap](variables/PlaybackStateReadableMap.md)

## Functions

- [getRecordedLogs](functions/getRecordedLogs.md)
- [getVersion](functions/getVersion.md)
- [setLogLevel](functions/setLogLevel.md)

### Source: `docs/api/interfaces/EventEmitterInterface.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / EventEmitterInterface

# Interface: EventEmitterInterface

Interface for the Event Emitter.

## Properties

### off

> **off**: (`type`, `fn`) => `void`

Remove a callback handler for an event type.

#### Parameters

##### type

`string`

##### fn

(`event`) => `void`

#### Returns

`void`

***

### on

> **on**: (`type`, `fn`) => `void`

Assign a callback handler to an event type.

#### Parameters

##### type

`string`

##### fn

(`event`) => `void`

#### Returns

`void`

***

### trigger

> **trigger**: (`event`) => `void`

Dispatch an event to be handled by any assigned callbacks.

#### Parameters

##### event

[`Event`](../classes/Event.md)

#### Returns

`void`

### Source: `docs/api/README.md`

**Red5 Pro WebRTC SDK v16.0.0-beta.3**

***

<h3 align="center">
  <img src="_media/Red5_Truetime_black.png" alt="Red5 Pro Logo" height="65" />
</h3>
<p align="center">
  <a href="#">Quick Start</a> &bull;
  <a href="_media/whip-client.md">Publishing</a> &bull;
  <a href="_media/whep-client.md">Subscribing</a> &bull;
  <a href="_media/moq-publisher.md">MOQ Publishing</a> &bull;
  <a href="_media/moq-subscriber.md">MOQ Subscribing</a> &bull;
  <a href="_media/moq-catalog.md">MOQ Catalog</a> &bull;
  <a href="_media/message-channel.md">Message Channel</a> &bull;
  <a href="_media/pubnub-client.md">PubNub Client</a>
</p>

---

# Red5 HTML SDK

> The **Red5 HTML SDK** allows you to integrate live streaming video into your desktop and mobile browser.

* [Important Notices](#important-notices)
* [Installation](#installation)
* [Quick Start](#quick-start)
* [Usage](#usage)

# Important Notices

With the `15.0.0` release of the **Red5 HTML SDK**, we have complete overhaul of its development and focus. We have decided to focus solely on **WISH** (WebRTC Ingest Signaling over HTTPS) and dropped WebSocket support previously used for signaling phase.

As such, the publishing and subscribing logic within the SDK are provided from the `WHIPClient` and `WHEPClient`, respectively.

Not only does this free up resources consumed by WebSockets on the Red5 Server deployment, but also provides a _much_ lighter client-side dependency!

# Installation

## As Script Dependency in HTML page

```html
<script src="https://cdn.jsdelivr.net/npm/red5pro-webrtc-sdk@latest/red5pro-sdk.min.js"></script>
```

... Or if you know the version:

```html
<script src=https://cdn.jsdelivr.net/npm/red5pro-webrtc-sdk@15.0.0/red5pro-sdk.min.js"></script>
```

## Using `npm` or `yarn` for you browser-based projects

```sh
npm install --save red5pro-webrtc-sdk
```

```sh
yarn install red5pro-webrtc-sdk
```

# Quick Start

All members exposed on the otherwise global `window.red5prosdk` if loading as a script on an HTML page are importable from the `red5pro-webrtc-sdk` module:

_index.js_

```js
import { WHIPClient, WHEPClient } from 'red5pro-webrtc-sdk'
```

## Quick Start - Standalone Server Deployment

You can sign up and download the Red5 Server to manage your own deployment at [https://account.red5.net](https://account.red5.net)! The following example demonstrate how to create a Two-Way stream (publisher and subscriber) against a standalone single Red5 Server:

```html
<!doctype html>
<html>
  <head>
    <!-- *Recommended WebRTC Shim -->
    <script src="https://webrtchacks.github.io/adapter/adapter-latest.js"></script>
  </head>
  <body>
    <!-- video containers -->
    <!-- publisher -->
    <div>
      <video id="red5pro-publisher" width="640" height="480" muted autoplay playsinline></video>
    </div>
    <!-- subscriber -->
    <div>
      <video id="red5pro-subscriber" width="640" height="480" controls autoplay playsinline></video>
    </div>
    <!-- Red5 HTML SDK -->
    <script src="https://cdn.jsdelivr.net/npm/red5pro-webrtc-sdk@latest/red5pro-sdk.min.js"></script>
    <!-- Create Pub/Sub -->
    <script>
      ((red5prosdk) => {
        'use strict'

        const { WHIPClient, WHEPClient, PublisherEventTypes } = red5prosdk

        const publisher = new WHIPClient()
        const subscriber = new WHEPClient()
        
        const config = {
          host: 'mydeploy.red5.net',
          streamName: 'mystream'
        }

        const subscribe = async () => {
          try {
            await subscriber.init(config)
            await subscriber.subscribe()
          } catch (err) {
              console.error('Could not play: ' + err)
          }
        }

        const publish = async () => {
          try {
            // Once publishing, call subscribe!
            publisher.on(PublisherEventTypes.PUBLISH_AVAILABLE, subscribe)
            await publisher.init(config)
            await publisher.publish()
          } catch(err) {
            console.error('Could not publish: ' + err)
          }
        }

        // Start Publisher first ->
        publish()

      }(window.red5prosdk))
    </script>
  </body>
</html>
```

## Quick Start - Red5 Cloud / StreamManager 2.0 Deployment

You can sign up for a Pay-As-You-Grow Cloud deployment of the Red5 Cloud infrastructure with autoscaling at [https://cloud.red5.net](https://cloud.red5.net)!

The Red5 Cloud deployment utilizes a Stream Manager for autoscaling. With the Stream Manager 2.0 Release, the `endpoint` init configuration property was introduced in the SDK to allow developers to specify the specific endpoint to proxy through on the Stream Manager.

> Note: You will need to know which Node Group you intend to target for publishing and subscribing.

```html
<!doctype html>
<html>
  <head>
    <!-- *Recommended WebRTC Shim -->
    <script src="https://webrtchacks.github.io/adapter/adapter-latest.js"></script>
  </head>
  <body>
    <!-- video containers -->
    <!-- publisher -->
    <div>
      <video id="red5pro-publisher" width="640" height="480" muted autoplay playsinline></video>
    </div>
    <!-- subscriber -->
    <div>
      <video id="red5pro-subscriber" width="640" height="480" controls autoplay playsinline></video>
    </div>
    <!-- Red5 HTML SDK -->
    <script src="https://cdn.jsdelivr.net/npm/red5pro-webrtc-sdk@latest/red5pro-sdk.min.js"></script>
    <!-- Create Pub/Sub -->
    <script>
      <script>
      ((red5prosdk) => {
        'use strict'

        const host = 'my-deployment.cloud.red5.net'
        const nodeGroup = 'my-node-group'
        const streamName = 'my-stream-name'

        const { WHIPClient, WHEPClient, PublisherEventTypes } = red5prosdk
        const publisher = new WHIPClient()
        const subscriber = new WHEPClient()

        const config = {
          streamName,
          connectionParams: {
            nodeGroup
          }
        }

        const subscribe = async () => {
          try {
            await subscriber.init({
              ...config,
              endpoint: `https://${host}/as/v1/proxy/whep/live/${streamName}`
            })
            await subscriber.subscribe()
          } catch (err) {
              console.error('Could not play: ' + err)
          }
        }

        const publish = async () => {
          try {
            // Once publishing, call subscribe!
            publisher.on(PublisherEventTypes.PUBLISH_START, subscribe)
            await publisher.init({
              ...config,
              endpoint: `https://${host}/as/v1/proxy/whip/live/${streamName}`
            })
            await publisher.publish()
          } catch(err) {
            console.error('Could not publish: ' + err)
          }
        }

        // Start Publisher first ->
        publish()

      }(window.red5prosdk))
    </script>
  </body>
</html>
```

# Usage

The [WHIPClient](_media/whip-client.md) and [WHEPClient](_media/whep-client.md) - along with the [Native HLSSubscriber](_media/hls-subscriber.md) - each take an initialization configuration in order to perform the signaling and negotiation process with the Red5 Server to start publishing or subscribing to a stream, respectively.

The initialization configurations and relevant APIs available for each client can be found in their respective documentation found in this repo:

* [WHIPClient](_media/whip-client.md)
* [WHEPClient](_media/whep-client.md)
* [HLSSubscriber](_media/hls-subscriber.md)
* [MOQPublisher](_media/moq-publisher.md)
* [MOQSubscriber](_media/moq-subscriber.md)
* [MOQCatalog](_media/moq-catalog.md)

### Source: `docs/api/type-aliases/BandwidthConfig.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / BandwidthConfig

# Type Alias: BandwidthConfig

> **BandwidthConfig** = `object`

## Properties

### audio?

> `optional` **audio?**: `number`

***

### video?

> `optional` **video?**: `number`

### Source: `docs/api/type-aliases/HLSSubscriberConfigType.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / HLSSubscriberConfigType

# Type Alias: HLSSubscriberConfigType

> **HLSSubscriberConfigType** = `object`

## Properties

### app

> **app**: `string`

***

### connectionParams?

> `optional` **connectionParams?**: `object`

#### Index Signature

\[`key`: `string`\]: `any`

***

### endpoint?

> `optional` **endpoint?**: `string`

***

### host?

> `optional` **host?**: `string`

***

### mediaElementId?

> `optional` **mediaElementId?**: `string`

***

### muteOnAutoplayRestriction?

> `optional` **muteOnAutoplayRestriction?**: `boolean`

***

### port

> **port**: `number`

***

### protocol

> **protocol**: `"ws"` \| `"wss"` \| `"http"` \| `"https"`

***

### streamName?

> `optional` **streamName?**: `string`

### Source: `docs/api/type-aliases/LiveSeekConfigType.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / LiveSeekConfigType

# Type Alias: LiveSeekConfigType

> **LiveSeekConfigType** = [`RTCWhepSubscriberConfigType`](RTCWhepSubscriberConfigType.md) & `object`

## Type Declaration

### liveSeek

> **liveSeek**: [`LiveSeekOptions`](LiveSeekOptions.md)

### Source: `docs/api/type-aliases/LiveSeekOptions.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / LiveSeekOptions

# Type Alias: LiveSeekOptions

> **LiveSeekOptions** = `object`

## Properties

### baseURL?

> `optional` **baseURL?**: `string`

***

### fullURL?

> `optional` **fullURL?**: `string`

***

### hlsElement?

> `optional` **hlsElement?**: `HTMLMediaElement`

***

### hlsjsRef?

> `optional` **hlsjsRef?**: `any`

***

### options?

> `optional` **options?**: `object`

#### backBufferLength

> **backBufferLength**: `number`

#### debug

> **debug**: `boolean`

***

### usePlaybackControlsUI?

> `optional` **usePlaybackControlsUI?**: `boolean`

### Source: `docs/api/type-aliases/MediaConstraintRange.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / MediaConstraintRange

# Type Alias: MediaConstraintRange

> **MediaConstraintRange** = `object`

## Properties

### exact?

> `optional` **exact?**: `number`

***

### ideal?

> `optional` **ideal?**: `number`

***

### max?

> `optional` **max?**: `number`

***

### min?

> `optional` **min?**: `number`

### Source: `docs/api/type-aliases/MediaConstraints.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / MediaConstraints

# Type Alias: MediaConstraints

> **MediaConstraints** = `object`

## Properties

### audio?

> `optional` **audio?**: `any` \| `boolean`

***

### video?

> `optional` **video?**: [`VideoConstraints`](VideoConstraints.md) \| `boolean`

### Source: `docs/api/type-aliases/RTCPublisherConfigType.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / RTCPublisherConfigType

# Type Alias: RTCPublisherConfigType

> **RTCPublisherConfigType** = `object`

## Properties

### app

> **app**: `string`

***

### audioEncoding

> **audioEncoding**: [`PublishAudioEncoder`](../enumerations/PublishAudioEncoder.md) \| `undefined`

***

### bandwidth

> **bandwidth**: [`BandwidthConfig`](BandwidthConfig.md)

***

### clearMediaOnUnpublish

> **clearMediaOnUnpublish**: `boolean`

***

### connectionParams?

> `optional` **connectionParams?**: `object`

#### Index Signature

\[`key`: `string`\]: `any`

***

### dataChannelConfiguration?

> `optional` **dataChannelConfiguration?**: `DataChannelConfig`

***

### endpoint?

> `optional` **endpoint?**: `string`

***

### forceVP8

> **forceVP8**: `boolean`

***

### host?

> `optional` **host?**: `string`

***

### iceTransport

> **iceTransport**: `IceTransportTypes`

***

### includeDataChannel

> **includeDataChannel**: `boolean`

***

### keyFramerate

> **keyFramerate**: `number`

***

### mediaConstraints

> **mediaConstraints**: [`MediaConstraints`](MediaConstraints.md)

***

### mediaElementId

> **mediaElementId**: `string`

***

### onGetUserMedia?

> `optional` **onGetUserMedia?**: () => `Promise`\<`MediaStream`\>

#### Returns

`Promise`\<`MediaStream`\>

***

### optimizationParams?

> `optional` **optimizationParams?**: `OptimizationParams`

***

### port

> **port**: `number`

***

### protocol

> **protocol**: `"ws"` \| `"wss"` \| `"http"` \| `"https"`

***

### proxy?

> `optional` **proxy?**: `object`

#### enabled

> **enabled**: `boolean`

#### version

> **version**: `string`

***

### pubnub?

> `optional` **pubnub?**: `PubnubConfigType`

***

### reconnect?

> `optional` **reconnect?**: `ReconnectConfig`

***

### rtcConfiguration

> **rtcConfiguration**: `RTCConfiguration`

***

### signalingSocketOnly

> **signalingSocketOnly**: `boolean`

***

### stats?

> `optional` **stats?**: [`StatsConfig`](StatsConfig.md)

***

### streamMode

> **streamMode**: `PublishModeTypes`

***

### streamName?

> `optional` **streamName?**: `string`

***

### videoEncoding

> **videoEncoding**: [`PublishVideoEncoder`](../enumerations/PublishVideoEncoder.md) \| `undefined`

### Source: `docs/api/type-aliases/RTCSubscriberConfigType.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / RTCSubscriberConfigType

# Type Alias: RTCSubscriberConfigType

> **RTCSubscriberConfigType** = `object`

## Properties

### app

> **app**: `string`

***

### audioEncoding?

> `optional` **audioEncoding?**: [`PlaybackAudioEncoder`](../enumerations/PlaybackAudioEncoder.md)

***

### autoLayoutOrientation

> **autoLayoutOrientation**: `boolean`

***

### buffer

> **buffer**: `number`

***

### connectionParams?

> `optional` **connectionParams?**: `object`

#### Index Signature

\[`key`: `string`\]: `any`

***

### dataChannelConfiguration?

> `optional` **dataChannelConfiguration?**: `DataChannelConfig`

***

### endpoint?

> `optional` **endpoint?**: `string`

***

### host?

> `optional` **host?**: `string`

***

### iceTransport

> **iceTransport**: `IceTransportTypes`

***

### includeDataChannel

> **includeDataChannel**: `boolean`

***

### maintainConnectionOnSubscribeErrors

> **maintainConnectionOnSubscribeErrors**: `boolean`

***

### maintainStreamVariant

> **maintainStreamVariant**: `boolean`

***

### mediaElementId

> **mediaElementId**: `string`

***

### muteOnAutoplayRestriction

> **muteOnAutoplayRestriction**: `boolean`

***

### port

> **port**: `number`

***

### protocol

> **protocol**: `"ws"` \| `"wss"` \| `"http"` \| `"https"`

***

### proxy?

> `optional` **proxy?**: `object`

#### enabled

> **enabled**: `boolean`

#### version

> **version**: `string`

***

### pubnub?

> `optional` **pubnub?**: `PubnubConfigType`

***

### renegotiationPolicy?

> `optional` **renegotiationPolicy?**: `RenegotiationPolicyType`

***

### rtcConfiguration

> **rtcConfiguration**: `RTCConfiguration`

***

### signalingSocketOnly

> **signalingSocketOnly**: `boolean`

***

### stats?

> `optional` **stats?**: [`StatsConfig`](StatsConfig.md)

***

### streamName?

> `optional` **streamName?**: `string`

***

### subscriptionId?

> `optional` **subscriptionId?**: `string`

***

### videoEncoding?

> `optional` **videoEncoding?**: [`PlaybackVideoEncoder`](../enumerations/PlaybackVideoEncoder.md)

### Source: `docs/api/type-aliases/RTCWhepSubscriberConfigType.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / RTCWhepSubscriberConfigType

# Type Alias: RTCWhepSubscriberConfigType

> **RTCWhepSubscriberConfigType** = [`RTCSubscriberConfigType`](RTCSubscriberConfigType.md) & `WhepSpecificConfig` & `object`

## Type Declaration

### includeDataChannel

> **includeDataChannel**: `true`

### signalingSocketOnly

> **signalingSocketOnly**: `false`

### Source: `docs/api/type-aliases/RTCWhipPublisherConfigType.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / RTCWhipPublisherConfigType

# Type Alias: RTCWhipPublisherConfigType

> **RTCWhipPublisherConfigType** = [`RTCPublisherConfigType`](RTCPublisherConfigType.md) & `WhipSpecificConfig` & `object`

## Type Declaration

### includeDataChannel?

> `optional` **includeDataChannel?**: `true`

### signalingSocketOnly?

> `optional` **signalingSocketOnly?**: `false`

### Source: `docs/api/type-aliases/StatsConfig.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / StatsConfig

# Type Alias: StatsConfig

> **StatsConfig** = `object`

Configuration for RTC Stats Monitoring.

## Properties

### additionalHeaders?

> `optional` **additionalHeaders?**: `Record`\<`string`, `string`\>

***

### endpoint

> **endpoint**: `string` \| `undefined` \| `null`

***

### include?

> `optional` **include?**: `string`[]

***

### interval?

> `optional` **interval?**: `number`

### Source: `docs/api/type-aliases/VideoConstraints.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / VideoConstraints

# Type Alias: VideoConstraints

> **VideoConstraints** = `object`

## Properties

### deviceId?

> `optional` **deviceId?**: `string`

***

### frameRate?

> `optional` **frameRate?**: [`MediaConstraintRange`](MediaConstraintRange.md) \| `number`

***

### height?

> `optional` **height?**: [`MediaConstraintRange`](MediaConstraintRange.md) \| `number`

***

### width?

> `optional` **width?**: [`MediaConstraintRange`](MediaConstraintRange.md) \| `number`

### Source: `docs/api/variables/Capability.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / Capability

# Variable: Capability

> `const` **Capability**: `object`

## Type Declaration

### datachannel

> `readonly` **datachannel**: `4` = `4`

### stream

> `readonly` **stream**: `3` = `3`

### Source: `docs/api/variables/default.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / default

# Variable: default

> **default**: `object`

## Type Declaration

### Capability

> **Capability**: `object`

#### Capability.datachannel

> `readonly` **datachannel**: `4` = `4`

#### Capability.stream

> `readonly` **stream**: `3` = `3`

### defaultStatsConfig

> **defaultStatsConfig**: [`StatsConfig`](../type-aliases/StatsConfig.md)

### defaultWhepSubscriberConfig

> **defaultWhepSubscriberConfig**: [`RTCWhepSubscriberConfigType`](../type-aliases/RTCWhepSubscriberConfigType.md)

### defaultWhipPublisherConfig

> **defaultWhipPublisherConfig**: [`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md)

### getRecordedLogs

> **getRecordedLogs**: () => `string`[]

Returns the stored logs if requested to `record` on establishment of logger.

#### Returns

`string`[]

Array of recorded log messages.

### getVersion

> **getVersion**: () => `string`

Get the version of the SDK.

#### Returns

`string`

### HLSSubscriber

> **HLSSubscriber**: *typeof* [`HLSSubscriber`](../classes/HLSSubscriber.md)

### LiveSeekClient

> **LiveSeekClient**: *typeof* [`LiveSeekClient`](../classes/LiveSeekClient.md)

### LOG\_LEVELS

> **LOG\_LEVELS**: `object` = `LEVELS`

#### LOG\_LEVELS.DEBUG

> `readonly` **DEBUG**: `"debug"` = `'debug'`

#### LOG\_LEVELS.ERROR

> `readonly` **ERROR**: `"error"` = `'error'`

#### LOG\_LEVELS.FATAL

> `readonly` **FATAL**: `"fatal"` = `'fatal'`

#### LOG\_LEVELS.INFO

> `readonly` **INFO**: `"info"` = `'info'`

#### LOG\_LEVELS.TRACE

> `readonly` **TRACE**: `"trace"` = `'trace'`

#### LOG\_LEVELS.WARN

> `readonly` **WARN**: `"warn"` = `'warn'`

### MessageChannel

> **MessageChannel**: *typeof* [`MessageChannel`](../classes/MessageChannel.md)

### MessageChannelEvent

> **MessageChannelEvent**: *typeof* [`MessageChannelEvent`](../classes/MessageChannelEvent.md)

### MessageChannelEventTypes

> **MessageChannelEventTypes**: *typeof* [`MessageChannelEventTypes`](../enumerations/MessageChannelEventTypes.md)

### MessageTransportStateEvent

> **MessageTransportStateEvent**: *typeof* [`MessageTransportStateEvent`](../classes/MessageTransportStateEvent.md)

### MessageTransportStateEventTypes

> **MessageTransportStateEventTypes**: *typeof* [`MessageTransportStateEventTypes`](../enumerations/MessageTransportStateEventTypes.md)

### MOQCatalog

> **MOQCatalog**: *typeof* [`MOQCatalog`](../classes/MOQCatalog.md)

### MOQPublisher

> **MOQPublisher**: *typeof* [`MOQPublisher`](../classes/MOQPublisher.md)

### MOQSubscriber

> **MOQSubscriber**: *typeof* [`MOQSubscriber`](../classes/MOQSubscriber.md)

### PlaybackAudioEncoder

> **PlaybackAudioEncoder**: *typeof* [`PlaybackAudioEncoder`](../enumerations/PlaybackAudioEncoder.md)

### PlaybackState

> **PlaybackState**: *typeof* [`PlaybackState`](../enumerations/PlaybackState.md)

### PlaybackStateReadableMap

> **PlaybackStateReadableMap**: `object`

#### PlaybackStateReadableMap.0

> **0**: `PlaybackStateReadable` = `PlaybackStateReadable.AVAILABLE`

#### PlaybackStateReadableMap.1

> **1**: `PlaybackStateReadable` = `PlaybackStateReadable.IDLE`

#### PlaybackStateReadableMap.1000

> **1000**: `PlaybackStateReadable` = `PlaybackStateReadable.UNAVAILABLE`

#### PlaybackStateReadableMap.2

> **2**: `PlaybackStateReadable` = `PlaybackStateReadable.PLAYING`

#### PlaybackStateReadableMap.3

> **3**: `PlaybackStateReadable` = `PlaybackStateReadable.PAUSED`

### PlaybackVideoEncoder

> **PlaybackVideoEncoder**: *typeof* [`PlaybackVideoEncoder`](../enumerations/PlaybackVideoEncoder.md)

### PublishAudioEncoder

> **PublishAudioEncoder**: *typeof* [`PublishAudioEncoder`](../enumerations/PublishAudioEncoder.md)

### PublisherEvent

> **PublisherEvent**: *typeof* [`PublisherEvent`](../classes/PublisherEvent.md)

### PublisherEventTypes

> **PublisherEventTypes**: *typeof* [`PublisherEventTypes`](../enumerations/PublisherEventTypes.md)

### PublishVideoEncoder

> **PublishVideoEncoder**: *typeof* [`PublishVideoEncoder`](../enumerations/PublishVideoEncoder.md)

### PubNubClient

> **PubNubClient**: *typeof* [`PubNubClient`](../classes/PubNubClient.md)

### PubNubEvent

> **PubNubEvent**: *typeof* [`PubNubEvent`](../classes/PubNubEvent.md)

### PubNubEventTypes

> **PubNubEventTypes**: *typeof* [`PubNubEventTypes`](../enumerations/PubNubEventTypes.md)

### RTCPublisherEventTypes

> **RTCPublisherEventTypes**: *typeof* [`RTCPublisherEventTypes`](../enumerations/RTCPublisherEventTypes.md)

### RTCSubscriberEventTypes

> **RTCSubscriberEventTypes**: *typeof* [`RTCSubscriberEventTypes`](../enumerations/RTCSubscriberEventTypes.md)

### setLogLevel

> **setLogLevel**: (`level`, `record`) => `void`

#### Parameters

##### level

`string`

##### record?

`boolean` = `false`

#### Returns

`void`

### StatsEndpointType

> **StatsEndpointType**: *typeof* [`StatsEndpointType`](../enumerations/StatsEndpointType.md)

### SubscriberEvent

> **SubscriberEvent**: *typeof* [`SubscriberEvent`](../classes/SubscriberEvent.md)

### SubscriberEventTypes

> **SubscriberEventTypes**: *typeof* [`SubscriberEventTypes`](../enumerations/SubscriberEventTypes.md)

### version

> **version**: `string`

### WebRTCConnectionEventTypes

> **WebRTCConnectionEventTypes**: *typeof* [`WebRTCConnectionEventTypes`](../enumerations/WebRTCConnectionEventTypes.md)

### WHEPClient

> **WHEPClient**: *typeof* [`WHEPClient`](../classes/WHEPClient.md)

### WHIPClient

> **WHIPClient**: *typeof* [`WHIPClient`](../classes/WHIPClient.md)

### Source: `docs/api/variables/defaultHLSSubscriberConfig.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / defaultHLSSubscriberConfig

# Variable: defaultHLSSubscriberConfig

> `const` **defaultHLSSubscriberConfig**: [`HLSSubscriberConfigType`](../type-aliases/HLSSubscriberConfigType.md)

### Source: `docs/api/variables/defaultLiveSeekConfig.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / defaultLiveSeekConfig

# Variable: defaultLiveSeekConfig

> `const` **defaultLiveSeekConfig**: [`LiveSeekConfigType`](../type-aliases/LiveSeekConfigType.md)

### Source: `docs/api/variables/defaultStatsConfig.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / defaultStatsConfig

# Variable: defaultStatsConfig

> `const` **defaultStatsConfig**: [`StatsConfig`](../type-aliases/StatsConfig.md)

### Source: `docs/api/variables/defaultWhepSubscriberConfig.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / defaultWhepSubscriberConfig

# Variable: defaultWhepSubscriberConfig

> `const` **defaultWhepSubscriberConfig**: [`RTCWhepSubscriberConfigType`](../type-aliases/RTCWhepSubscriberConfigType.md)

### Source: `docs/api/variables/defaultWhipPublisherConfig.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / defaultWhipPublisherConfig

# Variable: defaultWhipPublisherConfig

> `const` **defaultWhipPublisherConfig**: [`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md)

### Source: `docs/api/variables/LOG_LEVELS.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / LOG\_LEVELS

# Variable: LOG\_LEVELS

> `const` **LOG\_LEVELS**: `object`

## Type Declaration

### DEBUG

> `readonly` **DEBUG**: `"debug"` = `'debug'`

### ERROR

> `readonly` **ERROR**: `"error"` = `'error'`

### FATAL

> `readonly` **FATAL**: `"fatal"` = `'fatal'`

### INFO

> `readonly` **INFO**: `"info"` = `'info'`

### TRACE

> `readonly` **TRACE**: `"trace"` = `'trace'`

### WARN

> `readonly` **WARN**: `"warn"` = `'warn'`

### Source: `docs/api/variables/PlaybackStateReadableMap.md`

[**Red5 Pro WebRTC SDK v16.0.0-beta.3**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / PlaybackStateReadableMap

# Variable: PlaybackStateReadableMap

> `const` **PlaybackStateReadableMap**: `object`

## Type Declaration

### 0

> **0**: `PlaybackStateReadable` = `PlaybackStateReadable.AVAILABLE`

### 1

> **1**: `PlaybackStateReadable` = `PlaybackStateReadable.IDLE`

### 1000

> **1000**: `PlaybackStateReadable` = `PlaybackStateReadable.UNAVAILABLE`

### 2

> **2**: `PlaybackStateReadable` = `PlaybackStateReadable.PLAYING`

### 3

> **3**: `PlaybackStateReadable` = `PlaybackStateReadable.PAUSED`

### Source: `docs/hls-subscriber.md`

<h3 align="center">
  <img src="../assets/Red5_Truetime_black.png" alt="Red5 Pro Logo" height="65" />
</h3>
<p align="center">
  <a href="../README.md">Quick Start</a> &bull;
  <a href="whip-client.md">Publishing</a> &bull;
  <a href="whip-client.md">Subscribing</a> &bull;
  <a href="message-channel.md">Message Channel</a> &bull;
  <a href="pubnub-client.md">PubNub Client</a>
</p>

---

# Native HLS Playback

This document intends to describe how to use the `HLSSubscriber` client included with the SDK to playback HLS content native in a browser (currently only available in Mobile and Desktop Safari).

> HLS content playback from Red5 is still supported in browser with non-native HLS support by using a 3rd-Party HLS library. We recommend using [HLS.js](https://github.com/video-dev/hls.js/).

* [HLSSubscriber](#hlssubscriber)
    * [Usage](#usage)
    * [Init Configuration](#init-configuration)
    * [Events](#events)

# HLSSubscriber

The `HLSSubscriber` available from the SDK provides an easy way to setup HLS playback of a stream from Red5 in a browser that supports native HLS playback (i.e., Mobile and Desktop Safari).

## Usage

The follow example demonstrates the usage of `HLSSubscriber` from the SDK loaded in a browser as a script dependency. The example is easily transferrable to one in which the SDK is loaded as a module - either through NPM dependency - or as a script declaration - using `import`.

### Cloud Red5 Server

If your app is targeting a Cloud-based deployment of Red5 Server (such as from [https://cloud.red5.net](https://cloud.red5.net)) you will need to rely on remote storage for live and VOD HLS stream content. This could be a storage bucket in a cloud environment or an NFS mount.

> Such storage parameters can be set in your Red5 Cloud deployment if using [https://cloud.red5.net](https://cloud.red5.net) or refer to the [NFS documentation from our site](https://www.red5.net/docs/red5-pro/users-guide/protocols/converting/red5-pro-ffmpeg-server-configuration/).

Because of Cross-Origin policies in browsers, you will not be able to load HLS files that would reside in an Origin node served over HTTP. As such, you will need to know the remote location of the HLS manifest (`.m3u8`) file and provide the full URL as the `endpoint` value of the init configuration:

```html
...
<video id="red5pro-subscriber" controls autoplay playsinline></video>
...
```

```js
const { HLSSubscriber } = red5prosdk

const startHLSSubscriber = async () => {
  try {
    const subscriber = new HLSSubscriber()
    await subscriber.init({
       endpoint: 'https://nfs.myred5-deployment.cloud.red5.net/live/mystream.m3u8',
       streamName: 'mystream'
    })
    await subscriber.subscribe()
  } catch (error) {
    // Handle error.
    // Most likely due to non-native HLS Playback support in browser.
    // Integration with 3rd-Party library - such as HLS.js - is recommended in such a scenario.
  }
}

startHLSSubscriber()
```

### Standalone Red5 Server

If your app is targeting a standalone self-deployed version of the Red5 Server, the following example demonstrates native playback of HLS using `HLSSubscriber`:

```html
...
<video id="red5pro-subscriber" controls autoplay playsinline></video>
...
```

```js
const { HLSSubscriber } = red5prosdk

const startHLSSubscriber = async () => {
  try {
    const subscriber = new HLSSubscriber()
    subscriber.on('*', event => {
        const { type, data } = event
        console.log(type, data)
    })
    await subscriber.init({
       protocol: 'https',
       port: 443,
       host: 'my-red5-server.com',
       streamName: 'mystream'
    })
    await subscriber.subscribe()
  } catch (error) {
    // Handle error.
    // Most likely due to non-native HLS Playback support in browser.
    // Integration with 3rd-Party library - such as HLS.js - is recommended in such a scenario.
  }
}

startHLSSubscriber()
```

## Init Configuration

The following are the available properties that can be defined in the init configuration provided to the `HLSSubscriber` client:

| Property | Required | Default | Description |
| :--- | :---: | :--- | :--- |
| protocol | [x] | `https` | The protocol uri that the stream source resides on. |
| port | [-] | `443` | The port uri that the stream source resides on. |
| app | [x] | `live` | The webapp name that the stream source resides in. |
| host | [x] | *None* | The IP or FQDN address that the stream resides on. |
| streamName | [x] | *None* | The stream name to subscribe to. |
| endpoint | [-] | `undefined` | The full URL of the `m3u8` file to load, if known. |
| mediaElementId | [-] | `red5pro-subscriber` | The target `video` or `audio` element `id` attribute which will display the stream. |
| muteOnAutoplayRestriction | [-] | `true` | Flag to attempt to mute the `video` element when `autoplay` is restricted in the browser. [See documentation on Autoplay Restrictions](../articles/autoplay/autoplay_policy.md) |
| connectionParams | [-] |  `undefined` | An object of connection parameters to send to the server upon connection request. |

## Events

The following describe the various events that can be listened for on the `HLSSubscriber` and enumerated on the `SubscriberEventTypes` object:

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `CONNECT_SUCCESS` | 'Connect.Success' | When the subscriber has established a required remote connection, such as to a WebSocket server. |
| `CONNECT_FAILURE` | 'Connect.Failure' | When the subscriber has failed to establish a required remote connection for consuming a stream. |
| `SUBSCRIBE_START` | 'Subscribe.Start' | When the subscriber has started a subscribing to a stream. |
| `SUBSCRIBE_STOP` | 'Subscribe.Stop' | When the subscriber has successfully closed an active subscription to a stream. |
| `SUBSCRIBE_METADATA` | 'Subscribe.Metadata' | When metadata is received on the client from the server. |
| `VIDEO_DIMENSIONS_CHANGE` | 'Subscribe.VideoDimensions.Change' | Invoked when `video` element has loaded metadata and the incoming stream dimensions are available. |
| `ORIENTATION_CHANGE` | 'Subscribe.Orientation.Change' | Invoked when an orientation change is detected in metadata. Mobile (iOS and Android) broadcasts are sent with an orientation. |
| `STREAMING_MODE_CHANGE` | 'Subscribe.StreamingMode.Change' | Invoked when the broadcast has "muted" either or both their video and audio tracks. |
| `VOLUME_CHANGE` | 'Subscribe.Volume.Change' | Invoked when a change to volume is detected during playback. _From 0 to 1._ |
| `PLAYBACK_TIME_UPDATE` | 'Subscribe.Time.Update' | Invoked when a change in playhead time is detected during playback. _In seconds._ |
| `PLAYBACK_STATE_CHANGE` | 'Subscribe.Playback.Change' | Invoked when a change in playback state has occured, such as when going from a `Playback.PAUSED` state to `Playback.PLAYING` state. |
| `FULL_SCREEN_STATE_CHANGE` | 'Subscribe.FullScreen.Change' | Invoked when a change in fullscreen state occurs during playback. |
| `AUTO_PLAYBACK_FAILURE` | 'Subscribe.Autoplay.Failure' | Invoked when an attempt to `autoplay` on a media element throws a browser exception; typically due to browser security restrictions and their autoplay policies. (WebRTC and HLS, only) [See section on Autoplay Restrictions](../articles/autoplay/autoplay_policy.md) |
| `AUTO_PLAYBACK_MUTED` | 'Subscribe.Autoplay.Muted' | Invoked when an attempt to `autoplay` on a media element throws a browser exception and is muted based on the `muteOnAutoplayRestriction` config property; typically due to browser security restrictions and their autoplay policies. (WebRTC and HLS, only) [See section on Autoplay Restrictions](../articles/autoplay/autoplay_policy.md) |

### Listening for Events

The `HLSSubscriber` included in the SDK is an event emitter that provides a basic API to subscribe and unsubscribe to events either by name or by wildcard.

To subscribe to all events from a subscriber:

```js
const handleSubscriberEvent = (event) => {
  // The name of the event:
  const { type } = event
  // The dispatching subscriber instance:
  const { subscriber } = event
  // Optional data releated to the event (not available on all events):
  const { data } = event
}

const subscriber = new HLSSubscriber()
subscriber.on('*', handleSubscriberEvent)
```

> The `*` type assignment is considered a "Wildcard" subscription - all events being issued by the subscriber instance will invoke the assign event handler.

To unsubscribe to all events from a subscriber after assinging an event handler:

```js
subscriber.off('*', handleSubscriberEvent)
```

The following sections of this document describe the event types that can also be listened to directly, instead of using the `*` wildcard.

### Source: `docs/message-channel.md`

<h3 align="center">
  <img src="../assets/Red5_Truetime_black.png" alt="Red5 Pro Logo" height="65" />
</h3>
<p align="center">
  <a href="../README.md">Quick Start</a> &bull;
  <a href="whip-client.md">Publishing</a> &bull;
  <a href="whep-client.md">Subscribing</a> &bull;
  <a href="#">Message Channel</a> &bull;
  <a href="pubnub-client.md">PubNub Client</a>
</p>

---

# MessageChannel

The `MessageChannel` client is an ingest-based (read: "broadcast") client that extends `WHIPClient` as its underlying framework and capabilities are very similar, with the differing aspect of `MessageChannel` not supporting any media streaming.

## A Note on WHIP/WHEP & DataChannel

It should be noted if that `WHIPClient` and `WHEPClient` - used for publishing and subscribing streams, respectively - by default, include a messaging channel (a.k.a., `DataChannel`) through their underlying `RTCPeerConnection`.

Due to these clients' streaming nature, that underlying messaging channel will be closed once the respective stream is closed - meaning the messaging channel will not remain open if not broadcasting or consuming a stream.

In most cases, this is common scenario. However, if you would like to maintain a messaging channel _along-side_ a streaming client, you can utilize the `MessageChannel` client.

> Be aware that since the `MessageChannel` is not inherently associated with a stream, synchronizations between messages and any associative, external streams will not be available.

* [Usage](#usage)
* [Init Configuration](#init-configuration)
* [Send API](#send-api)
* [Events](#events)
* [Statistics](#statistics)
* [Stream Manager 2.0](#stream-manager-20)

# Usage

Because `MessageChannel` is a subclass of `WHIPClient` (the media streaming broadcaster), much of the init setup and event structure is similar.

To create and use a `MessageChannel` client:

```js
let messageChannel
try {
    messageChannel = new MessageChannel()
    messageChannel.on('*', , (event) => console.log(event))

    // See next section: Init Configuration, for more details.
    await messageChannel.init(configuration)
    await messageChannel.open()
} catch (error) {
    // Something went wrong...
}

// ... when ready to close the connection ...
messageChannel?.close()
```

## MessageChannel & the SDK

Dependening on how you include the SDK into your project, you can access the `MessageClient` from the following:

_NPM install_:

```js
import { MessageChannel } from 'red5pro-webrtc-sdk'
```

_Browser, CDN_:

```js
const { MessageChannel } = red5prosdk
```

> For more in-depth information related to usage, please refer to the [WHIPClient](whip-client.md#usage) documentation.

# Init Configuration

Because `MessageChannel` inherits from `WHIPClient`, its initialization configuration shares the same properties and structure, however many attributes will be ignored as they pertain to streaming media on a `WHIPClient` which have no regard to the role of a `MessageChannel`.

The following properties are respected by the `MessageChannel` client:

| Property | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `host` | [x] | *None* | The IP or address that the WebSocket server resides on. |
| `streamName` | [x] | *None* | The name of the message channel to use in association. |
| `protocol` | [x] | `https` | The protocol of the host for the signaling communication. |
| `port` | [x] | `443` | The port on the host that the Red5 server listens on; `5080` or `443` (insecure or secure, respectively). |
| `app` | [x] | `live` | The webapp context name that the stream is on. |
| `endpoint` | [-] | `undefined` | The full URL of the endpoint to stream to. **This is primarily used in Stream Manager 2.0 integration for clients.**
| `rtcConfiguration` | [-] | _Basic_ | The `RTCConfiguration` to use in setting up `RTCPeerConnection`. [RTCConfiguration](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary)|
| `dataChannelConfiguration` | [-] | `{name: "red5pro"}` | An object used in configuring a n `RTCDataChannel`. _Only used when `includeDataChannel` is defined as `true`_ |
| `connectionParams` | [-] | `undefined` | An object of connection parameters to send to the server upon connection request. |

## Init Example

The following is an example of using the init configuration for a `MessageChannel` client on a Standalone deployment of the Red5 Server:

```js
try {
    // If the standalone Red5 server is hosted over HTTPS, most other attributes can be left to default.
    const configuration = {
      host: 'mydeployment.red5.net',
      streamName: `${uuid}-message-channel`,
      dataChannelConfiguration: {
        name: 'my-channel-name'
      }
    }
    const messageChannel = new MessageChannel()
    messageChannel.on('*', , (event) => console.log(event))
    await messageChannel.init(configuration)
    await messageChannel.open()
} catch (error) {
    // Something went wrong...
}
```

# Send API

The `MessageChannel` has a few options for broadcasting messages out to other clients connected to the channel:

## send(methodName: string, data: any)

The `send` method is an override of the `MessageChannel` underlying `WHIPClient` implementation. It essentially is an override to ensure the message data is delivered on other connected clients to the specified DataChannel.

> The `data` is expected as either a string or an `Object` that can be serialized to JSON.

## sendMessage(message: any)

The `sendMessage` method is a convenience method of which the `send()` call invokes - delivering JSON data to all clients connected to the specified DataChannel

> The `message` is expected as either a string or an `Object` that can be serialized to JSON.

## sendData(data: any)

The `sendData` method will attempt to send any type of data, untouched, along the DataChannel - as such, with it comes great power; use wisely.

# Events

Because `MessageChannel` inherits from `WHIPClient`, events unrelated to streaming - such as those related to the underlying WebRTC connection (e.g., `WebRTC.*`) - will be dispatched from `MessageChannel`.

There are a few that are specific to `MessageChannel` that are available and enumerated on the `MessageChannelEventTypes` object:

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `OPEN` | 'MessageChannel.Open' | When the message channel has successfully opened and available to send and receive messages. |
| `SEND` | 'MessageChannel.Send' | When the message channel has sent a message along the message channel. _Note: This is not confirmation that the server received the actual message._ |
| `RECEIVE` | 'MessageChannel.Receive' | When the message channel has received a message. |
| `CLOSE` | 'MessageChannel.Close' | When the message channel has been closed. |
| `FAIL` | 'MessageChannel.Fail' | When the message channel has failed to open properly. |
| `ERROR` | 'MessageChannel.Error' | When an error has occurred in opening or during a message channel session. |

> Please visit the [WHIPClient](whip-client.md#events) documentation for more in-depth listing of events.

# Statistics

Similar to being able to monitor for statistics on the underlying `RTCPeerConnection` of other clients from the SDK, statistics related to the `MessageChannel` can be monitored as well - though the data gathered will pertain mostly to the connection and `data-channel`.

## Stats Configuration

The configuration used for statistics monitoring has the following structure:

```js
{
  // Optional.
  // If provided, it will POST stats to this endpoint.
  // If undefined or `data-channel`, it will post stats to message transport.
  // If null or `event-transport`, it will only emit status events.
  endpoint: red5prosdk.StatsEndpointType.DATA_CHANNEL,
  additionalHeaders: undefined,
  interval: 5000, // Interval to poll stats, in milliseconds.
  include: [], // Empty array allows SDK to be judicious about what stats to include.
}
```

### endpoint

* If the `endpoint` is defined with a URL, the SDK will attempt to make `POST` requests with a JSON body representing each individual report.
* If the `endpoint` is set to `data-channel` or `undefined`, the SDK will post metadata with type `stats-report` on the underlying message transport (DataChannel) if available.
* If the `endpoint` is set to `event-transport` or `null`, the SDK will only emit events with the metadata on the `WebRTC.StatsReport` event.

### additionalHeaders

By default, if an `endpoint` is defined, the `POST` request body will be in JSON and have the `{ 'Content-Type': 'application/json' }` header set. If requirements - such as authentication - are required, a map of additional headers can be provided to be sent along with the request.

### interval

The polling interval (in milliseconds) to access the `RTCStatsReport` from the underlying `RTCPeerConnection` of the publisher client.

### include

An array of static type strings. These directly map to the listing of type available for `RTCStatsReport` objects. If left empty or undefined, the SDK will report the statistics it deems suitable for tracking proper broadcast conditions.

e.g.,

```js
include: ['data-channel', 'transport']
```

> More information about the statistic types are available at [https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport#the_statistic_types](https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport#the_statistic_types)

## Invocation

To start statistics monitoring, you have a couple of options:

* You can provide a `stats` attribute with the [stats configuration object](#stats-configuration) to the [init configuration](#webrtc-configuration-parameters).
* You can call `monitorStats` on the publisher client with the optional [stats configuration object](#stats-configuration) parameter.

> Additionally, you can stop monitoring by calling `unmonitorStats` on the publisher client.

## Additional Information

Attached to the metadata that is reported are additional properties that pertain to the publisher client.

As well, Along with the metadata releated to the `RTCStatsReport` objects emitted by the underlying `RTCPeerConnection`, the statistics monitoring also sends out a few event and action metadata related to the operation of a publisher client.

> See the following section for examples.

## Example of Statistics Metadata

The following is an example of a statistics metadata that is emitted in a `WebRTC.StatsReport` event and POSTed to any defined optional endpoint:

```json
{
  "name": "MessageChannelStats",
  "created": 1771514183637,
  "fingerprint": "165799de-87ac-4c13-95d3-66c7512080fe",
  "device": {
    "appVersion": "5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36",
    "platform": "MacIntel",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36",
    "vendor": "Google Inc."
  },
  "client": {
    "host": "myred5.deploy",
    "streamName": "dc-1771514183635",
    "connectionParams": {
      "capabilities": 4
    }
  },
  "publicIP": "174.169.251.174",
  "type": "stats-report",
  "timestamp": 1771514658751,
  "data": {
    "id": "D159",
    "timestamp": 1771514658751.39,
    "type": "data-channel",
    "label": "red5pro",
    "state": "open",
    "messagesSent": 45,
    "messagesReceived": 93,
    "bytesSent": 4815,
    "bytesReceived": 12556
  }
}
```
# Stream Manager 2.0

> This section provides information that relate to the release of Stream Manager 2.0 and its integration with WHIP/WHEP clients, and MessageChannel.

The Stream Manager 2.0 simplifies the proxying of web clients to Origin and Edge nodes. As such, an initialization configuration property called `endpoint` was added to the WebRTC SDK. This `endpoint` value should be the full URL path to the proxy endpoint on the Stream Manager as is used as such:

## WHIP Proxy

```javascript
const host = 'my-deployment.red5.net'
const streamName = `${uuid}-message-channel`
const nodeGroup = 'my-node-group'
const endpoint = `https://${host}/as/v1/proxy/whip/live/${streamName}`
const config = {
  endpoint,
  streamName,
  connectionParams: {
    nodeGroup
  },
  dataChannelConfiguration: {
    name: 'my-channel'
  }
  // additional configurations
}
const messageChannel = await new MessageChannel().init(config)
messageChannel.on('*', (event) => console.log(event))
await messageChannel.open()
```

### Source: `docs/moq-catalog.md`

<h3 align="center">
  <img src="../assets/Red5_Truetime_black.png" alt="Red5 Pro Logo" height="65" />
</h3>
<p align="center">
  <a href="../README.md">Quick Start</a> &bull;
  <a href="moq-publisher.md">MOQ Publishing</a> &bull;
  <a href="moq-subscriber.md">MOQ Subscribing</a> &bull;
  <a href="#">MOQ Catalog</a> &bull;
  <a href="whip-client.md">WHIP/WHEP Docs</a>
</p>

---

# MOQCatalog

`MOQCatalog` is a lightweight client for reading stream catalog data from a MOQ relay.

Use it when you want to inspect track metadata without starting full media playback. You can either:

- perform a one-shot `fetch()` (then close), or
- open a `subscribe()` session for catalog updates over time.

* [Usage](#usage)
* [Init Configuration](#init-configuration)
* [Events](#events)

# Usage

Initialize first, then call either `fetch()` or `subscribe()`.

```js
const { MOQCatalog, MOQCatalogEventTypes } = red5prosdk

const catalog = new MOQCatalog()
catalog.on('*', event => {
  console.log(event.type, event.data)
})

await catalog.init({
  endpoint: 'https://relay.example.com:4433',
  namespace: 'live/mystream'
})
```

## One-shot fetch

```js
// Note: Namespace argument is optional.
await catalog.fetch('live/mystream')
// Catalog is emitted via events, then session closes automatically.
```

## Continuous subscribe

```js
// Note: Namespace argument is optional.
await catalog.subscribe('live/mystream')
// Later:
await catalog.unsubscribe()
```

## Constructor with URL

Passing URL to constructor auto-runs internal init.

```js
const catalog = new MOQCatalog('https://relay.example.com:4433/live/mystream')
await catalog.fetch()
```

# Init Configuration

The `init()` call accepts `MOQCatalogConfigType`.

| Property | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `endpoint` | [-] | `undefined` | Full MOQ relay URL. If omitted, SDK uses `protocol://host:port`. |
| `host` | [x]* | `undefined` | Relay host when `endpoint` is omitted. |
| `streamName` | [x]* | `undefined` | Stream name used for namespace fallback. |
| `protocol` | [x] | `https` | Relay protocol (`ws`, `wss`, `http`, `https`). |
| `port` | [x] | `4433` | Relay port. |
| `app` | [x] | `live` | App scope used for namespace fallback. |
| `namespace` | [-] | `app/streamName` | Explicit namespace for fetch/subscribe calls. |
| `draftVersion` | [-] | `16` | MoQ transport draft version. |
| `certKey` | [-] | `undefined` | Certificate hash input for WebTransport setup. |
| `moqtLogLevel` | [-] | `none` | Log level for MOQ internals. |

`*` Required when `endpoint` is not provided.

# Events

`MOQCatalog` is an event emitter:

```js
const onCatalogEvent = event => {
  const { type, data } = event
  console.log(type, data)
}

catalog.on('*', onCatalogEvent)
// later
catalog.off('*', onCatalogEvent)
```

The following are emitted from `MOQCatalogEventTypes`:

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `FETCH` | `MOQ.Catalog.Fetch` | One-shot fetch started. |
| `UNFETCH` | `MOQ.Catalog.Unfetch` | One-shot fetch session closed. |
| `SUBSCRIBE` | `MOQ.Catalog.Subscribe` | Live catalog subscription started. |
| `UNSUBSCRIBE` | `MOQ.Catalog.Unsubscribe` | Live catalog subscription stopped. |
| `CATALOG_RECEIVED` | `MOQ.Catalog.Received` | Parsed catalog payload delivered. |
| `CATALOG_PARSE_ERROR` | `MOQ.Catalog.Parse.Error` | Catalog payload parse failed. |
| `MESSAGE` | `MOQ.Catalog.Message` | Control message from relay. |
| `FAIL` | `MOQ.Catalog.Fail` | Session or request failure. |
| `CLOSE` | `MOQ.Catalog.Close` | Relay/session closed. |

### Source: `docs/moq-publisher.md`

<h3 align="center">
  <img src="../assets/Red5_Truetime_black.png" alt="Red5 Pro Logo" height="65" />
</h3>
<p align="center">
  <a href="../README.md">Quick Start</a> &bull;
  <a href="#">MOQ Publishing</a> &bull;
  <a href="moq-subscriber.md">MOQ Subscribing</a> &bull;
  <a href="moq-catalog.md">MOQ Catalog</a> &bull;
  <a href="whip-client.md">WHIP/WHEP Docs</a>
</p>

---

# MOQPublisher

When you want to publish media over Media over QUIC (MoQ), the SDK provides `MOQPublisher`.

`MOQPublisher` captures media (`getUserMedia` by default, or your own stream), connects to a MOQ relay over WebTransport, publishes a namespace, and serves encoded tracks and catalog data to subscriber requests.

* [Usage](#usage)
* [Init Configuration](#init-configuration)
* [Events](#events)
* [Statistics](#statistics)

# Usage

There are two options to start a `MOQPublisher`:

1. Construct with a MOQ URL (auto init and publish).
2. Construct with no URL, then call `init()` and `publish()`.

## Using init() and publish()

```js
const { MOQPublisher, PublisherEventTypes, MOQPublisherEventTypes } = red5prosdk

const publisher = new MOQPublisher()
publisher.on('*', event => {
  console.log(event.type, event.data)
})

await publisher.init({
  endpoint: 'https://relay.example.com:4433',
  namespace: 'live/mystream',
  mediaElementId: 'red5pro-publisher',
  mediaConstraints: {
    audio: true,
    video: true
  }
})

await publisher.publish()
```

To stop publishing:

```js
await publisher.unpublish()
```

## Constructing with URL

Passing a URL to the constructor triggers internal init + publish automatically.

```js
const publisher = new MOQPublisher(
  'https://relay.example.com:4433/live/mystream',
  document.getElementById('red5pro-publisher'),
  {
    namespace: 'live/mystream'
  }
)
```

# Init Configuration

The `init()` call accepts `MOQPublisherConfigType`.

| Property | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `endpoint` | [-] | `undefined` | Full MOQ relay URL. If omitted, SDK uses `protocol://host:port`. |
| `host` | [x]* | `undefined` | Relay host when `endpoint` is omitted. |
| `streamName` | [x]* | `undefined` | Stream name used for namespace derivation and stats metadata. |
| `protocol` | [x] | `https` | Relay protocol (`ws`, `wss`, `http`, `https`). |
| `port` | [x] | `4433` | Relay port. |
| `app` | [x] | `live` | App scope used in namespace fallback. |
| `namespace` | [-] | `app/streamName` | MOQ namespace to publish. |
| `draftVersion` | [-] | auto | MoQ transport draft version. |
| `certKey` | [-] | `undefined` | Certificate hash input for WebTransport setup. |
| `keyFramerate` | [-] | `2000` | Keyframe interval in milliseconds. |
| `bandwidth` | [-] | `{ audio: 56, video: 750 }` | Target encode bandwidth settings. |
| `mediaConstraints` | [x] | camera+mic defaults | Constraints for SDK-managed `getUserMedia`. |
| `onGetUserMedia` | [-] | `undefined` | Optional override to provide your own media stream acquisition. |
| `videoEncoding` | [-] | `H264` | Video codec (`PublishVideoEncoder`). |
| `audioEncoding` | [-] | `OPUS` | Audio codec (`PublishAudioEncoder`). |
| `mediaElementId` | [-] | `red5pro-publisher` | Preview element id for local media display. |
| `clearMediaOnUnpublish` | [-] | `true` | Stop preview stream tracks on unpublish. |
| `stats` | [-] | `undefined` | Optional stats monitor configuration. |
| `connectionParams` | [-] | `undefined` | Additional params used for stats metadata and endpoint context. |
| `moqtLogLevel` | [-] | `none` | Log level passed to MOQ components. |

`*` Required when `endpoint` is not provided.

# Events

`MOQPublisher` is an event emitter. You can subscribe with wildcard (`*`) or by specific event name.

```js
const onPublisherEvent = event => {
  const { type, publisher, data } = event
  console.log(type, publisher, data)
}

publisher.on('*', onPublisherEvent)
// later
publisher.off('*', onPublisherEvent)
```

### Core publish lifecycle events (`PublisherEventTypes`)

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `PUBLISH_START` | `Publish.Start` | Publishing has started. |
| `PUBLISH_FAIL` | `Publish.Fail` | Publishing failed. |
| `UNPUBLISH_SUCCESS` | `Unpublish.Success` | Unpublish completed. |

### MOQ-specific events (`MOQPublisherEventTypes`)

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `CONSTRAINTS_ACCEPTED` | `MOQ.MediaConstraints.Accepted` | Media constraints accepted. |
| `CONSTRAINTS_REJECTED` | `MOQ.MediaConstraints.Rejected` | Media constraints rejected. |
| `MEDIA_STREAM_AVAILABLE` | `MOQ.MediaStream.Available` | Local `MediaStream` became available. |
| `NAMESPACE_PUBLISHED` | `MOQ.Namespace.Published` | Namespace announce/publish completed. |
| `RELAY_SUBSCRIBE` | `MOQ.Relay.Subscribe` | Relay requested a known track subscription. |
| `RELAY_SUBSCRIBE_FAILED` | `MOQ.Relay.Subscribe.Failed` | Relay requested unknown or rejected track. |
| `RELAY_MESSAGE` | `MOQ.Relay.Message` | Relay control message received. |
| `RELAY_ERROR` | `MOQ.Relay.Error` | Relay/session error reported. |
| `RELAY_CLOSE` | `MOQ.Relay.Close` | Relay/session closed. |
| `ENCODER_ERROR` | `MOQ.Encoder.Error` | Encoder or capture pipeline error. |
| `STATS_REPORT` | `MOQ.Stats.Report` | Stats report emitted when monitoring is enabled. |

# Statistics

`MOQPublisher` supports the same stats pattern as other SDK clients:

```js
publisher.monitorStats({
  interval: 5000
})
```

You can also provide `stats` directly in `init()` options to start monitoring automatically once publishing starts.

### Source: `docs/moq-subscriber.md`

<h3 align="center">
  <img src="../assets/Red5_Truetime_black.png" alt="Red5 Pro Logo" height="65" />
</h3>
<p align="center">
  <a href="../README.md">Quick Start</a> &bull;
  <a href="moq-publisher.md">MOQ Publishing</a> &bull;
  <a href="#">MOQ Subscribing</a> &bull;
  <a href="moq-catalog.md">MOQ Catalog</a> &bull;
  <a href="whep-client.md">WHIP/WHEP Docs</a>
</p>

---

# MOQSubscriber

When you want to play MoQ media streams in the browser, the SDK provides `MOQSubscriber`.

`MOQSubscriber` connects to a MOQ relay, receives catalog updates, chooses an internal render path (LOC/WebCodecs or CMAF/MSE), and provides playback and track-selection APIs.

* [Usage](#usage)
* [Init Configuration](#init-configuration)
* [Events](#events)
* [Playback API](#playback-api)
* [Statistics](#statistics)

# Usage

There are two options to start a `MOQSubscriber`:

1. Construct with a MOQ URL (auto init and subscribe).
2. Construct with no URL, then call `init()` and `subscribe()`.

## Using init() and subscribe()

```js
const { MOQSubscriber, MOQSubscriberEventTypes } = red5prosdk

const subscriber = new MOQSubscriber()
subscriber.on('*', event => {
  console.log(event.type, event.data)
})

await subscriber.init({
  endpoint: 'https://relay.example.com:4433',
  namespace: 'live/mystream',
  mediaElementId: 'red5pro-subscriber',
  prefetchCatalog: false
})

await subscriber.subscribe()
```

To stop:

```js
await subscriber.unsubscribe()
```

## Constructing with URL

Passing a URL to the constructor triggers internal init + subscribe automatically.

```js
const subscriber = new MOQSubscriber(
  'https://relay.example.com:4433/live/mystream',
  document.getElementById('red5pro-subscriber'),
  { namespace: 'live/mystream' }
)
```

# Init Configuration

The `init()` call accepts `MOQSubscriberConfigType`.

| Property | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `endpoint` | [-] | `undefined` | Full MOQ relay URL. If omitted, SDK uses `protocol://host:port`. |
| `host` | [x]* | `undefined` | Relay host when `endpoint` is omitted. |
| `streamName` | [x]* | `undefined` | Stream name used for namespace derivation. |
| `namespace` | [-] | `app/streamName` | Namespace to subscribe from. |
| `protocol` | [x] | `https` | Relay protocol (`ws`, `wss`, `http`, `https`). |
| `port` | [x] | `4433` | Relay port. |
| `app` | [x] | `live` | App scope for namespace fallback. |
| `mediaElementId` | [-] | `red5pro-subscriber` | Target render element id. |
| `canvasElementId` | [-] | `undefined` | Optional canvas element id used by LOC rendering path. |
| `videoAudioElementId` | [-] | `undefined` | Optional media element id used by alternate paths. |
| `draftVersion` | [-] | auto | MoQ transport draft version. |
| `certKey` | [-] | `undefined` | Certificate hash input for WebTransport setup. |
| `lateFrameThreshold` | [-] | `100` | Late frame threshold in ms for playback adaptation. |
| `gapTimeout` | [-] | `500` | Gap timeout in ms for recovery behavior. |
| `preferSoftwareDecoder` | [-] | `false` | Prefer software decode over hardware where supported. |
| `muted` | [-] | `true` | Initial mute state. |
| `showControls` | [-] | `true` | Enable built-in controls (where applicable). |
| `initialVolume` | [-] | `1` | Initial playback volume (0..1). |
| `muteOnAutoplayRestriction` | [-] | `true` | Auto-mute fallback for browser autoplay restrictions. |
| `stats` | [-] | `undefined` | Optional stats monitor configuration. |
| `prefetchCatalog` | [-] | `false` | Attempt HTTP catalog prefetch before MOQ playback session starts. |
| `connectionParams` | [-] | `undefined` | Additional connection parameters passed through options. |
| `moqtLogLevel` | [-] | `none` | Log level passed to MOQ components. |

`*` Required when `endpoint` is not provided.

# Events

`MOQSubscriber` is an event emitter. You can subscribe with wildcard (`*`) or by specific event name.

```js
const onSubscriberEvent = event => {
  const { type, subscriber, data } = event
  console.log(type, subscriber, data)
}

subscriber.on('*', onSubscriberEvent)
// later
subscriber.off('*', onSubscriberEvent)
```

### Core subscriber lifecycle (`SubscriberEventTypes`)

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `CONNECT_SUCCESS` | `Connect.Success` | Session established. |
| `SUBSCRIBE_START` | `Subscribe.Start` | Playback started. |
| `SUBSCRIBE_STOP` | `Subscribe.Stop` | Playback stopped/unsubscribed. |
| `SUBSCRIBE_FAIL` | `Subscribe.Fail` | Subscribe failed. |
| `SUBSCRIBE_INVALID_NAME` | `Subscribe.InvalidName` | Invalid stream/namespace during prefetch or subscribe. |

### MOQ-specific events (`MOQSubscriberEventTypes`)

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `SESSION_CONNECTING` | `MOQ.Session.Connecting` | Session connect process started. |
| `SESSION_ESTABLISHED` | `MOQ.Session.Established` | Session connected. |
| `SESSION_ERROR` | `MOQ.Session.Error` | Session-level error. |
| `CATALOG_RECEIVED` | `MOQ.Catalog.Received` | Catalog received (prefetch or relay). |
| `CATALOG_UPDATED` | `MOQ.Catalog.Updated` | Catalog update observed. |
| `TRACK_SUBSCRIBE` | `MOQ.Track.Subscribe` | Track subscription succeeded. |
| `TRACK_SUBSCRIBE_FAILED` | `MOQ.Track.Subscribe.Failed` | Track subscription failed. |
| `TRACK_UNSUBSCRIBE` | `MOQ.Track.Unsubscribe` | Track unsubscribed. |
| `FIRST_FRAME` | `MOQ.FirstFrame` | First frame rendered. |
| `STATS_REPORT` | `MOQ.Stats.Report` | Stats report emitted when enabled. |
| `AUDIO_BLOCKED` | `MOQ.Audio.Blocked` | Browser blocked audio output pending user gesture. |
| `AUDIO_UNBLOCKED` | `MOQ.Audio.Unblocked` | Audio output resumed after user gesture. |

# Playback API

The subscriber provides playback controls and track switching helpers:

```js
await subscriber.play()
await subscriber.pause()
await subscriber.resume()
await subscriber.stop()
await subscriber.mute()
await subscriber.unmute()
await subscriber.setVolume(0.5)
await subscriber.resumeAudio() // call from user gesture if audio is blocked
await subscriber.selectVideoTrack('video')
```

You can access internals for advanced integrations:

```js
const options = subscriber.getOptions()
const player = subscriber.getPlayer()
const view = subscriber.getRendererView()
```

# Statistics

```js
subscriber.monitorStats({
  interval: 5000
})
```

You can also provide `stats` in `init()` options to start monitoring automatically after subscription starts.

### Source: `docs/pubnub-client.md`

# PubNub Integration

Our goal at [Red5](https://red5.net) has always been to give developers the tools they need to deliver real-time streaming without complexity, bottlenecks, or hidden limitations. The Red5 integration with [PubNub](https://www.pubnub.com/) represents a major step toward that mission, combining sub-250 ms video streaming with sub-100 ms data delivery to power chat, reactions, synchronized metadata, and other interactive features at global scale.

The intent of this document is to describe the integration points within our HTML SDK in which you can take advantage of PubNub and its services.

> Read more about our thoughts and goals regarding PubNub Integration [here](https://www.red5.net/blog/red5-cloud-integrates-pubnub-to-deliver-interactivity-intelligence-global-scalability-for-real-time-streaming/).

# PubNubClient

The Red5 HTML SDK provides a basic `PubNubClient` to establish a connection to PubNub services for message communication. Its interface is very similar to that of the `WHIPClient` and `WHEPClient` provided in the SDK - both of which also provide easy init parameters and hooks for include PubNub intergation.

This document details the use of `PubNubClient` itself and may provide clearer details of the integration with the publisher and subscriber clients.

> To learn more about how to include PubNub integration for a `WHIPClient` and `WHEPClient`, please review [WHIPClient - PubNub](./whip-client.md#pubnub-integration) and [WHEPClient - PubNub](./whep-client.md#pubnub-integration), respectively.

* [Usage](#usage)
* [Init Configuration](#init-configuration)
* [Events](#events)

# Usage

A `PubNubClient` can be used singularly without taking advantage of the streaming capabilities of the `WHIPClient` and `WHEPClient` clients of the SDK.

```js
// import { PubNubClient } from red5pro-webrtc-sdk
// OR, if loaded from CDN
const { PubNubClient } = red5prosdk
...
const config = {
  publishKey: 'pub-c-XXXX',
  subscribeKey: 'sub-c-XXXX',
  userId: 'user-1234',
  channelId: 'red5',
  authToken: 'XXXX='
}
const pubnubClient = new PubNubClient()
pubnub.on('*', (event) => {
  const { type, data } = event
  console.log(`[PubNub]:: ${type}`, data)
})
await pubnub.init(pubnubConfig)
await pubnub.subscribe(channelId)
```

## Messaging API

The following methods relate to the Message API of the `PubNubClient` that integrates with the PubNub service.

### subscribe(channelId: string)

Request to subscribe to messages on the given channel. In most cases, this will be the same as the `channelId` provided in the `init()` configuration, as that is used to generate a valid token in the system.

### publishMessage(channelId: string, message: any)

Request to deliver a message on the target channel. In most cases, this will be the same as the `channelId` provided in the `init()` configuration, as that is used to generate a valid token in the system.

### unsubscribe(channelId: string)

Request to stop receiving messages on the given channel.

### destroy()

Request to shut down the PubNub client integration and any channel subscriptions.

> To respond to message-associated events, please visit the [Events](#events) section.

# Init Configuration

When using the `init()` call of a `PubNubClient`, the following initialization properties are available:

| Property | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `pubnub` | [x] | `window.PubNub` | Reference to the [PubNub](https://www.npmjs.com/package/pubnub) library to utilize. |
| `publishKey` | [x] | _None_ | The registered publish key from PubNub. This can be found in your [Red5 Cloud](https://cloud.red5.net) deployment. |
| `subscribeKey` | [x] | _None_ | The registered subscribe key from PubNub. This can be found in your [Red5 Cloud](https://cloud.red5.net) deployment. |
| `userId` | [x] | Auto-generated if not provided. | The associated User ID for PubNub. |
| `channelId` | [x] | `red5` | Default Channel ID to subscribe to in PubNub messaging. |
| `expiryMinutes` | [-] | `120` | Default expiration of issued token associated with client. |
| `authToken` | [-] | _None_ | Optional authentication token issues from PubNub - if known. |
| `cloudEndpoint` | [-] | _None_ | Optional endpoint of Red5 Cloud deployment to attempt access of `authToken` from PubNub system. |
| `backendUrl` | [-] | _None_ | Optional full URL of service endpoint to access `authToken` from PubNub system. [See documentation on deploying your own service.](https://www.red5.net/docs/red5-cloud/development/sdks/backend-sdk/) |
| `logLevel` | [-] | `trace` | The default log level of the PubNub client. |

## Authentication

The `PubNubClient` requires an authentication token to connect to the PubNub system for messaging. If a valid token is generated by a means outside of the SDK, you can define the token on the `authToken` attribute of the ini configuration.

If the `authToken` is not known prior to initialization, there are two ways that can be used through the SDK to access and utilize the token for connection:

### cloudEndpoint

If you have a [Red5 Cloud](https://cloud.red5.net) account and deployment, you can provide the `cloudEndpoint` attribute pointing to your deployment (e.g., `userid-1234-abcd.cloud.red5.net`). The SDK will attempt to generate the authentication token using a service that may be available from your deployment.

### backendUrl

If the `authToken` is not known or your [Red5 Cloud](https://cloud.red5.net) deployment does not provide an means for retrieving the authentication token, we have released open sourced Backend SDKs which can be used to provide your own custom service in generating a authentication token to be used.

To learn more about the Backend SDKs and authentication token generation, [please refer to the documentation](https://www.red5.net/docs/red5-cloud/development/sdks/backend-sdk/).


> This init configuration is also the same used when enabling PubNub integration for WHIP/WHEP Clients. View documentation related to [WHIPClient](./whip-client.md#pubnub-integration) and [WHEPClient](./whep-client.md#pubnub-integration).

# Events

The following events are dispatched by the `PubNubClient` and enumerated on the `PubNubEventTypes` object:

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `CONNECTED` | 'PubNub.Connected' | Dispatched when the PubNub client has successfully connected to the PubNub service. |
| `DISCONNECTED` | 'PubNub.Disconnected' | Dispatched when the PubNub client has disconnected from the PubNub service. |
| `SUBSCRIBE_SUCCESS` | 'PubNub.Subscribe.Success' | Dispatched when a channel subscription request has completed successfully. The `data` property contains details about the subscription. |
| `SUBSCRIBE_FAILURE` | 'PubNub.Subscribe.Failure' | Dispatched when a channel subscription request has failed. The `data` property contains error information. |
| `UNSUBSCRIBE_SUCCESS` | 'PubNub.Unsubscribe.Success' | Dispatched when a channel unsubscribe request has completed successfully. The `data` property contains details about the unsubscription. |
| `UNSUBSCRIBE_FAILURE` | 'PubNub.Unsubscribe.Failure' | Dispatched when a channel unsubscribe request has failed. The `data` property contains error information. |
| `MESSAGE_RECEIVED` | 'PubNub.Message.Received' | Dispatched when a message is received on a subscribed channel. The `data` property contains the message payload. |
| `MESSAGE_SEND_SUCCESS` | 'PubNub.Message.Send.Success' | Dispatched when a message has been successfully published to a channel. The `data` property contains confirmation details. |
| `MESSAGE_SEND_FAILURE` | 'PubNub.Message.Send.Failure' | Dispatched when a message publish request has failed. The `data` property contains error information. |
| `AUTH_TOKEN_GENERATED` | 'PubNub.AuthToken.Generated' | Dispatched when an authentication token has been successfully generated. The `data` property contains the token information. |
| `AUTH_TOKEN_GENERATION_ERROR` | 'PubNub.AuthToken.Generation.Error' | Dispatched when authentication token generation has failed. The `data` property contains error information. |
| `STATUS` | 'PubNub.Status' | Dispatched on general status notification. The `data` property contains the status. |
| `ERROR` | 'PubNub.Error' | Dispatched when a general error occurs in the PubNub client. The `data` property contains error details. |

### Source: `docs/whep-client.md`

<h3 align="center">
  <img src="../assets/Red5_Truetime_black.png" alt="Red5 Pro Logo" height="65" />
</h3>
<p align="center">
  <a href="../README.md">Quick Start</a> &bull;
  <a href="whip-client.md">Publishing</a> &bull;
  <a href="#">Subscribing</a> &bull;
  <a href="message-channel.md">Message Channel</a> &bull;
  <a href="pubnub-client.md">PubNub Client</a>
</p>

---

# WHEPClient

When it comes time to subscribe to a live stream from your Red5 Server deployment, the SDK provides the WebRTC-based `WHEPClient`.

The `WHEPClient` - under the hood - is based on the [WebRTC-HTTP egress](https://www.ietf.org/archive/id/draft-ietf-wish-whep-03.html)(WHEP) protocol providing the ability to negotation and establish a connection using HTTP/S requests. This removes the requirement for a WebSocket, which historically has been used for the role of negotiation and connection.

This provides a standardized - and _blazingly fast_ - way to establish and playback a live stream using WebRTC.

* [Usage](#usage)
* [Init Configuration](#init-configuration)
* [Events](#events)
* [Statistics](#statistics)
* [Renegotiation Policy](#renegotiation-policy)
* [Live Seek](#live-seek)
* [Stream Manager 2.0](#stream-manager-20)
* [PubNub Integration](#pubnub-integration)

# Usage

There are two options to initiate a `WHEPClient`:

1. From instantiation with a full WHEP endpoint URL (if known).
2. From an `init()` call on this instance with an init configuration object.

> If using the second option (most widely used), the SDK will properly construct the endpoints required for negotiation and streaming.

## Providing a WHEP endpoint

If you want to allow the usual default configuration properties of a subscriber client (of which the `WHEPClient` is an extension), you can simply provide the **WHEP** endpoint and target media element to the constructor of `WHEPClient`:

```js
const whepEndpoint =
  'https://yourred5pro.com/live/whep/endpoint/stream1'

const additionalOptions = {...}

const subscriber = new WHEPClient(
  whepEndpoint,
  document.querySelector('#red5pro-subscriber'),
  additionalOptions
)
subscriber.on('*', (event) => console.log(event))
```

When providing the endpoint, the _optional_ target media element and the _optional_ additional init configuration properties in the constructor for `WHEPClient`, the SDK will automatically start the connection calls and continue on to playback once available.

The construction of the **WHEP** endpoint URL is the following when integrating with a standalone deployment of the Red5 Server:

```sh
https://<your server deployment FQDN>/<app scope>/whep/endpoint/<stream name>
```

When integrating with a Red5 Cloud deployment (using autoscaling and the Stream Manager), the **WHEP** endpoint will have the following structure:

```sh
https://<your cloud deployment FQDN>/as/v1/proxy/whep/<app scope>/<stream name>
```

Where:

- `your deployment FQDN` - the host endpoint of your deployment.
- `app scope` - the target webapp scope to stream to. Typically `live`.
- `stream name` - the name of the stream to subscribe to.

> It is important to note that in using the **WHEP** endpoint as such, the `WHEPClient` will attempt its own playback - you do not have to make an additional `subscribe()` call.

## Using Init with a Configuration

If not using the first option of providing a **WHEP** endpoint in the constructor, you would simply instantiate the `WHEPClient` and use the `init()` and `subscribe()` calls to establish a connection and playback:

```js
try {
    const subscriber = new WHEPClient()
    subscriber.on('*', , (event) => console.log(event))

    // See next section: Init Configuration, for more details.
    await subscriber.init(configuration)
    await subscriber.subscribe()
} catch (error) {
    // Something went wrong...
}
```

> Note: If integrating with Red5 Cloud deployment with Stream Manager, you will need to provide an `endpoint` init configuration property. More details in next section of this document.

# Init Configuration

When using the `init()` call of a `WHEPClient` - or, alternatively, when using a **WHEP** endpoint with additional options in the constructor - the following initialization properties are available:

| Property | Required | Default | Description |
| :--- | :---: | :--- | :--- |
| `host` | [x] | *None* | The IP or address that the WebSocket server resides on. |
| `streamName` | [x] | *None* | The name of the stream to subscribe to. |
| `protocol` | [x] | `https` | The protocol of the host for the signaling communication. |
| `port` | [x] | `443` | The port on the host that the Red5 server listens on; `5080` or `443` (insecure or secure, respectively). |
| `app` | [x] | `live` | The webapp context name that the stream is on. |
| `endpoint` | [-] | `undefined` | The full URL of the endpoint to stream to. **This is primarily used in Stream Manager 2.0 integration for clients.**
| `mediaElementId` | [-] | `red5pro-subscriber` | The target `video` or `audio` element `id` attribute which will display the stream. |
| `rtcConfiguration` | [-] | _Basic_ | The `RTCConfiguration` to use in setting up `RTCPeerConnection`. [RTCConfiguration](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary)|
| `includeDataChannel` | [-] | `true` | Flag to open a datachannel for messaging between server and client once connection is established.
| `dataChannelConfiguration` | [-] | `{name: "red5pro"}` | An object used in configuring a n `RTCDataChannel`. _Only used when `includeDataChannel` is defined as `true`_ |
| `iceTransport` | [-] | `UDP` | The transport type to use in ICE negotiation. Either `UDP` or `TCP` |
| `subscriptionId` | [x] | auto-generated | A unique string representing the requesting client. |
| `connectionParams` | [-] | `undefined` | An object of additional connection parameters to send to the server upon connection request. |
| `videoEncoding` | [-] | *None* | Specifies target video encoder. |
| `audioEncoding` | [-] | *None* | Specifies target audio encoder. |
| `muteOnAutoplayRestriction` | [-] | `true` | Flag to attempt to mute the `video` element when `autoplay` is restricted in the browser. [See section on Autoplay Restrictions](../articles/autoplay/autoplay_policy.md) |
| `buffer` | [-] | `0` | Request to set a buffer - in seconds - for playback.
| `maintainStreamVariant` | [-] | `false` | Flag to instruct the server - when utilizing transcoding - to not switch subscriber stream variants when network conditions change. By setting this to `true`, when you request to playback a stream that is transcoded, the server will not deliver a variant of higher or lower quality dependending on current network conditions. |
| `stats` | [-] | *None* | Configuration object to enable stats reporting. See [Stats Reporting](#statistics) for more information. |
| `liveSeek` | [-] | *None* | Configuration object to enable live seek capability. See [Live Seek](#live-seek) for more information. |
| `renegotiationPolicy` | [-] | *None* | Configuration object for renegotiation of ICE. See [Renegotiation Policy](#renegotiation-policy) for more information. |
| `pubnub` | [-] | *None* | Configuration object for PubNub integration. See [PubNub Integration](#pubnub-integration) for more information. |

# Events

The `WHEPClient` included in the SDK is an event emitter that provides a basic API to subscribe and unsubscribe to events either by name or by wildcard.

To subscribe to all events from a subscriber:

```js
const handleSubscriberEvent = (event) => {
  // The name of the event:
  const { type } = event
  // The dispatching subscriber instance:
  const { subscriber } = event
  // Optional data releated to the event (not available on all events):
  const { data } = event
}

const subscriber = new WHEPClient()
subscriber.on('*', handleSubscriberEvent)
```

> The `*` type assignment is considered a "Wildcard" subscription - all events being issued by the subscriber instance will invoke the assign event handler.

To unsubscribe to all events from a subscriber after assinging an event handler:

```js
subscriber.off('*', handleSubscriberEvent)
```

The following sections of this document describe the event types that can also be listened to directly, instead of using the `*` wildcard.

You can also listen to events individually. The following describe the various events that can be listened for on the `WHEPClient` and enumerated on the `SubscriberEventTypes` object:

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `CONNECT_SUCCESS` | 'Connect.Success' | When the subscriber has established a required remote connection, such as to a WebSocket server. |
| `CONNECT_FAILURE` | 'Connect.Failure' | When the subscriber has failed to establish a required remote connection for consuming a stream. |
| `RECONNECT_START` | 'Reconnect.Start' | Signal when attempt on reconnect has begun. This is used in conjunction with the `renegotiationPolicy` of the `init()` configuration. |
| `RECONNECT_FAILURE` | 'Reconnect.Failure' | Signal when attempt on reconnect has failed. |
| `SUBSCRIBE_START` | 'Subscribe.Start' | When the subscriber has started a subscribing to a stream. |
| `SUBSCRIBE_STOP` | 'Subscribe.Stop' | When the subscriber has successfully closed an active subscription to a stream. |
| `SUBSCRIBE_METADATA` | 'Subscribe.Metadata' | When metadata is received on the client from the server. |
| `VIDEO_DIMENSIONS_CHANGE` | 'Subscribe.VideoDimensions.Change' | Invoked when `video` element has loaded metadata and the incoming stream dimensions are available. |
| `ORIENTATION_CHANGE` | 'Subscribe.Orientation.Change' | Invoked when an orientation change is detected in metadata. Mobile (iOS and Android) broadcasts are sent with an orientation. |
| `STREAMING_MODE_CHANGE` | 'Subscribe.StreamingMode.Change' | Invoked when the broadcast has "muted" either or both their video and audio tracks. |
| `VOLUME_CHANGE` | 'Subscribe.Volume.Change' | Invoked when a change to volume is detected during playback. _From 0 to 1._ |
| `PLAYBACK_TIME_UPDATE` | 'Subscribe.Time.Update' | Invoked when a change in playhead time is detected during playback. _In seconds._ |
| `PLAYBACK_STATE_CHANGE` | 'Subscribe.Playback.Change' | Invoked when a change in playback state has occured, such as when going from a `Playback.PAUSED` state to `Playback.PLAYING` state. |
| `FULL_SCREEN_STATE_CHANGE` | 'Subscribe.FullScreen.Change' | Invoked when a change in fullscreen state occurs during playback. |
| `AUTO_PLAYBACK_FAILURE` | 'Subscribe.Autoplay.Failure' | Invoked when an attempt to `autoplay` on a media element throws a browser exception; typically due to browser security restrictions and their autoplay policies. (WebRTC and HLS, only) [See section on Autoplay Restrictions](../articles/autoplay/autoplay_policy.md) |
| `AUTO_PLAYBACK_MUTED` | 'Subscribe.Autoplay.Muted' | Invoked when an attempt to `autoplay` on a media element throws a browser exception and is muted based on the `muteOnAutoplayRestriction` config property; typically due to browser security restrictions and their autoplay policies. (WebRTC and HLS, only) [See section on Autoplay Restrictions](../articles/autoplay/autoplay_policy.md) |

In addition to the above events, the following events are also dispatched from a `WHEPClient` and are defined on the `RTCSubscriberEventTypes` enum:

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `PEER_CONNECTION_AVAILABLE` | 'WebRTC.PeerConnection.Available' | When the negotation process has produced a valid `PeerConnection`. |
| `OFFER_START` | 'WebRTC.Offer.Start' | When the subscriber requests to start an offer on the `PeerConnection`. |
| `OFFER_END` | 'WebRTC.Offer.End' | When the subscriber has received a `SessionDescription` from a requested offer over the `PeerConnection`. |
| `ANSWER_START` | 'WebRTC.Answer.Start' | When the subscriber requests to send an answer on the `PeerConnection`. |
| `ANSWER_END` | 'WebRTC.Answer.End' | When the subscriber has received an answer (in form of a `MediaStream`) over the `PeerConnection`. |
| `CANDIDATE_CREATE` | 'WebRTC.Candidate.Create' | When the subscriber requests to send a candidate on the `PeerConnection`. |
| `CANDIDATE_RECEIVE` | 'WebRTC.Candidate.Receive' | When the subscriber has received a candidate over the `PeerConnection`. |
| `ICE_TRICKLE_COMPLETE` | 'WebRTC.IceTrickle.Complete' | When the negotaiton process (a.k.a. trickle) has completed and the subscriber will attempt at consuming a stream. |
| `ON_ADD_STREAM` | 'WebRTC.Add.Stream' | When a `MediaStream` object has become available for playback. |
| `TRACK_ADDED` | 'WebRTC.PeerConnection.OnTrack' | When a MediaTrack has become available on the underlying `RTCPeerConnection`. |
| `DATA_CHANNEL_AVAILABLE` | 'WebRTC.DataChannel.Available' |  the underlying `RTCDataChannel` is available when `includeDataChannel` configuration is used. |
| `DATA_CHANNEL_OPEN` | 'WebRTC.DataChannel.Open' | When the underlying `RTCDataChannel` is opened when `signalingServerOnly` configuration is used.
| `DATA_CHANNEL_CLOSE` | 'WebRTC.DataChannel.Close' | When the underlying `RTCDataChannel` is closed when `includeDataChannel` configuration is used. |
| `DATA_CHANNEL_ERROR` | 'WebRTC.DataChannel.Error' | When an error has occurred within the underlying `RTCDataChannel` when `includeDataChannel` configuration is used. |
| `DATA_CHANNEL_MESSAGE` | 'WebRTC.DataChannel.Message' | When a message has been delivered over the underlying `RTCDataChannel` when `includeDataChannel` configuration is used. |
| `HOST_ENDPOINT_CHANGED` | 'WebRTC.Endpoint.Changed' | Notification when the endpoint on which to signal and stream from has been asigned. |
| `SUBSCRIBE_STREAM_SWITCH` | 'WebRTC.Subscribe.StreamSwitch' | Notification when request to switch stream on the connection is completed. |
| `STATS_REPORT` | 'WebRTC.Stats.Report' | Notification of a statistics report generated from the stream connection. _Statistics are only reported based on the availability of `stats` on the init configuration or after calling [monitorStats](#statistics)._
| `LIVE_SEEK_UNSUPPORTED` | 'WebRTC.LiveSeek.Unsupported' | When `liveSeek` is specified but the browser does not support th integration of HLS.JS for Live VOD playback. |
| `LIVE_SEEK_ENABLED` | 'WebRTC.LiveSeek.Enabled' | When `liveSeek` is used to playback Live VOD and the HLS video has been loaded and available to seek. |
| `LIVE_SEEK_DISABLED` | 'WebRTC.LiveSeek.Disabled' | When `liveSeek` is used to playback Live VOD and HLS video has not been loaded nor available to seek. |
| `LIVE_SEEK_ERROR` | 'WebRTC.LiveSeek.Error' | When `liveSeek` is used to playback Live VOD and HLS video and an error in playback has occurred. Inspect the `error` attribute on the event for more details. |
| `LIVE_SEEK_LOADING` | 'WebRTC.LiveSeek.FragmentLoading' | When `liveSeek` is used to playback Live VOD and HLS video in currently loading a fragment during seeking. |
| `LIVE_SEEK_LOADED` | 'WebRTC.LiveSeek.FragmentLoaded' | When `liveSeek` is used to playback Live VOD and HLS video has completed loading a fragment during seeking. |
| `LIVE_SEEK_CHANGE` | 'WebRTC.LiveSeek.Change' | When `liveSeek` is used, this event notifies on a change of state going from "live" to "vod" and vice versa. |

Additionally, the following events are related to ICE connection monitoring when integrating with Statistics:
| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `CONNECTION_HEALTH_STALE_STATS` | 'WebRTC.Connection.StaleStats' | When monitored statistics for ice connection do not seem to be changing through intervals. |
| `CONNECTION_HEALTH_STATE_REGRESSION` | 'WebRTC.Connection.StateRegression' | When monitored statistics for ice connection and the status reverts from previously being `success`. |
| `CONNECTION_HEALTH_EXCESSIVE_RTT` | 'WebRTC.Connection.ExcessiveRTT' | When monitored statistics for ice connection and the Round-Trip-Time being report does not change or rises between intervals. |
| `CONNECTION_HEALTH_ICE_TIMEOUT` | 'WebRTC.Connection.IceTimeout' | When monitored statistics for ice connection and the timeout of ICE Connection has been reached. Can be defined in the `renegotiationPolicy` attribute of the `init()` configuration. |

# Statistics

With the `15.0.0` release of the SDK, we introduced statistics monitoring for `WHEPClient` to support the ability to monitor and POST statistics report data based on the underlying `RTCPeerConnection` of the client.

## Stats Configuration

The configuration used for statistics monitoring has the following structure:

```js
{
  // Optional.
  // If provided, it will POST stats to this endpoint.
  // If undefined or `data-channel`, it will post stats to message transport.
  // If null or `event-transport`, it will only emit status events.
  endpoint: red5prosdk.StatsEndpointType.DATA_CHANNEL,
  additionalHeaders: undefined,
  interval: 5000, // Interval to poll stats, in milliseconds.
  include: [], // Empty array allows SDK to be judicious about what stats to include.
}
```

### endpoint

* If the `endpoint` is defined with a URL, the SDK will attempt to make `POST` requests with a JSON body representing each individual report.
* If the `endpoint` is set to `data-channel` or `undefined`, the SDK will post metadata with type `stats-report` on the underlying message transport (DataChannel) if available.
* If the `endpoint` is set to `event-transport` or `null`, the SDK will only emit events with the metadata on the `WebRTC.StatsReport` event.

### additionalHeaders

By default, if an `endpoint` is defined, the `POST` request body will be in JSON and have the `{ 'Content-Type': 'application/json' }` header set. If requirements - such as authentication - are required, a map of additional headers can be provided to be sent along with the request.

### interval

The polling interval (in milliseconds) to access the `RTCStatsReport` from the underlying `RTCPeerConnection` of the subscriber client.

### include

An array of static type strings. These directly map to the listing of type available for `RTCStatsReport` objects. If left empty or undefined, the SDK will report the statistics it deems suitable for tracking proper broadcast conditions.

e.g.,

```js
include: ['inbound-rtp', 'transport']
```

> More information about the statistic types are available at [https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport#the_statistic_types](https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport#the_statistic_types)

## Invocation

To start statistics monitoring, you have a couple of options:

* You can provide a `stats` attribute with the [stats configuration object](#stats-configuration) to the [init configuration](#webrtc-configuration-parameters).
* You can call `monitorStats` on the subscriber client with the optional [stats configuration object](#stats-configuration) parameter.

> Additionally, you can stop monitoring by calling `unmonitorStats` on the subscriber client.

## Additional Information

Attached to the metadata that is reported are additional properties that pertain to the subscriber client.

As well, Along with the metadata releated to the `RTCStatsReport` objects emitted by the underlying `RTCPeerConnection`, the statistics monitoring also sends out a few event and action metadata related to the operation of a subscriber client.

> See the following section for examples.

## Example of Statistics Metadata

The following is an example of a statistics metadata that is emitted in a `WebRTC.StatsReport` event and POSTed to any defined optional endpoint:

```json
{
  "name": "RTCSubscriberStats",
  "created": 1727789134165,
  "device": {
    "browser": "chrome",
    "version": 129,
    "appVersion": "5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
    "platform": "MacIntel",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
    "vendor": "Google Inc."
  },
  "client": {
    "enabled": true,
    "endpoint": null,
    "host": "myred5.deploy",
    "app": "live",
    "streamName": "stream1",
    "subscriptionId": "subscriber-922e"
  },
  "type": "stats-report",
  "timestamp": 1727789139169,
  "data": {
    "type": "inbound-rtp",
    "kind": "video",
    "codecId": "CIT01_102_level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f",
    "jitter": 0.005,
    "packetsLost": 0,
    "packetsReceived": 439,
    "bytesReceived": 412627,
    "firCount": 0,
    "frameWidth": 640,
    "frameHeight": 480,
    "framesDecoded": 143,
    "framesDropped": 0,
    "framesPerSecond": 30,
    "framesReceived": 143,
    "freezeCount": 0,
    "keyFramesDecoded": 3,
    "nackCount": 0,
    "pauseCount": 0,
    "pliCount": 0,
    "totalFreezesDuration": 0,
    "totalPausesDuration": 0,
    "estimatedBitrate": 660
  }
}
```

# Renegotiation Policy

The `renegotiationPolicy` attribute of the `init()` configuration object is used during monitoring - in conjunction with (Statistics)(#statistics), to determine the health lifecycle of the ICE negotiation process and act accodingly.

The policy has the following type structure:

```typescript
type RenegotiationPolicyType = {
  type: 'regression' | 'timeout' | 'disconnect' | 'excessive-rtt'
  iceTimeoutInterval: number
}
```

The following `type` values are:

| Name | Meaning |
| :--- | :--- |
| `regression` | When the ICE status has changed from a previously designated `success`. This will not always occur during ICE negotiation failures. |
| `timeout` | When it has been determined (in conjunction with the `iceTimeoutInterval`), that too much time has elapsed since the start of the negotiation process in order for it to conclude successfully. |
| `disconnect` | When the peer connection has decided to disconnect after a failure of ICE negotiation. |
| `excessive-rtt` | Then the round-trip time determined through statistics is considered excessive (anything over `600ms` is considered severe.)

Typically, these will be executed in the order defined in the table above, however it should be noted that sometimes a `regression` may not occur in poor connection scenarios. If the process were to fail, both `timeout` and `disconnect` will occur.

The `iceTimeoutInterval` value will be used in conjunction with the `timeout` policy type to take reconnect action. _The default is 5 seconds._

> By default, the `renegotiationPolicy` is not set and will not take action unless defined in the `init()` configuration.

# Live Seek

Included in the SDK is the ability to subscribe to a live stream and provide capabilities to seek and playback to previous segments of the stream.

This capability is not inherent in browsers nor the live `MediaStream`. As such, this feature of "live seek" requires [HLS.JS](https://github.com/video-dev/hls.js/) as a dependency in order to load and playback historical HLS segments stored on the server or in cloud storage.

> This feature also requires some server-side configurations in order to capture and server HLS: [https://www.red5.net/docs/red5-pro/users-guide/dvr/](https://www.red5.net/docs/red5-pro/users-guide/dvr/)

## LiveSeekClient

To enable live seek capabilities for a live stream on the client-side, the SDK provides a `LiveSeekClient`. It is an extension of the `WHEPClient`, providing its familiar API and additional logic to be able to playback historical segments of a live stream by using playback controls and events.

This example demonstrates using the `LiveSeekClient` with its default configuration attributes:

```js
try {
    const subscriber = new LiveSeekClient()
    // Events related to live seek start with type: `WebRTC.LiveSeek`
    subscriber.on('*', , (event) => console.log(event))

    await subscriber.init({
      ...configuration,
      liveSeek: {
        baseURL: undefined, // Base endpoint URL to locate the associated m3u8 manifest. Undefined, will look for files on the `host`
        fullURL: undefined, // Full endpoint URL to locate the assocated m3u8 manifest. Undefined, will look for files on the `host`
        hlsjsRef: undefined, // Explicit reference to HLS.JS dependency. Undefined, the SDK will look for window.HLS
        hlsElement: undefined, // Explicit reference to the target video element to load the HLS stream. Undefined, the SDK will autogenerate one
        usePlaybackControlsUI: true, // Flag to use custom player controls from the SDK for scrubbing. False requires that you provide your own controls and interactive with the Playback API
        options: { debug: false, backBufferLength: 0 } // Options to provide to HLS.JS instance directly
      }
    })
    await subscriber.subscribe()
} catch (error) {
    // Something went wrong...
}
```

## LiveSeek Configuration

The `liveSeek` configuration object has the following signature:

```js
  baseURL: <string | undefinde>,
  fullURL: <string | undefined>,
  hlsjsRef: <hls.js reference | undefined>,
  hlsElement: <HTMLVideoElement | undefined>,
  usePlaybackControlsUI: <boolean>,
  options: <object | undefined>
```

### baseURL

- Base endpoint URL to locate the associated m3u8 manifest. If `undefined`, will look for files on the `host`.
- Default: `undefined`
- Example: `https://myserver.cloud/streams`

### fullURL

- Full endpoint URL to locate the assocated `m3u8` manifest. If `undefined`, will look for files on the `host`.
- Default: `undefined`
- Example: `https://mycdn.cloud/streams/mystream.m3u8`

### hlsjsRef

- Explicit reference to HLS.JS dependency. If `undefined`, the SDK will look for `window.HLS`.
- Default: `undefined`

### hlsElement

- Explicit reference to the target `video` element to load the HLS stream. If `undefined`, the SDK will autogenerate one.
- Default: `undefined`

### usePlaybackControlsUI

- Flag to use custom player controls UI from the SDK for scrubbing.
- Setting to `false` requires that you provide your own controls and interactive with the Playback API.
- Default: `true`

### options

- Options to provide to HLS.JS instance directly. _Please refer to [their documentation](https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning)_.
- Example: `{ debug: false, backBufferLength: 0 }`

# Stream Manager 2.0

> This section provides information that relate to the release of Stream Manager 2.0 and its integration with WHIP/WHEP clients.

The Stream Manager 2.0 simplifies the proxying of web clients to Origin and Edge nodes. As such, an initialization configuration property called `endpoint` was added to the WebRTC SDK. This `endpoint` value should be the full URL path to the proxy endpoint on the Stream Manager as is used as such:

## WHIP Proxy

```javascript
const host = 'my-deployment'
const streamName = 'mystream'
const nodeGroup = 'my-node-group'
const endpoint = `https://${host}/as/v1/proxy/whip/live/${streamName}`
const config = {
  endpoint,
  streamName,
  connectionParams: {
    nodeGroup
  },
  // additional configurations
}
const publisher = await new WHIPClient().init(config)
publisher.on('*', (event) => console.log(event))
await publisher.publish()
```

## WHEP Proxy

```javascript
const host = 'my-deployment'
const streamName = 'mystream'
const nodeGroup = 'my-node-group'
const endpoint = `https://${host}/as/v1/proxy/whep/live/${streamName}`
const config = {
  endpoint,
  streamName,
  connectionParams: {
    nodeGroup
  },
  // additional configurations
}
const subscriber = await new WHEPClient().init(config)
subscriber.on('*', (event) => console.log(event))
await subscriber.subscribe()
```

There are a few things to note here:

* The difference of `/whip` and `/whep` in the URI for the endpoint calls between `WHIPClient` and `WHEPClient`, respecively.
* The requirement of a `nodeGroup` connection parameter that is the target nodegroup within your Stream Manager deployment on which you want to proxy the WHIP/WHEP client(s).

# PubNub Integration

While the SDK provides a way to [utilize PubNub integration](./pubnub-client.md) outside of its media streaming capabilities, when utilizing the `WHEPClient` for broadcasting, the SDK also affords the ability to integrate PubNub messaging for your application.

> For more information about the standalone `PubNubClient` that can be used outside of `WHEPClient`, please visit the [PubNubClient Documentation](./pubnub-client.md).

## pubnub - Initialization Attribute

Exposed on the [init configuration](#init-configuration) is the `pubnub` attribute. The following `pubnub` object configuration attributes are supported:

| Property | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `pubnub` | [x] | `window.PubNub` | Reference to the [PubNub](https://www.npmjs.com/package/pubnub) library to utilize. |
| `publishKey` | [x] | _None_ | The registered publish key from PubNub. This can be found in your [Red5 Cloud](https://cloud.red5.net) deployment. |
| `subscribeKey` | [x] | _None_ | The registered subscribe key from PubNub. This can be found in your [Red5 Cloud](https://cloud.red5.net) deployment. |
| `userId` | [x] | Auto-generated if not provided. | The associated User ID for PubNub. |
| `channelId` | [x] | `red5` | Default Channel ID to subscribe to in PubNub messaging. |
| `expiryMinutes` | [-] | `120` | Default expiration of issued token associated with client. |
| `authToken` | [-] | _None_ | Optional authentication token issues from PubNub - if known. |
| `cloudEndpoint` | [-] | _None_ | Optional endpoint of Red5 Cloud deployment to attempt access of `authToken` from PubNub system. |
| `backendUrl` | [-] | _None_ | Optional full URL of service endpoint to access `authToken` from PubNub system. [See documentation on deploying your own service.](https://www.red5.net/docs/red5-cloud/development/sdks/backend-sdk/) |
| `logLevel` | [-] | `trace` | The default log level of the PubNub client. |

## Authentication

The `PubNubClient` requires an authentication token to connect to the PubNub system for messaging. If a valid token is generated by a means outside of the SDK, you can define the token on the `authToken` attribute of the ini configuration.

If the `authToken` is not known prior to initialization, there are two ways that can be used through the SDK to access and utilize the token for connection:

### cloudEndpoint

If you have a [Red5 Cloud](https://cloud.red5.net) account and deployment, you can provide the `cloudEndpoint` attribute pointing to your deployment (e.g., `userid-1234-abcd.cloud.red5.net`). The SDK will attempt to generate the authentication token using a service that may be available from your deployment.

### backendUrl

If the `authToken` is not known or your [Red5 Cloud](https://cloud.red5.net) deployment does not provide an means for retrieving the authentication token, we have released open sourced Backend SDKs which can be used to provide your own custom service in generating a authentication token to be used.

To learn more about the Backend SDKs and authentication token generation, [please refer to the documentation](https://www.red5.net/docs/red5-cloud/development/sdks/backend-sdk/).

## PubNub Message API

Once PubNub authentication and connection has been established through initialization, the following API can be used to as it relates to sending and receiving messages:

### subscribePubNub(channelId: string, options: any | undefined)

Request to subscribe to target channel with optional `options`.

### sendPubNub(channelId: string, message: any)

Request to publish a message on the target channel.

> Any `PubNub` client connected and subscribed to channels will be cleaned up upon call to `unsubscribe` of the `WHEPClient`.

## PubNub Events

# Events

The following events are dispatched by the underlying pubnub integration and bubbled out through the `WHEPClient` and enumerated on the `PubNubEventTypes` object:

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `CONNECTED` | 'PubNub.Connected' | Dispatched when the PubNub client has successfully connected to the PubNub service. |
| `DISCONNECTED` | 'PubNub.Disconnected' | Dispatched when the PubNub client has disconnected from the PubNub service. |
| `SUBSCRIBE_SUCCESS` | 'PubNub.Subscribe.Success' | Dispatched when a channel subscription request has completed successfully. The `data` property contains details about the subscription. |
| `SUBSCRIBE_FAILURE` | 'PubNub.Subscribe.Failure' | Dispatched when a channel subscription request has failed. The `data` property contains error information. |
| `UNSUBSCRIBE_SUCCESS` | 'PubNub.Unsubscribe.Success' | Dispatched when a channel unsubscribe request has completed successfully. The `data` property contains details about the unsubscription. |
| `UNSUBSCRIBE_FAILURE` | 'PubNub.Unsubscribe.Failure' | Dispatched when a channel unsubscribe request has failed. The `data` property contains error information. |
| `MESSAGE_RECEIVED` | 'PubNub.Message.Received' | Dispatched when a message is received on a subscribed channel. The `data` property contains the message payload. |
| `MESSAGE_SEND_SUCCESS` | 'PubNub.Message.Send.Success' | Dispatched when a message has been successfully published to a channel. The `data` property contains confirmation details. |
| `MESSAGE_SEND_FAILURE` | 'PubNub.Message.Send.Failure' | Dispatched when a message publish request has failed. The `data` property contains error information. |
| `AUTH_TOKEN_GENERATED` | 'PubNub.AuthToken.Generated' | Dispatched when an authentication token has been successfully generated. The `data` property contains the token information. |
| `AUTH_TOKEN_GENERATION_ERROR` | 'PubNub.AuthToken.Generation.Error' | Dispatched when authentication token generation has failed. The `data` property contains error information. |
| `STATUS` | 'PubNub.Status' | Dispatched on general status notification. The `data` property contains the status. |
| `ERROR` | 'PubNub.Error' | Dispatched when a general error occurs in the PubNub client. The `data` property contains error details. |

### Source: `docs/whip-client.md`

<h3 align="center">
  <img src="../assets/Red5_Truetime_black.png" alt="Red5 Pro Logo" height="65" />
</h3>
<p align="center">
  <a href="../README.md">Quick Start</a> &bull;
  <a href="#">Publishing</a> &bull;
  <a href="whep-client.md">Subscribing</a> &bull;
  <a href="message-channel.md">Message Channel</a> &bull;
  <a href="pubnub-client.md">PubNub Client</a>
</p>

---

# WHIPClient

When it comes time to broadcast a live stream from your Red5 Server deployment, the SDK provides the WebRTC-based `WHIPClient`.

The `WHIPClient` - under the hood - is based on the [WebRTC-HTTP ingestion](https://www.ietf.org/archive/id/draft-ietf-wish-whip-01.html)(WHIP) protocol providing the ability to negotation and establish a connection using HTTP/S requests. This removes the requirement for a WebSocket, which historically has been used for the role of negotiation and connection.

This provides a standardized - and _blazingly fast_ - way to establish and broadcast a live stream using WebRTC.

* [Usage](#usage)
* [Init Configuration](#init-configuration)
* [Events](#events)
* [Reconnect](#reconnect)
* [Statistics](#statistics)
* [Stream Manager 2.0](#stream-manager-20)
* [PubNub Integration](#pubnub-integration)

# Usage

There are two options to initiate a `WHIPClient`:

1. From instantiation with a full WHIP endpoint URL (if known).
2. From an `init()` call on this instance with an init configuration object.

> If using the second option (most widely used), the SDK will properly construct the endpoints required for negotiation and streaming.

## Providing a WHIP endpoint

If you want to allow the usual default configuration properties of a publisher client (of which the `WHIPClient` is an extension), you can simply provide the **WHIP** endpoint and target media element to the constructor of `WHIPClient`:

```js
const whipEndpoint =
  'https://yourred5pro.com/live/whip/endpoint/stream1'

const additionalOptions = {...}

const publisher = new WHIPClient(
  whipEndpoint,
  document.querySelector('#red5pro-publisher'),
  additionalOptions
)
publisher.on('*', (event) => console.log(event))
```

When providing the endpoint, the _optional_ target media element and the _optional_ additional init configuration properties in the constructor for `WHIPClient`, the SDK will automatically start the connection calls and continue on to broadcast once available.

The construction of the **WHIP** endpoint URL is the following when integrating with a standalone deployment of the Red5 Server:

```sh
https://<your server deployment FQDN>/<app scope>/whip/endpoint/<stream name>
```

When integrating with a Red5 Cloud deployment (using autoscaling and the Stream Manager), the **WHIP** endpoint will have the following structure:

```sh
https://<your cloud deployment FQDN>/as/v1/proxy/whip/<app scope>/<stream name>
```

Where:

- `your deployment FQDN` - the host endpoint of your deployment.
- `app scope` - the target webapp scope to stream to. Typically `live`.
- `stream name` - the name of the stream to subscribe to.

> It is important to note that in using the **WHIP** endpoint as such, the `WHIPClient` will attempt its own broadcast - you do not have to make an additional `publish()` call.

## Using Init with a Configuration

If not using the first option of providing a **WHIP** endpoint in the constructor, you would simply instantiate the `WHIPClient` and use the `init()` and `publish()` calls to establish a connection and broadcast:

```js
try {
    const publisher = new WHIPClient()
    publisher.on('*', , (event) => console.log(event))

    // See next section: Init Configuration, for more details.
    await publisher.init(configuration)
    await publisher.publish()
} catch (error) {
    // Something went wrong...
}
```

> Note: If integrating with Red5 Cloud deployment with Stream Manager, you will need to provide an `endpoint` init configuration property. More details in next section of this document.

# Init Configuration

When using the `init()` call of a `WHIPClient` - or, alternatively, when using a **WHIP** endpoint with additional options in the constructor - the following initialization properties are available:

| Property | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `host` | [x] | *None* | The IP or address that the WebSocket server resides on. |
| `streamName` | [x] | *None* | The name of the stream to subscribe to. |
| `protocol` | [x] | `https` | The protocol of the host for the signaling communication. |
| `port` | [x] | `443` | The port on the host that the Red5 server listens on; `5080` or `443` (insecure or secure, respectively). |
| `app` | [x] | `live` | The webapp context name that the stream is on. |
| `endpoint` | [-] | `undefined` | The full URL of the endpoint to stream to. **This is primarily used in Stream Manager 2.0 integration for clients.**
| `streamMode` | [x] | `live` | The mode to broadcast; `live`, `record` or `append`. |
| `keyFramerate` | [-] | `3000` | The framerate (in milliseconds) between sending key frames in broadcast. |
| `mediaElementId` | [-] | `red5pro-publisher` | The target `video` or `audio` element `id` attribute which will display the preview media. |
| `rtcConfiguration` | [-] | _Basic_ | The `RTCConfiguration` to use in setting up `RTCPeerConnection`. [RTCConfiguration](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary)|
| `includeDataChannel` | [-] | `true` | Flag to open a datachannel for messaging between server and client once connection is established.
| `dataChannelConfiguration` | [-] | `{name: "red5pro"}` | An object used in configuring a n `RTCDataChannel`. _Only used when `includeDataChannel` is defined as `true`_ |
| `iceTransport` | [-] | `UDP` | The transport type to use in ICE negotiation. Either `UDP` or `TCP` |
| `bandwidth` | [-] |`{audio: 56, video: 750}` | A configuration object to setup bandwidth setting in publisher. |
| `connectionParams` | [-] | `undefined` | An object of connection parameters to send to the server upon connection request. |
| `mediaConstraints` | [x] | [see below](#using-mediaconstraints-and-ongetusermedia) | A object representative of the [Media Constraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints) to use while setting up the Media (via `getUserMedia` internally to the SDK). |
| `onGetUserMedia` | [-] | [see below](#using-mediaconstraints-and-ongetusermedia) | An override method for performing your own `getUserMedia` request. Expected return is a `Promise` |
| `videoEncoding` | [-] | `undefined` | `PublishVideoEncoder` enum: `VP8` | `H264` | `H265` | `AV1` . |
| `audioEncoding` | [-] | `undefined` | `PublishAudioEncoder` enum. |
| `offerSDPResolution` | [-] | `false` | Request to send the initial resolution on the SDP offer in an attribute line with the following format: `a=framesize:${width}-${height}` |
| `stats` | [-] | *None* | Configuration object to enable stats reporting. See [Stats Reporting](#statistics) for more information. |
| `reconnect` | [-] | *None* | Configuration object to enable auto re-connect on lost connection, due to such things as change in network. See [Reconnect](#reconnect) for more information. |
| `optimizationParams` | [-] | *None* | Properties that can be assign on encodings and delivery of the published stream. See [OptimizationParams](#optimization-params) for more information. |
| `pubnub` | [-] | *None* | Configuration object for PubNub integration. See [PubNub Integration](#pubnub-integration) for more information. |

## Using MediaConstraints and onGetUserMedia

The Red5 HTML SDK will handle the `getUserMedia` requirements internally to set up your Camera and/or Microphone for a broadcast. As such, you can provide the [Media Constraint](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints) object to be used on the `init` configuration:

```js
const config = {
  host: 'mycloud.red5',
  streamName: 'mystream',
  mediaConstraints: {
    audio: true,
    video: {
      width: {
        min: 640,
        max: 1280
      },
      height: {
        min: 360,
        max: 720
      },
      frameRate: {
        min: 15,
        max: 60
      }
    }
  }
}

const publisher = new WHIPClient()
await publisher.init(config)
await publisher.publish()
```

Internally, the Red5 HTML SDK will use the provided *Media Constraint* to test if the resolutions requested are supported by the browser. If not, it will find the nearest supported lower neighbor based on the originally provided area dimension(s) of the resolutions.

> If you would like to bypass the internal determination of resolution, you can use the `onGetUserMedia` override of the configuration properties.

If you know exactly the proper configurations needed for your requirements and would like to fine-tune the generated `MediaStream` to be used in the broadcast, you can also optionally return that using the `onGetUserMedia` init configuration:

```js
const config = {
  host: 'mycloud.red5',
  streamName: 'mystream',
  onGetUserMedia: () => {
    return navigator.getUserMedia({
      audio: true,
      video: {
        width: {
          min: 640,
          max: 1280
        },
        height: {
          min: 360,
          max: 720
        },
        frameRate: {
          min: 15,
          max: 60
        }
      }
    })
  }
}

const publisher = new WHIPClient()
await publisher.init(config)
await publisher.publish()
```

The `onGetUserMedia` method - when defined on the configuration provide to a WebRTC-based Publisher - will override the internal call to `getUserMedia` in the Red5 HTML SDK.

You can provide your own logic on how `getUserMedia` is invoked and a [Media Stream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) attained by setting the `onGetUserMedia` attribute to a method that conforms to the following guidelines:

* No input arguments are provided to `onGetUserMedia`.
* It is *expected* that a `Promise` object is returned.
* A `MediaStream` object must be provided in the resolve of the `Promise`.
* The error provided in the reject of the `Promise` is optional, but recommended as a `String`.

Be aware that overriding `onGetUserMedia` you are losing the logic from the Red5 HTML SDK that attempts to pick the optimal resolution supported by your browser. **Use with descretion.**

> To read more about `getUserMedia` please read the following document from Mozilla Developer Network: [https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

# Events

The `WHIPClient` included in the SDK is an event emitter that provides a basic API to subscribe and unsubscribe to events either by name or by wildcard.

To subscribe to all events from a publisher:

```js
const handlePublisherEvent = (event) => {
  // The name of the event:
  const { type } = event
  // The dispatching publisher instance:
  const { publisher } = event
  // Optional data releated to the event (not available on all events):
  const { data } = event
}

const publisher = new WHIPClient()
publisher.on('*', handlePublisherEvent)
```

> The `*` type assignment is considered a "Wildcard" subscription - all events being issued by the publisher instance will invoke the assign event handler.

To unsubscribe to all events from a publisher after assinging an event handler:

```js
publisher.off('*', handlePublisherEvent)
```

The following sections of this document describe the event types that can also be listened to directly, instead of using the `*` wildcard.

You can also listen to events individually. The following describe the various events that can be listened for on the `WHIPClient` and enumerated on the `PublisherEventTypes` object:

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `CONNECT_SUCCESS` | 'Connect.Success' | When the publisher has established a required remote connection, such as to a WebSocket or RTMP-based server. |
| `CONNECT_FAILURE` | 'Connect.Failure' | When the publisher has failed to establish a required remote connection for streaming. |
| `PUBLISH_START` | 'Publish.Start' | When the publisher has started a broadcast stream. |
| `PUBLISH_FAIL` | 'Publish.Fail' | When the publisher has failed to start a broadcast stream. |
| `PUBLISH_INVALID_NAME` | 'Publish.InvalidName' | When the publisher is rejected from starting a broadcast stream because the `streamName` provided is already in use. |
| `UNPUBLISH_SUCCESS` | 'Unpublish.Success' | When the publisher has successfully closed an active broadcast stream. |
| `PUBLISH_METADATA` | 'Publish.Metadata' | When the publisher receives metadata from the server. |
| `PUBLISH_STATUS` | 'Publish.Status' | When a status event of the publisher has been receieved from the server. |
| `PUBLISH_AVAILABLE` | 'Publish.Available' | When the publisher stream has become available on the origin server to be consumed. This will follow the connection setup and `Publish.Start` event. |
| `PUBLISH_INSUFFICIENT_BANDWIDTH` | 'Publish.InsufficientBW' | When the current broadcast session is experiencing insufficient bandwidth conditions. |
| `PUBLISH_RECOVERING_BANDWIDTH` | 'Publish.RecoveringBW' | Then the current broadcast has updated information related to bandwidth condition recovery. |
| `PUBLISH_SUFFICIENT_BANDWIDTH` | 'Publish.SufficientBW' | When the current broadcast session has sufficient bandwidth conditions from previously experiencing network issues. |
| `CONNECTION_CLOSED` | 'Publisher.Connection.Closed' | Invoked when a close to the connection is detected. |
| `DIMENSION_CHANGE` | 'Publisher.Video.DimensionChange' | Notification when the Camera resolution has been set or change. |
| `STATISTICS_ENDPOINT_CHANGE` | 'Publisher.StatisticsEndpoint.Change' | Notification that the server has signaled a change in endpoint to deliver WebRTC Statistics based on RTCStatsReports. _Statistics are only reported after calling [monitorStats](#statistics)._ |
| `RECONNECT_START` | 'Reconnect.Start' | Notification when a reconnection sequence has started. Requires `reconnect` initialization property to be enabled. |
| `RECONNECT_FAILURE` | 'Reconnect.Failure' | Notification when a reconnection sequence has failed. Requires `reconnect` initialization property to be enabled. |
| `RECONNECT_SUCCESS` | 'Reconnect.Success' | Notification when a reconnection sequence has been successful. Requires `reconnect` initialization property to be enabled.|

In addition to the above events, the following events are also dispatched from a `WHIPClient` and are defined on the `RTCPublisherEventTypes` enum:

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `CONSTRAINTS_ACCEPTED` | 'WebRTC.MediaConstraints.Accepted' | When constraints have been accepted from the internal request to `getUserMedia`. The `data` property of this event contains a `requested` object detailing the constraints used in the `getUserMedia` request and an `accepted` object which is the current constraint settings for the media. |
| `CONSTRAINTS_REJECTED` | 'WebRTC.MediaConstraints.Rejected' | Then constraints have been rejected from the internal request to `getUserMedia`. The `data` property of this event contains a `constraints` object detailing the constraints that were used and rejected from `getUserMedia`. |
| `MEDIA_STREAM_AVAILABLE` | 'WebRTC.MediaStream.Available' | When the negotation process has returned a `MediaStream` object to use. |
| `PEER_CONNECTION_AVAILABLE` | 'WebRTC.PeerConnection.Available' | When the negotation process has produced a valid `PeerConnection`. |
| `OFFER_START` | 'WebRTC.Offer.Start' | When the publisher requests to send an offer using a `SessionDescription` on the `PeerConnection`. |
| `OFFER_END` | 'WebRTC.Offer.End' | When the publisher has received an answer from the `SDP` offer on the `PeerConnection`. |
| `CANDIDATE_CREATE` | 'WebRTC.Candidate.Create' | When the publisher requests to send a candidate on the `PeerConnection`. |
| `CANDIDATE_RECEIVE` | 'WebRTC.Candidate.Receive' | When the publisher has received a candidate over the `PeerConnection`. |
| `ICE_TRICKLE_COMPLETE` | 'WebRTC.IceTrickle.Complete' | When the negotaiton process (a.k.a. trickle) has completed and the publisher will attempt at opening a broadcast stream. |
| `DATA_CHANNEL_AVAILABLE` | 'WebRTC.DataChannel.Available' |  the underlying `RTCDataChannel` is available when `signalingSocketOnly` configuration is used. |
| `DATA_CHANNEL_OPEN` | 'WebRTC.DataChannel.Open' | When the underlying `RTCDataChannel` is opened when `signalingSocketOnly` configuration is used.
| `DATA_CHANNEL_CLOSE` | 'WebRTC.DataChannel.Close' | When the underlying `RTCDataChannel` is closed when `signalingSocketOnly` configuration is used. |
| `DATA_CHANNEL_ERROR` | 'WebRTC.DataChannel.Error' | When an error has occurred within the underlying `RTCDataChannel` when `signalingSocketOnly` configuration is used. |
| `DATA_CHANNEL_MESSAGE` | 'WebRTC.DataChannel.Message' | When a message has been delivered over the underlying `RTCDataChannel` when `signalingSocketOnly` configuration is used. |
| `STATS_REPORT` | 'WebRTC.Stats.Report' | An RTCStatsReport has been captured by the WebRTC client based on configurations from calling [monitorStats](#statistics). |

# Reconnect

With the `15.4.0` release of the SDK, we introduced the possibility to auto re-connect a `WHIPClient` upon disconnection for such situations as network loss.

> NOTE: This feature requires a server-side configuration for the `resilient-stream` plugin to work.

## Reconnect Configuration

The configuration used for statistics monitoring has the following structure (and their defaults):

```js
{
  enabled: false,
  timeout: 2000,
  maxAttempts: 10
}
```

### enabled

Flag of having reconnection sequence enabled when detection of connection is lost.

### timeout

The amount of delay between attempts to re-connect.

### maxAttempts

The total amount of attempts to make before considering the possiblity of reconnect unavailable.

# Optimization Params

The `optimizationParams` configuration has the following type definition:

```typescript
{
  degradationPreference?:
    | 'balanced'
    | 'maintain-framerate'
    | 'maintain-resolution'
    | 'maintain-framerate-and-resolution'
  contentHint?:
    | 'speech'
    | 'speech-recognition'
    | 'text'
    | 'music'
    | 'detail'
    | 'motion'
}
```

The properties directly relate to the [contentHint](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/contentHint) and [degradationPreference](https://developer.mozilla.org/en-US/docs/Web/API/RTCRtpSender/setParameters#degradationpreference) properties on the `MediaStreamTrack` and `RTCRtpSender` entities of a WebRTC stream.

# Statistics

With the `15.0.0` release of the SDK, we introduced statistics monitoring for `WHIPClient` to support the ability to monitor and POST statistics report data based on the underlying `RTCPeerConnection` of the client.

## Stats Configuration

The configuration used for statistics monitoring has the following structure:

```js
{
  // Optional.
  // If provided, it will POST stats to this endpoint.
  // If undefined or `data-channel`, it will post stats to message transport.
  // If null or `event-transport`, it will only emit status events.
  endpoint: red5prosdk.StatsEndpointType.DATA_CHANNEL,
  additionalHeaders: undefined,
  interval: 5000, // Interval to poll stats, in milliseconds.
  include: [], // Empty array allows SDK to be judicious about what stats to include.
}
```

### endpoint

* If the `endpoint` is defined with a URL, the SDK will attempt to make `POST` requests with a JSON body representing each individual report.
* If the `endpoint` is set to `data-channel` or `undefined`, the SDK will post metadata with type `stats-report` on the underlying message transport (DataChannel) if available.
* If the `endpoint` is set to `event-transport` or `null`, the SDK will only emit events with the metadata on the `WebRTC.StatsReport` event.

### additionalHeaders

By default, if an `endpoint` is defined, the `POST` request body will be in JSON and have the `{ 'Content-Type': 'application/json' }` header set. If requirements - such as authentication - are required, a map of additional headers can be provided to be sent along with the request.

### interval

The polling interval (in milliseconds) to access the `RTCStatsReport` from the underlying `RTCPeerConnection` of the publisher client.

### include

An array of static type strings. These directly map to the listing of type available for `RTCStatsReport` objects. If left empty or undefined, the SDK will report the statistics it deems suitable for tracking proper broadcast conditions.

e.g.,

```js
include: ['outbound-rtp', 'transport']
```

> More information about the statistic types are available at [https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport#the_statistic_types](https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport#the_statistic_types)

## Invocation

To start statistics monitoring, you have a couple of options:

* You can provide a `stats` attribute with the [stats configuration object](#stats-configuration) to the [init configuration](#webrtc-configuration-parameters).
* You can call `monitorStats` on the publisher client with the optional [stats configuration object](#stats-configuration) parameter.

> Additionally, you can stop monitoring by calling `unmonitorStats` on the publisher client.

## Additional Information

Attached to the metadata that is reported are additional properties that pertain to the publisher client.

As well, Along with the metadata releated to the `RTCStatsReport` objects emitted by the underlying `RTCPeerConnection`, the statistics monitoring also sends out a few event and action metadata related to the operation of a publisher client.

> See the following section for examples.

## Example of Statistics Metadata

The following is an example of a statistics metadata that is emitted in a `WebRTC.StatsReport` event and POSTed to any defined optional endpoint:

```json
{
  "name": "RTCPublisherStats",
  "created": 1758037554636,
  "device": {
    "browser": "chrome",
    "version": 140,
    "appVersion": "5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
    "platform": "MacIntel",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
    "vendor": "Google Inc."
  },
  "client": {
    "enabled": true,
    "endpoint": null,
    "host": "myred5.deploy",
    "app": "live",
    "streamName": "todd"
  },
  "type": "stats-report",
  "timestamp": 1758037561373,
  "data": {
    "type": "outbound-rtp",
    "kind": "video",
    "codecId": "COT01_96_level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f;sps-pps-idr-in-keyframe=1",
    "mediaType": "video",
    "active": true,
    "bytesSent": 212534,
    "packetsSent": 245,
    "firCount": 0,
    "pliCount": 3,
    "frameWidth": 640,
    "frameHeight": 360,
    "framesEncoded": 128,
    "framesPerSecond": 29,
    "framesSent": 128,
    "keyFramesEncoded": 4,
    "qualityLimitationReason": "bandwidth",
    "qualityLimitationDurations": {
      "bandwidth": 4.734,
      "cpu": 0,
      "none": 0.004,
      "other": 0
    },
    "estimatedBitrate": 435
  }
}
```

# Stream Manager 2.0

> This section provides information that relate to the release of Stream Manager 2.0 and its integration with WHIP/WHEP clients.

The Stream Manager 2.0 simplifies the proxying of web clients to Origin and Edge nodes. As such, an initialization configuration property called `endpoint` was added to the WebRTC SDK. This `endpoint` value should be the full URL path to the proxy endpoint on the Stream Manager as is used as such:

## WHIP Proxy

```javascript
const host = 'my-deployment'
const streamName = 'mystream'
const nodeGroup = 'my-node-group'
const endpoint = `https://${host}/as/v1/proxy/whip/live/${streamName}`
const config = {
  endpoint,
  streamName,
  connectionParams: {
    nodeGroup
  },
  // additional configurations
}
const publisher = await new WHIPClient().init(config)
publisher.on('*', (event) => console.log(event))
await publisher.publish()
```

## WHEP Proxy

```javascript
const host = 'my-deployment'
const streamName = 'mystream'
const nodeGroup = 'my-node-group'
const endpoint = `https://${host}/as/v1/proxy/whep/live/${streamName}`
const config = {
  endpoint,
  streamName,
  connectionParams: {
    nodeGroup
  },
  // additional configurations
}
const subscriber = await new WHEPClient().init(config)
subscriber.on('*', (event) => console.log(event))
await subscriber.subscribe()
```

There are a few things to note here:

* The difference of `/whip` and `/whep` in the URI for the endpoint calls between `WHIPClient` and `WHEPClient`, respecively.
* The requirement of a `nodeGroup` connection parameter that is the target nodegroup within your Stream Manager deployment on which you want to proxy the WHIP/WHEP client(s).

# PubNub Integration

While the SDK provides a way to [utilize PubNub integration](./pubnub-client.md) outside of its media streaming capabilities, when utilizing the `WHIPClient` for broadcasting, the SDK also affords the ability to integrate PubNub messaging for your application.

> For more information about the standalone `PubNubClient` that can be used outside of `WHIPClient`, please visit the [PubNubClient Documentation](./pubnub-client.md).

## pubnub - Initialization Attribute

Exposed on the [init configuration](#init-configuration) is the `pubnub` attribute. The following `pubnub` object configuration attributes are supported:

| Property | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `pubnub` | [x] | `window.PubNub` | Reference to the [PubNub](https://www.npmjs.com/package/pubnub) library to utilize. |
| `publishKey` | [x] | _None_ | The registered publish key from PubNub. This can be found in your [Red5 Cloud](https://cloud.red5.net) deployment. |
| `subscribeKey` | [x] | _None_ | The registered subscribe key from PubNub. This can be found in your [Red5 Cloud](https://cloud.red5.net) deployment. |
| `userId` | [x] | Auto-generated if not provided. | The associated User ID for PubNub. |
| `channelId` | [x] | `red5` | Default Channel ID to subscribe to in PubNub messaging. |
| `expiryMinutes` | [-] | `120` | Default expiration of issued token associated with client. |
| `authToken` | [-] | _None_ | Optional authentication token issues from PubNub - if known. |
| `cloudEndpoint` | [-] | _None_ | Optional endpoint of Red5 Cloud deployment to attempt access of `authToken` from PubNub system. |
| `backendUrl` | [-] | _None_ | Optional full URL of service endpoint to access `authToken` from PubNub system. [See documentation on deploying your own service.](https://www.red5.net/docs/red5-cloud/development/sdks/backend-sdk/) |
| `logLevel` | [-] | `trace` | The default log level of the PubNub client. |

## Authentication

The `PubNubClient` requires an authentication token to connect to the PubNub system for messaging. If a valid token is generated by a means outside of the SDK, you can define the token on the `authToken` attribute of the ini configuration.

If the `authToken` is not known prior to initialization, there are two ways that can be used through the SDK to access and utilize the token for connection:

### cloudEndpoint

If you have a [Red5 Cloud](https://cloud.red5.net) account and deployment, you can provide the `cloudEndpoint` attribute pointing to your deployment (e.g., `userid-1234-abcd.cloud.red5.net`). The SDK will attempt to generate the authentication token using a service that may be available from your deployment.

### backendUrl

If the `authToken` is not known or your [Red5 Cloud](https://cloud.red5.net) deployment does not provide an means for retrieving the authentication token, we have released open sourced Backend SDKs which can be used to provide your own custom service in generating a authentication token to be used.

To learn more about the Backend SDKs and authentication token generation, [please refer to the documentation](https://www.red5.net/docs/red5-cloud/development/sdks/backend-sdk/).

## PubNub Message API

Once PubNub authentication and connection has been established through initialization, the following API can be used to as it relates to sending and receiving messages:

### subscribePubNub(channelId: string, options: any | undefined)

Request to subscribe to target channel with optional `options`.

### sendPubNub(channelId: string, message: any)

Request to publish a message on the target channel.

> Any `PubNub` client connected and subscribed to channels will be cleaned up upon call to `unpublish` of the `WHIPClient`.

## PubNub Events

# Events

The following events are dispatched by the underlying pubnub integration and bubbled out through the `WHIPClient` and enumerated on the `PubNubEventTypes` object:

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `CONNECTED` | 'PubNub.Connected' | Dispatched when the PubNub client has successfully connected to the PubNub service. |
| `DISCONNECTED` | 'PubNub.Disconnected' | Dispatched when the PubNub client has disconnected from the PubNub service. |
| `SUBSCRIBE_SUCCESS` | 'PubNub.Subscribe.Success' | Dispatched when a channel subscription request has completed successfully. The `data` property contains details about the subscription. |
| `SUBSCRIBE_FAILURE` | 'PubNub.Subscribe.Failure' | Dispatched when a channel subscription request has failed. The `data` property contains error information. |
| `UNSUBSCRIBE_SUCCESS` | 'PubNub.Unsubscribe.Success' | Dispatched when a channel unsubscribe request has completed successfully. The `data` property contains details about the unsubscription. |
| `UNSUBSCRIBE_FAILURE` | 'PubNub.Unsubscribe.Failure' | Dispatched when a channel unsubscribe request has failed. The `data` property contains error information. |
| `MESSAGE_RECEIVED` | 'PubNub.Message.Received' | Dispatched when a message is received on a subscribed channel. The `data` property contains the message payload. |
| `MESSAGE_SEND_SUCCESS` | 'PubNub.Message.Send.Success' | Dispatched when a message has been successfully published to a channel. The `data` property contains confirmation details. |
| `MESSAGE_SEND_FAILURE` | 'PubNub.Message.Send.Failure' | Dispatched when a message publish request has failed. The `data` property contains error information. |
| `AUTH_TOKEN_GENERATED` | 'PubNub.AuthToken.Generated' | Dispatched when an authentication token has been successfully generated. The `data` property contains the token information. |
| `AUTH_TOKEN_GENERATION_ERROR` | 'PubNub.AuthToken.Generation.Error' | Dispatched when authentication token generation has failed. The `data` property contains error information. |
| `STATUS` | 'PubNub.Status' | Dispatched on general status notification. The `data` property contains the status. |
| `ERROR` | 'PubNub.Error' | Dispatched when a general error occurs in the PubNub client. The `data` property contains error details. |

### Source: `MIGRATION_GUIDE.md`

<h3 align="center">
  <img src="assets/Red5_Truetime_black.png" alt="Red5 Pro Logo" height="65" />
</h3>
<p align="center">
  <a href="README.md">Quick Start</a> &bull;
  <a href="docs/whip-client.md">Publishing</a> &bull;
  <a href="docs/whep-client.md">Subscribing</a>
</p>

---

# Red5 HTML SDK Migration Guide

This documentation serves as a guide in migrating client-side code where a breaking change to the API has been made in a distribution.

- [14.x to 15.0.0](#migrating-from-14x-to-1500)
- [13.x to 14.0.0](#migrating-from-13x-to-1400)
- [12.x to 13.0.0](#migrating-from-12x-to-1300)
- [10.x to 11.0.0](#migrating-from-10x-to-1100)
- [8.0.0 to 9.1.0](#migrating-from-800-to-910)
- [7.2.0 to 8.0.0](#migrating-from-720-to-800)
- [5.4.0 to 5.5.0](#migrating-from-540-to-550)
- [5.0.0 to 5.4.0](#migrating-from-500-to-540)
- [4.0.0 to 5.0.0](#migrating-from-400-to-500)
- [3.5.0 to 4.0.0](#migrating-from-350-to-400)

# Migrating from `14.x` to `15.0.0`

**ALERT: Breaking Changes**

The `15.0.0` release of the Red5 HTML SDK is a complete rewrite of the SDK! Developed in TypeScript from the ground-up, we eliminated a lot of cruft and APIs that had become obsolete and deprecated over the years.

With the slimming-down approach to the SDK also came the major breaking change of removing the WebSocket based clients: `RTCPublisher` and `RTCSubscriber`. As such, the clients introduced in the `11.0.0` release of the SDK are now the main actors and should be exclusively used: `WHIPClient` and `WHEPClient`.

The [WebRTC-HTTP ingestion](https://www.ietf.org/archive/id/draft-ietf-wish-whip-01.html)(WHIP) and [WebRTC-HTTP egress](https://www.ietf.org/archive/id/draft-murillo-whep-00.html)(WHEP) protocols provide the ability to negotation and establish a connection using HTTP/S requests. This removes the requirement for a WebSocket, which historically has been used for the role of negotiation and connection.

> Not only that, but their connection times are blazingly fast!

If you have already been using the `WHIPClient` and `WHEPClient` from the Red5 HTML SDK, you shouldn't find any hiccups and will not need to update anything - simply enjoy the benefits of a slimmer SDK and the inclusion of types!

If you have been using the WebSocket-based `RTCPublisher` and `RTCSubscriber` clients, we have hopefully made it painless enough to simply swap out that instantiation with their corresponding WHIP/WHEP client - the initialization and API is all the same.

For example, if you were previously establishing a publisher as such:

```js
const config = {
  host: 'myred5.cloud',
  streamName: 'mystream'
}
const publisher = new RTCPublisher()
publisher.on('*', event => console.log(event))
await publisher.init(config)
await publisher.publish()
```

You can simply swap over to using the `WHEPClient` like so:

```js
const config = {
  host: 'myred5.cloud',
  streamName: 'mystream'
}
const publisher = new WHIPClient()
publisher.on('*', event => console.log(event))
await publisher.init(config)
await publisher.publish()
```

> The same is true for moving from `RTCSubscriber` to `WHEPClient`!

# Migrating from `13.x` to `14.0.0`

Though the version number shows a major change, it was more to be in line with the semver of the Red5 Pro Server release. _No breaking changes._

# Migrating from `12.x` to `13.0.0`

The SDK release of `13.0.0` has additional configuration requirements when integrating with Stream Manager 2.0 deployments. This release sees the introduction of the `endpoint` initialization configuration on which you provide the full URL path to the Stream Manager 2.0 proxy. The proxy will handle directing the clients to the target Origin and Edge nodes.

The `endpoint` init config param is to be used in tandem with a `nodeGroup` connection parameter specifying the name of the target Node Group within the Stream Manager dpeloyment that you intend to target.

More Information related to this configuration is detailed in the following documents:

* [WHIPClient](docs/whip-client.md#stream-manager-20)
* [WHEPClient](docs/whep-client.md#stream-manager-20)

> [NOTE] SharedObject support has been removed in 13.0.0

# Migrating from `10.x` to `11.0.0`

The SDK release of `11.0.0` provides the capability of utilizing the [WHIP](https://www.ietf.org/archive/id/draft-ietf-wish-whip-01.html) and [WHEP](https://www.ietf.org/archive/id/draft-murillo-whep-00.html) protocols newly introduced on the `11.0.0` release of the Red5 Pro Server!

The [WebRTC-HTTP ingestion](https://www.ietf.org/archive/id/draft-ietf-wish-whip-01.html)(WHIP) and [WebRTC-HTTP egress](https://www.ietf.org/archive/id/draft-murillo-whep-00.html)(WHEP) protocols provide the ability to negotation and establish a connection using HTTP/S requests. This removes the requirement for a WebSocket, which historically has been used for the role of negotiation and connection.

> Read more about [WHIPClient](docs/whip-client.md) and [WHEPClient](docs/whep-client.md).

# Migrating from `8.0.0` to `9.1.0`

No major bug fixes were introduced in `9.1.0`. The biggest update to `9.1.0` was the introduction of the `sendLog` API for `RTCPublisher` and `RTCSubscriber`.

The `sendLog` API allows you - the developer - to send messages to the server while connected with a `RTCPublisher` or `RTCSubscriber` instance.

The message signature for `sendLog` on both the `RTCPublisher` and `RTCSubscriber` is:

```sh
sendLog( <String>level, <String>message )
```

Valid `level` values are:

- `TRACE`
- `INFO`
- `DEBUG`
- `WARN`
- `ERROR`

Example (after already establishing an `RTCPublisher` session):

```javascript
rtcPublisher.sendLog('INFO', 'hello world')
```

or

```javascript
rtcPublisher.sendLog('INFO', JSON.stringify({ hello: 'world' }))
```

# Important Note About `8.0.0` Release

**Red5 HTML SDK has been published on NPM!**

While currently not open source, the SDK build has been published to NPM to allow you to integrate into your projects with greater ease and dependency management.

## Install as `script` in HTML page

```
<script src="https://unpkg.com/red5pro-webrtc-sdk@latest/red5pro-sdk.min.js"></script>
```

... or if you know the version:

```
<script src="https://unpkg.com/red5pro-webrtc-sdk@8.0.0/red5pro-sdk.min.js"></script>
```

## Install using `npm` or `yarn` for you browser-based projects

```
npm install --save-dev red5pro-webrtc-sdk
```

```
yarn install --dev red5pro-webrtc-sdk
```

### Usage

All members exposed on the otherwise global `window.red5prosdk` if loading as a script on an HTML page are importable from the `red5pro-webrtc-sdk` module:

_publisher-example.js_

```
import { RTCPublisher } from 'red5pro-webrtc-sdk'
```

# Migrating from `7.2.0` to `8.0.0`

The `8.0.0` release of the Red5 Pro HTML SDK includes the ability for WebRTC based clients - `RTCPublisher` and `RTCSubscriber` - to use WebSockets only for signaling purposes. Once they have finished their negotiation process and have begun broadcasting or consuming a stream, repsectively, they will open a `RTCDataChannel` connection and close the underlying `WebSocket` used for signaling.

The benefit of closing the `WebSocket` and switching to a `RTCDataChannel` after signaling is complete is cutting down on the number of open socket connections to the server; in a Stream Manager Proxy scenario, this can be a significant benefit as the Proxy is no longer needed to keep alive while the stream is being delivered to the Origin(s) or from the Edge(s).

## Configuration

The initialization configuration object for the `RTCPublisher` and `RTCSubscriber` have the following attribute that flags whether to use the `WebSocket` only as a signaling connection:

- `signalingSocketOnly`

If `true`, the `RTCPublisher` and `RTCSubscriber` will use a `WebSocket` to establish an `RTCPeerConnection` and once established, will switch over to using a `RTCDataChannel` to do any event handling and futher communication with the server. _It is set to `true`, by default._

> Further communication could be calling the Mute API for `RTCPublisher` and Standby API for `RTCSubscriber`.

By setting `signalingSocketOnly` to `true` the switch works seemlessly under the hood, allowing you - as a developer - to not care about how to switch the message transport layers explicitly.

An additional initialization configuration is also available as it relates to the switch to `RTCDataChannel` after signalling is complete:

- `dataChannelConfiguration`

By default, the `dataChannelConfiguration` has the following structure and declaration:

```js
dataChannelConfiguration = {
  name: 'red5pro',
}
```

The `name` value will be used in the underlying `RTCDataChannel` created from the `RTCPeerConnection`.

> It should be noted that any `Red5ProSharedObject` instances created using an underlying connection through a `RTCPublisher` or `RTCSubscriber` will be switched over to using `RTCDataChannel` for communication.

## Access

Once the `RTCDataChannel` has been switched to from the `WebSocket`, you can access the instance from `RTCPublisher` and `RTCSubsciber` by calling the following:

```js
;+getDataChannel()
```

The will return the actual underlying `RTCDataChannel` instance used in communication.

## Events

The following events have been added to the `RTCPublisher` and `RTCSubscriber` that can be listened to:

| `DATA_CHANNEL_AVAILABLE` | 'WebRTC.DataChannel.Available' | the underlying `RTCDataChannel` is available when `signalingSocketOnly` configuration is used. |
| `DATA_CHANNEL_OPEN` | 'WebRTC.DataChannel.Open' | When the underlying `RTCDataChannel` is opened when `signalingSocketOnly` configuration is used.
| `DATA_CHANNEL_CLOSE` | 'WebRTC.DataChannel.Close' | When the underlying `RTCDataChannel` is closed when `signalingSocketOnly` configuration is used. |
| `DATA_CHANNEL_ERROR` | 'WebRTC.DataChannel.Error' | When an error has occurred within the underlying `RTCDataChannel` when `signalingSocketOnly` configuration is used. |
| `DATA_CHANNEL_MESSAGE` | 'WebRTC.DataChannel.Message' | When a message has been delivered over the underlying `RTCDataChannel` when `signalingSocketOnly` configuration is used. |

---

# Migrating from `5.4.0` to `5.5.0`

The `5.5.0` release of the Red5 Pro HTML SDK including some modifications to `SharedObjects` to allow for "decoupling" the managament and communication API from the underlying connections for Publishers and Subscribers. In the `5.5.0` release, `SharedObjects` can now be used by themselves without requiring an already established connection to the server.

- The `SharedObject` API has been decoupled from requiring previously established stream clients (Publisher and/or Subscriber).
  - By decoupling the previous _requirement_ to use a established stream client, `SharedObjects` can now be used with establishing a `WebSocket` connection and providing that as the connection to communicate over `SharedObjects`.
  - The Red5 Pro HTML SDK provides a `Red5ProSharedObjectSocket` class to serve as a proxy to an underlying `WebSocket` and convenience in communicating to and from the Red5 Pro Server when using `SharedObjects`.
  - The `SharedObject` API can still be employed using a stream client connection as was possible in previous SDK versions.

Additionally, notification support for latest browser vendor restictions on the `autoplay` policy have been included.

- Utilize the `muteOnAutoplayRestriction` initialization configuration property for Subscriber clients in order to attempt auto-muting of subscribers to allow - at least - video auto-playback when browsers enforce the muted autoplay policy.
- Listen for events related to `autoplay` restictions in order to provide a better User Experience for your customers.
- Please refer to the `Autoplay Restictions` section from the _Subscriber_ documentation.

# Migrating from `5.0.0` to `5.4.0`

The `5.4.0` release of the Red5 Pro HTML SDK saw some minor changes related to WebRTC clients, and in particular how WebSoskcet and RTCPeerConnections are made:

- The default ports used for WebSocket connection change from `8081` and `8083` (insecure and secure, respectively) to `5080` and `443` (insecure and secure, respectively.
  - WebSocket communication with the Red5 Pro Server will now be made over the same port for HTTP/S.
  - To support backward compatiibilty for webapps out in the wild, the HTML SDK will recognize previously defaulted values and silently change the values to new default values.
- The `iceServers` configuration property has been deprecated in favor of the new `rtcConfiguration` configuration property.
  - [Refer to section: RTCConfiguration](#rtcconfiguration)

## RTCConfiguration

Prior to the `5.4.0` release of the Red5 Pro HTML SDK, configuration of underlying `RTCPeerConnection`s for both publisher and subscriber clients was constructed "under the hood". The only property exposed on the initialization configuration was the `iceServers` property.

Using the `iceServers` configuration property, developers could deine the set of ICE endpoints desired in the peer negotiation process.

The `iceServers` configuration property has been deprecated in favor of the newly introduced `rtcConfiguration` property, exposing to developers more control over the `RTCConfiguration` used when establishing `RTCPeerConnection`s for both publisher and subscriber clients.

The `rtcConfiguration` is an object that directly correlates to the `RTCConfiguration` object that is handed to a `RTCPeerConnection` upon instantiation:

[https://developer.mozilla.org/en-US/docs/Web/API/RTCConfiguration](https://developer.mozilla.org/en-US/docs/Web/API/RTCConfiguration)

### RTCConfiguration Example

Previously, developers would define the desired ICE endpoints for negotiation using the `iceServers` initialization configuration property:

```js
const config = {
  host: 'myserver.com',
  protocol: 'wss',
  port: 443,
  app: 'live',
  streamName: 'mystream',
  iceServers: [{ urls: 'stun:stun2.l.google.com:19302' }],
}
var publisher = new red5prosdk.RTCPublisher()
publisher
  .init(config)
  .then(() => {
    publisher.publish()
  })
  .catch((error) => {
    // handle error.
  })
```

With the introduction of the `rtcConfiguration` initialization configuration property, developers can still define the desired `iceServers` but as a nested attribute in the `rtcConfiguration` map:

```js
const config = {
  host: 'myserver.com',
  protocol: 'wss',
  port: 443,
  app: 'live',
  streamName: 'mystream',
  rtcConfiguration: {
    iceServers: [{ urls: 'stun:stun2.l.google.com:19302' }],
    iceCandidatePoolSize: 2,
    bundlePolicy: 'max-bundle',
  },
}
var publisher = new red5prosdk.RTCPublisher()
publisher
  .init(config)
  .then(() => {
    publisher.publish()
  })
  .catch((error) => {
    // handle error.
  })
```

> The `rtcConfiguration` is an object that directly correlates to the `RTCConfiguration` object that is handed to a `RTCPeerConnection` upon instantiation: [https://developer.mozilla.org/en-US/docs/Web/API/RTCConfiguration](https://developer.mozilla.org/en-US/docs/Web/API/RTCConfiguration)

# Migrating from `4.0.0` to `5.0.0`

The `5.0.0` release of the Red5 Pro HTML SDK mainly focused on internal bug fixes and compliancy changes to match updates to the Red5 Pro Server v5.0.0 release.

To see updates that may cause possible issues in integration with your webapp(s), please refer to the _CHANGES_ documentation distributed with the Red5 Pro HTML SDK available from your [Red5 Pro Account](https://account.red5.net/).

# Migrating from `3.5.0` to `4.0.0`

The `4.0.0` release of the Red5 Pro HTML SDK saw some major changes in the following features:

- Internalizing the `getUserMedia` request in order to simplify the intialization-to-broadcast sequence of **Publishers**.
  - While the default process of accessing a stream through the `getUserMedia` API of the browser has been internalized to the SDK, we have also exposed a way to override this default to allow developers to specifically handle this process as per requirements.
  - [Refer to section: Internalizing gUM Requests](#internalizing-gum-requests)
- Removal of explicitly defining and assigning views for **Publishers** and **Subscribers**.
  - The process of associating a view display to either a **Publisher** or a **Subscriber** has been internalized with access to DOM elements using a default `mediaElementId` configuration property.
  - This change simplifies the creation and initialization process for both **Publishers** and **Subscribers**.
  - While the default process of associating a view to a broadcast or subscriber session is based on a `mediaElementId` configuration property, developers are able to define which `video` or `audio` DOM element they prefer to use as the display by providing its `id` attribute value.
  - [Refer to section: Removal of View Attachment](#removal-of-view-attachment)
- Introduction of Red5 Pro HTML SDK Playback Controls.
  - In response to numerous requests regarding playback controls across the several **Subscriber** platforms we support, we have exposed an API for playback control and provide default UI elements and styles.
  - This allows for consistent cross-browser look-and-feel of playback controls across all playback formats: WebRTC, Flash, and HLS.
  - The Red5 Pro HTML SDK Playback Controls UI is completely customizable in styling to meet the branding requirements for developers.
  - By exposing a playback API, we allow developers to create their own custom controls - not relying on the Red5 Pro HTML SDK Playback Controls UI - to meet their own product requirements.
  - [Refer to section: Red5 Pro HTML SDK Playback Controls](#red5-pro-html-sdk-playback-controls)
- Change in **Subscriber** API from `play()` to `subscribe()` as request to start playback.
  - This change is in keeping the Red5 PRo HTML SDK Playback Controls API in-line with consistent method names that properly describe their intent - e.g., `play`, `pause`, `resume`, etc.
  - The method change to `subscribe` also keeps consistent method naming convention for **Publishers** and **Subscribers**, as the method name to request publishing for **Publishers** is `publish`.
  - [Refer to section: Subscriber API Changes](#subscriber-api-changes)
- Change in **Subscriber** API from `stop()` to `unsubscribe()` as request to cancel current playback.
  - This change is in keeping the Red5 PRo HTML SDK Playback Controls API in-line with consistent method names that properly describe their intent - e.g., `play`, `pause`, `resume`, etc.
  - The method change to `unsubscribe` also keeps consistent method naming convention for **Publishers** and **Subscribers**, as the method name to request cancel of publishing for **Publishers** is `unpublish`.
  - [Refer to section: Subscriber API Changes](#subscriber-api-changes)
- Removal of auto-play from **Subscriber** functionality.
  - In previous versions of the Red5 Pro HTML SDK, all **Subscriber** types (WebRTC, Flash, and HLS) would begin playback automatically upon successful connection and subscription to a broadcast stream. This functionality has been removed.
  - Instead, the node properties of the [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) (e.g., `<video>` and `<audio>`) should be used to dictate that `autoplay` is requested.
  - The three [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) node properties that the Red5 Pro HTML SDK recognizes in establishing a subscription session are:
    - `muted` - in order to mute the audio upon initial playback.
    - `autoplay` - in order to automatically start playing the stream upon successful subscription.
    - `controls` - as discusses in [Red5 Pro HTML SDK Playback Controls](#red5-pro-html-sdk-playback-controls).
  - [Refer to section: Subscriber API Changes](#subscriber-api-changes)
- Removal of [VideoJS](http://videojs.com/) support in Flash/RTMP and HLS clients.
  - The integration with [VideoJS](http://videojs.com/) was originally intended to allow for easy failover to Flash if HLS was not supported. As the Red5 Pro HTML SDK started to support its own failover logic, the integration became unnecessary.
  - [Refer to section: Removal of VideoJS](#removal-of-videojs)

# Internalizing gUM Requests

> This change affects the WebRTC-based Publisher instances.

- [Defining mediaConstraints](#defining-mediaconstraints)
- [Overriding Default Request](#overriding-default-request)

The `getUserMedia` (a.k.a. `gUM`) requests in pre-`4.0.0` versions of the SDK were externalized for WebRTC-based **Publishers**. This meant that developers had an intermediary step between initializing a **Publisher** and requesting to start publishing that involved requesting the `MediaStream` from the browser by invoking `getUserMedia`.

While this step allowed developers to specify the desired `MediaConstraints`, the requirement of fulfilling the request and handing the resulting `MediaStream` over to the preview display and **Publisher** seemed an unnecessary and cumbersome step in starting a broadcast session.

Starting in the `4.0.0` version of the Red5 Pro HTML SDK, the `gUM` request is internalized and uses the `mediaConstraint` property of the initialization configuration. It is suggested that the structure of this property - provided by developers upon initialization request of a **Publisher** instance - follow the structure of [MediaStreamConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints).

The default `MediaConstraint` used - if not provided on the `mediaConstraint` initialization configuration - is:

```js
{
  "audio": true,
  "video": {
    "width": {
      "exact": 640
    },
    "height": {
      "exact": 480
    }
  }
}
```

## Defining mediaConstraints

The following sections show the code required to start a broadcast session between `3.5.0` and `4.0.0` using media constraints:

### MediaConstraints in 3.5.0 SDK

The `getUserMedia` request was required as an intermediary step prior to broadcasting:

```js
;(function (red5prosdk) {
  'use strict'

  var configuration = {} // not defined for clarity in this example.

  var publisher = new red5prosdk.Red5ProPublisher()
  var view = new red5prosdk.PublisherView()
  view.attachPublisher(publisher)

  publisher.init(configuration).then(function (selectedPublisher) {
    // externalized request for MediaStream using gUM.
    if (selectedPublisher.getType().toLowerCase() === 'rtc') {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            width: 640,
            height: 480,
          },
        })
        .then(function (mediaStream) {
          view.preview(mediaStream)
          selectedPublisher.attachStream(mediaStream)
          selectedPublisher.publish()
        })
    } else {
      selectedPublisher.publish()
    }
  })
})(window.red5prosdk)
```

### MediaConstraints in 4.0.0 SDK

The `getUserMedia` request is internalized and executed using the `mediaConstraints` property of the initialization configuration.

```js
;(function (red5prosdk) {
  'use strict'

  var configuration = {} // not defined for clarity in this example.

  var publisher = new red5prosdk.Red5ProPublisher()
  // Using the new init config attribute.
  configuration.mediaContraints = {
    audio: true,
    video: {
      width: 640,
      height: 480,
    },
  }

  publisher.init(configuration).then(function (selectedPublisher) {
    selectedPublisher.publish()
  })
})(window.red5prosdk)
```

## Override Default Request

While the `getUserMedia` request has been internalized by default, the Red5 Pro HTML SDK also allows developers to override that default behavior if they wish to explicitly access and provide the `MediaSteam` instance for WebRTC-based publishers to use.

The `4.0.0` SDK release exposes a `onGetUserMedia` initialization configuration property that can be used to override the internalized `gUM` request.

If the `onGetUserMedia` initialization configuration property is set, that method will be invoked and the initialization sequence will be halted until its expected return `Promise` is resolved or rejected.

> The `onGetUserMedia` property expects no arguments and requires a `Promise` to be returned. The `resolve` payload of the `Promise` is expected to be a `MediaStream` instance.

The following example utilizes the `onGetUserMedia` override to request the `MediaStream` directly from the `MediaDevices` of `navigator`:

```js
;(function (red5prosdk) {
  'use strict'

  var configuration = {} // not defined for clarity in this example.

  var publisher = new red5prosdk.Red5ProPublisher()
  // Using the onGetUserMedia override.
  configuration.onGetUserMedia = function () {
    // navigator.mediaDevices.getUserMedia returns a Promise.
    return navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: 640,
        height: 480,
      },
    })
  }

  publisher.init(configuration).then(function (selectedPublisher) {
    selectedPublisher.publish()
  })
})(window.red5prosdk)
```

# Removal of View Attachment

> This change affects all **Publisher** and **Subscriber** types.

- [Defining mediaElementId](#defining-mediaelementid)
- [Using the default mediaElementId](#using-the-default-mediaelementid)

In the `3.5.0` version of the Red5 Pro HTML SDK, developers were required to define a `PublisherView` or a `PlaybackView` for **Publishers** and **Subscribers**, respectively, if the stream was to be shown in a target DOM element. This requirement has been removed.

In its replacement is a new initialization configuration property: `mediaElementId`. This property is the `id` attribute value of the target DOM element that should display the broadcast preview or playback stream for **Publishers** and **Subscribers**, respectively.

A default value is used in the SDK, if one is not provided on the initialization configuration. The default `mediaElementId` for **Publishers** and **Subscribers** is:

| Type       | mediaElementId       |
| :--------- | :------------------- |
| Publisher  | `red5pro-publisher`  |
| Subscriber | `red5pro-subscriber` |

## Defining mediaElementId

The following sections show the code required to have a DOM element display the broadcast and subscription streams:

### Element `id` usage in 3.5.0 SDK

In the `3.5.0` version of the Red5 Pro HTML SDK, a view was required in order to display the broadcast and subscription streams.

```html
<!doctype html>
<html>
  <head>
    <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
    <script src="lib/red5pro/red5pro-sdk.min.js"></script>
  <head>
  <body>
    <video id="red5pro-publisher" muted></video>
    <video id="red5pro-subscriber" controls></video>
    <script>
        (function (red5prosdk) {
          'use strict';

          var pubConfiguration = {}; // not defined for clarity in this example.
          var subConfiguration = {}; // not defined for clarity in this example.

          var publisher = new red5prosdk.Red5ProPublisher();
          var subscriber = new red5prosdk.Red5ProSubscriber();

          var publisherView = new red5prosdk.PublisherView('red5pro-publisher');
          var subscriberView = new red5prosdk.PlaybackView('red5pro-publisher');

          publisherView.attachPublisher(publisherView);
          subsceiberView.attachSubscriber(subscriberView);

          publisher.init(pubConfiguration)
            .then(function (selectedPublisher) {
              publisher.publish();
            });

          subscriber.init(subConfiguration)
            .then(function (selectedSubscriber) {
              subscriber.play();
            });

        })(window.red5prosdk);
    </script>
  </body>
</html>
```

### Element `id` usage in 4.0.0 SDK

The requirement for creating a view and attaching either the **Publisher** or **Subscriber** instance has been removed. Instead, a `mediaElementId` property on the initialization configuration is recognized and used in establishing playback in a DOM element:

```html
<!doctype html>
<html>
  <head>
    <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
    <script src="lib/red5pro/red5pro-sdk.min.js"></script>
  <head>
  <body>
    <video id="red5pro-publisher" muted></video>
    <video id="red5pro-subscriber" controls autoplay></video>
    <script>
        (function (red5prosdk) {
          'use strict';

          var pubConfiguration = {}; // not defined for clarity in this example.
          var subConfiguration = {}; // not defined for clarity in this example.

          publisher.mediaElementId = 'red5pro-publisher';
          subscriber.mediaElementId = 'red5pro-subscriber';

          var publisher = new red5prosdk.Red5ProPublisher();
          var subscriber = new red5prosdk.Red5ProSubscriber();

          publisher.init(pubConfiguration)
            .then(function (selectedPublisher) {
              publisher.publish();
            });

          subscriber.init(subConfiguration)
            .then(function (selectedSubscriber) {
              subscriber.subscribe();
            });

        })(window.red5prosdk);
    </script>
  </body>
</html>
```

## Using the default mediaElementId

By defining the `id` attribute of the target [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) with the default values for **Publishers** and **Subscribers** - `red5pro-publisher` and `red5pro-subscriber`, respectively - then, the `mediaElementId` property does not have to be provided on the initialization configuration object:

```html
<!doctype html>
<html>
  <head>
    <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
    <script src="lib/red5pro/red5pro-sdk.min.js"></script>
  <head>
  <body>
    <video id="red5pro-publisher" muted></video>
    <video id="red5pro-subscriber" controls autoplay></video>
    <script>
        (function (red5prosdk) {
          'use strict';

          var pubConfiguration = {}; // not defined for clarity in this example.
          var subConfiguration = {}; // not defined for clarity in this example.

          var publisher = new red5prosdk.Red5ProPublisher();
          var subscriber = new red5prosdk.Red5ProSubscriber();

          publisher.init(pubConfiguration)
            .then(function (selectedPublisher) {
              publisher.publish();
            });

          subscriber.init(subConfiguration)
            .then(function (selectedSubscriber) {
              subscriber.subscribe();
            });

        })(window.red5prosdk);
    </script>
  </body>
</html>
```

# Red5 Pro HTML SDK Playback Controls

> This change affects all **Subscriber** types.

In response to numerous requests, we have unified the playback controls of the various **Subscriber** types - WebRTC, Flash and HLS.

This feature provides consistent cross-browser, cross-player UI and functionality and is customizable to allow for branding.

The Playback Controls are "turned on" by declaring a `controls` property and the class assignment of `red5pro-media` on the target [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement). If either of these are not present on the element, the default behaviour of the browser is utilized.

> Please refer to the [Playback Controls Document](playbackcontrols.md) for more information on this feature.

# Subscriber API Changes

> This change affects all **Subscriber** types.

Several API changes have been made for **Subscribers** in the `4.0.0` version of the Red5 Pro HTML SDK. In particular, the method names for requesting to start and stop a subscription have been changed in accordance to the nomenclature of the API for [Red5 Pro HTML SDK Playback Controls](#red5-pro-html-sdk-playback-controls) and the automatic playback of streams has been removed and made dependent on DOM element attributes.

You can find more information about these changes in the following sections:

- [Start Subscription API Change](#start-subscription-api-change)
- [Stop Subscription API Change](#stop-subscription-api-change)
- [Autoplay Change](#autoplay-change)

## Start Subscription API Change

In the `3.5.0` version of the Red5 Pro HTML SDK, the request to start subscription and playback was made by invoking the API call of `play()`. The `4.0.0` version of the SDK introduces the custom [Playback Controls](#red5-pro-html-sdk-playback-controls), and with it, an API to control the playback of a stream. As such, the request to start playback was moved to the `play` method of the Playback Controls API, and the request to start subscription was changed to `subscribe`.

### Subscription start in 3.5.0 SDK

In the `3.5.0` version of the SDK, subscription request and playback where bundled together in the `play()` invocation on a **Subscriber**:

```html
<!doctype html>
<html>
  <head>
    <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
    <script src="lib/red5pro/red5pro-sdk.min.js"></script>
  <head>
  <body>
    <video id="red5pro-subscriber" controls></video>
    <script>
        (function (red5prosdk) {
          'use strict';

          var configuration = {}; // not defined for clarity in this example.

          var subscriber = new red5prosdk.Red5ProSubscriber();
          var view = new red5prosdk.PlaybackView('red5pro-subscriber');
          view.attachSubscriber(subscriber);

          subscriber.init(configuration)
            .then(function (selectedSubscriber) {
              selectedSubscriber.play();
            });

        })(window.red5prosdk);
    </script>
  </body>
</html>
```

### Subscription start in 4.0.0 SDK

In the `4.0.0` version of the SDK, subscription request is made by invoking `subscribe()` and playback is delegated to the Red5 Pro HTML SDK Playback Controls and element attributes:

```html
<!doctype html>
<html>
  <head>
    <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
    <script src="lib/red5pro/red5pro-sdk.min.js"></script>
  <head>
  <body>
    <video id="red5pro-subscriber" controls></video>
    <script>
        (function (red5prosdk) {
          'use strict';

          var configuration = {}; // not defined for clarity in this example.

          var subscriber = new red5prosdk.Red5ProSubscriber();

          subscriber.init(configuration)
            .then(function (selectedSubscriber) {
              selectedSubscriber.subscribe();
            })
            .then(function (selectedSubscriber) {
              selectedSubscriber.play();
            });

        })(window.red5prosdk);
    </script>
  </body>
</html>
```

## Stop Subscription API Change

In the `3.5.0` version of the Red5 Pro HTML SDK, the requests to stop subscription and playback were made by invoking the API call of `stop()`. The `4.0.0` version of the SDK introduces the custom [Playback Controls](#red5-pro-html-sdk-playback-controls), and with it, an API to control the playback of a stream. As such, the request to stop playback was moved to the `stop` method of the Playback Controls API, and the request to stop subscription was changed to `unsubscribe`.

### Subscription stop in 3.5.0 SDK

In the `3.5.0` version of the SDK, unsubscription request and stop of playback where bundled together in the `stop()` invocation on a **Subscriber**:

```html
<!doctype html>
<html>
  <head>
    <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
    <script src="lib/red5pro/red5pro-sdk.min.js"></script>
  <head>
  <body>
    <video id="red5pro-subscriber" controls></video>
    <button id="unsubscribe-button">unsubscribe</button>
    <script>
        (function (red5prosdk) {
          'use strict';

          var configuration = {}; // not defined for clarity in this example.

          var targetSubscriber;  // holds reference to determined subscriber instance.

          var subscriber = new red5prosdk.Red5ProSubscriber();
          var view = new red5prosdk.PlaybackView('red5pro-subscriber');
          view.attachSubscriber(subscriber);

          subscriber.init(configuration)
            .then(function (selectedSubscriber) {
              targetSubscriber = selectedSubscriber;
              targetSubscriber.play();
            });

          var stopSubscription = function () {
            targetSubscriber.stop()
              .then(function () {
                // successful stop and unsubscribe of playback.
              });
          }
          document.getElementById('unsubscribe-button')
            .addEventListener('click', stopSubscription);

        })(window.red5prosdk);
    </script>
  </body>
</html>
```

### Subscription stop in 4.0.0 SDK

In the `4.0.0` version of the SDK, unsubscription request is made by invoking `unsubscribe()` and request to stop playback is delegated to the Red5 Pro HTML SDK Playback Controls API:

```html
<!doctype html>
<html>
  <head>
    <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
    <script src="lib/red5pro/red5pro-sdk.min.js"></script>
  <head>
  <body>
    <video id="red5pro-subscriber" controls></video>
    <button id="unsubscribe-button">unsubscribe</button>
    <script>
        (function (red5prosdk) {
          'use strict';

          var configuration = {}; // not defined for clarity in this example.

          var targetSubscriber;  // holds reference to determined subscriber instance.

          var subscriber = new red5prosdk.Red5ProSubscriber();

          subscriber.init(configuration)
            .then(function (selectedSubscriber) {
              targetSubscriber = selectedSubscriber;
              targetSubscriber.play();
            });

          var stopSubscription = function () {
            targetSubscriber.stop()
              .then(targetSubscriber.unsubscribe)
              .then(function () {
                // successful stop and unsubscribe of playback.
              });
          }
          document.getElementById('unsubscribe-button')
            .addEventListener('click', stopSubscription);

        })(window.red5prosdk);
    </script>
  </body>
</html>
```

## Autoplay Change

In the `3.5.0` version of the Red5 Pro HTML SDK, playback started automatically in the bundle of subscription request and playback from the `play` method incocation. Essentially, a request to connect and subscribe to a stream was a request to start playback immediately once the stream is received.

In the `4.0.0` version, the separation of subscription request and playback od stream has been introduced. Instead, the auto-playback feature can be turned on by defining the `autoplay` attribute on the target [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement).

### Autoplay capability in 3.5.0 SDK

In the `3.5.0` version of the SDK, subscription request and playback where bundled together in the `play()` invocation on a **Subscriber**, which resulted in auto-playback of the stream upon successful subscription:

```html
<!doctype html>
<html>
  <head>
    <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
    <script src="lib/red5pro/red5pro-sdk.min.js"></script>
  <head>
  <body>
    <video id="red5pro-subscriber" controls></video>
    <script>
        (function (red5prosdk) {
          'use strict';

          var configuration = {}; // not defined for clarity in this example.

          var subscriber = new red5prosdk.Red5ProSubscriber();
          var view = new red5prosdk.PlaybackView('red5pro-subscriber');
          view.attachSubscriber(subscriber);

          subscriber.init(configuration)
            .then(function (selectedSubscriber) {
              selectedSubscriber.play();
            });

        })(window.red5prosdk);
    </script>
  </body>
</html>
```

### Autoplay capability in 4.0.0 SDK

In the `4.0.0` version of the SDK, a separation of subscription and playback is introduced. Auto-playback is possible through defining the `autoplay` attribute on the target **HTMLMediaElement**:

```html
<!doctype html>
<html>
  <head>
    <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
    <script src="lib/red5pro/red5pro-sdk.min.js"></script>
  <head>
  <body>
    <video id="red5pro-subscriber" controls autoplay></video>
    <script>
        (function (red5prosdk) {
          'use strict';

          var configuration = {}; // not defined for clarity in this example.

          var subscriber = new red5prosdk.Red5ProSubscriber();

          subscriber.init(configuration)
            .then(function (selectedSubscriber) {
              selectedSubscriber.subscribe();
            });

        })(window.red5prosdk);
    </script>
  </body>
</html>
```

# Removal of VideoJS

In the `3.5.0` version of the Red5 Pro HTML SDK, the option to utilize the [VideoJS](http://videojs.com/) as a HLS/Flash failover was provided.

Additionally, if **VideoJS** was used, it provided custom playback controls. With the release of version `4.0.0`, we have provided the ability to display and customize playback controls. _[Refer to section: Red5 Pro HTML SDK Playback Controls](#red5-pro-html-sdk-playback-controls)_.

For these reasons, the inclusion of [VideoJS](http://videojs.com/) as a dependency in HLS failover and playback controls has been removed.

However, it does not mean that you are not permitted to use _VideoJS_ for playback. It is entirely possible and detailed in the following example. Do note that if you use _VideoJS_ for playback, you are not encorporating the Red5 Pro HTML SDK and will not benefit from all that brings - such as: stream message communication, Shared Objects, etc.

## Using VideoJS for Playback

Playback of a stream being broadcast to a Red5 Pro Server is possible using [VideoJS](http://videojs.com/). All that is required is knowledge of the stream endpoint URL to provide:

```html
<!doctype html>
<html>
  <head>
    <title>Red5 Pro HTML SDK - Playback</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width">
    <link href="//vjs.zencdn.net/5.19/video-js.min.css" rel="stylesheet">
    <script src="https://unpkg.com/video.js/dist/video.js"></script>
    <script src="https://unpkg.com/videojs-contrib-hls/dist/videojs-contrib-hls.js"></script>
    <script src="https://unpkg.com/videojs-flash/dist/videojs-flash.js"></script>
    <style>
      #my-player {
        width: 640px;
        height: 480px;
      }
    </style>
  </head>
  <body>
        <video
            id="my-player"
            class="video-js"
            controls
            data-setup='{}'>
          <!--FLV files. -->
          <source src="http://localhost:5080/live/mystream.flv" type="video/flv"></source>
          <!-- HLS (m3u8) files. -->
          <source src="http://localhost:5080/live/mystream.m3u8" type="application/x-mpegURL"></source>
          <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that
            <a href="http://videojs.com/html5-video-support/" target="_blank">
              supports HTML5 video
            </a>
          </p>
        </video>
        <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
        <script>
          (function (window, VideoJS) {
            'use strict';
            var videoElement = document.getElementById('my-player');
            var v;
            function getVJS() {
              return v;
            }
            v = new VideoJS(videoElement, {
              techOrder: ['html5', 'flash']
            }, function () {
              // success.
            });
          })(window, window.videojs);
        </script>
  </body>
</html>
```

In this example, if you are broadcasting a stream called `mystream` on a Red5 Pro Server served from `localhost`, the base URI for the stream endpoint would be:

```text
http://localhost:5080/live/mystream
```

The file extension will change for each `source` based on the container mime type you want to display: either HLS (`m3u8`) or Flash (`flv`). The required _VideoJS_ library dependencies are loaded and a new `VideoJS` object created to start request of stream and playback.

This example demonstrates the use of [VideoJS](http://videojs.com/) for live and VOD stream playback from Red5 Pro Server. Please note that the Red5 Pro HTML SDK is not used at all in this example. As such, WebRTC playback is not supported and various other features provided by the SDK are not available; the purpose of this example was to demonstrate how to still use _VideoJS_ for playback if that is your current requirement, as it has been removed from the Red5 Pro HTML SDK.

## More Information

> Please refer to the [VideoJS](http://videojs.com/) documentation for further information.

### Source: `README.md`

<h3 align="center">
  <img src="assets/Red5_Truetime_black.png" alt="Red5 Pro Logo" height="65" />
</h3>
<p align="center">
  <a href="#">Quick Start</a> &bull;
  <a href="docs/whip-client.md">Publishing</a> &bull;
  <a href="docs/whep-client.md">Subscribing</a> &bull;
  <a href="docs/moq-publisher.md">MOQ Publishing</a> &bull;
  <a href="docs/moq-subscriber.md">MOQ Subscribing</a> &bull;
  <a href="docs/moq-catalog.md">MOQ Catalog</a> &bull;
  <a href="docs/message-channel.md">Message Channel</a> &bull;
  <a href="docs/pubnub-client.md">PubNub Client</a>
</p>

---

# Red5 HTML SDK

> The **Red5 HTML SDK** allows you to integrate live streaming video into your desktop and mobile browser.

* [Important Notices](#important-notices)
* [Installation](#installation)
* [Quick Start](#quick-start)
* [Usage](#usage)

# Important Notices

With the `15.0.0` release of the **Red5 HTML SDK**, we have complete overhaul of its development and focus. We have decided to focus solely on **WISH** (WebRTC Ingest Signaling over HTTPS) and dropped WebSocket support previously used for signaling phase.

As such, the publishing and subscribing logic within the SDK are provided from the `WHIPClient` and `WHEPClient`, respectively.

Not only does this free up resources consumed by WebSockets on the Red5 Server deployment, but also provides a _much_ lighter client-side dependency!

# Installation

## As Script Dependency in HTML page

```html
<script src="https://cdn.jsdelivr.net/npm/red5pro-webrtc-sdk@latest/red5pro-sdk.min.js"></script>
```

... Or if you know the version:

```html
<script src=https://cdn.jsdelivr.net/npm/red5pro-webrtc-sdk@15.0.0/red5pro-sdk.min.js"></script>
```

## Using `npm` or `yarn` for you browser-based projects

```sh
npm install --save red5pro-webrtc-sdk
```

```sh
yarn install red5pro-webrtc-sdk
```

# Quick Start

All members exposed on the otherwise global `window.red5prosdk` if loading as a script on an HTML page are importable from the `red5pro-webrtc-sdk` module:

_index.js_

```js
import { WHIPClient, WHEPClient } from 'red5pro-webrtc-sdk'
```

## Quick Start - Standalone Server Deployment

You can sign up and download the Red5 Server to manage your own deployment at [https://account.red5.net](https://account.red5.net)! The following example demonstrate how to create a Two-Way stream (publisher and subscriber) against a standalone single Red5 Server:

```html
<!doctype html>
<html>
  <head>
    <!-- *Recommended WebRTC Shim -->
    <script src="https://webrtchacks.github.io/adapter/adapter-latest.js"></script>
  </head>
  <body>
    <!-- video containers -->
    <!-- publisher -->
    <div>
      <video id="red5pro-publisher" width="640" height="480" muted autoplay playsinline></video>
    </div>
    <!-- subscriber -->
    <div>
      <video id="red5pro-subscriber" width="640" height="480" controls autoplay playsinline></video>
    </div>
    <!-- Red5 HTML SDK -->
    <script src="https://cdn.jsdelivr.net/npm/red5pro-webrtc-sdk@latest/red5pro-sdk.min.js"></script>
    <!-- Create Pub/Sub -->
    <script>
      ((red5prosdk) => {
        'use strict'

        const { WHIPClient, WHEPClient, PublisherEventTypes } = red5prosdk

        const publisher = new WHIPClient()
        const subscriber = new WHEPClient()
        
        const config = {
          host: 'mydeploy.red5.net',
          streamName: 'mystream'
        }

        const subscribe = async () => {
          try {
            await subscriber.init(config)
            await subscriber.subscribe()
          } catch (err) {
              console.error('Could not play: ' + err)
          }
        }

        const publish = async () => {
          try {
            // Once publishing, call subscribe!
            publisher.on(PublisherEventTypes.PUBLISH_AVAILABLE, subscribe)
            await publisher.init(config)
            await publisher.publish()
          } catch(err) {
            console.error('Could not publish: ' + err)
          }
        }

        // Start Publisher first ->
        publish()

      }(window.red5prosdk))
    </script>
  </body>
</html>
```

## Quick Start - Red5 Cloud / StreamManager 2.0 Deployment

You can sign up for a Pay-As-You-Grow Cloud deployment of the Red5 Cloud infrastructure with autoscaling at [https://cloud.red5.net](https://cloud.red5.net)!

The Red5 Cloud deployment utilizes a Stream Manager for autoscaling. With the Stream Manager 2.0 Release, the `endpoint` init configuration property was introduced in the SDK to allow developers to specify the specific endpoint to proxy through on the Stream Manager.

> Note: You will need to know which Node Group you intend to target for publishing and subscribing.

```html
<!doctype html>
<html>
  <head>
    <!-- *Recommended WebRTC Shim -->
    <script src="https://webrtchacks.github.io/adapter/adapter-latest.js"></script>
  </head>
  <body>
    <!-- video containers -->
    <!-- publisher -->
    <div>
      <video id="red5pro-publisher" width="640" height="480" muted autoplay playsinline></video>
    </div>
    <!-- subscriber -->
    <div>
      <video id="red5pro-subscriber" width="640" height="480" controls autoplay playsinline></video>
    </div>
    <!-- Red5 HTML SDK -->
    <script src="https://cdn.jsdelivr.net/npm/red5pro-webrtc-sdk@latest/red5pro-sdk.min.js"></script>
    <!-- Create Pub/Sub -->
    <script>
      <script>
      ((red5prosdk) => {
        'use strict'

        const host = 'my-deployment.cloud.red5.net'
        const nodeGroup = 'my-node-group'
        const streamName = 'my-stream-name'

        const { WHIPClient, WHEPClient, PublisherEventTypes } = red5prosdk
        const publisher = new WHIPClient()
        const subscriber = new WHEPClient()

        const config = {
          streamName,
          connectionParams: {
            nodeGroup
          }
        }

        const subscribe = async () => {
          try {
            await subscriber.init({
              ...config,
              endpoint: `https://${host}/as/v1/proxy/whep/live/${streamName}`
            })
            await subscriber.subscribe()
          } catch (err) {
              console.error('Could not play: ' + err)
          }
        }

        const publish = async () => {
          try {
            // Once publishing, call subscribe!
            publisher.on(PublisherEventTypes.PUBLISH_START, subscribe)
            await publisher.init({
              ...config,
              endpoint: `https://${host}/as/v1/proxy/whip/live/${streamName}`
            })
            await publisher.publish()
          } catch(err) {
            console.error('Could not publish: ' + err)
          }
        }

        // Start Publisher first ->
        publish()

      }(window.red5prosdk))
    </script>
  </body>
</html>
```

# Usage

The [WHIPClient](docs/whip-client.md) and [WHEPClient](docs/whep-client.md) - along with the [Native HLSSubscriber](docs/hls-subscriber.md) - each take an initialization configuration in order to perform the signaling and negotiation process with the Red5 Server to start publishing or subscribing to a stream, respectively.

The initialization configurations and relevant APIs available for each client can be found in their respective documentation found in this repo:

* [WHIPClient](docs/whip-client.md)
* [WHEPClient](docs/whep-client.md)
* [HLSSubscriber](docs/hls-subscriber.md)
* [MOQPublisher](docs/moq-publisher.md)
* [MOQSubscriber](docs/moq-subscriber.md)
* [MOQCatalog](docs/moq-catalog.md)

