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
/* global red5prosdk */
import castLabsService from './castlabs-service.js'

let serverSettings = (function () {
  const settings = sessionStorage.getItem('r5proServerSettings')
  try {
    return JSON.parse(settings)
  } catch (e) {
    console.error(
      'Could not read server settings from sessionstorage: ' + e.message
    )
  }
  return {}
})()

let configuration = (function () {
  const conf = sessionStorage.getItem('r5proTestBed')
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

const accessKeyInput = document.querySelector('#access-key-input')
const secretKeyInput = document.querySelector('#secret-key-input')
const organizationUrnInput = document.querySelector('#organization-urn-input')
const userUrnInput = document.querySelector('#user-urn-input')
const watermarkIdInput = document.querySelector('#watermark-id-input')
const numOverlaysInput = document.querySelector('#num-overlays-input')
const mediaContainer = document.querySelector('#media-container')
const startButton = document.querySelector('#start-button')
const loadingDialog = document.querySelector('#loading-dialog')

const updateStatusFromEvent = window.red5proHandlePublisherEvent // defined in src/template/partial/status-field-publisher.hbs
const streamTitle = document.getElementById('stream-title')
const statisticsField = document.getElementById('statistics-field')
const bitrateField = document.getElementById('bitrate-field')
const packetsField = document.getElementById('packets-field')
const resolutionField = document.getElementById('resolution-field')

let bitrate = 0
let packetsSent = 0
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
  packetsSent = p
  updateStatistics(bitrate, packetsSent, frameWidth, frameHeight)
}

const onResolutionUpdate = (w, h) => {
  frameWidth = w
  frameHeight = h
  updateStatistics(bitrate, packetsSent, frameWidth, frameHeight)
}
streamTitle.innerText = configuration.stream1

const protocol = serverSettings.protocol
const isSecure = protocol == 'https'
const getSocketLocationFromProtocol = () => {
  return !isSecure
    ? { protocol: 'ws', port: serverSettings.wsport }
    : { protocol: 'wss', port: serverSettings.wssport }
}

let defaultConfiguration = {
  protocol: getSocketLocationFromProtocol().protocol,
  port: getSocketLocationFromProtocol().port,
}

const onSubscribeEvent = (event) => {
  if (event.type !== 'Subscribe.Time.Update') {
    console.log('[Red5ProSubscriber] ' + event.type + '.')
    updateStatusFromEvent(event)
    if (event.type === 'Subscribe.VideoDimensions.Change') {
      onResolutionUpdate(event.data.width, event.data.height)
    }
  }
}

const onSubscribeFail = (message) => {
  console.error('[Red5ProSubsriber] Subscribe Error :: ' + message)
}

const onSubscribeSuccess = (subscriber) => {
  console.log('[Red5ProSubsriber] Subscribe Complete.')
  if (window.exposeSubscriberGlobally) {
    window.exposeSubscriberGlobally(subscriber)
  }
  if (subscriber.getType().toLowerCase() === 'rtc') {
    try {
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

const onUnsubscribeFail = (message) => {
  console.error('[Red5ProSubsriber] Unsubscribe Error :: ' + message)
}

const onUnsubscribeSuccess = () => {
  console.log('[Red5ProSubsriber] Unsubscribe Complete.')
}

const getAuthenticationParams = () => {
  const auth = configuration.authentication
  return auth && auth.enabled
    ? {
        connectionParams: {
          username: auth.username,
          password: auth.password,
          token: auth.token,
        },
      }
    : {}
}

const enableForm = (enabled) => {
  const fields = document.querySelectorAll('.prod-drm-field')
  fields.forEach((field) => (field.disabled = !enabled))
  startButton.disabled = !enabled
}

const saveSettings = (settings) => {
  localStorage.setItem('castlabsWatermarkSettings', JSON.stringify(settings))
}

const fillSettings = () => {
  const settings = localStorage.getItem('castlabsWatermarkSettings')
  if (settings) {
    const settingsJSON = JSON.parse(settings)
    const {
      accessKey,
      secretKey,
      organizationUrn,
      userUrn,
      watermarkId,
      numOverlays,
    } = settingsJSON
    accessKeyInput.value = accessKey
    secretKeyInput.value = secretKey
    organizationUrnInput.value = organizationUrn
    userUrnInput.value = userUrn
    watermarkIdInput.value = watermarkId
    numOverlaysInput.value = numOverlays
  }
}

const getSettings = () => {
  return {
    accessKey: accessKeyInput.value,
    secretKey: secretKeyInput.value,
    organizationUrn: organizationUrnInput.value,
    userUrn: userUrnInput.value,
    watermarkId: watermarkIdInput.value,
    numOverlays: numOverlaysInput.value,
  }
}

const addOverlay = (pngData) => {
  const overlay = document.createElement('img')
  overlay.className = 'demo-img watermark-overlay'
  overlay.src = URL.createObjectURL(new Blob([pngData], { type: 'image/png' }))
  overlay.style.opacity = 0.5
  mediaContainer.prepend(overlay)
  overlay.onload = () => URL.revokeObjectURL(overlay.src)
}

const requestOverlays = async () => {
  try {
    enableForm(false)
    loadingDialog.showModal()
    const settings = getSettings()
    saveSettings(settings)

    const { numOverlays } = settings
    for (let i = 0; i < numOverlays; i++) {
      loadingDialog.innerText = `Requesting overlay ${i + 1} of ${numOverlays}`
      const overlayData = await castLabsService.getOverlays(settings)
      addOverlay(overlayData)
    }

    loadingDialog.close()
    startSubscriber()
  } catch (e) {
    const message = 'Could not acquire overlays: ' + e.message
    console.error(message)
    alert(message)
    loadingDialog.close()
    enableForm(true)
  }
}

const startSubscriber = async () => {
  const { stream1: streamName, preferWhipWhep } = configuration
  try {
    const { WHEPClient, RTCSubscriber } = red5prosdk
    const { protocol, port } = getSocketLocationFromProtocol()
    const rtcConfig = {
      ...configuration,
      ...defaultConfiguration,
      ...getAuthenticationParams(),
      protocol,
      port,
      streamName,
    }
    targetSubscriber = preferWhipWhep ? new WHEPClient() : new RTCSubscriber()
    targetSubscriber.on('*', onSubscribeEvent)
    await targetSubscriber.init(rtcConfig)
    await targetSubscriber.subscribe()
    onSubscribeSuccess(targetSubscriber)
  } catch (e) {
    const message = 'Could not start publisher: ' + e.message
    console.error(message)
    alert(message)
    onSubscribeFail(e.message)
  }
}

const unsubscribe = async () => {
  try {
    if (targetSubscriber) {
      targetSubscriber.off('*', onSubscribeEvent)
      await targetSubscriber.unsubscribe()
      onUnsubscribeSuccess()
    }
  } catch (error) {
    var jsonError =
      typeof error === 'string' ? error : JSON.stringify(error, 2, null)
    onUnsubscribeFail('Unmount Error ' + jsonError)
  } finally {
    targetSubscriber = undefined
  }
}

let shuttingDown = false
const shutdown = async () => {
  if (shuttingDown) return
  shuttingDown = true
  window.untrackBitrate()
  await unsubscribe()
}
window.addEventListener('pagehide', shutdown)
window.addEventListener('beforeunload', shutdown)

startButton.addEventListener('click', () => requestOverlays())
fillSettings()
