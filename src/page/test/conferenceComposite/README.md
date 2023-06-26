# Conference Participation using Red5 Pro

This is an example of subscribing to all participants of a Group Conference. Additionally, it provides the ability to broadcast out the composite stream as the main group stream.

To start a Participant, visit the [Conference Participant](../conferenceParticipant) example.

> Please start at least one particpant before starting the composite example.

---

This is an example of subscribing to a group conference using an `RTCConferenceParticipant` from the Red5 Pro HTML SDK.

The `RTCConferenceParticipant` is an extension of `RTCPublisher` that receives additional tracks to playback multiple audio sources along with a single composited video of all participants in the conference group.

## Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

# How to Access Group Info

The example first polls for group info related to the `group name` submitted:

```js
function parseGroup (data) {
  var streams = data.data.streams
  var newStreams = streams.filter(function (entry) {
    return currentStreams.indexOf(entry.stream) === -1 && entry.stream !== groupName
  })
  currentStreams = streams.map(function (entry) {
    return entry.stream
  })
  addNewStreams(newStreams)
  broadcastButton.disabled = currentStreams.length <= 0
}

function runCompositePoll () {
  var url = `${baseQueryURL}?group=${rtcConfig.app}/${groupName}`
  fetch(url)
    .then(function (res) {
      if (res.headers.get('content-type') &&
          res.headers.get('content-type').toLowerCase().indexOf('application/json') >= 0) {
        return res.json();
      } else {
        return res.text();
      }
    })
    .then(function (jsonOrString) {
      var json = jsonOrString;
      if (typeof jsonOrString === 'string') {
        try {
          json = JSON.parse(json);
        } catch(e) {
          throw new TypeError('Could not properly parse response: ' + e.message);
        }
      }
      parseGroup(json);
    })
    .catch(function (e) {
      console.error(e)
    })
  }
```

As new participants are recognized as having joined the group, they are added to the grid display (a.k.a., composite).

## Broadcast Main Stream

The main stream for the group has the same stream name as the group name. This example allows for starting a screenshare session that captures the Composite view of gridded participants:

```js
function startBroadcast (groupName) {
  var v = document.createElement('video')
  v.id = screenshareId
  v.classList.add('hidden')
  document.body.appendChild(v)
  conferenceContainer.classList.add('conference-out')
  navigator.mediaDevices.getDisplayMedia({audio: false, video: true})
    .then(function (stream) {
      var ssConfig = Object.assign({}, rtcConfig, {
        app: [rtcConfig.app, groupName].join('/'),
        groupName: groupName,
        streamName: groupName,
        mediaElementId :screenshareId
      })
      new red5prosdk.RTCPublisher().initWithStream(ssConfig, stream)
        .then(function (publisher) {
          screenshare = publisher
          screenshare.on('*', onScreenshareEvent)
          return screenshare.publish()
        })
        .then(function () {
          screenshare.getMediaStream().getVideoTracks().forEach(function (track) {
            track.onended = endBroadcast
          })
        })
        .catch(function (error) {
          console.error('Could not start screenshare: ' + error.message)
          endBroadcast()
        })
    })
}
```
