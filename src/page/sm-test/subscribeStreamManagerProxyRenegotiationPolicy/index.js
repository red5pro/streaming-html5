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
;((window, document, red5prosdk) => {
  'use strict'

  const configuration = (function () {
    let conf = sessionStorage.getItem('r5proTestBed')
    try {
      return JSON.parse(conf)
    } catch (e) {
      console.error(
        'Could not read testbed configuration from sessionstorage: ' + e.message
      )
    }
    return {}
  })()
  red5prosdk.setLogLevel(
    configuration.verboseLogging
      ? red5prosdk.LOG_LEVELS.TRACE
      : red5prosdk.LOG_LEVELS.WARN
  )

  let targetSubscriber
  let reconnectionAttempts = 0
  const typeSelect = document.getElementById('type-select')
  const timeoutIntervalSelect = document.getElementById(
    'timeout-interval-select'
  )
  const reconnectionAttemptsField = document.getElementById(
    'reconnection-attempts'
  )
  const subscribeButton = document.getElementById('subscribe-button')
  typeSelect.addEventListener('change', event => {
    timeoutIntervalSelect.disabled = event.target.value !== 'TIMEOUT'
  })
  timeoutIntervalSelect.disabled = typeSelect.value !== 'TIMEOUT'

  const updateStatusFromEvent = window.red5proHandleSubscriberEvent // defined in src/template/partial/status-field-subscriber.hbs
  const instanceId = Math.floor(Math.random() * 0x10000).toString(16)
  const streamTitle = document.getElementById('stream-title')
  const statisticsField = document.getElementById('statistics-field')
  const bitrateField = document.getElementById('bitrate-field')
  const packetsField = document.getElementById('packets-field')
  const resolutionField = document.getElementById('resolution-field')

  // Health tracking elements
  const healthPanel = document.getElementById('health-panel')
  const healthStatusBadge = document.getElementById('health-status-badge')
  const metricStale = document.getElementById('metric-stale')
  const metricRegression = document.getElementById('metric-regression')
  const metricRtt = document.getElementById('metric-rtt')
  const metricRttSeverity = document.getElementById('metric-rtt-severity')
  const metricRttValue = document.getElementById('metric-rtt-value')
  const metricTimeout = document.getElementById('metric-timeout')
  const healthEventsList = document.getElementById('health-events-list')

  // Health tracking state
  const healthMetrics = {
    staleStats: 0,
    stateRegression: 0,
    excessiveRtt: 0,
    iceTimeout: 0,
    currentRttSeverity: null,
    currentRttMs: null
  }

  const HEALTH_EVENT_TYPES = {
    STALE_STATS: 'WebRTC.Connection.StaleStats',
    STATE_REGRESSION: 'WebRTC.Connection.StateRegression',
    EXCESSIVE_RTT: 'WebRTC.Connection.ExcessiveRTT',
    ICE_TIMEOUT: 'WebRTC.Connection.IceTimeout'
  }

  const RTT_SEVERITY_ORDER = ['healthy', 'degrading', 'poor', 'severe', 'critical']
  const RTT_SEVERITY_LABELS = {
    healthy: 'Healthy',
    degrading: 'Degrading',
    poor: 'Poor',
    severe: 'Severe',
    critical: 'Critical'
  }

  const formatTime = date => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const getEventConfig = (type, data = {}) => {
    switch (type) {
      case HEALTH_EVENT_TYPES.STALE_STATS:
        return { icon: 'stale', label: 'Stale Stats', symbol: '⏸' }
      case HEALTH_EVENT_TYPES.STATE_REGRESSION:
        return { icon: 'regression', label: 'State Regression', symbol: '↓' }
      case HEALTH_EVENT_TYPES.EXCESSIVE_RTT: {
        const severity = data.severity || 'degrading'
        return {
          icon: `rtt-${severity}`,
          label: `RTT ${RTT_SEVERITY_LABELS[severity] || severity}`,
          symbol: '⏱'
        }
      }
      case HEALTH_EVENT_TYPES.ICE_TIMEOUT:
        return { icon: 'timeout', label: 'ICE Timeout', symbol: '⌛' }
      default:
        return { icon: 'stale', label: 'Unknown', symbol: '?' }
    }
  }

  const updateHealthStatus = () => {
    let status = 'healthy'
    let label = 'Healthy'

    const rttSeverity = healthMetrics.currentRttSeverity
    const rttSeverityIndex = rttSeverity ? RTT_SEVERITY_ORDER.indexOf(rttSeverity) : 0

    if (
      healthMetrics.stateRegression > 0 ||
      healthMetrics.iceTimeout > 0 ||
      rttSeverityIndex >= RTT_SEVERITY_ORDER.indexOf('critical')
    ) {
      status = 'critical'
      label = 'Critical'
    } else if (
      healthMetrics.staleStats > 0 ||
      rttSeverityIndex >= RTT_SEVERITY_ORDER.indexOf('poor')
    ) {
      status = 'warning'
      label = 'Warning'
    } else if (rttSeverityIndex >= RTT_SEVERITY_ORDER.indexOf('degrading')) {
      status = 'warning'
      label = 'Degraded'
    }

    healthStatusBadge.className = `health-status-badge ${status}`
    healthStatusBadge.textContent = label
  }

  const updateMetricDisplay = (element, value, warningThreshold = 1, criticalThreshold = 3) => {
    element.textContent = value
    element.className = 'health-metric-value'
    if (value >= criticalThreshold) {
      element.classList.add('critical')
    } else if (value >= warningThreshold) {
      element.classList.add('warning')
    }
  }

  const updateRttSeverityDisplay = (severity, rttMs) => {
    healthMetrics.currentRttSeverity = severity
    healthMetrics.currentRttMs = rttMs

    metricRttSeverity.className = `health-metric-sublabel ${severity || 'healthy'}`
    metricRttSeverity.textContent = RTT_SEVERITY_LABELS[severity] || 'Healthy'

    if (rttMs !== null && rttMs !== undefined) {
      metricRttValue.textContent = `${Math.round(rttMs * 1000)}ms`
    } else {
      metricRttValue.textContent = '--'
    }
  }

  const addHealthEvent = (type, data) => {
    const config = getEventConfig(type, data)
    const now = new Date()

    // Remove empty state message if present
    const emptyMsg = healthEventsList.querySelector('.health-events-empty')
    if (emptyMsg) {
      emptyMsg.remove()
    }

    const eventItem = document.createElement('div')
    eventItem.className = 'health-event-item'
    eventItem.innerHTML = `
      <div class="health-event-icon ${config.icon}">${config.symbol}</div>
      <div class="health-event-content">
        <div class="health-event-type">${config.label}</div>
        <div class="health-event-message">${data.message || 'No details available'}</div>
      </div>
      <div class="health-event-time">${formatTime(now)}</div>
    `

    // Insert at the top of the list (after header)
    healthEventsList.insertBefore(eventItem, healthEventsList.firstChild)

    // Limit to 50 events
    const events = healthEventsList.querySelectorAll('.health-event-item')
    if (events.length > 50) {
      events[events.length - 1].remove()
    }
  }

  const handleHealthEvent = (type, data) => {
    switch (type) {
      case HEALTH_EVENT_TYPES.STALE_STATS:
        healthMetrics.staleStats++
        updateMetricDisplay(metricStale, healthMetrics.staleStats)
        break
      case HEALTH_EVENT_TYPES.STATE_REGRESSION:
        healthMetrics.stateRegression++
        updateMetricDisplay(metricRegression, healthMetrics.stateRegression, 1, 2)
        break
      case HEALTH_EVENT_TYPES.EXCESSIVE_RTT: {
        healthMetrics.excessiveRtt++
        const severity = data.severity || 'degrading'
        const currentRtt = data.currentRTT
        updateMetricDisplay(metricRtt, healthMetrics.excessiveRtt)
        updateRttSeverityDisplay(severity, currentRtt)
        break
      }
      case HEALTH_EVENT_TYPES.ICE_TIMEOUT:
        healthMetrics.iceTimeout++
        updateMetricDisplay(metricTimeout, healthMetrics.iceTimeout, 1, 2)
        break
    }

    addHealthEvent(type, data)
    updateHealthStatus()
  }

  const resetHealthTracking = () => {
    healthMetrics.staleStats = 0
    healthMetrics.stateRegression = 0
    healthMetrics.excessiveRtt = 0
    healthMetrics.iceTimeout = 0
    healthMetrics.currentRttSeverity = null
    healthMetrics.currentRttMs = null

    metricStale.textContent = '0'
    metricStale.className = 'health-metric-value'
    metricRegression.textContent = '0'
    metricRegression.className = 'health-metric-value'
    metricRtt.textContent = '0'
    metricRtt.className = 'health-metric-value'
    metricRttSeverity.className = 'health-metric-sublabel healthy'
    metricRttSeverity.textContent = 'Healthy'
    metricRttValue.textContent = '--'
    metricTimeout.textContent = '0'
    metricTimeout.className = 'health-metric-value'

    healthStatusBadge.className = 'health-status-badge healthy'
    healthStatusBadge.textContent = 'Healthy'

    healthEventsList.innerHTML = '<div class="health-events-empty">No health events recorded</div>'
  }

  const showHealthPanel = () => {
    healthPanel.classList.remove('hidden')
    resetHealthTracking()
  }

  let bitrate = 0
  let packetsReceived = 0
  let frameWidth = 0
  let frameHeight = 0

  const updateStatistics = (b, p, w, h) => {
    statisticsField.classList.remove('hidden')
    bitrateField.innerText = b === 0 ? 'N/A' : Math.floor(b)
    packetsField.innerText = p
    resolutionField.innerText = (w || 0) + 'x' + (h || 0)
  }

  const onBitrateUpdate = (b, p) => {
    bitrate = b
    packetsReceived = p
    updateStatistics(bitrate, packetsReceived, frameWidth, frameHeight)
  }

  const onResolutionUpdate = (w, h) => {
    frameWidth = w
    frameHeight = h
    updateStatistics(bitrate, packetsReceived, frameWidth, frameHeight)
  }

  // Base configuration to extend in providing specific tech failover configurations.
  let defaultConfiguration = ((useVideo, useAudio) => {
    let c = configuration
    if (!useVideo) {
      c.videoEncoding = red5prosdk.PlaybackVideoEncoder.NONE
    }
    if (!useAudio) {
      c.audioEncoding = red5prosdk.PlaybackAudioEncoder.NONE
    }
    return c
  })(configuration.useVideo, configuration.useAudio)

  // Local lifecycle notifications.
  const onSubscriberEvent = event => {
    const { type, target, data } = event

    // Handle health events
    if (Object.values(HEALTH_EVENT_TYPES).includes(type)) {
      console.log('[Red5ProSubscriber:Health] ' + type, data)
      handleHealthEvent(type, data)
      return
    }

    if (type !== 'Subscribe.Time.Update') {
      console.log('[Red5ProSubscriber] ' + type + '.')
      updateStatusFromEvent(event)
      if (type === 'Subscribe.VideoDimensions.Change') {
        onResolutionUpdate(data.width, data.height)
      } else if (type === 'Reconnect.Start') {
        reconnectionAttempts++
        reconnectionAttemptsField.innerText = reconnectionAttempts
      } else if (type === 'Subscribe.Start') {
        onSubscribeSuccess(target ?? targetSubscriber)
      }
    }
  }
  const onSubscribeFail = message => {
    console.error('[Red5ProSubsriber] Subscribe Error :: ' + message)
  }
  const onSubscribeSuccess = subscriber => {
    console.log('[Red5ProSubsriber] Subscribe Complete.')
    if (window.exposeSubscriberGlobally) {
      window.exposeSubscriberGlobally(subscriber)
    }
    if (subscriber.getType().toLowerCase() === 'rtc') {
      try {
        window.untrackBitrate()
        window.trackBitrate(
          subscriber.getPeerConnection(),
          onBitrateUpdate,
          onResolutionUpdate,
          true
        )
      } catch (e) {
        //
      }
    }
  }
  const onUnsubscribeFail = message => {
    console.error('[Red5ProSubsriber] Unsubscribe Error :: ' + message)
  }
  const onUnsubscribeSuccess = () => {
    console.log('[Red5ProSubsriber] Unsubscribe Complete.')
  }

  const getRegionIfDefined = () => {
    var region = configuration.streamManagerRegion
    if (
      typeof region === 'string' &&
      region.length > 0 &&
      region !== 'undefined'
    ) {
      return region
    }
    return undefined
  }

  const getAuthenticationParams = () => {
    const auth = configuration.authentication
    return auth && auth.enabled
      ? {
          connectionParams: {
            username: auth.username,
            password: auth.password,
            token: auth.token
          }
        }
      : {}
  }

  // Request to unsubscribe.
  const unsubscribe = async () => {
    try {
      await targetSubscriber.unsubscribe()
      targetSubscriber.off('*', onSubscriberEvent)
      onUnsubscribeSuccess()
    } catch (error) {
      var jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      onUnsubscribeFail(jsonError)
    } finally {
      targetSubscriber = undefined
    }
  }
  const start = async () => {
    subscribeButton.disabled = true
    showHealthPanel()

    const { stream1: streamName } = configuration
    const { WHEPClient } = red5prosdk

    const {
      host,
      app,
      protocol,
      port,
      streamManagerAPI,
      streamManagerNodeGroup: nodeGroup
    } = configuration

    const region = getRegionIfDefined()
    const params = region
      ? {
          region,
          strict: true
        }
      : undefined
    const connectionParams = params
      ? { ...params, ...getAuthenticationParams().connectionParams }
      : getAuthenticationParams().connectionParams

    const httpProtocol = protocol === 'ws' ? 'http' : 'https'
    const endpoint = `${httpProtocol}://${host}:${port}/as/${streamManagerAPI}/proxy/whep/${app}/${streamName}`

    let rtcConfig = {
      ...configuration,
      ...defaultConfiguration,
      ...getAuthenticationParams(),
      endpoint,
      streamName,
      subscriptionId: 'subscriber-' + instanceId,
      renegotiationPolicy: {
        type: typeSelect.value,
        timeoutInterval: parseInt(timeoutIntervalSelect.value, 10)
      },
      connectionParams: {
        ...connectionParams,
        nodeGroup
      }
    }

    try {
      streamTitle.innerText = streamName

      targetSubscriber = new WHEPClient()
      targetSubscriber.on('*', onSubscriberEvent)
      await targetSubscriber.init(rtcConfig)
      await targetSubscriber.subscribe()
      onSubscribeSuccess(targetSubscriber)
    } catch (error) {
      var jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      console.error(
        '[Red5ProSubscriber] :: Error in subscribing - ' + jsonError
      )
      onSubscribeFail(jsonError)
      subscribeButton.disabled = false
    }
  }

  // Clean up.
  let shuttingDown = false
  const shutdown = async () => {
    if (shuttingDown) return
    shuttingDown = true
    window.untrackBitrate()
    await unsubscribe()
  }
  window.addEventListener('pagehide', shutdown)
  window.addEventListener('beforeunload', shutdown)

  subscribeButton.addEventListener('click', start)
})(this, document, window.red5prosdk)
