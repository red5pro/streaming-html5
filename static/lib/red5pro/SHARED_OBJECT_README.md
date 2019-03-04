<h3 align="center">
  <img src="assets/red5pro_logo.png" alt="Red5 Pro Logo" />
</h3>
<p align="center">
  <a href="PUBLISHER_README.md">publisher</a> &bull;
  <a href="SUBSCRIBER_README.md">subscriber</a> &bull;
  <a href="SHARED_OBJECT_README.md">shared object</a>
</p>

---

# Shared Objects with Red5 Pro HTML SDK

Shared Objects provide a way to send, receive and store information between clients connected to the Red5 Pro Server.

Use of Shared objects requires an active connection. The active connection can be established using the `Red5ProSharedObjectSocket` class from the SDK, or from an already established stream - either publishing or subscribing.

* [Shared Objects and Socket](#shared-objects-and-Red5ProSharedObjectSocket)
* [Shared Objects and Clients](#shared-objects-and-clients)
  * [Creating Shared Object with Publisher](#creating-a-shared-object-with-publisher)
  * [Creating Shared Object with Subscriber](#creating-a-shared-object-with-subscriber)
* [Shared Object API](#shared-object-api)
  * [Closing a Shared Object](#closing-a-shared-object)
  * [Shared Object Property Updates](#shared-object-property-updates)
  * [Shared Object Method Updates](#shared-object-method-updates)
* [Shared Object Events](#shared-object-events)

# Shared Objects and Red5ProSharedObjectSocket

To establish a Shared Object connection when targeting an HTML-based client, a previously establish connection must be made and provided to the Shared Object instance. Though you can easily use a previously established connection from [a streaming client](#shared-objects-and-clients) you can also use the `Red5ProSharedObjectSocket` class from the HTML SDK.

To instantiate and start a socket connection using the `Red5ProSharedObjectSocket` class:

```js
(function (red5prosdk) {

  var socket = new red5prosdk.Red5ProSharedObjectSocket()
  socket.init({
      protocol: 'wss',
      port: 443,
      app: 'live'
    })
    .then(function (socket) {
      // Socket connection is established.
      establishSharedObject(socket);
    })
    .catch(function (error) {
      // An error has occurred in establishing a connection.
    });

})(window.red5prosdk);
```

> The `Red5ProSharedObjectSocket` class from the Red5 Pro HTML SDK is a proxy to an underlying `WebSocket` that provides convenience in communicating to and from the Red5 Pro Server.

Once the `Red5ProSharedObjectSocket` connection is available, it is provided to a `Red5ProSharedObject` instance - along with a shared object name - to establish a connection to the Remote Shared Object on the server:

```js
var so;
function establishSharedObject (socket) {
  so = new red5prosdk.Red5ProSharedObject('sharedObjectTest', socket);
  so.on('*', handleSharedObjectEvents);
}

function handleSharedObjectEvents (event) {
  // Handle events.
}
```

> For more information about the type of events and data provided, refer to the [Shared Object Events](#shared-object-events) section.

# Shared Objects and Clients

When using an already established client connection, the content of the stream isn't important to the shared object itself, even a muted audio-only stream will be enough. Additionally, which stream you are connected to isn't important to which shared object you access, meaning that clients across multiple streams can use the same object, or there could be multiple overlapping objects in the same stream.

## Creating a Shared Object with Publisher

```js
(function (red5prosdk) {

  var so;
  var publisher = new red5prosdk.Red5ProPublisher();
  publisher.init(configuration)
    // Resolve to proper publisher implementation as you normally would.
    .then( function(publisherImpl) {
      // Request to publish.
      return publisherImpl.publish()
    })
    // Instantiate Shared Object with publisher instance.
    .then( function(publisherImpl) {
      so = new red5prosdk.Red5ProSharedObject('sharedObjectTest', publisherImpl);
      so.on('*', handleSharedObjectEvents);
    })
    .catch( function(error) {
      // handle possible error in instantiation od publisher implementation.
    });

})(window.red5prosdk);
```

## Creating a Shared Object with Subscriber Stream

```js
(function (red5prosdk) {

  var so;
  var subscriber = new red5prosdk.Red5ProSubscriber();
  subscriber.init(configuration)
    .then( function(subscriberImpl) {
      return subscriberImpl.subscribe();
    })
    .then( function(subscriberImpl) {
      so = new red5pro.Red5ProSharedObject('sharedObjectTest', subscriberImpl);
      so.on('*', handleSharedObjectEvents);
    })
    .catch( function(error) {
      // handle possible error in instantiation od subscriber implementation.
    });

})(window.red5prosdk);
```

# Shared Object API

The `Red5ProSharedObject` provides the following API that can be used after having established a connection:

* [setProperty](#shared-object-property-updates)
* [send](#shared-object-method-updates)
* [close] (#closing-a-shared-object)

## Closing a Shared Object

Closing a remote Shared Object instance is as easy as invoking `close`.

```js
so.off('*', handleSharedObjectEvents);
so.close();
```

> The event delegate is also removed using the `off` method, since `SharedObject` is an instance of `EventEmitter`.

## Shared Object Property Updates

Remote Shared Objects use JSON for transmission, meaning that its structure is primarily up to your discretion. The base object will always be a dictionary with string keys, while values can be strings, numbers, booleans, arrays, or other dictionaries - with the same restriction on sub-objects.

This example simply uses a number to keep a count of how many people are connected to the object. As seen in the `PROPERTY_UPDATE` handler, value can be accessed from the object by name, and set using `setProperty`:

```js
so.on(red5pro.SharedObjectEventTypes.PROPERTY_UPDATE, function (event) {

  if (event.data.hasOwnProperty('count')) {
    appendMessage('User count is: ' + event.data.count + '.');
    if (!hasRegistered) {
      hasRegistered = true;
      so.setProperty('count', parseInt(event.data.count) + 1);
    }
  }
  else if (!hasRegistered) {
    hasRegistered = true;
    so.setProperty('count', 1);
  }

});
```

## Shared Object Method Updates

The Shared Object interface also allows sending messages to other people watching the object. By sending a Object through the `send` method, that object will be passed to all the listening clients that implement the specified call.

```js
function sendMessageOnSharedObject (message) {

  so.send('messageTransmit', {
    user: configuration.stream1,
    message: message
  });

}
```

Like with the parameters of the object, as long as the Object sent parses into JSON, the structure of the object is up to you, and it will reach the other clients in whole as it was sent.

In this example, we are marking the message object as type `messageTransmit` with data related ot the user sending the message and a message String.

In the event handler for messages, this example then invokes that method name of `messageTransmit` on the callback client:

```js
// Invoked from METHOD_UPDATE event on Shared Object instance.
function messageTransmit (message) { // eslint-disable-line no-unused-vars
  soField.value = ['User "' + message.user + '": ' + message.message, soField.value].join('\n');
}

so.on(red5pro.SharedObjectEventTypes.METHOD_UPDATE, function (event) {
  soCallback[event.data.methodName].call(null, event.data.message);
});
```

# Shared Object Events

The `SharedObject` included in the SDK is an event emitter that has a basic API to subscribing and unsubscribing to events either by name or by wildcard.

To subscribe to all events from a shared object:

```js
function handleSharedObjectEvent (event) {
  // The name of the event:
  var type = event.type;
  // The name associated with the shared object instance:
  var name = event.name;
  // Optional data releated to the event (not available on all events):
  var data = event.data;
}

var so = new red5prosdk.Red5ProSharedObject();
so.on('*', handleSharedObjectEvent);
```

> The `*` type assignment is considered a "Wildcard" subscription - all events being issued by the shared object instance will invoke the assign event handler.

To unsubscribe to all events from a shared object after assinging an event handler:

```js
so.off('*', handleSharedObjectEvent);
```

The following sections of this document describe the event types that can also be listened to directly, instead of using the `*` wildcard.

## Common Events

The following events are common across all SharedObject implementations from the Red5 Pro HTML SDK. They can be accessed from the global `red5prosdk` object from the `SharedObjectEventTypes` attribute.

| Access | Name | Meaning |
| :--- | :---: | :--- |
| CONNECT_SUCCESS | 'Connect.Success' | When the shared object has established a required remote connection. |
| CONNECT_FAILURE | 'Connect.Failure' | When the shared object has failed to establish a required remote connection. |
| PROPERTY_UPDATE | 'SharedObject.PropertyUpdate' | When an update to a property held on the shared object has been updated. |
| METHOD_UPDATE | 'SharedObject.MethodUpdate' | When a client has invoked a message to be received on connected clients. |
| CONNECTION_CLOSED | 'SharedObject.Connection.Closed' | When the Shared Object is successfully `close`d on the server. |
