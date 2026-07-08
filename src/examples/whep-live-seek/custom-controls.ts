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

function formatTime(value: number): string {
  let hrs = 0
  let mins = value === 0 || isNaN(value) ? 0 : Math.floor(value / 60)
  let secs = 0
  if (mins >= 60) {
    hrs = Math.floor(mins / 60)
    mins %= 60
  }
  secs = value === 0 || isNaN(value) ? 0 : Math.floor(value % 60)

  const formattedArr: string[] = hrs < 10 ? [`0${hrs}`] : [hrs.toString()]
  formattedArr.push(mins < 10 ? `0${mins}` : mins.toString())
  formattedArr.push(secs < 10 ? `0${secs}` : secs.toString())
  return formattedArr.join(':')
}

interface LiveSeekPlaybackClient {
  on: (type: string, handler: (event: unknown) => void) => void
  play?: (withAction?: boolean) => void
  pause?: (withAction?: boolean, stopBuffering?: boolean) => void
  setVolume?: (volume: number) => void
  toggleFullScreen?: () => void
  seekTo?: (percent: number, max: number) => void
}

export default class CustomControls {
  private subscriber: LiveSeekPlaybackClient
  private isPlaying: boolean
  private isMuted: boolean
  private isFullscreen: boolean
  private isScrubbingResumePlay: boolean
  private playPauseButton: HTMLButtonElement
  private muteUnmuteButton: HTMLButtonElement
  private fullscreenButton: HTMLButtonElement
  private timeDisplay: HTMLSpanElement
  private scrubber: HTMLInputElement

  constructor(subscriber: LiveSeekPlaybackClient) {
    this.subscriber = subscriber

    this.isPlaying = false
    this.isMuted = false
    this.isFullscreen = false
    this.isScrubbingResumePlay = false

    this.playPauseButton = document.querySelector('#play-pause-button') as HTMLButtonElement
    this.muteUnmuteButton = document.querySelector('#mute-unmute-button') as HTMLButtonElement
    this.fullscreenButton = document.querySelector('#fullscreen-button') as HTMLButtonElement
    this.timeDisplay = document.querySelector('#time-display') as HTMLSpanElement
    this.scrubber = document.querySelector('#scrubber') as HTMLInputElement

    this.subscriber.on('*', (event) => this.onPlaybackEvent(event))

    this.playPauseButton.addEventListener('click', () => this.onPlayPause())
    this.muteUnmuteButton.addEventListener('click', () => this.onMuteUnmute())
    this.fullscreenButton.addEventListener('click', () => this.onFullscreen())

    this.scrubber.addEventListener('mousedown', () => this.onScrubberStart())
    this.scrubber.addEventListener('mouseup', () => this.onScrubberEnd())
    this.scrubber.addEventListener('change', (event) => this.onScrubberChange(event))
  }

  setPlayPauseButtonState(isPlaying: boolean, withAction: boolean = false): void {
    this.isPlaying = isPlaying
    this.playPauseButton.innerHTML = isPlaying ? 'Pause' : 'Play'
    if (!withAction) return
    if (this.isPlaying) {
      this.subscriber.play?.(true)
    } else {
      this.subscriber.pause?.(true, true)
    }
  }

  setMuteUnmuteButtonState(isMuted: boolean, withAction: boolean = false): void {
    this.isMuted = isMuted
    this.muteUnmuteButton.innerHTML = isMuted ? 'Unmute' : 'Mute'
    if (withAction) {
      this.subscriber.setVolume?.(isMuted ? 0 : 1)
    }
  }

  setFullscreenButtonState(isFullscreen: boolean, withAction: boolean = false): void {
    this.isFullscreen = isFullscreen
    this.fullscreenButton.innerHTML = isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'
    if (withAction) {
      this.subscriber.toggleFullScreen?.()
    }
  }

  onPlaybackEvent(event: unknown): void {
    const { type, data } = event as { type: string; data: unknown }
    if (type === 'Subscribe.Playback.Change') {
      const { state } = data as { state: string }
      if (state !== 'Playback.AVAILABLE') {
        this.setPlayPauseButtonState(state === 'Playback.PLAYING')
      }
    } else if (type === 'Subscribe.Volume.Change') {
      const { volume } = data as { volume: number }
      this.setMuteUnmuteButtonState(volume === 0)
    } else if (type === 'Subscribe.FullScreen.Change') {
      const payload = data as { isFullscreen: boolean }
      this.setFullscreenButtonState(payload.isFullscreen)
    } else if (type === 'Subscribe.Time.Update') {
      const { time, duration } = data as { time: number; duration: number }
      this.timeDisplay.innerHTML = formatTime(time)
      this.scrubber.setAttribute('max', duration.toString())
      this.scrubber.value = time.toString()
    }
  }

  onPlayPause(): void {
    this.setPlayPauseButtonState(!this.isPlaying, true)
  }

  onMuteUnmute(): void {
    this.setMuteUnmuteButtonState(!this.isMuted, true)
  }

  onFullscreen(): void {
    this.setFullscreenButtonState(!this.isFullscreen, true)
  }

  onScrubberStart(): void {
    this.isScrubbingResumePlay = this.isPlaying
    this.setPlayPauseButtonState(false, true)
  }

  onScrubberChange(event: Event): void {
    const element = event.target as HTMLInputElement
    const time = Number(element.value)
    const max = Number(element.max)
    const perc = max - time > 6 ? time / max : 1
    this.subscriber.seekTo?.(perc, max)
  }

  onScrubberEnd(): void {
    if (this.isScrubbingResumePlay) {
      this.setPlayPauseButtonState(true, true)
    }
    this.isScrubbingResumePlay = false
  }
}
