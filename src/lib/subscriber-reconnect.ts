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

export const SUBSCRIBER_RECONNECT_DELAY_MS = 2000

export type SubscriberReconnectHandlers = {
  reconnect: () => Promise<boolean>
  onScheduled?: (reason: string, delayMs: number) => void
  onAttempt?: (attempt: number, reason: string) => void
  onSuccess?: (attempt: number) => void
  onFailure?: (attempt: number, error: unknown) => void
}

export class SubscriberReconnectController {
  private reconnectTimer: number | null = null
  private reconnectInFlight = false
  private userStopped = true
  private attemptCount = 0

  constructor(private readonly handlers: SubscriberReconnectHandlers) {}

  get attempts(): number {
    return this.attemptCount
  }

  get isActive(): boolean {
    return !this.userStopped
  }

  markActive(): void {
    this.userStopped = false
  }

  markStopped(): void {
    this.userStopped = true
    this.cancel()
    this.attemptCount = 0
  }

  notifyConnected(): void {
    this.attemptCount = 0
    this.cancel()
  }

  cancel(): void {
    if (this.reconnectTimer !== null) {
      window.clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }
  }

  scheduleReconnect(reason: string): void {
    if (this.userStopped) return

    this.cancel()
    this.handlers.onScheduled?.(reason, SUBSCRIBER_RECONNECT_DELAY_MS)

    this.reconnectTimer = window.setTimeout((): void => {
      this.reconnectTimer = null
      void this.runReconnect(reason)
    }, SUBSCRIBER_RECONNECT_DELAY_MS)
  }

  private async runReconnect(reason: string): Promise<void> {
    if (this.userStopped || this.reconnectInFlight) return

    this.reconnectInFlight = true
    this.attemptCount += 1
    this.handlers.onAttempt?.(this.attemptCount, reason)

    try {
      const ok = await this.handlers.reconnect()
      if (ok) {
        const successfulAttempt = this.attemptCount
        this.notifyConnected()
        this.handlers.onSuccess?.(successfulAttempt)
        return
      }

      this.handlers.onFailure?.(this.attemptCount, 'reconnect returned false')
      this.scheduleReconnect('reconnect failed')
    } catch (error) {
      this.handlers.onFailure?.(this.attemptCount, error)
      this.scheduleReconnect('reconnect error')
    } finally {
      this.reconnectInFlight = false
    }
  }
}

export function isSubscriberReconnectEvent(
  type: string,
  subscriberEventTypes: typeof window.red5prosdk.SubscriberEventTypes
): boolean {
  return (
    type === subscriberEventTypes.CONNECTION_CLOSED ||
    type === subscriberEventTypes.CONNECT_FAILURE ||
    type === subscriberEventTypes.PLAY_UNPUBLISH
  )
}
