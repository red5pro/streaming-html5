[**Red5 Pro WebRTC SDK v15.4.0**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / PubNubEvent

# Class: PubNubEvent

Event for a PubNub within the Red5 Pro WebRTC SDK.

## Extends

- [`Event`](Event.md)

## Constructors

### Constructor

> **new PubNubEvent**(`type`, `pubnub`, `data?`): `PubNubEvent`

Constructor for a PubNubEvent.

#### Parameters

##### type

`string`

The type of event.

##### pubnub

`any`

The pubnub (PubNubClient) that triggered the event.

##### data?

`any`

The data associated with the event.

#### Returns

`PubNubEvent`

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

### pubnub

#### Get Signature

> **get** **pubnub**(): `any`

Get the pubnub (PubNubClient) that triggered the event.

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
