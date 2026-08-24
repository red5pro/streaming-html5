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

import '@/components/r5-header'
import '@/components/r5-subscriber-stats'
import type { R5SubscriberStatsElement } from '@/components/r5-subscriber-stats'
import {
  applyTheme,
  loadSettings,
  resolveConnectionParamsFromSettings,
  resolveEndpointFromSettings,
  resolveStatisticsConfigurationFromSettings,
  resolveRtcConfigurationFromSettings,
  type Settings,
} from '@/settings'
import { wireExampleLog } from '@/lib/example-log'

const sdk = window.red5prosdk
sdk.setLogLevel('debug')

let settings = loadSettings()
applyTheme(settings.theme)

let subscriber: WHEPClient | null = null
let reconnectionAttempts = 0

// ---------------------------------------------------------------------------
// Health state
// ---------------------------------------------------------------------------

type HealthSeverity = 'ok' | 'warning' | 'critical'
type RttSeverity = 'healthy' | 'degrading' | 'poor' | 'severe' | 'critical'

interface HealthEntry {
  time: string
  title: string
  description: string
  severity: HealthSeverity
}

const healthState = {
  staleStats: 0,
  stateRegressions: 0,
  rttIssues: 0,
  lastRtt: 0,
  lastRttSeverity: 'healthy' as RttSeverity,
  lastRttUpdatedAt: 0,
  iceTimeouts: 0,
}

const healthLog: HealthEntry[] = []
const MAX_HEALTH_LOG = 30
const HEALTH_DECAY_WINDOW_MS = 30000
const HEALTH_REFRESH_INTERVAL_MS = 1000
const RTT_SEVERITY_ORDER: RttSeverity[] = ['healthy', 'degrading', 'poor', 'severe', 'critical']
const RTT_SEVERITY_LABELS: Record<RttSeverity, string> = {
  healthy: 'Healthy',
  degrading: 'Degrading',
  poor: 'Poor',
  severe: 'Severe',
  critical: 'Critical',
}

const healthEventTimestamps = {
  staleStats: [] as number[],
  stateRegressions: [] as number[],
  rttIssues: [] as number[],
  iceTimeouts: [] as number[],
}

let healthRefreshTimer: number | null = null

// ---------------------------------------------------------------------------
// DOM refs
// ---------------------------------------------------------------------------

const subscribeBtn = document.getElementById('subscribe-btn') as HTMLButtonElement
const unsubscribeBtn = document.getElementById('unsubscribe-btn') as HTMLButtonElement
const subscribeStatusEl = document.getElementById('subscribe-status') as HTMLSpanElement
const connectionInfoEl = document.getElementById('connection-info') as HTMLParagraphElement
const reconnectionInfoEl = document.getElementById('reconnection-info') as HTMLParagraphElement
const renegotiationConfigSectionEl = document.getElementById(
  'renegotiation-config-section'
) as HTMLElement
const policyTypeSelectEl = document.getElementById('policy-type-select') as HTMLSelectElement
const timeoutIntervalSelectEl = document.getElementById(
  'timeout-interval-select'
) as HTMLSelectElement
const subscriberStatsEl = document.getElementById('subscriber-stats') as R5SubscriberStatsElement

const connectionHealthEl = document.getElementById('connection-health') as HTMLElement
const healthStatusBadgeEl = document.getElementById('health-status-badge') as HTMLSpanElement
const healthStaleCountEl = document.getElementById('health-stale-count') as HTMLSpanElement
const healthRegressionCountEl = document.getElementById(
  'health-regression-count'
) as HTMLSpanElement
const healthRttCountEl = document.getElementById('health-rtt-count') as HTMLSpanElement
const healthRttSeverityEl = document.getElementById('health-rtt-severity') as HTMLSpanElement
const healthRttDetailEl = document.getElementById('health-rtt-detail') as HTMLSpanElement
const healthIceCountEl = document.getElementById('health-ice-count') as HTMLSpanElement
const healthLogEntriesEl = document.getElementById('health-log-entries') as HTMLDivElement

const { log } = wireExampleLog()

// ---------------------------------------------------------------------------
// Subscriber helpers
// ---------------------------------------------------------------------------

const subscriberFailureEvents = ['Subscribe.Fail', 'Connect.Failure', 'Subscribe.InvalidName']

