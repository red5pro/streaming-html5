# Subscribing to ABR Streams over Stream Manager with RTMP

When a broadcast has the capability for Adaptive Bitrate (ABR) control, the consumed stream can dynamically switch variants based on the network conditions of the subscriber.

Subscription to an ABR-enabled stream differs for Flash/RTMP from that of WebRTC and HLS in that the streams served over RTMP are not provided from the server in an ABR scenario. As such, the Provisioning variant configuration needs to be provided to the Flash subscriber client in order to perform the ABR logic client-side.

> How the Provision variant configuration is set on the Flash client is described more further in this article.

---

Streammanager autoscaling works with dynamic nodes which are associated with dynamic IP addresses and cannot have a SSL attached to them. The proxy layer helps subscribers to connect and initiate a WebRTC `subscribe` session from a `secure` (ssl enabled) domain to a `unsecure` Red5pro origin having using an IP address.


**Please refer to the [Basic Subscriber Documentation](../subscribe/README.md) to learn more about the basic setup.**

> In order to properly run the Stream Manager examples, you will need to configure you server for cluster infrastructure as described in the following documentation: [https://www.red5pro.com/docs/server/autoscale/](https://www.red5pro.com/docs/server/autoscale/).

> You also need to ensure that the stream manager proxy layer is `enabled`. The configuration section can be found in stream manager's config file - `red5-web.properties`

```sh
## WEBSOCKET PROXY SECTION
proxy.enabled=false
```

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# Setup

In order to subscribe to a stream and allow for ABR with a Flash-based subscriber, you will first need to request the Provision to get a list of variants that are available to subscribe to.

### Endpoint

If you were to request the Provision for a stream named `mystream` on your Stream Manager instance deployed to `https://yourcompany.com` with the access token defined as `myaccessToken`, the `GET` request for the Provision would have the following structure:

```js
https://yourcompany.com/streammanager/api/3.0/admin/event/meta/live/mystream?accessToken=myaccessToken
```

### Response

If the broadcast for `mystream` was provisioned for `High`, `Mid` and `Low` variants (as they are in the example at [../publishStreamManagerProvisionForm](Publisher Stream Manager Provision)), the JSON response from the above request will look similar to the following:

```js
{
  "name": "stream1todd17",
  "scope":"live",
  "data": {
    "meta": {
      "authentication": {
        "password": "",
        "username": ""
      },
      "qos": 3,
      "georules": {
        "regions": ["US", "UK"],
        "restricted": false,
      },
      "stream": [
        {
          "level": 1,
          "name": "mystream_low",
          "properties": [
            "videoBR": 128000,
            "videoHeight": 180,
            "videoWidth": 320
          ]
        },
        {
          "level": 2,
          "name": "mystream_mid",
          "properties": [
            "videoBR": 512000,
            "videoHeight": 360,
            "videoWidth": 640
          ]
        },
        {
          "level": 3,
          "name": "mystream_high",
          "properties": [
            "videoBR": 1000000,
            "videoHeight": 720,
            "videoWidth": 1280
          ]
        }
      ]
    }
  }
}
```

The `data.meta.stream` listing provides the available variants to subscribe to.

## Subscribing

With the Provision data available, the next requirement is to request an Edge server to subscribe to from the Stream Manager. Any of the `name`s listed in the Provision variants can be used to make the request. Once the Edge server address is provided form the Stream Manager, you will then request to subscribe to a to one of the variant stream names listed - just as you would in a regular Flash-base subscriber scenario.

Requesting an Edge server to broadcast is the same as you are familiar with when using the Stream Manager API. The only difference is that you provide the name of one of the variants:

```js
https://yourcompany.com/streammanager/api/3.0/event/live/mystream_high?action=subscribe
```

Use the information from the JSON response to configure the initial connection configuration of the Flahs-based subscriber:

```js
function determineSubscriber (jsonResponse) {
  var host = jsonResponse.serverAddress;
  var name = jsonResponse.name;
  var app = jsonResponse.scope;
  var config = Object.assign({}, configuration, defaultConfiguration);
  var rtmpConfig = Object.assign({}, config, {
    host: host,
    app: app,
    port: serverSettings.rtmpport,
    streamName: name,
    buffer: 0.2,
    width: config.cameraWidth,
    height: config.cameraHeight,
    useAdaptiveBitrateController: true,
    backgroundColor: '#000000',
    swf: '../../lib/red5pro/red5pro-subscriber.swf',
    swfobjectURL: '../../lib/swfobject/swfobject.js',
    productInstallURL: '../../lib/swfobject/playerProductInstall.swf'
  })
  var subscriber = new red5prosdk.RTMPSubscriber();
  return subscriber.init(rtmpConfig);
}
```

[index.js #193](index.js#L193)

> Note the additional configuration property: `useAdaptiveBitrateController`

Once the client is embedded successfully on the page, the ABR Provision and the current target level is provided to the Flash subscriber client using the `setABRVariants` call:

```js
function onSubscriberEvent (event) {
  console.log('[Red5ProSubsriber] ' + event.type + '.');
  updateStatusFromEvent(event);
  if (event.type === 'FlashPlayer.Embed.Success') {
    targetSubscriber.setABRVariants(abrSettings, abrLevel);
  }
  else if (event.type === 'RTMP.AdaptiveBitrate.Level') {
    abrLevel = event.data.level;
    streamInfoField.innerText = "Stream Level: " + event.data.stream.name;
  }
}
```

[index.js #109](index.js#L109)

The `setABRVariants` call provides the Provisioning info from the `data` property of the JSON response from the Stream Manager (described above) and the current target level to begin subscribing to.

Internally, the Flash subscriber client will then use the Provisioning Variant settings to handle ABR switching logic. The logic of switching up or down in levels is based on the `InsufficentBandwidth` events sent from the server.

The `InsufficientBandwidth` event is sent from the server and notified on any subscribing client that does not have sufficient bandwidth to consume a stream at the current network condition for the playback quality. When such an event is delivered to the Flash subscriber client, the stream is downgraded by `1` level at a time. Upon downgrading an "upgrade timer" is started internally, at which point the Flash-client will attempt to upgrade the stream by `1` level at a time.

# ABR-Related API Update for Flash-based Subscriber

The follow API has been provided to the Flash-based Subscriber to allow for Adaptive Bitrate (ABR) logic:

* [setABRVariants](#setabrvariants)
* [setABRLevel](#setabrlevel)
* [setABRVariantUpgradeSettings](#setabrvariantupgradesettings)

## setABRVariants

Request to use the provide ABR Variants when performing Adaptive Bitrate Control.

> Requires the `useAdaptiveBitrateController` intitialization configuration property to be `true`.

### arguments

* **abrVariants**:Object - Provisioning Variants object. _described above_.
* **level**:int - The target level to begin playback.

## setABRLevel

Request to set ABR level explicitly. The SDK attempts to properly choose the correct level based on bandwidth, but this API allows for the level to be set explicitly.

### arguments

* **level**:Object - The level to set the ABR based on the variants provided in `setABRVariants`.
* **firm**:Boolean - Flag to set level firmly, disabling the automatic switching of the Adaptive Bitrate Controller.

## setABRVariantUpgradeSettings

Provides the upgrade settings to use by the Adaptive Bitrate Control in upgrading previously downgraded streams.

### arguments

* **abrVariantUpgrades**:Object - A configuration object that defines the associated retry limits based on levels of the Provision Variants.

### example

```js
{
  minimumDowngradePlaybackSpan: 2000,
  upgrade: [
    {
      level: 1,
      retryTimeout: 0
    },
    {
      level: 2,
      retryTimeout: 2000
    },
    {
      level: 3,
      retryTimeout: 4000
    }
  ]
}
```

## startABRController

Request to start the Adaptive Bitrate Controller to automatically downgrade and upgrade streams based on NetStatus and bandwidth.

> The ABR is started automatically when providing the `useAdaptiveBitrateController` configuration property.

## stopABRController

Request to stop the Adaptive Bitrate Controller from automatically downgrading and upgrading streams based on NetStatus and bandwidth.
