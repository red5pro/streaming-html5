<h3 align="center">
  <img src="assets/red5pro_logo.png" alt="Red5 Pro Logo" />
</h3>
<p align="center">
  <a href="PUBLISHER_README.md">publisher</a> &bull;
  <a href="SUBSCRIBER_README.md">subscriber</a> &bull;
  <a href="SHARED_OBJECT_README.md">shared object</a>
</p>

---

# Red5 Pro WebRTC SDK
> The **Red5 Pro WebRTC SDK** allows you to integrate live streaming video into your desktop and mobile browser.

* [Quickstart](#quickstart)
  * [Installation](#installation)
* [Requirements](#requirements)
* [Usage](#usage)
  * [Publisher](#publisher)
    * [WebRTC](PUBLISHER_README.md#webrtc)
    * [Lifecycle Events](PUBLISHER_README.md#lifecycle-events)
  * [Subscriber](#subscriber)
    * [WebRTC](SUBSCRIBER_README.md#webrtc)
    * [HLS](SUBSCRIBER_README.md#hls)
    * [Auto Failover](SUBSCRIBER_README.md#auto-failover-and-order)
    * [Lifecycle Events](SUBSCRIBER_README.md#lifecycle-events)
  * [Shared Object](#shared-object)
    * [Usage](SHARED_OBJECT_README.md#shared-object-usage)
    * [Lifecycle Events](SHARED_OBJECT_README.md#lifecycle-events-shared-object)
* [Contributing](#contributing)

# Quickstart

> Important Node About `11.0.0` Release

**Red5 Pro SDK now supports WHIP/WHEP**

Read more from out [documentation on WHIP/WHEP integration](WHIP_WHEP_README.md)!

> Important Note About `8.0.0` Release

**Red5 Pro SDK has been published on NPM!**

While currently not open source, the SDK build has been published to NPM to allow you to integrate into your projects with greater ease and dependency management.

## Installation

### As `script` in HTML page

```
<script src="https://unpkg.com/red5pro-webrtc-sdk@latest/red5pro-sdk.min.js"></script>
```

... or if you know the version:

```
<script src="https://unpkg.com/red5pro-webrtc-sdk@11.0.0/red5pro-sdk.min.js"></script>
```

## Using `npm` or `yarn` for you browser-based projects

```
npm install --save-dev red5pro-webrtc-sdk
```

```
yarn install --dev red5pro-webrtc-sdk
```

### Usage

All members exposed on the otherwise global `window.red5prosdk` if loading as a script on an HTML page are importable from the `red5pro-webrtc-sdk` module:

_index.js_

```
import { WHIPClient, WHEPClient } from 'red5pro-webrtc-sdk'
```

To begin working with the *Red5 Pro HTML5 SDK* in your project:

### Quick Start (browser)
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
      <video id="red5pro-publisher" width="640" height="480" muted autoplay></video>
    </div>
    <!-- subscriber -->
    <div>
      <video id="red5pro-subscriber" width="640" height="480" controls autoplay></video>
    </div>
    <!-- Red5 Pro SDK -->
    <script src="https://unpkg.com/red5pro-webrtc-sdk@latest/red5pro-sdk.min.js"></script>
    <!-- Create Pub/Sub -->
    <script>
      (function(red5prosdk) {
        'use strict';

        var rtcPublisher = new red5prosdk.WHIPClient();
        var rtcSubscriber = new red5prosdk.WHEPClient();
        var config = {
          protocol: 'ws',
          host: 'localhost',
          port: 5080,
          app: 'live',
          streamName: 'mystream',
          rtcConfiguration: {
            iceServers: [{urls: 'stun:stun2.l.google.com:19302'}],
            iceCandidatePoolSize: 2,
            bundlePolicy: 'max-bundle'
          } // See https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary
        };

        function subscribe () {
          rtcSubscriber.init(config)
            .then(function () {
              return rtcSubscriber.subscribe();
            })
            .then(function () {
              console.log('Playing!');
            })
            .catch(function (err) {
              console.log('Could not play: ' + err);
            });
        }

        rtcPublisher.init(config)
          .then(function () {
            // On broadcast started, subscribe.
            rtcPublisher.on(red5prosdk.PublisherEventTypes.PUBLISH_START, subscribe);
            return rtcPublisher.publish();
          })
          .then(function () {
            console.log('Publishing!');
          })
          .catch(function (err) {
            console.error('Could not publish: ' + err);
          });

      }(window.red5prosdk));
    </script>
  </body>
</html>
```

# Requirements
The **Red5 Pro WebRTC SDK** is intended to communicate with a [Red5 Pro Server](https://www.red5pro.com/), which allows for broadcasting and consuming live streams utilizing [WebRTC](https://developer.mozilla.org/en-US/docs/Web/Guide/API/WebRTC) and other protocols, including [RTMP](https://en.wikipedia.org/wiki/Real_Time_Messaging_Protocol) and [HLS](https://en.wikipedia.org/wiki/HTTP_Live_Streaming).

As such, you will need a distribution of the [Red5 Pro Server](https://www.red5pro.com/) running locally or accessible from the web, such as [Amazon Web Services](https://www.red5pro.com/docs/server/awsinstall/).

> **[Click here to start using the Red5 Pro Server today!](https://account.red5pro.com/login)**

# Usage
This section describes using the **Red5 Pro WebRTC SDK** browser install to create sessions for a [Publisher](#publisher) and a [Subscriber](#subscriber).

## Publisher
Please refer to the [Publisher Readme](PUBLISHER_README.md) for information about setting up a broadcast session.

## Subscriber
Please refer to the [Subscriber Readme](SUBSCRIBER_README.md) for information about setting up a subscriber session.

# Shared Object
Please refer to the [SharedObject Documentation](SHARED_OBJECT_README.md) for information about using SharedObjects in both Publishers and Subscribers.

# Contributing
> Please refer to the [Contributing Documentation](CONTRIBUTING.md) to learn more about contributing to the development of the Red5 Pro WebRTC SDK.
