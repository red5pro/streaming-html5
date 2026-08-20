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
import '@/components/r5-publish-settings'
import '@/components/r5-publish-mode'
import '@/components/r5-publisher-stats'
import '@/components/r5-subscriber-link'
import type { R5PublishSettingsElement } from '@/components/r5-publish-settings'
import type { R5PublisherStatsElement } from '@/components/r5-publisher-stats'
import type { R5PublishModeElement, StreamMode } from '@/components/r5-publish-mode'
import type { R5SubscriberLinkElement } from '@/components/r5-subscriber-link'
import {
  applyTheme,
  loadSettings,
  resolveEndpointFromSettings,
  resolveConnectionParamsFromSettings,
  resolveStatisticsConfigurationFromSettings,
  resolveRtcConfigurationFromSettings,
  resolveStreamManagerAdminCredentialsFromSettings,
  type Settings,
} from '@/settings'
import { wireExampleLog } from '@/lib/example-log'
import { updateSubscriberLink } from '@/lib/example-links'
import { postSocialPusherProvision } from '@/lib/social-pusher-provision'
import {
  listProvisions,
  type ListProvisionsResponse,
  type RestreamEndpoint,
} from '@/service/restreamer'

const sdk = window.red5prosdk
sdk.setLogLevel('debug')

const DEFAULT_DESTINATION_URI = ''

let settings = loadSettings()
applyTheme(settings.theme)

let publisher: WHIPClient | null = null
let isForwarding = false
let socialPusherRequestInFlight = false
let provisionsListRequestInFlight = false

const publishBtn = document.getElementById('publish-btn') as HTMLButtonElement
const unpublishBtn = document.getElementById('unpublish-btn') as HTMLButtonElement
const publishStatusEl = document.getElementById('publish-status') as HTMLSpanElement
const publisherStatsEl = document.getElementById('publisher-stats') as R5PublisherStatsElement
const publishSettingsEl = document.getElementById('publish-settings') as R5PublishSettingsElement
const publishModeEl = document.getElementById('publish-mode') as R5PublishModeElement
const publishConfigSectionEl = document.getElementById('publish-config-section') as HTMLElement
const socialPusherSectionEl = document.getElementById('social-pusher-section') as HTMLElement
const socialPusherStatusEl = document.getElementById('social-pusher-status') as HTMLSpanElement
const socialPusherFormEl = document.getElementById('social-pusher-form') as HTMLFormElement
const socialPusherDestinationUriInputEl = document.getElementById(
  'social-pusher-destination-uri-input'
) as HTMLInputElement
const socialPusherStreamKeyInputEl = document.getElementById(
  'social-pusher-stream-key-input'
) as HTMLInputElement
const socialPusherSubmitBtn = document.getElementById(
  'social-pusher-submit-btn'
) as HTMLButtonElement
const provisionsListSectionEl = document.getElementById('provisions-list-section') as HTMLElement
const provisionsListStatusEl = document.getElementById('provisions-list-status') as HTMLSpanElement
const provisionsListBtn = document.getElementById('provisions-list-btn') as HTMLButtonElement
const provisionsListOutputEl = document.getElementById('provisions-list-output') as HTMLElement
const openSubscriberLinkEl = document.getElementById(
  'open-subscriber-link'
) as R5SubscriberLinkElement
const { log } = wireExampleLog()

const publisherFailureEvents = ['Publish.Fail', 'Connect.Failure', 'Publish.InvalidName']
const SUBSCRIBER_EXAMPLE_PATH = '../whep-basic/index.html'

function setPublisherStatus(
  text: string,
  state: 'idle' | 'connecting' | 'connected' | 'error' | 'unknown'
): void {
  publishStatusEl.textContent = text
  if (state !== 'unknown') {
    publishStatusEl.className = `status status--${state}`
  }
}

function setSocialPusherStatus(
  text: string,
  state: 'idle' | 'connecting' | 'connected' | 'error' | 'unknown'
): void {
  socialPusherStatusEl.textContent = text
  if (state !== 'unknown') {
    socialPusherStatusEl.className = `status status--${state}`
  }
}

function setProvisionsListStatus(
  text: string,
  state: 'idle' | 'connecting' | 'connected' | 'error' | 'unknown'
): void {
  provisionsListStatusEl.textContent = text
  if (state !== 'unknown') {
    provisionsListStatusEl.className = `status status--${state}`
  }
}

function resetProvisionsListOutput(): void {
  provisionsListOutputEl.replaceChildren()
  const placeholder = document.createElement('p')
  placeholder.className = 'provisions-list-output__placeholder'
  placeholder.textContent = 'No provisions loaded. Click List Provisions to fetch endpoints.'
  provisionsListOutputEl.appendChild(placeholder)
  setProvisionsListStatus('Not loaded', 'idle')
}

