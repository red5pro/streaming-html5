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

import {
  SETTINGS_QUERY_KEYS,
  applyTheme,
  DEFAULT_ICE_STUN_URL,
  defaultIceUrlForType,
  DEFAULT_STREAM_MANAGER_API_VERSION,
  loadSettings,
  saveSettings,
  settingsToSearchParams,
  type IceType,
  type Settings,
  type Theme,
  type StatsEndpointOption,
} from '@/settings'
import { publicAssetPrefix } from '@/lib/public-path'
import { listUnsecureNodeGroups } from '@/service/stream-manager'
import { headerTemplate } from './template'

export class R5Header extends HTMLElement {
  private shadow: ShadowRoot
  private panel!: HTMLDivElement
  private toggleBtn!: HTMLButtonElement
  private toggleIcon!: HTMLElement
  private hostInput!: HTMLInputElement
  private streamNameInput!: HTMLInputElement
  private appInput!: HTMLInputElement
  private nodeGroupInputField!: HTMLDivElement
  private nodeGroupInput!: HTMLInputElement
  private nodeGroupSelectField!: HTMLDivElement
  private nodeGroupSelect!: HTMLSelectElement
  private nodeGroupRefreshBtn!: HTMLButtonElement
  private smRegionInput!: HTMLInputElement
  private smApiVersionInput!: HTMLInputElement
  private smAdminUsernameInput!: HTMLInputElement
  private smAdminPasswordInput!: HTMLInputElement
  private smAdminPasswordToggle!: HTMLButtonElement
  private streamManagerAdminRow!: HTMLDivElement
  private authUsernameInput!: HTMLInputElement
  private authPasswordInput!: HTMLInputElement
  private authPasswordToggle!: HTMLButtonElement
  private authTokenInput!: HTMLInputElement
  private streamManagerDependentRow!: HTMLDivElement
  private authDependentRow!: HTMLDivElement
  private useStreamManagerToggle!: HTMLLabelElement
  private useStreamManagerTrack!: HTMLDivElement
  private useAuthenticationToggle!: HTMLLabelElement
  private useAuthenticationTrack!: HTMLDivElement
  private statsIntervalInput!: HTMLInputElement
  private statsEndpointSelect!: HTMLSelectElement
  private statsUrlInput!: HTMLInputElement
  private statsDependentRow!: HTMLDivElement
  private statsUrlRow!: HTMLDivElement
  private useStatisticsToggle!: HTMLLabelElement
  private useStatisticsTrack!: HTMLDivElement
  private iceTypeSelect!: HTMLSelectElement
  private iceUrlInput!: HTMLInputElement
  private iceUsernameInput!: HTMLInputElement
  private iceCredentialInput!: HTMLInputElement
  private iceTurnRow!: HTMLDivElement
  private applyBtn!: HTMLButtonElement
  private resetBtn!: HTMLButtonElement
  private themeToggle!: HTMLLabelElement
  private themeTrack!: HTMLDivElement
  private controlsWired = false
  private nodeGroupSourceRequestId = 0

