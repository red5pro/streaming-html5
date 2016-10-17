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

### Instructions
To define the server instance's IP address, open the testbed webapp in a browser and navigate to the _Settings_ page if not presented upon launch. To access the _Settings_ back, select the **Home** item from the examples list located at the top.

To define the **Host** with the server instance's IP, click the _Host_ field f the form and enter in the local or remote IP address - e.g., `10.0.0.5`, `76.199.199.199`.

> Hint: You can also open the landing page of your server instance at port `5080` (i.e., `http://localhost:5080` if launched locally) and the page will display its IP in the upper-right corner.

## Examples

### [Publishing](static/publisher.html)

| **[Publisher](static/publisher.html)**
| :-----
| *Basic publisher example using WebRTC*
|
| **[Publisher Failover](static/test/publishFailover)**
| *Demonstrates auto-failover of publisher implementation.*<br>i.e., if no WebRTC browser support, Flash Player is utilized.
|
| **[1080p](static/test/publish1080)**
| *A high quality publisher.*
|
| **[Audio Mode](static/test/publishAudioOnly)**
| *Demonstrates an Audio-Only broadcast for publishing.*
|
| **[Camera Source](static/test/publishCameraSource)**
| *Demonstrates selecting the desired camera to publish with.*
|
| **[Camera Swap](static/test/publishCameraSwap)**
| *Demonstrates swapping the front & rear camera of a mobile device.*<br>**MOBILE BROWSER SUPPORT LIMITED**
|
| **[Image Capture](static/test/publishImageCapture)**
| *Demonstrates capturing an image of a live video being published.*
|
| **[Stream Manager](static/test/publishStreamManager)**
| *Demonstrates utilizing the Red5 Pro Stream Manager to publish to a cluster's origin.*
|
| **[Record](static/test/publishRecord)**
| *Demonstrates recording a stream to the server for VOD (Video-On-Demand) playback.*
|

### [Subscribing](static/subscriber.html)

| **[Subscriber](static/subscriber.html)**
| :-----
| *Basic subscriber example using WebRTC.*
|
| **[Subscriber Failover](static/test/subscribeFailover)**
| *Demonstrate auto-failover of subscriber implementation.<br>*i.e, if no WebRTC browser support, then first Flash Player is detected, then HLS.
|
| **[Subscriber Audio Only](static/test/subscribeAudioOnly)**
| *Demonstrates playback of audio-only stream.*
|
| **[Subscriber Image Capture](static/test/subscribeImageCapture)**
| *Demonstrates capturing an image of a live video being consumed.*
|
| **[Subscriber Cluster](static/test/subscribeCluster)**
| *Demonstrates accessing an IP from the Red5 Pro Cluster API to subcribe to a live stream.*
|
| **[Subscriber Stream Manager](static/test/subscribeStreamManager)**
| *Demonstrates utilizing the Red5 Pro Stream Manager API to access an Edge server IP to subscribe to a live stream.*
|

## Notes

1. For the Subscriber examples, you will need to have a live stream currently being published and named based on the *Stream 1 Name* field of the _Settings_. You can use another device to start streaming using this webapp, or you can also use a web browser to publish via Flash, [http://your_red5_pro_server_ip:5080/live](http://your_red5_pro_server_ip:5080/live).
2. You can see a list of active streams by navigating to [http://your_red5_pro_server_ip:5080/live/subscribe.jsp](http://your_red5_pro_server_ip:5080/live/subscribe.jsp) (will need to refresh this page after you have started publishing).
3. You can access the server IP of your Red5 Pro Server install - to be used in the *Host* field of the _Settings_ - by opening [http://your_red5_pro_server_ip:5080/](http://your_red5_pro_server_ip:5080/) and finding the IP printed in the upper-right of the page.

[![Analytics](https://ga-beacon.appspot.com/UA-59819838-3/red5pro/streaming-html?pixel)](https://github.com/igrigorik/ga-beacon)
