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
;(function (window, document, red5prosdk) {
  'use strict'

  const serverSettings = (function () {
    const settings = sessionStorage.getItem('r5proServerSettings')
    try {
      return JSON.parse(settings)
    } catch (e) {
      console.error(
        'Could not read server settings from sessionstorage: ' + e.message
      )
    }
    return {}
  })()

  const configuration = (function () {
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
  red5prosdk.setLogLevel(
    configuration.verboseLogging
      ? red5prosdk.LOG_LEVELS.TRACE
      : red5prosdk.LOG_LEVELS.WARN
  )

  let targetPublisher

  const updateStatusFromEvent = window.red5proHandlePublisherEvent // defined in src/template/partial/status-field-publisher.hbs
  const streamTitle = document.getElementById('stream-title')
  const statisticsField = document.getElementById('statistics-field')
  const addressField = document.getElementById('address-field')
  const bitrateField = document.getElementById('bitrate-field')
  const packetsField = document.getElementById('packets-field')
  const resolutionField = document.getElementById('resolution-field')

  const protocol = serverSettings.protocol
  const isSecure =
    protocol == 'https' || window.location.hostname === 'localhost'
  function getSocketLocationFromProtocol() {
    return !isSecure
      ? { protocol: 'ws', port: serverSettings.wsport }
      : { protocol: 'wss', port: serverSettings.wssport }
  }

  const defaultConfiguration = {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port,
    streamMode: configuration.recordBroadcast ? 'record' : 'live',
  }

  streamTitle.innerText = configuration.stream1

  const getAuthenticationParams = () => {
    const { authentication } = configuration
    const { enabled, username, password, token } = authentication
    return enabled
      ? {
          connectionParams: {
            username,
            password,
            token,
          },
        }
      : {}
  }

  const displayServerAddress = (serverAddress, proxyAddress) => {
    addressField.classList.remove('hidden')
    proxyAddress = typeof proxyAddress === 'undefined' ? 'N/A' : proxyAddress
    addressField.innerText = `Proxy Address: ${proxyAddress} | Origin Address: ${serverAddress}`
  }

  let bitrate = 0
  let packetsSent = 0
  let frameWidth = 0
  let frameHeight = 0

  const updateStatistics = (b, p, w, h) => {
    statisticsField.classList.remove('hidden')
    bitrateField.innerText = b === 0 ? 'N/A' : Math.floor(b)
    packetsField.innerText = p
    resolutionField.innerText = (w || 0) + 'x' + (h || 0)
  }

  const onBitrateUpdate = (b, p) => {
    bitrate = b
    packetsSent = p
    updateStatistics(bitrate, packetsSent, frameWidth, frameHeight)
  }

  const onResolutionUpdate = (w, h) => {
    frameWidth = w
    frameHeight = h
    updateStatistics(bitrate, packetsSent, frameWidth, frameHeight)
  }

  const onPublisherEvent = (event) => {
    const { type } = event
    console.log('[Red5ProPublisher] ' + type + '.')
    updateStatusFromEvent(event)
    if (type === 'WebRTC.Endpoint.Changed') {
      const { host } = configuration
      const { data } = event
      const { endpoint } = data
      displayServerAddress(endpoint, host)
    }
  }
  const onPublishFail = (message) => {
    console.error('[Red5ProPublisher] Publish Error :: ' + message)
  }
  const onPublishSuccess = (publisher) => {
    console.log('[Red5ProPublisher] Publish Complete.')
    try {
      const pc = publisher.getPeerConnection()
      const stream = publisher.getMediaStream()
      window.trackBitrate(pc, onBitrateUpdate, onResolutionUpdate)
      statisticsField.classList.remove('hidden')
      stream.getVideoTracks().forEach(function (track) {
        const settings = track.getSettings()
        const { width, height } = settings
        onResolutionUpdate(width, height)
      })
    } catch (e) {
      // no tracking for you!
    }
  }
  const onUnpublishFail = (message) => {
    console.error('[Red5ProPublisher] Unpublish Error :: ' + message)
  }
  const onUnpublishSuccess = () => {
    console.log('[Red5ProPublisher] Unpublish Complete.')
  }

  const getRegionIfDefined = () => {
    const region = configuration.streamManagerRegion
    if (
      typeof region === 'string' &&
      region.length > 0 &&
      region !== 'undefined'
    ) {
      return region
    }
    return undefined
  }

  const getUserMediaConfiguration = () => {
    const { useAudio, useVideo, mediaConstraints } = configuration
    const { audio, video } = mediaConstraints
    return {
      mediaConstraints: {
        audio: useAudio ? audio : false,
        video: useVideo ? video : false,
      },
    }
  }

  const getConfiguration = () => {
    const {
      host,
      app,
      stream1,
      proxy,
      streamManagerAPI,
      preferWhipWhep,
      streamManagerNodeGroup: nodeGroup,
    } = configuration
    const { protocol, port } = getSocketLocationFromProtocol()

    const region = getRegionIfDefined()
    const params = region
      ? {
          region,
          strict: true,
        }
      : undefined

    const appContext = preferWhipWhep
      ? `as/${streamManagerAPI}/proxy/${app}`
      : `as/${streamManagerAPI}/proxy/ws/publish/${app}`

    const httpProtocol = protocol === 'wss' ? 'https' : 'http'
    const endpoint = !preferWhipWhep
      ? `${protocol}://${host}:${port}/as/${streamManagerAPI}/proxy/ws/publish/${app}/${stream1}`
      : `${httpProtocol}://${host}:${port}/as/${streamManagerAPI}/proxy/whip/${app}/${stream1}`

    const connectionParams = params
      ? { ...params, ...getAuthenticationParams().connectionParams }
      : getAuthenticationParams().connectionParams

    const rtcConfig = {
      ...configuration,
      ...defaultConfiguration,
      ...getUserMediaConfiguration(),
      endpoint,
      protocol,
      port,
      host,
      streamName: stream1,
      app: appContext,
      connectionParams: preferWhipWhep
        ? {
            ...connectionParams,
            nodeGroup,
          }
        : {
            ...connectionParams,
            host: host,
            app: app,
            nodeGroup,
          },
    }
    return rtcConfig
  }

  const startPublish = async () => {
    try {
      const { RTCPublisher, WHIPClient } = red5prosdk
      const { preferWhipWhep, stream1 } = configuration
      const config = getConfiguration()
      const publisher = preferWhipWhep ? new WHIPClient() : new RTCPublisher()
      publisher.on('*', onPublisherEvent)
      await publisher.init(config)
      await publisher.publish()
      onPublishSuccess(publisher)
      streamTitle.innerText = stream1
      targetPublisher = publisher
    } catch (error) {
      var jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      console.error(
        '[Red5ProPublisher] :: Error in access of Origin IP: ' + jsonError
      )
      updateStatusFromEvent({
        type: red5prosdk.PublisherEventTypes.CONNECT_FAILURE,
      })
      onPublishFail(jsonError)
    }
  }

  const unpublish = async () => {
    try {
      const publisher = targetPublisher
      await publisher.unpublish()
      onUnpublishSuccess()
    } catch (error) {
      var jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, 2, null)
      onUnpublishFail('Unmount Error ' + jsonError)
      throw error
    }
  }

  let shuttingDown = false
  const shutdown = async () => {
    if (shuttingDown) return
    shuttingDown = true
    try {
      await unpublish()
    } catch (e) {
      console.error(e)
    } finally {
      if (targetPublisher) {
        targetPublisher.off('*', onPublisherEvent)
      }
      targetPublisher = undefined
    }
    window.untrackBitrate()
  }
  window.addEventListener('pagehide', shutdown)
  window.addEventListener('beforeunload', shutdown)

  startPublish()
})(this, document, window.red5prosdk)
