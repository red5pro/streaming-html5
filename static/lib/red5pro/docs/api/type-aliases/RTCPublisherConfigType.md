[**Red5 Pro WebRTC SDK vNEW-15.0.0.11-release.b189**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / RTCPublisherConfigType

# Type Alias: RTCPublisherConfigType

> **RTCPublisherConfigType** = `object`

## Properties

### app

> **app**: `string`

***

### audioEncoding

> **audioEncoding**: [`PublishAudioEncoder`](../enumerations/PublishAudioEncoder.md) \| `undefined`

***

### bandwidth

> **bandwidth**: [`BandwidthConfig`](BandwidthConfig.md)

***

### clearMediaOnUnpublish

> **clearMediaOnUnpublish**: `boolean`

***

### connectionParams?

> `optional` **connectionParams**: `object`

#### Index Signature

\[`key`: `string`\]: `any`

***

### dataChannelConfiguration?

> `optional` **dataChannelConfiguration**: `DataChannelConfig`

***

### endpoint?

> `optional` **endpoint**: `string`

***

### forceVP8

> **forceVP8**: `boolean`

***

### host?

> `optional` **host**: `string`

***

### iceTransport

> **iceTransport**: `IceTransportTypes`

***

### includeDataChannel

> **includeDataChannel**: `boolean`

***

### keyFramerate

> **keyFramerate**: `number`

***

### mediaConstraints

> **mediaConstraints**: [`MediaConstraints`](MediaConstraints.md)

***

### mediaElementId

> **mediaElementId**: `string`

***

### onGetUserMedia()?

> `optional` **onGetUserMedia**: () => `Promise`\<`MediaStream`\>

#### Returns

`Promise`\<`MediaStream`\>

***

### port

> **port**: `number`

***

### protocol

> **protocol**: `"ws"` \| `"wss"` \| `"http"` \| `"https"`

***

### proxy?

> `optional` **proxy**: `object`

#### enabled

> **enabled**: `boolean`

#### version

> **version**: `string`

***

### rtcConfiguration

> **rtcConfiguration**: `RTCConfiguration`

***

### signalingSocketOnly

> **signalingSocketOnly**: `boolean`

***

### stats?

> `optional` **stats**: [`StatsConfig`](StatsConfig.md)

***

### streamMode

> **streamMode**: `PublishModeTypes`

***

### streamName?

> `optional` **streamName**: `string`

***

### videoEncoding

> **videoEncoding**: [`PublishVideoEncoder`](../enumerations/PublishVideoEncoder.md) \| `undefined`
