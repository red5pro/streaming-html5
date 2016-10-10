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

### [Publishing](src/js/components/test/publish)

| **[Publisher](src/js/components/test/publish/PublisherTest.js)**
| :-----
| *Basic publisher example using WebRTC*
|
| **[Publisher Failover](src/js/components/test/publish/PublisherFailoverTest.js)**
| *Demonstrates auto-failover of publisher implementation.*<br>i.e., if no WebRTC browser support, Flash Player is utilized.
|
| **[1080p](src/js/components/test/publish/Publisher1080Test.js)**
| *A high quality publisher.*
|
| **[Audio Mode](src/js/components/test/publish/PublisherAudioOnlyTest.js)**
| *Demonstrates an Audio-Only broadcast for publishing.*
|
| **[Camera Source](src/js/components/test/publish/PublisherCameraSourceTest.js)**
| *Demonstrates selecting the desired camera to publish with.*
|
| **[Camera Swap](src/js/components/test/publish/PublisherCameraSwapTest.js)**
| *Demonstrates swapping the front & rear camera of a mobile device.*<br>**MOBILE BROWSER SUPPORT LIMITED**
|
| **[Image Capture](src/js/components/test/publish/PublisherImageCaptureTest.js)**
| *Demonstrates capturing an image of a live video being published.*
|
| **[Stream Manager](src/js/components/test/publish/PublisherStreamManagerTest.js)**
| *Demonstrates utilizing the Red5 Pro Stream Manager to publish to a cluster's origin.*
|

### [Subscibing](src/js/components/test/subscribe)

| **[Subscriber](src/js/components/test/subscribe/SubscriberTest.js)**
| :-----
| *Basic subscriber example using WebRTC.*
|
| **[Subscriber Failover](src/js/components/test/subscribe/SubsciberFailoverTest.js)**
| *Demonstrate auto-failover of subscriber implementation.<br>*i.e, if no WebRTC browser support, then first Flash Player is detected, then HLS.
|
| **[Subscriber Audio Only](src/js/components/test/subscribe/SubscriberAudioOnlyTest.js)**
| *Demonstrates playback of audio-only stream.*
|
| **[Subscriber Image Capture](src/js/components/test/subscribe/SubscriberImageCaptureTest.js)**
| *Demonstrates capturing an image of a live video being consumed.*
|
| **[Subscriber Cluster](src/js/components/test/subscribe/SubscriberClusterTest.js)**
| *Demonstrates accessing an IP from the Red5 Pro Cluster API to subcribe to a live stream.*
|
| **[Subscriber Stream Manager](src/js/component/test/subscribe/SubscriberStreamManagerTest.js)**
| *Demonstrates utilizing the Red5 Pro Stream Manager API to access an Edge server IP to subscribe to a live stream.*
|


[![Analytics](https://ga-beacon.appspot.com/UA-59819838-3/red5pro/streaming-html?pixel)](https://github.com/igrigorik/ga-beacon)
