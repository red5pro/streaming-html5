# Publishing RTC Streams over Stream Manager Proxy

The streammanager WebRTC proxy is a communication layer built inside streammanager web application which allows it to act as a proxy gateway for webrtc publishers / subscribers. The target use case of this communication layer is to facilitate a secure browser client to be able to connect to a "unsecure" remote websocket endpoint for consuming WebRTC services offered by Red5 Pro.

Stream Manager autoscaling works with dynamic nodes which are associated with dynamic IP addresses and cannot have a SSL attached to them. The proxy layer helps publishers to connect and initiate a WebRTC publish session from a `secure` (ssl enabled) domain to a `unsecure` Red5pro origin having using an IP address.

## Publishers

It should be noted that the Red5 Pro WebRTC SDK provides an instance to establish a proxy connection through the Stream Manager for publishing:

- `WHIPClient` - utilizes [WebRTC-HTTP ingestion](https://www.ietf.org/archive/id/draft-ietf-wish-whip-01.html) to establish a connection through series of HTTP/S requests.

### WHIPClient

When using the `WHIPClient` instance, you do not need to be concerned about accessing Origin addresses to instruct the Stream Manager Proxy where to send streams. The Stream Manager itself with detect where to proxy the stream to the correct origin.

**Please refer to the [Basic Publisher Documentation](../../test/publish/README.md) to learn more about the basic setup.**

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

## Setup - WHIPClient

The `WHIPClient` will make a `WHIP` endpoint connection to the Stream Manager which will now which Origin node to proxy the broadcast stream to. As such, setting up a `WHIPClient` for autoscaling is very similar to the setting up a `WHIPClient` as you would on a standalone server:

```js
function determinePublisher(serverAddress) {
  const { host, app, stream1 } = configuration
  var config = {...configuration,
    ...defaultConfiguration,
    ...getUserMediaConfiguration()
  }
  var rtcConfig = {...config, {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port,
    streamName: stream1,
    host: host
    app: app,
  }}

  return new red5prosdk.WHIPClient().init(rtcConfig)
}
```
