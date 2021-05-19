# Stream Manager Proxy Conference Host

The streammanager WebRTC proxy is a communication layer built inside streammanager web application which allows it to act as a proxy gateway for webrtc publishers / subscribers. The target use case of this communication layer is to facilitate a secure browser client to be able to connect to a "unsecure" remote websocket endpoint for consuming WebRTC services offered by Red5pro. 

Streammanager autoscaling works with dynamic nodes which are associated with dynamic IP addresses and cannot have a SSL attached to them. The proxy layer helps publishers to connect and initiate a WebRTC publish session from a `secure` (ssl enabled) domain to a `unsecure` Red5pro origin having using an IP address.


**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup.**

> In order to properly run the Stream Manager examples, you will need to configure you server for cluster infrastructure as described in the following documentation: [https://www.red5pro.com/docs/server/autoscale/](https://www.red5pro.com/docs/server/autoscale/).

> You also need to ensure that the stream manager proxy layer is `enabled`. The configuration section can be found in stream manager's config file - `red5-web.properties`

`
## WEBSOCKET PROXY SECTION
proxy.enabled=false
`

## Conference Host Testbed
The testbed shows how to create a video conference that uses a Red5 Pro mixer to create a composition for the conference that is returned as a single video stream to conference participants along with a mix-minus audio track. The page includes a form to create a composition, a section to manage participants in a waiting room and a section to see and manage participants that are part of the video conference. 

The page loads the [Conference Layout](../../sample-mixer-pages/conference) into the Red5 Pro Mixer to create the composition and interfaces with a [WebSocket server](../../../../backend-mixer-testbeds) to dynamically update the composition as participants are added or removed, or the presenter is changed.

The compositions are created using the [Composition Stream Manager API](todo link does not exist yet)


Before using the testbed create a conference participant as follows:
1. Open the `Red5 Pro Testbed Settings Page`, set `Web App` to `mixertestbeds/<room>`, where `<room>` is a room scope. In the same page, scroll to the `Mixer Specific` section and set the `Backend WebSocket For Compositions` endpoint to point to the [WebSocket server](../../../../backend-mixer-testbeds)
2. Head to the `Conference Participant` testbed by clicking `Testbed Menu` -> `Stream Manager Mixer Tests` -> `Conference Participant`. 
3. Provide a set of mock username, password and token and click Submit
4. Click `Start Broadcast` to join the waiting room of the video conference for the room `<room>` configured in the `Settings` page.

Use the `Conference Host` testbed as follows:
1. Open the `Red5 Pro Testbed Settings Page`, set `Web App` to `mixertestbeds/<room>`, where `<room>` is the same room scope used above. In the same page, scroll to the `Mixer Specific` section and set the `Backend WebSocket For Compositions` endpoint to point to the [WebSocket server](../../../../backend-mixer-testbeds)
2. Head to the `Conference Host` testbed by clicking `Testbed Menu` -> `Stream Manager Mixer Tests` -> `Conference Host`. 
3. Create a mixer object using the `Create Mixer Objects` form. The form is pre-configured, but special attention must be paid to the `Mixer Region` field that must specify the region where the Red5 Pro Mixers are currently deployed.
4. Click `Create Composition` and scroll up to the `Active Composition` section where the state of the newly created composition will be shown. 
5. Wait until the composition `State` becomes `Composing`.
6. The right hand side section of the testbed will include the stream previously published that is in the waiting room. Use the buttons on its player to the stream to the conference. The UI will update and show the conference streams in the center of the page. 
7. Once the stream is added to the conference, the conference participant will receive back the mixed stream created by the mixer and a mix-minus audio track. 