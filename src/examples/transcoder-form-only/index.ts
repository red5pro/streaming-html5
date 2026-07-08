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
import {
  applyTheme,
  loadSettings,
  resolveDirectNodeEndpointForHost,
  resolveStreamManagerAdminCredentialsFromSettings,
  type Settings,
} from '@/settings'
import {
  postAbrProvisions,
  type AbrProvisionLevel,
  type AbrProvision,
  // getAllEdges,
  getOriginForPublish,
  ProvisionAlreadyExistsError,
} from '@/service/stream-manager'
import { wireExampleLog } from '@/lib/example-log'

// const TIER_LABELS = ['HIGH', 'MID', 'LOW'] as const

let settings = loadSettings()
applyTheme(settings.theme)

const formEl = document.getElementById('abr-provisions-form') as HTMLFormElement
const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement
const connectionInfoEl = document.getElementById('connection-info') as HTMLParagraphElement
const promptEl = document.getElementById('prompt') as HTMLParagraphElement
const { log } = wireExampleLog()
const rtmpUrlSectionEl = document.getElementById('rtmp-url-section') as HTMLElement
const rtmpUrlListEl = document.getElementById('rtmp-url-list') as HTMLUListElement
const publisherUrlSectionEl = document.getElementById('publisher-url-section') as HTMLElement
const publisherUrlListEl = document.getElementById('publisher-url-list') as HTMLUListElement

