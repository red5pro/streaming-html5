[**Red5 Pro WebRTC SDK v16.0.0-beta.2**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / MOQPublisher

# Class: MOQPublisher

Base class for an Event Emitter.

## Extends

- [`EventEmitter`](EventEmitter.md)

## Constructors

### Constructor

> **new MOQPublisher**(`url?`, `element?`, `additionalOptions?`, `stream?`): `MOQPublisher`

#### Parameters

##### url?

`string`

##### element?

`HTMLElement`

##### additionalOptions?

`MOQPublisherConfigType`

##### stream?

`MediaStream`

#### Returns

`MOQPublisher`

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

> **getOptions**(): `MOQPublisherConfigType`

#### Returns

`MOQPublisherConfigType`

***

### getType()

> **getType**(): `string`

#### Returns

`string`

***

### init()

> **init**(`options`): `Promise`\<`MOQPublisher`\>

#### Parameters

##### options

`MOQPublisherConfigType`

#### Returns

`Promise`\<`MOQPublisher`\>

***

### initWithStream()

> **initWithStream**(`options`, `stream?`): `Promise`\<`MOQPublisher`\>

#### Parameters

##### options

`MOQPublisherConfigType`

##### stream?

`MediaStream`

#### Returns

`Promise`\<`MOQPublisher`\>

***

### monitorStats()

> **monitorStats**(`stats?`): `MOQPublisher`

#### Parameters

##### stats?

[`StatsConfig`](../type-aliases/StatsConfig.md)

#### Returns

`MOQPublisher`

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

### preview()

> **preview**(`mediaStream`): `void`

#### Parameters

##### mediaStream

`MediaStream`

#### Returns

`void`

***

### publish()

> **publish**(`streamName?`): `Promise`\<`MOQPublisher`\>

#### Parameters

##### streamName?

`string`

#### Returns

`Promise`\<`MOQPublisher`\>

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

> **unmonitorStats**(): `MOQPublisher`

#### Returns

`MOQPublisher`

***

### unpreview()

> **unpreview**(): `void`

#### Returns

`void`

***

### unpublish()

> **unpublish**(`_internal?`): `Promise`\<`MOQPublisher`\>

#### Parameters

##### \_internal?

`boolean` = `false`

#### Returns

`Promise`\<`MOQPublisher`\>
