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
import '@/components/r5-publisher-stats'
import '@/components/r5-subscriber-link'
import type { R5PublisherStatsElement } from '@/components/r5-publisher-stats'
import type { R5SubscriberLinkElement } from '@/components/r5-subscriber-link'
import {
  applyTheme,
  loadSettings,
  resolveConnectionParamsFromSettings,
  resolveEndpointFromSettings,
  resolveRtcConfigurationFromSettings,
  resolveStatisticsConfigurationFromSettings,
  resolveStreamManagerAdminCredentialsFromSettings,
  type Settings,
} from '@/settings'
import {
  deleteAbrProvision,
  postAbrProvisions,
  type AbrProvisionLevel,
  type AbrProvision,
  ProvisionAlreadyExistsError,
} from '@/service/stream-manager'
import { DEFAULT_AUDIO_BITRATE_KBPS } from '@/lib/publish-presets'
import { wireExampleLog } from '@/lib/example-log'
import { updateSubscriberLink } from '@/lib/example-links'

const KEYFRAME_INTERVAL_MS = 2000
const TARGET_FRAME_RATE = 30

const sdk = window.red5prosdk
sdk.setLogLevel('debug')

let settings = loadSettings()
applyTheme(settings.theme)

let publisher: WHIPClient | null = null
let previewStream: MediaStream | null = null
// let whipEndpoint: string | null = null

const SUBSCRIBER_EXAMPLE_PATH = '../whep-basic/index.html'

const formEl = document.getElementById('abr-provisions-form') as HTMLFormElement
const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement
const connectionInfoEl = document.getElementById('connection-info') as HTMLParagraphElement
const promptEl = document.getElementById('prompt') as HTMLParagraphElement
const publisherSectionEl = document.getElementById('publisher-section') as HTMLElement
const publishBtn = document.getElementById('publish-btn') as HTMLButtonElement
const unpublishBtn = document.getElementById('unpublish-btn') as HTMLButtonElement
const publishStatusEl = document.getElementById('publish-status') as HTMLSpanElement
const publishEndpointEl = document.getElementById('publish-endpoint') as HTMLParagraphElement
const acceptedResolutionEl = document.getElementById('accepted-resolution') as HTMLParagraphElement
const publisherVideoEl = document.getElementById('publisher-video') as HTMLVideoElement
const publisherStatsEl = document.getElementById('publisher-stats') as R5PublisherStatsElement
const openSubscriberLinkEl = document.getElementById(
  'open-subscriber-link'
) as R5SubscriberLinkElement
const { log } = wireExampleLog()

const publisherFailureEvents = ['Publish.Fail', 'Connect.Failure', 'Publish.InvalidName']

function setPrompt(message: string, state?: 'progress' | 'success' | 'failure'): void {
  promptEl.textContent = message
  promptEl.className = 'prompt'
  if (state) {
    promptEl.classList.add(`prompt--${state}`)
  }
}

function setPublisherStatus(
  text: string,
  state: 'idle' | 'connecting' | 'connected' | 'error' | 'unknown'
): void {
  publishStatusEl.textContent = text
  if (state !== 'unknown') {
    publishStatusEl.className = `status status--${state}`
  }
}

function getSmCredentials(current: Settings): { username: string; password: string } | null {
  const admin = resolveStreamManagerAdminCredentialsFromSettings(current)
  if (admin) return admin
  if (current.useAuthentication && current.username && current.password) {
    return { username: current.username, password: current.password }
  }
  return null
}

function updateConnectionInfo(): void {
  if (!settings.host || !settings.streamName) {
    connectionInfoEl.textContent = 'Configure host and stream name in Settings'
    return
  }
  if (!settings.useStreamManager) {
    connectionInfoEl.textContent = 'Enable Stream Manager in Settings for this example'
    return
  }
  connectionInfoEl.textContent = `Node group: ${settings.nodeGroupName || 'default'} · Stream: ${settings.streamName}`
}

