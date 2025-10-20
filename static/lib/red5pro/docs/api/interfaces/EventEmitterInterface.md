[**Red5 Pro WebRTC SDK vNEW-15.0.0.11-release.b189**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / EventEmitterInterface

# Interface: EventEmitterInterface

Interface for the Event Emitter.

## Properties

### off()

> **off**: (`type`, `fn`) => `void`

Remove a callback handler for an event type.

#### Parameters

##### type

`string`

##### fn

(`event`) => `void`

#### Returns

`void`

***

### on()

> **on**: (`type`, `fn`) => `void`

Assign a callback handler to an event type.

#### Parameters

##### type

`string`

##### fn

(`event`) => `void`

#### Returns

`void`

***

### trigger()

> **trigger**: (`event`) => `void`

Dispatch an event to be handled by any assigned callbacks.

#### Parameters

##### event

[`Event`](../classes/Event.md)

#### Returns

`void`