  private readonly onDocClick = (e: MouseEvent): void => this.handleLinkClick(e)

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback(): void {
    if (!this.shadow.querySelector('#settings-panel')) {
      this.shadow.innerHTML = headerTemplate(publicAssetPrefix())
      this.controlsWired = false
    }

    this.panel = this.shadow.getElementById('settings-panel') as HTMLDivElement
    this.toggleBtn = this.shadow.getElementById('settings-toggle') as HTMLButtonElement
    this.toggleIcon = this.shadow.getElementById('toggle-icon') as HTMLElement
    this.hostInput = this.shadow.getElementById('host-input') as HTMLInputElement
    this.streamNameInput = this.shadow.getElementById('stream-name-input') as HTMLInputElement
    this.appInput = this.shadow.getElementById('app-input') as HTMLInputElement
    this.nodeGroupInputField = this.shadow.getElementById(
      'node-group-input-field'
    ) as HTMLDivElement
    this.nodeGroupInput = this.shadow.getElementById('node-group-input') as HTMLInputElement
    this.nodeGroupSelectField = this.shadow.getElementById(
      'node-group-select-field'
    ) as HTMLDivElement
    this.nodeGroupSelect = this.shadow.getElementById('node-group-select') as HTMLSelectElement
    this.nodeGroupRefreshBtn = this.shadow.getElementById(
      'node-group-refresh-btn'
    ) as HTMLButtonElement
    this.smRegionInput = this.shadow.getElementById('sm-region-input') as HTMLInputElement
    this.smApiVersionInput = this.shadow.getElementById('sm-api-version-input') as HTMLInputElement
    this.smAdminUsernameInput = this.shadow.getElementById(
      'sm-admin-username-input'
    ) as HTMLInputElement
    this.smAdminPasswordInput = this.shadow.getElementById(
      'sm-admin-password-input'
    ) as HTMLInputElement
    this.smAdminPasswordToggle = this.shadow.getElementById(
      'sm-admin-password-toggle'
    ) as HTMLButtonElement
    this.streamManagerAdminRow = this.shadow.getElementById('sm-admin-row') as HTMLDivElement
    this.authUsernameInput = this.shadow.getElementById('auth-username-input') as HTMLInputElement
    this.authPasswordInput = this.shadow.getElementById('auth-password-input') as HTMLInputElement
    this.authPasswordToggle = this.shadow.getElementById(
      'auth-password-toggle'
    ) as HTMLButtonElement
    this.authTokenInput = this.shadow.getElementById('auth-token-input') as HTMLInputElement
    this.streamManagerDependentRow = this.shadow.getElementById(
      'sm-dependent-row'
    ) as HTMLDivElement
    this.authDependentRow = this.shadow.getElementById('auth-dependent-row') as HTMLDivElement
    this.useStreamManagerToggle = this.shadow.getElementById('sm-toggle') as HTMLLabelElement
    this.useStreamManagerTrack = this.shadow.getElementById('sm-track') as HTMLDivElement
    this.useAuthenticationToggle = this.shadow.getElementById('auth-toggle') as HTMLLabelElement
    this.useAuthenticationTrack = this.shadow.getElementById('auth-track') as HTMLDivElement
    this.statsIntervalInput = this.shadow.getElementById('stats-interval-input') as HTMLInputElement
    this.statsEndpointSelect = this.shadow.getElementById(
      'stats-endpoint-select'
    ) as HTMLSelectElement
    this.statsUrlInput = this.shadow.getElementById('stats-url-input') as HTMLInputElement
    this.statsDependentRow = this.shadow.getElementById('stats-dependent-row') as HTMLDivElement
    this.statsUrlRow = this.shadow.getElementById('stats-url-row') as HTMLDivElement
    this.useStatisticsToggle = this.shadow.getElementById('stats-toggle') as HTMLLabelElement
    this.useStatisticsTrack = this.shadow.getElementById('stats-track') as HTMLDivElement
    this.iceTypeSelect = this.shadow.getElementById('ice-type-select') as HTMLSelectElement
    this.iceUrlInput = this.shadow.getElementById('ice-url-input') as HTMLInputElement
    this.iceUsernameInput = this.shadow.getElementById('ice-username-input') as HTMLInputElement
    this.iceCredentialInput = this.shadow.getElementById('ice-credential-input') as HTMLInputElement
    this.iceTurnRow = this.shadow.getElementById('ice-turn-row') as HTMLDivElement
    this.applyBtn = this.shadow.getElementById('settings-apply') as HTMLButtonElement
    this.resetBtn = this.shadow.getElementById('settings-reset') as HTMLButtonElement
    this.themeToggle = this.shadow.getElementById('theme-toggle') as HTMLLabelElement
    this.themeTrack = this.shadow.getElementById('theme-track') as HTMLDivElement

    const settings = loadSettings()
    this.loadIntoForm(settings)
    applyTheme(settings.theme)

    if (!this.controlsWired) {
      this.controlsWired = true
      this.toggleBtn.addEventListener('click', () => this.togglePanel())
      this.applyBtn.addEventListener('click', () => this.applySettings())
      this.resetBtn.addEventListener('click', () => this.resetSettings())
      this.themeToggle.addEventListener('click', () => this.toggleTheme())
      this.useStreamManagerToggle.addEventListener('click', () => this.toggleStreamManager())
      this.useAuthenticationToggle.addEventListener('click', () => this.toggleAuthentication())
      this.useStatisticsToggle.addEventListener('click', () => this.toggleStatistics())
      this.statsEndpointSelect.addEventListener('change', () => this.syncStatisticsUrlRow())
      this.iceTypeSelect.addEventListener('change', () => this.syncIceTypeControls())
      this.authPasswordToggle.addEventListener('click', () => this.togglePasswordVisibility())
      this.smAdminPasswordToggle.addEventListener('click', () =>
        this.toggleSmAdminPasswordVisibility()
      )
      this.nodeGroupRefreshBtn.addEventListener('click', () => {
        void this.refreshNodeGroupOptions()
      })
    }

    document.addEventListener('click', this.onDocClick)
  }

