# Conference Participation using Red5 Pro

This is an example of subscribing to a group conference using an `RTCConferenceParticipant` from the Red5 Pro HTML SDK.

The `RTCConferenceParticipant` is an extension of `RTCPublisher` that receives additional tracks to playback multiple audio sources along with a single composited video of all participants in the conference group.

## Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

# Submitting a Provision for a Group

Before Joining a Conference Group as a Participant, a Group Provision needs to be available on the server.

```js
var provision = {
  guid: undefined,
  context: undefined,
  name: undefined,
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

function postProvision (groupName, context) {
  provision = Object.assign(provision, {
    guid: context,
    context: context,
    name: groupName
  })
  var host = rtcConfig.host;
  var port = serverSettings.httpport;
  var baseUrl = protocol + '://' + host + ':' + port;
  var provisionUrl = baseUrl + '/cluster/api?action=provision.create'
  return new Promise(function (resolve, reject) {
    fetch(provisionUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({provisions: [provision]})
    }).then(function (res) {
      if (res.status === 200) {
        resolve(true)
      }
    }).catch(function (error) {
      reject(error)
    })
  })
}
```

The `guid` and `context` attributes for the provision take the form of `<webapp name>/<group name>`.

> For this example, which is broadcasting the `live` webapp with a group name of `red5pro`, that would result in `live/red5pro`.

Once the provision is submitted properly, you can check if the provision exists - as well as any current participants - by visiting [http://localhost:5080/live/groupinfo.jsp?group=live/red5pro](http://localhost:5080/live/groupinfo.jsp?group=live/red5pro).

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
  rtcConfig.app = [rtcConfig.app, groupName].join('/')
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
function onPublisherEvent (event) {
  console.log('[Red5ProPublisher] ' + event.type + '.');
  updateStatusFromEvent(event);
  if (event.type === 'Conference.MediaStream') {
    try {
      var pc = participant.getPeerConnection();
      window.trackBitrate(pc, onBitrateUpdate, onResolutionUpdate, true);
      statisticsField.classList.remove('hidden');
    } catch (e) {
      // no tracking for you!
    }
    conferenceVideo.srcObject = event.data.stream
  }
}
```

> The `MediaStream` contains 3 audio tracks and a single composited video track of all Conference Group participants.
