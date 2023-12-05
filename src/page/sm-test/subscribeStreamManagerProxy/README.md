# Subscribing RTC Streams over stream manager proxy

The streammanager WebRTC proxy is a communication layer built inside streammanager web application which allows it to act as a proxy gateway for webrtc publishers / subscribers. The target use case of this communication layer is to facilitate a secure browser client to be able to connect to a "unsecure" remote websocket endpoint for consuming WebRTC services offered by Red5pro.

Streammanager autoscaling works with dynamic nodes which are associated with dynamic IP addresses and cannot have a SSL attached to them. The proxy layer helps subscribers to connect and initiate a WebRTC `subscribe` session from a `secure` (ssl enabled) domain to a `unsecure` Red5pro origin having using an IP address.

## Subscribers

It should be noted that the Red5 Pro WebRTC SDK provides three instances to establish a proxy connection through the Stream Manager for subscribing:

- `WHEPClient` - utilizes [WebRTC-HTTP egress](https://www.ietf.org/archive/id/draft-murillo-whep-00.html) to establish a connection through series of HTTP/S requests.
- `RTCSubscriber` - utilizes `WebSocket` to establish a connection.
- `HLSSubscriber` - utilizes native support for HLS to playback (e.g., Mobile and Desktop Safari).

> **NOTE**: The `WHIPClient` and `WHEPClient` were introduced in the `11.0.0` release of the Red5 Pro WebRTC SDK.

### WHEPClient

When using the `WHEPClient` instance, you do not need to be concerned about accessing Edge addresses to instruct the Stream Manager Proxy where to send streams. The Stream Manager itself with detect where to proxy the stream to the correct edge.

### RTCSubscriber

When using the `RTCSubscriber` instance, you will need to first make a Stream Manager API request to request the Edge node instance information that you wish to proxy to. As this is an additional step - and that the connection times are longer than that of `WHIP/WHEP` - it is recommended to use the `WHEPClient`.

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

## Setup - WHIPClient

The `WHEPClient` will make a `WHEP` endpoint connection to the Stream Manager which will now which Edge node to proxy the subscriber stream to. As such, setting up a `WHEPClient` for autoscaling is very similar to the setting up a `WHEPClient` as you would on a standalone server:

```js
function determineSubscriber(serverAddress) {
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

  return new red5prosdk.WHEPClient().init(rtcConfig)
}
```

## Setup - RTCSubscriber

In order to subscribe, you first need to connect to the Stream Manager. The Stream Manager will know which origin is being used for the stream and accordingly will provide with an usable edge to consume the stream.

```js
function requestEdge(configuration) {
  var host = configuration.host
  var app = configuration.app
  var port = serverSettings.httpport.toString()
  var portURI = port.length > 0 ? ':' + port : ''
  var baseUrl = isSecure
    ? protocol + '://' + host
    : protocol + '://' + host + portURI
  var streamName = configuration.stream1
  var apiVersion = configuration.streamManagerAPI || '4.0'
  var url =
    baseUrl +
    '/streammanager/api/' +
    apiVersion +
    '/event/' +
    app +
    '/' +
    streamName +
    '?action=subscribe'
  return new Promise(function (resolve, reject) {
    fetch(url)
      .then(function (res) {
        if (
          res.headers.get('content-type') &&
          res.headers
            .get('content-type')
            .toLowerCase()
            .indexOf('application/json') >= 0
        ) {
          return res.json()
        } else {
          throw new TypeError('Could not properly parse response.')
        }
      })
      .then(function (json) {
        resolve(json.serverAddress)
      })
      .catch(function (error) {
        var jsonError =
          typeof error === 'string' ? error : JSON.stringify(error, null, 2)
        console.error(
          '[SubscribeStreamManagerTest] :: Error - Could not request Edge IP from Stream Manager. ' +
            jsonError
        )
        reject(error)
      })
  })
}
```

The service returns a JSON object. In particular to note is the `serverAddress` attribute which will be the IP of the Edge server.

```js
  "name": "<stream-name>",
  "scope": "<stream-scope>",
  "serverAddress": "<edge-host-address>",
  "region": "<region-code>"
}
```

Next we construct the configuration objects for the subscriber per supported protocol. Note that the proxy usage is applicable for `rtc` only. The edge address is set directly as host for `rtmp` or `hls` subscriber configuration, whereas it is passed in through connectionParams for `rtc`.

Another important to note is that for `rtc` subscriber the target application is the `proxy` - the `streammanager` webapp and not the app that you want to subscribe to. The `rtc` configuration passes the actual target application name in connectionParams as `app`.

```js
function determineSubscriber(serverAddress) {
  const { host, app, proxy, stream1 } = configuration
  var config = {...configuration,
    ...defaultConfiguration,
    ...getUserMediaConfiguration()
  }
  var rtcConfig = {...config, {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port,
    streamName: stream1,
    host: host
    app: proxy,
    connectionParams: {
      host: serverAddress,
      app: app,
    },
  }}

  return new red5prosdk.Subscriber().init(rtcConfig)
```