  disconnectedCallback(): void {
    document.removeEventListener('click', this.onDocClick)
  }

  private handleLinkClick(e: MouseEvent): void {
    const anchor = (e.target as Element).closest('a')
    if (!anchor) return

    const href = anchor.getAttribute('href')
    if (!href || href.startsWith('#') || href.startsWith('mailto:')) return

    const target = new URL(href, window.location.href)
    if (target.origin !== window.location.origin) return

    const merged = new URLSearchParams(window.location.search)
    for (const key of SETTINGS_QUERY_KEYS) merged.delete(key)
    for (const [k, v] of settingsToSearchParams(loadSettings())) merged.set(k, v)
    if (!merged.toString()) return

    let changed = false
    for (const [k, v] of merged) {
      if (!target.searchParams.has(k)) {
        target.searchParams.set(k, v)
        changed = true
      }
    }
    if (!changed) return

    e.preventDefault()
    window.location.href = target.toString()
  }

  private togglePanel(): void {
    const isOpen = this.panel.classList.toggle('open')
    this.toggleIcon.classList.toggle('open', isOpen)
    this.toggleBtn.setAttribute('aria-expanded', String(isOpen))
  }

  private toggleTheme(): void {
    const isDark = this.themeTrack.classList.toggle('on')
    const theme: Theme = isDark ? 'dark' : 'light'
    applyTheme(theme)
    const current = loadSettings()
    saveSettings({ ...current, theme })
  }

  private toggleStreamManager(): void {
    const enabled = this.useStreamManagerTrack.classList.toggle('on')
    this.syncStreamManagerControls(enabled)
  }

  private syncStreamManagerControls(enabled: boolean): void {
    this.streamManagerDependentRow.classList.toggle('is-hidden', !enabled)
    this.streamManagerAdminRow.classList.toggle('is-hidden', !enabled)
    this.smApiVersionInput.disabled = !enabled
    this.smRegionInput.disabled = !enabled
    this.smAdminUsernameInput.disabled = !enabled
    this.smAdminPasswordInput.disabled = !enabled
    this.smAdminPasswordToggle.disabled = !enabled
    if (enabled && !this.smApiVersionInput.value.trim()) {
      this.smApiVersionInput.value = DEFAULT_STREAM_MANAGER_API_VERSION
    }
    void this.syncNodeGroupSource(enabled)
  }

  private async syncNodeGroupSource(enabled: boolean): Promise<void> {
    const requestId = ++this.nodeGroupSourceRequestId
    if (!enabled) {
      this.showNodeGroupInput(false)
      return
    }
    this.showNodeGroupInput(true)

    try {
      const groups = await listUnsecureNodeGroups(this.buildNodeGroupProbeSettings())
      if (requestId !== this.nodeGroupSourceRequestId) return
      const normalized = Array.from(
        new Set(
          groups
            .filter((value) => typeof value === 'string')
            .map((value) => value.trim())
            .filter(Boolean)
        )
      )
      if (normalized.length === 0) {
        this.showNodeGroupInput(true)
        return
      }
      this.showNodeGroupSelect(normalized, true, this.resolveCurrentNodeGroupSetting())
    } catch {
      if (requestId !== this.nodeGroupSourceRequestId) return
      this.showNodeGroupInput(true)
    }
  }

