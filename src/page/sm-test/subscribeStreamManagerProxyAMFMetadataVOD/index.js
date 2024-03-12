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
;(function (window, document, red5prosdk) {
  'use strict'

  var configuration = (function () {
    var conf = sessionStorage.getItem('r5proTestBed')
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

  var nameInput = document.getElementById('name-input')
  var submitButton = document.getElementById('submit-button')
  submitButton.addEventListener('click', function () {
    var filename = nameInput.value
    if (filename.split('.').length < 2) {
      alert(
        'Expecting filename to have an extension (e.g., "filname.mp4" or "filename.m3u8").'
      )
    } else {
      playback(filename)
      submitButton.disabled = true
    }
  })

  let playbackStart
  let metadataSet = new Set()

  function getAuthQueryParams() {
    var auth = configuration.authentication
    var kv = []
    for (var key in auth) {
      if (key === 'enabled' || auth[key] === '') continue
      kv.push(`${key}=${auth[key]}`)
    }
    return kv.join('&')
  }

  function isMP4File(url) {
    return url.indexOf('.mp4') !== -1
  }

  function useMP4Playback(url) {
    console.log('[subscribe] Playback MP4: ' + url)
    var element = document.getElementById('red5pro-subscriber')
    var source = document.createElement('source')
    source.type = 'video/mp4;codecs="avc1.42E01E, mp4a.40.2"'
    source.src = url
    element.appendChild(source)
  }

  function useHLSJSFallback(url) {
    console.log('[subscribe] Playback HLS: ' + url)
    var video = document.getElementById('red5pro-subscriber')
    video.classList.add('video-js')
    var videoSrc = url
    if (window.Hls.isSupported()) {
      var hls = new window.Hls()
      // bind them together
      hls.attachMedia(video)
      hls.on(window.Hls.Events.MEDIA_ATTACHED, function () {
        console.log('video and hls.js are now bound together !')
        hls.loadSource(videoSrc)
        hls.on(window.Hls.Events.MANIFEST_PARSED, function (event, data) {
          video.play()
          video.currentTime = 1
          playbackStart = new Date().getTime()
          console.log(
            'manifest loaded, found ' + data.levels.length + ' quality level'
          )
        })
      })
      enableMetadataMonitor(video)
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc
      enableMetadataMonitor(video)
    }
  }

  function enableMetadataMonitor(video) {
    const textTracks =
      typeof video.textTracks === 'function'
        ? video.textTracks()
        : video.textTracks
    if (textTracks) {
      video.addTextTrack('metadata')
      textTracks.addEventListener('addtrack', (addTrackEvent) => {
        let track = addTrackEvent.track
        track.mode = 'hidden'
        track.addEventListener('cuechange', (cueChangeEvent) => {
          let cues
          let i
          // Mostly Chrome.
          if (cueChangeEvent && cueChangeEvent.currentTarget) {
            cues = cueChangeEvent.currentTarget.cues
          } else if (undefined === this) {
            cues = track.cues
            cues = cues && cues.length > 0 ? cues : track.activeCues
          } else if (undefined !== this) {
            // Mostly Firefox & Safari.
            cues = cues && cues.length > 0 ? cues : this.activeCues
          }
          // Mostly failure.
          cues = cues || []
          for (i = 0; i < cues.length; i++) {
            let data = cues[i]
            if (data.value) {
              if (data.value.key === 'TXXX') {
                let metadata = JSON.parse(data.value.data)
                //console.log(metadata)
                processAMFData(metadata, video)
              }
            }
          }
        })
      })
    }
  }

  function processAMFData(data) {
    //console.log('received data: ', data);
    const eventTimeMs = data.eventTimeMs
    if (!metadataSet.has(eventTimeMs)) {
      metadataSet.add(eventTimeMs)
      let now = new Date().getTime()
      if (now > playbackStart + eventTimeMs) {
        const p = document.getElementById('metadata')
        if (p) {
          p.innerHTML = JSON.stringify(data)
        }
      } else {
        setTimeout(() => {
          let now = new Date().getTime()
          console.log('showing', data, 'after', now - playbackStart, 'ms')
          const p = document.getElementById('metadata')
          if (p) {
            p.innerHTML = JSON.stringify(data)
          }
        }, playbackStart + eventTimeMs - now)
      }
    }
  }

  const playback = (fileURL) => {
    const { authentication } = configuration
    const { enabled: useAuthentication } = authentication
    if (useAuthentication) {
      fileURL += `?${getAuthQueryParams()}`
    }
    if (isMP4File(fileURL)) {
      useMP4Playback(fileURL)
    } else {
      useHLSJSFallback(fileURL)
    }
  }
})(this, document, window.red5prosdk)
