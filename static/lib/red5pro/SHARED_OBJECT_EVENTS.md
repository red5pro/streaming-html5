# Shared Object Events
This document describes the events dispatched from the Shared Object of the Red5 Pro HTML SDK.

* [Creation](#creation)
* [Listening to SharedObject Events](#listening-to-sharedobject-events)
* [Common Events](#common-events)

## Creation
A connected Publisher or Subscriber instance is required to create a new `SharedObject` instance. You will not have to worry about the failover type of these connections (either WebRTC or Flash) as the SDK accounts for how to handle the messaging through a common API.

## Listening to SharedObject Events
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
| --- | --- | --- |
| CONNECT_SUCCESS | 'Connect.Success' | When the shared object has established a required remote connection. |
| CONNECT_FAILURE | 'Connect.Failure' | When the shared object has failed to establish a required remote connection. |
| PROPERTY_UPDATE | 'SharedObject.PropertyUpdate' | When an update to a property held on the shared object has been updated. |
| METHOD_UPDATE | 'SharedObject.MethodUpdate' | When a client has invoked a message to be received on connected clients. |

> Please refer to the [README](README.md) file for further information on the `SharedObject` of the Red5 Pro HTML SDK.
