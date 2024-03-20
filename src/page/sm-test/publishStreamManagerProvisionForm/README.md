# Provisioning for Adaptive Bitrate Broadcast over Stream Manager

To enable Adaptive Bitrate (**ABR**) control of a stream being played back by a consumer, you need to `POST` a provision to the Stream Manager detailing the variants at which you will be broadcasting.

---

The Stream Manager WebRTC proxy is a communication layer built inside streammanager web application which allows it to act as a proxy gateway for webrtc publishers / subscribers. The target use case of this communication layer is to facilitate a secure browser client to be able to connect to a "unsecure" remote websocket endpoint for consuming WebRTC services offered by Red5pro.

Stream Manager autoscaling works with dynamic nodes which are associated with dynamic IP addresses and cannot have a SSL attached to them. The proxy layer helps publishers to connect and initiate a WebRTC publish session from a `secure` (ssl enabled) domain to a `unsecure` Red5pro origin having using an IP address.

**Please refer to the [Basic Publisher Documentation](../publishStreamManagerProxy/README.md) to learn more about the basic setup.**

### Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# Setup

This example provides a simple form that allows you to provision a `High`, `Mid` and `Low` set of variants to broadcast. After you have submitted the provision successfully, you will be provided a list of `RTMP` endpoints that you will then need to broadcast on using your favorite Media Encoder - such as **Flash Live Media Encoder** and/or **Wirecast**.

Once you have started a broadcast for each variant, open the [../subscribeStreamManagerProxyTranscoder](Subscribe Stream Manager Transcoder Proxy) example to see how you can subscribe to a stream that will have dynammic ABR based on your client's network conditions.

> Additionally, once the provision has been posted, you can start a WebRTC broadcast as demonstrated in [Publish Stream Manager Transcoder POST](../publishStreamManagerProxyTranscoderPOST/)

## Broadcast, Transcode and Playback

When creating the ABR ladder, you will do the following:

1. Post of Provision to the Stream Manager detailing the stream variants to generate.
2. Request the Transcoder node from the Stream Manager.
3. Broadcast to the Transcoder using the highest variant `streamGuid`.

In doing Step #3, the Transcoder node will generate the lower stream variants and propagate all streams to Edge node(s) available for playback. Additionally, upon subscribe and playback, the Red5 Server will handle switching the variants delivered based on bandwidth estimation of the subscriber client.

## API

The API to `POST` a provision is as follows:

### Authentication

Posting a Provision to the Stream Manager requires an authentication token. In order to obtain an authentication token, you will need to know the `username` and `password` associated with your Stream Manager deployment (replace `yourstreammanager.com`, `smUsername`, and `smPassword`):

```js
const url = `https://${yourstreammanager.com}/as/v1/auth/login`
const token = 'Basic ' + btoa(`${smUsername}:${smPassword}`)
const response = await fetch(url, {
  method: 'PUT',
  withCredentials: true,
  credentials: 'include',
  headers: {
    Authorization: token,
    'Content-Type': 'application/json',
  },
})

console.log('Authenticate response: ' + response.status)
var json = await response.json()
return json.token
```

### Endpoint

With the authentication token received, the following endpoint accepts a `POST` of JSON body explained in the next section. Replace `yourstreammanager.com` and `nodeGroup` with your Stream Manager deployment and the desired target node group, respectively.

```js
const url = `https://${yourstreammanager.com}/as/v1/streams/provision/${nodeGroup}`
const body = JSON.stringify(provision)
const result = await fetch(url, {
  method: 'POST',
  withCredentials: true,
  credentials: 'include',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body,
})
```

### JSON Schema

The basic JSON schema of the data to `POST` to the endpoint above has the following structure:

```json
[
  {
    "streamGuid": "live/test",
    "streams": [
      {
        "streamGuid": "live/test_3",
        "abrLevel": 3,
        "videoParams": {
          "videoWidth": 320,
          "videoHeight": 180,
          "videoBitRate": 500000
        }
      },
      {
        "streamGuid": "live/test_2",
        "abrLevel": 2,
        "videoParams": {
          "videoWidth": 640,
          "videoHeight": 360,
          "videoBitRate": 1000000
        }
      },
      {
        "streamGuid": "live/test_1",
        "abrLevel": 1,
        "videoParams": {
          "videoWidth": 1280,
          "videoHeight": 720,
          "videoBitRate": 2000000
        }
      }
    ]
  }
]
```

The top-level `streamGuid` is the path of `<app context>/<stream name>` from which the stream name variants listed in `streams` derive their name.

### Response

A successful response will return with a code between `200` and `299`, inclusive. A `409` (Conflict) status code will be returned when a provision with the top-level `streamGuid` already exists in the system.
