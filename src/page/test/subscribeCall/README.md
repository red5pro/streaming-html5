# Subscriber Server Call (WebRTC-only)
This example demonstrates using the `callServer` API to invoke a method on the Application Adapter of the target app. The `callServer` method returns a `Promise`-like object that can additional deliver return data from the server.

**Please refer to the [Basic Subscriber Documentation](../subscriber/README.md) to learn more about the basic setup.**

### Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

> These examples use the WebRTC-based Subscriber implementation from the Red5 Pro HTML SDK.

_To learn more about the Application Adapter and creating a custom webapp, please refer to [Creating Your First Red5 Pro Server Application](https://www.red5pro.com/docs/server/red5prolive.html)._

# Running the Example

The example is a basic subscriber example with the addition of the ability to cal the `getLiveStreams` request on the server. This request returns a list of all the current streams available on the server.

Initialially this request was only accessible through an HTTP/S request on the server. With the introduction of the `callServer` API, you can now invoke methods on the target Application Adapter and receive information back on the return.

## Invoking `getLiveStream`

Once a publishing session has begun - in which a WebSocket connection has been established - than the `callServer` API can be used to call a method on the Applicaiton Adapter of the server.

```html
targetSubscriber.callServer('getLiveStreams', [])
  .then(function (data) {
    while (callList.hasChildNodes()) {
      callList.removeChild(callList.lastChild);
    }
    var list = data;
    var i, length = list.length;
    for (i = 0; i < length; i++) {
      var li = document.createElement('li');
      li.classList.add(i % 2 !== 0 ? 'call-list-item-odd' : 'call-list-item-even');
      li.innerText = list[i];
      callList.appendChild(li);
    }
  })
  .catch(function (e) {
    console.error('getLiveStreams error: ' + e);
  });
```

The `callServer` method returns a `Promise`-like object that will be resolved upon successful call of the target method on the Application Adapter (`getLiveStreams` in this case).

If the method defined on the Application Adapter does not return data, it will simple resolve with empty data.

If the method is either not defined or otherwise throws an exception on invocation, it will `reject` with the error message.
