<h3 align="center">
  <img src="assets/Red5_Truetime_black.png" alt="Red5 Pro Logo" height="65" />
</h3>
<p align="center">
  <a href="PUBLISHER_README.md">publisher</a> &bull;
  <a href="SUBSCRIBER_README.md">subscriber</a> &bull;
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
<script src="https://unpkg.com/red5pro-webrtc-sdk@11.2.0/red5pro-sdk.min.js"></script>
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

### Quick Start - Standalone Server Deployment

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
      ((red5prosdk) => {
        'use strict'

        const rtcPublisher = new red5prosdk.WHIPClient()
        const rtcSubscriber = new red5prosdk.WHEPClient()
        const config = {
          protocol: 'ws',
          host: 'localhost',
          port: 5080,
          app: 'live',
          streamName: 'mystream',
          rtcConfiguration: {
            iceServers: [{urls: 'stun:stun2.l.google.com:19302'}],
            iceCandidatePoolSize: 2,
            bundlePolicy: 'max-bundle',
          } // See https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary
        };

        const subscribe = async () => {
          try {
            await rtcSubscriber.init(config)
            await rtcSubscriber.subscribe()
          } catch (err) {
              console.error('Could not play: ' + err)
          }
        }

        const publish = async () => {
          try {
            // Once publishing, call subscribe!
            rtcPublisher.on(red5prosdk.PublisherEventTypes.PUBLISH_START, subscribe)
            await rtcPublisher.init(config)
            await rtcPublisher.publish()
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

### Quick Start - StreamManager 2.0 Deployment

With the Stream Manager 2.0 Release, the `endpoint` init configuration property was introduced in the SDK to allow developers to specify the specific endpoint to proxy through on the Stream Manager.

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
      <script>
      ((red5prosdk) => {
        'use strict'

        const host = 'my-server-deployment'
        const nodeGroup = 'my-node-group'
        const streamName = 'my-stream-name'

        const rtcPublisher = new red5prosdk.WHIPClient()
        const rtcSubscriber = new red5prosdk.WHEPClient()
        const config = {
          streamName,
          rtcConfiguration: {
            iceServers: [{urls: 'stun:stun2.l.google.com:19302'}],
            iceCandidatePoolSize: 2,
            bundlePolicy: 'max-bundle',
          } // See https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary
        };

        const subscribe = async () => {
          try {
            await rtcSubscriber.init({
              ...config,
              endpoint: `https://${host}/as/v1/proxy/whep/live/${streamName}`,
              connectionParams: {
                nodeGroup
              }
            })
            await rtcSubscriber.subscribe()
          } catch (err) {
              console.error('Could not play: ' + err)
          }
        }

        const publish = async () => {
          try {
            // Once publishing, call subscribe!
            rtcPublisher.on(red5prosdk.PublisherEventTypes.PUBLISH_START, subscribe)
            await rtcPublisher.init({
              ...config,
              endpoint: `https://${host}/as/v1/proxy/whip/live/${streamName}`,
              connectionParams: {
                nodeGroup
              }
            })
            await rtcPublisher.publish()
          } catch(err) {
            console.error('Could not publish: ' + err)
          }

          // Start Publisher first ->
          publish()

      }(window.red5prosdk))
    </script>
  </body>
</html>
```


# Requirements

The **Red5 Pro WebRTC SDK** is intended to communicate with a [Red5 Pro Server](https://www.red5.net/red5-pro/low-latency-streaming-software/), which allows for broadcasting and consuming live streams utilizing [WebRTC](https://developer.mozilla.org/en-US/docs/Web/Guide/API/WebRTC) and other protocols, including [RTMP](https://en.wikipedia.org/wiki/Real_Time_Messaging_Protocol) and [HLS](https://en.wikipedia.org/wiki/HTTP_Live_Streaming).

As such, you will need a distribution of the [Red5 Pro Server](https://www.red5.net/) running locally or accessible from the web, such as [Amazon Web Services](https://www.red5.net//docs/server/awsinstall/).

> **[Click here to start using the Red5 Pro Server today!](https://account.red5.net/login)**

# Usage
This section describes using the **Red5 Pro WebRTC SDK** browser install to create sessions for a [Publisher](#publisher) and a [Subscriber](#subscriber).

## WHIP/WHEP
Please refer to the [WHIP/WHEP Readme](WHIP_WHEP_README.md) for information about utilizing WHIP/WHEP clients for publishing and subscribing, respectively.

## Publisher
Please refer to the [Publisher Readme](PUBLISHER_README.md) for information about setting up a broadcast session.

## Subscriber
Please refer to the [Subscriber Readme](SUBSCRIBER_README.md) for information about setting up a subscriber session.

# Contributing
> Please refer to the [Contributing Documentation](CONTRIBUTING.md) to learn more about contributing to the development of the Red5 Pro WebRTC SDK.
