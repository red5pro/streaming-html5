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
;((window) => {
  const uuid = () => {
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    )
  }

  const generateFingerprint = () => {
    let value
    try {
      value = crypto.randomUUID()
    } catch (e) {
      value = uuid()
    }
    return value
  }

  class ConferenceService {
    constructor(endpoint, delegate) {
      this.endpoint = endpoint
      this.delegate = delegate
      this.socket = undefined
    }

    join(name, token, streamGuid) {
      this.socket = new WebSocket(this.endpoint)
      this.socket.onopen = () => {
        this.socket.send(
          JSON.stringify({
            messageType: 'JoinConferenceRequest',
            displayName: name,
            joinToken: token,
            streamGuid,
            fingerprint: generateFingerprint(),
          })
        )
      }

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        const { messageType } = data
        if (messageType === 'ConferenceStateEvent') {
          const { state } = data
          const { participants } = state
          if (this.delegate) {
            this.delegate.onConferenceParticipantsUpdate(participants)
          }
        }
      }

      this.socket.onclose = () => {
        if (this.delegate) {
          this.delegate.onConferenceClose()
        }
      }

      this.socket.onerror = (event) => {
        if (this.delegate) {
          this.delegate.onConferenceError(event)
        }
      }
    }

    leave() {
      this.delegate = undefined
      if (this.socket) {
        this.socket.close()
      }
    }
  }

  window.ConferenceService = ConferenceService
})(window)