function setSubscriberStatus(
  text: string,
  state: 'idle' | 'connecting' | 'connected' | 'error' | 'unknown'
): void {
  subscribeStatusEl.textContent = text
  if (state !== 'unknown') {
    subscribeStatusEl.className = `status status--${state}`
  }
}

function updateReconnectionInfo(): void {
  reconnectionInfoEl.textContent = `Reconnection Attempts: ${reconnectionAttempts}`
}

function updateConnectionInfo(): void {
  if (!settings.host || !settings.streamName) {
    connectionInfoEl.textContent = 'Configure host and stream name in Settings'
    return
  }
  connectionInfoEl.textContent = resolveEndpointFromSettings(settings, 'whep')
}

function setRenegotiationFormEnabled(enabled: boolean): void {
  policyTypeSelectEl.disabled = !enabled
  timeoutIntervalSelectEl.disabled = !enabled
  renegotiationConfigSectionEl.classList.toggle('is-disabled', !enabled)
}

function readRenegotiationPolicy(): RenegotiationPolicyType {
  return {
    type: policyTypeSelectEl.value as RenegotiationPolicyType['type'],
    iceTimeoutInterval: parseInt(timeoutIntervalSelectEl.value, 10),
  }
}

function resolveStatsConfiguration(): StatsConfig {
  return (
    resolveStatisticsConfigurationFromSettings(settings) ?? {
      endpoint: null,
      interval: 1000,
    }
  )
}

function ensureCoreSettings(s: Settings): boolean {
  if (!s.host) {
    log('Missing host. Open Settings and configure host first.', 'error')
    return false
  }
  if (!s.streamName) {
    log('Missing stream name. Open Settings and configure stream name first.', 'error')
    return false
  }
  return true
}

// ---------------------------------------------------------------------------
// Health display
// ---------------------------------------------------------------------------