function refreshSubscriberLink(streamSettings: Settings): void {
  updateSubscriberLink(openSubscriberLinkEl, SUBSCRIBER_EXAMPLE_PATH, streamSettings)
}

function ensureCoreSettings(current: Settings): boolean {
  if (!current.host) {
    log('Missing host. Open Settings and configure host first.', 'error')
    return false
  }
  if (!current.streamName) {
    log('Missing stream name. Open Settings and configure stream name first.', 'error')
    return false
  }
  if (!current.useStreamManager) {
    log('Enable Stream Manager in Settings for this example.', 'error')
    return false
  }
  if (!getSmCredentials(current)) {
    log(
      'Stream Manager admin credentials required. Set Admin Username and Admin Password in Stream Manager Settings, or enable Authentication.',
      'error'
    )
    return false
  }
  return true
}

function readLevel(prefix: string, streamGuidBase: string, abrLevel: number): AbrProvisionLevel {
  const streamGuid = `${streamGuidBase}_${abrLevel}`
  const bitrate = Number((document.getElementById(`${prefix}-bitrate`) as HTMLInputElement).value)
  const width = Number((document.getElementById(`${prefix}-width`) as HTMLInputElement).value)
  const height = Number((document.getElementById(`${prefix}-height`) as HTMLInputElement).value)
  return {
    abrLevel,
    streamGuid,
    videoParams: { videoBitrate: bitrate, videoWidth: width, videoHeight: height },
  }
}

function collectAbrProvisions(): AbrProvisionLevel[] {
  const { app, streamName } = settings
  const streamGuid = `${app}/${streamName}`
  return [
    readLevel('high', streamGuid, 1),
    readLevel('mid', streamGuid, 2),
    readLevel('low', streamGuid, 3),
  ]
}

async function submitForm(provision: AbrProvision): Promise<void> {
  const credentials = getSmCredentials(settings)
  if (!credentials) {
    throw new Error('Stream Manager credentials are required')
  }

  await postAbrProvisions(credentials.username, credentials.password, settings, provision)
}

function stopPreviewStream(): void {
  if (!previewStream) return
  previewStream.getTracks().forEach((track) => track.stop())
  previewStream = null
  publisherVideoEl.srcObject = null
}

function resetPublisherUi(): void {
  void stopPublish()
  stopPreviewStream()
  // whipEndpoint = null
  publisherSectionEl.classList.add('is-hidden')
  publishEndpointEl.textContent = ''
  acceptedResolutionEl.textContent = 'Camera preview not started'
  setPublisherStatus('Preview Ready', 'idle')
  publishBtn.disabled = false
  unpublishBtn.disabled = true
  submitBtn.disabled = false
  openSubscriberLinkEl.disabled = true
}

function updateAcceptedResolutionDisplay(
  stream: MediaStream,
  requestedWidth: number,
  requestedHeight: number
): void {
  const track = stream.getVideoTracks()[0]
  if (!track) {
    acceptedResolutionEl.textContent = 'No video track available from camera.'
    return
  }

  const trackSettings = track.getSettings()
  const width = trackSettings.width ?? '—'
  const height = trackSettings.height ?? '—'
  const frameRate =
    typeof trackSettings.frameRate === 'number' ? `${Math.round(trackSettings.frameRate)}fps` : '—'

  acceptedResolutionEl.textContent = `Accepted: ${width}×${height} @ ${frameRate} (requested HIGH ${requestedWidth}×${requestedHeight} @ ${TARGET_FRAME_RATE}fps)`
}

async function acquirePreviewStream(width: number, height: number): Promise<MediaStream> {
  return navigator.mediaDevices.getUserMedia({
    audio: true,
    video: {
      width: { ideal: width },
      height: { ideal: height },
      frameRate: { ideal: TARGET_FRAME_RATE },
    },
  })
}

