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

import '@/components/r5-header'
import { applyTheme, loadSettings } from '@/settings'

const { setLogLevel } = window.red5prosdk
setLogLevel('debug')

interface SectionChip {
  tone: string
  svg: string
}

interface ExampleSection {
  title: string
  description: string
  chip?: SectionChip
  examples: ExampleMeta[]
}

const publishChip: SectionChip = {
  tone: 'var(--c-red)',
  svg: '<svg class="i" viewBox="0 0 24 24"><rect x="2.5" y="6" width="13" height="12" rx="2"></rect><path d="M15.5 10.5l6-3.5v10l-6-3.5"></path></svg>',
}

const subscribeChip: SectionChip = {
  tone: 'var(--c-blue)',
  svg: '<svg class="i" viewBox="0 0 24 24"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"></path><circle cx="12" cy="12" r="3"></circle></svg>',
}

const messagingChip: SectionChip = {
  tone: 'var(--c-amber)',
  svg: '<svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2"></circle><path d="M8.5 15.5a5 5 0 0 1 0-7M15.5 8.5a5 5 0 0 1 0 7M5.6 18.4a9 9 0 0 1 0-12.8M18.4 5.6a9 9 0 0 1 0 12.8"></path></svg>',
}

const abrChip: SectionChip = {
  tone: 'var(--c-purple)',
  svg: '<svg class="i" viewBox="0 0 24 24"><path d="M3 17l4-4 4 3 5-6 5 4"></path><path d="M3 21h18"></path></svg>',
}

const mixerChip: SectionChip = {
  tone: 'var(--c-amber)',
  svg: '<svg class="i" viewBox="0 0 24 24"><rect x="3" y="4" width="8" height="7" rx="1.5"></rect><rect x="13" y="4" width="8" height="7" rx="1.5"></rect><rect x="3" y="13" width="18" height="7" rx="1.5"></rect></svg>',
}

const downloadChip: SectionChip = {
  tone: 'var(--c-red)',
  svg: '<svg class="i" viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5"></path><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"></path></svg>',
}

interface ExampleMeta {
  title: string
  description: string
  tag: string
  href: string
  chips?: SectionChip[]
}

