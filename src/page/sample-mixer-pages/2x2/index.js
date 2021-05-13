((window, red5prosdk, SubscriberBlock) => {

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

  //  red5prosdk.setLogLevel('debug')

  const rowCount = window.query('rows') || 2

  const cefId = window.query('cef-id') || 'default-mixer-id'
  const appContext = window.query('app') || 'live'
  const sm = window.query('sm') || 'true'
  const requiresStreamManager = !sm ? false : !(sm && sm === 'false')
  const ws = window.query('ws') || 'null'
  const webSocketEndpointForLayouts = `wss://${ws}?type=cef&id=${cefId}`
  const red5ProHost = window.query('host') || configuration.host

  // Round Trip Authentication
  const username = window.query('username') || 'default-username'
  const password = window.query('password') || 'default-password'
  const token = window.query('token') || 'default-token'

  //const layoutName = window.query('layoutname') || 'squaresmix'
  const sectionContainer = document.querySelector('.main-container')
  const slots = document.querySelectorAll('.box')

  let ipReg = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
  let localhostReg = /^localhost.*/
  let isIPOrLocalhost = ipReg.exec(red5ProHost) || localhostReg.exec(red5ProHost)
  let secureConnection = !isIPOrLocalhost
  let activeSubscribers = {}

  let setStreamsToSubscribeTo = new Set()


  function getUserMediaConfiguration() {
    return {
      mediaConstraints: {
        audio: configuration.useAudio ? configuration.mediaConstraints.audio : false,
        video: configuration.useVideo ? configuration.mediaConstraints.video : false
      }
    };
  }

  var protocol = serverSettings.protocol;
  function getSocketLocationFromProtocol() {
    return !secureConnection
      ? { protocol: 'ws', port: serverSettings.wsport }
      : { protocol: 'wss', port: serverSettings.wssport };
  }

  var defaultConfiguration = {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port,
    streamMode: configuration.recordBroadcast ? 'record' : 'live'
  }

  var config = Object.assign({},
    configuration,
    defaultConfiguration,
    getUserMediaConfiguration())

  // Red5 Pro configuration to subscribe
  var baseConfig = Object.assign({}, config, {
    host: red5ProHost,
    protocol: secureConnection ? 'wss' : 'ws',
    port: secureConnection ? '443' : 5080,
    streamName: configuration.stream1,
    app: requiresStreamManager ? configuration.proxy : appContext,
    connectionParams: {
      host: configuration.host,
      app: appContext,
      username,
      password,
      token
    }
  })


  // UI Configurations
  const utilizeSubscriberNotifications = false

  /**
   * Returns next available slot in grid without a subscriber.
   *
   * @return {HTMLNode}
   */
  const findNextAvailableSlot = () => {
    const len = slots.length
    for (let i = 0; i < len; i++) {
      const slot = slots[i]
      const children = slot.children
      if (children && children.length === 0) {
        //return { slot, index: i }
        return slot
      }
      else if (children && children.length === 1 && children.item(0).className === 'slot-image') {
        //return { slot, index: i }
        return slot
      }
    }
  }

  const onSubscriberEvent = (event, subscriber) => {
    const {
      type
    } = event
    if (type === 'Subscribe.Start') {
      subscriber.getElementContainer().classList.remove('hidden')
    } else if (type === 'Subscribe.Fail' ||
      type === 'Subscribe.InvalidName' ||
      type === 'Subscribe.Stop' ||
      type === 'Subscribe.Play.Unpublish' ||
      type === 'Subscribe.Connection.Closed') {
      subscriber.getElementContainer().classList.add('hidden')
    }
  }

  /**
   * Creates and start subscribing to streams from the list.
   *
   * @param {Array} streamList
   *        A list of stream names.
   */
  const startSubscribers = (streamList) => {
    console.log('sub to ', streamList)
    console.log(`[mixer]:: Starting new subscribers from list: ${JSON.toString(streamList, null, 2)}`)
    const subscribers = streamList.map(name => {
      let freeSlot = findNextAvailableSlot()
      let bl = new SubscriberBlock(name, freeSlot, utilizeSubscriberNotifications)
      activeSubscribers[name] = bl
      return bl
    })
    // Create linked-list and start subscribing.
    subscribers.forEach((sub, index) => {
      sub.onevent = onSubscriberEvent
      if (index < streamList.length - 1) {
        sub.next = subscribers[index + 1]
      }
      if (index === 0) {
        sub.start(baseConfig, requiresStreamManager)
      }
    })
  }

  /**
   * Parses layout update to swap in specific CSS file.
   *
   * @param {String} name
   *        The CSS filename to swap in.

  const parseLayout = name => {
    const elements = Array.from(document.querySelectorAll('[data-mixer]'))
    const link = document.createElement('link')
    link.setAttribute('data-mixer', 'css')
    link.rel = 'stylesheet'
    link.href = `css/${name}.css`

    // Try to replace any previous stylesheet for the page.
    if (elements) {
      const currentStyle = elements.filter(el => {
        return el.dataset.mixer === 'css'
      })
      if (currentStyle.length > 0) {
        const toSwap = currentStyle[0]
        toSwap.previousSibling.after(link)
        toSwap.parentNode.removeChild(toSwap)
        return
      }
    }
    // Else, just append to `head`.
    document.getElementsByTagName('head')[0].appendChild(link)
  }
   */
  /**
   * Resizes each slot on change to window dimensions.
   */
  const resizeSlots = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    console.log(`Screen dims = ${width}x${height}`)

    let slotWidth
    let slotHeight
    const rows = parseInt(rowCount, 10)
    if (width > height) {
      slotHeight = height / rows
      slotWidth = slotHeight
    } else {
      slotWidth = width / rows
      slotHeight = slotWidth
    }
    console.log(slots.length)
    /* // 16:9 below.
    const slotHeight = height / 3
    // eslint-disable-next-line no-unused-vars
    const slotWidth = (slotHeight*16) / 9
    //    const slotWidth = width <= 640 ? width : width / 3
    //    const slotHeight = (slotWidth*9) / 16
    */
    slots.forEach(slot => {
      slot.style.width = `${slotWidth}px`
      slot.style.height = `${slotHeight}px`
    })
    sectionContainer.style.width = `${slotWidth * rowCount}px`
  }


  const webSocket = new WebSocket(webSocketEndpointForLayouts);

  webSocket.onmessage = function (event) {
    console.log(event);
    const data = JSON.parse(event.data)
    processWSMessage(data)
  }

  /**
   * WebSocket API
   */
  const processWSMessage = function (message) {
    if (Object.prototype.hasOwnProperty.call(message, 'type') && message.type === 'compositionUpdate') {
      processCompositionUpdate(message)
    }
    else {
      console.log('Unrecognize message received.', message)
    }
  }

  /**
   * Processes the composition update messages sent by the Editor page and forwarded by the Node.js mixerServer.
   */
  const processCompositionUpdate = function (message) {
    if (Object.prototype.hasOwnProperty.call(message, 'add') && message.add.length > 0) {
      const streamsToAdd = getNewStreamsToAdd(message)
      startSubscribers(streamsToAdd)
    }

    if (Object.prototype.hasOwnProperty.call(message, 'remove') && message.remove.length > 0) {
      removeStreams(message)
    }

    if (Object.prototype.hasOwnProperty.call(message, 'mute') && message.mute.length > 0) {
      muteStreams(message)
    }

    if (Object.prototype.hasOwnProperty.call(message, 'unmute') && message.unmute.length > 0) {
      unmuteStreams(message)
    }
  }

  /**
   * Returns the new streams to subscribe to so they are in the composition
   */
  const getNewStreamsToAdd = function (message) {
    const addArray = message.add
    let streamsToAdd = []
    for (let stream of addArray) {
      if (!setStreamsToSubscribeTo.has(stream)) {
        streamsToAdd.push(stream);
      }
      setStreamsToSubscribeTo.add(stream)
    }
    return streamsToAdd
  }

  /**
   * Removes the specified streams from the composition.
   */
  const removeStreams = function (message) {
    const removeArray = message.remove
    for (let stream of removeArray) {
      setStreamsToSubscribeTo.delete(stream)
      if (activeSubscribers[stream]) {
        activeSubscribers[stream].cancel()
        delete activeSubscribers[stream]
      }
    }
  }

  /**
     * Mutes the specified streams in the composition.
     */
  const muteStreams = function (message) {
    const muteArray = message.mute
    for (let stream of muteArray) {
      if (activeSubscribers[stream]) {
        console.log('mute stream: ', stream)
        const video = document.getElementById(activeSubscribers[stream].subscriptionId)
        if (video) {
          video.muted = true
        }
      }
    }
  }

  /**
   * Unmutes the specified streams from the composition.
   */
  const unmuteStreams = function (message) {
    const unmuteArray = message.unmute
    for (let stream of unmuteArray) {
      if (activeSubscribers[stream]) {
        console.log('unmute stream: ', stream)
        const video = document.getElementById(activeSubscribers[stream].subscriptionId)
        if (video) {
          video.muted = false
        }
      }
    }
  }


  /**
   * Sets placeholder images on the players to show the grid.
   */
  const setSubscriberImages = images => {
    const imgs = images.map(url => {
      const img = document.createElement('img')
      img.src = url
      img.classList.add('slot-image')
      return img
    })
    slots.forEach((slot, index) => {
      slot.appendChild(imgs[index])
    })
  }

  // Main.
  //parseLayout(layoutName)
  resizeSlots()
  setSubscriberImages(new Array(9).fill('../../css/assets/Red5Pro_logo_white_red.svg'))
  window.addEventListener('resize', resizeSlots, true)
})(window, window.red5prosdk, window.SubscriberBlock)





