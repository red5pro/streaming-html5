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

import { resolveConnectionFromHost, type Settings } from '@/settings'
import type { ExampleLogger } from '@/lib/example-log'

// MP4 clip creation through the Stream Manager clip API. Start and end times are set from the
// player: while seeking back they take the HLS playhead's wall-clock time (EXT-X-PROGRAM-DATE-TIME),
// at live they take the live edge. The video packager cuts that range without re-encoding.

interface ClipRecord {
  clipId: string
  state: 'QUEUED' | 'RENDERING' | 'DONE' | 'FAILED'
  error?: string
  updatedAt: string
  mp4Url?: string
  mp4Path?: string
}

export interface HlsFragment {
  start: number
  programDateTime: number | null
  duration: number
}

interface HlsErrorData {
  type: string
  details: string
  fatal: boolean
}

export interface HlsLike {
  on: (event: string, handler: (event: string, data: HlsErrorData) => void) => void
  media: HTMLMediaElement | null
  recoverMediaError(): void
  playingDate: Date | null
  currentLevel: number
  levels: { details?: { fragments: HlsFragment[] } }[]
}

type HlsCtor = new (config: unknown) => HlsLike

const POLL_MS = 2000
// The packager kills a render after an hour, so a clip with no update for longer is lost.
const STALE_MS = 65 * 60 * 1000
// How often the HLS/WebRTC state is re-read from the player.
const SOURCE_POLL_MS = 500

const markInBtn = document.getElementById('clip-mark-in-btn') as HTMLButtonElement
const markOutBtn = document.getElementById('clip-mark-out-btn') as HTMLButtonElement
const rangeEl = document.getElementById('clip-range') as HTMLSpanElement
const titleInput = document.getElementById('clip-title') as HTMLInputElement
const createBtn = document.getElementById('clip-create-btn') as HTMLButtonElement
const statusEl = document.getElementById('clip-status') as HTMLParagraphElement
const sourceEl = document.getElementById('playback-source') as HTMLSpanElement

let hls: HlsLike | null = null
let sourcePoll: ReturnType<typeof setInterval> | undefined
let lastHlsError: string | null = null
let lastHlsErrorFatal = false
let liveBtn: HTMLButtonElement | null = null
let logFn: ExampleLogger['log'] = () => {}
let markIn: number | null = null
let markOut: number | null = null

/**
 * hls.js subclass for `liveSeek.hlsjsRef`. LiveSeekClient constructs it, which hands this page
 * the instance whose playhead the start and end times are read from.
 */
export function capturingHls(): HlsCtor | undefined {
  const Base = (window as unknown as { Hls?: HlsCtor }).Hls
  if (!Base) return undefined
  return class extends Base {
    constructor(config: unknown) {
      super(config)
      hls = this
      lastHlsError = null
      // Registered before LiveSeekClient's own error handler, so it runs first.
      this.on('hlsError', (_event, data) => {
        lastHlsError = `${data.type}/${data.details}${data.fatal ? ' (fatal)' : ''}`
        lastHlsErrorFatal = data.fatal
      })
    }

    /**
     * LiveSeekClient calls this on every hls.js media error, including non-fatal buffer stalls
     * that hls.js recovers from by itself. The detach/attach it causes makes LiveSeekClient
     * reload the playlist, which restarts playback at the live edge; only recover fatal errors.
     */
    recoverMediaError(): void {
      if (!lastHlsErrorFatal) {
        logFn(`Ignored media recovery for non-fatal ${lastHlsError ?? 'hls.js error'}`)
        return
      }
      super.recoverMediaError()
    }
  }
}

/**
 * LiveSeekClient shows its HLS video element while the recording plays and hides it
 * (`display: none`) at live; its `WebRTC.LiveSeek.Change` event does not reach the client.
 */
export function isHlsActive(): boolean {
  return !!hls?.media && hls.media.style.display !== 'none'
}

