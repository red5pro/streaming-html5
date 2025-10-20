<h3 align="center">
  <img src="assets/Red5_Truetime_black.png" alt="Red5 Pro Logo" height="65" />
</h3>
<p align="center">
  <a href="#">Quick Start</a> &bull;
  <a href="docs/whip-client.md">Publishing</a> &bull;
  <a href="docs/whep-client.md">Subscribing</a>
</p>

---

# Red5 Pro WebRTC SDK

> The **Red5 Pro WebRTC SDK** allows you to integrate live streaming video into your desktop and mobile browser.

* [Important Notices](#important-notices)
* [Installation](#installation)
* [Quick Start](#quick-start)
* [Usage](#usage)

# Important Notices

With the `15.0.0` release of the **Red5 Pro WebRTC SDK**, we have complete overhaul of its development and focus. We have decided to focus solely on **WISH** (WebRTC Ingest Signaling over HTTPS) and dropped WebSocket support previously used for signaling phase.

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
    <!-- Red5 Pro SDK -->
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
    <!-- Red5 Pro SDK -->
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