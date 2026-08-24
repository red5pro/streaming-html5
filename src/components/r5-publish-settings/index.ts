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

import { publicAssetPrefix } from '@/lib/public-path'
import {
  DEFAULT_AUDIO_BITRATE_KBPS,
  DEFAULT_KEYFRAME_INTERVAL_SECONDS,
  DEFAULT_RESOLUTION_ID,
  getResolutionPreset,
} from '@/lib/publish-presets'
import { publishSettingsTemplate } from './template'

export interface PublisherMediaOptions {
  bandwidth: { audio: number; video: number }
  keyFramerate: number
}

export interface PublishMediaConfig {
  videoEnabled: boolean
  audioEnabled: boolean
}

export interface AudioAdvancedSettings {
  sampleRate: number
  sampleSize: number
  channelCount: number
  audioBitrateKbps: number
  echoCancellation: boolean
  noiseSuppression: boolean
  autoGainControl: boolean
}

export interface AppliedTrackSettings {
  audio?: MediaTrackSettings
  video?: MediaTrackSettings
}

export interface MediaConstraintsSummary {
  requested: MediaStreamConstraints | null
  applied: AppliedTrackSettings
  publisherOptions: PublisherMediaOptions
}

type SupportedMediaConstraints = MediaTrackSupportedConstraints

function formatMediaAccessError(error: unknown): { message: string; constraint?: string } {
  if (error instanceof DOMException) {
    if (error.name === 'OverconstrainedError') {
      const constraint = (error as DOMException & { constraint?: string }).constraint
      return {
        message: constraint
          ? `Constraint not satisfied: ${constraint}. ${error.message}`
          : error.message,
        constraint,
      }
    }
    return { message: `${error.name}: ${error.message}` }
  }
  return { message: String(error) }
}

export class R5PublishSettings extends HTMLElement {
  private shadow: ShadowRoot
  private panelEl!: HTMLElement
  private audioDisabled!: boolean
  private audioSection!: HTMLElement
  private cameraSelect!: HTMLSelectElement | null
  private audioSelect!: HTMLSelectElement
  private resolutionSelect!: HTMLSelectElement
  private bitrateInput!: HTMLInputElement
  private keyframeInput!: HTMLInputElement
  private statusEl!: HTMLParagraphElement
  private videoDependentRow!: HTMLDivElement
  private audioDependentRow!: HTMLDivElement
  private audioAdvancedRow!: HTMLDivElement
  private videoToggle!: HTMLLabelElement
  private videoTrack!: HTMLDivElement
  private audioToggle!: HTMLLabelElement
  private audioTrack!: HTMLDivElement
  private audioSampleRateInput!: HTMLInputElement
  private audioSampleSizeInput!: HTMLInputElement
  private audioChannelCountInput!: HTMLInputElement
  private audioBitrateInput!: HTMLInputElement
  private audioEchoCancellationInput!: HTMLInputElement
  private audioNoiseSuppressionInput!: HTMLInputElement
  private audioAutoGainControlInput!: HTMLInputElement
  private echoCancellationField!: HTMLLabelElement
  private noiseSuppressionField!: HTMLLabelElement
  private autoGainControlField!: HTMLLabelElement
  private videoElement: HTMLVideoElement | null = null
  private stream: MediaStream | null = null
  private refreshPromise: Promise<MediaStream | null> | null = null
  private controlsWired = false
  private audioDefaultsSeeded = false
  private supportedConstraints: SupportedMediaConstraints = {}

