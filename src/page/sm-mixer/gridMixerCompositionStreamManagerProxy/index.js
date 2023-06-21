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
 * Editor Page allows for compositing which live stream should be accessed by which Mixer for composing.
 */
;((window, red5prosdk) => {
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

  const appName = getAppName(configuration.app)
  const roomName = getRoomName(configuration.app)

  // const whipwhep = window.query('whipwhep') || 'true'
  // const preferWhipWhep = !whipwhep ? false : !(whipwhep && whipwhep === 'false')
  // [2023-06-02] NOTE: Conference Participants and Compositors currently do not support WHIP/WHEP.
  const preferWhipWhep = false

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

  const COUNT = 6

  const websocketEndpoint = configuration.mixerBackendSocketField
  const red5ProHost = configuration.host
  const smToken = configuration.streamManagerAccessToken

  document.getElementById('streamName').value = configuration.stream1
  document.getElementById('mixerName').value = Math.floor(
    Math.random() * 0x1000000
  ).toString(16)

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

  const createMixersForm = document.getElementById('create-mixers-form')
  if (createMixersForm.attachEvent) {
    createMixersForm.attachEvent('submit', processCreateMixersForm)
  } else {
    createMixersForm.addEventListener('submit', processCreateMixersForm)
  }

  const selectBox = document.getElementById('event-name-select')
  const destroyCompositionButton = document.getElementById(
    'destroy-composition-button'
  )
  const eventStateText = document.getElementById('event-state')
  const autoProvision = document.getElementById('add-stream-automatically')
  autoProvision.addEventListener('change', () => {
    if (autoProvision.checked) {
      requestActiveStreams()
    }
  })

  let compositionEventName = null
  let activeComposition = null
  let existingCompositions = []

  const mainContainer = document.querySelector('.main-container')
  const mediaListContainer = document.querySelector('.media-list-container')
  const mixerContainer = document.querySelector('.mixer-container')
  let slots = mixerContainer.querySelectorAll('.box')
  const mixingPageSelector = document.getElementById('mixingPage-select')

  mainContainer.style['max-width'] = window.innerWidth

  // Subscriber initialization configurations.
  let ipReg = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
  let localhostReg = /^localhost.*/

  let webSocket
  let isIPOrLocalhost =
    ipReg.exec(websocketEndpoint) || localhostReg.exec(websocketEndpoint)
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
        audio: configuration.useAudio
          ? configuration.mediaConstraints.audio
          : false,
        video: configuration.useVideo
          ? configuration.mediaConstraints.video
          : false,
      },
    }
  }

  /**
   * Event listener for drag start on subscriber blocks.
   */
  const onDragStart = (event) => {
    const { target } = event
    event.dataTransfer.setData('text/plain', target.dataset.name)
    event.dataTransfer.effectAllowed = 'move'
  }

  /**
   * Event listener for drag over on subscriber blocks.
   */
  const onDragOver = (event) => {
    const { currentTarget } = event
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
   * Event listener for drag out on subscriber blocks.
   */
  const onDragOut = (event) => {
    const { currentTarget } = event
    currentTarget.classList.remove('box-drag-over')
  }

  /**
   * Event listener for drag drop on subscriber blocks.
   */
  const onDrop = (event) => {
    const { currentTarget, dataTransfer } = event
    event.preventDefault()
    const data = dataTransfer.getData('text/plain')
    currentTarget.classList.remove('box-drag-over')
    updateSlotsOnSwap(data, currentTarget)
  }

  /**
   * Creates a list item displaying the provided stream name and
   *  button to add it to a switchable channel.
   */
  const createListItem = (name) => {
    const uid = Math.floor(Math.random() * 0x10000).toString(16)
    const item = document.createElement('div')
    const p = document.createElement('p')
    const label = document.createTextNode(name)
    p.appendChild(label)

    item.appendChild(p)
    //item.appendChild(divChannelAction)
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
  const removeMediaFromPrevious = (name) => {
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
  const getSlotIdFromStreamName = (name) => {
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
  const getMixerIdFromStreamName = (name) => {
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
  let counter = 0
  let numberOfMixers = 0
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

    console.log('current stream list', currentStreamListing)
    const payload = compareLists(currentStreamListing, streamNames)
    console.log(payload, currentStreamListing)
    addStreams(payload.added)
    removeStreams(payload.removed)

    if (autoProvision.checked) {
      console.log('auto provisioning mixers')
      autoProvisionMixers(payload.added)
    }

    console.log('new stream list', streamNames)
    currentStreamListing = streamNames
  }

  function autoProvisionMixers(streamsToAdd) {
    if (activeComposition == null) {
      console.log('no composition selected, ignoring auto provisioning')
      return
    }

    console.log(compositeStreamToDestinationMixerName)
    console.log(mixerNameToMixerBox)
    streamsToAdd.forEach((stream) => {
      console.log(stream)
      // if composite stream
      let slot
      if (
        Object(compositeStreamToDestinationMixerName).hasOwnProperty(stream)
      ) {
        const destName = compositeStreamToDestinationMixerName[stream]
        if (destName == '') {
          console.log(`Skipping ${stream} because it is final composite stream`)
          return
        }

        if (!mixerNameToMixerBox[destName]) {
          console.log(`Could not find box for mixer ${destName}`)
          return
        }
        slot = mixerNameToMixerBox[destName]
        console.log(`adding ${stream} to ${destName}`)
        updateSlotsOnSwap(stream, slot)
        return
      }

      console.log(counter, mixerBoxes.length)
      let nextMixer = parseInt(counter) % mixerBoxes.length
      counter += 1
      slot = mixerBoxes[nextMixer]
      console.log(slot)
      console.log(`adding ${stream} to ${nextMixer}`)
      updateSlotsOnSwap(stream, slot)
    })
  }

  // Simple list comparison.
  const compareLists = (previousList, newList) => {
    let added = []
    let removed = []
    added = newList.filter((item) => {
      return previousList.indexOf(item) === -1
    })
    previousList.forEach((item) => {
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
    // add only streams that are not already in a mixer box
    // find streams already in mixer boxes (added by parsing the active composition message)
    const mixerContainers = document.getElementsByClassName('mixer-container')
    let mixerStreams = []
    for (let i = 0; i < mixerContainers.length; i++) {
      const items = mixerContainers
        .item(i)
        .getElementsByClassName('media-list-item')
      for (let j = 0; items && j < items.length; j++) {
        const item = items[j]
        const streamName = item.dataset.name
        mixerStreams.push(streamName)
      }
    }

    if (currentStreamListing.length == 0) {
      mediaListContainer.querySelector('.list-holder').innerHTML = ''
    }
    const subscribers = streams.map((name) => {
      if (mixerStreams.indexOf(name) >= 0) {
        console.log('Ignore stream ', name)
        return null
      }

      return createListItem(name)
    })

    subscribers.forEach((item) => {
      if (item) {
        mediaListContainer.querySelector('.list-holder').appendChild(item)
      }
    })
  }

  /**
   * Remove stream names from the list to select from.
   */
  const removeStreams = (streams) => {
    if (!streams) return
    console.log(`Remove streams: ${streams.join(',')}`)
    let removeMap = {}
    streams.forEach((name) => {
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
    Object.keys(removeMap).forEach((key) => {
      const list = removeMap[key]
      webSocket.send(
        JSON.stringify({
          type: 'compositionUpdate',
          event: compositionEventName,
          list: [
            {
              'cef-id': key,
              remove: list,
            },
          ],
        })
      )
    })
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
      webSocket.send(JSON.stringify(payload))

      // move streams from mixers to main list
      const streamItems =
        mixerContainer.getElementsByClassName('media-list-item')
      if (streamItems) {
        const destinationSlot = document
          .getElementsByClassName('list-holder')
          .item(0)
        let i = streamItems.length - 1
        while (i >= 0) {
          updateSlotsOnSwap(
            streamItems.item(i).dataset.name,
            destinationSlot,
            false
          )
          i = streamItems.length - 1
        }
      }

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
    const selectedValue = selectBox.options[selectBox.selectedIndex].value

    if (selectedValue != '') {
      compositionEventName = selectedValue
      // clean up
      const emptyOption = selectBox.childNodes.item(0)
      selectBox.innerHTML = ''
      selectBox.appendChild(emptyOption)
      mixerContainer.innerHTML = ''
      currentStreamListing = []
      requestActiveStreams()
      // get updated list
      requestActiveCompositions()
    } else {
      // clean up
      compositionEventName = null
      activeComposition = null
      mixerContainer.innerHTML = ''
      eventStateText.innerHTML = ''
      destroyCompositionButton.disabled = true
      currentStreamListing = []
      //mediaListContainer.querySelector('.list-holder').innerHTML = ''
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

    webSocket.send(JSON.stringify(payload))
  }

  /*
   * Request active streams from WebSocket server
   */
  const requestActiveStreams = () => {
    const payload = {
      type: 'getActiveStreams',
    }

    webSocket.send(JSON.stringify(payload))
  }

  /**
   * Parses the activeCompositions messages from the websocket and updates the UI.
   */
  const parseCompositions = (json) => {
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
      if (activeComposition == null) {
        activeComposition = composition
        numberOfMixers = composition.mixers.length
      }

      //const compositionContext = composition.context
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
          mixerName: mixer.mixerName,
          context: mixer.path,
          name: mixer.streamName,
          destinationMixerName: mixer.destinationMixerName,
        })
      })

      const htmlEventStateText = document.getElementById('event-state')
      htmlEventStateText.innerHTML = areAllConnected
        ? 'State: Composing'
        : 'State: Pending'
      if (mixerContainer.children.length <= 0) {
        createMixerBoxes(mixerObj)
        resizeSlots()
      }

      updateSlotStreams(mixers)
    }
  }

  // Uncomment to test auto provision of streams to composition
  // setTimeout(() => {
  //   compositionEventName = "event1"
  //   if (!webSocket) {
  //     webSocket = {
  //       send: () => {
  //         console.log('send')
  //       }
  //     }
  //   }
  //   const comp = {
  //     "type": "activeCompositions", "list": [
  //       {
  //         "event": "event1", "transcodeComposition": false, "digest": "password", "location": ["nyc1"],
  //         "mixers": [
  //           {
  //             "id": "red5pro-sm-node-nyc1-0634836652196", "mixerName": "a", "location": "nyc1",
  //             "mixingPage": "hh/2x2/",
  //             "streamName": "final", "path": "live", "destinationMixerName": "", "serverAddress": "",
  //             "destination": "", "width": 1280, "height": 720, "framerate": 30, "bitrate": 1500,
  //             "doForward": true, "state": "INSERVICE", "streams": { "muted": [], "unmuted": [] }
  //           },
  //           {
  //             "id": "red5pro-sm-node-nyc1-2634836652196", "mixerName": "b", "location": "nyc1",
  //             "mixingPage": "hh/3x3/",
  //             "streamName": "b", "path": "live", "destinationMixerName": "a", "serverAddress": "",
  //             "destination": "a", "width": 1280, "height": 720, "framerate": 30, "bitrate": 1500,
  //             "doForward": true, "state": "INSERVICE", "streams": { "muted": [], "unmuted": [] }
  //           },
  //           {
  //             "id": "red5pro-sm-node-nyc1-3634836652196", "mixerName": "c", "location": "nyc1",
  //             "mixingPage": "hh/2x2/",
  //             "streamName": "c", "path": "live", "destinationMixerName": "a", "serverAddress": "",
  //             "destination": "a", "width": 1280, "height": 720, "framerate": 30, "bitrate": 1500,
  //             "doForward": true, "state": "INSERVICE", "streams": { "muted": [], "unmuted": [] }
  //           }]
  //       }]
  //   }
  //   parseCompositions(comp)

  //   let count = 0
  //   let streams = []
  //   let sNames = ['final', 'b', 'c', 'n1', 'n2', 'n3', 'b2', 'c2', 'n12', 'n22', 'n32']
  //   let interval = setInterval(() => {
  //     console.log('run interval')
  //     if (count <= 5) {
  //       streams.push(sNames.at(count))
  //     } else {
  //       console.log('clear stream ', streams.at(streams.length - 1))
  //       streams.splice(streams.length - 3, 3)
  //     }
  //     count++
  //     const mockActiveStreams = { "type": "activeStreams", "list": [{ "room": "/live", streams }] }
  //     try {
  //       parseStreams(mockActiveStreams)
  //     } catch (e) {

  //     }
  //     console.log('count: ', count)

  //     if (count > 6) {
  //       console.log('clear interval')
  //       clearInterval(interval)
  //       destroyComposition()
  //     }
  //   }, 1000)
  // }, 3000)

  /*
   * Launch a mixer subscriber using the given configuration
   */
  const subscribe = async (mixerId, rtcConfig) => {
    const { WHEPClient, RTCSubscriber } = red5prosdk
    const rtcSubscriber = preferWhipWhep
      ? new WHEPClient()
      : new RTCSubscriber()
    console.log(rtcConfig)
    rtcSubscriber
      .init(rtcConfig)
      .then(function () {
        rtcSubscriber.subscribe()
      })
      .then(function () {
        console.log('Playing!')
        mixerSubscribers[mixerId] = rtcSubscriber
      })
      .catch(function (err) {
        console.log('Could not play: ' + err)
        subscribeRetry(3000, mixerId, rtcConfig)
      })
  }

  /*
   * Returns the URL to use to check for stream availability
   */
  const getAvailableUrlBasedOnConfig = (config, sm = false) => {
    console.log(config)
    const { host, port, app } = config
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
    window.setTimeout(
      (mixerId, config) => {
        subscribe(mixerId, config)
      },
      wait,
      mixerId,
      config
    )
  }

  /**
   * Adds streams to target mixer slots.
   */
  const updateSlotStreams = (mixers) => {
    slots.forEach((slot, index) => {
      // update mixer Online/Offline state
      const state = mixers[index].isWebSocketConnected ? 'Online' : 'Offline'
      const p = slot.querySelector('.mixer-name-and-state')
      p.innerHTML =
        p.innerHTML.substring(0, p.innerHTML.indexOf('-')) + '- ' + state

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

      console.log(
        `UPDATE ${mixerId}, with muted streams ${mutedStreamNames.join(
          ','
        )} and unmuted streams ${unmutedStreamNames.join(',')}`
      )
      const mutedList = slot.querySelector('.list-holder-muted')
      const unmutedList = slot.querySelector('.list-holder-unmuted')
      mutedStreamNames.forEach((streamName) => {
        let exists = mutedList.querySelector(
          escape(`[data-name=${streamName}]`)
        )
        if (!exists || exists.length === 0) {
          removeMediaFromPrevious(streamName)
          addMediaToBox(streamName, mutedList)
        }
      })
      unmutedStreamNames.forEach((streamName) => {
        let exists = unmutedList.querySelector(
          escape(`[data-name=${streamName}]`)
        )
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
  const updateSlotsOnSwap = (streamName, slot, notifyWebSocket = true) => {
    console.log('updateSlotsOnSwap: update ', streamName, 'to', slot)
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

    if (!canAdd(streamName, mixerId, slot)) {
      alert(`Mixer ${mixerId} is at maximum capacity`)
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
      } else {
        unmute.push(streamName)
      }

      updateList.push({
        'cef-id': mixerId,
        add,
        mute,
        unmute,
      })
    }
    if (
      previousMixerId &&
      slotId != previousMixerId &&
      previousMixerId != 'stream-list-container'
    ) {
      let remove = []
      if (mixerId != previousMixerId) {
        remove = [streamName]
      }
      updateList.push({
        'cef-id': previousMixerId,
        remove,
      })
    }

    if (notifyWebSocket) {
      webSocket.send(
        JSON.stringify({
          type: 'compositionUpdate',
          event: compositionEventName,
          list: updateList,
        })
      )
    }
  }

  const canAdd = (streamName, destinationMixerId, slot) => {
    const mixers = activeComposition.mixers
    const mixerGridLimit = {}
    mixers.forEach((mixer) => {
      if (mixer.mixingPage.indexOf('2x2') >= 0) {
        mixerGridLimit[mixer.id] = 4
      } else if (mixer.mixingPage.indexOf('3x3') >= 0) {
        mixerGridLimit[mixer.id] = 9
      } else if (mixer.mixingPage.indexOf('7x7') >= 0) {
        mixerGridLimit[mixer.id] = 49
      }
    })

    console.log('Found grid limits: ', mixerGridLimit)
    const streamsInComposition =
      slot.parentNode.getElementsByClassName('media-list-item')
    console.log('Streams already in this mixer', streamsInComposition)
    // if already present then add as its switching between mute/unmute
    for (let i = 0; i < streamsInComposition.length; i++) {
      if (streamsInComposition.item(i).dataset.name == streamName) {
        return true
      }
    }

    return !(
      mixerGridLimit[destinationMixerId] &&
      mixerGridLimit[destinationMixerId] <= streamsInComposition.length
    )
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

    //console.log(`Screen ${ width }x${ height }`)
    //console.log('New slot width ' + slotWidth)
    //console.log('New slot height ' + slotHeight)
    slots.forEach((slot) => {
      slot.style.height = `${slotHeight}px`
      const list = slot.querySelector('.list-holder')
      if (list) list.style.height = `${slotHeight - 20}px`
      const mutedList = slot.querySelector('.list-holder-muted')
      if (mutedList) mutedList.style.height = `${slotHeight / 2}px`
      const unmutedList = slot.querySelector('.list-holder-unmuted')
      if (unmutedList) unmutedList.style.height = `${slotHeight / 2}px`
    })

    const containerWidth =
      rows == 1 ? `${slotWidth * rows}px` : `${slotWidth * 3}px`
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
    webSocket.onmessage = (event) => {
      console.log('[websocket]::onmessage')
      console.log(event)
      let json = event.data
      if (typeof json === 'string') {
        json = JSON.parse(event.data)
      }

      if (json.type === 'activeStreams') {
        parseStreams(json)
      } else if (json.type === 'activeCompositions') {
        parseCompositions(json)
      } else if (json.type === 'mixerRegions') {
        parseMixerRegions(json.regions)
        return
      } else if (json.type === 'error') {
        console.warn(json)
      } else {
        console.log('Unrecognized message received.', event.data)
      }
    }
    webSocket.onopen = () => {
      console.log('[websocket]::open')
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

  const getMixingPageFromSelector = (selection) => {
    if (selection === '2x2') {
      return `https://${red5ProHost}/webrtcexamples/sample-mixer-pages/2x2/index.html?sm=true&app=${appName}&ws=${websocketEndpoint}`
    } else if (selection === '3x3') {
      return `https://${red5ProHost}/webrtcexamples/sample-mixer-pages/3x3/index.html?sm=true&app=${appName}&ws=${websocketEndpoint}`
    } else if (selection === '7x7') {
      return `https://${red5ProHost}/webrtcexamples/sample-mixer-pages/7x7/index.html?sm=true&app=${appName}&ws=${websocketEndpoint}`
    } else {
      return `https://${red5ProHost}/webrtcexamples/sample-mixer-pages/nxn/index.html?sm=true&app=${appName}&ws=${websocketEndpoint}`
    }
  }

  const isValidString = (string) => {
    return string.length <= 255 && !!string.match(/^[\/0-9-_A-Za-z]+$/)
  }

  let mixers = []
  function processCreateMixersForm(e) {
    if (e.preventDefault) e.preventDefault()

    const mixerName = document.getElementById('mixerName').value
    //let mixingPage = document.getElementById('mixingPage').value
    const path = document.getElementById('scope').value
    const streamName = document.getElementById('streamName').value
    const width = String(document.getElementById('width').value)
    const height = String(document.getElementById('height').value)
    const framerate = document.getElementById('framerate').value
    const bitrate = document.getElementById('bitrate').value
    const destinationMixerName = document.getElementById(
      'destinationMixerName'
    ).value
    const doForward = true
    let mixingPage = getMixingPageFromSelector(
      mixingPageSelector.options[mixingPageSelector.selectedIndex].value
    )

    if (
      mixerName === '' ||
      path === '' ||
      streamName === '' ||
      width === '' ||
      height === '' ||
      framerate === '' ||
      bitrate === ''
    ) {
      alert(
        'Invalid data found in Create Mixer Objects form. Only "Destination Mixer Name" can be left empty.'
      )
      return
    } else if (streamName.indexOf('.') >= 0) {
      alert('Stream Name cannot contain periods (.)')
      return
    }

    // this will inform the page that it is the final layer so the page can adapt as needed
    if (mixers.length > 0 && destinationMixerName == '') {
      mixingPage = `${mixingPage}&layer=final`
    }

    if (
      !isValidString(mixerName) ||
      !isValidString(path) ||
      !isValidString(streamName)
    ) {
      alert(
        `Mixer Name, Path and Stream Name must be alphanumeric and shorter than 256 characters`
      )
      return
    }

    if (destinationMixerName != '' && !isValidString(destinationMixerName)) {
      alert(
        `Destination Mixer Name must be empty, or alphanumeric and shorter than 256 characters`
      )
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
      destinationMixerName,
    }
    mixers.push(mixerObj)

    const id = Math.random().toString(36).substring(7)
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
    document
      .getElementById(`${id}-button`)
      .addEventListener('click', function () {
        this.classList.toggle('active')
        var content = this.nextElementSibling
        if (content.style.display === 'block') {
          content.style.display = 'none'
        } else {
          content.style.display = 'block'
        }
      })

    document
      .getElementById(`remove-${id}`)
      .addEventListener('click', function () {
        const index = this.id.split('-')[0]
        mixers.splice(index, 1)

        document
          .getElementById('mixers')
          .removeChild(document.getElementById(`${id}-content`))
        document
          .getElementById('mixers')
          .removeChild(document.getElementById(`${id}-button`))
      })

    document.getElementById('create-mixers-form').reset()
    document.getElementById('mixerName').value = Math.floor(
      Math.random() * 0x1000000
    ).toString(16)
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
    const transcodeComposition = document.getElementById(
      'transcodeComposition'
    ).checked
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

    if (mixers.length <= 0) {
      alert(`At least one mixer must be provided`)
      return
    } else if (eventName == '' || digest == '' || location == '') {
      alert(`"Event Name", "Digest" and "Mixer Region" must include a value.`)
      return
    }

    if (
      !isValidString(eventName) ||
      !isValidString(digest) ||
      !isValidString(location)
    ) {
      alert(
        `Event Name, Digest and Location must be alphanumeric and shorter than 256 characters`
      )
      return
    }

    numberOfMixers = mixers.length

    // add event-id so we can identify what event a mixer is handling
    mixers.forEach((mixer) => {
      mixer.mixingPage = `${mixer.mixingPage}&event-id=${eventName}`
    })

    const createCompositionMessage = {
      type: 'createComposition',
      event: eventName,
      digest,
      transcodeComposition,
      mixers,
      location: [location],
    }

    webSocket.send(JSON.stringify(createCompositionMessage))
    console.log('create composition message submitted')
    console.log(createCompositionMessage)

    compositionEventName = eventName
    eventStateText.innerHTML = `State: Pending`

    //document.getElementById('create-composition-form').reset()
    //document.getElementById('create-mixers-form').reset()
    mixers = []
    document.getElementById('mixers').innerHTML = ''
    //mixingPage.value = `https://${red5ProHost}/webrtcexamples/sample-mixer-pages/3x3/index.html?sm=true&app=${appName}&ws=${websocketEndpoint}`
    //document.getElementById('streamName').value = configuration.stream1

    // return false to prevent the default form behavior
    return false
  }

  /*
   * Creates the UI for the Mixer boxes
   */
  const mixerBoxes = []
  const mixerNameToMixerBox = {}
  const compositeStreamToDestinationMixerName = {}
  const createMixerBoxes = (mixerObjs) => {
    for (let i = 0; i < mixerObjs.length; i++) {
      let unmutedPElement = document.createElement('p')
      unmutedPElement.innerHTML = `Unmuted`
      let unmutedListHolderElement = document.createElement('div')
      unmutedListHolderElement.classList.add('list-holder-unmuted')
      unmutedListHolderElement.dataset.listId = Math.floor(
        Math.random() * 0x1000000
      ).toString(16)

      let mutedPElement = document.createElement('p')
      mutedPElement.innerHTML = `Muted`
      let mutedListHolderElement = document.createElement('div')
      mutedListHolderElement.classList.add('list-holder-muted')
      mutedListHolderElement.dataset.listId = Math.floor(
        Math.random() * 0x1000000
      ).toString(16)

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
      compositeStreamToDestinationMixerName[
        `/${mixerObjs[i].context}/${mixerObjs[i].name}`
      ] = mixerObjs[i].destinationMixerName
      mixerNameToMixerBox[mixerObjs[i].mixerName] = unmutedListHolderElement
      if (mixerObjs.length <= 1 || mixerObjs[i].destinationMixerName != '') {
        mixerBoxes.push(unmutedListHolderElement)
      }
    }

    console.log('create mixer boxes')
    console.log(compositeStreamToDestinationMixerName)
    console.log(mixerNameToMixerBox)

    slots = mixerContainer.querySelectorAll('.box')
    const mixerUnmutedLists = mixerContainer.querySelectorAll(
      '.list-holder-unmuted'
    )
    const mixerMutedLists =
      mixerContainer.querySelectorAll('.list-holder-muted')
    const streamList = mediaListContainer.querySelectorAll('.list-holder')
    Array.from(mixerUnmutedLists)
      .concat(Array.from(mixerMutedLists))
      .concat(Array.from(streamList))
      .forEach((list) => {
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
  const webSocketEndpoint = `${baseWebSocketUrl}?testbed=grid&type=manager&id=${uid}`
  setUpWebSocket(webSocketEndpoint)

  // Cheap way to shut things down on navigate away from page.
  const shutdown = async () => {
    if (webSocket) {
      webSocket.close()
    }
  }

  window.addEventListener('pagehide', shutdown)
  window.addEventListener('beforeunload', shutdown)
})(window, window.red5prosdk)
