# Consuming AMF Metadata from RTC Streams with Stream Manager Proxy

When AMF metadata is ingested into source stream published to Red5 Pro, the server stores it into the HLS recording as ID3 tags that can be consumed during VOD. The ID3 tags are retrieved by processing the `textTracks` of the video element as shown in the following code:

```javascript
  function enableMetadataMonitor(player) {

    const textTracks = typeof player.textTracks === 'function' ? player.textTracks() : player.textTracks

    if (textTracks) {

      player.addTextTrack('metadata')

      textTracks.addEventListener('addtrack', addTrackEvent => {

        let track = addTrackEvent.track
        track.mode = 'hidden'
        track.addEventListener('cuechange', cueChangeEvent => {
          let cues
          let i
          // Mostly Chrome.
          if (cueChangeEvent && cueChangeEvent.currentTarget) {
            cues = cueChangeEvent.currentTarget.cues
          }
          else if (undefined === this) {
            cues = track.cues
            cues = cues && cues.length > 0 ? cues : track.activeCues
          }
          else if (undefined !== this) {
            // Mostly Firefox & Safari.
            cues = cues && cues.length > 0 ? cues : this.activeCues
          }
          // Mostly failure.
          cues = cues || []
          for (i = 0; i < cues.length; i++) {
            let data = cues[i]
            if (data.value) {
              if (data.value.key === 'TXXX') {
                // todo add metadata
                processAMFData(data.value.data)
              }
            }
          }
        })

      })
    }

  }

  let offset = -1
  let metadataSet = new Set()
  let lastDisplayTime = -1
  function processAMFData(data) {
    //console.log('received data: ', data)
    data = JSON.parse(data)

    const monthMap = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11
    }

    let creationDate = data.creationdate
    let dateSplits = creationDate.split(" ")
    let timeSplits = dateSplits[3].split(":")
    const date = new Date(dateSplits[4], monthMap[dateSplits[1]], dateSplits[2] - 1, timeSplits[0], timeSplits[1], timeSplits[2])

    let wait = -1
    let now = Date.now()
    if (offset < 0) {
      wait = 0
      lastDisplayTime = now
      offset = date.getTime()
      metadataSet.add(data.title)
    } else if (!metadataSet.has(data.title)) {
      wait = date.getTime() - offset
      if (((now + wait) < (lastDisplayTime + 250)) && ((now + wait) > (lastDisplayTime - 250))) {
        wait = wait + 250
      }
      lastDisplayTime = now + wait
      metadataSet.add(data.title)
    }

    if (wait >= 0) {
      setTimeout(() => {
        const p = document.getElementById('metadata')
        if (p) {
          p.innerHTML = JSON.stringify(data)
        }
      }, wait)
    }
  }
```