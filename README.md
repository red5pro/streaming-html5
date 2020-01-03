<h3 align="center">
  <img src="assets/red5pro_logo.png" alt="Red5 Pro Logo" />
</h3>
<p align="center">
  <a href="#requirements">requirements</a> &bull;
  <a href="#publishing">publishing</a> &bull;
  <a href="#subscribing">subscribing</a>
</p>

# Red5 Pro HTML5 Streaming Testbed
This repository contains a simple project with a number of examples that can be used for testing and reference for the Red5 Pro HTML SDK.

> These examples are also shipped with the [Red5 Pro Server](https://account.red5pro.com/download) and can be found in the webapp `webrtcexamples`.

## Requirements

You will need a functional, running Red5 Pro server web- (or locally-) accessible for the client browser (mobile & desktop) to connect to.

For more information visit [Red5Pro.com](http://red5pro.com).

### Browser Compability
While the Red5 Pro HTML SDK aims to utilize WebRTC for its streaming solution (both publishing and subscribing), the SDK does support fallback support for non-supporting browsers in both contexts. The default failover order for both contexts, which can be redfined by developers, is:

#### Publisher
1. [WebRTC](https://webrtc.org/)
2. [Flash](http://www.adobe.com/software/flash/about/)

#### Subscriber
1. [WebRTC](https://webrtc.org/)
2. [Flash](http://www.adobe.com/software/flash/about/)
3. [HLS](https://developer.apple.com/streaming/)

More information about browser compability can be viewed at the [WebRTC Peer Connnection information on caniuse.com](http://caniuse.com/#feat=rtcpeerconnection).

## Setup

You will need to modify the **Host** field from the _Settings_ page to point to your server instance's IP address.  If you do not, the examples will not function when you build. If you are running the server locally, then your machine and mobile device need to be on the same WiFi network.

### Note on TLS and CORS
It is important to note that some of these examples - specifically those that involve publishing using WebRTC - require being run on TLS and, thusly, served over HTTPS. If running the examples on `localhost` you should not see an issues, but if your server is deployed remotely you will need to be sure that these examples are served over HTTPS and the proper Cross Origin Resource Sharing (CORS) settings are defined for the server.

* [Read More about Red5 Pro and SSL](https://red5pro.com/docs/server/red5prossl/index.html).
* [More information on CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).

### Instructions
To define the server instance's IP address, open the testbed webapp in a browser and navigate to the _Settings_ page if not presented upon launch. To access the _Settings_ back, select the **Home** item from the examples list located at the top.

To define the **Host** with the server instance's IP, click the _Host_ field f the form and enter in the local or remote IP address - e.g., `10.0.0.5`, `76.199.199.199`.

> Hint: You can also open the landing page of your server instance at port `5080` (i.e., `http://localhost:5080` if launched locally) and the page will display its IP in the upper-right corner.

## Examples

### Publishing

| **[Publisher](src/page/test/publish)**
| :-----
| *Basic publisher example using WebRTC with failover.<br>* i.e, if no WebRTC browser support, then Flash Player if detected.

| **[1080p](src/page/test/publish1080)**
| :-----
| *A high quality publisher.*

| **[Append](src/page/test/publishAppend)**
| :-----
| *Demonstrates recording a stream to the server with append option.*

| **[Authentication](src/page/test/publishAuth)**
| :-----
| *Demonstrates authentication with the Simple-Auth-Plugin for publishing.*

| **[Camera Source](src/page/test/publishCameraSource)**
| :-----
| *Demonstrates selecting the desired camera to publish with.*

| **[Camera Swap](src/page/test/publishCameraSwap)**
| :-----
| *Demonstrates a request for a `MediaStream` with a defined `video` source for the constraint based on the Rear and Front facing cameras of a mobile device and a browser that supports `facingMode` media contraints.*

| **[Custom Settings](src/page/test/publishCustomSettingsWebRTC)**
| :-----
| *Allows you to customize the media broadcast settings for a WebRTC Publisher..*

| **[MediaStream Swap](src/page/test/publishMediaStreamCamera)**
| :-----
| *Demonstrates using `replaceTrack` to swap in a different Camera source dynamically for WebRTC-based Publishers.*

| **[Image Capture](src/page/test/publishImageCapture)**
| :-----
| *Demonstrates capturing an image of a live video being published.*

| **[Mute](src/page/test/publishMute)**
| :-----
| *Muting and unmuting audio for a live video being published.*

| **[Record](src/page/test/publishRecord)**
| :-----
| *Demonstrates recording a stream to the server for VOD (Video-On-Demand) playback.*

| **[Append](src/page/test/publishAppend)**
| :-----
| *Demonstrates record-append function a stream to the server for VOD (Video-On-Demand) playback.*

| **[Remote Call](src/page/test/publishRemoteCall)**
| :-----
| *Demonstrates sending a remote message to all subscribed clients.*

| **[Round Trip Authentication](src/page/test/publishRoundTripAuth)**
| :-----
| *An example of utilizing round-trip authentication with Red5 Pro.*

| **[Shared Object](src/page/test/publishSharedObject)**
| :-----
| *Demonstrates using remote Shared Object to send and recieve information between connected clients.*

| **[Screen Share](src/page/test/publishScreenShare)**
| :-----
| *An example of utilizing the screen sharing capabilities of* **Chrome** *and* **Firefox**.<br> For use with Subscribe Screen Share example.

### Publishing - Stream Manager Examples

| **[Stream Manager](src/page/sm-test/publishStreamManager)**
| :-----
| *Demonstrates utilizing the Red5 Pro Stream Manager API to publish to an autoscaling cluster's origin.*

| **[Stream Manager Proxy](src/page/sm-test/publishStreamManagerProxy)**
| :-----
| *Demonstrates utilizing the Red5 Pro Stream Manager as an SSL WebSocket Proxy to publish WebRTC to an autoscaling cluster's origin.*

| **[Stream Manager Provision Form](src/page/sm-test/publishStreamManagerProvisionForm)**
| :-----
| *Provides an easy form to POST a new Provision to the Stream Manager for ABR broadcasts. Once the provision is POSTed, use your favorite Media Encoder to broadcast the variants.*

| **[Stream Manager Proxy Round Trip Authenticaion](src/page/sm-test/publishStreamManagerProxyRoundTripAuth)**
| :-----
| *An example of utilizing round-trip authentication with Red5 Pro over Stream Manager Proxy.*

| **[Stream Manager Proxy Screen Share](src/page/sm-test/publishStreamManagerProxyScreenShare)**
| :-----
| *An example of utilizing the screen sharing capabilities of* **Chrome** *and* **Firefox**. *For use with Stream Manager Proxy Subscribe Screen Share example.*

| **[Stream Manager Proxy Transcoder](src/page/sm-test/publishStreamManagerProxyTranscoderPOST)**
| :-----
| *Provides an easy form to POST a new Provision to the Stream Manager for ABR broadcasts and to start a single variant broadcast using the Transcoder.*

| **[Two-Way Stream Manager Proxy](src/page/sm-test/TwoWayStreamManagerProxy)**
| :-----
| *The Two-Way example through a Stream Manager - including use of a proxy. Includes stream detection and auto-connection.*

### Multi

| **[Two-Way](src/page/test/twoWay)**
| :-----
| *Demonstrates simultaneously publishing while subscribing - allowing a conversation. Includes stream detection and auto-connection.*

| **[Conference](src/page/test/conference)**
| :-----
| *Demonstrates multi-party communication using Red5 Pro. It also demonstrates using Shared Objects as notifications to recognize the addition and removal of parties broadcasting.*

| **[Shared Object (websockets only)](src/page/test/sharedObject)**
| :-----
| *Demonstrates the use of Shared Objects through a WebSocket proxy from the Red5 Pro HTML SDK.*

### Subscribing

| **[Subscriber](src/page/test/subscribe)**
| :-----
| *Basic subscriber example with failover.<br>* i.e, if no WebRTC browser support, then first Flash Player is detected, then HLS.

| **[360](src/page/test/subscribe360)**
| :-----
| *Example for subscribing to a 360 camera stream*

| **[Audio Only](src/page/test/subscribeAudioOnly)**
| :-----
| *Demonstrates playback of audio-only stream.*

| **[Authentication](src/page/test/SubscribeAuth)**
| :-----
| *Demonstrates authentication with the Simple-Auth-Plugin for subscribing.*

| **[Image Capture](src/page/test/subscribeImageCapture)**
| :-----
| *Demonstrates capturing an image of a live video being consumed.*

| **[Cluster](src/page/test/subscribeCluster)**
| :-----
| *Demonstrates accessing an IP from the Red5 Pro Cluster API to subcribe to a live stream.*

| **[HLS](src/page/test/subscribeHLS)**
| :-----
| *This is an example of subscribing to a stream using HLS Only.* In the event that HLS is not supported natively by the browser, the [hls.js](https://video-dev.github.io/hls.js/) 3rd-party library is utilized.

| **[Image Capture](src/page/test/subscribeImageCapture)**
| :-----
| *This example demonstrates capturing a still of the playback by using the `drawImage` API of `CanvasRenderingContext2D`.*

| **[Reconnect](src/page/test/subscribeReconnect)**
| :-----
| *Demonstrates the failover mechanism of the Red5 Pro HTML SDK to select a subscriber based on browser support and to auto-reconnect on close of broadcast or loss of connection.*

| **[Remote Call](src/page/test/subscribeRemoteCall)**
| :-----
| *Demonstrates receiving a remote message from broadcaster.*

| **[Retry on Invalid Name](src/page/test/subscribeRetryOnInvalidName)**
| :-----
| *Demonstrates utilizing the `maintainConnectionOnSubscribeErrors` configuration property of a subscriber in order to maintain the WebSocket connection upon errors from the `subscribe` request after intializing..*

| **[Round Trip Authentication](src/page/test/subscribeRoundTripAuth)**
| :-----
| *An example of utilizing round-trip authentication with Red5 Pro over Stream Manager Proxy*

| **[Screen Share](src/page/test/subscribeScreenShare)**
| :-----
| *An example of utilizing the screen sharing capabilities of* **Chrome** *and* **Firefox**. *For use with Publish Screen Share example.*

| **[Shared Object](src/page/test/subscribeSharedObject)**
| :-----
| *Demonstrates using remote Shared Object to send and recieve information between connected clients.*

| **[Standby](src/page/test/subscribeStandby)**
| :-----
| *An example of using the Standby API to request a "pause" in receiving video and audio data on the MediaStream while also maintaining a connection of the client to the server.*

| **[Two Streams](src/page/test/subscribeTwoStreams)**
| :-----
| *An example that subscribes to two streams, using the `Stream1 Name` and `Stream 2 Name` variables from the settings page.*

| **[Video Mute](src/page/test/subscribeVideoMute)**
| :-----
| *Example to demonstrate subscribing to a broadcast which has its video stream "muted".*

| **[VP8](src/page/test/subscribevp8)**
| :-----
| *Demonstrates requesting VP8 Video Encoding for a playback stream.*

### Subscribing - Stream Manager Examples

| **[Stream Manager](src/page/sm-test/subscribeStreamManager)**
| :-----
| *Demonstrates utilizing the Red5 Pro Stream Manager API, and acting as SSL WebSocket Proxy, to access an Edge server IP to subscribe to a live stream.*

| **[Stream Manager Proxy](src/page/sm-test/subscribeStreamManagerProxy)**
| :-----
| *Demonstrates utilizing the Red5 Pro Stream Manager API to access an Edge server IP to subscribe to a live stream.*

| **[Stream Manager Proxy Round Trip Authentication](src/page/sm-test/subscribeStreamManagerProxyRoundTripAuth)**
| :-----
| *Demonstrates subscribing using round trip authentication.*

| **[Stream Manager Proxy Transcoder (RTC)](src/page/sm-test/subscribeStreamManagerProxyTranscoder)**
| :-----
| *Demonstrates utilizing the Red5 Pro Stream Manager API to access Provisions and an Edge server IP to subscribe to a live WebRTC-based stream with Adaptive Bitrate Control.*

| **[Stream Manager Proxy Transcoder (RTMP)](src/page/sm-test/subscribeStreamManagerProxyTranscoderRTMP)**
| :-----
| *Demonstrates utilizing the Red5 Pro Stream Manager API to access Provisions and an Edge server IP to subscribe to a live Flash-based stream with Adaptive Bitrate Control.*

| **[Stream Manager Proxy Transcoder (HLS)](src/page/sm-test/subscribeStreamManagerProxyTranscoderHLS)**
| :-----
| *Demonstrates utilizing the Red5 Pro Stream Manager API to access Provisions and an Edge server IP to subscribe to a live HLS-based stream with Adaptive Bitrate Control.*

| **[Stream Manager Proxy Screen Share](src/page/sm-test/subscribeStreamManagerProxyScreenShare)**
| :-----
| *An example of utilizing the screen sharing capabilities of* **Chrome** *and* **Firefox**. *For use with Publish Screen Share example.*

## Notes

1. For the Subscriber examples, you will need to have a live stream currently being published and named based on the *Stream 1 Name* field of the _Settings_. You can use another device to start streaming using this webapp, or you can also use a web browser to publish via Flash, [http://your_red5_pro_server_ip:5080/live](http://your_red5_pro_server_ip:5080/live).
2. You can see a list of active streams by navigating to [http://your_red5_pro_server_ip:5080/live/subscribe.jsp](http://your_red5_pro_server_ip:5080/live/subscribe.jsp) (will need to refresh this page after you have started publishing).
3. You can access the server IP of your Red5 Pro Server install - to be used in the *Host* field of the _Settings_ - by opening [http://your_red5_pro_server_ip:5080/](http://your_red5_pro_server_ip:5080/) and finding the IP printed in the upper-right of the page.
4. Unless you are running the server locally, WebRTC publishing requires a valid SSL certificate.

[![Analytics](https://ga-beacon.appspot.com/UA-59819838-3/red5pro/streaming-html?pixel)](https://github.com/igrigorik/ga-beacon)
