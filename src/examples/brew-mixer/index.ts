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

import '@/components/r5-header'
import '@/components/r5-subscriber-stats'
import type { R5SubscriberStatsElement } from '@/components/r5-subscriber-stats'
import {
  applyTheme,
  loadSettings,
  resolveEndpointFromSettings,
  resolveConnectionParamsFromSettings,
  resolveStreamManagerAdminCredentialsFromSettings,
  resolveStatisticsConfigurationFromSettings,
  resolveRtcConfigurationFromSettings,
  type Settings,
} from '@/settings'
import { wireExampleLog } from '@/lib/example-log'
import {
  AudioNodeGraphNode,
  MixerEvent,
  MixerEventAlreadyExistsError,
  MixerEventRequest,
  NodeGraph,
  VideoNodeGraphNode,
  createMixerEvent,
  getDefaultNodeGraph,
  getMixerEvents,
  getRenderTrees,
  stopMixerEvent,
  updateRenderTrees,
} from '@/service/brewmixer'
import {
  authenticateMinimal,
  probeServerForSubscribe,
  ProbeServerForSubscribeResponse,
} from '@/service/stream-manager'

import {
  drawCanvas,
  getCoords,
  OverlayStates,
  Direction,
  lerp,
  clearCanvas,
  calculateDrawParams,
} from './drawing-functions'
import { publicAssetPrefix } from '@/lib/public-path'

const sdk = window.red5prosdk
sdk.setLogLevel('debug')

interface BrewMixerFormSettings {
  eventId: string
  outputGuid: string
  width: string
  height: string
  bitrate: string
  maxBitrate: string
  qpMin: string
  qpMax: string
  framerate: string
  audiorate: string
}

type MixerLayoutPreset = '2x2' | '3x3' | '4x4'

enum SetupModalState {
  SUBMITTING = 'submitting',
  IDLE = 'idle',
}

let settings = loadSettings()
applyTheme(settings.theme)

let subscriber: WHEPClient | null = null
let mixerSettings: BrewMixerFormSettings | null = null
let jwt: string | null = null
let selectedExistingEventId: string | null = null
let globalNodeGraph: NodeGraph | null = null
let selectedLayoutPreset: MixerLayoutPreset = '2x2'
let isMixerAudioOn = true
let SUBSCRIBE_INITIAL_DELAY_MS = 2000
let SUBSCRIBE_MAX_ATTEMPTS = 15
let SUBSCRIBE_RETRY_DELAY_MS = 1000
let SUBSCRIBE_SILENT_ATTEMPTS = 2

let guids: string[] = []
const GUID_COUNT = 25
const audioSet = new Set<string>()

let resizeObserver: ResizeObserver | null = null
let selectedNode: VideoNodeGraphNode | null = null
let currentOverlayState = OverlayStates.NOT_RUNNING
let dragTarget: Direction | null = null
let isMouseDown: boolean = false
let dragOffsetX: number = 0
let dragOffsetY: number = 0
let zoomInitial: VideoNodeGraphNode | null = null
let zoomNode: VideoNodeGraphNode | null = null
let zoomT: number = 0.0
let zoomIncr: number = 0.0
const ZOOM_DELAY = 30

async function authenticate(): Promise<string> {
  if (jwt) {
    return jwt
  }
  const credentials = resolveStreamManagerAdminCredentialsFromSettings(settings)
  if (!credentials) {
    throw new Error(
      'Stream Manager credentials required. Set Admin Username and Admin Password in Stream Manager Settings.'
    )
  }
  jwt = await authenticateMinimal(credentials.username, credentials.password, settings)
  return jwt
}

const connectionInfoEl = document.getElementById('connection-info') as HTMLParagraphElement
const setupStatusEl = document.getElementById('setup-status') as HTMLParagraphElement
const reopenSetupBtn = document.getElementById('reopen-setup-btn') as HTMLButtonElement
const stopMixerBtn = document.getElementById('stop-mixer-btn') as HTMLButtonElement
const toggleNodeGraphEditorBtn = document.getElementById(
  'toggle-nodegraph-editor-btn'
) as HTMLButtonElement
const nodeGraphEditorPanelEl = document.getElementById('nodegraph-editor-panel') as HTMLElement
const nodeGraphEditorInput = document.getElementById(
  'nodegraph-editor-input'
) as HTMLTextAreaElement
const submitNodeGraphBtn = document.getElementById('submit-nodegraph-btn') as HTMLButtonElement
const resetNodeGraphBtn = document.getElementById('reset-nodegraph-btn') as HTMLButtonElement
const mixerSubscriberStatsEl = document.getElementById(
  'mixer-subscriber-stats'
) as R5SubscriberStatsElement
const mixerVideoEl = document.getElementById('mixer-video') as HTMLVideoElement
const mixerCanvasEl = document.getElementById('mixer-canvas') as HTMLCanvasElement
const layout2x2Btn = document.getElementById('layout-2x2-btn') as HTMLButtonElement
const layout3x3Btn = document.getElementById('layout-3x3-btn') as HTMLButtonElement
const layout4x4Btn = document.getElementById('layout-4x4-btn') as HTMLButtonElement
const mixerAudioToggleBtn = document.getElementById('mixer-audio-toggle-btn') as HTMLButtonElement
const mixerAudioToggleIcon = document.getElementById('mixer-audio-toggle-icon') as HTMLImageElement

const modalBackdropEl = document.getElementById('brew-mixer-modal-backdrop') as HTMLDivElement
const modalCloseBtn = document.getElementById('brew-mixer-modal-close-btn') as HTMLButtonElement
const modalFormEl = document.getElementById('brew-mixer-modal-form') as HTMLFormElement
const modalTabsEl = document.getElementById('brew-mixer-modal-tabs') as HTMLDivElement
const existingEventsTabBtn = document.getElementById('existing-events-tab-btn') as HTMLButtonElement
const createEventTabBtn = document.getElementById('create-event-tab-btn') as HTMLButtonElement
const existingEventsViewEl = document.getElementById('existing-events-view') as HTMLElement
const createEventViewEl = document.getElementById('create-event-view') as HTMLElement
const existingEventsListEl = document.getElementById('existing-events-list') as HTMLUListElement
const useExistingEventBtn = document.getElementById('use-existing-event-btn') as HTMLButtonElement

const eventIdInput = document.getElementById('event-id-input') as HTMLInputElement
const outputGuidInput = document.getElementById('output-guid-input') as HTMLInputElement
const widthInput = document.getElementById('width-input') as HTMLInputElement
const heightInput = document.getElementById('height-input') as HTMLInputElement
const bitrateInput = document.getElementById('bitrate-input') as HTMLInputElement
const maxBitrateInput = document.getElementById('max-bitrate-input') as HTMLInputElement
const qpMinInput = document.getElementById('qp-min-input') as HTMLInputElement
const qpMaxInput = document.getElementById('qp-max-input') as HTMLInputElement
const framerateInput = document.getElementById('framerate-input') as HTMLInputElement
const audiorateInput = document.getElementById('audiorate-input') as HTMLInputElement
const mixerFormSubmitBtn = document.getElementById('mixer-form-submit-btn') as HTMLButtonElement

