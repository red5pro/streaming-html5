<h3 align="center">
  <img src="../assets/Red5_Truetime_black.png" alt="Red5 Pro Logo" height="65" />
</h3>
<p align="center">
  <a href="../README.md">Quick Start</a> &bull;
  <a href="whip-client.md">Publishing</a> &bull;
  <a href="whep-client.md">Subscribing</a> &bull;
  <a href="#">Message Channel</a> &bull;
  <a href="pubnub-client.md">PubNub Client</a>
</p>

---

# MessageChannel

The `MessageChannel` client is an ingest-based (read: "broadcast") client that extends `WHIPClient` as its underlying framework and capabilities are very similar, with the differing aspect of `MessageChannel` not supporting any media streaming.

## A Note on WHIP/WHEP & DataChannel

It should be noted if that `WHIPClient` and `WHEPClient` - used for publishing and subscribing streams, respectively - by default, include a messaging channel (a.k.a., `DataChannel`) through their underlying `RTCPeerConnection`.

Due to these clients' streaming nature, that underlying messaging channel will be closed once the respective stream is closed - meaning the messaging channel will not remain open if not broadcasting or consuming a stream.

In most cases, this is common scenario. However, if you would like to maintain a messaging channel _along-side_ a streaming client, you can utilize the `MessageChannel` client.

> Be aware that since the `MessageChannel` is not inherently associated with a stream, synchronizations between messages and any associative, external streams will not be available.

