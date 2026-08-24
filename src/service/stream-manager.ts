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

import { Settings } from '../settings'

export interface ProbeServerForSubscribeResponse {
  ok: boolean
  status: number
  locations?: unknown
  body?: unknown
}

export interface NodeEvent {
  nodeRoleName: string
  publicIp: string
}

export interface ScalingEvent {
  state: string
}

export interface Node {
  streamGuid: string
  serverAddress: string
  nodeRole: string
  subGroup?: string
  nodeState?: string
  subscribers?: number
}

export interface AbrProvisionLevel {
  videoParams: {
    videoBitrate: number
    videoWidth: number
    videoHeight: number
  }
  abrLevel: number
  streamGuid: string
}

export interface AbrProvision {
  credentials?: {
    username?: string
    password?: string
    token?: string
  }
  provisionGuid: string
  messageType: 'ProvisionCommand'
  streams: AbrProvisionLevel[]
}

/**
 * Read a failed Stream Manager REST response and return a displayable message.
 *
 * The SM's GlobalExceptionHandler (as-common) serializes StreamManagerExceptions
 * as ErrorResponse `{ "error": string }`. Prefer that `error` field; fall back to
 * the legacy `errorMessage`, then the raw body, then the HTTP status.
 *
 * Consumes the response body — call only on a failure path, and do not read the
 * body again afterward.
 */
export async function readStreamManagerError(response: Response): Promise<string> {
  let text = ''
  try {
    text = await response.text()
  } catch {
    return `HTTP ${response.status}`
  }
  if (text) {
    try {
      const json = JSON.parse(text)
      const message = json?.error ?? json?.errorMessage
      if (typeof message === 'string' && message.length > 0) {
        return message
      }
    } catch {
      // body was not JSON — fall through to the raw text
    }
    return `HTTP ${response.status}: ${text.slice(0, 500)}`
  }
  return `HTTP ${response.status}`
}

export async function authenticate(
  username: string,
  password: string,
  settings: Settings
): Promise<string> {
  try {
    const { host, streamManagerApiVersion } = settings
    const url = `https://${host}/as/${streamManagerApiVersion}/auth/login`
    const token = 'Basic ' + btoa(`${username}:${password}`)
    const response = await fetch(url, {
      method: 'PUT',
      // @ts-expect-error - withCredentials is not supported in the types
      withCredentials: true,
      // credentials: 'include',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })

    console.log('[r5] Authenticate response: ' + response.status)
    if (!response.ok) {
      throw new Error(await readStreamManagerError(response))
    }
    var json = await response.json()
    if (json.error || json.errorMessage) {
      throw new Error(json.error || json.errorMessage)
    }
    console.log('[r5] authenticate() success: ' + json.token)
    return json.token
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log('[r5] authenticate() fail: ' + e.message)
      alert('authenticate() fail: ' + e.message)
      throw e
    } else {
      console.log('[r5] authenticate() fail: ' + String(e))
      alert('authenticate() fail: ' + String(e))
      throw new Error('authenticate() fail: ' + String(e))
    }
  }
}

export async function authenticateMinimal(
  username: string,
  password: string,
  settings: Settings
): Promise<string> {
  const { host, streamManagerApiVersion } = settings
  const url = `https://${host}/as/${streamManagerApiVersion}/auth/login`
  const resp = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: 'Basic ' + btoa(username + ':' + password),
    },
  })
  if (!resp.ok) {
    throw new Error(await readStreamManagerError(resp))
  }
  const data = await resp.json()
  if (data.error || data.errorMessage) {
    throw new Error(data.error || data.errorMessage)
  }
  return data.token
}

export async function getAllEdges(
  username: string,
  password: string,
  settings: Settings
): Promise<string[]> {
  const { host, streamManagerApiVersion, nodeGroupName } = settings
  const token = await authenticate(username, password, settings)
  const url = `https://${host}/as/${streamManagerApiVersion}/admin/nodegroup/status/${nodeGroupName}`
  const result = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    // @ts-expect-error - withCredentials is not supported in the types
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  if (!result.ok) {
    throw new Error(`Listing edges: ${await readStreamManagerError(result)}`)
  }
  const json = await result.json()
  const edges = json
    .filter(({ nodeEvent, scalingEvent }: { nodeEvent: NodeEvent; scalingEvent: ScalingEvent }) => {
      const { state } = scalingEvent
      const { nodeRoleName } = nodeEvent
      return state.toLowerCase() === 'inservice' && nodeRoleName.toLowerCase() === 'edge'
    })
    .map(({ nodeEvent }: { nodeEvent: NodeEvent }) => nodeEvent.publicIp)
  return edges
}

