# Publish & Subscribe Remote Call
This example demonstrates the `send` API of the publisher in the Red5 Pro HTML SDK. Using `send`, a publisher can send a message object to any currently subscribed clients.

**Please refer to the [Basic Subscriber Documentation](../subscribe/README.md) and [Basic Publisher Documentation](../publisher/README.md) to learn more about the basic setup.**

## Example Code

### Publisher

- **[index.html](../publishRemoteCall/index.html)**
- **[index.js](../publishRemoteCall/index.js)**

### Subscriber

- **[index.html](index.html)**
- **[index.js](index.js)**

# Running the example

Two clients are required to run this example: one as a publisher, and the other as a subscriber.

Connect the first client (publisher) with the *Publish - Remote Call* example. On the second lient (subscriber) use the *Subscribe - Remote Call* example.

Touch the preview on the publisher screen to display a label on the subscriber screen where the publisher touched.

## Using the `send` API

Once the broadcast stream has connected you are able to dispatch messages to any connected subscribers. Sending the message is a simple call:

```js
send('whateverFunctionName', {
  message: "The publisher wants your attention",
  touchX: event.offsetX / elem.clientWidth,
  touchY: event.offsetY / elem.clientHeight
});
```

[index.js #37](../publishRemoteCall/index.js#L37)

## Method signature

The method signature for the `send` API is:

| Param | Description |
| --- | --- |
| methodName | The name of the method associated with the data to be parsed on the subscriber clients. |
| data | A javascript `Object` describing the message data to send to subscriber clients. |

If the subscribing client is browser-based, a `Subscriber.Send.Invoke` event is triggered on the subscriber.

The `methodName` you provide will be included as the `SubscriberEvent:methodName` of the `Subscriber.Send.Invoke` event if the client is browser-based. For iOS and Android subscribers, it will be invoked on the `R5Stream:client` instance.

The structure of `data` can be any javascript `Object`. The data will be serialized and unpacked appropriately on the corresponding clients and given as the first argument when invoking the `methodName`.

> You should *not* send the `data` object as a `String`.

## Receiving the message

On the browser-based subscriber client, you will need to define the event responder for `Subscriber.Send.Invoke` and handle the event properties to determine the `methodName` being invoked. In using the Red5 Pro HTML SDK:

```js
subscriber.on(red5pro.SubscriberEventTypes.SUBSCRIBE_SEND_INVOKE, sendClientHandler);
```

[index.js #139](index.js#L139)

```js
var sendClientHandler = function (event) {
  var eventData = event.data;
  var msg = eventData.data;
  var methodName = eventData.methodName;
  if (methodName === 'whateverFunctionName') {
    var elem = document.getElementById('red5pro-subscriber-video');
    messageCallout.innerText = msg.message;
    messageCallout.style.left = (elem.offsetLeft + (elem.clientWidth * msg.touchX)) + 'px';
    messageCallout.style.top = (elem.offsetTop + (elem.clientHeight * msg.touchY)) + 'px';
  }
};
```
[index.js #152](index.js#L152)