function renderProvisionsList(response: ListProvisionsResponse): void {
  provisionsListOutputEl.replaceChildren()

  const endpoints = response.endpoints ?? []
  if (endpoints.length === 0) {
    const empty = document.createElement('p')
    empty.className = 'provisions-list-output__placeholder'
    empty.textContent = response.message
      ? `${response.message}: no endpoints returned.`
      : 'No endpoints returned.'
    provisionsListOutputEl.appendChild(empty)
    return
  }

  const table = document.createElement('table')
  table.className = 'provisions-list-table'

  const thead = document.createElement('thead')
  thead.innerHTML = `
    <tr>
      <th>Guid</th>
      <th>Stream</th>
      <th>RTMP URI</th>
      <th>Active</th>
      <th>Persist</th>
      <th>Error</th>
    </tr>
  `
  table.appendChild(thead)

  const tbody = document.createElement('tbody')
  for (const endpoint of endpoints) {
    tbody.appendChild(createProvisionRow(endpoint))
  }
  table.appendChild(tbody)
  provisionsListOutputEl.appendChild(table)
}

function createProvisionRow(endpoint: RestreamEndpoint): HTMLTableRowElement {
  const row = document.createElement('tr')

  const guidCell = document.createElement('td')
  guidCell.className = 'provisions-list-table__mono'
  guidCell.textContent = endpoint.guid
  row.appendChild(guidCell)

  const streamCell = document.createElement('td')
  streamCell.textContent = `${endpoint.context}/${endpoint.name}`
  row.appendChild(streamCell)

  const rtmpCell = document.createElement('td')
  rtmpCell.className = 'provisions-list-table__mono'
  rtmpCell.textContent = endpoint.rtmpUri
  row.appendChild(rtmpCell)

  const activeCell = document.createElement('td')
  const activeBadge = document.createElement('span')
  activeBadge.className = endpoint.isActive
    ? 'provisions-list-table__badge provisions-list-table__badge--active'
    : 'provisions-list-table__badge provisions-list-table__badge--inactive'
  activeBadge.textContent = endpoint.isActive ? 'Active' : 'Inactive'
  activeCell.appendChild(activeBadge)
  row.appendChild(activeCell)

  const persistCell = document.createElement('td')
  persistCell.textContent = endpoint.persist ?? '—'
  row.appendChild(persistCell)

  const errorCell = document.createElement('td')
  if (endpoint.error) {
    const errorBadge = document.createElement('span')
    errorBadge.className = 'provisions-list-table__badge provisions-list-table__badge--error'
    errorBadge.textContent = 'Error'
    errorBadge.title = endpoint.error
    errorCell.appendChild(errorBadge)
  } else {
    errorCell.className = 'provisions-list-table__empty'
    errorCell.textContent = '—'
  }
  row.appendChild(errorCell)

  return row
}

async function handleListProvisions(): Promise<void> {
  if (provisionsListRequestInFlight) return
  if (!ensureCoreSettings(settings)) return

  provisionsListRequestInFlight = true
  provisionsListBtn.disabled = true
  setProvisionsListStatus('Loading...', 'connecting')
  log('Sending restream list request...')

  try {
    const response = await listProvisions(settings)
    renderProvisionsList(response)
    const count = response.endpoints?.length ?? 0
    setProvisionsListStatus(`${count} endpoint${count === 1 ? '' : 's'}`, 'connected')
    log(`Restream list returned ${count} endpoint${count === 1 ? '' : 's'}.`, 'success')
  } catch (error) {
    resetProvisionsListOutput()
    setProvisionsListStatus('Request failed', 'error')
    log(`Restream list failed: ${String(error)}`, 'error')
  } finally {
    provisionsListRequestInFlight = false
    provisionsListBtn.disabled = false
  }
}

function syncProvisionsListSection(visible: boolean): void {
  provisionsListSectionEl.classList.toggle('is-hidden', !visible)
  if (!visible) {
    resetProvisionsListOutput()
    provisionsListBtn.disabled = false
    provisionsListRequestInFlight = false
  }
}

function defaultStreamKey(streamName: string): string {
  return `${streamName}Social`
}

function syncStreamKeyDefault(): void {
  if (isForwarding) return
  socialPusherStreamKeyInputEl.value = defaultStreamKey(settings.streamName)
}

