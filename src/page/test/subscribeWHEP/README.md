# Subscribe using WHEPClient

This is an example of using the `WHEPClient` of the SDK to start a subscriber session using the [WHEP protocol](https://www.ietf.org/archive/id/draft-murillo-whep-00.html) and endpoint service provided by the Red5 Pro Server.

This differs from the `RTCSubscriber` (of which the `WHEPClient` is an extension) in that a WebSocket is not used for the signaling process to establish a connection; instead it makes HTTP/S requests.

> The use of **WHEP** instead of WebSocket connection for exchange of candidates proves to shorten the connection time.

## example code
- **[index.html](index.html)**
- **[index.js](index.js)**

# Usage

There are two ways in which you can start a subscriber session using the `WHEPClient`:

* Using the constructor of a new `WHEPClient` instance to provide the **WHEP** endpoint and the target media element [discussed here](#providing-endpoint-and-video-element)
* Using an API similar to `RTCSubscriber` to provide an init configuration and request to subscribe [discussed here](#using-similar-api-to-rtcsubscriber)

## Providing endpoint and video element

If you want to allow the usual default configuration properties of a `RTCSubscriber` (of which the `WHEPClient` is an extension), you can simply provide the **WHEP** endpoint and target media element ot the constructor of `WHEPClient`:

```js
const whepEndpoint = "https://yourred5pro.com/live/whep/endpoint/stream1?resourceId=abc123"
const subscriber = new WHEPClient(whepEndpoint, document.querySelector('#red5pro-subscriber'))
subscriber.on('*', event => console.log(event))
```

When providing the endpoint and target media element in the constructor for `WHEPClient`, the SDK will automatically start of the connection calls and continue on to playback once available.

The construction of the **WHEP** endpoint URL is the following:

```
https://<your server deployment FQDN>/<app scope>/whep/endpoint/<stream name>?resourceId=<unique id>
```

* `app scope` - the target webapp scope to stream to. Typically `live`.
* `stream nam` - the name of the stream to subscribe to.
* `unqique id` - the `resourceId` query param needs to be a unique id for each subscriber.

## Using Similar API to RTCSubscriber

Alternatively, you can use a similar API to the `RTCSubscriber` which allows you to provide more granular init configuration properties if required:

```js
const config = {
  host: 'yourred5pro.com',
  streamName: 'stream1',
  ... (more)
}
const subscriber = await new WHEPClient().init(config)
subscriber.on('*', event => console.log(event))
await subscriber.subscribe()
```

By not supplying any arguments to the `WHEPClient` constructor, you are instructing the SDK that you will call the subsequent `init` and `subscribe` methods to start a connection and playback session.