  private showNodeGroupInput(enabled: boolean): void {
    this.nodeGroupInputField.classList.remove('is-hidden')
    this.nodeGroupSelectField.classList.add('is-hidden')
    this.nodeGroupInput.disabled = !enabled
    this.nodeGroupInput.required = enabled
    this.nodeGroupSelect.disabled = true
    this.nodeGroupRefreshBtn.disabled = true
    if (enabled && !this.nodeGroupInput.value.trim()) {
      this.nodeGroupInput.value = 'default'
    }
  }

  private showNodeGroupSelect(options: string[], enabled: boolean, preferredValue: string): void {
    const nextValues = Array.from(new Set(options.map((value) => value.trim()).filter(Boolean)))
    if (nextValues.length === 0) {
      this.showNodeGroupInput(enabled)
      return
    }
    const selectedValue = nextValues.includes(preferredValue) ? preferredValue : nextValues[0]

    this.nodeGroupSelect.innerHTML = ''
    for (const value of nextValues) {
      const option = document.createElement('option')
      option.value = value
      option.textContent = value
      this.nodeGroupSelect.appendChild(option)
    }
    this.nodeGroupSelect.value = selectedValue
    this.nodeGroupInput.value = this.nodeGroupSelect.value

    this.nodeGroupInputField.classList.add('is-hidden')
    this.nodeGroupSelectField.classList.remove('is-hidden')
    this.nodeGroupInput.disabled = true
    this.nodeGroupInput.required = false
    this.nodeGroupSelect.disabled = !enabled
    this.nodeGroupRefreshBtn.disabled = !enabled
  }

  private resolveNodeGroupName(): string {
    if (!this.nodeGroupSelectField.classList.contains('is-hidden')) {
      return this.nodeGroupSelect.value.trim() || this.nodeGroupInput.value.trim() || 'default'
    }
    return this.nodeGroupInput.value.trim() || 'default'
  }

  private resolveCurrentNodeGroupSetting(): string {
    const current = loadSettings().nodeGroupName.trim()
    if (current) return current
    const fromSelect = this.nodeGroupSelect.value.trim()
    if (fromSelect) return fromSelect
    return this.nodeGroupInput.value.trim() || 'default'
  }

  private buildNodeGroupProbeSettings(): Settings {
    const current = loadSettings()
    return {
      ...current,
      host: sanitizeHost(this.hostInput.value) || window.location.hostname,
      streamManagerApiVersion:
        this.smApiVersionInput.value.trim() || DEFAULT_STREAM_MANAGER_API_VERSION,
    }
  }

  private async refreshNodeGroupOptions(): Promise<void> {
    if (!this.useStreamManagerTrack.classList.contains('on')) return
    if (this.nodeGroupSelectField.classList.contains('is-hidden')) return
    if (this.nodeGroupRefreshBtn.disabled) return

    const requestId = ++this.nodeGroupSourceRequestId
    try {
      const groups = await listUnsecureNodeGroups(this.buildNodeGroupProbeSettings())
      if (requestId !== this.nodeGroupSourceRequestId) return
      const normalized = Array.from(
        new Set(
          groups
            .filter((value) => typeof value === 'string')
            .map((value) => value.trim())
            .filter(Boolean)
        )
      )
      if (normalized.length === 0) return
      const preferredValue = this.resolveCurrentNodeGroupSetting()
      this.showNodeGroupSelect(normalized, true, preferredValue)
    } catch {
      // On refresh failure, preserve current select + options unchanged.
    }
  }

  private toggleAuthentication(): void {
    const enabled = this.useAuthenticationTrack.classList.toggle('on')
    this.syncAuthenticationControls(enabled)
  }

  private toggleStatistics(): void {
    const enabled = this.useStatisticsTrack.classList.toggle('on')
    this.syncStatisticsControls(enabled)
  }

  private syncStatisticsControls(enabled: boolean): void {
    this.statsDependentRow.classList.toggle('is-hidden', !enabled)
    this.statsIntervalInput.disabled = !enabled
    this.statsEndpointSelect.disabled = !enabled
    this.syncStatisticsUrlRow()
  }

  private syncStatisticsUrlRow(): void {
    const enabled = this.useStatisticsTrack.classList.contains('on')
    const useUrl = this.statsEndpointSelect.value === 'url'
    this.statsUrlRow.classList.toggle('is-hidden', !enabled || !useUrl)
    this.statsUrlInput.disabled = !enabled || !useUrl
  }

