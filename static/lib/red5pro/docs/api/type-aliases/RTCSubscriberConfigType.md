[**Red5 Pro WebRTC SDK vNEW-15.0.0.11-release.b189**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / RTCSubscriberConfigType

# Type Alias: RTCSubscriberConfigType

> **RTCSubscriberConfigType** = `object`

## Properties

### app

> **app**: `string`

***

### audioEncoding?

> `optional` **audioEncoding**: [`PlaybackAudioEncoder`](../enumerations/PlaybackAudioEncoder.md)

***

### autoLayoutOrientation

> **autoLayoutOrientation**: `boolean`

***

### buffer

> **buffer**: `number`

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

### host?

> `optional` **host**: `string`

***

### iceTransport

> **iceTransport**: `IceTransportTypes`

***

### includeDataChannel

> **includeDataChannel**: `boolean`

***

### maintainConnectionOnSubscribeErrors

> **maintainConnectionOnSubscribeErrors**: `boolean`

***

### maintainStreamVariant

> **maintainStreamVariant**: `boolean`

***

### mediaElementId

> **mediaElementId**: `string`

***

### muteOnAutoplayRestriction

> **muteOnAutoplayRestriction**: `boolean`

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

### streamName?

> `optional` **streamName**: `string`

***

### subscriptionId?

> `optional` **subscriptionId**: `string`

***

### videoEncoding?

> `optional` **videoEncoding**: [`PlaybackVideoEncoder`](../enumerations/PlaybackVideoEncoder.md)
