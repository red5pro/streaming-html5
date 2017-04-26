# Publishing RTC Streams over stream manager proxy

he streammanager WebRTC proxy is a communication layer build in streammanager webapplication which allows it to act as a proxy for webrtc connections. The target use case of this communication layer is to facilitate a secure browser client to be able to connect to a "unsecure" remote websocket endpoint for consuming WebRTC services offered by Red5pro. 

Streammanager autoscaling works with dynamic nodes which are associated with dynamic IP addresses and cannot have a SSL attached to them. The proxy layer helps users from a secure ssl enabled domain connect to 'unsecure' Red5pro nodes having an IP address.


**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup.**

> In order to properly run the Stream Manager examples, you will need to configure you server for cluster infrastructure as described in the following documentation: [https://www.red5pro.com/docs/server/autoscale/](https://www.red5pro.com/docs/server/autoscale/).

> You also need to ensure that the stream manager proxy layer is `enabled`. The configuration section can be found in stream manager's config file - `red5-web.properties`

`
## WEBSOCKET PROXY SECTION
proxy.enabled=false
`

### Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

## Setup
In order to publish, you first need to connect to the Stream Manager. The Stream Manager knows which origins are valid (part of a cluster) & available for publishing.

```js

function requestOrigin (configuration) {
var host = configuration.host;
var app = configuration.app;
var proxy = configuration.proxy;
var streamName = configuration.stream1;
var port = serverSettings.httpport.toString();
var portURI = (port.length > 0 ? ':' + port : '');
var baseUrl = isSecure ? protocol + '://' + host : protocol + '://' + host + portURI;
var apiVersion = configuration.streamManagerAPI || '2.0';
var url = baseUrl + '/streammanager/api/' + apiVersion + '/event/' + app + '/' + streamName + '?action=broadcast';
  return new Promise(function (resolve, reject) {
	fetch(url)
	  .then(function (res) {
		if (res.headers.get("content-type") &&
		  res.headers.get("content-type").toLowerCase().indexOf("application/json") >= 0) {
			return res.json();
		}
		else {
		  throw new TypeError('Could not properly parse response.');
		}
	  })
	  .then(function (json) {
		resolve(json.serverAddress);
	  })
	  .catch(function (error) {
		var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
		console.error('[PublisherStreamManagerTest] :: Error - Could not request Origin IP from Stream Manager. ' + jsonError)
		reject(error)
	  });
});
}

```

<sup>
[index.js #181](index.js#L181)
</sup>

The service returns a JSON object. In particular to note is the `serverAddress` attribute which will be the IP of the Origin server.


```
  "name": "<stream-name>",
  "scope": "<stream-scope>",
  "serverAddress": "<origin-host-address>",
  "region": "<region-code>"
}
```

Next we connect to the `streammanager` proxy service layer with a request to publish RTC session to the target origin server. The connection request specifies the target origin server to proxy to and the application name to which stream will be published.

We swap the target application name to `streammanager` (proxy app). Then we add the origin address and scope name to connection parameters before sending a publish request to streammanager proxy layer.

```
/* Assigning app to 'streammanager' and setting target , app in connectionParams */
	  var targetApp = configuration.app;
	  configuration.app = configuration.proxy;
	  defaultConfiguration.app = configuration.proxy;
	  configuration.connectionParams = {
		  host: serverAddress,
		  app: targetApp
```

<sup>
[index.js #185](index.js#L185)
</sup>

