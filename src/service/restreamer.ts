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

/**
 * Standalone
 {
    "guid": "restream1",
    "context": "live",
    "name": "stream1",
    "level": 0,
    "parameters": {
        "action": "create",
        "type": "rtmp-push",
        "rtmpUri": "rtmp://localhost/live/social1",
        "immediate": "false",
        "attempts": "3",
        "delayS": "10",
        "persist": "true"
    }
  }
*/

/**
 * SM
 {
    "provisionGuid": "social1",
    "streams": [
        {
            "streamGuid": "live/stream1",
            "abrLevel": 0,
            "camParams": {
                "properties": {
                    "action": "create",
                    "type": "rtmp-push",
                    "rtmpUri": "rtmp://localhost/live/social1",
                    "immediate": "true",
                    "persist": "false"
                }
            }
        }
    ]
  }
*/

import {
  resolveConnectionFromHost,
  resolveStreamManagerAdminCredentialsFromSettings,
  Settings,
} from '@/settings'
import { authenticate } from './stream-manager'

export async function createProvision(
  settings: Settings,
  guid: string,
  streamGuid: string,
  destinationUri: string,
  persist: boolean = false
): Promise<unknown> {
  const { host, app, streamName, useStreamManager, streamManagerApiVersion, nodeGroupName } =
    settings
  const { protocol, port } = resolveConnectionFromHost(host)
  let url = `${protocol}://${host}:${port}/${app}/restream`
  let headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  let data = {
    guid,
    context: app,
    name: streamName,
    level: 0,
    parameters: {
      action: 'create',
      type: 'rtmp-push',
      rtmpUri: `${destinationUri}/${app}/${guid}`,
      immediate: 'true',
      attempts: '3',
      delayS: '10',
      persist: persist ? 'true' : 'false',
    },
  }
  if (useStreamManager) {
    const { username, password } = resolveStreamManagerAdminCredentialsFromSettings(settings)!
    const token = await authenticate(username, password, settings)
    // https://as-test1.example.org/as/v1/streams/provision/nodegroup1
    url = `${protocol}://${host}:${port}/as/${streamManagerApiVersion}/streams/provision/${nodeGroupName}`
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    }
    data = {
      // @ts-expect-error - provisionGuid is not supported in the types
      provisionGuid: guid,
      streams: [
        {
          streamGuid,
          abrLevel: 0,
          camParams: {
            properties: {
              action: 'create',
              type: 'rtmp-push',
              rtmpUri: `${destinationUri}/${guid}`,
              immediate: 'true',
              persist: persist ? 'true' : 'false',
              attempts: '3',
              delayS: '10',
            },
          },
        },
      ],
    }
  }
  const response = await fetch(url, {
    method: 'POST',
    headers,
    credentials: 'include',
    // @ts-expect-error - withCredentials is not supported in the types
    withCredentials: true,
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error(`Failed to create provision: ${response.statusText}`)
  }
  let payload = undefined
  try {
    payload = await response.json()
  } catch (error: unknown) {
    try {
      payload = JSON.parse(await response.text())
    } catch (_error: unknown) {
      throw new Error(`Failed to parse response: ${error ?? _error}`)
    }
  }
  return payload
}

/**
 {
    "guid": "restream1",
    "context": "live",
    "name": "stream1",
    "level": 0,
    "parameters": {
        "action": "kill",
        "type": "rtmp-push",
        "persist": "true"
    }
  }
*/
export async function deleteProvision(settings: Settings, guid: string): Promise<unknown> {
  const { host, app, useStreamManager, streamManagerApiVersion, nodeGroupName } = settings
  const { protocol, port } = resolveConnectionFromHost(host)
  let url = `${protocol}://${host}:${port}/${app}/restream`
  let headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (useStreamManager) {
    const { username, password } = resolveStreamManagerAdminCredentialsFromSettings(settings)!
    const token = await authenticate(username, password, settings)
    // https://as-test1.example.org/as/v1/streams/provision/nodegroup1/guid
    url = `${protocol}://${host}:${port}/as/${streamManagerApiVersion}/streams/provision/${nodeGroupName}/${guid}`
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    }
  }
  const data = {
    guid,
    parameters: {
      action: 'kill',
      type: 'rtmp-push',
      persist: 'true',
    },
  }
  const response = await fetch(url, {
    method: 'DELETE',
    headers,
    credentials: 'include',
    // @ts-expect-error - withCredentials is not supported in the types
    withCredentials: true,
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error(`Failed to delete provision: ${response.statusText}`)
  }
  let payload = undefined
  try {
    payload = await response.json()
  } catch (error: unknown) {
    try {
      payload = JSON.parse(await response.text())
    } catch (_error: unknown) {
      throw new Error(`Failed to parse response: ${error ?? _error}`)
    }
  }
  return payload
}
