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
;((window, red5prosdk, SubscriberBlock) => {
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

  let rowCount = 1
  let colCount = 1

  const cefId = window.query('cef-id') || 'default-mixer-id'
  const eventId = window.query('event-id') || 'default-event-id'

  const appContext = window.query('app') || 'live'
  const roomName = window.query('room') || ''
  const scope = roomName === '' ? appContext : `${appContext}/${roomName}`

  const sm = window.query('sm') || 'true'
  const requiresStreamManager = !sm ? false : !(sm && sm === 'false')
  const whipwhep = window.query('whipwhep') || 'false'
  const preferWhipWhep = !whipwhep ? false : !(whipwhep && whipwhep === 'false')
  const ws = window.query('ws') || 'null'
  const webSocketEndpointForLayouts = `wss://${ws}?testbed=grid&type=cef&id=${cefId}&event-id=${eventId}`
  const SUBSCRIBE_CONCURRENCY = window.query('subscribe-concurrency') || 5
  const SUBSCRIBE_RETRY_DELAY = window.query('subscribe-retry-delay') || 5000

  const placeholderImage = '../../css/assets/Red5Pro_logo_white_red.svg'
  const CHECK_FOR_TASKS_INTERVAL = 1000

  const red5ProHost = window.query('host') || 'localhost' //configuration.host
  const streamManagerHost = configuration.host

  // Round Trip Authentication
  const username = window.query('username') || 'default-username'
  const password = window.query('password') || 'default-password'
  const token = JSON.stringify({
    token: window.query('token') || 'default-token',
    room: roomName,
  })

  const sectionContainer = document.querySelector('.main-container')
  let slots = document.querySelectorAll('.box')

  let ipReg = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
  let localhostReg = /^localhost.*/
  let isIPOrLocalhost =
    ipReg.exec(red5ProHost) || localhostReg.exec(red5ProHost)
  let secureConnection = !isIPOrLocalhost
  let activeSubscribers = {}
  let activeSubscribersCount = 0

  window.connectedSubscribers = {}

  let setStreamsToSubscribeTo = new Set()

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
  function getSocketLocationFromProtocol() {
    return !secureConnection
      ? { protocol: 'ws', port: serverSettings.wsport }
      : { protocol: 'wss', port: serverSettings.wssport }
  }

  const defaultConfiguration = {
    protocol: 'ws',
    port: '5080',
    streamMode: configuration.recordBroadcast ? 'record' : 'live',
  }

  var config = Object.assign(
    {},
    configuration,
    defaultConfiguration,
    getUserMediaConfiguration()
  )

  var baseConfig = Object.assign({}, config, {
    host: red5ProHost,
    protocol: 'ws',
    port: 5080,
    streamName: configuration.stream1,
    app: scope,
    connectionParams: {
      host: red5ProHost,
      app: scope,
      username,
      password,
      token,
    },
  })

  const origConsoleLog = console.log
  let logArr = []
  console.log = (...args) => {
    origConsoleLog.apply(console, args)
    logArr = logArr.concat(args)
  }

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
        return slot
      } else if (
        children &&
        children.length === 1 &&
        children.item(0).className === 'slot-image'
      ) {
        return slot
      }
    }
  }

  const onSubscriberEvent = (event, subscriber) => {
    const { type } = event
    if (type === 'Subscribe.Start') {
      subscriber.getElementContainer().classList.remove('hidden')

      const streamName = `/${appContext}/${subscriber.getStreamName()}`
      const idx = currentStreamsToSubscribeToListForWorker.indexOf(
        `${streamName}`
      )
      if (idx >= 0) {
        currentStreamsToSubscribeToListForWorker.splice(idx, 1)
        console.log(
          `Subscribe start received, removed ${streamName} from worker pool`
        )
        console.log(currentStreamsToSubscribeToListForWorker)
      } else {
        console.log(
          `Subscribe start received but stream ${streamName} not found in worker pool`
        )
        console.log(currentStreamsToSubscribeToListForWorker)
      }
    } else if (
      type === 'Subscribe.Fail' ||
      type === 'Subscribe.InvalidName' ||
      type === 'Subscribe.Stop' ||
      type === 'Subscribe.Play.Unpublish' ||
      type === 'Subscribe.Connection.Closed'
    ) {
      subscriber.getElementContainer().classList.add('hidden')
    }
  }

  let streamToSubscribeQueue = []
  let currentStreamsToSubscribeToListForWorker = []
  const queueSubscribeStarts = function (streamList) {
    if (!streamList || streamList.length <= 0) return

    for (let stream of streamList) {
      if (!streamToSubscribeQueue.includes(stream)) {
        streamToSubscribeQueue.push(stream)
      }
    }
    console.log('Subscribe queue', streamToSubscribeQueue)
  }

  /*
   * Worker that allows up to SUBSCRIBE_CONCURRENCY subscribe attempts at any time
   */
  const startSubscribersWorker = function () {
    setInterval(() => {
      if (
        currentStreamsToSubscribeToListForWorker.length >= SUBSCRIBE_CONCURRENCY
      ) {
        console.log('Too many pending subscribers, waiting...')
        console.log(currentStreamsToSubscribeToListForWorker)
        return
      }

      let available =
        SUBSCRIBE_CONCURRENCY - currentStreamsToSubscribeToListForWorker.length
      if (available > streamToSubscribeQueue.length) {
        available = streamToSubscribeQueue.length
      }

      if (available <= 0) {
        //console.log('No streams found in the queue')
        return
      }

      const candidatesList = streamToSubscribeQueue.slice(0, available)
      streamToSubscribeQueue = streamToSubscribeQueue.slice(available)
      currentStreamsToSubscribeToListForWorker =
        currentStreamsToSubscribeToListForWorker.concat(candidatesList)

      startSubscribers(candidatesList)
    }, CHECK_FOR_TASKS_INTERVAL)
  }

  /**
   * Creates and start subscribing to streams from the list.
   *
   * @param {Array} streamList
   *        A list of stream names.
   */
  const startSubscribers = (streamList) => {
    console.log(
      `[mixer]:: Starting new subscribers from list: ${JSON.stringify(
        streamList
      )}`
    )
    const subscribers = streamList.map((name) => {
      let freeSlot = findNextAvailableSlot()
      console.log('setting mute to ', audioMuted[name], 'for', name)
      let bl = new SubscriberBlock(
        name,
        freeSlot,
        SUBSCRIBE_RETRY_DELAY,
        audioMuted[name],
        utilizeSubscriberNotifications
      )
      activeSubscribers[name] = bl
      activeSubscribersCount++
      return bl
    })
    // Create linked-list and start subscribing.
    subscribers.forEach((sub, index) => {
      sub.onevent = onSubscriberEvent
      if (index < streamList.length - 1) {
        sub.next = subscribers[index + 1]
      }
      if (index === 0) {
        sub.start(baseConfig, streamManagerHost, preferWhipWhep)
      }
    })
  }

  /**
   * Resizes each slot on change to window dimensions.
   */
  const resizeSlots = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    // console.log(`Screen dims = ${ width }x${ height }`)

    let slotWidth
    let slotHeight
    const rows = parseInt(rowCount, 10)
    const cols = parseInt(colCount, 10)
    //console.log(rows + 'x' + cols)
    if (width > height) {
      slotHeight = height / rows
      slotWidth = slotHeight
    } else {
      slotWidth = width / rows
      slotHeight = slotWidth
    }
    slots.forEach((slot) => {
      slot.style.width = `${slotWidth}px`
      slot.style.height = `${slotHeight}px`
    })
    sectionContainer.style.width = `${slotWidth * colCount}px`
  }

  const webSocket = new WebSocket(webSocketEndpointForLayouts)
  webSocket.onmessage = function (event) {
    console.log(event)
    const data = JSON.parse(event.data)
    processWSMessage(data)
  }

  /**
   * WebSocket API
   */
  const processWSMessage = function (message) {
    if (
      Object.prototype.hasOwnProperty.call(message, 'type') &&
      message.type === 'compositionUpdate'
    ) {
      processCompositionUpdate(message)
    } else {
      console.log('Unrecognize message received.', message)
    }
  }

  const audioMuted = {}
  /**
   * Processes the composition update messages sent by the Editor page and forwarded by the Node.js mixerServer.
   */
  const processCompositionUpdate = function (message) {
    if (
      Object.prototype.hasOwnProperty.call(message, 'add') &&
      message.add.length > 0
    ) {
      const streamsToAdd = getNewStreamsToAdd(message.add)
      resizeGridIfNeeded(streamsToAdd.length)
      queueSubscribeStarts(streamsToAdd)
    }

    if (
      Object.prototype.hasOwnProperty.call(message, 'remove') &&
      message.remove.length > 0
    ) {
      removeStreams(message.remove)
    }

    if (
      Object.prototype.hasOwnProperty.call(message, 'mute') &&
      message.mute.length > 0
    ) {
      let streamsToMute = message.mute
      streamsToMute.forEach((s) => {
        audioMuted[s] = true
        muteStream(s)
      })
    }

    if (
      Object.prototype.hasOwnProperty.call(message, 'unmute') &&
      message.unmute.length > 0
    ) {
      let streamsToUnmute = message.unmute
      streamsToUnmute.forEach((s) => {
        audioMuted[s] = false
        unmuteStream(s)
      })
    }
  }

  const resizeGridIfNeeded = function (newStreamsCount) {
    let cols = colCount
    let rows = rowCount
    let currentGridSize = rows * cols
    const activeSubscribersCount = Object.keys(activeSubscribers).length
    while (currentGridSize < activeSubscribersCount + newStreamsCount) {
      cols += 1
      rows += 1
      currentGridSize = rows * cols
    }

    if (rows != rowCount || cols != colCount) {
      enlargeGrid(rows, cols)
    }
  }
  /**
   * Returns the new streams to subscribe to so they are in the composition
   */
  const getNewStreamsToAdd = function (activeStreams) {
    let streamsToAdd = []
    for (let stream of activeStreams) {
      if (!setStreamsToSubscribeTo.has(stream)) {
        streamsToAdd.push(stream)
        setStreamsToSubscribeTo.add(stream)
      }
    }
    return streamsToAdd
  }

  /**
   * Removes the specified streams from the composition.
   */
  const removeStreams = function (streams) {
    for (let stream of streams) {
      setStreamsToSubscribeTo.delete(stream)
      if (activeSubscribers[stream]) {
        activeSubscribersCount--
        activeSubscribers[stream].cancel()
        delete activeSubscribers[stream]
      }
    }
  }

  /**
   * Mutes the specified stream in the composition.
   */
  const muteStream = function (stream) {
    if (activeSubscribers[stream]) {
      activeSubscribers[stream].forceMuteOnSubscriber()
    }
  }

  /**
   * Unmutes the specified stream from the composition.
   */
  const unmuteStream = function (stream) {
    if (activeSubscribers[stream]) {
      activeSubscribers[stream].forceUnmuteOnSubscriber()
    }
  }

  const enlargeGrid = function (rows, cols) {
    const templateRows = '1fr '.repeat(rows)
    const templateCols = '1fr '.repeat(cols)
    sectionContainer.style['grid-template-rows'] = templateRows
    sectionContainer.style['grid-template-columns'] = templateCols

    const diffRows = rows - rowCount
    const diffCols = cols - colCount
    if (diffRows >= 0 && diffCols >= 0) {
      for (
        let i = 0;
        i < diffRows * colCount + diffCols * rowCount + diffCols;
        i++
      ) {
        const div = document.createElement('div')
        div.classList.add('box')
        sectionContainer.appendChild(div)
      }
    } else {
      console.warn(
        'Unsupported operation. Cannot remove columns and or rows from the grid'
      )
    }

    rowCount = rows
    colCount = cols
    slots = document.querySelectorAll('.box')
    resizeSlots()

    const imgs = Array(rowCount * colCount).fill(placeholderImage)
    setSubscriberImages(imgs)
  }

  /**
   * Sets placeholder images on the players to show the grid.
   */
  const setSubscriberImages = (images) => {
    const imgs = images.map((url) => {
      const img = document.createElement('img')
      img.src = url
      img.classList.add('slot-image')
      return img
    })
    slots.forEach((slot, index) => {
      if (slot.childNodes.length <= 0) {
        slot.appendChild(imgs[index])
      }
    })
  }

  // Main.
  resizeSlots()
  const imgs = Array(rowCount * colCount).fill(placeholderImage)
  setSubscriberImages(imgs)
  window.addEventListener('resize', resizeSlots, true)
  startSubscribersWorker()
})(window, window.red5prosdk, window.SubscriberBlock)
