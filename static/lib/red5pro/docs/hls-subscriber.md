<h3 align="center">
  <img src="../assets/Red5_Truetime_black.png" alt="Red5 Pro Logo" height="65" />
</h3>
<p align="center">
  <a href="../README.md">Quick Start</a> &bull;
  <a href="whip-client.md">Publishing</a> &bull;
  <a href="whip-client.md">Subscribing</a>
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

