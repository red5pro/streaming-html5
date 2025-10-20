[**Red5 Pro WebRTC SDK vNEW-15.0.0.11-release.b189**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / SourceHandlerImpl

# Class: SourceHandlerImpl

A base implementation of the SourceHandler class.

## Extends

- [`SourceHandler`](SourceHandler.md)

## Constructors

### Constructor

> **new SourceHandlerImpl**(`view`, `type`): `SourceHandlerImpl`

Constructor for the SourceHandlerImpl class.

#### Parameters

##### view

`HTMLMediaElement`

The HTML media element to manage.

##### type

`string`

The type of the source handler.

#### Returns

`SourceHandlerImpl`

#### Overrides

[`SourceHandler`](SourceHandler.md).[`constructor`](SourceHandler.md#constructor)

## Methods

### attemptAutoplay()

> **attemptAutoplay**(`muteOnAutoplay`): `Promise`\<`void`\>

Attempt to autoplay the media element.

#### Parameters

##### muteOnAutoplay

`boolean` = `false`

Whether to mute the media element on autoplay if the browser has a restriction.

#### Returns

`Promise`\<`void`\>

#### Overrides

[`SourceHandler`](SourceHandler.md).[`attemptAutoplay`](SourceHandler.md#attemptautoplay)

***

### disconnect()

> **disconnect**(): `void`

Disconnect the media element.

#### Returns

`void`

#### Overrides

[`SourceHandler`](SourceHandler.md).[`disconnect`](SourceHandler.md#disconnect)

***

### getControls()

> **getControls**(): [`PlaybackControls`](PlaybackControls.md) \| `undefined`

Get the controls for the media element.

#### Returns

[`PlaybackControls`](PlaybackControls.md) \| `undefined`

#### Overrides

[`SourceHandler`](SourceHandler.md).[`getControls`](SourceHandler.md#getcontrols)

***

### getVolume()

> **getVolume**(): `number`

Get the volume of the media element.

#### Returns

`number`

#### Overrides

[`SourceHandler`](SourceHandler.md).[`getVolume`](SourceHandler.md#getvolume)

***

### isMuted()

> **isMuted**(): `boolean`

Check if the media element is muted.

#### Returns

`boolean`

#### Overrides

[`SourceHandler`](SourceHandler.md).[`isMuted`](SourceHandler.md#ismuted)

***

### isVOD()

> **isVOD**(): `boolean`

#### Returns

`boolean`

***

### mute()

> **mute**(): `void`

Mute the media element.

#### Returns

`void`

#### Overrides

[`SourceHandler`](SourceHandler.md).[`mute`](SourceHandler.md#mute)

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

[`SourceHandler`](SourceHandler.md).[`off`](SourceHandler.md#off)

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

[`SourceHandler`](SourceHandler.md).[`on`](SourceHandler.md#on)

***

### pause()

> **pause**(): `Promise`\<`boolean`\>

Pause the media element.

#### Returns

`Promise`\<`boolean`\>

#### Overrides

[`SourceHandler`](SourceHandler.md).[`pause`](SourceHandler.md#pause)

***

### play()

> **play**(): `Promise`\<`boolean`\>

Play the media element.

#### Returns

`Promise`\<`boolean`\>

#### Overrides

[`SourceHandler`](SourceHandler.md).[`play`](SourceHandler.md#play)

***

### resume()

> **resume**(): `Promise`\<`boolean`\>

Resume the media element.

#### Returns

`Promise`\<`boolean`\>

#### Overrides

[`SourceHandler`](SourceHandler.md).[`resume`](SourceHandler.md#resume)

***

### seekTo()

> **seekTo**(`percentage`, `duration`): `void`

Seek to a specific time in the media element.

#### Parameters

##### percentage

`number`

##### duration

`undefined` = `undefined`

The duration of the media element.

#### Returns

`void`

#### Overrides

[`SourceHandler`](SourceHandler.md).[`seekTo`](SourceHandler.md#seekto)

***

### setVolume()

> **setVolume**(`value`): `void`

Set the volume of the media element.

#### Parameters

##### value

`number`

The volume to set.

#### Returns

`void`

#### Overrides

[`SourceHandler`](SourceHandler.md).[`setVolume`](SourceHandler.md#setvolume)

***

### stop()

> **stop**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Overrides

[`SourceHandler`](SourceHandler.md).[`stop`](SourceHandler.md#stop)

***

### toggleFullScreen()

> **toggleFullScreen**(`element?`): `void`

Toggle the full screen mode of the media element.

#### Parameters

##### element?

`HTMLElement`

The element to toggle the full screen mode of.

#### Returns

`void`

#### Overrides

[`SourceHandler`](SourceHandler.md).[`toggleFullScreen`](SourceHandler.md#togglefullscreen)

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

[`SourceHandler`](SourceHandler.md).[`trigger`](SourceHandler.md#trigger)

***

### unmute()

> **unmute**(): `void`

Unmute the media element.

#### Returns

`void`

#### Overrides

[`SourceHandler`](SourceHandler.md).[`unmute`](SourceHandler.md#unmute)

***

### unpublish()

> **unpublish**(): `Promise`\<`void`\>

Unpublish the media element.

#### Returns

`Promise`\<`void`\>

#### Overrides

[`SourceHandler`](SourceHandler.md).[`unpublish`](SourceHandler.md#unpublish)
