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
;((window, document, red5prosdk) => {
  'use strict'

  const serverSettings = (() => {
    var settings = sessionStorage.getItem('r5proServerSettings')
    try {
      return JSON.parse(settings)
    } catch (e) {
      console.error(
        'Could not read server settings from sessionstorage: ' + e.message
      )
    }
    return {}
  })()

  const configuration = (() => {
    var conf = sessionStorage.getItem('r5proTestBed')
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

  const searchParams = new URLSearchParams(window.location.search)
  const query = (param, defaultValue) => {
    return searchParams.has(param) ? searchParams.get(param) : defaultValue
  }
  let endpoint = query('endpoint', undefined)
  let interval = parseInt(query('interval', 5), 10)

  let targetPublisher

  const updateStatusFromEvent = window.red5proHandlePublisherEvent // defined in src/template/partial/status-field-publisher.hbs
  const streamTitle = document.getElementById('stream-title')
  const statisticsField = document.getElementById('statistics-field')

  const statsForm = document.getElementById('stats-form')
  const endpointField = document.getElementById('endpoint-field')
  const intervalField = document.getElementById('interval-field')
  const submitButton = document.getElementById('submit-button')
  const bitrateField = document.getElementById('bitrate-field')
  const packetsField = document.getElementById('packets-field')
  const resolutionField = document.getElementById('resolution-field')

  let bitrate = 0
  let packetsSent = 0
  let frameWidth = 0
  let frameHeight = 0

  endpointField.value = endpoint
  intervalField.value = interval

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

  streamTitle.innerText = configuration.stream1

  const protocol = serverSettings.protocol
  const isSecure = protocol == 'https'
  const getSocketLocationFromProtocol = () => {
    return !isSecure
      ? { protocol: 'ws', port: serverSettings.wsport }
      : { protocol: 'wss', port: serverSettings.wssport }
  }

  const onPublisherEvent = (event) => {
    console.log(`[Red5ProPublisher] ${event.type}.`)
    updateStatusFromEvent(event)
  }
  const onPublishFail = (message) => {
    console.error(`[Red5ProPublisher] Publish Error :: ${message}`)
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
    console.error(`[Red5ProPublisher] Unpublish Error :: ${message}`)
  }
  const onUnpublishSuccess = () => {
    console.log('[Red5ProPublisher] Unpublish Complete.')
  }

  const getUserMediaConfiguration = () => {
    const { useAudio, useVideo, mediaConstraints } = configuration
    return {
      mediaConstraints: {
        audio: useAudio ? mediaConstraints.audio : false,
        video: useVideo ? mediaConstraints.video : false,
      },
    }
  }

  const determinePublisher = (statsConfig) => {
    const { preferWhipWhep } = configuration
    const { WHIPClient, RTCPublisher } = red5prosdk

    const rtcConfig = Object.assign(
      {},
      configuration,
      getUserMediaConfiguration(),
      {
        protocol: getSocketLocationFromProtocol().protocol,
        port: getSocketLocationFromProtocol().port,
        streamName: configuration.stream1,
        streamMode: configuration.recordBroadcast ? 'record' : 'live',
        stats: statsConfig,
      }
    )

    const publisher = preferWhipWhep ? new WHIPClient() : new RTCPublisher()
    return publisher.init(rtcConfig)
  }

  const unpublish = async () => {
    if (targetPublisher === undefined) {
      return
    }
    try {
      const publisher = targetPublisher
      publisher.off('*', onPublisherEvent)
      await publisher.unpublish()
      onUnpublishSuccess()
    } catch (error) {
      const jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, 2, null)
      onUnpublishFail(`Unmount Error: ${jsonError}`)
      throw new Error(jsonError)
    } finally {
      targetPublisher = undefined
    }
  }

  const start = async (statsConfig) => {
    // Kick off.
    statsForm.classList.add('hidden')
    try {
      const publisher = await determinePublisher(statsConfig)
      targetPublisher = publisher
      targetPublisher.on('*', onPublisherEvent)
      await targetPublisher.publish()
      streamTitle.innerText = configuration.stream1
      onPublishSuccess(targetPublisher)
    } catch (error) {
      const jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      console.error('[Red5ProPublisher] :: Error in publishing - ' + jsonError)
      onPublishFail(jsonError)
      statsForm.classList.remove('hidden')
      await unpublish()
    }
  }

  submitButton.addEventListener('click', function () {
    const newEndpoint =
      endpointField.value.length > 0 ? endpointField.value : undefined
    const newInterval = parseInt(intervalField.value, 10) * 1000
    start({
      endpoint: newEndpoint,
      interval: newInterval,
    })
  })

  let shuttingDown = false
  const shutdown = async () => {
    if (shuttingDown) return
    shuttingDown = true
    try {
      await unpublish()
    } catch (error) {
      // no-op
    }
    window.untrackBitrate()
  }
  window.addEventListener('pagehide', shutdown)
  window.addEventListener('beforeunload', shutdown)
})(this, document, window.red5prosdk)
