[**Red5 Pro WebRTC SDK v16.3.0-beta.4**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / MOQMessageChannel

# Class: MOQMessageChannel

Base class for an Event Emitter.

## Extends

- [`EventEmitter`](EventEmitter.md)

## Constructors

### Constructor

> **new MOQMessageChannel**(`url?`, `additionalOptions?`): `MOQMessageChannel`

#### Parameters

##### url?

`string`

##### additionalOptions?

[`MOQMessageChannelConfigType`](../type-aliases/MOQMessageChannelConfigType.md)

#### Returns

`MOQMessageChannel`

#### Overrides

[`EventEmitter`](EventEmitter.md).[`constructor`](EventEmitter.md#constructor)

## Methods

### close()

> **close**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

***

### getConnection()

> **getConnection**(): `MoqtConnection` \| `undefined`

#### Returns

`MoqtConnection` \| `undefined`

***

### getOptions()

> **getOptions**(): [`MOQMessageChannelConfigType`](../type-aliases/MOQMessageChannelConfigType.md)

#### Returns

[`MOQMessageChannelConfigType`](../type-aliases/MOQMessageChannelConfigType.md)

***

### getType()

> **getType**(): `string`

#### Returns

`string`

***

### init()

> **init**(`options`): `Promise`\<`MOQMessageChannel`\>

#### Parameters

##### options

[`MOQMessageChannelConfigType`](../type-aliases/MOQMessageChannelConfigType.md)

#### Returns

`Promise`\<`MOQMessageChannel`\>

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

### open()

> **open**(): `Promise`\<`MOQMessageChannel`\>

#### Returns

`Promise`\<`MOQMessageChannel`\>

***

### send()

> **send**(`methodName`, `data`): `Promise`\<`boolean`\>

#### Parameters

##### methodName

`string`

##### data

`any`

#### Returns

`Promise`\<`boolean`\>

***

### sendData()

> **sendData**(`data`): `Promise`\<`boolean`\>

#### Parameters

##### data

`any`

#### Returns

`Promise`\<`boolean`\>

***

### sendMessage()

> **sendMessage**(`message`): `Promise`\<`boolean`\>

#### Parameters

##### message

`any`

#### Returns

`Promise`\<`boolean`\>

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

### useConnection()

> **useConnection**(`moqtConnection`, `closeProvidedConnection?`): `MOQMessageChannel`

Provide an existing connection to reuse for channel messaging.
Call before `open()`.

#### Parameters

##### moqtConnection

`MoqtConnection`

##### closeProvidedConnection?

`boolean` = `false`

#### Returns

`MOQMessageChannel`
