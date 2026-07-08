# Transcoder (Form, Publish and AMF) (`transcoder-form-publish-amf`)

This example extends `transcoder-form-and-publish` by adding AMF metadata send controls while the top-level stream is publishing.

It demonstrates sending metadata on the source stream so subscribers on transcoded variants can receive the same metadata signaling.

## What This Example Demonstrates

- ABR provision submission to Stream Manager
- top-level source publish with `WHIPClient` and `transcode: true`
- AMF metadata send during active publish using `publisher.send('onMetaData', ...)`
- metadata propagation intent across all generated transcoded variants

## Deployment Prerequisite

Requires Stream Manager with a transcoder node in the target node group.

As with the other transcoder examples, ladder outputs are generated from the top-level source variant and served adaptively by the platform.

## End-to-End Flow

1. Submit ABR ladder form.
2. Start publishing the HIGH/source variant.
3. Use AMF form input to send metadata while live.
4. Subscribers on any generated variant can consume shared metadata events.

## Minimal Developer Snippet

```ts
await postAbrProvisions(adminUsername, adminPassword, settings, provision)
await publisher.initWithStream(
  {
    endpoint,
    streamName: `${streamName}_1`,
    connectionParams: { ...connectionParams, transcode: true },
    mediaElementId: 'publisher-video',
  },
  previewStream
)
await publisher.publish()

// During active publish:
await publisher.send('onMetaData', { metadata: 'your metadata payload' })
```

## AMF Controls in This Example

- AMF input and submit controls are disabled until publish starts.
- On `Publish.Start`, controls are enabled.
- On publish stop/failure, controls are disabled again.

This keeps metadata send behavior scoped to active source-stream publishing only.

## Stream Manager Notes

- Stream Manager mode is required.
- Admin credentials are required for provision submission.
- This example combines provisioning, source publish, and metadata signaling in one flow.

## Where to Look in This Example

- provision submit: `onSubmit()`
- source publish setup: `startPublish()`
- AMF send action: `sendAmfMetadata()`
- AMF form state control: `syncAmfMetadataControls()`
- publish lifecycle handling: `onPublisherEvent()`

---

Use this example as the reference when your transcoded ladder workflows also require synchronized AMF metadata signaling to downstream subscribers.
