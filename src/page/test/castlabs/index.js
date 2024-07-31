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
/* global red5prosdk */
import {
  rtcDrmGetVersion,
  rtcDrmEnvironments,
  rtcDrmConfigure,
  rtcDrmOnTrack,
} from '../../lib/castlabs/rtc-drm-transform/rtc-drm-transform.min.js'

var configuration = (function () {
  var conf = sessionStorage.getItem('r5proTestBed')
  try {
    return JSON.parse(conf)
  } catch (e) {
    console.error(
      'Could not read testbed configuration from sessionstorage: ' + e.message
    )
  }
  return {}
})()

red5prosdk.setLogLevel(
  configuration.verboseLogging
    ? red5prosdk.LOG_LEVELS.TRACE
    : red5prosdk.LOG_LEVELS.WARN
)

const DecryptMode = Object.freeze({
  InPlace: 0,
  ClearKey: 1,
  ProdDrm: 2,
})

const toggleProdDrmFields = (show) => {
  const prodDrmFields = document.querySelectorAll('.prod-drm-field')
  prodDrmFields.forEach((field) => {
    field.classList.toggle('hidden', !show)
  })
}

const decryptionModeSelect = document.querySelector('#decrypt-select')
decryptionModeSelect.addEventListener('change', (e) => {
  const { value } = e.target
  toggleProdDrmFields(parseInt(value, 10) === DecryptMode.ProdDrm)
})
toggleProdDrmFields(
  1 + decryptionModeSelect.selectedIndex === DecryptMode.ProdDrm
)

const getPortAndProtocol = (host) => {
  let ipReg = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
  let localhostReg = /^localhost.*/
  let isIPOrLocalhost = ipReg.exec(host) || localhostReg.exec(host)
  let port = isIPOrLocalhost ? 5080 : 443
  let protocol = isIPOrLocalhost ? 'ws' : 'wss'
  return { port, protocol }
}

const getValueFromId = (id) => {
  try {
    const el = document.querySelector(`#${id}`)
    return el ? el.value : undefined
  } catch (e) {
    console.error(e)
  }
  return undefined
}

const Uint8ArrayFromHex = (hex) => {
  if (!hex) return null
  if (hex.length % 2 !== 0) {
    console.error(`Malformed hex string (${hex}), odd length`)
    return null
  }
  return Uint8Array.from(hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)))
}

const getPlatform = () => {
  try {
    const platform =
      window?.navigator?.userAgentData?.platform || window?.navigator?.platform
    return platform
  } catch (e) {
    // ignore
  }
  return undefined
}

const getAuthenticationParams = () => {
  const auth = configuration.authentication
  return auth && auth.enabled
    ? {
        connectionParams: {
          username: auth.username,
          password: auth.password,
          token: auth.token,
        },
      }
    : {}
}

let subscriber
let encryptedSubscriber
let monitorTickets = []

const decryptButton = document.querySelector('#decrypt-button')
const encrypedStatusField = document.querySelector('#encrypted-status-field')
const decryptedStatusField = document.querySelector('#decrypted-status-field')
const { port, protocol } = getPortAndProtocol(configuration.host)
const baseConfig = {
  ...configuration,
  ...getAuthenticationParams(),
  protocol,
  port,
  streamName: configuration.stream1,
  mediaElementId: 'red5pro-subscriber',
  rtcConfiguration: {
    iceServers: [{ urls: 'stun:stun2.l.google.com:19302' }],
    iceCandidatePoolSize: 2,
    bundlePolicy: 'max-bundle',
    encodedInsertableStreams: true,
    // audio jitter buffer settings are part of an origin trial, not sure if they make any
    // difference at all atm: https://bugs.chromium.org/p/chromium/issues/detail?id=904764
    // https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/modules/peerconnection/rtc_configuration.idl;l=51
    rtcAudioJitterBufferMaxPackets: 10,
    rtcAudioJitterBufferFastAccelerate: true,
  },
}
document.querySelector('#stream-title').innerText = baseConfig.streamName

const monitorBitrate = (pc, bitrateField, packetsField, resolutionField) => {
  return trackBitrate(
    pc,
    (b, p) => {
      bitrateField.innerText = b === 0 ? 'N/A' : Math.floor(b)
      packetsField.innerText = p
    },
    (w, h) => {
      resolutionField.innerText = `${w}x${h}`
    },
    true
  )
}

const monitor = (sub, typePrefix) => {
  document
    .querySelector(`#${typePrefix}-statistics-field`)
    .classList.remove('hidden')
  const ticket = monitorBitrate(
    sub.getPeerConnection(),
    document.querySelector(`#${typePrefix}-bitrate-field`),
    document.querySelector(`#${typePrefix}-packets-field`),
    document.querySelector(`#${typePrefix}-resolution-field`)
  )
  monitorTickets.push(ticket)
}

