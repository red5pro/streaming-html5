[**Red5 Pro WebRTC SDK vNEW-15.0.0.11-release.b189**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / MessageTransportStateEvent

# Class: MessageTransportStateEvent

Event for a Message Transport (e.g., RTCDataChannel) State within the Red5 Pro WebRTC SDK.

## Extends

- [`Event`](Event.md)

## Constructors

### Constructor

> **new MessageTransportStateEvent**(`type`, `name`, `data?`): `MessageTransportStateEvent`

Constructor for a MessageTransportStateEvent.

#### Parameters

##### type

`string`

The type of event.

##### name

`any`

The name of the message transport.

##### data?

`any`

The data associated with the event.

#### Returns

`MessageTransportStateEvent`

#### Overrides

[`Event`](Event.md).[`constructor`](Event.md#constructor)

## Accessors

### data

#### Get Signature

> **get** **data**(): `any`

Get the data associated with the event.

##### Returns

`any`

#### Inherited from

[`Event`](Event.md).[`data`](Event.md#data)

***

### name

#### Get Signature

> **get** **name**(): `any`

Get the name of the message transport.

##### Returns

`any`

***

### type

#### Get Signature

> **get** **type**(): `string`

Get the type of event.

##### Returns

`string`

#### Inherited from

[`Event`](Event.md).[`type`](Event.md#type)
