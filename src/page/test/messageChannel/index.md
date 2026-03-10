# MesssageChannel Client

This example demonstrates using the `MessageChannel` client to open a client connection to the server in order to send and receive messages (both textual and binary) without the need of a stream.

> The `MessageChannel` client allows for messaging between clients connected on the same `DataChannel` by name without the need to broadcast or consume a stream (`WHIPClient` and `WHEPClient`, respectively).

# Usage

Because `MessageChannel` is a subclass of `WHIPClient` (the media streaming broadcaster), much of the init setup and event structure is similar.

To create and use a `MessageChannel` client (targeting a standalone server deployment):

```js
let messageChannel
try {
    const streamName = `${uuid}-message-channel`
    const configuration = {
      host: 'mydeployment.red5.net',
      streamName,
      dataChannelConfiguration: {
        name: 'my-channel-name'
      },
      connectionParams: {
        nodeGroup: 'default'
      }
    }
    messageChannel = new MessageChannel()
    messageChannel.on('*', , (event) => console.log(event))

    // See next section: Init Configuration, for more details.
    await messageChannel.init(configuration)
    await messageChannel.open()
} catch (error) {
    // Something went wrong...
}

// ... when ready to close the connection ...
messageChannel?.close()
```

# Events

Because `MessageChannel` inherits from `WHIPClient`, events unrelated to streaming - such as those related to the underlying WebRTC connection (e.g., `WebRTC.*`) - will be dispatched from `MessageChannel`.

There are a few that are specific to `MessageChannel` that are available and enumerated on the `MessageChannelEventTypes` object:

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `OPEN` | 'MessageChannel.Open' | When the message channel has successfully opened and available to send and receive messages. |
| `SEND` | 'MessageChannel.Send' | When the message channel has sent a message along the message channel. _Note: This is not confirmation that the server received the actual message._ |
| `RECEIVE` | 'MessageChannel.Receive' | When the message channel has received a message. |
| `CLOSE` | 'MessageChannel.Close' | When the message channel has been closed. |
| `FAIL` | 'MessageChannel.Fail' | When the message channel has failed to open properly. |
| `ERROR` | 'MessageChannel.Error' | When an error has occurred in opening or during a message channel session. |

# Send API

The `MessageChannel` has a few options for broadcasting messages out to other clients connected to the channel:

## send(methodName: string, data: any)

The `send` method is an override of the `MessageChannel` underlying `WHIPClient` implementation. It essentially is an override to ensure the message data is delivered on other connected clients to the specified DataChannel.

> The `data` is expected as either a string or an `Object` that can be serialized to JSON.

## sendMessage(message: any)

The `sendMessage` method is a convenience method of which the `send()` call invokes - delivering JSON data to all clients connected to the specified DataChannel

> The `message` is expected as either a string or an `Object` that can be serialized to JSON.

## sendData(data: any)

The `sendData` method will attempt to send any type of data, untouched, along the DataChannel - as such, with it comes great power; use wisely.

