# Broadcaster Authentication using Red5 Pro

This is an example of authenticating a Broadcast for stream playback using RoundTrip authentication.

**Please refer to the [Basic Publisher Documentation](../publisher/README.md) to learn more about the basic setup.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

> This example requires you to enable the `SimpleAuthentication` Plugin with `RoundTripValidator` for the `live` webapp. More information: [Simple Authentication Plugin](https://www.red5pro.com/docs/server/authplugin).

# Authenticating

A broadcaster client logs in into the business application server using known `username` and `password` attributes. The application server authenticates the credentials & issues a `token` to the user.

The client then connects to the Red5 Pro media server using the `username`, `password` and `token` (optional) parameters, with the intent of publishing a stream. The media server transmits the `username`, `password` and optionally the `token` to the application server along with the `stream name` and the request `type` (broadcast).

The application server returns a json to the media server indicating whether the `broadcast` should be allowed or not for the given `username`, `password` & `stream name`. The media server then accepts or rejects the client request accordingly.

Passing of the `token` param is optional and depends on the `SimpleAuthentication` Plugin's `RoundTripValidator` configuration.More information: [Simple Authentication Plugin](https://www.red5pro.com/docs/server/authplugin#roundtripvalidator).

For example, if you have defined the authorization of a user `foo` with a password `bar` along with a `token` value of `mytoken`, the configuration addition would look like the following:

```js
connectionParms: {
  username: 'foo',
  password: 'bar'
  token: 'mytoken'
}
```

## Example

In the example, a login form is provided to allow the user to enter in their username, password and a token. Those field values are added to the respective properties in the `connectionParms` attribute of the configuration(s) upon submit of the form, and the request to broadcast started:

```
submitButton.addEventListener('click', function () {
  configuration.connectionParams = {
    username: usernameField.value,
    password: passwordField.value
    token: tokenField.value
  };
  start();
});
```

[index.js #157](index.js#L157)

> The example works for both the WebRTC and Flash fallback broadcasters.

