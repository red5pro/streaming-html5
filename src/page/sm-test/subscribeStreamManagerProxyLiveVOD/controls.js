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
;((window) => {
  const formatTime = (value) => {
    let hrs = 0
    let mins = value === 0 || isNaN(value) ? 0 : parseInt(value / 60)
    let secs = 0
    if (mins >= 60) {
      hrs = parseInt(mins / 60)
      mins = mins % 60
    }
    secs = value === 0 || isNaN(value) ? 0 : parseInt(value % 60)

    let formattedArr = hrs < 10 ? ['0' + hrs] : [hrs]
    formattedArr.push(mins < 10 ? ['0' + mins] : [mins])
    formattedArr.push(secs < 10 ? ['0' + secs] : [secs])
    return formattedArr.join(':')
  }

  class CustomControls {
    constructor(subscriber, player) {
      this.subscriber = subscriber
      // this.player = player

      this._isPlaying = false
      this._isMuted = false
      this._isFullscreen = false

      this._isScrubbing = false
      this._isScrubbingResumePlay = false

      this.playPauseButton = document.querySelector('#play-pause-button')
      this.muteUnmuteButton = document.querySelector('#mute-unmute-button')
      this.fullscreenButton = document.querySelector('#fullscreen-button')
      this.timeDisplay = document.querySelector('#time-display')
      this.scrubber = document.querySelector('#scrubber')

      this.subscriber.on('*', (event) => this.onPlaybackEvent(event))
      // this.player.ondurationchange = event => this.onDurationChange(event)

      this.playPauseButton.addEventListener('click', (event) =>
        this.onPlayPause(event)
      )
      this.muteUnmuteButton.addEventListener('click', (event) =>
        this.onMuteUnmute(event)
      )
      this.fullscreenButton.addEventListener('click', (event) =>
        this.onFullscreen(event)
      )

      this.scrubber.addEventListener('mousedown', (event) =>
        this.onScrubberStart(event)
      )
      this.scrubber.addEventListener('mouseup', (event) =>
        this.onScrubberEnd(event)
      )
      this.scrubber.addEventListener('change', (event) =>
        this.onScrubberChange(event)
      )
    }

    setPlayPauseButtonState(isPlaying, withAction = false) {
      this._isPlaying = isPlaying
      this.playPauseButton.innerHTML = isPlaying ? 'Pause' : 'Play'
      if (withAction) {
        if (this._isPlaying) {
          this.subscriber.play(true)
        } else {
          this.subscriber.pause(true, true)
        }
      }
    }

    setMuteUnmuteButtonState(isMuted, withAction = false) {
      this._isMuted = isMuted
      this.muteUnmuteButton.innerHTML = isMuted ? 'Unmute' : 'Mute'
      if (withAction) {
        this.subscriber.setVolume(isMuted ? 0 : 1)
      }
    }

    setFullscreenButtonState(isFullscreen, withAction = false) {
      this._isFullscreen = isFullscreen
      this.fullscreenButton.innerHTML = isFullscreen
        ? 'Exit Fullscreen'
        : 'Fullscreen'
      this.subscriber.toggleFullScreen()
    }

    setScrubberState(isScrubbing) {
      this._isScrubbing = isScrubbing
    }

    onPlaybackEvent(event) {
      const { type, data } = event
      if (type === 'Subscribe.Playback.Change') {
        const { code, state } = data
        if (state === 'Playback.AVAILABLE') {
          return
        }
        this.setPlayPauseButtonState(state === 'Playback.PLAYING')
      } else if (type === 'Subscribe.Volume.Change') {
        const { volume } = data
        this.setMuteUnmuteButtonState(volume === 0)
      } else if (type === 'Subscribe.FullScreen.Change') {
        const isFullscreen = data
        this.setFullscreenButtonState(isFullscreen)
      } else if (type === 'Subscribe.Time.Update') {
        const { time, duration } = data
        this.timeDisplay.innerHTML = formatTime(time)
        this.scrubber.max = duration
        this.scrubber.value = time
        // console.log('CONTROL TIME', data)
      }
    }

    // onDurationChange (event) {
    //   const element = event.target
    //   const duration = element.duration
    // }

    onPlayPause(event) {
      const element = event.target
      this.setPlayPauseButtonState(!this._isPlaying, true)
    }

    onMuteUnmute(event) {
      const element = event.target
      this.setMuteUnmuteButtonState(!this._isMuted, true)
    }

    onFullscreen(event) {
      this.setFullscreenButtonState(!this._isFullscreen, true)
    }

    onScrubberStart(event) {
      this._isScrubbingResumePlay = this._isPlaying
      this.setPlayPauseButtonState(false, true)
      this.setScrubberState(true)
    }

    onScrubberChange(event) {
      const element = event.target
      const time = element.value
      const max = element.max
      console.log('[r5] onScrubberChange', time, max)
      // 6 is roughly a TS segment length. If slop is less than that, we're probably at the end of the stream.
      const perc = max - time > 6 ? time / max : 1
      this.subscriber.seekTo(perc, max)
    }

    onScrubberEnd(event) {
      console.log('[r5] onScrubberEnd. resume?', this._isScrubbingResumePlay)
      if (this._isScrubbingResumePlay) {
        this.setPlayPauseButtonState(true, true)
      }
      this._isScrubbingResumePlay = false
      this.setScrubberState(false)
    }
  }

  window.CustomControls = CustomControls
})(window)
