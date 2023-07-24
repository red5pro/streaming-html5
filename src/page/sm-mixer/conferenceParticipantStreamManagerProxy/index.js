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
;(function (window, document, red5prosdk) {
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

  const getRoomName = (app) => {
    const splits = app.split('/')
    if (splits.length > 1) {
      splits.splice(0, 1)
      return splits.join('/')
    }

    return app
  }

  red5prosdk.setLogLevel('debug')

  // const whipwhep = window.query('whipwhep') || 'true'
  // const preferWhipWhep = !whipwhep ? false : !(whipwhep && whipwhep === 'false')
  // [2023-06-02] NOTE: Conference Participants and Compositors currently do not support WHIP/WHEP.
  const preferWhipWhep = false

  const websocketEndpoint = configuration.mixerBackendSocketField
  const appContext = configuration.app
  const roomName = getRoomName(appContext)
  const useABR = false
  let explicitSocketClose = false

  const streamName = configuration.stream1
  const streamMode = configuration.streamMode

  // @see publisher-status.js
  const updateStatusFromEvent = window.red5proHandlePublisherEvent

  // Stats UI
  const statisticsField = document.querySelector('#statistics-field')
  const bitrateField = document.querySelector('#bitrate-field')
  const resolutionField = document.querySelector('#resolution-field')
  const errorInfo = document.querySelector('.publisher-error')

  const isAuthEnabled = configuration.mixerAuthenticationEnabled
  var authenticationForm = document.getElementById('login-form')
  var usernameField = document.getElementById('username-field')
  var passwordField = document.getElementById('password-field')
  var tokenField = document.getElementById('token-field')
  var submitButton = document.getElementById('submit-button')
  if (isAuthEnabled) {
    authenticationForm.classList.remove('hidden')
  }

  // Round Trip Authentication
  let username
  let password
  let token

  submitButton.addEventListener('click', () => {
    if (isAuthEnabled) {
      username = usernameField.value
      password = passwordField.value
      token = tokenField.value

      rtcConfig.connectionParams = {
        ...rtcConfig.connectionParams,
        username,
        password,
        token,
      }

      publisherConfig.connectionParams = {
        ...publisherConfig.connectionParams,
        username,
        password,
        token,
      }

      participantConfig.connectionParams = {
        ...participantConfig.connectionParams,
        username,
        password,
        token,
      }
    }

    console.log('participantConfig', appContext, participantConfig)

    const loginForm = document.getElementById('login-form')
    if (loginForm) {
      loginForm.classList.add('hidden')
    }
  })

  // Publisher UI
  const publisherSettingsSetup = document.querySelector(
    '#publisher-settings-setup'
  )
  const publisherSettingsActive = document.querySelector(
    '#publisher-settings-active'
  )
  const audioCheck = publisherSettingsActive.querySelector('#audio-checkbox')
  const videoCheck = publisherSettingsActive.querySelector('#video-checkbox')
  const screenshareButton = publisherSettingsActive.querySelector(
    '#screenshare-button'
  )

  const conferenceSubscriber = document.querySelector(
    '#red5pro-subscriber-composition'
  )

  const screenshareId = 'screenshare-publisher'
  let screenshare
  let publisher
  let participant

  const getConferenceRoomContext = () => {
    return `${appContext}`
  }

  const getWaitingRoomContext = () => {
    return `${appContext}_wr`
  }

  function getUserMediaConfiguration() {
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

  var protocol = serverSettings.protocol
  var isSecure = protocol === 'https'
  function getSocketLocationFromProtocol() {
    return !isSecure
      ? { protocol: 'ws', port: serverSettings.wsport }
      : { protocol: 'wss', port: serverSettings.wssport }
  }

  var defaultConfiguration = {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port,
    streamMode: configuration.recordBroadcast ? 'record' : 'live',
  }

  var config = Object.assign(
    {},
    configuration,
    defaultConfiguration,
    getUserMediaConfiguration()
  )

  var rtcConfig = Object.assign({}, config, {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port,
    streamName: configuration.stream1,
    app: preferWhipWhep ? getWaitingRoomContext() : configuration.proxy,
    connectionParams: {
      host: configuration.host,
      app: getWaitingRoomContext(),
    },
  })

  const publisherConfig = {
    ...rtcConfig,
    mediaElementId: 'red5pro-publisher',
    streamMode: streamMode,
  }

  const screenshareConfig = {
    ...publisherConfig,
    ...{
      mediaElementId: screenshareId,
      streamName: `${streamName}_screenshare`,
    },
  }

  let participantConfig = {
    ...rtcConfig,
    ...{
      groupName: roomName,
      streamName: streamName,
      mediaElementId: 'red5pro-participant',
      cleanMediaOnUnpublish: true,
      app: preferWhipWhep ? getConferenceRoomContext() : configuration.proxy,
      connectionParams: {
        app: getConferenceRoomContext(),
      },
    },
  }

  let provision = {
    guid: undefined,
    context: undefined,
    name: undefined,
    level: 0,
    isRestricted: false,
    parameters: {
      group: 'webrtc',
      audiotracks: 3,
      videotracks: 1,
    },
    restrictions: [],
    primaries: [],
    secondaries: [],
  }

  // Update provision for conference.
  let confProvision = {
    ...provision,
    ...{
      guid: configuration.app,
      context: configuration.app,
      name: roomName,
    },
  }

  console.log(defaultConfiguration)

  const enableStartBroadcast = () => {
    setActiveLayout(false)
  }

  const enableStopBroadcast = () => {
    setActiveLayout(true)
  }

  /**
   * Notification to allow screenshare capabilities for current user. Only one screenshare for room.
   *
   * @param {String} screenshareName
   *        The name of the screenshare stream.
   */
  const onScreenshareAbility = (screenshareName) => {
    // If not provided. Screenshare is allowed.
    if (!screenshareName) {
      screenshareButton.disabled = false
    } else {
      // Else, check to see if it is the name of the screenshare stream we would use.
      // If it is, then we can stop the screenshare.
      // If it is not, then we cannot start a screenshare until it is done.
      screenshareButton.disabled =
        screenshareName !== screenshareConfig.streamName
    }
  }

  /**
   * Sets the UI to allow for screenshare ability.
   *
   * @see mock-fetch.js
   */
  const enableStartScreenshare = () => {
    if (window.r5_addScreenshareListener) {
      window.r5_addScreenshareListener(onScreenshareAbility)
    }
    const element = document.querySelector(`#${screenshareId}`)
    screenshareButton.innerText = 'Start Screenshare'
    document.querySelector('#red5pro-publisher').classList.remove('pip')
    element.classList.add('hidden')
  }

  /**
   * Sets the UI to allow for stopping screenshare.
   *
   * @see mock-fetch.js
   */
  const enableStopScreenshare = () => {
    if (window.r5_removeScreenshareListener) {
      window.r5_removeScreenshareListener(onScreenshareAbility)
    }
    const element = document.querySelector(`#${screenshareId}`)
    screenshareButton.innerText = 'Stop Screenshare'
    document.querySelector('#red5pro-publisher').classList.add('pip')
    element.classList.remove('hidden')
  }

  const setActiveLayout = (flag) => {
    if (flag) {
      publisherSettingsActive.classList.remove('hidden')
      publisherSettingsSetup.classList.add('hidden')
    } else {
      publisherSettingsActive.classList.add('hidden')
      publisherSettingsSetup.classList.remove('hidden')
    }
  }

  // Error Display
  const displayError = (message) => {
    errorInfo.innerText = `Error: ${message}`
    errorInfo.classList.remove('hidden')
  }

  // Bitrate Display
  let bitrate = 0
  let frameWidth = 0
  let frameHeight = 0

  const updateStatistics = (b, w, h) => {
    statisticsField.classList.remove('hidden')
    bitrateField.innerText = b === 0 ? 'N/A' : Math.floor(b)
    resolutionField.innerText = (w || 0) + 'x' + (h || 0)
  }

  const onBitrateUpdate = (b) => {
    bitrate = b
    updateStatistics(bitrate, frameWidth, frameHeight)
  }

  const onResolutionUpdate = (w, h) => {
    frameWidth = w
    frameHeight = h
    updateStatistics(bitrate, frameWidth, frameHeight)
  }

  // Event Handler to toggle sending audio on publisher stream.
  audioCheck.addEventListener('change', () => {
    if (publisher) {
      if (audioCheck.checked) {
        publisher.unmuteAudio()
      } else {
        publisher.muteAudio()
      }
    }
  })

  // Event Handler to toggle sending video on publisher stream.
  videoCheck.addEventListener('change', () => {
    if (publisher) {
      if (videoCheck.checked) {
        publisher.unmuteVideo()
      } else {
        publisher.muteVideo()
      }
    }
  })

  // Event Handler to turn on or off the screenshare stream.
  screenshareButton.addEventListener('click', () => {
    if (screenshareButton.innerText.match(/Stop/)) {
      stopScreenshare()
    } else {
      startScreenshare()
    }
  })

  const hasGroupStream = (streams) => {
    var i = streams ? streams.length : 0
    console.log(streams)
    while (--i > -1) {
      if (streams[i].stream === roomName) {
        return true
      }
    }
    return false
  }

  const showGroupStream = () => {
    // TODO: This is when we start the subscription.
    console.log('Show group stream')
  }
  const removeGroupStream = () => {
    // TODO: This is when we remove/stop the subscription.
  }

  /**
   * Event listener for Publisher Events.
   *
   * @param {PublisherEvent} event
   */
  const onPublisherEvent = (event) => {
    console.log(`[Publisher:Event]:: ${event.type}`)
    if (
      event.type === 'Connect.Failure' ||
      event.type === 'Publish.Fail' ||
      event.type === 'Publish.InvalidName'
    ) {
      displayError(event.type)
      console.error(event.type)
    } else if (event.type === 'Publisher.VideoDimensions.Change') {
      const {
        data: { width, height },
      } = event
      onResolutionUpdate(width, height)
    } else if (event.type === 'Publish.Start') {
      const { app, streamName } = publisherConfig
      if (window.r5_postStreamToMockSocket) {
        window.r5_postStreamToMockSocket(app, streamName)
      }
    }
    updateStatusFromEvent(
      event,
      document.getElementById('publisher-status-field')
    )
  }

  const onParticipantEvent = (event) => {
    console.log(`[Participant:Event]:: ${event.type}`)
    if (event.type === 'Conference.MediaStream') {
      console.log('Conference.MediaStream event')
      const {
        data: { stream },
      } = event
      // TODO: Add conference video.
      let media = conferenceSubscriber.srcObject
      if (media) {
        media.getTracks().forEach((t) => t.stop())
      }
      console.log('Set stream', stream)
      conferenceSubscriber.srcObject = stream
    } else if (
      event.type === 'WebRTC.Socket.Message' ||
      event.type === 'WebRTC.DataChannel.Message'
    ) {
      try {
        var data = JSON.parse(event.data.message.data)
        if (hasGroupStream(data.streams || data.data.streams)) {
          showGroupStream()
        } else {
          removeGroupStream()
        }
      } catch (e) {
        console.warn(e)
      }
    }
  }

  /**
   * Event Listener for Publisher of Screenshare stream
   *
   * @param {PublisherEvent} event
   */
  const onScreenshareEvent = (event) => {
    console.log(`[Screenshare:Event]:: ${event.type}`)
    const { streamName } = screenshareConfig
    if (event.type === 'Publish.Start') {
      if (window.r5_postStreamToMockSocket) {
        window.r5_postStreamToMockSocket(screenshareConfig.app, streamName)
      }
    }
  }

  /**
   * Request to begin a publishing session.
   *
   * @param {MediaStream} stream
   *        The already generated MediaStream being shown in preview.
   * @param {Object} selectedVariant
   *        Optional variant setting to use if in Transcode/ABR.
   */
  const startPublishing = async (stream, selectedVariant = undefined) => {
    try {
      errorInfo.classList.add('hidden')
      // If using Transcode/ABR, set config based on selected variant.
      if (selectedVariant) {
        console.log(
          `Updating configuration for variant: ${JSON.stringify(
            selectedVariant,
            null,
            2
          )}`
        )
        publisherConfig.bandwidth = {
          audio: 54,
          video: selectedVariant.bandwidth / 1000,
        }
        publisherConfig.streamName = selectedVariant.name
      }

      if (!publisher) {
        publisher = await setUpPublisher(stream)
      }
      await publisher.publish()
      enableStopBroadcast()

      const pc = publisher.getPeerConnection()
      const mediaStream = publisher.getMediaStream()
      window.trackBitrate(pc, onBitrateUpdate, onResolutionUpdate)

      mediaStream.getVideoTracks().forEach((track) => {
        const settings = track.getSettings()
        onResolutionUpdate(settings.width, settings.height)
      })
    } catch (e) {
      const message = e.hasOwnProperty('message') ? e.message : e
      displayError(message)
      console.error(e)
      enableStartBroadcast()
    }
  }

  /**
   * Request to stop the current Publisher session.
   */
  // eslint-disable-next-line no-unused-vars
  const stopPublishing = async () => {
    try {
      if (publisher) {
        await publisher.unpublish()
        publisher.off('*', onPublisherEvent)
        publisher = undefined
        const { app, streamName } = publisherConfig
        if (window.r5_deleteStreamFromMockSocket) {
          window.r5_deleteStreamFromMockSocket(app, streamName)
        }
        return true
      }
    } catch (e) {
      publisher = undefined
      throw e
    }
  }

  /**
   * Sets up the Publisher with configuration and optional Stream Manager integration.
   *
   * @param {MediaStream} stream
   *        The previously generated MediaStream used in preview.
   */
  const setUpPublisher = async (stream) => {
    const { WHIPClient, RTCPublisher } = red5prosdk
    try {
      const scope = getWaitingRoomContext() // publisherConfig.app
      const publisherSM = await window.streamManagerUtil.getOrigin(
        publisherConfig.host,
        scope,
        publisherConfig.streamName,
        useABR
      )
      const { serverAddress } = publisherSM
      publisherConfig.connectionParams = {
        ...publisherConfig.connectionParams,
        ...{
          host: serverAddress,
        },
      }

      if (preferWhipWhep) {
        const { connectionParams: token } = publisherConfig
        if (token) {
          publisherConfig.connectionParams.token = encodeURIComponent(token)
        }
        delete publisherConfig.connectionParams.host
        delete publisherConfig.connectionParams.app
        publisherConfig.connectionParams.app = scope
        publisherConfig.connectionParams.transcode = useABR
      }

      const pub = preferWhipWhep ? new WHIPClient() : new RTCPublisher()
      console.log(
        `Starting RTCPublisher with configuration: ${JSON.stringify(
          publisherConfig,
          null,
          2
        )}`
      )
      if (stream) {
        publisher = await pub.initWithStream(publisherConfig, stream)
      } else {
        publisher = await pub.init(publisherConfig)
      }
      publisher.on('*', onPublisherEvent)
      // enableStartScreenshare()

      return publisher
    } catch (e) {
      displayError(e.message)
      throw e
    }
  }

  let retry
  let hasStopped = false
  const startParticipant = async (stream) => {
    try {
      if (!participant) {
        participant = await setUpParticipant(stream)
      }
      await participant.publish()
    } catch (e) {
      displayError(e.message)
      stopParticipating()
      if (!hasStopped) {
        console.log(
          'May have attempted to start a participant too soon. Will try again in 2 seconds...'
        )
        retry = setTimeout(() => {
          clearTimeout(retry)
          if (!hasStopped) {
            console.log('Retry starting participant...')
            startParticipant(stream)
          }
        }, 2000)
      }
      throw e
    }
  }

  const stopParticipating = async () => {
    try {
      if (participant) {
        let stream = participant.getMediaStream()
        stream.getTracks().forEach((t) => t.stop())
        await participant.unpublish()
        participant.off('*', onParticipantEvent)
        participant = undefined
        const { app, streamName } = publisherConfig
        // TODO: Need to work this part out regarding stream name...
        if (window.r5_deleteStreamFromMockSocket) {
          window.r5_deleteStreamFromMockSocket(app, streamName)
        }
        return true
      }
    } catch (e) {
      console.error(e)
      throw e
    } finally {
      participant = undefined
    }
  }

  const setUpParticipant = async (stream) => {
    try {
      document.getElementById('subscriber-status-field').classList.add('hidden')

      console.log('participantConfig', participantConfig)
      const scope = getConferenceRoomContext()
      const participantSM =
        await window.streamManagerUtil.getOriginForConference(
          configuration.host,
          scope
        )
      const { serverAddress } = participantSM

      participantConfig.connectionParams = {
        ...participantConfig.connectionParams,
        ...{
          host: serverAddress,
        },
      }

      console.log('participantConfig', participantConfig)

      await window.streamManagerUtil.postProvision(
        participantConfig.host,
        confProvision,
        configuration.streamManagerAccessToken
      )

      const pub = new red5prosdk.RTCConferenceParticipant()
      console.log(
        `Starting RTCConferenceParticipant publisher with configuration: ${JSON.stringify(
          participantConfig,
          null,
          2
        )}`
      )
      if (stream) {
        participant = await pub.initWithStream(participantConfig, stream)
      } else {
        participant = await pub.init(participantConfig)
      }
      participant.on('*', onParticipantEvent)

      return participant
    } catch (e) {
      displayError(e.message)
      throw e
    }
  }

  /**
   * Request to start a Publisher Screenshare session.
   */
  const startScreenshare = async () => {
    try {
      enableStopScreenshare()
      if (!screenshare) {
        screenshare = await setUpScreenshare()
      }
      await screenshare.publish()
    } catch (e) {
      displayError(e.hasOwnProperty('message') ? e.message : e)
      console.error(e)
      enableStartScreenshare()
    }
  }

  /**
   * Request to stop a Publisher Screenshare session.
   */
  // eslint-disable-next-line no-unused-vars
  const stopScreenshare = async () => {
    try {
      if (screenshare) {
        console.log(JSON.stringify(screenshare.getOptions(), null, 2))
        await screenshare.unpublish()
        screenshare.off('*', onScreenshareEvent)
        screenshare = undefined
        const { app, streamName } = screenshareConfig
        if (window.r5_deleteStreamFromMockSocket) {
          window.r5_deleteStreamFromMockSocket(app, streamName)
        }
        return true
      }
    } catch (e) {
      screenshare = undefined
      throw e
    } finally {
      enableStartScreenshare()
    }
  }

  /**
   * Sets up the Publisher Screenshare with configuration and optional Stream Manager integration.
   */
  const setUpScreenshare = async () => {
    const { WHIPClient, RTCPublisher } = red5prosdk
    try {
      const scope = screenshareConfig.app
      const screenshareSM = await window.streamManagerUtil.getOrigin(
        screenshareConfig.host,
        scope,
        screenshareConfig.streamName
      )
      const { serverAddress } = screenshareSM
      screenshareConfig.connectionParams = {
        ...screenshareConfig.connectionParams,
        ...{
          host: serverAddress,
          app: scope,
        },
      }

      if (preferWhipWhep) {
        const { connectionParams: token } = screenshareConfig
        if (token) {
          screenshareConfig.connectionParams.token = encodeURIComponent(token)
        }
        delete screenshareConfig.connectionParams.host
        delete screenshareConfig.connectionParams.app
        screenshareConfig.connectionParams.app = scope
      }

      // TODO: Is this resolution and framerate too high?
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        width: 1280,
        height: 720,
        frameRate: 30,
      })

      // When user click `Stop Sharing` from browser
      mediaStream.getVideoTracks()[0].onended = stopScreenshare

      const ss = preferWhipWhep ? new WHIPClient() : new RTCPublisher()
      await ss.initWithStream(screenshareConfig, mediaStream)
      ss.on('*', onScreenshareEvent)
      return ss
    } catch (e) {
      displayError(e.message)
      throw e
    }
  }

  /**
   * Request to shutdown all Publisher streams.
   */
  const shutdown = () => {
    try {
      hasStopped = true
      explicitSocketClose = true
      stopScreenshare()
      stopPublishing()
      stopParticipating()
      websocket.close()
      clearTimeout(retry)
    } catch (e) {
      console.error(e)
    }
  }

  // Main
  // Client Delegate for PublisherSettings.
  // @see publisher-settings.js
  const client = {
    mediaStream: undefined,
    onMediaStream: (stream) => {
      this.mediaStream = stream
      document.querySelector('#red5pro-publisher').srcObject = stream
    },
    onProvisionSubmit: async (provision) => {
      try {
        const { app, host, streamName } = publisherConfig
        await window.streamManagerUtil.postTranscode(
          host,
          app,
          streamName,
          provision,
          configuration.streamManagerAccessToken
        )
      } catch (e) {
        throw e
      }
    },
    onStartBroadcast: async (selectedVariant = undefined) => {
      try {
        await startPublishing(this.mediaStream, selectedVariant)
      } catch (e) {
        throw e
      }
    },
  }
  enableStartBroadcast()
  new PublisherSettings(publisherSettingsSetup, streamName, client, useABR)

  // Socket
  //const websocketEndpoint = window.getParamByName('ws') || 'localhost:8001'mixerBackendSocketField
  let websocket
  let ipReg = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
  let localhostReg = /^localhost.*/
  const isIPOrLocalhost =
    ipReg.exec(websocketEndpoint) || localhostReg.exec(websocketEndpoint)
  let wsProtocol = isIPOrLocalhost ? 'ws' : 'wss'
  const socketUrl = `${wsProtocol}://${websocketEndpoint}?testbed=conference&room=${getConferenceRoomContext()}&host=true`

  const setUpStreamListSocket = (url) => {
    websocket = new WebSocket(url)
    websocket.onopen = () => {
      console.log(`[websocket]::onopen. [${new Date()}`)
    }
    websocket.onclose = (event) => {
      console.log(`[websocket]::onclose. [${new Date()}`)
      console.log(
        `[websocket]::onclose. Code: ${event.code}. Reason: ${event.reason}.`
      )
      console.log(event)
      if (!explicitSocketClose && event.code === 1006) {
        let timeout = setTimeout(() => {
          clearTimeout(timeout)
          if (!explicitSocketClose) {
            setUpStreamListSocket(url)
          }
        }, 2000)
      }
    }
    websocket.onmessage = (event) => {
      console.log('[websocket]::onmessage')
      console.log(event)
      let json = event.data
      if (typeof json === 'string') {
        json = JSON.parse(event.data)
      }
      console.log(json)
      if (json.type === 'conference' && json.streams) {
        if (json.streams.indexOf(publisherConfig.streamName) > -1) {
          // TODO: And not currently setting up a participant...
          if (!participant && publisher && publisher.getMediaStream()) {
            hasStopped = false
            clearTimeout(retry)
            let stream = publisher.getMediaStream().clone()
            startParticipant(stream)
          }
        } else if (participant) {
          hasStopped = true
          stopParticipating()
        }
      }
    }
  }
  setUpStreamListSocket(socketUrl)

  window.streamsUtil = {
    ...window.streamsUtil,
    ...{
      publishers: {
        stop: (name) => {
          if (name === streamName) {
            shutdown()
          }
        },
      },
    },
  }

  window.addEventListener('pagehide', shutdown)
  window.addEventListener('beforeunload', shutdown)
})(this, document, window.red5prosdk)
