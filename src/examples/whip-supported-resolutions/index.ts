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
import '@/components/r5-publish-mode'
import '@/components/r5-publisher-stats'
import '@/components/r5-subscriber-link'
import type { R5PublisherStatsElement } from '@/components/r5-publisher-stats'
import type { R5PublishModeElement, StreamMode } from '@/components/r5-publish-mode'
import type { R5SubscriberLinkElement } from '@/components/r5-subscriber-link'
import {
  applyTheme,
  loadSettings,
  resolveConnectionParamsFromSettings,
  resolveEndpointFromSettings,
  resolveRtcConfigurationFromSettings,
  resolveStatisticsConfigurationFromSettings,
  type Settings,
} from '@/settings'
import {
  WHIP_SUPPORTED_RESOLUTIONS,
  getWhipSupportedResolution,
  type WhipSupportedResolution,
} from '@/lib/whip-supported-resolutions'
import {
  DEFAULT_AUDIO_BITRATE_KBPS,
  DEFAULT_KEYFRAME_INTERVAL_SECONDS,
} from '@/lib/publish-presets'
import { wireExampleLog } from '@/lib/example-log'
import { updateSubscriberLink } from '@/lib/example-links'

const KEYFRAME_INTERVAL_MS = DEFAULT_KEYFRAME_INTERVAL_SECONDS * 1000
const SUBSCRIBER_EXAMPLE_PATH = '../whep-basic/index.html'

const sdk = window.red5prosdk
sdk.setLogLevel('debug')

let settings = loadSettings()
applyTheme(settings.theme)

let publisher: WHIPClient | null = null
let previewStream: MediaStream | null = null
let selectedDeviceId = ''
let selectedResolutionId: string | null = null
let supportedResolutionIds = new Set<string>()
let probing = false

const publishBtn = document.getElementById('publish-btn') as HTMLButtonElement
const unpublishBtn = document.getElementById('unpublish-btn') as HTMLButtonElement
const publishStatusEl = document.getElementById('publish-status') as HTMLSpanElement
const publisherStatsEl = document.getElementById('publisher-stats') as R5PublisherStatsElement
const connectionInfoEl = document.getElementById('connection-info') as HTMLParagraphElement
const publishModeEl = document.getElementById('publish-mode') as R5PublishModeElement
const mediaSetupSectionEl = document.getElementById('media-setup-section') as HTMLElement
const publishConfigSectionEl = document.getElementById('publish-config-section') as HTMLElement
const cameraSelectEl = document.getElementById('camera-select') as HTMLSelectElement
const probeStatusEl = document.getElementById('probe-status') as HTMLParagraphElement
const resolutionOptionsEl = document.getElementById('resolution-options') as HTMLFieldSetElement
const publisherVideoEl = document.getElementById('publisher-video') as HTMLVideoElement
const openSubscriberLinkEl = document.getElementById(
  'open-subscriber-link'
) as R5SubscriberLinkElement
const { log } = wireExampleLog()

const publisherFailureEvents = ['Publish.Fail', 'Connect.Failure', 'Publish.InvalidName']
const resolutionOptionEls = new Map<string, HTMLLabelElement>()
const resolutionRadioEls = new Map<string, HTMLInputElement>()

function setPublisherStatus(
  text: string,
  state: 'idle' | 'connecting' | 'connected' | 'error' | 'unknown'
): void {
  publishStatusEl.textContent = text
  if (state !== 'unknown') {
    publishStatusEl.className = `status status--${state}`
  }
}

function syncPublishControls(visible: boolean): void {
  mediaSetupSectionEl.classList.toggle('is-hidden', !visible)
  publishConfigSectionEl.classList.toggle('is-hidden', !visible)
  publishModeEl.enabled = visible
  cameraSelectEl.disabled = !visible || probing
  resolutionRadioEls.forEach((input, id) => {
    if (!visible) {
      input.disabled = true
      return
    }
    input.disabled = probing || !supportedResolutionIds.has(id)
  })
}

function updatePublishButtonState(): void {
  publishBtn.disabled =
    probing ||
    !!publisher ||
    !selectedResolutionId ||
    !supportedResolutionIds.has(selectedResolutionId) ||
    !previewStream
}

