# Subscribing to ABR Streams over Stream Manager Proxy with WebRTC

When a broadcast has the capability for Adaptive Bitrate (ABR) control, the consumed stream can dynamically switch variants based on the network conditions of the subscriber.

To start a subscription to a stream, request the ABR Provision of the target stream and select a variant to consume. Once the stream is being consumed, the server will update the variant and quality based on the network condition.

---

The streammanager WebRTC proxy is a communication layer built inside streammanager web application which allows it to act as a proxy gateway for webrtc publishers / subscribers. The target use case of this communication layer is to facilitate a secure browser client to be able to connect to a "unsecure" remote websocket endpoint for consuming WebRTC services offered by Red5pro.

Streammanager autoscaling works with dynamic nodes which are associated with dynamic IP addresses and cannot have a SSL attached to them. The proxy layer helps subscribers to connect and initiate a WebRTC `subscribe` session from a `secure` (ssl enabled) domain to a `unsecure` Red5pro origin having using an IP address.

**Please refer to the [Basic Subscriber Documentation](../subscribeStreamManagerProxy/README.md) to learn more about the basic setup.**

> In order to properly run the Stream Manager examples, you will need to configure you server for cluster infrastructure as described in the following documentation: [https://www.red5.net/docs/installation/](https://www.red5.net/docs/installation/).

## Server Configuration

> Please read about [WHIP/WHEP Configuration for Standalone and Stream Manager support.](https://www.red5.net/docs/special/user-guide/whip-whep-configuration/)

You also need to ensure that the stream manager proxy layer is `enabled`. The configuration section can be found in stream manager's config file - `red5-web.properties`

```sh
## WEBSOCKET PROXY SECTION

proxy.enabled=false
```

### Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

## Setup

In order to subscribe to a stream that has an ABR provision, you will first need to request the Provision to get a list of variants that are available to subscribe to.

### Endpoint

If you were to request the Provision for a stream named `mystream` on your Stream Manager instance deployed to `https://yourcompany.com` with the access token defined as `myaccessToken`, the `GET` request for the Provision would have the following structure:

```js
https://yourcompany.com/streammanager/api/3.0/admin/event/meta/live/mystream?accessToken=myaccessToken
```

### Response

If the broadcast for `mystream` was provisioned for levels of `1`, `2` and `3` variants (as they are in the example at [../publishStreamManagerProvisionForm](Publisher Stream Manager Provision)), the JSON response from the above request will look similar to the following:

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
}
```

The `data.meta.stream` listing provides the available variants to subscribe to.

## Subscribing

With the Provision data available, the next requirement is to request an Edge server to subscribe to from the Stream Manager. Any of the `name`s listed in the Provision variants can be used to make the request and subscribe to; the server will handle the stream downgrade and upgrade based on the network conditions of the subscriber.

Requesting an Edge server to broadcast is the same as you are familiar with when using the Stream Manager API. The only difference is that you provide the name of one of the variants:

```js
https://yourcompany.com/streammanager/api/3.0/event/live/mystream_1?action=subscribe
```

Use the `serverAddress` of the JSON response from the above `GET` request to start subscribing the the ABR-enabled stream.
