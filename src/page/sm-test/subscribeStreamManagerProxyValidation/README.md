# Passing Validation parameters when Subscribing stream manager proxy

The streammanager WebRTC proxy is a communication layer built inside streammanager web application which allows it to act as a proxy gateway for webrtc publishers / subscribers. The target use case of this communication layer is to facilitate a secure browser client to be able to connect to a "unsecure" remote websocket endpoint for consuming WebRTC services offered by Red5pro.

Streammanager autoscaling works with dynamic nodes which are associated with dynamic IP addresses and cannot have a SSL attached to them. The proxy layer helps subscribers to connect and initiate a WebRTC subscribe session from a `secure` (ssl enabled) domain to a `unsecure` Red5pro edge having using an IP address.

**Validation Parameters** may be required for your current project. This is a way to additionally pass in query parameters when utilizing the Stream Manager API in order to run validation on the server-side.

**Please refer to the [Basic Subscriber Documentation](../subscribeStreamManagerProxy/README.md) to learn more about the basic setup.**

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

# Setup

The UI provides a form to allow for adding validation parameters. Once you have added the proper validation parameters, click the **Start Subscribing** button Red5 Pro SDK will provide those parameters as key-value query parameters in its connection request to the server.

The `getValidationParams` function just collects the parameter form fields and generates the key:value map. For example, if you entered in `foo` for the **Parameter Name** and `bar` for the **Parameter Value**, the `connectionParams` property would be:

```json
{
  "foo": "bar"
}
```

This is similar to the [Subscribe Round Trip Authentiation](../subscribeStreamManagerRoundTripAuth/) example of which a `username`, `password` and `token` are sent to be validated for credentials.

This example allows you to additionally pass any other key-value pairs required for your application.
