/*
Copyright © 2015 Infrared5, Inc. All rights reserved.

The accompanying code comprising examples for use solely in conjunction with Red5 Pro (the "Example Code") 
is  licensed  to  you  by  Infrared5  Inc.  in  consideration  of  your  agreement  to  the  following  
license terms  and  conditions.  Access,  use,  modification,  or  redistribution  of  the  accompanying  
code  constitutes your acceptance of the following license terms and conditions.

Permission is hereby granted, free of charge, to you to use the Example Code and associated documentation 
files (collectively, the "Software") without restriction, including without limitation the rights to use, 
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit 
persons to whom the Software is furnished to do so, subject to the following conditions:

The Software shall be used solely in conjunction with Red5 Pro. Red5 Pro is licensed under a separate end 
user  license  agreement  (the  "EULA"),  which  must  be  executed  with  Infrared5,  Inc.   
An  example  of  the EULA can be found on our website at: https://account.red5pro.com/assets/LICENSE.txt.

The above copyright notice and this license shall be included in all copies or portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,  INCLUDING  BUT  
NOT  LIMITED  TO  THE  WARRANTIES  OF  MERCHANTABILITY, FITNESS  FOR  A  PARTICULAR  PURPOSE  AND  
NONINFRINGEMENT.   IN  NO  EVENT  SHALL INFRARED5, INC. BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN  AN  ACTION  OF  CONTRACT,  TORT  OR  OTHERWISE,  ARISING  FROM,  OUT  OF  OR  IN CONNECTION 
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function (window) {
  'use strict';

  var vRegex = /VideoStream/;
  var aRegex = /AudioStream/;

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
    this.audioOnly = false;
  };
  BitrateTicket.prototype.start = function () {
    var lastResult;
    var ticket = this;
    var connection = this.connection;
    var cb = this.cb;
    var resolutionCb = this.resolutionCb;
    var isSubscriber = this.isSubscriber;
    // Based on https://github.com/webrtc/samples/blob/gh-pages/src/content/peerconnection/bandwidth/js/main.js
    this.bitrateInterval = setInterval(function () {
      connection.getStats(null).then(function (res) {
        res.forEach(function (report) {
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
            if (report.mediaType === 'video' || report.id.match(vRegex)) {
              if (lastResult && lastResult.get(report.id)) {
                // calculate bitrate
                bitrate = 8 * (bytes - lastResult.get(report.id).bytesSent) /
                  (now - lastResult.get(report.id).timestamp);
                cb(bitrate, packets);
              }
            }
          }
          // playback.
          else if (isSubscriber &&
            ((report.type === 'inboundrtp') ||
              (report.type === 'inbound-rtp') ||
              (report.type === 'ssrc' && report.bytesReceived))) {
            bytes = report.bytesReceived;
            packets = report.packetsReceived;
            if (ticket.audioOnly && (report.mediaType === 'audio' || report.id.match(aRegex))) {
              if (lastResult && lastResult.get(report.id)) {
                // calculate bitrate
                bitrate = 8 * (bytes - lastResult.get(report.id).bytesReceived) /
                  (now - lastResult.get(report.id).timestamp);
                cb(bitrate, packets);
              }
            }
            else if (!ticket.audioOnly && (report.mediaType === 'video' || report.id.match(vRegex))) {
              if (lastResult && lastResult.get(report.id)) {
                // calculate bitrate
                bitrate = 8 * (bytes - lastResult.get(report.id).bytesReceived) /
                  (now - lastResult.get(report.id).timestamp);
                cb(bitrate, packets);
              }
            }
          }
          else if (resolutionCb && report.type === 'track') {
            var fw = 0;
            var fh = 0;
            if (report.kind === 'video' ||
              (report.frameWidth || report.frameHeight)) {
              fw = report.frameWidth;
              fh = report.frameHeight;
              if (fw > 0 || fh > 0) {
                resolutionCb(fw, fh);
              }
            }
          }
        });
        lastResult = res;
      });
    }, 1000);
  };
  BitrateTicket.prototype.stop = function () {
    clearInterval(this.bitrateInterval);
  };
  BitrateTicket.prototype.audioOnly = function () {
    this.audioOnly = true;
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
    return globalBitrateTicket;
  }

  window.untrackBitrate = function (ticket) {
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


  /**
   * Requests and returns flag of streamName being available on the server.
   * If requiresStreamManager, it additionally filters the listing based on `edge` type.
   */
  const getIsStreamAvailable = async (url, streamName, requiresStreamManager) => {
    try {
      let payload
      const response = await fetch(url)
      if (response.headers.get('content-type') &&
        response.headers.get('content-type').toLowerCase().indexOf('application/json') >= 0) {
        payload = await response.json()
      } else {
        payload = await response.text()
      }

      let json = payload
      if (typeof payload === 'string') {
        json = JSON.parse(payload)
      }

      if (requiresStreamManager) {
        return json.filter(stream => (stream.name === streamName && stream.type === 'edge')).length > 0
      } else {
        return json.filter(stream => (stream.name === streamName)).length > 0
      }
    } catch (e) {
      console.error(e)
      return false
    }
  }

  /**
   * Returns the stream listing on the server.
   */
  const getCompleteStreamList = async (url) => {
    try {
      let payload
      let streamList
      const response = await fetch(url)
      if (response.headers.get('content-type') &&
        response.headers.get('content-type')
          .toLowerCase().indexOf('application/json') >= 0) {
        payload = await response.json()
      } else {
        payload = await response.text()
      }
      streamList = payload
      if (typeof payload === 'string') {
        try {
          streamList = JSON.parse(payload)
        } catch (e) {
          console.error(`Stream list error from: ${payload}`)
          throw new TypeError('Could not properly parse stream list response: ' + e.message)
        }
      }
      return streamList
    } catch (e) {
      throw e
    }
  }



  /**
   * Returns if stream name is available on the stream manager.
   */
  const getIsAvailable = async (url, streamName) => {
    try {
      const isAvailable = await getIsStreamAvailable(url, streamName, true)
      return isAvailable
    } catch (e) {
      console.error(e)
      return false
    }
  }

  /**
   * Requests stream list from stream manager and filters on scope/app.
   */
  const getStreamList = async (url, scope) => {
    try {
      const list = await getCompleteStreamList(url)
      const filtered = list.filter(item => {
        return item.scope === scope && item.type === 'edge'
      })
      return filtered
    } catch (e) {
      throw e
    }
  }

  /**
   * Request to get Origin data to broadcast on stream manager proxy.
   */
  const getOrigin = async (host, context, streamName, transcode = false) => {
    try {
      let url = `https://${host}/streammanager/api/4.0/event/${context}/${streamName}?action=broadcast`
      if (transcode) {
        url += '&transcode=true'
      }
      const result = await fetch(url)
      const json = await result.json()
      if (json.errorMessage) {
        throw new Error(json.errorMessage)
      }
      return json
    } catch (e) {
      throw e
    }
  }


  /**
   * Request to get Origin data to broadcast for conference stream manager proxy.
   */
  const getOriginForConference = async (host, context) => {
    try {
      let url = `https://${host}/streammanager/api/4.0/event/${context}/join`
      const result = await fetch(url)
      const json = await result.json()
      if (json.errorMessage) {
        throw new Error(json.errorMessage)
      }
      return json
    } catch (e) {
      throw e
    }
  }


  /**
   * Request to get Edge on stream managaer to consume stream from stream manager proxy.
   */
  const getEdge = async (host, context, streamName) => {
    try {
      const url = `https://${host}/streammanager/api/4.0/event/${context}/${streamName}?action=subscribe`
      const result = await fetch(url)
      const json = await result.json()
      if (json.errorMessage) {
        throw new Error(json.errorMessage)
      }
      return json
    } catch (e) {
      throw e
    }
  }

  /**
   * Request to post a transcode provision detailing variants.
   */
  const postTranscode = async (host, context, streamName, provision, smPass = '123xyz') => {
    try {
      const url = `https://${host}/streammanager/api/4.0/admin/event/meta/${context}/${streamName}?accessToken=${smPass}`
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(provision)
      })
      const json = await result.json()
      if (json && json.errorMessage) {
        throw new Error(json.errorMessage)
      }
      return json
    } catch (e) {
      throw e
    }
  }

  const postProvision = async (host, provision, smPass = '123xyz') => {
    const {
      context,
      name
    } = provision
    try {
      const url = `https://${host}/streammanager/api/4.0/admin/event/meta/${context}/${name}?accessToken=${smPass}`
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(provision)
      })
      const json = await result.json()
      if (json && json.errorMessage) {

        if (json.errorMessage.indexOf('Provision already exists') < 0) {
          throw new Error(json.errorMessage)
        }
        else {
          console.log('Provision already exists')
        }
      }


      return json
    } catch (e) {
      throw e
    }
  }

  window.streamManagerUtil = {
    getIsStreamAvailable: getIsAvailable,
    getStreamList: getStreamList,
    getOrigin: getOrigin,
    getOriginForConference: getOriginForConference,
    getEdge: getEdge,
    postTranscode: postTranscode,
    postProvision: postProvision
  }

  window.getStreamList = getCompleteStreamList
  window.getIsStreamAvailable = getIsStreamAvailable

  window.isEmpty = function (str) {
    return (str && str.length === 0) || !!str
  }
  window.query = getQueryVariable;
  window.exposePublisherGlobally = function (publisher) {
    window.r5pro_publisher = publisher;
  }
  window.exposeSubscriberGlobally = function (subscriber) {
    window.r5pro_subscriber = subscriber;
  }

})(this);
