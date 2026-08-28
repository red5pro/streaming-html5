[**Red5 Pro WebRTC SDK v16.1.0-beta.2**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / MOQSubscriber

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

`MOQSubscriberConfigType`

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

### getOptions()

> **getOptions**(): `MOQSubscriberConfigType`

#### Returns

`MOQSubscriberConfigType`

***

### getPlayer()

> **getPlayer**(): `MoqtPlayer` \| `undefined`

#### Returns

`MoqtPlayer` \| `undefined`

***

### getRendererView()

> **getRendererView**(): `HTMLVideoElement` \| `HTMLCanvasElement` \| `undefined`

#### Returns

`HTMLVideoElement` \| `HTMLCanvasElement` \| `undefined`

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

`MOQSubscriberConfigType`

#### Returns

`Promise`\<`MOQSubscriber`\>

***

### initWithAudioContext()

> **initWithAudioContext**(`options`, `audioCtx`): `Promise`\<`MOQSubscriber`\>

#### Parameters

##### options

`MOQSubscriberConfigType`

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

#### Parameters

##### trackName

`string`

##### autoQualityResume?

`boolean` = `true`

#### Returns

`Promise`\<`void`\>

***

### selectVideoTrack()

> **selectVideoTrack**(`trackName`, `autoQualityResume?`): `Promise`\<`void`\>

#### Parameters

##### trackName

`string`

##### autoQualityResume?

`boolean` = `true`

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

> **subscribe**(): `Promise`\<`MOQSubscriber`\>

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

> **unsubscribe**(`_internal?`, `clearCatalog?`): `Promise`\<`MOQSubscriber`\>

#### Parameters

##### \_internal?

`boolean` = `false`

##### clearCatalog?

`boolean` = `false`

#### Returns

`Promise`\<`MOQSubscriber`\>