function setPrompt(message: string, state?: 'progress' | 'success' | 'failure'): void {
  promptEl.textContent = message
  promptEl.className = 'prompt'
  if (state) {
    promptEl.classList.add(`prompt--${state}`)
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

// function buildVariantStreamGuids(provisionGuid: string): string[] {
//   return TIER_LABELS.map((_, index) => `${provisionGuid}_${index + 1}`)
// }

function buildRtmpUrl(serverAddress: string, streamGuid: string): string {
  return `rtmp://${serverAddress}:1935/${streamGuid}`
}

interface UrlListEntry {
  label: string
  streamGuid?: string
  url: string
}

function clearUrlList(sectionEl: HTMLElement, listEl: HTMLElement): void {
  listEl.innerHTML = ''
  sectionEl.classList.add('is-hidden')
}

function clearResultLists(): void {
  clearUrlList(rtmpUrlSectionEl, rtmpUrlListEl)
  clearUrlList(publisherUrlSectionEl, publisherUrlListEl)
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

function renderUrlList(
  sectionEl: HTMLElement,
  listEl: HTMLElement,
  entries: UrlListEntry[],
  copyContext: string
): void {
  listEl.innerHTML = ''

  entries.forEach(({ label, streamGuid, url }) => {
    const item = document.createElement('li')
    item.className = 'rtmp-url-list__item'

    const labelEl = document.createElement('span')
    labelEl.className = 'rtmp-url-list__label'
    labelEl.textContent = label

    item.appendChild(labelEl)

    if (streamGuid) {
      const guidEl = document.createElement('span')
      guidEl.className = 'rtmp-url-list__guid'
      guidEl.textContent = streamGuid
      item.appendChild(guidEl)
    }

    const urlEl = document.createElement('span')
    urlEl.className = 'rtmp-url-list__url'
    urlEl.textContent = url

    const copyBtn = document.createElement('button')
    copyBtn.type = 'button'
    copyBtn.className = 'rtmp-url-list__copy'
    copyBtn.textContent = 'Copy'
    copyBtn.setAttribute('aria-label', `Copy ${copyContext} URL for ${label}`)
    copyBtn.addEventListener('click', () => {
      void copyToClipboard(url).then((copied) => {
        if (!copied) {
          log(`Failed to copy ${copyContext} URL for ${label}.`, 'error')
          return
        }
        copyBtn.textContent = 'Copied'
        copyBtn.classList.add('is-copied')
        log(`Copied ${copyContext} URL for ${label}.`, 'success')
        window.setTimeout(() => {
          copyBtn.textContent = 'Copy'
          copyBtn.classList.remove('is-copied')
        }, 1500)
      })
    })

    item.appendChild(urlEl)
    item.appendChild(copyBtn)
    listEl.appendChild(item)
  })

  sectionEl.classList.remove('is-hidden')
}

// function renderRtmpUrlList(serverAddress: string, streamGuids: string[]): void {
//   const entries = streamGuids.map((streamGuid, index) => ({
//     label: TIER_LABELS[index],
//     url: buildRtmpUrl(serverAddress, streamGuid),
//   }))
//   renderUrlList(rtmpUrlSectionEl, rtmpUrlListEl, entries, 'RTMP subscriber')
// }

async function submitForm(provision: AbrProvision): Promise<void> {
  const credentials = getSmCredentials(settings)
  if (!credentials) {
    throw new Error('Stream Manager credentials are required')
  }

  await postAbrProvisions(credentials.username, credentials.password, settings, provision)
}

async function loadPublisherUrlsAfterProvision(topLevelStreamGuid: string): Promise<void> {
  await new Promise((resolve) => window.setTimeout(resolve, 2000))

  try {
    let paths = topLevelStreamGuid.split('/')
    const streamName = paths.pop()
    const app = paths.join('/')
    const origin = await getOriginForPublish({ ...settings, app, streamName: streamName! }, true)
    const streamGuid = topLevelStreamGuid
    const entries: UrlListEntry[] = [
      {
        label: 'WHIP',
        streamGuid,
        url: resolveDirectNodeEndpointForHost(
          origin.serverAddress,
          {
            ...settings,
            app,
            streamName: streamName!,
          },
          'whip'
        ),
      },
      {
        label: 'RTMP',
        streamGuid,
        url: buildRtmpUrl(origin.serverAddress, streamGuid),
      },
    ]
    renderUrlList(publisherUrlSectionEl, publisherUrlListEl, entries, 'publisher')
    log(`Publisher URLs ready on origin ${origin.serverAddress} (transcoder).`)
  } catch (error) {
    log(`Failed to resolve origin for publish: ${String(error)}`, 'error')
  }
}

// async function loadRtmpUrlsAfterProvision(provisionGuid: string): Promise<void> {
//   const credentials = getSmCredentials(settings)
//   if (!credentials) return

//   const edges = await getAllEdges(credentials.username, credentials.password, settings)
//   if (edges.length === 0) {
//     log('No in-service edge nodes found for RTMP URLs.', 'error')
//     return
//   }

//   const serverAddress = edges[0]
//   const streamGuids = buildVariantStreamGuids(provisionGuid)
//   renderRtmpUrlList(serverAddress, streamGuids)
//   log(`RTMP subscriber URLs ready using edge ${serverAddress}.`)
// }

async function displayUrlsAfterProvision(
  // @ts-expect-error - provisionGuid is not used
  provisionGuid: string,
  topLevelStreamGuid: string
): Promise<void> {
  try {
    await loadPublisherUrlsAfterProvision(topLevelStreamGuid)
  } catch (error) {
    log(`Failed to display Publisher URLs after provision: ${String(error)}`, 'error')
    alert(`Failed to display Publisher URLs after provision: ${String(error)}`)
  }

  // try {
  //   await loadRtmpUrlsAfterProvision(provisionGuid)
  // } catch (error) {
  //   log(`Failed to display Subscriber URLs after provision: ${String(error)}`, 'error')
  //   alert(`Failed to display Subscriber URLs after provision: ${String(error)}`)
  // } finally {
  //   submitBtn.disabled = false
  // }
}

async function onSubmit(event: SubmitEvent): Promise<void> {
  event.preventDefault()
  if (!ensureCoreSettings(settings)) return

  const provisionLevels = collectAbrProvisions()
  submitBtn.disabled = true
  clearResultLists()

  const { app, streamName, useAuthentication, username, password, token } = settings
  const provisionGuid = `${app}/${streamName}`

  try {
    const provision: AbrProvision = {
      credentials: useAuthentication ? { username, password, token } : undefined,
      messageType: 'ProvisionCommand' as const,
      provisionGuid,
      streams: provisionLevels,
    }
    setPrompt('Submitting ABR provisions...', 'progress')
    log(`Submitting ABR provisions: ${JSON.stringify(provision)}`)
    await submitForm(provision)
    setPrompt('ABR provisions submitted.', 'success')
    log('ABR provisions submitted successfully.', 'success')
    const topLevelStreamGuid = provisionLevels[0].streamGuid
    await displayUrlsAfterProvision(provisionGuid, topLevelStreamGuid)
  } catch (error) {
    if (error instanceof ProvisionAlreadyExistsError) {
      log('ABR provisions already exist. Skipping load of RTMP and publisher URLs.', 'info')
      setPrompt('ABR provisions available.', 'success')
      await displayUrlsAfterProvision(provisionGuid, provisionLevels[0].streamGuid)
    } else {
      setPrompt('Submit failed.', 'failure')
      log(`Submit failed: ${String(error)}`, 'error')
      alert(`Submit failed: ${String(error)}`)
    }
  } finally {
    submitBtn.disabled = false
  }
}

formEl.addEventListener('submit', (e) => {
  void onSubmit(e)
})

document.addEventListener('webrtc-settings-applied', (e) => {
  settings = (e as CustomEvent).detail as Settings
  updateConnectionInfo()
  clearResultLists()
  log(`Settings updated for stream "${settings.streamName}".`)
})

updateConnectionInfo()
log('Transcoder (Form Only) loaded. Configure Settings, then submit ABR provisions.')
