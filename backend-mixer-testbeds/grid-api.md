# Grid Composition API
WebSocket API used by the [2x2 Grid](../src/page/sample-mixer-pages/2x2), [3x3 Grid](../src/page/sample-mixer-pages/3x3), [NxN Grid](../src/page/sample-mixer-pages/nxn) and [Grid Composition Manager Testbed](../src/page/sm-mixer/gridMixerCompositionStreamManagerProxy).

## Connection

The initial websocket connection is expecting a `type` parameter, which specifies the testbed type that is connecting to the server, and an `id` that indentifies the client. The accepted types are `cef` that identifies the HTML5 page loaded in a Mixer, `manager` that identifies an Editor page and `videowall` that identifies a video wall. 

The websocket endpoint will look like:

```sh
wss://<host>?testbed=grid&type=<type>&id=<id>
```

## Active Streams
The server sends this message every time the list of active streams is updated or a client requests it with a `getActiveStreams` message

```js
{
  "type": 'activeStreams',
  "list": [
    {
      "room":<room>,
      "streams":[
        <stream-1>,<stream2>
      ]
    }
  ]
}
```
* `type` - is `activeStreams`
* `list` - list of rooms and published streams
* `room` - is the name of the room
* `streams` - is an array of stream names that are active in the corresponding room

## Get Active Streams
An Editor can request the list of active streams using this message 

```js
{
  "type": "getActiveStreams"
}
```

## Create Composition
The Editor page sends this message to create a composition. The server calls the corresponding Stream Manager API.

```js
{
  "type": "createComposition",
  "event": "event1",
  "digest": "password",
  "transcodeComposition": false,
  "mixers": [
    {
      "mixerName": "1",
      "mixingPage": "http://localhost:5080/client/editor/editor.html?ws=localhost:8000",
      "streamName": "stream1",
      "path": "mixertestbeds",
      "width": "1280",
      "height": "720",
      "framerate": "30",
      "bitrate": "1500",
      "doForward": true,
      "destinationMixerName": ""
    }
  ],
  "location": [
    "us-east-1"
  ]
}
```
* `type` - is `createComposition`
* `event` - is the unique event name for the composition
* `transcodeComposition` - It determines if the final composition will be published to a transcoder node or an origin
* `digest` - A password for CEF 
* `mixers` - array with the data to provide to each mixer
  * `mixerName` - unique identifier for a mixer 
  * `mixingPage` - URL of the page to load in the Mixer
  * `streamName` - streamName that the mixer will use to publish its composition. 
  * `path` - scope where the mixer will publish its composition. 
  * `width` - width for the composition
  * `height` - height for the composition
  * `framerate` - framerate for the composition
  * `bitrate` - bitrate for the composition
  * `doForward` - determines if the composition will be forwarded to another server. 
  * `destinationMixerName` - mixerName of the destination mixer to forward to. If this parameter is missing then the stream will be forwarded to a transcoder or origin depending on the value of transcodeComposition.
* `location` - region where to deploy the Mixers. For the first version the Mixers will be deployed in the same region. For later versions we may want to support Mixers in multiple regions. 

## Active Compositions
The server sends this message every time the list of active compositions is updated or a client requests it with a `getActiveCompositions` message

```js
{
  "type": "activeCompositions",
  "list": [
    {
      "event": `<event-name OR UUID>`, 
      "transcodeComposition": true|false,
      "mixers": [
        {
          "id": `<id>`,
          "mixerName": `<mixerName>`,
          "location": `<location>`,
          "mixingPage": `<URL-of-mixing-page>`,
          "streamName": `<composed-stream-name>`,
          "path": `<scope-of-stream>`,
          "serverAddress": `<IP>`,
          "destination": `<IP-of-destination>`,
          "state": "pending|inservice|composing|terminating",
          "isWebSocketConnected":true|false
          "streams": {
            "muted": [
              `<stream-name>`, `<stream-name>`
            ],
            "unmuted": [
                `<stream-name>`, `<stream-name>`
            ]
          }
        }
      ]
    }
  ]
}
```
* `type` - is `activeCompositions`
* `list` - is an array of compositions
  * `event` - is the unique event name for the composition
  * `transcodeComposition` - It determines if the final composition will be published to a transcoder node or an origin
  * `mixers` - is the array mixers of that composition 
    * `id` - is the unique id of the Mixer
    * `mixerName` - mixerName as passed in the create composition request
    * `location` - is the region name where the Mixer is deployed
    * `mixingPage` - is the URL of the HTML5 page loaded in the Mixer
    * `streamName` - is the name of the stream this mixer will publish
    * `path` - is the scope where this mixer will publish its stream
    * `serverAddress` - is the IP address of this Mixer server
    * `destination` - is the IP address of the server this Mixer will forward its composition to
    * `state` - is `pending|inservice|composing|terminating` and it signals the state of the Mixer instance
    * `isWebSocketConnected` - is `true|false` and it signals if the Mixer page has connected to the WebSocket server
    * `streams` - is the array of streams the mixer is subscribing to
    * `muted` - is the list of muted stream names in the composition 
    * `unmuted` - is the list of unmuted stream names in the composition 

## Get Active Compositions
An Editor can request the list of active compositions using this message 

```js
{
  "type": "getActiveCompositions"
}
```

## Destroy Composition
An Editor can use this message to destroy a composition. The server will call the corresponding Stream Manager API to destroy this composition 

```js
{
  "type": "destroyComposition",
  "event": `<composition-name>`
}
```
* `type` - is `destroyComposition`
* `event` - is the unique name of the composition

## Update Composition
The Editor page will send this message add, remove, mute or unmute live streams from a composition. The server will forward the composition update to the correspondong mixer node. 

```js
{
  "type": "compositionUpdate",
  "event":`<composition-name>`,
	"list": [
		{
			"cef-id": `<mixer-id>`,
			"add": [
				`<stream-name>`, `<stream-name>`
			],
			"remove": [
				`<stream-name>`, `<stream-name>`
			],
			"mute": [
				`<stream-name>`, `<stream-name>`
			],
 			"unmute": [
				`<stream-name>`, `<stream-name>`
			]
    }
  ]
}
```
* `type` - is `compositionUpdate`
* `event` - is the unique name of the composition to update 
* `list` - is the list of mixers whose compositions need to be updated 
* `cef-id` - is the unique id of the mixer 
* `add` - is the array of stream names to add to the composition 
* `remove` - is the array of stream names to remove from the composition 
* `mute`- is the array of steam names to mute from the composition 
* `unmute` is the array of stream names to unmute from the composition 