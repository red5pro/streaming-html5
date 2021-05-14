/**
 * Waiting Room Orchestrator in handling streams entering and exiting a room to be staged into a conference.
 */
((window, red5prosdk, SubscriberBlock) => {

  red5prosdk.setLogLevel('debug')


  var serverSettings = (function () {
    var settings = sessionStorage.getItem('r5proServerSettings');
    try {
      return JSON.parse(settings);
    }
    catch (e) {
      console.error('Could not read server settings from sessionstorage: ' + e.message);
    }
    return {};
  })();

  var configuration = (function () {
    var conf = sessionStorage.getItem('r5proTestBed');
    try {
      return JSON.parse(conf);
    }
    catch (e) {
      console.error('Could not read testbed configuration from sessionstorage: ' + e.message);
    }
    return {}
  })();

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
  const roomName = getRoomName(appContext)

  const PARTICIPANT_APPENDIX = '_r5participator'

  var loginForm = document.getElementById('login-form');
  var usernameField = document.getElementById('username-field');
  var passwordField = document.getElementById('password-field');
  var tokenField = document.getElementById('token-field');
  var tokenCheckBox = document.getElementById('token-required-field');
  var submitButton = document.getElementById('submit-button');

  // Round Trip Authentication
  const username = usernameField.value
  const password = passwordField.value
  const token = tokenField.value

  var protocol = serverSettings.protocol;
  var isSecure = protocol === 'https';
  function getSocketLocationFromProtocol() {
    return !isSecure
      ? { protocol: 'ws', port: serverSettings.wsport }
      : { protocol: 'wss', port: serverSettings.wssport };
  }

  var defaultConfiguration = {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port,
    streamMode: configuration.recordBroadcast ? 'record' : 'live'
  }

  const getConferenceRoomContext = () => {
    return appContext
  }
  const getWaitingRoomContext = () => {
    return `${appContext}_wr`
  }

  const waitingRoomWSEndpoint = isSecure ? `wss://${configuration.mixerBackendSocketField}?room=${getWaitingRoomContext()}&host=true` : `ws://${configuration.mixerBackendSocketField}?room=${getWaitingRoomContext()}&host=true`
  const conferenceRoomWSEndpoint = isSecure ? `wss://${configuration.mixerBackendSocketField}?room=${getConferenceRoomContext()}&host=true` : `ws://${configuration.mixerBackendSocketField}?room=${getConferenceRoomContext()}&host=true`


  document.getElementById('scope').value = `${getAppName(appContext)}`
  document.getElementById('streamName').value = roomName
  document.getElementById('conference-i-frame').src = `./presenter-flow-viewer.html?sm=true&host=${configuration.host}&app=${getAppName(appContext)}&room=${roomName}&role=moderator&ws=${configuration.mixerBackendSocketField}&smtoken=${configuration.streamManagerAccessToken}`
  document.getElementById('event').value = roomName
  // todo fix
  document.getElementById('mixingPage').value = `https://${configuration.host}/client/mixer/presenter-flow-viewer.html?role=mixer&app=${getAppName(appContext)}&room=${roomName}&ws=${configuration.mixerBackendSocketField}&token=${Date.now()}&sm=true&smtoken=${configuration.streamManagerAccessToken}`
  const waitingRoomWall = document.querySelector('#waiting-room-wall')
  const selectBox = document.getElementById("event-name-select");
  const destroyCompositionButton = document.getElementById('destroy-composition-button')
  const eventStateText = document.getElementById('event-state')
  const eventRoomText = document.getElementById('event-room')

  let compositionEventName = null
  let activeComposition = null
  let existingCompositions = []

  const createCompositionForm = document.getElementById('create-composition-form');
  if (createCompositionForm.attachEvent) {
    createCompositionForm.attachEvent("submit", processCreateCompositionForm);
  } else {
    createCompositionForm.addEventListener("submit", processCreateCompositionForm);
  }

  const createMixersForm = document.getElementById('create-mixers-form');
  if (createMixersForm.attachEvent) {
    createMixersForm.attachEvent("submit", processCreateMixersForm);
  } else {
    createMixersForm.addEventListener("submit", processCreateMixersForm);
  }

  function getUserMediaConfiguration() {
    return {
      mediaConstraints: {
        audio: configuration.useAudio ? configuration.mediaConstraints.audio : false,
        video: configuration.useVideo ? configuration.mediaConstraints.video : false
      }
    };
  }

  var config = Object.assign({},
    configuration,
    defaultConfiguration,
    getUserMediaConfiguration())

  var rtcConfig = Object.assign({}, config, {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port,
    streamName: configuration.stream1,
    app: configuration.proxy,
    connectionParams: {
      host: configuration.host,
      app: getWaitingRoomContext(),
      username,
      password,
      token
    }
  })


  document.querySelector('#room-field').innerText = `${appContext}/${roomName}`

  let websocket
  let streamListing = [] // in waiting room
  let pendingListing = undefined // in limbo
  let conferenceListing = undefined // in conference

  let mixers = []
  function processCreateMixersForm(e) {
    if (e.preventDefault) e.preventDefault();

    const mixerName = document.getElementById('mixerName').value
    const mixingPage = document.getElementById('mixingPage').value
    const path = document.getElementById('scope').value
    const streamName = document.getElementById('streamName').value
    const width = String(document.getElementById('width').value)
    const height = String(document.getElementById('height').value)
    const framerate = document.getElementById('framerate').value
    const bitrate = document.getElementById('bitrate').value
    const doForward = document.getElementById('doForward').checked
    const destinationMixerName = document.getElementById('destinationMixerName').value

    if (!isStringAValidUrl(mixingPage)) {
      alert(`The provided cefpage ${mixingPage} is not a valid URL`)
      return
    }

    const mixerObj = {
      mixerName,
      mixingPage,
      streamName,
      path,
      width,
      height,
      framerate,
      bitrate,
      doForward,
      destinationMixerName
    }
    mixers.push(mixerObj)

    const id = Math.random().toString(36).substring(7);
    const collapsible = `<button type="button" id="${id}-button" class="collapsible">Mixer ${mixers.length}</button>
        <div class="content" id="${id}-content">
          <p>
          Mixer Name: ${mixerName}<br>
          Mixing Page: ${mixingPage}<br>
          Scope: ${path}<br>
          Stream Name: ${streamName}<br>
          Width: ${width}<br>
          Height: ${height}<br>
          Framerate: ${framerate}<br>
          bitrate: ${bitrate}<br>
          Forward? ${doForward}<br>
          Destination Mixer Name: ${destinationMixerName}<br>
          </p>
          <button type="button" id="remove-${id}">Delete</button>
        </div>`

    var template = document.createElement('template')
    template.innerHTML = collapsible
    document.getElementById('mixers').appendChild(template.content)
    document.getElementById(`${id}-button`).addEventListener("click", function () {
      this.classList.toggle("active")
      var content = this.nextElementSibling
      if (content.style.display === "block") {
        content.style.display = "none"
      } else {
        content.style.display = "block"
      }
    })

    document.getElementById(`remove-${id}`).addEventListener("click", function () {
      const index = this.id.split('-')[0]
      mixers.splice(index, 1)

      document.getElementById('mixers').removeChild(document.getElementById(`${id}-content`))
      document.getElementById('mixers').removeChild(document.getElementById(`${id}-button`))
    })

    document.getElementById('create-mixers-form').reset()
    // return false to prevent the default form behavior
    return false;
  }

  /*
   * Posts a create composition message to the WebSocket server with the
   * data provided by the user. The server will forward the data to the Stream
   * Manager to create the actual composition
   */
  function processCreateCompositionForm(e) {
    if (e.preventDefault) e.preventDefault();

    const selectedValue = selectBox.options[selectBox.selectedIndex].value;
    if (selectedValue != '') {
      alert('Cannot create a new composition when one is already selected')
      return
    }

    const eventName = document.getElementById('event').value
    const digest = document.getElementById('digest').value
    const transcodeComposition = document.getElementById('transcodeComposition').checked
    const location = document.getElementById('location').value

    if (mixers.length <= 0) {
      alert(`At least one mixer must be provided`)
      return
    }

    const createCompositionMessage = {
      type: 'createComposition',
      event: eventName,
      digest,
      transcodeComposition,
      mixers,
      location: [location]
    }

    websocket.send(JSON.stringify(createCompositionMessage))
    console.log('create composition message submitted')
    console.log(createCompositionMessage)

    compositionEventName = eventName
    eventStateText.innerHTML = `State: Pending`

    document.getElementById('create-composition-form').reset()
    document.getElementById('create-mixers-form').reset()
    mixers = []
    document.getElementById('mixers').innerHTML = ''

    // return false to prevent the default form behavior
    return false;
  }

  function isStringAValidUrl(string) {
    try {
      new URL(string);
    } catch (e) {
      return false;
    }

    return true;
  }

  /**
   * Creates and start subscribing to streams from the list.
   *
   * @param {Array} streamList
   *        A list of stream names.
   */
  const startSubscribers = (streamList) => {
    console.log(`[waitingroom]:: Starting new subscribers from list: ${streamList.join(',')}`)
    const subscribers = streamList.map(name => new SubscriberBlock(name, waitingRoomWall))
    // Create linked-list and start subscribing.
    subscribers.forEach((sub, index) => {
      decorateSubscriberForModeration(sub)
      if (index < streamList.length - 1) {
        sub.next = subscribers[index + 1]
      }
      if (index === 0) {
        sub.execute(rtcConfig, false)
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
    streamList.forEach(name => {
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
    bar.classList.add('subscriber-moderation-field')
    addButton.appendChild(addLabel)
    exclusionButton.classList.add('subscriber-exclusion-button')
    exclusionButton.appendChild(exclusionLabel)
    bar.appendChild(addButton)
    bar.appendChild(exclusionButton)
    subscriber.getElementContainer().appendChild(bar)
    exclusionButton.addEventListener('click', () => {
      const streamName = devariantStreamName(subscriber.getStreamName())
      // Note [TODO]:: streamName is now the top level GUID if transcoding.
      onModeratorExcludeStream(rtcConfig.connectionParams.app, streamName)
    })
    addButton.addEventListener('click', () => {
      const streamName = devariantStreamName(subscriber.getStreamName())
      // Note [TODO]:: streamName is now the top level GUID if transcoding.
      onModeratorAddConferenceStream(getConferenceRoomContext(), streamName)
    })
  }

  /**
   * Calls websocket to promote a target stream to a conference.
   *
   * @param {String} room
   * @param {String} name
   */
  const onModeratorAddConferenceStream = (room, name) => {
    websocket.send(JSON.stringify({
      type: 'promote',
      room: room,
      streamName: name
    }))
  }

  /**
   * Calls websocket to exclude a target stream in a room.
   *
   * @param {String} room
   * @param {String} name
   */
  const onModeratorExcludeStream = (room, name) => {
    websocket.send(JSON.stringify({
      type: 'exclude',
      room: room,
      streamName: name
    }))
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
    let flattened = list.map(item => {
      if (typeof item !== 'string') {
        return item.name
      }
      return item
    })
    let nonParticipantList = flattened.filter(item => {
      return (item.indexOf(participantAppendix) === -1 && item !== roomName)
    })
    // Filter out only those streams that are not associated with target publisher on page.
    const notInConference = nonParticipantList.filter(item => {
      return conferenceList.indexOf(item) === -1
    })
    // Find those that are new.
    let newListings = []
    // Find those that are old, no longer active.
    let strippedListings = []
    nonParticipantList.forEach(name => {
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
    websocket.onmessage = event => {
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
      }

      if (json.room != getWaitingRoomContext()) {
        return
      }

      if (json.type === 'active' && conferenceListing) {
        json.hasOwnProperty('streams') && parseStreamList(json.streams, conferenceListing, PARTICIPANT_APPENDIX)
      } else if (json.type === 'active' && !conferenceListing) {
        pendingListing = json.streams
      } else if (json.type === 'excluded') {
        json.hasOwnProperty('streams') && parseExcludedList(json.streams)
      }
      /*
            } else if (json.type === 'conference') {
              conferenceListing = json.streams || []
              parseStreamList(pendingListing || streamListing, conferenceListing, PARTICIPANT_APPENDIX)
              pendingListing = undefined
            }
      */
    }
  }

  let confWebsocket = undefined
  const setUpConferenceRoomWebSocket = (url) => {
    confWebsocket = new WebSocket(url)
    confWebsocket.onmessage = event => {
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
        parseStreamList(pendingListing || streamListing, conferenceListing, PARTICIPANT_APPENDIX)
        pendingListing = undefined
      }
    }
  }

  /*
  * Destroys a composition and associated UI
  */
  window.destroyComposition = () => {
    const selectedValue = selectBox.options[selectBox.selectedIndex].value;
    if (selectedValue != '') {
      const payload = {
        'type': 'destroyComposition',
        'event': selectedValue
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
    const selectedValue = selectBox.options[selectBox.selectedIndex].value;

    if (selectedValue != '') {
      compositionEventName = selectedValue
      // clean up
      const emptyOption = selectBox.childNodes.item(0)
      selectBox.innerHTML = ''
      selectBox.appendChild(emptyOption)
      // get updated list
      requestActiveCompositions()
    }
    else {
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
      'type': 'getActiveCompositions'
    }

    websocket.send(JSON.stringify(payload))
  }

  /*
  * Request active streams from WebSocket server
  */
  const requestActiveStreams = () => {
    const payload = {
      'type': 'getActiveStreams'
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
    const filtered = json.list ? json.list.filter(comp => {
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
    }) : []

    if (filtered.length > 0) {
      const composition = filtered[0]
      const compositionContext = composition.context
      if (activeComposition == null) {
        activeComposition = composition
        eventRoomText.innerHTML = `Room: ${compositionContext}`
      }

      const mixers = composition.mixers
      const mixerObj = []
      let areAllConnected = true
      mixers.forEach((mixer) => {
        const state = mixer.state
        if (state === 'disconnected') {
          areAllConnected &= false
        }
        mixerObj.push({ id: mixer.id, context: compositionContext, name: mixer.name })
      })

      eventStateText.innerHTML = areAllConnected ? 'State: Composing' : 'State: Pending'
    }
  }

  /**
   * Shut down existing websocket connection.
   */
  // eslint-disable-next-line no-unused-vars
  const shutdownStreamListSocket = () => {
    if (websocket) {
      try {
        websocket.onmessage = undefined
        websocket.close()
        websocket = undefined
      } catch (e) {
        console.warn(e)
      }
    }
  }

  // Main.
  setUpWaitingRoomWebSocket(waitingRoomWSEndpoint)
  setUpConferenceRoomWebSocket(conferenceRoomWSEndpoint)

})(window, window.red5prosdk, window.SubscriberBlock)