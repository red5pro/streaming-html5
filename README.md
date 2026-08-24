# Streaming WebRTC Testbed

`streaming-webrtc` is a Vite-based example suite for validating and learning Red5 Pro WebRTC SDK workflows.

This repository serves two goals:

1. **Product validation** - a broad test matrix for Red5 SDK + Server/Stream Manager scenarios.
2. **Developer guidance** - concrete reference implementations showing how each flow is assembled.

## What This Repo Includes

- WHIP and WHEP examples (publish, subscribe, and two-way)
- Legacy RTCPublisher/RTCSubscriber examples
- Stream Manager workflows (transcoder, mixer, live seek, proxy tests)
- Feature-focused examples (data channel, AMF, reconnection, mute, media swap, castLabs, etc.)

## Requirements

- Node.js + npm
- A reachable Red5 Pro deployment (local or remote)
- HTTPS/TLS for most WebRTC publish scenarios outside `localhost`

## Quick Start

```bash
npm install
npm run dev
```

Open the app in your browser (Vite default: `http://localhost:5173`), then configure **Settings** (at minimum):

- `Host`
- `Stream Name` (and any example-specific fields)
- `Use Stream Manager` + admin credentials for Stream Manager examples

### Useful Scripts

- `npm run dev` - local development server
- `npm run build` - type-check + production build
- `npm run preview` - preview production build
- `npm run lint` - lint `src/**/*.ts`
- `npm run format` - format `src` with Prettier

## Example Directory Quick Links

These links point to each example directory root under `src/examples/`.

### Publish

- [whip-basic](src/examples/whip-basic/)
- [whip-amf](src/examples/whip-amf/)
- [whip-audio-constraints](src/examples/whip-audio-constraints/)
- [whip-codec-preference](src/examples/whip-codec-preference/)
- [whip-connection-params](src/examples/whip-connection-params/)
- [whip-data-channel](src/examples/whip-data-channel/)
- [whip-live-encoding](src/examples/whip-live-encoding/)
- [whip-media-source-swap](src/examples/whip-media-source-swap/)
- [whip-mute-api](src/examples/whip-mute-api/)
- [whip-remote-call](src/examples/whip-remote-call/)
- [whip-resiliency](src/examples/whip-resiliency/)
- [whip-screenshare](src/examples/whip-screenshare/)
- [whip-social-pusher](src/examples/whip-social-pusher/)
- [whip-supported-resolutions](src/examples/whip-supported-resolutions/)
- [rtc-publisher](src/examples/rtc-publisher/)

### Subscribe

- [whep-basic](src/examples/whep-basic/)
- [whep-amf](src/examples/whep-amf/)
- [whep-audio-playback](src/examples/whep-audio-playback/)
- [whep-codec-preference](src/examples/whep-codec-preference/)
- [whep-connection-params](src/examples/whep-connection-params/)
- [whep-data-channel](src/examples/whep-data-channel/)
- [whep-interstitial](src/examples/whep-interstitial/)
- [whep-manual-stream](src/examples/whep-manual-stream/)
- [whep-mute-api](src/examples/whep-mute-api/)
- [whep-reconnect](src/examples/whep-reconnect/)
- [whep-remote-call](src/examples/whep-remote-call/)
- [whep-renegotiation](src/examples/whep-renegotiation/)
- [whep-standby](src/examples/whep-standby/)
- [whep-switch-streams](src/examples/whep-switch-streams/)
- [rtc-subscriber](src/examples/rtc-subscriber/)

### Misc / Combined

- [whip-castlabs](src/examples/whip-castlabs/)
- [whep-castlabs](src/examples/whep-castlabs/)
- [whep-castlabs-watermark](src/examples/whep-castlabs-watermark/)
- [pubnub-client](src/examples/pubnub-client/)
- [message-channel](src/examples/message-channel/)
- [whip-whep](src/examples/whip-whep/)

### Standalone

- [whep-cluster](src/examples/whep-cluster/)

### Stream Manager

- [brew-mixer](src/examples/brew-mixer/)
- [whep-live-seek](src/examples/whep-live-seek/)
- [transcoder-form-only](src/examples/transcoder-form-only/)
- [transcoder-form-and-publish](src/examples/transcoder-form-and-publish/)
- [transcoder-form-publish-amf](src/examples/transcoder-form-publish-amf/)

## Standalone Proxy Test Pages

These are root-level HTML pages used for Stream Manager automated tests:

- [proxy-publisher.html](proxy-publisher.html)
- [proxy-subscriber.html](proxy-subscriber.html)
- [proxy-subscriber-all-edge.html](proxy-subscriber-all-edge.html)
- [proxy-subscriber-amount.html](proxy-subscriber-amount.html)
- [proxy-screenshare.html](proxy-screenshare.html)
