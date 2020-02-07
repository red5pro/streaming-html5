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
(function (window, document) {
    'use strict';

    var field = document.getElementById('status-field');
    var inFailedState = false;

    // Displays in status field based on events from subscriber instance.
    function updateStatusFromEvent (event, statusField) {
      // if (inFailedState) {
      //   return true;
      // }
      var wasInFailedState = inFailedState;

      statusField = typeof statusField !== 'undefined' ? statusField : field;
      var subTypes = window.red5prosdk.SubscriberEventTypes;
      var rtcTypes = window.red5prosdk.RTCSubscriberEventTypes;
      var status;
      var answer;
      var candidate;
      if (event.type === subTypes.SUBSCRIBE_METADATA) {
        return false;
      }
      switch (event.type) {
        case 'ERROR':
          inFailedState = true;
          status = ['ERROR', event.data].join(': ');
          break;
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
          inFailedState = true;
          break;
        case rtcTypes.OFFER_START:
          status = 'Begin offer...';
          inFailedState = false;
          break;
        case rtcTypes.OFFER_END:
          status = 'Offer accepted...';
          inFailedState = false;
          break;
        case rtcTypes.ANSWER_START:
          status = 'Sending answer...';
          answer = JSON.stringify(event.data, null, 2);
          console.log('[SubscriberStatus] ' + event.type + ': ' + answer);
          inFailedState = false;
          break;
        case rtcTypes.ANSWER_END:
          status = 'Answer received...';
          inFailedState = false;
          break;
        case rtcTypes.CANDIDATE_START:
          status = 'Sending candidate...';
          candidate = JSON.stringify(event.data, null, 2);
          console.log('[SubscriberStatus] ' + event.type + ': ' + candidate);
          inFailedState = false;
          break;
        case rtcTypes.CANDIDATE_END:
          status = 'Candidate received...';
          inFailedState = false;
          break;
        case rtcTypes.ICE_TRICKLE_COMPLETE:
          status = 'Negotiation complete. Waiting Subscription Start...';
          inFailedState = false;
          break;
        default:
          inFailedState = false;
          break;
    }
    if(wasInFailedState && inFailedState){
      return true;
    }
    if (status && status.length > 0) {
      statusField.innerText = ['STATUS', status].join(': ');
    }
    return inFailedState;
  }

  window.red5proHandleSubscriberEvent = updateStatusFromEvent;

})(this, document);
