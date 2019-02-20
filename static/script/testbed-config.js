// Defining/accessing testbed configuration.
(function (window, adapter) {

  if (typeof adapter !== 'undefined') {
    console.log('Browser: ' + JSON.stringify(adapter.browserDetails, null, 2));
  }

  // http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
  function getParameterByName(name, url) { // eslint-disable-line no-unused-vars
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  var protocol = window.location.protocol;
  var port = window.location.port;
  protocol = protocol.substring(0, protocol.lastIndexOf(':'));

  var isMoz = !!navigator.mozGetUserMedia;
  var isEdge = window.navigator.userAgent.indexOf('Edge') > -1;
  var isiPod = !!navigator.platform && /iPod/.test(navigator.platform);
  var config = sessionStorage.getItem('r5proTestBed');
  var json;
  var serverSettings = {
    "protocol": protocol,
    "httpport": port,
    "hlsport": 5080,
    "hlssport": 443,
    "wsport": 5080,
    "wssport": 443,
    "rtmpport": 1935,
    "rtmpsport": 1936
  };
  function assignStorage () {
    json = {
      "host": "localhost",
      "port": 8554, // rtsp
      "stream1": "stream1",
      "stream2": "stream2",
      "app": "live",
      "proxy": "streammanager",
      "streamMode": "live",
      "cameraWidth": 854,
      "cameraHeight": 480,
      "embedWidth": "100%",
      "embedHeight": 480,
      "buffer": 0.5,
      "bandwidth": {
        "audio": 56,
        "video": 512
      },
      "keyFramerate": 3000,
      "useAudio": true,
      "useVideo": true,
      "mediaConstraints": {
        "audio": isiPod ? false : true,
        "video": (isMoz || isEdge) ? true : {
          "width": {
            "min": 320,
            "max": 640
          },
          "height": {
            "min": 240,
            "max": 480
          },
          "frameRate": {
            "min": 8,
            "max": 24
          }
        }
      },
      "publisherFailoverOrder": "rtc,rtmp",
      "subscriberFailoverOrder": "rtc,rtmp,hls",
      "rtcConfiguration": {
        "iceServers": [
          {
            "urls": "stun:stun2.l.google.com:19302"
          }
        ],
        "bundlePolicy": "max-bundle",
        "iceCandidatePoolSize": 2,
        "iceTransportPolicy": "all",
        "rtcpMuxPolicy": "require"
      },
      "googleIce": [
        {
          "urls": "stun:stun2.l.google.com:19302"
        }
      ],
      "mozIce": [
        {
          "urls": "stun:stun.services.mozilla.com:3478"
        }
      ],
      "iceTransport": "udp",
      "verboseLogging": true,
      "streamManagerAPI": "3.1",
      "streamManagerAccessToken": "xyz123",
      "authentication": {
        "enabled": false,
        "username": "user",
        "password": "pass"
      }
    };

    /**
    if (isMoz) {
      json.rtcConfiguration.iceServers = json.mozIce;
    }
    */
    sessionStorage.setItem('r5proTestBed', JSON.stringify(json));
  }

  function defineIceServers () {
    var param = getParameterByName('ice');
    if (param) {
      if (param === 'moz') {
        json.rtcConfiguration.iceServers = json.mozIce;
      }
      else {
        json.rtcConfiguration.iceServers = json.googleIce;
      }
      console.log('ICE server provided in query param: ' + JSON.stringify(json.rtcConfiguration.iceServers, null, 2));
    }
  }

  if (config) {
    try {
      json = JSON.parse(config);
    }
    catch (e) {
      assignStorage();
    }
    finally {
      defineIceServers();
      sessionStorage.setItem('r5proTestBed', JSON.stringify(json));
    }
  }
  else {
    assignStorage();
    defineIceServers();
    sessionStorage.setItem('r5proTestBed', JSON.stringify(json));
  }

  sessionStorage.setItem('r5proServerSettings', JSON.stringify(serverSettings));
  return json;

})(this, window.adapter);