/** Shows whether the player is on live WebRTC or the HLS recording. */
export function setPlaybackSource(source: 'webrtc' | 'hls' | null): void {
  sourceEl.textContent =
    source === 'hls' ? 'HLS' : source === 'webrtc' ? 'Live · WebRTC' : 'Not playing'
  sourceEl.className = `playback-source playback-source--${source ?? 'idle'}`
  liveBtn?.classList.toggle('live-button--live', source === 'webrtc')
}

/** The hls.js instance LiveSeekClient is using, once it has created one. */
export function getHls(): HlsLike | null {
  return hls
}

/** The clip's start and end wall-clock times (ms), when set. */
export function getClipMarks(): { start: number | null; end: number | null } {
  return { start: markIn, end: markOut }
}

export function resetClipPanel(): void {
  clearInterval(sourcePoll)
  liveBtn?.remove()
  liveBtn = null
  hls = null
  markIn = markOut = null
  markInBtn.disabled = markOutBtn.disabled = true
  setPlaybackSource(null)
  render()
}

export function enableClipMarks(): void {
  markInBtn.disabled = markOutBtn.disabled = false
  clearInterval(sourcePoll)
  let wasHls = false
  let lastTime = 0
  let lastDuration = 0
  const update = (): void => {
    const active = isHlsActive()
    if (active && hls?.media) {
      lastTime = hls.media.currentTime
      lastDuration = hls.media.duration
    } else if (wasHls) {
      // LiveSeekClient returns to live when HLS playback reaches the end of its duration, or
      // after an hls.js error; log which, to explain unexpected jumps back to WebRTC.
      const reachedEnd = lastDuration > 0 && lastTime >= lastDuration - 1
      logFn(
        `Back to live WebRTC: HLS at ${lastTime.toFixed(1)}s of ${lastDuration.toFixed(1)}s` +
          (reachedEnd ? ' (reached the end of the HLS duration)' : '') +
          (lastHlsError ? `, last hls.js error ${lastHlsError}` : ''),
        reachedEnd ? 'info' : 'error'
      )
    }
    wasHls = active
    setPlaybackSource(active ? 'hls' : 'webrtc')
  }
  update()
  sourcePoll = setInterval(update, SOURCE_POLL_MS)
}

/**
 * Adds a LIVE button to the SDK's player control bar (or `fallback` when the SDK bar is off);
 * clicking it returns to live WebRTC playback.
 */
export function attachLiveButton(goLive: () => void, fallback: HTMLElement): void {
  liveBtn?.remove()
  liveBtn = document.createElement('button')
  liveBtn.type = 'button'
  liveBtn.className = 'live-button'
  liveBtn.textContent = '● LIVE'
  liveBtn.title = 'Go to live (WebRTC)'
  liveBtn.addEventListener('click', goLive)
  const bar = document.querySelector('.red5pro-media-control-bar')
  ;(bar ?? fallback).append(liveBtn)
}

function smBase(settings: Settings): string {
  const { protocol, port } = resolveConnectionFromHost(settings.host)
  return `${protocol}://${settings.host}:${port}/as/${settings.streamManagerApiVersion}`
}

/** HLS URL served by the Stream Manager proxy from the packager's local (file) output. */
export function packagerProxyHlsUrl(settings: Settings): string {
  const { nodeGroupName, app, streamName } = settings
  return `${smBase(settings)}/proxy/packager/${nodeGroupName}/hls/${app}/${streamName}/playlist.m3u8`
}

/** Wall-clock time under the player: the HLS playhead when seeked back, else the live edge. */
function playerTime(): number | null {
  if (!hls) return null
  if (isHlsActive() && hls.playingDate) return hls.playingDate.getTime()
  const level = hls.levels[hls.currentLevel] ?? hls.levels[hls.levels.length - 1]
  const last = level?.details?.fragments.at(-1)
  if (last?.programDateTime == null) return null
  return last.programDateTime + last.duration * 1000
}

