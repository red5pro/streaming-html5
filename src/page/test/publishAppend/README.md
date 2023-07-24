# Publish Stream Recording - Append

This example demonstrates appended recording of the published stream to the server.

**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# Recording

To record a published stream, modify the `streamMode` configuration attribute provided upon initialization of the Publisher:

```js
var defaultConfiguration = {
  protocol: 'ws',
  port: 5080,
  app: 'live',
  streamMode: 'append',
}
```

The following are accepted values for the `streamMode` configuration attribute:

- **live**
- **record**
- **append**

The default value is `live`.
