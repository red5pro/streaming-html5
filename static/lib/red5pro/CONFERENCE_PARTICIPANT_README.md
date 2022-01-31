<h3 align="center">
  <img src="assets/red5pro_logo.png" alt="Red5 Pro Logo" />
</h3>
<p align="center">
  <a href="PUBLISHER_README.md">publisher</a> &bull;
  <a href="SUBSCRIBER_README.md">subscriber</a> &bull;
  <a href="SHARED_OBJECT_README.md">shared object</a>
</p>

---

# RTCConferenceParticipant in Red5 Pro WebRTC SDK

The `10.0.0` release of the Red5 Pro WebRTC SDK introduced a new client to be used in establishing a connection and streaming session with the Red5 Pro server: `RTCConferenceParticipant`.

The `RTCConferenceParticipant` is an extension of `RTCPublisher` that receives additional tracks to playback multiple audio sources along with a single composited video of all participants in the conference group.

> Read more about an `RTCPublisher` from the [Publisher Documentation](PUBLISHER_README.md)

The `RTCConferenceParticipant` differs from a `RTCPublisher` in that it requests to join a conference room while simulataneuosly starting a broadcast. Once the `RTCConferenceParticipant` has joined the room it is delivered 3 `recvonly` audio tracks and 1 `recvonly` video track.

The 3 audio tracks are considered the "loudest talkers" minus the current audio being broadcast out - typically referred to as a "mix-minus".

The 1 video track is a video composite of the video streams of all the `RTCConferenceParticipant`s in the group conference. Because of this, integrating a `RTCConferenceParticipant` into your application will most likely require a Mixer Node.

> Read more about the [Red5 Pro Mixer](https://www.red5pro.com/docs/special/mixer/using-mixer/#gatsby-focus-wrapper).

* [Requirements](#requirements)
* [Configuration Parameters](#configuration-parameters)
* [Events](#events)
* [Example](#example)

# Requirements

## Mixer Node

Because the video delivered to each `RTCConferenceParticipant` is a composite of all participants in the conference group, you will most likely need to deploy a [Red5 Pro Mixer] (https://www.red5pro.com/docs/special/mixer/using-mixer/#gatsby-focus-wrapper) as part of your solution.

## Group Provision

Before Joining a Conference Group as a Participant, a Group Provision needs to be available on the server.

Here is an example of a provision to POST to the server:

```json
{
  guid: 'live',
  context: 'live',
  name: 'group01',
  level: 0,
  isRestricted: false,
  parameters: {
    group: 'webrtc',
    audiotracks: 3, 
    videotracks: 1
  },
  restrictions: [],
  primaries: [],
  secondaries: []
}
```

Where the `context` is the application context you are streaming to (default is `live`) and `name` is the name of the Conference Group.

To post the provision, make a HTTP POST request to the server endpoint using:

```
https://<your-red5pro-deployment>/cluster/api?action=provision.create
```

# Configuration Parameters

The `RTCConferenceParticipant` is an extension of `RTCPublisher`. As such, it has the same configuration parameters along with the following additional:

| Property | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| groupName | [x] | `group01` | The name of the conference group the participant will be joining. |

# Events

The `RTCConferenceParticipant` is an extension of `RTCPublisher`. As such, it has the same lifecycle events with the following additional accessible from the `RTCConferenceParticipantEventTypes` object:

| Access | Name | Meaning |
| :--- | :---: | :--- |
| RTCConferenceParticipantEventTypes.MEDIA_STREAM | `Conference.MediaStream` | The event will be fired once the `MediaStream` assembled with the 3 audio tracks and 1 composite video track is delivered to the `RTCConferenceParticipant`. The `MediaStream` will be accessible from the event on `data.stream` and can be used to assign as the `srcObject` to an HTML `video` element for playback. |

# Example

The following is an example of creating a `RTCConferenceParticipant` and requesting to join a group broadcast.

> Note the `app` init configuration attribute is a combination of the `live` app context and the group name.

```js
import { RTCConferenceParticpant } from 'red5pro-webrtc-sdk'

const start = async () => {
  const participant = new RTCConferenceParticipant()
  participant.on('Conference.MediaStream', event => {
    const { data: { stream } } = event
    conferenceVideoElement.srcObject = stream
  })
  await participant.init({
    streamName: 'participant1',
    groupName: 'group01',
    app: 'live/group01'
  })
  await participant.publish()
}
```
