# Subscribing using Red5 Pro

This is an example of a basic Subscriber consuming a stream to a Red5 Pro Server for playback.

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# How to Subscribe

Subscribing to a Red5 Pro stream requires a few components to function fully, as well as an already existing broadcast stream (see Publisher documentation)[../publish].

## Including the SDK

You will need to include the Red5 Pro SDK library on the page. You have several options to include the SDK in your project:

### As `script` in HTML page

```
<script src="https://unpkg.com/red5pro-webrtc-sdk@latest/red5pro-sdk.min.js"></script>
```

... or if you know the version:

```
<script src="https://unpkg.com/red5pro-webrtc-sdk@11.0.0/red5pro-sdk.min.js"></script>
```

### Using `npm` or `yarn` for you browser-based projects

```
npm install --save-dev red5pro-webrtc-sdk
```

```
yarn install --dev red5pro-webrtc-sdk
```

### As a local resource with the distributed SDK

If you have not already done so, download the Red5 Pro HTML SDK from your account page: [https://account.red5.net/download](https://account.red5.net/download).

Once downloaded, unzip and move the library files - contained in the `lib` directory of the unzipped download - that makes sens for your project. _For the purposes of these examples, we have maked the entire `lib` directory into the top level of our project._

## Usage

All members exposed on the otherwise global `window.red5prosdk` if loading as a script on an HTML page are importable from the `red5pro-webrtc-sdk` module:

_index.js_

```js
import { WHEPClient } from 'red5pro-webrtc-sdk'
```

To begin working with the _Red5 Pro HTML5 SDK_ in your project:

### Quick Start (module)

This example assumes that you will have a `video` DOM element on your page with the `id` attribute of `red5pro-subscriber`:

```js
import { WHEPClient } from 'red5pro-webrtc-sdk'

var rtcSubscriber = new WHEPClient()
var config = {
  protocol: 'ws',
  host: 'localhost',
  port: 5080,
  app: 'live',
  streamName: 'mystream',
  rtcConfiguration: {
    iceServers: [{ urls: 'stun:stun2.l.google.com:19302' }],
    iceCandidatePoolSize: 2,
    bundlePolicy: 'max-bundle',
  }, // See https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary
}

const start = async () => {
  try {
    rtcSubscriber.on('*', (event) => {
      const { type, data } = event
      console.log(type, data)
    })
    await rtcSubscriber.init(config)
    await rtcSubscriber.subscribe()
  } catch (e) {
    console.error(e)
  }
}
start()
```

### Quick Start (browser)

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- *Recommended WebRTC Shim -->
    <script src="https://webrtchacks.github.io/adapter/adapter-latest.js"></script>
  </head>
  <body>
    <!-- video containers -->
    <!-- subscriber -->
    <div>
      <video
        id="red5pro-subscriber"
        width="640"
        height="480"
        muted
        autoplay
      ></video>
    </div>
    <!-- Red5 Pro SDK -->
    <script src="https://unpkg.com/red5pro-webrtc-sdk@latest/red5pro-sdk.min.js"></script>
    <!-- Create Pub/Sub -->
    <script>
      ;(function (red5prosdk) {
        'use strict'

        const { WHEPClient } = red5prosdk

        var rtcSubscriber = new WHEPClient()
        var config = {
          protocol: 'ws',
          host: 'localhost',
          port: 5080,
          app: 'live',
          streamName: 'mystream',
          rtcConfiguration: {
            iceServers: [{ urls: 'stun:stun2.l.google.com:19302' }],
            iceCandidatePoolSize: 2,
            bundlePolicy: 'max-bundle',
          }, // See https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary
        }

        const start = async () => {
          try {
            rtcSubscriber.on('*', (event) => {
              const { type, data } = event
              console.log(type, data)
            })
            await rtcSubscriber.init(config)
            await rtcSubscriber.subscribe()
          } catch (e) {
            console.error(e)
          }
        }
        start()
      })(window.red5prosdk)
    </script>
  </body>
</html>
```

# Requirements

The **Red5 Pro WebRTC SDK** is intended to communicate with a [Red5 Pro Server](https://www.red5.net/), which allows for broadcasting and consuming live streams utilizing [WebRTC](https://developer.mozilla.org/en-US/docs/Web/Guide/API/WebRTC) and other protocols, including [HLS](https://en.wikipedia.org/wiki/HTTP_Live_Streaming).

As such, you will need a distribution of the [Red5 Pro Server](https://www.red5.net/) running locally or accessible from the web, such as [Amazon Web Services](https://www.red5.net/docs/installation/installation/awsinstall).

> **[Click here to start using the Red5 Pro Server today!](https://account.red5.net/login)**

## Subscriber Selection & Initialization

A Subscriber instance is required to attach a stream and request playback. The SDK provides to ways to start a Subscriber:

- `WHEPClient` - utilizes [WebRTC-HTTP egress](https://www.ietf.org/archive/id/draft-murillo-whep-00.html) to establish a connection through series of HTTP/S requests.
- `RTCSubscriber` - utilizes `WebSocket` to establish a connection.

The [WebRTC-HTTP ingestion](https://www.ietf.org/archive/id/draft-ietf-wish-whip-01.html)(`WHIP`) and [WebRTC-HTTP egress](https://www.ietf.org/archive/id/draft-murillo-whep-00.html)(`WHEP`) protocols provide the ability to negotation and establish a connection using HTTP/S requests. This removes the requirement for a WebSocket, which historically has been used for the role of negotiation and connection.

The use of a WebSocket is still available in `RTCPublisher` and `RTCSubscriber` and the ability to utilize WHIP/WHEP is provided from the `WHIPClient` and `WHEPClient` classes in the SDK. As is evident by their acronyms, the `WHIPClient` is used for publishing and the `WHEPClient` is used for subscribing.

_NOTE_: Aside from the recommendation to utilize the [adapter.js](https://github.com/webrtc/adapter) library to "shim" similar functionality across WebRTC-supported browesers, the Red5 Pro SDK itself does not provide any polyfills for support. As such, the SDK checks the inherent support of the browser in its failover process.

> Read more about configurations and their attributes from the [Red5 Pro HTML SDK Documentation](https://www.red5.net/docs/development/publisher/webrtc/).

### Subscribing

```js
const { WHEPClient, RTCSubscriber } = red5prosdk

var rtcSubscriber = new WHEPClient() // Or, alternatively, use: new RTCSubscriber()
var config = {
  protocol: 'ws',
  host: 'localhost',
  port: 5080,
  app: 'live',
  streamName: 'mystream',
  rtcConfiguration: {
    iceServers: [{ urls: 'stun:stun2.l.google.com:19302' }],
    iceCandidatePoolSize: 2,
    bundlePolicy: 'max-bundle',
  }, // See https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary
}

const start = async () => {
  try {
    rtcSubscriber.on('*', (event) => {
      const { type, data } = event
      console.log(type, data)
    })
    await rtcSubscriber.init(config)
    await rtcSubscriber.subscribe()
  } catch (e) {
    console.error(e)
  }
}
start()
```
