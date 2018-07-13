# Publishing Over Stream Manager with Webhook Integration

**This test is intended to be used with Stream Manager that contains a webapp with webhook integration.**

---

The streammanager WebRTC proxy is a communication layer built inside streammanager web application which allows it to act as a proxy gateway for webrtc publishers / subscribers. The target use case of this communication layer is to facilitate a secure browser client to be able to connect to a "unsecure" remote websocket endpoint for consuming WebRTC services offered by Red5pro. 

Streammanager autoscaling works with dynamic nodes which are associated with dynamic IP addresses and cannot have a SSL attached to them. The proxy layer helps publishers to connect and initiate a WebRTC publish session from a `secure` (ssl enabled) domain to a `unsecure` Red5pro origin having using an IP address.

**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup.**

> In order to properly run the Stream Manager examples, you will need to configure you server for cluster infrastructure as described in the following documentation: [https://www.red5pro.com/docs/server/autoscale/](https://www.red5pro.com/docs/server/autoscale/).

> You also need to ensure that the stream manager proxy layer is `enabled`. The configuration section can be found in stream manager's config file - `red5-web.properties`

```txt
## WEBSOCKET PROXY SECTION
proxy.enabled=false
```

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# Usage

This test allows for:

* Receiving messages from a webhook interceptor through an additional WebSocket connection used for only such messaging.
* Sending additional `connectionParams` along with the Stream Manager Proxy connection that are to be used with webhook integration.

## Webhook Connection Form

Included in the the `index.html` page is field for a **Webhook Socket Connection URL**. Enter in the full WebSocket endpoint that will issue webhook notifications.

> By default, the **URL** field has `wss://xxx.xxx.xxx:8083/live/webhook` pre-populated as the value. Replace `xxx.xxx.xxx` with the target domain name. Ensure that you have an additional webhook interceptor server running that will forward along the webhook messages on that socket channel, as well.

## Stream Manager Connection Form

Also included in the `index.html` page are fields for additional information to pass along in the `connectionParams` of a connecting Publihser to the Stream Manager in its request for an Origin address.

The following fields are available:

* **username** - optional `username` to provide in Stream Manager Socket connection (`undefined` is sent if not specified).
* **password** - optional `password` to provide in Stream Manager Socket connection (`undefined` is sent if not specified).
* **customer scope** - the required `customerScope` used by the webhook webapp to signal hooks on.
* **meta** - optional `meta` object with additional information to pass in webhook notification.
* **recording** - flag to send `recording` parameter and define the stream mode as a recording. If not selected, the stream mode is `live`.

These additional `connectionParams` are appended to the connection made to the Stream Manager Proxy after receipt of Origin address to broadcast on.

As an example of the outgoing WebSocket URL in the request (assembled and connection handled by the Red5 Pro SDK):

```ssh
wss://streammanager.company.com:8083/streammanager?id=mystream&username=foo&password=bar&customerScope=scope&recording=true&meta=%7B%22foo%22%3A%22bar%22%7D&host=xxx.xxx.xxx&app=live
```

## Start Publishing

Once you have provided the proper **Webhook Socket URL** and additional **Connection Params**, click the `Start Publishing` button to begin a publishing session over the Stream Manager Proxy.

# Result

If properly connected to a webhook interceptor WebSocket connection that forwards along webhooks from the webapp distributed on the target Origin, you should be able to open the dev console of your browser and see webhook notification sbeing received during the lifecycle events of the Publisher.