// async function resolveWhipEndpoint(): Promise<string> {
//   await new Promise((resolve) => window.setTimeout(resolve, PROVISION_PROPAGATION_DELAY_MS))
//   const origin = await getOriginForPublish(settings, true)
//   return resolveDirectNodeEndpointForHost(origin.serverAddress, settings, 'whip')
// }

async function setupPublisherPreview(highLevel: AbrProvisionLevel): Promise<void> {
  const { videoWidth, videoHeight, videoBitrate } = highLevel.videoParams

  publisherSectionEl.classList.remove('is-hidden')
  setPublisherStatus('Starting preview...', 'connecting')
  acceptedResolutionEl.textContent = 'Requesting camera...'

  try {
    // whipEndpoint = await resolveWhipEndpoint()
    publishEndpointEl.textContent = 'N/A' // whipEndpoint

    stopPreviewStream()
    previewStream = await acquirePreviewStream(videoWidth, videoHeight)
    publisherVideoEl.srcObject = previewStream
    updateAcceptedResolutionDisplay(previewStream, videoWidth, videoHeight)

    setPublisherStatus('Preview Ready', 'idle')
    publishBtn.disabled = false
    unpublishBtn.disabled = true
    log(
      `Publisher preview ready (${videoWidth}×${videoHeight}, ${Math.round(videoBitrate / 1000)} kbps target).`,
      'success'
    )
  } catch (error) {
    setPublisherStatus('Preview Error', 'error')
    publishBtn.disabled = true
    log(`Failed to start publisher preview: ${String(error)}`, 'error')
  }
}

function onPublisherEvent(event: Red5ProEvent): void {
  const { type } = event
  if (type === 'Publish.Start') {
    setPublisherStatus('Publishing', 'connected')
    publishBtn.disabled = true
    unpublishBtn.disabled = false
  } else if (publisherFailureEvents.includes(type)) {
    setPublisherStatus('Publish Error', 'error')
    publishBtn.disabled = false
    unpublishBtn.disabled = true
  } else if (type === 'Unpublish.Success') {
    setPublisherStatus('Preview Ready', 'idle')
    publishBtn.disabled = false
    unpublishBtn.disabled = true
  } else if (type === 'WebRTC.Endpoint.Changed') {
    const endpoint = event.data?.endpoint as string | undefined
    if (!endpoint) return
    publishEndpointEl.textContent = endpoint
  } else {
    setPublisherStatus(type, 'unknown')
  }
}

