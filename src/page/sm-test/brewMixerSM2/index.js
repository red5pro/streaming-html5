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
An  example  of  the EULA can be found on our website at: https://account.red5.net/assets/LICENSE.txt.

The above copyright notice and this license shall be included in all copies or portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,  INCLUDING  BUT
NOT  LIMITED  TO  THE  WARRANTIES  OF  MERCHANTABILITY, FITNESS  FOR  A  PARTICULAR  PURPOSE  AND
NONINFRINGEMENT.   IN  NO  EVENT  SHALL INFRARED5, INC. BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN  AN  ACTION  OF  CONTRACT,  TORT  OR  OTHERWISE,  ARISING  FROM,  OUT  OF  OR  IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
;((window, red5prosdk, streamManagerUtil, brewmixer, getCoordinates) => {
  'use strict'

  const serverSettings = (function () {
    const settings = sessionStorage.getItem('r5proServerSettings')
    try {
      return JSON.parse(settings)
    } catch (e) {
      console.error(
        'Could not read server settings from sessionstorage: ' + e.message
      )
    }
    return {}
  })()

  const configuration = (function () {
    const conf = sessionStorage.getItem('r5proTestBed')
    try {
      return JSON.parse(conf)
    } catch (e) {
      console.error(
        'Could not read testbed configuration from sessionstorage: ' + e.message
      )
    }
    return {}
  })()
  red5prosdk.setLogLevel(
    configuration.verboseLogging
      ? red5prosdk.LOG_LEVELS.TRACE
      : red5prosdk.LOG_LEVELS.WARN
  )

  let jwt
  let guids = []
  const GUID_COUNT = 25
  const {
    host,
    streamManagerUser,
    streamManagerPassword,
    streamManagerAPI: smVersion,
    streamManagerNodeGroup: nodeGroupName,
  } = configuration
  let eventId = 'event1'

  let ipReg = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
  let localhostReg = /^localhost.*/
  let isIPOrLocalhost = (host) => ipReg.exec(host) || localhostReg.exec(host)

  const getSocketLocationFromProtocol = (host) => {
    return isIPOrLocalhost(host)
      ? { protocol: 'ws', port: serverSettings.wsport }
      : { protocol: 'wss', port: serverSettings.wssport }
  }

  const getRegionIfDefined = () => {
    const region = configuration.streamManagerRegion
    if (
      typeof region === 'string' &&
      region.length > 0 &&
      region !== 'undefined'
    ) {
      return region
    }
    return undefined
  }

  const getAuthenticationParams = () => {
    const { authentication } = configuration
    const { enabled, username, password, token } = authentication
    return enabled
      ? {
          connectionParams: {
            username,
            password,
            token,
          },
        }
      : {}
  }

  const getConfiguration = () => {
    const {
      host,
      app,
      stream1,
      streamManagerAPI,
      preferWhipWhep,
      streamManagerNodeGroup: nodeGroup,
    } = configuration
    const { protocol, port } = getSocketLocationFromProtocol(host)

    const region = getRegionIfDefined()
    const params = region
      ? {
          region,
          strict: true,
        }
      : undefined

    const httpProtocol = protocol === 'wss' ? 'https' : 'http'
    const endpoint = !preferWhipWhep
      ? `${protocol}://${host}:${port}/as/${streamManagerAPI}/proxy/ws/subscribe/${app}/${stream1}`
      : `${httpProtocol}://${host}:${port}/as/${streamManagerAPI}/proxy/whep/${app}/${stream1}`

    var connectionParams = params
      ? { ...params, ...getAuthenticationParams().connectionParams }
      : getAuthenticationParams().connectionParams

    var rtcConfig = {
      ...configuration,
      endpoint,
      streamName: stream1,
      connectionParams: {
        ...connectionParams,
        nodeGroup,
      },
    }
    return rtcConfig
  }

  // CANVAS >>
  const OverlayStates = {
    NOT_RUNNING: 0,
    IDLE: 1,
    ZOOMING: 2,
    ZOOMED_IN: 3,
    SELECTED: 4,
    RESIZING: 5,
    MOVING: 6,
  }

  const Direction = {
    EAST: 0,
    NORTHEAST: 1,
    NORTH: 2,
    NORTHWEST: 3,
    WEST: 4,
    SOUTHWEST: 5,
    SOUTH: 6,
    SOUTHEAST: 7,
  }

  // value is 8, because you can drag all diractions, plus drag handle.
  const MOVE_HANDLE = 8

  let currentState = OverlayStates.NOT_RUNNING
  let selectedNode = null
  let globalNodeGraph = null
  let zoomNode = null
  let zoomInitial = null
  let zoomT = 0.0
  let zoomIncr = 0.15
  let swapAvail = []
  let swapped = new Map()
  let audioSet = new Set()
  audioSet.add(`${configuration.app}/${configuration.stream1}`) // to match the default nodegraph

  let gridWidth = 2
  let gridHeight = 2
  let isMouseDown = false
  let dragTarget = null
  let dragX = 0,
    dragY = 0

  const STREAM_REGEX = /^stream((1[0-2]?)|([1-9]))\b/
  const urlParams = new URLSearchParams(window.location.search)
  let mixerStreamGuid = urlParams.get('mixer')
  var mixerStreamPath = ''
  var mixerStreamName = ''
  var defaultGraphValue = JSON.stringify([
    {
      rootVideoNode: {
        nodes: [
          {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 1,
            node: 'SolidColorNode',
          },
          {
            node: 'VideoSourceNode',
            streamGuid: 'live/stream1',
            sourceX: 0,
            sourceY: 0,
            sourceWidth: 1920,
            sourceHeight: 1080,
            destX: 0,
            destY: 0,
            destWidth: 960,
            destHeight: 540,
          },
          {
            node: 'VideoSourceNode',
            streamGuid: 'live/stream2',
            sourceX: 0,
            sourceY: 0,
            sourceWidth: 1920,
            sourceHeight: 1080,
            destX: 960,
            destY: 0,
            destWidth: 960,
            destHeight: 540,
          },
          {
            node: 'VideoSourceNode',
            streamGuid: 'live/stream3',
            sourceX: 0,
            sourceY: 0,
            sourceWidth: 1920,
            sourceHeight: 1080,
            destX: 0,
            destY: 540,
            destWidth: 960,
            destHeight: 540,
          },
          {
            node: 'VideoSourceNode',
            streamGuid: 'live/stream4',
            sourceX: 0,
            sourceY: 0,
            sourceWidth: 1920,
            sourceHeight: 1080,
            destX: 960,
            destY: 540,
            destWidth: 960,
            destHeight: 540,
          },
        ],
        node: 'CompositorNode',
      },
      rootAudioNode: {
        nodes: [
          {
            streamGuid: 'live/stream1',
            pan: 0,
            gain: -6,
            node: 'AudioSourceNode',
          },
          {
            streamGuid: 'live/stream2',
            pan: 0,
            gain: -100,
            node: 'AudioSourceNode',
          },
          {
            streamGuid: 'live/stream3',
            pan: 0,
            gain: -100,
            node: 'AudioSourceNode',
          },
          {
            streamGuid: 'live/stream4',
            pan: 0,
            gain: -100,
            node: 'AudioSourceNode',
          },
        ],
        node: 'SumNode',
      },
    },
  ])

  const canvas = document.getElementById('videoOverlay')
  const video = document.getElementById('red5pro-subscriber')

  const activeNodeGraph = document.getElementById('activeNodeGraph')
  const startComp = document.getElementById('startComp')
  const toggleMuteButton = document.getElementById('toggleMute')
  const renderTreeToggle = document.getElementById('renderTreeToggle')
  const stopButton = document.getElementById('stopButton')
  const mixerGuidField = document.getElementById('mixerGuidField')
  const mixerFormSubmit = document.getElementById('mixer-form-submit')
  const activeTreeBox = document.getElementById('activeTreeBox')
  const renderTreeSubmit = document.getElementById('render-tree-submit')
  const radioButtons = document.querySelectorAll('input[name="layout"]')
  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener('change', async (event) => {
      const { checked, value } = event.target
      if (checked) {
        reGrid(parseInt(value, 10))
        setState(OverlayStates.IDLE)
        swapped.clear()
        swapAvail = []

        const streamList = await fetchSwapStreams()
        swapAvail.concat(streamList)
      }
    })
  })

  renderTreeToggle.addEventListener('click', (event) => {
    event.preventDefault()
    toggleRenderTree()
  })
  stopButton.addEventListener('click', (event) => {
    event.preventDefault()
    stopMixer()
  })
  mixerFormSubmit.addEventListener('click', (event) => {
    event.preventDefault()
    startNewMixer()
  })
  toggleMuteButton.addEventListener('click', (event) => {
    event.preventDefault()
    toggleMute()
  })
  renderTreeSubmit.addEventListener('click', (event) => {
    event.preventDefault()
    submitUserTree()
  })

  // ============= DRAWING FUNCTIONS ===============

  const getCoords = () => {
    const { clientWidth, clientHeight } = video
    const { videoWidth, videoHeight } = video
    return getCoordinates(videoWidth, videoHeight, clientWidth, clientHeight)
  }

  const drawMoveHandle = (ctx, drawParams, sizePercent = 0.5) => {
    // =================================
    // circular drag handle
    const coords = getCoords()
    const { centerX, centerY } = drawParams
    const size = 64 * sizePercent
    ctx.beginPath()
    ctx.ellipse(centerX, centerY, size, size, 0, 0, 360)
    ctx.stroke()

    console.log('COORDs: ' + JSON.stringify(coords, null, 2))
  }

  const drawEastResize = (ctx, drawParams, scale = 1.0) => {
    const { x, y, halfHeight, quarterHeight, width } = drawParams
    // =================================
    // right
    ctx.fillRect(x + width - 8, y + quarterHeight + 4, 4, halfHeight - 8)

    // arrow
    ctx.beginPath()
    ctx.moveTo(x + width - 12, y + halfHeight)
    ctx.lineTo(x + width - 12 - 48 * scale, y + halfHeight + 32 * scale)
    ctx.lineTo(x + width - 12 - 48 * scale, y + halfHeight - 32 * scale)
    ctx.fill()
  }

  const drawNortheastResize = (ctx, drawParams, scale = 1.0) => {
    const { x, y, halfWidth, quarterWidth, quarterHeight, width } = drawParams
    // =================================
    // upper right corner
    ctx.fillRect(x + halfWidth + quarterWidth + 4, y + 4, quarterWidth - 8, 4)
    ctx.fillRect(x + width - 8, y + 4, 4, quarterHeight - 8)

    // arrow
    ctx.beginPath()
    ctx.moveTo(x + width - 12, y + 12)
    ctx.lineTo(x + width - 12 - 11 * scale, y + 12 + 56 * scale)
    ctx.lineTo(x + width - 12 - 56 * scale, y + 12 + 11 * scale)
    ctx.fill()
  }

  const drawNorthResize = (ctx, drawParams, scale = 1.0) => {
    const { x, y, centerX, halfWidth, quarterWidth } = drawParams
    // =================================
    // top
    ctx.fillRect(x + quarterWidth + 4, y + 4, halfWidth - 8, 4)

    // arrow
    ctx.beginPath()
    ctx.moveTo(centerX, y + 12)
    ctx.lineTo(centerX - 32 * scale, y + 12 + 48 * scale)
    ctx.lineTo(centerX + 32 * scale, y + 12 + 48 * scale)
    ctx.fill()
  }

  const drawNorthwestResize = (ctx, drawParams, scale = 1.0) => {
    const { x, y, quarterWidth, quarterHeight } = drawParams
    // =================================
    // upper left corner
    ctx.fillRect(x + 4, y + 4, 4, quarterHeight - 8)
    ctx.fillRect(x + 4, y + 4, quarterWidth - 8, 4)

    // arrow
    ctx.beginPath()
    ctx.moveTo(x + 12, y + 12)
    ctx.lineTo(x + 12 + 11 * scale, y + 12 + 56 * scale)
    ctx.lineTo(x + 12 + 56 * scale, y + 12 + 11 * scale)
    ctx.fill()
  }

  const drawWestResize = (ctx, drawParams, scale = 1.0) => {
    const { x, y, halfHeight, quarterHeight } = drawParams
    // =================================
    // left
    ctx.fillRect(x + 4, y + quarterHeight + 4, 4, halfHeight - 8)

    // arrow
    ctx.beginPath()
    ctx.moveTo(x + 12, y + halfHeight)
    ctx.lineTo(x + 12 + 48 * scale, y + halfHeight + 32 * scale)
    ctx.lineTo(x + 12 + 48 * scale, y + halfHeight - 32 * scale)
    ctx.fill()
  }

  const drawSouthwestResize = (ctx, drawParams, scale = 1.0) => {
    const { x, y, halfHeight, quarterWidth, quarterHeight, height } = drawParams
    // =================================
    // lower left corner
    ctx.fillRect(x + 4, y + height - 8, quarterWidth - 8, 4)
    ctx.fillRect(
      x + 4,
      y + halfHeight + quarterHeight + 4,
      4,
      quarterHeight - 8
    )

    // arrow
    ctx.beginPath()
    ctx.moveTo(x + 12, y + height - 12)
    ctx.lineTo(x + 12 + 11 * scale, y + height - 12 - 56 * scale)
    ctx.lineTo(x + 12 + 56 * scale, y + height - 12 - 11 * scale)
    ctx.fill()
  }

  const drawSouthResize = (ctx, drawParams, scale = 1.0) => {
    const { x, y, centerX, halfWidth, quarterWidth, height } = drawParams
    // =================================
    // bottom
    ctx.fillRect(x + quarterWidth + 4, y + height - 8, halfWidth - 8, 4)

    // arrow
    ctx.beginPath()
    ctx.moveTo(centerX, y + height - 12)
    ctx.lineTo(centerX - 32 * scale, y + height - 12 - 48 * scale)
    ctx.lineTo(centerX + 32 * scale, y + height - 12 - 48 * scale)
    ctx.fill()
  }

  const drawSoutheastResize = (ctx, drawParams, scale = 1.0) => {
    const {
      x,
      y,
      halfWidth,
      halfHeight,
      quarterWidth,
      quarterHeight,
      height,
      width,
    } = drawParams
    // =================================
    // lower right corner
    ctx.fillRect(
      x + halfWidth + quarterWidth + 4,
      y + height - 8,
      quarterWidth - 8,
      4
    )
    ctx.fillRect(
      x + width - 8,
      y + halfHeight + quarterHeight + 4,
      4,
      quarterHeight - 8
    )

    // arrow
    ctx.beginPath()
    ctx.moveTo(x + width - 12, y + height - 12)
    ctx.lineTo(x + width - 12 - 11 * scale, y + height - 12 - 56 * scale)
    ctx.lineTo(x + width - 12 - 56 * scale, y + height - 12 - 11 * scale)
    ctx.fill()
  }

  const drawMicrophone = (ctx, drawParams, scale = 1.0) => {
    const { centerX, centerY, quarterWidth } = drawParams
    // =================================
    // microphone
    ctx.beginPath()
    ctx.arc(centerX + quarterWidth, centerY, 16 * scale, 2 * Math.PI, Math.PI)
    ctx.arc(
      centerX + quarterWidth,
      centerY - 32 * scale,
      16 * scale,
      Math.PI,
      0
    )
    ctx.fill()

    ctx.beginPath()
    ctx.arc(centerX + quarterWidth, centerY, 26 * scale, 2 * Math.PI, Math.PI)
    ctx.moveTo(centerX + quarterWidth, centerY + 26 * scale)
    ctx.lineTo(centerX + quarterWidth, centerY + 26 + 16 * scale)
    ctx.moveTo(centerX + quarterWidth - 20, centerY + 26 + 16 * scale)
    ctx.lineTo(centerX + quarterWidth + 20, centerY + 26 + 16 * scale)
    ctx.stroke()
  }

  const drawSwapIcon = (ctx, drawParams) => {
    const { centerX, centerY, quarterWidth } = drawParams
    // =================================
    // swap icon
    ctx.fillRect(centerX - quarterWidth - 15, centerY - 15 - 3, 45, 3)
    ctx.beginPath()
    ctx.moveTo(centerX - quarterWidth - 15, centerY - 15)
    ctx.lineTo(centerX - quarterWidth - 15, centerY - 15 - 12)
    ctx.lineTo(centerX - quarterWidth - 30, centerY - 15)
    ctx.fill()

    ctx.fillRect(centerX - quarterWidth - 30, centerY + 15, 45, 3)
    ctx.beginPath()
    ctx.moveTo(centerX - quarterWidth + 15, centerY + 15)
    ctx.lineTo(centerX - quarterWidth + 15, centerY + 15 + 12)
    ctx.lineTo(centerX - quarterWidth + 30, centerY + 15)
    ctx.fill()
  }

  const lerp = (a, b, t) => {
    return a * (1.0 - t) + b * t
  }
  // ============= DRAWING FUNCTIONS ===============

  const setState = (newState) => {
    currentState = newState
    drawCanvas()
  }

  const calculateDrawParams = () => {
    const coords = getCoords()
    const { width: coordWidth, height: coordHeight } = coords
    const { destX, destY, destWidth, destHeight, sourceWidth, sourceHeight } =
      selectedNode
    const x = destX + coords.x
    const y = destY + coords.y
    const destPercWidth = destWidth / sourceWidth
    const destPercHeight = destHeight / sourceHeight

    const width = coordWidth * destPercWidth
    const height = coordHeight * destPercHeight
    const centerX = lerp(x, x + width, 0.5)
    const centerY = lerp(y, y + height, 0.5)

    const halfWidth = width / 2
    const halfHeight = height / 2
    const quarterWidth = width / 4
    const quarterHeight = height / 4

    var drawParams = {
      x,
      y,
      width,
      height,
      centerX,
      centerY,
      halfWidth,
      halfHeight,
      quarterWidth,
      quarterHeight,
      percWidth: destPercWidth,
      percHeight: destPercHeight,
    }

    console.log('SELECTED', JSON.stringify(selectedNode, null, 2))
    return drawParams
  }

  const drawCanvas = () => {
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'rgba(0,0,0,0)'
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (currentState == OverlayStates.NOT_RUNNING) {
      // no-op; hide overlay completely.
    } else if (currentState == OverlayStates.IDLE) {
      // no-op; hide overlay completely.
    } else if (currentState == OverlayStates.ZOOMING) {
      // no-op? overlay hidden
    } else if (currentState == OverlayStates.ZOOMED_IN) {
      // also no-op? overlay hidden
    } else if (currentState == OverlayStates.SELECTED) {
      // show overlay controls (disable highlight)

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.lineWidth = 4
      ctx.strokeStyle = 'rgba(255,255,255,255)'
      ctx.fillStyle = 'rgba(255,255,255,255)'

      const drawParams = calculateDrawParams()
      const { percWidth, percHeight } = drawParams
      const scale = Math.min(percWidth, percHeight)
      drawMoveHandle(ctx, drawParams, scale)
      drawNortheastResize(ctx, drawParams, scale)
      drawNorthwestResize(ctx, drawParams, scale)
      drawSouthwestResize(ctx, drawParams, scale)
      drawSoutheastResize(ctx, drawParams, scale)

      // if mic active
      if (audioSet.has(selectedNode.streamGuid)) {
        ctx.strokeStyle = 'rgba(68,160,255,255)'
        ctx.fillStyle = 'rgba(68,160,255,255)'
      }
      drawMicrophone(ctx, drawParams, scale)

      // if swap active
      if (swapped.has(selectedNode.streamGuid)) {
        ctx.strokeStyle = 'rgba(68,160,255,255)'
        ctx.fillStyle = 'rgba(68,160,255,255)'
      } else {
        // else, active mic might have changed the color to blue; if so, here we change it back to white
        ctx.strokeStyle = 'rgba(255,255,255,255)'
        ctx.fillStyle = 'rgba(255,255,255,255)'
      }

      // swap streams only when not showing 4x4 grid
      // (in a 4x4 grid all 16 streams are shown, but the demo only has 16 streams total)
      if (gridWidth < 4) {
        drawSwapIcon(ctx, drawParams, scale)
      }

      //console.log("drawCanvas SELECTED");
      //console.log(`canvas size: ${canvas.width}, ${canvas.height}`);
    } else if (
      currentState == OverlayStates.RESIZING ||
      currentState == OverlayStates.MOVING
    ) {
      // highlight the active resize control

      // first draw in white
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.lineWidth = 4
      ctx.strokeStyle = 'rgba(255,255,255,255)'
      ctx.fillStyle = 'rgba(255,255,255,255)'

      const drawParams = calculateDrawParams()
      const { percWidth, percHeight } = drawParams
      const scale = Math.min(percWidth, percHeight)

      drawMoveHandle(ctx, drawParams, scale)
      drawNortheastResize(ctx, drawParams, scale)
      drawNorthwestResize(ctx, drawParams, scale)
      drawSouthwestResize(ctx, drawParams, scale)
      drawSoutheastResize(ctx, drawParams, scale)
      drawMicrophone(ctx, drawParams, scale)

      if (gridWidth < 4) {
        drawSwapIcon(ctx, drawParams, scale)
      }

      ctx.strokeStyle = 'rgba(68,160,255,255)'
      ctx.fillStyle = 'rgba(68,160,255,255)'

      if (dragTarget == Direction.EAST) {
        drawEastResize(ctx, drawParams, scale)
      } else if (dragTarget == Direction.NORTHEAST) {
        drawNortheastResize(ctx, drawParams, scale)
      } else if (dragTarget == Direction.NORTH) {
        drawNorthResize(ctx, drawParams, scale)
      } else if (dragTarget == Direction.NORTHWEST) {
        drawNorthwestResize(ctx, drawParams, scale)
      } else if (dragTarget == Direction.WEST) {
        drawWestResize(ctx, drawParams, scale)
      } else if (dragTarget == Direction.SOUTHWEST) {
        drawSouthwestResize(ctx, drawParams, scale)
      } else if (dragTarget == Direction.SOUTH) {
        drawSouthResize(ctx, drawParams, scale)
      } else if (dragTarget == Direction.SOUTHEAST) {
        drawSoutheastResize(ctx, drawParams, scale)
      } else if (dragTarget == MOVE_HANDLE) {
        drawMoveHandle(ctx, drawParams, scale)
      }
    }
  }

  const sizeCanvas = (width, height) => {
    canvas.style.width = width + 'px'
    canvas.width = width
    canvas.style.height = height + 'px'
    canvas.height = height
    drawCanvas()
  }

  const resizeOverlayCanvas = () => {
    const vid = document.getElementById('red5pro-subscriber')
    const vidStyleData = vid.getBoundingClientRect()
    sizeCanvas(vidStyleData.width, vidStyleData.height)
  }

  const updateZoom = () => {
    var w0 = zoomInitial.destWidth
    var h0 = zoomInitial.destHeight
    var x0 = zoomInitial.destX
    var y0 = zoomInitial.destY

    var x1 = 0.0
    var y1 = 0.0
    var w1 = canvas.width
    var h1 = canvas.height

    var x = lerp(x0, x1, zoomT)
    var y = lerp(y0, y1, zoomT)
    var w = lerp(w0, w1, zoomT)
    var h = lerp(h0, h1, zoomT)

    zoomNode.destX = x
    zoomNode.destY = y
    zoomNode.destWidth = w
    zoomNode.destHeight = h

    brewmixer.updateRenderTrees(host, jwt, smVersion, nodeGroupName, eventId, [
      globalNodeGraph,
    ])
  }

  const doZoom = () => {
    console.log('doZoom() -- zoomT: ' + zoomT)
    zoomT += zoomIncr

    if (zoomT > 0 && zoomT < 1) {
      // update node params
      updateZoom()
      // repeat
      setTimeout(doZoom, 30)
    }

    // if, after that, we're out of bounds, then we're done
    if (zoomT < 0 || zoomT > 1) {
      // update node params with end values
      zoomT = Math.max(Math.min(zoomT, 1.0), 0.0)
      updateZoom()
      // next state
      if (zoomIncr > 0) {
        setState(OverlayStates.ZOOMED_IN)
      } else {
        setState(OverlayStates.IDLE)
      }
      console.log('done zooming')
    }
  }

  const hitBox = (x, y, rectX, rectY, width, height) => {
    return x >= rectX && x < rectX + width && y >= rectY && y < rectY + height
  }

  const hitCircle = (x, y, circX, circY, radius) => {
    const dx = circX - x
    const dy = circY - y
    return dx * dx + dy * dy <= radius * radius
  }

  const nodeAt = (x, y) => {
    var result = null
    const videoNodes = globalNodeGraph.rootVideoNode.nodes
    for (let i = videoNodes.length - 1; i >= 0; i--) {
      const node = videoNodes[i]
      if (
        hitBox(x, y, node.destX, node.destY, node.destWidth, node.destHeight)
      ) {
        result = node
        break
      }
    }
    return result
  }

  const videoNodeToTop = (node) => {
    const videoNodes = globalNodeGraph.rootVideoNode.nodes
    var nodeIndex = -1
    for (let i = videoNodes.length - 1; i >= 0; i--) {
      if (videoNodes[i] == node) {
        nodeIndex = i
        break
      }
    }

    if (nodeIndex >= 0) {
      // move the node from nodeIndex to (videoNodes.length - 1) [the end of the array]
      videoNodes.splice(
        videoNodes.length - 1,
        0,
        videoNodes.splice(nodeIndex, 1)[0]
      )
    } else {
      // else : not found
      console.log('node not found')
    }
  }

  const getAudioNodeByName = (streamGuid) => {
    let result = null
    const audioNodes = globalNodeGraph.rootAudioNode.nodes
    for (let i = audioNodes.length - 1; i >= 0; i--) {
      if (audioNodes[i].streamGuid === streamGuid) {
        result = audioNodes[i]
        break
      }
    }
    return result
  }

  const setGain = (streamGuid, gain) => {
    const audioNodes = globalNodeGraph.rootAudioNode.nodes
    for (const node of audioNodes) {
      if (node.streamGuid === streamGuid) {
        node.gain = gain
        brewmixer.updateRenderTrees(
          host,
          jwt,
          smVersion,
          nodeGroupName,
          eventId,
          [globalNodeGraph]
        )
        break
      }
    }
  }

  function logSwapAvail() {
    console.log('--swapAvail--')
    for (const s of swapAvail) {
      console.log('  ' + s)
    }
    console.log('-------------')
  }

  // EVENTS >>

  const clickCanvas = (event) => {
    console.log(
      `click at ${event.clientX}, ${event.clientY}, currentState state ${currentState} -- detail: ${event.detail}`
    )
    if (event.detail == 1) {
      let audioNode
      // if single-click
      if (
        currentState == OverlayStates.IDLE ||
        currentState == OverlayStates.SELECTED
      ) {
        const x = event.clientX - canvas.getBoundingClientRect().left
        const y = event.clientY - canvas.getBoundingClientRect().top

        var node = nodeAt(x, y)
        if (node != null && currentState == OverlayStates.IDLE) {
          selectedNode = node
          videoNodeToTop(selectedNode)
          brewmixer.updateRenderTrees(
            host,
            jwt,
            smVersion,
            nodeGroupName,
            eventId,
            [globalNodeGraph]
          )
          setState(OverlayStates.SELECTED)
        } else if (currentState == OverlayStates.SELECTED) {
          var handled = false
          if (node == selectedNode) {
            handled = true
            const drawParams = calculateDrawParams()

            // - microphone
            if (
              hitBox(
                x,
                y,
                drawParams.centerX + drawParams.quarterWidth - 28,
                drawParams.centerY - 45,
                56,
                90
              )
            ) {
              if (audioSet.has(selectedNode.streamGuid)) {
                audioSet.delete(selectedNode.streamGuid)
                setGain(selectedNode.streamGuid, -100)
              } else {
                audioSet.add(selectedNode.streamGuid)
                setGain(selectedNode.streamGuid, -6)
              }
              drawCanvas()
            }
            // - swap
            else if (
              hitBox(
                x,
                y,
                drawParams.centerX - drawParams.quarterWidth - 30,
                drawParams.centerY - 30,
                60,
                60
              )
            ) {
              console.log('swap ' + selectedNode.streamGuid)

              if (swapped.has(selectedNode.streamGuid)) {
                const swap = selectedNode.streamGuid
                const prev = swapped.get(selectedNode.streamGuid)
                swapped.delete(swap)
                selectedNode.streamGuid = prev
                console.log('swapping back to ' + prev)

                audioNode = getAudioNodeByName(swap)
                if (audioNode) {
                  audioNode.streamGuid = prev
                }

                brewmixer.updateRenderTrees(
                  host,
                  jwt,
                  smVersion,
                  nodeGroupName,
                  eventId,
                  [globalNodeGraph]
                )
                drawCanvas()
              } else {
                // update swap avail
                fetchSwapStreams().then((streamList) => {
                  swapAvail = []
                  for (const stream of streamList) {
                    if (!swapped.has(stream)) {
                      swapAvail.push(stream)
                    }
                  }

                  logSwapAvail()
                  if (swapAvail.length > 0 && gridWidth < 4) {
                    const swap = swapAvail.pop()
                    const prev = selectedNode.streamGuid
                    swapped.set(swap, prev)
                    selectedNode.streamGuid = swap

                    audioNode = getAudioNodeByName(prev)
                    if (audioNode) {
                      audioNode.streamGuid = swap
                    }

                    brewmixer.updateRenderTrees(
                      host,
                      jwt,
                      smVersion,
                      nodeGroupName,
                      eventId,
                      [globalNodeGraph]
                    )
                  } else {
                    if (swapAvail.length == 0) {
                      console.log("don't swap: no swap stream available.")
                    } else if (gridWidth >= 4) {
                      console.log("don't swap: large layout")
                    }
                  }
                  drawCanvas()
                })
              }
            }
          }

          if (!handled) {
            // if no hit, click outside selected: deselect
            setState(OverlayStates.IDLE)
          }
        }
      }
    } else {
      console.log('ignore click, state: ' + currentState)
    }
  }

  const doubleClickCanvas = (event) => {
    console.log(
      `doubleClickCanvas at ${event.clientX}, ${event.clientY}, cur state ${currentState}`
    )
    if (
      currentState == OverlayStates.IDLE ||
      currentState == OverlayStates.SELECTED
    ) {
      const x = event.clientX - canvas.getBoundingClientRect().left
      const y = event.clientY - canvas.getBoundingClientRect().top

      var node = nodeAt(x, y)
      if (node) {
        // start zooming in
        zoomNode = node
        videoNodeToTop(node)
        zoomInitial = structuredClone(node)
        zoomT = 0.0
        zoomIncr = 0.14
        setState(OverlayStates.ZOOMING)
        brewmixer.updateRenderTrees(
          host,
          jwt,
          smVersion,
          nodeGroupName,
          eventId,
          [globalNodeGraph]
        )
        setTimeout(doZoom, 30)
      }
      // else, they clicked empty space: no-op
    } else if (currentState == OverlayStates.ZOOMED_IN) {
      // start zooming out
      zoomT = 1.0
      zoomIncr = -0.14
      setState(OverlayStates.ZOOMING)
      setTimeout(doZoom, 30)
    }
  }

  const onMouseDown = (event) => {
    canvas.addEventListener('mousemove', onMouseMove)
    isMouseDown = false // true only when dragging

    if (currentState == OverlayStates.SELECTED) {
      const x = event.clientX - canvas.getBoundingClientRect().left
      const y = event.clientY - canvas.getBoundingClientRect().top
      //				console.log(`onMouseDown at ${event.clientX}, ${event.clientY}, cur state ${curState}`);

      // if in state SELECTED, check if we clicked a drag handle inside the selected video
      const drawParams = calculateDrawParams()
      var dragging = false
      if (hitCircle(x, y, drawParams.centerX, drawParams.centerY, 70)) {
        dragTarget = MOVE_HANDLE
        isMouseDown = true

        setState(OverlayStates.MOVING)
      } else if (hitBox(x, y, drawParams.x, drawParams.y, 70, 70)) {
        dragTarget = Direction.NORTHWEST
        dragging = true
      } else if (
        hitBox(x, y, drawParams.x + drawParams.width - 70, drawParams.y, 70, 70)
      ) {
        dragTarget = Direction.NORTHEAST
        dragging = true
      } else if (
        hitBox(
          x,
          y,
          drawParams.x + drawParams.width - 70,
          drawParams.y + drawParams.height - 70,
          70,
          70
        )
      ) {
        dragTarget = Direction.SOUTHEAST
        dragging = true
      } else if (
        hitBox(
          x,
          y,
          drawParams.x,
          drawParams.y + drawParams.height - 70,
          70,
          70
        )
      ) {
        dragTarget = Direction.SOUTHWEST
        dragging = true
      }

      if (dragging) {
        dragX = x - drawParams.x
        dragY = y - drawParams.y

        zoomInitial = structuredClone(selectedNode)
        isMouseDown = true
        setState(OverlayStates.RESIZING)
      }
    }
  }

  const onMouseUp = () => {
    canvas.removeEventListener('mousemove', onMouseMove)
    isMouseDown = false
    if (
      currentState == OverlayStates.RESIZING ||
      currentState == OverlayStates.MOVING
    ) {
      setState(OverlayStates.SELECTED)
    }
  }

  const onMouseMove = (event) => {
    if (isMouseDown) {
      if (currentState == OverlayStates.MOVING && dragTarget == MOVE_HANDLE) {
        const x = event.clientX - canvas.getBoundingClientRect().left
        const y = event.clientY - canvas.getBoundingClientRect().top
        const drawParams = calculateDrawParams()

        selectedNode.destX = x - drawParams.halfWidth
        selectedNode.destY = y - drawParams.halfHeight

        drawCanvas()

        brewmixer.updateRenderTrees(
          host,
          jwt,
          smVersion,
          nodeGroupName,
          eventId,
          [globalNodeGraph]
        )
      } else if (currentState == OverlayStates.RESIZING) {
        let w, h
        const x = event.clientX - canvas.getBoundingClientRect().left
        const y = event.clientY - canvas.getBoundingClientRect().top
        const drawParams = calculateDrawParams()

        if (dragTarget == Direction.NORTHWEST) {
          selectedNode.destX = x - dragX
          selectedNode.destY = y - dragY

          w = zoomInitial.destX - selectedNode.destX + zoomInitial.destWidth
          h = zoomInitial.destY - selectedNode.destY + zoomInitial.destHeight

          selectedNode.destWidth = w
          selectedNode.destHeight = h
          drawCanvas()

          brewmixer.updateRenderTrees(
            host,
            jwt,
            smVersion,
            nodeGroupName,
            eventId,
            [globalNodeGraph]
          )
        } else if (dragTarget == Direction.NORTHEAST) {
          w = x - drawParams.x

          selectedNode.destY = y - dragY
          h = zoomInitial.destY - selectedNode.destY + zoomInitial.destHeight

          selectedNode.destWidth = w
          selectedNode.destHeight = h
          drawCanvas()

          brewmixer.updateRenderTrees(
            host,
            jwt,
            smVersion,
            nodeGroupName,
            eventId,
            [globalNodeGraph]
          )
        } else if (dragTarget == Direction.SOUTHWEST) {
          selectedNode.destX = x - dragX

          w = zoomInitial.destX - selectedNode.destX + zoomInitial.destWidth
          h = y - drawParams.y

          selectedNode.destWidth = w
          selectedNode.destHeight = h
          drawCanvas()

          brewmixer.updateRenderTrees(
            host,
            jwt,
            smVersion,
            nodeGroupName,
            eventId,
            [globalNodeGraph]
          )
        } else if (dragTarget == Direction.SOUTHEAST) {
          w = x - drawParams.x
          h = y - drawParams.y

          selectedNode.destWidth = w
          selectedNode.destHeight = h
          drawCanvas()

          brewmixer.updateRenderTrees(
            host,
            jwt,
            smVersion,
            nodeGroupName,
            eventId,
            [globalNodeGraph]
          )
        }
      } else {
        //					console.log(`mouse moving but some other state, cur state ${curState}`);
      }
    } else {
      //				console.log(`mouse moving but not mouse down, cur state ${curState}`);
    }
  }

  const initCanvasEvents = () => {
    canvas.addEventListener('click', clickCanvas)
    canvas.addEventListener('dblclick', doubleClickCanvas)

    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mouseup', onMouseUp)
  }
  // << EVENTS

  // << CANVAS

  const toggleRenderTree = () => {
    activeTreeBox.classList.toggle('hidden')
    activeTreeBox.classList.toggle('offscreen')
  }

  const submitUserTree = () => {
    globalNodeGraph = JSON.parse(activeNodeGraph.value)
    brewmixer.updateRenderTrees(host, jwt, smVersion, nodeGroupName, eventId, [
      globalNodeGraph,
    ])
    // toggleRenderTree()
  }

  const onSubscriberEvent = (event) => {
    const { type } = event
    if (type !== 'Subscribe.Time.Update') {
      console.log('[Red5ProSubscriber] :: ' + type + '.')
    }
  }

  const startSubscription = async () => {
    currentState = OverlayStates.IDLE
    try {
      const { RTCSubscriber, WHEPClient } = window.red5prosdk
      const { preferWhipWhep } = configuration
      const config = getConfiguration()
      const subscriber = preferWhipWhep ? new WHEPClient() : new RTCSubscriber()
      subscriber.on('*', onSubscriberEvent)
      await subscriber.init(config)
      await subscriber.subscribe()
    } catch (error) {
      console.error(
        '[Red5ProSubscriber] :: Error in access of Edge IP: ' +
          error +
          ' for stream ' +
          getConfiguration().streamName
      )
    }
  }

  const toggleMute = () => {
    video.muted = !video.muted
    document.querySelector('#unmuteButton').classList.toggle('hidden')
    document.querySelector('#muteButton').classList.toggle('hidden')
  }

  const fetchSwapStreams = async () => {
    const { host, streamManagerAPI } = configuration
    const { protocol, port } = getSocketLocationFromProtocol(host)
    const url = `${
      protocol === 'ws' ? 'http' : 'https'
    }://${host}:${port}/as/${streamManagerAPI}/streams/stream/${nodeGroupName}`
    try {
      const response = await fetch(url)
      let result = []
      if (response.ok) {
        const streams = await response.json()
        if (streams && streams.length > 0) {
          for (const stream of streams) {
            // exclude the streams matching the regex, and the mixer's own output stream
            // (if you include the mixer output stream as a swap stream, you'll get a hall of mirrors)
            if (
              !STREAM_REGEX.test(stream) &&
              stream !==
                mixerStreamName /* mixer stream name -- comment out for hall of mirrors */
            ) {
              result.push(`${configuration.app}/${stream}`)
            }
          }
        }
      } else {
        console.log('RENDERTREE RESPONSE ERROR ' + response.status)
      }
      return result
    } catch (error) {
      console.log('hey i caught this error: ' + error)
    }
  }

  // ============= SLOP ===============
  const initStreamGuid = () => {
    if (!mixerStreamGuid) {
      mixerStreamGuid = `${configuration.app}/mix1`
    }

    var index = !mixerStreamGuid ? 0 : mixerStreamGuid.lastIndexOf('/')
    mixerStreamPath = !mixerStreamGuid
      ? ''
      : mixerStreamGuid.substring(0, index)
    mixerStreamName = !mixerStreamGuid
      ? ''
      : mixerStreamGuid.substring(index + 1)

    mixerGuidField.value = mixerStreamGuid
  }
  initStreamGuid()

  // ============= INITIALIZATION ===============
  const startNewMixer = async () => {
    mixerFormSubmit.disabled = true
    mixerStreamGuid = mixerGuidField.value
    initStreamGuid()

    const eventId = document.getElementById('eventIdField').value
    const outputWidth = document.getElementById('outputWidth').value
    const outputHeight = document.getElementById('outputHeight').value
    const bitrate = document.getElementById('bitrate').value
    const qpmin = document.getElementById('qpmin').value
    const qpmax = document.getElementById('qpmax').value
    const maxbitrate = document.getElementById('maxbitrate').value
    const framerate = document.getElementById('framerate').value
    const audiorate = document.getElementById('audiorate').value

    const request = {
      eventId: eventId,
      streamGuid: mixerStreamGuid,
      width: outputWidth,
      height: outputHeight,
      frameRate: framerate,
      bitRate: bitrate,
      maxBitRate: maxbitrate,
      qpMin: qpmin,
      qpMax: qpmax,
      audioSampleRate: audiorate,
      audioChannels: 2,
      subMixes: 1,
    }

    const response = await brewmixer.createMixerEvent(
      host,
      jwt,
      smVersion,
      nodeGroupName,
      request
    )
    if (response.ok) {
      console.log('createMixerEvent response: ' + response.text)

      // create the default nodegraph
      globalNodeGraph = JSON.parse(defaultGraphValue)[0]
      brewmixer.updateRenderTrees(
        host,
        jwt,
        smVersion,
        nodeGroupName,
        eventId,
        [globalNodeGraph]
      )

      // sleep before subscribe
      await new Promise((r) => setTimeout(r, 1000))
      // init / start subscription
      init(getConfiguration(), 'stream')
    } else {
      try {
        const responseObj = JSON.parse(response)
        console.log('Error:\n', JSON.stringify(responseObj, null, 4)) // pretty
      } catch (e) {
        console.log('Error:\n', response)
      }
    }
  }

  const stopMixer = async () => {
    if (window.confirm('Really stop mixer and end stream?')) {
      await brewmixer.stopMixerEvent(
        host,
        jwt,
        smVersion,
        nodeGroupName,
        eventId
      )
      // refresh page/reset
      location.reload()
    }
  }

  // lay the videos out in a grid of sideLength x sideLength cells
  // we assume all input videos are streaming, and named stream1 through streamn
  // and that each input is 1920x1080.
  // and that the mixer is also 1920x1080
  const reGrid = (sideLength) => {
    const vid = document.getElementById('red5pro-subscriber')
    let cellSourceWidth = vid.videoWidth,
      cellSourceHeight = vid.videoHeight
    gridWidth = sideLength
    gridHeight = sideLength <= 4 ? sideLength : 4 // special case for 6x4 grid;

    let cellWidth
    let cellHeight
    let xOffset
    if (sideLength <= 4) {
      cellWidth = cellSourceWidth / gridWidth
      cellHeight = cellSourceHeight / gridHeight
      xOffset = 0
    } else {
      // this is a special case where we know the source videos are SQUARE
      cellSourceWidth = cellSourceHeight
      cellHeight = cellSourceHeight / gridHeight
      cellWidth = cellHeight

      xOffset = 0.5 * (cellSourceWidth - cellWidth * gridWidth)
    }

    globalNodeGraph.rootVideoNode.nodes.length = 1 // clear the array, but keep the first node (the SolidColorNode)
    globalNodeGraph.rootAudioNode.nodes.length = 0 // clear the source audio nodes (this keeps the SumNode at rootAudioNode.node)
    for (let j = 0; j < gridHeight; j++) {
      for (let i = 0; i < gridWidth; i++) {
        let sName = guids[j * gridWidth + i]
        let cell = {}
        cell.node = 'VideoSourceNode'
        cell.streamGuid = sName
        cell.sourceX = 0
        cell.sourceY = 0
        cell.sourceWidth = cellSourceWidth
        cell.sourceHeight = cellSourceHeight
        cell.destX = xOffset + cellWidth * i
        cell.destY = cellHeight * j
        cell.destWidth = cellWidth
        cell.destHeight = cellHeight

        globalNodeGraph.rootVideoNode.nodes.push(cell)

        let acell = {}
        acell.streamGuid = sName
        acell.pan = 0

        if (audioSet.has(cell.streamGuid)) {
          acell.gain = -6.0
        } else {
          acell.gain = -100
        }

        acell.node = 'AudioSourceNode'
        globalNodeGraph.rootAudioNode.nodes.push(acell)
      }
    }

    brewmixer.updateRenderTrees(host, jwt, smVersion, nodeGroupName, eventId, [
      globalNodeGraph,
    ])
  }

  const init = async (configuration, prefix = 'stream') => {
    const { app, host } = configuration

    for (let i = 0; i < GUID_COUNT; i++) {
      guids[i] = `${app}/${prefix}${i + 1}`
    }

    window.addEventListener('resize', resizeOverlayCanvas)

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.borderBoxSize?.length > 0) {
          sizeCanvas(
            entry.borderBoxSize[0].inlineSize,
            entry.borderBoxSize[0].blockSize
          )
        } else {
          sizeCanvas(entry.contentRect.width, entry.contentRect.height)
        }
      }
    })
    resizeObserver.observe(video)

    initCanvasEvents()

    if (!jwt) {
      // This JWT will expire, but we cache it forever with no strategy to update
      jwt = await streamManagerUtil.authenticate(
        host,
        smVersion,
        streamManagerUser,
        streamManagerPassword
      )
    }

    // first, use the query params and try to get the nodegraph for the specified stream (if any).
    // if it exists, start subscription, show controls etc
    // [if it doesn't exist, only show the Start New Mixer controls (default behavior for simplicity)]
    const renderTrees = await brewmixer.getRenderTrees(
      host,
      jwt,
      smVersion,
      nodeGroupName,
      eventId
    )
    if (renderTrees) {
      activeNodeGraph.value = JSON.stringify(renderTrees[0], null, 2)

      // show controls
      startComp.classList.toggle('hidden', true)
      startComp.classList.toggle('offscreen', true)
      // playerContainer.classList.toggle('hidden', (force = false))
      // videoControls.classList.toggle('hidden') //, (force = false))

      activeTreeBox.classList.toggle('hidden', true)
      activeTreeBox.classList.toggle('offscreen', true)

      // assign the global ref
      globalNodeGraph = renderTrees[0]

      // start subscription;
      startSubscription()
    } else {
      mixerFormSubmit.disabled = false
    }

    const streamList = await fetchSwapStreams()
    swapAvail.concat(streamList)

    // if they stop the mixer, hide the other controls and revert to only New Mixer controls.
    // rely on the subscriber client to stop on its own.
  }

  window.onload = () => {
    mixerFormSubmit.disabled = true
    init(getConfiguration(), 'stream')
  }
  // ============= INITIALIZATION ===============
})(
  window,
  window.red5prosdk,
  window.streamManagerUtil,
  window.brewmixer,
  window.getCoordinates
)
