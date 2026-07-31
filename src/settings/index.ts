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

const STORAGE_KEY = 'webrtc-settings'

export type Theme = 'light' | 'dark'
export type Protocol = 'https' | 'http'
export type StatsEndpointOption = 'data-channel' | 'event-transport' | 'url'
export type IceType = 'stun' | 'turn'

export const DEFAULT_ICE_STUN_URL = 'stun:stun2.l.google.com:19302'
export const DEFAULT_ICE_TURN_URL = 'turn:turn.example.com:3478'
export const DEFAULT_STREAM_MANAGER_API_VERSION = 'v1'

export function defaultIceUrlForType(iceType: IceType): string {
  return iceType === 'turn' ? DEFAULT_ICE_TURN_URL : DEFAULT_ICE_STUN_URL
}

export interface Settings {
  host: string
  streamName: string
  app: string
  theme: Theme
  useStreamManager: boolean
  nodeGroupName: string
  region: string
  streamManagerApiVersion: string
  streamManagerAdminUsername: string
  streamManagerAdminPassword: string
  useAuthentication: boolean
  username: string
  password: string
  token: string
  statsEnabled: boolean
  statsInterval: number
  statsEndpoint: StatsEndpointOption
  statsEndpointURL: string
  iceType: IceType
  iceUrl: string
  iceUsername: string
  iceCredential: string
}

