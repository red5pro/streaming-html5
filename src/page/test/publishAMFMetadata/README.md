# Sending AMF Metadata using a Publisher.

This example demonstrates sending AMF Metadata on a Publisher stream connection.

**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

## Sending AMF Metadata

The `RTCPublisher` and `WHIPClient` instances include a `send` method that allows sending AMF metadata with the `onMetaData` method name. This metadata is received by all subscribers watching the stream.

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

The metadata sent with this testbed can be received or seen using the [Subscribe AMF Metadata testbed](../subscribeAMFMetadata/index.html).
