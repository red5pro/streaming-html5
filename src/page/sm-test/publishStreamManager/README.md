# Stream Manager Publishing using Failover

With clustering, we need to determine which Red5 Pro instance the client will use. The other examples used a static configuration IP for streaming endpoints. Basic clustering uses more than one stream endpoint for subscribers. Advanced clustering uses more than one endpoint for publishers also.

With the Stream Manager, our configuration IP will be used similarly for publishers and subscribers. Both publishers and subscribers will call a web service to receive the IP that should be used.

**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup.**

> In order to properly run the Stream Manager examples, you will need to configure you server for cluster infrastructure as described in the following documentation: [https://www.red5.net/docs/troubleshooting/auto-best-practices-and-troubleshooting/best-practices-overview/#gatsby-focus-wrapper](https://www.red5.net/docs/troubleshooting/auto-best-practices-and-troubleshooting/best-practices-overview/#gatsby-focus-wrapper).

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# Setup

In order to publish, you first need to connect to the origin server's Stream Manager. The Stream Manager will know which edges are active and provide the one that needs to be published to:

```js
function requestOrigin(configuration) {
  var host = configuration.host
  var app = configuration.app
  var streamName = configuration.stream1
  var port = serverSettings.httpport
  var portURI = port.length > 0 ? ':' + port : ''
  var baseUrl = isSecure
    ? protocol + '://' + host
    : protocol + '://' + host + portURI
  var apiVersion = configuration.streamManagerAPI || '4.0'
  var url =
    baseUrl +
    '/streammanager/api/' +
    apiVersion +
    '/event/' +
    app +
    '/' +
    streamName +
    '?action=broadcast'
  return new Promise(function (resolve, reject) {
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
          throw new TypeError('Could not properly parse response.')
        }
      })
      .then(function (json) {
        resolve(json.serverAddress)
      })
      .catch(function (error) {
        var jsonError =
          typeof error === 'string' ? error : JSON.stringify(error, null, 2)
        console.error(
          '[PublisherStreamManagerTest] :: Error - Could not request Origin IP from Stream Manager. ' +
            jsonError
        )
        reject(error)
      })
  })
}
```

[index.js #78](index.js#L78)

The service returns a JSON object. In particular to note is the `serverAddress` attribute which will be the IP of the Origin server to start publishing the stream to.