function updateConnectionInfo(): void {
  if (!settings.host || !settings.streamName) {
    connectionInfoEl.textContent = 'Configure host and stream name in Settings'
    return
  }
  connectionInfoEl.textContent = resolveEndpointFromSettings(settings, 'whip')
}

function refreshSubscriberLink(): void {
  updateSubscriberLink(openSubscriberLinkEl, SUBSCRIBER_EXAMPLE_PATH, settings)
}

function stopPreviewStream(): void {
  if (!previewStream) return
  previewStream.getTracks().forEach((track) => track.stop())
  previewStream = null
  publisherVideoEl.srcObject = null
  openSubscriberLinkEl.disabled = true
}

function setPreviewStream(stream: MediaStream): void {
  stopPreviewStream()
  previewStream = stream
  publisherVideoEl.srcObject = stream
}

function renderResolutionOptions(): void {
  WHIP_SUPPORTED_RESOLUTIONS.forEach((preset) => {
    const option = document.createElement('label')
    option.className = 'resolution-option resolution-option--unsupported'
    option.htmlFor = `resolution-${preset.id}`

    const input = document.createElement('input')
    input.type = 'radio'
    input.name = 'resolution'
    input.id = `resolution-${preset.id}`
    input.value = preset.id
    input.disabled = true
    input.addEventListener('change', () => {
      if (!input.checked || probing) return
      void selectResolution(preset.id)
    })

    const label = document.createElement('span')
    label.className = 'resolution-option__label'
    label.textContent = preset.label

    const meta = document.createElement('span')
    meta.className = 'resolution-option__meta'
    meta.textContent = `${preset.frameRate}fps · ${preset.bitrateKbps} kbps`

    option.appendChild(input)
    option.appendChild(label)
    option.appendChild(meta)
    resolutionOptionsEl.appendChild(option)

    resolutionOptionEls.set(preset.id, option)
    resolutionRadioEls.set(preset.id, input)
  })
}

function markResolutionSupported(id: string, supported: boolean): void {
  const option = resolutionOptionEls.get(id)
  const input = resolutionRadioEls.get(id)
  if (!option || !input) return

  option.classList.toggle('resolution-option--supported', supported)
  option.classList.toggle('resolution-option--unsupported', !supported)
  input.disabled = probing || !supported
}

function setSelectedResolution(id: string | null): void {
  selectedResolutionId = id
  resolutionRadioEls.forEach((input, resolutionId) => {
    input.checked = resolutionId === id
  })
  updatePublishButtonState()
}

async function acquireStreamForPreset(
  deviceId: string,
  preset: WhipSupportedResolution
): Promise<MediaStream> {
  return navigator.mediaDevices.getUserMedia({
    audio: true,
    video: {
      ...(deviceId ? { deviceId: { exact: deviceId } } : {}),
      width: { exact: preset.width },
      height: { exact: preset.height },
      frameRate: { ideal: preset.frameRate },
    },
  })
}

async function tryResolutionProbe(
  deviceId: string,
  preset: WhipSupportedResolution
): Promise<boolean> {
  try {
    await acquireStreamForPreset(deviceId, preset)
    return true
  } catch (error: unknown) {
    log(`Failed to acquire ${preset.label} for preview: ${String(error)}`, 'error')
    return false
  }
}

