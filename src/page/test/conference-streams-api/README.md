# WARNING: DEPRECATED

> This example uses the streams API to recognize updated subscriber listings. The latest conference example - which uses Shared Objects to determine subscriber listings - can be found in [conference](../conference)

# Conference Chat
This example demonstrates multi-party communication using Red5 Pro. It also demonstrates using servlet requests on the server.

> The Two-Way example requires access to a service that returns a stream listing. You may run into Cross-Origin Resource Sharing (**CORS**) issues if trying to use this example without the proper **CORS** settings provided by the server.

It is recommended to view this example as part of the `webrtcexamples` webapp shipped with the [Red5 Pro Server](https://account.red5pro.com/download).

More information on CORS can be found at: [https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).

#### Basic Publisher
**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup of a publisher.**

#### Basic Subscriber
**Please refer to the [Basic Subscriber Documentation](../subscribe/README.md) to learn more about the basic setup of a subscriber.**

### Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

> These examples use the WebRTC-based Subscriber implementation from the Red5 Pro HTML SDK. However, there is failover support to allow for Flash-based subscriber on unsupported browsers.

### Setup
Multi-party communication simply requires setting up a publish stream and a group of subscribe streams at the same time, identified by a unique naming convention (for instance "`roomName`-`userName`" which is the convention this example uses).  You can test the example with multiple browser pages. Each instance needs to enter the same "room" and a unique name.

Once "connect" is hit, the instance will begin publishing, and will look for other streams that share the same room to automatically subscribe to.

### Getting Live Streams
To access the list of current streams on the server, use the `streams` servlet. Note that when making api calls, a port number is only required when not using a secure call - https routes the connection to a specific port already.

```js
function beginStreamListCall () {
  if(listBreak){ return; }

  var host = configuration.host;
  var port = serverSettings.httpport;
  var portURI = (port.length > 0 ? ':' + port : '');
  var baseUrl = isSecure ? protocol + '://' + host : protocol + '://' + host + portURI;
  var url = baseUrl + '/' + configuration.app + '/streams.jsp';
  fetch(url)
    .then(function (res) {
      if (res.headers.get('content-type') &&
          res.headers.get('content-type').toLowerCase().indexOf('application/json') >= 0) {
        return res.json();
      }
      else {
        return res.text();
      }
    })
    .then(function (jsonOrString) {
      var json = jsonOrString;
      if (typeof jsonOrString === 'string') {
        try {
          json = JSON.parse(json);
        }
        catch(e) {
          throw new TypeError('Could not properly parse response: ' + e.message);
        }
      }
      recieveList(json);
    })
    .catch(function (error) {
      var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
      console.error('[Conference] :: Error - Could not request Stream List. ' + jsonError);
      listError(error);
    });

}
```

<sup>
[index #2288](index.js#L288)
</sup>

The service response will be a list of live streams. Parsing the JSON will return an array of objects with the `name` attribute denoting the stream name. If one shares the same room name, it is auto-subscribed to. Note that there is a delay between starting subscribers - many browsers have issues opening more than one too quickly. If a previously subscribed to stream is no longer on the list, that indicates a person has left, and their stream will be removed from the video.

Regardless, the service call is made again after a certain period of time to ensure that new people joining the "room" are always added.

```js
function recieveList (listIn) {
  if(listBreak){
    return;
  }

  console.log(listIn + " is " + JSON.stringify(listIn));
  streamsList = [];

  var i = 0;
  for ( i = 0; i < listIn.length; i++ ) {
    var inName = listIn[i].name;
    if( inName == roomName + '-' + chosenName )
      continue;

    streamsList.push( inName );
    if( typeof roomName === 'string' && inName.indexOf("-") >= 0 && inName.split("-")[0] == roomName){
      if( callList.length == 0 || callList.indexOf(inName) < 0 ){
        setToCreateSub(inName);
      }
    }
  }
  for( i = callList.length - 1; i >= 0; i-- ){
    if( typeof roomName !== 'string' || streamsList.indexOf(callList[i]) < 0 ){
      removeSubscriber(callList[i]);
    }
  }

  setWaitTime();
}
```

<sup>
[index #327](index.js#L327)
</sup>

###Subscriber ID
Every subscribing stream needs a unique identifier in its configuration object for appropriate communication with the server. Even after a subscribe attempt fails, the id needs to be updated to prevent collisions. to that effect, a random id number is generated when the page opens, and iterated for every subscribe attempt.

```js
subscriptionId: 'subscriber-' + subscribeName + "-" + (instanceId++).toString(16),
```

<sup>
[index #476](index.js#476)
