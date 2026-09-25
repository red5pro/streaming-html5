[**Red5 Pro WebRTC SDK v16.3.0-beta.4**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / MOQPublisherConfigType

# Type Alias: MOQPublisherConfigType

> **MOQPublisherConfigType** = `object`

## Properties

### app

> **app**: `string`

***

### audioEncoding?

> `optional` **audioEncoding?**: [`PublishAudioEncoder`](../enumerations/PublishAudioEncoder.md)

***

### bandwidth

> **bandwidth**: [`BandwidthConfig`](BandwidthConfig.md)

***

### certKey?

> `optional` **certKey?**: `string`

***

### clearMediaOnUnpublish

> **clearMediaOnUnpublish**: `boolean`

***

### connectionParams?

> `optional` **connectionParams?**: `object`

#### Index Signature

\[`key`: `string`\]: `any`

***

### draftVersion?

> `optional` **draftVersion?**: `DraftVersion`

***

### endpoint?

> `optional` **endpoint?**: `string`

***

### host?

> `optional` **host?**: `string`

***

### keyFramerate

> **keyFramerate**: `number`

***

### locVersion?

> `optional` **locVersion?**: `LOCVersion`

***

### maxAudioQueue?

> `optional` **maxAudioQueue?**: `number`

***

### maxVideoQueue?

> `optional` **maxVideoQueue?**: `number`

***

### mediaConstraints

> **mediaConstraints**: [`MediaConstraints`](MediaConstraints.md)

***

### mediaElementId

> **mediaElementId**: `string`

***

### messageChannel?

> `optional` **messageChannel?**: `MOQPublisherMessageChannelConfig`

Optional internally managed data messaging channel.

***

### moqtLogLevel?

> `optional` **moqtLogLevel?**: `LogLevel`

***

### namespace?

> `optional` **namespace?**: `string`

***

### onGetUserMedia?

> `optional` **onGetUserMedia?**: () => `Promise`\<`MediaStream`\>

#### Returns

`Promise`\<`MediaStream`\>

***

### port

> **port**: `number`

***

### protocol

> **protocol**: `"ws"` \| `"wss"` \| `"http"` \| `"https"`

***

### simulcast?

> `optional` **simulcast?**: `MOQPublisherSimulcastConfig`

Optional simulcast ladder. Source/captured video is the highest rung;
lower rungs are generated via OffscreenCanvas + track generators.

***

### stats?

> `optional` **stats?**: [`StatsConfig`](StatsConfig.md)

***

### streamName?

> `optional` **streamName?**: `string`

***

### videoEncoding?

> `optional` **videoEncoding?**: [`PublishVideoEncoder`](../enumerations/PublishVideoEncoder.md)
