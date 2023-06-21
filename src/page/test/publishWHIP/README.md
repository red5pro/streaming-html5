# Publish using WHIPClient

This is an example of using the `WHIPClient` of the SDK to start a publish session using the [WHIP protocol](https://www.ietf.org/archive/id/draft-ietf-wish-whip-01.html) and endpoint service provided by the Red5 Pro Server.

This differs from the `RTCPublisher` (of which the `WHIPClient` is an extension) in that a WebSocket is not used for the signaling process to establish a connection; instead it makes HTTP/S requests.

> The use of **WHIP** instead of WebSocket connection for exchange of candidates proves to shorten the connection time.

## example code
- **[index.html](index.html)**
- **[index.js](index.js)**

# Usage

There are two ways in which you can start a publish session using the `WHIPClient`:

* Using the constructor of a new `WHIPClient` instance to provide the **WHIP** endpoint and the target media element [discussed here](#providing-endpoint-and-video-element)
* Using an API similar to `RTCPublisher` to provide an init configuration and request to publish [discussed here](#using-similar-api-to-rtcpublisher)

## Providing endpoint and video element

If you want to allow the usual default configuration properties of a `RTCPublisher` (of which the `WHIPClient` is an extension), you can simply provide the **WHIP** endpoint and target media element ot the constructor of `WHIPClient`:

```js
const whipEndpoint = "https://yourred5pro.com/live/whip/endpoint/stream1"
const publisher = new WHIPClient(whipEndpoint, document.querySelector('#red5pro-publisher'))
publisher.on('*', event => console.log(event))
```

When providing the endpoint and target media element in the constructor for `WHIPClient`, the SDK will automatically start of the connection calls and continue on to publish once available.

The construction of the **WHIP** endpoint URL is the following:

```
https://<your server deployment FQDN>/<app scope>/whip/endpoint/<stream name>
```

* `app scope` - the target webapp scope to stream to. Typically `live`.
* `stream nam` - the unique name of the stream to publish on.

## Using Similar API to RTCPublisher

Alternatively, you can use a similar API to the `RTCPublisher` which allows you to provide more granular init configuration properties if required:

```js
const config = {
  host: 'yourred5pro.com',
  streamName: 'stream1',
  ... (more)
}
const publisher = await new WHIPClient().init(config)
publisher.on('*', event => console.log(event))
await publisher.publish()
```

By not supplying any arguments to the `WHIPClient` constructor, you are instructing the SDK that you will call the subsequent `init` and `publish` methods to start a connection and playback session.