# Consuming AMF Metadata from RTC Streams

AMF metadata can be ingested into source stream published to Red5 Pro and consumed on the client side in real time. The metadata is retrieved by processing the `Subscribe.Metadata` events for example using the following code:

```js
function onSubscriberEvent(event) {
  console.log('[Red5ProSubsriber] ' + event.type + '.')
  if (event.type == 'Subscribe.Metadata') {
    processAMFData(event)
  }
}

function processAMFData(event) {
  const data = event.data
  console.log('received data: ', data)

  // process data
}
```
