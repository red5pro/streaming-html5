# Subscribing RTC Streams over stream manager proxy

The streammanager WebRTC proxy is a communication layer built inside streammanager web application which allows it to act as a proxy gateway for webrtc publishers / subscribers. The target use case of this communication layer is to facilitate a secure browser client to be able to connect to a "unsecure" remote websocket endpoint for consuming WebRTC services offered by Red5pro. 

Streammanager autoscaling works with dynamic nodes which are associated with dynamic IP addresses and cannot have a SSL attached to them. The proxy layer helps subscribers to connect and initiate a WebRTC `subscribe` session from a `secure` (ssl enabled) domain to a `unsecure` Red5pro origin having using an IP address.


**Please refer to the [Basic Subscriber Documentation](../subscribe/README.md) to learn more about the basic setup.**

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
In order to subscribe, you first need to connect to the Stream Manager. The Stream Manager will know which origin is being used for the stream and accordingly will provide with an usable edge to consume the stream.

```js

function requestEdge (configuration) {
var host = configuration.host;
var app = configuration.app;
var port = serverSettings.httpport.toString();
var portURI = (port.length > 0 ? ':' + port : '');
var baseUrl = isSecure ? protocol + '://' + host : protocol + '://' + host + portURI;
var streamName = configuration.stream1;
var apiVersion = configuration.streamManagerAPI || '4.0';
var url = baseUrl + '/streammanager/api/' + apiVersion + '/event/' + app + '/' + streamName + '?action=subscribe';
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
		console.error('[SubscribeStreamManagerTest] :: Error - Could not request Edge IP from Stream Manager. ' + jsonError)
		reject(error)
	  });
});
}

```

<sup>
[index.js #100](index.js#L100)
</sup>

The service returns a JSON object. In particular to note is the `serverAddress` attribute which will be the IP of the Edge server.


```
  "name": "<stream-name>",
  "scope": "<stream-scope>",
  "serverAddress": "<edge-host-address>",
  "region": "<region-code>"
}
```

Next we construct the configuration objects for the subscriber per supported protocol. Note that the proxy usage is applicable for `rtc` only. The edge address is set directly as host for `rtmp` or `hls` subscriber configuration, whereas it is passed in through connectionParams for `rtc`.

Another important to note is that for `rtc` subscriber the target application is the `proxy` - the `streammanager` webapp and not the app that you want to subscribe to. The `rtc` configuration passes the actual target application name in connectionParams as `app`.

```
function determineSubscriber (serverAddress) {
	
    var config = Object.assign({}, configuration, defaultConfiguration);
    var rtcConfig = Object.assign({}, config, {
      host: configuration.host,
      protocol: getSocketLocationFromProtocol().protocol,
      port: getSocketLocationFromProtocol().port,
	  app: configuration.proxy,
	  connectionParams: {
		host: serverAddress,
		app: configuration.app
      },
      subscriptionId: 'subscriber-' + instanceId,
      streamName: config.stream1
    })
    var rtmpConfig = Object.assign({}, config, {
      host: serverAddress,
      protocol: 'rtmp',
      port: serverSettings.rtmpport,
      streamName: config.stream1,
      mimeType: 'rtmp/flv',
      useVideoJS: false,
      width: config.cameraWidth,
      height: config.cameraHeight,
      swf: '../../lib/red5pro/red5pro-subscriber.swf',
      swfobjectURL: '../../lib/swfobject/swfobject.js',
      productInstallURL: '../../lib/swfobject/playerProductInstall.swf'
    })
    var hlsConfig = Object.assign({}, config, {
      host: serverAddress,
      protocol: protocol,
      port: isSecure ? serverSettings.hlssport : serverSettings.hlsport,
      streamName: config.stream1,
      mimeType: 'application/x-mpegURL'
    })

    if (!config.useVideo) {
      rtcConfig.videoEncoding = 'NONE';
    }
    if (!config.useAudio) {
      rtcConfig.audioEncoding = 'NONE';
    }

    var subscribeOrder = config.subscriberFailoverOrder
                          .split(',').map(function (item) {
                            return item.trim();
                          });

    return SubscriberBase.determineSubscriber({
              rtc: rtcConfig,
              rtmp: rtmpConfig,
              hls: hlsConfig
            }, subscribeOrder);
  }
```

<sup>
[index.js #133](index.js#L133)
</sup>

