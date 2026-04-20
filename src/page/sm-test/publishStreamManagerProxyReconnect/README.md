# Publish Reconnect Support

This example demonstrates configuring a `WHIPClient` to be able to auto re-connect on network loss conditions.

**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# Reconnect Configuraiton

The following configuration attribute is provided for the init configuration of a `WHIPClient`:

```js
reconnect: {
  enabled: false,
  timeout: 2000,
  maxAttempts: 10
}
```

If provided and `enabled` is defined as `true`, the SDK will attempt an auto re-connect with the defined delays and max attempts when it has determined that underlying network conditions have been lost - which can occur in a switch from WiFi to cellular network.

### enabled

Flag of having reconnection sequence enabled when detection of connection is lost.

### timeout

The amount of delay between attempts to re-connect.

### maxAttempts

The total amount of attempts to make before considering the possiblity of reconnect unavailable.

# Usage

With the init configuration defined, there is not need for intervening based on events or state from the SDK - the SDK itself will handle the reconnect logic internally.

You can monitor the progress of reconnection from the following events on the `PublisherEventTypes` from the SDK:

| Access | Event Type | Meaning |
| :--- | :--- | :--- |
| `RECONNECT_START` | 'Reconnect.Start' | Notification when a reconnection sequence has started. Requires `reconnect` initialization property to be enabled. |
| `RECONNECT_FAILURE` | 'Reconnect.Failure' | Notification when a reconnection sequence has failed. Requires `reconnect` initialization property to be enabled. |
| `RECONNECT_SUCCESS` | 'Reconnect.Success' | Notification when a reconnection sequence has been successful. Requires `reconnect` initialization property to be enabled.|