const defaults: Settings = {
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

export const SETTINGS_QUERY_KEYS = [
  'host',
  'streamName',
  'app',
  'theme',
  'sm',
  'ng',
  'region',
  'api',
  'smuser',
  'smpass',
  'auth',
  'username',
  'password',
  'token',
  'stats',
  'si',
  'se',
  'su',
  'ice',
  'iu',
  'itu',
  'ic',
  // Legacy keys retained for cleanup when navigating old links.
  'protocol',
  'port',
] as const

export interface ResolvedConnection {
  protocol: Protocol
  port: number
}

export function loadSettings(): Settings {
  const fromStorage = readFromStorage()
  const fromQuery = readFromQuery()
  const merged = { ...defaults, ...fromStorage, ...fromQuery }
  if (!merged.nodeGroupName?.trim()) {
    merged.nodeGroupName = 'default'
  }
  if (!merged.streamManagerApiVersion?.trim()) {
    merged.streamManagerApiVersion = DEFAULT_STREAM_MANAGER_API_VERSION
  }
  if (!merged.statsInterval || merged.statsInterval < 1000) {
    merged.statsInterval = defaults.statsInterval
  }
  if (!merged.iceUrl?.trim()) {
    merged.iceUrl = defaultIceUrlForType(merged.iceType ?? defaults.iceType)
  }
  if (Object.keys(fromQuery).length > 0) {
    writeToStorage(merged)
  }
  return merged
}

export function saveSettings(settings: Settings): void {
  writeToStorage(settings)
  writeToQuery(settings)
}

export function applyTheme(theme: Theme): void {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}

export function settingsToSearchParams(settings: Settings): URLSearchParams {
  const params = new URLSearchParams()
  if (settings.host) params.set('host', settings.host)
  if (settings.streamName) params.set('streamName', settings.streamName)
  if (settings.app) params.set('app', settings.app)
  if (settings.theme === 'dark') params.set('theme', 'dark')
  if (settings.useStreamManager) params.set('sm', '1')
  if (settings.useStreamManager && settings.nodeGroupName) {
    params.set('ng', settings.nodeGroupName)
  }
  if (settings.useStreamManager && settings.region) {
    params.set('region', settings.region)
  }
  if (
    settings.useStreamManager &&
    settings.streamManagerApiVersion &&
    settings.streamManagerApiVersion !== DEFAULT_STREAM_MANAGER_API_VERSION
  ) {
    params.set('api', settings.streamManagerApiVersion)
  }
  if (settings.useStreamManager && settings.streamManagerAdminUsername) {
    params.set('smuser', settings.streamManagerAdminUsername)
  }
  if (settings.useStreamManager && settings.streamManagerAdminPassword) {
    params.set('smpass', settings.streamManagerAdminPassword)
  }
  if (settings.useAuthentication) params.set('auth', '1')
  if (settings.useAuthentication && settings.username) params.set('username', settings.username)
  if (settings.useAuthentication && settings.token) params.set('token', settings.token)
  if (settings.statsEnabled) params.set('stats', '1')
  if (settings.statsEnabled) params.set('si', String(settings.statsInterval))
  if (settings.statsEnabled) params.set('se', settings.statsEndpoint)
  if (settings.statsEnabled && settings.statsEndpoint === 'url' && settings.statsEndpointURL) {
    params.set('su', settings.statsEndpointURL)
  }
  if (settings.iceType === 'turn') params.set('ice', 'turn')
  const defaultIceUrl = defaultIceUrlForType(settings.iceType)
  if (settings.iceUrl && settings.iceUrl !== defaultIceUrl) {
    params.set('iu', settings.iceUrl)
  }
  if (settings.iceType === 'turn' && settings.iceUsername) {
    params.set('itu', settings.iceUsername)
  }
  if (settings.iceType === 'turn' && settings.iceCredential) {
    params.set('ic', settings.iceCredential)
  }
  return params
}

export function resolveStreamManagerAdminCredentialsFromSettings(
  settings: Settings
): { username: string; password: string } | null {
  const username = settings.streamManagerAdminUsername.trim()
  const password = settings.streamManagerAdminPassword
  if (username && password) {
    return { username, password }
  }
  return null
}

export function resolveConnectionFromHost(host: string): ResolvedConnection {
  const normalized = normalizeHost(host)
  return isIpAddress(normalized)
    ? { protocol: 'http', port: 5080 }
    : { protocol: 'https', port: 443 }
}

export function resolveEndpointFromSettings(
  settings: Settings,
  clientType: 'whip' | 'whep' | 'ws/publish' | 'ws/subscribe'
): string {
  return resolveEndpointForHost(settings.host, settings, clientType)
}

export function resolveEndpointForHost(
  host: string,
  settings: Settings,
  clientType: 'whip' | 'whep' | 'ws/publish' | 'ws/subscribe'
): string {
  const { app, streamName, useStreamManager, streamManagerApiVersion } = settings
  const { protocol, port } = resolveConnectionFromHost(host)
  if (useStreamManager) {
    const apiVersion = streamManagerApiVersion.trim() || DEFAULT_STREAM_MANAGER_API_VERSION
    return `${protocol}://${host}:${port}/as/${apiVersion}/proxy/${clientType}/${app}/${streamName}`
  } else if (clientType.startsWith('ws/') && !useStreamManager) {
    return `${protocol === 'https' ? 'wss' : 'ws'}://${host}:${port}/${app}/${streamName}`
  }
  return `${protocol}://${host}:${port}/${app}/${clientType}/endpoint/${streamName}`
}

export function resolveDirectNodeEndpointForHost(
  edgeHost: string,
  settings: Settings,
  clientType: 'whip' | 'whep' | 'ws/publish' | 'ws/subscribe'
): string {
  const directSettings = { ...settings, useStreamManager: false }
  return resolveEndpointForHost(edgeHost, directSettings, clientType)
}

export function resolveConnectionParamsFromSettings(settings: Settings): Record<string, unknown> {
  const params: Record<string, unknown> = {}

  if (settings.useStreamManager) {
    params.nodeGroup = settings.nodeGroupName || 'default'
    if (settings.region) {
      params.region = settings.region
    }
  }

  if (settings.useAuthentication) {
    if (settings.username) params.username = settings.username
    if (settings.password) params.password = settings.password
    if (settings.token) params.token = settings.token

    // [TA] Fixes RED5DEV-2355.
    // If the token is provided but the username is not, set the username to 'undefined'.
    // If the token is provided but the password is not, set the password to 'undefined'.
    // Currently RTA requires all fields to be present - even if they are not used - when a token is provided.
    if (params.token && !params.username) {
      params.username = 'undefined'
    }
    if (params.token && !params.password) {
      params.password = 'undefined'
    }
  }

  return params
}

export function resolveStatisticsConfigurationFromSettings(settings: Settings): StatsConfig | null {
  if (!settings.statsEnabled) return null

  let endpoint: StatsConfig['endpoint']
  switch (settings.statsEndpoint) {
    case 'url':
      endpoint = settings.statsEndpointURL.trim() || undefined
      break
    default:
      endpoint = settings.statsEndpoint
  }

  return {
    endpoint,
    interval: settings.statsInterval,
    include: [],
  }
}

export function resolveRtcConfigurationFromSettings(settings: Settings): RTCConfiguration {
  const urls = settings.iceUrl.trim() || defaultIceUrlForType(settings.iceType)

  if (settings.iceType === 'turn') {
    return {
      iceServers: [
        {
          urls,
          username: settings.iceUsername,
          credential: settings.iceCredential,
        },
      ],
    }
  }

  return {
    iceServers: [{ urls }],
    iceCandidatePoolSize: 2,
    bundlePolicy: 'max-bundle',
  }
}

function readFromStorage(): Partial<Settings> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Partial<Settings>) : {}
  } catch {
    return {}
  }
}

