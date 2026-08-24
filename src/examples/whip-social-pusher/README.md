# WHIP Social Pusher (`whip-social-pusher`)

This example starts from a standard `WHIPClient` publish flow, then adds a **Social Forwarding** form that provisions an RTMP push restream to a social destination while publish is active.

At a high level:

- publish with `WHIPClient`
- while publish is active, open the **Social Forwarding** form
- submit to start forwarding (creates an RTMP-push restream provision)
- submit again to stop forwarding (kills the restream provision)

## What This Example Demonstrates

- standard WHIP publish lifecycle with `initWithStream(...)`
- post-publish control of social forwarding through the server restream API
- social forwarding toggle behavior:
  - start forwarding (`createProvision`)
  - stop forwarding (`deleteProvision`)
- standalone and Stream Manager restream request shapes

## Social Forwarding Form Inputs

During active publish, the form takes:

- **Destination URI** — RTMP base endpoint (for example `rtmp://x.rtmp.youtube.com/live2`)
- **Stream Key** — destination stream key; defaults to `{streamName}Social`

The server forwards to:

```ts
rtmpUri = `${destinationUri}/${streamKey}`
```

The restream provision is keyed by **Stream Key** (`guid` / `provisionGuid`). The source broadcast is identified by `{app}/{streamName}` from Settings.

## Restream API: Standalone vs Stream Manager

Forwarding requests are built and sent by `createProvision()` and `deleteProvision()` in `src/service/restreamer.ts`. The example calls those through `postSocialPusherProvision()` in `src/lib/social-pusher-provision.ts`.

### Standalone Server

**Create** — `POST https://{host}:{port}/{app}/restream`

```json
{
  "guid": "mySocialKey",
  "context": "live",
  "name": "mystream",
  "level": 0,
  "parameters": {
    "type": "rtmp-push",
    "action": "create",
    "rtmpUri": "rtmp://x.rtmp.youtube.com/live2/mySocialKey",
    "attempts": "3",
    "delayS": "10"
  }
}
```

**Delete** — `POST https://{host}:{port}/{app}/restream`

```json
{
  "guid": "mySocialKey",
  "context": "live",
  "name": "mystream",
  "level": 0,
  "parameters": {
    "type": "rtmp-push",
    "action": "kill"
  }
}
```

### Stream Manager

Stream Manager requests require admin credentials from Settings (**Admin Username / Admin Password**, or Authentication username/password when enabled).

**Create** — `POST https://{host}:{port}/as/{apiVersion}/streams/provision/{nodeGroup}`

```json
[
  {
    "provisionGuid": "mySocialKey",
    "streams": [
      {
        "streamGuid": "live/mystream",
        "abrLevel": 0,
        "camParams": {
          "properties": {
            "type": "rtmp-push",
            "action": "create",
            "rtmpUri": "rtmp://x.rtmp.youtube.com/live2/mySocialKey",
            "attempts": "3",
            "delayS": "10"
          }
        }
      }
    ]
  }
]
```

**Delete** — `DELETE https://{host}:{port}/as/{apiVersion}/streams/provision/{nodeGroup}/{provisionGuid}`

## Minimal Developer Snippet

The snippet below is intentionally simplified for learning and does not include every helper used in the testbed:

```ts
const publisher = new red5prosdk.WHIPClient()
await publisher.initWithStream(
  {
    endpoint,
    streamName,
    mediaElementId: 'publisher-video',
    connectionParams,
    streamMode: 'live',
  },
  mediaStream
)
await publisher.publish()

const streamGuid = `${app}/${streamName}`
const destinationUri = 'rtmp://x.rtmp.youtube.com/live2'
const streamKey = 'mySocialKey'

// Start social forwarding
await createProvision(settings, streamKey, streamGuid, destinationUri)

// Stop social forwarding
await deleteProvision(settings, streamKey)
```

Or via the example wrapper:

```ts
// Start forwarding
await postSocialPusherProvision({
  settings,
  destinationUri: 'rtmp://x.rtmp.youtube.com/live2',
  streamKey: 'mySocialKey',
  isForwarding: false,
})

// Stop forwarding
await postSocialPusherProvision({
  settings,
  destinationUri: 'rtmp://x.rtmp.youtube.com/live2',
  streamKey: 'mySocialKey',
  isForwarding: true,
})
```

## WHIP Publish: Endpoint and `connectionParams`

Publish endpoint/connection setup follows the same WHIP pattern as other examples. Social forwarding is an additional control path layered on top of active publish.

### Standalone Server

```ts
const endpoint = `https://${host}:443/live/whip/${streamName}`
const connectionParams = {}
```

### Stream Manager

```ts
const endpoint = `https://${host}/as/v1/proxy/whip/${app}/${streamName}`
const connectionParams = {
  // e.g. region, nodeGroup, auth metadata
}
```

## Where to Look in This Example

- publish flow: `startPublish()`
- forwarding form submission: `handleSocialPusherSubmit()`
- forwarding section state: `syncSocialPusherSection()` and `syncSocialPusherFormState()`
- example wrapper: `postSocialPusherProvision()` in `src/lib/social-pusher-provision.ts`
- restream request builder: `createProvision()` and `deleteProvision()` in `src/service/restreamer.ts`

---

Use this as a reference when adding social-destination forwarding controls to a WHIP publisher UI during an active broadcast session.
