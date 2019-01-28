(function (window) {
  'use strict';

  // global bitrate - legacy
  var globalBitrateTicket = undefined;
  // ticket system
  var bitrateTickets = [];
  var BitrateTicket = function (connection, cb, resolutionCb, isSubscriber) {
    this.connection = connection;
    this.cb = cb;
    this.resolutionCb = resolutionCb;
    this.isSubscriber = isSubscriber;
    this.bitrateInterval = 0;
  };
  BitrateTicket.prototype.start = function () {
    var lastResult;
    var connection = this.connection;
    var cb = this.cb;
    var resolutionCb = this.resolutionCb;
    var isSubscriber = this.isSubscriber;
    // Based on https://github.com/webrtc/samples/blob/gh-pages/src/content/peerconnection/bandwidth/js/main.js
    this.bitrateInterval = setInterval(function () {
      connection.getStats(null).then(function(res) {
        res.forEach(function(report) {
          var bytes;
          var packets;
          var now = report.timestamp;
          var bitrate;
          if (!isSubscriber && 
              ((report.type === 'outboundrtp') ||
              (report.type === 'outbound-rtp') ||
              (report.type === 'ssrc' && report.bytesSent))) {
            bytes = report.bytesSent;
            packets = report.packetsSent;
            if (report.mediaType === 'video' && lastResult && lastResult.get(report.id)) {
              // calculate bitrate
              bitrate = 8 * (bytes - lastResult.get(report.id).bytesSent) /
                  (now - lastResult.get(report.id).timestamp);
              cb(bitrate, packets);
            }
          }
          // playback.
          else if (isSubscriber && 
              ((report.type === 'inboundrtp') ||
              (report.type === 'inbound-rtp') ||
              (report.type === 'ssrc' && report.bytesReceived))) {
            bytes = report.bytesReceived;
            packets = report.packetsReceived;
            if (report.mediaType === 'video' && lastResult && lastResult.get(report.id)) {
              // calculate bitrate
              bitrate = 8 * (bytes - lastResult.get(report.id).bytesReceived) /
                (now - lastResult.get(report.id).timestamp);
              cb(bitrate, packets);
            }
          }
          else if (resolutionCb && report.type === 'track' && report.kind === 'video') {
            resolutionCb(report.frameWidth, report.frameHeight);
          }
        });
        lastResult = res;
      });
    }, 1000);
  };
  BitrateTicket.prototype.stop = function  () {
    clearInterval(this.bitrateInterval);
  };

  window.trackBitrate = function (connection, cb, resolutionCb, isSubscriber, withTicket) {
    var t = new BitrateTicket(connection, cb, resolutionCb, isSubscriber);
    if (withTicket) {
      var ticket = ['bitrateTicket', Math.floor(Math.random() * 0x10000).toString(16)].join('-');
      bitrateTickets[ticket] = t;
      t.start();
      return ticket;
    } else if (globalBitrateTicket) {
      globalBitrateTicket.stop();
    }
    globalBitrateTicket = t;
    t.start();
  }

  window.untrackBitrate = function(ticket) {
    if (!ticket && globalBitrateTicket) {
      globalBitrateTicket.stop();
    } else if (bitrateTickets[ticket]) {
      bitrateTickets[ticket].stop();
      delete bitrateTickets[ticket];
    }
  }

  // easy access query variables.
  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == variable) {
        return decodeURIComponent(pair[1]);
      }
    }
    return undefined;
  }
  window.query = getQueryVariable;
  window.exposePublisherGlobally = function (publisher) {
    window.r5pro_publisher = publisher;
  }
  window.exposeSubscriberGlobally = function (subscriber) {
    window.r5pro_subscriber = subscriber;
  }

})(this);
