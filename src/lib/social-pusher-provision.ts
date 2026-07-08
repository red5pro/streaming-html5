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

import {
  DEFAULT_STREAM_MANAGER_API_VERSION,
  resolveConnectionFromHost,
  resolveStreamManagerAdminCredentialsFromSettings,
  type Settings,
} from '@/settings'
import {
  createProvisionSignature,
  type SocialPusherProvisionAction,
} from '@/lib/social-pusher-signature'
import { authenticate, getOriginForPublish } from '@/service/stream-manager'

export interface SocialPusherProvisionInput {
  settings: Settings
  password?: string
  destinationUri: string
  streamKey: string
  isForwarding: boolean
}

export interface SocialPusherProvisionResult {
  ok: boolean
  status: number
  attempts: number
  action: SocialPusherProvisionAction
  error?: string
}

export interface SocialPusherProvisionAttempt {
  attempt: number
  maxAttempts: number
  status: number
  willRetry: boolean
}

interface ProvisionRequestConfig {
  url: string
  headers: Record<string, string>
  body: object
}

const MAX_504_RETRIES = 10
const RETRY_DELAY_MS = 10_000

function getSmCredentials(settings: Settings): { username: string; password: string } | null {
  const admin = resolveStreamManagerAdminCredentialsFromSettings(settings)
  if (admin) return admin
  if (settings.useAuthentication && settings.username && settings.password) {
    return { username: settings.username, password: settings.password }
  }
  return null
}

function resolveBaseUrl(host: string): string {
  const { protocol, port } = resolveConnectionFromHost(host)
  return `${protocol}://${host}:${port}`
}

function buildProvisionAction(isForwarding: boolean): SocialPusherProvisionAction {
  return isForwarding ? 'provision.delete' : 'provision.create'
}

function buildDirectProvisionUrl(
  baseUrl: string,
  action: SocialPusherProvisionAction,
  timestamp: number,
  signature: string
): string {
  return (
    `${baseUrl}/socialpusher/api?action=${action}` +
    `&timestamp=${timestamp}` +
    `&signature=${encodeURIComponent(signature)}`
  )
}

function buildStreamManagerForwardUrl(
  settings: Settings,
  digestAction: SocialPusherProvisionAction,
  originHost: string
): string {
  const { host, nodeGroupName, streamManagerApiVersion } = settings
  const smApi = streamManagerApiVersion.trim() || DEFAULT_STREAM_MANAGER_API_VERSION
  const nodeGroup = nodeGroupName.trim() || 'default'
  const originUrl = `http://${originHost}:5080/socialpusher/api`
  const params = new URLSearchParams({
    nodegroup: nodeGroup,
    digestAction,
    target: encodeURIComponent(originUrl),
  })
  return `https://${host}/as/${smApi}/proxy/forward/?${params.toString()}`
}

function buildProvisionBody(input: SocialPusherProvisionInput): object {
  const { app, streamName } = input.settings
  const { destinationUri, streamKey } = input
  return {
    provisions: [
      {
        guid: 'any',
        level: 1,
        context: app,
        name: streamName,
        parameters: {
          destURI: `${destinationUri}/${streamKey}`,
        },
      },
    ],
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function isSuccessStatus(status: number): boolean {
  return status >= 200 && status <= 300
}

async function buildDirectRequestConfig(
  input: SocialPusherProvisionInput,
  action: SocialPusherProvisionAction
): Promise<ProvisionRequestConfig> {
  const timestamp = Date.now()
  const signature = await createProvisionSignature(action, timestamp, input.password ?? '')
  const baseUrl = resolveBaseUrl(input.settings.host)

  return {
    url: buildDirectProvisionUrl(baseUrl, action, timestamp, signature),
    headers: {
      'Content-Type': 'application/json',
    },
    body: buildProvisionBody(input),
  }
}

async function buildStreamManagerRequestConfig(
  input: SocialPusherProvisionInput,
  action: SocialPusherProvisionAction
): Promise<ProvisionRequestConfig> {
  const credentials = getSmCredentials(input.settings)
  if (!credentials) {
    throw new Error(
      'Stream Manager credentials required. Set Admin Username and Admin Password in Stream Manager Settings, or enable Authentication.'
    )
  }

  const jwt = await authenticate(credentials.username, credentials.password, input.settings)
  const origin = await getOriginForPublish(input.settings)
  const originHost = origin.serverAddress
  if (!originHost) {
    throw new Error('Unable to resolve origin server address for publish.')
  }

  return {
    url: buildStreamManagerForwardUrl(input.settings, action, originHost),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: buildProvisionBody(input),
  }
}

async function buildRequestConfig(
  input: SocialPusherProvisionInput,
  action: SocialPusherProvisionAction
): Promise<ProvisionRequestConfig> {
  if (input.settings.useStreamManager) {
    return buildStreamManagerRequestConfig(input, action)
  }
  return buildDirectRequestConfig(input, action)
}

export async function postSocialPusherProvision(
  input: SocialPusherProvisionInput,
  onAttempt?: (detail: SocialPusherProvisionAttempt) => void
): Promise<SocialPusherProvisionResult> {
  const action = buildProvisionAction(input.isForwarding)
  const maxAttempts = MAX_504_RETRIES + 1

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    let requestConfig: ProvisionRequestConfig
    try {
      requestConfig = await buildRequestConfig(input, action)
    } catch (error) {
      onAttempt?.({
        attempt,
        maxAttempts,
        status: 0,
        willRetry: false,
      })
      return {
        ok: false,
        status: 0,
        attempts: attempt,
        action,
        error: error instanceof Error ? error.message : String(error),
      }
    }

    let response: Response
    try {
      response = await fetch(requestConfig.url, {
        method: 'POST',
        headers: requestConfig.headers,
        body: JSON.stringify(requestConfig.body),
      })
    } catch (error) {
      onAttempt?.({
        attempt,
        maxAttempts,
        status: 0,
        willRetry: false,
      })
      return {
        ok: false,
        status: 0,
        attempts: attempt,
        action,
        error: error instanceof Error ? error.message : String(error),
      }
    }

    if (isSuccessStatus(response.status)) {
      onAttempt?.({
        attempt,
        maxAttempts,
        status: response.status,
        willRetry: false,
      })
      return {
        ok: true,
        status: response.status,
        attempts: attempt,
        action,
      }
    }

    const willRetry = response.status === 504 && attempt < maxAttempts
    onAttempt?.({
      attempt,
      maxAttempts,
      status: response.status,
      willRetry,
    })

    if (willRetry) {
      await delay(RETRY_DELAY_MS)
      continue
    }

    let errorMessage = `Request failed with status ${response.status}`
    try {
      const responseText = await response.text()
      if (responseText.trim()) {
        errorMessage = `${errorMessage}: ${responseText.trim()}`
      }
    } catch {
      // Ignore response body read errors.
    }

    return {
      ok: false,
      status: response.status,
      attempts: attempt,
      action,
      error: errorMessage,
    }
  }

  return {
    ok: false,
    status: 504,
    attempts: maxAttempts,
    action,
    error: 'Gateway timeout after maximum retry attempts.',
  }
}
