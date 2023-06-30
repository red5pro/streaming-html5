# Subscribe Failover & Reconnection through Stream Manager Proxy

This is an example of utilizing the failover mechanism of the Red5 Pro HTML SDK to select a subscriber based on browser support and to reconnect on close of broadcast or loss of connection.

The streammanager WebRTC proxy is a communication layer built inside streammanager web application which allows it to act as a proxy gateway for webrtc publishers / subscribers. The target use case of this communication layer is to facilitate a secure browser client to be able to connect to a "unsecure" remote websocket endpoint for consuming WebRTC services offered by Red5pro.

Streammanager autoscaling works with dynamic nodes which are associated with dynamic IP addresses and cannot have a SSL attached to them. The proxy layer helps subscribers to connect and initiate a WebRTC `subscribe` session from a `secure` (ssl enabled) domain to a `unsecure` Red5pro origin having using an IP address.

**Please refer to the [Basic Subscriber Documentation](../subscribeStreamManagerProxy/README.md) to learn more about the basic setup.**

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

## Reconnection Logic

Use the events API to determine when to kick off a reconnection request - typically these will be the following events:

- `Subscribe.Unpublish` - When the broadcast being consumed has stopped.
- `Subscribe.Connection.Closed` - When a previously established connection to a broadcast stream has closed. This can occur during Network loss or an Edge being removed.

At the point of failure in establishing an initial connection and when a previously established connection/stream is lost, a call to set its connection state to false is invoked:

```js
function setConnected(value) {
  connected = value
  if (!connected) {
    if (targetSubscriber) {
      targetSubscriber.off('*', onSubscriberEvent)
    }
    unsubscribe()
    targetSubscriber = undefined
    retryConnect()
  }
}
```

If a previously established subscriber is existant, it will tear it down, and continue on to invoke `retryConnect()`.

A call to `startup` is set on a timeout and upon failure in being able to connect to a broadcast, the timeout is started over:

```js
function retryConnect() {
  clearTimeout(retryTimeout)
  if (!connected) {
    retryTimeout = setTimeout(startup, 1000)
  }
}
```