const eventExclusions = [
  'Subscribe.Time.Update',
  'Subscribe.Playback.Change',
  'Subscribe.Volume.Change',
]
const statusExclusions = [
  ...eventExclusions,
  'Subscribe.Metadata',
  'WebRTC.DataChannel.Open',
  'WebRTC.DataChannel.Available',
  'MessageTransport.Change',
  'Subscribe.VideoDimensions.Change',
  'Subscribe.Autoplay.Muted',
]
const onEncryptedSubscriberEvent = (event) => {
  const { type } = event
  if (eventExclusions.indexOf(type) > -1) return
  console.log(`[Subscriber::Encrypted] ${type}`)

  if (statusExclusions.indexOf(type) > -1) return
  encrypedStatusField.innerText = type
}

const onDecryptedSubscriberEvent = (event) => {
  const { type } = event
  if (eventExclusions.indexOf(type) > -1) return
  console.log(`[Subscriber::Decrypted] ${type}`)

  if (statusExclusions.indexOf(type) > -1) return
  decryptedStatusField.innerText = type
}

const encryptedPlayback = async () => {
  const { preferWhipWhep } = configuration
  const { WHEPClient, RTCSubscriber } = red5prosdk
  try {
    const { rtcConfiguration } = baseConfig
    const config = {
      ...baseConfig,
      mediaElementId: 'red5pro-encrypted',
      rtcConfiguration: {
        ...rtcConfiguration,
        encodedInsertableStreams: false,
      },
    }
    encryptedSubscriber = preferWhipWhep
      ? new WHEPClient()
      : new RTCSubscriber()
    encryptedSubscriber = await encryptedSubscriber.init(config)
    encryptedSubscriber.on('*', (event) => onEncryptedSubscriberEvent(event))
    await encryptedSubscriber.subscribe()

    // UI.
    monitor(encryptedSubscriber, 'encrypted')
  } catch (e) {
    console.error(e)
    encrypedStatusField.innerText = typeof e === 'string' ? e : e.message
  }
}

const decryptPlayback = async () => {
  const { preferWhipWhep } = configuration
  const { WHEPClient, RTCSubscriber } = red5prosdk

  console.info(`Using castLabs RTC DRM v${rtcDrmGetVersion()}`)

  decryptButton.disabled = true
  try {
    const element = document.querySelector(`#${baseConfig.mediaElementId}`)
    const encryption = getValueFromId('scheme-select')
    const keyId = Uint8ArrayFromHex(getValueFromId('key-id-input'))
    const iv = Uint8ArrayFromHex(getValueFromId('iv-input'))

    let platform = getPlatform()
    const requestProdDRM =
      decryptionModeSelect.selectedIndex === DecryptMode.ProdDrm
    let video = {
      codec: 'H264',
      encryption: encryption.toUpperCase() === 'CTR' ? 'cenc' : 'cbcs',
      keyId: requestProdDRM ? keyId : undefined,
      iv: requestProdDRM ? iv : undefined,
      robustness: platform === 'Android' ? 'HW' : undefined,
    }
    let drmConfig = {
      environment: rtcDrmEnvironments.Staging,
      merchant: getValueFromId('merchant-input'),
      videoElement: element,
      video,
    }

    drmConfig.videoElement.addEventListener('rtcdrmerror', (event) => {
      alert(`DRM error: ${event.detail.message}`)
    })
    rtcDrmConfigure(drmConfig)

    subscriber = preferWhipWhep ? new WHEPClient() : new RTCSubscriber()
    await subscriber.init(baseConfig)
    subscriber.on('WebRTC.PeerConnection.Available', () => {
      // Listen for ontrack event to get the decrypted stream.
      const pc = subscriber.getPeerConnection()
      pc.ontrack = (e) => rtcDrmOnTrack(e)
    })
    subscriber.on('*', (event) => onDecryptedSubscriberEvent(event))

    await subscriber.subscribe()

    // UI.
    monitor(subscriber, 'decrypted')
  } catch (e) {
    console.error(e)
    decryptButton.disabled = false
    decryptedStatusField.innerText = typeof e === 'string' ? e : e.message
  }
}

// Start.
encryptedPlayback()
decryptButton.onclick = () => decryptPlayback()

// Clean up.
let shuttingDown = false
const shutdown = async () => {
  if (shuttingDown) return

  shuttingDown = true
  while (monitorTickets.length > 0) {
    window.untrackBitrate(monitorTickets.shift())
  }

  try {
    encryptedSubscriber.off('*', onEncryptedSubscriberEvent)
    await encryptedSubscriber.unsubscribe()
  } catch (e) {
    console.warn(e)
  } finally {
    encryptedSubscriber = undefined
  }

  try {
    subscriber.off('*', onDecryptedSubscriberEvent)
    await subscriber.unsubscribe()
  } catch (e) {
    console.warn(e)
  } finally {
    subscriber = undefined
  }
}
window.addEventListener('pagehide', () => shutdown())
window.addEventListener('beforeunload', () => shutdown())
