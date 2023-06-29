# Provisioning for Adaptive Bitrate Broadcast over Stream Manager

To enable Adaptive Bitrate (**ABR**) control of a stream being played back by a consumer, you need to `POST` a provision to the Stream Manager detailing the variants at which you will be broadcasting.

---

The streammanager WebRTC proxy is a communication layer built inside streammanager web application which allows it to act as a proxy gateway for webrtc publishers / subscribers. The target use case of this communication layer is to facilitate a secure browser client to be able to connect to a "unsecure" remote websocket endpoint for consuming WebRTC services offered by Red5pro.

Streammanager autoscaling works with dynamic nodes which are associated with dynamic IP addresses and cannot have a SSL attached to them. The proxy layer helps publishers to connect and initiate a WebRTC publish session from a `secure` (ssl enabled) domain to a `unsecure` Red5pro origin having using an IP address.

**Please refer to the [Basic Publisher Documentation](../publishStreamManagerProxy/README.md) to learn more about the basic setup.**

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

This example provides a simple form that allows you to provision a `High`, `Mid` and `Low` set of variants to broadcast. After you have submitted the provision successfully, you will be provided a list of `RTMP` endpoints that you will then need to broadcast on using your favorite Media Encoder - such as **Flash Live Media Encoder** and/or **Wirecast**.

Once you have started a broadcast for each variant, open the [../subscribeStreamManagerProxyTranscoder](Subscribe Stream Manager Transcoder Proxy) example to see how you can subscribe to a stream that will have dynammic ABR based on your client's network conditions.

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

## Accessing the Origins to Broadcast On

This example is very simple in that it makes one request for an origin to broadcast all the variants on. In real-world cases, you will want to request the server address (Origin) to broadcast on for each variant type.

To access the Origin server address for a variant:

### Endpoint

Following along with the previous examples for URL structure, you would have the following 3 urls to make a `GET` request on to receiev the Origin server address to broadcast each on:

```js
https://yourstreammanager.com/streammanager/api/3.0/event/live/mystream_1?action=broadcast&accessToken=myaccessToken
https://yourstreammanager.com/streammanager/api/3.0/event/live/mystream_2?action=broadcast&accessToken=myaccessToken
https://yourstreammanager.com/streammanager/api/3.0/event/live/mystream_3?action=broadcast&accessToken=myaccessToken
```

You will request server address and broadcast using the stream name form of: `<stream name guid>_<level>`. In following with the above example, requesting to broadcast the higest variant would be: `mystream_1`.

The response is the same response and JSON structure you are already familiar with when utilizing the Stream Manager.
