# Subscribing to ABR Streams over Stream Manager Proxy with HLS

When a broadcast has the capability for Adaptive Bitrate (ABR) control, the consumed stream can dynamically switch variants based on the network conditions of the subscriber.

Subscription to an ABR-enabled stream differs for HLS from that of WebRTC and Flash in that the `m3u8` of the top-level GUID for the stream name is requested. In the HLS manifest returned is the variant information that will be switched to based on the network conditions of the subscriber.

---

The streammanager WebRTC proxy is a communication layer built inside streammanager web application which allows it to act as a proxy gateway for webrtc publishers / subscribers. The target use case of this communication layer is to facilitate a secure browser client to be able to connect to a "unsecure" remote websocket endpoint for consuming WebRTC services offered by Red5pro. 

Streammanager autoscaling works with dynamic nodes which are associated with dynamic IP addresses and cannot have a SSL attached to them. The proxy layer helps subscribers to connect and initiate a WebRTC `subscribe` session from a `secure` (ssl enabled) domain to a `unsecure` Red5pro origin having using an IP address.


**Please refer to the [Basic Subscriber Documentation](../subscribe/README.md) to learn more about the basic setup.**

> In order to properly run the Stream Manager examples, you will need to configure you server for cluster infrastructure as described in the following documentation: [https://www.red5pro.com/docs/server/autoscale/](https://www.red5pro.com/docs/server/autoscale/).

> You also need to ensure that the stream manager proxy layer is `enabled`. The configuration section can be found in stream manager's config file - `red5-web.properties`

```txt
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

With the Provision data available, the next requirement is to request an Edge server to subscribe to from the Stream Manager. Any of the `name`s listed in the Provision variants can be used to make the request. Once the Edge server address is provided form the Stream Manager, you will then request the associated `m3u8` using the top-level GUID of the stream (the top-level `name` attribute value of the JSON above).

Requesting an Edge server to broadcast is the same as you are familiar with when using the Stream Manager API. The only difference is that you provide the name of one of the variants:

```js
https://yourcompany.com/streammanager/api/3.0/event/live/mystream_high?action=subscribe
```

Use the `serverAddress` of the JSON response from the above `GET` request together with the top-level GUID `name` of the stream to start subscribing the the ABR-enabled stream using HLS.
