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

interface Red5ProEvent {
  type: string
  data?: Record<string, unknown>
  [key: string]: unknown
}

interface WHIPConfig {
  endpoint?: string
  host?: string
  streamName?: string
  app?: string
  protocol?: 'https' | 'http'
  port?: number
  mediaElementId?: string
  mediaConstraints?: MediaStreamConstraints
  clearMediaOnUnpublish?: boolean
  keyFramerate?: number
  bandwidth?: { audio: number; video: number }
  connectionParams?: Record<string, unknown>
  stats?: StatsConfig
  rtcConfiguration?: RTCConfiguration
  streamMode?: 'live' | 'record' | 'append'
  videoEncoding?: string
  audioEncoding?: string
  includeDataChannel?: boolean
  dataChannelConfiguration?: DataChannelConfiguration
  reconnect?: ReconnectConfig
}

interface ReconnectConfig {
  enabled: boolean
  timeoutDelay: number
  maximumReconnectAttempts: number
}

interface DataChannelConfiguration {
  name: string
  ordered?: boolean
  maxRetransmits?: number
  maxPacketLifeTime?: number
}

interface WHEPConfig {
  endpoint?: string
  host?: string
  streamName?: string
  app?: string
  protocol?: 'https' | 'http'
  port?: number
  mediaElementId?: string
  connectionParams?: Record<string, unknown>
  stats?: StatsConfig
  rtcConfiguration?: RTCConfiguration
  includeDataChannel?: boolean
  dataChannelConfiguration?: DataChannelConfiguration
  videoEncoding?: PlaybackVideoEncoder
  audioEncoding?: PlaybackAudioEncoder
  renegotiationPolicy?: RenegotiationPolicyType
}

interface RenegotiationPolicyType {
  type: 'regression' | 'timeout' | 'disconnect' | 'excessive-rtt'
  iceTimeoutInterval: number
}

interface StatsConfig {
  // Optional.
  // If provided, it will POST stats to this endpoint.
  // If undefined or `data-channel`, it will post stats to message transport.
  // If null or `event-transport`, it will only emit status events.
  endpoint: string | undefined | null
  interval?: number // Interval to poll stats, in milliseconds.
  include?: string[] // Empty array allows SDK to be judicious about what stats to include.
}

enum EndpointType {
  DEV_NULL = 'dev/null',
  DATA_CHANNEL = 'data-channel',
  EVENT_TRANSPORT = 'event-transport',
}

declare class WHIPClient {
  on(event: string, handler: (event: Red5ProEvent) => void): void
  off(event: string, handler: (event: Red5ProEvent) => void): void
  init(config: WHIPConfig): Promise<void>
  initWithStream(config: WHIPConfig, stream: MediaStream): Promise<void>
  publish(): Promise<void>
  unpublish(): Promise<void>
  getPeerConnection(): RTCPeerConnection | undefined
  getDataChannel(): RTCDataChannel | undefined
  getMediaStream(): MediaStream | undefined
  muteAudio(): void
  unmuteAudio(): void
  muteVideo(): void
  unmuteVideo(): void
  send(methodName: string, data?: Record<string, unknown>): Promise<boolean | undefined>
  sendMessage?(message: unknown): Promise<boolean>
  sendData?(data: ArrayBuffer | ArrayBufferView | Blob | string): Promise<boolean>
  getOptions(): WHIPConfig | undefined
}

declare class Red5MessageChannel extends WHIPClient {
  open(inactivePingIntervalMS?: number): Promise<this>
  close(): Promise<void>
  sendMessage(message: unknown): Promise<boolean>
  sendData(data: ArrayBuffer | ArrayBufferView | Blob | string): Promise<boolean>
}

declare enum MessageChannelEventTypes {
  OPEN = 'MessageChannel.Open',
  SEND = 'MessageChannel.Send',
  RECEIVE = 'MessageChannel.Receive',
  CLOSE = 'MessageChannel.Close',
  FAIL = 'MessageChannel.Fail',
  ERROR = 'MessageChannel.Error',
}

declare enum PubNubEventTypes {
  CONNECTED = 'PubNub.Connected',
  DISCONNECTED = 'PubNub.Disconnected',
  SUBSCRIBE_SUCCESS = 'PubNub.Subscribe.Success',
  SUBSCRIBE_FAILURE = 'PubNub.Subscribe.Failure',
  UNSUBSCRIBE_SUCCESS = 'PubNub.Unsubscribe.Success',
  UNSUBSCRIBE_FAILURE = 'PubNub.Unsubscribe.Failure',
  MESSAGE_RECEIVED = 'PubNub.Message.Received',
  MESSAGE_SEND_SUCCESS = 'PubNub.Message.Send.Success',
  MESSAGE_SEND_FAILURE = 'PubNub.Message.Send.Failure',
  AUTH_TOKEN_GENERATED = 'PubNub.AuthToken.Generated',
  AUTH_TOKEN_GENERATION_ERROR = 'PubNub.AuthToken.Generation.Error',
  STATUS = 'PubNub.Status',
  ERROR = 'PubNub.Error',
}

interface PubNubConfig {
  userId?: string
  publishKey?: string
  subscribeKey?: string
  authToken?: string
  cloudEndpoint?: string
  backendUrl?: string
  backendURL?: string
  expiryMinutes?: number
  channelId?: string
  logLevel?: string
  pubnub?: unknown
}

