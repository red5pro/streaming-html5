[**Red5 Pro WebRTC SDK vNEW-15.0.0.11-release.b189**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / Event

# Class: Event

Base class for an Event within the Red5 Pro WebRTC SDK.

## Extended by

- [`SubscriberEvent`](SubscriberEvent.md)
- [`PublisherEvent`](PublisherEvent.md)
- [`MessageTransportStateEvent`](MessageTransportStateEvent.md)

## Constructors

### Constructor

> **new Event**(`type`, `data?`): `Event`

#### Parameters

##### type

`string`

##### data?

`any`

#### Returns

`Event`

## Accessors

### data

#### Get Signature

> **get** **data**(): `any`

Get the data associated with the event.

##### Returns

`any`

***

### type

#### Get Signature

> **get** **type**(): `string`

Get the type of event.

##### Returns

`string`
