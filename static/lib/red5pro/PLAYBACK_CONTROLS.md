# Playback Controls API for Subscribers (Live Streaming & VOD)
This document covers the Controls API and usage for Subscribers from the Red5 Pro HTML SDK. The Controls API supports both _Live Streaming_ and _Video On Demand (VOD)_ across the 3 supported playback platforms: `WebRTC`, `Flash/RTMP` and `HLS`.

* [Playback Controls](#playback-controls)
  * [Enabling](#enabling-the-controls)
  * [Dependencies](#playback-controls-dependencies)
  * [Auto Play](#autoplay)
  * [Auto Mute](#auto-mute)
* [Playback Controls API](#playback-controls-api)
  * [Playback Events API](#playback-events-api)
  * [Custom Playback Example](#custom-playback-example)
* [Playback Controls UI](#playback-controls-ui)
  * [Red5 Pro Media Container](#red5pro-media-container)
  * [Style Declarations](#playback-controls-style-declarations)
* [Creating Custom Playback Controls](#creating-custom-playback-controls)
* [Creating Custom Controls UI](#creating-custom-controls-ui)

# Playback Controls
The Playback Controls of the Red5 Pro HTML SDK provide a cross-browser and unified look-and-feel for playback of streams across the supported platforms of `WebRTC`, `Flash/RMTP` and `HLS`.

By enabling the Red5 Pro HTML SDK Playback Controls, users have the ability to due the following during stream playback:

* Pause and Resume the Stream
* Mute and Unmute the Audio of the Stream
* Control the Volume of the Audio of the Stream when unmuted
* Toggle FullScreen mode (using the [screenfull](https://sindresorhus.com/screenfull.js/) library dependency)
* Seek to Timeframe on VOD (Video on Demand)

## Enabling the Controls
To turn on the custom Red5 Pro HTML SDK Playback Controls simply add the following to the target `video` or `audio` element that will play back the stream:

* `controls`
* `class="red5pro-media"`

Internally, the SDK will read these attributes and override the default browser controls, replacing them with the custom Red5 Pro SDK Playback Controls.

### Example:

```html
<video id="red5pro-subscriber" controls class="red5pro-media"></video>
```

## Playback Controls Dependencies
The following describes the resource dependencies required to properly display the controls and support fullscreen mode.

### css
In order to view the controls, the `red5pro-media.css` file included in the Red5 Pro HTML SDK distribution needs to be added as a resource to the page.

Somewhere in the `head` tag, add the following:

```html
<link href="lib/red5pro/red5pro-media.css" rel="sylesheet">
```

### screenfull
The full screen functionality utilized the Open Source [screenfull](https://sindresorhus.com/screenfull.js/) library. You will need to include that as a script depencency on the page as well if you intend to support full screen mode (by default the Red5 Pro Playback Controls show fullscreen toggle buttons).

Somewhere in the `head` tag - or before the declaration of the Red5 Pro SDK JavaScript dependency - add the following:
```
<script src="https://github.com/sindresorhus/screenfull.js/blob/gh-pages/dist/screenfull.min.js"></script>
```

> If you do provide the `red5pro-media` class on the `video` or `audio` element, and still include the `controls` attribute, the SDK will allow for the default browser controls.

## Autoplay
You can enable the ability to automatically start playback of the stream once it has been loaded by providing the `autoplay` attribute on the `video` or `audio` element:

```
<video id="red5pro-subscriber" class="red5pro-media" controls autoplay></video>
```

## Auto Mute
You can set the playback to be automatically muted upon initial load and playback of the stream by providing the `muted` attribute on the `video` or `audio` element:

```
<video id="red5pro-subscriber" class="red5pro-media" controls autoplay muted></video>
```

## Additional Information
The `controls`, `autoplay` and `muted` attributes are not unique to the Red5 Pro SDK and Playback Controls API. They are browser-accepted attributes of [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) (e.g., `<video>` and `<audio>`). The Red5 Pro SDK reads these attributes in order to determine how you wish to present controls and play back the stream.

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
| `mute` | _none_ | Request to mute the audio of the current playback stream. |
| `unmute` | _none_ | Request to unmute the audio of the current playback stream. |
| `setVolume` | `Number` | Request to set volume, between `0` and `1`. |
| `seekTo` | `Number` | Request to seek to (in seconds) in VOD playback. |
| `toggleFullScreen` | _none_ | Request to toggle fullscreen mode. _Requires [screenfull.js](https://sindresorhus.com/screenfull.js/) library as a script dependency on page._ |

## Playback Events API
The following events pertain to the playback of a stream through a *Subscriber* and are accessible from the SDK from `SubscriberEventTypes`.

| Access | Name | Meaning |
| :--- | :---: | :--- |
| VOLUME_CHANGE | 'Subscribe.Volume.Change' | Invoked when a change to volume is detected during playback. _From 0 to 1._ |
| PLAYBACK_TIME_UPDATE | 'Subscribe.Time.Update' | Invoked when a change in playhead time is detected during playback. _In seconds._ |
| PLAYBACK_STATE_CHANGE | 'Subscribe.Playback.Change' | Invoked when a change in playback state has occured, such as when going from a `Playback.PAUSED` state to `Playback.PLAYING` state. |
| FULL_SCREEN_STATE_CHANGE | 'Subscribe.FullScreen.Change' | Invoked when a change in fullscreen state occurs during playback. |

### VOLUME_CHANGE
The `VOLUME_CHANGE` event occurs upon:

* Initial start of playback
* Response to `mute` and `unmute`
* Response to `setVolume`

The event `data` is as shown:

```js
{
  volume: <Number, value 0 - 1>
}
```

### PLAYBACK_TIME_UPDATE
The `PLAYBACK_TIME_UPDATE` event occurs in change to playhead time.

The event `data` is as shown:

```js
{
  time: <Number, in seconds>,
  duration: <Number, in seconds>
}
```

The `duration` value is the known duration of the stream, and is only available during Video On Demand (VOD) playback.

### PLAYBACK_STATE_CHANGE
The `PLAYBACK_STATE_CHANGE` event occurs upon change to playback state of the *Subscriber*.

the event `data` is as shown:

```js
{
  code: <Int, see chart below>,
  state: <String, human readable form of code value>
}
```

The following code and corresponding states are dispatched with this event:

| Code | State | Notes |
| :--- | :--- | :--- |
| `0` | `Playback.AVAILABLE` | Listen for this state in order to recognize when the *Subscriber* has loaded enough of the stream or made an available connection to begin playback requests (such as `play`). |
| `1` | `Playback.IDLE` | Listen for this state in order to recognize when the stream playback has become "idle" from previous playback. |
| `2` | `Playback.PLAYING` | Listen for this state in order to recognize when stream playback has started or resumed. |
| `3` | `Playback.PAUSED` | Listen for this state in order to recognize when the stream playback has been paused. |

## Custom Playback Example
Please refer to section [Creating Custom Playback Controls](#creating-custom-playback-controls) to view an example of utilizing the [Playback Controls API](#playback-controls-api) and [Playback Events API](#playback-events-api) to provide custom playback controls.

# Playback Controls UI
The Red5 Pro HTML SDK Playback Controls are styled based on the provided `red5pro-media.css` file of the distribution.

## Red5 Pro Media Container
The `video` (or `audio`) declaration for a Red5 Pro Subscriber cannot have the Playback Controls UI placed within it. As such, the Red5 Pro HTML SDK detects if the `video` or `audio` element is wrapped by a container with a class declaration of `red5pro-media-container` and if non-existant, creates one and adds the `video` or `audio` element as a child.

By having a `red5pro-media-container` element, the SDK can then add the Player Controls UI overlay on the `video` or `audio` element. If you would like to provide your own container:

```
<div class="red5pro-media-container">
  <video id="red5pro-subscriber" class="red5pro-media red5pro-media-background" controls autoplay>
</div>
```

## Playback Controls Style Declarations
The CSS Style Declaration from the `red5pro-media.css` file delivered with the Red5 Pro HTML SDK has the following declarations:

| Declaration | Related Control | Description |
| :--- | :--- | :--- |
| `red5pro-media-container` | Parent container element for the `video` or `audio` element. | Assigned to the class list of parent container of media. |
| `red5pro-media` | The `video` or `audio` element. | Used to designate the media element as being eligible for Red5 Pro Playback Controls. |
| `red5pro-media-background` | The background for the `video` or `audio` element. | Sets the background style properties for the media element. |
| `red5pro-media-container-full-screen` | The media element container. | The style properties to assign for the media element container to be presented when in full screen mode. |
| `red5pro-media-control-bar` | The control bar container for the Red5 Pro Playback Controls. | Layout and parent style assignment for the control bar. |
| `red5pro-media-control-bar-show` | The control bar container. | This is as a dispaly flag on the control bar to reveal it upon roll-over. |
| `red5pro-media-control-element` | Top-level style declaration for all elements within the control bar. | Base style assignments for all immediate children of the control bar. |
| `red5pro-media-time-field` | The time display. | During playback, the playhead time is shown. |
| `red5pro-media-slider` | Top-level style declaration for slider control. | Slider controls are used in the seek control and the volume control. |
| `red5pro-media-slider-track` | Top-level style declaration for the backing track element of a slider control. | Used for all slider controls. |
| `red5pro-media-slider-progress` | Tpop-level style declaration for the progress element that overlays the track element of a slider control. | Used for all slider controls. |
| `red5pro-media-slider-button` | Top-level style declaration for the button element of a slider control. | Used for all slider controls. Defaulted to rounded element. |
| `red5pro-media-volume-slider` | Volume slider control. | A slider control with a button and track. |
| `red5pro-media-seektime-slider` | Seek time slider control. | A slider control with a button and track. |
| `red5pro-media-element-button` | Top-level style declaration for the button elements for play/pause, mute/unmute, and fullscreen toggle. |
| `red5pro-media-element-button-disabled` | Top-level style declaration for button element in disabled state. |
| `red5pro-media-play-button` | Play/Pause button. | The display while in the `Paused` and `Idle` state of the stream. |
| `red5pro-media-pause-button` | Play/Pause button. | The display while in the `P;aying` state of the stream. |
| `red5pro-media-unmute-button` | Mute/Unmute button. | The display while the stream is muted. |
| `red5pro-media-mute-button` | Mute/Unmute button. | The display while the stream is not muted. |
| `red5pro-media-fullscreen-button` | Fullscreen toggle button. | The display while the stream is not presented in fullscreen mode. |
| `red5pro-media-exit-fullscreen-button` | Fullscreen toggle button. | The display while the stream is presented in fullscreen mode. |

> These declarations can be changed with any other styling to match the look-and-feel of your brand. Please refer to [Creating Custom Controls UI](#creating-custom-controls-ui) for an example.

# Creating Custom Playback Controls
The following example demonstrates how to utilize the [Playback Controls API](#playback-controls-api) and [Playback Events API](#playback-events-api) to provide custom controls and not those provide as default from the Red5 Pro HTML SDK:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width">
    <script src="https://rawgit.com/sindresorhus/screenfull.js/gh-pages/dist/screenfull.min.js"></script>
  </head>
  <body>
    <div class="media-container">
      <video id="red5pro-subscriber"></video>
      <div> <!-- Controls -->
        <span id="time-field">00:00:00</span>
        <button id="play-pause-button" disabled>play</button>
        <button id="mute-unmute-button" disabled>mute</button>
        <button id="fullscreen-button" disabled>fullscreen</button>
      </div>
    </div>
    <script src="../lib/red5pro/red5pro-sdk.js"></script>
    <script>
      (function (window) {
         function getQueryVariable(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split('&');
            for (var i = 0; i < vars.length; i++) {
              var pair = vars[i].split('=');
              if (decodeURIComponent(pair[0]) == variable) {
                return decodeURIComponent(pair[1]);
              }
            }
            return undefined;
          }
          window.query = getQueryVariable;
       })(window);
    </script>
    <script>
    (function (window, red5pro) {

          'use strict';
          var so;
          var streamName = window.query('streamName')
          var gUM = {
            mediaConstraints: {
              video: true,
              audio: true
            }
          };
          var configuration = {
            host: "localhost",
            streamName: streamName ? streamName : "mystream",
            app: "live",
            embedWidth: "100%",
            embedHeight: 480,
            buffer: 1,
            bandwidth: {
              "audio": 50,
              "video": 256
            },
            rtcConfiguration: {
              iceServers: [{urls: 'stun:stun2.l.google.com:19302'}],
              iceCandidatePoolSize: 2,
              bundlePolicy: 'max-bundle'
            } // See https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary
          };
          var config = Object.assign({},
            configuration,
            gUM);
          var rtcConfig = Object.assign({}, config, {
            protocol: 'ws',
            port: 5080
          });
          var rtmpConfig = Object.assign({}, config, {
            protocol: 'rtmp',
            port: 1935,
            backgroundColor: "#000000",
            swf: '../lib/red5pro/red5pro-subscriber.swf',
            swfobjectURL: '../lib/swfobject/swfobject.js',
            productInstallURL: '../lib/swfobject/playerProductInstall.swf'
          });
          var hlsConfig = Object.assign({}, config, {
            protocol: 'http',
            port: '5080'
          });
          var sub = new red5pro.Red5ProSubscriber()
          sub.setPlaybackOrder(['rtc', 'rtmp', 'hls'])
            .init({
              rtc: rtcConfig,
              rtmp: rtmpConfig,
              hls: hlsConfig
            })
            .then(function(subscriberImpl) {
              var subscriber = subscriberImpl;
              setUpAPI(subscriber);
              subscriber.subscribe();
            })
            .catch( function(error) {
              // handle possible error in instantiation od subscriber implementation.
              console.error('HLS Init Error: ' + error);
            });

        function setUpAPI (subscriber) {
          var playPauseButton = document.getElementById('play-pause-button');
          var muteUnmuteButton = document.getElementById('mute-unmute-button');
          var fullscreenButton = document.getElementById('fullscreen-button');
          var timeField = document.getElementById('time-field');

          function formatTime (value) {
            var hrs = 0
            var mins = value === 0 ? 0 : parseInt(value / 60)
            var secs = 0
            if (mins >= 60) {
              hrs = parseInt(mins / 60)
              mins = mins % 60
            }
            secs = value === 0 ? 0 : parseInt(value % 60)
            var formattedArr = (hrs < 10) ? ['0' + hrs] : [hrs]
            formattedArr.push((mins < 10) ? ['0' + mins] : [mins])
            formattedArr.push((secs < 10) ? ['0' + secs] : [secs])
            return formattedArr.join(':')
          }
          function playPauseClick () {
            if (playPauseButton.innerText === 'play') {
              subscriber.play();
            }
            else {
              subscriber.pause();
            }
          }
          function muteUnmuteClick () {
            if (muteUnmuteButton.innerText === 'mute') {
              subscriber.mute();
            }
            else {
              subscriber.unmute();
            }
          }
          function fullscreenClick () {
            subscriber.toggleFullScreen();
          }
          var enableControls = function () {
            playPauseButton.removeAttribute("disabled");
            muteUnmuteButton.removeAttribute("disabled");
            fullscreenButton.removeAttribute("disabled");
            playPauseButton.addEventListener('click', playPauseClick);
            muteUnmuteButton.addEventListener('click', muteUnmuteClick);
            fullscreenButton.addEventListener('click', fullscreenClick);
          }
          var disableControls = function () {
            playPauseButton.setAttribute('disabled', true);
            muteUnmuteButton.setAttribute('disabled', true);
            fullscreenButton.setAttribute('disabled', true);
            playPauseButton.removeEventListener('click', playPauseClick);
            muteUnmuteButton.removeEventListener('click', muteUnmuteClick);
            fullscreenButton.removeEventListener('click', fullscreenClick);
          }
          subscriber.on('*', function (event) {
            if (event.type === 'Subscribe.Playback.Change' &&
               event.data.state === 'Playback.AVAILABLE') {
              enableControls();
            }
            else if (event.type === 'Subscribe.Volume.Change') {
              if (event.data.volume === 0) {
                muteUnmuteButton.innerText = 'unmute';
              }
              else {
                muteUnmuteButton.innerText = 'mute';
              }
            }
            else if (event.type === 'Subscribe.Playback.Change') {
              if (event.data.state === 'Playback.PLAYING') {
                playPauseButton.innerText = 'pause';
              }
              else {
                playPauseButton.innerText = 'play';
              }
            }
            else if (event.type === 'Subscribe.Time.Update') {
              timeField.innerText = formatTime(Math.round(event.data.time));
            }
          });
        }

     })(window, window.red5prosdk);
    </script>
  </body>
</html>
```

# Creating Custom Controls UI
To customize the look and feel of the playback controls, use the `red5pro-media.css` file distributed with the SDK as your guide, and discover the cusomizable style declarations available from the [Playback Controls Style Declarations](#playback-controls-style-declarations) section.

When you have change the declarations to your liking in a separate CSS file, it is recommended to define your custom CSS file dependency after the `red5pro-media.css` dependency in your page.

For example, if you have saved your custom styles to a file named `my-custom-playback-controls.css`:

```html
<!doctype html>
<html>
  <head>
    <title>My Custom Playback Controls</title>
    <link rel="stylesheet" href="lib/red5pro/red5pro-media.css">
    <link rel="stylesheet" href="my-custom-playback-controls.css">
    <script src="https://rawgit.com/sindresorhus/screenfull.js/gh-pages/dist/screenfull.min.js"></script>
  </head>
  <body>
    <video id="red5pro-subscriber" controls autoplay class="red5pro-media"></video>
    <script src="lib/red5pro/red5pro-sdk.js"></script>
  </body>
</html>
```

