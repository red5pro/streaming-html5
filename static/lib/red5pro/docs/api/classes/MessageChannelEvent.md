[**Red5 Pro WebRTC SDK v15.4.0**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / MessageChannelEvent

# Class: MessageChannelEvent

Event for a MessageChannel within the Red5 Pro WebRTC SDK.

## Extends

- [`Event`](Event.md)

## Constructors

### Constructor

> **new MessageChannelEvent**(`type`, `messageChannel`, `data?`): `MessageChannelEvent`

Constructor for a MessageChannelEvent.

#### Parameters

##### type

`string`

The type of event.

##### messageChannel

`any`

The message channel (MessageChannel) that triggered the event.

##### data?

`any`

The data associated with the event.

#### Returns

`MessageChannelEvent`

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

### messageChannel

#### Get Signature

> **get** **messageChannel**(): `any`

Get the message channel (MessageChannel) that triggered the event.

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
