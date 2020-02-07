# Publishing RTC Streams over stream manager proxy

The streammanager WebRTC proxy is a communication layer built inside streammanager web application which allows it to act as a proxy gateway for webrtc publishers / subscribers. The target use case of this communication layer is to facilitate a secure browser client to be able to connect to a "unsecure" remote websocket endpoint for consuming WebRTC services offered by Red5pro. 

Streammanager autoscaling works with dynamic nodes which are associated with dynamic IP addresses and cannot have a SSL attached to them. The proxy layer helps publishers to connect and initiate a WebRTC publish session from a `secure` (ssl enabled) domain to a `unsecure` Red5pro origin having using an IP address.


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


Next we construct the configuration object for the publisher per supported protocol. Note that the `proxy` usage is applicable for `rtc` only. The origin address is set directly as host for `rtmp` publisher where as it is passed in through `connectionParams` for `rtc`.

Another important to note is that for `rtc` publisher the target application is the proxy - the `streammanager` webapp and not the app that you want to publish to. The rtc configuration passes the actual target application name in `connectionParams` as `app`.


```
function determinePublisher (serverAddress) {
  
    var config = Object.assign({},
                    configuration,
                    defaultConfiguration,
                    getUserMediaConfiguration());
    var rtcConfig = Object.assign({}, config, {
                      protocol: getSocketLocationFromProtocol().protocol,
                      port: getSocketLocationFromProtocol().port,
                      streamName: config.stream1,
                      app: configuration.proxy,
                        connectionParams: {
                        host: serverAddress,
                        app: configuration.app
                      }
                   });
    var rtmpConfig = Object.assign({}, config, {
                      host: serverAddress,
                      protocol: 'rtmp',
                      port: serverSettings.rtmpport,
                      streamName: config.stream1,
                      swf: '../../lib/red5pro/red5pro-publisher.swf',
                      swfobjectURL: '../../lib/swfobject/swfobject.js',
                      productInstallURL: '../../lib/swfobject/playerProductInstall.swf',
                      mediaConstraint: {
                        video: {
                          width: config.cameraWidth,
                          height: config.cameraHeight,
                        }
                      }
                   });
    var publishOrder = config.publisherFailoverOrder
                            .split(',')
                            .map(function (item) {
                              return item.trim()
                        });

    return PublisherBase.determinePublisher({
                rtc: rtcConfig,
                rtmp: rtmpConfig
              }, publishOrder);
  }
  
  ```
  
<sup>
[index.js #122](index.js#L122)
</sup>


