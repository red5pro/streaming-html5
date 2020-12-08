# Conference Participation using Red5 Pro

This is an example of subscribing to a group conference using an `RTCConferenceParticipant` from the Red5 Pro HTML SDK.

The `RTCConferenceParticipant` is an extension of `RTCPublisher` that receives additional tracks to playback multiple audio sources along with a single composited video of all participants in the conference group.

## Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

# How to Join a Conference Group

Joining a Conference Group is very similar to establishing an `RTCPublisher` session, but with the additional configuration properties:

* `groupName` - **Required**. Defines the Conference Group to join as a participant.
* `autoGenerateMediaStream` -  **Default: true**. Flag to generate a single `MediaStream` from all the incoming audio and video tracks. This resultant `MediaStream` will be accessible from the `Conference.MediaStream` event so you can place it do with it as you please (such as appling it as a `srcObject` to a `video` element, as this example does).

## Example

The example begins a publishing session for a Conference Group once a `groupName` is provided and you click `Submit`:

```js
var participant

var rtcConfig = Object.assign({}, config, {
  protocol: getSocketLocationFromProtocol().protocol,
  port: getSocketLocationFromProtocol().port,
  streamName: config.stream1,
  autoGenerateMediaStream: true
});

function start () {
  if (groupField.value.length === 0) {
    console.warn('Please provide a group name.')
    return
  }
  submitButton.disabled = true
  rtcConfig.groupName = groupField.value
  new red5prosdk.RTCConferenceParticipant()
    .init(rtcConfig)
    .then(function (publisher) {
      streamTitle.innerText = configuration.stream1;
      participant = publisher
      participant.on('*', onPublisherEvent);
      return participant.publish();
    })
    .then(function () {
      onPublishSuccess(participant);
    })
    .catch(function (error) {
      var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
      console.error('[Red5ProPublisher] :: Error in publishing - ' + jsonError);
      onPublishFail(jsonError);
    });
}

submitButton.addEventListener('click', start)
```

Once the `Conference.MediaStream` event is captured, the provided `MediaStream` is set as the `srcObject` on a `video` element on the page:

```js
function showIncomingAudioVideo (stream) {
  conferenceVideo.srcObject = stream
  conferenceVideo.classList.remove('hidden')
  document.getElementById('red5pro-publisher').classList.add('minimized')
}
```

The `MediaStream` contains 3 audio tracks and a single composited video track of all Conference Group participants.
