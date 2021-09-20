# Subscribe Toggle Camera

This is an accompanying example to the [Publish - Toggle Camera](../publishCameraToggle) example.

The [Publish - Toggle Camera](../publishCameraToggle)  demonstrates toggling off and on the camera during a live stream without having to establish a new connection. Additionally it uses the `Send API` to notify all subscribers of the camera state.

This example utilizes the messaging through the `Send API` to show a notification related to the camera state of the publisher stream.

**Please refer to the [Basic Subscriber Documentation](../subscribe/README.md) and [Basic Publisher Documentation](../publisher/README.md) to learn more about the basic setup.**

# Running the example

First start a publisher from the [Publish - Toggle Camera](../publishCameraToggle) example and then starts this example.
When you toggle the camera off and on from the Publisher example, you will see a UI notification associated with the Publisher camera state:

```js
var sendClientHandler = function (event) {
  var eventData = event.data;
  var msg = eventData.data;
  var methodName = eventData.methodName || eventData.method;
  if (methodName === 'cameraToggle') {
    console.log('[Red5ProSubscriber] :: camera toggle received!');
    console.log('[Red5ProSubscriber] :: message - ' + JSON.stringify(msg, null, 2));
    var isToggledOff = msg.isToggledOff;
    messageCallout.innerText = isToggledOff ? "Broadcaster has turned off their camera." : "Broadcaster has turned on their camera.";
    if (isToggledOff) {
      messageCallout.classList.remove('hidden');
    } else {
      messageCallout.classList.add('hidden');
    }
  }
}; 
```
