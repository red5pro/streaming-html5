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

  let configuration = (function () {
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
  const bitrateField = document.getElementById('bitrate-field')
  const packetsField = document.getElementById('packets-field')
  const resolutionField = document.getElementById('resolution-field')

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

  streamTitle.innerText = configuration.stream1

  let defaultConfiguration = {
    streamMode: configuration.recordBroadcast ? 'record' : 'live'
  }

  const mediaConstraints = {
    audio: configuration.useAudio
      ? configuration.mediaConstraints.audio
      : false,
    video: configuration.useVideo ? configuration.mediaConstraints.video : false
  }

  const onPublisherEvent = event => {
    const { type } = event
    console.log('[Red5ProPublisher] ' + type + '.')
    updateStatusFromEvent(event)
  }
  const onPublishFail = message => {
    console.error('[Red5ProPublisher] Publish Error :: ' + message)
  }
  const onPublishSuccess = publisher => {
    console.log('[Red5ProPublisher] Publish Complete.')
    try {
      const pc = publisher.getPeerConnection()
      const stream = publisher.getMediaStream()
      window.trackBitrate(pc, onBitrateUpdate, onResolutionUpdate)
      statisticsField.classList.remove('hidden')
      stream.getVideoTracks().forEach(track => {
        var settings = track.getSettings()
        onResolutionUpdate(settings.width, settings.height)
      })
    } catch (e) {
      // no tracking for you!
    }
  }
  const onUnpublishFail = message => {
    console.error('[Red5ProPublisher] Unpublish Error :: ' + message)
  }
  const onUnpublishSuccess = () => {
    console.log('[Red5ProPublisher] Unpublish Complete.')
  }

  const getAuthenticationParams = () => {
    const auth = configuration.authentication
    return auth && auth.enabled
      ? {
          connectionParams: {
            username: auth.username,
            password: auth.password,
            token: auth.token
          }
        }
      : {}
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

  const startPublishSession = async mediaStream => {
    const { stream1: streamName } = configuration
    const { WHIPClient } = red5prosdk
    const {
      protocol,
      host,
      port,
      app,
      streamManagerAPI,
      streamManagerNodeGroup: nodeGroup,
    } = configuration
    const region = getRegionIfDefined()
    const params = region
    ? {
        region,
        strict: true,
      }
    : undefined
    const connectionParams = params
    ? { ...params, ...getAuthenticationParams().connectionParams }
    : getAuthenticationParams().connectionParams
    const endpoint = `${protocol}://${host}:${port}/as/${streamManagerAPI}/proxy/whip/${app}/${streamName}`
    const rtcConfig = {
      ...configuration,
      ...defaultConfiguration,
      endpoint,
      streamName,
      connectionParams: {
        ...connectionParams,
        nodeGroup,
      },
    }
    try {
      targetPublisher = new WHIPClient()
      await targetPublisher.initWithStream(rtcConfig, mediaStream)
      await targetPublisher.publish()
      onPublishSuccess(targetPublisher)
    } catch (error) {
      var jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      console.error(jsonError)
      onPublishFail(jsonError)
    }
  }

  const unpublish = async () => {
    try {
      if (targetPublisher) {
        targetPublisher.off('*', onPublisherEvent)
        await targetPublisher.unpublish()
        onUnpublishSuccess()
      }
    } catch (error) {
      var jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, 2, null)
      onUnpublishFail('Unmount Error ' + jsonError)
    } finally {
      targetPublisher = undefined
    }
  }

  const start = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia(
      mediaConstraints
    )
    try {
      const { loadRnnoise, RnnoiseWorkletNode } = window.noiseSuppressor
      console.log(':wrench: Setting up RNNoise processing...');

      const audioContext = new window.AudioContext({
          sampleRate: 48000
      });
      if (audioContext.state === 'suspended') {
          await audioContext.resume();
      }

      try {
          console.log(':wrench: Loading RNNoise WASM binary...');
          const rnnoiseWasmBinary = await loadRnnoise({
              url: 'rnnoise.wasm',
              simdUrl: 'rnnoise_simd.wasm'
          });

          await audioContext.audioWorklet.addModule('rnnoiseWorklet.js');

          console.log(':white_check_mark: RNNoise WASM binary loaded successfully');
          const rnnoiseWorklet = new RnnoiseWorkletNode(audioContext, {
              wasmBinary: rnnoiseWasmBinary,
              maxChannels: 2
          });

          console.log(':white_check_mark: RNNoise worklet node created');
          const source = audioContext.createMediaStreamSource(mediaStream);
          source.connect(rnnoiseWorklet);

          const destination = audioContext.createMediaStreamDestination();
          rnnoiseWorklet.connect(destination);

          const videoTracks = mediaStream.getVideoTracks();
          const processedAudioTracks = destination.stream.getAudioTracks();

          const outputStream = new MediaStream([
              ...videoTracks,
              ...processedAudioTracks
          ]);

          console.log(':white_check_mark: RNNoise processing pipeline setup complete');
          startPublishSession(outputStream);
          return
      } catch (error) {
          console.error(':x: Failed to initialize RNNoise:', error);
          console.error('Error details:', error.stack || error.message);
      }
    } catch (error) {
      console.error(':x: RNNoise processing failed:', error);
      console.error('Error details:', error.stack || error.message);
    }
    startPublishSession(mediaStream);
  }

  let shuttingDown = false
  const shutdown = async () => {
    if (shuttingDown) return
    shuttingDown = true
    window.untrackBitrate()
    await unpublish()
  }
  window.addEventListener('pagehide', shutdown)
  window.addEventListener('beforeunload', shutdown)

  let timeout = null
  // We need noiseSuppressor to be available before we can start the publish session
  if (window.noiseSuppressor) {
    if (timeout) clearInterval(timeout)
    console.log('NoiseSuppressor is available, starting publish session')
    start()
  } else {
    // Use a timeout to wait for the noiseSuppressor to be available
    timeout = setInterval(() => {
      if (window.noiseSuppressor) {
        if (timeout) clearInterval(timeout)
        console.log('NoiseSuppressor is available, starting publish session')
        start()
      }
    }, 1000)
  }
})(this, document, window.red5prosdk)
