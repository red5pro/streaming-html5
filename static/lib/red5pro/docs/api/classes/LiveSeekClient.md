[**Red5 Pro WebRTC SDK vNEW-15.0.0.11-release.b189**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / LiveSeekClient

# Class: LiveSeekClient

WHEP-based Subscriber with Live Seek support.

## Extends

- [`WHEPClient`](WHEPClient.md)

## Constructors

### Constructor

> **new LiveSeekClient**(`url?`, `element?`, `additionalOptions?`): `LiveSeekClient`

Constructor for the WHEP-based Subscriber with Live Seek support.

#### Parameters

##### url?

`string`

Optional WHEP endpoint URL for the live stream.

##### element?

`HTMLMediaElement`

Optional HTMLMediaElement to use for live stream playback.

##### additionalOptions?

[`LiveSeekConfigType`](../type-aliases/LiveSeekConfigType.md)

Optional LiveSeekConfigType to use for configuration.

#### Returns

`LiveSeekClient`

#### Overrides

[`WHEPClient`](WHEPClient.md).[`constructor`](WHEPClient.md#constructor)

## Accessors

### options

#### Get Signature

> **get** **options**(): [`RTCWhepSubscriberConfigType`](../type-aliases/RTCWhepSubscriberConfigType.md) \| `undefined`

Get the options for the WHEP-based Subscriber.

##### Returns

[`RTCWhepSubscriberConfigType`](../type-aliases/RTCWhepSubscriberConfigType.md) \| `undefined`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`options`](WHEPClient.md#options)

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

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`callServer`](WHEPClient.md#callserver)

***

### disableStandby()

> **disableStandby**(): `void`

Disable standby mode for the WHEP-based Subscriber. This will signal to the server to resume audio and video.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`disableStandby`](WHEPClient.md#disablestandby)

***

### enableStandby()

> **enableStandby**(): `void`

Enable standby mode for the WHEP-based Subscriber. This will signal to the server to hold back audio and video.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`enableStandby`](WHEPClient.md#enablestandby)

***

### getDataChannel()

> **getDataChannel**(): `RTCDataChannel` \| `undefined`

Get the data channel for the WHEP-based Subscriber.

#### Returns

`RTCDataChannel` \| `undefined`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`getDataChannel`](WHEPClient.md#getdatachannel)

***

### getMediaStream()

> **getMediaStream**(): `MediaStream` \| `undefined`

Get the media stream being played back by the subscriber.

#### Returns

`MediaStream` \| `undefined`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`getMediaStream`](WHEPClient.md#getmediastream)

***

### getMessageTransport()

> **getMessageTransport**(): `MessageTransport` \| `undefined`

Get the message transport for the WHEP-based Subscriber.

#### Returns

`MessageTransport` \| `undefined`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`getMessageTransport`](WHEPClient.md#getmessagetransport)

***

### getOptions()

> **getOptions**(): [`RTCWhepSubscriberConfigType`](../type-aliases/RTCWhepSubscriberConfigType.md) \| `undefined`

Get the options for the WHEP-based Subscriber.

#### Returns

[`RTCWhepSubscriberConfigType`](../type-aliases/RTCWhepSubscriberConfigType.md) \| `undefined`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`getOptions`](WHEPClient.md#getoptions)

***

### getPeerConnection()

> **getPeerConnection**(): `RTCPeerConnection` \| `undefined`

Get the peer connection for the WHEP-based Subscriber.

#### Returns

`RTCPeerConnection` \| `undefined`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`getPeerConnection`](WHEPClient.md#getpeerconnection)

***

### getPlayer()

> **getPlayer**(): `HTMLMediaElement` \| `undefined`

Get the media element for the WHEP-based Subscriber.

#### Returns

`HTMLMediaElement` \| `undefined`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`getPlayer`](WHEPClient.md#getplayer)

***

### getType()

> **getType**(): `string`

Get the type of the WHEP-based Subscriber (RTC).

#### Returns

`string`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`getType`](WHEPClient.md#gettype)

***

### getVolume()

> **getVolume**(): `number`

Get the volume of the media being delivered to the subscriber.

#### Returns

`number`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`getVolume`](WHEPClient.md#getvolume)

***

### init()

> **init**(`options`): `Promise`\<[`WHEPClient`](WHEPClient.md)\>

Initialize the WHEP-based Subscriber with Live Seek support.

#### Parameters

##### options

[`LiveSeekConfigType`](../type-aliases/LiveSeekConfigType.md)

LiveSeekConfigType to use for configuration.

#### Returns

`Promise`\<[`WHEPClient`](WHEPClient.md)\>

#### Overrides

[`WHEPClient`](WHEPClient.md).[`init`](WHEPClient.md#init)

***

### monitorStats()

> **monitorStats**(`stats?`): [`WHEPClient`](WHEPClient.md)

Monitor the statistics of the media being delivered to the subscriber over the underlying RTCPeerConnection.

#### Parameters

##### stats?

[`StatsConfig`](../type-aliases/StatsConfig.md)

The statistics configuration.

#### Returns

[`WHEPClient`](WHEPClient.md)

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`monitorStats`](WHEPClient.md#monitorstats)

***

### mute()

> **mute**(): `void`

Mute the audio playback on the media being delivered to the subscriber.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`mute`](WHEPClient.md#mute)

***

### muteAudio()

> **muteAudio**(): `void`

Mute the audio being delivered to the subscriber.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`muteAudio`](WHEPClient.md#muteaudio)

***

### muteVideo()

> **muteVideo**(): `void`

Mute the video being delivered to the subscriber.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`muteVideo`](WHEPClient.md#mutevideo)

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

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`off`](WHEPClient.md#off)

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

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`on`](WHEPClient.md#on)

***

### pause()

> **pause**(): `void`

Pause the media being delivered to the subscriber.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`pause`](WHEPClient.md#pause)

***

### play()

> **play**(): `void`

Play the media being delivered to the subscriber.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`play`](WHEPClient.md#play)

***

### resume()

> **resume**(): `void`

Resume the media being delivered to the subscriber.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`resume`](WHEPClient.md#resume)

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

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`seekTo`](WHEPClient.md#seekto)

***

### send()

> **send**(`methodName`, `data`): `Promise`\<`boolean`\> \| `undefined`

Send a message to the Red5 Pro Server over the message transport (DataChannel).

#### Parameters

##### methodName

`string`

The method name to send.

##### data

`any`

The data to send.

#### Returns

`Promise`\<`boolean`\> \| `undefined`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`send`](WHEPClient.md#send)

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

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`sendLog`](WHEPClient.md#sendlog)

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

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`setVolume`](WHEPClient.md#setvolume)

***

### stop()

> **stop**(): `void`

Stop the media being delivered to the subscriber.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`stop`](WHEPClient.md#stop)

***

### subscribe()

> **subscribe**(): `Promise`\<[`WHEPClient`](WHEPClient.md)\>

Subscribe to the WHEP-based Subscriber.

#### Returns

`Promise`\<[`WHEPClient`](WHEPClient.md)\>

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`subscribe`](WHEPClient.md#subscribe)

***

### toggleFullScreen()

> **toggleFullScreen**(): `void`

Toggle the full screen mode of the media being delivered to the subscriber.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`toggleFullScreen`](WHEPClient.md#togglefullscreen)

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

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`trigger`](WHEPClient.md#trigger)

***

### unmonitorStats()

> **unmonitorStats**(): [`WHEPClient`](WHEPClient.md)

Unmonitor the statistics of the media being delivered to the subscriber over the underlying RTCPeerConnection.

#### Returns

[`WHEPClient`](WHEPClient.md)

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`unmonitorStats`](WHEPClient.md#unmonitorstats)

***

### unmute()

> **unmute**(): `void`

Unmute the audio playback on the media being delivered to the subscriber.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`unmute`](WHEPClient.md#unmute)

***

### unmuteAudio()

> **unmuteAudio**(): `void`

Unmute the audio being delivered to the subscriber.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`unmuteAudio`](WHEPClient.md#unmuteaudio)

***

### unmuteVideo()

> **unmuteVideo**(): `void`

Unmute the video being delivered to the subscriber.

#### Returns

`void`

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`unmuteVideo`](WHEPClient.md#unmutevideo)

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

#### Inherited from

[`WHEPClient`](WHEPClient.md).[`unsubscribe`](WHEPClient.md#unsubscribe)