async function probeSupportedResolutions(deviceId: string): Promise<void> {
  if (probing) return

  probing = true
  supportedResolutionIds = new Set()
  setSelectedResolution(null)
  stopPreviewStream()
  WHIP_SUPPORTED_RESOLUTIONS.forEach(({ id }) => markResolutionSupported(id, false))
  syncPublishControls(true)
  updatePublishButtonState()

  probeStatusEl.textContent = 'Probing supported resolutions...'
  log(`Probing resolutions for camera ${deviceId || 'default'}.`)

  let highestSupportedId: string | null = null

  for (const preset of WHIP_SUPPORTED_RESOLUTIONS) {
    probeStatusEl.textContent = `Probing ${preset.label} (${preset.width}×${preset.height} exact)...`
    const supported = await tryResolutionProbe(deviceId, preset)
    markResolutionSupported(preset.id, supported)

    if (supported) {
      if (!highestSupportedId) {
        highestSupportedId = preset.id
      }
      supportedResolutionIds.add(preset.id)
      log(
        `Supported: ${preset.label} @ ${preset.frameRate}fps (${preset.bitrateKbps} kbps recommended).`,
        'success'
      )
    } else {
      log(`Not supported: ${preset.label} (${preset.width}×${preset.height} exact).`, 'info')
    }
  }

  probing = false
  syncPublishControls(true)

  if (highestSupportedId) {
    setSelectedResolution(highestSupportedId)
    selectResolution(highestSupportedId)
    probeStatusEl.textContent = `${supportedResolutionIds.size} supported resolution(s). Preview shows ${getWhipSupportedResolution(highestSupportedId)?.label}.`
    log(`Probe complete. ${supportedResolutionIds.size} resolution(s) available.`, 'success')
  } else {
    probeStatusEl.textContent = 'No supported resolutions found for this camera.'
    log('Probe complete. No resolutions were supported.', 'error')
  }

  updatePublishButtonState()
}

async function selectResolution(id: string): Promise<void> {
  if (probing || !supportedResolutionIds.has(id)) return

  const preset = getWhipSupportedResolution(id)
  if (!preset) return

  probeStatusEl.textContent = `Switching preview to ${preset.label}...`
  cameraSelectEl.disabled = true
  resolutionRadioEls.forEach((input) => {
    input.disabled = true
  })

  try {
    const stream = await acquireStreamForPreset(selectedDeviceId, preset)
    setPreviewStream(stream)
    setSelectedResolution(id)
    probeStatusEl.textContent = `Preview: ${preset.label} @ ${preset.frameRate}fps (${preset.bitrateKbps} kbps).`
    log(`Preview updated to ${preset.label}.`, 'success')
  } catch (error) {
    supportedResolutionIds.delete(id)
    markResolutionSupported(id, false)
    setSelectedResolution(null)
    stopPreviewStream()
    probeStatusEl.textContent = `Failed to acquire ${preset.label} for preview.`
    log(`Failed to switch to ${preset.label}: ${String(error)}`, 'error')
  } finally {
    if (!publisher) {
      cameraSelectEl.disabled = false
      resolutionRadioEls.forEach((input, resolutionId) => {
        input.disabled = probing || !supportedResolutionIds.has(resolutionId)
      })
    }
    updatePublishButtonState()
  }
}