  static get observedAttributes(): string[] {
    return ['disabled', 'audio-advanced', 'screenshare', 'audio-disabled']
  }

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback(): void {
    if (!this.shadow.querySelector('.publish-settings')) {
      this.shadow.innerHTML = publishSettingsTemplate(publicAssetPrefix(), this.hasScreenshare())
      this.controlsWired = false
    }

    this.panelEl = this.shadow.querySelector('.publish-settings') as HTMLElement
    this.audioSection = this.shadow.querySelector(
      '.publish-settings__section--audio'
    ) as HTMLElement
    if (this.audioDisabled) {
      this.audioSection.classList.add('is-hidden')
    }
    this.cameraSelect = this.shadow.getElementById('camera-select') as HTMLSelectElement | null
    this.audioSelect = this.shadow.getElementById('audio-select') as HTMLSelectElement
    this.resolutionSelect = this.shadow.getElementById('resolution-select') as HTMLSelectElement
    this.bitrateInput = this.shadow.getElementById('bitrate-input') as HTMLInputElement
    this.keyframeInput = this.shadow.getElementById('keyframe-input') as HTMLInputElement
    this.statusEl = this.shadow.getElementById('publish-settings-status') as HTMLParagraphElement
    this.videoDependentRow = this.shadow.getElementById('video-dependent-row') as HTMLDivElement
    this.audioDependentRow = this.shadow.getElementById('audio-dependent-row') as HTMLDivElement
    this.audioAdvancedRow = this.shadow.getElementById('audio-advanced-row') as HTMLDivElement
    this.videoToggle = this.shadow.getElementById('video-toggle') as HTMLLabelElement
    this.videoTrack = this.shadow.getElementById('video-track') as HTMLDivElement
    this.audioToggle = this.shadow.getElementById('audio-toggle') as HTMLLabelElement
    this.audioTrack = this.shadow.getElementById('audio-track') as HTMLDivElement
    this.audioSampleRateInput = this.shadow.getElementById(
      'audio-sample-rate-input'
    ) as HTMLInputElement
    this.audioSampleSizeInput = this.shadow.getElementById(
      'audio-sample-size-input'
    ) as HTMLInputElement
    this.audioChannelCountInput = this.shadow.getElementById(
      'audio-channel-count-input'
    ) as HTMLInputElement
    this.audioBitrateInput = this.shadow.getElementById('audio-bitrate-input') as HTMLInputElement
    this.audioEchoCancellationInput = this.shadow.getElementById(
      'audio-echo-cancellation-input'
    ) as HTMLInputElement
    this.audioNoiseSuppressionInput = this.shadow.getElementById(
      'audio-noise-suppression-input'
    ) as HTMLInputElement
    this.audioAutoGainControlInput = this.shadow.getElementById(
      'audio-auto-gain-control-input'
    ) as HTMLInputElement
    this.echoCancellationField = this.audioEchoCancellationInput.closest(
      'label'
    ) as HTMLLabelElement
    this.noiseSuppressionField = this.audioNoiseSuppressionInput.closest(
      'label'
    ) as HTMLLabelElement
    this.autoGainControlField = this.audioAutoGainControlInput.closest('label') as HTMLLabelElement

    this.supportedConstraints = navigator.mediaDevices?.getSupportedConstraints?.() ?? {}
    this.resolutionSelect.value = DEFAULT_RESOLUTION_ID
    this.applyDefaultBitrateForResolution()
    this.keyframeInput.value = String(DEFAULT_KEYFRAME_INTERVAL_SECONDS)
    this.audioBitrateInput.value = String(DEFAULT_AUDIO_BITRATE_KBPS)

    const audioDisabled = new URLSearchParams(window.location.search).get('useAudio') === 'false'
    this.audioTrack.classList.toggle('on', !audioDisabled)
    this.syncAudioControls()

    const videoDisabled = new URLSearchParams(window.location.search).get('useVideo') === 'false'
    this.videoTrack.classList.toggle('on', !videoDisabled)

    const videoTarget = this.getAttribute('video-target')
    if (videoTarget) {
      this.videoElement = document.getElementById(videoTarget) as HTMLVideoElement | null
    }

    if (!this.controlsWired) {
      this.controlsWired = true
      this.wireControlListeners()
    }

    this.syncAudioAdvancedVisibility()
    this.syncSupportedAudioAdvancedFields()
    this.syncInteractionState()

    if (this.hasScreenshare()) {
      void this.initializeMedia().then(() => this.dispatchUpdated())
    } else {
      void this.initializeMedia().then(() => this.refreshStream())
    }
  }

