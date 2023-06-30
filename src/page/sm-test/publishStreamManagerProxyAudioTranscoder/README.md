# Provisioning and Transcoding for Adaptive Bitrate Broadcast over Stream Manager

To enable Adaptive Bitrate (ABR) control of a stream being played back by a consumer, you need to `POST` a provision to the Stream Manager detailing the variants at which you will be broadcasting.

For scenarios in which the broadcaster does not have the capability of publishing the variants of the provision, the broadcaster can request that the server does the Transcoding to the variants.

To do so, the broadcast most locate the server address of the Transcoder using the `transcode=true` query param, from which one of the variants will be broadcast to. The tTranscoder will that generate the additional variants for consumption.

---

The streammanager WebRTC proxy is a communication layer built inside streammanager web application which allows it to act as a proxy gateway for webrtc publishers / subscribers. The target use case of this communication layer is to facilitate a secure browser client to be able to connect to a "unsecure" remote websocket endpoint for consuming WebRTC services offered by Red5pro.

Streammanager autoscaling works with dynamic nodes which are associated with dynamic IP addresses and cannot have a SSL attached to them. The proxy layer helps publishers to connect and initiate a WebRTC publish session from a `secure` (ssl enabled) domain to a `unsecure` Red5pro origin having using an IP address.

**Please refer to the [Basic Publisher Documentation](../publishStreamManagerProxy/README.md) to learn more about the basic setup.**

> In order to properly run the Stream Manager examples, you will need to configure you server for cluster infrastructure as described in the following documentation: [https://www.red5pro.com/docs/server/autoscale/](https://www.red5pro.com/docs/server/autoscale/).

## Server Configuration

> Please read about [WHIP/WHEP Configuration for Standalone and Stream Manager support.](https://www.red5pro.com/docs/special/user-guide/whip-whep-configuration/)

You also need to ensure that the stream manager proxy layer is `enabled`. The configuration section can be found in stream manager's config file - `red5-web.properties`

```sh
## WEBSOCKET PROXY SECTION

proxy.enabled=false
```

### Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# Setup

This example provides a simple form that allows you to provision a `High`, `Mid` and `Low` set of variants to broadcast. After you have submitted the provision successfully, you are given the option to start a broadcast (using `RTC` to `RTMP` publisher failover) with a target variant (we recommend `High` for the test).

Once you select the variant to publish as, click the **Start Publishing** button and a request on the Stream Manager will be made for the Transcoder server address to start publishing to. The Transcoder will take care of fleshing out the additional variants to be consumed by subscribers in ABR.

Once you have started a broadcast for the target variant on the Transcoder, open the [Subscribe Stream Manager Transcoder Proxy](../subscribeStreamManagerProxyTranscoder/) example to see how you can subscribe to a stream that will have dynammic ABR based on your client's network conditions.

> This example differs from the [Publisher Stream Manager Provision Form](../publisherStreamManagerProvisionForm/) in that it makes a request for a Transcoder server address as the Origin to broadcast on.

## API

The API to `POST` a provision is as follows:

### Endpoint

The following endpoint accepts a `POST` of JSON explained in the next section. Replace `yourstreammanager.com`, `mystream` and `myaccessToken` accordingly to your Red5 Pro Server remote location, target top-level stream name and `accessToken` defined in your Stream Manager configurations:

```js
https://yourstreammanager.com/streammanager/api/3.0/admin/event/meta/live/mystream?accessToken=myaccessToken
```

### JSON Schema

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

### Response

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

## Accessing the Transcoder Origin

Now that the variants have been provided to the Stream Manager, the broadcaster will need to request the server address to publish on using a Transcoder. To access that server address, is as easy as adding the `&transcode=true` query param in the normal call to Stream Manager for an Origin server address.

In following with the previous examples, such a call would look like:

```js
https://yourstreammanager.com/streammanager/api/3.0/event/live/mystream?action=broadcast&transcode=true
```

That will return a JSON with the same structure as you are familiar with in requesting any other Origin server info from the Stream Manager.

The Broadcaster will then use the `serverAddress` from that response to publish their target variant level to (e.g., `mystream_1`) with the additional proper configuration set for that variant - `width`, `height` and `bitrate`.

> Even though the broadcaster is publishing a single variant, since the Transcoder endpoint is used, the other variants will be available for consumption on the subscriber-side. You can verify this by locating one of your edges in the Stream Manager deployment and viewing the available streams.