async function loadCameras(): Promise<void> {
  if (!navigator.mediaDevices?.enumerateDevices) {
    probeStatusEl.textContent = 'Camera enumeration is not supported in this browser.'
    return
  }

  const devices = await navigator.mediaDevices.enumerateDevices()
  const videoInputs = devices.filter(({ kind }) => kind === 'videoinput')

  cameraSelectEl.innerHTML = ''
  if (videoInputs.length === 0) {
    const option = document.createElement('option')
    option.value = ''
    option.textContent = 'No camera found'
    cameraSelectEl.appendChild(option)
    cameraSelectEl.disabled = true
    return
  }

  videoInputs.forEach(({ deviceId, label }, index) => {
    const option = document.createElement('option')
    option.value = deviceId
    option.textContent = label || `Camera ${index + 1}`
    cameraSelectEl.appendChild(option)
  })

  selectedDeviceId = videoInputs[0].deviceId
  cameraSelectEl.value = selectedDeviceId
  await probeSupportedResolutions(selectedDeviceId)
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

function onPublisherEvent(event: Red5ProEvent): void {
  const { type } = event
  if (type === 'Publish.Start') {
    setPublisherStatus('Publishing', 'connected')
    publishBtn.disabled = true
    unpublishBtn.disabled = false
    syncPublishControls(false)
  } else if (type === 'Publish.Available') {
    refreshSubscriberLink()
    openSubscriberLinkEl.disabled = false
  } else if (publisherFailureEvents.includes(type)) {
    setPublisherStatus('Publish Error', 'error')
    publishBtn.disabled = false
    unpublishBtn.disabled = true
    syncPublishControls(true)
    updatePublishButtonState()
  } else if (type === 'Unpublish.Success') {
    setPublisherStatus('Publisher Idle', 'idle')
    publishBtn.disabled = false
    unpublishBtn.disabled = true
    syncPublishControls(true)
    updatePublishButtonState()
    openSubscriberLinkEl.disabled = true
  } else if (type === 'WebRTC.Endpoint.Changed') {
    const endpoint = event.data?.endpoint as string | undefined
    if (!endpoint) return
    publisherStatsEl.setEndpoint(endpoint)
  } else {
    setPublisherStatus(type, 'unknown')
  }
}

async function startPublish(): Promise<void> {
  if (publisher || !previewStream || !selectedResolutionId) return
  if (!ensureCoreSettings(settings)) return

  const preset = getWhipSupportedResolution(selectedResolutionId)
  if (!preset) return

  publishBtn.disabled = true
  unpublishBtn.disabled = true
  syncPublishControls(false)
  setPublisherStatus('Connecting...', 'connecting')

  try {
    const { streamName } = settings
    const endpoint = resolveEndpointFromSettings(settings, 'whip')
    const connectionParams = resolveConnectionParamsFromSettings(settings)
    const stats = resolveStatisticsConfigurationFromSettings(settings)
    const rtcConfiguration = resolveRtcConfigurationFromSettings(settings)
    const streamMode = publishModeEl.streamMode as StreamMode

    publisher = new sdk.WHIPClient()
    publisher.on('*', (event) => {
      log(`[WHIP] ${event.type}`)
      onPublisherEvent(event)
    })

    await publisher.initWithStream(
      {
        endpoint,
        streamName,
        clearMediaOnUnpublish: false,
        mediaElementId: 'publisher-video',
        connectionParams,
        stats: stats ?? undefined,
        rtcConfiguration,
        bandwidth: {
          audio: DEFAULT_AUDIO_BITRATE_KBPS,
          video: preset.bitrateKbps,
        },
        keyFramerate: KEYFRAME_INTERVAL_MS,
        streamMode,
      },
      previewStream
    )
    await publisher.publish()

    const peerConnection = publisher.getPeerConnection()
    if (peerConnection) {
      publisherStatsEl.setPeerConnection(peerConnection)
      publisherStatsEl.start()
    }

    setPublisherStatus('Publishing', 'connected')
    unpublishBtn.disabled = false
    log(
      `Publishing ${streamName} at ${preset.label} (${preset.frameRate}fps, ${preset.bitrateKbps} kbps).`,
      'success'
    )
  } catch (error) {
    setPublisherStatus('Publish Error', 'error')
    syncPublishControls(true)
    updatePublishButtonState()
    publisher = null
    log(`Publish failed: ${String(error)}`, 'error')
  }
}

async function stopPublish(): Promise<void> {
  if (!publisher) return

  unpublishBtn.disabled = true
  try {
    await publisher.unpublish()
    log('Publish stopped', 'success')
  } catch (error) {
    log(`Unpublish failed: ${String(error)}`, 'error')
  } finally {
    publisherStatsEl.stop()
    publisherStatsEl.setPeerConnection(null)
    publisher = null
    unpublishBtn.disabled = true
    syncPublishControls(true)
    setPublisherStatus('Publisher Idle', 'idle')
    updatePublishButtonState()
    openSubscriberLinkEl.disabled = true
  }
}

cameraSelectEl.addEventListener('change', () => {
  selectedDeviceId = cameraSelectEl.value
  void probeSupportedResolutions(selectedDeviceId)
})

publishBtn.addEventListener('click', () => {
  void startPublish()
})

unpublishBtn.addEventListener('click', () => {
  void stopPublish()
})

document.addEventListener('webrtc-settings-applied', (e) => {
  settings = (e as CustomEvent).detail as Settings
  refreshSubscriberLink()
  updateConnectionInfo()
  log(`Settings updated: ${resolveEndpointFromSettings(settings, 'whip')} (${settings.streamName})`)
})

window.addEventListener('pagehide', () => {
  void stopPublish()
  stopPreviewStream()
})

window.addEventListener('beforeunload', () => {
  void stopPublish()
  stopPreviewStream()
})

renderResolutionOptions()
syncPublishControls(true)
updatePublishButtonState()
refreshSubscriberLink()
updateConnectionInfo()
void loadCameras()
log('WHIP Supported Resolutions loaded. Select a camera to probe exact resolution support.')