  attributeChangedCallback(name: string): void {
    if (name === 'disabled') {
      this.syncInteractionState()
    }
    if (name === 'audio-advanced') {
      this.syncAudioAdvancedVisibility()
      if (this.hasAudioAdvanced() && !this.audioDefaultsSeeded) {
        void this.seedAudioDefaultsFromBrowser().then(() => this.refreshStream())
      }
    }
    if (name === 'audio-disabled') {
      this.audioDisabled = this.getAttribute('audio-disabled') !== null
      // this.audioSection.classList.add('is-hidden')
    }
  }

  disconnectedCallback(): void {
    this.stopStream()
  }

  get enabled(): boolean {
    return !this.hasAttribute('disabled')
  }

  set enabled(value: boolean) {
    if (value) this.removeAttribute('disabled')
    else this.setAttribute('disabled', '')
  }

  isInteractionDisabled(): boolean {
    return this.hasAttribute('disabled')
  }

  hasAudioAdvanced(): boolean {
    return this.hasAttribute('audio-advanced')
  }

  hasScreenshare(): boolean {
    return this.hasAttribute('screenshare')
  }

  isVideoEnabled(): boolean {
    if (this.hasScreenshare()) return true
    return this.videoTrack.classList.contains('on')
  }

  isAudioEnabled(): boolean {
    if (this.audioDisabled || !this.audioTrack) return false
    return this.audioTrack.classList.contains('on')
  }

  getMediaConfig(): PublishMediaConfig {
    return {
      videoEnabled: this.isVideoEnabled(),
      audioEnabled: this.isAudioEnabled(),
    }
  }

  getStream(): MediaStream | null {
    return this.stream
  }

  getAudioAdvancedSettings(): AudioAdvancedSettings | null {
    if (!this.hasAudioAdvanced()) return null
    return this.readAudioAdvancedSettings()
  }

  getRequestedConstraints(): MediaStreamConstraints | null {
    return this.buildMediaConstraints()
  }

  getAppliedTrackSettings(): AppliedTrackSettings {
    return this.readAppliedTrackSettings()
  }

  getConstraintsSummary(): MediaConstraintsSummary {
    return {
      requested: this.buildMediaConstraints(),
      applied: this.readAppliedTrackSettings(),
      publisherOptions: this.getPublisherOptions(),
    }
  }

  getSelectedResolutionId(): string {
    return this.resolutionSelect?.value ?? DEFAULT_RESOLUTION_ID
  }

  getPublisherOptions(): PublisherMediaOptions {
    const queryParams = new URLSearchParams(window.location.search)
    const audioBW = queryParams.get('audioBW')
    const videoBW = queryParams.get('videoBW')
    const keyFramerate = queryParams.get('keyFramerate')

    const videoEnabled = this.isVideoEnabled()
    const audioEnabled = this.isAudioEnabled()
    const preset = getResolutionPreset(this.resolutionSelect.value)
    const videoBitrate = Number(videoBW || this.bitrateInput.value)
    const keyframeSeconds = Number(keyFramerate || this.keyframeInput.value)
    const audioBitrate = Number(
      audioBW ||
        (this.hasAudioAdvanced()
          ? Number(this.audioBitrateInput.value)
          : DEFAULT_AUDIO_BITRATE_KBPS)
    )

    return {
      bandwidth: {
        audio:
          audioEnabled && Number.isFinite(audioBitrate) && audioBitrate > 0
            ? audioBitrate
            : audioEnabled
              ? DEFAULT_AUDIO_BITRATE_KBPS
              : 0,
        video:
          videoEnabled && Number.isFinite(videoBitrate) && videoBitrate > 0
            ? videoBitrate
            : videoEnabled
              ? preset.defaultBitrateKbps
              : 0,
      },
      keyFramerate:
        videoEnabled && Number.isFinite(keyframeSeconds) && keyframeSeconds > 0
          ? Math.round(keyframeSeconds * 1000)
          : DEFAULT_KEYFRAME_INTERVAL_SECONDS * 1000,
    }
  }

