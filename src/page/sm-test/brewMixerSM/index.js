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

  const streamDetailsField = document.getElementById('stream-field')
  const endpointField = document.getElementById('endpoint-field')
  const subscribeStatus = document.getElementById('subscribeStatus')
  const subscribeStatusMessage = document.getElementById('subscribeStatusMessage')
  const subscribeStatusDetail = document.getElementById('subscribeStatusDetail')
  const subscribeStatusCancel = document.getElementById('subscribeStatusCancel')

  let jwt
  // RTA credentials supplied by the start-mixer form. When set, these flow into
  // both the createMixerEvent body (for the mixer's outbound publish to origin)
  // and the WHEP subscribe connectionParams. Per the testing convention, we
  // assume publisher creds are sufficient to subscribe; in production an origin
  // may distinguish them, but for this testbed they're the same.
  let mixerRtaCredentials = null
  let guids = []
  const GUID_COUNT = 25
  const ZOOM_DELAY = 30
  // Stream-Manager-specific config defaults from sessionStorage. These are
  // populated into the form on page load so the user can see and override them
  // per-run. After the user clicks START, these vars are reassigned from the
  // form values and used for SM auth, AS-Streams calls, and WHEP endpoint
  // construction.
  let host = configuration.host
  let streamManagerUser = configuration.streamManagerUser
  let streamManagerPassword = configuration.streamManagerPassword
  let smVersion = configuration.streamManagerAPI
  let nodeGroupName = configuration.streamManagerNodeGroup
  let smRegion = configuration.streamManagerRegion

  let ipReg = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
  let localhostReg = /^localhost.*/
  let isIPOrLocalhost = host => ipReg.exec(host) || localhostReg.exec(host)

  const getSocketLocationFromProtocol = host => {
    return isIPOrLocalhost(host)
      ? { protocol: 'ws', port: serverSettings.wsport }
      : { protocol: 'wss', port: serverSettings.wssport }
  }

  const getRegionIfDefined = () => {
    const region = smRegion
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
    // mixer-form RTA creds win over the testbed-wide authentication settings
    // when both are present. The testbed setting is a global default; the mixer
    // form is per-mixer and reflects the publisher creds for this run.
    if (mixerRtaCredentials) {
      const { username, password, token } = mixerRtaCredentials
      return { connectionParams: { username, password, token } }
    }
    const { authentication } = configuration
    const { enabled, username, password, token } = authentication
    return enabled
      ? {
          connectionParams: {
            username,
            password,
            token
          }
        }
      : {}
  }

  const getConfiguration = () => {
    const { path, name } = pathAndNameFromGuid(mixerStreamGuid)
    // Read SM-specific fields from the mutable module vars rather than
    // re-destructuring `configuration`, so form-supplied overrides take effect.
    const { protocol, port } = getSocketLocationFromProtocol(host)

    const region = getRegionIfDefined()
    const params = region
      ? {
          region,
          strict: true
        }
      : undefined

    const httpProtocol = protocol === 'ws' ? 'http' : 'https'
    const endpoint = `${httpProtocol}://${host}:${port}/as/${smVersion}/proxy/whep/${path}/${name}`

    const connectionParams = params
      ? { ...params, ...getAuthenticationParams().connectionParams }
      : getAuthenticationParams().connectionParams

    const rtcConfig = {
      ...configuration,
      endpoint,
      app: path,
      streamName: name,
      connectionParams: {
        ...connectionParams,
        nodeGroup: nodeGroupName
      }
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
    MOVING: 6
  }

  const Direction = {
    EAST: 0,
    NORTHEAST: 1,
    NORTH: 2,
    NORTHWEST: 3,
    WEST: 4,
    SOUTHWEST: 5,
    SOUTH: 6,
    SOUTHEAST: 7
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
  let audioSet = new Set()
  audioSet.add(`${configuration.app}/${configuration.stream1}`) // to match the default nodegraph

  let gridWidth = 2
  let gridHeight = 2
  let isMouseDown = false
  let dragTarget = null
  let dragOffsetX = 0,
    dragOffsetY = 0

  const urlParams = new URLSearchParams(window.location.search)
  let eventId = urlParams.get('event') || 'event1'
  let mixerStreamGuid = urlParams.get('mixer') || 'live/mix1'

  let mixerStreamPath = ''
  let mixerStreamName = ''
  const defaultGraphValue = JSON.stringify([
    {
      rootVideoNode: {
        nodes: [
          {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 1,
            node: 'SolidColorNode'
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
            destHeight: 540
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
            destHeight: 540
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
            destHeight: 540
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
            destHeight: 540
          }
        ],
        node: 'CompositorNode'
      },
      rootAudioNode: {
        nodes: [
          {
            streamGuid: 'live/stream1',
            pan: 0,
            gain: -6,
            node: 'AudioSourceNode'
          },
          {
            streamGuid: 'live/stream2',
            pan: 0,
            gain: -100,
            node: 'AudioSourceNode'
          },
          {
            streamGuid: 'live/stream3',
            pan: 0,
            gain: -100,
            node: 'AudioSourceNode'
          },
          {
            streamGuid: 'live/stream4',
            pan: 0,
            gain: -100,
            node: 'AudioSourceNode'
          }
        ],
        node: 'SumNode'
      }
    }
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
  const mixerCloseButton = document.getElementById('mixerCloseButton')
  const mixerPicker = document.getElementById('mixerPicker')
  const mixerPickerList = document.getElementById('mixerPickerList')
  const smHostField = document.getElementById('smHost')
  const smApiVersionField = document.getElementById('smApiVersion')
  const smAdminUsernameField = document.getElementById('smAdminUsername')
  const smAdminPasswordField = document.getElementById('smAdminPassword')
  const smNodeGroupField = document.getElementById('smNodeGroup')
  const smRegionField = document.getElementById('smRegion')
  const formValidationMessage = document.getElementById('formValidationMessage')

  // Dismiss the Start New Mixer modal without creating a mixer. Used by the
  // close button and the Escape key. The form can't be reopened without a page
  // reload — that's fine, the user is exiting the flow.
  const closeMixerForm = () => {
    startComp.classList.add('hidden')
    startComp.classList.add('offscreen')
  }
  mixerCloseButton.addEventListener('click', event => {
    event.preventDefault()
    closeMixerForm()
  })

  // Per-field password show/hide toggle. Each .toggle-password button has a
  // data-target attribute naming the input id to toggle.
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', event => {
      event.preventDefault()
      const targetId = btn.dataset.target
      const input = document.getElementById(targetId)
      if (!input) {
        return
      }
      input.type = input.type === 'password' ? 'text' : 'password'
      // Eye → eye-in-speech-bubble when revealed (matches debug-ui).
      btn.textContent = input.type === 'password' ? '👁️' : '👁️‍🗨️'
    })
  })
  document.addEventListener('keydown', event => {
    if (
      event.key === 'Escape' &&
      !startComp.classList.contains('hidden')
    ) {
      closeMixerForm()
    }
  })

  const populateSmFormFromSettings = () => {
    smHostField.value = host || ''
    smApiVersionField.value = smVersion || ''
    smAdminUsernameField.value = streamManagerUser || ''
    smAdminPasswordField.value = streamManagerPassword || ''
    smNodeGroupField.value = nodeGroupName || ''
    smRegionField.value = smRegion || ''
  }

  // Validate required form fields. Returns the first invalid field element
  // and a message, or null if everything is valid. On invalid: highlights the
  // field, scrolls to it, focuses it, and shows a message above the submit
  // button.
  const clearFieldErrors = () => {
    document
      .querySelectorAll('.mixer-field-error')
      .forEach(el => el.classList.remove('mixer-field-error'))
    formValidationMessage.classList.add('hidden')
    formValidationMessage.textContent = ''
  }

  const flagFieldInvalid = (field, message) => {
    field.classList.add('mixer-field-error')
    formValidationMessage.textContent = message
    formValidationMessage.classList.remove('hidden')
    field.focus()
    field.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }

  const validateMixerForm = () => {
    clearFieldErrors()
    // (field, message) — checked in order; first failure wins.
    const required = [
      [smHostField, 'SM Host is required.'],
      [smApiVersionField, 'SM API Version is required.'],
      [smAdminUsernameField, 'SM Admin Username is required.'],
      [smAdminPasswordField, 'SM Admin Password is required.'],
      [smNodeGroupField, 'Node Group is required.'],
      [eventIdField, 'Event ID is required.'],
      [mixerGuidField, 'Output GUID is required.']
    ]
    for (const [field, message] of required) {
      if (!field.value || !field.value.trim()) {
        flagFieldInvalid(field, message)
        return false
      }
    }
    return true
  }
  const radioButtons = document.querySelectorAll('input[name="layout"]')
  radioButtons.forEach(radioButton => {
    radioButton.addEventListener('change', async event => {
      const { checked, value } = event.target
      if (checked) {
        reGrid(parseInt(value, 10))
        setState(OverlayStates.IDLE)
      }
    })
  })

  renderTreeToggle.addEventListener('click', event => {
    event.preventDefault()
    toggleRenderTree()
  })
  stopButton.addEventListener('click', event => {
    event.preventDefault()
    stopMixer()
  })
  mixerFormSubmit.addEventListener('click', event => {
    event.preventDefault()
    startNewMixer()
  })
  toggleMuteButton.addEventListener('click', event => {
    event.preventDefault()
    toggleMute()
  })
  renderTreeSubmit.addEventListener('click', event => {
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
      width
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

  const lerp = (a, b, t) => {
    return a * (1.0 - t) + b * t
  }
  // ============= DRAWING FUNCTIONS ===============

  const setState = newState => {
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
      heightPercentage
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

    const drawParams = {
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
      scaleHeight: yscale
    }
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

      drawMoveHandle(ctx, drawParams, scale)
      drawNortheastResize(ctx, drawParams, scale)
      drawNorthwestResize(ctx, drawParams, scale)
      drawSouthwestResize(ctx, drawParams, scale)
      drawSoutheastResize(ctx, drawParams, scale)
      drawMicrophone(ctx, drawParams, scale)

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
    let w0 = zoomInitial.destWidth
    let h0 = zoomInitial.destHeight
    let x0 = zoomInitial.destX
    let y0 = zoomInitial.destY

    let x1 = 0.0
    let y1 = 0.0
    let w1 = video.videoWidth
    let h1 = video.videoHeight

    let x = lerp(x0, x1, zoomT)
    let y = lerp(y0, y1, zoomT)
    let w = lerp(w0, w1, zoomT)
    let h = lerp(h0, h1, zoomT)

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
    }
  }

  const hitBox = (x, y, rectX, rectY, width, height) => {
    return x >= rectX && x < rectX + width && y >= rectY && y < rectY + height
  }

  const hitCircle = (x, y, circX, circY, radius) => {
    const dx = x - circX
    const dy = y - circY
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
      const { destX, destY, destWidth, destHeight } = node
      const scaleX = destX * widthPercentage
      const scaleY = destY * heightPercentage
      const scaleWidth = destWidth * widthPercentage
      const scaleHeight = destHeight * heightPercentage
      if (hitBox(x, y, scaleX, scaleY, scaleWidth, scaleHeight)) {
        result = node
        break
      }
    }
    return result
  }

  const videoNodeToTop = node => {
    const videoNodes = globalNodeGraph.rootVideoNode.nodes
    let nodeIndex = -1
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

  // EVENTS >>

  const clickCanvas = event => {
    const coords = getCoords()
    const { offsetX, offsetY } = event
    const x = offsetX - coords.x
    const y = offsetY - coords.y
    if (event.detail == 1) {
      // if single-click
      if (
        currentState == OverlayStates.IDLE ||
        currentState == OverlayStates.SELECTED
      ) {
        let node = nodeAt(x, y)
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
          let handled = false
          if (node == selectedNode) {
            handled = true
            const drawParams = calculateDrawParams()
            const micWidth = 56
            const micHeight = 90
            // - microphone
            if (
              hitBox(
                offsetX,
                offsetY,
                drawParams.centerX + drawParams.quarterWidth - micWidth / 2,
                drawParams.centerY - micHeight / 2,
                micWidth,
                micHeight
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

  const doubleClickCanvas = event => {
    const coords = getCoords()
    const { offsetX, offsetY } = event
    const x = offsetX - coords.x
    const y = offsetY - coords.y
    if (
      currentState == OverlayStates.IDLE ||
      currentState == OverlayStates.SELECTED
    ) {
      let node = nodeAt(x, y)
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

  const onMouseDown = event => {
    canvas.addEventListener('mousemove', onMouseMove)
    const coords = getCoords()
    const { widthPercentage, heightPercentage } = coords
    const { offsetX, offsetY } = event
    const x = offsetX
    const y = offsetY
    const radius = 70

    const videoDownX = x - coords.x
    const videoDownY = y - coords.y
    const magVideoDownX = videoDownX / widthPercentage
    const magVideoDownY = videoDownY / heightPercentage
    let node = nodeAt(videoDownX, videoDownY)
    let offsetx = 0
    let offsety = 0
    isMouseDown = false // true only when dragging

    if (currentState == OverlayStates.SELECTED) {
      // if in state SELECTED, check if we clicked a drag handle inside the selected video
      const drawParams = calculateDrawParams()
      let dragging = false
      if (hitCircle(x, y, drawParams.centerX, drawParams.centerY, radius)) {
        dragTarget = MOVE_HANDLE
        isMouseDown = true
        setState(OverlayStates.MOVING)
      } else if (hitBox(x, y, drawParams.x, drawParams.y, radius, radius)) {
        dragTarget = Direction.NORTHWEST
        dragging = true
        offsetx = magVideoDownX - node.destX
        offsety = magVideoDownY - node.destY
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
        offsetx = node.destX + node.destWidth - magVideoDownX
        offsety = magVideoDownY - node.destY
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
        offsetx = node.destX + node.destWidth - magVideoDownX
        offsety = magVideoDownY - node.destY - node.destHeight
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
        offsetx = magVideoDownX - node.destX
        offsety = magVideoDownY - node.destY - node.destHeight
      }

      if (dragging) {
        dragOffsetX = offsetx
        dragOffsetY = offsety

        zoomInitial = structuredClone(selectedNode)
        isMouseDown = true
        setState(OverlayStates.RESIZING)
      } else {
        dragOffsetX = dragOffsetY = 0
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

  const onMouseMove = event => {
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
          selectedNode.destX = x - dragOffsetX
          selectedNode.destY = y - dragOffsetY

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
          w = x - drawParams.x / coords.widthPercentage + dragOffsetX

          selectedNode.destY = y - dragOffsetY
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
          selectedNode.destX = x - dragOffsetX

          w = zoomInitial.destX - selectedNode.destX + zoomInitial.destWidth
          h = y - selectedNode.destY - dragOffsetY

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
          w = x - drawParams.x / coords.widthPercentage + dragOffsetX
          h = y - selectedNode.destY - dragOffsetY

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

  const renderTreeManifestUpdate = manifest => {
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
      globalNodeGraph
    ])
    // toggleRenderTree()
  }

  brewmixer.manifestDelegate = renderTreeManifestUpdate

  const onSubscriberEvent = event => {
    const { type } = event
    if (type !== 'Subscribe.Time.Update') {
      console.log('[Red5ProSubscriber] :: ' + type + '.')
      if (type === 'WebRTC.Endpoint.Changed') {
        const { data } = event
        endpointField.innerHTML = `<p>Connected to:</p><p>${data.endpoint}</p>`
      }
    }
  }

  // Single subscribe attempt. Throws on failure so callers can implement retry.
  // Caller is responsible for user-facing error messaging.
  const startSubscription = async () => {
    currentState = OverlayStates.IDLE
    const { WHEPClient } = window.red5prosdk
    const config = getConfiguration()
    const subscriber = new WHEPClient()
    subscriber.on('*', onSubscriberEvent)
    await subscriber.init(config)
    await subscriber.subscribe()
    streamDetailsField.innerHTML = `<p>Stream Guid:</p><p>${config.app}/${config.streamName}</p>`
  }

  // ============= SUBSCRIBE RETRY ===============
  // After a mixer is created, the SM and origin take a moment to register the
  // stream and have it ready for WHEP. We try several times, briefly silently,
  // then surface a status panel with a Cancel button. Each failed attempt also
  // probes the AS-Streams "subscribe" endpoint to disambiguate "SM doesn't have
  // the stream yet" from "SM has it but WebRTC negotiation failed".
  const SUBSCRIBE_INITIAL_DELAY_MS = 2000
  const SUBSCRIBE_RETRY_DELAY_MS = 1500
  const SUBSCRIBE_SILENT_ATTEMPTS = 3
  const SUBSCRIBE_MAX_ATTEMPTS = 15

  let subscribeCancelled = false
  // Set true after a successful createMixerEvent so the cancel button knows
  // there is a real mixer to (offer to) clean up.
  let mixerWasCreated = false
  // Last eventId used for createMixerEvent — needed by the cancel handler so
  // it can call stopMixerEvent without having to thread the value back from
  // startNewMixer.
  let lastCreateEventId = null

  const showSubscribeStatus = (message, detail) => {
    subscribeStatusMessage.textContent = message
    subscribeStatusDetail.textContent = detail || ''
    subscribeStatus.classList.remove('hidden')
  }

  const hideSubscribeStatus = () => {
    subscribeStatus.classList.add('hidden')
  }

  // Re-show the start mixer modal. Used after cancel, so the user can adjust
  // settings and retry without reloading.
  const reopenMixerForm = () => {
    startComp.classList.remove('hidden')
    startComp.classList.remove('offscreen')
    mixerFormSubmit.disabled = false
  }

  subscribeStatusCancel.addEventListener('click', () => {
    subscribeCancelled = true
    let stoppedMixer = false
    if (mixerWasCreated && jwt && lastCreateEventId) {
      if (window.confirm('Stop the mixer?')) {
        try {
          brewmixer.stopMixerEvent(
            host,
            jwt,
            smVersion,
            nodeGroupName,
            lastCreateEventId
          )
          stoppedMixer = true
          mixerWasCreated = false
          console.log('Mixer stopped on cancel:', lastCreateEventId)
        } catch (e) {
          console.warn('Failed to stop mixer on cancel:', e)
        }
      }
    }
    hideSubscribeStatus()
    streamDetailsField.textContent = stoppedMixer
      ? 'Cancelled. Mixer stopped.'
      : mixerWasCreated
        ? 'Subscription cancelled. Mixer is still running.'
        : 'Cancelled.'
    // Bring the form back so the user can adjust and retry.
    reopenMixerForm()
  })

  const formatProbeDetail = probe => {
    if (probe.ok) {
      return `Stream Manager has the stream registered (HTTP ${probe.status}). WebRTC negotiation failed — see console.`
    }
    if (probe.status === 0) {
      return `Stream Manager probe network error: ${probe.body}.`
    }
    if (probe.status === 404) {
      return `Stream Manager doesn't have the stream registered yet (HTTP 404).`
    }
    return `Stream Manager probe returned HTTP ${probe.status}.`
  }

  // freshlyCreated: when true, the mixer was just created and needs a moment
  // to settle on origin/SM before WHEP can succeed — so we wait
  // SUBSCRIBE_INITIAL_DELAY_MS before the first attempt. When false (existing
  // mixer chosen from the picker or via URL deeplink), the mixer is already
  // running and we go straight to subscribing.
  const startSubscriptionWithRetry = async (freshlyCreated = false) => {
    // Don't reset subscribeCancelled here — startNewMixer set it false at the
    // top of its flow, and we need to honor a click that happened during the
    // sync XHRs before us. (For the page-load existing-mixer path the value is
    // already false, so this is a no-op.)
    if (freshlyCreated) {
      showSubscribeStatus(
        'Waiting briefly for the mixer to settle…',
        ''
      )
      // initial wait for the freshly-created mixer to settle on origin/SM
      await new Promise(r => setTimeout(r, SUBSCRIBE_INITIAL_DELAY_MS))
      if (subscribeCancelled) {
        hideSubscribeStatus()
        return
      }
    }
    showSubscribeStatus('Subscribing…', '')

    let attempt = 0
    while (attempt < SUBSCRIBE_MAX_ATTEMPTS) {
      if (subscribeCancelled) {
        console.log('[Red5ProSubscriber] subscription cancelled by user')
        return
      }
      attempt++
      try {
        await startSubscription()
        hideSubscribeStatus()
        return
      } catch (error) {
        console.warn(
          `[Red5ProSubscriber] subscribe attempt ${attempt}/${SUBSCRIBE_MAX_ATTEMPTS} failed:`,
          error
        )
        // probe SM for diagnostic — never throws
        const probe = await brewmixer.probeServerForSubscribe(
          host,
          jwt,
          smVersion,
          nodeGroupName,
          mixerStreamGuid
        )
        const probeDetail = formatProbeDetail(probe)
        console.log('[Red5ProSubscriber] SM probe:', probe)

        if (attempt >= SUBSCRIBE_SILENT_ATTEMPTS) {
          showSubscribeStatus(
            `Retrying subscribe (attempt ${attempt}/${SUBSCRIBE_MAX_ATTEMPTS})…`,
            probeDetail
          )
        }
        if (attempt < SUBSCRIBE_MAX_ATTEMPTS) {
          await new Promise(r => setTimeout(r, SUBSCRIBE_RETRY_DELAY_MS))
        }
      }
    }

    // exhausted retries
    if (!subscribeCancelled) {
      hideSubscribeStatus()
      streamDetailsField.textContent = `Could not start subscription after ${SUBSCRIBE_MAX_ATTEMPTS} attempts. See console for details.`
      alert(
        `Could not start subscription after ${SUBSCRIBE_MAX_ATTEMPTS} attempts. See console for details.`
      )
    }
  }
  // ============= /SUBSCRIBE RETRY ===============

  const toggleMute = () => {
    video.muted = !video.muted
    document.querySelector('#unmuteButton').classList.toggle('hidden')
    document.querySelector('#muteButton').classList.toggle('hidden')
  }

  // ============= SLOP ===============
  const pathAndNameFromGuid = guid => {
    const index = !guid ? 0 : guid.lastIndexOf('/')
    const path = !guid ? '' : guid.substring(0, index)
    const name = !guid ? '' : guid.substring(index + 1)
    return { path, name }
  }

  const initStreamGuid = () => {
    if (!mixerStreamGuid) {
      mixerStreamGuid = `${configuration.app}/mix1`
    }
    const { path, name } = pathAndNameFromGuid(mixerStreamGuid)
    mixerStreamPath = path
    mixerStreamName = name
    mixerGuidField.value = mixerStreamGuid
  }
  initStreamGuid()

  // ============= AUTH ===============
  // Local SM admin auth that mirrors `curl -X PUT https://user:pass@host/auth/login`
  // exactly: just an `Authorization: Basic …` header, nothing else. The shared
  // `streamManagerUtil.authenticate2` adds Content-Type: application/json with
  // an empty body, withCredentials (cookies), and uses synchronous XHR — any of
  // which can elicit a 403 from a strict reverse proxy / security filter
  // depending on environment. Keeping our own copy here so we don't have to
  // touch the shared utility (other testbed pages depend on it).
  const authenticateMinimal = async (smHost, smVersion, smUser, smPassword) => {
    const url = `https://${smHost}/as/${smVersion}/auth/login`
    const resp = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: 'Basic ' + btoa(smUser + ':' + smPassword)
      }
    })
    if (!resp.ok) {
      // Read the body if any for diagnostics, but don't fail on JSON parse —
      // SMs sometimes return HTML on auth-layer rejections.
      let body = ''
      try {
        body = await resp.text()
      } catch (_) {
        /* ignore */
      }
      throw new Error(`HTTP ${resp.status}` + (body ? `: ${body.slice(0, 200)}` : ''))
    }
    const data = await resp.json()
    if (data.errorMessage) {
      throw new Error(data.errorMessage)
    }
    return data.token
  }
  // ============= /AUTH ===============

  // ============= DIAGNOSTICS ===============
  // After a createMixerEvent failure, query AS-Admin to produce a more useful
  // error message. Two common causes we can detect:
  //   1. user said "default" but multiple nodegroups exist (the alias only
  //      resolves when there's exactly one)
  //   2. the chosen nodegroup has no role with Capability.MIX, or no such node
  //      is currently INSERVICE.
  // Each check is best-effort; if any underlying call itself errors, we note
  // that and fall through with what we have.
  const diagnoseCreateMixerFailure = async (originalError, requestedNodeGroup) => {
    const lines = [`Failed to create mixer: ${originalError.message}`, '']
    let resolvedNg = requestedNodeGroup
    try {
      // 1. "default" alias check
      if (requestedNodeGroup === 'default') {
        const groups = await brewmixer.listNodeGroups(host, jwt, smVersion)
        if (!groups || groups.length === 0) {
          lines.push('No nodegroups are defined on this Stream Manager.')
          return lines.join('\n')
        }
        if (groups.length > 1) {
          lines.push(
            `The "default" alias resolves only when there is exactly one nodegroup. This Stream Manager has ${groups.length}: ${groups.join(', ')}.`
          )
          lines.push('Set the Node Group field to one of those names.')
          return lines.join('\n')
        }
        // exactly one — proceed using its real name
        resolvedNg = groups[0]
        lines.push(`(Using sole nodegroup "${resolvedNg}".)`)
      }

      // 2. nodegroup exists?
      const config = await brewmixer.getNodeGroupConfig(
        host,
        jwt,
        smVersion,
        resolvedNg
      )
      if (config === null) {
        lines.push(`Nodegroup "${resolvedNg}" was not found.`)
        try {
          const groups = await brewmixer.listNodeGroups(host, jwt, smVersion)
          if (groups && groups.length > 0) {
            lines.push(`Available nodegroups: ${groups.join(', ')}.`)
          }
        } catch (_) {
          /* ignore secondary error */
        }
        return lines.join('\n')
      }

      // 3. find roles with MIX capability (role name is arbitrary, capability is fixed)
      const mixRoles = []
      if (config.roles) {
        for (const [roleName, role] of Object.entries(config.roles)) {
          if (role && role.capabilities && role.capabilities.indexOf('MIX') >= 0) {
            mixRoles.push(roleName)
          }
        }
      }
      if (mixRoles.length === 0) {
        lines.push(
          `Nodegroup "${resolvedNg}" has no role with Capability.MIX. Add a role with that capability to the nodegroup config.`
        )
        return lines.join('\n')
      }

      // 4. any of those roles INSERVICE?
      const nodes = await brewmixer.getNodeGroupStatus(
        host,
        jwt,
        smVersion,
        resolvedNg
      )
      if (!nodes) {
        lines.push(`Could not read status for nodegroup "${resolvedNg}".`)
        return lines.join('\n')
      }
      const matchingMixerNodes = nodes.filter(
        n => n.nodeEvent && mixRoles.indexOf(n.nodeEvent.nodeRoleName) >= 0
      )
      const inServiceMixerNodes = matchingMixerNodes.filter(
        n => n.scalingEvent && n.scalingEvent.state === 'INSERVICE'
      )
      if (inServiceMixerNodes.length === 0) {
        lines.push(
          `Nodegroup "${resolvedNg}" defines MIX-capable role(s): ${mixRoles.join(', ')}.`
        )
        if (matchingMixerNodes.length === 0) {
          lines.push(
            'But no node with one of those roles exists in the group. Wait for a mixer node to spin up, or check your nodegroup config.'
          )
        } else {
          const states = matchingMixerNodes.map(
            n =>
              `${n.nodeEvent.nodeRoleName}=${
                n.scalingEvent ? n.scalingEvent.state : 'unknown'
              }`
          )
          lines.push(
            `Nodes with mixer roles exist but none are INSERVICE — current states: ${states.join(', ')}.`
          )
        }
        return lines.join('\n')
      }

      // 5. mixer nodes are available — original error is something else
      lines.push(
        `Nodegroup "${resolvedNg}" has ${inServiceMixerNodes.length} INSERVICE mixer node(s) (role(s): ${mixRoles.join(', ')}).`
      )
      lines.push(
        'Mixer creation failed for some other reason. See the browser console for the original response body.'
      )
    } catch (e) {
      lines.push(`(Diagnostic queries failed: ${e.message})`)
      console.warn('diagnoseCreateMixerFailure error', e)
    }
    return lines.join('\n')
  }
  // ============= /DIAGNOSTICS ===============

  // ============= INITIALIZATION ===============
  const startNewMixer = async () => {
    if (!validateMixerForm()) {
      return
    }

    // Apply Stream-Manager-specific overrides from the form. If admin creds,
    // host, or API version changed, drop the cached JWT so we re-authenticate.
    const newHost = smHostField.value.trim()
    const newSmVersion = smApiVersionField.value.trim()
    const newSmUser = smAdminUsernameField.value.trim()
    const newSmPassword = smAdminPasswordField.value
    const newNodeGroup = smNodeGroupField.value.trim()
    const newRegion = smRegionField.value.trim()
    const smIdentityChanged =
      newHost !== host ||
      newSmVersion !== smVersion ||
      newSmUser !== streamManagerUser ||
      newSmPassword !== streamManagerPassword
    host = newHost
    smVersion = newSmVersion
    streamManagerUser = newSmUser
    streamManagerPassword = newSmPassword
    nodeGroupName = newNodeGroup
    smRegion = newRegion
    if (smIdentityChanged) {
      jwt = null
    }

    mixerStreamGuid = mixerGuidField.value
    initStreamGuid()

    // Assign to the module-level `let eventId` (was a `const` shadow before),
    // so subsequent calls to init() / updateRenderTrees / stopMixer all see
    // the eventId the user actually entered in the form.
    eventId = document.getElementById('eventIdField').value
    const outputWidth = document.getElementById('outputWidth').value
    const outputHeight = document.getElementById('outputHeight').value
    const bitrate = document.getElementById('bitrate').value
    const qpmin = document.getElementById('qpmin').value
    const qpmax = document.getElementById('qpmax').value
    const maxbitrate = document.getElementById('maxbitrate').value
    const framerate = document.getElementById('framerate').value
    const audiorate = document.getElementById('audiorate').value
    const rtaUsername = document.getElementById('rtaUsername').value
    const rtaPassword = document.getElementById('rtaPassword').value
    const rtaToken = document.getElementById('rtaToken').value

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
      subMixes: 1
    }
    if (rtaUsername || rtaPassword || rtaToken) {
      request.credentials = {
        username: rtaUsername || null,
        password: rtaPassword || null,
        token: rtaToken || null
      }
      // remember for reuse on subscribe
      mixerRtaCredentials = {
        username: rtaUsername || undefined,
        password: rtaPassword || undefined,
        token: rtaToken || undefined
      }
    } else {
      mixerRtaCredentials = null
    }

    // Reset cancel/created state for this new run, hide the form, and surface
    // a status panel that updates between each phase. yieldUI() forces a paint
    // before the next synchronous XHR blocks the UI thread, so messages like
    // "Creating mixer…" actually become visible.
    subscribeCancelled = false
    mixerWasCreated = false
    lastCreateEventId = eventId
    closeMixerForm()
    const yieldUI = () => new Promise(r => setTimeout(r, 0))

    // If the user changed SM admin/host/version, jwt was cleared above; re-auth
    // before calling createMixerEvent so we don't send `Bearer null`.
    if (!jwt) {
      showSubscribeStatus('Authenticating with Stream Manager…', '')
      await yieldUI()
      try {
        jwt = await authenticateMinimal(
          host,
          smVersion,
          streamManagerUser,
          streamManagerPassword
        )
      } catch (e) {
        console.error('Error authenticating with Stream Manager', e)
        hideSubscribeStatus()
        reopenMixerForm()
        alert(
          `Error authenticating with Stream Manager: ${
            e.message ? e.message : 'error'
          }. See console for details.`
        )
        return
      }
    }
    if (subscribeCancelled) {
      hideSubscribeStatus()
      return
    }

    try {
      showSubscribeStatus('Creating mixer…', `Event ID: ${eventId}`)
      await yieldUI()
      brewmixer.createMixerEvent(host, jwt, smVersion, nodeGroupName, request)
      mixerWasCreated = true
      mixerFormSubmit.disabled = true
      if (subscribeCancelled) {
        // The cancel handler already prompted/handled stopMixerEvent if needed.
        return
      }

      // create the default nodegraph
      showSubscribeStatus('Setting up render tree…', '')
      await yieldUI()
      brewmixer.updateRenderTrees(
        host,
        jwt,
        smVersion,
        nodeGroupName,
        eventId,
        [globalNodeGraph]
      )
      if (subscribeCancelled) {
        return
      }

      // We already PUT the default render tree as `globalNodeGraph`, and we
      // know which mixer we just created. Subscribe directly rather than going
      // back through init() (which would show the picker for the freshly-
      // created event since URL params don't match it).
      showSubscribeStatus('Initializing subscription…', '')
      subscribeToRenderTrees([globalNodeGraph], true /* freshlyCreated */)
    } catch (error) {
      console.error('createMixerEvent failed:', error)
      hideSubscribeStatus()
      if (!mixerWasCreated) {
        reopenMixerForm()
      }
      const message = await diagnoseCreateMixerFailure(error, nodeGroupName)
      alert(message)
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
  const reGrid = sideLength => {
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
      globalNodeGraph
    ])
  }

  const init = async (configuration, prefix = 'stream') => {
    // `app` is the input-stream context (e.g. `live` -> `live/stream1`); the SM
    // host comes from the module-level mutable `host` so that form overrides
    // apply.
    const { app } = configuration

    for (let i = 0; i < GUID_COUNT; i++) {
      guids[i] = `${app}/${prefix}${i + 1}`
    }

    // Listen on resize events to recalculate grid and canvas.
    window.addEventListener('resize', resizeOverlayCanvas)
    const resizeObserver = new ResizeObserver(entries => {
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

    // Always sync ALL SM-specific module vars from the form. The form was
    // populated by populateSmFormFromSettings() at window.onload (or filled
    // in by browser autofill / the user). Use those values as the source of
    // truth so module vars don't go stale relative to the form.
    {
      const formHost = smHostField.value.trim()
      const formSmVersion = smApiVersionField.value.trim()
      const formUser = smAdminUsernameField.value.trim()
      const formPassword = smAdminPasswordField.value
      const formNodeGroup = smNodeGroupField.value.trim()
      const formRegion = smRegionField.value.trim()
      if (formHost) host = formHost
      if (formSmVersion) smVersion = formSmVersion
      if (formUser) streamManagerUser = formUser
      if (formPassword) streamManagerPassword = formPassword
      if (formNodeGroup) nodeGroupName = formNodeGroup
      smRegion = formRegion // region is allowed to be cleared
    }

    if (!jwt) {
      if (
        !host ||
        !smVersion ||
        !streamManagerUser ||
        !streamManagerPassword
      ) {
        console.log(
          'SM admin credentials not configured; skipping auth on load. The form is shown so the user can enter them and click Start.'
        )
        return
      }
      try {
        jwt = await authenticateMinimal(
          host,
          smVersion,
          streamManagerUser,
          streamManagerPassword
        )
      } catch (e) {
        console.error('Error authenticating with Stream Manager:', e)
        // intentionally no alert here — load-time auth failures are quiet so
        // the user can correct the form and retry via Start.
        return
      }
    }

    // Default the create-form node graph regardless of which path runs below;
    // subscribeToRenderTrees overwrites globalNodeGraph if it auto-connects.
    globalNodeGraph = JSON.parse(defaultGraphValue)[0]
    activeNodeGraph.value = defaultGraphValue
    mixerFormSubmit.disabled = false

    // Query existing mixer events. Empty/error → just leave the create form.
    let mixerEvents = {}
    try {
      console.log(
        `[picker] listing mixer events: host=${host} smVersion=${smVersion} nodeGroup=${nodeGroupName}`
      )
      mixerEvents = await brewmixer.getMixerEvents(
        host,
        jwt,
        smVersion,
        nodeGroupName
      )
      console.log(
        `[picker] got ${
          mixerEvents ? Object.keys(mixerEvents).length : 0
        } event(s):`,
        mixerEvents
      )
    } catch (error) {
      console.warn('[picker] Failed to list mixer events:', error)
    }

    // Honor an explicit URL `?event=` if it matches an existing event — this
    // preserves the deep-link-to-a-specific-mixer behavior that previously
    // worked for `?event=event1`.
    const urlExplicitEvent = urlParams.get('event')
    if (urlExplicitEvent && mixerEvents && mixerEvents[urlExplicitEvent]) {
      const loc = mixerEvents[urlExplicitEvent]
      connectToExistingMixer(urlExplicitEvent, loc.streamGuid || mixerStreamGuid)
      return
    }

    // No explicit deep-link. If there are existing events, surface them in the
    // picker. The create form stays visible below, so the user can choose to
    // create a new one with a different eventId instead.
    const eventEntries = mixerEvents ? Object.entries(mixerEvents) : []
    if (eventEntries.length > 0) {
      populateMixerPicker(eventEntries)
      mixerPicker.classList.remove('hidden')
    } else {
      mixerPicker.classList.add('hidden')
    }

    // if they stop the mixer, hide the other controls and revert to only New Mixer controls.
    // rely on the subscriber client to stop on its own.
  }

  // Build a Connect button for each existing mixer event. Clicking it sets
  // the module-level eventId/mixerStreamGuid and runs the subscribe path.
  const populateMixerPicker = entries => {
    mixerPickerList.innerHTML = ''
    for (const [pickedEventId, location] of entries) {
      const li = document.createElement('li')
      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'mixer-picker-connect'
      const guid = (location && location.streamGuid) || ''
      button.innerHTML = `<span class="picker-event-id">${pickedEventId}</span> <span class="picker-stream-guid">— ${guid || 'no streamGuid'}</span>`
      button.addEventListener('click', () => {
        connectToExistingMixer(pickedEventId, guid)
      })
      li.appendChild(button)
      mixerPickerList.appendChild(li)
    }
  }

  // Fetch the chosen mixer's render tree(s) and start a subscription.
  const connectToExistingMixer = (chosenEventId, chosenStreamGuid) => {
    // Promote the chosen event into the module-level identity so subsequent
    // calls (updateRenderTrees, stopMixer, subscribe URL construction) all
    // refer to it.
    eventId = chosenEventId
    if (chosenStreamGuid) {
      mixerStreamGuid = chosenStreamGuid
    }
    initStreamGuid()
    eventIdField.value = chosenEventId
    mixerGuidField.value = mixerStreamGuid

    let renderTrees = null
    try {
      renderTrees = brewmixer.getRenderTrees(
        host,
        jwt,
        smVersion,
        nodeGroupName,
        eventId
      )
    } catch (error) {
      console.warn(
        'Failed to load RenderTree for ' + eventId + ': ' + error.message
      )
    }

    if (renderTrees) {
      subscribeToRenderTrees(renderTrees)
    } else {
      alert(
        `Could not load render tree for event "${chosenEventId}". The mixer may have just stopped — see console.`
      )
    }
  }

  // Hide the start form, prime the controls from a renderTrees array, and
  // start the WHEP subscription with retries. Pass freshlyCreated=true when
  // the mixer was just created so the retry wrapper waits a moment for it to
  // settle; for an existing mixer (picker / URL deeplink) leave it false to
  // skip the wait.
  const subscribeToRenderTrees = (renderTrees, freshlyCreated = false) => {
    activeNodeGraph.value = JSON.stringify(renderTrees[0], null, 2)
    let nodeCount = 3
    try {
      nodeCount = renderTrees[0].rootVideoNode.nodes.filter(
        n => n.node === 'VideoSourceNode'
      ).length
    } catch (e) {
      console.log('error parsing render tree')
    }

    startComp.classList.toggle('hidden', true)
    startComp.classList.toggle('offscreen', true)
    activeTreeBox.classList.toggle('hidden', true)
    activeTreeBox.classList.toggle('offscreen', true)

    const columns = Math.sqrt(nodeCount)
    const control = Array.from(radioButtons).find(
      c => c.value === '' + columns
    )
    if (control) {
      control.checked = true
    }

    globalNodeGraph = renderTrees[0]
    startSubscriptionWithRetry(freshlyCreated)
  }

  window.onload = () => {
    eventIdField.value = eventId
    mixerGuidField.value = mixerStreamGuid
    populateSmFormFromSettings()
    // The form is visible by default; enable submit immediately so the user
    // can edit settings and try even if SM auth in init() ends up failing.
    // init() will hide the form if it finds an existing mixer.
    mixerFormSubmit.disabled = false
    // clear any field-error highlight as soon as the user edits a flagged field
    document.querySelectorAll('.mixer-form input').forEach(input => {
      input.addEventListener('input', () => {
        if (input.classList.contains('mixer-field-error')) {
          input.classList.remove('mixer-field-error')
          formValidationMessage.classList.add('hidden')
        }
      })
    })
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
