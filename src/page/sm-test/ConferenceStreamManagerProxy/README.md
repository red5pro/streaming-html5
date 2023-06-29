# Conference Chat

This example demonstrates multi-party communication using Red5 Pro. It should be used in conjunction with a conference WebSocket host such as [this example](https://github.com/red5pro/red5pro-conference-host).

It is recommended to view this example as part of the `webrtcexamples` webapp shipped with the [Red5 Pro Server](https://account.red5pro.com/download).

## Basic Publisher

**Please refer to the [Basic Publisher Documentation](../publishStreamManagerProxy/README.md) to learn more about the basic setup of a publisher.**

## Basic Subscriber

**Please refer to the [Basic Subscriber Documentation](../subscribeStreamManagerProxy/README.md) to learn more about the basic setup of a subscriber.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**
- **[conference-subscriber.js](conference-subscriber.js)**

# Setup

## WebSocket Conference Host

The `WebSocket Conference Host` refers to the socket endpoint that manages the list of active streams and their scopes for a given conference session.

We have provided a basic example at [https://github.com/red5pro/red5pro-conference-host](https://github.com/red5pro/red5pro-conference-host).

The default location of the `WebSocket Conference Host` is `localhost:8001`, in the assumption that you would download and run the above example locally on its default port of `8001`.

You can change the endpoint location of the `WebSocket Conference Host` by providing a `socket` query parameter pointing to the domain location, e.g.,

```sh
https://myred5pro.domain/webrtcexamples/sm-test/ConferenceStreamManagerProxy/?socket=mysocketlocation.com
```

Once a publish session has begun, a connection to the `WebSocket Conference Host` is established and messages with regards to active stream listing are handled:

```js
function establishSocketHost(publisher, roomName, streamName) {
  if (hostSocket) return
  var wsProtocol = socketEndpoint.match(/localhost/) ? 'ws' : 'wss'
  var url = `${wsProtocol}://${socketEndpoint}?room=${roomName}&streamName=${streamName}`
  hostSocket = new WebSocket(url)
  hostSocket.onmessage = function (message) {
    var payload = JSON.parse(message.data)
    if (roomName === payload.room) {
      processStreams(payload.streams, streamsList, roomName, streamName)
    }
  }
}
```
