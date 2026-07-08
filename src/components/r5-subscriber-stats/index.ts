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
import {
  BitrateTracker,
  formatBitrate,
  formatResolution,
  parseInboundStats,
} from '@/lib/rtc-stats'
import {
  extractBroadcastStartTime,
  formatBroadcastLength,
  formatBroadcastStartTime,
} from '@/lib/subscribe-metadata'
import { mediaStatsTemplate } from '@/components/media-stats/template'

const POLL_INTERVAL_MS = 1000

export class R5SubscriberStats extends HTMLElement {
  private shadow: ShadowRoot
  private endpointRowEl: HTMLElement | null = null
  private endpointValueEl: HTMLSpanElement | null = null
  private broadcastStartedEl: HTMLSpanElement | null = null
  private broadcastLengthEl: HTMLSpanElement | null = null
  private broadcastTimeZoneToggleEl: HTMLButtonElement | null = null
  private resolutionEl!: HTMLSpanElement
  private videoBitrateEl!: HTMLSpanElement
  private audioBitrateEl!: HTMLSpanElement
  private peerConnection: RTCPeerConnection | null = null
  private intervalId: number | null = null
  private broadcastStartTime: number | null = null
  private useUtcTime = false
  private controlsWired = false
  private videoBitrateTracker = new BitrateTracker()
  private audioBitrateTracker = new BitrateTracker()
  private endpoint: string | null = null

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback(): void {
    if (!this.shadow.querySelector('.media-stats')) {
      this.shadow.innerHTML = mediaStatsTemplate(publicAssetPrefix(), { showBroadcastInfo: true })
      this.controlsWired = false
    }

    this.broadcastStartedEl = this.shadow.getElementById(
      'broadcast-started-value'
    ) as HTMLSpanElement | null
    this.endpointRowEl = this.shadow.getElementById('endpoint-row') as HTMLElement | null
    this.endpointValueEl = this.shadow.getElementById('endpoint-value') as HTMLSpanElement | null
    this.broadcastLengthEl = this.shadow.getElementById(
      'broadcast-length-value'
    ) as HTMLSpanElement | null
    this.broadcastTimeZoneToggleEl = this.shadow.getElementById(
      'broadcast-time-zone-toggle'
    ) as HTMLButtonElement | null
    this.resolutionEl = this.shadow.getElementById('resolution-value') as HTMLSpanElement
    this.videoBitrateEl = this.shadow.getElementById('video-bitrate-value') as HTMLSpanElement
    this.audioBitrateEl = this.shadow.getElementById('audio-bitrate-value') as HTMLSpanElement

    if (!this.controlsWired) {
      this.controlsWired = true
      this.broadcastTimeZoneToggleEl?.addEventListener('click', () => {
        this.useUtcTime = !this.useUtcTime
        this.syncBroadcastTimeZoneToggle()
        this.updateBroadcastDisplays()
      })
    }

    this.syncBroadcastTimeZoneToggle()
    this.syncEndpointDisplay()
    this.resetDisplay()
  }

  disconnectedCallback(): void {
    this.stop()
  }

  setPeerConnection(connection: RTCPeerConnection | null): void {
    this.peerConnection = connection
  }

  setEndpoint(value: string): void {
    const normalized = value.trim()
    this.endpoint = normalized.length > 0 ? normalized : null
    this.syncEndpointDisplay()
  }

  applySubscribeMetadata(payload: unknown): void {
    const startTime = extractBroadcastStartTime(payload)
    if (startTime === null) return

    this.broadcastStartTime = startTime
    this.updateBroadcastDisplays()
  }

  start(): void {
    if (!this.peerConnection) return
    this.stop()
    this.resetTrackers()
    this.resetDisplay()
    void this.pollStats()
    this.intervalId = window.setInterval(() => {
      void this.pollStats()
    }, POLL_INTERVAL_MS)
  }

  stop(): void {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId)
      this.intervalId = null
    }
    this.broadcastStartTime = null
    this.resetTrackers()
    this.resetDisplay()
  }

  private async pollStats(): Promise<void> {
    const connection = this.peerConnection
    if (!connection) return

    this.updateBroadcastDisplays()

    try {
      const report = await connection.getStats()
      const sample = parseInboundStats(report)

      this.resolutionEl.textContent = formatResolution(sample.videoResolution)

      if (sample.videoBytes !== null && sample.videoTimestamp !== null) {
        const videoBitrate = this.videoBitrateTracker.update(
          sample.videoBytes,
          sample.videoTimestamp
        )
        this.videoBitrateEl.textContent = formatBitrate(videoBitrate)
      }

      if (sample.audioBytes !== null && sample.audioTimestamp !== null) {
        const audioBitrate = this.audioBitrateTracker.update(
          sample.audioBytes,
          sample.audioTimestamp
        )
        this.audioBitrateEl.textContent = formatBitrate(audioBitrate)
      }
    } catch {
      // Ignore transient stats read failures while the connection is closing.
    }
  }

  private syncBroadcastTimeZoneToggle(): void {
    if (!this.broadcastTimeZoneToggleEl) return
    this.broadcastTimeZoneToggleEl.textContent = this.useUtcTime ? 'UTC' : 'Local'
    this.broadcastTimeZoneToggleEl.title = this.useUtcTime
      ? 'Showing UTC. Click for local time.'
      : 'Showing local time. Click for UTC.'
  }

  private updateBroadcastDisplays(): void {
    if (!this.broadcastStartedEl || !this.broadcastLengthEl) return

    if (this.broadcastStartTime === null) {
      this.broadcastStartedEl.textContent = '—'
      this.broadcastLengthEl.textContent = '—'
      return
    }

    this.broadcastStartedEl.textContent = formatBroadcastStartTime(
      this.broadcastStartTime,
      this.useUtcTime
    )
    this.broadcastLengthEl.textContent = formatBroadcastLength(this.broadcastStartTime)
  }

  private resetTrackers(): void {
    this.videoBitrateTracker.reset()
    this.audioBitrateTracker.reset()
  }

  private syncEndpointDisplay(): void {
    if (!this.endpointRowEl || !this.endpointValueEl) return
    if (!this.endpoint) {
      this.endpointRowEl.classList.add('is-hidden')
      this.endpointValueEl.textContent = '—'
      return
    }
    this.endpointRowEl.classList.remove('is-hidden')
    this.endpointValueEl.textContent = this.endpoint
  }

  private resetDisplay(): void {
    if (!this.resolutionEl) return
    if (this.broadcastStartedEl) {
      this.broadcastStartedEl.textContent = '—'
    }
    if (this.broadcastLengthEl) {
      this.broadcastLengthEl.textContent = '—'
    }
    this.resolutionEl.textContent = '—'
    this.videoBitrateEl.textContent = '—'
    this.audioBitrateEl.textContent = '—'
  }
}

if (!customElements.get('r5-subscriber-stats')) {
  customElements.define('r5-subscriber-stats', R5SubscriberStats)
}

export type R5SubscriberStatsElement = R5SubscriberStats