export async function getAllOrigins(
  username: string,
  password: string,
  settings: Settings
): Promise<string[]> {
  const { host, streamManagerApiVersion, nodeGroupName } = settings
  const token = await authenticate(username, password, settings)
  const url = `https://${host}/as/${streamManagerApiVersion}/admin/nodegroup/status/${nodeGroupName}`
  const result = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    // @ts-expect-error - withCredentials is not supported in the types
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  if (!result.ok) {
    throw new Error(`Listing origins: ${await readStreamManagerError(result)}`)
  }
  const json = await result.json()
  const origins = json
    .filter(({ nodeEvent, scalingEvent }: { nodeEvent: NodeEvent; scalingEvent: ScalingEvent }) => {
      const { state } = scalingEvent
      const { nodeRoleName } = nodeEvent
      return state.toLowerCase() === 'inservice' && nodeRoleName.toLowerCase() === 'origin'
    })
    .map(({ nodeEvent }: { nodeEvent: NodeEvent }) => nodeEvent.publicIp)
  return origins
}

export async function getOriginForPublish(
  settings: Settings,
  transcode: boolean = false,
  region: string | null = null
): Promise<Node> {
  const { host, streamManagerApiVersion, nodeGroupName, app, streamName } = settings
  let url = `https://${host}/as/${streamManagerApiVersion}/streams/stream/${nodeGroupName}/publish/${app}/${streamName}`
  if (transcode) {
    url += `?transcode=true`
  }
  if (region) {
    url += `?region=${region}`
  }
  const result = await fetch(url)
  if (!result.ok) {
    throw new Error(await readStreamManagerError(result))
  }
  const json = await result.json()
  if (json.error || json.errorMessage) {
    throw new Error(json.error || json.errorMessage)
  }
  const origin = Array.isArray(json) && json.length > 0 ? json[0] : json
  const { streamGuid } = origin
  const paths = streamGuid.split('/')
  const name = paths.pop()
  origin.scope = paths.join('/')
  origin.name = name
  return origin
}

export async function probeServerForSubscribe(
  settings: Settings,
  jwt: string,
  region: string | null = null
): Promise<ProbeServerForSubscribeResponse | undefined> {
  const {
    host,
    streamManagerApiVersion: smVersion,
    app,
    streamName,
    nodeGroupName: nodeGroup,
  } = settings
  try {
    const streamGuid = `${app}/${streamName}`
    let url = `https://${host}/as/${smVersion}/streams/stream/${nodeGroup}/subscribe/${streamGuid}`
    if (region) {
      url += `?region=${region}`
    }
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
    let result: unknown
    try {
      result = await response.json()
    } catch {
      const text = (await response.text()) as string
      result = JSON.parse(text) as unknown
    }
    if (response.status >= 200 && response.status < 300) {
      return {
        ok: true,
        status: response.status,
        locations: result,
      }
    } else {
      return {
        ok: false,
        status: response.status,
        body: result,
      }
    }
  } catch (error: unknown) {
    return {
      ok: false,
      status: 500,
      body: error instanceof Error ? error.message : String(error),
    }
  }
}

export async function listUnsecureNodeGroups(settings: Settings): Promise<string[]> {
  const { host, streamManagerApiVersion: smVersion } = settings
  const url = `https://${host}/as/${smVersion}/streams/stream/node-groups`
  const resp = await fetch(url)
  if (!resp.ok) {
    throw new Error(`Listing node groups: ${await readStreamManagerError(resp)}`)
  }
  try {
    const json = await resp.json()
    return json
  } catch {
    try {
      const text = await resp.text()
      return JSON.parse(text)
    } catch (error: unknown) {
      throw new Error(
        `Failed to parse nodegroups: ${error instanceof Error ? error.message : String(error)}`
      )
    }
  }
}

export async function listNodeGroups(settings: Settings, jwt: string): Promise<unknown[]> {
  // TODO: find unknown type
  const { host, streamManagerApiVersion: smVersion } = settings
  const url = `https://${host}/as/${smVersion}/admin/nodegroup`
  const resp = await fetch(url, {
    headers: { Authorization: `Bearer ${jwt}` },
  })
  if (!resp.ok) {
    throw new Error(`Listing node groups: ${await readStreamManagerError(resp)}`)
  }
  return await resp.json()
}

export async function getNodeGroupConfig(
  settings: Settings,
  jwt: string,
  nodeGroupName: string
): Promise<unknown | null> {
  // TODO: find unknown type
  const { host, streamManagerApiVersion: smVersion } = settings
  const url = `https://${host}/as/${smVersion}/admin/nodegroup/${encodeURIComponent(nodeGroupName)}`
  const resp = await fetch(url, {
    headers: { Authorization: `Bearer ${jwt}` },
  })
  if (resp.status === 404) return null
  if (!resp.ok) {
    throw new Error(`Reading nodegroup config: ${await readStreamManagerError(resp)}`)
  }
  return await resp.json()
}

