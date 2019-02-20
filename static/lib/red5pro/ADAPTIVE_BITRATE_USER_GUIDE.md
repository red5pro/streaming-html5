# Adaptive Bitrate User Guide for Red5 Pro HTML SDK

This document describes the processes required to publish and subscribe to streams with Adaptive Bitrate (ABR) control. The Red5 Pro ABR solutions allows for:

* Publishing multiple provisioned streams
* Publishing to a Transcoder on the server that generates provisioned streams
* Subscribing to an ABR-enabled stream that will allow dynamic upgrading and downgrading of stream based on network conditions

> Adaptive Bitrate Control requires your Red5 Pro Server v5.0.0 and higher to be deployed with an Autoscaling solution. [Red5 Pro Autoscaling and Stream Manager](https://www.red5pro.com/docs/autoscale/)

* [Requirements](#requirements)
* [Provisioning](#provisioning)
  * [Endpoint](#endpoint)
  * [JSON Schema](#json-schema)
  * [Response](#response)
* [Publishing](#publishing)
  * [Publishing with Encoders](#publishing-with-encoders)
  * [Publishing to Transcoder](#publishing-to-transcoder)
    * [Publishing to Transcoder with WebRTC](#publishing-to-transcoder-with-webrtc)
    * [Publishing to Transcoder with Flash](#publishing-to-transcoder-with-flash)
* [Subscribing](#subscribing)
  * [Subscribing with WebRTC](#subscribing-with-webrtc)
  * [Subscribing with Flash/RTMP](#subscribing-with-flash)
  * [Subscribing with HLS](#subscribing-with-hls)

# Requirements

* [Red5 Pro Server v5.0.0 or higher](https://account.red5pro.com/download)
* [Red5 Pro HTML SDK v5.0.0 or higher](https://account.red5pro.com/download)

Additionally, the use of Red5 Pro Autoscaling solution and Stream Manager API is required for an Adaptive Bitrate streaming experience.

## Autoscale & Stream Manager

Red5 Pro enables developers to deploy servers in clusters to allow for unlimited scaling for their live streaming application. Red5 Pro features an autoscaling solution that can be deployed on a cloud platform such as Google Compute Engine or Amazon's AWS. The Stream Manager is a Red5 Pro Server Application that manages other Red5 Pro instances using live stream information in realtime to scale up or down the overall streaming architecture depending on the current load.

> [Red5 Pro Autoscaling and Stream Manager](https://www.red5pro.com/docs/autoscale/)

# Provisioning

In order to establish an Adaptive Bitrate publishing session, you will first need to provide a **Provision** of variants to the Stream Manager. A **Provision** can be posted to the API at `admin/event/meta/live/<stream name>` and requires an the addition of an `accessToken` for admin purposes.

## Endpoint

The following endpoint accepts a `POST` of JSON explained in the next section. Replace `yourstreammanager.com`, `mystream` and `myaccessToken` accordingly to your Red5 Pro Server remote location, target top-level stream name and `accessToken` defined in your Stream Manager configurations:

```js
https://yourstreammanager.com/streammanager/api/3.0/admin/event/meta/live/mystream?accessToken=myaccessToken
```

## JSON Schema

The JSON schema of the data to `POST` to the endpoint above has the following structure:

```js
{
  "meta": {
    "authentication": {
      "password": "",
      "username": ""
    },
    "qos": <int>,
    "georules": {
      "regions": [<"",...>],
      "restricted": <true|false>,
    },
    "stream": [
      {
        "level": <int>,
        "name": <string>,
        "properties": [
          "videoBR": <int>,
          "videoHeight": <int>,
          "videoWidth": <int>
        ]
      }, ...
    ]
  }
}
```

As an example, using `mystream` as the top-level GUID, the JSON in the `POST` to the above endpoint would look like the following:

```js
{
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
        "level": 3,
        "name": "mystream_3",
        "properties": [
          "videoBR": 128000,
          "videoHeight": 180,
          "videoWidth": 320
        ]
      },
      {
        "level": 2,
        "name": "mystream_2",
        "properties": [
          "videoBR": 512000,
          "videoHeight": 360,
          "videoWidth": 640
        ]
      },
      {
        "level": 1,
        "name": "mystream_1",
        "properties": [
          "videoBR": 1000000,
          "videoHeight": 720,
          "videoWidth": 1280
        ]
      }
    ]
  }
}
```

## Response

A successful response will return the top-level provisioning with the `meta` field populated with the JSON sent in the `POST`:

```js
{
  "name": "mystream",
  "scope": "live",
  "data": {
    "meta": <see above JSON>
  }
}
```

You can, as well, access this new provision at any time by making a `GET` request on the Stream Manager as such:

```js
https://yourstreammanager.com/streammanager/api/3.0/admin/event/meta/live/mystream?accessToken=myaccessToken
```

# Publishing

With a provision provided to the Stream Manager, there are two available scenarios to start publishing the variant streams to be consumed:

* Publishing each variant using your favorite Media Encoder (such as Wirecast of Flash Live Media Encoder).
* Publishing to the Transcoder on your Red5 Pro Server.

The former solution requires you to broadcast a single stream for each of the variants listed in your **Provision**. The latter solution requires you to access the Transcoder endpoint using the Stream Manager API and broadcasting a single variant, from which the server will transcode the other variants. _We recommend broadcasting using the highest possible variant._

## Publishing With Encoders

Once the **Provision** is posted and stored on the Stream Manager, you can broadcast for each variant listed in the **Provision** using your favorite Media Encoder (e.g., Wirecast, Flash Live Media Encoder, etc.).

In following with examples above, you would broadcast three seperate streams with the names:

* `mystream_1`
* `mystream_2`
* `mystream_3`

Using the Media Encoder, you would additionally set the associated stream quality (resolution and bitrate) for each corresponding stream name. To get a server address endpoint, you would first use the Stream Manager API to request a broadcast for each of these streams. That `GET` request would look something like the following:

```ssh
https://yourstreammanager.com/streammanager/api/3.0/event/live/mystream_1?action=broadcast
```

That request will return a JSON object detailing the Origin endpoint at which to broadcast to, and in particular, the `serverAddress` and `scope` properties of the JSON response. You will use the `serverAddress` and `scope` properties to define the endpoint in your Media Encoder stream configuration.

As an example, given this JSON response to the `GET` request describe above:

```json
{
  "serverAddress": 127.0.0.1,
  "scope": "live",
  "name": "mystream_1"
}
```

You would then want to broadcast, using RTMP, to:  `rtmp://127.0.0.1:1935/live/mystream_1`.

## Publishing with Transcoder

If you do not have the capbility to use a Media Encoder, you can publish a single stream to the **Transcoder** on the server which will handle transcoding the stream into the additional variants. This scenario is more likely when broadcasting a WebRTC-enabled stream, though is also possible using the Flash-based publisher provided from the Red5 Pro HTML SDK.

Once the **Provision** is posted and stored on the Stream Manager, you will need to request the transcoder endpoint to broadcast the single stream to.

> We recommend choosing the variant with highest stream quality settings as the stream to broadcast to the transcoder.

The Stream Manager API to request the transcoder endpoint is the same as the API to request an origin endpoint, yet has the additional `&transcode=true` query parameter. In following with the examples from this document, that would look like:

```ssh
https://yourstreammanager.com/streammanager/api/3.0/event/live/mystream?action=broadcast&transcode=true
```

Note that the stream name is the top-level GUID of the stream **Provision** - and not a stream name of one of the variants. You will stream with a variant stream name, but this call to request the transcoder endpoint required the GUID.

The response JSON has the same structure as the response to request an Origin endpoint. You will use the `serverAddress` and `scope` of the response to start a publishing session. How that is assigned to each publisher type of the Red5 Pro HTML SDK differs in each solution (WebRTC and Flash/RTMP). This is detailed in the following subsections.

### Publishing to Transcoder with WebRTC

WebRTC clients require using the Stream Manager proxy in order to publish. This essentially means that you will request to start publishing on the `streammanager` proxy webapp which is then transferred to the Origin and then propegated on the Edge(s). The reason is that browser vendors require WebRTC broadcasts to be served over SSL. In an autoscale environment in which Origins and Edges are spun up and down dynamically based on load, it can be unfeasible to also have certs on each of those Origins and Edges. As such, you can broadcast through the Stream Manager proxy which will be served over SSL.

Given that the response to the `GET` request at:

```ssh
https://yourstreammanager.com/streammanager/api/3.0/event/live/mystream?action=broadcast&transcode=true
```

is the following:

```json
{
  "serverAddress": "10.0.0.0",
  "scope": "live",
  "name": "mystream_1"
}
```

Your initialization configuration for an `RTCPublisher` will look like the following (in following with the above examples):

```js
(function (red5prosdk) {

  var publisher = new red5prosdk.RTCPublisher()
  publisher.init({
    host: 'yourstreammanager.com',
    app: 'streammanager',
    streamName: 'mystream_1',
    protocol: 'wss',
    port: 443,
    mediaConstraints: {
      audio: true,
      video: {
        width: 1280,
        height: 780
      }
    },
    bandwidth: {
      video: 1000
    },
    connectionParams: {
      host: '10.0.0.0',
      app: 'live'
    }
  })
  .then(function () {
    publisher.publish()
  })
  .catch(function (e) {
    console.error(e)
  })

})(window.red5prosdk)
```

> The above is a _very_ basic configuration. Your webapp may need additional configurations depending on requirements and deployment.

When utilizing the Stream Manager proxy for WebRTC broadcasts, you assign the top-level configuration `app` property as `streammanager`, and provide a `connectionParams` object that details the endpoint to proxy to.

Additionally, note the `mediaContraints` object on the initialization configuration and that it defines the video contraint with the corresponding variant qualities for `mystream_1` from the above examples. This will be used in access the `getUserMedia` of the browser client.

### Publishing to Transcoder with Flash

Publishing using Flash/RTMP over the Stream Manager does not require a proxy as WebRTC-based publishers do. The reason being that it is not a requirement to publish over SSL from the Flash Player plugin. As such, the configuration for a Flash-base publisher over the Stream Manager is similar to that of a publisher not over Stream Manager - the only difference is to point to the Origin endpoint.

Given that the respone to the `GET` request at:

```ssh
https://yourstreammanager.com/streammanager/api/3.0/event/live/mystream?action=broadcast&transcode=true
```

is the following:

```json
{
  "serverAddress": "10.0.0.0",
  "scope": "live",
  "name": "mystream_1"
}
```

Your initialization configuration for an `RTMPPublisher` will look like the following (in following with the above examples):

```js
(function (red5prosdk) {

  var publisher = new red5prosdk.RTMPPublisher()
  publisher.init({
    host: '10.0.0.0',
    app: 'live',
    streamName: 'mystream_1',
    protocol: 'rtmp',
    port: 1935,
    mediaConstraints: {
      audio: true,
      video: {
        width: 1280,
        height: 780
        bandwidth: 1000
      }
    }
  })
  .then(function () {
    publisher.publish()
  })
  .catch(function (e) {
    console.error(e)
  })

})(window.red5prosdk)
```

> The above is a _very_ basic configuration. Your webapp may need additional configurations depending on requirements and deployment.

# Subscribing

With a **Provision** available from the Stream Manager and multiple variant broadcasts being streamed (either through using a Media Encoder or the Transcoder), subscribing to an Adaptive Bitrate controlled stream is rather straight forward, though differs slightly between each playback target of WebRTC, Flash and HLS.

Once the subscriber stream has started playback the stream will be dynamically upgraded or downgraded based on network conditions. How each playback target requests and handles the dynamic stream switching differs between them and is detailed in the following sections.

## Subscribing with WebRTC

When subscribing to a Provisioned stream on the Stream Manager using the WebRTC Subscriber from the Red5 Pro HTML SDK, you will first request the Edge endpoint to access the stream and then use one of the variant stream names to start subscribing.

> It is dependent on your project requirements, but if running an ABR with different broadcast quality settings, we recommend first subscribing to a variant that is in mid-range. The Edge server will handle 

WebRTC clients require using the Stream Manager proxy in order to publish. This essentially means that you will request to start publishing on the `streammanager` proxy webapp which is then transferred to the Origin and then propegated on the Edge(s). The reason is that browser vendors require WebRTC broadcasts to be served over SSL. In an autoscale environment in which Origins and Edges are spun up and down dynamically based on load, it can be unfeasible to also have certs on each of those Origins and Edges. As such, you can subscribe through the Stream Manager proxy which will be served over SSL.

You will request the Edge from the Stream Manager using one of the variant stream names. The JSON response is then used to start a WebRTC subscriber.

Given that the response to the `GET` request at:

```ssh
https://yourstreammanager.com/streammanager/api/3.0/event/live/mystream_2?action=subscribe
```

is the following:

```json
{
  "serverAddress": "10.0.0.0",
  "scope": "live",
  "name": "mystream_2"
}
```

Your initialization configuration for an `RTCSubscriber` will look like the following (in following with the above examples):

```js
(function (red5prosdk) {

  var subscriber = new red5prosdk.RTCSubscriber()
  subscriber.init({
    host: 'yourstreammanager.com',
    app: 'streammanager',
    streamName: 'mystream_2',
    protocol: 'wss',
    port: 443,
    connectionParams: {
      host: '10.0.0.0',
      app: 'live'
    },
    subscriptionId: 'subscriber-' + Math.floor(Math.random() * 0x10000).toString(16)
  })
  .then(function () {
    subscriber.subscribe()
  })
  .catch(function (e) {
    console.error(e)
  })

})(window.red5prosdk)
```

> The above is a _very_ basic configuration. Your webapp may need additional configurations depending on requirements and deployment.

When utilizing the Stream Manager proxy for WebRTC subscriptions, you assign the top-level configuration `app` property as `streammanager`, and provide a `connectionParams` object that details the endpoint to proxy to.

In this example, the `mystream_2` stream is requested. In doing so, the subscriber is started with a mid-level variant. As conditions improve or worsen the stream variant will be dynamically switched to higher or lower quality, respectively.

## Subscribing with Flash

Unlike streams consumed over WebRTC and HLS, streams consumed over RTMP cannot be dynamically switched by the Red5 Pro Server. As such, the ABR control switching logic is within the Flash-based Subscriber of the Red5 Pro HTML SDK.

The logic to downgrade variants is based on the `InsufficientBandwidth` event sent from the server when the client is recognized as not having enough bandwidth to consume the current requested stream over the current network conditions. The logic to upgrade variants is a time-based polling solution in the lapse of having receieved `InsufficientBandwidth` notifications.

This logic is driven by providing the **Provision** configuration and a optional stream switch setting configuration.

When using Flash as the subscriber for an Adaptive Bitrate solution, you will first need to request the associated **Provision** from the Stream Manager and provide it to the subscriber.

In following with the examples in this document, you request the **Provision** from the Stream Manager using the top-level GUID of the stream name:

```ssh
https://yourcompany.com/streammanager/api/3.0/admin/event/meta/live/mystream?accessToken=myaccessToken
```

The response of such a `GET` request will be similar to the following:

```js
{
  "name": "mystream",
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
          "level": 3,
          "name": "mystream_3",
          "properties": [
            "videoBR": 128000,
            "videoHeight": 180,
            "videoWidth": 320
          ]
        },
        {
          "level": 2,
          "name": "mystream_2",
          "properties": [
            "videoBR": 512000,
            "videoHeight": 360,
            "videoWidth": 640
          ]
        },
        {
          "level": 3,
          "name": "mystream_1",
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

You then provide the `data` object from the response to the Flash-based `RTMPSubscriber`.

In addition to the **Provision**, you will also need to request the Edge endpoint information from the Stream Manager targetting the specific variant you wish to start subscribing to.

Given that the response to the `GET` request at:

```ssh
https://yourstreammanager.com/streammanager/api/3.0/event/live/mystream_2?action=subscribe
```

is the following:

```json
{
  "serverAddress": "10.0.0.0",
  "scope": "live",
  "name": "mystream_2"
}
```

Supposing we have successfully made the request for the **Provision** and have declared the response as a variable named `provision`, and we have the Edge endpoint information, you would then initialize a new `RTMPSubscriber` and provide the **Provision** upon embed:

```js
(function (red5prosdk) {

  var subscriber = new red5prosdk.RTMPSubscriber();

  // On embed success, provide the provisioning and target level.
  subscriber.on('FlashPlayer.Embed.Success', function () {
    subscriber.setABRVariants(provision.data, 2);
  });

  subscriber.init({
    host: '10.0.0.0',
    app: 'live',
    streamName: 'mystream_2',
    protocol: 'rtmp',
    port: 1935,
    useAdaptiveBitrateController: true
  })
  .then(function () {
    subscriber.subscribe()
  })
  .catch(function (e) {
    console.error(e)
  })

})(window.red5prosdk)
```

> The above is a _very_ basic configuration. Your webapp may need additional configurations depending on requirements and deployment.

Take note of the `useAdaptiveBitrateController` property above. It notifies the Flash client that it will require logic for ADaptive Bitrate control.

In addition to the `setABRVariants` method on `RTMPSubscriber` starting in **v5.0.0** of the Red5 Pro HTML SDK, there are several other ABR-related methods that give you more control of starting, stopping and switching levels explicitly. These methods are described in more detail in the following sections.

## ABR-Related API Update for Flash-based Subscriber

The follow API has been provided to the Flash-based Subscriber to allow for Adaptive Bitrate (ABR) logic:

* [setABRVariants](#setabrvariants)
* [setABRLevel](#setabrlevel)
* [setABRVariantUpgradeSettings](#setabrvariantupgradesettings)

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
https://yourstreammanager.com/streammanager/api/3.0/event/live/mystream_2?action=subscribe
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
