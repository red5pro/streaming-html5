# Red5 Pro HTML SDK Migration Guide

This documentation serves as a guide in migrating client-side code where a breaking change to the API has been made in a distribution.

* [5.4.0 to 5.5.0](#migrating-from-540-to-550)
* [5.0.0 to 5.4.0](#migrating-from-500-to-540)
* [4.0.0 to 5.0.0](#migrating-from-400-to-500)
* [3.5.0 to 4.0.0](#migrating-from-350-to-400)

# Migrating from `5.4.0` to `5.5.0`

The `5.5.0` release of the Red5 Pro HTML SDK including some modifications to `SharedObjects` to allow for "decoupling" the managament and communication API from the underlying connections for Publishers and Subscribers. In the `5.5.0` release, `SharedObjects` can now be used by themselves without requiring an already established connection to the server.

* The `SharedObject` API has been decoupled from requiring previously established stream clients (Publisher and/or Subscriber).
  * By decoupling the previous *requirement* to use a established stream client, `SharedObjects` can now be used with establishing a  `WebSocket` connection and providing that as the connection to communicate over `SharedObjects`.
  * The Red5 Pro HTML SDK provides a `Red5ProSharedObjectSocket` class to serve as a proxy to an underlying `WebSocket` and convenience in communicating to and from the Red5 Pro Server when using `SharedObjects`.
  * The `SharedObject` API can still be employed using a stream client connection as was possible in previous SDK versions.

Additionally, notification support for latest browser vendor restictions on the `autoplay` policy have been included.

* Utilize the `muteOnAutoplayRestriction` initialization configuration property for Subscriber clients in order to attempt auto-muting of subscribers to allow - at least - video auto-playback when browsers enforce the muted autoplay policy.
* Listen for events related to `autoplay` restictions in order to provide a better User Experience for your customers.
* Please refer to the `Autoplay Restictions` section from the *Subscriber* documentation.

# Migrating from `5.0.0` to `5.4.0`

The `5.4.0` release of the Red5 Pro HTML SDK saw some minor changes related to WebRTC clients, and in particular how WebSoskcet and RTCPeerConnections are made:

* The default ports used for WebSocket connection change from `8081` and `8083` (insecure and secure, respectively) to `5080` and `443` (insecure and secure, respectively.
  * WebSocket communication with the Red5 Pro Server will now be made over the same port for HTTP/S.
  * To support backward compatiibilty for webapps out in the wild, the HTML SDK will recognize previously defaulted values and silently change the values to new default values.
* The `iceServers` configuration property has been deprecated in favor of the new `rtcConfiguration` configuration property.
  * [Refer to section: RTCConfiguration](#rtcconfiguration)

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
  iceServers: [{urls: 'stun:stun2.l.google.com:19302'}]
}
var publisher = new red5prosdk.RTCPublisher()
publisher.init(config)
  .then(() => {
    publisher.publish()
  })
  .catch(error => {
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
    iceServers: [{urls: 'stun:stun2.l.google.com:19302'}],
    iceCandidatePoolSize: 2,
    bundlePolicy: 'max-bundle'
  }
}
var publisher = new red5prosdk.RTCPublisher()
publisher.init(config)
  .then(() => {
    publisher.publish()
  })
  .catch(error => {
    // handle error.
  })
```

> The `rtcConfiguration` is an object that directly correlates to the `RTCConfiguration` object that is handed to a `RTCPeerConnection` upon instantiation: [https://developer.mozilla.org/en-US/docs/Web/API/RTCConfiguration](https://developer.mozilla.org/en-US/docs/Web/API/RTCConfiguration)

# Migrating from `4.0.0` to `5.0.0`

The `5.0.0` release of the Red5 Pro HTML SDK mainly focused on internal bug fixes and compliancy changes to match updates to the Red5 Pro Server v5.0.0 release.

To see updates that may cause possible issues in integration with your webapp(s), please refer to the *CHANGES* documentation distributed with the Red5 Pro HTML SDK available from your [Red5 Pro Account](https://account.red5pro.com/).

# Migrating from `3.5.0` to `4.0.0`

The `4.0.0` release of the Red5 Pro HTML SDK saw some major changes in the following features:

* Internalizing the `getUserMedia` request in order to simplify the intialization-to-broadcast sequence of **Publishers**.
  * While the default process of accessing a stream through the `getUserMedia` API of the browser has been internalized to the SDK, we have also exposed a way to override this default to allow developers to specifically handle this process as per requirements.
  * [Refer to section: Internalizing gUM Requests](#internalizing-gum-requests)
* Removal of explicitly defining and assigning views for **Publishers** and **Subscribers**.
  * The process of associating a view display to either a **Publisher** or a **Subscriber** has been internalized with access to DOM elements using a default `mediaElementId` configuration property.
  * This change simplifies the creation and initialization process for both **Publishers** and **Subscribers**.
  * While the default process of associating a view to a broadcast or subscriber session is based on a `mediaElementId` configuration property, developers are able to define which `video` or `audio` DOM element they prefer to use as the display by providing its `id` attribute value.
  * [Refer to section: Removal of View Attachment](#removal-of-view-attachment)
* Introduction of Red5 Pro HTML SDK Playback Controls.
  * In response to numerous requests regarding playback controls across the several **Subscriber** platforms we support, we have exposed an API for playback control and provide default UI elements and styles.
  * This allows for consistent cross-browser look-and-feel of playback controls across all playback formats: WebRTC, Flash, and HLS.
  * The Red5 Pro HTML SDK Playback Controls UI is completely customizable in styling to meet the branding requirements for developers.
  * By exposing a playback API, we allow developers to create their own custom controls - not relying on the Red5 Pro HTML SDK Playback Controls UI - to meet their own product requirements.
  * [Refer to section: Red5 Pro HTML SDK Playback Controls](#red5-pro-html-sdk-playback-controls)
* Change in **Subscriber** API from `play()` to `subscribe()` as request to start playback.
  * This change is in keeping the Red5 PRo HTML SDK Playback Controls API in-line with consistent method names that properly describe their intent - e.g., `play`, `pause`, `resume`, etc.
  * The method change to `subscribe` also keeps consistent method naming convention for **Publishers** and **Subscribers**, as the method name to request publishing for **Publishers** is `publish`.
  * [Refer to section: Subscriber API Changes](#subscriber-api-changes)
* Change in **Subscriber** API from `stop()` to `unsubscribe()` as request to cancel current playback.
  * This change is in keeping the Red5 PRo HTML SDK Playback Controls API in-line with consistent method names that properly describe their intent - e.g., `play`, `pause`, `resume`, etc.
  * The method change to `unsubscribe` also keeps consistent method naming convention for **Publishers** and **Subscribers**, as the method name to request cancel of publishing for **Publishers** is `unpublish`.
  * [Refer to section: Subscriber API Changes](#subscriber-api-changes)
* Removal of auto-play from **Subscriber** functionality.
  * In previous versions of the Red5 Pro HTML SDK, all **Subscriber** types (WebRTC, Flash, and HLS) would begin playback automatically upon successful connection and subscription to a broadcast stream. This functionality has been removed.
  * Instead, the node properties of the [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) (e.g., `<video>` and `<audio>`) should be used to dictate that `autoplay` is requested.
  * The three [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) node properties that the Red5 Pro HTML SDK recognizes in establishing a subscription session are:
    * `muted` - in order to mute the audio upon initial playback.
    * `autoplay` - in order to automatically start playing the stream upon successful subscription.
    * `controls` - as discusses in [Red5 Pro HTML SDK Playback Controls](#red5-pro-html-sdk-playback-controls).
  * [Refer to section: Subscriber API Changes](#subscriber-api-changes)
* Removal of [VideoJS](http://videojs.com/) support in Flash/RTMP and HLS clients.
  * The integration with [VideoJS](http://videojs.com/) was originally intended to allow for easy failover to Flash if HLS was not supported. As the Red5 Pro HTML SDK started to support its own failover logic, the integration became unnecessary.
  * [Refer to section: Removal of VideoJS](#removal-of-videojs)

# Internalizing gUM Requests

> This change affects the WebRTC-based Publisher instances.

* [Defining mediaConstraints](#defining-mediaconstraints)
* [Overriding Default Request](#overriding-default-request)

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
(function (red5prosdk) {
  'use strict';

  var configuration = {}; // not defined for clarity in this example.

  var publisher = new red5prosdk.Red5ProPublisher();
  var view = new red5prosdk.PublisherView();
  view.attachPublisher(publisher);

  publisher.init(configuration)
    .then(function (selectedPublisher) {
      // externalized request for MediaStream using gUM.
      if (selectedPublisher.getType().toLowerCase() === 'rtc') {
        navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {
            width: 640,
            height: 480
          }
        }).then(function (mediaStream) {
          view.preview(mediaStream);
          selectedPublisher.attachStream(mediaStream);
          selectedPublisher.publish();
        });
      }
      else {
        selectedPublisher.publish();
      }
    })

})(window.red5prosdk);
```

### MediaConstraints in 4.0.0 SDK

The `getUserMedia` request is internalized and executed using the `mediaConstraints` property of the initialization configuration.

```js
(function (red5prosdk) {
  'use strict';

  var configuration = {}; // not defined for clarity in this example.

  var publisher = new red5prosdk.Red5ProPublisher();
  // Using the new init config attribute.
  configuration.mediaContraints = {
    audio: true,
    video: {
      width: 640,
      height: 480
    }
  };

  publisher.init(configuration)
    .then(function (selectedPublisher) {
      selectedPublisher.publish();
    });

})(window.red5prosdk);
```

## Override Default Request

While the `getUserMedia` request has been internalized by default, the Red5 Pro HTML SDK also allows developers to override that default behavior if they wish to explicitly access and provide the `MediaSteam` instance for WebRTC-based publishers to use.

The `4.0.0` SDK release exposes a `onGetUserMedia` initialization configuration property that can be used to override the internalized `gUM` request.

If the `onGetUserMedia` initialization configuration property is set, that method will be invoked and the initialization sequence will be halted until its expected return `Promise` is resolved or rejected.

> The `onGetUserMedia` property expects no arguments and requires a `Promise` to be returned. The `resolve` payload of the `Promise` is expected to be a `MediaStream` instance.

The following example utilizes the `onGetUserMedia` override to request the `MediaStream` directly from the `MediaDevices` of `navigator`:

```js
(function (red5prosdk) {
  'use strict';

  var configuration = {}; // not defined for clarity in this example.

  var publisher = new red5prosdk.Red5ProPublisher();
  // Using the onGetUserMedia override.
  configuration.onGetUserMedia = function() {
    // navigator.mediaDevices.getUserMedia returns a Promise.
    return navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: 640,
        height: 480
      }
    });
  };

  publisher.init(configuration)
    .then(function (selectedPublisher) {
      selectedPublisher.publish();
    });

})(window.red5prosdk);
```

# Removal of View Attachment

> This change affects all **Publisher** and **Subscriber** types.

* [Defining mediaElementId](#defining-mediaelementid)
* [Using the default mediaElementId](#using-the-default-mediaelementid)

In the `3.5.0` version of the Red5 Pro HTML SDK, developers were required to define a `PublisherView` or a `PlaybackView` for **Publishers** and **Subscribers**, respectively, if the stream was to be shown in a target DOM element. This requirement has been removed.

In its replacement is a new initialization configuration property: `mediaElementId`. This property is the `id` attribute value of the target DOM element that should display the broadcast preview or playback stream for **Publishers** and **Subscribers**, respectively.

A default value is used in the SDK, if one is not provided on the initialization configuration. The default `mediaElementId` for **Publishers** and **Subscribers** is:

| Type | mediaElementId |
| :--- | :--- |
| Publisher | `red5pro-publisher` |
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

* [Start Subscription API Change](#start-subscription-api-change)
* [Stop Subscription API Change](#stop-subscription-api-change)
* [Autoplay Change](#autoplay-change)

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

Additionally, if **VideoJS** was used, it provided custom playback controls.  With the release of version `4.0.0`, we have provided the ability to display and customize playback controls. _[Refer to section: Red5 Pro HTML SDK Playback Controls](#red5-pro-html-sdk-playback-controls)_.

For these reasons, the inclusion of [VideoJS](http://videojs.com/) as a dependency in HLS failover and playback controls has been removed.

However, it does not mean that you are not permitted to use *VideoJS* for playback. It is entirely possible and detailed in the following example. Do note that if you use *VideoJS* for playback, you are not encorporating the Red5 Pro HTML SDK and will not benefit from all that brings - such as: stream message communication, Shared Objects, etc.

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

The file extension will change for each `source` based on the container mime type you want to display: either HLS (`m3u8`) or Flash (`flv`). The required *VideoJS* library dependencies are loaded and a new `VideoJS` object created to start request of stream and playback.

This example demonstrates the use of [VideoJS](http://videojs.com/) for live and VOD stream playback from Red5 Pro Server. Please note that the Red5 Pro HTML SDK is not used at all in this example. As such, WebRTC playback is not supported and various other features provided by the SDK are not available; the purpose of this example was to demonstrate how to still use *VideoJS* for playback if that is your current requirement, as it has been removed from the Red5 Pro HTML SDK.

## More Information

> Please refer to the [VideoJS](http://videojs.com/) documentation for further information.