function formatTime(ms: number): string {
  return new Date(ms).toISOString().slice(11, 22)
}

function formatSpan(ms: number): string {
  const total = Math.round(ms / 100) / 10
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = (total % 60).toFixed(1)
  return h ? `${h}h ${m}m ${s}s` : m ? `${m}m ${s}s` : `${s}s`
}

function render(): void {
  const inText = markIn === null ? '—' : formatTime(markIn)
  const outText = markOut === null ? '—' : formatTime(markOut)
  const valid = markIn !== null && markOut !== null && markOut > markIn
  rangeEl.textContent = `Start ${inText}  ·  End ${outText}${valid ? `  ·  ${formatSpan(markOut! - markIn!)}` : ''}`
  createBtn.disabled = !valid
}

function setStatus(text: string, link?: string): void {
  statusEl.textContent = text
  if (link) {
    const a = document.createElement('a')
    a.href = link
    a.target = '_blank'
    a.rel = 'noopener'
    a.textContent = 'Download MP4'
    statusEl.append(' ', a)
  }
}

export function setupClipPanel(getSettings: () => Settings, log: ExampleLogger['log']): void {
  logFn = log
  function mark(which: 'in' | 'out'): void {
    const time = playerTime()
    if (time === null) {
      log('No HLS time yet: wait for the recording to load, or seek back first.', 'error')
      return
    }
    if (which === 'in') markIn = time
    else markOut = time
    log(`${which === 'in' ? 'Start' : 'End'} time set to ${new Date(time).toISOString()}${isHlsActive() ? '' : ' (live edge)'}`)
    render()
  }

  async function poll(clipUrl: string, settings: Settings): Promise<void> {
    for (;;) {
      await new Promise((resolve) => setTimeout(resolve, POLL_MS))
      const response = await fetch(clipUrl)
      const clip = (await response.json()) as ClipRecord
      if (!response.ok) throw new Error(clip.error ?? `HTTP ${response.status}`)
      if (clip.state === 'DONE') {
        const link =
          clip.mp4Url ??
          (clip.mp4Path
            ? `${smBase(settings)}/proxy/packager/${settings.nodeGroupName}/${clip.mp4Path}`
            : undefined)
        setStatus('Clip ready.', link)
        log(`Clip ${clip.clipId} ready`, 'success')
        return
      }
      if (clip.state === 'FAILED') throw new Error(clip.error ?? 'clip failed')
      if (Date.now() - Date.parse(clip.updatedAt) > STALE_MS) {
        throw new Error('clip has not progressed in over an hour; the packager may have restarted')
      }
      setStatus(`${clip.state === 'QUEUED' ? 'Queued' : 'Rendering'}…`)
    }
  }

  async function createClip(): Promise<void> {
    if (markIn === null || markOut === null || markOut <= markIn) return
    const settings = getSettings()
    const clipBase = `${smBase(settings)}/streams/package/${settings.nodeGroupName}/clip/${settings.app}/${settings.streamName}`
    createBtn.disabled = true
    setStatus('Submitting…')
    try {
      const response = await fetch(clipBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: new Date(markIn).toISOString(),
          to: new Date(markOut).toISOString(),
          title: titleInput.value.trim(),
        }),
      })
      const clip = (await response.json()) as ClipRecord
      if (!response.ok) throw new Error(clip.error ?? `HTTP ${response.status}`)
      log(`Clip ${clip.clipId} queued`)
      await poll(`${clipBase}/${clip.clipId}`, settings)
    } catch (error) {
      setStatus(`Clip failed: ${String(error)}`)
      log(`Clip failed: ${String(error)}`, 'error')
    } finally {
      render()
    }
  }

  markInBtn.addEventListener('click', () => mark('in'))
  markOutBtn.addEventListener('click', () => mark('out'))
  createBtn.addEventListener('click', () => void createClip())
  resetClipPanel()
}
