# Publish & Subscribe to DataChannel Messages over Stream Manager

This example demonstrates utilizing the underlying `RTCDataChannel` of a Publisher and Subscriber to send and receive messages.

Though the Publisher example demonstrates sending the messages, while the Subscriber example demonstrates receiving the messages, either peer can act as the sender and receiver when utilizing the `RTCDataChannel`.

To access the underlying `RTCDataChannel` instance of an `RTCPublisher` and `RTCSubscriber` use the access method: `getDataChannel()`.

> This example requires the configuration attribute of `signalingSocketOnly` being set to the default value of `true`.

**Please refer to the [Basic Publisher Documentation](../publishStreamManagerProxy/README.md) to learn more about the basic setup.**

## Example Code

### Publisher

- **[index.html](index.html)**
- **[index.js](index.js)**

### Subscriber

- **[index.html](../subscribeStreamManagerProxyDataChannel/index.html)**
- **[index.js](../subscribeStreamManagerProxyDataChannel/index.js)**

# Running the example

Two clients are required to run this example: one as a publisher, and the other as a subscriber.

Connect the first client (publisher) with the *Publish - Data Channel Messaging* example. On the second lient (subscriber) use the *Subscribe - Data Channel Messaging* example.

There are 3 types of messaging that can go through the `RTCDataChannel`:

* RPC Message - using the [Send API](../../test/publishRemoteCall) with a defined JSON schema that the server knows how to properly handle.
* Basic Message - sending any arbitrary String, mostly represented as JSON.
* Raw Data - typically the most supported form of `ArrayBuffer`.

## RPC Message

Remote Procedural Call (RPC) Messages use the **Send API** of the `RTCPublisher` API:

```js
send("incomingNotification", {
  message: rpcInput.value === '' ? 'What lovely weather today.' : rpcInput.value,
  timestamp: new Date().getTime()
});
```

[index.js #135](index.js#L135)

## Method signature

The method signature for the `send` API is:

| Param | Description |
| --- | --- |
| methodName | The name of the method associated with the data to be parsed on the subscriber clients. |
| data | A javascript `Object` describing the message data to send to subscriber clients. |

If the subscribing client is browser-based, a `Subscriber.Send.Invoke` event is triggered on the subscriber.

The `methodName` you provide will be included as the `SubscriberEvent:methodName` of the `Subscriber.Send.Invoke` event if the client is browser-based. For iOS and Android subscribers, it will be invoked on the `R5Stream:client` instance.

The structure of `data` can be any javascript `Object`. The data will be serialized and unpacked appropriately on the corresponding clients and given as the first argument when invoking the `methodName`.

> You should *not* send the `data` object as a `String`.

## Basic Message

Basic JSON String messages can also be sent along the `RTCDataChannel`. This allows for custom messaging that is understood between peers based on you applications requirements:

```js
const message = JSON.stringify({message: messageInput.value, timestamp: new Date()})
targetPublisher.getDataChannel().send(message)
```

[index.js #143](index.js#L143)

## Raw Data

Raw binary data can also be sent along the `RTCDataChannel` to shared arbitraty information between peers. This can be used to send encrypted data, files, etc.

Check the browser support of data types allowed to be sent along the `RTCDataChannel` implementation. The most commonly accepted type is an `ArrayBuffer`.

This example demonstrates recording a small amount of audio of the current `MediaStream` and sending it to all peers for playback:

```js
const stream = new MediaStream()
stream.addTrack(targetPublisher.getMediaStream().getAudioTracks()[0])

const recorder = new MediaRecorder(stream)
let chunks = []
recorder.ondataavailable = e => {
  chunks.push(e.data)
}

recorder.onstop = async () => {
  let blobChunks = [chunks.shift()]
  let i = 0
  // 262144 is max bytes able to send on DC in one message.
  let maxbytes = 262144 - blobChunks[0].size
  while (chunks.length > 0) {
    const chunk = chunks.shift()
    maxbytes -= chunk.size
    if (maxbytes > 0) {
      blobChunks.push(chunk)
    }
  }
  const blob = new Blob(blobChunks)
  const buffer = await new Response(blob).arrayBuffer()
  console.log('Sending bytes...', buffer.byteLength)
  console.log(buffer)
  targetPublisher.getDataChannel().send(buffer)
}

recorder.start(1000)
setTimeout(() => {
recorder.stop()
}, 5000)
```

[index.js #152](index.js#L152)