function computeOverallSeverity(): HealthSeverity {
  const rttSeverity = getCurrentRttSeverity()
  const rttSeverityIndex = RTT_SEVERITY_ORDER.indexOf(rttSeverity)

  if (healthState.iceTimeouts > 0 || rttSeverityIndex >= RTT_SEVERITY_ORDER.indexOf('critical')) {
    return 'critical'
  }

  if (
    healthState.stateRegressions > 0 ||
    healthState.staleStats > 0 ||
    healthState.rttIssues > 0 ||
    rttSeverityIndex >= RTT_SEVERITY_ORDER.indexOf('degrading')
  ) {
    return 'warning'
  }

  return 'ok'
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

function updateHealthDisplay(): void {
  const overall = computeOverallSeverity()
  const rttSeverity = getCurrentRttSeverity()

  healthStatusBadgeEl.className = `connection-health__badge connection-health__badge--${overall}`
  healthStatusBadgeEl.textContent = `\u25CF ${overall.toUpperCase()}`

  healthStaleCountEl.textContent = String(healthState.staleStats)
  healthRegressionCountEl.textContent = String(healthState.stateRegressions)
  healthIceCountEl.textContent = String(healthState.iceTimeouts)

  healthRttCountEl.textContent = String(healthState.rttIssues)
  healthRttCountEl.dataset.severity = healthState.rttIssues > 0 ? rttSeverity : ''

  if (healthState.rttIssues > 0) {
    healthRttSeverityEl.textContent = RTT_SEVERITY_LABELS[rttSeverity].toUpperCase()
    healthRttSeverityEl.className = `connection-health__cell-severity connection-health__cell-severity--${rttSeverity}`
    if (healthState.lastRtt > 0) {
      healthRttDetailEl.textContent = `${healthState.lastRtt}ms`
      healthRttDetailEl.classList.remove('is-hidden')
    }
  } else {
    healthRttSeverityEl.className = 'connection-health__cell-severity is-hidden'
    healthRttDetailEl.classList.add('is-hidden')
  }
}

function renderHealthLog(): void {
  if (healthLog.length === 0) {
    healthLogEntriesEl.innerHTML = '<p class="connection-health__log-empty">No events yet.</p>'
    return
  }

  healthLogEntriesEl.innerHTML = healthLog
    .map(
      (entry) =>
        `<div class="health-log-entry health-log-entry--${entry.severity}">` +
        `<span class="health-log-entry__dot"></span>` +
        `<div class="health-log-entry__body">` +
        `<div class="health-log-entry__row">` +
        `<span class="health-log-entry__title">${entry.title}</span>` +
        `<span class="health-log-entry__time">${entry.time}</span>` +
        `</div>` +
        `<p class="health-log-entry__desc">${entry.description}</p>` +
        `</div>` +
        `</div>`
    )
    .join('')
}

function addHealthEntry(entry: HealthEntry): void {
  healthLog.unshift(entry)
  if (healthLog.length > MAX_HEALTH_LOG) healthLog.pop()
  renderHealthLog()
}

function resetHealthState(): void {
  stopHealthRefresh()
  healthEventTimestamps.staleStats.length = 0
  healthEventTimestamps.stateRegressions.length = 0
  healthEventTimestamps.rttIssues.length = 0
  healthEventTimestamps.iceTimeouts.length = 0
  healthState.staleStats = 0
  healthState.stateRegressions = 0
  healthState.rttIssues = 0
  healthState.lastRtt = 0
  healthState.lastRttSeverity = 'healthy'
  healthState.lastRttUpdatedAt = 0
  healthState.iceTimeouts = 0
  healthLog.length = 0
  connectionHealthEl.classList.add('is-hidden')
  updateHealthDisplay()
  renderHealthLog()
}

/**
 * Extract RTT in milliseconds from health event data.
 * WebRTC currentRoundTripTime is in seconds; SDK may convert to ms already.
 * Heuristic: values < 30 are treated as seconds, >= 30 as milliseconds.
 */
function extractRtt(data: Record<string, unknown> | undefined): number {
  if (!data) return 0
  const raw = data.rtt ?? data.currentRoundTripTime ?? data.roundTripTime ?? data.value
  if (typeof raw !== 'number' || raw <= 0) return 0
  return raw < 30 ? Math.round(raw * 1000) : Math.round(raw)
}

function normalizeRttSeverity(value: unknown): RttSeverity | null {
  if (typeof value !== 'string') return null
  const lowered = value.toLowerCase()
  if (lowered === 'healthy') return 'healthy'
  if (lowered === 'degrading') return 'degrading'
  if (lowered === 'poor') return 'poor'
  if (lowered === 'severe') return 'severe'
  if (lowered === 'critical') return 'critical'
  return null
}

function resolveRttSeverity(data: Record<string, unknown> | undefined, rttMs: number): RttSeverity {
  const explicit = normalizeRttSeverity(data?.severity)
  if (explicit) return explicit
  if (rttMs <= 0) return 'degrading'
  if (rttMs < 250) return 'healthy'
  if (rttMs < 450) return 'degrading'
  if (rttMs < 700) return 'poor'
  if (rttMs < 1000) return 'severe'
  return 'critical'
}

function pruneOldHealthEvents(now = Date.now()): void {
  const floor = now - HEALTH_DECAY_WINDOW_MS
  healthEventTimestamps.staleStats = healthEventTimestamps.staleStats.filter((ts) => ts >= floor)
  healthEventTimestamps.stateRegressions = healthEventTimestamps.stateRegressions.filter(
    (ts) => ts >= floor
  )
  healthEventTimestamps.rttIssues = healthEventTimestamps.rttIssues.filter((ts) => ts >= floor)
  healthEventTimestamps.iceTimeouts = healthEventTimestamps.iceTimeouts.filter((ts) => ts >= floor)
}

function recalculateHealthCounters(): void {
  healthState.staleStats = healthEventTimestamps.staleStats.length
  healthState.stateRegressions = healthEventTimestamps.stateRegressions.length
  healthState.rttIssues = healthEventTimestamps.rttIssues.length
  healthState.iceTimeouts = healthEventTimestamps.iceTimeouts.length
}

function getCurrentRttSeverity(): RttSeverity {
  if (healthState.lastRttUpdatedAt === 0) return 'healthy'
  if (Date.now() - healthState.lastRttUpdatedAt > HEALTH_DECAY_WINDOW_MS) return 'healthy'
  return healthState.lastRttSeverity
}

function refreshHealthState(): void {
  pruneOldHealthEvents()
  recalculateHealthCounters()
  updateHealthDisplay()
}

function startHealthRefresh(): void {
  stopHealthRefresh()
  healthRefreshTimer = window.setInterval(() => {
    refreshHealthState()
  }, HEALTH_REFRESH_INTERVAL_MS)
}

function stopHealthRefresh(): void {
  if (healthRefreshTimer !== null) {
    window.clearInterval(healthRefreshTimer)
    healthRefreshTimer = null
  }
}

function handleHealthEvent(type: string, data: Record<string, unknown> | undefined): void {
  const timeLabel = formatTime(new Date())
  const now = Date.now()

  switch (type) {
    case sdk.WebRTCConnectionEventTypes.CONNECTION_HEALTH_STALE_STATS: {
      healthEventTimestamps.staleStats.push(now)
      addHealthEntry({
        time: timeLabel,
        title: 'Stale Stats',
        description: 'Connection statistics have stopped updating.',
        severity: 'warning',
      })
      break
    }

    case sdk.WebRTCConnectionEventTypes.CONNECTION_HEALTH_STATE_REGRESSION: {
      healthEventTimestamps.stateRegressions.push(now)
      addHealthEntry({
        time: timeLabel,
        title: 'State Regression',
        description: 'ICE connection state reverted from a previously successful state.',
        severity: 'warning',
      })
      break
    }

    case sdk.WebRTCConnectionEventTypes.CONNECTION_HEALTH_EXCESSIVE_RTT: {
      healthEventTimestamps.rttIssues.push(now)
      const rtt = extractRtt(data)
      const severity = resolveRttSeverity(data, rtt)
      healthState.lastRtt = rtt
      healthState.lastRttSeverity = severity
      healthState.lastRttUpdatedAt = now
      const rttDetail = rtt > 0 ? `: ${rtt}ms` : ''
      addHealthEntry({
        time: timeLabel,
        title: `RTT ${RTT_SEVERITY_LABELS[severity]}`,
        description: `Elevated RTT detected (${RTT_SEVERITY_LABELS[severity].toLowerCase()})${rttDetail}`,
        severity:
          severity === 'severe' || severity === 'critical'
            ? 'critical'
            : severity === 'healthy'
              ? 'ok'
              : 'warning',
      })
      break
    }

    case sdk.WebRTCConnectionEventTypes.CONNECTION_HEALTH_ICE_TIMEOUT: {
      healthEventTimestamps.iceTimeouts.push(now)
      addHealthEntry({
        time: timeLabel,
        title: 'ICE Timeout',
        description: 'ICE connection timeout reached. Renegotiation may be triggered.',
        severity: 'critical',
      })
      break
    }
  }

  refreshHealthState()
}

// ---------------------------------------------------------------------------
// Subscriber event handler
// ---------------------------------------------------------------------------

function onSubscriberEvent(event: Red5ProEvent): void {
  const { type, data } = event

  if (type === sdk.SubscriberEventTypes.SUBSCRIBE_METADATA) {
    subscriberStatsEl.applySubscribeMetadata(data)
    return
  }

  if (type === 'WebRTC.Endpoint.Changed') {
    const endpoint = event.data?.endpoint as string | undefined
    if (!endpoint) return
    subscriberStatsEl.setEndpoint(endpoint)
    return
  }

  if (
    type === sdk.WebRTCConnectionEventTypes.CONNECTION_HEALTH_STALE_STATS ||
    type === sdk.WebRTCConnectionEventTypes.CONNECTION_HEALTH_STATE_REGRESSION ||
    type === sdk.WebRTCConnectionEventTypes.CONNECTION_HEALTH_EXCESSIVE_RTT ||
    type === sdk.WebRTCConnectionEventTypes.CONNECTION_HEALTH_ICE_TIMEOUT
  ) {
    handleHealthEvent(type, data)
    return
  }

  if (type === sdk.SubscriberEventTypes.RECONNECT_START) {
    reconnectionAttempts += 1
    updateReconnectionInfo()
    setSubscriberStatus('Renegotiating...', 'connecting')
    log(`[WHEP] ${type} (attempt ${reconnectionAttempts})`, 'success')
    return
  }

  if (type === sdk.SubscriberEventTypes.RECONNECT_FAILURE) {
    setSubscriberStatus('Renegotiation Failed', 'error')
    log(`[WHEP] ${type}`, 'error')
    return
  }

  if (type === sdk.SubscriberEventTypes.SUBSCRIBE_START) {
    setSubscriberStatus('Subscribed', 'connected')
    subscribeBtn.disabled = true
    unsubscribeBtn.disabled = false
    setRenegotiationFormEnabled(false)
    subscriberStatsEl.startSubscriptionLength()
  } else if (subscriberFailureEvents.includes(type)) {
    setSubscriberStatus('Subscribe Error', 'error')
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
    setRenegotiationFormEnabled(true)
  } else if (type !== sdk.SubscriberEventTypes.PLAYBACK_TIME_UPDATE) {
    setSubscriberStatus(type, 'unknown')
  }
}

// ---------------------------------------------------------------------------
// Subscribe / unsubscribe
// ---------------------------------------------------------------------------

async function startSubscribe(): Promise<void> {
  if (subscriber) return
  if (!ensureCoreSettings(settings)) return

  const renegotiationPolicy = readRenegotiationPolicy()
  subscribeBtn.disabled = true
  unsubscribeBtn.disabled = true
  setSubscriberStatus('Connecting...', 'connecting')
  setRenegotiationFormEnabled(false)
  resetHealthState()

  log(
    `Renegotiation policy: type=${renegotiationPolicy.type}, iceTimeoutInterval=${renegotiationPolicy.iceTimeoutInterval}ms`
  )

  try {
    const { streamName } = settings
    const endpoint = resolveEndpointFromSettings(settings, 'whep')
    const connectionParams = resolveConnectionParamsFromSettings(settings)
    const stats = resolveStatsConfiguration()
    const rtcConfiguration = resolveRtcConfigurationFromSettings(settings)

    subscriber = new sdk.WHEPClient()
    subscriber.on('*', (event) => {
      const { type } = event
      if (type === sdk.SubscriberEventTypes.PLAYBACK_TIME_UPDATE) return
      if (type !== sdk.RTCSubscriberEventTypes.STATS_REPORT) {
        // too noisy to log all events
        log(`[WHEP] ${event.type}`)
      }
      onSubscriberEvent(event)
    })

    await subscriber.init({
      endpoint,
      streamName,
      mediaElementId: 'subscriber-video',
      connectionParams,
      stats,
      rtcConfiguration,
      renegotiationPolicy,
    })
    await subscriber.subscribe()

    const peerConnection = subscriber.getPeerConnection()
    if (peerConnection) {
      subscriberStatsEl.setPeerConnection(peerConnection)
      subscriberStatsEl.start()
    }

    setSubscriberStatus('Subscribed', 'connected')
    unsubscribeBtn.disabled = false
    connectionHealthEl.classList.remove('is-hidden')
    startHealthRefresh()
    // @ts-expect-error - global variable for debugging
    window.r5subscriber = subscriber
    log(`Subscribed to ${settings.streamName} from ${settings.host}`, 'success')
  } catch (error) {
    setSubscriberStatus('Subscribe Error', 'error')
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
    setRenegotiationFormEnabled(true)
    subscriber = null
    log(`Subscribe failed: ${String(error)}`, 'error')
  }
}

async function stopSubscribe(): Promise<void> {
  if (!subscriber) return
  unsubscribeBtn.disabled = true

  try {
    await subscriber.unsubscribe()
    log('Subscribe stopped', 'success')
  } catch (error) {
    log(`Unsubscribe failed: ${String(error)}`, 'error')
  } finally {
    subscriberStatsEl.stop()
    subscriberStatsEl.setPeerConnection(null)
    subscriber = null
    reconnectionAttempts = 0
    updateReconnectionInfo()
    subscribeBtn.disabled = false
    unsubscribeBtn.disabled = true
    setRenegotiationFormEnabled(true)
    setSubscriberStatus('Subscriber Idle', 'idle')
    resetHealthState()
    // @ts-expect-error - global variable for debugging
    delete window.r5subscriber
  }
}

subscribeBtn.addEventListener('click', () => {
  void startSubscribe()
})
unsubscribeBtn.addEventListener('click', () => {
  void stopSubscribe()
})

document.addEventListener('webrtc-settings-applied', (e) => {
  settings = (e as CustomEvent).detail as Settings
  updateConnectionInfo()
  log(`Settings updated: ${resolveEndpointFromSettings(settings, 'whep')} (${settings.streamName})`)
})

window.addEventListener('pagehide', () => {
  void stopSubscribe()
})
window.addEventListener('beforeunload', () => {
  void stopSubscribe()
})

updateConnectionInfo()
updateReconnectionInfo()
log('WHEP renegotiation example loaded. Configure policy options, then click Subscribe.')
