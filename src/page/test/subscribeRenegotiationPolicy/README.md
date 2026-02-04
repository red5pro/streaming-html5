# Subscribe Renegotiation Policy

This example demonstrates how to configure and test renegotiation policies for WebRTC subscribers using the Red5  HTML SDK. Renegotiation policies control how the subscriber handles network degradation and connection issues during the ICE negotiation phase of a WebRTC session.

**Please refer to the [Basic Subscriber Documentation](../subscribe/README.md) to learn more about the basic setup.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

## Feature Overview

The `renegotiationPolicy` feature of the Red5 HTML SDK allows you to configure how the WebRTC subscriber responds to network issues and connection degradation during the ICE negotiation phase. This is particularly useful for maintaining stream quality and connection stability in varying network conditions.

### Available Policy Types

1. **timeout** - Attempts to renegotiate the connection after a specified timeout interval when network conditions degrade. This policy allows you to set a custom timeout interval (in milliseconds).

2. **disconnect** - Immediately disconnects the subscriber when network issues are detected, rather than attempting to renegotiate.

3. **regression** - Uses a regression-based approach to handle network degradation, attempting to adapt the connection quality based on detected network conditions.

> The `regression` policy is the most aggressive as it can be detected very early on in the negotiation phase, _however_ it does not always occur. It is recommended to go with the `timeout` policy.

## Implementation

The renegotiation policy is configured when initializing the WHEP subscriber:

```js
let rtcConfig = {
  ...configuration,
  streamName,
  subscriptionId: 'subscriber-' + instanceId,
  renegotiationPolicy: {
    type: typeSelect.value,  // 'timeout' | 'disconnect' | 'regression'
    timeoutInterval: parseInt(timeoutIntervalSelect.value, 10)  // Only used for TIMEOUT policy
  }
}

targetSubscriber = new WHEPClient()
await targetSubscriber.init(rtcConfig)
await targetSubscriber.subscribe()
```

### Event Tracking

The example tracks reconnection attempts through the `Reconnect.Start` event:

```js
if (event.type === 'Reconnect.Start') {
  reconnectionAttempts++
  reconnectionAttemptsField.innerText = reconnectionAttempts
}
```

## How to Use

1. **Open Chrome DevTools** - Press `F12` or right-click and select "Inspect"

2. **Navigate to the Network Tab** - Click on the "Network" tab in DevTools

3. **Enable Network Throttling**:
   - Click the gear icon (⚙️) in the Network tab
   - Select "Throttling" from the dropdown
   - Choose "Slow 3G" or another throttling profile to simulate poor network conditions

4. **Configure the Renegotiation Policy**:
   - Select a **Policy Type** from the dropdown:
     - `TIMEOUT` - Enables timeout interval selection
     - `DISCONNECT` - Immediately disconnects on network issues
     - `REGRESSION` - Uses regression-based adaptation
   - If using `TIMEOUT`, select a **Timeout Interval** (1000-5000 milliseconds)

5. **Start the Subscription**:
   - Click the "Subscribe" button
   - The subscriber will attempt to connect to the stream

6. **Observe Behavior**:
   - Watch the reconnection attempts counter increment as network issues are detected
   - Monitor the subscriber status and statistics fields
   - Observe how the selected policy handles the degraded network conditions

7. **Test Recovery**:
   - Reset the network throttling to "No throttling" or "Online"
   - Observe how the subscriber recovers and maintains the connection

## Notes

- The timeout interval is only applicable when using the `TIMEOUT` policy type
- The example uses the WHEP (WebRTC HTTP Egress Protocol) client for WebRTC-based subscriptions
- Network throttling must be enabled in Chrome DevTools to properly test the renegotiation behavior
