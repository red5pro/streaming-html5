# WHEP Standby (`whep-standby`)

This example is a standard `WHEPClient` subscribe flow with an additional standby control shown after subscribe starts.

Standby mode lets the subscriber signal the server to pause or resume media delivery (audio/video) without ending the subscription session.

## What This Example Demonstrates

- normal WHEP subscribe lifecycle (`init`, `subscribe`, `unsubscribe`)
- post-subscribe standby controls in the UI
- signaling standby on/off through the WHEP standby API
- subscriber/status UI updates while staying connected

## Standby API Behavior

After subscribe is active, the example toggles:

- `subscriber.enableStandby()` to request standby mode
- `subscriber.disableStandby()` to resume media delivery

Conceptually:

- **Standby enabled**: server pauses sending media tracks to this subscriber
- **Standby disabled**: server resumes sending media tracks

This is distinct from unsubscribe/subscribe, because session state remains active while media delivery is paused/resumed.

## How It Is Wired in This Example

1. Start subscribe as usual.
2. On `Subscribe.Start`, reveal the standby section.
3. User clicks **Enable Standby** / **Disable Standby** toggle.
4. Call standby API method and update local standby state/status text.
5. On subscribe stop/failure, reset standby UI/state.

## Minimal Developer Snippet

```ts
const subscriber = new red5prosdk.WHEPClient()

await subscriber.init({
  endpoint,
  streamName,
  mediaElementId: 'subscriber-video',
  connectionParams,
})

await subscriber.subscribe()

// Pause delivery
subscriber.enableStandby()

// Resume delivery
subscriber.disableStandby()
```

## Endpoint and `connectionParams`: Standalone vs Stream Manager

Standby signaling is independent from deployment mode. Endpoint and `connectionParams` setup follows the same WHEP pattern as other subscriber examples.

### Standalone Server

```ts
const endpoint = `https://${host}:443/live/whep/${streamName}`
const connectionParams = {}
```

### Stream Manager

```ts
const endpoint = `https://${host}/as/v1/proxy/whep/${app}/${streamName}`
const connectionParams = {
  // e.g. region, nodeGroup, auth metadata
}
```

## Where to Look in This Example

- standby toggle action: `toggleStandby()`
- standby UI state sync: `syncStandbyControls()` and `syncStandbySection()`
- subscribe lifecycle + standby reset: `startSubscribe()` / `stopSubscribe()`
- subscriber event handling: `onSubscriberEvent()`

---

Use this example as the reference pattern when you need subscriber-controlled pause/resume of server media delivery without tearing down the WHEP connection.
