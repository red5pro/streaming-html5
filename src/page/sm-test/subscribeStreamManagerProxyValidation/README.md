# Passing Validation parameters when Subscribing stream manager proxy

The streammanager WebRTC proxy is a communication layer built inside streammanager web application which allows it to act as a proxy gateway for webrtc publishers / subscribers. The target use case of this communication layer is to facilitate a secure browser client to be able to connect to a "unsecure" remote websocket endpoint for consuming WebRTC services offered by Red5pro. 

Streammanager autoscaling works with dynamic nodes which are associated with dynamic IP addresses and cannot have a SSL attached to them. The proxy layer helps subscribers to connect and initiate a WebRTC subscribe session from a `secure` (ssl enabled) domain to a `unsecure` Red5pro edge having using an IP address.

**Validation Parameters** may be required for your current project. This is a way to additionally pass in query parameters when utilizing the Stream Manager API in order to run validation on the server-side.

**Please refer to the [Basic Subscriber Documentation](../subscribe/README.md) to learn more about the basic setup.**

> In order to properly run the Stream Manager examples, you will need to configure you server for cluster infrastructure as described in the following documentation: [https://www.red5pro.com/docs/server/autoscale/](https://www.red5pro.com/docs/server/autoscale/).

> You also need to ensure that the stream manager proxy layer is `enabled`. The configuration section can be found in stream manager's config file - `red5-web.properties`

`
## WEBSOCKET PROXY SECTION
proxy.enabled=false
`

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# Setup

> This example uses the `red5pro-extension-stream-manager` library to manage most of the setup and communication with the Stream Manager API. Please see the [red5pro-extension-stream-manager project](https://github.com/infrared5/red5pro-extension-stream-manager) for more information.

The UI provides a form to allow for adding validation parameters. Once you have added the proper validation parameters, click the **Start Subscribing** button and the `red5pro-extension-stream-manager` library and Red5 Pro SDK will work together in accessing the proper Edge to stream to and begin the connection and broadcast, respectively.

## Edge Access

In order to subscribe, you first need to connect to the Stream Manager. The Stream Manager knows which edges are valid (part of a cluster) & available for subscribing.

Utilizing the `red5pro-extension-stream-manager` library, we can deccorate the failover subscriber in order to expose and invoke an `autoscale` method with a configuration for Stream Manager communication:

```js
sm_extension.decorate();

var autoscaleConfig = {
  action: 'subscribe',
  protocol: protocol,
  host: configuration.host,
  port: isSecure ? undefined : serverSettings.httpport.toString(),
  scope: configuration.app,
  streamName: configuration.stream1,
  apiVersion: configuration.streamManagerAPI || '4.0',
  retryLimit: retryLimit,
  retryDelay: retryDelay,
  useProxy: true 
};
```
[index.js #131](index.js#L131)


```js
function getAutoscaledSubscriber (config) {
  var rtcConfig = Object.assign({}, config, {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port,
    streamName: config.stream1,
    subscriptionId: 'subscriber-' + instanceId,
    connectionParams: getValidationParams()
  })
  var rtmpConfig = Object.assign({}, config, {
    protocol: 'rtmp',
    port: serverSettings.rtmpport,
    streamName: name,
    embedHeight: '480px',
    width: config.cameraWidth,
    height: config.cameraHeight,
    buffer: 0.5,
    backgroundColor: '#000000',
    swf: '../../lib/red5pro/red5pro-subscriber.swf',
    swfobjectURL: '../../lib/swfobject/swfobject.js',
    productInstallURL: '../../lib/swfobject/playerProductInstall.swf',
    connectionParams: getValidationParams()
  })
  var hlsConfig = Object.assign({}, config, {
    protocol: 'http',
    port: serverSettings.hlsport,
    streamName: name,
    subscriptionId: 'subscriber-' + instanceId,
    connectionParams: getValidationParams()
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

  var aConfig = Object.assign({}, autoscaleConfig, {
    connectionParams: getValidationParams()
  });

  var subscriber = new red5prosdk.Red5ProSubscriber();
  return subscriber.setPlaybackOrder(subscribeOrder)
    .autoscale(aConfig, {
      rtc: rtcConfig,
      rtmp: rtmpConfig,
      hls: hlsConfig
     });
}
```

[index.js #203](index.js#L203)

With the `red5pro-extension-stream-manager` library loaded, initializing a Red5 Pro Subscriber with autoscale is very similar to how you may have used to initialize a regular Red5 Pro Subscriber.

The `autoscale` method is invoked with the configuration for Stream Manager communication and the failover initialization configuration map.

Of important note is how the validation parameters are set on the autoscale configuration. By defining the `connectionParams` as an Object of key:value pairs, these key:value pairs will be appended as query params to the Stream Manager and Edge requests.

```js
var aConfig = Object.assign({}, autoscaleConfig, {
  connectionParams: getValidationParams()
});
```

The `getValidationParams` function just collects the parameter form fields and generates the key:value map. For example, if you entered in `foo` for the **Parameter Name** and `bar` for the **Parameter Value**, the `connectionParams` property would be:

```json
{
  "foo": "bar"
}
```

And sent along in the Stream Manager request, would look something like the following:

```
https://mycompany.com/streammanager/api/3.0/event/live/stream1?action=broadcast&foo=bar
```

If the communication with the Stream Manager is successful and an Edge address is returned, the `re5pro-extension-stream-manager` library will internal modify the initialization configurations for the failover map and attempt a connection to the Edge.

Once that is successful and we have found the supported Subscriber, a request to `subscribe` is made:

```js
getAutoscaledSubscriber(config)
  .then(function (subscriberImpl) {
    streamTitle.innerText = configuration.stream1;
    targetSubscriber = subscriberImpl;
    // Subscribe to events.
    targetSubscriber.on('*', onSubscriberEvent);
    showServerAddress(targetSubscriber);
    return targetSubscriber.subscribe();
  })
  .then(function (sub) {
    onSubscribeSuccess(sub);
  })
  .catch(function (error) {
    var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
    console.error('[Red5ProSubscriber] :: Error in subscribing - ' + jsonError);
    onSubscribeFail(jsonError);
  });
```

[index.js #284](index.js#L284)

