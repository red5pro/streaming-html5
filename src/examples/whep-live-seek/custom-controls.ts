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

import { getClipMarks, getHls, isHlsActive, type HlsFragment } from './clip-panel'
import type { ExampleLogger } from '@/lib/example-log'

// Player controls for LiveSeekClient. The timeline spans the whole HLS recording the playlist
// lists (from its first segment to the live edge), seeks on click or drag, shows the playhead's
// wall-clock time, and highlights the clip range. The right end of the timeline is live WebRTC.

interface LiveSeekPlaybackClient {
  setVolume?: (volume: number) => void
  seekTo?: (percentage: number, duration?: number) => void
  mute?: () => void
  unmute?: () => void
}

interface Timeline {
  start: number
  end: number
  fragments: HlsFragment[]
}

const TICK_MS = 250
// A seek this close to the live edge returns to live WebRTC instead.
const LIVE_SNAP_SECS = 3

function formatClock(secs: number): string {
  const total = Math.max(0, Math.floor(secs))
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  const pad = (n: number): string => String(n).padStart(2, '0')
  return h ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`
}

/** Fragments of the level hls.js is playing, as a media-time range. */
function timeline(): Timeline | null {
  const hls = getHls()
  if (!hls) return null
  const level = hls.levels[hls.currentLevel] ?? hls.levels[hls.levels.length - 1]
  const fragments = level?.details?.fragments
  if (!fragments?.length) return null
  const last = fragments[fragments.length - 1]
  return { start: fragments[0].start, end: last.start + last.duration, fragments }
}

function wallTimeAt(t: number, fragments: HlsFragment[]): number | null {
  const frag =
    fragments.find((f) => t >= f.start && t < f.start + f.duration) ??
    fragments[fragments.length - 1]
  return frag.programDateTime == null ? null : frag.programDateTime + (t - frag.start) * 1000
}

function mediaTimeAt(wall: number, fragments: HlsFragment[]): number | null {
  const frag = fragments.find(
    (f) =>
      f.programDateTime != null &&
      wall >= f.programDateTime &&
      wall < f.programDateTime + f.duration * 1000
  )
  return frag ? frag.start + (wall - frag.programDateTime!) / 1000 : null
}

export default class CustomControls {
  private readonly subscriber: LiveSeekPlaybackClient
  private readonly webrtcVideo: HTMLVideoElement
  private readonly player: HTMLElement
  private readonly playPauseButton: HTMLButtonElement
  private readonly muteButton: HTMLButtonElement
  private readonly fullscreenButton: HTMLButtonElement
  private readonly timeDisplay: HTMLSpanElement
  private readonly wallDisplay: HTMLSpanElement
  private readonly scrubber: HTMLInputElement
  private readonly clipRange: HTMLDivElement
  private readonly ticker: ReturnType<typeof setInterval>
  private readonly log: ExampleLogger['log']
  private scrubbing = false
  // Only an explicit pause from this bar keeps playback paused (see keepPlaying).
  private userPaused = false
  private resuming = false
  private resumeFailed = false

  constructor(subscriber: LiveSeekPlaybackClient, log: ExampleLogger['log']) {
    this.subscriber = subscriber
    this.log = log
    this.webrtcVideo = document.getElementById('subscriber-video') as HTMLVideoElement
    this.player = document.getElementById('player') as HTMLElement
    this.playPauseButton = document.getElementById('play-pause-button') as HTMLButtonElement
    this.muteButton = document.getElementById('mute-unmute-button') as HTMLButtonElement
    this.fullscreenButton = document.getElementById('fullscreen-button') as HTMLButtonElement
    this.timeDisplay = document.getElementById('time-display') as HTMLSpanElement
    this.wallDisplay = document.getElementById('wall-display') as HTMLSpanElement
    this.scrubber = document.getElementById('scrubber') as HTMLInputElement
    this.clipRange = document.getElementById('timeline-clip') as HTMLDivElement

    this.playPauseButton.onclick = () => this.togglePlay()
    this.muteButton.onclick = () => this.toggleMute()
    this.fullscreenButton.onclick = () => this.toggleFullscreen()
    // A click on the track jumps there; dragging previews the time and seeks on release.
    this.scrubber.oninput = () => {
      this.scrubbing = true
      this.render()
    }
    this.scrubber.onchange = () => {
      this.scrubbing = false
      this.seek(Number(this.scrubber.value))
    }
    this.ticker = setInterval(() => this.render(), TICK_MS)
    this.render()
  }

  destroy(): void {
    clearInterval(this.ticker)
  }

  /** The element currently on screen: the HLS video after a seek back, else WebRTC. */
  private activeMedia(): HTMLMediaElement {
    const media = getHls()?.media
    return isHlsActive() && media ? media : this.webrtcVideo
  }

  /**
   * Plays or pauses the video on screen directly: LiveSeekClient.pause() drops its arguments, so
   * the source handler only pauses the WebRTC video and HLS playback carries on.
   */
  private togglePlay(): void {
    const media = this.activeMedia()
    this.userPaused = !media.paused
    if (this.userPaused) {
      media.pause()
      return
    }
    media.play().catch((error) => this.log(`Play failed: ${String(error)}`, 'error'))
  }

  /**
   * LiveSeekClient carries a paused state across its WebRTC/HLS switches: after a seek it only
   * starts the HLS video if WebRTC is playing, and on returning to live it only starts WebRTC if
   * HLS was playing. Restart whichever video is on screen unless the viewer paused it.
   */
  private keepPlaying(media: HTMLMediaElement): void {
    if (
      this.userPaused ||
      this.scrubbing ||
      this.resuming ||
      !media.paused ||
      media.readyState === 0
    )
      return
    this.resuming = true
    const source = media === this.webrtcVideo ? 'WebRTC' : 'HLS'
    media
      .play()
      .then(() => {
        this.resumeFailed = false
        this.log(`Resumed ${source} playback after a switch`)
      })
      .catch((error) => {
        if (!this.resumeFailed)
          this.log(`Could not resume ${source} playback: ${String(error)}`, 'error')
        this.resumeFailed = true
      })
      .finally(() => {
        this.resuming = false
      })
  }

  private toggleMute(): void {
    const media = this.activeMedia()
    if (media.muted) {
      this.subscriber.unmute?.()
    } else {
      this.subscriber.mute?.()
    }
  }

  private toggleFullscreen(): void {
    if (document.fullscreenElement) void document.exitFullscreen()
    else void this.player.requestFullscreen()
  }

  private seek(t: number): void {
    // Seeking means the viewer wants to watch: clear an earlier pause so playback resumes.
    this.userPaused = false
    const range = timeline()
    const media = getHls()?.media
    if (!range || !media) {
      this.log('Cannot seek yet: the HLS recording has not loaded', 'error')
      return
    }
    if (range.end - t <= LIVE_SNAP_SECS) {
      this.log('Seek to live')
      this.subscriber.seekTo?.(1)
      return
    }
    // LiveSeekClient seeks to a fraction of the HLS element's duration.
    if (!Number.isFinite(media.duration) || media.duration <= 0) {
      this.log(`Cannot seek: HLS duration is ${media.duration}`, 'error')
      return
    }
    const fraction = Math.min(t / media.duration, 0.999)
    this.log(
      `Seek to ${formatClock(t - range.start)} of ${formatClock(range.end - range.start)} ` +
        `(HLS ${t.toFixed(1)}s of ${media.duration.toFixed(1)}s, readyState ${media.readyState})`
    )
    this.subscriber.seekTo?.(fraction)
  }

  private render(): void {
    const media = this.activeMedia()
    this.keepPlaying(media)
    this.playPauseButton.classList.toggle('is-playing', !media.paused)
    this.playPauseButton.title = media.paused ? 'Play' : 'Pause'
    const muted = media.muted || media.volume === 0
    this.muteButton.classList.toggle('is-muted', muted)
    this.muteButton.title = muted ? 'Unmute' : 'Mute'
    this.muteButton.setAttribute('aria-pressed', String(muted))
    const fullscreen = Boolean(document.fullscreenElement)
    this.fullscreenButton.classList.toggle('is-fullscreen', fullscreen)
    this.fullscreenButton.title = fullscreen ? 'Exit fullscreen' : 'Fullscreen'

    const range = timeline()
    if (!range) {
      this.scrubber.disabled = true
      this.timeDisplay.textContent = 'LIVE'
      this.wallDisplay.textContent = ''
      this.clipRange.style.display = 'none'
      return
    }
    const live = !isHlsActive()
    this.scrubber.disabled = false
    this.scrubber.min = String(range.start)
    this.scrubber.max = String(range.end)
    if (!this.scrubbing) this.scrubber.value = String(live ? range.end : media.currentTime)

    const position = Number(this.scrubber.value)
    const total = range.end - range.start
    this.timeDisplay.textContent =
      live && !this.scrubbing
        ? `LIVE / ${formatClock(total)}`
        : `${formatClock(position - range.start)} / ${formatClock(total)}`
    const wall = live && !this.scrubbing ? null : wallTimeAt(position, range.fragments)
    this.wallDisplay.textContent =
      wall == null ? '' : `${new Date(wall).toISOString().slice(11, 19)} UTC`

    // Highlight the clip range on the track.
    const { start, end } = getClipMarks()
    const from = start == null ? null : mediaTimeAt(start, range.fragments)
    const to = end == null ? (from == null ? null : position) : mediaTimeAt(end, range.fragments)
    if (from == null || to == null || to <= from || total <= 0) {
      this.clipRange.style.display = 'none'
      return
    }
    this.clipRange.style.display = 'block'
    this.clipRange.style.left = `${((from - range.start) / total) * 100}%`
    this.clipRange.style.width = `${((to - from) / total) * 100}%`
  }
}
