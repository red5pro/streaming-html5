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
;(function (window, document, red5prosdk, ConferenceService) {
  'use strict'

  var isPublishing = false

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

  var configuration = (function () {
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

  const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const generateJoinToken = (length = 16) => {
    let result = ''
    const charactersLength = CHARS.length
    for (let i = 0; i < length; i++) {
      if (i === 4 || i === 8 || i === 12) {
        result += '-'
      }
      result += CHARS.charAt(Math.floor(Math.random() * charactersLength))
    }

    return result
  }

  red5prosdk.setLogLevel(
    configuration.verboseLogging
      ? red5prosdk.LOG_LEVELS.TRACE
      : red5prosdk.LOG_LEVELS.WARN
  )

  var updateStatusFromEvent = window.red5proHandlePublisherEvent // defined in src/template/partial/status-field-publisher.hbs

  const {
    location: { host, protocol },
  } = window
  let targetPublisher
  let publisherParticipant
  let mediaStream
  let mediaStreamConstraints
  let socketService
  const isSecure = protocol == 'https:'

  let tokenName = window.query('token') || generateJoinToken()
  let streamName =
    window.query('streamName') ||
    ['publisher', Math.floor(Math.random() * 0x10000).toString(16)].join('-')
  let socketEndpoint =
    window.query('socket') ||
    `${isSecure ? 'wss' : 'ws'}://${host}/conference-api/1.0/ws/conference`

  const tokenField = document.getElementById('token-field')
  // eslint-disable-next-line no-unused-vars
  const publisherMuteControls = document.getElementById(
    'publisher-mute-controls'
  )
  const publisherSession = document.getElementById('publisher-session')
  const publisherNameField = document.getElementById('publisher-name-field')
  const streamNameField = document.getElementById('streamname-field')
  const publisherVideo = document.getElementById('red5pro-publisher')
  const joinButton = document.getElementById('join-button')
  const statisticsField = document.getElementById('statistics-field')
  const bitrateField = document.getElementById('bitrate-field')
  const packetsField = document.getElementById('packets-field')
  const resolutionField = document.getElementById('resolution-field')
  const subscribersEl = document.getElementById('subscribers')
  const videoOnButton = document.getElementById('video-on-button')
  const videoOffButton = document.getElementById('video-off-button')
  const audioOnButton = document.getElementById('audio-on-button')
  const audioOffButton = document.getElementById('audio-off-button')

  let bitrateTrackingTicket
  let bitrate = 0
  let packetsSent = 0
  let frameWidth = 0
  let frameHeight = 0

  let streamsList = []
  let initMuteState = { audioMuted: false, videoMuted: false }

  tokenField.value = tokenName
  streamNameField.value = streamName

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

  const getSocketLocationFromProtocol = () => {
    return !isSecure
      ? { protocol: 'ws', port: serverSettings.wsport }
      : { protocol: 'wss', port: serverSettings.wssport }
  }

  const getAuthenticationParams = () => {
    var auth = configuration.authentication
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

  const saveSettings = () => {
    streamName = streamNameField.value
    tokenName = tokenField.value
  }

  const findSender = (track) => {
    const pc = targetPublisher.getPeerConnection()
    const senders = pc.getSenders()
    return senders.find((s) => s.track.kind === track.kind)
  }

  const updateMutedAudioOnPublisher = (returnFromMute) => {
    if (targetPublisher && isPublishing) {
      const sender = findSender(mediaStream.getAudioTracks()[0])
      let params = sender.getParameters()
      if (returnFromMute) {
        try {
          targetPublisher.unmuteAudio()
          params.encodings[0].active = true
          sender.setParameters(params)
        } catch (e) {
          // no browser support, let's use mute API.
          targetPublisher.unmuteAudio()
        }
      } else {
        try {
          targetPublisher.muteAudio()
          params.encodings[0].active = false
          sender.setParameters(params)
        } catch (e) {
          // no browser support, let's use mute API.
          targetPublisher.muteAudio()
        }
      }
    } else {
      initMuteState = { ...initMuteState, audioMuted: !returnFromMute }
      updateMuteState(initMuteState)
    }
    mediaStream.getAudioTracks()[0].enabled = returnFromMute
  }

  const updateMutedVideoOnPublisher = (returnFromMute) => {
    if (targetPublisher && isPublishing) {
      const sender = findSender(mediaStream.getVideoTracks()[0])
      let params = sender.getParameters()
      if (returnFromMute) {
        try {
          targetPublisher.unmuteVideo()
          params.encodings[0].active = true
          sender.setParameters(params)
        } catch (e) {
          // no browser support, let's use mute API.
          targetPublisher.unmuteVideo()
        }
      } else {
        try {
          targetPublisher.muteVideo()
          params.encodings[0].active = false
          sender.setParameters(params)
        } catch (e) {
          // no browser support, let's use mute API.
          targetPublisher.muteVideo()
        }
      }
    } else {
      initMuteState = { ...initMuteState, videoMuted: !returnFromMute }
      updateMuteState(initMuteState)
    }
    mediaStream.getVideoTracks()[0].enabled = returnFromMute
  }

  const updateMuteState = (muteState) => {
    const { audioMuted, videoMuted } = muteState
    if (audioMuted) {
      audioOnButton.classList.add('hidden')
      audioOffButton.classList.remove('hidden')
    } else {
      audioOnButton.classList.remove('hidden')
      audioOffButton.classList.add('hidden')
    }
    if (videoMuted) {
      videoOnButton.classList.add('hidden')
      videoOffButton.classList.remove('hidden')
    } else {
      videoOnButton.classList.remove('hidden')
      videoOffButton.classList.add('hidden')
    }
    videoMuted && showVideoPoster()
    !videoMuted && hideVideoPoster()
  }

  const showVideoPoster = () => {
    publisherVideo.classList.add('hidden')
  }

  const hideVideoPoster = () => {
    publisherVideo.classList.remove('hidden')
  }

  const onPublisherEvent = (event) => {
    const { type } = event
    console.log('[Red5ProPublisher] ' + type + '.')
    if (type === 'WebSocket.Message.Unhandled') {
      console.log(event)
    } else if (type === 'Publish.Start') {
      const { streamName, app } = targetPublisher.getOptions()
      establishSocketHost(streamName, tokenField.value, `${app}/${streamName}`)
      publisherMuteControls.classList.remove('hidden')
    } else if (type === 'MessageTransport.Change') {
      // Once messaging is available, notify Conference API of mute state.
      updateMutedVideoOnPublisher(!initMuteState.videoMuted)
      updateMutedAudioOnPublisher(!initMuteState.audioMuted)
    }
    updateStatusFromEvent(event)
  }

  const onPublishFail = (message) => {
    isPublishing = false
    console.error('[Red5ProPublisher] Publish Error :: ' + message)
  }

  const onPublishSuccess = (publisher) => {
    isPublishing = true
    window.red5propublisher = publisher
    console.log('[Red5ProPublisher] Publish Complete.')
    // [NOTE] Moving WebSocket setup until Package Sent amount is sufficient.
    try {
      var pc = publisher.getPeerConnection()
      var stream = publisher.getMediaStream()
      bitrateTrackingTicket = window.trackBitrate(
        pc,
        onBitrateUpdate,
        null,
        null,
        true
      )
      statisticsField.classList.remove('hidden')
      stream.getVideoTracks().forEach(function (track) {
        var settings = track.getSettings()
        onResolutionUpdate(settings.width, settings.height)
      })
    } catch (e) {
      // no tracking for you!
    }
  }

  const onUnpublishFail = (message) => {
    isPublishing = false
    console.error('[Red5ProPublisher] Unpublish Error :: ' + message)
  }

  const onUnpublishSuccess = () => {
    isPublishing = false
    console.log('[Red5ProPublisher] Unpublish Complete.')
  }

  const onConferenceSuccess = (participant) => {
    publisherParticipant = participant
  }

  const onConferenceClose = () => {
    console.log('[Red5ProPublisher] Conference closed.')
  }

  const onConferenceError = (error) => {
    console.error('[Red5ProPublisher] Conference error.', error)
  }

  const setPublishingUI = (streamName) => {
    publisherNameField.innerText = streamName
    tokenField.setAttribute('disabled', true)
    publisherSession.classList.remove('hidden')
    publisherNameField.classList.remove('hidden')
    Array.prototype.forEach.call(
      document.getElementsByClassName('remove-on-broadcast'),
      function (el) {
        el.classList.add('hidden')
      }
    )
  }

  const establishSocketHost = (name, token, streamGuid) => {
    if (socketService) return

    socketService = new ConferenceService(socketEndpoint, {
      onConferenceSuccess,
      onConferenceClose,
      onConferenceError,
      onConferenceParticipantsUpdate: (participants) => {
        processStreams(participants, streamsList, publisherParticipant)
      },
    })
    socketService.join(name, token, streamGuid)
  }

  const determinePublisher = async (mediaStream, name, bitrate = 256) => {
    const { app, preferWhipWhep } = configuration
    const { WHIPClient, RTCPublisher } = red5prosdk
    let config = Object.assign(
      {},
      configuration,
      {
        streamMode: configuration.recordBroadcast ? 'record' : 'live',
      },
      getAuthenticationParams()
    )

    let rtcConfig = Object.assign({}, config, {
      protocol: getSocketLocationFromProtocol().protocol,
      port: getSocketLocationFromProtocol().port,
      bandwidth: {
        video: bitrate,
      },
      app: app,
      streamName: name,
    })

    console.log('PUBLISH', name, rtcConfig)
    var publisher = preferWhipWhep ? new WHIPClient() : new RTCPublisher()
    return await publisher.initWithStream(rtcConfig, mediaStream)
  }

  const doPublish = async (stream, room, name) => {
    try {
      targetPublisher = await determinePublisher(stream, name, bitrate)
      targetPublisher.on('*', onPublisherEvent)
      await targetPublisher.publish()
      onPublishSuccess(targetPublisher)
      setPublishingUI(name)
    } catch (error) {
      var jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      console.error('[Red5ProPublisher] :: Error in publishing - ' + jsonError)
      console.error(error)
      onPublishFail(jsonError)
    }
  }

  const unpublish = () => {
    if (socketService !== undefined) {
      socketService.close()
    }
    return new Promise(function (resolve, reject) {
      var publisher = targetPublisher
      publisher
        .unpublish()
        .then(function () {
          onUnpublishSuccess()
          resolve()
        })
        .catch(function (error) {
          var jsonError =
            typeof error === 'string' ? error : JSON.stringify(error, 2, null)
          onUnpublishFail('Unmount Error ' + jsonError)
          reject(error)
        })
    })
  }

  const startPreview = async () => {
    const element = document.querySelector('#red5pro-publisher')
    const constraints = {
      audio: true,
      video: {
        width: {
          exact: 640,
        },
        height: {
          exact: 480,
        },
        frameRate: {
          min: 15,
        },
      },
    }
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
      mediaStreamConstraints = constraints
      element.srcObject = mediaStream
      window.allowMediaStreamSwap(
        element,
        constraints,
        mediaStream,
        (activeStream, activeConstraints) => {
          mediaStream = activeStream
          mediaStreamConstraints = activeConstraints
          console.log(mediaStream, mediaStreamConstraints)
          // If we have a broadcast going, just swap tracks live.
          if (targetPublisher && targetPublisher.getPeerConnection()) {
            const connection = targetPublisher.getPeerConnection()
            const senders = connection.getSenders()
            const videoTrack = mediaStream.getVideoTracks()[0]
            const audioTrack = mediaStream.getAudioTracks()[0]
            if (videoTrack) {
              const video = senders.find(
                (s) => s.track.kind === videoTrack.kind
              )
              video.replaceTrack(videoTrack)
            }
            if (audioTrack) {
              const audio = senders.find(
                (s) => s.track.kind === audioTrack.kind
              )
              audio.replaceTrack(audioTrack)
            }
          }
        }
      )
    } catch (e) {
      console.error(e)
    }
  }

  function processStreams(list, previousList, publisherParticipant) {
    const currentParticipant = list.find(
      (participant) =>
        participant.participantId === publisherParticipant.participantId
    )
    const nonPublishers = list.filter((participant) => {
      return participant.participantId !== currentParticipant.participantId
    })
    const toAdd = nonPublishers.filter((participant) => {
      return (
        previousList.find(
          (p) => p.participantId === participant.participantId
        ) === undefined
      )
    })
    const toRemove = previousList.filter((participant) => {
      return (
        list.find((p) => p.participantId === participant.participantId) ===
        undefined
      )
    })
    window.ConferenceSubscriberUtil.removeAll(toRemove)
    streamsList = list

    const subscribers = toAdd.map((participant, index) => {
      return new window.ConferenceSubscriberItem(
        participant,
        subscribersEl,
        index,
        () => {}
      )
    })

    // Below is a linked list to subscriber sequentially.
    /*
    var i, length = subscribers.length - 1;
    var sub;
    for(i = 0; i < length; i++) {
      sub = subscribers[i];
      sub.next = subscribers[sub.index+1];
    }
    */
    if (subscribers.length > 0) {
      const { app, preferWhipWhep } = configuration
      var baseSubscriberConfig = Object.assign(
        {},
        configuration,
        {
          protocol: getSocketLocationFromProtocol().protocol,
          port: getSocketLocationFromProtocol().port,
          app,
        },
        getAuthenticationParams()
      )
      subscribers.forEach((s) =>
        s.execute(baseSubscriberConfig, preferWhipWhep)
      )
      // Below is to be used if using sequential subsciber logic explained above.
      //      subscribers[0].execute(baseSubscriberConfig);
    }
    list.forEach((participant) =>
      window.ConferenceSubscriberUtil.updateMuteState(participant)
    )
    updateMuteState(currentParticipant.muteState)
  }

  joinButton.addEventListener('click', () => {
    saveSettings()
    doPublish(mediaStream, tokenName, streamName)
    setPublishingUI(streamName)
  })

  let shuttingDown = false
  const shutdown = async () => {
    if (shuttingDown) return
    shuttingDown = true
    function clearRefs() {
      if (targetPublisher) {
        targetPublisher.off('*', onPublisherEvent)
      }
      targetPublisher = undefined
    }
    try {
      await unpublish()
    } catch (e) {
      console.error(e)
    } finally {
      clearRefs()
    }
    window.untrackBitrate(bitrateTrackingTicket)
  }

  window.addEventListener('beforeunload', shutdown)
  window.addEventListener('pagehide', shutdown)

  videoOnButton.addEventListener('click', () => {
    updateMutedVideoOnPublisher(false)
  })
  videoOffButton.addEventListener('click', () => {
    updateMutedVideoOnPublisher(true)
  })
  audioOnButton.addEventListener('click', () => {
    updateMutedAudioOnPublisher(false)
  })
  audioOffButton.addEventListener('click', () => {
    updateMutedAudioOnPublisher(true)
  })
  videoOnButton.classList.remove('hidden')
  audioOnButton.classList.remove('hidden')

  startPreview()
})(this, document, window.red5prosdk, window.ConferenceService)
