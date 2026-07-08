# Brew Mixer (`brew-mixer`)

This example demonstrates orchestration of a Stream Manager mixer event and playback of the mixed output stream with `WHEPClient`.

It is designed for orchestration/program-management workflows where multiple upstream streams are composed into a single mixed stream delivered to subscribers.

## What This Example Demonstrates

- creating or opening mixer events in Stream Manager
- managing mixer session lifecycle (initialize, load, update, stop)
- subscribing to the mixed output stream with `WHEPClient`
- applying layout/position/size updates to mixer render trees during runtime
- controlling mixer audio and preset grid layout from the subscriber UI

## Deployment Prerequisite

This example requires:

- Stream Manager enabled
- a Mixer Node available in the target node group
- Stream Manager admin credentials configured in Settings

Without a Mixer Node in the selected node group, mixer event orchestration and mixed-stream playback will not work.

## Orchestration Perspective (Intended Audience)

This README intentionally focuses on orchestration behavior rather than low-level render/drawing internals.

At a high level:

- the modal workflow lets you open an existing mixer event or create a new one
- mixer render trees define how multiple source streams are arranged into one output
- updates to the render tree affect the mixed stream delivered to subscribers
- one mixed stream can reduce subscriber-side bandwidth and client rendering complexity compared to many independent subscriptions

## Session Flow in This Example

1. Authenticate with Stream Manager.
2. Load existing mixer events (or create a new event).
3. Create/update render trees for the mixer event.
4. Subscribe to the mixer output GUID using `WHEPClient`.
5. Use layout/audio/editor controls to update mixer composition.
6. Optionally stop mixer event and return to initialization flow.

## Minimal Developer Snippet

```ts
const jwt = await authenticateMinimal(adminUsername, adminPassword, settings)

await createMixerEvent(settings, jwt, mixerRequest)
await updateRenderTrees(settings, jwt, eventId, [nodeGraph])

const subscriber = new red5prosdk.WHEPClient()
await subscriber.init({
  endpoint, // resolved from mixer output stream guid
  streamName,
  mediaElementId: 'mixer-video',
  connectionParams,
})
await subscriber.subscribe()
```

## Controls Included in the Example

- setup modal:
  - open existing mixer event
  - create new mixer event
- live control bar:
  - open/close NodeGraph editor
  - stop mixer
  - quick grid presets (`2x2`, `3x3`, `4x4`)
  - mixer audio toggle
- render tree submit:
  - edit JSON
  - submit updated render tree to Stream Manager

## Endpoint and `connectionParams`

This is a Stream Manager workflow. The mixed output stream subscription endpoint is resolved from mixer output (`outputGuid`) and routed through Stream Manager settings/helpers.

## Where to Look in This Example

- setup + session bootstrap: `initializeSession()`
- create/open mixer flow: `handleMixerSetupSubmit()` and `useExistingEventBtn` handler
- render tree load/update: `getAndSubscribeToRenderTrees()` and `updateRenderTrees(...)`
- mixed stream subscribe: `startSubscription()` and `startSubscriptionWithRetry()`
- mixer stop lifecycle: `stopMixerBtn` handler + `stopMixerEvent(...)`
- service API integration: `src/service/brewmixer.ts`

---

Use this example as the reference for operational control of mixer-composed output streams when your goal is centralized composition and efficient subscriber delivery.

---

# Assumptions

This simple example defaults to generating slots within the Mixed Stream with the following stream guid: `stream<1..N>`. This can be changed - once a new configuration is submitted - in the editable render tree.

The source streams coming should also conform to a 16:9 resolution and will look best if 1080p.
