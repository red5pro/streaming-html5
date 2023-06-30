# Consuming AMF Metadata from RTC Streams

When AMF metadata is ingested into source stream published to Red5 Pro, the server stores it into the HLS recording as ID3 tags that can be consumed during VOD. The ID3 tags are retrieved by processing the `textTracks` of the video element as shown in the following code:

```javascript
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

let metadataSet = new Set()
function processAMFData(data, video) {
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
```
