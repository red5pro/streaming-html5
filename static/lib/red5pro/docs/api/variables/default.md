[**Red5 Pro WebRTC SDK vNEW-15.0.0.11-release.b189**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / default

# Variable: default

> **default**: `object`

## Type Declaration

### defaultWhepSubscriberConfig

> **defaultWhepSubscriberConfig**: [`RTCWhepSubscriberConfigType`](../type-aliases/RTCWhepSubscriberConfigType.md)

### defaultWhipPublisherConfig

> **defaultWhipPublisherConfig**: [`RTCWhipPublisherConfigType`](../type-aliases/RTCWhipPublisherConfigType.md)

### getRecordedLogs()

> **getRecordedLogs**: () => `string`[]

Returns the stored logs if requested to `record` on establishment of logger.

#### Returns

`string`[]

Array of recorded log messages.

### getVersion()

> **getVersion**: () => `string`

Get the version of the SDK.

#### Returns

`string`

### HLSSubscriber

> **HLSSubscriber**: *typeof* [`HLSSubscriber`](../classes/HLSSubscriber.md)

### LiveSeekClient

> **LiveSeekClient**: *typeof* [`LiveSeekClient`](../classes/LiveSeekClient.md)

### LOG\_LEVELS

> **LOG\_LEVELS**: `object` = `LEVELS`

#### LOG\_LEVELS.DEBUG

> `readonly` **DEBUG**: `"debug"` = `'debug'`

#### LOG\_LEVELS.ERROR

> `readonly` **ERROR**: `"error"` = `'error'`

#### LOG\_LEVELS.FATAL

> `readonly` **FATAL**: `"fatal"` = `'fatal'`

#### LOG\_LEVELS.INFO

> `readonly` **INFO**: `"info"` = `'info'`

#### LOG\_LEVELS.TRACE

> `readonly` **TRACE**: `"trace"` = `'trace'`

#### LOG\_LEVELS.WARN

> `readonly` **WARN**: `"warn"` = `'warn'`

### MessageTransportStateEvent

> **MessageTransportStateEvent**: *typeof* [`MessageTransportStateEvent`](../classes/MessageTransportStateEvent.md)

### MessageTransportStateEventTypes

> **MessageTransportStateEventTypes**: *typeof* [`MessageTransportStateEventTypes`](../enumerations/MessageTransportStateEventTypes.md)

### PlaybackAudioEncoder

> **PlaybackAudioEncoder**: *typeof* [`PlaybackAudioEncoder`](../enumerations/PlaybackAudioEncoder.md)

### PlaybackState

> **PlaybackState**: *typeof* [`PlaybackState`](../enumerations/PlaybackState.md)

### PlaybackStateReadableMap

> **PlaybackStateReadableMap**: `object`

#### PlaybackStateReadableMap.0

> **0**: `PlaybackStateReadable` = `PlaybackStateReadable.AVAILABLE`

#### PlaybackStateReadableMap.1

> **1**: `PlaybackStateReadable` = `PlaybackStateReadable.IDLE`

#### PlaybackStateReadableMap.1000

> **1000**: `PlaybackStateReadable` = `PlaybackStateReadable.UNAVAILABLE`

#### PlaybackStateReadableMap.2

> **2**: `PlaybackStateReadable` = `PlaybackStateReadable.PLAYING`

#### PlaybackStateReadableMap.3

> **3**: `PlaybackStateReadable` = `PlaybackStateReadable.PAUSED`

### PlaybackVideoEncoder

> **PlaybackVideoEncoder**: *typeof* [`PlaybackVideoEncoder`](../enumerations/PlaybackVideoEncoder.md)

### PublishAudioEncoder

> **PublishAudioEncoder**: *typeof* [`PublishAudioEncoder`](../enumerations/PublishAudioEncoder.md)

### PublisherEvent

> **PublisherEvent**: *typeof* [`PublisherEvent`](../classes/PublisherEvent.md)

### PublisherEventTypes

> **PublisherEventTypes**: *typeof* [`PublisherEventTypes`](../enumerations/PublisherEventTypes.md)

### PublishVideoEncoder

> **PublishVideoEncoder**: *typeof* [`PublishVideoEncoder`](../enumerations/PublishVideoEncoder.md)

### RTCPublisherEventTypes

> **RTCPublisherEventTypes**: *typeof* [`RTCPublisherEventTypes`](../enumerations/RTCPublisherEventTypes.md)

### RTCSubscriberEventTypes

> **RTCSubscriberEventTypes**: *typeof* [`RTCSubscriberEventTypes`](../enumerations/RTCSubscriberEventTypes.md)

### setLogLevel()

> **setLogLevel**: (`level`, `record`) => `void`

#### Parameters

##### level

`string`

##### record

`boolean` = `false`

#### Returns

`void`

### SubscriberEvent

> **SubscriberEvent**: *typeof* [`SubscriberEvent`](../classes/SubscriberEvent.md)

### SubscriberEventTypes

> **SubscriberEventTypes**: *typeof* [`SubscriberEventTypes`](../enumerations/SubscriberEventTypes.md)

### version

> **version**: `string`

### WHEPClient

> **WHEPClient**: *typeof* [`WHEPClient`](../classes/WHEPClient.md)

### WHIPClient

> **WHIPClient**: *typeof* [`WHIPClient`](../classes/WHIPClient.md)
