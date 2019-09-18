# Passing validation parameters when broadcasting to a Red5 Pro Origin

This is an example of passing validation parameters when broadcasting 


**Please refer to the [Basic Publisher Documentation](../publisher/README.md) to learn more about the basic setup.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

> This example allows you to send custom validation parameters to your webapp when starting a Broadcast session.

The UI provides a form to allow for adding validation parameters. Once you have added the proper validation parameters, click the **Start Publishing** button and the Red5 Pro SDK will connect and broadcast to your Red5 Pro server.


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