const { log } = wireExampleLog()
const existingMixerEvents = new Map<string, MixerEvent>()

function onSubscriberEvent(event: Red5ProEvent): void {
  const { type, data } = event
  if (type === 'Subscribe.Metadata') {
    mixerSubscriberStatsEl.applySubscribeMetadata(data)
    return
  }
  if (type === 'WebRTC.Endpoint.Changed') {
    const endpoint = (data as { endpoint?: string } | undefined)?.endpoint
    if (typeof endpoint === 'string') {
      mixerSubscriberStatsEl.setEndpoint(endpoint)
    }
    return
  }
}

function setOverlayState(state: OverlayStates): void {
  currentOverlayState = state
  let microphoneActive = audioSet.has(selectedNode?.streamGuid ?? '')
  drawCanvas(
    mixerCanvasEl,
    mixerVideoEl,
    selectedNode,
    currentOverlayState,
    microphoneActive,
    dragTarget
  )
}

function sizeCanvas(width: number, height: number): void {
  mixerCanvasEl.style.width = width + 'px'
  mixerCanvasEl.width = width
  mixerCanvasEl.style.height = height + 'px'
  mixerCanvasEl.height = height
  let microphoneActive = audioSet.has(selectedNode?.streamGuid ?? '')
  drawCanvas(
    mixerCanvasEl,
    mixerVideoEl,
    selectedNode,
    currentOverlayState,
    microphoneActive,
    dragTarget
  )
}

function resizeOverlayCanvas(): void {
  const vidStyleData = mixerVideoEl.getBoundingClientRect()
  sizeCanvas(vidStyleData.width, vidStyleData.height)
}

function syncOverlayCanvas(): void {
  resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.borderBoxSize?.length > 0) {
        sizeCanvas(entry.borderBoxSize[0].inlineSize, entry.borderBoxSize[0].blockSize)
      } else {
        sizeCanvas(entry.contentRect.width, entry.contentRect.height)
      }
    }
  })
  resizeObserver.observe(mixerVideoEl)

  window.addEventListener('resize', resizeOverlayCanvas)
  mixerCanvasEl.addEventListener('click', clickCanvas)
  mixerCanvasEl.addEventListener('dblclick', doubleClickCanvas)
  mixerCanvasEl.addEventListener('mousedown', onMouseDown)
  mixerCanvasEl.addEventListener('mouseup', onMouseUp)
}

function desyncOverlayCanvas(): void {
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
  window.removeEventListener('resize', resizeOverlayCanvas)
  mixerCanvasEl.removeEventListener('click', clickCanvas)
  mixerCanvasEl.removeEventListener('dblclick', doubleClickCanvas)
  mixerCanvasEl.removeEventListener('mousedown', onMouseDown)
  mixerCanvasEl.removeEventListener('mouseup', onMouseUp)
}

// event handlers

function updateZoom(): void {
  if (!zoomInitial || !zoomNode) {
    return
  }
  let w0 = zoomInitial.destWidth
  let h0 = zoomInitial.destHeight
  let x0 = zoomInitial.destX
  let y0 = zoomInitial.destY

  let x1 = 0.0
  let y1 = 0.0
  let w1 = mixerVideoEl.videoWidth
  let h1 = mixerVideoEl.videoHeight

  let x = lerp(x0, x1, zoomT)
  let y = lerp(y0, y1, zoomT)
  let w = lerp(w0, w1, zoomT)
  let h = lerp(h0, h1, zoomT)

  zoomNode.destX = x
  zoomNode.destY = y
  zoomNode.destWidth = w
  zoomNode.destHeight = h

  updateRenderTrees(
    settings,
    jwt! as string,
    mixerSettings?.eventId ?? '',
    [globalNodeGraph],
    false
  )
}

function doZoom(): void {
  zoomT += zoomIncr

  if (zoomT > 0 && zoomT < 1) {
    updateZoom()
    setTimeout(doZoom, ZOOM_DELAY)
  }

  // if, after that, we're out of bounds, then we're done
  if (zoomT < 0 || zoomT > 1) {
    // update node params with end values
    zoomT = Math.max(Math.min(zoomT, 1.0), 0.0)
    updateZoom()
    // next state
    if (zoomIncr > 0) {
      setOverlayState(OverlayStates.ZOOMED_IN)
    } else {
      setOverlayState(OverlayStates.IDLE)
    }
  }
}

const hitBox = (
  x: number,
  y: number,
  rectX: number,
  rectY: number,
  width: number,
  height: number
): boolean => {
  return x >= rectX && x < rectX + width && y >= rectY && y < rectY + height
}

const hitCircle = (x: number, y: number, circX: number, circY: number, radius: number): boolean => {
  const dx = x - circX
  const dy = y - circY
  const distance = Math.sqrt(dx ** 2 + dy ** 2)
  return distance <= radius
}

