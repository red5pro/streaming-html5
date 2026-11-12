[**Red5 Pro WebRTC SDK v16.3.0-beta.4**](../README.md)

***

[Red5 Pro WebRTC SDK](../globals.md) / MOQDataChannelConfiguration

# Type Alias: MOQDataChannelConfiguration

> **MOQDataChannelConfiguration** = `object`

## Properties

### clientId?

> `optional` **clientId?**: `string`

Sender identity used for namespace + echo filtering.

***

### keepEcho?

> `optional` **keepEcho?**: `boolean`

Keep self-echoed JSON messages when true.

***

### name?

> `optional` **name?**: `string`

Channel label. Matches WebRTC `dataChannelConfiguration.name`.

***

### unreliable?

> `optional` **unreliable?**: `boolean`

Prefer datagram send path for outbound messages.
