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

import { resolveConnectionFromHost, type Settings } from '@/settings'
import { forwardPOSTRequest, getOriginForPublish } from '@/service/stream-manager'

export type InterstitialDurationType = 'INDEFINITE' | 'WALL_CLOCK' | 'STREAM_CLOCK'

export type InterstitialSwitchInsert = {
  id: number
  target: string
  interstitial: string
  loop: boolean
  type: InterstitialDurationType
  isInterstitialAudio: boolean
  isInterstitialVideo: boolean
  start: string
  duration: string
}

export type InterstitialSwitchPayload = {
  user: string
  digest: string
  inserts: InterstitialSwitchInsert[]
}

export type InterstitialResumePayload = {
  user: string
  digest: string
  resume: string
}

export type InterstitialRequestInput = {
  settings: Settings
  user: string
  digest: string
}

export type InterstitialRequestResult = {
  ok: boolean
  status: number
  error?: string
}

function isSuccessStatus(status: number): boolean {
  return status >= 200 && status < 300
}

export function resolveInterstitialEndpointUrl(settings: Settings): string {
  const { host, app } = settings
  const { protocol, port } = resolveConnectionFromHost(host)
  return `${protocol}://${host}:${port}/${app}/interstitial`
}

export function resolveInterstitialOriginForwardUrl(
  settings: Settings,
  originHost: string
): string {
  const { app } = settings
  return `http://${originHost}:5080/${app}/interstitial`
}

export async function buildInterstitialAuth(
  input: InterstitialRequestInput
): Promise<{ user: string; digest: string }> {
  return {
    user: input.user,
    digest: input.digest,
  }
}

async function postDirectInterstitialRequest(
  settings: Settings,
  payload: InterstitialSwitchPayload | InterstitialResumePayload
): Promise<InterstitialRequestResult> {
  const url = resolveInterstitialEndpointUrl(settings)

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (isSuccessStatus(response.status)) {
      return { ok: true, status: response.status }
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

    return { ok: false, status: response.status, error: errorMessage }
  } catch (error) {
    return {
      ok: false,
      status: 0,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

async function postStreamManagerInterstitialRequest(
  settings: Settings,
  payload: InterstitialSwitchPayload | InterstitialResumePayload
): Promise<InterstitialRequestResult> {
  try {
    const origin = await getOriginForPublish(settings)
    const originHost = origin.serverAddress
    if (!originHost) {
      return {
        ok: false,
        status: 0,
        error: 'Unable to resolve origin server address for the current stream.',
      }
    }

    const forwardURL = resolveInterstitialOriginForwardUrl(settings, originHost)
    const result = await forwardPOSTRequest(settings, forwardURL, payload)

    if (result.success) {
      return { ok: true, status: 200 }
    }

    return {
      ok: false,
      status: 0,
      error: result.errorMessage ?? 'Stream Manager forward request failed.',
    }
  } catch (error) {
    return {
      ok: false,
      status: 0,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

export async function postInterstitialSwitch(
  input: InterstitialRequestInput,
  insert: Omit<InterstitialSwitchInsert, 'id'>
): Promise<InterstitialRequestResult> {
  const auth = await buildInterstitialAuth(input)
  const payload: InterstitialSwitchPayload = {
    user: auth.user,
    digest: auth.digest,
    inserts: [{ id: 1, ...insert }],
  }

  if (input.settings.useStreamManager) {
    return postStreamManagerInterstitialRequest(input.settings, payload)
  }

  return postDirectInterstitialRequest(input.settings, payload)
}

export async function postInterstitialResume(
  input: InterstitialRequestInput,
  target: string
): Promise<InterstitialRequestResult> {
  const auth = await buildInterstitialAuth(input)
  const payload: InterstitialResumePayload = {
    user: auth.user,
    digest: auth.digest,
    resume: target,
  }

  if (input.settings.useStreamManager) {
    return postStreamManagerInterstitialRequest(input.settings, payload)
  }

  return postDirectInterstitialRequest(input.settings, payload)
}
