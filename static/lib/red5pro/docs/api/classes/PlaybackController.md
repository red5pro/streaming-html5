[**Red5 Pro WebRTC SDK vNEW-15.0.0.11-release.b189**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / PlaybackController

# Abstract Class: PlaybackController

Base class for a PlaybackController within the Red5 Pro WebRTC SDK.
A PlaybackController is responsible for managing the playback and state of a media element.

## Extends

- [`EventEmitter`](EventEmitter.md)

## Extended by

- [`WHEPClient`](WHEPClient.md)
- [`HLSSubscriber`](HLSSubscriber.md)
- [`SourceHandler`](SourceHandler.md)

## Constructors

### Constructor

> **new PlaybackController**(): `PlaybackController`

#### Returns

`PlaybackController`

#### Inherited from

[`EventEmitter`](EventEmitter.md).[`constructor`](EventEmitter.md#constructor)

## Methods

### getVolume()

> `abstract` **getVolume**(): `number`

Get the volume of the media element.

#### Returns

`number`

***

### mute()

> `abstract` **mute**(): `void`

Mute the media element.

#### Returns

`void`

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

#### Overrides

[`EventEmitter`](EventEmitter.md).[`off`](EventEmitter.md#off)

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

#### Overrides

[`EventEmitter`](EventEmitter.md).[`on`](EventEmitter.md#on)

***

### pause()

> `abstract` **pause**(`fromControls?`, `fromSeekAction?`): `void`

Pause the media element.

#### Parameters

##### fromControls?

`boolean`

Whether the pause was triggered from the controls.

##### fromSeekAction?

`boolean`

Whether the pause was triggered from a seek action.

#### Returns

`void`

***

### play()

> `abstract` **play**(`fromControls?`): `void`

Play the media element.

#### Parameters

##### fromControls?

`boolean`

Whether the play was triggered from the controls.

#### Returns

`void`

***

### resume()

> `abstract` **resume**(`fromControls?`, `fromSeekAction?`): `void`

Resume the media element.

#### Parameters

##### fromControls?

`boolean`

Whether the resume was triggered from the controls.

##### fromSeekAction?

`boolean`

Whether the resume was triggered from a seek action.

#### Returns

`void`

***

### seekTo()

> `abstract` **seekTo**(`value`, `duration?`, `fromControls?`): `void`

Seek to a specific time in the media element.

#### Parameters

##### value

`number`

The time to seek to.

##### duration?

`number`

The duration of the media element.

##### fromControls?

`boolean`

Whether the seek was triggered from the controls.

#### Returns

`void`

***

### setVolume()

> `abstract` **setVolume**(`value`, `fromControls?`): `void`

Set the volume of the media element.

#### Parameters

##### value

`number`

The volume to set.

##### fromControls?

`boolean`

Whether the volume was triggered from the controls.

#### Returns

`void`

***

### stop()

> `abstract` **stop**(`fromControls?`): `void`

#### Parameters

##### fromControls?

`boolean`

#### Returns

`void`

***

### toggleFullScreen()

> `abstract` **toggleFullScreen**(`element?`, `fromControls?`): `void`

Toggle the full screen mode of the media element.

#### Parameters

##### element?

`HTMLElement`

The element to toggle the full screen mode of.

##### fromControls?

`boolean`

Whether the full screen was triggered from the controls.

#### Returns

`void`

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

#### Overrides

[`EventEmitter`](EventEmitter.md).[`trigger`](EventEmitter.md#trigger)

***

### unmute()

> `abstract` **unmute**(): `void`

Unmute the media element.

#### Returns

`void`
