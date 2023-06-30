# Stream Manager Proxy Conference Host

The streammanager WebRTC proxy is a communication layer built inside streammanager web application which allows it to act as a proxy gateway for webrtc publishers/subscribers. The target use case of this communication layer is to facilitate a secure browser client to be able to connect to an "unsecured" remote WebSocket endpoint for consuming WebRTC services offered by Red5pro.

Streammanager autoscaling works with dynamic nodes which are associated with dynamic IP addresses and cannot have an SSL attached to them. The proxy layer helps publishers to connect and initiate a WebRTC publish session from a `secure` (SSL enabled) domain to an `unsecure` Red5pro origin using an IP address.

**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup.**

> In order to properly run the Stream Manager examples, you will need an autoscale environment. See [cloud-specific setup details here](https://www.red5pro.com/docs/installation/).

> You also need to ensure that the stream manager proxy layer is `enabled`. The configuration section can be found in the stream manager's config file - `red5-web.properties`

```sh
## WEBSOCKET PROXY SECTION
proxy.enabled=false
```

## Conference Host Testbed

The testbed shows how to create a video conference that uses a Red5 Pro mixer to create a composition for the conference that is returned as a single video stream to conference participants along with a mix-minus audio track. The page includes a form to create a composition, a section to manage participants in a waiting room, and a section to see and manage participants that are part of the video conference.

A Mixer based video conference requires:

- A HTML5 page for the Mixer
- A Front-end for the Host
- A Front-end for the Participants

## HTML5 page for the Mixer

The HTML5 page for the Mixer is responsible for subscribing to the conference participant's streams that will be shown in the composite stream. The composite stream is returned to participants to allow them to see the other participants and it can be consumed by third parties to watch the whole conference.

The Red5 Pro testbeds provide a sample [Conference Layout](../../sample-mixer-pages/conference) page for this purpose. The page shows the focused presenter on the top row and the other participants in the bottom row.

## Front-end for the Participants

The Red5 Pro testbeds provide a sample `Conference Participant - Stream Manager Proxy` page. It allows to publish a stream to the waiting room of a conference and receive back a composite stream and mix-minus audio once added to the conference.

The page includes:

- A form to submit the Round Trip Authentication credentials if authentication is enabled
- A small player on the right for the published stream
- A larger player on the left for the composite stream

As a Participant join a video conference as follows:

1. Open the `Red5 Pro Testbed Settings Page`, set `Web App` to `live/<room>`, where `<room>` is a room scope. A room scope is always required when creating a mixed conference.
2. While on the `Settings Page`, scroll to the `Mixer Specific` section and set the `Backend WebSocket For Compositions` endpoint to point to the Node.js Server deployed as Back-end for the Mixer testbeds.
3. While on the `Mixer Specific` section, check `Enable Round Trip Authentication` if the Round Trip Authentication was configured in the `live` app.
4. Head to the `Conference Participant` testbed by clicking `Testbed Menu` -> `Stream Manager Mixer Tests` -> `Conference Participant`.
5. If `Enable Round Trip Authentication` was checked at step 3, provide a mock username, password, and token and click `Submit`
6. Click `Start Broadcast` to join the waiting room of the video conference for the room `<room>` configured on the `Settings` page.
7. As soon as the `Conference Host` adds the participant to the conference, the composite stream will appear in the player on the left. Continue to the next section to see how to create a conference as a Host and add Participants to it.

## Front-end for the Host

The Red5 Pro testbeds provide a sample `Conference Host - Stream Manager Proxy` page. It allows a Host to create a mixed video conference with a Red5 Pro Mixer that loads an HTML5 page that subscribes to the Participant's streams.

The page includes:

- A form to submit the Round Trip Authentication credentials if authentication is enabled
- A form on the left to create the composition
- A section on the right to manage participants in a waiting room
- A central section to see and manage participants that are part of the video conference and composite stream.

As a Host creates a video conference as follows:

1. Open the `Red5 Pro Testbed Settings Page`, set `Web App` to `live/<room>`, where `<room>` is the same room scope used above.
2. While on the `Settings Page`, scroll to the `Mixer Specific` section and set the `Backend WebSocket For Compositions` endpoint to point to the Node.js Server deployed as Back-end for the Mixer testbeds.
3. While on the `Mixer Specific` section, check `Enable Round Trip Authentication` if the Round Trip Authentication was configured in the `live` app.
4. Head to the `Conference Host` testbed by clicking `Testbed Menu` -> `Stream Manager Mixer Tests` -> `Conference Host`.
5. If `Enable Round Trip Authentication` was checked at step 3, provide a random username, password, and token, and click `Submit`.
6. The right-hand side section of the testbed will display the streams in the waiting room that were published by the Conference Participants.
7. Create the composition using the `Create Composition` form. The form is pre-configured, but special attention must be paid to the `Mixer Region` field that must specify the region where the Red5 Pro Mixers are currently deployed. The other parameters are as follows:
   - Event Name: Unique event name or UUID.
   - Digest: String with the password that the Mixer will use for the Round Trip Authentication when publishing its _composite_ stream.
   - Mixing Page: Selector for the HTML5 page to load in the Mixer. The testbed allows selecting only the `focused` page that points to the sample `Conference Layout` page.
   - Scope: app and room name where the _composite_ stream is published by the mixer.
   - Stream Name: stream name of the _composite_ stream that will be published by the mixer. **Note:** The mixer of a conference must always publish its composite stream to `<app>/<room>/<room>`. That is, Stream Name must be equal to the value of `<room>`.
   - Width: Width of the _composite_ stream that will be published by the mixer
   - Height: height of the _composite_ stream that will be published by the mixer
   - Framerate: framerate of the _composite_ stream that will be published by the mixer
   - Bitrate: bitrate (in kbps) of the _composite_ stream that will be published by the mixer
   - Mixer Region: Name of the region where the Mixer servers are deployed.
8. Click `Create Composition` and scroll up to the `Active Composition` section where the state of the newly created composition will be shown.
9. Wait until the composition `State` becomes `Composing`.
10. Click on the `add to conference` button of one of the waiting room streams and verify it is moved to the central section of the page. That indicates the stream was added to the composition.
11. If the Round Trip Authentication is enabled, use the `Subscribe - Stream Manager Proxy RoundTrip Authentication` to subscribe to the composed stream published by the Mixer `<app>/<room>/<room>` to verify it includes the new Participant. Otherwise, use the `Subscribe - Stream Manager Proxy` testbed.
12. Interact with the `make presenter` and `remove from conference` buttons to verify the focused presenter and list of Participants changes in the `Conference Host` testbed and composite stream.
