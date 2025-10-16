[**Red5 Pro WebRTC SDK vNEW-15.0.0.11-release.b189**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / PublisherEvent

# Class: PublisherEvent

Event for a Publisher within the Red5 Pro WebRTC SDK.

## Extends

- [`Event`](Event.md)

## Constructors

### Constructor

> **new PublisherEvent**(`type`, `publisher`, `data?`): `PublisherEvent`

Constructor for a PublisherEvent.

#### Parameters

##### type

`string`

The type of event.

##### publisher

`any`

The publisher (WHIPClient) that triggered the event.

##### data?

`any`

The data associated with the event.

#### Returns

`PublisherEvent`

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

### publisher

#### Get Signature

> **get** **publisher**(): `any`

Get the publisher (WHIPClient) that triggered the event.

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
