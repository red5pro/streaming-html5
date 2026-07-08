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

import { Settings } from '@/settings'

const DELAY = 100
let timeout: NodeJS.Timeout | null = null
// @ts-expect-error - args is unknown
const debounce = (target: unknown, func: (...args) => unknown, delay: number) => {
  // @ts-expect-error - args is unknown
  return function (...args): void {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => func.apply(target, args), delay)
  }
}
const mixerAlreadyExistsRegex = /mixer event(?: named)?\s+(.+?)\s+already exists/i
const streamAlreadyExistsRegex = /stream(?: named)?\s+(.+?)\s+already exists/i

export class MixerEventAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MixerEventAlreadyExistsError'
  }
}

export class StreamNameAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'StreamNameAlreadyExistsError'
  }
}

export interface MixerEvent {
  streamGuid: string
  serverAddress: string
  nodeRole: string
  nodeState: string
  subscribers: number
  durationMs: number
}

export interface MixerEventRequest {
  eventId: string
  streamGuid: string
  width: number
  height: number
  frameRate: number
  bitRate: number
  maxBitRate: number
  qpMin: number
  qpMax: number
  audioSampleRate: number
  audioChannels: number
  subMixes: number
  credentials?: {
    username?: string
    password?: string
    token?: string
  }
}

export interface NodeGraph {
  rootVideoNode: {
    nodes: (VideoNodeGraphNode | SolidColorNodeGraphNode)[]
    node: string
  }
  rootAudioNode: {
    nodes: AudioNodeGraphNode[]
    node: string
  }
}

export interface SolidColorNodeGraphNode {
  node: string
  red: number
  green: number
  blue: number
  alpha: number
}

export interface VideoNodeGraphNode {
  node: string
  streamGuid: string
  sourceX: number
  sourceY: number
  sourceWidth: number
  sourceHeight: number
  destX: number
  destY: number
  destWidth: number
  destHeight: number
}

export interface AudioNodeGraphNode {
  streamGuid: string
  pan: number
  gain: number
  node: string
}

export function getDefaultNodeGraph(): NodeGraph {
  const defaultGraphValue = {
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
  }
  return defaultGraphValue
}

async function _updateRenderTrees(
  settings: Settings,
  jwt: string,
  eventId: string,
  renderTrees: unknown[]
): Promise<unknown> {
  const { host, streamManagerApiVersion: smVersion, nodeGroupName } = settings
  try {
    const url = `https://${host}/as/${smVersion}/streams/mixer/${nodeGroupName}/${eventId}`
    const resp = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(renderTrees),
    })
    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status} updating render trees`)
    }
    let result: unknown
    try {
      result = (await resp.json()) as unknown
    } catch {
      const text = (await resp.text()) as string
      result = JSON.parse(text) as unknown
    }

    if (resp.status < 200 && resp.status >= 300) {
      let errorMessage = 'Unknown error message'
      if (result) {
        // @ts-expect-error - result is unknown
        errorMessage = result.error
      }
      throw new Error(`HTTP ${resp.status}: ${errorMessage}`)
    }
    return Array.isArray(result) && result.length > 0 ? (result[0] as unknown) : result
  } catch (error: unknown) {
    console.warn('Error in _updateRenderTrees:', error)
    throw error // Re-throw for the caller to catch
  }
}

export async function createMixerEvent(
  settings: Settings,
  jwt: string,
  mixerRequest: MixerEventRequest
): Promise<unknown> {
  // TODO: find unknown type
  const { host, streamManagerApiVersion: smVersion, nodeGroupName } = settings
  const url = `https://${host}/as/${smVersion}/streams/mixer/${nodeGroupName}`
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(mixerRequest),
  })
  if (!resp.ok) {
    if (resp.status === 409) {
      try {
        const bodyStr = await resp.text()
        const body = JSON.parse(bodyStr) as { error?: string }
        const mixerName = body.error?.match(mixerAlreadyExistsRegex)?.[1]
        const streamName = body.error?.match(streamAlreadyExistsRegex)?.[1]
        if (mixerName) {
          throw new MixerEventAlreadyExistsError(
            `HTTP ${resp.status}: Mixer event already exists: ${mixerName}`
          )
        } else if (streamName) {
          throw new StreamNameAlreadyExistsError(
            `HTTP ${resp.status}: Stream already exists: ${streamName}`
          )
        }
      } catch (error: unknown) {
        throw error
      }
    }
    throw new Error(`HTTP ${resp.status} creating mixer event`)
  }

  let result: unknown
  try {
    result = (await resp.json()) as unknown
  } catch {
    const text = (await resp.text()) as string
    result = JSON.parse(text) as unknown
  }

  if (resp.status < 200 && resp.status >= 300) {
    let errorMessage = 'Unknown error message'
    if (result) {
      // @ts-expect-error - result is unknown
      errorMessage = result.error
    }
    const fullErrorMessage = `HTTP ${resp.status}: ${errorMessage}`
    if (resp.status === 409) {
      throw new MixerEventAlreadyExistsError(fullErrorMessage)
    }
    throw new Error(fullErrorMessage)
  }
  return result
}

