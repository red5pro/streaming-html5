# Publishing RTC Streams over Stream Manager Proxy

The streammanager WebRTC proxy is a communication layer built inside streammanager web application which allows it to act as a proxy gateway for webrtc publishers / subscribers. The target use case of this communication layer is to facilitate a secure browser client to be able to connect to a "unsecure" remote websocket endpoint for consuming WebRTC services offered by Red5 Pro.

Stream Manager autoscaling works with dynamic nodes which are associated with dynamic IP addresses and cannot have a SSL attached to them. The proxy layer helps publishers to connect and initiate a WebRTC publish session from a `secure` (ssl enabled) domain to a `unsecure` Red5pro origin having using an IP address.

## Publishers

It should be noted that the Red5 Pro WebRTC SDK provides to instances to establish a proxy connection through the Stream Manager for publishing:

- `WHIPClient` - utilizes [WebRTC-HTTP ingestion](https://www.ietf.org/archive/id/draft-ietf-wish-whip-01.html) to establish a connection through series of HTTP/S requests.
- `RTCPublisher` - utilizes `WebSocket` to establish a connection.

### WHIPClient

When using the `WHIPClient` instance, you do not need to be concerned about accessing Origin addresses to instruct the Stream Manager Proxy where to send streams. The Stream Manager itself with detect where to proxy the stream to the correct origin.

### RTCPublisher

When using the `RTCPublisher` instance, you will need to first make a Stream Manager API request to request the Origin node instance information that you wish to proxy to. As this is an additional step - and that the connection times are longer than that of `WHIP/WHEP` - it is recommended to use the `WHIPClient`.

**Please refer to the [Basic Publisher Documentation](../../test/publish/README.md) to learn more about the basic setup.**

> In order to properly run the Stream Manager examples, you will need to configure you server for cluster infrastructure as described in the following documentation: [https://www.red5pro.com/docs/server/autoscale/](https://www.red5pro.com/docs/server/autoscale/).

## Server Configuration

> Please read about [WHIP/WHEP Configuration for Standalone and Stream Manager support.](https://www.red5pro.com/docs/special/user-guide/whip-whep-configuration/)

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

## Setup - RTCPublisher

In order to publish using an `RTCPublisher`, you first need to connect to the Stream Manager. The Stream Manager knows which origins are valid (part of a cluster) & available for publishing.

```js
function requestOrigin(configuration) {
  var host = configuration.host
  var app = configuration.app
  var proxy = configuration.proxy
  var streamName = configuration.stream1
  var port = serverSettings.httpport.toString()
  var portURI = port.length > 0 ? ':' + port : ''
  var baseUrl = isSecure
    ? protocol + '://' + host
    : protocol + '://' + host + portURI
  var apiVersion = configuration.streamManagerAPI || '4.0'
  var url =
    baseUrl +
    '/streammanager/api/' +
    apiVersion +
    '/event/' +
    app +
    '/' +
    streamName +
    '?action=broadcast'
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
          '[PublisherStreamManagerTest] :: Error - Could not request Origin IP from Stream Manager. ' +
            jsonError
        )
        reject(error)
      })
  })
}
```

The service returns a JSON object. In particular to note is the `serverAddress` attribute which will be the IP of the Origin server.

```json
  "name": "<stream-name>",
  "scope": "<stream-scope>",
  "serverAddress": "<origin-host-address>",
  "region": "<region-code>"
}
```

Next we construct the configuration object for the publisher per supported protocol. Note that the `proxy` usage is applicable for `rtc` only. The origin address is set directly as host for `rtmp` publisher where as it is passed in through `connectionParams` for `rtc`.

Another important to note is that for `rtc` publisher the target application is the proxy - the `streammanager` webapp and not the app that you want to publish to. The rtc configuration passes the actual target application name in `connectionParams` as `app`.

```js
function determinePublisher(serverAddress) {
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

  return new red5prosdk.RTCPublisher().init(rtcConfig)
}
```