export async function getNodeGroupStatus(
  settings: Settings,
  jwt: string,
  nodeGroupName: string
): Promise<unknown> {
  // TODO: find unknown type
  const { host, streamManagerApiVersion: smVersion } = settings
  const url = `https://${host}/as/${smVersion}/admin/nodegroup/${encodeURIComponent(nodeGroupName)}/status`
  const resp = await fetch(url, {
    headers: { Authorization: `Bearer ${jwt}` },
  })
  if (resp.status === 404) return null
  if (!resp.ok) {
    throw new Error(`Reading nodegroup status: ${await readStreamManagerError(resp)}`)
  }
  return await resp.json()
}
export async function postAbrProvisions(
  username: string,
  password: string,
  settings: Settings,
  provision: AbrProvision
): Promise<{ success: boolean; errorMessage?: string }> {
  const { host, streamManagerApiVersion, nodeGroupName } = settings
  const token = await authenticate(username, password, settings)
  const url = `https://${host}/as/${streamManagerApiVersion}/streams/provision/${nodeGroupName}`
  const body = JSON.stringify([provision])
  const result = await fetch(url, {
    method: 'POST',
    // @ts-expect-error - withCredentials is not supported in the types
    withCredentials: true,
    // credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body,
  })
  if (result.status >= 200 && result.status < 300) {
    try {
      const json = await result.json()
      if (json && json.errorMessage) {
        if (json.errorMessage.indexOf('Provision already exists') < 0) {
          throw new Error(json.errorMessage)
        } else {
          console.log('[r5] Provision already exists')
        }
        return json
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error('[r5] Provision response JSON parse failed: ' + e.message)
      } else {
        console.error('[r5] Provision response JSON parse failed: ' + String(e))
      }
      throw new ProvisionRequestFailedError(`Provision request failed: ${result.status}`)
    }
    return { success: true }
  } else if (result.status === 409) {
    throw new ProvisionAlreadyExistsError('Provision already exists')
  } else {
    throw new ProvisionRequestFailedError(await readStreamManagerError(result))
  }
}

function encodePathSegments(value: string): string {
  return value
    .split('/')
    .filter((segment) => segment.length > 0)
    .map((segment) => encodeURIComponent(segment))
    .join('/')
}

export async function deleteAbrProvision(
  username: string,
  password: string,
  settings: Settings,
  provisionGuid: string
): Promise<void> {
  const { host, streamManagerApiVersion, nodeGroupName } = settings
  const token = await authenticate(username, password, settings)
  const url = `https://${host}/as/${streamManagerApiVersion}/streams/provision/${encodeURIComponent(nodeGroupName)}/${encodePathSegments(provisionGuid)}`
  const result = await fetch(url, {
    method: 'DELETE',
    // @ts-expect-error - withCredentials is not supported in the types
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  if (result.status >= 200 && result.status < 300) {
    return
  }
  throw new ProvisionRequestFailedError(await readStreamManagerError(result))
}

export async function forwardPOSTRequest(
  settings: Settings,
  forwardURL: string,
  data: unknown
): Promise<{ success: boolean; data?: unknown; errorMessage?: string }> {
  const { host, streamManagerApiVersion } = settings

  try {
    const url = `https://${host}/as/${streamManagerApiVersion}/proxy/forward/?target=${encodeURIComponent(forwardURL)}`
    let body: string = ''
    try {
      body = typeof data === 'string' ? data : JSON.stringify(data)
    } catch (stringifyError: unknown) {
      const message = `Failed to stringify request data: ${stringifyError instanceof Error ? stringifyError.message : String(stringifyError)}`
      console.error('[forwardPost] ' + message)
      return {
        success: false,
        errorMessage: message,
      }
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body as string,
    })

    if (!response.ok) {
      const message = await readStreamManagerError(response)
      console.error('[forwardPost] ' + message)
      return { success: false, errorMessage: message }
    }

    // Check if there's content to parse
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      // Handle non-JSON responses
      const textResponse = await response.text()
      console.log('[forwardPost] Received non-JSON response, returning as text')
      return { success: true, data: textResponse }
    }

    let json
    try {
      // note: the response may be empty string, or other non json response.
      json = await response.json()
    } catch (parseError: unknown) {
      const message = `Failed to parse server response: ${parseError instanceof Error ? parseError.message : String(parseError)}`
      console.error('[forwardPost] ' + message)
      return { success: false, errorMessage: message }
    }

    if (json && (json.error || json.errorMessage)) {
      const message = `Server returned error: ${json.error || json.errorMessage}`
      console.error('[forwardPost] ' + message)
      return { success: false, errorMessage: message }
    }
    return { success: true, data: json }
  } catch (error: unknown) {
    const message = `Unexpected error occurred: ${error instanceof Error ? error.message : String(error)}`
    console.error('[forwardPost] ' + message)
    return { success: false, errorMessage: message }
  }
}

export class ProvisionAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ProvisionAlreadyExistsError'
  }
}

export class ProvisionRequestFailedError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ProvisionRequestFailedError'
  }
}
