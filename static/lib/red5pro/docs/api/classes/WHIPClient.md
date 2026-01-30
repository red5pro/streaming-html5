[**Red5 Pro WebRTC SDK v15.2.0-beta.1**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / WHIPClient

# Class: WHIPClient

WHIP-based Publisher.

The `WHIPClient` - under the hood - is based on the [WebRTC-HTTP ingestion](https://www.ietf.org/archive/id/draft-ietf-wish-whip-01.html)(WHIP) protocol providing the ability to negotation and establish a connection using HTTP/S requests. This removes the requirement for a WebSocket, which historically has been used for the role of negotiation and connection.
This provides a standardized - and _blazingly fast_ - way to establish and publish a live stream using WebRTC.

## Extends

- [`EventEmitter`](EventEmitter.md)

## Constructors

### Constructor

> **new WHIPClient**(`url?`, `element?`, `additionalOptions?`): `WHIPClient`

Constructor. Providing arguments will automatically kick of connection sequence.
Leaving arguments unset allows for more control and follows same pattern of init.

#### Parameters

##### url?

`string`

Optional endpoint for WHIP. Example: https://your-red5pro.com/live/whip/endpoint/stream1

##### element?

`HTMLMediaElement`

Optional media element to play media in.

##### additionalOptions?

[`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md)

Optional additional options to override defaults.

#### Returns

`WHIPClient`

#### Overrides

[`EventEmitter`](EventEmitter.md).[`constructor`](EventEmitter.md#constructor)

## Accessors

### options

#### Get Signature

> **get** **options**(): `undefined` \| [`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md)

Get the options for the WHIPClient.

##### Returns

`undefined` \| [`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md)

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

***

### getDataChannel()

> **getDataChannel**(): `undefined` \| `RTCDataChannel`

Get the DataChannel for the WHIPClient.

#### Returns

`undefined` \| `RTCDataChannel`

***

### getMediaStream()

> **getMediaStream**(): `undefined` \| `MediaStream`

Get the MediaStream generated for the WHIPClient.

#### Returns

`undefined` \| `MediaStream`

***

### getMessageTransport()

> **getMessageTransport**(): `undefined` \| `MessageTransport`

Get the MessageTransport for the WHIPClient.

#### Returns

`undefined` \| `MessageTransport`

***

### getOptions()

> **getOptions**(): `undefined` \| [`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md)

Get the options for the WHIPClient.

#### Returns

`undefined` \| [`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md)

***

### getPeerConnection()

> **getPeerConnection**(): `undefined` \| `RTCPeerConnection`

Get the PeerConnection for the WHIPClient.

#### Returns

`undefined` \| `RTCPeerConnection`

***

### getType()

> **getType**(): `string`

Get the type of the WHIPClient (RTC).

#### Returns

`string`

***

### init()

> **init**(`options`): `Promise`\<`WHIPClient`\>

Initialize the WHIPClient.

#### Parameters

##### options

[`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md)

The options to use for initialization.

#### Returns

`Promise`\<`WHIPClient`\>

***

### initWithStream()

> **initWithStream**(`options`, `stream`): `Promise`\<`WHIPClient`\>

Initialize the WHIPClient with a MediaStream. Doing so will skip the SDK attempting to generate a MediaStream through browser-based media APIs.

#### Parameters

##### options

[`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md)

The options to use for initialization.

##### stream

`MediaStream`

The stream to use for initialization.

#### Returns

`Promise`\<`WHIPClient`\>

***

### monitorStats()

> **monitorStats**(`stats?`): `WHIPClient`

Monitor the statistics of the MediaStream being published to the server over the underlying RTCPeerConnection..

#### Parameters

##### stats?

[`StatsConfig`](../type-aliases/StatsConfig.md)

The statistics configuration.

#### Returns

`WHIPClient`

***

### muteAudio()

> **muteAudio**(): `void`

Mute the audio being published to the server.

#### Returns

`void`

***

### muteVideo()

> **muteVideo**(): `void`

Mute the video being published to the server.

#### Returns

`void`

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

#### Overrides

[`EventEmitter`](EventEmitter.md).[`off`](EventEmitter.md#off)

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

#### Overrides

[`EventEmitter`](EventEmitter.md).[`on`](EventEmitter.md#on)

***

### publish()

> **publish**(`streamName?`): `Promise`\<`WHIPClient`\>

Publish the MediaStream to the server.

#### Parameters

##### streamName?

`string`

The name of the stream to publish.

#### Returns

`Promise`\<`WHIPClient`\>

***

### send()

> **send**(`methodName`, `data`): `undefined` \| `Promise`\<`boolean`\>

Send a message to the server.

#### Parameters

##### methodName

`string`

The name of the method to send.

##### data

`any`

The data to send.

#### Returns

`undefined` \| `Promise`\<`boolean`\>

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

***

### trigger()

> **trigger**(`event`): `void`

Trigger an event on the WHIPClient.

#### Parameters

##### event

[`Event`](Event.md)

The event to trigger.

#### Returns

`void`

#### Overrides

[`EventEmitter`](EventEmitter.md).[`trigger`](EventEmitter.md#trigger)

***

### unmonitorStats()

> **unmonitorStats**(): `WHIPClient`

Unmonitor the statistics of the MediaStream being published to the server over the underlying RTCPeerConnection.

#### Returns

`WHIPClient`

***

### unmuteAudio()

> **unmuteAudio**(): `void`

Unmute the audio being published to the server.

#### Returns

`void`

***

### unmuteVideo()

> **unmuteVideo**(): `void`

Unmute the video being published to the server.

#### Returns

`void`

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
