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
  const params = new URLSearchParams(window.location.search)

  const bandwidth = {
    audio: params.get('audioBW') ? parseInt(params.get('audioBW')) : undefined,
    video: params.get('videoBW') ? parseInt(params.get('videoBW')) : undefined
  }

  const enableAuth = params.get('authEnabled')
  const auth =
    enableAuth === 'true'
      ? {
          username: params.get('authUsername'),
          password: params.get('authPassword'),
          token: params.get('authToken')
        }
      : undefined

  const dissectURL = url => {
    try {
      const urlObj = new URL(url)
      const protocol = urlObj.protocol.replace(':', '')
      const host = urlObj.hostname
      const port = urlObj.port
        ? parseInt(urlObj.port)
        : protocol === 'https'
        ? 443
        : null
      return {
        protocol,
        host,
        port
      }
    } catch (e) {
      // noop
    }
    return null
  }

  // If the endpoint is set, we will use it to set the host, protocol and port
  const endpoint = params.get('endpoint')
  if (endpoint) {
    const dissected = dissectURL(endpoint)
    if (dissected) {
      params.set('host', dissected.host)
      params.set('protocol', dissected.protocol)
      params.set('port', dissected.port)
    }
  }

  // Media settings
  const useAudio = params.get('useAudio')
    ? params.get('useAudio') !== 'false'
      ? true
      : false
    : undefined
  const useVideo = params.get('useVideo')
    ? params.get('useVideo') !== 'false'
      ? true
      : false
    : undefined
  const cameraWidth = params.get('cameraWidth')
    ? parseInt(params.get('cameraWidth'))
    : undefined
  const cameraHeight = params.get('cameraHeight')
    ? parseInt(params.get('cameraHeight'))
    : undefined
  const frameRate = params.get('frameRate')
    ? parseInt(params.get('frameRate'))
    : undefined
  let mediaConstraints
  if (cameraWidth || cameraHeight) {
    mediaConstraints = {
      audio: useAudio,
      video: {
        width: {
          min: 320,
          max: cameraWidth || 640
        },
        height: {
          min: 240,
          max: cameraHeight || 480
        },
        frameRate: {
          min: 8,
          max: frameRate || 30
        }
      }
    }
  }

  const config = {
    host: params.get('host'),
    stream1: params.get('stream1') || params.get('streamName'),
    stream2: params.get('stream2'),
    app: params.get('app'),
    streamMode: params.get('streamMode'),
    recordBroadcast: params.get('streamMode')
      ? params.get('streamMode') === 'record'
      : undefined,
    preferWhipWhep: params.get('preferWhipWhep')
      ? params.get('preferWhipWhep') !== 'false'
        ? true
        : false
      : undefined,
    useAudio,
    useVideo,
    cameraWidth,
    cameraHeight,
    frameRate,
    mediaConstraints,
    streamManagerUsername:
      params.get('smUsername') || params.get('streamManagerUsername'),
    streamManagerPassword:
      params.get('smPassword') || params.get('streamManagerPassword'),
    streamManagerNodeGroup:
      params.get('smNodeGroup') || params.get('streamManagerNodeGroup'),
    streamManagerRegion:
      params.get('smRegion') || params.get('streamManagerRegion'),
    keyFramerate: params.get('keyFramerate')
      ? parseInt(params.get('keyFramerate'))
      : undefined,
    authentication: auth,
    bandwidth: bandwidth.audio || bandwidth.video ? bandwidth : undefined,
    protocol: params.get('protocol'),
    port: params.get('port') ? parseInt(params.get('port')) : undefined
  }

  // equals config, but with undefined values removed
  const queryParamConfig = Object.fromEntries(
    Object.entries(config).filter(
      ([_, v]) => v !== undefined && v !== '' && v !== null
    )
  )
  window.queryParamConfig = queryParamConfig
})(window)