* [Usage](#usage)
* [Init Configuration](#init-configuration)
* [Send API](#send-api)
* [Events](#events)
* [Statistics](#statistics)
* [Stream Manager 2.0](#stream-manager-20)

# Usage

Because `MessageChannel` is a subclass of `WHIPClient` (the media streaming broadcaster), much of the init setup and event structure is similar.

To create and use a `MessageChannel` client:

```js
let messageChannel
try {
    messageChannel = new MessageChannel()
    messageChannel.on('*', , (event) => console.log(event))

    // See next section: Init Configuration, for more details.
    await messageChannel.init(configuration)
    await messageChannel.open()
} catch (error) {
    // Something went wrong...
}

// ... when ready to close the connection ...
messageChannel?.close()
```

## MessageChannel & the SDK

Dependening on how you include the SDK into your project, you can access the `MessageClient` from the following:

_NPM install_:

```js
import { MessageChannel } from 'red5pro-webrtc-sdk'
```

_Browser, CDN_:

```js
const { MessageChannel } = red5prosdk
```

> For more in-depth information related to usage, please refer to the [WHIPClient](whip-client.md#usage) documentation.

# Init Configuration

Because `MessageChannel` inherits from `WHIPClient`, its initialization configuration shares the same properties and structure, however many attributes will be ignored as they pertain to streaming media on a `WHIPClient` which have no regard to the role of a `MessageChannel`.

The following properties are respected by the `MessageChannel` client:

| Property | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `host` | [x] | *None* | The IP or address that the WebSocket server resides on. |
| `streamName` | [x] | *None* | The name of the message channel to use in association. |
| `protocol` | [x] | `https` | The protocol of the host for the signaling communication. |
| `port` | [x] | `443` | The port on the host that the Red5 server listens on; `5080` or `443` (insecure or secure, respectively). |
| `app` | [x] | `live` | The webapp context name that the stream is on. |
| `endpoint` | [-] | `undefined` | The full URL of the endpoint to stream to. **This is primarily used in Stream Manager 2.0 integration for clients.**
| `rtcConfiguration` | [-] | _Basic_ | The `RTCConfiguration` to use in setting up `RTCPeerConnection`. [RTCConfiguration](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary)|
| `dataChannelConfiguration` | [-] | `{name: "red5pro"}` | An object used in configuring a n `RTCDataChannel`. _Only used when `includeDataChannel` is defined as `true`_ |
| `connectionParams` | [-] | `undefined` | An object of connection parameters to send to the server upon connection request. |

## Init Example

The following is an example of using the init configuration for a `MessageChannel` client on a Standalone deployment of the Red5 Server:

```js
try {
    // If the standalone Red5 server is hosted over HTTPS, most other attributes can be left to default.
    const configuration = {
      host: 'mydeployment.red5.net',
      streamName: `${uuid}-message-channel`,
      dataChannelConfiguration: {
        name: 'my-channel-name'
      }
    }
    const messageChannel = new MessageChannel()
    messageChannel.on('*', , (event) => console.log(event))
    await messageChannel.init(configuration)
    await messageChannel.open()
} catch (error) {
    // Something went wrong...
}
```

# Send API

The `MessageChannel` has a few options for broadcasting messages out to other clients connected to the channel:

## send(methodName: string, data: any)

The `send` method is an override of the `MessageChannel` underlying `WHIPClient` implementation. It essentially is an override to ensure the message data is delivered on other connected clients to the specified DataChannel.

> The `data` is expected as either a string or an `Object` that can be serialized to JSON.

## sendMessage(message: any)

The `sendMessage` method is a convenience method of which the `send()` call invokes - delivering JSON data to all clients connected to the specified DataChannel

> The `message` is expected as either a string or an `Object` that can be serialized to JSON.

## sendData(data: any)

The `sendData` method will attempt to send any type of data, untouched, along the DataChannel - as such, with it comes great power; use wisely.

# Events

Because `MessageChannel` inherits from `WHIPClient`, events unrelated to streaming - such as those related to the underlying WebRTC connection (e.g., `WebRTC.*`) - will be dispatched from `MessageChannel`.

There are a few that are specific to `MessageChannel` that are available and enumerated on the `MessageChannelEventTypes` object:

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `OPEN` | 'MessageChannel.Open' | When the message channel has successfully opened and available to send and receive messages. |
| `SEND` | 'MessageChannel.Send' | When the message channel has sent a message along the message channel. _Note: This is not confirmation that the server received the actual message._ |
| `RECEIVE` | 'MessageChannel.Receive' | When the message channel has received a message. |
| `CLOSE` | 'MessageChannel.Close' | When the message channel has been closed. |
| `FAIL` | 'MessageChannel.Fail' | When the message channel has failed to open properly. |
| `ERROR` | 'MessageChannel.Error' | When an error has occurred in opening or during a message channel session. |

> Please visit the [WHIPClient](whip-client.md#events) documentation for more in-depth listing of events.

# Statistics

Similar to being able to monitor for statistics on the underlying `RTCPeerConnection` of other clients from the SDK, statistics related to the `MessageChannel` can be monitored as well - though the data gathered will pertain mostly to the connection and `data-channel`.

## Stats Configuration

The configuration used for statistics monitoring has the following structure:

```js
{
  // Optional.
  // If provided, it will POST stats to this endpoint.
  // If undefined or `data-channel`, it will post stats to message transport.
  // If null or `event-transport`, it will only emit status events.
  endpoint: red5prosdk.StatsEndpointType.DATA_CHANNEL,
  additionalHeaders: undefined,
  interval: 5000, // Interval to poll stats, in milliseconds.
  include: [], // Empty array allows SDK to be judicious about what stats to include.
}
```

### endpoint

* If the `endpoint` is defined with a URL, the SDK will attempt to make `POST` requests with a JSON body representing each individual report.
* If the `endpoint` is set to `data-channel` or `undefined`, the SDK will post metadata with type `stats-report` on the underlying message transport (DataChannel) if available.
* If the `endpoint` is set to `event-transport` or `null`, the SDK will only emit events with the metadata on the `WebRTC.StatsReport` event.

### additionalHeaders

By default, if an `endpoint` is defined, the `POST` request body will be in JSON and have the `{ 'Content-Type': 'application/json' }` header set. If requirements - such as authentication - are required, a map of additional headers can be provided to be sent along with the request.

### interval

The polling interval (in milliseconds) to access the `RTCStatsReport` from the underlying `RTCPeerConnection` of the publisher client.

### include

An array of static type strings. These directly map to the listing of type available for `RTCStatsReport` objects. If left empty or undefined, the SDK will report the statistics it deems suitable for tracking proper broadcast conditions.

e.g.,

```js
include: ['data-channel', 'transport']
```

> More information about the statistic types are available at [https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport#the_statistic_types](https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport#the_statistic_types)

## Invocation

To start statistics monitoring, you have a couple of options:

* You can provide a `stats` attribute with the [stats configuration object](#stats-configuration) to the [init configuration](#webrtc-configuration-parameters).
* You can call `monitorStats` on the publisher client with the optional [stats configuration object](#stats-configuration) parameter.

> Additionally, you can stop monitoring by calling `unmonitorStats` on the publisher client.

## Additional Information

Attached to the metadata that is reported are additional properties that pertain to the publisher client.

As well, Along with the metadata releated to the `RTCStatsReport` objects emitted by the underlying `RTCPeerConnection`, the statistics monitoring also sends out a few event and action metadata related to the operation of a publisher client.

> See the following section for examples.

## Example of Statistics Metadata

The following is an example of a statistics metadata that is emitted in a `WebRTC.StatsReport` event and POSTed to any defined optional endpoint:

```json
{
  "name": "MessageChannelStats",
  "created": 1771514183637,
  "fingerprint": "165799de-87ac-4c13-95d3-66c7512080fe",
  "device": {
    "appVersion": "5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36",
    "platform": "MacIntel",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36",
    "vendor": "Google Inc."
  },
  "client": {
    "host": "myred5.deploy",
    "streamName": "dc-1771514183635",
    "connectionParams": {
      "capabilities": 4
    }
  },
  "publicIP": "174.169.251.174",
  "type": "stats-report",
  "timestamp": 1771514658751,
  "data": {
    "id": "D159",
    "timestamp": 1771514658751.39,
    "type": "data-channel",
    "label": "red5pro",
    "state": "open",
    "messagesSent": 45,
    "messagesReceived": 93,
    "bytesSent": 4815,
    "bytesReceived": 12556
  }
}
```
# Stream Manager 2.0

> This section provides information that relate to the release of Stream Manager 2.0 and its integration with WHIP/WHEP clients, and MessageChannel.

The Stream Manager 2.0 simplifies the proxying of web clients to Origin and Edge nodes. As such, an initialization configuration property called `endpoint` was added to the WebRTC SDK. This `endpoint` value should be the full URL path to the proxy endpoint on the Stream Manager as is used as such:

## WHIP Proxy

```javascript
const host = 'my-deployment.red5.net'
const streamName = `${uuid}-message-channel`
const nodeGroup = 'my-node-group'
const endpoint = `https://${host}/as/v1/proxy/whip/live/${streamName}`
const config = {
  endpoint,
  streamName,
  connectionParams: {
    nodeGroup
  },
  dataChannelConfiguration: {
    name: 'my-channel'
  }
  // additional configurations
}
const messageChannel = await new MessageChannel().init(config)
messageChannel.on('*', (event) => console.log(event))
await messageChannel.open()
```
