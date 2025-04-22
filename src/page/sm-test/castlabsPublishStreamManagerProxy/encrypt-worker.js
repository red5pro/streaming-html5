'use strict'

self.importScripts('../../lib/castlabs/crypto/clcrypto.js')

let crypto = null
let encryptor = null
async function initializeEncryptor(videoCodec, aesMode, key, iv) {
  if (!crypto) crypto = await Module()

  if (encryptor) {
    encryptor.delete()
    encryptor = null
  }

  encryptor = new crypto.Encryptor(
    videoCodec === 'AV1' ? crypto.Codec.AV1 : crypto.Codec.AVC,
    aesMode === 'CTR' ? crypto.Mode.CTR : crypto.Mode.CBC,
    key,
    1024 * 1024
  )
  if (aesMode === 'CBC') encryptor.setCbcIv(iv)
}

function encryptVideo(encodedFrame, controller) {
  const srcBuf = encryptor.getSrcBuffer()
  srcBuf.set(new Uint8Array(encodedFrame.data))
  const encryptedSize = encryptor.encrypt(encodedFrame.data.byteLength)

  if (encryptedSize > 0) {
    // retrieve the encrypted data from the encryptor
    const dstBuf = encryptor.getDstBuffer()
    const newData = new ArrayBuffer(encryptedSize)
    const newBuf = new Uint8Array(newData)
    newBuf.set(dstBuf)

    encodedFrame.data = newData
  }

  controller.enqueue(encodedFrame)
}

function encryptAudio(encodedFrame, controller) {
  // no encryption for audio for now
  controller.enqueue(encodedFrame)
}

function handleTransform(operation, readable, writable) {
  if (operation === 'encrypt-video') {
    const transformStream = new TransformStream({ transform: encryptVideo })
    readable.pipeThrough(transformStream).pipeTo(writable)
  } else if (operation === 'encrypt-audio') {
    const transformStream = new TransformStream({ transform: encryptAudio })
    readable.pipeThrough(transformStream).pipeTo(writable)
  }
}

onmessage = (event) => {
  if (
    event.data.operation === 'encrypt-video' ||
    event.data.operation === 'encrypt-audio'
  )
    return handleTransform(
      event.data.operation,
      event.data.readable,
      event.data.writable
    )

  if (event.data.operation === 'init') {
    console.log(
      `${new Date()
        .toISOString()
        .slice(11, -1)} starting to load encryptor (wasm)`
    )
    initializeEncryptor(
      event.data.videoCodec,
      event.data.aesMode,
      event.data.key,
      event.data.iv
    ).then(() => {
      console.log(`${new Date().toISOString().slice(11, -1)} encryptor ready`)
      postMessage('init-done')
    })
  }
}

// Handler for RTCRtpScriptTransforms
if (self.RTCTransformEvent) {
  self.onrtctransform = (event) => {
    const transformer = event.transformer
    handleTransform(
      transformer.options.operation,
      transformer.readable,
      transformer.writable
    )
  }
}
