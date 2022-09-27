# Passing Validation parameters when Subscribing

**Validation Parameters** may be required for your current project. This is a way to additionally pass in query parameters when establishing a connection to the server.

**Please refer to the [Basic Subscriber Documentation](../subscribe/README.md) to learn more about the basic setup.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# Setup

The UI provides a form to allow for adding validation parameters. Once you have added the proper validation parameters, click the **Start Subscribing** button Red5 Pro SDK will provide those parameters as key-value query parameters in its connection request to the server.

The `getValidationParams` function just collects the parameter form fields and generates the key:value map. For example, if you entered in `foo` for the **Parameter Name** and `bar` for the **Parameter Value**, the `connectionParams` property would be:

```json
{
  "foo": "bar"
}
```

This is similar to the [Subscribe Round Trip Authentiation](../subscribeRoundTripAuth/) example of which a `username`, `password` and `token` are sent to be validated for credentials.

This example allows you to additionally pass any other key-value pairs required for your application.
