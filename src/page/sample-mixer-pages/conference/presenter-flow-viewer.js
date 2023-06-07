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

  /*const getRoomName = (context) => {
    const splits = context.split('/')
    if (splits.length > 1) {
      splits.splice(0, 1)
      return splits.join('/')
    }

    return context
  }*/

  const PARTICIPANT_APPENDIX = '_r5participator'

  const appContext = window.query('app')
  const roomName = window.query('room')

  const role = window.query('role') || undefined
  const host = window.query('host') || undefined
  const whipwhep = window.query('whipwhep') || 'false'
  const preferWhipWhep = !whipwhep ? false : !(whipwhep && whipwhep === 'false')
  const isHost = role === 'moderator'
  const isMixer = role === 'mixer'
  const requiresStreamManager = true
  const SM_ACCESS_TOKEN = window.query('smtoken')
  const ws = window.query('ws') || undefined

  const getConferenceRoomContext = () => {
    return `${appContext}/${roomName}`
  }

  // Round Trip Authentication
  const username = window.query('username') || 'default-username'
  const password = window.query('password') || 'default-password'
  const token = JSON.stringify({
    token: window.query('token') || 'default-token',
    room: getConferenceRoomContext(),
  })

  const presenterContainer = document.querySelector('.presenter-container')
  const sectionContainer = document.querySelector('.section-container')

  var protocol = serverSettings.protocol
  var secureConnection = protocol === 'https'
  function getSocketLocationFromProtocol() {
    return !secureConnection
      ? { protocol: 'ws', port: serverSettings.wsport }
      : { protocol: 'wss', port: serverSettings.wssport }
  }

  const wsEndpoint = secureConnection
    ? `wss://${ws}?testbed=conference&room=${getConferenceRoomContext()}&host=${isHost}&mixer=${isMixer}&presenter=1`
    : `ws://${ws}?room=${getConferenceRoomContext()}&host=${isHost}&mixer=${isMixer}&presenter=1`

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

  var baseConfig = Object.assign({}, config, {
    protocol: getSocketLocationFromProtocol().protocol,
    port: getSocketLocationFromProtocol().port,
    streamName: configuration.stream1,
    app: getConferenceRoomContext(),
    connectionParams: {
      host: configuration.host,
      app: getConferenceRoomContext(),
      username,
      password,
      token,
    },
  })

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
      guid: getConferenceRoomContext(),
      context: getConferenceRoomContext(),
      name: roomName,
    },
  }

  let websocket
  let streamListing = []
  let currentPresenterStreamName

  /**
   * Creates and start subscribing to streams from the list.
   *
   * @param {Array} streamList
   *        A list of stream names.
   */
  const startSubscribers = (streamList) => {
    console.log(
      `[conference]:: Starting new subscribers from list: ${streamList.join(
        ','
      )}`
    )
    const subscribers = streamList.map((name) => {
      const sub = new SubscriberBlock(name, sectionContainer)
      return sub
    })
    // Create linked-list and start subscribing.
    subscribers.forEach((sub, index) => {
      if (isHost) {
        decorateSubscriberForModeration(sub)
      }
      if (index < streamList.length - 1) {
        sub.next = subscribers[index + 1]
      }
      if (index === 0) {
        sub.execute(baseConfig, requiresStreamManager, preferWhipWhep)
      }
    })
  }

  /**
   * Starts a subscriber in the presentation section.
   *
   * @param {String} streamName
   */
  const startPresenter = (streamName, participantAppendix) => {
    const participantPresenter = `${streamName}${participantAppendix}`
    console.log(`[conference]: startPresenter(${streamName}).`)
    console.log(
      `[conference]: previous presenter was ${currentPresenterStreamName}.`
    )
    const isPresenting =
      window.streamsUtil.subscribers.find(currentPresenterStreamName) !==
      undefined
    const isActive =
      window.streamsUtil.subscribers.find(participantPresenter) !== undefined
    console.log(currentPresenterStreamName, participantPresenter, isPresenting)
    if (currentPresenterStreamName === participantPresenter && isPresenting) {
      return
    } else if ((!currentPresenterStreamName || !isPresenting) && !isActive) {
      const sub = new SubscriberBlock(participantPresenter, presenterContainer)
      if (isHost) {
        decorateSubscriberForModeration(sub)
      }
      sub.execute(baseConfig, requiresStreamManager, preferWhipWhep)

      // presenter update received from websocket
      if (
        currentPresenterStreamName &&
        currentPresenterStreamName != participantPresenter
      ) {
        swapPresenter(currentPresenterStreamName, participantPresenter)
      }
    } else {
      swapPresenter(currentPresenterStreamName, participantPresenter)
    }

    currentPresenterStreamName = participantPresenter
  }

  /**
   * Swaps placement in viewer container with presenter.
   *
   * @param {String} presenterName
   * @param {String} viewerName
   */
  const swapPresenter = (presenterName, viewerName) => {
    const {
      streamsUtil: { subscribers },
    } = window
    const presenterSub = subscribers.find(presenterName)
    const viewerSub = subscribers.find(viewerName)
    const presenter = presenterSub
      ? presenterSub.getElementContainer()
      : undefined
    const viewer = viewerSub ? viewerSub.getElementContainer() : undefined
    console.log(
      `[conference]: Swap Presenter from ${presenterName} to ${viewerName}.`
    )
    console.log(presenter, viewer, presenterSub, viewerSub)
    if (presenter && viewer) {
      presenterContainer.removeChild(presenter)
      if (viewer.previousSibling) {
        viewer.previousSibling.after(presenter)
      } else {
        viewer.nextSibling.before(presenter)
      }
      sectionContainer.removeChild(viewer)
      presenterContainer.appendChild(viewer)
    } else if (viewer) {
      sectionContainer.removeChild(viewer)
      presenterContainer.appendChild(viewer)
    } else if (presenter) {
      presenterContainer.removeChild(presenter)
      sectionContainer.appendChild(presenter)
    }
  }

  /**
   * Stops all subscriber streams in list.
   *
   * @see subscriber-block.js
   * @param {Array} streamList
   *        List of stream names.
   */
  const stopSubscribers = (streamList, participantAppendix) => {
    streamList.forEach((name) => {
      // The window.streamsUtil.subscribers Utility is created in subscriber-block.js
      window.streamsUtil.subscribers.stop(name)
      window.streamsUtil.subscribers.stop(`${name}${participantAppendix}`)
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
    } else if (split[split.length - 1] === PARTICIPANT_APPENDIX) {
      if (split.length > 2) {
        return name.replace(PARTICIPANT_APPENDIX, '')
      }
    }
    return split[0]
  }

  /**
   * Decorates the UI and exclusion abilities on a subscriber for a moderator.
   *
   * @param {SubscriberBlock} subscriber
   */
  const decorateSubscriberForModeration = (subscriber) => {
    var bar = document.createElement('p')
    var removeButton = document.createElement('button')
    var removeLabel = document.createTextNode('remove from conference')
    var swapButton = document.createElement('button')
    var swapLabel = document.createTextNode('make presenter')
    var exclusionButton = document.createElement('button')
    var exclusionLabel = document.createTextNode('ban')
    bar.classList.add('subscriber-moderation-field')
    removeButton.appendChild(removeLabel)
    swapButton.appendChild(swapLabel)
    exclusionButton.classList.add('subscriber-exclusion-button')
    exclusionButton.appendChild(exclusionLabel)
    bar.appendChild(swapButton)
    bar.appendChild(removeButton)
    bar.appendChild(exclusionButton)
    subscriber.getElementContainer().appendChild(bar)
    exclusionButton.addEventListener('click', () => {
      const streamName = devariantStreamName(subscriber.getStreamName())
      // Note [TODO]:: streamName is now the top level GUID if transcoding.
      onModeratorExcludeStream(getConferenceRoomContext(), streamName)
    })
    removeButton.addEventListener('click', () => {
      const streamName = devariantStreamName(subscriber.getStreamName())
      // Note [TODO]:: streamName is now the top level GUID if transcoding.
      onModeratorRemoveConferenceStream(getConferenceRoomContext(), streamName)
    })
    swapButton.addEventListener('click', () => {
      const streamName = devariantStreamName(subscriber.getStreamName())
      onModeratorSwapPresenterStream(baseConfig.app, streamName)
    })
  }

  /**
   * Calls websocket to switch presenter of conference.
   *
   * @param {String} room
   * @param {String} streamNameToPresenter
   */
  const onModeratorSwapPresenterStream = (room, streamNameToPresent) => {
    if (currentPresenterStreamName === streamNameToPresent) return
    console.log(
      `[conference]: Swapping presenter from ${currentPresenterStreamName} to ${streamNameToPresent}.`
    )
    websocket.send(
      JSON.stringify({
        type: 'presenter',
        room: room,
        streamName: streamNameToPresent,
      })
    )
  }

  /**
   * Calls websocket to promote a target stream to a conference.
   *
   * @param {String} room
   * @param {String} name
   */
  const onModeratorRemoveConferenceStream = (room, name) => {
    websocket.send(
      JSON.stringify({
        type: 'demote',
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
   * @param {String} presenterStreamName
   *        Optional name of presenter stream that should be stripped.
   */
  const parseStreamList = (list, presenterStreamName, participantAppendix) => {
    // Flatten the list if the array is of objects in structure {name: `stream1`}.
    let flattened = list.map((item) => {
      if (typeof item !== 'string') {
        return `${item.name}${participantAppendix}`
      }
      return `${item}${participantAppendix}`
    })
    // Only using `_r5participator` streams with RTCCConferenceParticipants
    let nonPresenter = flattened.filter(
      (item) => item !== `${presenterStreamName}${participantAppendix}`
    )
    // Find those that are new.
    const newListings = nonPresenter.filter((item) => {
      return streamListing.indexOf(item.replace(participantAppendix, '')) === -1
    })
    // Find those that are old, no longer active.
    let strippedListings = []
    streamListing.forEach((name) => {
      /*
      if (nonPresenter.indexOf(name) === -1 &&
        name !== presenterStreamName) {
        strippedListings.push(name)
      }
      */
      if (list.indexOf(name) == -1) {
        // && name != presenterStreamName) {
        strippedListings.push(name)
      }
    })
    // Remove all subscribers that are inactive.
    if (strippedListings.length > 0) {
      stopSubscribers(strippedListings, participantAppendix)
    }
    // Add all newly active subscribers.
    if (newListings.length > 0) {
      startSubscribers(newListings)
    }
    streamListing = list
    console.log(
      `[conference] :: Current participant stream listing: ${streamListing}.`
    )
    console.log(`[conference] :: Remove ${strippedListings}`)
    console.log(`[conference] :: Add ${newListings}`)
    console.log(`[conference] :: Presenter ${presenterStreamName}`)
  }

  /**
   * Sets up the WebSocket connection to listen for updates on "active" and "excluded" streams.
   *
   * @see mock-fetch.js
   * @param {String} url
   *        The websocket url to connect to.
   */
  const setUpStreamListSocket = (url) => {
    websocket = new WebSocket(url)
    /*
    websocket.onopen = () => {
    onModeratorRemoveConferenceStream('nextechar/xyz0', 'stream2')
    }
    */

    websocket.onmessage = (event) => {
      console.log('[websocket]::onmessage')
      console.log(event)
      // Note: expecting list as array of stream name strings.
      let json = event.data
      if (typeof json === 'string') {
        json = JSON.parse(event.data)
      }
      if (
        json.type === 'conference' &&
        json.room === getConferenceRoomContext()
      ) {
        json.hasOwnProperty('streams') &&
          parseStreamList(json.streams, json.presenter, '') // PARTICIPANT_APPENDIX)
        json.hasOwnProperty('presenter') && startPresenter(json.presenter, '') // PARTICIPANT_APPENDIX)
      }
      if (json.type === 'error') {
        console.warn(json)
      }
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

  const postProvision = async (provision) => {
    try {
      await window.streamManagerUtil.postProvision(
        baseConfig.host,
        provision,
        SM_ACCESS_TOKEN
      )
    } catch (e) {
      throw e
    }
  }

  // Main.
  const start = async () => {
    try {
      await postProvision(confProvision)
    } catch (e) {
      console.error(e)
    }
    setUpStreamListSocket(wsEndpoint)
  }

  let focused = document.querySelector('.a')
  const boxes = document.querySelectorAll('.box')
  const presenter = document.querySelector('.presenter-container')
  const viewers = document.querySelector('.section-container')
  boxes.forEach((box) => {
    box.addEventListener('click', (event) => {
      const target = event.currentTarget
      if (target === focused) return
      presenter.removeChild(focused)
      if (target.previousSibling) {
        target.previousSibling.after(focused)
      } else {
        target.nextSibling.before(focused)
      }
      viewers.removeChild(target)
      presenter.appendChild(target)
      focused = target
    })
  })

  start()
})(window, window.red5prosdk, window.SubscriberBlock)
