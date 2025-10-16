[**Red5 Pro WebRTC SDK vNEW-15.0.0.11-release.b189**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / PlaybackControls

# Abstract Class: PlaybackControls

Base class for a PlaybackControls within the Red5 Pro WebRTC SDK.
A PlaybackControls is responsible for managing the playback and state of an HTML media element through UI controls.

## Extends

- [`EventEmitter`](EventEmitter.md)

## Constructors

### Constructor

> **new PlaybackControls**(): `PlaybackControls`

#### Returns

`PlaybackControls`

#### Inherited from

[`EventEmitter`](EventEmitter.md).[`constructor`](EventEmitter.md#constructor)

## Methods

### detach()

> `abstract` **detach**(): `void`

Detach the playback controls from the media element.

#### Returns

`void`

***

### enable()

> `abstract` **enable**(`enable`): `void`

Enable or disable the playback controls.

#### Parameters

##### enable

`boolean`

Whether the playback controls are enabled.

#### Returns

`void`

***

### getPlaybackDuration()

> `abstract` **getPlaybackDuration**(): `number`

Get the playback duration of the media element.

#### Returns

`number`

***

### getVolume()

> `abstract` **getVolume**(): `number`

Get the volume of the media element.

#### Returns

`number`

***

### off()

> **off**(`type`, `fn`): `void`

Remove an event listener from the PlaybackControls.

#### Parameters

##### type

`string`

The type of event to remove the listener from.

##### fn

(...`args`) => `void`

The function to remove the listener from.

#### Returns

`void`

#### Overrides

[`EventEmitter`](EventEmitter.md).[`off`](EventEmitter.md#off)

***

### on()

> **on**(`type`, `fn`): `void`

Add an event listener to the PlaybackControls.

#### Parameters

##### type

`string`

The type of event to listen for.

##### fn

(...`args`) => `void`

The function to call when the event is triggered.

#### Returns

`void`

#### Overrides

[`EventEmitter`](EventEmitter.md).[`on`](EventEmitter.md#on)

***

### setAsVOD()

> `abstract` **setAsVOD**(`isVOD`): `void`

Set the VOD state of the media element.

#### Parameters

##### isVOD

`boolean`

Whether the media element is a VOD.

#### Returns

`void`

***

### setMutedState()

> `abstract` **setMutedState**(`muted`): `void`

Set the muted state of the media element.

#### Parameters

##### muted

`boolean`

Whether the media element is muted.

#### Returns

`void`

***

### setPlaybackDuration()

> `abstract` **setPlaybackDuration**(`duration`): `void`

Set the playback duration of the media element.

#### Parameters

##### duration

`number`

The duration to set.

#### Returns

`void`

***

### setSeekTime()

> `abstract` **setSeekTime**(`time`, `duration?`): `void`

Set the seek time of the media element.

#### Parameters

##### time

`number`

The time to seek to.

##### duration?

`number`

The duration of the media element.

#### Returns

`void`

***

### setState()

> `abstract` **setState**(`state`): `void`

Set the state of the media element.

#### Parameters

##### state

[`PlaybackState`](../enumerations/PlaybackState.md)

The state to set.

#### Returns

`void`

***

### setVolume()

> `abstract` **setVolume**(`volume`): `void`

Set the volume of the media element.

#### Parameters

##### volume

`number`

The volume to set.

#### Returns

`void`

***

### trigger()

> **trigger**(`event`): `void`

Trigger an event on the PlaybackControls.

#### Parameters

##### event

[`Event`](Event.md)

The event to trigger.

#### Returns

`void`

#### Overrides

[`EventEmitter`](EventEmitter.md).[`trigger`](EventEmitter.md#trigger)
