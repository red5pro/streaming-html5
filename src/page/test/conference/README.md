# Conference Chat

This example demonstrates multi-party communication using Red5 Pro. It should be used in conjunction with a conference WebSocket host such as [this example](https://github.com/red5pro/red5pro-conference-host)

It is recommended to view this example as part of the `webrtcexamples` webapp shipped with the [Red5 Pro Server](https://account.red5pro.com/download).

## Basic Publisher

**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup of a publisher.**

## Basic Subscriber

**Please refer to the [Basic Subscriber Documentation](../subscribe/README.md) to learn more about the basic setup of a subscriber.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**
- **[conference-subscriber.js](conference-subscriber.js)

> These examples use the WebRTC-based Publisher and Subscriber implementations only. Additional work will need to be done in order to support all fallback (Flash, HLS, etc.) options.

# Setup

Multi-party communication simply requires setting up a publish stream and a group of subscribe streams within the same session. As publishers start broadcasting, a `SharedObject` is updated with the latest publisher to enter the **"room"**. As publishers enter and exit the **"room"**, all listeners to the same `SharedObject` will be notified of the change in room listing.

ou can test the example with multiple browser pages. Each instance needs to enter the same **"room"** and have a unique name to broadcast as.

Once **Join** is hit, the instance will begin publishing, and will look for other streams that share the same room to automatically subscribe to based on the `SharedObject` property list.

# Getting Live Streams

To access the list of current streams on the server, listen for changes on the `SharedObject` and establish new subscribers based on additions and removals of the party listing. Upon success of a publishing session, the `establishSharedObject` method is invoked to begin a `SharedObject` session:

```js
function establishSharedObject (publisher, roomName, streamName) {
  // Create new shared object.
  so = new SharedObject(roomName, publisher)
  so.on(red5prosdk.SharedObjectEventTypes.CONNECT_SUCCESS, function (event) { // eslint-disable-line no-unused-vars
    console.log('[Red5ProPublisher] SharedObject Connect.');
    appendMessage('Connected.');
  });
  so.on(red5prosdk.SharedObjectEventTypes.CONNECT_FAILURE, function (event) { // eslint-disable-line no-unused-vars
    console.log('[Red5ProPublisher] SharedObject Fail.');
  });
  so.on(red5prosdk.SharedObjectEventTypes.PROPERTY_UPDATE, function (event) {
    console.log('[Red5ProPublisher] SharedObject Property Update.');
    console.log(JSON.stringify(event.data, null, 2));
    if (event.data.hasOwnProperty('streams')) {
      appendMessage('Stream list is: ' + event.data.streams + '.');
      var streams = event.data.streams.length > 0 ? event.data.streams.split(',') : [];
      if (!hasRegistered) {
        hasRegistered = true;
        so.setProperty('streams', streams.concat([streamName]).join(','));
      }
      streamsPropertyList = streams;
      processStreams(streamsPropertyList, streamName);
    }
    else if (!hasRegistered) {
      hasRegistered = true;
      streamsPropertyList = [streamName];
      so.setProperty('streams', streamName);
    }
  });
}
```

[index #234](index.js#L234)

The `processStreams` method is invoked on a `PROPERTY_UPDATE` event from the `SharedObject` when the `streams` property changes (as it does when publishers enter and exit the room):

```js
function processStreams (streamlist, exclusion) {
  var nonPublishers = streamlist.filter(function (name) {
    return name !== exclusion;
  });
  var list = nonPublishers.filter(function (name, index, self) {
    return (index == self.indexOf(name)) &&
      !document.getElementById(window.getConferenceSubscriberElementId(name));
  });
  var subscribers = list.map(function (name, index) {
    return new window.ConferenceSubscriberItem(name, subscribersEl, index);
  });
  var i, length = subscribers.length - 1;
  var sub;
  for(i = 0; i < length; i++) {
    sub = subscribers[i];
    sub.next = subscribers[sub.index+1];
  }
  if (subscribers.length > 0) {
    var baseSubscriberConfig = Object.assign({},
                                configuration,
                                {
                                  protocol: getSocketLocationFromProtocol().protocol,
                                  port: getSocketLocationFromProtocol().port
                                },
                                getAuthenticationParams(),
                                getUserMediaConfiguration());
    subscribers[0].execute(baseSubscriberConfig);
  }
}
```

[index #382](index.js#L382)

New room entries (a.k.a., "Subscribers") are determined based current subscribers and the current publisher, resulting in a linked-list of Subscriber instances to instantiate and start playing back streams.

> The `ConferenceSubscriberItem` is defined in [conference-subscriber.js](conference-subscriber.js).

# Notes

1. Video and Audio - at the time of this writing - cannot be "muted" prior to broadcast. This is because it is not possible to turn either "muted" track **on** after having started playback of the stream. They need to both be initially present in the `MediaStream` generated prior to being "muted" at a later time. _You can mute the Camera and Microphone after starting a broadcast._
2. A "decoy" audio player is added to subscribers whose initial stream is missing a video track. The issue appears to be browser specific (notably, Chrome and Safari) in which playback of a `video` element cannot occur if the video track is not active, and yet the audio track is.
