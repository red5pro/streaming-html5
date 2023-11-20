# Two Way Stream Manager Proxy Video Chat

This example demonstrates two way communication using Red5 Pro. It also demonstrates using servlet requests on the server.

> The Two-Way example requires access to a service that returns a stream listing. You may run into Cross-Origin Resource Sharing (**CORS**) issues if trying to use this example without the proper **CORS** settings provided by the server.

It is recommended to view this example as part of the `webrtcexamples` webapp shipped with the [Red5 Pro Server](https://account.red5.net/download).

More information on CORS can be found at: [https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).

## Publisher Stream Manager Proxy

**Please refer to the [Publisher Stream Manager Proxy Documentation](../publishStreamManagerProxy/README.md) to learn more about the setup of a publisher through a stream manager.**

## Subscriber Stream Manager Proxy

**Please refer to the [Subscriber Stream Manager Proxy Documentation](../subscribeStreamManagerProxy/README.md) to learn more about the setup of a subscriber through a stream manager.**

## Basic Two Way

**Please refer to the [Basic Two Way Documentation](../../test/twoWay/README.md) to learn more about the basic setup of a publisher.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

> These examples use the WebRTC-based Subscriber implementation from the Red5 Pro HTML SDK. However, there is failover support to allow for Flash-based subscriber on unsupported browsers.

# Setup

Two way communication simply requires setting up a publish stream and a subscribe stream at the same time. You can test the example with two browser pages. On the second browser page, use the _Settings_ page to swap the names of the stream.

The subscriber portion will automatically connect when the second person begins streaming.

# Getting Live Streams

To get all the streams that a stream manager is handling on a cluster, use the `list` function of the stream manager api.

```js
var baseUrl = isSecure
  ? protocol + '://' + host
  : protocol + '://' + host + portURI
var url = baseUrl + '/streammanager/api/2.0/event/list'
fetch(url).then(function (res) {
  if (
    res.headers.get('content-type') &&
    res.headers.get('content-type').toLowerCase().indexOf('application/json') >=
      0
  ) {
    return res.json()
  } else {
    return res.text()
  }
})
```

After that, it's handled the same way that the returned data from the `streams` servlet would have been. For more information on this and other parts of the Stream Manager API, see our dcumentation [here](https://www.red5.net/docs/installation/streammanagerapi-v2.html)
