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

import { Coordinates, getCoordinates } from '@/lib/coord-utils'
import { VideoNodeGraphNode } from '@/service/brewmixer'

export enum OverlayStates {
  NOT_RUNNING = 0,
  IDLE = 1,
  ZOOMING = 2,
  ZOOMED_IN = 3,
  SELECTED = 4,
  RESIZING = 5,
  MOVING = 6,
}

export enum Direction {
  EAST = 0,
  NORTHEAST = 1,
  NORTH = 2,
  NORTHWEST = 3,
  WEST = 4,
  SOUTHWEST = 5,
  SOUTH = 6,
  SOUTHEAST = 7,
  MOVE_HANDLE = 8,
}

export interface DrawParams {
  centerX: number
  centerY: number
  x: number
  y: number
  halfWidth?: number
  halfHeight?: number
  quarterWidth?: number
  quarterHeight?: number
  width: number
  height: number
  percWidth?: number
  percHeight?: number
  scaleWidth?: number
  scaleHeight?: number
}

export const drawMoveHandle = (
  ctx: CanvasRenderingContext2D,
  drawParams: DrawParams,
  scale = 1.0
): void => {
  // =================================
  // circular drag handle
  const { centerX, centerY } = drawParams
  const size = 32 * scale
  ctx.beginPath()
  ctx.ellipse(centerX, centerY, size, size, 0, 0, 360)
  ctx.stroke()
}