  private syncIceTypeControls(updateUrl = true): void {
    const iceType = this.iceTypeSelect.value as IceType
    const useTurn = iceType === 'turn'
    if (updateUrl) {
      this.iceUrlInput.value = defaultIceUrlForType(iceType)
    }
    this.iceUrlInput.placeholder = defaultIceUrlForType(iceType)
    this.iceTurnRow.classList.toggle('is-hidden', !useTurn)
    this.iceUsernameInput.disabled = !useTurn
    this.iceCredentialInput.disabled = !useTurn
  }

  private syncAuthenticationControls(enabled: boolean): void {
    this.authDependentRow.classList.toggle('is-hidden', !enabled)
    this.authUsernameInput.disabled = !enabled
    this.authPasswordInput.disabled = !enabled
    this.authPasswordToggle.disabled = !enabled
    this.authTokenInput.disabled = !enabled
  }

  private togglePasswordVisibility(): void {
    const show = this.authPasswordInput.type === 'password'
    this.authPasswordInput.type = show ? 'text' : 'password'
    this.authPasswordToggle.setAttribute('aria-pressed', String(show))
    this.authPasswordToggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password')
    this.authPasswordToggle.setAttribute('title', show ? 'Hide password' : 'Show password')
  }

  private toggleSmAdminPasswordVisibility(): void {
    const show = this.smAdminPasswordInput.type === 'password'
    this.smAdminPasswordInput.type = show ? 'text' : 'password'
    this.smAdminPasswordToggle.setAttribute('aria-pressed', String(show))
    this.smAdminPasswordToggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password')
    this.smAdminPasswordToggle.setAttribute('title', show ? 'Hide password' : 'Show password')
  }

  private applySettings(): void {
    const isDark = this.themeTrack.classList.contains('on')
    const useStreamManager = this.useStreamManagerTrack.classList.contains('on')
    const useAuthentication = this.useAuthenticationTrack.classList.contains('on')
    const statsEnabled = this.useStatisticsTrack.classList.contains('on')
    const statsIntervalSeconds = Number(this.statsIntervalInput.value)
    const statsEndpoint = this.statsEndpointSelect.value as StatsEndpointOption
    const iceType = this.iceTypeSelect.value as IceType
    const settings: Settings = {
      host: sanitizeHost(this.hostInput.value) || window.location.hostname,
      streamName: this.streamNameInput.value.trim(),
      app: this.appInput.value.trim() || 'live',
      theme: isDark ? 'dark' : 'light',
      useStreamManager,
      nodeGroupName: useStreamManager ? this.resolveNodeGroupName() : 'default',
      region: useStreamManager ? this.smRegionInput.value.trim() : '',
      streamManagerApiVersion: useStreamManager
        ? this.smApiVersionInput.value.trim() || DEFAULT_STREAM_MANAGER_API_VERSION
        : DEFAULT_STREAM_MANAGER_API_VERSION,
      streamManagerAdminUsername: useStreamManager ? this.smAdminUsernameInput.value.trim() : '',
      streamManagerAdminPassword: useStreamManager ? this.smAdminPasswordInput.value : '',
      useAuthentication,
      username: useAuthentication ? this.authUsernameInput.value.trim() : '',
      password: useAuthentication ? this.authPasswordInput.value : '',
      token: useAuthentication ? this.authTokenInput.value.trim() : '',
      statsEnabled,
      statsInterval: statsEnabled
        ? Math.max(1000, Math.round(statsIntervalSeconds * 1000) || 5000)
        : 5000,
      statsEndpoint: statsEnabled ? statsEndpoint : 'data-channel',
      statsEndpointURL:
        statsEnabled && statsEndpoint === 'url' ? this.statsUrlInput.value.trim() : '',
      iceType,
      iceUrl: this.iceUrlInput.value.trim() || defaultIceUrlForType(iceType),
      iceUsername: iceType === 'turn' ? this.iceUsernameInput.value.trim() : '',
      iceCredential: iceType === 'turn' ? this.iceCredentialInput.value : '',
    }
    this.hostInput.value = settings.host ?? window.location.hostname
    saveSettings(settings)
    applyTheme(settings.theme)
    this.dispatchEvent(
      new CustomEvent('webrtc-settings-applied', { detail: settings, bubbles: true })
    )
    this.togglePanel()
  }

