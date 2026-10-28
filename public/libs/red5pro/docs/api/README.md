**Red5 Web SDK v17.0.0-beta.1**

***

<h3 align="center">
  <img src="_media/Red5_Truetime_black.png" alt="Red5 Pro Logo" height="65" />
</h3>
<p align="center">
  <a href="#">Quick Start</a> &bull;
  <a href="_media/whip-client.md">Publishing</a> &bull;
  <a href="_media/whep-client.md">Subscribing</a> &bull;
  <a href="_media/message-channel.md">Message Channel</a> &bull;
  <a href="_media/moq-publisher.md">MOQ Publishing</a> &bull;
  <a href="_media/moq-subscriber.md">MOQ Subscribing</a> &bull;
  <a href="_media/moq-catalog.md">MOQ Catalog</a> &bull;
  <a href="_media/moq-message-channel.md">MOQ Message Channel</a> &bull;
  <a href="_media/pubnub-client.md">PubNub Client</a>
</p>

---

# Red5 Web SDK

> The **Red5 Web SDK** allows you to integrate live streaming video into your desktop and mobile browser.

* [Important Notices](#important-notices)
* [Installation](#installation)
* [Quick Start](#quick-start)
* [Usage](#usage)

# Important Notices

With the `15.0.0` release of the **Red5 Web SDK**, we have complete overhaul of its development and focus. We have decided to focus solely on **WISH** (WebRTC Ingest Signaling over HTTPS) and dropped WebSocket support previously used for signaling phase.

As such, the publishing and subscribing logic within the SDK are provided from the `WHIPClient` and `WHEPClient`, respectively.

Not only does this free up resources consumed by WebSockets on the Red5 Server deployment, but also provides a _much_ lighter client-side dependency!

# Installation

The default build is the **full** SDK (WHIP/WHEP/HLS and MOQ). If you only need one protocol, load the matching focused file instead. All three attach `window.red5websdk` (and alias `window.red5prosdk` on `17.x`). Load **one** script per page; a second file overwrites the global.

## As Script Dependency in HTML page

Full SDK:

```html
<script src="https://cdn.jsdelivr.net/npm/red5-web-sdk@latest/red5-web-sdk.min.js"></script>
```

WHIP/WHEP/HLS only:

```html
<script src="https://cdn.jsdelivr.net/npm/red5-web-sdk@latest/red5-web-sdk-webrtc.min.js"></script>
```

MOQ only:

```html
<script src="https://cdn.jsdelivr.net/npm/red5-web-sdk@latest/red5-web-sdk-moq.min.js"></script>
```

... Or pin a version:

```html
<script src="https://cdn.jsdelivr.net/npm/red5-web-sdk@15.0.0/red5-web-sdk.min.js"></script>
```

Playback UI styles ship in the release drop as `red5pro-media.css` (WHIP/WHEP/HLS) and `red5-moq-media.css` (MOQ).

## Using `npm` or `yarn` for you browser-based projects

```sh
npm install --save red5-web-sdk
```

```sh
yarn install red5-web-sdk
```

```js
import { WHIPClient, WHEPClient } from 'red5-web-sdk'
import { WHIPClient } from 'red5-web-sdk/webrtc'
import { MOQPublisher } from 'red5-web-sdk/moq'
```

# Quick Start

All members exposed on the otherwise global `window.red5websdk` if loading as a script on an HTML page are importable from the `red5-web-sdk` module:

_index.js_

```js
import { WHIPClient, WHEPClient } from 'red5-web-sdk'
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
    <!-- Red5 Web SDK -->
    <script src="https://cdn.jsdelivr.net/npm/red5-web-sdk@latest/red5-web-sdk.min.js"></script>
    <!-- Create Pub/Sub -->
    <script>
      ((red5websdk) => {
        'use strict'

        const { WHIPClient, WHEPClient, PublisherEventTypes } = red5websdk

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

      }(window.red5websdk))
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
    <!-- Red5 Web SDK -->
    <script src="https://cdn.jsdelivr.net/npm/red5-web-sdk@latest/red5-web-sdk.min.js"></script>
    <!-- Create Pub/Sub -->
    <script>
      <script>
      ((red5websdk) => {
        'use strict'

        const host = 'my-deployment.cloud.red5.net'
        const nodeGroup = 'my-node-group'
        const streamName = 'my-stream-name'

        const { WHIPClient, WHEPClient, PublisherEventTypes } = red5websdk
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

      }(window.red5websdk))
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
* [MOQMessageChannel](_media/moq-message-channel.md)
