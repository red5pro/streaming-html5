(function (window) {
  'use strict';

  var bitrateInterval = 0;

  // Based on https://github.com/webrtc/samples/blob/gh-pages/src/content/peerconnection/bandwidth/js/main.js
  window.trackBitrate = function (connection, cb) {
    window.untrackBitrate(cb);
    var lastResult;
    bitrateInterval = setInterval(function () {
      connection.getStats(null).then(function(res) {
        Object.keys(res).forEach(function(key) {
          var report = res[key];
          var bytes;
          var packets;
          var now = report.timestamp;
          if ((report.type === 'outboundrtp') ||
              (report.type === 'outbound-rtp') ||
              (report.type === 'ssrc' && report.bytesSent)) {
            bytes = report.bytesSent;
            packets = report.packetsSent;
            if (lastResult && lastResult[report.id]) {
              // calculate bitrate
              var bitrate = 8 * (bytes - lastResult[report.id].bytesSent) /
                  (now - lastResult[report.id].timestamp);
              cb(bitrate, packets);
            }
          }
        });
        lastResult = res;
      });
    }, 1000);
  }

  window.untrackBitrate = function() {
    clearInterval(bitrateInterval);
  }

})(this);
