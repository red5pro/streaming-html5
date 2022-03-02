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

  const websocketEndpoint = configuration.mixerBackendSocketField
  const smToken = configuration.streamManagerAccessToken
  // guid of the stream published by the final mixer, eg. live/stream1
  // player subscribes to this
  let compositeStreamDetails = {
    path: null, streamName: null, width: null, height: null
  }

  document.getElementById('streamName').value = configuration.stream1
  document.getElementById('mixerName').value = Math.floor(Math.random() * 0x1000000).toString(16)

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
  const autoProvision = document.getElementById('add-stream-automatically')
  autoProvision.addEventListener("change", () => {
    if (autoProvision.checked) {
      requestActiveStreams()
    }
  });

  let compositionEventName = null
  let activeComposition = null
  let existingCompositions = []

  const mainContainer = document.querySelector('.main-container')
  //const mixerContainer = document.querySelector('.mixer-container')
  const streamNameControlSelector = document.getElementById('stream-control-select')
  const activeStreamsSelector = document.getElementById('active-streams-select')
  const destinationMixerSelector = document.getElementById('destination-mixer-select')
  const mixerControlSelector = document.getElementById('mixer-control-select')
  //let slots = mixerContainer.querySelectorAll('.box')

  mainContainer.style['max-width'] = window.innerWidth

  // Subscriber initialization configurations.
  let ipReg = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
  let localhostReg = /^localhost.*/

  let webSocket
  let isIPOrLocalhost = ipReg.exec(websocketEndpoint) || localhostReg.exec(websocketEndpoint)
  let secureConnection = !isIPOrLocalhost
  let wsProtocol = isIPOrLocalhost ? 'ws' : 'wss'
  const baseWebSocketUrl = `${wsProtocol}://${websocketEndpoint}`
  var protocol = serverSettings.protocol;

  let mixerSubscribers = {}

  const nodeGraphMap = {}

  const defaultNodeGraph = {
    "rootVideoNode": {
      "node": "CompositorNode",
      "nodes": [
        {
          "red": 0.0,
          "green": 0.0,
          "blue": 0.0,
          "alpha": 1.0,
          "node": "SolidColorNode"
        }
      ]
    },
    "rootAudioNode": {
      "node": "SumNode",
      "nodes": [
      ]
    }
  }


  const videoSourceNodeTemplate = {
    "streamGuid": "live/stream1",
    "sourceX": 0,
    "sourceY": 0,
    "sourceWidth": -1,
    "sourceHeight": -1,
    "destX": 160,
    "destY": 120,
    "destWidth": 320,
    "destHeight": 240,
    "node": "VideoSourceNode"
  }

  const audioSourceNodeTemplate = {
    "streamGuid": "live/stream1",
    "pan": 0.0,
    "gain": 0.0,
    "node": "AudioSourceNode"
  }

  function getUserMediaConfiguration() {
    return {
      mediaConstraints: {
        audio: configuration.useAudio ? configuration.mediaConstraints.audio : false,
        video: configuration.useVideo ? configuration.mediaConstraints.video : false
      }
    };
  }

  var updateStatusFromEvent = function (event) {
    var subTypes = red5prosdk.SubscriberEventTypes;
    switch (event.type) {
      case subTypes.CONNECT_FAILURE:
      case subTypes.SUBSCRIBE_FAIL:
        shutdownVideoElement();
        break;
    }
    window.red5proHandleSubscriberEvent(event); // defined in src/template/partial/status-field-subscriber.hbs
  };

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

  function escape(str) {
    return (str + '').replace(/[/"']/g, '\\$&')
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

    //console.log('current stream list', currentStreamListing)
    const payload = compareLists(currentStreamListing, streamNames)
    //console.log(payload, currentStreamListing)
    addStreams(payload.added)
    removeStreams(payload.removed)

    if (autoProvision.checked) {
      console.log('auto provisioning mixers')
      autoProvisionMixers(payload.added)
    }

    //console.log('new stream list', streamNames)
    currentStreamListing = streamNames
  }

  function autoProvisionMixers(streamsToAdd) {
    if (activeComposition == null) {
      console.log('no composition selected, ignoring auto provisioning')
      return
    }

    // todo implement
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

    streams.forEach(name => {
      addItemToSelector(activeStreamsSelector, name)
    })
  }

  /**
   * Remove stream names from the list to select from.
   */
  const removeStreams = (streams) => {
    if (!streams) return
    console.log(`Remove streams: ${streams.join(',')}`)
    let removeMap = {}
    streams.forEach(name => {
      // remove from active list 
      removeItemFromSelector(activeStreamsSelector, name, false)
      // remove from mixer stream selector if there 
      removeItemFromSelector(streamNameControlSelector, name, false)

      // todo inform mixer/update nodegraph 
    })

    // remove from active list selector if stream was there 
    //removeItemsFromSelector(activeStreamsSelector, streams)
    // TODO remove from mixers if there instead 

  }

  /*
  * Destroys a composition and associated UI
  */
  window.destroyComposition = () => {
    const eventName = selectBox.options[selectBox.selectedIndex].value;
    if (eventName != '') {
      deleteComposition(eventName, smToken)
        .then(response => {
          console.log(`Composition ${eventName} deleted`)

          // clean up selectors
          removeAllItemsFromSelector(destinationMixerSelector, true)
          removeAllItemsFromSelector(mixerControlSelector, true)
          removeAllItemsFromSelector(streamNameControlSelector, true)
          removeItemFromSelector(selectBox, eventName, true)

          // clean up
          eventStateText.innerHTML = ''
          destroyCompositionButton.disabled = true
        })
        .catch(error => console.warn(error))
    }
  }

  window.addStreamToMixer = () => {
    const streamName = activeStreamsSelector.options[activeStreamsSelector.selectedIndex].value;
    const mixerId = destinationMixerSelector.options[destinationMixerSelector.selectedIndex].value;
    if (streamName != '' && mixerId != '') {

      let mixerNodeGraph = nodeGraphMap[mixerId]
      if (!mixerNodeGraph) {
        console.log(`Could not find node graph for mixer ${mixerId}`)
        return
      }

      let updatedMixerNodeGraph = JSON.parse(JSON.stringify(mixerNodeGraph))
      let videoNode = JSON.parse(JSON.stringify(videoSourceNodeTemplate))
      videoNode.streamGuid = streamName
      updatedMixerNodeGraph.rootVideoNode.nodes.push(videoNode)

      let audioNodes = updatedMixerNodeGraph.rootAudioNode.nodes
      let matches = audioNodes.filter(node => node.streamGuid === streamName)
      let audioNode
      if (matches.length <= 0) {
        audioNode = JSON.parse(JSON.stringify(audioSourceNodeTemplate))
        audioNode.streamGuid = streamName
        audioNodes.push(audioNode)
      } else {
        audioNode = matches[0]
      }
      // unmuted - gain(-100,0)
      audioNode.gain = 0

      updateNodeGraphInMixer(compositionEventName, updatedMixerNodeGraph, smToken)
        .then(result => {
          console.log(`Successfully updated node graph for composition ${compositionEventName}`)
          nodeGraphMap[mixerId] = updatedMixerNodeGraph
          refreshStreamNamesInStreamControlSelector()
        })
        .catch(error => console.log(`could not update node graph for composition ${compositionEventName}: `, error))
        .finally(() => console.log('current node graphs', nodeGraphMap))
    }
  }

  window.removeStreamFromMixer = () => {
    const streamName = streamNameControlSelector.options[streamNameControlSelector.selectedIndex].value;
    const mixerId = mixerControlSelector.options[mixerControlSelector.selectedIndex].value;
    if (streamName != '' && mixerId != '') {

      let mixerNodeGraph = nodeGraphMap[mixerId]
      if (!mixerNodeGraph) {
        console.log(`Could not find node graph for mixer ${mixerId}`)
        return
      }

      console.log(streamName, 'current', mixerNodeGraph)
      let updatedMixerNodeGraph = JSON.parse(JSON.stringify(mixerNodeGraph))
      // remove video 
      updatedMixerNodeGraph.rootVideoNode.nodes = updatedMixerNodeGraph.rootVideoNode.nodes.filter(node => node.streamGuid != streamName)
      // remove audio 
      updatedMixerNodeGraph.rootAudioNode.nodes = updatedMixerNodeGraph.rootAudioNode.nodes.filter(node => node.streamGuid != streamName)

      console.log('updated', updatedMixerNodeGraph)
      updateNodeGraphInMixer(compositionEventName, updatedMixerNodeGraph, smToken)
        .then(result => {
          console.log(`Successfully updated node graph for composition ${compositionEventName}`)
          nodeGraphMap[mixerId] = updatedMixerNodeGraph
          refreshStreamNamesInStreamControlSelector()
        })
        .catch(error => console.log(`could not update node graph for composition ${compositionEventName}: `, error))
        .finally(() => console.log('current node graphs', nodeGraphMap))
    }
  }

  /*
  * Updates the UI based on the composition selected from a drop down list 
  */
  window.compositionNameSelected = () => {
    const selectedValue = selectBox.options[selectBox.selectedIndex].value;

    if (selectedValue != '') {
      compositionEventName = selectedValue
      fetchCompositionData(compositionEventName, smToken)
        .then(data => {
          // TODO TODO get node graphs and build UI
        })
        .catch(error => console.warn(error))
    }
    else {
      // clean up
      compositionEventName = null
      activeComposition = null
      eventStateText.innerHTML = ''
      destroyCompositionButton.disabled = true
      currentStreamListing = []
      // get updated list
      requestActiveStreams()
    }
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

  // Uncomment to test auto provision of streams to composition
  setTimeout(() => {
    compositionEventName = "event1"
    if (!webSocket) {
      webSocket = {
        send: () => {
          console.log('send')
        }
      }
    }
    /*const comp = {
      "type": "activeCompositions", "list": [
        {
          "event": "event1", "transcodeComposition": false, "digest": "password", "location": ["nyc1"],
          "mixers": [
            {
              "id": "red5pro-sm-node-nyc1-0634836652196", "mixerName": "a", "location": "nyc1",
              "streamName": "final", "path": "live", "destinationMixerName": "", "serverAddress": "",
              "destination": "", "width": 1280, "height": 720, "framerate": 30, "bitrate": 1500,
              "doForward": true, "state": "INSERVICE", "streams": { "muted": [], "unmuted": [] }
            },
            {
              "id": "red5pro-sm-node-nyc1-2634836652196", "mixerName": "b", "location": "nyc1",
              "streamName": "b", "path": "live", "destinationMixerName": "a", "serverAddress": "",
              "destination": "a", "width": 1280, "height": 720, "framerate": 30, "bitrate": 1500,
              "doForward": true, "state": "INSERVICE", "streams": { "muted": [], "unmuted": [] }
            },
            {
              "id": "red5pro-sm-node-nyc1-3634836652196", "mixerName": "c", "location": "nyc1",
              "streamName": "c", "path": "live", "destinationMixerName": "a", "serverAddress": "",
              "destination": "a", "width": 1280, "height": 720, "framerate": 30, "bitrate": 1500,
              "doForward": true, "state": "INSERVICE", "streams": { "muted": [], "unmuted": [] }
            }]
        }]
    }
    parseCompositions(comp)*/

    let count = 0
    let streams = []
    let sNames = ['final', 'b', 'c', 'n1', 'n2', 'n3', 'b2', 'c2', 'n12', 'n22', 'n32']
    let interval = setInterval(() => {
      //console.log('run interval')
      if (count <= 15) {
        streams.push(sNames.at(count))
      } else {
        //console.log('clear stream ', streams.at(streams.length - 1))
        streams.splice(streams.length - 3, 3)
      }
      count++
      const mockActiveStreams = { "type": "activeStreams", "list": [{ "room": "/live", streams }] }
      try {
        parseStreams(mockActiveStreams)
      } catch (e) {

      }
      //console.log('count: ', count)
      if (count > 16) {
        //console.log('clear interval')
        clearInterval(interval)
        //destroyComposition()
      }
    }, 1000)
  }, 3000)


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
      } else if (json.type === 'mixerRegions') {
        parseMixerRegions(json.regions)
        return
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

  const parseMixerRegions = (regions) => {
    const selector = document.getElementById('mixer-region-select')
    selector.innerHTML = ''
    //const emptyOption = document.createElement('option')
    let i = 0
    regions.forEach(region => {
      const option = document.createElement('option')
      option.value = region
      option.innerHTML = region
      option.selected = i == 0
      i++
      selector.appendChild(option)
    })
  }

  const isValidString = (string) => {
    return string.length <= 255 && !!string.match(/^[\/0-9-_A-Za-z]+$/)
  }

  let mixers = []
  function processCreateMixersForm(e) {
    if (e.preventDefault) e.preventDefault();

    const mixerName = document.getElementById('mixerName').value
    const path = document.getElementById('scope').value
    const streamName = document.getElementById('streamName').value
    const width = String(document.getElementById('width').value)
    const height = String(document.getElementById('height').value)
    const framerate = document.getElementById('framerate').value
    const bitrate = document.getElementById('bitrate').value
    const audioSampleRate = document.getElementById('sample-rate').value
    const audioChannels = document.getElementById('audio-channels').value
    const submixes = document.getElementById('submixes').value
    const destinationMixerName = document.getElementById('destinationMixerName').value
    const doForward = true

    if (mixerName === '' || path === '' || streamName === '' ||
      width === '' || height === '' || framerate === '' || bitrate === '' || audioSampleRate === ''
      || audioChannels === '' || submixes === '') {
      alert('Invalid data found in Create Mixer Objects form. Only "Destination Mixer Name" can be left empty.')
      return
    } else if (streamName.indexOf('.') >= 0) {
      alert('Stream Name cannot contain periods (.)')
      return
    }

    if (!isValidString(mixerName) || !isValidString(path) || !isValidString(streamName)) {
      alert(`Mixer Name, Path and Stream Name must be alphanumeric and shorter than 256 characters`)
      return
    }

    if (destinationMixerName != '' && !isValidString(destinationMixerName)) {
      alert(`Destination Mixer Name must be empty, or alphanumeric and shorter than 256 characters`)
      return
    }

    const mixerObj = {
      mixerName,
      path,
      streamName,
      width,
      height,
      framerate,
      bitrate,
      audioSampleRate,
      audioChannels,
      submixes,
      doForward,
      destinationMixerName
    }
    mixers.push(mixerObj)

    const id = Math.random().toString(36).substring(7);
    const collapsible = `<button type="button" id="${id}-button" class="collapsible">Mixer ${mixers.length}</button>
        <div class="content" id="${id}-content">
          <p>
          Mixer Name: ${mixerName}<br>
          Scope: ${path}<br>
          Stream Name: ${streamName}<br>
          Width: ${width}<br>
          Height: ${height}<br>
          Framerate: ${framerate}<br>
          Bitrate: ${bitrate}<br>
          Audio Sample Rate: ${audioSampleRate}<br>
          Audio Channels: ${audioChannels}<br>
          Submixes: ${submixes}<br>
          Forward? ${doForward}<br>
          Destination Mixer Name: ${destinationMixerName}<br>
          </p>
          <br>
          <button class="ui-button small-ui-button red" type="button" id="remove-${id}">Delete</button>
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
    document.getElementById('mixerName').value = Math.floor(Math.random() * 0x1000000).toString(16)
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
    const digest = configuration.streamManagerAccessToken
    const transcodeComposition = document.getElementById('transcodeComposition').checked
    const selector = document.getElementById('mixer-region-select')
    let location = null
    try {
      location = selector.options[selector.selectedIndex].value;
    } catch (error) {
      location = 'nyc3'
      /// TODO TODO REMOVE
      // alert(`Mixer Region not found. Make sure your environment has available Mixer nodes`)
      //return
    }

    if (mixers.length <= 0) {
      alert(`At least one mixer must be provided`)
      return
    } else if (eventName == '' || digest == '' || location == '') {
      alert(`"Event Name", "Digest" and "Mixer Region" must include a value.`)
      return
    }

    if (!isValidString(eventName) || !isValidString(digest) || !isValidString(location)) {
      alert(`Event Name, Digest and Location must be alphanumeric and shorter than 256 characters`)
      return
    }

    numberOfMixers = mixers.length

    const createCompositionMessage = {
      event: eventName,
      digest,
      transcodeComposition,
      mixers,
      location: [location]
    }

    eventStateText.innerHTML = `State: Pending`
    createCompositionOnStreamManager(createCompositionMessage, smToken)
      .then(data => {
        compositionEventName = eventName
        eventStateText.innerHTML = `State: Creating Node Graph`
        addItemToSelector(selectBox, compositionEventName)
        selectItemInSelector(selectBox, compositionEventName)
        destroyCompositionButton.disabled = false
        createCompositionUI(data)
        return provisionMixers(data)
      })
      .then(response => {
        console.log(`Provisioned mixers`)
        eventStateText.innerHTML = `State: Composing`
        subscribeToMixedStream(compositeStreamDetails.path, compositeStreamDetails.streamName)
      })
      .catch((error) => {
        console.error('Error:', error);
        eventStateText.innerHTML = `State: Failed`
      })

    console.log('create composition message submitted')
    console.log(createCompositionMessage)

    mixers = []
    document.getElementById('mixers').innerHTML = ''

    // return false to prevent the default form behavior
    return false;
  }

  // https://stackoverflow.com/questions/14603205/how-to-convert-hex-string-into-a-bytes-array-and-a-bytes-array-in-the-hex-strin
  function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
      bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
  }

  function bytesToHex(bytes) {
    for (var hex = [], i = 0; i < bytes.length; i++) {
      var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
      hex.push((current >>> 4).toString(16));
      hex.push((current & 0xF).toString(16));
    }
    return hex.join("");
  }

  window.updateMixerNodeGraph = () => {
    const streamName = streamNameControlSelector.options[streamNameControlSelector.selectedIndex].value;
    const mixerId = mixerControlSelector.options[mixerControlSelector.selectedIndex].value;
    if (streamName != '' && mixerId != '') {
      let mixerNodeGraph = nodeGraphMap[mixerId]
      if (!mixerNodeGraph) {
        console.log(`Could not find node graph for mixer ${mixerId}`)
        return
      }

      let updatedMixerNodeGraph = JSON.parse(JSON.stringify(mixerNodeGraph))
      // background color to SolidColorNode
      const bytes = hexToBytes(document.getElementById("bgColor").value.substring(1));
      const solidColorNodes = updatedMixerNodeGraph.rootVideoNode.nodes.filter(node => node.node == 'SolidColorNode')
      if (solidColorNodes.length > 0) {
        solidColorNodes[0].red = bytes[0] / 255.0;
        solidColorNodes[0].green = bytes[1] / 255.0;
        solidColorNodes[0].blue = bytes[2] / 255.0;
        solidColorNodes[0].alpha = 1.0;
      }

      const videoNodes = updatedMixerNodeGraph.rootVideoNode.nodes.filter(node => node.node == 'VideoSourceNode' && node.streamGuid == streamName)
      if (videoNodes.length > 0) {
        // 0-100% of composite stream resolution
        let w = compositeStreamDetails.width
        let h = compositeStreamDetails.height
        let destX = (document.getElementById('dest-x').value / 100) * w
        let destY = (document.getElementById('dest-y').value / 100) * h
        // size cannot be larger than composite stream resolution
        let destWidth = Math.min(w, (document.getElementById('dest-width').value / 100) * w)
        let destHeight = Math.min(h, (document.getElementById('dest-height').value / 100) * h)
        // force entire stream to stay in view
        destX = Math.min(w - destWidth, destX)
        destY = Math.min(h - destHeight, destY)

        videoNodes[0].destX = destX
        videoNodes[0].destY = destY
        videoNodes[0].destWidth = destWidth
        videoNodes[0].destHeight = destHeight
      }

      const audioNodes = updatedMixerNodeGraph.rootAudioNode.nodes.filter(node => node.node == 'AudioSourceNode' && node.streamGuid == streamName)
      if (audioNodes.length > 0) {
        audioNodes[0].pan = document.getElementById('pan').value;
        audioNodes[0].gain = document.getElementById('gain').value;
      }

      console.log(videoNodes, audioNodes, updatedMixerNodeGraph)
      updateNodeGraphInMixer(compositionEventName, updatedMixerNodeGraph, smToken)
        .then(result => {
          console.log(`Successfully updated node graph for composition ${compositionEventName}`)
          nodeGraphMap[mixerId] = updatedMixerNodeGraph
        })
        .catch(error => console.log(`could not update node graph for composition ${compositionEventName}: `, error))
        .finally(() => console.log('current node graphs', nodeGraphMap))
    }
  }

  window.updateUIFromNodeGraph = () => {
    const streamName = streamNameControlSelector.options[streamNameControlSelector.selectedIndex].value;
    const mixerId = mixerControlSelector.options[mixerControlSelector.selectedIndex].value;
    console.log('updateUIFromNodeGraph', streamName, mixerId)
    if (streamName != '' && mixerId != '') {
      let mixerNodeGraph = nodeGraphMap[mixerId]
      if (!mixerNodeGraph) {
        console.log(`Could not find node graph for mixer ${mixerId}`)
        return
      }

      // background color from node SolidColorNode
      const solidColorNodes = mixerNodeGraph.rootVideoNode.nodes.filter(node => node.node == 'SolidColorNode')
      if (solidColorNodes.length > 0) {
        let r = Math.floor(solidColorNodes[0].red * 255.0);
        let g = Math.floor(solidColorNodes[0].green * 255.0);
        let b = Math.floor(solidColorNodes[0].blue * 255.0);
        var hex = bytesToHex([r, g, b]);
        document.getElementById("bgColor").value = "#" + hex;
      }

      const videoNodes = mixerNodeGraph.rootVideoNode.nodes.filter(node => node.node == 'VideoSourceNode' && node.streamGuid == streamName)
      if (videoNodes.length > 0) {
        // 0-100% of composite stream resolution
        let w = compositeStreamDetails.width
        let h = compositeStreamDetails.height
        document.getElementById('dest-x').value = (videoNodes[0].destX / w) * 100;
        document.getElementById('dest-y').value = (videoNodes[0].destY / h) * 100;
        document.getElementById('dest-width').value = (videoNodes[0].destWidth / w) * 100;
        document.getElementById('dest-height').value = (videoNodes[0].destHeight / h) * 100;
      }

      const audioNodes = mixerNodeGraph.rootAudioNode.nodes.filter(node => node.node == 'AudioSourceNode' && node.streamGuid == streamName)
      if (audioNodes.length > 0) {
        document.getElementById('pan').value = audioNodes[0].pan
        document.getElementById('gain').value = audioNodes[0].gain
      }
    }
  }

  const addMixerNamesToMixerSelectors = (mixerDataArray) => {
    mixerDataArray.forEach(mixer => {
      addItemToSelector(mixerControlSelector, mixer.mixerName, mixer.id)
      addItemToSelector(destinationMixerSelector, mixer.mixerName, mixer.id)
      if (mixer.destinationMixerName == '') {
        compositeStreamDetails = {
          path: mixer.path,
          streamName: mixer.streamName,
          width: mixer.width,
          height: mixer.height
        }
        console.log('saved composite stream details', compositeStreamDetails)
      }
    })
  }

  const createCompositionUI = (compositionData) => {
    if (activeComposition == null) {
      activeComposition = compositionData
      numberOfMixers = compositionData.mixers.length
    }

    //createDOMElementsForMixers(compositionData.mixers)
    addMixerNamesToMixerSelectors(compositionData.mixers)
  }

  window.mixerNameSelected = () => {
    const selectedMixer = mixerControlSelector.options[mixerControlSelector.selectedIndex].value
    if (selectedMixer == '') {
      return
    }

    if (!nodeGraphMap[selectedMixer]) {
      console.log(`Node graph not found for mixer ${selectedMixer}`)
      return
    }

    // load streams in stream selector
    const streams = new Set()
    const nodeGraph = nodeGraphMap[selectedMixer]
    nodeGraph.rootVideoNode.nodes.forEach(node => {
      if (node.streamGuid) {
        streams.add(node.streamGuid)
      }
    })
    nodeGraph.rootAudioNode.nodes.forEach(node => {
      if (node.streamGuid) {
        streams.add(node.streamGuid)
      }
    })

    console.log('streams', streams)

    streams.forEach(stream => addItemToSelector(streamNameControlSelector, stream))
  }

  const refreshStreamNamesInStreamControlSelector = () => {
    const selectedMixer = mixerControlSelector.options[mixerControlSelector.selectedIndex].value
    if (selectedMixer == '') {
      return
    }

    if (!nodeGraphMap[selectedMixer]) {
      console.log(`Node graph not found for mixer ${selectedMixer}`)
      return
    }

    const streamsInSelector = new Set()
    for (let i = 0; i < streamNameControlSelector.options.length; i++) {
      let name = streamNameControlSelector.options[i].name
      if (name && name != '') {
        console.log('add', name, 'to streamsInSelector')
        streamsInSelector.add(name)
      }
    }

    // load streams in stream selector
    const currentStreams = new Set()
    const nodeGraph = nodeGraphMap[selectedMixer]
    nodeGraph.rootVideoNode.nodes.forEach(node => {
      if (node.streamGuid) {
        currentStreams.add(node.streamGuid)
      }
    })
    nodeGraph.rootAudioNode.nodes.forEach(node => {
      if (node.streamGuid) {
        currentStreams.add(node.streamGuid)
      }
    })

    console.log('current streams', currentStreams)
    console.log('streams in selector', streamsInSelector)
    const streamsToAdd = new Set()
    const streamsToRemove = new Set()
    streamsInSelector.forEach(stream => {
      if (!currentStreams.has(stream)) {
        streamsToRemove.add(stream)
      }
    })
    currentStreams.forEach(stream => {
      if (!streamsInSelector.has(stream)) {
        streamsToAdd.add(stream)
      }
    })

    console.log(streamsToAdd, streamsToRemove)
    streamsToAdd.forEach(stream => addItemToSelector(streamNameControlSelector, stream))
    streamsToRemove.forEach(stream => removeItemFromSelector(streamNameControlSelector, stream))
  }

  const addItemToSelector = (selector, name, value = null) => {
    if (itemInSelector(selector, name)) {
      console.log('item is already in selector')
      return
    }

    console.log(`adding ${name} to `, selector, selector.selectedIndex)
    const option = document.createElement('option')
    option.value = value == null ? name : value
    option.name = name
    option.innerHTML = name
    selector.appendChild(option)
    console.log('after adding to ', selector, selector.selectedIndex)
  }

  const removeItemFromSelector = (selector, name, selectEmpty = false) => {
    // remove composition from selector 
    for (var i = 0; i < selector.options.length; i++) {
      if (selector.options[i].text == '' && selectEmpty) {
        selector.options[i].selected = true;
      } else if (selector.options[i].text == name) {
        selector.options.remove(i)
        return;
      }
    }
  }

  const removeAllItemsFromSelector = (selector, leaveEmptyItem = true) => {
    // remove composition from selector 
    let i = 0
    while (i < selector.options.length) {
      if (selector.options[i].text == '' && leaveEmptyItem) {
        selector.options[i].selected = true;
        i++
        continue
      }

      selector.options.remove(i)
    }
  }

  const itemInSelector = (selector, name) => {
    for (var i = 0; i < selector.options.length; i++) {
      if (selector.options[i].text == name) {
        return true
      }
    }
  }

  const selectItemInSelector = (selector, name) => {
    for (var i = 0; i < selector.options.length; i++) {
      if (selector.options[i].text == name) {
        selector.options[i].selected = true;
        return
      }
    }
  }

  const provisionMixers = (compositionDetails) => {
    return new Promise((resolve, reject) => {
      if (!compositionDetails.mixers) {
        reject(`No mixers found in composition data`)
        return
      }

      const nodeGraphs = []
      compositionDetails.mixers.forEach(mixer => {
        const copy = JSON.parse(JSON.stringify(defaultNodeGraph))
        copy.mixerName = mixer.mixerName
        nodeGraphs.push(copy)
        nodeGraphMap[mixer.id] = copy
      })

      updateNodeGraphInMixer(compositionDetails.event, nodeGraphs, smToken)
        .then(result => resolve(result))
        .catch(error => {
          nodeGraphMap = {}
          reject(error)
        })
    })
  }

  const fetchExistingCompositionsFromStreamManager = () => {
    console.log('Requesting active compositions from Stream Manager')
    const url = `${location.protocol}://${location.host}/streammanager/api/4.0/composition?accessToken=${smToken}`
    console.log(location.protocol, location.host, url)
    fetch(url, {
      method: 'GET'
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log('Success:', data)
        parseCompositionNames(data)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const parseCompositionNames = (compositionEventsArray) => {
    existingCompositions = []
    const emptyOption = document.createElement('option')
    compositionEventsArray.forEach(event => {
      if (existingCompositions.length == 0) {
        selectBox.innerHTML = ''
        emptyOption.value = ''
        emptyOption.name = ''
        selectBox.appendChild(emptyOption)
      }

      existingCompositions.push(event)
      addItemToSelector(selectBox, event)
    })
  }




  // Main
  // Setup WebSocket
  const uid = Math.floor(Math.random() * 0x10000).toString(16)
  const webSocketEndpoint = `${baseWebSocketUrl}?testbed=grid&type=manager&id=${uid}`
  // TODO Uncomment
  //setUpWebSocket(webSocketEndpoint)
  fetchExistingCompositionsFromStreamManager()


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