const examples: ExampleSection[] = [
  {
    title: 'Publish',
    description: 'Publish examples',
    chip: publishChip,
    examples: [
      {
        title: 'Basic WHIP',
        description:
          'Minimal WHIPClient publish flow with default init configuration and automatic publish on load.',
        tag: 'Publish',
        href: './src/examples/whip-basic/index.html',
      },
      {
        title: 'WHIP AMF',
        description:
          'WHIPClient publish with stream mode, camera and microphone controls, preview, and AMF metadata.',
        tag: 'Publish, AMF',
        href: './src/examples/whip-amf/index.html',
      },
      {
        title: 'WHIP Audio Constraints',
        description:
          'WHIPClient publish with advanced audio capture constraints, device selection, and requested vs applied media summary.',
        tag: 'Publish, Audio',
        href: './src/examples/whip-audio-constraints/index.html',
      },
      {
        title: 'WHIP Codec Preference',
        description:
          'WHIPClient publish with browser-supported audio and video codec preferences filtered by Red5 SDK encoders.',
        tag: 'Publish, Codecs',
        href: './src/examples/whip-codec-preference/index.html',
      },
      {
        title: 'WHIP Connection Params',
        description:
          'WHIPClient publish with dynamic key/value connectionParams merged into init configuration alongside Settings-derived params.',
        tag: 'Publish, Params',
        href: './src/examples/whip-connection-params/index.html',
      },
      {
        title: 'WHIP Data Channel',
        description:
          'WHIPClient publish with configurable RTCDataChannel settings, publish mode, and default SDK media capture.',
        tag: 'Publish, DataChannel',
        href: './src/examples/whip-data-channel/index.html',
        chips: [publishChip, messagingChip],
      },
      {
        title: 'WHIP Live Encoding',
        description:
          'WHIPClient publish with live mute controls and runtime video encoder updates for maxBitrate and scaleResolutionDownBy on the outgoing sender.',
        tag: 'Publish, Encoding',
        href: './src/examples/whip-live-encoding/index.html',
      },
      {
        title: 'WHIP Media Source Swap',
        description:
          'WHIPClient publish with live camera or microphone source replacement via RTCRtpSender.replaceTrack without unpublishing.',
        tag: 'Publish, Media',
        href: './src/examples/whip-media-source-swap/index.html',
      },
      {
        title: 'WHIP Mute API',
        description:
          'WHIPClient publish with live audio and video mute controls using muteAudio, unmuteAudio, muteVideo, and unmuteVideo. Pair with WHEP Mute API.',
        tag: 'Publish, Mute',
        href: './src/examples/whip-mute-api/index.html',
      },
      {
        title: 'WHIP Remote Call - Sender',
        description:
          'WHIPClient publish with DataChannel settings and RPC messaging to subscribers via sendRpcToSubscribers. Pair with WHEP Remote Call.',
        tag: 'Publish, DataChannel',
        href: './src/examples/whip-remote-call/index.html',
      },
      {
        title: 'WHIP Resiliency',
        description:
          'WHIPClient publish with configurable reconnect resiliency (timeoutDelay and maximumReconnectAttempts) for network loss recovery.',
        tag: 'Publish, Resiliency',
        href: './src/examples/whip-resiliency/index.html',
      },
      {
        title: 'WHIP Screenshare',
        description:
          'WHIPClient publish using getDisplayMedia for screen capture with resolution, bitrate, and keyframe controls plus optional microphone audio.',
        tag: 'Publish, Screenshare',
        href: './src/examples/whip-screenshare/index.html',
      },
      {
        title: 'WHIP Social Pusher',
        description:
          'WHIPClient publish with social media forwarding controls to provision RTMP restreaming after publish success.',
        tag: 'Publish, Social',
        href: './src/examples/whip-social-pusher/index.html',
      },
      {
        title: 'WHIP Supported Resolutions',
        description:
          'Probe canned WHIP resolutions with exact getUserMedia constraints, then publish with Publisher Mode.',
        tag: 'Publish, Resolutions',
        href: './src/examples/whip-supported-resolutions/index.html',
      },
      {
        title: 'RTC Publisher',
        description:
          'RTCPublisher publish using Red5 Pro WebRTC SDK 14.3.0 with stream mode, publish settings, preview, and start/stop controls.',
        tag: 'Publish, WebSocket, Legacy SDK',
        href: './src/examples/rtc-publisher/index.html',
      },
    ],
  },
  {
    title: 'Subscribe',
    description: 'Subscribe examples',
    chip: subscribeChip,
    examples: [
      {
        title: 'Basic WHEP',
        description:
          'Minimal WHEPClient subscribe flow with default init configuration and automatic subscribe on load.',
        tag: 'Subscribe',
        href: './src/examples/whep-basic/index.html',
      },
      {
        title: 'WHEP AMF',
        description:
          'WHEPClient subscribe with playback and AMF metadata receipt display as Subscribe.Metadata events arrive.',
        tag: 'Subscribe, AMF',
        href: './src/examples/whep-amf/index.html',
      },
      {
        title: 'WHEP Audio Only Playback',
        description:
          'WHEPClient subscribe with the incoming MediaStream assigned to an audio element for audio-only playback, even when the broadcast includes video.',
        tag: 'Subscribe, Audio',
        href: './src/examples/whep-audio-playback/index.html',
      },
      {
        title: 'WHEP Codec Preference',
        description:
          'WHEPClient subscribe with browser decoder capabilities filtered by Red5 SDK playback encoder support.',
        tag: 'Subscribe, Codecs',
        href: './src/examples/whep-codec-preference/index.html',
      },
      {
        title: 'WHEP Connection Params',
        description:
          'WHEPClient subscribe with dynamic key/value connectionParams merged into init configuration alongside Settings-derived params.',
        tag: 'Subscribe, Params',
        href: './src/examples/whep-connection-params/index.html',
      },
      {
        title: 'WHEP Data Channel',
        description:
          'WHEPClient subscribe with configurable RTCDataChannel settings and display of received RPC, JSON, and binary audio messages.',
        tag: 'Subscribe, DataChannel',
        href: './src/examples/whep-data-channel/index.html',
        chips: [subscribeChip, messagingChip],
      },
      {
        title: 'WHEP Interstitial',
        description:
          'WHEPClient subscribe with interstitial media insertion controls to switch streams or resume the target program.',
        tag: 'Subscribe, Interstitial',
        href: './src/examples/whep-interstitial/index.html',
      },
      {
        title: 'WHEP Manual Stream',
        description:
          'WHEPClient subscribe with mediaElementId set to undefined so the SDK does not auto-assign the MediaStream to a media element.',
        tag: 'Subscribe, Manual Stream',
        href: './src/examples/whep-manual-stream/index.html',
      },
      {
        title: 'WHEP Mute API',
        description:
          'WHEPClient subscribe that reflects publisher mute state from Subscribe.Metadata streamingMode and video overlay indicators.',
        tag: 'Subscribe, Mute',
        href: './src/examples/whep-mute-api/index.html',
      },
      {
        title: 'WHEP Reconnect',
        description:
          'WHEPClient subscribe with manual reconnect on init/subscribe failure and connection loss events, debounced 2 seconds between attempts.',
        tag: 'Subscribe, Resiliency',
        href: './src/examples/whep-reconnect/index.html',
      },
      {
        title: 'WHEP Remote Call - Receiver',
        description:
          'WHEPClient subscribe with DataChannel settings and display of RPC messages received via Subscribe.Send.Invoke. Pair with WHIP Remote Call.',
        tag: 'Subscribe, DataChannel',
        href: './src/examples/whep-remote-call/index.html',
      },
      {
        title: 'WHEP Renegotiation',
        description:
          'WHEPClient subscribe with configurable renegotiationPolicy to monitor network metrics and trigger ICE renegotiation on connection health events.',
        tag: 'Subscribe, Renegotiation',
        href: './src/examples/whep-renegotiation/index.html',
      },
      {
        title: 'WHEP Standby',
        description:
          'WHEPClient subscribe with Enable Standby and Disable Standby controls to signal the server to hold or resume audio and video delivery.',
        tag: 'Subscribe, Standby',
        href: './src/examples/whep-standby/index.html',
      },
      {
        title: 'WHEP Switch Streams',
        description:
          'WHEPClient subscribe with callServer switchStreams to change playback to another stream path on the existing connection.',
        tag: 'Subscribe, Stream Switch',
        href: './src/examples/whep-switch-streams/index.html',
      },
      {
        title: 'RTC Subscriber',
        description:
          'RTCSubscriber subscribe using Red5 Pro WebRTC SDK 14.3.0 with playback preview and start/stop controls. Pair with RTC Publisher.',
        tag: 'Subscribe, WebSocket, Legacy SDK',
        href: './src/examples/rtc-subscriber/index.html',
      },
    ],
  },
  {
    title: 'Misc',
    description: 'Miscellaneous examples',
    examples: [
      {
        title: 'castLabs DRM Publisher',
        description:
          'WHIPClient publish with castLabs DRM settings, publish mode, media settings, preview, and start/stop controls.',
        tag: 'Publish, castLabs',
        href: './src/examples/whip-castlabs/index.html',
        chips: [publishChip],
      },
      {
        title: 'castLabs DRM Subscriber',
        description:
          'Dual WHEPClient playback with baseline encrypted/garbled validation and a CastLabs form-driven DRM subscriber.',
        tag: 'Subscribe, castLabs',
        href: './src/examples/whep-castlabs/index.html',
        chips: [subscribeChip],
      },
      {
        title: 'castLabs Watermark Playback',
        description:
          'WHEPClient subscribe with castLabs watermark service settings, playback stats, and start/stop controls.',
        tag: 'Subscribe, castLabs',
        href: './src/examples/whep-castlabs-watermark/index.html',
        chips: [subscribeChip],
      },
      {
        title: 'PubNub Client',
        description:
          'Standalone PubNubClient with configurable authentication, channel, and keys. Subscribe to connect; destroy to shut down.',
        tag: 'PubNub, Messaging',
        href: './src/examples/pubnub-client/index.html',
        chips: [messagingChip],
      },
      {
        title: 'Message Channel',
        description:
          'MessageChannel client with configurable RTCDataChannel settings and RPC, JSON, and binary messaging. No media streaming.',
        tag: 'Message Channel, DataChannel',
        href: './src/examples/message-channel/index.html',
        chips: [messagingChip],
      },
      {
        title: 'WHIP / WHEP (Two Way)',
        description:
          'Publish with WHIPClient and subscribe with WHEPClient using host and stream name from Settings.',
        tag: 'Publish & Subscribe',
        href: './src/examples/whip-whep/index.html',
        chips: [publishChip, subscribeChip],
      },
    ],
  },
  // {
  //   title: 'Standalone',
  //   description: 'Examples for standalone Red5 Pro server deployments',
  //   examples: [
  //     // {
  //     //   title: 'HLS Subscriber',
  //     //   description:
  //     //     'HLSSubscriber playback with native HLS where supported, falling back to HLS.js when the SDK subscriber fails to start.',
  //     //   tag: 'Subscribe, HLS',
  //     //   href: './src/examples/hls-subscriber/index.html',
  //     // },
  //     // {
  //     //   title: 'WHEP Cluster',
  //     //   description:
  //     //     'WHEPClient subscribe that resolves the edge host from the /cluster endpoint before connecting over http on port 5080.',
  //     //   tag: 'Subscribe, Cluster',
  //     //   href: './src/examples/whep-cluster/index.html',
  //     // },
  //   ],
  // },
  {
    title: 'Stream Manager',
    description: 'Examples that require Stream Manager',
    examples: [
      {
        title: 'Brew Mixer',
        description:
          'Stream Manager mixer example with startup session configuration for event, output GUID, and encoder settings.',
        tag: 'Stream Manager, Mixer',
        href: './src/examples/brew-mixer/index.html',
        chips: [mixerChip],
      },
      {
        title: 'Subscribe Live VOD & MP4 Clip',
        description:
          'LiveSeekClient subscribe with Stream Manager, baseURL/fullURL or Stream Manager proxy HLS DVR, and MP4 clip creation.',
        tag: 'Stream Manager, Subscribe, LiveSeek, Clip',
        href: './src/examples/whep-live-seek/index.html',
        chips: [subscribeChip, downloadChip],
      },
      {
        title: 'Transcoder (Form Only)',
        description: 'Transcoder with form only. Enable Stream Manager in Settings.',
        tag: 'Stream Manager, Transcoder',
        href: './src/examples/transcoder-form-only/index.html',
        chips: [abrChip],
      },
      {
        title: 'Transcoder (Form and Publish)',
        description:
          'Post ABR provisions to Stream Manager, then publish. Enable Stream Manager in Settings.',
        tag: 'Stream Manager, Transcoder, Publish',
        href: './src/examples/transcoder-form-and-publish/index.html',
        chips: [abrChip, publishChip],
      },
      {
        title: 'Transcoder (Form, Publish and AMF)',
        description:
          'Post ABR provisions, publish with WHIP, then send AMF metadata on the live stream.',
        tag: 'Stream Manager, Transcoder, Publish, AMF',
        href: './src/examples/transcoder-form-publish-amf/index.html',
        chips: [abrChip, publishChip, messagingChip],
      },
    ],
  },
  {
    title: 'Stream Manager & Self-contained Automated Tests',
    description: 'Stream Manager tests available for test automation.',
    examples: [
      {
        title: 'Data Channel Enhanced',
        description: 'Data Channel with enhanced features.',
        tag: 'Data Channel',
        href: './data-channel.html',
        chips: [messagingChip],
      },
      {
        title: 'Proxy Publisher',
        description:
          'Self-contained Stream Manager WHIP publisher with inline stats. Enable Stream Manager in Settings.',
        tag: 'Stream Manager, Publish',
        href: './proxy-publisher.html',
        chips: [publishChip],
      },
      {
        title: 'Proxy Subscriber',
        description:
          'Self-contained Stream Manager WHEP subscriber with inline stats. Enable Stream Manager in Settings.',
        tag: 'Stream Manager, Subscribe',
        href: './proxy-subscriber.html',
        chips: [subscribeChip],
      },
      {
        title: 'Proxy Subscriber (All Edge)',
        description:
          'Discovers in-service edge nodes and subscribes to each directly. Requires Stream Manager and Authentication.',
        tag: 'Stream Manager, Subscribe',
        href: './proxy-subscriber-all-edge.html',
        chips: [subscribeChip],
      },
      {
        title: 'Proxy Subscriber (Amount)',
        description:
          'Opens multiple WHEP subscribers to the Stream Manager proxy. Control count with the amount query param.',
        tag: 'Stream Manager, Subscribe',
        href: './proxy-subscriber-amount.html?amount=2',
        chips: [subscribeChip],
      },
      {
        title: 'Proxy Screenshare',
        description:
          'Self-contained Stream Manager WHIP screenshare publisher. Enable Stream Manager in Settings.',
        tag: 'Stream Manager, Publish, Screenshare',
        href: './proxy-screenshare.html',
        chips: [publishChip],
      },
    ],
  },
]

