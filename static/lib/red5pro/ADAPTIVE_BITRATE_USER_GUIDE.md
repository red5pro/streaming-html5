# Adaptive Bitrate User Guide for Red5 Pro HTML SDK

This document describes the processes required to publish and subscribe to streams with * [setABRVariantUpgradeSettings](#setabrvariantupgradesettings)

### setABRVariants

Request to use the provide ABR Variants when performing Adaptive Bitrate Control.

> Requires the `useAdaptiveBitrateController` intitialization configuration property to be `true`.

#### arguments

* **abrVariants**:Object - Provisioning Variants object. _described above_.
* **level**:int - The target level to begin playback.

### setABRLevel

Request to set ABR level explicitly. The SDK attempts to properly choose the correct level based on bandwidth, but this API allows for the level to be set explicitly.

#### arguments

* **level**:Object - The level to set the ABR based on the variants provided in `setABRVariants`.
* **firm**:Boolean - Flag to set level firmly, disabling the automatic switching of the Adaptive Bitrate Controller.

### setABRVariantUpgradeSettings

Provides the upgrade settings to use by the Adaptive Bitrate Control in upgrading previously downgraded streams.

#### arguments

* **abrVariantUpgrades**:Object - A configuration object that defines the associated retry limits based on levels of the Provision Variants.

#### example

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

### startABRController

Request to start the Adaptive Bitrate Controller to automatically downgrade and upgrade streams based on NetStatus and bandwidth.

> The ABR is started automatically when providing the `useAdaptiveBitrateController` configuration property.

### stopABRController

Request to stop the Adaptive Bitrate Controller from automatically downgrading and upgrading streams based on NetStatus and bandwidth.

## Subscribing with HLS

The HLS subscriber and ABR control is capable through subscribing to the `m3u8` stream with the top-level GUID stream name. Within the `m3u8` manifest, the variants are defined and the HLS playback element has the capability to switch to variants based on network conditions.

As with the WebRTC and Flash subscribers for ABR, you will start off requesting an Edge endpoint from the Stream Manager using one of the variant stream names.

Given that the response to the `GET` request at:

```ssh
https://yourstreammanager.com/streammanager/api/3.1/event/live/mystream_2?action=subscribe
```

is the following:

```json
{
  "serverAddress": "10.0.0.0",
  "scope": "live",
  "name": "mystream_2"
}
```

Your initialization configuration for an `HLSSubscriber` will look like the following (in following with the above examples):

```js
(function (red5prosdk) {

  var subscriber = new red5prosdk.HLSSubscriber()
  subscriber.init({
    host: '10.0.0.0',
    app: 'live',
    streamName: 'mystream',
    protocol: 'html',
    port: 5080
  })
  .then(function () {
    subscriber.subscribe()
  })
  .catch(function (e) {
    console.error(e)
  })

})(window.red5prosdk)
```

Internally, the Red5 Pro SDK will then request to subscribe to the HLS stream at:

```ssh
http://10.0.0.0:5080/live/mystream.m3u8
```
