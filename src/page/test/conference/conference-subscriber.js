/**
 * Handles generating and monitoring Subscribers for Conference example.
 */
(function (window, document, red5prosdk) {
  'use strict';

  var subscriberMap = {};
  var streamNameField = document.getElementById('streamname-field');
  var updateSuscriberStatusFromEvent = window.red5proHandleSubscriberEvent;
  var subscriberTemplate = '' +
        '<div class="subscriber-session centered">' +
          '<p class="subscriber-status-field">On hold.</p>' +
        '</div>' +
        '<div class="video-holder centered">' +
          '<video autoplay controls playsinline class="red5pro-media red5pro-background"></video>' +
        '</div>' +
        '<div class="centered">' +
          '<p class="status-field"><span class="subscriber-name-field"></span></p>' +
          '<p class="status-field-gray"><span class="subscriber-id-field"></span></p>' +
          '</p>' +
        '</div>';

  function templateContent (templateHTML) {
    var div = document.createElement('div');
    div.classList.add('subscriber-container', 'float-left', 'spaced');
    div.innerHTML = templateHTML;
    return div;
  }

  function getSubscriberElementId (streamName) {
    return ['red5pro', 'subscriber', streamName].join('-');
  }

  function generateNewSubscriberDOM (streamName, subId, parent) {
    var card = templateContent(subscriberTemplate);
    parent.appendChild(card);
    var videoId = getSubscriberElementId(streamName);
    var videoElement = card.getElementsByClassName('red5pro-media')[0];
    var subscriberNameField = card.getElementsByClassName('subscriber-name-field')[0];
    var subscriberIdField = card.getElementsByClassName('subscriber-id-field')[0];
    subscriberNameField.innerText = streamName;
    subscriberIdField.innerText = '(' + subId + ')';
    videoElement.id = videoId;
    card.id = [videoId, 'container'].join('-');
    return card;
  }

  var SubscriberItem = function (subStreamName, parent, index) {
    this.subscriptionId = [streamNameField.value, 'sub'].join('-')
    this.streamName = subStreamName;
    this.index = index;
    this.next = undefined;
    this.parent = parent;
    this.card = generateNewSubscriberDOM(this.streamName, this.subscriptionId, this.parent);
    this.statusField = this.card.getElementsByClassName('subscriber-status-field')[0];
    this.toggleVideoPoster = this.toggleVideoPoster.bind(this);
  }
  SubscriberItem.prototype.toggleVideoPoster = function (showPoster) {
    var video = document.getElementById(getSubscriberElementId(this.streamName));
    if (showPoster) {
      video.classList.add('hidden');
    } else {
      video.classList.remove('hidden');
    }
  }
  SubscriberItem.prototype.resolve = function () {
    if (this.next) {
      this.next.execute();
    }
  }
  SubscriberItem.prototype.reject = function (event) {
    console.error(event);
    if (this.next) {
      this.next.execute();
    }
  }
  SubscriberItem.prototype.execute = function (config) {
    var self = this;
    var name = this.streamName;
    var uid = Math.floor(Math.random() * 0x10000).toString(16);
    var rtcConfig = Object.assign({}, config, {
                      streamName: this.streamName,
                      subscriptionId: [this.subscriptionId, uid].join('-'),
                      mediaElementId: getSubscriberElementId(name) 
                    });

    this.subscriber = new red5prosdk.RTCSubscriber();
    this.subscriber.on('Connect.Success', this.resolve.bind(this));
    this.subscriber.on('Connect.Failure', this.reject.bind(this));
    var sub = this.subscriber;
    var toggleVideoPoster = this.toggleVideoPoster;
    var statusField = this.statusField;
    var reject = this.reject.bind(this);
    var close = function (event) { // eslint-disable-line no-unused-vars
      function cleanup () {
        var el = document.getElementById(getSubscriberElementId(name) + '-container')
        el.parentNode.removeChild(el);
        sub.off('*', respond);
        sub.off('Subscribe.Fail', fail);
      }
      sub.off('Subscribe.Connection.Closed', close);
      sub.unsubscribe().then(cleanup).catch(cleanup);
      delete subscriberMap[name];
    };
    var fail = function (event) { // eslint-disable-line no-unused-vars
      close();
      var t = setTimeout(function () {
        clearTimeout(t);
        new SubscriberItem(self.streamName, self.parent, self.index).execute();
      }, 2000);
    };
    var respond = function (event) {
      if (event.type === 'Subscribe.Time.Update') return;
      console.log('[subscriber:' + name + '] ' + event.type);
      updateSuscriberStatusFromEvent(event, statusField);
      if (event.type === 'Subscribe.Metadata') {
        if (event.data.streamingMode) {
          toggleVideoPoster(!event.data.streamingMode.match(/Video/));
        }
      }
    };

    this.subscriber.on('Subscribe.Connection.Closed', close);
    this.subscriber.on('Subscribe.Fail', fail);
    this.subscriber.on('*', respond);

    this.subscriber.init(rtcConfig)
      .then(function (subscriber) {
        subscriberMap[name] = subscriber;
        return subscriber.subscribe();
       })
      .catch(function (error) {
        console.log('[subscriber:' + name + '] Error');
        reject(error);
      });
  }

  window.getConferenceSubscriberElementId = getSubscriberElementId;
  window.ConferenceSubscriberItem = SubscriberItem;

})(window, document, window.red5prosdk);
