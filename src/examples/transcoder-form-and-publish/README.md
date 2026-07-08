# Transcoder (Form and Publish) (`transcoder-form-and-publish`)

This example extends `transcoder-form-only` by adding publisher workflow after provisioning.

You first submit ABR provisions to Stream Manager, then publish the top-level variant stream so the transcoder can generate the remaining ladder variants.

## What This Example Demonstrates

- ABR provision submission (HIGH/MID/LOW variants)
- previewing and publishing the top-level stream (`_1`) with `WHIPClient`
- sending publish `connectionParams.transcode: true` to engage transcoder flow
- publishing the source stream that drives generated variant outputs

## Deployment Prerequisite

Requires Stream Manager deployment with an available transcoder node in the target node group.

The transcoder generates lower variants from the high/source variant. Subscriber delivery across the ladder is then managed server-side according to client network conditions.

## End-to-End Flow

1. Submit ABR ladder form.
2. Example creates preview using requested HIGH tier width/height.
3. Start publish on the HIGH stream GUID (`<app>/<stream>_1`).
4. Transcoder receives source stream and produces additional ladder variants (`_2`, `_3`).
5. Subscribers can consume the appropriate variant endpoint/path for their conditions.

## Minimal Developer Snippet

```ts
await postAbrProvisions(adminUsername, adminPassword, settings, provision)

const highStreamName = `${streamName}_1`
const endpoint = resolveEndpointFromSettings({ ...settings, streamName: highStreamName }, 'whip')

await publisher.initWithStream(
  {
    endpoint,
    streamName: highStreamName,
    mediaElementId: 'publisher-video',
    connectionParams: {
      ...connectionParams,
      transcode: true,
    },
  },
  previewStream
)
await publisher.publish()
```

## Practical Notes

- Stream Manager + credentials are required.
- This example is focused on provisioning + source publish.
- Variant playback verification is done in subscriber workflows targeting provisioned stream GUIDs.

## Where to Look in This Example

- ABR form parsing/provision: `collectAbrProvisions()` and `onSubmit()`
- preview setup from HIGH tier: `setupPublisherPreview()`
- publish flow: `startPublish()`
- unpublish flow: `stopPublish()`
- event/status handling: `onPublisherEvent()`

---

Pair this with `transcoder-form-publish-amf` to extend the same flow with AMF metadata delivery across transcoded variants.
