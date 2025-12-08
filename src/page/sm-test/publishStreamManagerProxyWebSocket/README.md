# Publish WebSocket (Backward Compatibility)

This example demonstrates the use of WebSocket-based publishers using the `RTCPublisher` class from Red5 Pro HTML SDK version **14.3.0**.

> **⚠️ Important Note:** WebSocket connections for publishers were **discontinued in Red5 Pro SDK release 15.0.0** in favor of WHIP/WHEP (WebRTC HTTP Ingestion/Egress Protocol) clients. This test is provided for **backward compatibility** only and should not be used for new implementations.

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

## SDK Version

This example uses **Red5 Pro HTML SDK version 14.3.0**, which is the last version to support WebSocket-based connections. The SDK is loaded from:

```html
<script src="lib/red5pro_14_3_0/red5pro-sdk.min.js"></script>
```

## Implementation

This example uses the `RTCPublisher` class to establish a WebSocket-based connection for publishing a stream:

```js
const { RTCSubscriber } = red5prosdk

const rtcConfig = {
  ...configuration,
  streamName: configuration.stream1
}

const publisher = new RTCPublisher()
await publisher.init(rtcConfig)
targetPublisher = publisher
targetPublisher.on('*', onPublisherEvent)
await targetPublisher.subscribe()
```

### Key Differences from Modern Implementation

- **Old (WebSocket)**: Uses `RTCPublisher` class with WebSocket signaling
- **New (WHIP)**: Uses `WHIPClient` class with HTTP-based signaling

## Migration Guide

If you are currently using WebSocket-based publishers and need to migrate to the modern implementation:

1. **Update SDK**: Upgrade to Red5 Pro SDK 15.0.0 or later
2. **Replace RTCPublisher**: Change from `RTCPublisher` to `WHIPClient`
3. **Update Configuration**: Ensure your server supports WHEP endpoints
4. **Review Events**: Some event types may have changed between versions

For detailed migration instructions, please refer to the Red5 Pro SDK release notes for version 15.0.0.

## When to Use This Example

This example should only be used if you:
- Need to test or maintain legacy applications using SDK 14.3.0
- Are migrating from WebSocket to WHEP and need a reference
- Are working with a deployments that require WebSocket based WebRTC clients.

**For all new development, use the WHEP-based publisher examples instead.**