  async refreshStream(): Promise<MediaStream | null> {
    if (this.isInteractionDisabled()) return this.stream
    if (this.refreshPromise) return this.refreshPromise
    this.refreshPromise = this.acquireStream().finally(() => {
      this.refreshPromise = null
    })
    return this.refreshPromise
  }

  stopStream(): void {
    if (!this.stream) return
    this.stream.getTracks().forEach((track) => track.stop())
    this.stream = null
    if (this.videoElement) {
      this.videoElement.srcObject = null
    }
  }

  private wireControlListeners(): void {
    if (!this.hasScreenshare()) {
      this.videoToggle.addEventListener('click', () => this.toggleVideo())
    }
    this.audioToggle.addEventListener('click', () => this.toggleAudio())
    this.cameraSelect?.addEventListener('change', () => {
      if (this.isInteractionDisabled()) return
      void this.refreshStream()
    })
    this.audioSelect.addEventListener('change', () => {
      if (this.isInteractionDisabled()) return
      void this.refreshStream()
    })
    this.resolutionSelect.addEventListener('change', () => {
      if (this.isInteractionDisabled()) return
      this.applyDefaultBitrateForResolution()
      void this.refreshStream()
    })
    this.bitrateInput.addEventListener('change', () => {
      if (this.isInteractionDisabled()) return
      this.dispatchUpdated()
    })
    this.keyframeInput.addEventListener('change', () => {
      if (this.isInteractionDisabled()) return
      this.dispatchUpdated()
    })

    const refreshOnAdvancedChange = (): void => {
      if (this.isInteractionDisabled()) return
      void this.refreshStream()
    }

    this.audioSampleRateInput.addEventListener('change', refreshOnAdvancedChange)
    this.audioSampleSizeInput.addEventListener('change', refreshOnAdvancedChange)
    this.audioChannelCountInput.addEventListener('change', refreshOnAdvancedChange)
    this.audioEchoCancellationInput.addEventListener('change', refreshOnAdvancedChange)
    this.audioNoiseSuppressionInput.addEventListener('change', refreshOnAdvancedChange)
    this.audioAutoGainControlInput.addEventListener('change', refreshOnAdvancedChange)
    this.audioBitrateInput.addEventListener('change', () => {
      if (this.isInteractionDisabled()) return
      this.dispatchUpdated()
    })
  }

  private async initializeMedia(): Promise<void> {
    if (this.hasScreenshare()) {
      await this.loadAudioDevices()
      if (this.hasAudioAdvanced() && !this.audioDefaultsSeeded) {
        await this.seedAudioDefaultsFromBrowser()
      }
      return
    }

    await this.loadDevices()
    if (this.hasAudioAdvanced() && !this.audioDefaultsSeeded) {
      await this.seedAudioDefaultsFromBrowser()
    }
  }

  private toggleVideo(): void {
    if (this.isInteractionDisabled()) return
    this.videoTrack.classList.toggle('on')
    this.syncVideoControls()
    void this.refreshStream()
  }

  private toggleAudio(): void {
    if (this.isInteractionDisabled()) return
    this.audioTrack.classList.toggle('on')
    this.syncAudioControls()
    void this.refreshStream()
  }

  private syncVideoControls(): void {
    if (this.hasScreenshare()) {
      this.videoDependentRow.classList.remove('is-hidden')
      const panelDisabled = this.isInteractionDisabled()
      this.resolutionSelect.disabled = panelDisabled
      this.bitrateInput.disabled = panelDisabled
      this.keyframeInput.disabled = panelDisabled
      return
    }

    const enabled = this.isVideoEnabled()
    this.videoDependentRow.classList.toggle('is-hidden', !enabled)
    this.cameraSelect!.disabled = !enabled || this.isInteractionDisabled()
    this.resolutionSelect.disabled = !enabled || this.isInteractionDisabled()
    this.bitrateInput.disabled = !enabled || this.isInteractionDisabled()
    this.keyframeInput.disabled = !enabled || this.isInteractionDisabled()
  }

