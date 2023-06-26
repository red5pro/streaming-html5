# Shared Object

This example demonstrates the use of Remote Shared Objects, which provides a mechanism to share and persist information across mutiple clients in real time, as well as sending messages to all clients that are connected to the object.

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# Setup

This example demonstrates the use of Shared Objects through a WebSocket proxy from the Red5 Pro HTML SDK.

To run the test, you will need at least two clients running the `Shared Object` example. This example demonstrates connecting and responding to events on a Shared Object with the name `sharedChatTest`.

# Connection

> Shared Objects require a successfully opened WebSocket.

The first important piece to communication with a Shared Object is having an established WebSocket connection. In order to handle the communication complexities between the Red5 Pro Server and WebSocket, the Red5 Pro HTML SDK provides a `Red5ProSharedObjectSocket` class to be used and provided to a `Red5ProSharedObject` instance.

To make a WebSocket connection to the Red5 Pro Server that will be used in communication with a Shared Object:

```js
var socket = new red5prosdk.Red5ProSharedObjectSocket()
socket.init(config).then(function (socket) {
  onSocketSuccess(socket)
})
```

Instantiating a new `Red5ProSharedObject` requires a name and the previously established connection. Using the underlying connection, the SDK will make an additional connection to a specified Shared Object.

```js
var so = new red5pro.Red5ProSharedObject('sharedChatTest', socket)
so.on(red5prosdk.SharedObjectEventTypes.CONNECT_SUCCESS, handleSuccess)
so.on(red5prosdk.SharedObjectEventTypes.CONNECT_FAILURE, handleFailure)
so.on(red5pro.SharedObjectEventTypes.PROPERTY_UPDATE, handlePropertyUpdate)
so.on(red5pro.SharedObjectEventTypes.METHOD_UPDATE, handleMethodUpdate)
```

> To disconnect from a `SharedObject`, simply call `close` on the instance.

## Events

The `SharedObject` instance dispatches the following events:

- `Connect.Success`, accessible on SDK root at `SharedObjectEventTypes.CONNECT_SUCCESS`.
- `Connect.Failure`, accessible on SDK root at `SharedObjectEventTypes.CONNECT_FAILURE`.
- `SharedObject.PropertyUpdate`, accessible on SDK root at `SharedObjectEventTypes.PROPERTY_UPDATE`.
- `SharedObject.MethodUpdate`, accessible on SDK root at `SharedObjectEventTypes.METHOD_UPDATE`.

| Name                             | Description                                                                    |
| -------------------------------- | ------------------------------------------------------------------------------ |
| `Connect.Success`                | Successful connection of SharedObject on the publisher or subscriber instance. |
| `Connect.Failure`                | Failure in connection of SharedObject on the publisher or subscriber instance. |
| `SharedObject.PropertyUpdate`    | Update to a peristed property on the remote SharedObject.                      |
| `SharedObject.MethodUpdate`      | Remote SharedObject invocation of method to be received on connected clients.  |
| `SharedObject.Connection.Closed` | Dispatched on successful disconnect from server upon `close` request.          |

## Persistent Information

Remote Shared Objects use JSON for transmission, meaning that its structure is primarily up to your discretion. The base object will always be a dictionary with string keys, while values can be strings, numbers, booleans, arrays, or other dictionaries - with the same restriction on sub-objects.

This example simply uses a `color` property to update and set the text color of messages across all clients connected to the same shared object.

The `color` value can be set to the Shared Object using `setProperty`:

```js
colorPicker.addEventListener('input', handleColorChangeRequest)

function handleColorChangeRequest(event) {
  if (so) {
    so.setProperty('color', event.target.value)
  }
}
```

As seen in the `PROPERTY_UPDATE` handler, value can be accessed from the object by name:

```js
so.on(red5pro.SharedObjectEventTypes.PROPERTY_UPDATE, function (event) {
  if (event.data.hasOwnProperty('color')) {
    soField.style.color = event.data.color
    colorPicker.value = event.data.color
  }
})
```

## Messages

The Shared Object interface also allows sending messages to other people watching the object. By sending a Object through the `send` method, that object will be passed to all the listening clients that implement the specified call.

```js
function sendMessageOnSharedObject(message) {
  so.send('messageTransmit', {
    user: configuration.stream1,
    message: message,
  })
}
```

Like with the parameters of the object, as long as the Object sent parses into JSON, the structure of the object is up to you, and it will reach the other clients in whole as it was sent.

In this example, we are marking the message object as type `messageTransmit` with data related ot the user sending the message and a message String.

In the event handler for messages, this example then invokes that method name of `messageTransmit` on the callback client:

```js
// Invoked from METHOD_UPDATE event on Shared Object instance.
function messageTransmit(message) {
  // eslint-disable-line no-unused-vars
  soField.value = [
    'User "' + message.user + '": ' + message.message,
    soField.value,
  ].join('\n')
}
```

```js
so.on(red5pro.SharedObjectEventTypes.METHOD_UPDATE, function (event) {
  soCallback[event.data.methodName].call(null, event.data.message)
})
```

# Shared Objects and Streaming

You can also employ Shared Objects utiliziing previously established connections from Publisher and Subscriber clients. In such a scenario, you would not create a separate `Socket` connection, and instead supply the Publisher or Subscriber instance as the connection instance for the Shared Object.

> For examples of using an already established Publisher or Subscriber as a connection for Shared Objects, please refer to the [Publish Shared Object](../publishSharedObject) and [Subscribe Shared Object](../subscribeSharedObject) examples.
