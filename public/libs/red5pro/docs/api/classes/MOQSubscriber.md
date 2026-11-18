[**Red5 Web SDK v17.0.0-beta.2**](../README.md)

***

[Red5 Web SDK](../globals.md) / MOQSubscriber

# Class: MOQSubscriber

Base class for an Event Emitter.

## Extends

- [`EventEmitter`](EventEmitter.md)

## Constructors

### Constructor

> **new MOQSubscriber**(`url?`, `element?`, `additionalOptions?`): `MOQSubscriber`

#### Parameters

##### url?

`string`

##### element?

`HTMLElement`

##### additionalOptions?

[`MOQSubscriberConfigType`](../type-aliases/MOQSubscriberConfigType.md)

#### Returns

`MOQSubscriber`

#### Overrides

[`EventEmitter`](EventEmitter.md).[`constructor`](EventEmitter.md#constructor)

## Methods

### emit()

> **emit**(`type`, `data`): `void`

#### Parameters

##### type

`string`

##### data

`any`

#### Returns

`void`

***

### getConnection()

> **getConnection**(): `MoqtConnection` \| `undefined`

#### Returns

`MoqtConnection` \| `undefined`

***

### getMessageChannel()

> **getMessageChannel**(): [`MOQMessageChannel`](MOQMessageChannel.md) \| `undefined`

#### Returns

[`MOQMessageChannel`](MOQMessageChannel.md) \| `undefined`

***

### getOptions()

> **getOptions**(): [`MOQSubscriberConfigType`](../type-aliases/MOQSubscriberConfigType.md)

#### Returns

[`MOQSubscriberConfigType`](../type-aliases/MOQSubscriberConfigType.md)

***

### getPlayer()

> **getPlayer**(): `MoqtPlayer` \| `undefined`

#### Returns

`MoqtPlayer` \| `undefined`

***

### getRendererView()

> **getRendererView**(): `HTMLCanvasElement` \| `HTMLVideoElement` \| `undefined`

#### Returns

`HTMLCanvasElement` \| `HTMLVideoElement` \| `undefined`

***

### getType()

> **getType**(): `string`

#### Returns

`string`

***

### init()

> **init**(`options`): `Promise`\<`MOQSubscriber`\>

#### Parameters

##### options

[`MOQSubscriberConfigType`](../type-aliases/MOQSubscriberConfigType.md)

#### Returns

`Promise`\<`MOQSubscriber`\>

***

### initWithAudioContext()

> **initWithAudioContext**(`options`, `audioCtx`): `Promise`\<`MOQSubscriber`\>

#### Parameters

##### options

[`MOQSubscriberConfigType`](../type-aliases/MOQSubscriberConfigType.md)

##### audioCtx

`AudioContext`

#### Returns

`Promise`\<`MOQSubscriber`\>

***

### monitorStats()

> **monitorStats**(`stats?`): `MOQSubscriber`

#### Parameters

##### stats?

[`StatsConfig`](../type-aliases/StatsConfig.md)

#### Returns

`MOQSubscriber`

***

### mute()

> **mute**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

***

### off()

> **off**(`type`, `fn`): `void`

Remove a callback handler for an event type.

#### Parameters

##### type

`string`

##### fn

(`event`) => `void`

#### Returns

`void`

#### Inherited from

[`EventEmitter`](EventEmitter.md).[`off`](EventEmitter.md#off)

***

### on()

> **on**(`type`, `fn`): `void`

Assign a callback handler to an event type.

#### Parameters

##### type

`string`

##### fn

(`event`) => `void`

#### Returns

`void`

#### Inherited from

[`EventEmitter`](EventEmitter.md).[`on`](EventEmitter.md#on)

***

### pause()

> **pause**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

***

### play()

> **play**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

***

### resume()

> **resume**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

***

### resumeAudio()

> **resumeAudio**(): `Promise`\<`void`\>

Resume the AudioContext after a user gesture.
Call from a click/tap/keydown handler when `MOQ.Audio.Blocked` fires.

#### Returns

`Promise`\<`void`\>

***

### selectAudioTrack()

> **selectAudioTrack**(`trackName`, `autoQualityResume?`): `Promise`\<`void`\>

Retune to one audio choice in the current presentation.
The second argument is accepted for compatibility and is not applied.

#### Parameters

##### trackName

`string`

##### autoQualityResume?

`boolean` = `true`

#### Returns

`Promise`\<`void`\>

***

### selectPresentation()

> **selectPresentation**(`selection`): `Promise`\<`void`\>

Stop the session and subscribe again with `selection`.
One change runs at a time. The current program, view, or audio choice
returns without a restart. A failed start restores the previous selection.

#### Parameters

##### selection

`SelectionConfig`

#### Returns

`Promise`\<`void`\>

***

### selectVideoTrack()

> **selectVideoTrack**(`track`, `autoQualityResume?`): `Promise`\<`void`\>

Switch rendition inside the current view. A different view or program
is rejected by the player and is not retuned here.

A manual switch leaves automatic quality off. Pass `true` to resume it.

#### Parameters

##### track

`string` \| `TrackRefConfig`

##### autoQualityResume?

`boolean` = `false`

#### Returns

`Promise`\<`void`\>

***

### setVolume()

> **setVolume**(`value`): `Promise`\<`void`\>

#### Parameters

##### value

`number`

#### Returns

`Promise`\<`void`\>

***

### startQlog()

> **startQlog**(`identifier`): `object`

#### Parameters

##### identifier

`string` \| `undefined`

#### Returns

`object`

##### stop

> **stop**: () => `void`

###### Returns

`void`

***

### stop()

> **stop**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

***

### stopQlog()

> **stopQlog**(): `Promise`\<\{ `blob`: `Blob`; `json`: `string`; \} \| `undefined`\>

#### Returns

`Promise`\<\{ `blob`: `Blob`; `json`: `string`; \} \| `undefined`\>

***

### subscribe()

> **subscribe**(`onPlayer?`): `Promise`\<`MOQSubscriber`\>

#### Parameters

##### onPlayer?

(`player`) => `void`

#### Returns

`Promise`\<`MOQSubscriber`\>

***

### trigger()

> **trigger**(`event`): `void`

Dispatch an event to be handled by any assigned callbacks.

#### Parameters

##### event

[`Event`](Event.md)

#### Returns

`void`

#### Inherited from

[`EventEmitter`](EventEmitter.md).[`trigger`](EventEmitter.md#trigger)

***

### unmonitorStats()

> **unmonitorStats**(): `MOQSubscriber`

#### Returns

`MOQSubscriber`

***

### unmute()

> **unmute**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

***

### unsubscribe()

> **unsubscribe**(`_internal?`, `clearCatalog?`, `callerStop?`): `Promise`\<`MOQSubscriber`\>

#### Parameters

##### \_internal?

`boolean` = `false`

##### clearCatalog?

`boolean` = `false`

##### callerStop?

`boolean` = `true`

#### Returns

`Promise`\<`MOQSubscriber`\>
