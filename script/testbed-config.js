// Defining/accessing testbed configuration.
(function (window) {

  // http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
  function getParameterByName(name, url) {
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

  var isMoz = !!navigator.mozGetUserMedia;
  var useRed5ProIce = getParameterByName('ice') === 'red5pro';
  var config = sessionStorage.getItem('r5proTestBed');
  var json;
  function assignStorage () {
    json = {
      "host": "localhost",
      "port": 8554,
      "rtcport": 8081,
      "rtmpport": 1935,
      "hlsport": 5080,
      "stream1": "stream1",
      "stream2": "stream2",
      "app": "live",
      "streamMode": "live",
      "cameraWidth": 854,
      "cameraHeight": 480,
      "buffer": 0.5,
      "bitrate": 1000,
      "bandwidth": {
        "audio": 50,
        "video": 256
      },
      "useAudio": true,
      "useVideo": true,
      "userMedia": {
        "audio": true,
        "video": isMoz ? true : {
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
      "iceServers": [
        {
          "urls": "stun:stun2.l.google.com:19302"
        }
      ],
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
      "red5proIce": [
        {
          "urls": "stun:50.56.81.179:3478"
        }
      ],
      "verboseLogging": true
    };
    if (useRed5ProIce) {
      json.iceServers = json.red5proIce;
    }
    else if (isMoz) {
      json.iceServers = json.mozIce;
    }
    sessionStorage.setItem('r5proTestBed', JSON.stringify(json));
  }
    if (config) {
      try {
        json = JSON.parse(config);
      }
      catch (e) {
        assignStorage();
      }
    }
    else {
      assignStorage();
    }
  return json;
})(this);

