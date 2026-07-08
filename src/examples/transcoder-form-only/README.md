# Transcoder (Form Only) (`transcoder-form-only`)

This example provides a UI-only way to submit ABR transcoder provisions to Stream Manager.

It is intended for production engineers who need to define a variant ladder (HIGH/MID/LOW) generated from one source stream.

## What This Example Demonstrates

- posting an ABR provision to Stream Manager
- defining a transcoder ladder (bitrate + resolution per variant)
- handling existing-provision responses gracefully
- displaying resolved publish/subscriber endpoint URLs after provision

## Deployment Prerequisite

Your Stream Manager deployment must have a transcoder node in the target node group.

Once provisioned and published, the transcoder generates variant streams from the top-level stream. Subscribers can then receive an appropriate variant based on network conditions (for example REMB-driven adaptation in WebRTC workflows).

## How This Example Works

1. Fill HIGH, MID, and LOW tier fields:
   - bitrate
   - width
   - height
2. Submit the form.
3. Example builds `ProvisionCommand` payload:
   - `provisionGuid = <app>/<streamName>`
   - stream GUID variants:
     - `<provisionGuid>_1` (HIGH)
     - `<provisionGuid>_2` (MID)
     - `<provisionGuid>_3` (LOW)
4. POST to Stream Manager via `postAbrProvisions(...)`.
5. Render resulting URLs (publisher + RTMP subscriber helper URLs).

## Minimal Developer Snippet

```ts
const provision = {
  messageType: 'ProvisionCommand',
  provisionGuid: `${app}/${streamName}`,
  streams: [
    {
      abrLevel: 1,
      streamGuid: `${app}/${streamName}_1`,
      videoParams: { videoBitrate: 2_000_000, videoWidth: 1280, videoHeight: 720 },
    },
    {
      abrLevel: 2,
      streamGuid: `${app}/${streamName}_2`,
      videoParams: { videoBitrate: 1_000_000, videoWidth: 640, videoHeight: 360 },
    },
    {
      abrLevel: 3,
      streamGuid: `${app}/${streamName}_3`,
      videoParams: { videoBitrate: 500_000, videoWidth: 320, videoHeight: 180 },
    },
  ],
}

await postAbrProvisions(adminUsername, adminPassword, settings, provision)
```

## Stream Manager Notes

- Stream Manager is required, along with a transcoder node within the target Node Group.
- Admin credentials are required (Admin Username/Admin Password in Settings, or auth fallback).
- This example only provisions transcoder variants; it does not publish media.

## Where to Look in This Example

- form value collection: `collectAbrProvisions()` and `readLevel()`
- provision submit: `onSubmit()` and `submitForm()`
- URL rendering after provision: `displayUrlsAfterProvision()`
- Stream Manager service calls: `postAbrProvisions()`, `getAllEdges()`, `getOriginForPublish()`

---

Pair this with `transcoder-form-and-publish` to see the next step: publishing the top-level stream that feeds the transcoder ladder.
