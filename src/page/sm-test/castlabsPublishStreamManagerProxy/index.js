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

  const publishButton = document.querySelector('#publish-button')
  const openButton = document.querySelector('#open-button')

  const updateStatusFromEvent = window.red5proHandlePublisherEvent // defined in src/template/partial/status-field-publisher.hbs
  const streamTitle = document.getElementById('stream-title')
  const statisticsField = document.getElementById('statistics-field')
  const bitrateField = document.getElementById('bitrate-field')
  const packetsField = document.getElementById('packets-field')
  const resolutionField = document.getElementById('resolution-field')

  const getPortAndProtocol = (host) => {
    let ipReg = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
    let localhostReg = /^localhost.*/
    let isIPOrLocalhost = ipReg.exec(host) || localhostReg.exec(host)
    let port = isIPOrLocalhost ? 5080 : 443
    let protocol = isIPOrLocalhost ? 'ws' : 'wss'
    return { port, protocol }
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
  const onPublishSuccess = (publisher) => {
    console.log('[Red5ProPublisher] Publish Complete.')
    publishButton.classList.toggle('hidden')
    openButton.classList.toggle('hidden')
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
        audio: false,
        video: configuration.useVideo
          ? configuration.mediaConstraints.video
          : false,
      },
    }
  }

  const getValueFromId = (id) => {
    try {
      const el = document.querySelector(`#${id}`)
      return el ? el.value : undefined
    } catch (e) {
      console.error(e)
    }
    return undefined
  }

  const Uint8ArrayFromHex = (hex) => {
    if (!hex) return null
    if (hex.length % 2 !== 0) {
      console.error(`Malformed hex string (${hex}), odd length`)
      return null
    }
    return Uint8Array.from(
      hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
    )
  }

  const encryptWorker = new Worker('./encrypt-worker.js', {
    name: 'encrypt worker',
  })

  const initCrypto = async (videoCodec, aesMode, key, iv) => {
    encryptWorker.postMessage({
      operation: 'init',
      videoCodec,
      aesMode,
      key,
      iv,
    })
    const encryptInit = await Promise.race([
      new Promise((resolve) => {
        encryptWorker.onmessage = (event) => resolve(event.data === 'init-done')
      }),
      new Promise((resolve) => setTimeout(resolve, 15000, false)),
    ])
    return encryptInit
  }

  const setupSenderTransform = (sender) => {
    if (window.RTCRtpScriptTransform) {
      sender.transform = new window.RTCRtpScriptTransform(encryptWorker, {
        operation: `encrypt-${sender.track.kind}`,
      })
      return
    }
    const senderStreams = sender.createEncodedStreams()
    const { readable, writable } = senderStreams
    encryptWorker.postMessage(
      {
        operation: `encrypt-${sender.track.kind}`,
        readable,
        writable,
      },
      [readable, writable]
    )
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
      publishButton.disabled = false
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

  const getConfiguration = () => {
    const {
      host,
      app,
      stream1,
      streamManagerAPI,
      preferWhipWhep,
      streamManagerNodeGroup: nodeGroup,
    } = config
    const { protocol, port } = getPortAndProtocol(host)

    const region = getRegionIfDefined()
    const params = region
      ? {
          region,
          strict: true,
        }
      : undefined

    const httpProtocol = protocol === 'wss' ? 'https' : 'http'
    const endpoint = !preferWhipWhep
      ? `${protocol}://${host}:${port}/as/${streamManagerAPI}/proxy/ws/publish/${app}/${stream1}`
      : `${httpProtocol}://${host}:${port}/as/${streamManagerAPI}/proxy/whip/${app}/${stream1}`

    const connectionParams = params
      ? { ...params, ...getAuthenticationParams().connectionParams }
      : getAuthenticationParams().connectionParams

    const rtcConfig = {
      ...configuration,
      ...getUserMediaConfiguration(),
      endpoint,
      streamName: stream1,
      connectionParams: {
        ...connectionParams,
        nodeGroup,
      },
    }
    return rtcConfig
  }

  const start = async () => {
    publishButton.disabled = true
    const { preferWhipWhep } = configuration
    const { RTCPublisher, WHIPClient } = red5prosdk
    try {
      const rtcConfig = {
        ...getConfiguration(),
        rtcConfiguration: {
          iceServers: [{ urls: 'stun:stun2.l.google.com:19302' }],
          iceCandidatePoolSize: 2,
          bundlePolicy: 'max-bundle',
          encodedInsertableStreams: true,
          // audio jitter buffer settings are part of an origin trial, not sure if they make any
          // difference at all atm: https://bugs.chromium.org/p/chromium/issues/detail?id=904764
          // https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/modules/peerconnection/rtc_configuration.idl;l=51
          rtcAudioJitterBufferMaxPackets: 10,
          rtcAudioJitterBufferFastAccelerate: true,
        },
      }

      const encryption =
        getValueFromId('scheme-select').toUpperCase() === 'CTR'
          ? 'cenc'
          : 'cbcs'
      // const keyId = Uint8ArrayFromHex(getValueFromId('key-id-input'))
      const key = Uint8ArrayFromHex(getValueFromId('key-input'))
      const iv = Uint8ArrayFromHex(getValueFromId('iv-input'))
      await initCrypto('H264', encryption, key, iv)

      targetPublisher = preferWhipWhep ? new WHIPClient() : new RTCPublisher()
      targetPublisher.on('*', onPublisherEvent)
      await targetPublisher.init(rtcConfig)
      await targetPublisher.publish()

      const { streamName } = rtcConfig
      streamTitle.innerText = streamName

      const pc = targetPublisher.getPeerConnection()
      const transceivers = pc.getTransceivers()
      for (const tr of transceivers) {
        tr.direction = 'sendonly'
        setupSenderTransform(tr.sender)
      }
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
      publishButton.disabled = false
    }
  }

  publishButton.addEventListener('click', async () => {
    start()
  })

  openButton.addEventListener('click', () => {
    const publisherOptions = targetPublisher.getOptions()
    const { host, streamName } = publisherOptions
    window.open(
      `../castlabsStreamManagerProxy/index.html?host=${host}&streamName=${streamName}`,
      '_blank'
    )
  })

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
})(this, document, window.red5prosdk)
