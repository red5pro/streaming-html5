[**Red5 Pro WebRTC SDK v15.2.0-beta.1**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / HLSSubscriber

# Class: HLSSubscriber

HLS Subscriber. Supports playback of HLS streams using the native HLS player in browsers that support it (i.e., Mobile and Desktop Safari).

## Extends

- [`PlaybackController`](PlaybackController.md)

## Constructors

### Constructor

> **new HLSSubscriber**(): `HLSSubscriber`

#### Returns

`HLSSubscriber`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`constructor`](PlaybackController.md#constructor)

## Accessors

### fileURL

#### Get Signature

> **get** **fileURL**(): `undefined` \| `string`

Get the file URL of the HLS stream.

##### Returns

`undefined` \| `string`

***

### options

#### Get Signature

> **get** **options**(): `undefined` \| [`HLSSubscriberConfigType`](../type-aliases/HLSSubscriberConfigType.md)

Get the options of the HLS stream.

##### Returns

`undefined` \| [`HLSSubscriberConfigType`](../type-aliases/HLSSubscriberConfigType.md)

## Methods

### getFileURL()

> **getFileURL**(): `undefined` \| `string`

Get the file URL of the HLS stream.

#### Returns

`undefined` \| `string`

***

### getOptions()

> **getOptions**(): `undefined` \| [`HLSSubscriberConfigType`](../type-aliases/HLSSubscriberConfigType.md)

Get the options of the HLS stream.

#### Returns

`undefined` \| [`HLSSubscriberConfigType`](../type-aliases/HLSSubscriberConfigType.md)

***

### getPlayer()

> **getPlayer**(): `undefined` \| `HTMLMediaElement`

Get the playback element of the HLS stream.

#### Returns

`undefined` \| `HTMLMediaElement`

***

### getType()

> **getType**(): `string`

Get the type of the subscriber (HLS).

#### Returns

`string`

***

### getVolume()

> **getVolume**(): `number`

Get the volume of the HLS stream.

#### Returns

`number`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`getVolume`](PlaybackController.md#getvolume)

***

### init()

> **init**(`options`): `Promise`\<`HLSSubscriber`\>

Initialize the HLS Subscriber.

#### Parameters

##### options

[`HLSSubscriberConfigType`](../type-aliases/HLSSubscriberConfigType.md)

#### Returns

`Promise`\<`HLSSubscriber`\>

***

### mute()

> **mute**(): `void`

Mute the HLS stream.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`mute`](PlaybackController.md#mute)

***

### off()

> **off**(`event`, `fn`): `void`

Remove an event listener from the PlaybackController.

#### Parameters

##### event

`string`

The event to remove the listener from.

##### fn

(...`args`) => `void`

The function to remove the listener from.

#### Returns

`void`

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`off`](PlaybackController.md#off)

***

### on()

> **on**(`event`, `fn`): `void`

Add an event listener to the PlaybackController.

#### Parameters

##### event

`string`

The event to listen for.

##### fn

(...`args`) => `void`

The function to call when the event is triggered.

#### Returns

`void`

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`on`](PlaybackController.md#on)

***

### pause()

> **pause**(): `void`

Pause the HLS stream.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`pause`](PlaybackController.md#pause)

***

### play()

> **play**(): `void`

Play the HLS stream.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`play`](PlaybackController.md#play)

***

### resume()

> **resume**(): `void`

Resume the HLS stream.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`resume`](PlaybackController.md#resume)

***

### seekTo()

> **seekTo**(`time`): `void`

Seek to a specific time in the HLS stream.

#### Parameters

##### time

`number`

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`seekTo`](PlaybackController.md#seekto)

***

### setVolume()

> **setVolume**(`value`): `void`

Set the volume of the HLS stream.

#### Parameters

##### value

`number`

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`setVolume`](PlaybackController.md#setvolume)

***

### stop()

> **stop**(): `void`

Stop the HLS stream.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`stop`](PlaybackController.md#stop)

***

### subscribe()

> **subscribe**(): `Promise`\<`HLSSubscriber`\>

Subscribe to the HLS stream.

#### Returns

`Promise`\<`HLSSubscriber`\>

***

### toggleFullScreen()

> **toggleFullScreen**(): `void`

Toggle the full screen of the HLS stream.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`toggleFullScreen`](PlaybackController.md#togglefullscreen)

***

### trigger()

> **trigger**(`event`): `void`

Trigger an event on the PlaybackController.

#### Parameters

##### event

[`Event`](Event.md)

The event to trigger.

#### Returns

`void`

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`trigger`](PlaybackController.md#trigger)

***

### unmute()

> **unmute**(): `void`

Unmute the HLS stream.

#### Returns

`void`

#### Overrides

[`PlaybackController`](PlaybackController.md).[`unmute`](PlaybackController.md#unmute)

***

### unsubscribe()

> **unsubscribe**(): `Promise`\<`HLSSubscriber`\>

Unsubscribe from the HLS stream.

#### Returns

`Promise`\<`HLSSubscriber`\>
