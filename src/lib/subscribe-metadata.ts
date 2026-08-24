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

import { formatSessionDuration } from '@/lib/rtc-stats'

export function extractBroadcastStartTime(payload: unknown): number | null {
  if (!payload || typeof payload !== 'object') return null

  const record = payload as Record<string, unknown>

  if (typeof record.startTime === 'number' && record.startTime > 0) {
    return record.startTime
  }

  const nested = record.data
  if (nested && typeof nested === 'object') {
    const startTime = (nested as Record<string, unknown>).startTime
    if (typeof startTime === 'number' && startTime > 0) {
      return startTime
    }
  }

  return null
}

export function formatBroadcastStartTime(timestampMs: number, useUtc: boolean): string {
  const date = new Date(timestampMs)

  if (useUtc) {
    return `${date.toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, ' UTC')}`
  }

  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  }).format(date)
}

export function formatBroadcastLength(startTimeMs: number, nowMs = Date.now()): string {
  return formatSessionDuration(Math.max(0, nowMs - startTimeMs))
}

export type BroadcastStreamingMode = 'video-audio' | 'audio' | 'video' | 'empty' | 'unknown'

export interface BroadcastDeliveryState {
  audioActive: boolean
  videoActive: boolean
  mode: BroadcastStreamingMode
  rawMode: string | null
}

export function extractStreamingMode(payload: unknown): string | null {
  if (!payload || typeof payload !== 'object') return null

  const record = payload as Record<string, unknown>

  if (typeof record.streamingMode === 'string') {
    return record.streamingMode
  }

  const nested = record.data
  if (nested && typeof nested === 'object') {
    const streamingMode = (nested as Record<string, unknown>).streamingMode
    if (typeof streamingMode === 'string') {
      return streamingMode
    }
  }

  return null
}

function normalizeStreamingMode(mode: string): string {
  return mode.trim().toLowerCase().replace(/[\s/_-]+/g, '')
}

export function parseBroadcastDeliveryState(streamingMode: string | null): BroadcastDeliveryState {
  if (!streamingMode) {
    return {
      audioActive: true,
      videoActive: true,
      mode: 'unknown',
      rawMode: null,
    }
  }

  const normalized = normalizeStreamingMode(streamingMode)

  if (normalized === 'videoaudio') {
    return {
      audioActive: true,
      videoActive: true,
      mode: 'video-audio',
      rawMode: streamingMode,
    }
  }

  if (normalized === 'audio') {
    return {
      audioActive: true,
      videoActive: false,
      mode: 'audio',
      rawMode: streamingMode,
    }
  }

  if (normalized === 'video') {
    return {
      audioActive: false,
      videoActive: true,
      mode: 'video',
      rawMode: streamingMode,
    }
  }

  if (normalized === 'empty') {
    return {
      audioActive: false,
      videoActive: false,
      mode: 'empty',
      rawMode: streamingMode,
    }
  }

  return {
    audioActive: true,
    videoActive: true,
    mode: 'unknown',
    rawMode: streamingMode,
  }
}

export function parseBroadcastDeliveryFromMetadata(payload: unknown): BroadcastDeliveryState | null {
  const streamingMode = extractStreamingMode(payload)
  if (streamingMode === null) return null
  return parseBroadcastDeliveryState(streamingMode)
}

export function formatBroadcastStreamingMode(mode: BroadcastStreamingMode, rawMode: string | null): string {
  switch (mode) {
    case 'video-audio':
      return 'Video/Audio'
    case 'audio':
      return 'Audio'
    case 'video':
      return 'Video'
    case 'empty':
      return 'Empty'
    default:
      return rawMode ?? 'Unknown'
  }
}
