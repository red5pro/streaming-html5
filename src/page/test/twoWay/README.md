# Two Way Video Chat

This example demonstrates two way communication using Red5 Pro. It also demonstrates using servlet requests on the server.

> The Two-Way example requires access to a service that returns a stream listing. You may run into Cross-Origin Resource Sharing (**CORS**) issues if trying to use this example without the proper **CORS** settings provided by the server.

It is recommended to view this example as part of the `webrtcexamples` webapp shipped with the [Red5 Pro Server](https://account.red5pro.com/download).

More information on CORS can be found at: [https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).

## Basic Publisher

**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup of a publisher.**

## Basic Subscriber

**Please refer to the [Basic Subscriber Documentation](../subscribe/README.md) to learn more about the basic setup of a subscriber.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

> These examples use the WebRTC-based Subscriber implementation from the Red5 Pro HTML SDK. However, there is failover support to allow for Flash-based subscriber on unsupported browsers.

# Setup

Two way communication simply requires setting up a publish stream and a subscribe stream at the same time. You can test the example with two browser pages. On the second browser page, use the _Settings_ page to swap the names of the stream.

The subscriber portion will automatically connect when the second person begins streaming.

# Getting Live Streams

To access the list of current streams on the server, use the `streams` servlet.

```js
function beginStreamListCall() {
  var host = configuration.host
  var port = serverSettings.httpport
  var portURI = port.length > 0 ? ':' + port : ''
  var baseUrl = isSecure
    ? protocol + '://' + host
    : protocol + '://' + host + portURI
  var url = baseUrl + '/' + configuration.app + '/streams.jsp'
  fetch(url)
    .then(function (res) {
      if (
        res.headers.get('content-type') &&
        res.headers
          .get('content-type')
          .toLowerCase()
          .indexOf('application/json') >= 0
      ) {
        return res.json()
      } else {
        return res.text()
      }
    })
    .then(function (jsonOrString) {
      var json = jsonOrString
      if (typeof jsonOrString === 'string') {
        try {
          json = JSON.parse(json)
        } catch (e) {
          throw new TypeError('Could not properly parse response: ' + e.message)
        }
      }
      recieveList(json)
    })
    .catch(function (error) {
      var jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      console.error(
        '[Two-Way] :: Error - Could not request Stream List. ' + jsonError
      )
      listError(error)
    })
}
```

The service response will be a list of live streams. Parsing the JSON will return an array of objects with the `name` attribute denoting the stream name. If one matching the `stream2` configuration setting is found, it is auto-subscribed to; otherwise, the service call is made again after a certain period of time.

```js
function recieveList(listIn) {
  var found = false
  for (var i = listIn.length - 1; i >= 0; i--) {
    found = listIn[i].name == configuration.stream2
    if (found) break
  }

  if (found) {
    subscribe()
  } else {
    setWaitTime()
  }
}
```