declare class PubNubClient {
  on(event: string, handler: (event: Red5ProEvent) => void): void
  off(event: string, handler: (event: Red5ProEvent) => void): void
  init(config: PubNubConfig): Promise<this>
  subscribe(channelId: string, options?: unknown): Promise<boolean>
  unsubscribe(channelId: string): Promise<boolean>
  publishMessage(channelId: string, message: unknown): Promise<boolean>
  destroy(): Promise<boolean>
  getOptions(): PubNubConfig | undefined
}

declare class WHEPClient {
  on(event: string, handler: (event: Red5ProEvent) => void): void
  off(event: string, handler: (event: Red5ProEvent) => void): void
  init(config: WHEPConfig): Promise<void>
  subscribe(): Promise<void>
  unsubscribe(): Promise<void>
  enableStandby(): void
  disableStandby(): void
  callServer(methodName: string, args: unknown[]): Promise<unknown>
  getPeerConnection(): RTCPeerConnection | undefined
  getDataChannel(): RTCDataChannel | undefined
}

interface HLSSubscriberConfig {
  endpoint?: string
  host?: string
  streamName?: string
  app?: string
  protocol?: 'https' | 'http'
  port?: number
  mediaElementId?: string
  muteOnAutoplayRestriction?: boolean
  connectionParams?: Record<string, unknown>
}

declare class HLSSubscriber {
  on(event: string, handler: (event: Red5ProEvent) => void): void
  off(event: string, handler: (event: Red5ProEvent) => void): void
  init(config: HLSSubscriberConfig): Promise<void>
  subscribe(): Promise<void>
  unsubscribe(): Promise<void>
  play(): void
  pause(): void
  stop(): void
  getPlayer(): HTMLMediaElement | undefined
  getOptions(): HLSSubscriberConfig | undefined
  getFileURL(): string | undefined
  readonly fileURL: string | undefined
}

declare enum PublishVideoEncoder {
  H264 = 'H264',
  H265 = 'H265',
  VP8 = 'VP8',
  AV1 = 'AV1',
  NONE = 'NONE',
}

declare enum PublishAudioEncoder {
  OPUS = 'OPUS',
}

declare enum PlaybackVideoEncoder {
  H264 = 'H264',
  H265 = 'H265',
  VP8 = 'VP8',
  AV1 = 'AV1',
  NONE = 'NONE',
}

declare enum PlaybackAudioEncoder {
  OPUS = 'OPUS',
  NONE = 'NONE',
}

declare enum SubscriberEventTypes {
  AUTO_PLAYBACK_FAILURE = 'Subscribe.Autoplay.Failure',
  AUTO_PLAYBACK_MUTED = 'Subscribe.Autoplay.Muted',
  CONNECT_FAILURE = 'Connect.Failure',
  CONNECT_SUCCESS = 'Connect.Success',
  CONNECTION_CLOSED = 'Subscribe.Connection.Closed',
  PLAY_UNPUBLISH = 'Subscribe.Play.Unpublish',
  PLAYBACK_TIME_UPDATE = 'Subscribe.Time.Update',
  RECONNECT_FAILURE = 'Reconnect.Failure',
  RECONNECT_START = 'Reconnect.Start',
  SUBSCRIBE_FAIL = 'Subscribe.Fail',
  SUBSCRIBE_INVALID_NAME = 'Subscribe.InvalidName',
  SUBSCRIBE_METADATA = 'Subscribe.Metadata',
  SUBSCRIBE_START = 'Subscribe.Start',
  SUBSCRIBE_STOP = 'Subscribe.Stop',
  STATS_REPORT = 'WebRTC.Stats.Report',
}

declare enum WebRTCConnectionEventTypes {
  CONNECTION_HEALTH_STALE_STATS = 'WebRTC.Connection.StaleStats',
  CONNECTION_HEALTH_STATE_REGRESSION = 'WebRTC.Connection.StateRegression',
  CONNECTION_HEALTH_EXCESSIVE_RTT = 'WebRTC.Connection.ExcessiveRTT',
  CONNECTION_HEALTH_ICE_TIMEOUT = 'WebRTC.Connection.IceTimeout',
}

declare enum RTCSubscriberEventTypes {
  STATS_REPORT = 'WebRTC.Stats.Report',
  SUBSCRIBE_STREAM_SWITCH = 'WebRTC.Subscribe.StreamSwitch',
  TRACK_ADDED = 'WebRTC.PeerConnection.OnTrack',
  PEER_CONNECTION_AVAILABLE = 'WebRTC.PeerConnection.Available',
}

interface Red5ProSDK {
  WHIPClient: typeof WHIPClient
  WHEPClient: typeof WHEPClient
  MessageChannel: typeof Red5MessageChannel
  PubNubClient: typeof PubNubClient
  HLSSubscriber: typeof HLSSubscriber
  PublishVideoEncoder: typeof PublishVideoEncoder
  PublishAudioEncoder: typeof PublishAudioEncoder
  PlaybackVideoEncoder: typeof PlaybackVideoEncoder
  PlaybackAudioEncoder: typeof PlaybackAudioEncoder
  SubscriberEventTypes: typeof SubscriberEventTypes
  RTCSubscriberEventTypes: typeof RTCSubscriberEventTypes
  WebRTCConnectionEventTypes: typeof WebRTCConnectionEventTypes
  MessageChannelEventTypes: typeof MessageChannelEventTypes
  PubNubEventTypes: typeof PubNubEventTypes
  setLogLevel(level: string): void
}

interface Window {
  red5prosdk: Red5ProSDK
}
