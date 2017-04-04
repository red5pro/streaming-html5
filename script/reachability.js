(function (window) {

  'use strict';

  var interval;

  window.enableReachability = function (url, callback) {

    interval = setInterval(function () {
      fetch(url)
        .then(function (res) {
          if (res.ok) {
            return
          }
          throw new Error('Network not available.');
        })
        .catch(function () {
          window.disableReachability();
          callback();
        });
    }, 2000);

  }

  window.disableReachability = function () {
    clearInterval(interval);
  }

})(window);