  private syncAudioControls(): void {
    const enabled = this.isAudioEnabled()
    const panelDisabled = this.isInteractionDisabled()
    this.audioDependentRow.classList.toggle('is-hidden', !enabled)
    this.audioSelect.disabled = !enabled || panelDisabled
    this.syncAudioAdvancedControls(enabled, panelDisabled)
  }

  private syncAudioAdvancedVisibility(): void {
    const show = this.hasAudioAdvanced() && this.isAudioEnabled()
    if (this.audioAdvancedRow) this.audioAdvancedRow.classList.toggle('is-hidden', !show)
  }

  private syncAudioAdvancedControls(audioEnabled: boolean, panelDisabled: boolean): void {
    const disabled = !audioEnabled || panelDisabled || !this.hasAudioAdvanced()
    this.audioSampleRateInput.disabled = disabled || !this.isConstraintSupported('sampleRate')
    this.audioSampleSizeInput.disabled = disabled || !this.isConstraintSupported('sampleSize')
    this.audioChannelCountInput.disabled = disabled || !this.isConstraintSupported('channelCount')
    this.audioBitrateInput.disabled = disabled
    this.audioEchoCancellationInput.disabled =
      disabled || !this.isConstraintSupported('echoCancellation')
    this.audioNoiseSuppressionInput.disabled =
      disabled || !this.isConstraintSupported('noiseSuppression')
    this.audioAutoGainControlInput.disabled = disabled || !this.isConstraintSupported('autoGainControl')
    this.syncAudioAdvancedVisibility()
  }

  private syncSupportedAudioAdvancedFields(): void {
    this.toggleUnsupportedField(this.audioSampleRateInput, this.isConstraintSupported('sampleRate'))
    this.toggleUnsupportedField(this.audioSampleSizeInput, this.isConstraintSupported('sampleSize'))
    this.toggleUnsupportedField(this.audioChannelCountInput, this.isConstraintSupported('channelCount'))
    this.toggleUnsupportedCheckboxField(
      this.echoCancellationField,
      this.isConstraintSupported('echoCancellation')
    )
    this.toggleUnsupportedCheckboxField(
      this.noiseSuppressionField,
      this.isConstraintSupported('noiseSuppression')
    )
    this.toggleUnsupportedCheckboxField(
      this.autoGainControlField,
      this.isConstraintSupported('autoGainControl')
    )
  }

  private isConstraintSupported(name: keyof SupportedMediaConstraints): boolean {
    return this.supportedConstraints[name] === true
  }

  private toggleUnsupportedField(input: HTMLInputElement, supported: boolean | undefined): void {
    input.disabled = input.disabled || !supported
    input.title = supported ? '' : 'Not supported in this browser'
  }

  private toggleUnsupportedCheckboxField(
    field: HTMLLabelElement,
    supported: boolean | undefined
  ): void {
    field.classList.toggle('publish-settings__checkbox-field--unsupported', !supported)
    field.title = supported ? '' : 'Not supported in this browser'
  }

  private async loadDevices(): Promise<void> {
    await Promise.all([this.loadCameras(), this.loadAudioDevices()])
  }

