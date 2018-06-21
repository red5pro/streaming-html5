(function (window, document) {
    'use strict';

    var field = document.getElementById('status-field');
    var inFailedState = false;

    // Displays in status field based on events from subscriber instance.
    function updateStatusFromEvent (event, statusField) {
      if (inFailedState) {
        return;
      }
      statusField = typeof statusField !== 'undefined' ? statusField : field;
      var subTypes = window.red5prosdk.SubscriberEventTypes;
      var rtcTypes = window.red5prosdk.RTCSubscriberEventTypes;
      var status;
      var answer;
      var candidate;
      if (event.type === subTypes.SUBSCRIBE_METADATA) {
        return;
      }
      switch (event.type) {
        case subTypes.CONNECTION_CLOSED:
          status = 'Connection closed.';
          window.untrackBitrate();
          inFailedState = false;
          break;
        case subTypes.CONNECT_SUCCESS:
          status = 'Connection established...';
          inFailedState = false;
          break;
        case subTypes.CONNECT_FAILURE:
          status = 'Error - Could not establish connection.';
          inFailedState = true;
          break;
        case subTypes.SUBSCRIBE_START:
          status = 'Started subscribing session.';
          inFailedState = false;
          break;
        case subTypes.SUBSCRIBE_FAIL:
          status = 'Error - Could not start a subscribing session.';
          inFailedState = true;
          break;
        case subTypes.SUBSCRIBE_INVALID_NAME:
          status = 'Error - Stream name not in use.';
          break;
        case rtcTypes.OFFER_START:
          status = 'Begin offer...';
          break;
        case rtcTypes.OFFER_END:
          status = 'Offer accepted...';
          break;
        case rtcTypes.ANSWER_START:
          status = 'Sending answer...';
          answer = JSON.stringify(event.data, null, 2);
          console.log('[SubscriberStatus] ' + event.type + ': ' + answer);
          break;
        case rtcTypes.ANSWER_END:
          status = 'Answer received...';
          break;
        case rtcTypes.CANDIDATE_START:
          status = 'Sending candidate...';
          candidate = JSON.stringify(event.data, null, 2);
          console.log('[SubscriberStatus] ' + event.type + ': ' + candidate);
          break;
        case rtcTypes.CANDIDATE_END:
          status = 'Candidate received...';
          break;
        case rtcTypes.ICE_TRICKLE_COMPLETE:
          status = 'Negotiation complete. Waiting Subscription Start...';
          break;
    }
    if (status && status.length > 0) {
      statusField.innerText = ['STATUS', status].join(': ');
    }
  }

  window.red5proHandleSubscriberEvent = updateStatusFromEvent;

})(this, document);
