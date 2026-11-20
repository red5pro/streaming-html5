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
  resolveConnectionParamsFromSettings,
  resolveRtcConfigurationFromSettings,
  type Settings,
} from '@/settings'
import { wireExampleLog } from '@/lib/example-log'
import './session.js'
let settings = loadSettings()
applyTheme(settings.theme)

interface SessionConfig {
  sm: string
  nodeGroup: string
  streamGuid: string
  endpoints: number
  strict: boolean
  silenceSeconds: number
  subGroup?: string
  region?: string
  apiVersion?: string
  silentAudio?: boolean
  rtcConfiguration?: RTCConfiguration
  connectionParams?: Record<string, unknown>
}
interface PeerSnapshot {
  id: string
  address: string
  streamPath: { hops: string[]; complete: boolean; revision: number } | null
  ready: boolean
  controlReady: boolean
  requested: string
  mutedWindows: number
  connectionState: string
  pcId: string
  bytes: number
  frames: number
  samples: number
  emittedAudioSamples: number
  audioBytes: number
  energy: number
  firstToneObservations: number
  secondToneObservations: number
  messagesReceived: number
  messagesSent: number
  transportBytes: number
  error: string | null
  firstVideoAt: number | null
  lastVideoAt: number
}
interface SessionSnapshot {
  running: boolean
  activeId?: string | null
  peers: PeerSnapshot[]
  events: Record<string, unknown>[]
}
interface Session {
  running: boolean
  start(config: SessionConfig): Promise<void>
  snapshot(): SessionSnapshot
  stop(): Promise<void>
  promote(id: string): Promise<void>
  enableAudio(): Promise<void>
}
interface Testbed {
  view: 'player' | 'diagnostics'
  setView(view: 'player' | 'diagnostics'): void
  starting?: boolean
  generation?: number
  session?: Session
  start(config: SessionConfig): Promise<SessionSnapshot>
  snapshot(): SessionSnapshot
  stop(): Promise<void>
  promote(id: string): Promise<void>
  enableAudio(): Promise<void>
}
declare global {
  interface Window {
    testbed: Testbed
    RedundantWhepSession: new (options: {
      sdk: typeof window.red5prosdk
      mount: HTMLElement
      onChange: (snapshot: SessionSnapshot) => void
    }) => Session
  }
}
;(() => {
  const form = document.querySelector<HTMLFormElement>('#redundancy-settings')!
  const mount = document.querySelector<HTMLElement>('#peers')!
  const status = document.querySelector<HTMLElement>('#status')!
  const activeEdge = document.querySelector<HTMLElement>('#active-edge')!
  const activePath = document.querySelector<HTMLElement>('#active-stream-path')!
  const switchEdge = document.querySelector<HTMLButtonElement>('#switch-edge')!
  const text = (value: unknown): string => (value == null ? '—' : String(value))
  const { log } = wireExampleLog()
  const seen = new WeakSet<object>()
  let selectedView: 'player' | 'diagnostics' = 'player'
  let latestSnapshot: SessionSnapshot = { running: false, peers: [], events: [] }
  let hasPlayed = false
  let silenceSeconds = 5
  let switchingEdge = false
  const formatStreamPath = (peer: PeerSnapshot): string => {
    const path = peer.streamPath
    if (!path?.hops.length) return `Unknown upstream → Edge ${peer.address}`
    if (path.complete && path.hops.length === 1) return `Origin + Edge ${path.hops[0]}`
    const hops = path.hops.map((address, index) => {
      if (index === path.hops.length - 1) return `Edge ${address}`
      return `${index === 0 && path.complete ? 'Origin' : 'Relay'} ${address}`
    })
    if (!path.complete) hops.unshift('Unknown upstream')
    return hops.join(' → ')
  }
  const canPromote = (peer: PeerSnapshot, activeId: SessionSnapshot['activeId']): boolean =>
    peer.id !== activeId &&
    peer.requested === 'standby' &&
    peer.ready &&
    peer.controlReady &&
    peer.connectionState === 'connected'
  const nextEdge = (snapshot: SessionSnapshot): PeerSnapshot | undefined => {
    const index = snapshot.peers.findIndex((peer) => peer.id === snapshot.activeId)
    if (!snapshot.running || index === -1) return
    const { peers } = snapshot
    return [...peers.slice(index + 1), ...peers.slice(0, index)].find((peer) =>
      canPromote(peer, snapshot.activeId)
    )
  }
  const render = (snapshot: SessionSnapshot): void => {
    latestSnapshot = snapshot
    const active = snapshot.peers.find((peer) => peer.id === snapshot.activeId)
    const playing =
      active?.firstVideoAt != null &&
      active.connectionState === 'connected' &&
      !active.error &&
      performance.now() - active.lastVideoAt < silenceSeconds * 1000
    if (playing) hasPlayed = true
    status.textContent = !snapshot.running
      ? 'Stopped'
      : playing
        ? 'Playing'
        : hasPlayed
          ? 'Reconnecting…'
          : 'Connecting…'
    const edgeLabel = `Active edge: ${active?.address ?? '—'}`
    if (activeEdge.textContent !== edgeLabel) activeEdge.textContent = edgeLabel
    const pathLabel = `Stream path: ${active ? formatStreamPath(active) : '—'}`
    if (activePath.textContent !== pathLabel) activePath.textContent = pathLabel
    switchEdge.disabled = switchingEdge || !nextEdge(snapshot)
    document.querySelector<HTMLElement>('#player-placeholder')!.hidden = !!active
    document.querySelector<HTMLButtonElement>('#stop')!.disabled = !snapshot.running
    document.querySelector<HTMLButtonElement>('#start')!.disabled = snapshot.running
    for (const peer of snapshot.peers) {
      const article = document.getElementById(`subscriber-${peer.id}`)?.parentElement
      if (!article) continue
      article.classList.toggle('active', peer.id === snapshot.activeId)
      article.hidden = selectedView === 'player' && peer.id !== snapshot.activeId
      let heading = article.querySelector('h2')
      if (!heading) {
        heading = document.createElement('h2')
        heading.className = 'peer-heading diagnostic-only'
        article.prepend(heading)
      }
      const connected = peer.connectionState === 'connected' && peer.controlReady
      const standby = peer.requested === 'standby'
      const peerState = !connected
        ? peer.connectionState === 'connected'
          ? 'Waiting for control channel'
          : peer.connectionState
        : standby
          ? peer.mutedWindows >= 6
            ? 'Connected · media paused'
            : 'Connected · pausing media'
          : playing
            ? 'Playing'
            : 'Waiting for media'
      heading.textContent = `${standby ? 'Standby' : 'Active'} · ${peerState}`
      let details = article.querySelector('dl')
      if (!details) {
        details = document.createElement('dl')
        article.append(details)
        const promote = document.createElement('button')
        promote.type = 'button'
        promote.className = 'btn btn--secondary'
        promote.textContent = 'Promote'
        promote.onclick = () => window.testbed.promote(peer.id).catch(showError)
        article.append(promote)
      }
      const entries = {
        Endpoint: peer.address,
        'Stream path': formatStreamPath(peer),
        Connection: peer.connectionState,
        'Control channel': peer.controlReady ? 'open' : 'not ready',
        'Peer identity': peer.pcId,
        'RTP bytes': peer.bytes,
        'Decoded video': peer.frames,
        'Audio RTP bytes': peer.audioBytes,
        'Audio samples (incl. concealed)': peer.samples,
        'Jitter-buffer emitted samples': peer.emittedAudioSamples,
        'Audio energy': peer.energy?.toFixed(3),
        '1k / 2k tone observations': `${peer.firstToneObservations} / ${peer.secondToneObservations}`,
        'Control received / sent': `${peer.messagesReceived} / ${peer.messagesSent}`,
        'Transport bytes': peer.transportBytes,
        Error: peer.error,
      }
      details.replaceChildren()
      for (const [label, value] of Object.entries(entries)) {
        const dt = document.createElement('dt')
        dt.textContent = label
        const dd = document.createElement('dd')
        dd.textContent = text(value)
        details.append(dt, dd)
      }
      article.querySelector('button')!.disabled = !canPromote(peer, snapshot.activeId)
    }
    for (const event of snapshot.events) {
      if (!seen.has(event)) {
        seen.add(event)
        log(JSON.stringify(event))
      }
    }
  }
  const showError = (error: unknown): void => {
    status.textContent = error instanceof Error ? error.message : String(error)
    status.classList.add('error')
    log(status.textContent, 'error')
  }
  const setView = (view: 'player' | 'diagnostics'): void => {
    if (view !== 'player' && view !== 'diagnostics') throw new Error('Unknown subscriber view')
    selectedView = view
    window.testbed.view = view
    document.querySelector<HTMLElement>('.redundant-page')!.dataset.view = view
    document.querySelector('#subscriber-view')!.setAttribute('aria-labelledby', `${view}-tab`)
    for (const tab of document.querySelectorAll<HTMLButtonElement>('[role="tab"]')) {
      const selected = tab.dataset.view === view
      tab.setAttribute('aria-selected', String(selected))
      tab.tabIndex = selected ? 0 : -1
    }
    render(latestSnapshot)
  }
  window.testbed = {
    view: 'player',
    setView,
    async start(config: SessionConfig): Promise<SessionSnapshot> {
      if (this.starting || this.session?.running) throw new Error('Stop the current session first')
      this.starting = true
      hasPlayed = false
      silenceSeconds = config.silenceSeconds
      const generation = this.generation ?? 0
      status.classList.remove('error')
      try {
        if (!window.red5prosdk?.WHEPClient) throw new Error('SDK must provide WHEPClient')
        if (generation !== (this.generation ?? 0)) throw new Error('Startup cancelled')
        this.session = new window.RedundantWhepSession({
          sdk: window.red5prosdk,
          mount,
          onChange: render,
        })
        await this.session.start(config)
        return this.snapshot()
      } finally {
        this.starting = false
      }
    },
    snapshot(): SessionSnapshot {
      return this.session?.snapshot() ?? { running: false, peers: [], events: [] }
    },
    async stop(): Promise<void> {
      this.generation = (this.generation ?? 0) + 1
      await this.session?.stop()
    },
    async promote(id: string): Promise<void> {
      await this.session!.promote(id)
    },
    async enableAudio(): Promise<void> {
      await this.session!.enableAudio()
    },
  }
  switchEdge.onclick = async () => {
    const target = nextEdge(latestSnapshot)
    if (switchingEdge || !target) return
    switchingEdge = true
    switchEdge.disabled = true
    try {
      await window.testbed.promote(target.id)
    } catch (error) {
      showError(error)
    } finally {
      switchingEdge = false
      switchEdge.disabled = !nextEdge(latestSnapshot)
    }
  }
  const tabs = [...document.querySelectorAll<HTMLButtonElement>('[role="tab"]')]
  tabs.forEach((tab, index) => {
    tab.onclick = () => setView(tab.dataset.view as 'player' | 'diagnostics')
    tab.onkeydown = (event) => {
      const target =
        event.key === 'ArrowRight'
          ? tabs[(index + 1) % tabs.length]
          : event.key === 'ArrowLeft'
            ? tabs[(index + tabs.length - 1) % tabs.length]
            : event.key === 'Home'
              ? tabs[0]
              : event.key === 'End'
                ? tabs[tabs.length - 1]
                : null
      if (target) {
        event.preventDefault()
        target.click()
        target.focus()
      }
    }
  })
  form.onsubmit = (event) => {
    event.preventDefault()
    const data = new FormData(form)
    if (!settings.useStreamManager) {
      showError(new Error('Enable Stream Manager in Settings'))
      return
    }
    const host = settings.host.includes('://') ? settings.host : 'https://' + settings.host
    window.testbed
      .start({
        sm: host,
        nodeGroup: settings.nodeGroupName,
        streamGuid: settings.app + '/' + settings.streamName,
        endpoints: Number(data.get('endpoints')),
        silenceSeconds: Number(data.get('silenceSeconds')),
        strict: data.has('strict'),
        subGroup: String(data.get('subGroup') || ''),
        region: settings.region,
        apiVersion: settings.streamManagerApiVersion,
        rtcConfiguration: resolveRtcConfigurationFromSettings(settings),
        connectionParams: resolveConnectionParamsFromSettings(settings),
      })
      .catch(showError)
  }
  document.querySelector<HTMLButtonElement>('#stop')!.onclick = () =>
    window.testbed.stop().catch(showError)
  document.querySelector<HTMLButtonElement>('#audio')!.onclick = () =>
    window.testbed.enableAudio().catch(showError)
  document.querySelector<HTMLButtonElement>('#export')!.onclick = () => {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(window.testbed.snapshot(), null, 2)], { type: 'application/json' })
    )
    const link = document.createElement('a')
    link.href = url
    link.download = 'redundant-subscriber-observations.json'
    link.click()
    URL.revokeObjectURL(url)
  }
  const updateSettings = (): void => {
    document.querySelector<HTMLElement>('#connection-info')!.textContent = settings.useStreamManager
      ? settings.host +
        ' · NodeGroup ' +
        settings.nodeGroupName +
        ' · ' +
        settings.app +
        '/' +
        settings.streamName
      : 'Enable Stream Manager in Settings'
  }
  document.addEventListener('webrtc-settings-applied', (event) => {
    settings = (event as CustomEvent<Settings>).detail
    applyTheme(settings.theme)
    updateSettings()
  })
  updateSettings()
  window.addEventListener('pagehide', () => {
    window.testbed.stop()
  })
})()
