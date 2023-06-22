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
 * Waiting Room Orchestrator in handling streams entering and exiting a room to be staged into a conference.
 */
;((window, red5prosdk, SubscriberBlock) => {
  red5prosdk.setLogLevel('debug')

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

  const getRoomName = (context) => {
    const splits = context.split('/')
    if (splits.length > 1) {
      splits.splice(0, 1)
      return splits.join('/')
    }

    return context
  }

  const getAppName = (context) => {
    const splits = context.split('/')
    return splits[0]
  }

  const appContext = configuration.app
  const appName = getRoomName(appContext)
  const roomName = getRoomName(appContext)
  let iFramesrc = `./presenter-flow-viewer.html?sm=true&host=${
    configuration.host
  }&app=${getAppName(appContext)}&room=${roomName}&role=moderator&ws=${
    configuration.mixerBackendSocketField
  }&smtoken=${configuration.streamManagerAccessToken}`
  const mixingPageSelector = document.getElementById('mixingPage-select')
  const PARTICIPANT_APPENDIX = '_r5participator'

  const isAuthEnabled = configuration.mixerAuthenticationEnabled
  var authenticationForm = document.getElementById('login-form')
  var usernameField = document.getElementById('username-field')
  var passwordField = document.getElementById('password-field')
  var tokenField = document.getElementById('token-field')
  var submitButton = document.getElementById('submit-button')

  // Round Trip Authentication
  let username
  let password
  let token

  submitButton.addEventListener('click', () => {
    username = usernameField.value
    password = passwordField.value
    token = tokenField.value

    rtcConfig.connectionParams = {
      ...rtcConfig.connectionParams,
      username,
      password,
      token,
    }

    const loginForm = document.getElementById('login-form')
    if (loginForm) {
      loginForm.classList.add('hidden')
    }

    iFramesrc = `${iFramesrc}&username=${username}&password=${password}&token=${token}`
    document.getElementById('conference-i-frame').src = iFramesrc

    console.log('connect to socket- auth params submitted')
    setUpWaitingRoomWebSocket(waitingRoomWSEndpoint)
    setUpConferenceRoomWebSocket(conferenceRoomWSEndpoint)
  })

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

  const getConferenceRoomContext = () => {
    return appContext
  }
  const getWaitingRoomContext = () => {
    return `${appContext}_wr`
  }

  const waitingRoomWSEndpoint = isSecure
    ? `wss://${
        configuration.mixerBackendSocketField
      }?testbed=conference&room=${getWaitingRoomContext()}&host=true`
    : `ws://${
        configuration.mixerBackendSocketField
      }?room=${getWaitingRoomContext()}&host=true`
  const conferenceRoomWSEndpoint = isSecure
    ? `wss://${
        configuration.mixerBackendSocketField
      }?testbed=conference&room=${getConferenceRoomContext()}&host=true`
    : `ws://${
        configuration.mixerBackendSocketField
      }?room=${getConferenceRoomContext()}&host=true`

  document.getElementById('scope').value = appContext
  document.getElementById('streamName').value = roomName
  document.getElementById('event').value = roomName
  const waitingRoomWall = document.querySelector('#waiting-room-wall')
  const selectBox = document.getElementById('event-name-select')
  const destroyCompositionButton = document.getElementById(
    'destroy-composition-button'
  )
  const eventStateText = document.getElementById('event-state')
  const eventRoomText = document.getElementById('event-room')

  let compositionEventName = null
  let activeComposition = null
  let existingCompositions = []

  const createCompositionForm = document.getElementById(
    'create-composition-form'
  )
  if (createCompositionForm.attachEvent) {
    createCompositionForm.attachEvent('submit', processCreateCompositionForm)
  } else {
    createCompositionForm.addEventListener(
      'submit',
      processCreateCompositionForm
    )
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
    app: getWaitingRoomContext(),
    connectionParams: {
      host: configuration.host,
      app: getWaitingRoomContext(),
    },
  })

  const isValidString = (string) => {
    return string.length <= 255 && !!string.match(/^[\/0-9-_A-Za-z]+$/)
  }

  const getMixingPageFromSelector = (selection) => {
    if (selection === 'focused') {
      return `https://${
        configuration.host
      }/webrtcexamples/sample-mixer-pages/conference/?role=mixer&app=${getAppName(
        appContext
      )}&room=${roomName}&ws=${
        configuration.mixerBackendSocketField
      }&token=${Date.now()}&sm=true&smtoken=${
        configuration.streamManagerAccessToken
      }`
    } else {
      return ``
    }
  }

  document.querySelector('#room-field').innerText = `${appContext}/${roomName}`

  let websocket
  let streamListing = [] // in waiting room
  let pendingListing = undefined // in limbo
  let conferenceListing = undefined // in conference

  /*
   * Posts a create composition message to the WebSocket server with the
   * data provided by the user. The server will forward the data to the Stream
   * Manager to create the actual composition
   */
  function processCreateCompositionForm(e) {
    if (e.preventDefault) e.preventDefault()

    const selectedValue = selectBox.options[selectBox.selectedIndex].value
    if (selectedValue != '') {
      alert('Cannot create a new composition when one is already selected')
      return
    }

    const eventName = document.getElementById('event').value
    const digest = configuration.streamManagerAccessToken
    const path = document.getElementById('scope').value
    const streamName = document.getElementById('streamName').value
    const width = String(document.getElementById('width').value)
    const height = String(document.getElementById('height').value)
    const framerate = document.getElementById('framerate').value
    const bitrate = document.getElementById('bitrate').value
    const transcodeComposition = false
    const mixerName = uuidv4()
    const doForward = true
    const destinationMixerName = ''
    let mixingPage = getMixingPageFromSelector(
      mixingPageSelector.options[mixingPageSelector.selectedIndex].value
    )

    const selector = document.getElementById('mixer-region-select')
    let location = null
    try {
      location = selector.options[selector.selectedIndex].value
    } catch (error) {
      alert(
        `Mixer Region not found. Make sure your environment has available Mixer nodes`
      )
      return
    }

    if (
      !eventName ||
      !digest ||
      !mixingPage ||
      !path ||
      !streamName ||
      !width ||
      !height ||
      !framerate ||
      !bitrate
    ) {
      alert(
        `At least one of eventName, digest, mixingPage, path, streamName, width, height, framerate or bitrate was not provided`
      )
      return
    }

    if (
      !isValidString(eventName) ||
      !isValidString(digest) ||
      !isValidString(path) ||
      !isValidString(streamName)
    ) {
      alert(
        `Event Name, Digest, Path and Stream Name must be alphanumeric and shorter than 256 characters`
      )
      return
    }

    if (!isStringAValidUrl(mixingPage)) {
      alert(`The provided page ${mixingPage} is not a valid URL`)
      return
    }

    const createCompositionMessage = {
      type: 'createComposition',
      event: eventName,
      digest,
      transcodeComposition,
      mixers: [
        {
          mixerName,
          mixingPage,
          streamName,
          path,
          width,
          height,
          framerate,
          bitrate,
          doForward,
          destinationMixerName,
        },
      ],
      location: [location],
    }

    websocket.send(JSON.stringify(createCompositionMessage))
    console.log('create composition message submitted')
    console.log(createCompositionMessage)

    compositionEventName = eventName
    eventStateText.innerHTML = `State: Pending`

    //document.getElementById('create-composition-form').reset()

    // return false to prevent the default form behavior
    return false
  }

  function isStringAValidUrl(string) {
    try {
      new URL(string)
    } catch (e) {
      return false
    }

    return true
  }

  /**
   * Creates and start subscribing to streams from the list.
   *
   * @param {Array} streamList
   *        A list of stream names.
   */
  const startSubscribers = (streamList) => {
    console.log(
      `[waitingroom]:: Starting new subscribers from list: ${streamList.join(
        ','
      )}`
    )
    const subscribers = streamList.map(
      (name) => new SubscriberBlock(name, waitingRoomWall)
    )
    if (isAuthEnabled) {
      rtcConfig.connectionParams = {
        ...rtcConfig.connectionParams,
        username,
        password,
        token,
      }
    }

    // Create linked-list and start subscribing.
    subscribers.forEach((sub, index) => {
      decorateSubscriberForModeration(sub)
      if (index < streamList.length - 1) {
        sub.next = subscribers[index + 1]
      }
      if (index === 0) {
        sub.execute(rtcConfig, true)
      }
    })
  }

  /**
   * Stops all subscriber streams in list.
   *
   * @see subscriber-block.js
   * @param {Array} streamList
   *        List of stream names.
   */
  const stopSubscribers = (streamList) => {
    streamList.forEach((name) => {
      // The window.streamsUtil.subscribers Utility is created in subscriber-block.js
      window.streamsUtil.subscribers.stop(name)
    })
  }

  /**
   * Returns the top level GUID of the stream name used for the option variant name.
   *
   * @param {String} name
   *        The name of the stream to access the top level GUID stream name of. If it is a variant, such as `stream1_1`,
   *        it will return `stream1`. If it is the top-level GUID, such as `stream1` it will return `stream1`.
   */
  const devariantStreamName = (name) => {
    // TODO: This is basic on assumption of naming conventions for variants and screenshares.
    const split = name.split('_')
    if (split.length === 1) {
      return name
    } else if (split[1] === 'screenshare') {
      return name
    }
    return name[0]
  }

  /**
   * Decorates the UI and exclusion abilities on a subscriber for a moderator.
   *
   * @param {SubscriberBlock} subscriber
   */
  const decorateSubscriberForModeration = (subscriber) => {
    const bar = document.createElement('p')
    const addButton = document.createElement('button')
    const addLabel = document.createTextNode('add to conference')
    const exclusionButton = document.createElement('button')
    const exclusionLabel = document.createTextNode('exclude')
    exclusionButton.classList.add('subscriber-exclusion-button')
    exclusionButton.appendChild(exclusionLabel)
    bar.classList.add('subscriber-moderation-field')
    addButton.appendChild(addLabel)
    bar.appendChild(addButton)
    bar.appendChild(exclusionButton)
    subscriber.getElementContainer().appendChild(bar)
    addButton.addEventListener('click', () => {
      const streamName = devariantStreamName(subscriber.getStreamName())
      // Note [TODO]:: streamName is now the top level GUID if transcoding.
      onModeratorAddConferenceStream(getConferenceRoomContext(), streamName)
    })
    exclusionButton.addEventListener('click', () => {
      const streamName = devariantStreamName(subscriber.getStreamName())
      // Note [TODO]:: streamName is now the top level GUID if transcoding.
      onModeratorExcludeStream(rtcConfig.connectionParams.app, streamName)
    })
  }

  /**
   * Calls websocket to promote a target stream to a conference.
   *
   * @param {String} room
   * @param {String} name
   */
  const onModeratorAddConferenceStream = (room, name) => {
    websocket.send(
      JSON.stringify({
        type: 'promote',
        room: room,
        streamName: name,
      })
    )
  }

  /**
   * Calls websocket to exclude a target stream in a room.
   *
   * @param {String} room
   * @param {String} name
   */
  const onModeratorExcludeStream = (room, name) => {
    websocket.send(
      JSON.stringify({
        type: 'exclude',
        room: room,
        streamName: name,
      })
    )
  }

  /**
   * Parses the provided stream list to determine which are new streams to
   * subscribe to and which are now non-existant streams to unsubscriber to.
   *
   * @param {Array} list
   *        The list of "active" streams coming from the websocket notification.
   */
  const parseStreamList = (list, conferenceList, participantAppendix) => {
    // Flatten the list if the array is of objects in structure {name: `stream1`}.
    let flattened = list.map((item) => {
      if (typeof item !== 'string') {
        return item.name
      }
      return item
    })
    let nonParticipantList = flattened.filter((item) => {
      return item.indexOf(participantAppendix) === -1 && item !== roomName
    })
    // Filter out only those streams that are not associated with target publisher on page.
    const notInConference = nonParticipantList.filter((item) => {
      return conferenceList.indexOf(item) === -1
    })
    // Find those that are new.
    let newListings = []
    // Find those that are old, no longer active.
    let strippedListings = []
    nonParticipantList.forEach((name) => {
      if (notInConference.indexOf(name) === -1) {
        strippedListings.push(name)
      } else if (!window.streamsUtil.subscribers.find(name)) {
        newListings.push(name)
      }
    })
    console.log(newListings, strippedListings)
    // Remove all subscribers that are inactive.
    if (strippedListings.length > 0) {
      stopSubscribers(strippedListings)
    }
    // Add all newly active subscribers.
    if (newListings.length > 0) {
      startSubscribers(newListings)
    }
    streamListing = list
    console.log(`[waitingroom]:: Current stream listing: ${streamListing}.`)
  }

  /**
   * Parses the excluded stream list to determine if:
   *  a) The current user is the one being excluded
   *  b) There is a stream we need to remove because it has been excluded.
   *
   *  @param {Array} list
   *          List of excluded streams coming from the websocket notification.
   */
  const parseExcludedList = (list) => {
    // Remove any excluded subscribers.
    stopSubscribers(list)
  }

  /**
   * Sets up the WebSocket connection to listen for updates on "active" and "excluded" streams.
   *
   * @param {String} url
   *        The websocket url to connect to.
   */
  const setUpWaitingRoomWebSocket = (url) => {
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
            setUpWaitingRoomWebSocket(url)
          }
        }, 2000)
      }
    }
    websocket.onmessage = (event) => {
      console.log('[websocket]::onmessage')
      console.log(event)
      // Note: expecting list as array of stream name strings.
      let json = event.data
      if (typeof json === 'string') {
        json = JSON.parse(event.data)
      }

      console.log('websocket- ' + JSON.stringify(json, null, 2))

      if (json.type === 'activeCompositions') {
        parseCompositions(json)
        return
      } else if (json.type === 'mixerRegions') {
        parseMixerRegions(json.regions)
        return
      }

      if (json.room != getWaitingRoomContext()) {
        return
      }

      if (json.type === 'active' && conferenceListing) {
        json.hasOwnProperty('streams') &&
          parseStreamList(json.streams, conferenceListing, PARTICIPANT_APPENDIX)
      } else if (json.type === 'active' && !conferenceListing) {
        pendingListing = json.streams
      } else if (json.type === 'excluded') {
        json.hasOwnProperty('streams') && parseExcludedList(json.streams)
      }
    }
  }

  const parseMixerRegions = (regions) => {
    const selector = document.getElementById('mixer-region-select')
    selector.innerHTML = ''
    //const emptyOption = document.createElement('option')
    let i = 0
    regions.forEach((region) => {
      const option = document.createElement('option')
      option.value = region
      option.innerHTML = region
      option.selected = i == 0
      i++
      selector.appendChild(option)
    })
  }

  let confWebsocket = undefined
  const setUpConferenceRoomWebSocket = (url) => {
    confWebsocket = new WebSocket(url)
    confWebsocket.onmessage = (event) => {
      console.log('[conf-websocket::onmessage]')
      console.log(event)

      let json = event.data
      if (typeof json === 'string') {
        json = JSON.parse(event.data)
      }

      console.log('confsocket- ' + JSON.stringify(json, null, 2))

      if (json.room != getConferenceRoomContext()) {
        return
      }

      if (json.type === 'conference') {
        conferenceListing = json.streams || []
        parseStreamList(
          pendingListing || streamListing,
          conferenceListing,
          PARTICIPANT_APPENDIX
        )
        pendingListing = undefined
      }
    }
  }

  /*
   * Destroys a composition and associated UI
   */
  window.destroyComposition = () => {
    const selectedValue = selectBox.options[selectBox.selectedIndex].value
    if (selectedValue != '') {
      const payload = {
        type: 'destroyComposition',
        event: selectedValue,
      }
      websocket.send(JSON.stringify(payload))
      // clean up
      eventRoomText.innerHTML = ''
      eventStateText.innerHTML = ''
      const emptyOption = selectBox.childNodes.item(0)
      selectBox.innerHTML = ''
      selectBox.appendChild(emptyOption)

      destroyCompositionButton.disabled = true
    }
  }

  /*
   * Updates the UI based on the composition selected from a drop down list
   */
  window.compositionSelected = () => {
    const selectedValue = selectBox.options[selectBox.selectedIndex].value

    if (selectedValue != '') {
      compositionEventName = selectedValue
      // clean up
      const emptyOption = selectBox.childNodes.item(0)
      selectBox.innerHTML = ''
      selectBox.appendChild(emptyOption)
      // get updated list
      requestActiveCompositions()
    } else {
      // clean up
      compositionEventName = null
      activeComposition = null
      eventRoomText.innerHTML = ''
      eventStateText.innerHTML = ''
      destroyCompositionButton.disabled = true
      // get updated list
      requestActiveStreams()
    }
  }

  /*
   * Request active compositions from WebSocket server
   */
  const requestActiveCompositions = () => {
    const payload = {
      type: 'getActiveCompositions',
    }

    websocket.send(JSON.stringify(payload))
  }

  /*
   * Request active streams from WebSocket server
   */
  const requestActiveStreams = () => {
    const payload = {
      type: 'getActiveStreams',
    }

    websocket.send(JSON.stringify(payload))
  }

  /**
   * Parses the activeCompositions messages from the websocket and updates the UI.
   */
  const parseCompositions = (json) => {
    console.log('parse composition')
    existingCompositions = []
    const emptyOption = document.createElement('option')
    const filtered = json.list
      ? json.list.filter((comp) => {
          if (existingCompositions.length == 0) {
            selectBox.innerHTML = ''
            emptyOption.value = ''
            selectBox.appendChild(emptyOption)
          }

          existingCompositions.push(comp.event)
          const option = document.createElement('option')
          option.value = comp.event
          option.innerHTML = comp.event

          if (comp.event == compositionEventName) {
            option.selected = true
            destroyCompositionButton.disabled = false
          }
          selectBox.appendChild(option)
          return comp.event === compositionEventName
        })
      : []

    if (filtered.length > 0) {
      const composition = filtered[0]
      console.log('composition', composition)
      let compositionContext = ''
      if (composition.mixers && composition.mixers.length > 0) {
        compositionContext = composition.mixers[0].path
        compositionContext = compositionContext.substring(
          compositionContext.indexOf('/') + 1
        )
        if (activeComposition == null) {
          activeComposition = composition
          eventRoomText.innerHTML = `Room: ${compositionContext}`
        }
      }

      const mixers = composition.mixers
      const mixerObj = []
      let areAllConnected = true
      mixers.forEach((mixer) => {
        const state = mixer.state
        if (state === 'disconnected') {
          areAllConnected &= false
        }
        mixerObj.push({
          id: mixer.id,
          context: compositionContext,
          name: mixer.name,
        })
      })

      eventStateText.innerHTML = areAllConnected
        ? 'State: Composing'
        : 'State: Pending'
    }
  }

  let explicitSocketClose = false
  /**
   * Shut down existing websocket connection.
   */
  // eslint-disable-next-line no-unused-vars
  const shutdownStreamListSocket = () => {
    if (websocket) {
      try {
        explicitSocketClose = true
        websocket.onmessage = undefined
        websocket.close()
        websocket = undefined
      } catch (e) {
        console.warn(e)
      }
    }
  }

  // Main

  if (isAuthEnabled) {
    authenticationForm.classList.remove('hidden')
  } else {
    console.log('connect to socket- auth not enabled')
    document.getElementById('conference-i-frame').src = iFramesrc
    setUpWaitingRoomWebSocket(waitingRoomWSEndpoint)
    setUpConferenceRoomWebSocket(conferenceRoomWSEndpoint)
  }
})(window, window.red5prosdk, window.SubscriberBlock)
