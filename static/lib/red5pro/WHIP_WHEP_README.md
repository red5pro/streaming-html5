# WHIP / WHEP Support in Red5 Pro

The [WebRTC-HTTP ingestion](https://www.ietf.org/archive/id/draft-ietf-wish-whip-01.html)(WHIP) and [WebRTC-HTTP egress](https://www.ietf.org/archive/id/draft-murillo-whep-00.html)(WHEP) protocols provide the ability to negotation and establish a connection using HTTP/S requests. This removes the requirement for a WebSocket, which historically has been used for the role of negotiation and connection.

The use of a WebSocket is still available in `RTCPublisher` and `RTCSubscriber` and the ability to utilize WHIP/WHEP is provided from the `WHIPClient` and `WHEPClient` classes in the SDK. As is evident by their acronyms, the `WHIPClient` is used for publishing and the `WHEPClient` is used for subscribing.

# WHIPClient

The `WHIPClient` is an extension of `RTCPublisher`. It can be used very similar to the `RTCPublisher` with much of the same event life cycle - with the exception of those events related to WebSocket connection.

There are two ways in which you can start a publish session using the `WHIPClient`:

- Using the constructor of a new `WHIPClient` instance to provide the **WHIP** endpoint and the target media element [discussed here](#providing-endpoint-and-video-element-for-whip)
- Using an API similar to `RTCPublisher` to provide an init configuration and request to publish [discussed here](#using-similar-api-to-rtcpublisher)

## Providing endpoint and video element for WHIP

If you want to allow the usual default configuration properties of a `RTCPublisher` (of which the `WHIPClient` is an extension), you can simply provide the **WHIP** endpoint and target media element ot the constructor of `WHIPClient`:

```js
const whipEndpoint = 'https://yourred5pro.com/live/whip/endpoint/stream1'
const publisher = new WHIPClient(
  whipEndpoint,
  document.querySelector('#red5pro-publisher')
)
publisher.on('*', (event) => console.log(event))
```

When providing the endpoint and target media element in the constructor for `WHIPClient`, the SDK will automatically start of the connection calls and continue on to publish once available.

The construction of the **WHIP** endpoint URL is the following:

```
https://<your server deployment FQDN>/<app scope>/whip/endpoint/<stream name>
```

- `app scope` - the target webapp scope to stream to. Typically `live`.
- `stream name` - the unique name of the stream to publish on.

## Using Similar API to RTCPublisher

Alternatively, you can use a similar API to the `RTCPublisher` which allows you to provide more granular init configuration properties if required:

```js
const config = {
  host: 'yourred5pro.com',
  streamName: 'stream1',
  ...more,
}
const publisher = await new WHIPClient().init(config)
publisher.on('*', (event) => console.log(event))
await publisher.publish()
```

By not supplying any arguments to the `WHIPClient` constructor, you are instructing the SDK that you will call the subsequent `init` and `publish` methods to start a connection and playback session.

> Please refer to the [Publisher](PUBLISHER_README.md) documentation for more information related for configuration details and lifecycle.

## Additional WHIP Configuration Properties.

There are two additional configuration properties that pertain to WHIP clients only:

- `trickleIce`: flag to send candidates after establishing a connection and generation. Default: _true_. By default, the SDK will send ICE candidates in a patch after POST of an Offer. By turning this to _false_, it will send an all candidates along in the POST of the Offer.
- `enableChannelSignaling`: flag to also open a data channel for messaging. Default: _true_. You can turn this to _false_ to not open an additional data channel, though **be warned that this will also turn off any essential messaging that comes from the server.**

# WHEPClient

There are two ways in which you can start a subscriber session using the `WHEPClient`:

- Using the constructor of a new `WHEPClient` instance to provide the **WHEP** endpoint and the target media element [discussed here](#providing-endpoint-and-video-element-for-whep)
- Using an API similar to `RTCSubscriber` to provide an init configuration and request to subscribe [discussed here](#using-similar-api-to-rtcsubscriber)

## Providing endpoint and video element for WHEP

If you want to allow the usual default configuration properties of a `RTCSubscriber` (of which the `WHEPClient` is an extension), you can simply provide the **WHEP** endpoint and target media element ot the constructor of `WHEPClient`:

```js
const whepEndpoint =
  'https://yourred5pro.com/live/whep/endpoint/stream1?resourceId=abc123'
const subscriber = new WHEPClient(
  whepEndpoint,
  document.querySelector('#red5pro-subscriber')
)
subscriber.on('*', (event) => console.log(event))
```

When providing the endpoint and target media element in the constructor for `WHEPClient`, the SDK will automatically start of the connection calls and continue on to playback once available.

The construction of the **WHEP** endpoint URL is the following:

```
https://<your server deployment FQDN>/<app scope>/whep/endpoint/<stream name>?resourceId=<unique id>
```

- `app scope` - the target webapp scope to stream to. Typically `live`.
- `stream name` - the name of the stream to subscribe to.
- `unqique id` - the `resourceId` query param needs to be a unique id for each subscriber.

## Using Similar API to RTCSubscriber

Alternatively, you can use a similar API to the `RTCSubscriber` which allows you to provide more granular init configuration properties if required:

```js
const config = {
  host: 'yourred5pro.com',
  streamName: 'stream1',
  ...more,
}
const subscriber = await new WHEPClient().init(config)
subscriber.on('*', (event) => console.log(event))
await subscriber.subscribe()
```

By not supplying any arguments to the `WHEPClient` constructor, you are instructing the SDK that you will call the subsequent `init` and `subscribe` methods to start a connection and playback session.

> Please refer to the [Subscriber](SUBSCRIBER_README.md) documentation for more information related for configuration details and lifecycle.

## Additional WHEP Configuration Properties.

There are two additional configuration properties that pertain to WHEP clients only:

- `trickleIce`: flag to send candidates after establishing a connection and generation. Default: _true_. By default, the SDK will send ICE candidates in a patch after POST of an Offer. By turning this to _false_, it will send an all candidates along in the POST of the Offer.
- `enableChannelSignaling`: flag to also open a data channel for messaging. Default: _true_. You can turn this to _false_ to not open an additional data channel, though **be warned that this will also turn off any essential messaging that comes from the server.**