  private async loadCameras(): Promise<void> {
    if (!this.cameraSelect || !navigator.mediaDevices?.enumerateDevices) return

    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const cameras = devices.filter((device) => device.kind === 'videoinput')
      const selected = this.cameraSelect.value

      this.cameraSelect.innerHTML =
        cameras.length === 0
          ? '<option value="">No cameras found</option>'
          : [
              '<option value="">Default camera</option>',
              ...cameras.map(
                (camera, index) =>
                  `<option value="${camera.deviceId}">${camera.label || `Camera ${index + 1}`}</option>`
              ),
            ].join('')

      if (selected && cameras.some((camera) => camera.deviceId === selected)) {
        this.cameraSelect.value = selected
      }
    } catch (error) {
      this.setStatus(`Unable to list cameras: ${String(error)}`, true)
    }
  }

  private async loadAudioDevices(): Promise<void> {
    if (!navigator.mediaDevices?.enumerateDevices) return

    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const microphones = devices.filter((device) => device.kind === 'audioinput')
      const selected = this.audioSelect.value

      this.audioSelect.innerHTML =
        microphones.length === 0
          ? '<option value="">No microphones found</option>'
          : [
              '<option value="">Default microphone</option>',
              ...microphones.map(
                (microphone, index) =>
                  `<option value="${microphone.deviceId}">${microphone.label || `Microphone ${index + 1}`}</option>`
              ),
            ].join('')

      if (selected && microphones.some((microphone) => microphone.deviceId === selected)) {
        this.audioSelect.value = selected
      }
    } catch (error) {
      this.setStatus(`Unable to list microphones: ${String(error)}`, true)
    }
  }

  private readAudioAdvancedSettings(): AudioAdvancedSettings {
    return {
      sampleRate: parseInt(this.audioSampleRateInput.value, 10),
      sampleSize: parseInt(this.audioSampleSizeInput.value, 10),
      channelCount: parseInt(this.audioChannelCountInput.value, 10),
      audioBitrateKbps: parseInt(this.audioBitrateInput.value, 10),
      echoCancellation: this.audioEchoCancellationInput.checked,
      noiseSuppression: this.audioNoiseSuppressionInput.checked,
      autoGainControl: this.audioAutoGainControlInput.checked,
    }
  }

  private applyAudioSettingsFromTrack(settings: MediaTrackSettings): void {
    if (typeof settings.sampleRate === 'number') {
      this.audioSampleRateInput.value = String(settings.sampleRate)
    }
    if (typeof settings.sampleSize === 'number') {
      this.audioSampleSizeInput.value = String(settings.sampleSize)
    }
    if (typeof settings.channelCount === 'number') {
      this.audioChannelCountInput.value = String(settings.channelCount)
    }
    if (typeof settings.echoCancellation === 'boolean') {
      this.audioEchoCancellationInput.checked = settings.echoCancellation
    }
    if (typeof settings.noiseSuppression === 'boolean') {
      this.audioNoiseSuppressionInput.checked = settings.noiseSuppression
    }
    if (typeof settings.autoGainControl === 'boolean') {
      this.audioAutoGainControlInput.checked = settings.autoGainControl
    }
  }

  private async seedAudioDefaultsFromBrowser(): Promise<void> {
    if (!this.hasAudioAdvanced() || this.audioDefaultsSeeded) return
    if (!navigator.mediaDevices?.getUserMedia) return

    const deviceId = this.audioSelect?.value
    const probeConstraints: MediaStreamConstraints = {
      audio: deviceId ? { deviceId: { exact: deviceId } } : true,
      video: false,
    }

    try {
      const probeStream = await navigator.mediaDevices.getUserMedia(probeConstraints)
      const track = probeStream.getAudioTracks()[0]
      if (track) {
        this.applyAudioSettingsFromTrack(track.getSettings())
      }
      probeStream.getTracks().forEach((track) => track.stop())
      this.audioDefaultsSeeded = true
    } catch (error) {
      const { message } = formatMediaAccessError(error)
      this.setStatus(`Unable to read audio defaults: ${message}`, true)
      this.dispatchMediaError(error)
    }
  }

  private buildAudioConstraint(): boolean | MediaTrackConstraints {
    if (this.audioDisabled) return false
    const deviceId = this.audioSelect.value

    if (!this.hasAudioAdvanced()) {
      return deviceId ? { deviceId: { exact: deviceId } } : true
    }

    const audio: MediaTrackConstraints = {}
    if (deviceId) {
      audio.deviceId = { exact: deviceId }
    }

    const advanced = this.readAudioAdvancedSettings()

    if (this.isConstraintSupported('autoGainControl')) {
      audio.autoGainControl = { ideal: advanced.autoGainControl }
    }
    if (this.isConstraintSupported('echoCancellation')) {
      audio.echoCancellation = { ideal: advanced.echoCancellation }
    }
    if (this.isConstraintSupported('noiseSuppression')) {
      audio.noiseSuppression = { ideal: advanced.noiseSuppression }
    }
    if (this.isConstraintSupported('channelCount') && Number.isFinite(advanced.channelCount)) {
      audio.channelCount = advanced.channelCount
    }
    if (this.isConstraintSupported('sampleRate') && Number.isFinite(advanced.sampleRate)) {
      audio.sampleRate = advanced.sampleRate
    }
    if (this.isConstraintSupported('sampleSize') && Number.isFinite(advanced.sampleSize)) {
      audio.sampleSize = advanced.sampleSize
    }

    return audio
  }

  private buildMediaConstraints(): MediaStreamConstraints | null {
    const queryParams = new URLSearchParams(window.location.search)
    const cameraWidth = queryParams.get('cameraWidth')
    const cameraHeight = queryParams.get('cameraHeight')
    const frameRate = queryParams.get('frameRate')
    if (this.hasScreenshare()) {
      const preset = getResolutionPreset(this.resolutionSelect.value)
      const constraints: MediaStreamConstraints = {
        video: {
          width: { ideal: Number(cameraWidth) || preset.width },
          height: { ideal: Number(cameraHeight) || preset.height },
        },
        audio: this.isAudioEnabled() ? this.buildAudioConstraint() : false,
        ...(frameRate ? { frameRate: { ideal: Number(frameRate) } } : {}),
      }
      return constraints
    }

    const videoEnabled = this.isVideoEnabled()
    const audioEnabled = this.isAudioEnabled()

    if (!videoEnabled && !audioEnabled) {
      return null
    }

    const constraints: MediaStreamConstraints = {
      video: false,
      audio: false,
    }

    if (videoEnabled) {
      const preset = getResolutionPreset(this.resolutionSelect.value)
      const deviceId = this.cameraSelect?.value
      constraints.video = {
        width: { ideal: Number(cameraWidth) || preset.width },
        height: { ideal: Number(cameraHeight) || preset.height },
        ...(frameRate ? { frameRate: { ideal: Number(frameRate) } } : {}),
        ...(deviceId ? { deviceId: { exact: deviceId } } : {}),
      }
    }

    if (audioEnabled) {
      constraints.audio = this.buildAudioConstraint()
    }

    return constraints
  }

  private readAppliedTrackSettings(): AppliedTrackSettings {
    if (!this.stream) return {}

    const videoTrack = this.isVideoEnabled() ? this.stream.getVideoTracks()[0] : null
    const audioTrack = this.isAudioEnabled() ? this.stream.getAudioTracks()[0] : null

    return {
      ...(videoTrack ? { video: videoTrack.getSettings() } : {}),
      ...(audioTrack ? { audio: audioTrack.getSettings() } : {}),
    }
  }

  private async acquireStream(): Promise<MediaStream | null> {
    if (this.isInteractionDisabled()) return this.stream
    if (this.refreshPromise) return this.refreshPromise
    this.refreshPromise = (
      this.hasScreenshare() ? this.acquireDisplayStream() : this.acquireUserMediaStream()
    ).finally(() => {
      this.refreshPromise = null
    })
    return this.refreshPromise
  }

  private async acquireUserMediaStream(): Promise<MediaStream | null> {
    if (!navigator.mediaDevices?.getUserMedia) {
      this.setStatus('Media access is not supported in this browser.', true)
      return null
    }

    const constraints = this.buildMediaConstraints()
    if (!constraints) {
      this.stopStream()
      this.setStatus('Enable video or audio to acquire a media stream.', true)
      this.dispatchUpdated()
      return null
    }

    this.setStatus('Requesting media...')
    const previousStream = this.stream

    try {
      const nextStream = await navigator.mediaDevices.getUserMedia(constraints)
      await this.loadDevices()
      return this.applyAcquiredStream(nextStream, previousStream)
    } catch (error) {
      return this.handleAcquireError(error, constraints, previousStream)
    }
  }

  private async acquireDisplayStream(): Promise<MediaStream | null> {
    if (!navigator.mediaDevices?.getDisplayMedia) {
      this.setStatus('Screen sharing is not supported in this browser.', true)
      return null
    }

    const constraints = this.buildMediaConstraints()
    if (!constraints?.video) {
      this.setStatus('Unable to build screen share constraints.', true)
      return null
    }

    this.setStatus('Select a screen, window, or tab to share...')
    const previousStream = this.stream

    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: constraints.video,
        audio: false,
      })

      if (this.isAudioEnabled()) {
        if (!navigator.mediaDevices?.getUserMedia) {
          displayStream.getTracks().forEach((track) => track.stop())
          throw new Error('Microphone access is not supported in this browser.')
        }

        const audioStream = await navigator.mediaDevices.getUserMedia({
          audio: constraints.audio === false ? true : constraints.audio,
          video: false,
        })
        audioStream.getAudioTracks().forEach((track) => displayStream.addTrack(track))
      }

      const videoTrack = displayStream.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.addEventListener('ended', () => {
          this.dispatchEvent(new CustomEvent('screenshare-ended', { bubbles: true }))
        })
      }

      await this.loadAudioDevices()
      return this.applyAcquiredStream(displayStream, previousStream)
    } catch (error) {
      return this.handleAcquireError(error, constraints, previousStream)
    }
  }

  private applyAcquiredStream(
    nextStream: MediaStream,
    previousStream: MediaStream | null
  ): MediaStream {
    if (previousStream) {
      previousStream.getTracks().forEach((track) => track.stop())
    }

    this.stream = nextStream

    if (this.videoElement) {
      const showPreview = this.hasScreenshare() || this.isVideoEnabled()
      this.videoElement.srcObject = showPreview ? nextStream : null
      if (showPreview) {
        void this.videoElement.play().catch(() => undefined)
      }
    }

    this.setStatus('')
    this.dispatchUpdated()
    return nextStream
  }

  private handleAcquireError(
    error: unknown,
    constraints: MediaStreamConstraints | null,
    previousStream: MediaStream | null
  ): MediaStream | null {
    this.stream = previousStream
    if (this.videoElement) {
      const showPreview =
        previousStream && (this.hasScreenshare() || this.isVideoEnabled()) ? previousStream : null
      this.videoElement.srcObject = showPreview
    }

    const { message, constraint } = formatMediaAccessError(error)
    this.setStatus(`Unable to access media: ${message}`, true)
    this.dispatchMediaError(error, constraints, constraint)
    return previousStream
  }

  private applyDefaultBitrateForResolution(): void {
    const preset = getResolutionPreset(this.resolutionSelect.value)
    this.bitrateInput.value = String(preset.defaultBitrateKbps)
  }

  private syncInteractionState(): void {
    if (!this.audioSelect) return

    const panelDisabled = this.isInteractionDisabled()
    if (!this.hasScreenshare()) {
      this.videoToggle.style.pointerEvents = panelDisabled ? 'none' : ''
    }
    this.audioToggle.style.pointerEvents = panelDisabled ? 'none' : ''
    this.panelEl?.classList.toggle('publish-settings--disabled', panelDisabled)
    this.syncVideoControls()
    this.syncAudioControls()
  }

  private setStatus(message: string, isError = false): void {
    this.statusEl.textContent = message
    this.statusEl.classList.toggle('publish-settings__status--error', isError)
  }

  private dispatchMediaError(
    error: unknown,
    requested?: MediaStreamConstraints | null,
    constraint?: string
  ): void {
    const { message } = formatMediaAccessError(error)
    this.dispatchEvent(
      new CustomEvent('publish-settings-error', {
        detail: {
          error: message,
          constraint,
          requested: requested ?? this.buildMediaConstraints(),
        },
        bubbles: true,
      })
    )
  }

  private dispatchUpdated(): void {
    this.dispatchEvent(
      new CustomEvent('publish-settings-updated', {
        detail: {
          stream: this.stream,
          options: this.getPublisherOptions(),
          summary: this.getConstraintsSummary(),
          ...this.getMediaConfig(),
        },
        bubbles: true,
      })
    )
  }
}

if (!customElements.get('r5-publish-settings')) {
  customElements.define('r5-publish-settings', R5PublishSettings)
}

export type R5PublishSettingsElement = R5PublishSettings
