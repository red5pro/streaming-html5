# Subscribe Retry on Invalid Name
This example demonstrates utilizing the `maintainConnectionOnSubscribeErrors` configuration property of a subscriber in order to maintain the WebSocket connection upon errors from the `subscribe` request after intializing.

When you request to `init` a WebRTC-based subscriber, it establshes a WebSocket connection over which server events are notified. When you subsequently request to `subscribe`, there are a series of WebSocket requests that lead to the ICE negotiation process and - when successful - establish a `PeerConnection` and exchange the `MediaStream` asset for playback.

By default, if the `subscribe` request fails, the SDK will also shutdown the previously established WebSocket connection. By setting the `maintainConnectionOnSubscribeErrors` to `true`, it allows you - as a developer - to handle failure events from the `subscribe` event and maintain the WebSocket to try a `subscribe` request again at a later time.

**Please refer to the [Basic Subscriber Documentation](../subscribe/README.md) to learn more about the basic setup.**

### Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

> These examples use the WebRTC-based Subscriber implementation from the Red5 Pro HTML SDK. However.

## Running the Example
In this example we will utilize the `maintainConnectionOnSubscribeErrors` configuration proeprty in tandem with an event listener for the `Subscribe.InvalidName` event to enable a `Retry` button to attempt a `subscribe` request again.

1. Check the settings and `stream1` field value in particular.
2. Ensure that you are not currently publishing a stream with the `stream1` value.

## Setting maintainConnectionOnSubscribeErrors

```js
var config = Object.assign({
  maintainConnectionOnSubscribeErrors: true
}, configuration, defaultConfiguration);
```

<sup>
[index #130](index#L130)
</sup>

## Listening for Subscribe.InvalidName
The `Retry` button element is disabled by default, and enabled on recognition of the `Subscribe.InvalidName` event.

```js
var subscriber = new red5prosdk.RTCSubscriber();
subscriber.on(red5prosdk.SubscriberEventTypes.SUBSCRIBE_INVALID_NAME, function () {
  enableRetryButton();
});
disableRetryButton();
```

<sup>
[index #135](index#L135)
</sup>

## Request to initialize
The configuration is passed in the `init` request which - upon successful establishment of a WebSocket connection - adds lifecycle event handlers and requests to `subscribe`.

```js
subscriber.init(config)
  .then(function (subscriberImpl) {
    streamTitle.innerText = configuration.stream1
    targetSubscriber = subscriberImpl
    // Subscribe to events.
    targetSubscriber.on('*', onSubscriberEvent);
    return targetSubscriber.subscribe();
  })
  .then(function () {
    onSubscribeSuccess();
  })
  .catch(function (error) {
    var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
    console.error('[Red5ProSubscriber] :: Error in subscribing - ' + jsonError);
    onSubscribeFail(jsonError);
  });
```

<sup>
[index #141](index#L141)
</sup>

## Retry

A failure in the `subscribe` request will enable the `Retry` button which has a `click` event handler to make another attempt to the `subscribe` request:

```js
retryButton.addEventListener('click', function () {
  statusField.innerText = 'Retrying subscription...'
  if (targetSubscriber) {
    disableRetryButton();
    targetSubscriber.subscribe()
      .then(function () {
        onSubscribeSuccess();
      })
      .catch(function (error) {
        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
        console.error('[Red5ProSubscriber] :: Error in subscribing - ' + jsonError);
        onSubscribeFail(jsonError);
      });
  }
});
```

<sup>
[index #69](index#L69)
</sup>

> If you start a publishing session with the target stream name in between a failure of the `subscribe` request and a requestt to retry, the subscription and subsequent playback will occur.
