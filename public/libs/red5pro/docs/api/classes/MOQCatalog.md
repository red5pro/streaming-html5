[**Red5 Pro WebRTC SDK v16.0.0-beta.1**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / MOQCatalog

# Class: MOQCatalog

Base class for an Event Emitter.

## Extends

- [`EventEmitter`](EventEmitter.md)

## Constructors

### Constructor

> **new MOQCatalog**(`url?`, `additionalOptions?`): `MOQCatalog`

#### Parameters

##### url?

`string`

##### additionalOptions?

`MOQCatalogConfigType`

#### Returns

`MOQCatalog`

#### Overrides

[`EventEmitter`](EventEmitter.md).[`constructor`](EventEmitter.md#constructor)

## Methods

### \_generateConnection()

> **\_generateConnection**(`options`): `Promise`\<\{ `adapter`: `MoqtConnection`; `transport`: `WebTransportLike`; \}\>

#### Parameters

##### options

`MOQCatalogConfigType`

#### Returns

`Promise`\<\{ `adapter`: `MoqtConnection`; `transport`: `WebTransportLike`; \}\>

***

### fetch()

> **fetch**(`namespace?`, `fetchOptions?`): `Promise`\<`MOQCatalog`\>

#### Parameters

##### namespace?

`string`

##### fetchOptions?

###### endGroup

`number`

###### endObject

`number`

###### startGroup

`number`

###### startObject

`number`

#### Returns

`Promise`\<`MOQCatalog`\>

***

### getOptions()

> **getOptions**(): `MOQCatalogConfigType`

#### Returns

`MOQCatalogConfigType`

***

### init()

> **init**(`options`): `Promise`\<`MOQCatalog`\>

#### Parameters

##### options

`MOQCatalogConfigType`

#### Returns

`Promise`\<`MOQCatalog`\>

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

### subscribe()

> **subscribe**(`namespace?`): `Promise`\<`MOQCatalog`\>

#### Parameters

##### namespace?

`string`

#### Returns

`Promise`\<`MOQCatalog`\>

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

### unsubscribe()

> **unsubscribe**(`_internal?`): `Promise`\<`void`\>

#### Parameters

##### \_internal?

`boolean` = `false`

#### Returns

`Promise`\<`void`\>
