# Subscriber Statistics Monitoring using Red5 Pro

This is an example of using the Statistics Monitoring feature of Red5 Pro Subscribers.

> In order to view the stats being generated and sent by the client, you will want to open the Dev Console of your web browser.

**Please refer to the [Basic Subscriber Documentation](../subscriber/README.md) to learn more about the basic setup.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# Statistics Monitoring

Both the `RTCSubscriber` and `WHEPClient` subscriber clients support the ability to monitor and POST statistics report data based on the underlying `RTCPeerConnection` of the clients.

## Stats Configuration

The configuration used for statistics monitoring has the following structure:

```js
{
  // Optional.
  // If provided, it will POST stats to this endpoint.
  // If undefined, it will post stats to message transport.
  // If null, it will only emit status events.
  endpoint: undefined,
  additionalHeaders: undefined,
  interval: 5000, // Interval to poll stats, in milliseconds.
  include: [], // Empty array allows SDK to be judicious about what stats to include.
}
```

### endpoint

- If the `endpoint` is defined, the SDK will attempt to make `POST` requests with a JSON body representing each individual report.
- If the `endpoint` is left `undefined`, the SDK will post metadata with type `stats-report` on the underlying message transport (such as the DataChannel or WebSocket).
- If the `endpoint` is set to `null`, the SDK will only emit events with the metadata on the `WebRTC.StatsReport` event.

### additionalHeaders

By default, if an `endpoint` is defined, the `POST` request body will be in JSON and have the `{ 'Content-Type': 'application/json' }` header set. If requirements - such as authentication - are required, a map of additional headers can be provided to be sent along with the request.

### interval

The polling interval (in milliseconds) to access the `RTCStatsReport` from the underlying `RTCPeerConnection` of the subscriber client.

### include

An array of static type strings. These directly map to the listing of type available for `RTCStatsReport` objects. If left empty or undefined, the SDK will report the statistics it deems suitable for tracking proper broadcast conditions.

> More information about the statistic types are available at [https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport#the_statistic_types](https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport#the_statistic_types)

## Invocation

To start statistics monitoring, you have a couple of options:

- You can provide a `stats` attribute with the [stats configuration object](#stats-configuration) to the [init configuration](#webrtc-configuration-parameters).
- You can call `monitorStats` on the subscriber client with the optional [stats configuration object](#stats-configuration) parameter.

> Additionally, you can stop monitoring by calling `unmonitorStats` on the subscriber client.

## Additional Information

Attached to the metadata that is reported are additional properties that pertain to the subscriber client.

As well, Along with the metadata releated to the `RTCStatsReport` objects emitted by the underlying `RTCPeerConnection`, the statistics monitoring also sends out a few event and action metadata related to the operation of a subscriber client.

> See the following section for examples.

## Example of Statistics Metdata

The following is an example of a statistics metadata that is emitted in a `WebRTC.StatsReport` event and POSTed to any defined optional endpoint:

```json
{
  "name": "RTCSubscriberStats",
  "created": 1727789134165,
  "device": {
    "browser": "chrome",
    "version": 129,
    "appVersion": "5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
    "platform": "MacIntel",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
    "vendor": "Google Inc."
  },
  "client": {
    "host": "myred5.deploy",
    "app": "live",
    "streamName": "stream1",
    "subscriptionId": "subscriber-922e"
  },
  "type": "stats-report",
  "timestamp": 1727789139169,
  "data": {
    "type": "inbound-rtp",
    "kind": "video",
    "codecId": "CIT01_102_level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f",
    "jitter": 0.005,
    "packetsLost": 0,
    "packetsReceived": 439,
    "bytesReceived": 412627,
    "firCount": 0,
    "frameWidth": 640,
    "frameHeight": 480,
    "framesDecoded": 143,
    "framesDropped": 0,
    "framesPerSecond": 30,
    "framesReceived": 143,
    "freezeCount": 0,
    "keyFramesDecoded": 3,
    "nackCount": 0,
    "pauseCount": 0,
    "pliCount": 0,
    "totalFreezesDuration": 0,
    "totalPausesDuration": 0,
    "estimatedBitrate": 660
  }
}
```