export const drawEastResize = (
  ctx: CanvasRenderingContext2D,
  drawParams: DrawParams,
  scale = 1.0
): void => {
  const { x, y, halfHeight = 0, quarterHeight = 0, width } = drawParams
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

export const drawNortheastResize = (
  ctx: CanvasRenderingContext2D,
  drawParams: DrawParams,
  scale = 1.0
): void => {
  const { x, y, halfWidth = 0, quarterWidth = 0, quarterHeight = 0, width } = drawParams
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

export const drawNorthResize = (
  ctx: CanvasRenderingContext2D,
  drawParams: DrawParams,
  scale = 1.0
): void => {
  const { x, y, centerX = 0, halfWidth = 0, quarterWidth = 0 } = drawParams
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

export const drawNorthwestResize = (
  ctx: CanvasRenderingContext2D,
  drawParams: DrawParams,
  scale = 1.0
): void => {
  const { x, y, quarterWidth = 0, quarterHeight = 0 } = drawParams
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

export const drawWestResize = (
  ctx: CanvasRenderingContext2D,
  drawParams: DrawParams,
  scale = 1.0
): void => {
  const { x, y, halfHeight = 0, quarterHeight = 0 } = drawParams
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

export const drawSouthwestResize = (
  ctx: CanvasRenderingContext2D,
  drawParams: DrawParams,
  scale = 1.0
): void => {
  const { x, y, halfHeight = 0, quarterWidth = 0, quarterHeight = 0, height } = drawParams
  // =================================
  // lower left corner
  ctx.fillRect(x + 4, y + height - 8, quarterWidth - 8, 4)
  ctx.fillRect(x + 4, y + halfHeight + quarterHeight + 4, 4, quarterHeight - 8)

  // arrow
  ctx.beginPath()
  ctx.moveTo(x + 12, y + height - 12)
  ctx.lineTo(x + 12 + 11 * scale, y + height - 12 - 56 * scale)
  ctx.lineTo(x + 12 + 56 * scale, y + height - 12 - 11 * scale)
  ctx.fill()
}

export const drawSouthResize = (
  ctx: CanvasRenderingContext2D,
  drawParams: DrawParams,
  scale = 1.0
): void => {
  const { x, y, centerX = 0, halfWidth = 0, quarterWidth = 0, height } = drawParams
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

export const drawSoutheastResize = (
  ctx: CanvasRenderingContext2D,
  drawParams: DrawParams,
  scale = 1.0
): void => {
  const {
    x,
    y,
    halfWidth = 0,
    halfHeight = 0,
    quarterWidth = 0,
    quarterHeight = 0,
    height,
    width = 0,
  } = drawParams
  // =================================
  // lower right corner
  ctx.fillRect(x + halfWidth + quarterWidth + 4, y + height - 8, quarterWidth - 8, 4)
  ctx.fillRect(x + width - 8, y + halfHeight + quarterHeight + 4, 4, quarterHeight - 8)

  // arrow
  ctx.beginPath()
  ctx.moveTo(x + width - 12, y + height - 12)
  ctx.lineTo(x + width - 12 - 11 * scale, y + height - 12 - 56 * scale)
  ctx.lineTo(x + width - 12 - 56 * scale, y + height - 12 - 11 * scale)
  ctx.fill()
}

export const drawMicrophone = (
  ctx: CanvasRenderingContext2D,
  drawParams: DrawParams,
  scale = 1.0
): void => {
  const { centerX = 0, centerY = 0, quarterWidth = 0 } = drawParams
  // =================================
  // microphone
  ctx.beginPath()
  ctx.arc(centerX + quarterWidth, centerY, 16 * scale, 2 * Math.PI, Math.PI)
  ctx.arc(centerX + quarterWidth, centerY - 32 * scale, 16 * scale, Math.PI, 0)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(centerX + quarterWidth, centerY, 26 * scale, 2 * Math.PI, Math.PI)
  ctx.moveTo(centerX + quarterWidth, centerY + 26 * scale)
  ctx.lineTo(centerX + quarterWidth, centerY + (26 + 16) * scale)
  ctx.moveTo(centerX + quarterWidth - 20 * scale, centerY + (26 + 16) * scale)
  ctx.lineTo(centerX + quarterWidth + 20 * scale, centerY + (26 + 16) * scale)
  ctx.stroke()
}

export const lerp = (a: number, b: number, t: number): number => {
  return a * (1.0 - t) + b * t
}

export const getCoords = (video: HTMLVideoElement): Coordinates => {
  const { clientWidth, clientHeight } = video
  const { videoWidth, videoHeight } = video
  return getCoordinates(videoWidth, videoHeight, clientWidth, clientHeight)
}

export const calculateDrawParams = (
  selectedNode: VideoNodeGraphNode | null,
  video: HTMLVideoElement
): DrawParams | null => {
  if (!selectedNode) {
    return null
  }
  const coords = getCoords(video)
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

  const { destX, destY, destWidth, destHeight, sourceWidth, sourceHeight } = selectedNode

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
    scaleHeight: yscale,
  }
  return drawParams
}

export const drawCanvas = (
  canvas: HTMLCanvasElement,
  video: HTMLVideoElement,
  selectedNode: VideoNodeGraphNode | null,
  currentState: OverlayStates = OverlayStates.NOT_RUNNING,
  microphoneActive: boolean = false,
  dragTarget: Direction | null = null
): void => {
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }
  ctx.fillStyle = 'rgba(7, 2, 2, 0)'
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const drawParams = calculateDrawParams(selectedNode, video)
  if (!drawParams) {
    return
  }
  const { scaleWidth: percWidth, scaleHeight: percHeight } = drawParams
  const scale = Math.min(percWidth ?? 1, percHeight ?? 1)

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
    if (microphoneActive) {
      ctx.strokeStyle = 'rgba(68,160,255,255)'
      ctx.fillStyle = 'rgba(68,160,255,255)'
    }
    drawMicrophone(ctx, drawParams, scale)
  } else if (currentState == OverlayStates.RESIZING || currentState == OverlayStates.MOVING) {
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
    } else if (dragTarget == Direction.MOVE_HANDLE) {
      drawMoveHandle(ctx, drawParams, scale)
    }
  }
}

export function clearCanvas(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }
  ctx.fillStyle = 'rgba(7, 2, 2, 0)'
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}
