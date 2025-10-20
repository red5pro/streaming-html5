[**Red5 Pro WebRTC SDK vNEW-15.0.0.11-release.b189**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / SourceHandler

# Abstract Class: SourceHandler

Base class for a SourceHandler within the Red5 Pro WebRTC SDK.
A SourceHandler is responsible for managing the MediaStream source of a media element.

## Extends

- [`PlaybackController`](PlaybackController.md)

## Extended by

- [`SourceHandlerImpl`](SourceHandlerImpl.md)

## Constructors

### Constructor

> **new SourceHandler**(): `SourceHandler`

#### Returns

`SourceHandler`

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`constructor`](PlaybackController.md#constructor)

## Methods

### attemptAutoplay()

> `abstract` **attemptAutoplay**(`muteOnAutoplay`): `void`

Attempt to autoplay the media element.

#### Parameters

##### muteOnAutoplay

`boolean`

Whether to mute the media element on autoplay if the browser has a restriction.

#### Returns

`void`

***

### disconnect()

> `abstract` **disconnect**(): `void`

Disconnect the media element.

#### Returns

`void`

***

### getControls()

> `abstract` **getControls**(): [`PlaybackControls`](PlaybackControls.md) \| `undefined`

Get the controls for the media element.

#### Returns

[`PlaybackControls`](PlaybackControls.md) \| `undefined`

***

### getVolume()

> `abstract` **getVolume**(): `number`

Get the volume of the media element.

#### Returns

`number`

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`getVolume`](PlaybackController.md#getvolume)

***

### isMuted()

> `abstract` **isMuted**(): `boolean`

Check if the media element is muted.

#### Returns

`boolean`

***

### mute()

> `abstract` **mute**(): `void`

Mute the media element.

#### Returns

`void`

#### Inherited from

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

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`pause`](PlaybackController.md#pause)

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

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`play`](PlaybackController.md#play)

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

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`resume`](PlaybackController.md#resume)

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

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`seekTo`](PlaybackController.md#seekto)

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

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`setVolume`](PlaybackController.md#setvolume)

***

### stop()

> `abstract` **stop**(`fromControls?`): `void`

#### Parameters

##### fromControls?

`boolean`

#### Returns

`void`

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`stop`](PlaybackController.md#stop)

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

#### Inherited from

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

> `abstract` **unmute**(): `void`

Unmute the media element.

#### Returns

`void`

#### Inherited from

[`PlaybackController`](PlaybackController.md).[`unmute`](PlaybackController.md#unmute)

***

### unpublish()

> `abstract` **unpublish**(): `void`

Unpublish the media element.

#### Returns

`void`
