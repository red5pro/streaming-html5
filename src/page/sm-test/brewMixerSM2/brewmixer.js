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
An  example  of  the EULA can be found on our website at: https://account.red5.net/assets/LICENSE.txt.

The above copyright notice and this license shall be included in all copies or portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,  INCLUDING  BUT
NOT  LIMITED  TO  THE  WARRANTIES  OF  MERCHANTABILITY, FITNESS  FOR  A  PARTICULAR  PURPOSE  AND
NONINFRINGEMENT.   IN  NO  EVENT  SHALL INFRARED5, INC. BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN  AN  ACTION  OF  CONTRACT,  TORT  OR  OTHERWISE,  ARISING  FROM,  OUT  OF  OR  IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
;((window) => {
  // BrewMixer API Service Module
  window.brewmixer = {
    // Create Mixer Event
    createMixerEvent: async (jwt, smVersion, nodeGroupName, mixerRequest) => {
      const url = `/as/${smVersion}/streams/mixer/${nodeGroupName}`
      const response = await fetch(url, {
        method: 'POST',
        withCredentials: true,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
        },
        body: JSON.stringify(mixerRequest),
      }).catch((error) => {
        console.log('error trying to createMixerEvent: ' + error)
      })

      return response
    },

    // TODO: Get All Mixer Events

    // Get RenderTrees for Mixer Event
    getRenderTrees: async (jwt, smVersion, nodeGroupName, eventId) => {
      const url = `/as/${smVersion}/streams/mixer/${nodeGroupName}/${eventId}`
      const response = await fetch(url, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include',
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
      }).catch((error) => {
        console.log('error trying to getRenderTrees: ' + error)
      })

      var result = null
      if (response.ok) {
        result = await response.json()
        // console.log("RENDERTREE RESPONSE: " + JSON.stringify(result, null, 4));
      } else {
        console.log('RENDERTREE RESPONSE ERROR ' + response.status)
      }

      return result
    },

    // Update RenderTrees
    // send the globalNodeGraph to the server
    // note that renderTrees is an array
    updateRenderTrees: async function (
      jwt,
      smVersion,
      nodeGroupName,
      eventId,
      renderTrees
    ) {
      const url = `/as/${smVersion}/streams/mixer/${nodeGroupName}/${eventId}`
      const body = JSON.stringify(renderTrees)
      try {
        const response = await fetch(url, {
          method: 'PUT',
          withCredentials: true,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + jwt,
          },
          body: body,
        })

        if (response.ok) {
          console.log('Update successful')
        } else {
          const responseObj = await response.json()
          console.log('Error:\n', JSON.stringify(responseObj, null, 4))
        }
      } catch (error) {
        console.log('Error trying to updateRenderTrees: ' + error)
      }
    },

    // Stop Mixer Event
    stopMixerEvent: async function (jwt, smVersion, nodeGroupName, eventId) {
      const url = `/as/${smVersion}/streams/mixer/${nodeGroupName}/${eventId}`
      const response = await fetch(url, {
        method: 'DELETE',
        withCredentials: true,
        credentials: 'include',
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
      }).catch((error) => {
        console.log('error trying to stopMixerEvent: ' + error)
      })

      return response
    },
  }
})(window)
