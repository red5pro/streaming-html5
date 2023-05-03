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
/**
 * Various utility requests related to Stream Manager integration.
 */
;((window) => {
  var configuration = (function () {
    const conf = sessionStorage.getItem('r5proTestBed')
    try {
      return JSON.parse(conf)
    } catch (e) {
      console.error(
        'Could not read testbed configuration from sessionstorage: ' + e.message
      )
    }
    return {}
  })()
  const apiVersion = configuration.streamManagerAPI || '4.0'
  const accessToken = configuration.streamManagerAccessToken

  let StatusMap = new Map()
  StatusMap.set(0, 'Unknown Error.')
  StatusMap.set(400, 'An invalid request was detected.')
  StatusMap.set(404, 'Data for the request could not be located/provided.')
  StatusMap.set(500, 'An internal error occurred while processing the request.')

  /**
   * Requests stream list from stream manager and filters on scope/app.
   */
  const getStreamList = async (host, context) => {
    let url = `https://${host}/streammanager/api/${apiVersion}/event/list`
    const result = await fetch(url)
    const json = await result.json()
    if (json.errorMessage) {
      throw new Error(json.errorMessage)
    }
    const list = json
    const filtered = list.filter((item) => {
      return item.scope === context
    })
    return filtered
  }

  /**
   * Request to get Origin data to broadcast on stream manager proxy.
   */
  const getOrigin = async (
    host,
    context,
    streamName,
    region = undefined,
    endpoints = NaN,
    strict = false,
    transcode = false
  ) => {
    let url = `https://${host}/streammanager/api/${apiVersion}/event/${context}/${streamName}?action=broadcast`
    if (region) {
      url += `&region=${region}`
    }
    if (strict) {
      url += '&strict=true'
    }
    if (!isNaN(endpoints) && endpoints > 0) {
      url += `&endpoints=${endpoints}`
    }
    if (transcode) {
      url += '&transcode=true'
    }
    const result = await fetch(url)
    const { status } = result
    if (status >= 200 && status < 300) {
      const json = await result.json()
      if (json.errorMessage) {
        throw new Error(json.errorMessage)
      }
      return json
    } else if (StatusMap.has(status)) {
      throw new Error(StatusMap.get(status))
    } else {
      throw new Error(StatusMap.get(0))
    }
  }

  /**
   * Request to get Edge on stream managaer to consume stream from stream manager proxy.
   */
  const getEdge = async (
    host,
    context,
    streamName,
    region = undefined,
    endpoints = NaN,
    strict = false
  ) => {
    let url = `https://${host}/streammanager/api/${apiVersion}/event/${context}/${streamName}?action=subscribe`
    if (region) {
      url += `&region=${region}`
    }
    if (strict) {
      url += '&strict=true'
    }
    if (!isNaN(endpoints) && endpoints > 0) {
      url += `&endpoints=${endpoints}`
    }
    const result = await fetch(url)
    const { status } = result
    if (status >= 200 && status < 300) {
      const json = await result.json()
      if (json.errorMessage) {
        throw new Error(json.errorMessage)
      }
      return json
    } else if (StatusMap.has(status)) {
      throw new Error(StatusMap.get(status))
    } else {
      throw new Error(StatusMap.get(0))
    }
  }

  const postTranscode = async (
    host,
    context,
    streamName,
    transcodeProvision
  ) => {
    const url = `https://${host}/streammanager/api/${apiVersion}/admin/event/meta/${context}/${streamName}?accessToken=${accessToken}`
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transcodeProvision),
    })
    const { status } = result
    if (status >= 200 && status < 300) {
      const json = await result.json()
      if (json.errorMessage) {
        // Will handle errors in tests...
        return json
        // throw new Error(json.errorMessage)
      }
      return json
    } else if (StatusMap.has(status)) {
      try {
        const json = await result.json()
        if (json.errorMessage) {
          return json
        }
      } catch (e) {
        console.warn(e)
      }
      throw new Error(StatusMap.get(status))
    } else {
      throw new Error(StatusMap.get(0))
    }
  }

  /**
   * Request to insert audio on interstitial.
   */
  const requestInterstitial = async (
    host,
    targetStream,
    userStream,
    accessToken
  ) => {
    const url = `https://${host}/streammanager/api/${apiVersion}/admin/interstitial?accessToken=${accessToken}`
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: 'any',
        digest: 'any',
        inserts: [
          {
            id: 3,
            target: targetStream,
            interstitial: userStream,
            loop: true,
            isInterstitialVideo: false,
            isInterstitialAudio: true,
            type: 'INDEFINITE',
          },
        ],
      }),
    })
    if (result && result.status >= 200 && result.status < 300) {
      return {}
    } else {
      const json = await result.json()
      if (json.errorMessage) {
        throw new Error(json.errorMessage)
      }
      return json
    }
  }

  /**
   * Request to resume the interstitial stream.
   */
  const resumeInterstitial = async (host, targetStream, accessToken) => {
    const url = `https://${host}/streammanager/api/${apiVersion}/admin/interstitial?accessToken=${accessToken}`
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: 'any',
        digest: 'any',
        resume: targetStream,
      }),
    })
    if (result && result.status >= 200 && result.status < 300) {
      return {}
    } else {
      const json = await result.json()
      if (json.errorMessage) {
        throw new Error(json.errorMessage)
      }
      return json
    }
  }

  window.streamManagerUtil = {
    getStreamList,
    getOrigin,
    getEdge,
    postTranscode,
    requestInterstitial,
    resumeInterstitial,
  }
})(window)
