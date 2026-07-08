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

const MIN_DB = -60
const MAX_DB = 0
const PEAK_HOLD_MS = 750

export type AudioLevelReading = {
  rms: number
  peak: number
  rmsDb: number
  peakDb: number
}

export type AudioLevelMeterElements = {
  meterEl: HTMLElement
  barFillEl: HTMLElement
  peakEl: HTMLElement
  dbEl: HTMLElement
}

export function getFirstAudioTrack(peerConnection: RTCPeerConnection): MediaStreamTrack | null {
  for (const receiver of peerConnection.getReceivers()) {
    const { track } = receiver
    if (track?.kind === 'audio' && track.readyState === 'live') {
      return track
    }
  }
  return null
}

function linearToDb(linear: number): number {
  if (linear <= 0) return MIN_DB
  return Math.max(MIN_DB, 20 * Math.log10(linear))
}

function dbToPercent(db: number): number {
  return Math.min(100, Math.max(0, ((db - MIN_DB) / (MAX_DB - MIN_DB)) * 100))
}

function measureLevels(analyser: AnalyserNode, buffer: Uint8Array<ArrayBuffer>): AudioLevelReading {
  analyser.getByteTimeDomainData(buffer)

  let sumSquares = 0
  let peak = 0

  for (let i = 0; i < buffer.length; i++) {
    const sample = (buffer[i] - 128) / 128
    sumSquares += sample * sample
    const abs = Math.abs(sample)
    if (abs > peak) peak = abs
  }

  const rms = Math.sqrt(sumSquares / buffer.length)
  return {
    rms,
    peak,
    rmsDb: linearToDb(rms),
    peakDb: linearToDb(peak),
  }
}

export class AudioLevelAnalyzer {
  private audioContext: AudioContext | null = null
  private streamSource: MediaStreamAudioSourceNode | null = null
  private analyser: AnalyserNode | null = null
  private silentSink: GainNode | null = null
  private rafId: number | null = null
  private timeDomainBuffer: Uint8Array<ArrayBuffer> | null = null
  private peakHoldDb = MIN_DB
  private peakHoldUntil = 0
  private running = false

  constructor(private readonly elements: AudioLevelMeterElements) {}

  get isRunning(): boolean {
    return this.running
  }

  /**
   * Call synchronously from the user-gesture handler (e.g. the subscribe button click)
   * so the AudioContext is created while the browser still counts it as a user gesture.
   * That guarantees it starts in the `running` state in all browsers.
   */
  createContext(): void {
    if (!this.audioContext || this.audioContext.state === 'closed') {
      this.audioContext = new AudioContext()
    }
  }

  /**
   * Start analysis by tapping the MediaStream already assigned to an audio element.
   * Uses createMediaStreamSource so the element continues playing natively — no
   * Web Audio routing takeover.  The source is routed through a silent GainNode to
   * audioContext.destination so the browser keeps the graph active.
   */
  start(audioEl: HTMLAudioElement): void
  start(track: MediaStreamTrack): void
  start(input: HTMLAudioElement | MediaStreamTrack): void {
    this.stop()

    if (!this.audioContext || this.audioContext.state === 'closed') {
      this.audioContext = new AudioContext()
    }

    const audioContext = this.audioContext

    let stream: MediaStream | null = null

    if (input instanceof HTMLAudioElement) {
      const src = input.srcObject
      if (!(src instanceof MediaStream)) {
        console.warn('[AudioLevelAnalyzer] audio element srcObject is not a MediaStream')
        return
      }
      stream = src
    } else {
      stream = new MediaStream([input])
    }

    const analyser = audioContext.createAnalyser()
    analyser.fftSize = 512
    analyser.smoothingTimeConstant = 0.85

    // Silent sink: connects to destination so the graph is active, gain 0 so we
    // don't double-output the audio (the element already plays it natively).
    const silentSink = audioContext.createGain()
    silentSink.gain.value = 0

    const streamSource = audioContext.createMediaStreamSource(stream)
    streamSource.connect(analyser)
    analyser.connect(silentSink)
    silentSink.connect(audioContext.destination)

    this.streamSource = streamSource
    this.analyser = analyser
    this.silentSink = silentSink

    this.timeDomainBuffer = new Uint8Array(analyser.fftSize)
    this.peakHoldDb = MIN_DB
    this.peakHoldUntil = 0
    this.running = true

    this.elements.meterEl.classList.add('is-active')
    this.elements.meterEl.removeAttribute('aria-hidden')

    if (audioContext.state === 'suspended') {
      void audioContext.resume().then(() => this.tick())
    } else {
      this.tick()
    }
  }

  stop(): void {
    this.running = false

    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }

    this.streamSource?.disconnect()
    this.analyser?.disconnect()
    this.silentSink?.disconnect()

    this.streamSource = null
    this.analyser = null
    this.silentSink = null
    this.timeDomainBuffer = null

    this.resetDisplay()
  }

  dispose(): void {
    this.stop()
    void this.audioContext?.close()
    this.audioContext = null
  }

  resetDisplay(): void {
    this.elements.meterEl.classList.remove('is-active')
    this.elements.meterEl.setAttribute('aria-hidden', 'true')
    this.elements.barFillEl.style.width = '0%'
    this.elements.peakEl.style.left = '0%'
    this.elements.dbEl.textContent = '— dBFS'
  }

  private tick = (): void => {
    if (!this.running || !this.analyser || !this.timeDomainBuffer) return

    // Don't try to read from a suspended context — it returns all-128 (silence).
    if (this.audioContext?.state !== 'running') {
      this.rafId = requestAnimationFrame(this.tick)
      return
    }

    const { rmsDb, peakDb } = measureLevels(this.analyser, this.timeDomainBuffer)
    const now = performance.now()

    if (peakDb >= this.peakHoldDb) {
      this.peakHoldDb = peakDb
      this.peakHoldUntil = now + PEAK_HOLD_MS
    } else if (now > this.peakHoldUntil) {
      this.peakHoldDb = peakDb
    }

    this.updateMeter(rmsDb, this.peakHoldDb)
    this.rafId = requestAnimationFrame(this.tick)
  }

  private updateMeter(rmsDb: number, peakDb: number): void {
    const rmsPercent = dbToPercent(rmsDb)
    const peakPercent = dbToPercent(peakDb)

    this.elements.barFillEl.style.width = `${rmsPercent}%`
    this.elements.peakEl.style.left = `${peakPercent}%`
    this.elements.dbEl.textContent = `${rmsDb.toFixed(1)} dBFS`
  }
}
