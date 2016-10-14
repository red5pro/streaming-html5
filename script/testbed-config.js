// Defining/accessing testbed configuration.
(function () {
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
      "cameraWidth": 854,
      "cameraHeight": 480,
      "video": true,
      "audio": true,
      "buffer": 0.5,
      "bitrate": 1000,
      "publisherFailoverOrder": "rtc,rtmp",
      "subscriberFailoverOrder": "rtc,rtmp,hls",
      "iceServers": [
        {
          "urls": "stun:stun2.l.google.com:19302"
        }
      ],
      "verboseLogging": true
    };
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
})();

