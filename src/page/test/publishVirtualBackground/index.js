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
/* global MediaStreamTrackProcessor, MediaStreamTrackGenerator, VideoFrame */
;(function (window, document, red5prosdk, SelfieSegmentation) {
  'use strict'

  const serverSettings = (() => {
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

  const configuration = (() => {
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

  const canvas = new OffscreenCanvas(640, 360)
  const canvasWidth = canvas.width
  const canvasHeight = canvas.height
  const ctx = canvas.getContext('2d')

  const backgroundImage = new Image(640, 360)
  backgroundImage.crossOrigin = 'anonymous'
  backgroundImage.src = 'images/malaga.jpg'

  let selection = 'bgColor'
  const radioButtons = document.querySelectorAll('input[type="radio"]')
  radioButtons.forEach((radioButton) => {
    selection = radioButton.checked ? radioButton.id : selection
    radioButton.addEventListener('change', () => {
      selection = radioButton.checked ? radioButton.id : selection
    })
  })

  const updateStatusFromEvent = window.red5proHandlePublisherEvent // defined in src/template/partial/status-field-publisher.hbs
  const streamTitle = document.getElementById('stream-title')
  const statisticsField = document.getElementById('statistics-field')
  const bitrateField = document.getElementById('bitrate-field')
  const packetsField = document.getElementById('packets-field')
  const resolutionField = document.getElementById('resolution-field')

  const protocol = serverSettings.protocol
  const isSecure = protocol == 'https'
  const getSocketLocationFromProtocol = () => {
    return !isSecure
      ? { protocol: 'ws', port: serverSettings.wsport }
      : { protocol: 'wss', port: serverSettings.wssport }
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
    console.log('[Red5ProPublisher] ' + event.type + '.')
    if (event.type === 'WebRTC.PeerConnection.Open') {
      try {
        const pc = targetPublisher.getPeerConnection()
        const stream = targetPublisher.getMediaStream()
        window.trackBitrate(pc, onBitrateUpdate, onResolutionUpdate)
        statisticsField.classList.remove('hidden')
        stream.getVideoTracks().forEach(function (track) {
          const settings = track.getSettings()
          onResolutionUpdate(settings.width, settings.height)
        })
      } catch (e) {
        // no tracking for you!
      }
    }
    updateStatusFromEvent(event)
  }
  const onPublishFail = (message) => {
    console.error('[Red5ProPublisher] Publish Error :: ' + message)
  }
  const onPublishSuccess = () => {
    console.log('[Red5ProPublisher] Publish Complete.')
  }
  const onUnpublishFail = (message) => {
    console.error('[Red5ProPublisher] Unpublish Error :: ' + message)
  }
  const onUnpublishSuccess = () => {
    console.log('[Red5ProPublisher] Unpublish Complete.')
  }

  const getAuthenticationParams = () => {
    let auth = configuration.authentication
    return auth && auth.enabled
      ? {
          connectionParams: {
            username: auth.username,
            password: auth.password,
            token: auth.token,
          },
        }
      : {}
  }

  const getUserMediaConfiguration = () => {
    return {
      mediaConstraints: {
        audio: configuration.useAudio
          ? configuration.mediaConstraints.audio
          : false,
        video: configuration.useVideo
          ? configuration.mediaConstraints.video
          : false,
      },
    }
  }

  const unpublish = async () => {
    try {
      await targetPublisher.unpublish()
      targetPublisher.off('*', onPublisherEvent)
      onUnpublishSuccess()
    } catch (error) {
      var jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      onUnpublishFail(jsonError)
    } finally {
      targetPublisher = undefined
    }
  }

  const authParams = getAuthenticationParams()
  const mediaConfig = getUserMediaConfiguration()
  const config = {
    ...configuration,
    ...authParams,
    ...mediaConfig,
    streamMode: configuration.recordBroadcast ? 'record' : 'live',
  }

  const onResults = (results) => {
    ctx.save()
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    ctx.drawImage(results.segmentationMask, 0, 0, canvasWidth, canvasHeight)

    if (selection === 'image') {
      ctx.globalCompositeOperation = 'source-out'
      const pat = ctx.createPattern(backgroundImage, 'no-repeat')
      ctx.fillStyle = pat
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)

      ctx.globalCompositeOperation = 'destination-atop'
      ctx.drawImage(results.image, 0, 0, canvasWidth, canvasHeight)
    } else if (selection === 'blur') {
      ctx.globalCompositeOperation = 'source-in'
      ctx.drawImage(results.image, 0, 0, canvasWidth, canvasHeight)

      ctx.filter = 'blur(15px)'
      ctx.globalCompositeOperation = 'destination-atop'
      ctx.drawImage(results.image, 0, 0, canvasWidth, canvasHeight)
    } else {
      ctx.globalCompositeOperation = 'source-out'
      ctx.fillStyle = 'chartreuse'
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)

      ctx.globalCompositeOperation = 'destination-atop'
      ctx.drawImage(results.image, 0, 0, canvasWidth, canvasHeight)
    }

    ctx.restore()
  }

  const start = async () => {
    const streamName = config.stream1
    try {
      const rtcConfig = {
        ...config,
        protocol: getSocketLocationFromProtocol().protocol,
        port: getSocketLocationFromProtocol().port,
        streamName,
      }

      const selfieSegmentation = new SelfieSegmentation({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
      })
      selfieSegmentation.setOptions({
        modelSelection: 1,
      })
      selfieSegmentation.onResults(onResults)

      const media = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: 640,
          height: 360,
        },
      })
      const audioTrack = media.getAudioTracks()[0]
      const videoTrack = media.getVideoTracks()[0]

      const trackProcessor = new MediaStreamTrackProcessor({
        track: videoTrack,
      })
      const trackGenerator = new MediaStreamTrackGenerator({ kind: 'video' })
      const transformer = new TransformStream({
        async transform(videoFrame, controller) {
          const { displayWidth, displayHeight, timestamp } = videoFrame
          videoFrame.width = displayWidth
          videoFrame.height = displayHeight
          await selfieSegmentation.send({ image: videoFrame })

          const frame = new VideoFrame(canvas, { timestamp })

          videoFrame.close()
          controller.enqueue(frame)
        },
      })
      trackProcessor.readable
        .pipeThrough(transformer)
        .pipeTo(trackGenerator.writable)

      // Assemble stream
      const stream = new MediaStream([trackGenerator, audioTrack])

      targetPublisher = new red5prosdk.WHIPClient()
      targetPublisher.on('*', onPublisherEvent)
      await targetPublisher.initWithStream(rtcConfig, stream)
      await targetPublisher.publish()
      streamTitle.innerText = streamName
      onPublishSuccess(targetPublisher)
    } catch (error) {
      const jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      console.error('[Red5ProPublisher] :: Error in publishing - ' + jsonError)
      onPublishFail(jsonError)
      if (targetPublisher) {
        targetPublisher.off('*', onPublisherEvent)
      }
      targetPublisher = undefined
    }
  }

  let shuttingDown = false
  const shutdown = () => {
    if (shuttingDown) return
    shuttingDown = true
    const clearRefs = () => {
      if (targetPublisher) {
        targetPublisher.off('*', onPublisherEvent)
      }
      targetPublisher = undefined
    }
    unpublish().then(clearRefs).catch(clearRefs)
    window.untrackBitrate()
  }
  window.addEventListener('pagehide', shutdown)
  window.addEventListener('beforeunload', shutdown)

  start()
})(this, document, window.red5prosdk, window.SelfieSegmentation)
