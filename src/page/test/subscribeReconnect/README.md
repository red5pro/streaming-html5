# Subscribe Failover & Reconnection using Red5 Pro

This is an example of utilizing the failover mechanism of the Red5 Pro HTML SDK to select a subscriber based on browser support and to reconnect on close of broadcast or loss of connection.

**Please refer to the [Basic Subscriber Documentation](../subscribe/README.md) to learn more about the basic setup.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# Implementation

Use the events API to determine when to kick off a reconnection request.

A call to `connect` is set on a timeout and upon failure in being able to connect to a broadcast, the timeout is started over:

```js
function retryConnect () {
  clearTimeout(retryTimeout);
  if (!connected) {
    retryTimeout = setTimeout(connect, 1000)
  }
}
```
[index.js #134](index.js#L134)

When a connection is established, an event handler is assigned to the subscriber instance to handle situations in which the broadcast will be stopped.

## Events & Reconnection

In the occurance of a lost stream from the publisher - either from a network issue or stop of broadcast - you can stopstart the request cycle again.

There are 2 important events that relate to the loss of a publisher:

* CONNECTION_CLOSED
* NET_STATUS with message of `NetStream.Play.UnpublishNotify`

In this example, we rely on the `CONNECTION_CLOSED` event to start that reconnect cycle again, waiting for the publisher to come back:

```js
function onSubscriberEvent (event) {
  if (event.type !== 'Subscribe.Time.Update') {
    console.log('[Red5ProSubscriber] ' + event.type + '.');
    updateStatusFromEvent(event);
  }

  // If connection lost, let's start trying to connect again...
  if (event.type === red5prosdk.SubscriberEventTypes.CONNECTION_CLOSED ||
     event.type === red5prosdk.SubscriberEventTypes.CONNECT_FAILURE) {
      setConnected(false);
  }
}
```

[index.js #56](index.js#L56)

Listening on `CONNECTION_CLOSED` is best as it will handle both the scenario that the broadcast has stopped from the publisher side (either explicitly or from a poor network condition) and the connection for the subscriber having been closed (either explcitly from the server after a broadcast stop or from a poor network condition).