function syncSocialPusherFormState(forwarding: boolean): void {
  isForwarding = forwarding
  const inputsDisabled = forwarding || socialPusherRequestInFlight
  socialPusherDestinationUriInputEl.disabled = inputsDisabled
  socialPusherStreamKeyInputEl.disabled = inputsDisabled
  socialPusherSubmitBtn.textContent = forwarding ? 'Stop Forwarding' : 'Start Forwarding'
  socialPusherSubmitBtn.disabled = socialPusherRequestInFlight

  if (!socialPusherRequestInFlight) {
    if (forwarding) {
      setSocialPusherStatus('Forwarding active', 'connected')
    } else if (!socialPusherSectionEl.classList.contains('is-hidden')) {
      setSocialPusherStatus('Ready', 'idle')
    }
  }
}

function resetSocialPusherForm(): void {
  socialPusherRequestInFlight = false
  socialPusherDestinationUriInputEl.value = DEFAULT_DESTINATION_URI
  syncStreamKeyDefault()
  syncSocialPusherFormState(false)
  setSocialPusherStatus('Idle', 'idle')
}

function syncSocialPusherSection(visible: boolean): void {
  socialPusherSectionEl.classList.toggle('is-hidden', !visible)
  syncProvisionsListSection(visible)
  if (!visible) {
    resetSocialPusherForm()
  } else if (!isForwarding) {
    setSocialPusherStatus('Ready', 'idle')
  }
}

function syncPublishConfigSection(visible: boolean): void {
  publishSettingsEl.enabled = visible
  publishModeEl.enabled = visible
  publishConfigSectionEl.classList.toggle('is-hidden', !visible)
}

function refreshSubscriberLink(): void {
  updateSubscriberLink(openSubscriberLinkEl, SUBSCRIBER_EXAMPLE_PATH, settings)
}

function getSmCredentials(s: Settings): { username: string; password: string } | null {
  const admin = resolveStreamManagerAdminCredentialsFromSettings(s)
  if (admin) return admin
  if (s.useAuthentication && s.username && s.password) {
    return { username: s.username, password: s.password }
  }
  return null
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
  if (!s.app) {
    log('Missing app. Open Settings and configure app first.', 'error')
    return false
  }
  if (s.useStreamManager && !getSmCredentials(s)) {
    log(
      'Stream Manager admin credentials required. Set Admin Username and Admin Password in Stream Manager Settings, or enable Authentication.',
      'error'
    )
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
    syncPublishConfigSection(false)
    syncSocialPusherSection(true)
  } else if (type === 'Publish.Available') {
    refreshSubscriberLink()
    openSubscriberLinkEl.disabled = false
  } else if (publisherFailureEvents.includes(type)) {
    setPublisherStatus('Publish Error', 'error')
    publishBtn.disabled = false
    unpublishBtn.disabled = true
    syncPublishConfigSection(true)
    syncSocialPusherSection(false)
  } else if (type === 'Unpublish.Success') {
    setPublisherStatus('Publisher Idle', 'idle')
    publishBtn.disabled = false
    unpublishBtn.disabled = true
    syncPublishConfigSection(true)
    syncSocialPusherSection(false)
  } else if (type === 'WebRTC.Endpoint.Changed') {
    const endpoint = event.data?.endpoint as string | undefined
    if (!endpoint) return
    publisherStatsEl.setEndpoint(endpoint)
  } else {
    setPublisherStatus(type, 'unknown')
  }
}

async function startPublish(): Promise<void> {
  if (publisher) return
  if (!ensureCoreSettings(settings)) return

  publishBtn.disabled = true
  unpublishBtn.disabled = true
  syncPublishConfigSection(false)
  syncSocialPusherSection(false)
  setPublisherStatus('Connecting...', 'connecting')

  try {
    const { streamName } = settings
    const endpoint = resolveEndpointFromSettings(settings, 'whip')
    const connectionParams = resolveConnectionParamsFromSettings(settings)
    const stats = resolveStatisticsConfigurationFromSettings(settings)
    const rtcConfiguration = resolveRtcConfigurationFromSettings(settings)
    const streamMode = publishModeEl.streamMode as StreamMode
    const mediaStream = await publishSettingsEl.refreshStream()
    const { videoEnabled, audioEnabled } = publishSettingsEl.getMediaConfig()

    if (!mediaStream) {
      throw new Error('Unable to acquire media stream. Check Publish Settings.')
    }
    if (!videoEnabled && !audioEnabled) {
      throw new Error('Enable video or audio in Publish Settings.')
    }

    const { bandwidth, keyFramerate } = publishSettingsEl.getPublisherOptions()
    publisher = new sdk.WHIPClient()
    publisher.on('*', (event) => {
      if (event.type === 'Publish.Time.Update') return
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
        bandwidth,
        keyFramerate,
        streamMode,
      },
      mediaStream
    )
    await publisher.publish()

    const peerConnection = publisher.getPeerConnection()
    if (peerConnection) {
      publisherStatsEl.setPeerConnection(peerConnection)
      publisherStatsEl.start()
    }

    setPublisherStatus('Publishing', 'connected')
    unpublishBtn.disabled = false
    syncPublishConfigSection(false)
    syncSocialPusherSection(true)
    log(`Publishing ${settings.streamName} to ${settings.host}`, 'success')
    // @ts-expect-error - global variable for debugging
    window.r5publisher = publisher
  } catch (error) {
    setPublisherStatus('Publish Error', 'error')
    publishBtn.disabled = false
    unpublishBtn.disabled = true
    syncPublishConfigSection(true)
    syncSocialPusherSection(false)
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
    syncPublishConfigSection(true)
    syncSocialPusherSection(false)
    setPublisherStatus('Publisher Idle', 'idle')
    openSubscriberLinkEl.disabled = true
    // @ts-expect-error - global variable for debugging
    delete window.r5publisher
  }
}

