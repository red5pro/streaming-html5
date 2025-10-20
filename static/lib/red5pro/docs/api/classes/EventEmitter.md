[**Red5 Pro WebRTC SDK vNEW-15.0.0.11-release.b189**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / EventEmitter

# Class: EventEmitter

Base class for an Event Emitter.

## Extended by

- [`WHIPClient`](WHIPClient.md)
- [`PlaybackControls`](PlaybackControls.md)
- [`PlaybackController`](PlaybackController.md)

## Implements

- [`EventEmitterInterface`](../interfaces/EventEmitterInterface.md)

## Constructors

### Constructor

> **new EventEmitter**(): `EventEmitter`

#### Returns

`EventEmitter`

## Methods

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

#### Implementation of

[`EventEmitterInterface`](../interfaces/EventEmitterInterface.md).[`off`](../interfaces/EventEmitterInterface.md#off)

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

#### Implementation of

[`EventEmitterInterface`](../interfaces/EventEmitterInterface.md).[`on`](../interfaces/EventEmitterInterface.md#on)

***

### trigger()

> **trigger**(`event`): `void`

Dispatch an event to be handled by any assigned callbacks.

#### Parameters

##### event

[`Event`](Event.md)

#### Returns

`void`

#### Implementation of

[`EventEmitterInterface`](../interfaces/EventEmitterInterface.md).[`trigger`](../interfaces/EventEmitterInterface.md#trigger)
