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

  var serverSettings = (function () {
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

  let targetSubscriber
  let useKeyframeRecognition = false
  let useAutoplay = false
  let mediaStream = null
  let bitrateInterval = 0
  const keyframeRecognitionCheckbox = document.getElementById('keyframe-recognition-checkbox')
  const autoplayRadio = Array.from(document.querySelectorAll('input[name="autoplay"]'))
  const subscribeButton = document.getElementById('subscribe-button')

  const updateStatusFromEvent = event => {
    const subTypes = red5prosdk.SubscriberEventTypes
    switch (event.type) {
      case subTypes.CONNECT_FAILURE:
      case subTypes.SUBSCRIBE_FAIL:
        shutdownVideoElement()
        break
    }
    window.red5proHandleSubscriberEvent(event) // defined in src/template/partial/status-field-subscriber.hbs
  }

  const instanceId = Math.floor(Math.random() * 0x10000).toString(16)
  const streamTitle = document.getElementById('stream-title')
  const statisticsField = document.getElementById('statistics-field')
  const bitrateField = document.getElementById('bitrate-field')
  const packetsField = document.getElementById('packets-field')
  const resolutionField = document.getElementById('resolution-field')
  const addressField = document.getElementById('address-field')

  let bitrate = 0
  let packetsReceived = 0
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
    packetsReceived = p
    updateStatistics(bitrate, packetsReceived, frameWidth, frameHeight)
  }

  const onResolutionUpdate = (w, h) => {
    frameWidth = w
    frameHeight = h
    updateStatistics(bitrate, packetsReceived, frameWidth, frameHeight)
  }

  const defaultConfiguration = ((useVideo, useAudio) => {
    let c = configuration
    if (!useVideo) {
      c.videoEncoding = red5prosdk.PlaybackVideoEncoder.NONE
    }
    if (!useAudio) {
      c.audioEncoding = red5prosdk.PlaybackAudioEncoder.NONE
    }
    return c
  })(configuration.useVideo, configuration.useAudio)

  const shutdownVideoElement = () => {
    const videoElement = document.getElementById('red5pro-subscriber')
    if (videoElement) {
      videoElement.pause()
      videoElement.src = ''
    }
  }

  const getAuthenticationParams = () => {
    const { authentication } = configuration
    const { enabled, username, password, token } = authentication
    return enabled
      ? {
          connectionParams: {
            username,
            password,
            token
          }
        }
      : {}
  }

  const displayServerAddress = (serverAddress, proxyAddress) => {
    addressField.classList.remove('hidden')
    proxyAddress = typeof proxyAddress === 'undefined' ? 'N/A' : proxyAddress
    addressField.innerText = `Proxy Address: ${proxyAddress} | Edge Address: ${serverAddress}`
  }

  // Local lifecycle notifications.
  const onSubscriberEvent = event => {
    const { type } = event
    const { data } = event
    const remoteTracks = {
      videoTrack: null,
      audioTrack: null
    }
    const remoteVideo = document.getElementById('videoEl')
    const remoteStream = new MediaStream()

    console.log('[Red5ProSubsriber] ' + type + '.')
    updateStatusFromEvent(event)
    if (type === 'Subscribe.VideoDimensions.Change') {
      onResolutionUpdate(event.data.width, event.data.height)
    } else if (type ==='Subscribe.Metadata') {
      const { data } = event
      console.log('[R5-MANUAL] METADATA', JSON.stringify(data, null, 2))
    } else if (type === 'WebRTC.Endpoint.Changed') {
      const { host } = configuration
      const { data } = event
      const { endpoint } = data
      displayServerAddress(endpoint, host)
    } else if (type === 'WebRTC.PeerConnection.OnTrack') {
      const mediaType = data.track.kind
      console.log('[R5-MANUAL] ON TRACK', mediaType)
      const stream = data.streams && data.streams.length > 0 ? data.streams[0] : remoteStream
      mediaStream = stream
      if (!useKeyframeRecognition) {
        remoteVideo.setAttribute('autoplay', true)
      } else {
        remoteVideo.removeAttribute('autoplay')
        elementPlaybackState(remoteVideo, false)
      }
      attachMediaStream(remoteVideo, mediaStream)
    } else if (type === 'WebRTC.PeerConnection.Available') {
      if (useKeyframeRecognition) {
        const pc = data
        trackKeyframeRecognition(pc)
      }
    }
  }
  const onSubscribeFail = message => {
    console.error('[Red5ProSubsriber] Subscribe Error :: ' + message)
  }
  const onSubscribeSuccess = subscriber => {
    console.log('[Red5ProSubsriber] Subscribe Complete.')
    if (window.exposeSubscriberGlobally) {
      window.exposeSubscriberGlobally(subscriber)
    }
    if (subscriber.getType().toLowerCase() === 'rtc') {
      try {
        window.trackBitrate(
          subscriber.getPeerConnection(),
          onBitrateUpdate,
          onResolutionUpdate,
          true
        )
      } catch (e) {
        //
      }
    }
  }
  const onUnsubscribeFail = message => {
    console.error('[Red5ProSubsriber] Unsubscribe Error :: ' + message)
  }
  const onUnsubscribeSuccess = () => {
    console.log('[Red5ProSubsriber] Unsubscribe Complete.')
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

  var isSecure = true // protocol == 'https'
  const getSocketLocationFromProtocol = () => {
    return !isSecure
      ? { protocol: 'ws', port: serverSettings.wsport }
      : { protocol: 'wss', port: serverSettings.wssport }
  }

  const attachMediaStream = (element, stream) => {
    console.log('[R5-MANUAL] ATTACH')
    if (element.srcObject === stream) {
      return
    }
    try {
      element.srcObject = stream
    } catch (e) {
      try {
        element.src = URL.createObjectURL(stream)
      } catch (e) {
        console.log('[R5-MANUAL] Error attaching stream to element', e, [
          'RED5',
          'ERROR'
        ])
      }
    }
    // if (!useAutoplay) {
    //   try {
    //     element.play()
    //   } catch (e) {
    //     console.log('[R5-MANUAL] Error playing element', e)
    //   }
    // }
  }

  const elementPlaybackState = (element, available) => {
    if (available) {
      element.classList.remove('blurred-video')
    } else {
      element.classList.add('blurred-video')
    }
  }

  const trackKeyframeRecognition = (pc) => {
    bitrateInterval = setInterval(() => {
      if (!pc) {
        clearInterval(bitrateInterval)
      }
      pc.getStats(null).then(stats => {
        stats.forEach(stat => {
          if (stat.type === 'inbound-rtp' || stat.type === 'inboundrtp') {
            if (
              stat.mediaType === 'video' ||
              stat.kind === 'video'
             ) {
              console.log('[R5-MANUAL] KEYFRAME', stat.keyFramesDecoded)
              if (stat.keyFramesDecoded > 0) {
                clearInterval(bitrateInterval)
                const remoteVideo = document.getElementById('videoEl')
                // attachMediaStream(remoteVideo, mediaStream)
                console.log('[R5-MANUAL] KEYFRAME DETECTED', stat.keyFramesDecoded)
                try {
                  console.log('[R5-MANUAL] PLAYING ELEMENT')
                  remoteVideo.play()
                } catch (e) {
                  console.log('[R5-MANUAL] Error playing element', e)
                } finally {
                  elementPlaybackState(remoteVideo, true)
                }
              }
            }
          }
        })
      })
    }, 1000)
  }

  const configureKeyframeRecognition = () => {
    useKeyframeRecognition = keyframeRecognitionCheckbox.checked
    useAutoplay = autoplayRadio.find(radio => radio.checked).value === 'autoplay'
    const videoElement = document.getElementById('videoEl')
    if (useKeyframeRecognition) {
      if (useAutoplay) {
        videoElement.setAttribute('autoplay', true)
      } else {
        videoElement.removeAttribute('autoplay')
      }
    } else {
      videoElement.setAttribute('autoplay', true)
    }

    console.log('[R5-MANUAL] KEYFRAME RECOGNITION', useKeyframeRecognition)
    console.log('[R5-MANUAL] AUTO PLAY', useAutoplay)
    console.log('[R5-MANUAL] VIDEO ELEMENT', videoElement)
    console.log('[R5-MANUAL] VIDEO ELEMENT ATTRIBUTES', videoElement.attributes)
  }

  const setSubscribeButtonState = (isSubscribed, enabled = true) => {
    subscribeButton.innerHTML = isSubscribed ? 'Unsubscribe' : 'Subscribe'
    subscribeButton.disabled = !enabled
  }

  const getConfiguration = () => {
    const {
      host,
      app,
      stream1,
      streamManagerAPI,
      streamManagerNodeGroup: nodeGroup
    } = configuration

    const { protocol, port } = getSocketLocationFromProtocol()

    const region = getRegionIfDefined()
    const params = region
      ? {
          region,
          strict: true
        }
      : undefined

    const httpProtocol = protocol === 'ws' ? 'http' : 'https'
    const endpoint = `${httpProtocol}://${host}:${port}/as/${streamManagerAPI}/proxy/whep/${app}/${stream1}`

    var connectionParams = params
      ? { ...params, ...getAuthenticationParams().connectionParams }
      : getAuthenticationParams().connectionParams

    var rtcConfig = {
      ...configuration,
      ...defaultConfiguration,
      endpoint,
      streamName: stream1,
      subscriptionId: 'subscriber-' + instanceId,
      // Define mediaElementId to undefined to not attach the stream to a video element within the SDK logic.
      mediaElementId: undefined,
      connectionParams: {
        ...connectionParams,
        nodeGroup
      }
    }
    return rtcConfig
  }

  const startSubscriber = async () => {
    setSubscribeButtonState(true, false)
    configureKeyframeRecognition()
    try {
      const { WHEPClient } = red5prosdk
      const { stream1 } = configuration
      const config = getConfiguration()
      const subscriber = new WHEPClient()
      subscriber.on('*', onSubscriberEvent)
      await subscriber.init(config)
      await subscriber.subscribe()
      onSubscribeSuccess(subscriber)
      streamTitle.innerText = stream1
      targetSubscriber = subscriber
      setSubscribeButtonState(true)
    } catch (error) {
      var jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      console.error(
        '[Red5ProSubscriber] :: Error in access of Edge IP: ' + jsonError
      )
      updateStatusFromEvent({
        type: red5prosdk.SubscriberEventTypes.CONNECT_FAILURE
      })
      onSubscribeFail(jsonError)
      unsubscribe()
      setSubscribeButtonState(false, true)
    }
  }

  // Request to unsubscribe.
  const unsubscribe = async () => {
    try {
      var subscriber = targetSubscriber
      await subscriber.unsubscribe()
      onUnsubscribeSuccess()
    } catch (error) {
      var jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, 2, null)
      onUnsubscribeFail('Unmount Error ' + jsonError)
      throw error
    }
    targetSubscriber = undefined
    mediaStream = null
    useKeyframeRecognition = false
    useAutoplay = false
    bitrateInterval = 0
    clearInterval(bitrateInterval)
    setSubscribeButtonState(false, true)
  }

  // Clean up
  let shuttingDown = false
  const shutdown = async () => {
    if (shuttingDown) return
    shuttingDown = true
    try {
      await unsubscribe()
    } catch (e) {
      console.error(e)
    } finally {
      if (targetSubscriber) {
        targetSubscriber.off('*', onSubscriberEvent)
      }
      targetSubscriber = undefined
    }
    window.untrackBitrate()
    clearInterval(bitrateInterval)
  }
  window.addEventListener('pagehide', shutdown)
  window.addEventListener('beforeunload', shutdown)

  subscribeButton.addEventListener('click', () => {
    if (targetSubscriber) {
      unsubscribe()
    } else {
      startSubscriber()
    }
  })
  keyframeRecognitionCheckbox.addEventListener('change', () => {
    autoplayRadio.forEach(radio => {
      radio.disabled = !keyframeRecognitionCheckbox.checked
    })
  })

})(this, document, window.red5prosdk)
