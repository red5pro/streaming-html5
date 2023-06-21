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

  //  red5prosdk.setLogLevel('debug')
  const rowCount = window.query('rows') || 3
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
  const red5ProHost = window.query('host') || 'localhost' //configuration.host
  const streamManagerHost = configuration.host

  // Round Trip Authentication
  const username = window.query('username') || 'default-username'
  const password = window.query('password') || 'default-password'
  const token = JSON.stringify({
    token: window.query('token') || 'default-token',
    room: roomName,
  })

  // const layoutName = window.query('layoutname') || 'squaresmix'
  const sectionContainer = document.querySelector('.main-container')
  const slots = document.querySelectorAll('.box')

  let ipReg = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
  let localhostReg = /^localhost.*/
  let isIPOrLocalhost =
    ipReg.exec(red5ProHost) || localhostReg.exec(red5ProHost)
  let secureConnection = !isIPOrLocalhost
  let activeSubscribers = {}

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

  // UI Configurations
  const utilizeSubscriberNotifications = false

  /**
   * Returns next available slot in grid without a subscriber.
   *
   * @return {HTMLNode}
   */
  const findNextAvailableSlot = () => {
    console.log(slots, slots.length)
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

  /**
   * Creates and start subscribing to streams from the list.
   *
   * @param {Array} streamList
   *        A list of stream names.
   */
  const startSubscribers = (streamList) => {
    console.log('sub to ', streamList)
    if (Object.keys(activeSubscribers).length >= rowCount * rowCount) {
      console.warn(
        'Page is already subscribing to the maximum number of streams. Ignore new subscribe request'
      )
      return
    }
    console.log(
      `[mixer]:: Starting new subscribers from list: ${JSON.toString(
        streamList,
        null,
        2
      )}`
    )
    const subscribers = streamList.map((name) => {
      let freeSlot = findNextAvailableSlot()
      let bl = new SubscriberBlock(
        name,
        freeSlot,
        utilizeSubscriberNotifications
      )
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
    slots.forEach((slot) => {
      slot.style.width = `${slotWidth}px`
      slot.style.height = `${slotHeight}px`
    })
    sectionContainer.style.width = `${slotWidth * rowCount}px`
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

  /**
   * Processes the composition update messages sent by the Editor page and forwarded by the Node.js mixerServer.
   */
  const processCompositionUpdate = function (message) {
    if (
      Object.prototype.hasOwnProperty.call(message, 'add') &&
      message.add.length > 0
    ) {
      const streamsToAdd = getNewStreamsToAdd(message)
      startSubscribers(streamsToAdd)
    }

    if (
      Object.prototype.hasOwnProperty.call(message, 'remove') &&
      message.remove.length > 0
    ) {
      removeStreams(message)
    }

    if (
      Object.prototype.hasOwnProperty.call(message, 'mute') &&
      message.mute.length > 0
    ) {
      muteStreams(message)
    }

    if (
      Object.prototype.hasOwnProperty.call(message, 'unmute') &&
      message.unmute.length > 0
    ) {
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
        streamsToAdd.push(stream)
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
        const video = document.getElementById(
          activeSubscribers[stream].subscriptionId
        )
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
        const video = document.getElementById(
          activeSubscribers[stream].subscriptionId
        )
        if (video) {
          video.muted = false
        }
      }
    }
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
      slot.appendChild(imgs[index])
    })
  }

  // Main.
  //parseLayout(layoutName)
  resizeSlots()

  setSubscriberImages(
    new Array(9).fill('../../css/assets/Red5Pro_logo_white_red.svg')
  )

  window.addEventListener('resize', resizeSlots, true)
})(window, window.red5prosdk, window.SubscriberBlock)
