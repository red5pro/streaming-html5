[**Red5 Pro WebRTC SDK v15.2.0**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / PubNubClient

# Class: PubNubClient

Base class for an Event Emitter.

## Extends

- [`EventEmitter`](EventEmitter.md)

## Constructors

### Constructor

> **new PubNubClient**(): `PubNubClient`

#### Returns

`PubNubClient`

#### Overrides

[`EventEmitter`](EventEmitter.md).[`constructor`](EventEmitter.md#constructor)

## Accessors

### config

#### Get Signature

> **get** **config**(): `undefined` \| `PubnubConfigType`

##### Returns

`undefined` \| `PubnubConfigType`

***

### pubnub

#### Get Signature

> **get** **pubnub**(): `any`

##### Returns

`any`

## Methods

### destroy()

> **destroy**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

***

### getOptions()

> **getOptions**(): `undefined` \| `PubnubConfigType`

#### Returns

`undefined` \| `PubnubConfigType`

***

### init()

> **init**(`config`): `Promise`\<`PubNubClient`\>

#### Parameters

##### config

`any`

#### Returns

`Promise`\<`PubNubClient`\>

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

### publishMessage()

> **publishMessage**(`channel`, `message`): `Promise`\<`boolean`\>

#### Parameters

##### channel

`string`

##### message

`any`

#### Returns

`Promise`\<`boolean`\>

***

### subscribe()

> **subscribe**(`channel`, `options`): `Promise`\<`boolean`\>

#### Parameters

##### channel

`string`

##### options

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

### unsubscribe()

> **unsubscribe**(`channel`): `Promise`\<`boolean`\>

#### Parameters

##### channel

`string`

#### Returns

`Promise`\<`boolean`\>
