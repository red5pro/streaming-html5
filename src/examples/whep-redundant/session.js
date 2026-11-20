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

/* Standby is a server control operation; local element muting only selects audible playback. */
;(() => {
  class RedundantWhepSession {
    constructor({
      sdk,
      mount,
      onChange = () => {},
      fetcher = (...args) => globalThis.fetch(...args),
      now = () => performance.now(),
      pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
    }) {
      this.sdk = sdk
      this.mount = mount
      this.onChange = onChange
      this.fetcher = fetcher
      this.now = now
      this.peers = []
      this.events = []
      this.running = false
      this.activeId = null
      this.audioEnabled = false
      this.promoting = false
      this.polling = false
      this.replenishing = false
      this.pause = pause
    }
    emit(type, details = {}) {
      this.events.push({ atMs: Math.round(this.now()), type, ...details })
      if (this.events.length > 500) this.events.shift()
      this.onChange(this.snapshot())
    }
    observeStreamPath(peer, path) {
      if (
        peer.retired ||
        !path ||
        typeof path.complete !== 'boolean' ||
        !Number.isSafeInteger(path.revision) ||
        path.revision < 0 ||
        !Array.isArray(path.hops) ||
        path.hops.length > 32 ||
        (path.complete && !path.hops.length) ||
        path.hops.some((hop) => typeof hop !== 'string' || !hop || hop.length > 253) ||
        (peer.streamPath && path.revision <= peer.streamPath.revision)
      )
        return
      const previous = peer.streamPath
      peer.streamPath = { hops: [...path.hops], complete: path.complete, revision: path.revision }
      this.emit('stream-path-changed', {
        id: peer.id,
        path: peer.streamPath,
        previous,
        videoFrames: peer.frames,
        emittedAudioSamples: peer.emittedAudioSamples ?? 0,
      })
    }
    async routes() {
      const path = this.config.streamGuid.split('/').map(encodeURIComponent).join('/')
      const api = encodeURIComponent(this.config.apiVersion || 'v1')
      const url = new URL(
        `/as/${api}/streams/stream/${encodeURIComponent(this.config.nodeGroup)}/subscribe/${path}`,
        this.config.sm
      )
      url.searchParams.set('endpoints', this.config.endpoints)
      url.searchParams.set('strict', this.config.strict)
      if (this.config.subGroup) url.searchParams.set('subgroup', this.config.subGroup)
      if (this.config.region) url.searchParams.set('region', this.config.region)
      const deadline = this.now() + (this.config.routingWaitSeconds ?? 60) * 1000
      let response
      do {
        if (!this.running) throw new Error('Session stopped while waiting for routing')
        response = await this.fetcher(url, { signal: AbortSignal.timeout(10000) })
        if (response.ok) break
        if (![404, 503].includes(response.status) || this.now() >= deadline)
          throw new Error(`Subscribe routing HTTP ${response.status}`)
        this.emit('routing-wait', { status: response.status })
        await this.pause(1000)
      } while (true)
      const routes = await response.json()
      if (!Array.isArray(routes) || routes.length < 2)
        throw new Error('At least two subscribe endpoints are required')
      const addresses = routes.map((route) => route.serverAddress)
      if (addresses.some((address) => !address) || new Set(addresses).size !== addresses.length)
        throw new Error('Subscribe endpoints must be distinct')
      return routes
    }
    async start(config) {
      if (this.running) throw new Error('Stop the current session first')
      this.config = {
        ...config,
        endpoints: Number(config.endpoints ?? 2),
        silenceSeconds: Number(config.silenceSeconds ?? 5),
      }
      if (this.config.endpoints < 2 || this.config.silenceSeconds < 1)
        throw new Error('Invalid endpoint count or silence threshold')
      this.running = true
      try {
        const routes = await this.routes()
        for (const route of routes) await this.connect(route)
        await this.promote(this.peers[0].id, 'initial playback')
        this.timer = setInterval(
          () => this.poll().catch((error) => this.emit('poll-error', { message: error.message })),
          500
        )
        this.emit('started')
      } catch (error) {
        await this.stop()
        throw error
      }
    }
    async connect(route) {
      const id = crypto.randomUUID()
      const video = document.createElement('video')
      video.id = `subscriber-${id}`
      video.autoplay = true
      video.playsInline = true
      video.muted = true
      const container = document.createElement('article')
      container.append(video)
      this.mount.append(container)
      const peer = {
        id,
        address: route.serverAddress,
        video,
        container,
        requested: 'standby',
        ready: false,
        controlReady: false,
        connectionState: 'connecting',
        createdAt: this.now(),
        requestedAt: this.now(),
        lastVideoAt: this.now(),
        bytes: 0,
        frames: 0,
        samples: 0,
        energy: 0,
        messagesReceived: 0,
        messagesSent: 0,
        transportBytes: 0,
        redFrames: 0,
        blueFrames: 0,
        firstToneObservations: 0,
        secondToneObservations: 0,
        mutedWindows: 0,
        pcId: null,
      }
      this.peers.push(peer)
      const subscriber = new this.sdk.WHEPClient()
      peer.subscriber = subscriber
      peer.listener = (event) => {
        if (event.type === 'MessageTransport.Change') peer.transportChanged = true
        if (event.type === 'Subscribe.Metadata') {
          this.observeStreamPath(peer, event.data?.streamPath)
        }
        if (
          event.type === 'Subscribe.Fail' ||
          event.type === 'Connect.Failure' ||
          event.type === 'WebRTC.DataChannel.Close'
        ) {
          peer.error = event.type
        }
        this.emit('sdk-event', { id, event: event.type })
      }
      subscriber.on('*', peer.listener)
      const parts = this.config.streamGuid.split('/')
      const streamName = parts.pop()
      const api = encodeURIComponent(this.config.apiVersion || 'v1')
      const endpoint = new URL(
        `/as/${api}/proxy/whep/${[...parts, streamName].map(encodeURIComponent).join('/')}`,
        this.config.sm
      )
      try {
        await subscriber.init({
          endpoint: endpoint.toString(),
          app: parts.join('/'),
          streamName,
          mediaElementId: video.id,
          includeDataChannel: true,
          muteOnAutoplayRestriction: true,
          connectionParams: {
            ...this.config.connectionParams,
            host: peer.address,
            nodeGroup: this.config.nodeGroup,
            streamPath: true,
          },
          rtcConfiguration: this.config.rtcConfiguration ?? { iceServers: [] },
        })
        if (!this.running || peer.retired) throw new Error('Session stopped during initialization')
        await Promise.race([
          subscriber.subscribe(),
          new Promise((_, reject) => {
            peer.connectTimeout = setTimeout(
              () => reject(new Error('Subscriber negotiation timed out')),
              20000
            )
          }),
        ])
        clearTimeout(peer.connectTimeout)
        if (!this.running || peer.retired) throw new Error('Session stopped during negotiation')
        peer.pc = subscriber.getPeerConnection()
        peer.pcId = crypto.randomUUID() // Identity is retained until this specific PeerConnection is retired.
        peer.pc.addEventListener('connectionstatechange', () => {
          peer.connectionState = peer.pc.connectionState
        })
        await this.waitFor(
          () => subscriber.getDataChannel()?.readyState === 'open' && peer.transportChanged,
          20000
        )
        peer.ready = true
        peer.controlReady = true
        peer.connectionState = peer.pc.connectionState
        subscriber.enableStandby()
        peer.requestedAt = this.now()
        this.observeFrames(peer)
        this.observeAudio(peer)
        this.emit('standby-requested', { id, address: peer.address, pcId: peer.pcId })
        return peer
      } catch (error) {
        await this.retire(peer)
        throw error
      }
    }
    observeFrames(peer) {
      const canvas = document.createElement('canvas')
      canvas.width = canvas.height = 1
      const context = canvas.getContext('2d', { willReadFrequently: true })
      const next = () => {
        if (!this.running || peer.retired) return
        peer.lastVideoAt = this.now()
        peer.decodedVideo = (peer.decodedVideo ?? 0) + 1
        try {
          context.drawImage(peer.video, 0, 0, 32, 32, 0, 0, 1, 1)
          const [r, g, b] = context.getImageData(0, 0, 1, 1).data
          if (r > 150 && g < 100 && b < 100) peer.redFrames++
          if (b > 150 && r < 100 && g < 100) peer.blueFrames++
        } catch (error) {
          peer.frameError = error.message
        }
        peer.frameCallback = peer.video.requestVideoFrameCallback(next)
      }
      if (peer.video.requestVideoFrameCallback)
        peer.frameCallback = peer.video.requestVideoFrameCallback(next)
      else throw new Error('requestVideoFrameCallback is required for decoded-media observation')
    }
    observeAudio(peer) {
      const stream =
        peer.subscriber.getMediaStream() ??
        peer.video.srcObject ??
        new MediaStream(peer.pc.getReceivers().map((receiver) => receiver.track))
      if (!stream?.getAudioTracks().length) return
      this.audioContext ??= new AudioContext()
      if (!this.analysisSink) {
        // Keep analysis scheduled even when every media element is locally muted.
        this.analysisSink = this.audioContext.createGain()
        this.analysisSink.gain.value = 0
        this.analysisSink.connect(this.audioContext.destination)
      }
      peer.audioSource = this.audioContext.createMediaStreamSource(stream)
      peer.analyser = this.audioContext.createAnalyser()
      peer.analyser.fftSize = 2048
      peer.audioSource.connect(peer.analyser)
      peer.analyser.connect(this.analysisSink) // The analysis output is always silent.
    }
    async enableAudio() {
      this.audioEnabled = true
      await this.audioContext?.resume()
      for (const peer of this.peers)
        peer.video.muted = !!this.config.silentAudio || peer.id !== this.activeId
      const active = this.peers.find((peer) => peer.id === this.activeId)
      if (active) await active.video.play()
      this.emit('audio-authorized')
    }
    async promote(id, reason = 'manual') {
      if (this.promoting) return
      const target = this.peers.find((peer) => peer.id === id)
      if (!target?.ready || target.subscriber.getDataChannel()?.readyState !== 'open')
        throw new Error('Target control channel is not ready')
      this.promoting = true
      try {
        const startedAt = this.now()
        const previousPath = this.peers.find((peer) => peer.id === this.activeId)?.streamPath
        for (const peer of this.peers) {
          peer.video.muted = true
          if (peer.id !== id && peer.ready && !peer.retired) {
            peer.subscriber.enableStandby()
            peer.requested = 'standby'
            peer.requestedAt = startedAt
            peer.mutedWindows = 0
          }
        }
        target.subscriber.disableStandby()
        target.requested = 'active'
        target.requestedAt = startedAt
        target.lastVideoAt = startedAt
        target.error = null
        target.video.muted = !!this.config.silentAudio || !this.audioEnabled
        target.baselineVideoFrames = target.frames
        target.baselineAudioSamples = target.emittedAudioSamples ?? 0
        target.firstVideoAt = null
        target.firstAudioAt = null
        this.activeId = id
        try {
          await target.video.play()
        } catch (error) {
          this.emit('autoplay-blocked', { id, message: error.message })
        }
        this.emit('promotion-requested', {
          id,
          pcId: target.pcId,
          reason,
          streamPath: target.streamPath,
          previousPath,
        })
      } finally {
        this.promoting = false
      }
    }
    async poll() {
      if (!this.running || this.polling) return
      this.polling = true
      try {
        for (const peer of [...this.peers]) {
          if (peer.retired || !peer.pc) continue
          const oldBytes = peer.bytes
          const oldAudioBytes = peer.audioBytes ?? 0
          const oldEmittedSamples = peer.emittedAudioSamples ?? 0
          let bytes = 0,
            audioBytes = 0,
            frames = 0,
            samples = 0,
            emittedAudioSamples = 0,
            energy = 0
          const report = await peer.pc.getStats()
          if (!this.running || peer.retired) continue
          for (const stat of report.values()) {
            if (stat.type === 'inbound-rtp' && !stat.isRemote) {
              bytes += stat.bytesReceived ?? 0
              if (stat.kind === 'video') frames += stat.framesDecoded ?? 0
              if (stat.kind === 'audio') {
                audioBytes += stat.bytesReceived ?? 0
                samples += stat.totalSamplesReceived ?? 0
                emittedAudioSamples += stat.jitterBufferEmittedCount ?? 0
                energy += stat.totalAudioEnergy ?? 0
              }
            }
            if (stat.type === 'data-channel') {
              peer.messagesReceived = stat.messagesReceived ?? 0
              peer.messagesSent = stat.messagesSent ?? 0
            }
            if (stat.type === 'transport') peer.transportBytes = stat.bytesReceived ?? 0
          }
          peer.bytes = bytes
          peer.bytesDelta = bytes - oldBytes
          peer.audioBytes = audioBytes
          peer.frames = frames
          peer.samples = samples
          peer.emittedAudioSamples = emittedAudioSamples
          peer.energy = energy
          if (
            peer.subscriber.getPeerConnection &&
            peer.subscriber.getPeerConnection() !== peer.pc
          ) {
            peer.error = 'SDK replaced PeerConnection'
          }
          if (peer.requested === 'standby' && this.now() - peer.requestedAt > 2000) {
            peer.mutedWindows = peer.bytesDelta === 0 ? peer.mutedWindows + 1 : 0
          }
          peer.controlReady = peer.subscriber.getDataChannel()?.readyState === 'open'
          peer.connectionState = peer.pc.connectionState
          if (!peer.analyser) this.observeAudio(peer)
          if (
            peer.analyser &&
            this.audioContext.state === 'running' &&
            peer.audioBytes > oldAudioBytes &&
            peer.emittedAudioSamples > oldEmittedSamples
          ) {
            const values = new Float32Array(peer.analyser.frequencyBinCount)
            peer.analyser.getFloatFrequencyData(values)
            const bin = (hz) =>
              Math.round((hz * peer.analyser.fftSize) / this.audioContext.sampleRate)
            const first = values[bin(1000)],
              second = values[bin(2000)]
            if (first > -60 && first > second + 12) peer.firstToneObservations++
            if (second > -60 && second > first + 12) peer.secondToneObservations++
          }
          if (
            peer.requested === 'active' &&
            peer.frames > peer.baselineVideoFrames &&
            !peer.firstVideoAt
          ) {
            peer.firstVideoAt = this.now()
            this.emit('first-decoded-video', {
              id: peer.id,
              sinceRequestMs: Math.round(peer.firstVideoAt - peer.requestedAt),
            })
          }
          if (
            peer.requested === 'active' &&
            peer.emittedAudioSamples > peer.baselineAudioSamples &&
            !peer.firstAudioAt
          ) {
            peer.firstAudioAt = this.now()
            this.emit('first-decoded-audio', {
              id: peer.id,
              sinceRequestMs: Math.round(peer.firstAudioAt - peer.requestedAt),
            })
          }
        }
        const active = this.peers.find((peer) => peer.id === this.activeId)
        if (
          active &&
          (['failed', 'closed', 'disconnected'].includes(active.connectionState) ||
            active.error ||
            this.now() - active.lastVideoAt > this.config.silenceSeconds * 1000)
        ) {
          const backup = this.peers.find(
            (peer) =>
              peer.id !== active.id &&
              !peer.retired &&
              peer.controlReady &&
              peer.connectionState === 'connected'
          )
          if (backup) {
            await this.promote(
              backup.id,
              `active ${active.connectionState}, media silence ${Math.round(this.now() - active.lastVideoAt)}ms`
            )
            await this.retire(active)
          }
        }
        if (
          this.peers.filter((peer) => !peer.retired).length < this.config.endpoints &&
          this.now() >= (this.nextReplenishAt ?? 0)
        ) {
          this.replenish()
        }
        this.onChange(this.snapshot())
      } finally {
        this.polling = false
      }
    }
    snapshot() {
      const fields = [
        'id',
        'address',
        'pcId',
        'streamPath',
        'requested',
        'ready',
        'controlReady',
        'connectionState',
        'createdAt',
        'requestedAt',
        'bytes',
        'bytesDelta',
        'frames',
        'samples',
        'audioBytes',
        'emittedAudioSamples',
        'energy',
        'messagesReceived',
        'messagesSent',
        'transportBytes',
        'redFrames',
        'blueFrames',
        'firstToneObservations',
        'secondToneObservations',
        'lastVideoAt',
        'mutedWindows',
        'firstVideoAt',
        'firstAudioAt',
        'error',
      ]
      return {
        running: this.running,
        activeId: this.activeId,
        audioEnabled: this.audioEnabled,
        peers: this.peers
          .filter((peer) => !peer.retired)
          .map((peer) => Object.fromEntries(fields.map((key) => [key, peer[key] ?? null]))),
        events: [...this.events],
      }
    }
    async waitFor(predicate, timeout) {
      const deadline = this.now() + timeout
      while (!predicate()) {
        if (!this.running) throw new Error('Session stopped')
        if (this.now() >= deadline) throw new Error('Timed out waiting for subscriber readiness')
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
    }
    async retire(peer) {
      if (peer.retired) return
      peer.retired = true
      peer.ready = false
      peer.video.muted = true
      clearTimeout(peer.connectTimeout)
      peer.subscriber?.off('*', peer.listener)
      if (peer.frameCallback) peer.video.cancelVideoFrameCallback(peer.frameCallback)
      peer.audioSource?.disconnect()
      peer.analyser?.disconnect()
      ;(peer.pc ?? peer.subscriber?.getPeerConnection())?.close()
      try {
        await Promise.race([
          peer.subscriber?.unsubscribe(),
          new Promise((resolve) => {
            peer.retireTimeout = setTimeout(resolve, 3000)
          }),
        ])
      } catch (error) {
        /* A lost edge may not acknowledge DELETE. Its peer is already closed. */
      }
      clearTimeout(peer.retireTimeout)
      peer.video.srcObject = null
      peer.container.remove()
      this.peers = this.peers.filter((current) => current !== peer)
    }
    async replenish() {
      if (this.replenishing || !this.running) return
      this.replenishing = true
      this.nextReplenishAt = this.now() + 5000
      try {
        const existing = new Set(
          this.peers.filter((peer) => !peer.retired).map((peer) => peer.address)
        )
        const routes = await this.routes()
        for (const route of routes) {
          if (
            !this.running ||
            this.peers.filter((peer) => !peer.retired).length >= this.config.endpoints
          )
            break
          if (!existing.has(route.serverAddress)) await this.connect(route)
        }
      } catch (error) {
        this.emit('standby-replenish-error', { message: error.message })
      } finally {
        this.replenishing = false
        this.nextReplenishAt = this.now() + 5000
      }
    }
    async stop() {
      this.running = false
      clearInterval(this.timer)
      await Promise.allSettled(this.peers.map((peer) => this.retire(peer)))
      this.peers = []
      this.activeId = null
      await this.audioContext?.close()
      this.audioContext = null
      this.analysisSink = null
      this.emit('stopped')
    }
  }
  globalThis.RedundantWhepSession = RedundantWhepSession
})()
