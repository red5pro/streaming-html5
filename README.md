<h3 align="center">
  <img src="assets/red5pro_logo.png" alt="Red5 Pro Logo" />
</h3>
<p align="center">
  <a href="#requirements">requirements</a> &bull;
  <a href="#publishing">publishing</a> &bull;
  <a href="#subscribing">subscribing</a>
</p>

# Red5 Pro HTML Streaming Testbed

This repository contains a simple project with a number of examples that can be used for testing and reference for the Red5 Pro WebRTC SDK.

## Requirements

You will need a functional, running Red5 Pro server web- (or locally-) accessible for the client browser (mobile & desktop) to connect to.

For more information visit [Red5Pro.com](http://red5pro.com).

### Browser Compability

The Red5 Pro WebRTC SDK aims to utilize WebRTC for its streaming solution (both publishing and subscribing), but also provides HLS support for browsers that support it natively (e.g., Mobile and Desktop Safari).

> More information about browser compability can be viewed at the [WebRTC Peer Connnection information on caniuse.com](http://caniuse.com/#feat=rtcpeerconnection).

#### Publisher

The term **Publisher** in the context of Red5 Pro refers to a client that produces a broadcast stream. There are two types of instances from the SDK that can be utilized to start a **Publisher**:

1. `WHIPClient` - The `WHIPClient` relies on the [WebRTC-HTTP ingestion](https://www.ietf.org/archive/id/draft-ietf-wish-whip-01.html) protocl to establish a connection through series of HTTP/S requests.
2. `RTCPublisher` - The `RTCPublisher` relies on a `WebSocket` connection to establish a broadcast session.

The `WHEPClient` connection sequence is very fast - ~1 second - whereas the `RTCPublisher`, due to its reliance on a `WebSocket` can take roughly 3 - 5 seconds for a connection to stream.

#### Subscriber

The term **Subscriber** in the context of Red5 Pro refers to a client that consumes and plays back an already live broadcast stream. There are three types of instances from the SDK that can be utilized to start a **Subscriber**:

1. `WHEPClient` - The `WHEPClient` relies on the [WebRTC-HTTP egress](https://www.ietf.org/archive/id/draft-murillo-whep-00.html) protocol to establish a connection through series of HTTP/S requests.
2. `RTCSubscriber` - The `RTCSubscriber` relies on a `WebSocket` connection to establish a broadcast session.
3. `HLSSubscriber` - The `HLSSubscriber` relies on the native ability to playback `HLS` streams (e.g., Mobile and Desktop Safari).

The `WHEPClient` connection sequence is very fast - ~1 second - whereas the `RTCPublisher`, due to its reliance on a `WebSocket` can take roughly 3 - 5 seconds for a connection to stream

The `HLSSubscriber` does not go through a connection sequence and streams the HLS directly from the server, however it does have an up to 6 second latency due to the length of its live segments.

> **NOTE**: The `WHIPClient` and `WHEPClient` were introduced in the `11.0.0` release of the Red5 Pro WebRTC SDK.

## Setup

You will need to modify the **Host** field from the _Settings_ page to point to your server instance's IP address. If you do not, the examples will not function when you build. If you are running the server locally, then your machine and mobile device need to be on the same WiFi network.

### Note on TLS and CORS

It is important to note that some of these examples - specifically those that involve publishing using WebRTC - require being run on TLS and, thusly, served over HTTPS. If running the examples on `localhost` you should not see an issues, but if your server is deployed remotely you will need to be sure that these examples are served over HTTPS and the proper Cross Origin Resource Sharing (CORS) settings are defined for the server.

- [Read More about Red5 Pro and SSL](https://www.red5pro.com/docs/server/ssl/overview/).
- [More information on CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).

### Instructions

To define the server instance's IP address, open the testbed webapp in a browser and navigate to the _Settings_ page if not presented upon launch. To access the _Settings_ back, select the **Home** item from the examples list located at the top.

To define the **Host** with the server instance's IP, click the _Host_ field f the form and enter in the local or remote IP address - e.g., `10.0.0.5`, `76.199.199.199`.

> Hint: You can also open the landing page of your server instance at port `5080` (i.e., `http://localhost:5080` if launched locally) and the page will display its IP in the upper-right corner.

### WHIP/WHEP Settings Option

You can select to prefer **WHIP/WHEP** from the _Settings_ page. By selecting this option, all tests will utilize the `WHEPClient` and `WHIPClient` for publishing and subscribing, respectively.

If you decide to de-select the **WHIP/WHEP** option, all tests will revert to using the `RTCPublisher` and `RTCSubscriber` for publishing and subscibing, respectively. These instances require WebSocket support in the browser during their negotiation stage. Once the connection is made, the messaging transport system is switching to `RTCDataChannel` and the WebSocket is closed.

## Examples

### Publishing

| **[Publisher](src/page/test/publish)**
| :-----
| _Basic publisher example using WebRTC, with option to utilize either [WebRTC-HTTP ingestion](https://www.ietf.org/archive/id/draft-ietf-wish-whip-01.html)(a.k.a., `WHIP`) or `WebSockets` to establish a broadcast connection._

| **[1080p](src/page/test/publish1080)**
| :-----
| _A high quality publisher._

| **[Append](src/page/test/publishAppend)**
| :-----
| _Demonstrates recording a stream to the server with append option._

| **[Authentication](src/page/test/publishAuth)**
| :-----
| _Demonstrates authentication with the Simple-Auth-Plugin for publishing._

| **[Camera Source](src/page/test/publishCameraSource)**
| :-----
| _Demonstrates selecting the desired camera to publish with._

| **[Camera Swap](src/page/test/publishCameraSwap)**
| :-----
| _Demonstrates a request for a `MediaStream` with a defined `video` source for the constraint based on the Rear and Front facing cameras of a mobile device and a browser that supports `facingMode` media contraints._

| **[Custom Settings](src/page/test/publishCustomSettingsWebRTC)**
| :-----
| _Allows you to customize the media broadcast settings for a WebRTC Publisher._

| **[Custom Audio Settings](src/page/test/publishAudioCustomSettingsWebRTC)**
| :-----
| _Allows you to customize the audio settings for a WebRTC Publisher._

| **[MediaStream Swap](src/page/test/publishMediaStreamCamera)**
| :-----
| _Demonstrates using `replaceTrack` to swap in a different Camera source dynamically for WebRTC-based Publishers._

| **[Image Capture](src/page/test/publishImageCapture)**
| :-----
| _Demonstrates capturing an image of a live video being published._

| **[Mute](src/page/test/publishMute)**
| :-----
| _Muting and unmuting audio for a live video being published._

| **[Record](src/page/test/publishRecord)**
| :-----
| _Demonstrates recording a stream to the server for VOD (Video-On-Demand) playback._

| **[Append](src/page/test/publishAppend)**
| :-----
| _Demonstrates record-append function a stream to the server for VOD (Video-On-Demand) playback._

| **[Remote Call](src/page/test/publishRemoteCall)**
| :-----
| _Demonstrates sending a remote message to all subscribed clients._

| **[Round Trip Authentication](src/page/test/publishRoundTripAuth)**
| :-----
| _An example of utilizing round-trip authentication with Red5 Pro._

| **[Screen Share](src/page/test/publishScreenShare)**
| :-----
| _An example of utilizing the screen sharing capabilities of_ **Chrome** _and_ **Firefox**.<br> For use with Subscribe Screen Share example.

| **[Shared Object](src/page/test/publishSharedObject)**
| :-----
| _Demonstrates using remote Shared Object to send and recieve information between connected clients._

| **[Social Media Stream Push](src/page/test/publishSocialPusher)**
| :-----
| _An example of rebroadcasting a live stream to a social media platform._

| **[VP8](src/page/test/publishVP8)**
| :-----
| _An example for requesting VP8 video codec on publish_

### Publishing - Stream Manager Examples

| **[Stream Manager](src/page/sm-test/publishStreamManager)**
| :-----
| _Demonstrates utilizing the Red5 Pro Stream Manager API to publish to an autoscaling cluster's origin._

| **[Stream Manager Proxy](src/page/sm-test/publishStreamManagerProxy)**
| :-----
| _Demonstrates utilizing the Red5 Pro Stream Manager as an SSL WebSocket Proxy to publish WebRTC to an autoscaling cluster's origin._

| **[Stream Manager Proxy Camera Select](src/page/sm-test/publishStreamManagerProxyCamera)**
| :-----
| _Demonstrates utilizing the Red5 Pro Stream Manager as an SSL WebSocket Proxy to publish WebRTC to an autoscaling cluster's origin with camera select._

| **[Stream Manager Proxy Settings](src/page/sm-test/publishStreamManagerProxySettings)**
| :-----
| _Demonstrates utilizing the Red5 Pro Stream Manager as an SSL WebSocket Proxy to publish WebRTC with custom video settings to an autoscaling cluster's origin._

| **[Stream Manager Proxy Settings with Audio](src/page/sm-test/publishStreamManagerProxyAudioSettings)**
| :-----
| _Demonstrates utilizing the Red5 Pro Stream Manager as an SSL WebSocket Proxy to publish WebRTC with custom audio settings to an autoscaling cluster's origin._

| **[Stream Manager Proxy Round Trip Authenticaion](src/page/sm-test/publishStreamManagerProxyRoundTripAuth)**
| :-----
| _An example of utilizing round-trip authentication with Red5 Pro over Stream Manager Proxy._

| **[Stream Manager Proxy Screen Share](src/page/sm-test/publishStreamManagerProxyScreenShare)**
| :-----
| _An example of utilizing the screen sharing capabilities of_ **Chrome** _and_ **Firefox**. _For use with Stream Manager Proxy Subscribe Screen Share example._

| **[Stream Manager Proxy Social Media Stream Push](src/page/sm-test/publishStreamManagerSocialPusher)**
| :-----
| _An example of rebroadcasting a live stream to a social media platform._

| **[Stream Manager Transcode Provision Form](src/page/sm-test/publishStreamManagerProvisionForm)**
| :-----
| _Provides an easy form to POST a new Provision to the Stream Manager for ABR broadcasts. Once the provision is POSTed, use your favorite Media Encoder to broadcast the variants._

| **[Stream Manager Proxy Transcoder](src/page/sm-test/publishStreamManagerProxyTranscoderPOST)**
| :-----
| _Provides an easy form to POST a new Provision to the Stream Manager for ABR broadcasts and to start a single variant broadcast using the Transcoder._

| **[Stream Manager Proxy Transcoder with Authentication](src/page/sm-test/publishStreamManagerProxyTranscoderPOSTauth)**
| :-----
| _Provides an easy form to POST a new Provision to the Stream Manager for ABR broadcasts and to start a single variant broadcast using the Transcoder, including authentication._

| **[Stream Manager Proxy Validation](src/page/sm-test/publishStreamManagerProxyValidation)**
| :-----
| _An example of utilizing validation parameters with Red5 Pro over Stream Manager Proxy._

### Multi

| **[Two-Way](src/page/test/twoWay)**
| :-----
| _Demonstrates simultaneously publishing while subscribing - allowing a conversation. Includes stream detection and auto-connection._

| **[Two-Way Stream Manager Proxy](src/page/sm-test/TwoWayStreamManagerProxy)**
| :-----
| _The Two-Way example through a Stream Manager - including use of a proxy. Includes stream detection and auto-connection._

| **[Conference](src/page/test/conference)**
| :-----
| _Demonstrates multi-party communication using Red5 Pro. It also demonstrates using Shared Objects as notifications to recognize the addition and removal of parties broadcasting._

| **[Conference - Stream Manager](src/page/sm-test/ConferenceStreamManagerProxy)**
| :-----
| _Demonstrates multi-party communication using Red5 Pro over Stream Manager. It also demonstrates using Shared Objects as notifications to recognize the addition and removal of parties broadcasting._

| **[Shared Object (websockets only)](src/page/test/sharedObject)**
| :-----
| _Demonstrates the use of Shared Objects through a WebSocket proxy from the Red5 Pro HTML SDK._

### Subscribing

| **[Subscriber](src/page/test/subscribe)**
| :-----
| _Basic subscriber example with failover.<br>_ i.e, if no WebRTC browser support, then first Flash Player is detected, then HLS.

| **[360](src/page/test/subscribe360)**
| :-----
| _Example for subscribing to a 360 camera stream_

| **[Audio Only](src/page/test/subscribeAudioOnly)**
| :-----
| _Demonstrates playback of audio-only stream._

| **[Authentication](src/page/test/SubscribeAuth)**
| :-----
| _Demonstrates authentication with the Simple-Auth-Plugin for subscribing._

| **[Image Capture](src/page/test/subscribeImageCapture)**
| :-----
| _Demonstrates capturing an image of a live video being consumed._

| **[Cluster](src/page/test/subscribeCluster)**
| :-----
| _Demonstrates accessing an IP from the Red5 Pro Cluster API to subcribe to a live stream._

| **[HLS](src/page/test/subscribeHLS)**
| :-----
| _This is an example of subscribing to a stream using HLS Only._ In the event that HLS is not supported natively by the browser, the [hls.js](https://video-dev.github.io/hls.js/) 3rd-party library is utilized.

| **[Image Capture](src/page/test/subscribeImageCapture)**
| :-----
| _This example demonstrates capturing a still of the playback by using the `drawImage` API of `CanvasRenderingContext2D`._

| **[Reconnect](src/page/test/subscribeReconnect)**
| :-----
| _Demonstrates the failover mechanism of the Red5 Pro HTML SDK to select a subscriber based on browser support and to auto-reconnect on close of broadcast or loss of connection._

| **[Remote Call](src/page/test/subscribeRemoteCall)**
| :-----
| _Demonstrates receiving a remote message from broadcaster._

| **[Retry on Invalid Name](src/page/test/subscribeRetryOnInvalidName)**
| :-----
| _Demonstrates utilizing the `maintainConnectionOnSubscribeErrors` configuration property of a subscriber in order to maintain the WebSocket connection upon errors from the `subscribe` request after intializing.._

| **[Round Trip Authentication](src/page/test/subscribeRoundTripAuth)**
| :-----
| _An example of utilizing round-trip authentication with Red5 Pro over Stream Manager Proxy_

| **[Screen Share](src/page/test/subscribeScreenShare)**
| :-----
| _An example of utilizing the screen sharing capabilities of_ **Chrome** _and_ **Firefox**. _For use with Publish Screen Share example._

| **[Shared Object](src/page/test/subscribeSharedObject)**
| :-----
| _Demonstrates using remote Shared Object to send and recieve information between connected clients._

| **[Standby](src/page/test/subscribeStandby)**
| :-----
| _An example of using the Standby API to request a "pause" in receiving video and audio data on the MediaStream while also maintaining a connection of the client to the server._

| **[Stream Switch](src/page/test/subscribeSwitch)**
| :-----
| _An example that demonstrates switching of the current subscriber's stream to another live stream through WebRTC._

| **[Two Streams](src/page/test/subscribeTwoStreams)**
| :-----
| _An example that subscribes to two streams, using the `Stream1 Name` and `Stream 2 Name` variables from the settings page._

| **[Video Mute](src/page/test/subscribeVideoMute)**
| :-----
| _Example to demonstrate subscribing to a broadcast which has its video stream "muted"._

| **[VP8](src/page/test/subscribevp8)**
| :-----
| _Demonstrates requesting VP8 Video Encoding for a playback stream._

### Subscribing - Stream Manager Examples

| **[Stream Manager](src/page/sm-test/subscribeStreamManager)**
| :-----
| _Demonstrates utilizing the Red5 Pro Stream Manager API, and acting as SSL WebSocket Proxy, to access an Edge server IP to subscribe to a live stream._

| **[Stream Manager Proxy](src/page/sm-test/subscribeStreamManagerProxy)**
| :-----
| _Demonstrates utilizing the Red5 Pro Stream Manager API to access an Edge server IP to subscribe to a live stream._

| **[Stream Manager Proxy Reconnect](src/page/sm-test/subscribeStreamManagerProxyReconnect)**
| :-----
| _Demonstrates the failover mechanism of the Red5 Pro HTML SDK to select a subscriber based on browser support and to auto-reconnect on close of broadcast or loss of connection._

| **[Stream Manager Proxy Region](src/page/sm-test/subscribeStreamManagerProxyRegionRequest)**
| :-----
| _Demonstrates utilizing the Red5 Pro Stream Manager API to access an Edge server IP to subscribe to a live stream._

| **[Stream Manager Proxy Round Trip Authentication](src/page/sm-test/subscribeStreamManagerProxyRoundTripAuth)**
| :-----
| _Demonstrates subscribing using round trip authentication, region specified._

| **[Stream Manager Proxy Transcoder (RTC)](src/page/sm-test/subscribeStreamManagerProxyTranscoderRTC)**
| :-----
| _Demonstrates utilizing the Red5 Pro Stream Manager API to access Provisions and an Edge server IP to subscribe to a live WebRTC-based stream with Adaptive Bitrate Control._

| **[Stream Manager Proxy Transcoder (RTMP)](src/page/sm-test/subscribeStreamManagerProxyTranscoderRTMP)**
| :-----
| _Demonstrates utilizing the Red5 Pro Stream Manager API to access Provisions and an Edge server IP to subscribe to a live Flash-based stream with Adaptive Bitrate Control._

| **[Stream Manager Proxy Transcoder (HLS)](src/page/sm-test/subscribeStreamManagerProxyTranscoderHLS)**
| :-----
| _Demonstrates utilizing the Red5 Pro Stream Manager API to access Provisions and an Edge server IP to subscribe to a live HLS-based stream with Adaptive Bitrate Control._

| **[Stream Manager Proxy Screen Share](src/page/sm-test/subscribeStreamManagerProxyScreenShare)**
| :-----
| _An example of utilizing the screen sharing capabilities of_ **Chrome** _and_ **Firefox**. _For use with Publish Screen Share example._

### Mixer - Stream Manager Examples

| **[Stream Manager Proxy Conference Participant](src/page/sm-mixer/conferenceParticipantStreamManagerProxy)**
| :-----
| _Demonstrates utilizing the Red5 Pro Stream Manager API to join a video conference with a single return stream._

| **[Stream Manager Proxy Conference Host](src/page/sm-mixer/conferenceHostStreamManagerProxy)**
| :-----
| _Demonstrates utilizing the Red5 Pro Stream Manager API to host and manage a video conference with a single return stream._

| **[Stream Manager Grid Composition Host](src/page/sm-mixer/gridMixerCompositionStreamManagerProxy)**
| :-----
| _Demonstrates utilizing the Red5 Pro Stream Manager API to create and manage a composition of several live streams into a single stream._

| **[Stream Manager 2x2 Grid Layout Example](src/page/sample-mixer-pages/2x2)**
| :-----
| _Demonstrates composing a set of live streams into a 2x2 grid that can be loaded into a Red5 Pro Mixer to create a composition with up to 4 streams._

| **[Stream Manager 3x3 Grid Layout Example](src/page/sample-mixer-pages/3x3)**
| :-----
| _Demonstrates composing a set of live streams into a 3x3 grid that can be loaded into a Red5 Pro Mixer to create a composition with up to 9 streams._

| **[Stream Manager NxN Grid Layout Example](src/page/sample-mixer-pages/nxn)**
| :-----
| _Demonstrates composing a set of live streams into a NxN grid that can automatically resize as new streams are added to it. The page can be loaded into a Red5 Pro Mixer to create a composition with many streams._

| **[Stream Manager Conference Layout](src/page/sample-mixer-pages/conference)**
| :-----
| _Demonstrates composing a set of live streams into a focused layout for a video conference where the presenter is highlighted. The page can be loaded into a Red5 Pro Mixer to create a video conference with a single return stream._

## Notes

1. For the Subscriber examples, you will need to have a live stream currently being published and named based on the _Stream 1 Name_ field of the _Settings_. You can use another device to start streaming using this webapp, or you can also use a web browser to publish via Flash, [http://your_red5_pro_server_ip:5080/live](http://your_red5_pro_server_ip:5080/live).
2. You can see a list of active streams by navigating to [http://your_red5_pro_server_ip:5080/live/subscribe.jsp](http://your_red5_pro_server_ip:5080/live/subscribe.jsp) (will need to refresh this page after you have started publishing).
3. You can access the server IP of your Red5 Pro Server install - to be used in the _Host_ field of the _Settings_ - by opening [http://your_red5_pro_server_ip:5080/](http://your_red5_pro_server_ip:5080/) and finding the IP printed in the upper-right of the page.
4. Unless you are running the server locally, WebRTC publishing requires a valid SSL certificate.

[![Analytics](https://ga-beacon.appspot.com/UA-59819838-3/red5pro/streaming-html?pixel)](https://github.com/igrigorik/ga-beacon)
