# Playback Controls API for Subscribers (Live Streaming & VOD)
This document covers the Controls API and usage for Subscribers from the Red5 Pro HTML SDK. The Controls API supports both _Live Streaming_ and _Video On Demand (VOD)_ across the 3 supported playback platforms: `WebRTC`, `Flash/RTMP` and `HLS`.

* [Playback Controls](#playback-controls)
  * [Enabling](#enabling-the-controls)
  * [Dependencies](#playback-controls-dependencies)
  * [Auto Play](#autoplay)
  * [Auto Mute](#auto-mute)
* [Playback Controls API](#playback-controls-api)
* [Playback Controls UI](#playback-controls-ui)
  * [Red5 Pro Video Container](#red5pro-video-container)
  * [Style Declarations](#playback-controls-style-declarations)
* Creating Custom Controls UI
* Creating Custom Controls Controller

# Playback Controls
The Playback Controls of the Red5 Pro HTML SDK provide a cross-browser and unified look-and-feel for playback of streams across the supported platforms of `WebRTC`, `Flash/RMTP` and `HLS`.

By enabling the Red5 Pro HTML SDK Playback Controls, users have the ability to due the following during stream playback:

* Pause and Resume the Stream
* Mute and Unmute the Audio of the Stream
* Control the Volume of the Audio of the Stream when unmuted
* Toggle FullScreen mode
* Seek to Timeframe on VOD (Video on Demand)

## Enabling the Controls
To turn on the custom Red5 Pro HTML SDK Playback Controls simply add the following to the target `video` element that will playback the stream:

* `controls`
* `class="red5pro-video"`

Internally, the SDK will read these attributes and override the default browser controls, replacing them with the custom Red5 Pro SDK Playback Controls.

## Playback Controls Dependencies
In order to view the controls, the `red5pro-video.css` file included in the Red5 Pro HTML SDK distribution needs to be added as a resource to the page.

Somewhere in the `head` tag, add the following:

```
<link href="lib/red5pro/red5pro-video.css" rel="sylesheet">
```

### screenfull
The full screen functionality utilized the Open Source [screenfull](https://sindresorhus.com/screenfull.js/) library. You will need to include that as a script depencency on the page as well if you intend to support full screen mode (by default the Red5 Pro Playback Controls show fullscreen toggle buttons).

Somewhere in the `head` tag - or before the declaration of the Red5 Pro SDK JavaScript dependency - add the following:
```
<script src="https://github.com/sindresorhus/screenfull.js/blob/gh-pages/dist/screenfull.min.js"></script>
```

### Example Declaration

```
<video id="red5pro-subscriber" class="red5pro-video" controls></video>
```

> If you do provide the `red5pro-video` class on the `video` element, and still include the `controls` attribute, the SDK will allow for the default browser controls.

## Autoplay
You can enable the ability to automatically start playback of the stream once it has been loaded by providing the `autoplay` attribute on the `video` element:

```
<video id="red5pro-subscriber" class="red5pro-video" controls autoplay></video>
```

## Auto Mute
You can set the playback to be automatically muted upon initial load and playback of the stream by providing the `muted` attribute on the `video` element:

```
<video id="red5pro-subscriber" class="red5pro-video" controls autoplay muted></video>
```

## Additional Information
The `controls` and `autoplay` attributes are not unique to the Red5 Pro SDK and Playback Controls API. They are browser-accepted attributes of the `video` element. The Red5 Pro SDK reads these attributes in order to determine how you wish to present controls and play back the stream.

> [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)

# Playback Controls API
The Red5 Pro HTML SDK Subscriber(s) have been updated to provide an API that interacts with stream playback. With the default Red5 Pro SDK Playback Controls enabled (as described in the (previous section)[Enabling the Controls]) - the controls interact with this API internally.

The API is available to be interacted with as seen fit by the developer - and in the case if you, as a developer, want to create your own custom controls.

| Method Name | Arguments | Description |
| :--- | :--- | :--- |
| `play` | _none_ | Request to start playing the stream. |
| `pause` | _none_ | Request to pause the current playback stream. |
| `resume` | _none_ | Request to resume the paused playback stream. |
| `stop` | _none_ | Request to stop the current playback stream. |
| `mute` | _none_ | Request to mute the current playback stream. |
| `unmute` | _none_ | Request to unmute the current playback stream. |
| `setVolume` | `Number` | Request to set volume, between `0` and `1`. |
| `seekTo` | `Number` | Request to seek to (in seconds) in VOD playback. |
| `toggleFullScreen` | _none_ | Request to toggle fullscreen mode. _Requires [screenfull.js](https://sindresorhus.com/screenfull.js/) library as a script dependency on page._ |

# Playback Controls UI
The Red5 Pro HTML SDK Playback Controls are styled based on the provided `red5pro-video.css` file of the distribution.

## Red5 Pro Video Container
The `video` declaration for a Red5 Pro Subscriber cannot have the Playback Controls UI placed within it. As such, the Red5 Pro HTML SDK detects if the `video` element is wrapped by a container with a class declaration of `red5pro-video-container` and if non-existant, creates one and adds the `video` element as a child.

By having a `red5pro-video-container` element, the SDK can then add the Player Controls UI overlay on the `video`. If you would like to provide your own container:

```
<div class="red5pro-video-container">
  <video id="red5pro-subscriber" class="red5pro-video red5pro-video-background" controls autoplay>
</div>
```

## Playback Controls Style Declarations
The CSS Style Declaration from the `red5pro-video.css` file delivered with the Red5 Pro HTML SDK has the following declarations:

| Declaration | Related Control | Description |
| :--- | :--- | :--- |

> These declarations can be changed with any other styling to match the look-and-feel of your brand.
