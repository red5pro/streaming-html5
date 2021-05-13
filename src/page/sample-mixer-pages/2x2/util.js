/* eslint-disable no-console */
(window => {

  /**
   * Requests and returns flag of streamName being available on the server.
   * If requiresStreamManager, it additionally filters the listing based on `edge` type.
   */
  const getIsAvailable = async (url, streamName, requiresStreamManager) => {
    try {
      let payload
      const response = await fetch(url)
      if (response.headers.get('content-type') &&
        response.headers.get('content-type').toLowerCase().indexOf('application/json') >= 0) {
        payload = await response.json()
      } else {
        payload = await response.text()
      }

      let json = payload
      if (typeof payload === 'string') {
        json = JSON.parse(payload)
      }

      if (requiresStreamManager) {
        return json.filter(stream => (stream.name === streamName && stream.type === 'edge')).length > 0
      } else {
        return json.filter(stream => (stream.name === streamName)).length > 0
      }
    } catch (e) {
      console.error(e)
      return false
    }
  }

  /**
   * Returns the stream listing on the server.
   */
  const getStreamList = async (url) => {
    try {
      let payload
      let streamList
      const response = await fetch(url)
      if (response.headers.get('content-type') &&
        response.headers.get('content-type')
          .toLowerCase().indexOf('application/json') >= 0) {
        payload = await response.json()
      } else {
        payload = await response.text()
      }
      streamList = payload
      if (typeof payload === 'string') {
        try {
          streamList = JSON.parse(payload)
        } catch (e) {
          console.error(`Stream list error from: ${payload}`)
          throw new TypeError('Could not properly parse stream list response: ' + e.message)
        }
      }
      return streamList
    } catch (e) {
      throw e
    }
  }

  ////////////////////////////
  // RTCStatsReport Utility.
  ////////////////////////////
  const vRegex = /VideoStream/
  const aRegex = /AudioStream/

  // global bitrate - legacy
  let globalBitrateTicket = undefined
  // ticket system
  let bitrateTickets = []
  class BitrateTicket {
    constructor(connection, cb, resolutionCb, isSubscriber) {
      this.connection = connection
      this.cb = cb
      this.resolutionCb = resolutionCb
      this.isSubscriber = isSubscriber
      this.bitrateInterval = 0
      this.audioOnly = false
    }
    start() {
      let lastResult
      let ticket = this
      let connection = this.connection
      let cb = this.cb
      let resolutionCb = this.resolutionCb
      let isSubscriber = this.isSubscriber
      this.bitrateInterval = setInterval(() => {
        connection.getStats(null).then(res => {
          res.forEach(report => {
            let bytes
            let packets
            let now = report.timestamp
            let bitrate
            const {
              id,
              type,
              bytesSent,
              bytesReceived,
              packetsSent,
              packetsReceived,
              mediaType,
              frameWidth,
              frameHeight
            } = report
            if (!isSubscriber &&
              ((type === 'outboundrtp') ||
                (type === 'outbound-rtp') ||
                (type === 'ssrc' && bytesSent))) {
              bytes = bytesSent
              packets = packetsSent
              if (mediaType === 'video' || id.match(vRegex)) {
                if (lastResult && lastResult.get(id)) {
                  // calculate bitrate
                  bitrate = 8 * (bytes - lastResult.get(id).bytesSent) /
                    (now - lastResult.get(id).timestamp)
                  cb(bitrate, packets)
                  if (resolutionCb) {
                    resolutionCb(frameWidth, frameHeight)
                  }
                }
              }
            }
            // playback.
            else if (isSubscriber &&
              ((type === 'inboundrtp') ||
                (type === 'inbound-rtp') ||
                (type === 'ssrc' && bytesReceived))) {
              bytes = bytesReceived
              packets = packetsReceived
              if (ticket.audioOnly && (mediaType === 'audio' || id.match(aRegex))) {
                if (lastResult && lastResult.get(id)) {
                  // calculate bitrate
                  bitrate = 8 * (bytes - lastResult.get(id).bytesReceived) /
                    (now - lastResult.get(id).timestamp)
                  cb(bitrate, packets)
                }
              }
              else if (!ticket.audioOnly && (mediaType === 'video' || id.match(vRegex))) {
                if (lastResult && lastResult.get(id)) {
                  // calculate bitrate
                  bitrate = 8 * (bytes - lastResult.get(id).bytesReceived) /
                    (now - lastResult.get(id).timestamp)
                  cb(bitrate, packets)
                }
              }
            }
            else if (resolutionCb && report.type === 'track') {
              const {
                kind
              } = report
              if (kind === 'video' ||
                (frameWidth || frameHeight)) {
                if (frameWidth > 0 || frameHeight > 0) {
                  resolutionCb(frameWidth, frameHeight)
                }
              }
            }
          })
          lastResult = res
        })
      }, 1000)
    }

    stop() {
      clearInterval(this.bitrateInterval)
    }

    audioOnly() {
      this.audioOnly = true
    }
  }

  window.trackBitrate = (connection, cb, resolutionCb, isSubscriber, withTicket) => {
    const t = new BitrateTicket(connection, cb, resolutionCb, isSubscriber);
    if (withTicket) {
      const ticket = ['bitrateTicket', Math.floor(Math.random() * 0x10000).toString(16)].join('-');
      bitrateTickets[ticket] = t
      t.start()
      return ticket
    } else if (globalBitrateTicket) {
      globalBitrateTicket.stop()
    }
    globalBitrateTicket = t
    t.start()
    return globalBitrateTicket
  }

  window.untrackBitrate = ticket => {
    if (!ticket && globalBitrateTicket) {
      globalBitrateTicket.stop()
    } else if (bitrateTickets[ticket]) {
      bitrateTickets[ticket].stop()
      delete bitrateTickets[ticket]
    }
  }

  window.getStreamList = getStreamList
  window.getIsStreamAvailable = getIsAvailable

})(window)
