# Changes

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