export async function getMixerEvents(
  settings: Settings,
  jwt: string
): Promise<Record<string, MixerEvent>> {
  const { host, streamManagerApiVersion: smVersion, nodeGroupName } = settings
  try {
    const url = `https://${host}/as/${smVersion}/streams/mixer/${nodeGroupName}`
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status} getting mixer events`)
    }

    let result: unknown
    try {
      result = (await resp.json()) as unknown
    } catch {
      const text = (await resp.text()) as string
      result = JSON.parse(text) as unknown
    }

    switch (resp.status) {
      case 200:
        if (typeof result !== 'object' || Array.isArray(result)) {
          throw new Error(`Expected a map (object), but got ${typeof result}`)
        }
        return result as Record<string, MixerEvent>
      case 401:
        throw new Error('HTTP 401: Unauthorized')
      case 404:
        throw new Error('HTTP 404: Not Found')
      default:
        throw new Error(`HTTP ${resp.status} getting mixer events`)
    }
  } catch (error: unknown) {
    console.warn('Error in getMixerEventsMap:', error)
    throw error // Re-throw for the caller to catch
  }
}

export async function getRenderTrees(
  settings: Settings,
  jwt: string,
  event: string
): Promise<NodeGraph[]> {
  const { host, streamManagerApiVersion: smVersion, nodeGroupName } = settings
  try {
    const url = `https://${host}/as/${smVersion}/streams/mixer/${nodeGroupName}/${event}`

    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status} getting render trees`)
    }

    let result: unknown
    try {
      result = (await resp.json()) as unknown
    } catch {
      const text = (await resp.text()) as string
      result = JSON.parse(text) as unknown
    }

    switch (resp.status) {
      case 200:
        if (typeof result !== 'object' || !Array.isArray(result)) {
          throw new Error(`Expected a list (object), but got ${typeof result}`)
        }
        return result as NodeGraph[]
      case 401:
        throw new Error('HTTP 401: Unauthorized')
      case 404:
        throw new Error('HTTP 404: Not Found')
      default:
        throw new Error(`HTTP ${resp.status} getting mixer events`)
    }
  } catch (error: unknown) {
    console.warn('Error in getRenderTrees:', error)
    throw error // Re-throw for the caller to catch
  }
}

export async function updateRenderTrees(
  settings: Settings,
  jwt: string,
  eventId: string,
  renderTrees: unknown[],
  useDebounce: boolean = true
): Promise<unknown> {
  // TODO: find unknown type
  if (useDebounce) {
    return debounce(null, _updateRenderTrees, DELAY)(settings, jwt, eventId, renderTrees)
  } else {
    return _updateRenderTrees(settings, jwt, eventId, renderTrees)
  }
}

export async function stopMixerEvent(
  settings: Settings,
  jwt: string,
  eventId: string
): Promise<unknown> {
  // TODO: find unknown type
  const { host, streamManagerApiVersion: smVersion, nodeGroupName } = settings
  try {
    const url = `https://${host}/as/${smVersion}/streams/mixer/${nodeGroupName}/${eventId}`
    const resp = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status} stopping mixer event`)
    }

    let result: unknown
    try {
      result = (await resp.json()) as unknown
    } catch {
      const text = (await resp.text()) as string
      result = JSON.parse(text) as unknown
    }

    if (resp.status < 200 && resp.status >= 300) {
      let errorMessage = 'Unknown error message'
      if (result) {
        // @ts-expect-error - result is unknown
        errorMessage = result.error
      }
      throw new Error(`HTTP ${resp.status}: ${errorMessage}`)
    }
    return result || { message: `Mixer event ${eventId} stopped successfully.` }
  } catch (error: unknown) {
    console.warn('Error in stopMixerEvent:', error)
    throw error // Re-throw for the caller to catch
  }
}
