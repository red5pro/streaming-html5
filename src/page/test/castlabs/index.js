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
An  example  of  the EULA can be found on our website at: https://account.red5pro.com/assets/LICENSE.txt.

The above copyright notice and this license shall be included in all copies or portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,  INCLUDING  BUT  
NOT  LIMITED  TO  THE  WARRANTIES  OF  MERCHANTABILITY, FITNESS  FOR  A  PARTICULAR  PURPOSE  AND  
NONINFRINGEMENT.   IN  NO  EVENT  SHALL INFRARED5, INC. BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN  AN  ACTION  OF  CONTRACT,  TORT  OR  OTHERWISE,  ARISING  FROM,  OUT  OF  OR  IN CONNECTION 
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
import { setDrm, videoTransformFunction, audioTransformFunction, Environments } from '../../lib/castlabs/rtc-drm-transform/rtc-drm-transform.min.js'

var serverSettings = (function() {
  var settings = sessionStorage.getItem('r5proServerSettings');
  try {
    return JSON.parse(settings);
  }
  catch (e) {
    console.error('Could not read server settings from sessionstorage: ' + e.message);
  }
  return {};
})();

var configuration = (function () {
  var conf = sessionStorage.getItem('r5proTestBed');
  try {
    return JSON.parse(conf);
  }
  catch (e) {
    console.error('Could not read testbed configuration from sessionstorage: ' + e.message);
  }
  return {}
})();
red5prosdk.setLogLevel(configuration.verboseLogging ? red5prosdk.LOG_LEVELS.TRACE : red5prosdk.LOG_LEVELS.WARN);

const EncryptTypes = {
  CBCS: 'cbcs',
  CENC: 'cenc'
}

const EntryptionTypeValues = {
  CLEARKEY: 'clearkey',
  WIDEVINE: 'widevine',
  FAIRPLAY: 'fairplay',
  PLAYREADY: 'playready'
}

const getPortAndProtocol = host => {
  let ipReg = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
  let localhostReg = /^localhost.*/
  let isIPOrLocalhost = ipReg.exec(host) || localhostReg.exec(host)
  let port = isIPOrLocalhost ? 5080 : 443
  let protocol = isIPOrLocalhost ? 'ws' : 'wss'
  return { port, protocol }
}

const getValueFromId = id => {
  try {
    const el = document.querySelector(`#${id}`)
    return el ? el.value : undefined
  } catch (e) {
    console.error(e)
  }
  return undefined
}

const getEncryptionTypeFromValue = value => {
  if (value.toLowerCase() === EntryptionTypeValues.CLEARKEY.toLowerCase()) {
    return EncryptTypes.CBCS
  }
  return EncryptTypes.CENC
}

const encryptKeyValue = value => new Uint8Array(atob(value).split("").map(c => c.charCodeAt(0)))

let subscriber
let encryptedSubscriber
let monitorTickets = []

const decryptButton = document.querySelector('#decrypt-button')
const encrtypedStatusField = document.querySelector('#encrypted-status-field')
const decryptedStatusField = document.querySelector('#decrypted-status-field')
const { port, protocol } = getPortAndProtocol(configuration.host)
const baseConfig = {...configuration,
  protocol,
  port,
  streamName: configuration.stream1,
  mediaElementId: 'red5pro-subscriber',
  rtcConfiguration: {
      iceServers: [{urls: 'stun:stun2.l.google.com:19302'}],
      iceCandidatePoolSize: 2,
      bundlePolicy: 'max-bundle',
      encodedInsertableStreams: true,
      // audio jitter buffer settings are part of an origin trial, not sure if they make any
      // difference at all atm: https://bugs.chromium.org/p/chromium/issues/detail?id=904764
      // https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/modules/peerconnection/rtc_configuration.idl;l=51
      rtcAudioJitterBufferMaxPackets: 10,
      rtcAudioJitterBufferFastAccelerate: true,
  }
}

// newer, properly standardized RTCRtpScriptTransform API, only supported by Safari atm. The worker just pushes
// arriving video frames back here to run through videoTransformFunction() just like Chrome
const worker = new Worker('./worker.js', {name: 'RTCRtpScriptTransform worker', type: 'module'});
worker.onmessage = (m) => {
    if (m.data.streamType === 'video') {
        videoTransformFunction(m.data.frame, null)
    } else {
        audioTransformFunction(m.data.frame, null)
    }
}

