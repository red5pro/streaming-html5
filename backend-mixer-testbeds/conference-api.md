# Conference API
WebSocket API used by the [Conference Layout](../src/page/sample-mixer-pages/conference), [Conference Host Testbed](../src/page/sm-mixer/conferenceHostStreamManagerProxy) and [Conference Participant Testbed](../src/page/sm-mixer/conferenceParticipantStreamManagerProxy).

## API Usage - Ingest

### Connection

The initial websocket connection is expecting a `room` parameter which specifies the `<webapp>/<room name>` that the WebSocket wants to connect to and listen for updates for exclusion and stream lists, e.g.,:

```sh
ws://localhost:8001?testbed=conference&room=live/room1&host=true&mixer=true
```

> If `host=true` or `mixer=true` is provided, the WebSocket connection will also be notified of change to Conference Stream List. This is due to the `host` being able to orchestrates layout mixes for single streams and the `mixer` reacting to it.

The following payloads are expected from a WebSocket client with regards to adding, removing and excluding streams, from which lists will be invoked on the receiving WebSocket clients.

### Exclude Stream from Conference

```js
{
  "type": "exclude",
  "room": "live/room1",
  "streamName": "stream1"
}
```
* `type` - is `exclude`.
* `room` - room scope where the stream is published.
* `streamName` - string representing the stream name that has been excluded by a host.

### Promote an Active stream to Conference List

```js
{
  "type": "promote",
  "room": "live/room1",
  "streamName": "stream1"
}
```
* `type` - is `promote`.
* `room` - room scope where the stream is published.
* `streamName` - string representing the stream name that has been promoted by a host to a conference.
  
### Demote a stream in Conference back to Active

```js
{
  "type": "demote",
  "room": "live/room1",
  "streamName": "stream1"
}
```
* `type` - is `demote`.
* `room` - room scope where the stream is published.
* `streamName` - string representing the stream name that has been demoted by a host from a conference.


### Set Stream as Presenter in Conference

```js
{
  "type": "presenter",
  "room": "live/room1",
  "streamName": "stream1"
}
```
* `type` - is `presenter`.
* `room` - room scope where the stream is published.
* `streamName` - string representing the stream name that has been selected as presenter by a host.

### Set Order Index of Stream in Conference

```js
{
  "type": "order",
  "room": "live/room1",
  "order": 3,
  "streamName": "stream1"
}
```
* `type` - is `order`.
* `room` - room scope where the stream is published.
* `order` - is a number indicating the new index for the stream.
* `streamName` - string representing the stream name whose order has been changed by a host.

> Will place `stream1` at index `3` within `streams` listing for `conference` payload.

The following payloads are expected from a Host WebSocket client with regards to creating and destroying compositions for the live streams that are part of a conference.

### Create Composition On Mixer

```js
{
  "type": "createComposition",
  "context": "live/room1",
  "event": "composition1",
  "transcodeComposition": "true|false", 
  "name": "room1", 
  "size":"1",
  "cefpage":[
    "http://127.0.0.1:8000/mixer1"
  ],
  "location":[ 
         "us-east-1"
  ]
}
```
* `type` - is `createComposition`
* `context` - is the context where the output stream will be published, for example `live/room1`
* `event` - is the unique event name for the composition
* `transcodeComposition` - is `true|false` depending on whether the composition needs to be transcoded or not
* `name` - is the name of the composed stream published by the Mixer
* `size` - is the number of Mixers that the Stream Manager should create
* `cefpage` - is an array of HTML5 pages, one for each Mixer
* `location` - is the region name where the Mixers should be created 

### Get Active Compositions

```js
{
  "type": "getActiveCompositions"
}
```
 > the server responds by sending an `activeCompositions` message 

### Destroy Composition On Mixer

```js
{
  "type": "destroyComposition",
  "event": "composition1"
}
```
* `type` - is `destroyComposition`
* `event` - is the unique name of the composition to destroy

## API Usage - Egress

The following payloads are sent to connected WebSocket clients as stream listings for "active" and "excluded" streams are updated on the server.

### Active Stream List

> Streams can be listed in both `active` and `conference`. "Active" means it is currently available to be `promoted` or `demoted` to and from a `conference`.

```js
{
  type: 'active',
  room: 'live/room1',
  screenshareName: 'stream1_screenshare',
  streams: ['stream1', 'stream2']
}
```

* `type` - is `active`.
* `room` - room scope where the streams are published.
* `screenshareName` - if available, when a user has started a screenshare. This will allow listen clients to know whether or not they have the ability to start a screenshare; only one active screenshare at a time.
* `streams` - an array of strings representing each stream name currently active.

### Excluded Stream List

```js
{
  type: 'excluded',
  room: 'live/room1',
  streams: ['stream1', 'stream2']
}
```

* `type` - is `excluded`.
* `room` - room scope where the streams are published.
* `streams` - an array of strings representing each stream name currently excluded from the room/conference.

### Conference Streams

```js
{
  type: 'conference',
  room: 'live/room1',
  presenter: 'stream1',
  streams: ['stream1', 'stream2']
}
```
* `type` - is `conference`.
* `room` - room scope where the streams are published.
* `presenter` - the stream name from the list that is currently in "focus" for the conference.
* `streams` - an array of strings representing each stream name that has been promoted from the `active` by a host.

### Active Compositions
The server sends this message every time the list of active compositions is updated or a client requests it with a `getActiveCompositions` message

```js
{
  "type": "activeCompositions",
	"list": [
		{
			"context": "live/room1",
			"event": "composition1", 
			"name": "room1",
			"mixers": [
				{
					"id": "a3d4",
					"serverAddress": "43.45.34.23",
					"location": "us-east-1",
					"name": "room1",
					"state": "pending|inservice|composing|terminating",
   				"isWebSocketConnected":true|false
  				"page": `<URL-of-page-loaded>`
        }
			]
		}
	]
}
```
* `type` - is `activeCompositions`
* `list` - is an array of compositions
* `context` - is the context where the output stream of that composition is published, for example `live/room1`
* `event` - is the unique event name for the composition
* `name` - is the name of the composed stream published by the output Mixer 
* `mixers` - is the array of mixers of that composition 
* `id` - is the unique id of the Mixer
* `serverAddress` - is the IP address of the Mixer server
* `location` - is the region name where the Mixer is deployed
* `state` - is `pending|inservice|composing|terminating` and it signals the state of the Mixer instance
* `isWebSocketConnected` - is `true|false` and it signals if the Mixer page has connected to the WebSocket server
* `page` - is the URL of the HTML5 page loaded in the Mixer