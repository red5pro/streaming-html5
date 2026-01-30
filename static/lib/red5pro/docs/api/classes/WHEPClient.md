[**Red5 Pro WebRTC SDK v15.2.0-beta.1**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / WHEPClient

# Class: WHEPClient

WHEP-based Subscriber.

The `WHEPClient` - under the hood - is based on the [WebRTC-HTTP egress](https://www.ietf.org/archive/id/draft-ietf-wish-whep-03.html)(WHEP) protocol providing the ability to negotation and establish a connection using HTTP/S requests. This removes the requirement for a WebSocket, which historically has been used for the role of negotiation and connection.
This provides a standardized - and _blazingly fast_ - way to establish and playback a live stream using WebRTC.

## Extends

- [`PlaybackController`](PlaybackController.md)

## Extended by

- [`LiveSeekClient`](LiveSeekClient.md)

## Constructors

### Constructor

> **new WHEPClient**(`url?`, `element?`, `additionalOptions?`): `WHEPClient`

Constructor for the WHEP-based Subscriber.

#### Parameters

##### url?

`string`

Optional WHEP endpoint URL for the live stream.

##### element?

`HTMLMediaElement`

Optional HTMLMediaElement to use for live stream playback.

##### additionalOptions?

[`RTCWhepSubscriberConfigType`](../type-aliases/RTCWhepSubscriberConfigType.md)

Optional RTCWhepSubscriberConfigType to use for configuration.

#### Returns

`WHEPClient`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`constructor`](PlaybackController.md#constructor)

## Accessors

### options

#### Get Signature

> **get** **options**(): `undefined` \| [`RTCWhepSubscriberConfigType`](../type-aliases/RTCWhepSubscriberConfigType.md)

Get the options for the WHEP-based Subscriber.

##### Returns

`undefined` \| [`RTCWhepSubscriberConfigType`](../type-aliases/RTCWhepSubscriberConfigType.md)

## Methods

### callServer()

> **callServer**(`methodName`, `args`): `Promise`\<`any`\>

Call a method on the Red5 Pro Server over the message transport (DataChannel).

#### Parameters

##### methodName

`string`

The method name to call.

##### args

`any`

The arguments to call the method with.

#### Returns

`Promise`\<`any`\>

***

### disableStandby()

> **disableStandby**(): `void`

Disable standby mode for the WHEP-based Subscriber. This will signal to the server to resume audio and video.

#### Returns

`void`

***

### emit()

> **emit**(`type`, `data`): `void`

Emit an event on the WHEP-based Subscriber.

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

### enableStandby()

> **enableStandby**(): `void`

Enable standby mode for the WHEP-based Subscriber. This will signal to the server to hold back audio and video.

#### Returns

`void`

***

### getDataChannel()

> **getDataChannel**(): `undefined` \| `RTCDataChannel`

Get the data channel for the WHEP-based Subscriber.

#### Returns

`undefined` \| `RTCDataChannel`

***

### getMediaStream()

> **getMediaStream**(): `undefined` \| `MediaStream`

Get the media stream being played back by the subscriber.

#### Returns

`undefined` \| `MediaStream`

***

### getMessageTransport()

> **getMessageTransport**(): `undefined` \| `MessageTransport`

Get the message transport for the WHEP-based Subscriber.

#### Returns

`undefined` \| `MessageTransport`

***

### getOptions()

> **getOptions**(): `undefined` \| [`RTCWhepSubscriberConfigType`](../type-aliases/RTCWhepSubscriberConfigType.md)

Get the options for the WHEP-based Subscriber.

#### Returns

`undefined` \| [`RTCWhepSubscriberConfigType`](../type-aliases/RTCWhepSubscriberConfigType.md)

***

### getPeerConnection()

> **getPeerConnection**(): `undefined` \| `RTCPeerConnection`

Get the peer connection for the WHEP-based Subscriber.

#### Returns

`undefined` \| `RTCPeerConnection`

***

### getPlayer()

> **getPlayer**(): `undefined` \| `HTMLMediaElement`

Get the media element for the WHEP-based Subscriber.

#### Returns

`undefined` \| `HTMLMediaElement`

***

### getType()

> **getType**(): `string`

Get the type of the WHEP-based Subscriber (RTC).

#### Returns

`string`

***

### getVolume()

> **getVolume**(): `number`

Get the volume of the media being delivered to the subscriber.

#### Returns

`number`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`getVolume`](PlaybackController.md#getvolume)

***

### init()

> **init**(`options`): `Promise`\<`WHEPClient`\>

Initialize the WHEP-based Subscriber.

#### Parameters

##### options

[`RTCWhepSubscriberConfigType`](../type-aliases/RTCWhepSubscriberConfigType.md)

RTCWhepSubscriberConfigType to use for configuration.

#### Returns

`Promise`\<`WHEPClient`\>

***

### monitorStats()

> **monitorStats**(`stats?`, `renegotiationPolicy?`): `WHEPClient`

Monitor the statistics of the media being delivered to the subscriber over the underlying RTCPeerConnection.

#### Parameters

##### stats?

[`StatsConfig`](../type-aliases/StatsConfig.md)

The statistics configuration.

##### renegotiationPolicy?

`RenegotiationPolicyType`

The renegotiation policy configuration.

#### Returns

`WHEPClient`

***

### mute()

> **mute**(): `void`

Mute the audio playback on the media being delivered to the subscriber.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`mute`](PlaybackController.md#mute)

***

### muteAudio()

> **muteAudio**(): `void`

Mute the audio being delivered to the subscriber.

#### Returns

`void`

***

### muteVideo()

> **muteVideo**(): `void`

Mute the video being delivered to the subscriber.

#### Returns

`void`

***

### off()

> **off**(`type`, `fn`): `void`

Remove an event listener from the WHEP-based Subscriber.

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

[`PlaybackController`](PlaybackController.md).[`off`](PlaybackController.md#off)

***

### on()

> **on**(`type`, `fn`): `void`

Add an event listener to the WHEP-based Subscriber.

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

[`PlaybackController`](PlaybackController.md).[`on`](PlaybackController.md#on)

***

### pause()

> **pause**(): `void`

Pause the media being delivered to the subscriber.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`pause`](PlaybackController.md#pause)

***

### play()

> **play**(): `void`

Play the media being delivered to the subscriber.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`play`](PlaybackController.md#play)

***

### resume()

> **resume**(): `void`

Resume the media being delivered to the subscriber.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`resume`](PlaybackController.md#resume)

***

### seekTo()

> **seekTo**(`time`): `void`

Seek to a specific time in the media being delivered to the subscriber.

#### Parameters

##### time

`number`

The time to seek to.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`seekTo`](PlaybackController.md#seekto)

***

### send()

> **send**(`methodName`, `data`): `undefined` \| `Promise`\<`boolean`\>

Send a message to the Red5 Pro Server over the message transport (DataChannel).

#### Parameters

##### methodName

`string`

The method name to send.

##### data

`any`

The data to send.

#### Returns

`undefined` \| `Promise`\<`boolean`\>

***

### sendLog()

> **sendLog**(`level`, `message`): `void`

Send a log message to the Red5 Pro Server over the message transport (DataChannel).

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

### setVolume()

> **setVolume**(`value`): `void`

Set the volume of the media being delivered to the subscriber.

#### Parameters

##### value

`number`

The volume to set.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`setVolume`](PlaybackController.md#setvolume)

***

### stop()

> **stop**(): `void`

Stop the media being delivered to the subscriber.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`stop`](PlaybackController.md#stop)

***

### subscribe()

> **subscribe**(): `Promise`\<`WHEPClient`\>

Subscribe to the WHEP-based Subscriber.

#### Returns

`Promise`\<`WHEPClient`\>

***

### toggleFullScreen()

> **toggleFullScreen**(): `void`

Toggle the full screen mode of the media being delivered to the subscriber.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`toggleFullScreen`](PlaybackController.md#togglefullscreen)

***

### trigger()

> **trigger**(`event`): `void`

Trigger an event on the WHEP-based Subscriber.

#### Parameters

##### event

[`Event`](Event.md)

The event to trigger.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`trigger`](PlaybackController.md#trigger)

***

### unmonitorStats()

> **unmonitorStats**(): `WHEPClient`

Unmonitor the statistics of the media being delivered to the subscriber over the underlying RTCPeerConnection.

#### Returns

`WHEPClient`

***

### unmute()

> **unmute**(): `void`

Unmute the audio playback on the media being delivered to the subscriber.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`unmute`](PlaybackController.md#unmute)

***

### unmuteAudio()

> **unmuteAudio**(): `void`

Unmute the audio being delivered to the subscriber.

#### Returns

`void`

***

### unmuteVideo()

> **unmuteVideo**(): `void`

Unmute the video being delivered to the subscriber.

#### Returns

`void`

***

### unsubscribe()

> **unsubscribe**(`internal`): `Promise`\<`void`\>

Unsubscribe from the WHEP-based Subscriber.

#### Parameters

##### internal

`boolean` = `false`

Optional boolean to indicate if the unsubscribe is internal.

#### Returns

`Promise`\<`void`\>