function writeToStorage(settings: Settings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch {
    // Ignore unavailable localStorage.
  }
}

function readFromQuery(): Partial<Settings> {
  const params = new URLSearchParams(window.location.search)
  const result: Partial<Settings> = {}

  const host = params.get('host')
  if (host !== null) result.host = host
  else result.host = window.location.hostname

  const streamName = params.get('streamName')
  if (streamName !== null) result.streamName = streamName
  else result.streamName = 'stream1'

  const app = params.get('app')
  if (app !== null) result.app = app

  const theme = params.get('theme')
  if (theme === 'dark' || theme === 'light') result.theme = theme

  const sm = params.get('sm')
  if (sm !== null) {
    result.useStreamManager = sm === '' || sm === '1' || sm.toLowerCase() === 'true'
  }

  const nodeGroupName = params.get('ng') || params.get('smNodeGroup')
  if (nodeGroupName !== null) {
    result.nodeGroupName = nodeGroupName
  }

  const region = params.get('region') || params.get('smRegion')
  if (region !== null) {
    result.region = region
  }

  const streamManagerApiVersion = params.get('api')
  if (streamManagerApiVersion !== null) {
    result.streamManagerApiVersion = streamManagerApiVersion
  }

  const streamManagerAdminUsername = params.get('smuser') || params.get('smUsername')
  if (streamManagerAdminUsername !== null) {
    result.streamManagerAdminUsername = streamManagerAdminUsername
  }

  const streamManagerAdminPassword = params.get('smpass') || params.get('smPassword')
  if (streamManagerAdminPassword !== null) {
    result.streamManagerAdminPassword = streamManagerAdminPassword
  }

  const auth = params.get('auth') || params.get('authEnabled')
  if (auth !== null) {
    result.useAuthentication = auth === '' || auth === '1' || auth.toLowerCase() === 'true'
  }

  const username = params.get('username') || params.get('authUsername')
  if (username !== null) result.username = username

  const password = params.get('password') || params.get('authPassword')
  if (password !== null) result.password = password

  const token = params.get('token') || params.get('authToken')
  if (token !== null) result.token = token

  const stats = params.get('stats')
  if (stats !== null) {
    result.statsEnabled = stats === '' || stats === '1' || stats.toLowerCase() === 'true'
  }

  const statsInterval = params.get('si')
  if (statsInterval !== null) {
    const parsed = Number(statsInterval)
    if (!Number.isNaN(parsed) && parsed >= 1000) {
      result.statsInterval = parsed
    }
  }

  const statsEndpoint = params.get('se')
  if (
    statsEndpoint === 'data-channel' ||
    statsEndpoint === 'event-transport' ||
    statsEndpoint === 'url'
  ) {
    result.statsEndpoint = statsEndpoint
  }

  const statsEndpointURL = params.get('su')
  if (statsEndpointURL !== null) result.statsEndpointURL = statsEndpointURL

  const ice = params.get('ice')
  if (ice === 'stun' || ice === 'turn') {
    result.iceType = ice
  }

  const iceUrl = params.get('iu')
  if (iceUrl !== null) result.iceUrl = iceUrl

  const iceUsername = params.get('itu')
  if (iceUsername !== null) result.iceUsername = iceUsername

  const iceCredential = params.get('ic')
  if (iceCredential !== null) result.iceCredential = iceCredential

  return result
}

