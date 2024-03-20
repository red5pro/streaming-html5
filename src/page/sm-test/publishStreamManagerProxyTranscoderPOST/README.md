# Provisioning and Transcoding for Adaptive Bitrate Broadcast over Stream Manager

To enable Adaptive Bitrate (ABR) control of a stream being played back by a consumer, you need to `POST` a provision to the Stream Manager detailing the variants at which you will be broadcasting.

For scenarios in which the broadcaster does not have the capability of publishing the variants of the provision, the broadcaster can request that the server does the Transcoding to the variants.

To do so, the broadcast most locate the server address of the Transcoder using the `transcode=true` query param, from which one of the variants will be broadcast to. The tTranscoder will that generate the additional variants for consumption.

---

The Stream Manager WebRTC proxy is a communication layer built inside streammanager web application which allows it to act as a proxy gateway for webrtc publishers / subscribers. The target use case of this communication layer is to facilitate a secure browser client to be able to connect to a "unsecure" remote websocket endpoint for consuming WebRTC services offered by Red5pro.

Stream Manager autoscaling works with dynamic nodes which are associated with dynamic IP addresses and cannot have a SSL attached to them. The proxy layer helps publishers to connect and initiate a WebRTC publish session from a `secure` (ssl enabled) domain to a `unsecure` Red5pro origin having using an IP address.

**Please refer to the [Basic Publisher Documentation](../publishStreamManagerProxy/README.md) to learn more about the basic setup.**

> In order to properly run the Stream Manager examples, you will need to configure you server for cluster infrastructure as described in the following documentation: [https://www.red5.net/docs/installation/](https://www.red5.net/docs/installation/).

### Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# Setup

This example provides a simple form that allows you to provision a `High`, `Mid` and `Low` set of variants to broadcast. After you have submitted the provision successfully, you are given the option to start a broadcast using a WebRTC publisher.

Once the provision has been provided to the Stream Manager, click the **Start Publishing** button and a request on the Stream Manager will be made for the Transcoder server address to start publishing to. The Transcoder will take care of fleshing out the additional variants to be consumed by subscribers in ABR.

Once you have started a broadcast for the target variant on the Transcoder, open the [Subscribe Stream Manager Transcoder Proxy](../subscribeStreamManagerProxyTranscoder/) example to see how you can subscribe to a stream that will have dynammic ABR based on your client's network conditions.

> This example differs from the [Publisher Stream Manager Provision Form](../publisherStreamManagerProvisionForm/) in that it makes a request for a Transcoder server address as the Origin to broadcast on.

# Broadcast, Transcode and Playback

When creating the ABR ladder, you will do the following:

1. Post of Provision to the Stream Manager detailing the stream variants to generate.
2. Broadcast to the Transcoder using the target variant `streamGuid` of the provision and specifying the `trancode` connection parameter.

In doing Step #2, the Transcoder node will generate the lower stream variants and propagate all streams to Edge node(s) available for playback. Additionally, upon subscribe and playback, the Red5 Server will handle switching the variants delivered based on bandwidth estimation of the subscriber client.

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

# Broadcasting to the Transcoder

Once a provision is submitted, you will use the `endpoint` property of the init configuration for a `WHEPClient` (or `RTCPublisher`) to point to the Stream Manager proxy in order to deliver the high-level variant stream to the Transcoder node.

```javascript
const { streamGuid, videoParams } = variant
const streamName = streamGuid.split('/').pop()

const endpoint = !preferWhipWhep
  ? `wss://${host}/as/v1/proxy/ws/publish/${streamGuid}`
  : `https://${host}/as/v1/proxy/whip/${streamGuid}`

const rtcConfig = {
  ...configuration,
  ...getUserMediaConfiguration(videoParams),
  endpoint,
  streamName,
  bandwidth: {
    video: videoParams.videoBitRate / 1000,
  },
  connectionParams: {
    ...connectionParams,
    nodeGroup,
    transcode: true,
  },
}
```
