# WHIP Social Pusher (`whip-social-pusher`)

This example starts from a standard `WHIPClient` publish flow, then adds an active-broadcast form that sends server actions to start/stop forwarding your live stream to a social destination.

At a high level:

- publish with `WHIPClient`
- while publish is active, open the **Social Forwarding** form
- submit `provision.create` to start forwarding to destination URI + stream key
- submit `provision.delete` to stop forwarding

## What This Example Demonstrates

- standard WHIP publish lifecycle with `initWithStream(...)`
- post-publish control of social forwarding through server API actions
- social forwarding toggle behavior:
  - start forwarding (`provision.create`)
  - stop forwarding (`provision.delete`)
- retry behavior for transient gateway timeout responses

## The Deployment Gotcha (Standalone vs Stream Manager)

The forwarding form behavior differs by deployment mode.

### Standalone

- form includes a **Password** field (visible in Standalone mode)
- default password is `changeme`
- this password must match the social pusher password configured in Standalone server `cluster.xml`

### Stream Manager

- forwarding requests are routed through Stream Manager forward proxy
- auth requires Stream Manager credentials from Settings:
  - **Admin Username / Admin Password** (preferred), or
  - Authentication username/password fallback when enabled
- destination URI + stream key are still required in the form

## Social Forwarding Form Inputs

During active publish, the form takes:

- **Destination URI** (for example an RTMP endpoint)
- **Stream Key**
- **Password** (Standalone only)

The final destination forwarded by the server is built as:

```ts
destURI = `${destinationUri}/${streamKey}`
```

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

// Start social forwarding (server action)
await postSocialPusherProvision({
  settings,
  password: 'changeme', // standalone case
  destinationUri: 'rtmp://example-social-endpoint/live',
  streamKey: 'mySocialKey',
  isForwarding: false, // false => send provision.create
})

// Stop social forwarding (server action)
await postSocialPusherProvision({
  settings,
  password: 'changeme',
  destinationUri: 'rtmp://example-social-endpoint/live',
  streamKey: 'mySocialKey',
  isForwarding: true, // true => send provision.delete
})
```

## Endpoint and `connectionParams`: Standalone vs Stream Manager

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
- provisioning request builder/poster: `postSocialPusherProvision()` in `src/lib/social-pusher-provision.ts`
- request signature helper: `createProvisionSignature()` in `src/lib/social-pusher-signature.ts`

---

Use this as a reference when adding social-destination forwarding controls to a WHIP publisher UI during an active broadcast session.
