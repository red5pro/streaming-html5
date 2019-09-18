# Passing validation parameters when broadcasting to a Red5 Pro server

This is an example of passing validation parameters to a webapp when broadcasting in order to run validation on the server-side.

**Please refer to the [Basic Publisher Documentation](../publisher/README.md) to learn more about the basic setup.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

> This example allows you to send custom validation parameters to your webapp when starting a Broadcast session.

The UI provides a form to allow for adding validation parameters. Once you have added the proper validation parameters, click the **Start Publishing** button and the Red5 Pro SDK will connect and broadcast to your Red5 Pro server.

Of important note is how the validation parameters are set on the configuration. By defining the `connectionParams` as an Object of key:value pairs, these key:value pairs will be appended as query params to the Origin requests.

```js
var aConfig = Object.assign({}, configuration, {
  connectionParams: getValidationParams()
});
```

The `getValidationParams` function just collects the parameter form fields and generates the key:value map. For example, if you entered in `foo` for the **Parameter Name** and `bar` for the **Parameter Value**, the `connectionParams` property would be:

```json
{
  "foo": "bar"
}
```
