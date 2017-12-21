(function (window, document) {
    'use strict';

    var field = document.getElementById('status-field');
    var inFailedState = false;

    function updateStatusFromEvent (event, statusField) {
      if (inFailedState) {
        return;
      }
      statusField = typeof statusField !== 'undefined' ? statusField : field;
      var pubTypes = window.red5prosdk.PublisherEventTypes;
      var rtcTypes = window.red5prosdk.RTCPublisherEventTypes;
      var status;
      if (event.type === pubTypes.PUBLISH_METADATA) {
        return;
      }
      switch (event.type) {
        case pubTypes.CONNECTION_CLOSED:
          status = 'Connection closed.';
          window.untrackBitrate();
          inFailedState = false;
          break;
        case pubTypes.CONNECT_SUCCESS:
          status = 'Connection established...';
          inFailedState = false;
         break;
        case pubTypes.CONNECT_FAILURE:
          status = 'Error - Could not establish connection.';
          inFailedState = true;
          break;
        case pubTypes.PUBLISH_START:
          status = 'Started publishing session.';
          inFailedState = false;
          break;
        case pubTypes.PUBLISH_FAIL:
          status = 'Error - Could not start a publishing session.';
          inFailedState = true;
          break;
        case pubTypes.PUBLISH_INVALID_NAME:
          status = 'Error - Stream name already in use.';
          inFailedState = true;
          break;
        case rtcTypes.MEDIA_STREAM_AVAILABLE:
          status = 'Stream available...';
          inFailedState = false;
          break;
        case rtcTypes.PEER_CONNECTION_AVAILABLE:
          status = 'Peer Connection available...';
          break;
        case rtcTypes.OFFER_START:
          status = 'Begin offer...';
          break;
        case rtcTypes.OFFER_END:
          status = 'Offer accepted...';
          break;
        case rtcTypes.ICE_TRICKLE_COMPLETE:
          status = 'Negotiation complete. Waiting Publish Start...';
          break;
      }
    if (status && status.length > 0) {
        statusField.innerText = ['STATUS', status].join(': ');
      }
    }

    window.red5proHandlePublisherEvent = updateStatusFromEvent;

})(this, document);
