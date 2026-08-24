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

import type { Settings } from '@/settings'
import { createProvision, deleteProvision } from '@/service/restreamer'

export type SocialPusherProvisionAction = 'provision.create' | 'provision.delete'

export interface SocialPusherProvisionInput {
  settings: Settings
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

function buildProvisionAction(isForwarding: boolean): SocialPusherProvisionAction {
  return isForwarding ? 'provision.delete' : 'provision.create'
}

export async function postSocialPusherProvision(
  input: SocialPusherProvisionInput,
  onAttempt?: (detail: SocialPusherProvisionAttempt) => void
): Promise<SocialPusherProvisionResult> {
  const action = buildProvisionAction(input.isForwarding)
  const { settings, destinationUri, streamKey } = input
  const streamGuid = `${settings.app}/${settings.streamName}`

  try {
    if (input.isForwarding) {
      await deleteProvision(settings, streamKey)
    } else {
      await createProvision(settings, streamKey, streamGuid, destinationUri)
    }

    onAttempt?.({
      attempt: 1,
      maxAttempts: 1,
      status: 200,
      willRetry: false,
    })

    return {
      ok: true,
      status: 200,
      attempts: 1,
      action,
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)

    onAttempt?.({
      attempt: 1,
      maxAttempts: 1,
      status: 0,
      willRetry: false,
    })

    return {
      ok: false,
      status: 0,
      attempts: 1,
      action,
      error: errorMessage,
    }
  }
}
