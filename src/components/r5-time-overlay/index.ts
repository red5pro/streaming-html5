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

import { publicAssetPrefix } from '@/lib/public-path'
import { timeOverlayTemplate } from './template'

const TICK_INTERVAL_MS = 50

export class R5TimeOverlay extends HTMLElement {
  private shadow: ShadowRoot
  private valueEl!: HTMLSpanElement
  private toggleEl!: HTMLButtonElement
  private tickId: number | null = null
  private useUtc = false
  private controlsWired = false

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback(): void {
    if (!this.shadow.querySelector('.time-overlay')) {
      this.shadow.innerHTML = timeOverlayTemplate(publicAssetPrefix())
      this.controlsWired = false
    }

    this.valueEl = this.shadow.getElementById('time-overlay-value') as HTMLSpanElement
    this.toggleEl = this.shadow.getElementById('time-overlay-toggle') as HTMLButtonElement

    if (!this.controlsWired) {
      this.controlsWired = true
      this.toggleEl.addEventListener('click', () => {
        this.useUtc = !this.useUtc
        this.syncToggleUi()
        this.updateDisplay()
      })
    }

    this.syncToggleUi()
    this.stop()
  }

  disconnectedCallback(): void {
    this.stop()
  }

  start(): void {
    this.stopTicker()
    this.hidden = false
    this.updateDisplay()
    this.tickId = window.setInterval(() => {
      this.updateDisplay()
    }, TICK_INTERVAL_MS)
  }

  stop(): void {
    this.stopTicker()
    this.hidden = true
    if (this.valueEl) {
      this.valueEl.textContent = '—'
    }
  }

  private stopTicker(): void {
    if (this.tickId !== null) {
      window.clearInterval(this.tickId)
      this.tickId = null
    }
  }

  private syncToggleUi(): void {
    this.toggleEl.textContent = this.useUtc ? 'UTC' : 'Local'
    this.toggleEl.title = this.useUtc
      ? 'Showing UTC time. Click for local.'
      : 'Showing local time. Click for UTC.'
  }

  private updateDisplay(): void {
    this.valueEl.textContent = this.formatClock(Date.now(), this.useUtc)
  }

  private formatClock(timestampMs: number, useUtc: boolean): string {
    const date = new Date(timestampMs)
    const hours = useUtc ? date.getUTCHours() : date.getHours()
    const minutes = useUtc ? date.getUTCMinutes() : date.getMinutes()
    const seconds = useUtc ? date.getUTCSeconds() : date.getSeconds()
    const milliseconds = useUtc ? date.getUTCMilliseconds() : date.getMilliseconds()
    const pad2 = (value: number): string => value.toString().padStart(2, '0')
    const pad3 = (value: number): string => value.toString().padStart(3, '0')
    const clock = `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}.${pad3(milliseconds)}`
    return useUtc ? `${clock} UTC` : clock
  }
}

if (!customElements.get('r5-time-overlay')) {
  customElements.define('r5-time-overlay', R5TimeOverlay)
}

export type R5TimeOverlayElement = R5TimeOverlay
