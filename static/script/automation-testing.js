(function (window) {

  // Should be loaded from red5pro-utils.js
  if (!window.query) return;

  var reportClientStats = !!window.query('automation');
  var sampleTime = window.query('sampleTime') ?  parseInt(window.query('sampleTime'), 10) : 2000;
  sampleTime = isNaN(sampleTime) ? 2000 : sampleTime;
  var inspectorEndpoint = window.query('inspectorBaseURL') ? window.query('inspectorBaseURL') : window.location.origin;

  // If we arent concerned with automation reports, forget it.
  if (!reportClientStats) return;

  // [Script inject]]
  var hasStatsScript = false;
  var muazkhans_getstats = 'https://cdn.webrtc-experiment.com/getStats.min.js';
  var loadFn = function () {
    hasStatsScript = true;
    var pending = pendingMonitors ? Object.keys(pendingMonitors) : [];
    var i = pending.length;
    while (--i > -1) {
      var id = pending[i];
      var obj =  pendingMonitors[id];
      monitorGetStats(id, obj.name, obj.connection);
      delete pendingMonitors[id];
    }
    pendingMonitors = undefined;
  }
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = muazkhans_getstats;
  script.onreadystatechange = loadFn;
  script.onload = loadFn;
  head.appendChild(script);
  // [[Script inject]

  var monitors = [];
  var pendingMonitors = {};

  // The data to pluck from getStats results.
  var dataMap = {
    'ssrc': [ // Chrome
      'framesDecoded',
      'googDecodeMs',
      'googMaxDecodeMs',
      'googCurrentDelayMs',
      'googFirstFrameReceivedToDecodedMs',
      'googRenderDelayMs',
      'googFrameRateReceived'
    ],
    'inbound-rtp': [ // Firefox :/
      'framesDecoded'
    ],
    'track': [ // Safari :/
      'framesDecoded'
    ]
  };

  var isValidResult = function (result) {
    if (result.type === 'inbound-rtp' && result.kind !== 'video') {
      // Audio data in Firefox.
      return false;
    } else if (result.type === 'track') {
      // Audio track in Safari.
      return !(result.frameWidth === 0 && result.frameHeight === 0);
    }
    return true;
  };
  var gatherDataFromResults = function (resultsArr) {
    var i = resultsArr.length, j;
    var result, resultKeys;
    var data;
    var key;
    var payload = {};
    while (--i > -1) {
      result = resultsArr[i];
      if (dataMap.hasOwnProperty(result.type)) {
        if (!isValidResult(result)) {
          continue;
        }
        resultKeys = Object.keys(result);
        data = dataMap[result.type];
        j = resultKeys.length;
        while (--j > -1) {
          key = resultKeys[j];
          if (data.indexOf(key) > -1) {
            payload[key] = parseInt(result[key], 10);
          }
        }
      }
    }
    return payload;
  };

  var postResults = function (subscriberId, streamName, result) {
    var results = result.results;
    var data = gatherDataFromResults(results);
    data = Object.assign(data, {
      id: subscriberId,
      event: 'clientStats',
      streamName: streamName
    });
    if (typeof window.adapter !== 'undefined') {
      data = Object.assign(data, window.adapter.browserDetails);
    }
    console.log(JSON.stringify(data, null, 2));
    var dataJSON = encodeURIComponent(JSON.stringify(data));
    fetch(inspectorEndpoint + '/inspector/streamapi.js?clientstats=' + dataJSON, {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({clientstats: data})
      })
      .then(function (res) { // eslint-disable-line no-unused-vars
        // console.log(res)
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  var startMonitor = function (id, name, connection) {
    window.getStats(connection, function (result) {
      if (monitors.indexOf(id) <= -1) {
        return;
      }
      postResults(id, name, result);
      console.log(result);
    }, sampleTime);
  };
  var monitorGetStats = function (id, name, connection) {
    if (!hasStatsScript) {
      pendingMonitors[id] = {
        name: name,
        connection: connection
      };
      return;
    }
    monitors.push(id);
    startMonitor(id, name, connection);
  };
  var unmonitorGetStats = function (id) {
    var index = monitors.indexOf(id);
    if (index > -1) {
      monitors.splice(index, 1);
    }
  };

  window.red5proUnmonitorGetStats = unmonitorGetStats;
  window.red5proMonitorGetStats = monitorGetStats;

})(window);
