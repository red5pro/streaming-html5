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
  const ZOOM_DELAY = 30
  const {
    host,
    streamManagerUser,
    streamManagerPassword,
    streamManagerAPI: smVersion,
    streamManagerNodeGroup: nodeGroupName,
  } = configuration

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
    const { path, name } = pathAndNameFromGuid(mixerStreamGuid)
    const {
      host,
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
      ? `${protocol}://${host}:${port}/as/${streamManagerAPI}/proxy/ws/subscribe/${path}/${name}`
      : `${httpProtocol}://${host}:${port}/as/${streamManagerAPI}/proxy/whep/${path}/${name}`

    var connectionParams = params
      ? { ...params, ...getAuthenticationParams().connectionParams }
      : getAuthenticationParams().connectionParams

    var rtcConfig = {
      ...configuration,
      endpoint,
      app: path,
      streamName: name,
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
  let eventId = urlParams.get('event') || 'event1'
  let mixerStreamGuid = urlParams.get('mixer') || 'live/mix1'

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
  const eventIdField = document.getElementById('eventIdField')
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
    setState(OverlayStates.IDLE)
    submitUserTree()
  })

  // ============= DRAWING FUNCTIONS ===============
  const drawMoveHandle = (ctx, drawParams, scale = 1.0) => {
    // =================================
    // circular drag handle
    const { centerX, centerY } = drawParams
    const size = 32 * scale
    ctx.beginPath()
    ctx.ellipse(centerX, centerY, size, size, 0, 0, 360)
    ctx.stroke()
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
    ctx.lineTo(centerX + quarterWidth, centerY + (26 + 16) * scale)
    ctx.moveTo(centerX + quarterWidth - 20 * scale, centerY + (26 + 16) * scale)
    ctx.lineTo(centerX + quarterWidth + 20 * scale, centerY + (26 + 16) * scale)
    ctx.stroke()
  }

  const drawSwapIcon = (ctx, drawParams, scale = 1.0) => {
    const { centerX, centerY, quarterWidth } = drawParams
    // =================================
    const width = quarterWidth
    const length = 15 * scale
    // swap icon
    ctx.fillRect(centerX - width - length, centerY - length - 3, length * 3, 3)
    ctx.beginPath()
    ctx.moveTo(centerX - width - length, centerY - length)
    ctx.lineTo(centerX - width - length, centerY - length - 12)
    ctx.lineTo(centerX - width - length * 2, centerY - length)
    ctx.fill()

    ctx.fillRect(centerX - width - length * 2, centerY + length, length * 3, 3)
    ctx.beginPath()
    ctx.moveTo(centerX - width + length, centerY + length)
    ctx.lineTo(centerX - width + length, centerY + length + 12)
    ctx.lineTo(centerX - width + length * 2, centerY + length)
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

  const getCoords = () => {
    const { clientWidth, clientHeight } = video
    const { videoWidth, videoHeight } = video
    return getCoordinates(videoWidth, videoHeight, clientWidth, clientHeight)
  }

  const calculateDrawParams = () => {
    if (!selectedNode) {
      return
    }
    const coords = getCoords()
    const {
      x: coordX,
      y: coordY,
      width: coordWidth,
      height: coordHeight,
      xscale,
      yscale,
      widthPercentage,
      heightPercentage,
    } = coords

    const { destX, destY, destWidth, destHeight, sourceWidth, sourceHeight } =
      selectedNode

    const destPercWidth = destWidth / sourceWidth
    const destPercHeight = destHeight / sourceHeight
    const x = coordX + destX * widthPercentage
    const y = coordY + destY * heightPercentage
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
      scaleWidth: xscale,
      scaleHeight: yscale,
    }

    // console.log('SELECTED', JSON.stringify(selectedNode, null, 2))
    return drawParams
  }

  const drawCanvas = () => {
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'rgba(0,0,0,0)'
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const drawParams = calculateDrawParams()
    if (!drawParams) {
      return
    }
    const { scaleWidth: percWidth, scaleHeight: percHeight } = drawParams
    const scale = Math.min(percWidth, percHeight)

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
      console.log('DRAW CANVAS:SELECTED', JSON.stringify(drawParams, null, 2))
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.lineWidth = 4
      ctx.strokeStyle = 'rgba(255,255,255,255)'
      ctx.fillStyle = 'rgba(255,255,255,255)'

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
    } else if (
      currentState == OverlayStates.RESIZING ||
      currentState == OverlayStates.MOVING
    ) {
      // highlight the active resize control
      console.log('DRAW CANVAS:MOVE/RESIZE')

      // first draw in white
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.lineWidth = 4
      ctx.strokeStyle = 'rgba(255,255,255,255)'
      ctx.fillStyle = 'rgba(255,255,255,255)'

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

  const updateZoom = async () => {
    var w0 = zoomInitial.destWidth
    var h0 = zoomInitial.destHeight
    var x0 = zoomInitial.destX
    var y0 = zoomInitial.destY

    var x1 = 0.0
    var y1 = 0.0
    var w1 = video.videoWidth
    var h1 = video.videoHeight

    var x = lerp(x0, x1, zoomT)
    var y = lerp(y0, y1, zoomT)
    var w = lerp(w0, w1, zoomT)
    var h = lerp(h0, h1, zoomT)

    zoomNode.destX = x
    zoomNode.destY = y
    zoomNode.destWidth = w
    zoomNode.destHeight = h

    await brewmixer.updateRenderTrees(
      host,
      jwt,
      smVersion,
      nodeGroupName,
      eventId,
      [globalNodeGraph],
      false
    )
  }

  const doZoom = () => {
    console.log('doZoom() -- zoomT: ' + zoomT)
    zoomT += zoomIncr

    if (zoomT > 0 && zoomT < 1) {
      // update node params
      updateZoom()
      // repeat
      setTimeout(doZoom, ZOOM_DELAY)
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
    const dx = x - circX
    const dy = y - circY
    console.log('HIT CIRCLE', x, y, circX, circY, radius)
    console.log('HIT CIRCLE:2', dx, dy, dx * dx + dy * dy, radius * radius)
    const distance = Math.sqrt(dx ** 2 + dy ** 2)
    return distance <= radius
  }

  const nodeAt = (x, y) => {
    const videoNodes = globalNodeGraph.rootVideoNode.nodes
    let result = null
    let i = videoNodes.length
    const { widthPercentage, heightPercentage } = getCoords()
    while (--i > 0) {
      const node = videoNodes[i]
      const { streamGuid, destX, destY, destWidth, destHeight } = node
      const scaleX = destX * widthPercentage
      const scaleY = destY * heightPercentage
      const scaleWidth = destWidth * widthPercentage
      const scaleHeight = destHeight * heightPercentage
      console.log(
        `nodeAt ${streamGuid}: ${scaleX}, ${scaleY}, ${scaleWidth}, ${scaleHeight}`
      )
      if (hitBox(x, y, scaleX, scaleY, scaleWidth, scaleHeight)) {
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
    const coords = getCoords()
    const { offsetX, offsetY } = event
    const x = offsetX - coords.x
    const y = offsetY - coords.y
    console.log(
      `click at ${x}, ${y}, currentState state ${currentState} -- detail: ${event.detail}`
    )
    if (event.detail == 1) {
      let audioNode
      // if single-click
      if (
        currentState == OverlayStates.IDLE ||
        currentState == OverlayStates.SELECTED
      ) {
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
    const coords = getCoords()
    const { offsetX, offsetY } = event
    const x = offsetX - coords.x
    const y = offsetY - coords.y
    console.log(`doubleClickCanvas at ${x}, ${y}, cur state ${currentState}`)
    if (
      currentState == OverlayStates.IDLE ||
      currentState == OverlayStates.SELECTED
    ) {
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
          [globalNodeGraph],
          false
        )
        setTimeout(doZoom, ZOOM_DELAY)
      }
      // else, they clicked empty space: no-op
    } else if (currentState == OverlayStates.ZOOMED_IN) {
      // start zooming out
      zoomT = 1.0
      zoomIncr = -0.14
      setState(OverlayStates.ZOOMING)
      setTimeout(doZoom, ZOOM_DELAY)
    }
  }

  const onMouseDown = (event) => {
    canvas.addEventListener('mousemove', onMouseMove)
    const { offsetX, offsetY } = event
    const x = offsetX
    const y = offsetY
    const radius = 70
    isMouseDown = false // true only when dragging

    if (currentState == OverlayStates.SELECTED) {
      // if in state SELECTED, check if we clicked a drag handle inside the selected video
      const drawParams = calculateDrawParams()
      var dragging = false
      if (hitCircle(x, y, drawParams.centerX, drawParams.centerY, radius)) {
        dragTarget = MOVE_HANDLE
        isMouseDown = true
        setState(OverlayStates.MOVING)
      } else if (hitBox(x, y, drawParams.x, drawParams.y, radius, radius)) {
        dragTarget = Direction.NORTHWEST
        dragging = true
      } else if (
        hitBox(
          x,
          y,
          drawParams.x + drawParams.width - radius,
          drawParams.y,
          radius,
          radius
        )
      ) {
        dragTarget = Direction.NORTHEAST
        dragging = true
      } else if (
        hitBox(
          x,
          y,
          drawParams.x + drawParams.width - radius,
          drawParams.y + drawParams.height - radius,
          radius,
          radius
        )
      ) {
        dragTarget = Direction.SOUTHEAST
        dragging = true
      } else if (
        hitBox(
          x,
          y,
          drawParams.x,
          drawParams.y + drawParams.height - radius,
          radius,
          radius
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
    const coords = getCoords()
    const { offsetX, offsetY } = event
    const x = (offsetX - coords.x) / coords.widthPercentage
    const y = (offsetY - coords.y) / coords.heightPercentage
    if (isMouseDown) {
      if (currentState == OverlayStates.MOVING && dragTarget == MOVE_HANDLE) {
        const { destWidth, destHeight } = selectedNode
        selectedNode.destX = x - destWidth / 2
        selectedNode.destY = y - destHeight / 2
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
        const drawParams = calculateDrawParams()
        if (dragTarget == Direction.NORTHWEST) {
          console.log('DRAG', x, dragX)
          selectedNode.destX = x - dragX / coords.widthPercentage
          selectedNode.destY = y - dragY / coords.heightPercentage

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
          console.log('DRAG', x, dragX)
          console.log(
            'DRAG:thing',
            dragX,
            selectedNode.destX,
            selectedNode.destWidth
          )
          w = x - selectedNode.destX
          // w = x + dragX * coords.widthPercentage - selectedNode.destX

          selectedNode.destY = y - dragY / coords.heightPercentage
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
          selectedNode.destX = x - dragX / coords.widthPercentage

          w = zoomInitial.destX - selectedNode.destX + zoomInitial.destWidth
          h = y - drawParams.y / coords.heightPercentage

          selectedNode.destWidth = w
          selectedNode.destHeight = h + selectedNode.destY
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
          w = x - drawParams.x / coords.widthPercentage
          h = y - drawParams.y / coords.heightPercentage

          selectedNode.destWidth = w
          selectedNode.destHeight = h + selectedNode.destY
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

  const renderTreeManifestUpdate = (manifest) => {
    activeNodeGraph.value = JSON.stringify(manifest, null, 2)
    globalNodeGraph = manifest
  }

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

  brewmixer.manifestDelegate = renderTreeManifestUpdate

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
  const pathAndNameFromGuid = (guid) => {
    var index = !guid ? 0 : guid.lastIndexOf('/')
    var path = !guid ? '' : guid.substring(0, index)
    var name = !guid ? '' : guid.substring(index + 1)
    return { path, name }
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
  // we assume all input videos are streaming, and named stream1 through stream<N>
  // and that each input is the same aspect ratio as the single output
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
      let nodeCount = 3
      try {
        nodeCount = renderTrees[0].rootVideoNode.nodes.filter(
          (n) => n.node === 'VideoSourceNode'
        ).length
      } catch (e) {
        console.log('error parsing render tree')
      }

      // show controls
      startComp.classList.toggle('hidden', true)
      startComp.classList.toggle('offscreen', true)
      activeTreeBox.classList.toggle('hidden', true)
      activeTreeBox.classList.toggle('offscreen', true)

      const columns = Math.sqrt(nodeCount)
      const control = Array.from(radioButtons).find(
        (control) => control.value === '' + columns
      )
      if (control) {
        control.checked = true
      }

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
    eventIdField.value = eventId
    mixerGuidField.value = mixerStreamGuid
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
