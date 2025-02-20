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

let stream
let targetPublisher

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
  streamMode: configuration.recordBroadcast ? 'record' : 'live',
}

const mediaConstraints = {
  audio: configuration.useAudio ? configuration.mediaConstraints.audio : false,
  video: configuration.useVideo ? configuration.mediaConstraints.video : false,
}

const onPublisherEvent = (event) => {
  const { type } = event
  console.log('[Red5ProPublisher] ' + type + '.')
  updateStatusFromEvent(event)
}
const onPublishFail = (message) => {
  console.error('[Red5ProPublisher] Publish Error :: ' + message)
}
const onPublishSuccess = (publisher) => {
  console.log('[Red5ProPublisher] Publish Complete.')
  try {
    const pc = publisher.getPeerConnection()
    const stream = publisher.getMediaStream()
    window.trackBitrate(pc, onBitrateUpdate, onResolutionUpdate)
    statisticsField.classList.remove('hidden')
    stream.getVideoTracks().forEach((track) => {
      var settings = track.getSettings()
      onResolutionUpdate(settings.width, settings.height)
    })
  } catch (e) {
    // no tracking for you!
  }
}
const onUnpublishFail = (message) => {
  console.error('[Red5ProPublisher] Unpublish Error :: ' + message)
}
const onUnpublishSuccess = () => {
  console.log('[Red5ProPublisher] Unpublish Complete.')
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
    startPublisher(stream)
  } catch (e) {
    const message = 'Could not acquire overlays: ' + e.message
    console.error(message)
    alert(message)
    loadingDialog.close()
    enableForm(true)
  }
}

const startPublisher = async (stream) => {
  const { stream1: streamName, preferWhipWhep } = configuration
  try {
    const { WHIPClient, RTCPublisher } = red5prosdk
    const { protocol, port } = getSocketLocationFromProtocol()
    const rtcConfig = {
      ...configuration,
      ...defaultConfiguration,
      ...getAuthenticationParams(),
      protocol,
      port,
      streamName,
    }
    targetPublisher = preferWhipWhep ? new WHIPClient() : new RTCPublisher()
    targetPublisher.on('*', onPublisherEvent)
    await targetPublisher.initWithStream(rtcConfig, stream)
    await targetPublisher.publish()
    onPublishSuccess(targetPublisher)
  } catch (e) {
    const message = 'Could not start publisher: ' + e.message
    console.error(message)
    alert(message)
    onPublishFail(e.message)
  }
}

const startPreview = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia(mediaConstraints)
    document.querySelector('#red5pro-publisher').srcObject = stream
    enableForm(true)
  } catch (e) {
    const message = 'Could not acquire media: ' + e.message
    console.error(message)
    alert(message)
  }
}

const unpublish = async () => {
  try {
    if (targetPublisher) {
      targetPublisher.off('*', onPublisherEvent)
      await targetPublisher.unpublish()
      onUnpublishSuccess()
    }
  } catch (error) {
    var jsonError =
      typeof error === 'string' ? error : JSON.stringify(error, 2, null)
    onUnpublishFail('Unmount Error ' + jsonError)
  } finally {
    targetPublisher = undefined
  }
}

let shuttingDown = false
const shutdown = async () => {
  if (shuttingDown) return
  shuttingDown = true
  window.untrackBitrate()
  await unpublish()
}
window.addEventListener('pagehide', shutdown)
window.addEventListener('beforeunload', shutdown)

startButton.addEventListener('click', () => requestOverlays())
fillSettings()
startPreview()
