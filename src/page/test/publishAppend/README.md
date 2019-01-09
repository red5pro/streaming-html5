# Publish Stream Recording - Append
This example demonstrates appended recording of the published stream to the server.

**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

> These examples use the WebRTC-based Publisher implementation from the Red5 Pro HTML SDK. However, there is failover support to allow for Flash-base publisher on unsupported browsers.

# Recording

To record a published stream, modify the `streamMode` configuration attribute provided upon initialization of the Publisher:

```js
var defaultConfiguration = {
  protocol: 'ws',
  port: 5080,
  app: 'live',
  streamMode: 'append'
};
```

[index.js #41](index.js#L41)

The following are accepted values for the `streamMode` configuration attribute:

* **live**
* **record**
* **append**

The default value is `live`.