  private resetSettings(): void {
    const settings: Settings = {
      host: window.location.hostname,
      streamName: 'stream1',
      app: 'live',
      theme: 'light',
      useStreamManager: false,
      nodeGroupName: 'default',
      region: '',
      streamManagerApiVersion: DEFAULT_STREAM_MANAGER_API_VERSION,
      streamManagerAdminUsername: '',
      streamManagerAdminPassword: '',
      useAuthentication: false,
      username: '',
      password: '',
      token: '',
      statsEnabled: false,
      statsInterval: 5000,
      statsEndpoint: 'data-channel',
      statsEndpointURL: '',
      iceType: 'stun',
      iceUrl: DEFAULT_ICE_STUN_URL,
      iceUsername: '',
      iceCredential: '',
    }
    this.loadIntoForm(settings)
    saveSettings(settings)
    applyTheme('light')
    this.dispatchEvent(
      new CustomEvent('webrtc-settings-applied', { detail: settings, bubbles: true })
    )
  }

  private loadIntoForm(settings: Settings): void {
    this.hostInput.value = settings.host ?? window.location.hostname
    this.streamNameInput.value = settings.streamName
    this.appInput.value = settings.app
    this.nodeGroupInput.value = settings.nodeGroupName || 'default'
    this.nodeGroupSelect.innerHTML = ''
    const nodeGroupOption = document.createElement('option')
    nodeGroupOption.value = this.nodeGroupInput.value
    nodeGroupOption.textContent = this.nodeGroupInput.value
    this.nodeGroupSelect.appendChild(nodeGroupOption)
    this.nodeGroupSelect.value = this.nodeGroupInput.value
    this.smRegionInput.value = settings.region
    this.smApiVersionInput.value =
      settings.streamManagerApiVersion || DEFAULT_STREAM_MANAGER_API_VERSION
    this.smAdminUsernameInput.value = settings.streamManagerAdminUsername
    this.smAdminPasswordInput.value = settings.streamManagerAdminPassword
    this.smAdminPasswordInput.type = 'password'
    this.smAdminPasswordToggle.setAttribute('aria-pressed', 'false')
    this.smAdminPasswordToggle.setAttribute('aria-label', 'Show password')
    this.smAdminPasswordToggle.setAttribute('title', 'Show password')
    this.authUsernameInput.value = settings.username
    this.authPasswordInput.value = settings.password
    this.authPasswordInput.type = 'password'
    this.authPasswordToggle.setAttribute('aria-pressed', 'false')
    this.authPasswordToggle.setAttribute('aria-label', 'Show password')
    this.authPasswordToggle.setAttribute('title', 'Show password')
    this.authTokenInput.value = settings.token
    this.useStreamManagerTrack.classList.toggle('on', settings.useStreamManager)
    this.useAuthenticationTrack.classList.toggle('on', settings.useAuthentication)
    this.useStatisticsTrack.classList.toggle('on', settings.statsEnabled)
    this.statsIntervalInput.value = String(settings.statsInterval / 1000)
    this.statsEndpointSelect.value = settings.statsEndpoint
    this.statsUrlInput.value = settings.statsEndpointURL
    this.iceTypeSelect.value = settings.iceType
    this.iceUrlInput.value = settings.iceUrl
    this.iceUsernameInput.value = settings.iceUsername
    this.iceCredentialInput.value = settings.iceCredential
    this.syncStreamManagerControls(settings.useStreamManager)
    this.syncAuthenticationControls(settings.useAuthentication)
    this.syncStatisticsControls(settings.statsEnabled)
    this.syncIceTypeControls(false)
    this.themeTrack.classList.toggle('on', settings.theme === 'dark')
  }
}

if (!customElements.get('r5-header')) {
  customElements.define('r5-header', R5Header)
}

function sanitizeHost(rawHost: string): string {
  const value = rawHost.trim() || window.location.hostname
  if (!value) return value
  try {
    const withScheme = /^[a-z]+:\/\//i.test(value) ? value : `https://${value}`
    return new URL(withScheme).hostname
  } catch {
    return value
  }
}
