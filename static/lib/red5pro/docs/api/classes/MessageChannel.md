[**Red5 Pro WebRTC SDK v15.3.0**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / MessageChannel

# Class: MessageChannel

MessageChannel is a subclass of WHIPClient that provides a data channel for sending and receiving messages only.
_There is no underlying media streaming logic in this client._

This ingest-based client is useful for sending and receiving messages to and from the server over a designated data channel.

## Extends

- [`WHIPClient`](WHIPClient.md)

## Constructors

### Constructor

> **new MessageChannel**(`url`, `additionalOptions?`): `MessageChannel`

#### Parameters

##### url

`undefined` | `string`

##### additionalOptions?

[`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md)

#### Returns

`MessageChannel`

#### Overrides

[`WHIPClient`](WHIPClient.md).[`constructor`](WHIPClient.md#constructor)

## Accessors

### options

#### Get Signature

> **get** **options**(): `undefined` \| [`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md)

Get the options for the WHIPClient.

##### Returns

`undefined` \| [`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md)

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`options`](WHIPClient.md#options)

## Methods

### callServer()

> **callServer**(`methodName`, `args`): `Promise`\<`any`\>

Call a method on the server.

#### Parameters

##### methodName

`string`

The name of the method to call.

##### args

`any`

The arguments to call the method with.

#### Returns

`Promise`\<`any`\>

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`callServer`](WHIPClient.md#callserver)

***

### close()

> **close**(): `Promise`\<`void`\>

Close the MessageChannel.

#### Returns

`Promise`\<`void`\>

***

### emit()

> **emit**(`type`, `data`): `void`

Emit an event on the WHIPClient.

#### Parameters

##### type

`string`

The type of event to emit.

##### data

`any`

The data to emit.

#### Returns

`void`

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`emit`](WHIPClient.md#emit)

***

### getDataChannel()

> **getDataChannel**(): `undefined` \| `RTCDataChannel`

Get the DataChannel for the WHIPClient.

#### Returns

`undefined` \| `RTCDataChannel`

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`getDataChannel`](WHIPClient.md#getdatachannel)

***

### getMediaStream()

> **getMediaStream**(): `undefined` \| `MediaStream`

Get the MediaStream generated for the WHIPClient.

#### Returns

`undefined` \| `MediaStream`

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`getMediaStream`](WHIPClient.md#getmediastream)

***

### getMessageTransport()

> **getMessageTransport**(): `undefined` \| `MessageTransport`

Get the MessageTransport for the WHIPClient.

#### Returns

`undefined` \| `MessageTransport`

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`getMessageTransport`](WHIPClient.md#getmessagetransport)

***

### getOptions()

> **getOptions**(): `undefined` \| [`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md)

Get the options for the WHIPClient.

#### Returns

`undefined` \| [`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md)

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`getOptions`](WHIPClient.md#getoptions)

***

### getPeerConnection()

> **getPeerConnection**(): `undefined` \| `RTCPeerConnection`

Get the PeerConnection for the WHIPClient.

#### Returns

`undefined` \| `RTCPeerConnection`

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`getPeerConnection`](WHIPClient.md#getpeerconnection)

***

### getPubNubClient()

> **getPubNubClient**(): `undefined` \| [`PubNubClient`](PubNubClient.md)

Get the PubNub client for the WHIPClient.

#### Returns

`undefined` \| [`PubNubClient`](PubNubClient.md)

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`getPubNubClient`](WHIPClient.md#getpubnubclient)

***

### getType()

> **getType**(): `string`

Get the type of the MessageChannel.

#### Returns

`string`

#### Overrides

[`WHIPClient`](WHIPClient.md).[`getType`](WHIPClient.md#gettype)

***

### init()

> **init**(`options`): `Promise`\<`MessageChannel`\>

Initialize the MessageChannel.

#### Parameters

##### options

[`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md)

The options to initialize the MessageChannel with. See [RTCWhipPublisherConfigType](../type-aliases/RTCWhipPublisherConfigType.md) for more details.

#### Returns

`Promise`\<`MessageChannel`\>

#### Overrides

[`WHIPClient`](WHIPClient.md).[`init`](WHIPClient.md#init)

***

### initWithStream()

> **initWithStream**(`options`, `stream`): `Promise`\<`MessageChannel`\>

Initialize the WHIPClient with a MediaStream. Doing so will skip the SDK attempting to generate a MediaStream through browser-based media APIs.

#### Parameters

##### options

[`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md)

The options to use for initialization.

##### stream

`MediaStream`

The stream to use for initialization.

#### Returns

`Promise`\<`MessageChannel`\>

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`initWithStream`](WHIPClient.md#initwithstream)

***

### monitorStats()

> **monitorStats**(`stats?`): [`WHIPClient`](WHIPClient.md)

Monitor the statistics of the MediaStream being published to the server over the underlying RTCPeerConnection..

#### Parameters

##### stats?

[`StatsConfig`](../type-aliases/StatsConfig.md)

The statistics configuration.

#### Returns

[`WHIPClient`](WHIPClient.md)

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`monitorStats`](WHIPClient.md#monitorstats)

***

### muteAudio()

> **muteAudio**(): `void`

Mute the audio being published to the server.

#### Returns

`void`

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`muteAudio`](WHIPClient.md#muteaudio)

***

### muteVideo()

> **muteVideo**(): `void`

Mute the video being published to the server.

#### Returns

`void`

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`muteVideo`](WHIPClient.md#mutevideo)

***

### off()

> **off**(`type`, `fn`): `void`

Remove an event listener from the WHIPClient.

#### Parameters

##### type

`string`

The type of event to remove the listener from.

##### fn

(`event`) => `void`

The function to remove the listener from.

#### Returns

`void`

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`off`](WHIPClient.md#off)

***

### on()

> **on**(`type`, `fn`): `void`

Add an event listener to the WHIPClient.

#### Parameters

##### type

`string`

The type of event to listen for.

##### fn

(`event`) => `void`

The function to call when the event is triggered.

#### Returns

`void`

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`on`](WHIPClient.md#on)

***

### open()

> **open**(`inactivePingIntervalMS`): `Promise`\<`MessageChannel`\>

Open the MessageChannel.

#### Parameters

##### inactivePingIntervalMS

`number` = `10000`

The interval in milliseconds to send an inactive ping.

#### Returns

`Promise`\<`MessageChannel`\>

***

### publish()

> **publish**(`streamName?`): `Promise`\<`MessageChannel`\>

Publish the MediaStream to the server.

#### Parameters

##### streamName?

`string`

The name of the stream to publish.

#### Returns

`Promise`\<`MessageChannel`\>

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`publish`](WHIPClient.md#publish)

***

### send()

> **send**(`methodName`, `data`): `Promise`\<`undefined` \| `boolean`\>

Send a JSON message to the server over the data channel.
 - Overrides the send method in the WHIPClient class to properly wrap the data in a message object with methodName.

#### Parameters

##### methodName

`string`

The name of the method to send.

##### data

`any`

The data to send.

#### Returns

`Promise`\<`undefined` \| `boolean`\>

#### Overrides

[`WHIPClient`](WHIPClient.md).[`send`](WHIPClient.md#send)

***

### sendData()

> **sendData**(`data`): `Promise`\<`boolean`\>

Send data to the server over the data channel.

#### Parameters

##### data

`any`

The data to send. Can be of any type, such as an arraybuffer.

#### Returns

`Promise`\<`boolean`\>

***

### sendLog()

> **sendLog**(`level`, `message`): `void`

Send a log message to the server.

#### Parameters

##### level

`string`

The level of the log message.

##### message

`any`

The message to send.

#### Returns

`void`

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`sendLog`](WHIPClient.md#sendlog)

***

### sendMessage()

> **sendMessage**(`message`): `Promise`\<`boolean`\>

Send a message to the server over the data channel. This will attempt to wrap and send the message as a JSON payload.

#### Parameters

##### message

`any`

The message to send.

#### Returns

`Promise`\<`boolean`\>

#### See

[sendData](#senddata) for sending raw data to the server over the data channel.

***

### sendPubNub()

> **sendPubNub**(`channel`, `message`): `Promise`\<`boolean`\>

Send a message to the PubNub channel.

#### Parameters

##### channel

`string`

The channel to send the message to.

##### message

`any`

The message to send.

#### Returns

`Promise`\<`boolean`\>

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`sendPubNub`](WHIPClient.md#sendpubnub)

***

### subscribePubNub()

> **subscribePubNub**(`channel`, `options`): `Promise`\<`boolean`\>

Subscribe to a PubNub channel.

#### Parameters

##### channel

`string`

The channel to subscribe to.

##### options

`any`

The options to use for subscription.

#### Returns

`Promise`\<`boolean`\>

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`subscribePubNub`](WHIPClient.md#subscribepubnub)

***

### trigger()

> **trigger**(`event`): `void`

Trigger an event on the MessageChannel.

#### Parameters

##### event

[`Event`](Event.md)

The event to trigger.
 - Overrides the trigger method in the WHIPClient class to properly trigger the event on the MessageChannel.

#### Returns

`void`

#### Overrides

[`WHIPClient`](WHIPClient.md).[`trigger`](WHIPClient.md#trigger)

***

### unmonitorStats()

> **unmonitorStats**(): [`WHIPClient`](WHIPClient.md)

Unmonitor the statistics of the MediaStream being published to the server over the underlying RTCPeerConnection.

#### Returns

[`WHIPClient`](WHIPClient.md)

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`unmonitorStats`](WHIPClient.md#unmonitorstats)

***

### unmuteAudio()

> **unmuteAudio**(): `void`

Unmute the audio being published to the server.

#### Returns

`void`

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`unmuteAudio`](WHIPClient.md#unmuteaudio)

***

### unmuteVideo()

> **unmuteVideo**(): `void`

Unmute the video being published to the server.

#### Returns

`void`

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`unmuteVideo`](WHIPClient.md#unmutevideo)

***

### unpublish()

> **unpublish**(`internal`): `Promise`\<`void`\>

Unpublish the MediaStream from the server.

#### Parameters

##### internal

`boolean` = `false`

Whether the unpublish is internal (i.e. not triggered by the user).

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`unpublish`](WHIPClient.md#unpublish)

***

### unsubscribePubNub()

> **unsubscribePubNub**(`channel`): `Promise`\<`boolean`\>

Unsubscribe from a PubNub channel.

#### Parameters

##### channel

`string`

The channel to unsubscribe from.

#### Returns

`Promise`\<`boolean`\>

#### Inherited from

[`WHIPClient`](WHIPClient.md).[`unsubscribePubNub`](WHIPClient.md#unsubscribepubnub)
