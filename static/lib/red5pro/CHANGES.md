# Changes

## 6.0.0-RC4

- incremented SDK version (beetlejesss)
- listening to onresize for video resolution change in transcode. (bustardcelly)
- setting delay off controls in mobile to 6 seconds. (bustardcelly)
- better logging for fail and close. (bustardcelly)
- touch event support for controls on mobile browser. (bustardcelly)
- README updates for constraints events. (bustardcelly)
- adding rejection and acceptance notifications for gUM in RTC publishers. (bustardcelly)
- support for SharedObject initial property update on socket. (bustardcelly)
- i guess HLS doesn't have video dimensions on data load... (bustardcelly)
- added Video Dimensions Change to bubble up playback dimensions. (bustardcelly)
- Fix for flash stalled playback. (bustardcelly)
- failing subscriber/publisher on ice connection fail. (bustardcelly)
- build for examples. (bustardcelly)
- not using NetStream video dimensions change to determine video aspect ratio. (bustardcelly)
- Added notifications for RTCPeerConnection open event. (bustardcelly)

    > This will allow for clients to recognize when they can start using peer connection APIs such as mute/unmute.

- fix for HLS socket authentication failure capture. (bustardcelly)
- fixing build and deploy targets. (bustardcelly)
- renaming dist directory. (bustardcelly)
- renaming dist directory. (bustardcelly)
- adding in post doc processing for SEO. (bustardcelly)
- adding license. (bustardcelly)
- Fix for Safari Publisher issue. (bustardcelly)

    > When `gUM` returns with `video` track listed before `audio`, there is an issue on delivering the media to the server. Most likely due to mismatched candidates.

- Fixed improper spelling of `productInstallUrl` config option. (bustardcelly)

    > Is now `productInstallURL` for both rtmp publisher and subscriber.

- fixe for unpublish not resolving if not currently publishing. (bustardcelly)
- proper callback name for hls metadata. (bustardcelly)
- API update to allow for providing MediaStream for publish to bypass gUM in SDK internally. (bustardcelly)
- subsequent disconnect request for RTMP subscribers on unpublish event. (bustardcelly)
- some cleanup on how streamingMode is handled for HLS. (bustardcelly)
- adding metadata change event notifications on all subscribers. (bustardcelly)
- attempts at gracefully handling empty streams. (bustardcelly)
- added in test-supported streamingMode delegate notifications. (bustardcelly)
- starting out simple test update. (bustardcelly)

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

