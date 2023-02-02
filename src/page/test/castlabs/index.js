import { setDRM, videoTransformFunction, audioTransformFunction, Environments } from '../../lib/castlabs/rtc-drm-transform/rtc-drm-transform.min.js'

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

let encryptedSubscriber
let subscriber
let encryption = 'cbcs'
let iv = encryption !== 'cbcs' ? null : new Uint8Array([0xd5, 0xfb, 0xd6, 0xb8, 0x2e, 0xd9, 0x3e, 0x4e, 0xf9, 0x8a, 0xe4, 0x09, 0x31, 0xee, 0x33, 0xb7])
let keyId = encryption === 'cbcs' ? null : new Uint8Array([0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35])

const baseConfig = {...configuration,
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

const eventExclusions = ['Subscribe.Time.Update', 'Subscribe.Playback.Change', 'Subscribe.Volume.Change']
const onSubscriberEvent = event => {
    const { type } = event
    if (eventExclusions.indexOf(type) > -1) return
    console.log(type)
}

const encryptPlayback = async () => {
  try {
    const { rtcConfiguration } = baseConfig
    encryptedSubscriber = await new red5prosdk.RTCSubscriber().init({...baseConfig, rtcConfiguration: {
      ...rtcConfiguration,
      mediaElementId: 'red5pro-encrypted',
      encodedInsertableStreams: false
    }})
    await subscriber.subscribe()
  } catch (e) {
    console.error(e)
  }
}

const decryptPlayback = async () => {
  try {
      const transforms = {
          video: videoTransformFunction,
          audio: audioTransformFunction,
          worker: worker
      }

      subscriber = await new red5prosdk.RTCSubscriber().init(baseConfig, transforms)
      subscriber.on('*', event => onSubscriberEvent(event))
      await subscriber.subscribe()

      const drmConfig = {
        environment: Environments.Staging,
        merchant: 'red5',
        userId: 'test',
        sessionId: 'p0',
        assetId: null,
        variantId: null,
        audioEncrypted: false,
        encryption,
        keyId,
        iv
      }
      setDRM(baseConfig.mediaElementId, drmConfig)

      element.addEventListener('keyframeneeded', () => console.log('NEEDS KEYFRAME'))
  } catch (e) {
      console.error(e)
  }
}