async function handleSocialPusherSubmit(event: SubmitEvent): Promise<void> {
  event.preventDefault()
  if (!publisher || socialPusherRequestInFlight) return
  if (!ensureCoreSettings(settings)) return

  const destinationUri = socialPusherDestinationUriInputEl.value.trim()
  const streamKey = socialPusherStreamKeyInputEl.value.trim()
  const startingForward = !isForwarding
  const actionLabel = startingForward ? 'provision.create' : 'provision.delete'

  if (!destinationUri) {
    log('Destination URI is required for social forwarding.', 'error')
    setSocialPusherStatus('Destination URI required', 'error')
    return
  }
  if (!streamKey) {
    log('Stream key is required for social forwarding.', 'error')
    setSocialPusherStatus('Stream key required', 'error')
    return
  }

  socialPusherRequestInFlight = true
  syncSocialPusherFormState(isForwarding)
  setSocialPusherStatus(
    startingForward ? 'Starting forwarding...' : 'Stopping forwarding...',
    'connecting'
  )
  log(`Sending ${actionLabel} restream request...`)

  try {
    const result = await postSocialPusherProvision(
      {
        settings,
        destinationUri,
        streamKey,
        isForwarding,
      },
      ({ status }) => {
        if (status > 0) {
          log(`Social pusher response: ${status}`)
        }
      }
    )

    if (result.ok) {
      syncSocialPusherFormState(startingForward)
      const successMessage = startingForward
        ? 'Forwarding started successfully'
        : 'Forwarding stopped successfully'
      setSocialPusherStatus(
        startingForward ? 'Forwarding active' : 'Ready',
        startingForward ? 'connected' : 'idle'
      )
      log(
        `${actionLabel} succeeded (${result.status}) after ${result.attempts} attempt${result.attempts === 1 ? '' : 's'}`,
        'success'
      )
      log(successMessage, 'success')
      void handleListProvisions()
      return
    }

    setSocialPusherStatus(
      result.error ? `Request failed: ${result.error}` : 'Request failed',
      'error'
    )
    const errorMessage = result.error ? `Request failed: ${result.error}` : 'Request failed'
    log(errorMessage, 'error')
    alert(errorMessage)
  } catch (error) {
    setSocialPusherStatus('Request failed', 'error')
    log(`${actionLabel} failed: ${String(error)}`, 'error')
  } finally {
    socialPusherRequestInFlight = false
    syncSocialPusherFormState(isForwarding)
  }
}

publishBtn.addEventListener('click', () => {
  void startPublish()
})

unpublishBtn.addEventListener('click', () => {
  void stopPublish()
})

socialPusherFormEl.addEventListener('submit', (event) => {
  void handleSocialPusherSubmit(event)
})

provisionsListBtn.addEventListener('click', () => {
  void handleListProvisions()
})

document.addEventListener('webrtc-settings-applied', (e) => {
  settings = (e as CustomEvent).detail as Settings
  syncStreamKeyDefault()
  log(`Settings updated: ${resolveEndpointFromSettings(settings, 'whip')} (${settings.streamName})`)
})

window.addEventListener('pagehide', () => {
  void stopPublish()
})

window.addEventListener('beforeunload', () => {
  void stopPublish()
})

syncStreamKeyDefault()
resetProvisionsListOutput()
log(
  'WHIP Social Pusher loaded. Configure Settings, adjust publish controls, then start publishing.'
)