async function startPublish(highLevel: AbrProvisionLevel): Promise<void> {
  if (publisher || !previewStream) return

  publishBtn.disabled = true
  unpublishBtn.disabled = true
  setPublisherStatus('Connecting...', 'connecting')

  const { videoBitrate } = highLevel.videoParams
  const highGuid = highLevel.streamGuid
  const highPaths = highGuid.split('/')
  const highStreamName = highPaths.pop()
  const highApp = highPaths.join('/')
  const highSettings = {
    ...settings,
    streamName: highStreamName,
    app: highApp,
  } as Settings
  const endpoint = resolveEndpointFromSettings(highSettings, 'whip')
  const connectionParams = resolveConnectionParamsFromSettings(highSettings)
  const stats = resolveStatisticsConfigurationFromSettings(highSettings)
  const rtcConfiguration = resolveRtcConfigurationFromSettings(highSettings)

  try {
    publisher = new sdk.WHIPClient()
    publisher.on('*', (event) => {
      log(`[WHIP] ${event.type}`)
      onPublisherEvent(event)
    })

    await publisher.initWithStream(
      {
        endpoint,
        streamName: highStreamName,
        clearMediaOnUnpublish: false,
        mediaElementId: 'publisher-video',
        connectionParams: {
          ...connectionParams,
          transcode: true,
        },
        stats: stats ?? undefined,
        rtcConfiguration,
        bandwidth: {
          audio: DEFAULT_AUDIO_BITRATE_KBPS,
          video: Math.round(videoBitrate / 1000),
        },
        keyFramerate: KEYFRAME_INTERVAL_MS,
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
    refreshSubscriberLink(highSettings)
    openSubscriberLinkEl.disabled = false
    log(`Publishing ${highStreamName} to origin transcoder`, 'success')
  } catch (error) {
    setPublisherStatus('Publish Error', 'error')
    publishBtn.disabled = false
    unpublishBtn.disabled = true
    openSubscriberLinkEl.disabled = true
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
    publishBtn.disabled = false
    unpublishBtn.disabled = true
    openSubscriberLinkEl.disabled = true
    setPublisherStatus('Preview Ready', 'idle')
  }
}

let activeHighLevel: AbrProvisionLevel | null = null

async function onProvisionReady(provisionLevels: AbrProvisionLevel[]): Promise<void> {
  activeHighLevel = provisionLevels[0]
  await setupPublisherPreview(activeHighLevel)
}

async function onSubmit(event: SubmitEvent): Promise<void> {
  event.preventDefault()
  if (!ensureCoreSettings(settings)) return

  const provisionLevels = collectAbrProvisions()
  submitBtn.disabled = true
  resetPublisherUi()

  const { app, streamName, useAuthentication, username, password, token } = settings
  const provisionGuid = `${app}/${streamName}`
  const provision: AbrProvision = {
    credentials: useAuthentication ? { username, password, token } : undefined,
    messageType: 'ProvisionCommand' as const,
    provisionGuid,
    streams: provisionLevels,
  }

  try {
    setPrompt('Submitting ABR provisions...', 'progress')
    log(`Submitting ABR provisions: ${JSON.stringify(provision)}`)
    await submitForm(provision)
    setPrompt('ABR provisions submitted.', 'success')
    log('ABR provisions submitted successfully.', 'success')
    await onProvisionReady(provisionLevels)
  } catch (error) {
    if (error instanceof ProvisionAlreadyExistsError) {
      try {
        const credentials = getSmCredentials(settings)
        if (!credentials) {
          throw new Error('Stream Manager credentials are required')
        }
        setPrompt('ABR provisions already exist. Replacing...', 'progress')
        log('ABR provisions already exist. Deleting stale provision before retrying create.', 'info')
        await deleteAbrProvision(credentials.username, credentials.password, settings, provisionGuid)
        log('Existing ABR provision deleted. Retrying create.', 'info')
        await submitForm(provision)
        setPrompt('ABR provisions replaced.', 'success')
        log('ABR provisions replaced successfully.', 'success')
        await onProvisionReady(provisionLevels)
      } catch (replaceError) {
        setPrompt('Submit failed.', 'failure')
        log(`Replace existing provision failed: ${String(replaceError)}`, 'error')
        alert(`Replace existing provision failed: ${String(replaceError)}`)
        submitBtn.disabled = false
      }
    } else {
      setPrompt('Submit failed.', 'failure')
      log(`Submit failed: ${String(error)}`, 'error')
      alert(`Submit failed: ${String(error)}`)
      submitBtn.disabled = false
    }
  }
}

formEl.addEventListener('submit', (e) => {
  void onSubmit(e)
})

publishBtn.addEventListener('click', () => {
  if (!activeHighLevel) return
  void startPublish(activeHighLevel)
})

unpublishBtn.addEventListener('click', () => {
  void stopPublish()
})

document.addEventListener('webrtc-settings-applied', (e) => {
  settings = (e as CustomEvent).detail as Settings
  updateConnectionInfo()
  activeHighLevel = null
  resetPublisherUi()
  log(`Settings updated for stream "${settings.streamName}".`)
})

window.addEventListener('pagehide', () => {
  void stopPublish()
  stopPreviewStream()
})

window.addEventListener('beforeunload', () => {
  void stopPublish()
  stopPreviewStream()
})

updateConnectionInfo()
log('Transcoder (Form and Publish) loaded. Configure Settings, then submit ABR provisions.')
