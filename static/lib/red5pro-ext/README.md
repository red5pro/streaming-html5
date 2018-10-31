<h3 align="center">
  <a href="https://www.red5pro.com/" target="_blank"><img src="assets/red5pro_logo.png" alt="Red5 Pro Logo" /></a>
</h3>
<p align="center">
  <a href="README.md#stream-manager-extension-for-red5-pro-html-sdk">red5pro-extension-stream-manager</a>
</p>

---

# Stream Manager Extension for Red5 Pro HTML SDK

> The **Stream Manager Extension** for Red5 Pro HTML SDK is an extension library that allows for ease in setting up a client-side autoscale solution. The extension library does most of the heavy lifting in communication with the [Stream Manager API](https://www.red5pro.com/docs/autoscale/) of the [Red5 Pro Server](https://www.red5pro.com/), providing a familiar API and setup flow similar to the [Red5 Pro HTML SDK](https://account.red5pro.com/download).

* [Quickstart](#quickstart)
  * [Installation](#installation)
* [Requirements](#requirements)
* [Usage](#usage)
  * [decorate](#decorate)
  * [Autoscale](#autoscale)
* [Autoscale Configuraiton](#autoscale-configuration)

---

# Quickstart

Before creating the following client-side example, you will first need to set up your remote **Red5 Pro Server** to support autoscaling: [Red5 Pro Autoscaling and Stream Manager](https://www.red5pro.com/docs/autoscale/).

## Installation

In a browser:
1. [Download the latest Red5 Pro HTML SDK Release](https://account.red5pro.com/download)
2. [Download the latest Red5 Pro Stream Manager Extension Release](https://github.com/infrared5/red5pro-extension-stream-manager/releases)

```html
<!doctype html>
<html>
  <head>
    <!-- *Recommended WebRTC Shim -->
    <script src="http://webrtc.github.io/adapter/adapter-latest.js"></script>
  </head>
  <body>
    <div>
      <video id="red5pro-publisher" width="640" height="480" muted autoplay playsinline></video>
    </div>
    <div>
      <video id="red5pro-subscriber" width="640" height="480" controls autoplay playsinline></video>
    </div>
    <!-- Red5 Pro SDK -->
    <script src="lib/red5pro/red5pro-sdk.js"></script>
    <!-- Red5 Pro Stream Manager Extension -->
    <script src="lib/red5pro/red5pro-ext-stream-manager.js"></script>
    <!-- Create Pub/Sub with Stream Manager support-->
    <script>
      (function(red5prosdk, sm_ext) {
        'use strict';

        red5prosdk.setLogLevel('debug');
        sm_ext.setLogLevel('debug');

        // Extend the Red5Pro sdk.
        sm_ext.decorate();

        var rtcPublisher = new red5prosdk.RTCPublisher();
        var rtcSubscriber = new red5prosdk.RTCSubscriber();

        var autoscaleConfig = {
          protocol: 'https',
          host: 'streammanager.company.org',
          streamName: 'mystream',
          scope: 'live',
          apiVersion: '3.0',
          useProxy: true
        };

        var initConfig = {
          protocol: 'wss',
          host: 'streammanager.company.org',
          port: 8083,
          app: 'live',
          streamName: 'mystream',
          iceServers: [{urls: 'stun:stun2.l.google.com:19302'}]
        };

        var publishAutoscaleConfig = Object.assign({}, autoscaleConfig, {
          action: 'broadcast'
        });
        var subscribeAutoscaleConfig = Object.assign({}, autoscaleConfig, {
          action: 'subscribe'
        });

        function subscribe () {
          rtcSubscriber
            .autoscale(subscribeAutoscaleConfig, initConfig)
            .then(function () {
              return rtcSubscriber.subscribe();
            })
            .catch(function (error) {
              console.error('Could not play: ' + error);
            });
        }

        // First connect Autoscale-d Publisher.
        rtcPublisher
          .autoscale(publishAutoscaleConfig, initConfig)
          .then(function () {
            // Once publishing, we will start the Autoscale-d Subscriber.
            rtcPublisher.on(red5prosdk.PublisherEventTypes.PUBLISH_START, subscribe);
            return rtcPublisher.publish();
          })
          .catch(function (error) {
            console.error('Could not publish: ' + error)
          });

      }(window.red5prosdk, window.red5prosdk_ext_stream_manager));
    </script>
  </body>
</html>
```

The **Stream Manager Extension** uses the provided configurations in the `autoscale` method to:

1. Make required requests on the [Stream Manager API](https://www.red5pro.com/docs/autoscale/streammanagerapi.html) to obtain Origin and Edge information.
2. Proceed to initialize the Publisher or Subscriber implementation based on API response.

> This example demonstrates setting up a Publisher and Subscriber targeting WebRTC. However, the **Stream Manager Extension** also suports proper failover of the **Red5 Pro HTML SDK**.

# Requirements

The **Red5 Pro HTML SDK** is intended to communicate with a [Red5 Pro Server](https://www.red5pro.com/), which allows for broadcasting and consuming live streams utilizing [WebRTC](https://developer.mozilla.org/en-US/docs/Web/Guide/API/WebRTC) and other protocols, including [RTMP](https://en.wikipedia.org/wiki/Real_Time_Messaging_Protocol) and [HLS](https://en.wikipedia.org/wiki/HTTP_Live_Streaming).

As such, you will need a distribution of the [Red5 Pro Server](https://www.red5pro.com/) running locally or accessible from the web, such as [Amazon Web Services](https://www.red5pro.com/docs/server/awsinstall/).

Additionally, to utilize the **Stream Manager Extension**, you will need to enable the [Red5 Pro Autoscaling Feature](https://www.red5pro.com/docs/autoscale/).

> **[Click here to start using the Red5 Pro Server today!](https://account.red5pro.com/login)**

# Usage

The section describes the API and configuration schemas required in using the **Stream Manager Extension** for the [Red5 Pro HTML SDK](https://account.red5pro.com/download).

> For clarity and toe minimize verbosity, the following examples demonstrate esatblishing a client-side autoscale solution using Publishers, however, the same can be applied to Subscribers.

## Access

When the **Stream Manager Extension** is loaded in a browser, the extension is accessible on the `window` global at `red5prosdk_ext_stream_manager`:

```html
<!doctype html>
<html>
  <head>
    <script src="http://webrtc.github.io/adapter/adapter-latest.js"></script>
    <script src="lib/red5pro/red5pro-sdk.js"></script>
    <script src="lib/red5pro/red5pro-ext-stream-manager.js"></script>
  </head>
  <body>
    var sm_extension = window.red5prosdk_ext_stream_manager;
  </body>
</html>
```

## decorate()

When the **Stream Manager Extension** is loaded in a browser, the `decorate()` method can be called to auto-magically assign an `autoscale` method to the Publisher and Subscriber class references of the **Red5 Pro HTML SDK**:

```js
(function (red5prosdk, sm_extension) {

  // Turn on/up logging.
  sm_extension.setLogLevel('debug');

  // Invoking `decorate` will define an `autoscale` method
  //  on all accessible Publisher and Subscriber class refs
  //  from the loaded in Red5 Pro HTML SDK.
  sm_extension.decorate();

})(window.red5prosdk, window.red5prosdk_ext_stream_manager);
```

With the Publisher and Subscriber references from the **Red5 Pro HTML SDK** decorated by the extension, you provide an [autoscaling configuration](#autoscaling-configuration) and an [initialization configuration](https://github.com/infrared5/red5pro-html-sdk/blob/master/PUBLISHER_README.md#auto-failover-and-order) as you normally would in setting up a non-autoscaled Publisher or Subscriber:

```js
(function (red5prosdk, sm_extension) {

  sm_extension.setLogLevel('debug');
  sm_extension.decorate();

  var autoscaleConfig = {
    protocol: 'https',
    host: 'streammanager.company.org',
    streamName: 'mystream',
    scope: 'live',
    apiVersion: '3.0',
    action: 'broadcast',
    useProxy: true
  };
  var initConfig = {
    rtc: {
      protocol: 'wss',
      host: 'streammanager.company.org',
      port: 8083,
      app: 'live',
      streamName: 'mystream',
      iceServers: [{urls: 'stun:stun2.l.google.com:19302'}]
    },
    rtmp: {
      protocol: 'rtmp',
      host: 'streammanager.company.org',
      port: 1935,
      app: 'live',
      streamName: 'mystream'
    }
  };

  // Call the `autoscale` method now
  //  declared on publisher and subscriber refs.
  new red5prosdk.Red5ProPublisher()
        .setPublishOrder(['rtc', 'rtmp'])
        .autoscale(autoscaleConfig, initConfig)
        .then(function (publisher) {
          return publisher.publish()
        })
        .catch(function (error) {
          console.error(error)
        });

})(window.red5prosdk, window.red5prosdk_ext_stream_manager);
```

The initialization flow of the failover `Red5ProPublisher` is similar to the initialization flow you would use when using the **Red5 Pro HTML SDK** for a non-autoscaled solution.

Right after setting the publish order (using `setPublishOrder`), you invoke the `autoscale` method with an [autoscale configuration](#autoscale-configuration) and the _initialization configuration_.

> This differs from a non-autoscaled solution when using the **Red5 Pro HTML SDK**, in which case you would invoke the `init` method with an _initialization configuration_.

The `autoscale` method returns a `Promise`-like object that will either resolve with the chosen Publisher instance from failover, or reject with an error that occured within the process of communicating with the **Stream Manager API** through establishing a Publisher instance.

## Autoscale

In the case in which you will not want to use `decorate` (described [above](#decorate)) to define an `autoscale` method on Publisher and Subscriber references from the **Red5 Pro HTML SDK**, a top-level method, `Autoscale()` is available to provide a previously instantiated Publisher or Subscriber instance:

```js
(function (red5prosdk, sm_extension) {

  sm_extension.setLogLevel('debug');
  sm_extension.decorate();

  var autoscaleConfig = {
    protocol: 'https',
    host: 'streammanager.company.org',
    streamName: 'mystream',
    scope: 'live',
    apiVersion: '3.0',
    action: 'broadcast',
    useProxy: true
  };
  var initConfig = {
    rtc: {
      protocol: 'wss',
      host: 'streammanager.company.org',
      port: 8083,
      app: 'live',
      streamName: 'mystream',
      iceServers: [{urls: 'stun:stun2.l.google.com:19302'}]
    },
    rtmp: {
      protocol: 'rtmp',
      host: 'streammanager.company.org',
      port: 1935,
      app: 'live',
      streamName: 'mystream'
    }
  };

  // Create a failover publisher 
  //  that will determine the target publisher tech.
  var failover = new red5prosdk.Red5ProPublisher()
                      .setPublishOrder(['rtc', 'rtmp']);
  
  // Request to setup with autoscaling 
  //  using `Autoscale`.
  sm_extension.Autoscale(failover)
        .init(autoscaleConfig, initConfig)
        .then(function (publisher) {
          return publisher.publish()
        })
        .catch(function (error) {
          console.error(error)
        });

})(window.red5prosdk, window.red5prosdk_ext_stream_manager);
```

You can use the `Autoscale` method to start a client-side autoscale solution with an already instantiated Publisher or Subscriber (include the failover entry instance, as shown above).

Calling `init` will do the same series of communication and initialization as describe in the [decorate](#decorate) section above.

# Autoscale Configuration

The following describes the available required and optional properties to provide as the _autoscale configuration_.

| Property | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| action | [x] | *None* | The `action` request on the Stream Manager. Either `broadcast` or `subscribe`. |
| protocol | [x] | `https` | The protocol portion of the Stream Manager endpoint. |
| host | [x] | *None* | The host portion of the Stream Manager endpoint. |
| port | [-] | *None* | The port portion of the Stream Manager endpoint. If `protocol` is `https`, assumes port as `443`. |
| scope | [x] | `live` | The webapp scope in which the stream will reside. |
| streamName | [x] | *None* | The stream name to broadcast or subscribe to. |
| apiVersion | [x] | `3.0` | The Stream Manager API version to use. |
| accessToken | [-] | *None* | The optional `accessToken` to use in a authorized Stream Manager API call. |
| retryLimit | [-] | `0` | The optional retry amount. The Stream Manager API call will be re-attempted N-number of times based on this value until it treats a failure as a fault. (Setting `-1` will make unlimited re-attempts). |
| retryDelay | [-] | `1000` | The delay - in milliseconds - to wait until perfoming a re-attempt on the Stream Manager API. |
| useProxy | [-] | `true` | Mostly pertaining to WebRTC Publishers and Subscribers, this property declares that the connection to Origins and Edges should be done through the Stream Manager as a proxy; this is a requirement when Origins and Edges do not have certs and cannot be connected to over SSL. |

## Autoscale Configuration Example

```js
var autoscaleConfiguration = {
  action: 'broadcast',     // required
  protocol: 'https',      // required, default=https
  host: 'sm.company.org', // required
  port: undefined,        // optional (will assume 443/naked with protocol=https)
  scope: 'live',          // optional, default=live
  streamName: 'mystream', // required
  apiVersion: '3.0',      // required, default=3.0
  accessToken: 'foobar',  // optional
  retryLimit: 3,          // optional, default (no retry)
  retryDelay: 2000,       // optional, default=1000
  useProxy: true          // optional, default=true. Enforces connection proxy for WebRTC clients
};
```


> The _initialization configuration_ is described in the **Red5 Pro HTML SDK** documentation. Please refer to that documentation in understanding the configuration options required for different tech targets.
