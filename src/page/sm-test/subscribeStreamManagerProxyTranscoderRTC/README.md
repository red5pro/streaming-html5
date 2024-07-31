# Subscribing to ABR Streams over Stream Manager Proxy with WebRTC

When a broadcast has the capability for Adaptive Bitrate (ABR) control, the consumed stream can dynamically switch variants based on the network conditions of the subscriber.

To start a subscription to a stream, request the ABR Provision of the target stream and select a variant to consume. Once the stream is being consumed, the server will update the variant and quality based on the network condition.

---

The Stream Manager WebRTC proxy is a communication layer built inside streammanager web application which allows it to act as a proxy gateway for webrtc publishers / subscribers. The target use case of this communication layer is to facilitate a secure browser client to be able to connect to a "unsecure" remote websocket endpoint for consuming WebRTC services offered by Red5pro.

Stream Manager autoscaling works with dynamic nodes which are associated with dynamic IP addresses and cannot have a SSL attached to them. The proxy layer helps subscribers to connect and initiate a WebRTC `subscribe` session from a `secure` (ssl enabled) domain to a `unsecure` Red5pro origin having using an IP address.

**Please refer to the [Basic Subscriber Documentation](../subscribeStreamManagerProxy/README.md) to learn more about the basic setup.**

> In order to properly run the Stream Manager examples, you will need to configure you server for cluster infrastructure as described in the following documentation: [https://www.red5.net/docs/installation/](https://www.red5.net/docs/installation/).

## Server Configuration

> Please read about [WHIP/WHEP Configuration for Standalone and Stream Manager support.](https://www.red5.net/docs/special/user-guide/whip-whep-configuration/)

### Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# Setup

In order to subscribe to a stream that has an ABR provision, you will first need to request the Provision to get a list of variants that are available to subscribe to.

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

With the authentication token received, the following endpoint accepts a `POST` of JSON body explained in the next section. Replace `yourstreammanager.com` and `nodeGroup` with your Stream Manager deployment and the desired target node group, respectively. The `streamGuid` is the top-level `streamGuid` (pair of app context and stream name) of the provision being broadcast.

```js
const url = `https://${yourstreammanager.com}/as/v1/streams/provision/${nodeGroup}/${streamGuid}`
const body = JSON.stringify(provision)
const result = await fetch(url, {
  method: 'GET',
  withCredentials: true,
  credentials: 'include',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
})
```

> The following section describes the response payload from the request. Note the top-level `streamGuid` defined - that value is the `streamGuid` used in the request URL.

### JSON Schema Response

The basic JSON schema of the payload data for a provision has the following structure:

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

## Subscribing

The Provision returns a listing of stream variants with their unique `streamGuid`. The `streamGuid` is a path to the app context scope and stream name.

Subscribing to a stream variant is the same as subscribing to anyother stream from the Stream Manager - provide an `endpoint` to the proxy requesting the `streamGuid` from a variant:

```javascript
const streamName = streamGuid.split('/').pop()
const endpoint = !preferWhipWhep
  ? `wss://${host}/as/v1/proxy/ws/subscribe/${streamGuid}`
  : `https://${host}/as/v1/proxy/whep/${streamGuid}`

var rtcConfig = {
  ...configuration,
  ...defaultConfiguration,
  endpoint,
  streamName,
  subscriptionId: 'subscriber-' + instanceId,
  connectionParams: {
    ...connectionParams,
    nodeGroup,
  },
}
```

Once subscribed to a variant stream, the server will handle delivering the quality of stream from the ladder based on bandwidth estimation of the subscribing client.
