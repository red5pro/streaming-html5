<h3 align="center">
  <img src="assets/red5pro_logo.png" alt="Red5 Pro Logo" />
</h3>
<p align="center">
  <a href="#requirements">requirements</a> &bull;
  <a href="#publishing">publishing</a> &bull;
  <a href="#subscribing">subscribing</a>
</p>
-------

# Red5 Pro HTML5 Streaming Testbed
This repository contains a simple project with a number of examples that can be used for testing and reference for the Red5 Pro HTML SDK.

> These examples are also shipped with the [Red5 Pro Server](https://account.red5pro.com/download) and can be found in the webapp `webrtcexamples`.

##Requirements

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

### [Publishing](src/page/test/publish)

| **[Publisher](src/page/test/publish)**
| :-----
| *Basic publisher example using WebRTC with failover.<br>*i.e, if no WebRTC browser support, then Flash Player if detected.*
|
| **[1080p](src/page/test/publish1080)**
| *A high quality publisher.*
|
| **[Audio Mode](src/page/test/publishAudioOnly)**
| *Demonstrates an Audio-Only broadcast for publishing.*
|
| **[Camera Source](src/page/test/publishCameraSource)**
| *Demonstrates selecting the desired camera to publish with.*
|
| **[Camera Swap](src/page/test/publishCameraSwap)**
| *Demonstrates swapping the front & rear camera of a mobile device.*<br>**MOBILE BROWSER SUPPORT LIMITED**
|
| **[Image Capture](src/page/test/publishImageCapture)**
| *Demonstrates capturing an image of a live video being published.*
|
| **[Stream Manager](src/page/test/publishStreamManager)**
| *Demonstrates utilizing the Red5 Pro Stream Manager to publish to a cluster's origin.*
|
| **[Record](src/page/test/publishRecord)**
| *Demonstrates recording a stream to the server for VOD (Video-On-Demand) playback.*
|
| **[Remote Call](src/page/test/publishRemoteCall)**
| *Demonstrates sending a remote message to all subscribed clients.*
|
| **[Shared Object](src/page/test/publishSharedObject)**
| *Demonstrates using remote Shared Object to send and recieve information between connected clients.*
|
| **[Two-Way](src/page/test/twoWay)**
| *Demonstrates simultaneously publishing while subscribing - allowing a conversation. Includes stream detection and auto-connection.*
|

### [Subscribing](src/page/test/subscribe)

| **[Subscriber](src/page/test/subscribe)**
| :-----
| *Basic subscriber example with failover.<br>*i.e, if no WebRTC browser support, then first Flash Player is detected, then HLS.*
|
| **[Audio Only](src/page/test/subscribeAudioOnly)**
| *Demonstrates playback of audio-only stream.*
|
| **[Image Capture](src/page/test/subscribeImageCapture)**
| *Demonstrates capturing an image of a live video being consumed.*
|
| **[Cluster](src/page/test/subscribeCluster)**
| *Demonstrates accessing an IP from the Red5 Pro Cluster API to subcribe to a live stream.*
|
| **[Stream Manager](src/page/test/subscribeStreamManager)**
| *Demonstrates utilizing the Red5 Pro Stream Manager API to access an Edge server IP to subscribe to a live stream.*
|
| **[Remote Call](src/page/test/subscribeRemoteCall)**
| *Demonstrates receiving a remote message from broadcaster.*
|
| **[Shared Object](src/page/test/subscribeSharedObject)**
| *Demonstrates using remote Shared Object to send and recieve information between connected clients.*
|

## Notes

1. For the Subscriber examples, you will need to have a live stream currently being published and named based on the *Stream 1 Name* field of the _Settings_. You can use another device to start streaming using this webapp, or you can also use a web browser to publish via Flash, [http://your_red5_pro_server_ip:5080/live](http://your_red5_pro_server_ip:5080/live).
2. You can see a list of active streams by navigating to [http://your_red5_pro_server_ip:5080/live/subscribe.jsp](http://your_red5_pro_server_ip:5080/live/subscribe.jsp) (will need to refresh this page after you have started publishing).
3. You can access the server IP of your Red5 Pro Server install - to be used in the *Host* field of the _Settings_ - by opening [http://your_red5_pro_server_ip:5080/](http://your_red5_pro_server_ip:5080/) and finding the IP printed in the upper-right of the page.

[![Analytics](https://ga-beacon.appspot.com/UA-59819838-3/red5pro/streaming-html?pixel)](https://github.com/igrigorik/ga-beacon)
