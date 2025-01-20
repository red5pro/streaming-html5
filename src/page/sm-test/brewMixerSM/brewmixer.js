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
;(window => {
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
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(mixerRequest) // JSON data sent with the request
        })

        let responseBody
        try {
          responseBody = await response.json()
        } catch (parseError) {
          console.warn('Error parsing JSON response:', parseError)
          throw new Error(`HTTP ${response.status}: JSON parse error`)
        }

        if (!response.ok) {
          const errorMessage =
            typeof responseBody === 'object' && responseBody.error
              ? responseBody.error
              : 'Unknown error message'
          throw new Error(`HTTP ${response.status}: ${errorMessage}`)
        }
        // Success (no return value since function is void)
        console.log('Mixer event created successfully')
      } catch (error) {
        // Handle any unexpected errors
        console.warn('Error in createMixerEvent:', error)
        throw error // Re-throw for the caller to catch
      }
    },

    // Get All Mixer Events (map by event ID)
    getMixerEvents: async (host, jwt, smVersion, nodeGroupName) => {
      const url = `https://${host}/as/${smVersion}/streams/mixer/${nodeGroupName}`
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json'
          }
        })
        let responseBody
        try {
          responseBody = await response.json()
        } catch (parseError) {
          console.warn('Error parsing JSON response:', parseError)
          throw new Error(`HTTP ${response.status}: JSON parse error`)
        }

        // Handle HTTP errors
        const { status } = response
        switch (status) {
          case 200:
            if (
              typeof responseBody !== 'object' ||
              Array.isArray(responseBody)
            ) {
              throw new Error(
                `Expected a map (object), but got ${typeof responseBody}`
              )
            }
            return responseBody // Return the map (object)
          case 401:
            throw new Error('HTTP 401: Unauthorized')
          case 404:
            throw new Error('HTTP 404: Not Found')
          default:
            throw new Error(`HTTP ${status}: Unexpected error`)
        }
      } catch (error) {
        // Handle any unexpected network or processing errors
        console.warn('Error in getMixerEventsMap:', error)
        throw error // Re-throw for the caller to catch
      }
    },

    // Get RenderTrees for Mixer Event
    getRenderTrees: async (host, jwt, smVersion, nodeGroupName, event) => {
      const url = `https://${host}/as/${smVersion}/streams/mixer/${nodeGroupName}/${event}`

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json'
          }
        })
        let responseBody
        try {
          responseBody = await response.json()
        } catch (parseError) {
          console.warn('Error parsing JSON response:', parseError)
          throw new Error(`HTTP ${response.status}: JSON parse error`)
        }
        const { status } = response
        // Handle HTTP errors
        switch (status) {
          case 200:
            if (!Array.isArray(responseBody)) {
              throw new Error(
                `Expected a list (array), but got ${typeof responseBody}`
              )
            }
            return responseBody // Return the list of objects
          case 401:
            throw new Error('HTTP 401: Unauthorized')
          case 404:
            throw new Error('HTTP 404: Not Found')
          default:
            throw new Error(`HTTP ${status}: Unexpected error`)
        }
      } catch (error) {
        // Handle any unexpected network or processing errors
        console.warn('Error in getRenderTrees:', error)
        throw error // Re-throw for the caller to catch
      }
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
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json'
          },
          body
        })
        let responseBody
        try {
          responseBody = await response.json()
        } catch (parseError) {
          console.warn('Error parsing JSON response:', parseError)
          throw new Error(`HTTP ${response.status}: JSON parse error`)
        }
        const { ok, status } = response

        // Handle HTTP errors
        if (!ok) {
          const errorMessage =
            typeof responseBody === 'object'
              ? JSON.stringify(responseBody, null, 4)
              : responseBody
          throw new Error(`HTTP ${status}: ${errorMessage}`)
        }

        // Success - handle manifest delegate
        if (this.manifestDelegate && renderTrees.length > 0) {
          this.manifestDelegate.call(null, renderTrees[0])
        }
      } catch (error) {
        // Handle any unexpected network or processing errors
        console.error('Error in _updateRenderTrees:', error)
        throw error // Re-throw for the caller to catch
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
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json'
          }
        })
        let responseBody
        try {
          responseBody = await response.json()
        } catch (parseError) {
          console.warn('Error parsing JSON response:', parseError)
          throw new Error(`HTTP ${response.status}: JSON parse error`)
        }
        const { ok, status } = response

        // Handle HTTP errors
        if (!ok) {
          const errorMessage =
            typeof responseBody === 'object'
              ? JSON.stringify(responseBody, null, 4)
              : responseBody
          throw new Error(`HTTP ${status}: ${errorMessage}`)
        }

        // Success - log the successful stop operation
        console.log(`Mixer event ${eventId} stopped successfully.`)
        return (
          responseBody || {
            message: `Mixer event ${eventId} stopped successfully.`
          }
        )
      } catch (error) {
        // Log and re-throw the error for the caller to handle
        console.error('Error in stopMixerEvent:', error)
        throw error
      }
    }
  }
})(window)
