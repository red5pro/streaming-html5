/**
 * Editor Page allows for compositing which live stream should be accessed by which Mixer for composing.
 */
((window, red5prosdk) => {


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

  const roomName = getRoomName(configuration.app)
  var usernameField = document.getElementById('username-field');
  var passwordField = document.getElementById('password-field');
  var tokenField = document.getElementById('token-field');
  var submitButton = document.getElementById('submit-button');

  // Round Trip Authentication
  let username
  let password
  let token

  submitButton.addEventListener('click', () => {
    username = usernameField.value
    password = passwordField.value
    token = JSON.stringify({ token: tokenField.value, room: roomName })

    baseConfig.connectionParams = {
      ...baseConfig.connectionParams,
      username,
      password,
      token
    }

    const loginForm = document.getElementById('login-form')
    if (loginForm) {
      loginForm.classList.add('hidden')
    }
  })

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

  const COUNT = 6

  const websocketEndpoint = configuration.mixerBackendSocketField
  const red5ProHost = configuration.host
  const smToken = configuration.streamManagerAccessToken

  const mixingPage = document.getElementById('mixingPage')
  mixingPage.value = `https://${red5ProHost}/webrtcexamples/sample-mixer-pages/3x3/index.html?sm=true`

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


  const selectBox = document.getElementById("event-name-select");
  const destroyCompositionButton = document.getElementById('destroy-composition-button')
  const eventStateText = document.getElementById('event-state')

  let compositionEventName = null
  let activeComposition = null
  let existingCompositions = []

  const mainContainer = document.querySelector('.main-container')
  const mediaListContainer = document.querySelector('.media-list-container')
  const mixerContainer = document.querySelector('.mixer-container')
  let slots = mixerContainer.querySelectorAll('.box')

  mainContainer.style['max-width'] = window.innerWidth

  // Subscriber initialization configurations.
  let ipReg = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
  let localhostReg = /^localhost.*/

  let webSocket
  let isIPOrLocalhost = ipReg.exec(websocketEndpoint) || localhostReg.exec(websocketEndpoint)
  let secureConnection = !isIPOrLocalhost
  let wsProtocol = isIPOrLocalhost ? 'ws' : 'wss'
  const baseWebSocketUrl = `${wsProtocol}://${websocketEndpoint}`

  let slotWidth
  let slotHeight

  let mixerSubscribers = {}
  let switchableChannels = 0



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

  var baseConfig = Object.assign({}, config, {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port,
    streamName: configuration.stream1,
    app: configuration.proxy,
    connectionParams: {
      host: configuration.host,
      app: configuration.app,
      username,
      password,
      token
    }
  })

  /**
   * Event listener for drag start on subscriber blocks.
   */
  const onDragStart = event => {
    const {
      target
    } = event
    event.dataTransfer.setData('text/plain', target.dataset.name)
    event.dataTransfer.effectAllowed = 'move'
  }

  /**
   * Event listener for drag over on subscriber blocks.
   */
  const onDragOver = event => {
    const {
      currentTarget
    } = event
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    currentTarget.classList.add('box-drag-over')
  }

  // Generic container HTML element for the mixer subscriber block.
  const subscriberTemplate = `
  <div class="subscriber-container">
    <div class="red5pro-media-container video-holder centered">
      <video autoplay controls playsinline class="red5pro-subscriber"></video>
    </div>
    <div class="subscriber-notifications"></div>
    <div class="centered">
      <p class="subscriber-name-field"></span></p>
    </div>
  </div>`

  /**
   * Generates the encapsulating DOM element for the mixer subscriber.
   */
  const generateMixerSubscriberDOM = (mixerObjs) => {
    let index = 0
    document.querySelectorAll('.box').forEach((parent) => {
      const uid = Math.floor(Math.random() * 0x10000).toString(16)
      const streamName = mixerObjs[index].name
      const subId = [streamName, 'sub', uid].join('-')
      const card = templateContent(subscriberTemplate, streamName)
      parent.appendChild(card)
      const videoId = subId
      const videoElement = card.querySelector('.red5pro-subscriber')
      const subscriberNameField = card.querySelector('.subscriber-name-field')
      subscriberNameField.innerText = streamName
      videoElement.id = videoId
      card.id = [videoId, 'container'].join('-')
      mixerObjs[index].subscriberId = subId
      index++
    })

    return mixerObjs
  }

  /**
   * Generates the template.
   */
  const templateContent = (templateHTML) => {
    const box = document.querySelectorAll('.box').item(0)
    const boxWidth = window.getComputedStyle(box).width
    var div = document.createElement('div')
    div.style.width = boxWidth
    div.style.height = `${(parseInt(boxWidth.substring(0, boxWidth.indexOf('.'))) * 9) / 16}px`
    div.innerHTML = templateHTML
    return div
  }

  /**
   * Event listener for drag out on subscriber blocks.
   */
  const onDragOut = event => {
    const {
      currentTarget
    } = event
    currentTarget.classList.remove('box-drag-over')
  }

  /**
   * Event listener for drag drop on subscriber blocks.
   */
  const onDrop = event => {
    const {
      currentTarget,
      dataTransfer
    } = event
    event.preventDefault()
    const data = dataTransfer.getData('text/plain')
    currentTarget.classList.remove('box-drag-over')
    updateSlotsOnSwap(data, currentTarget)
  }

  /**
   * Creates a list item displaying the provided stream name and
   *  button to add it to a switchable channel.
   */
  const createListItem = name => {
    const uid = Math.floor(Math.random() * 0x10000).toString(16)
    const item = document.createElement('div')
    const p = document.createElement('p')
    const label = document.createTextNode(name)
    p.appendChild(label)

    const divChannelAction = document.createElement('div')
    divChannelAction.classList.add('channel-selection')
    const input = document.createElement('input')
    input.classList.add('channel-selection-input')
    input.type = 'number'
    input.value = 1
    input.min = 1
    input.max = 5
    const button = document.createElement('button')
    button.innerHTML = 'Add To Channel'
    button.id = uid
    button.classList.add('add-to-channel-button')
    button.onclick = channelStateChange
    divChannelAction.appendChild(button)
    divChannelAction.appendChild(input)
    if (switchableChannels == 0) {
      divChannelAction.hidden = true
    }

    item.appendChild(p)
    item.appendChild(divChannelAction)
    item.dataset.name = name
    item.classList.add('media-list-item')
    item.draggable = true
    item.ondragstart = onDragStart
    return item
  }

  function escape(str) {
    return (str + '').replace(/[/"']/g, '\\$&')
  }

  /**
   * Adds media label to target mixer box.
   */
  const addMediaToBox = (streamName, box) => {
    const item = createListItem(streamName)
    box.appendChild(item)
  }

  /**
   * Removes media label from listing.
   */
  const removeMediaFromPrevious = name => {
    console.log('remove from previous')
    const item = mainContainer.querySelector(escape(`[data-name=${name}]`))
    if (item && item.parentNode) {
      // item is in `list-holder` 
      const id = getSlotIdFromStreamName(name) //getIdFromStreamName(name)
      item.parentNode.removeChild(item)
      return id
    }
  }

  /**
  * Accesses the id based on the stream name and DOM elements.
  */
  const getSlotIdFromStreamName = name => {
    const item = mainContainer.querySelector(escape(`[data-name=${name}]`))
    if (item) {
      // item is in `list-holder` 
      const box = item.parentNode
      return box.dataset.list || box.dataset.listId
    }
    return undefined
  }

  /**
  * Returns the id of a Mixer that is composing a specific stream name.
  */
  const getMixerIdFromStreamName = name => {
    const item = mainContainer.querySelector(escape(`[data-name=${name}]`))
    if (item && item.parentNode) {
      // mixerId assign to slot box.
      // item is in a `list-holder` child of slot box.
      const box = item.parentNode.parentNode
      return box.dataset.mixerId || box.dataset['mixer-id']
    }
    return undefined
  }

  ////////////
  // Stream List and Selection Logic
  ////////////
  let currentStreamListing = []
  /**
   * Parse and filter incoming and dropped streams
   */
  const parseStreams = (streamsObj) => {
    const list = streamsObj['list']
    let streamNames = []
    list.forEach((obj) => {
      const room = obj.room === '/' ? '' : obj.room
      const streamsInRoom = obj.streams
      streamsInRoom.forEach((stream) => streamNames.push(`${room}/${stream}`))
    })

    const payload = compareLists(currentStreamListing, streamNames)
    console.log(payload)
    addStreams(payload.added)
    removeStreams(payload.removed)

    currentStreamListing = streamNames
  }

  // Simple list comparison.
  const compareLists = (previousList, newList) => {
    let added = []
    let removed = []
    added = newList.filter(item => {
      return previousList.indexOf(item) === -1
    })
    previousList.forEach(item => {
      if (newList.indexOf(item) === -1) {
        removed.push(item)
      }
    })
    return { added, removed }
  }

  /**
   * Adds stream names to a list to select from.
   */
  const addStreams = (streams) => {
    if (!streams) return
    const subscribers = streams.map(name => createListItem(name))
    subscribers.forEach(item => mediaListContainer.querySelector('.list-holder').appendChild(item))
  }

  /**
   * Remove stream names from the list to select from.
   */
  const removeStreams = (streams) => {
    if (!streams) return
    console.log(`Remove streams: ${streams.join(',')}`)
    let removeMap = {}
    streams.forEach(name => {
      const previousMixerId = getMixerIdFromStreamName(name)
      removeMediaFromPrevious(name)
      if (previousMixerId) {
        if (!Object.hasOwnProperty.call(removeMap, 'previousMixerId')) {
          removeMap[previousMixerId] = []
        }
        removeMap[previousMixerId].push(name)
      }
    })

    // post the update to the WebSocket server so it can forward it to the mixers
    Object.keys(removeMap).forEach(key => {
      const list = removeMap[key]
      webSocket.send(JSON.stringify({
        type: 'compositionUpdate',
        event: compositionEventName,
        list: [{
          'cef-id': key,
          remove: list
        }]
      }))
    })
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
      webSocket.send(JSON.stringify(payload))
      // clean up
      mixerContainer.innerHTML = ''
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
      mixerContainer.innerHTML = ''
      // get updated list
      requestActiveCompositions()
    }
    else {
      // clean up
      compositionEventName = null
      activeComposition = null
      mixerContainer.innerHTML = ''
      eventStateText.innerHTML = ''
      destroyCompositionButton.disabled = true
      currentStreamListing = []
      mediaListContainer.querySelector('.list-holder').innerHTML = ''
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

    webSocket.send(JSON.stringify(payload))
  }

  /*
  * Request active streams from WebSocket server
  */
  const requestActiveStreams = () => {
    const payload = {
      'type': 'getActiveStreams'
    }

    webSocket.send(JSON.stringify(payload))
  }

  /**
   * Parses the activeCompositions messages from the websocket and updates the UI.
   */
  const parseCompositions = (json) => {
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
      if (activeComposition == null) {
        activeComposition = composition
      }

      const compositionContext = composition.context
      const mixers = composition.mixers
      const mixerObj = []
      let areAllConnected = true
      mixers.forEach((mixer) => {
        const state = mixer.state
        if (state === 'disconnected') {
          areAllConnected &= false
        }
        mixerObj.push({ id: mixer.id, context: mixer.path, name: mixer.streamName })
      })

      const htmlEventStateText = document.getElementById('event-state')
      htmlEventStateText.innerHTML = areAllConnected ? 'State: Composing' : 'State: Pending'
      if (mixerContainer.children.length <= 0) {
        createMixerBoxes(mixerObj)
        resizeSlots()
        //const mixerObjWithId = generateMixerSubscriberDOM(mixerObj)
        //startMixerSubscribers(mixerObjWithId)
      }

      updateSlotStreams(mixers)
    }
  }

  const getCompositionDataFromStreamManager = async function () {
    try {
      let payload
      const url = `https://${red5ProHost}/streammanager/api/4.0/composition/${compositionEventName}?accessToken=${smToken}`
      const response = await fetch(url)
      if (response.headers.get('content-type') &&
        response.headers.get('content-type').toLowerCase().indexOf('application/json') >= 0) {
        payload = await response.json()
      } else {
        payload = await response.text()
      }

      let json = payload
      if (typeof payload === 'string') {
        json = JSON.parse(payload)
      }
      return json
    } catch (e) {
      console.error(e)
      return {}
    }
  }

  const startMixerSubscribers = async (mixerObjWithId) => {
    const compositionData = await getCompositionDataFromStreamManager()
    if (!compositionData.hasOwnProperty('mixers')) {
      console.log('Mixers not found in composition data')
      return
    }
    const mixers = compositionData.mixers
    const mixerIdToAddress = {}
    mixers.forEach(m => mixerIdToAddress[m.id] = m.serverAddress)
    console.log(mixerIdToAddress)
    mixerObjWithId.forEach(async (mixer) => {
      doStartMixerSubscriber(mixer, mixerIdToAddress[mixer.id])
    })
  }

  const doStartMixerSubscriber = async (mixer, mixerAddress) => {
    let config = {
      ...baseConfig, ...{
        app: 'streammanager',
        streamName: mixer.name,
        mediaElementId: mixer.subscriberId
      }
    }

    config.connectionParams = {
      app: mixer.context,
      streamName: mixer.name,
      host: mixerAddress
    }

    subscribe(mixer.id, config)
  }

  /*
  * Launch a mixer subscriber using the given configuration
  */
  const subscribe = async (mixerId, rtcConfig) => {

    const rtcSubscriber = new red5prosdk.RTCSubscriber()
    console.log(rtcConfig)
    rtcSubscriber.init(rtcConfig)
      .then(function () {
        rtcSubscriber.subscribe();
      })
      .then(function () {
        console.log('Playing!');
        mixerSubscribers[mixerId] = rtcSubscriber
      })
      .catch(function (err) {
        console.log('Could not play: ' + err);
        subscribeRetry(3000, mixerId, rtcConfig)
      });
  }

  /*
  * Returns the URL to use to check for stream availability
  */
  const getAvailableUrlBasedOnConfig = (config, sm = false) => {
    console.log(config)
    const {
      host,
      port,
      app
    } = config
    const protocol = 'https'
    if (sm) {
      return `${protocol}://${host}:${port}/streammanager/api/4.0/event/list`
    }

    return `http://${host}:5080/live/streams.jsp`

  }

  /*
  * Retries to subscribe after timeout
  */
  const subscribeRetry = (wait, mixerId, config) => {
    window.setTimeout((mixerId, config) => {
      subscribe(mixerId, config)
    }, wait, mixerId, config)
  }

  /**
     * Adds streams to target mixer slots.
     */
  const updateSlotStreams = (mixers) => {
    slots.forEach((slot, index) => {
      // update mixer Online/Offline state
      const state = mixers[index].isWebSocketConnected ? 'Online' : 'Offline'
      const p = slot.querySelector('.mixer-name-and-state')
      p.innerHTML = p.innerHTML.substring(0, p.innerHTML.indexOf('-')) + '- ' + state

      const mixerId = mixers[index].id
      let mutedStreamNames = []
      let unmutedStreamNames = []
      if (Object.hasOwnProperty.call(mixers[index], 'streams')) {
        if (Object.hasOwnProperty.call(mixers[index].streams, 'muted')) {
          mutedStreamNames = mixers[index].streams.muted
        }
        if (Object.hasOwnProperty.call(mixers[index].streams, 'unmuted')) {
          unmutedStreamNames = mixers[index].streams.unmuted
        }
      }

      console.log(`UPDATE ${mixerId}, with muted streams ${mutedStreamNames.join(',')} and unmuted streams ${unmutedStreamNames.join(',')}`)
      const mutedList = slot.querySelector('.list-holder-muted')
      const unmutedList = slot.querySelector('.list-holder-unmuted')
      mutedStreamNames.forEach(streamName => {
        let exists = mutedList.querySelector(escape(`[data-name=${streamName}]`))
        if (!exists || exists.length === 0) {
          removeMediaFromPrevious(streamName)
          addMediaToBox(streamName, mutedList)
        }
      })
      unmutedStreamNames.forEach(streamName => {
        let exists = unmutedList.querySelector(escape(`[data-name=${streamName}]`))
        if (!exists || exists.length === 0) {
          removeMediaFromPrevious(streamName)
          addMediaToBox(streamName, unmutedList)
        }
      })
    })
  }

  /**
   * Update the slots and listings.
   */
  const updateSlotsOnSwap = (streamName, slot) => {
    const parentBox = slot.parentNode
    const mixerId = parentBox.dataset.mixerId || parentBox.dataset['mixer-id']
    const slotId = slot.dataset.listId || slot.dataset['list-id']
    let isMuted = false
    if (slot && slot.classList.contains('list-holder-muted')) {
      isMuted = true
    }

    const currentSlotId = getSlotIdFromStreamName(streamName)
    if (slotId === currentSlotId) {
      return
    }

    const previousMixerId = getMixerIdFromStreamName(streamName)
    removeMediaFromPrevious(streamName)
    addMediaToBox(streamName, slot)
    let updateList = []
    if (slotId) {
      let add = []
      let mute = []
      let unmute = []
      if (mixerId != previousMixerId) {
        add = [streamName]
      }

      if (isMuted) {
        mute.push(streamName)
      }
      else {
        unmute.push(streamName)
      }

      updateList.push({
        'cef-id': mixerId,
        add,
        mute,
        unmute
      })
    }
    if (previousMixerId && slotId != previousMixerId && previousMixerId != 'stream-list-container') {
      let remove = []
      if (mixerId != previousMixerId) {
        remove = [streamName]
      }
      updateList.push({
        'cef-id': previousMixerId,
        remove
      })
    }

    webSocket.send(JSON.stringify({
      type: 'compositionUpdate',
      event: compositionEventName,
      list: updateList
    }))
  }

  /**
   * Resizes each slot on change to window dimensions.
   */
  const resizeSlots = () => {
    const width = window.innerWidth
    const height = window.innerHeight

    const rows = 4
    //const rows = Math.ceil(slots.length / 3)
    if (width > height) {
      slotHeight = height / Math.ceil(COUNT / rows)
      slotWidth = height / rows
    } else {
      slotWidth = width / rows
      slotHeight = height / Math.ceil(COUNT / rows)
    }

    console.log(`Screen ${width}x${height}`)
    console.log('New slot width ' + slotWidth)
    console.log('New slot height ' + slotHeight)
    /* // 16:9 below.
    const slotHeight = height / 3
    const slotWidth = (slotHeight*16) / 9
    //    const slotWidth = width <= 640 ? width : width / 3
    //    const slotHeight = (slotWidth*9) / 16
    */
    slots.forEach(slot => {
      // slot.style.width = `${slotWidth}px`
      slot.style.height = `${slotHeight}px`
      const list = slot.querySelector('.list-holder')
      if (list) list.style.height = `${slotHeight - 20}px`
      const mutedList = slot.querySelector('.list-holder-muted')
      if (mutedList) mutedList.style.height = `${slotHeight / 2}px`
      const unmutedList = slot.querySelector('.list-holder-unmuted')
      if (unmutedList) unmutedList.style.height = `${slotHeight / 2}px`
    })

    const containerWidth = rows == 1 ? `${slotWidth * rows}px` : `${slotWidth * 3}px`
    mixerContainer.style.width = `${slotWidth * 2}px`
  }

  /**
   * Sets up the WebSocket connection to listen for updates on "active" streams and compositions.
   *
   * @see mock-fetch.js
   * @param {String} url
   *        The websocket url to connect to.
   */
  const setUpWebSocket = (webSocketEndpoint) => {
    webSocket = new WebSocket(webSocketEndpoint)
    webSocket.onmessage = event => {
      console.log('[websocket]::onmessage')
      console.log(event)
      let json = event.data
      if (typeof json === 'string') {
        json = JSON.parse(event.data)
      }

      if (json.type === 'activeStreams') {
        parseStreams(json)
      }
      else if (json.type === 'activeCompositions') {
        parseCompositions(json)
      }
      else if (json.type === 'error') {
        console.warn(json)
      }
      else {
        console.log('Unrecognized message received.', event.data)
      }
    }
    webSocket.onopen = () => {
      console.log('[websocket]::open')
    }
  }

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
      alert(`The provided mixingPage ${mixingPage} is not a valid URL`)
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

  function isStringAValidUrl(string) {
    try {
      new URL(string);
    } catch (e) {
      return false;
    }

    return true;
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

    webSocket.send(JSON.stringify(createCompositionMessage))
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

  /*
  * Creates the UI for the Mixer boxes
  */
  const createMixerBoxes = (mixerObjs) => {
    for (let i = 0; i < mixerObjs.length; i++) {
      let unmutedPElement = document.createElement('p')
      unmutedPElement.innerHTML = `Unmuted`
      let unmutedListHolderElement = document.createElement('div')
      unmutedListHolderElement.classList.add('list-holder-unmuted')
      unmutedListHolderElement.dataset.listId = Math.floor(Math.random() * 0x1000000).toString(16)

      let mutedPElement = document.createElement('p')
      mutedPElement.innerHTML = `Muted`
      let mutedListHolderElement = document.createElement('div')
      mutedListHolderElement.classList.add('list-holder-muted')
      mutedListHolderElement.dataset.listId = Math.floor(Math.random() * 0x1000000).toString(16)

      let pElement = document.createElement('p')
      pElement.id = mixerObjs[i].id
      pElement.classList.add('mixer-name-and-state')
      pElement.innerHTML = `Mixer ${i + 1} - Offline`

      let divElement = document.createElement('div')
      divElement.classList.add('box')
      divElement.classList.add('a')
      divElement.dataset.mixerId = mixerObjs[i].id
      divElement.append(pElement)
      divElement.appendChild(unmutedPElement)
      divElement.appendChild(unmutedListHolderElement)
      divElement.appendChild(mutedPElement)
      divElement.appendChild(mutedListHolderElement)

      mixerContainer.appendChild(divElement)
    }

    slots = mixerContainer.querySelectorAll('.box')
    const mixerUnmutedLists = mixerContainer.querySelectorAll('.list-holder-unmuted')
    const mixerMutedLists = mixerContainer.querySelectorAll('.list-holder-muted')
    const streamList = mediaListContainer.querySelectorAll('.list-holder')
    Array.from(mixerUnmutedLists).concat(Array.from(mixerMutedLists)).concat(Array.from(streamList)).forEach(list => {
      list.ondragover = onDragOver
      list.ondragleave = onDragOut
      list.ondrop = onDrop
    })
  }

  /*
  * Converts a string with comma separated values into an array
  */
  const getMixerPagesFromText = (text) => {
    if (!text) return []
    return text.split(',')
    /*let list = []
    let start = 0
    let index = text.indexOf(',')
    while (index > start) {
      let page = text.substring(start, index)
      list.push(page)
      start = index + 1
      index = text.indexOf(',', start)
    }
    if (start == 0) {
      list.push(text)
    }
    else if (start <= text.length - 1) {
      list.push(text.substring(start))
    }
    return list*/
  }

  // Main
  // Setup WebSocket
  resizeSlots()
  window.addEventListener('resize', resizeSlots, true)
  const uid = Math.floor(Math.random() * 0x10000).toString(16)
  const webSocketEndpoint = `${baseWebSocketUrl}?type=manager&id=${uid}`
  setUpWebSocket(webSocketEndpoint)


  // Cheap way to shut things down on navigate away from page.
  const shutdown = async () => {
    if (webSocket) {
      webSocket.close()
    }
  }

  window.addEventListener('pagehide', shutdown)
  window.addEventListener('beforeunload', shutdown)
})(window,
  window.red5prosdk)