const monitorBitrate = (pc, bitrateField, packetsField, resolutionField) => {
  return trackBitrate(pc,
    (b, p) => {
      bitrateField.innerText = b === 0 ? 'N/A' : Math.floor(b)
      packetsField.innerText = p
    }, 
    (w, h) => {
      resolutionField.innerText = `${w}x${h}`
    }, true)
}

const eventExclusions = ['Subscribe.Time.Update', 'Subscribe.Playback.Change', 'Subscribe.Volume.Change']
const statusExclusions = [...eventExclusions,
  'Subscribe.Metadata', 'WebRTC.DataChannel.Open',
  'WebRTC.DataChannel.Available', 'MessageTransport.Change',
  'Subscribe.VideoDimensions.Change', 'Subscribe.Autoplay.Muted']
const onEncryptedSubscriberEvent = event => {
    const { type } = event
    if (eventExclusions.indexOf(type) > -1) return
    console.log(`[Subscriber::Encrypted] ${type}`)

    if (statusExclusions.indexOf(type) > -1) return
    encrtypedStatusField.innerText = type
}

const onDecryptedSubscriberEvent = event => {
    const { type } = event
    if (eventExclusions.indexOf(type) > -1) return
    console.log(`[Subscriber::Decrypted] ${type}`)

    if (statusExclusions.indexOf(type) > -1) return
    decryptedStatusField.innerText = type
}

const encryptedPlayback = async () => {
  try {
    const { rtcConfiguration } = baseConfig
    const config = {...baseConfig,
      mediaElementId: 'red5pro-encrypted',
      rtcConfiguration: {
        ...rtcConfiguration,
        encodedInsertableStreams: false
      }
    }
    encryptedSubscriber = await new red5prosdk.RTCSubscriber().init(config)
    encryptedSubscriber.on('*', event => onEncryptedSubscriberEvent(event))
    await encryptedSubscriber.subscribe()

    document.querySelector('#encrypted-statistics-field').classList.remove('hidden')
    const ticket = monitorBitrate(encryptedSubscriber.getPeerConnection(), 
      document.querySelector('#encrypted-bitrate-field'),
      document.querySelector('#encrypted-packets-field'),
      document.querySelector('#encrypted-resolution-field')
    ) 
    monitorTickets.push(ticket)
  } catch (e) {
    console.error(e)
  }
}

const decryptPlayback = async () => {
  decryptButton.disabled = true
  try {
      const transforms = {
          video: videoTransformFunction,
          audio: audioTransformFunction,
          worker: worker
      }

      subscriber = await new red5prosdk.RTCSubscriber().init(baseConfig, transforms)
      subscriber.on('*', event => onDecryptedSubscriberEvent(event))
      await subscriber.subscribe()

      const element = document.querySelector(`#${baseConfig.mediaElementId}`)
      const encryption = getEncryptionTypeFromValue(getValueFromId('type-select'))
      const keyIdOrIV = encryptKeyValue(getValueFromId('key-input'))

      const drmConfig = {
        environment: Environments.Staging,
        merchant: getValueFromId('merchant-input'),
        userId: getValueFromId('user-input'),
        sessionId: getValueFromId('session-input'),
        assetId: null,
        variantId: null,
        audioEncrypted: false,
        encryption,
        keyId: encryption === EncryptTypes.CBCS ? null : keyIdOrIV,
        iv: encryption !== EncryptTypes.CBCS ? null : keyIdOrIV
      }
      setDrm(element, drmConfig)

      element.addEventListener('keyframeneeded', () => console.log('NEEDS KEYFRAME'))
      document.querySelector('#decrypted-statistics-field').classList.remove('hidden')
      const ticket = monitorBitrate(encryptedSubscriber.getPeerConnection(), 
        document.querySelector('#decrypted-bitrate-field'),
        document.querySelector('#decrypted-packets-field'),
        document.querySelector('#decrypted-resolution-field')
      ) 
      monitorTickets.push(ticket)

      window.subscriber = subscriber
  } catch (e) {
      console.error(e)
      decryptButton.disabled = false
  }
}

// TODO: Cleanup

encryptedPlayback()
decryptButton.onclick = () => decryptPlayback()