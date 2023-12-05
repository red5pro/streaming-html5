# Publishing RTC Streams over Stream Manager Proxy with AMF metadata

The streammanager WebRTC proxy is a communication layer built inside streammanager web application which allows it to act as a proxy gateway for webrtc publishers / subscribers. The target use case of this communication layer is to facilitate a secure browser client to be able to connect to a "unsecure" remote websocket endpoint for consuming WebRTC services offered by Red5pro.

Streammanager autoscaling works with dynamic nodes which are associated with dynamic IP addresses and cannot have a SSL attached to them. The proxy layer helps publishers to connect and initiate a WebRTC publish session from a `secure` (ssl enabled) domain to a `unsecure` Red5pro origin having using an IP address.

**Please refer to the [Basic Publisher Documentation](../publishStreamManagerProxy/README.md) to learn more about the basic setup.**

> In order to properly run the Stream Manager examples, you will need to configure you server for cluster infrastructure as described in the following documentation: [https://www.red5.net/docs/installation/](https://www.red5.net/docs/installation/).

## Server Configuration

> Please read about [WHIP/WHEP Configuration for Standalone and Stream Manager support.](https://www.red5.net/docs/special/user-guide/whip-whep-configuration/)

You also need to ensure that the stream manager proxy layer is `enabled`. The configuration section can be found in stream manager's config file - `red5-web.properties`

```sh
## WEBSOCKET PROXY SECTION

proxy.enabled=false
```

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

## Sending AMF Metadata

The `RTCPublisher` includes a `send` method that allows sending AMF metadata with the `onMetaData` method name. This metadata is received by all subscribers watching the stream.

```js
submitButton.addEventListener('click', function () {
  if (!targetPublisher) {
    console.warn('A stream must be published before metadata can be sent!')
    return
  }

  let data = metadataField.value
  if (data === '') {
    return
  }

  console.log(`sending metadata: ${data}`)
  targetPublisher.send('onMetaData', { metadata: data })

  metadataField.value = ''
})
```

The metadata sent with this testbed can be received or seen using the [Subscribe Stream Manager Proxy AMF Metadata testbed](../subscribeStreamManagerProxyAMFMetadata/index.html).
