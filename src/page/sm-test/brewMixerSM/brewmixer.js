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
  const DELAY = 100
  let timeout
  const debounce = (target, func, delay) => {
    return function (...args) {
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(target, args), delay)
    }
  }

  // BrewMixer API Service Module
  window.brewmixer = {
    // Create Mixer Event
    manifestDelegate: undefined,

    createMixerEvent: async (
      host,
      jwt,
      smVersion,
      nodeGroupName,
      mixerRequest
    ) => {
      const url = `https://${host}/as/${smVersion}/streams/mixer/${nodeGroupName}`
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + jwt,
          },
          body: JSON.stringify(mixerRequest),
        })
        return response
      } catch (error) {
        return { error: 'Error trying to createMixerEvent: ' + error }
      }
    },

    // Get All Mixer Events
    listMixerEvents: async (host, jwt, smVersion, nodeGroupName) => {
      var result = null
      const url = `https://${host}/as/${smVersion}/streams/mixer/${nodeGroupName}`
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + jwt,
            'Content-Type': 'application/json',
          },
        })
        if (response.ok) {
          result = await response.json()
        } else {
          console.log('LISTMIXEREVENTS RESPONSE ERROR ' + response.status)
        }
      } catch (error) {
        alert('Error trying to listMixerEvents: ' + error)
      }
      return result
    },

    // Get RenderTrees for Mixer Event
    getRenderTrees: async (host, jwt, smVersion, nodeGroupName, event) => {
      var result = null
      const url = `https://${host}/as/${smVersion}/streams/mixer/${nodeGroupName}/${event}`
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + jwt,
            'Content-Type': 'application/json',
          },
        })
        if (response.ok) {
          result = await response.json()
        } else {
          console.log('RENDERTREE RESPONSE ERROR ' + response.status)
        }
      } catch (error) {
        alert('Error trying to getRenderTrees: ' + error)
      }
      return result
    },

    // Update RenderTrees
    // send the globalNodeGraph to the server
    // note that renderTrees is an array
    updateRenderTrees: async function (
      host,
      jwt,
      smVersion,
      nodeGroupName,
      eventId,
      renderTrees,
      useDebounce = true
    ) {
      if (useDebounce) {
        return debounce(this, this._updateRenderTrees, DELAY)(
          host,
          jwt,
          smVersion,
          nodeGroupName,
          eventId,
          renderTrees
        )
      } else {
        return this._updateRenderTrees(
          host,
          jwt,
          smVersion,
          nodeGroupName,
          eventId,
          renderTrees
        )
      }
    },

    // Internal method for debouncing
    _updateRenderTrees: async function (
      host,
      jwt,
      smVersion,
      nodeGroupName,
      eventId,
      renderTrees
    ) {
      const url = `https://${host}/as/${smVersion}/streams/mixer/${nodeGroupName}/${eventId}`
      const body = JSON.stringify(renderTrees)
      try {
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + jwt,
          },
          body: body,
        })

        if (response.ok) {
          if (this.manifestDelegate && renderTrees.length > 0) {
            this.manifestDelegate.call(null, renderTrees[0])
          }
        } else {
          const responseObj = await response.json()
          throw new Error(JSON.stringify(responseObj, null, 4))
        }
      } catch (error) {
        alert('Error trying to updateRenderTrees: ' + error)
      }
    },

    // Stop Mixer Event
    stopMixerEvent: async function (
      host,
      jwt,
      smVersion,
      nodeGroupName,
      eventId
    ) {
      const url = `https://${host}/as/${smVersion}/streams/mixer/${nodeGroupName}/${eventId}`
      try {
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + jwt,
          },
        })
        return response
      } catch (error) {
        return { error: 'Error trying to stopMixerEvent: ' + error }
      }
    },
  }
})(window)
