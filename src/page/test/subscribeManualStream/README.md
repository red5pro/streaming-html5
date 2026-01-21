# Subscribing RTC Streams over stream manager proxy

The streammanager WebRTC proxy is a communication layer built inside streammanager web application which allows it to act as a proxy gateway for webrtc publishers / subscribers. The target use case of this communication layer is to facilitate a secure browser client to be able to connect to a "unsecure" remote websocket endpoint for consuming WebRTC services offered by Red5pro.

Streammanager autoscaling works with dynamic nodes which are associated with dynamic IP addresses and cannot have a SSL attached to them. The proxy layer helps subscribers to connect and initiate a WebRTC `subscribe` session from a `secure` (ssl enabled) domain to a `unsecure` Red5pro origin having using an IP address.

## Subscribers

It should be noted that the Red5 Pro WebRTC SDK provides three instances to establish a proxy connection through the Stream Manager for subscribing:

- `WHEPClient` - utilizes [WebRTC-HTTP egress](https://www.ietf.org/archive/id/draft-murillo-whep-00.html) to establish a connection through series of HTTP/S requests.
- `HLSSubscriber` - utilizes native support for HLS to playback (e.g., Mobile and Desktop Safari).

> **NOTE**: The `WHIPClient` and `WHEPClient` were introduced in the `11.0.0` release of the Red5 Pro WebRTC SDK.

### WHEPClient

When using the `WHEPClient` instance, you do not need to be concerned about accessing Edge addresses to instruct the Stream Manager Proxy where to send streams. The Stream Manager itself with detect where to proxy the stream to the correct edge.

### HLSSubscriber

The `HLSSubscriber` does not go through a connection sequence and streams the HLS directly from the server, however it does have an up to 6 second latency due to the length of its live segments.

**Please refer to the [Basic Subscriber Documentation](../../test/subscribe/README.md) to learn more about the basic setup.**

> In order to properly run the Stream Manager examples, you will need to configure you server for cluster infrastructure as described in the following documentation: [https://www.red5.net/docs/installation/](https://www.red5.net/docs/installation/).

## Server Configuration

> Please read about [WHIP/WHEP Configuration for Standalone and Stream Manager support.](https://www.red5.net/docs/special/user-guide/whip-whep-configuration/)

You also need to ensure that the stream manager proxy layer is `enabled`. The configuration section can be found in stream manager's config file - `red5-web.properties`

```sh
## WEBSOCKET PROXY SECTION

proxy.enabled=false
```

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# Setup

As mentioned in the previous section, there are two instances from the WebRTC SDK that can be used to establish a publishing session. They differ slightly in their setup described below.

## Setup - WHEPClient

The `WHEPClient` will make a `WHEP` endpoint connection to the Stream Manager which will now which Edge node to proxy the subscriber stream to. As such, setting up a `WHEPClient` for autoscaling is very similar to the setting up a `WHEPClient` as you would on a standalone server:

```js
function determineSubscriber(serverAddress) {
  const { host, app, stream1 } = configuration
  var config = {...configuration,
    ...defaultConfiguration,
    ...getUserMediaConfiguration()
  }
  var rtcConfig = {...config, {
    streamName: stream1,
    host: host
    app: app,
  }}

  return new red5prosdk.WHEPClient().init(rtcConfig)
}
```