const nodeAt = (x: number, y: number): VideoNodeGraphNode | null => {
  const videoNodes = globalNodeGraph?.rootVideoNode.nodes ?? []
  let result = null
  let i = videoNodes.length
  const { widthPercentage, heightPercentage } = getCoords(mixerVideoEl)
  while (--i > 0) {
    const node = videoNodes[i] as VideoNodeGraphNode
    if (!node) {
      continue
    }
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

async function clickCanvas(event: MouseEvent): Promise<void> {
  const coords = getCoords(mixerVideoEl)
  const { offsetX, offsetY } = event
  const x = offsetX - coords.x
  const y = offsetY - coords.y
  if (event.detail == 1) {
    // if single-click
    if (
      currentOverlayState == OverlayStates.IDLE ||
      currentOverlayState == OverlayStates.SELECTED
    ) {
      let node = nodeAt(x, y)
      if (node != null && currentOverlayState == OverlayStates.IDLE) {
        selectedNode = node
        const jwt = await authenticate()
        await updateRenderTrees(settings, jwt, mixerSettings?.eventId ?? '', [globalNodeGraph])
        setOverlayState(OverlayStates.SELECTED)
      } else if (currentOverlayState == OverlayStates.SELECTED) {
        let handled = false
        if (node == selectedNode) {
          handled = true
          const drawParams = calculateDrawParams(selectedNode, mixerVideoEl)
          if (!drawParams) {
            return
          }
          const micWidth = 56
          const micHeight = 90
          // - microphone
          if (
            hitBox(
              offsetX,
              offsetY,
              drawParams.centerX + (drawParams.quarterWidth ?? 0) - micWidth / 2,
              drawParams.centerY - micHeight / 2,
              micWidth,
              micHeight
            )
          ) {
            if (selectedNode && audioSet.has(selectedNode.streamGuid)) {
              audioSet.delete(selectedNode.streamGuid)
              setGain(selectedNode.streamGuid, -100)
            } else if (selectedNode) {
              audioSet.add(selectedNode.streamGuid)
              setGain(selectedNode.streamGuid, -6)
            }
            let microphoneActive = audioSet.has(selectedNode?.streamGuid ?? '')
            drawCanvas(
              mixerCanvasEl,
              mixerVideoEl,
              selectedNode,
              currentOverlayState,
              microphoneActive,
              dragTarget
            )
          }
        }

        if (!handled) {
          // if no hit, click outside selected: deselect
          setOverlayState(OverlayStates.IDLE)
        }
      }
    }
  } else {
    console.log('[brew-mixer] ignore click, state: ' + currentOverlayState)
  }
}

function doubleClickCanvas(event: MouseEvent): void {
  const coords = getCoords(mixerVideoEl)
  const { offsetX, offsetY } = event
  const x = offsetX - coords.x
  const y = offsetY - coords.y
  if (currentOverlayState == OverlayStates.IDLE || currentOverlayState == OverlayStates.SELECTED) {
    let node = nodeAt(x, y)
    if (node) {
      // start zooming in
      zoomNode = node
      videoNodeToTop(node)
      zoomInitial = structuredClone(node)
      zoomT = 0.0
      zoomIncr = 0.14
      setOverlayState(OverlayStates.ZOOMING)
      updateRenderTrees(settings, jwt! as string, mixerSettings?.eventId ?? '', [globalNodeGraph])
      setTimeout(doZoom, ZOOM_DELAY)
    }
    // else, they clicked empty space: no-op
  } else if (currentOverlayState == OverlayStates.ZOOMED_IN) {
    // start zooming out
    zoomT = 1.0
    zoomIncr = -0.14
    setOverlayState(OverlayStates.ZOOMING)
    setTimeout(doZoom, ZOOM_DELAY)
  }
}

function onMouseDown(event: MouseEvent): void {
  mixerCanvasEl.addEventListener('mousemove', onMouseMove)
  const coords = getCoords(mixerVideoEl)
  const { widthPercentage, heightPercentage } = coords
  const { offsetX, offsetY } = event
  const x = offsetX
  const y = offsetY
  const radius = 70

  const videoDownX = x - coords.x
  const videoDownY = y - coords.y
  const magVideoDownX = videoDownX / widthPercentage
  const magVideoDownY = videoDownY / heightPercentage
  let node = nodeAt(videoDownX, videoDownY) as VideoNodeGraphNode | null
  if (!node) {
    return
  }
  let offsetx = 0
  let offsety = 0
  isMouseDown = false // true only when dragging

  if (currentOverlayState == OverlayStates.SELECTED && selectedNode) {
    // if in state SELECTED, check if we clicked a drag handle inside the selected video
    const drawParams = calculateDrawParams(selectedNode, mixerVideoEl)
    if (!drawParams) {
      return
    }
    let dragging = false
    if (hitCircle(x, y, drawParams.centerX, drawParams.centerY, radius)) {
      dragTarget = Direction.MOVE_HANDLE
      isMouseDown = true
      videoNodeToTop(selectedNode, true)
      setOverlayState(OverlayStates.MOVING)
    } else if (hitBox(x, y, drawParams.x, drawParams.y, radius, radius)) {
      dragTarget = Direction.NORTHWEST
      dragging = true
      offsetx = magVideoDownX - selectedNode.destX
      offsety = magVideoDownY - selectedNode.destY
    } else if (
      hitBox(x, y, drawParams.x + drawParams.width - radius, drawParams.y, radius, radius)
    ) {
      dragTarget = Direction.NORTHEAST
      dragging = true
      offsetx = selectedNode.destX + selectedNode.destWidth - magVideoDownX
      offsety = magVideoDownY - selectedNode.destY
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
      offsetx = selectedNode.destX + selectedNode.destWidth - magVideoDownX
      offsety = magVideoDownY - selectedNode.destY - selectedNode.destHeight
    } else if (
      hitBox(x, y, drawParams.x, drawParams.y + drawParams.height - radius, radius, radius)
    ) {
      dragTarget = Direction.SOUTHWEST
      dragging = true
      offsetx = magVideoDownX - selectedNode.destX
      offsety = magVideoDownY - selectedNode.destY - selectedNode.destHeight
    }

    if (dragging) {
      dragOffsetX = offsetx
      dragOffsetY = offsety

      zoomInitial = selectedNode ? structuredClone(selectedNode) : null
      isMouseDown = true
      videoNodeToTop(selectedNode, true)
      setOverlayState(OverlayStates.RESIZING)
    } else {
      dragOffsetX = dragOffsetY = 0
    }
  }
}

function onMouseMove(event: MouseEvent): void {
  const coords = getCoords(mixerVideoEl)
  const { offsetX, offsetY } = event
  const x = (offsetX - coords.x) / coords.widthPercentage
  const y = (offsetY - coords.y) / coords.heightPercentage
  let microphoneActive = audioSet.has(selectedNode?.streamGuid ?? '')
  if (isMouseDown && selectedNode) {
    if (currentOverlayState == OverlayStates.MOVING && dragTarget == Direction.MOVE_HANDLE) {
      const { destWidth, destHeight } = selectedNode
      selectedNode.destX = x - destWidth / 2
      selectedNode.destY = y - destHeight / 2
      drawCanvas(
        mixerCanvasEl,
        mixerVideoEl,
        selectedNode,
        currentOverlayState,
        microphoneActive,
        dragTarget
      )
      updateRenderTrees(settings, jwt! as string, mixerSettings?.eventId ?? '', [globalNodeGraph])
    } else if (currentOverlayState == OverlayStates.RESIZING) {
      let w, h
      const drawParams = calculateDrawParams(selectedNode, mixerVideoEl)
      if (!drawParams) {
        return
      }
      if (dragTarget == Direction.NORTHWEST && zoomInitial) {
        selectedNode.destX = x - dragOffsetX
        selectedNode.destY = y - dragOffsetY

        w = zoomInitial.destX - selectedNode.destX + zoomInitial.destWidth
        h = zoomInitial.destY - selectedNode.destY + zoomInitial.destHeight

        selectedNode.destWidth = w
        selectedNode.destHeight = h
        drawCanvas(
          mixerCanvasEl,
          mixerVideoEl,
          selectedNode,
          currentOverlayState,
          microphoneActive,
          dragTarget
        )
        updateRenderTrees(settings, jwt! as string, mixerSettings?.eventId ?? '', [globalNodeGraph])
      } else if (dragTarget == Direction.NORTHEAST && zoomInitial) {
        w = x - drawParams.x / coords.widthPercentage + dragOffsetX

        selectedNode.destY = y - dragOffsetY
        h = zoomInitial.destY - selectedNode.destY + zoomInitial.destHeight

        selectedNode.destWidth = w
        selectedNode.destHeight = h
        drawCanvas(
          mixerCanvasEl,
          mixerVideoEl,
          selectedNode,
          currentOverlayState,
          microphoneActive,
          dragTarget
        )
        updateRenderTrees(settings, jwt! as string, mixerSettings?.eventId ?? '', [globalNodeGraph])
      } else if (dragTarget == Direction.SOUTHWEST && zoomInitial) {
        selectedNode.destX = x - dragOffsetX

        w = zoomInitial.destX - selectedNode.destX + zoomInitial.destWidth
        h = y - selectedNode.destY - dragOffsetY

        selectedNode.destWidth = w
        selectedNode.destHeight = h
        drawCanvas(
          mixerCanvasEl,
          mixerVideoEl,
          selectedNode,
          currentOverlayState,
          microphoneActive,
          dragTarget
        )
        updateRenderTrees(settings, jwt! as string, mixerSettings?.eventId ?? '', [globalNodeGraph])
      } else if (dragTarget == Direction.SOUTHEAST && zoomInitial) {
        w = x - drawParams.x / coords.widthPercentage + dragOffsetX
        h = y - selectedNode.destY - dragOffsetY

        selectedNode.destWidth = w
        selectedNode.destHeight = h
        drawCanvas(
          mixerCanvasEl,
          mixerVideoEl,
          selectedNode,
          currentOverlayState,
          microphoneActive,
          dragTarget
        )
        updateRenderTrees(settings, jwt! as string, mixerSettings?.eventId ?? '', [globalNodeGraph])
      }
    } else {
      // console.log(`[brew-mixer] mouse moving but some other state, cur state ${currentOverlayState}`);
    }
  } else {
    // console.log(`[brew-mixer] mouse moving but not mouse down, cur state ${currentOverlayState}`);
  }
}

function onMouseUp(): void {
  mixerCanvasEl.removeEventListener('mousemove', onMouseMove)
  isMouseDown = false
  if (
    currentOverlayState == OverlayStates.RESIZING ||
    currentOverlayState == OverlayStates.MOVING
  ) {
    setOverlayState(OverlayStates.SELECTED)
  }
}
// end event handlers

function videoNodeToTop(node: VideoNodeGraphNode, updateMixer = false): boolean {
  if (!globalNodeGraph) {
    return false
  }
  const videoNodes = globalNodeGraph.rootVideoNode.nodes
  const nodeIndex = videoNodes.indexOf(node)

  if (nodeIndex < 0) {
    console.log('[brew-mixer] node not found')
    return false
  }
  if (nodeIndex === videoNodes.length - 1) {
    return false
  }
  videoNodes.push(videoNodes.splice(nodeIndex, 1)[0])
  if (updateMixer) {
    updateRenderTrees(
      settings,
      jwt! as string,
      mixerSettings?.eventId ?? '',
      [globalNodeGraph],
      false
    )
  }
  return true
}

async function setGain(streamGuid: string, gain: number): Promise<void> {
  const audioNodes = globalNodeGraph?.rootAudioNode.nodes ?? []
  for (const node of audioNodes) {
    if (node.streamGuid === streamGuid) {
      node.gain = gain
      const jwt = await authenticate()
      await updateRenderTrees(settings, jwt, mixerSettings?.eventId ?? '', [globalNodeGraph])
      break
    }
  }
}

function updateConnectionInfo(nodeGroupName: string, eventId: string, streamGuid: string): void {
  if (!settings.host || !settings.streamName) {
    connectionInfoEl.textContent = 'Configure host and stream name in Settings'
    return
  }
  if (!settings.useStreamManager) {
    connectionInfoEl.textContent = 'Enable Stream Manager in Settings for this example'
    return
  }

  connectionInfoEl.textContent = `Node group: ${nodeGroupName || 'default'} · Event: ${eventId} · Stream: ${streamGuid}`
}

function getInitialMixerSettings(): BrewMixerFormSettings {
  const urlParams = new URLSearchParams(window.location.search)
  const eventId = urlParams.get('event') || 'event1'
  const mixerStreamGuid = urlParams.get('mixer') || 'live/mix1'

  return {
    eventId,
    outputGuid: mixerStreamGuid,
    width: '1920',
    height: '1080',
    bitrate: '7000000',
    maxBitrate: '10000000',
    qpMin: '28',
    qpMax: '48',
    framerate: '30',
    audiorate: '48000',
  }
}

function addMixerEventsToModal(mixerEvents: Record<string, MixerEvent>): void {
  existingMixerEvents.clear()
  existingEventsListEl.innerHTML = ''
  selectedExistingEventId = null
  useExistingEventBtn.disabled = true

  const eventMap: Record<string, MixerEvent> = mixerEvents
  const entries = Object.entries(eventMap)

  if (entries.length === 0) {
    modalTabsEl.classList.add('is-hidden')
    setSetupModalView('create')
    return
  }

  entries.forEach(([eventId, event]) => {
    existingMixerEvents.set(eventId, event)

    const item = document.createElement('li')
    item.className = 'brew-mixer-existing-events__item'

    const label = document.createElement('label')
    label.className = 'brew-mixer-existing-events__label'

    const radio = document.createElement('input')
    radio.className = 'brew-mixer-existing-events__radio'
    radio.type = 'radio'
    radio.name = 'existing-mixer-event'
    radio.value = eventId
    radio.addEventListener('change', () => {
      selectedExistingEventId = eventId
      useExistingEventBtn.disabled = false
    })

    const meta = document.createElement('div')
    meta.className = 'brew-mixer-existing-events__meta'

    const eventNameEl = document.createElement('span')
    eventNameEl.className = 'brew-mixer-existing-events__event-id'
    eventNameEl.textContent = `Event: ${eventId}`

    const streamGuidEl = document.createElement('span')
    streamGuidEl.className = 'brew-mixer-existing-events__stream-guid'
    streamGuidEl.textContent = `Stream: ${event.streamGuid}`

    meta.appendChild(eventNameEl)
    meta.appendChild(streamGuidEl)
    label.appendChild(radio)
    label.appendChild(meta)
    item.appendChild(label)
    existingEventsListEl.appendChild(item)
  })

  modalTabsEl.classList.remove('is-hidden')
  setSetupModalView('existing')
}

function setSetupModalView(view: 'existing' | 'create'): void {
  const showExisting = view === 'existing' && !modalTabsEl.classList.contains('is-hidden')
  existingEventsViewEl.classList.toggle('is-hidden', !showExisting)
  createEventViewEl.classList.toggle('is-hidden', showExisting)
  existingEventsTabBtn.classList.toggle('brew-mixer-modal__tab--active', showExisting)
  createEventTabBtn.classList.toggle('brew-mixer-modal__tab--active', !showExisting)
}

function applyMixerSettings(values: BrewMixerFormSettings): void {
  eventIdInput.value = values.eventId
  outputGuidInput.value = values.outputGuid
  widthInput.value = values.width
  heightInput.value = values.height
  bitrateInput.value = values.bitrate
  maxBitrateInput.value = values.maxBitrate
  qpMinInput.value = values.qpMin
  qpMaxInput.value = values.qpMax
  framerateInput.value = values.framerate
  audiorateInput.value = values.audiorate
}

function readMixerSettings(): BrewMixerFormSettings {
  return {
    eventId: eventIdInput.value.trim(),
    outputGuid: outputGuidInput.value.trim(),
    width: widthInput.value.trim() || '1920',
    height: heightInput.value.trim() || '1080',
    bitrate: bitrateInput.value.trim() || '7000000',
    maxBitrate: maxBitrateInput.value.trim() || '10000000',
    qpMin: qpMinInput.value.trim() || '28',
    qpMax: qpMaxInput.value.trim() || '48',
    framerate: framerateInput.value.trim() || '30',
    audiorate: audiorateInput.value.trim() || '48000',
  }
}

function ensureMixerSettings(mixerSettings: BrewMixerFormSettings): boolean {
  if (!mixerSettings.eventId) {
    log('Missing event ID. Open Settings and configure event ID first.', 'error')
    return false
  }
  if (!mixerSettings.outputGuid) {
    log('Missing output GUID. Open Settings and configure output GUID first.', 'error')
    return false
  }
  return true
}

function brewmixerFormSettingsToRequest(settings: BrewMixerFormSettings): MixerEventRequest {
  return {
    eventId: settings.eventId,
    streamGuid: settings.outputGuid,
    width: parseInt(settings.width),
    height: parseInt(settings.height),
    frameRate: parseInt(settings.framerate),
    bitRate: parseInt(settings.bitrate),
    maxBitRate: parseInt(settings.maxBitrate),
    qpMin: parseInt(settings.qpMin),
    qpMax: parseInt(settings.qpMax),
    audioSampleRate: parseInt(settings.audiorate),
    audioChannels: 2,
    subMixes: 1,
  }
}

function openSetupModal(): void {
  modalBackdropEl.classList.add('is-open')
}

function closeSetupModal(): void {
  modalBackdropEl.classList.remove('is-open')
}

function isNodeGraphEditorOpen(): boolean {
  return !nodeGraphEditorPanelEl.classList.contains('is-hidden')
}

function setNodeGraphEditorOpen(open: boolean): void {
  nodeGraphEditorPanelEl.classList.toggle('is-hidden', !open)
  toggleNodeGraphEditorBtn.textContent = open ? 'Close NodeGraph Editor' : 'Open NodeGraph Editor'
}

function updateNodeGraphEditorState(hasNodeGraph: boolean): void {
  toggleNodeGraphEditorBtn.disabled = !hasNodeGraph
  submitNodeGraphBtn.disabled = !hasNodeGraph
  resetNodeGraphBtn.disabled = !hasNodeGraph
  nodeGraphEditorInput.disabled = !hasNodeGraph
  if (!hasNodeGraph) {
    nodeGraphEditorInput.value = ''
    setNodeGraphEditorOpen(false)
  }
}

function updateSetupModalState(state: SetupModalState): void {
  const elements = [
    eventIdInput,
    outputGuidInput,
    widthInput,
    heightInput,
    bitrateInput,
    maxBitrateInput,
    qpMinInput,
    qpMaxInput,
    framerateInput,
    audiorateInput,
  ]
  if (state === SetupModalState.SUBMITTING) {
    elements.forEach((element) => {
      element.disabled = true
    })
    mixerFormSubmitBtn.textContent = 'Submitting...'
    mixerFormSubmitBtn.classList.add('is-loading')
    mixerFormSubmitBtn.disabled = true
  } else {
    elements.forEach((element) => {
      element.disabled = false
    })
    mixerFormSubmitBtn.textContent = 'Submit'
    mixerFormSubmitBtn.classList.remove('is-loading')
    mixerFormSubmitBtn.disabled = false
  }
  modalFormEl.disabled = state === SetupModalState.SUBMITTING
}

function syncNodeGraphEditorFromGlobal(): void {
  if (!globalNodeGraph) {
    updateNodeGraphEditorState(false)
    return
  }
  nodeGraphEditorInput.value = JSON.stringify(globalNodeGraph, null, 2)
  updateNodeGraphEditorState(true)
}

function updateStopMixerButtonState(enabled: boolean): void {
  stopMixerBtn.disabled = !enabled
}

function findGridLayoutFromNodeGraph(nodeGraph: NodeGraph): MixerLayoutPreset {
  const {
    rootVideoNode: { nodes },
  } = nodeGraph
  const videoNodes =
    nodes && nodes.length > 0 ? nodes.filter((node) => node.node === 'VideoSourceNode') : []
  if (videoNodes.length === 4) return '2x2'
  if (videoNodes.length === 9) return '3x3'
  if (videoNodes.length === 16) return '4x4'
  return '2x2'
}

function setSelectedLayoutPreset(preset: MixerLayoutPreset, disabled: boolean = false): void {
  selectedLayoutPreset = preset
  const controls: Array<{ key: MixerLayoutPreset; button: HTMLButtonElement }> = [
    { key: '2x2', button: layout2x2Btn },
    { key: '3x3', button: layout3x3Btn },
    { key: '4x4', button: layout4x4Btn },
  ]
  controls.forEach(({ key, button }) => {
    const active = key === selectedLayoutPreset
    button.classList.toggle('brew-mixer-icon-btn--active', active)
    button.setAttribute('aria-pressed', String(active))
    button.disabled = disabled
  })
}

function syncMixerAudioToggleUi(): void {
  mixerAudioToggleIcon.src = isMixerAudioOn
    ? publicAssetPrefix() + 'assets/volume_on.svg'
    : publicAssetPrefix() + 'assets/volume_off.svg'
  mixerAudioToggleBtn.setAttribute('aria-pressed', String(isMixerAudioOn))
  mixerAudioToggleBtn.setAttribute(
    'aria-label',
    isMixerAudioOn ? 'Mute mixer audio' : 'Unmute mixer audio'
  )
}

async function applyMixerAudioState(): Promise<void> {
  mixerVideoEl.muted = !isMixerAudioOn
  if (!subscriber) return

  const client = subscriber as unknown as {
    mute?: () => Promise<void> | void
    unmute?: () => Promise<void> | void
    muteAudio?: () => Promise<void> | void
    unmuteAudio?: () => Promise<void> | void
  }

  try {
    if (isMixerAudioOn) {
      if (typeof client.unmute === 'function') {
        await client.unmute()
      } else if (typeof client.unmuteAudio === 'function') {
        await client.unmuteAudio()
      }
    } else if (typeof client.mute === 'function') {
      await client.mute()
    } else if (typeof client.muteAudio === 'function') {
      await client.muteAudio()
    }
  } catch (error) {
    log(`Failed to apply mixer audio toggle: ${String(error)}`, 'error')
  }
}

function formatProbeDetail(probe: ProbeServerForSubscribeResponse): string {
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

async function startSubscription(): Promise<void> {
  if (!mixerSettings) {
    throw new Error('Mixer settings are not set')
  }
  await stopSubscription()
  setOverlayState(OverlayStates.IDLE)
  clearCanvas(mixerCanvasEl)
  const { outputGuid } = mixerSettings
  const paths = outputGuid.split('/')
  const streamName = paths.pop()
  const app = paths.join('/')
  const endpoint = resolveEndpointFromSettings(
    {
      ...settings,
      streamName: streamName!,
      app: app!,
    },
    'whep'
  )
  const connectionParams = resolveConnectionParamsFromSettings(settings)
  const stats = resolveStatisticsConfigurationFromSettings(settings)
  const rtcConfiguration = resolveRtcConfigurationFromSettings(settings)
  subscriber = new sdk.WHEPClient()
  subscriber.on('*', (event) => {
    const { type } = event
    if (type === 'Subscribe.Time.Update') return
    log(`[Mixer WHEP] ${event.type}`)
    onSubscriberEvent(event)
  })
  await subscriber.init({
    endpoint,
    streamName: streamName!,
    mediaElementId: 'mixer-video',
    connectionParams,
    stats: stats ?? undefined,
    rtcConfiguration,
  })
  await subscriber.subscribe()

  updateConnectionInfo(settings.nodeGroupName || 'default', mixerSettings.eventId || '', outputGuid)

  const peerConnection = subscriber.getPeerConnection()
  if (peerConnection) {
    mixerSubscriberStatsEl.setPeerConnection(peerConnection)
    mixerSubscriberStatsEl.start()
  }
  await applyMixerAudioState()
}

async function stopSubscription(): Promise<void> {
  if (!subscriber) return
  try {
    await subscriber.unsubscribe()
    log('Subscribe stopped', 'success')
  } catch (error) {
    log(`Unsubscribe failed: ${String(error)}`, 'error')
  } finally {
    mixerSubscriberStatsEl.stop()
    mixerSubscriberStatsEl.setPeerConnection(null)
    subscriber = null
    selectedNode = null
    setOverlayState(OverlayStates.NOT_RUNNING)
    clearCanvas(mixerCanvasEl)
  }
}

async function startSubscriptionWithRetry(freshlyCreated: boolean): Promise<void> {
  if (freshlyCreated) {
    setupStatusEl.textContent = 'Waiting briefly for the mixer to settle...'
    // initial wait for the freshly-created mixer to settle on origin/SM
    await new Promise((r) => setTimeout(r, SUBSCRIBE_INITIAL_DELAY_MS))
  }
  setupStatusEl.textContent = 'Subscribing to render mixer...'
  let attempt = 0
  while (attempt < SUBSCRIBE_MAX_ATTEMPTS) {
    attempt++
    try {
      await startSubscription()
      setupStatusEl.textContent = ''
      return
    } catch (error: unknown) {
      log(
        `[Red5ProSubscriber] subscribe attempt ${attempt}/${SUBSCRIBE_MAX_ATTEMPTS} failed: ${String(error)}`,
        'error'
      )
      // probe SM for diagnostic — never throws
      const jwt = await authenticate()
      const probe = await probeServerForSubscribe(settings, jwt, settings.region)
      if (!probe) {
        throw new Error('Failed to probe Stream Manager')
      }
      const probeDetail = formatProbeDetail(probe)
      log(`SM probe: ${probeDetail}`, 'info')

      if (attempt >= SUBSCRIBE_SILENT_ATTEMPTS) {
        log(`Retrying subscribe (attempt ${attempt}/${SUBSCRIBE_MAX_ATTEMPTS}`, 'info')
      }
      if (attempt < SUBSCRIBE_MAX_ATTEMPTS) {
        await new Promise((r) => setTimeout(r, SUBSCRIBE_RETRY_DELAY_MS))
      }
    }
  }
}

function subscribeToRenderTrees(nodeGraph: NodeGraph[], freshlyCreated: boolean): void {
  globalNodeGraph = nodeGraph.length > 0 ? nodeGraph[0] : null
  syncNodeGraphEditorFromGlobal()
  updateStopMixerButtonState(Boolean(mixerSettings?.eventId || eventIdInput.value.trim()))
  if (!globalNodeGraph) {
    log('No render trees found', 'error')
    alert('No render trees found, please create a mixer event first.')
    return
  }
  audioSet.clear()
  globalNodeGraph.rootAudioNode.nodes.forEach((node) => {
    if (node.node === 'AudioSourceNode' && node.gain !== -100) audioSet.add(node.streamGuid)
  })
  setSelectedLayoutPreset(findGridLayoutFromNodeGraph(globalNodeGraph), false)
  startSubscriptionWithRetry(freshlyCreated)
}

async function handleMixerSetupSubmit(event: SubmitEvent): Promise<void> {
  event.preventDefault()
  try {
    await stopSubscription()
    updateSetupModalState(SetupModalState.SUBMITTING)
    mixerSettings = readMixerSettings()
    // 1. Validate the settings
    if (!ensureMixerSettings(mixerSettings)) return
    // 2. Assemble Request Payload
    const request = brewmixerFormSettingsToRequest(mixerSettings)
    // 2a. Add `credentials` object with `username` and `password` and `token` on Request if enabled in settings.
    if (settings.useAuthentication) {
      const { username, password, token } = settings

      request.credentials = {
        username,
        password,
        token: token.trim().length > 0 ? token : undefined,
      }
    }
    // 3. Authenticate
    const jwt = await authenticate()
    // 4. Create Mixer Event
    const response = await createMixerEvent(settings, jwt, request)
    if (response) {
      log(`Mixer event created: ${JSON.stringify(response)}`, 'success')
    } else {
      throw new Error('Failed to create mixer event')
    }
    // 5. Update Render Trees
    const nodeGraph = getDefaultNodeGraph()
    await updateRenderTrees(settings, jwt, mixerSettings.eventId, [nodeGraph])
    setupStatusEl.textContent = `Mixer configured: ${mixerSettings.eventId} -> ${mixerSettings.outputGuid}`
    setupStatusEl.className = 'prompt prompt--success'
    log(`Brew mixer setup: ${JSON.stringify(mixerSettings)}`, 'success')
    closeSetupModal()
    // 6. Start Subscription.
    subscribeToRenderTrees([nodeGraph], true /* freshlyCreated */)
  } catch (error) {
    if (error instanceof MixerEventAlreadyExistsError) {
      log(`Mixer event already exists: ${error.message}`, 'info')
      alert(`Mixer event already exists: ${error.message}`)
      setupStatusEl.textContent = `Mixer event already exists: ${error.message}`
      setupStatusEl.className = 'prompt prompt--info'
      closeSetupModal()
      return
    } else if (error instanceof Error) {
      log(`Mixer setup failed: ${error.message}`, 'error')
      alert(`Mixer setup failed: ${error.message}`)
      setupStatusEl.textContent = `Mixer setup failed: ${error.message}`
      setupStatusEl.className = 'prompt prompt--error'
    } else {
      log(`Mixer setup failed: ${String(error)}`, 'error')
      alert(`Mixer setup failed: ${String(error)}`)
      setupStatusEl.textContent = `Mixer setup failed: ${String(error)}`
      setupStatusEl.className = 'prompt prompt--error'
    }
  } finally {
    updateSetupModalState(SetupModalState.IDLE)
  }
}

async function getAndSubscribeToRenderTrees(eventId: string): Promise<void> {
  const jwt = await authenticate()
  const renderTrees = await getRenderTrees(settings, jwt, eventId)
  if (!renderTrees) {
    throw new Error('Failed to get render trees')
  }
  subscribeToRenderTrees(renderTrees, false /* not freshly created */)
}

async function updateRenderTreeWithGrid(grid: MixerLayoutPreset): Promise<void> {
  if (!globalNodeGraph) {
    log('No NodeGraph available to update.', 'error')
    return
  }
  try {
    setOverlayState(OverlayStates.IDLE)
    const jwt = await authenticate()
    let nodeGraph = regenerateGrid(globalNodeGraph, grid)
    await updateRenderTrees(settings, jwt, mixerSettings?.eventId || '', [nodeGraph])
    globalNodeGraph = nodeGraph
    setSelectedLayoutPreset(grid, false)
  } catch (error) {
    log(`Failed to set layout ${grid}: ${String(error)}`, 'error')
    alert(`Failed to set layout ${grid}: ${String(error)}`)
    setupStatusEl.textContent = `Failed to set layout ${grid}: ${String(error)}`
    setupStatusEl.className = 'prompt prompt--error'
  }
}

function regenerateGrid(nodeGraph: NodeGraph, grid: MixerLayoutPreset): NodeGraph {
  const sideLength = grid === '2x2' ? 2 : grid === '3x3' ? 3 : 4
  const vid = document.getElementById('mixer-video') as HTMLVideoElement
  let cellSourceWidth = vid.videoWidth,
    cellSourceHeight = vid.videoHeight
  const gridWidth = sideLength
  const gridHeight = sideLength <= 4 ? sideLength : 4

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

  nodeGraph.rootVideoNode.nodes.length = 1 // clear the array, but keep the first node (the SolidColorNode)
  nodeGraph.rootAudioNode.nodes.length = 0 // clear the source audio nodes (this keeps the SumNode at rootAudioNode.node)
  for (let j = 0; j < gridHeight; j++) {
    for (let i = 0; i < gridWidth; i++) {
      let sName = guids[j * gridWidth + i]
      let cell: VideoNodeGraphNode = {
        node: 'VideoSourceNode',
        streamGuid: sName,
        sourceX: 0,
        sourceY: 0,
        sourceWidth: cellSourceWidth,
        sourceHeight: cellSourceHeight,
        destX: xOffset + cellWidth * i,
        destY: cellHeight * j,
        destWidth: cellWidth,
        destHeight: cellHeight,
      }
      nodeGraph.rootVideoNode.nodes.push(cell)

      let audiocell: AudioNodeGraphNode = {
        node: 'AudioSourceNode',
        streamGuid: sName,
        pan: 0,
        gain: audioSet.has(cell.streamGuid) ? -6.0 : -100,
      }
      nodeGraph.rootAudioNode.nodes.push(audiocell)
    }
  }
  return nodeGraph
}

async function initializeSession(): Promise<void> {
  updateStopMixerButtonState(false)
  guids = []
  const { app } = settings
  for (let i = 0; i < GUID_COUNT; i++) {
    guids.push(`${app}/stream${i + 1}`)
  }
  try {
    // 1. Authenticate
    const jwt = await authenticate()
    // 2. Get Event Query Param if present
    const urlParams = new URLSearchParams(window.location.search)
    const event = urlParams.get('event')
    // 3. If present, get List of Mixer Events and see if exists.
    const mixerEvents = await getMixerEvents(settings, jwt)
    if (event && mixerEvents[event]) {
      eventIdInput.value = event
      outputGuidInput.value = mixerEvents[event].streamGuid
      mixerSettings = readMixerSettings()
      await getAndSubscribeToRenderTrees(event)
      return
    }
    addMixerEventsToModal(mixerEvents)
    // 4. If not present, open setup modal.
  } catch (error) {
    log(`Initialize session failed: ${String(error)}`, 'error')
    alert(`Initialize session failed: ${String(error)}`)
    setupStatusEl.textContent = `Initialize session failed: ${String(error)}`
    setupStatusEl.className = 'prompt prompt--error'
    openSetupModal()
    return
  }
  openSetupModal()
}

modalFormEl.addEventListener('submit', (event) => {
  handleMixerSetupSubmit(event as SubmitEvent)
})

toggleNodeGraphEditorBtn.addEventListener('click', () => {
  if (toggleNodeGraphEditorBtn.disabled) return
  setNodeGraphEditorOpen(!isNodeGraphEditorOpen())
})

layout2x2Btn.addEventListener('click', () => {
  updateRenderTreeWithGrid('2x2')
})

layout3x3Btn.addEventListener('click', () => {
  updateRenderTreeWithGrid('3x3')
})

layout4x4Btn.addEventListener('click', () => {
  updateRenderTreeWithGrid('4x4')
})

mixerAudioToggleBtn.addEventListener('click', () => {
  isMixerAudioOn = !isMixerAudioOn
  syncMixerAudioToggleUi()
  void applyMixerAudioState()
})

resetNodeGraphBtn.addEventListener('click', () => {
  syncNodeGraphEditorFromGlobal()
})

submitNodeGraphBtn.addEventListener('click', async () => {
  if (!globalNodeGraph) {
    log('No NodeGraph available to submit.', 'error')
    return
  }

  const eventId = mixerSettings?.eventId || eventIdInput.value.trim()
  if (!eventId) {
    log('Cannot submit render tree: missing event ID.', 'error')
    alert('Cannot submit render tree: missing event ID.')
    setupStatusEl.textContent = 'Cannot submit render tree: missing event ID.'
    setupStatusEl.className = 'prompt prompt--error'
    return
  }

  submitNodeGraphBtn.disabled = true
  nodeGraphEditorInput.disabled = true

  try {
    const parsedNodeGraph = JSON.parse(nodeGraphEditorInput.value) as NodeGraph
    const jwt = await authenticate()
    await updateRenderTrees(settings, jwt, eventId, [parsedNodeGraph])

    globalNodeGraph = parsedNodeGraph
    audioSet.clear()
    globalNodeGraph.rootAudioNode.nodes.forEach((node) => {
      if (node.node === 'AudioSourceNode' && node.gain !== -100) audioSet.add(node.streamGuid)
    })
    nodeGraphEditorInput.value = JSON.stringify(parsedNodeGraph, null, 2)
    setupStatusEl.textContent = `Render tree updated for event: ${eventId}`
    setupStatusEl.className = 'prompt prompt--success'
    log(`Render tree updated for event "${eventId}"`, 'success')
    setNodeGraphEditorOpen(false)
  } catch (error) {
    if (error instanceof Error) {
      log(`Render tree update failed: ${error.message}`, 'error')
      alert(`Render tree update failed: ${error.message}`)
      setupStatusEl.textContent = `Render tree update failed: ${error.message}`
      setupStatusEl.className = 'prompt prompt--error'
    } else {
      log(`Render tree update failed: ${String(error)}`, 'error')
      alert(`Render tree update failed: ${String(error)}`)
      setupStatusEl.textContent = `Render tree update failed: ${String(error)}`
      setupStatusEl.className = 'prompt prompt--error'
    }
  } finally {
    submitNodeGraphBtn.disabled = false
    nodeGraphEditorInput.disabled = false
  }
})

stopMixerBtn.addEventListener('click', async () => {
  const eventId = mixerSettings?.eventId || eventIdInput.value.trim()
  const outputGuid = mixerSettings?.outputGuid || outputGuidInput.value.trim()
  if (!eventId) {
    log('Cannot stop mixer: missing event ID.', 'error')
    alert('Cannot stop mixer: missing event ID.')
    setupStatusEl.textContent = 'Cannot stop mixer: missing event ID.'
    setupStatusEl.className = 'prompt prompt--error'
    return
  }

  const shouldStop = window.confirm(
    `You are about to stop mixer "${eventId}" and end output stream "${outputGuid || 'unknown'}". Continue?`
  )
  if (!shouldStop) {
    log('Stop mixer request canceled.', 'info')
    return
  }

  stopMixerBtn.disabled = true
  let stopped = false
  try {
    const jwt = await authenticate()
    await stopMixerEvent(settings, jwt, eventId)
    await stopSubscription()
    stopped = true
    audioSet.clear()
    globalNodeGraph = null
    mixerSettings = null
    updateNodeGraphEditorState(false)
    updateStopMixerButtonState(false)
    setupStatusEl.textContent = `Mixer stopped: ${eventId}`
    setupStatusEl.className = 'prompt prompt--success'
    log(`Mixer stopped: ${eventId}`, 'success')
    await initializeSession()
  } catch (error) {
    if (error instanceof Error) {
      log(`Stop mixer failed: ${error.message}`, 'error')
      alert(`Stop mixer failed: ${error.message}`)
      setupStatusEl.textContent = `Stop mixer failed: ${error.message}`
      setupStatusEl.className = 'prompt prompt--error'
    } else {
      log(`Stop mixer failed: ${String(error)}`, 'error')
      alert(`Stop mixer failed: ${String(error)}`)
      setupStatusEl.textContent = `Stop mixer failed: ${String(error)}`
      setupStatusEl.className = 'prompt prompt--error'
    }
  } finally {
    if (!stopped) {
      updateStopMixerButtonState(Boolean(mixerSettings?.eventId || eventIdInput.value.trim()))
    }
  }
})

modalCloseBtn.addEventListener('click', () => {
  closeSetupModal()
})

modalBackdropEl.addEventListener('click', (event) => {
  if (event.target === modalBackdropEl) {
    closeSetupModal()
  }
})

reopenSetupBtn.addEventListener('click', async () => {
  try {
    const jwt = await authenticate()
    const mixerEvents = await getMixerEvents(settings, jwt)
    addMixerEventsToModal(mixerEvents)
  } catch {
    // ignore
  }
  openSetupModal()
})

existingEventsTabBtn.addEventListener('click', () => {
  setSetupModalView('existing')
})

createEventTabBtn.addEventListener('click', () => {
  setSetupModalView('create')
})

useExistingEventBtn.addEventListener('click', async () => {
  if (!selectedExistingEventId) return
  const event = existingMixerEvents.get(selectedExistingEventId)
  if (!event) return

  eventIdInput.value = selectedExistingEventId
  outputGuidInput.value = event.streamGuid
  mixerSettings = readMixerSettings()
  try {
    await getAndSubscribeToRenderTrees(selectedExistingEventId)
    setupStatusEl.textContent = `Selected existing mixer: ${selectedExistingEventId} -> ${event.streamGuid}`
    setupStatusEl.className = 'prompt prompt--success'
    log(`Using existing mixer event: ${selectedExistingEventId}`, 'success')
  } catch (error) {
    log(`Failed to get and subscribe to render trees: ${String(error)}`, 'error')
    alert(`Failed to get and subscribe to render trees: ${String(error)}`)
  }
  closeSetupModal()
})

document.addEventListener('webrtc-settings-applied', (event) => {
  settings = (event as CustomEvent).detail as Settings
  updateConnectionInfo(settings.nodeGroupName || 'default', 'N/A', settings.streamName || 'N/A')
  log(`Settings updated for stream "${settings.streamName}".`)
})

window.addEventListener('pagehide', () => {
  desyncOverlayCanvas()
  void stopSubscription()
})
window.addEventListener('beforeunload', () => {
  desyncOverlayCanvas()
  void stopSubscription()
})

updateConnectionInfo(settings.nodeGroupName || 'default', 'N/A', settings.streamName || 'N/A')
applyMixerSettings(getInitialMixerSettings())
updateNodeGraphEditorState(false)
setSelectedLayoutPreset('2x2', true)
syncMixerAudioToggleUi()
syncOverlayCanvas()
initializeSession()
log('Brew Mixer loaded. Complete setup to continue.')
