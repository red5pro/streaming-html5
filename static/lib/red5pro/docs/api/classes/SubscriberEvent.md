[**Red5 Pro WebRTC SDK vNEW-15.0.0.11-release.b189**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / SubscriberEvent

# Class: SubscriberEvent

Event for a Subscriber within the Red5 Pro WebRTC SDK.

## Extends

- [`Event`](Event.md)

## Constructors

### Constructor

> **new SubscriberEvent**(`type`, `subscriber`, `data?`): `SubscriberEvent`

Constructor for a SubscriberEvent.

#### Parameters

##### type

`string`

The type of event.

##### subscriber

`any`

The subscriber (WHEPClient) that triggered the event.

##### data?

`any`

The data associated with the event.

#### Returns

`SubscriberEvent`

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

### subscriber

#### Get Signature

> **get** **subscriber**(): `any`

Get the subscriber (WHEPClient) that triggered the event.

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