const settings = loadSettings()
applyTheme(settings.theme)

const statusEl = document.getElementById('relay-status')!
statusEl.textContent = settings.host ? `Host: ${settings.host}` : 'Host not configured'

document.addEventListener('webrtc-settings-applied', (e) => {
  const s = (e as CustomEvent).detail as ReturnType<typeof loadSettings>
  statusEl.textContent = s.host ? `Host: ${s.host}` : 'Host not configured'
})

const grid = document.getElementById('examples-grid')!
const filterInput = document.getElementById('examples-filter-input') as HTMLInputElement

function exampleMatchesTag(tag: string, filter: string): boolean {
  const query = filter.trim()
  if (!query) return true
  return tag.toLowerCase().includes(query.toLowerCase())
}

function renderExampleCard(
  { title, description, tag, href, chips }: ExampleMeta,
  sectionChip?: SectionChip
): string {
  const tags = tag
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => `<li class="example-card__tag">${t}</li>`)
    .join('')
  const cardChips = chips ?? (sectionChip ? [sectionChip] : [])
  const chipHtml = cardChips.length
    ? `<div class="example-card__chips">${cardChips
        .map(
          (chip) =>
            `<span class="chip" style="--tone: ${chip.tone}" aria-hidden="true">${chip.svg}</span>`
        )
        .join('')}</div>`
    : ''
  return `
    <a class="example-card" href="${href}">
      <div class="example-card__title">${title}</div>
      <div class="example-card__description">${description}</div>
      <div class="example-card__footer">
        ${chipHtml}
        <ul class="example-card__tags">${tags}</ul>
      </div>
    </a>`
}

function renderSection(section: ExampleSection, filter: string): string {
  const hasFilter = filter.trim().length > 0
  const visible = section.examples.filter(({ tag }) => exampleMatchesTag(tag, filter))

  let content: string
  if (section.examples.length === 0) {
    content = '<div class="examples-section__empty">No examples yet.</div>'
  } else if (visible.length === 0) {
    content = `<div class="examples-section__empty">${
      hasFilter ? 'No examples matching.' : 'No examples yet.'
    }</div>`
  } else {
    content = `<div class="examples-section__grid">${visible.map((example) => renderExampleCard(example, section.chip)).join('')}</div>`
  }

  return `
    <section class="examples-section">
      <div class="examples-section__header">
        <h2 class="examples-section__title">${section.title}</h2>
        <p class="examples-section__description">${section.description}</p>
      </div>
      ${content}
    </section>`
}

function renderExamples(filter = ''): void {
  if (examples.length === 0) {
    grid.innerHTML = '<div class="empty-state">No example sections configured.</div>'
    return
  }

  grid.innerHTML = examples.map((section) => renderSection(section, filter)).join('')
}

filterInput.addEventListener('input', () => {
  renderExamples(filterInput.value)
})

renderExamples()