function writeToQuery(settings: Settings): void {
  const params = new URLSearchParams(window.location.search)

  if (settings.host) params.set('host', settings.host)
  else params.set('host', window.location.hostname)

  if (settings.streamName) params.set('streamName', settings.streamName)
  else params.delete('streamName')

  if (settings.app) params.set('app', settings.app)
  else params.delete('app')

  params.delete('protocol')
  params.delete('port')

  if (settings.theme === 'dark') params.set('theme', 'dark')
  else params.delete('theme')

  if (settings.useStreamManager) params.set('sm', '1')
  else params.delete('sm')

  if (settings.useStreamManager && settings.nodeGroupName) {
    params.set('ng', settings.nodeGroupName)
  } else {
    params.delete('ng')
  }

  if (settings.useStreamManager && settings.region) {
    params.set('region', settings.region)
  } else {
    params.delete('region')
  }

  if (
    settings.useStreamManager &&
    settings.streamManagerApiVersion &&
    settings.streamManagerApiVersion !== DEFAULT_STREAM_MANAGER_API_VERSION
  ) {
    params.set('api', settings.streamManagerApiVersion)
  } else {
    params.delete('api')
  }

  if (settings.useStreamManager && settings.streamManagerAdminUsername) {
    params.set('smuser', settings.streamManagerAdminUsername)
  } else {
    params.delete('smuser')
  }

  if (settings.useStreamManager && settings.streamManagerAdminPassword) {
    params.set('smpass', settings.streamManagerAdminPassword)
  } else {
    params.delete('smpass')
  }

  if (settings.useAuthentication) params.set('auth', '1')
  else params.delete('auth')

  if (settings.useAuthentication && settings.username) {
    params.set('username', settings.username)
  } else {
    params.delete('username')
  }

  if (settings.useAuthentication && settings.token) {
    params.set('token', settings.token)
  } else {
    params.delete('token')
  }

  if (settings.statsEnabled) params.set('stats', '1')
  else params.delete('stats')

  if (settings.statsEnabled) params.set('si', String(settings.statsInterval))
  else params.delete('si')

  if (settings.statsEnabled) params.set('se', settings.statsEndpoint)
  else params.delete('se')

  if (settings.statsEnabled && settings.statsEndpoint === 'url' && settings.statsEndpointURL) {
    params.set('su', settings.statsEndpointURL)
  } else {
    params.delete('su')
  }

  if (settings.iceType === 'turn') params.set('ice', 'turn')
  else params.delete('ice')

  const defaultIceUrl = defaultIceUrlForType(settings.iceType)
  if (settings.iceUrl && settings.iceUrl !== defaultIceUrl) {
    params.set('iu', settings.iceUrl)
  } else {
    params.delete('iu')
  }

  if (settings.iceType === 'turn' && settings.iceUsername) {
    params.set('itu', settings.iceUsername)
  } else {
    params.delete('itu')
  }

  if (settings.iceType === 'turn' && settings.iceCredential) {
    params.set('ic', settings.iceCredential)
  } else {
    params.delete('ic')
  }

  const newSearch = params.toString()
  const newUrl = newSearch ? `${window.location.pathname}?${newSearch}` : window.location.pathname
  window.history.replaceState(null, '', newUrl)
}

function normalizeHost(rawHost: string): string {
  const value = rawHost.trim()
  if (!value) return value
  try {
    const withScheme = /^[a-z]+:\/\//i.test(value) ? value : `https://${value}`
    return new URL(withScheme).hostname
  } catch {
    return value
  }
}

function isIpAddress(host: string): boolean {
  if (!host) return false
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) return true
  if (/^[0-9a-f:]+$/i.test(host) && host.includes(':')) return true
  return false
}
