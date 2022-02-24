# Stream Manager Proxy Conference Participant

The streammanager WebRTC proxy is a communication layer built inside streammanager web application which allows it to act as a proxy gateway for webrtc publishers / subscribers. The target use case of this communication layer is to facilitate a secure browser client to be able to connect to a "unsecure" remote websocket endpoint for consuming WebRTC services offered by Red5pro. 

Streammanager autoscaling works with dynamic nodes which are associated with dynamic IP addresses and cannot have a SSL attached to them. The proxy layer helps publishers to connect and initiate a WebRTC publish session from a `secure` (ssl enabled) domain to a `unsecure` Red5pro origin having using an IP address.


**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup.**

> In order to properly run the Stream Manager examples, you will need to configure you server for cluster infrastructure as described in the following documentation: [https://www.red5pro.com/docs/server/autoscale/](https://www.red5pro.com/docs/server/autoscale/).

> You also need to ensure that the stream manager proxy layer is `enabled`. The configuration section can be found in stream manager's config file - `red5-web.properties`


```
## WEBSOCKET PROXY SECTION
proxy.enabled=false
```

## Conference Participant Testbed
The testbed shows how to join a video conference that uses a Red5 Pro mixer to create a composition for the conference that is returned as a single video stream to conference participants along with a mix-minus audio track. The testbed includes two players: one shows the participant's published stream while the other the stream returned by the Mixer.

The mixed stream returned to the participant is created and managed by a Conference Host using the [Conference Host Testbed](../conferenceHostStreamManagerProxy)

The page starts by connecting to a [WebSocket server](../../../../backend-mixer-testbeds) and publishing into a waiting room using a `RTCPublisher`. The WebSocket server notifies any `Conference Host` connected to the same room that can add the participant to the conference. When a participant is added, its testbed is notified by the WebSocket server. As a result the participant joins the conference using the `RTCConferenceParticipant` publisher that publishes the participant's stream into the conference and receives back the mixed video from the mixer along with a set of mix-minus audio tracks. 

The `Conference Participant` testbed can be used as follows:
1. Open the `Red5 Pro Testbed Settings Page`, set Web App to `live/<room>`, where `<room>` is a room scope. In the same page, scroll to the `Mixer Specific` section and set the `Backend WebSocket For Compositions` endpoint to point to the [WebSocket server](../../../../backend-mixer-testbeds)
2. While on the `Mixer Specific` section, check `Enable Round Trip Authentication` if the Round Trip Authentication was configured in the `live` app.
3. Head to the `Conference Participant` testbed by clicking `Testbed Menu` -> `Stream Manager Mixer Tests` -> `Conference Participant`. 
4. If `Enable Round Trip Authentication` was checked at step 3, provide a set of mock username, password and token and click Submit
5. Click `Start Broadcast` to join the waiting room of the video conference for the room `<room>` configured in the `Settings` page.
6. When the `Conference Host` in the same room adds the participant to the conference, the participant will receive back the mixed conference stream. See the [Conference Host Testbed](../conferenceHostStreamManagerProxy).