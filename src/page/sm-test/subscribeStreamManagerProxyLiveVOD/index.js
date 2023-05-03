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
;(function (window, document, red5prosdk, CustomControls) {
  const serverSettings = (() => {
    const settings = sessionStorage.getItem('r5proServerSettings')
    try {
      return JSON.parse(settings)
    } catch (e) {
      return {}
    }
  })()
  const configuration = (() => {
    const conf = sessionStorage.getItem('r5proTestBed')
    try {
      return JSON.parse(conf)
    } catch (e) {
      return {}
    }
  })()

  red5prosdk.setLogLevel(
    configuration.verboseLogging
      ? red5prosdk.LOG_LEVELS.TRACE
      : red5prosdk.LOG_LEVELS.WARN
  )

  let subscriber
  let controls

  let instanceId = Math.floor(Math.random() * 0x10000).toString(16)
  let protocol = serverSettings.protocol
  let isSecure = protocol === 'https'

  const subscribeButton = document.getElementById('subscribe-button')
  const baseCheck = document.getElementById('base-check')
  const fullCheck = document.getElementById('full-check')
  const urlInput = document.getElementById('url-input')
  const controlsCheck = document.getElementById('controls-check')
  const customControls = document.querySelector('.custom-controls')

  const updateStatusFromEvent = window.red5proHandleSubscriberEvent // defined in src/template/partial/status-field-subscriber.hbs
  const streamTitle = document.getElementById('stream-title')
  const statisticsField = document.getElementById('statistics-field')
  const bitrateField = document.getElementById('bitrate-field')
  const packetsField = document.getElementById('packets-field')
  const resolutionField = document.getElementById('resolution-field')
  const eventsField = document.querySelector('.events-field')

  let bitrate = 0
  let packetsReceived = 0
  let frameWidth = 0
  let frameHeight = 0

  const updateStatistics = (b, p, w, h) => {
    statisticsField.classList.remove('hidden')
    bitrateField.innerText = b === 0 ? 'N/A' : Math.floor(b)
    packetsField.innerText = p
    resolutionField.innerText = (w || 0) + 'x' + (h || 0)
  }

  const onBitrateUpdate = (b, p) => {
    bitrate = b
    packetsReceived = p
    updateStatistics(bitrate, packetsReceived, frameWidth, frameHeight)
  }

  const onResolutionUpdate = (w, h) => {
    frameWidth = w
    frameHeight = h
    updateStatistics(bitrate, packetsReceived, frameWidth, frameHeight)
  }

  // Determines the ports and protocols based on being served over TLS.
  const getSocketLocationFromProtocol = () => {
    return !isSecure
      ? { protocol: 'ws', port: serverSettings.wsport }
      : { protocol: 'wss', port: serverSettings.wssport }
  }

  // Base configuration to extend in providing specific tech failover configurations.
  let defaultConfiguration = (function (useVideo, useAudio) {
    const { protocol, port } = getSocketLocationFromProtocol()
    let c = { protocol, port }
    if (!useVideo) {
      c.videoEncoding = red5prosdk.PlaybackVideoEncoder.NONE
    }
    if (!useAudio) {
      c.audioEncoding = red5prosdk.PlaybackAudioEncoder.NONE
    }
    return c
  })(configuration.useVideo, configuration.useAudio)

  // Local lifecycle notifications.
  const onSubscriberEvent = (event) => {
    const { type, data } = event
    if (type !== 'Subscribe.Time.Update') {
      console.log('[Red5ProSubscriber] ' + type + '.')
      updateStatusFromEvent(event)
      if (type === 'Subscribe.VideoDimensions.Change') {
        onResolutionUpdate(data.width, data.height)
      } else if (type.match(/.*\.LiveSeek/g)) {
        eventsField.innerText = type
        if (data.error) {
          console.log('[Red5ProSubscriber::Error', data.error)
        }
      } else if (type === 'Subscribe.Play.Unpublish') {
        showModal(generateUnpublishContent())
      }
    }
  }
  const onSubscribeFail = (message) => {
    console.error('[Red5ProSubsriber] Subscribe Error :: ' + message)
  }
  const onSubscribeSuccess = (subscriber) => {
    console.log('[Red5ProSubsriber] Subscribe Complete.')
    if (window.exposeSubscriberGlobally) {
      window.exposeSubscriberGlobally(subscriber)
    }
    if (subscriber.getType().toLowerCase() === 'rtc') {
      try {
        window.trackBitrate(
          subscriber.getPeerConnection(),
          onBitrateUpdate,
          onResolutionUpdate,
          true
        )
      } catch (e) {
        //
      }
    }
  }
  const onUnsubscribeFail = (message) => {
    console.error('[Red5ProSubsriber] Unsubscribe Error :: ' + message)
  }
  const onUnsubscribeSuccess = () => {
    console.log('[Red5ProSubsriber] Unsubscribe Complete.')
  }

  const getRegionIfDefined = () => {
    const region = configuration.streamManagerRegion
    if (
      typeof region === 'string' &&
      region.length > 0 &&
      region !== 'undefined'
    ) {
      return region
    }
    return undefined
  }

  const requestEdge = (configuration) => {
    const host = configuration.host
    const app = configuration.app
    const port = serverSettings.httpport
    const baseUrl = protocol + '://' + host + ':' + port
    const streamName = configuration.stream1
    const apiVersion = configuration.streamManagerAPI || '4.0'
    const region = getRegionIfDefined()
    let url =
      baseUrl +
      '/streammanager/api/' +
      apiVersion +
      '/event/' +
      app +
      '/' +
      streamName +
      '?action=subscribe'
    if (region) {
      url += '&region=' + region
    }
    return new Promise(function (resolve, reject) {
      fetch(url)
        .then(function (res) {
          if (res.status == 200) {
            if (
              res.headers.get('content-type') &&
              res.headers
                .get('content-type')
                .toLowerCase()
                .indexOf('application/json') >= 0
            ) {
              return res.json()
            } else {
              throw new TypeError('Could not properly parse response.')
            }
          } else {
            let msg = ''
            if (res.status == 400) {
              msg = 'An invalid request was detected'
            } else if (res.status == 404) {
              msg = 'Data for the request could not be located/provided.'
            } else if (res.status == 500) {
              msg = 'Improper server state error was detected.'
            } else {
              msg = 'Unknown error'
            }
            throw new TypeError(msg)
          }
        })
        .then(function (json) {
          resolve(json)
        })
        .catch(function (error) {
          const jsonError =
            typeof error === 'string' ? error : JSON.stringify(error, null, 2)
          console.error(
            '[SubscribeStreamManagerTest] :: Error - Could not request Edge IP from Stream Manager. ' +
              jsonError
          )
          reject(error)
        })
    })
  }

  const getAuthenticationParams = () => {
    const auth = configuration.authentication
    return auth && auth.enabled
      ? {
          connectionParams: {
            username: auth.username,
            password: auth.password,
          },
        }
      : {}
  }

  const generateUnpublishContent = () => {
    const content = document.createElement('div')
    const line1 = document.createElement('p')
    line1.innerHTML = `The Broadcast for <span style="color: #db1f26;">${configuration.stream1}</span> has ended.`
    const line2 = document.createElement('p')
    const text = document.createTextNode(
      'You will continue to have the ability to scrub and playback the stream up until this point.'
    )
    line2.appendChild(text)
    content.appendChild(line1)
    content.appendChild(document.createElement('br'))
    content.appendChild(line2)
    return content
  }

  const showModal = (content) => {
    var style = 'padding: 10px; line-height: 1.3em;'
    content.style = style
    const div = document.createElement('div')
    div.classList.add('modal')
    const container = document.createElement('div')
    const button = document.createElement('a')
    const close = document.createTextNode('close')
    button.href = '#'
    button.appendChild(close)
    button.classList.add('modal-close')
    container.appendChild(button)
    container.appendChild(content)
    div.appendChild(container)
    document.body.appendChild(div)
    button.addEventListener('click', (event) => {
      event.preventDefault()
      document.body.removeChild(div)
      return false
    })
  }

  // Request to unsubscribe.
  const unsubscribe = async () => {
    if (subscriber) {
      try {
        await subscriber.unsubscribe()
        onUnsubscribeSuccess()
      } catch (error) {
        const jsonError =
          typeof error === 'string' ? error : JSON.stringify(error, null, 2)
        onUnsubscribeFail(jsonError)
        throw error
      }
      subscriber.off('*', onSubscriberEvent)
      subscriber = undefined
    }
  }

  const subscribe = async (
    serverAddress,
    scope,
    baseURL,
    fullURL,
    useCustomControls
  ) => {
    const { app, proxy, preferWhipWhep } = configuration
    const { WHEPClient, RTCSubscriber } = red5prosdk

    subscribeButton.disabled = true
    urlInput.disabled = true
    if (useCustomControls) {
      customControls.classList.remove('hidden')
    }
    window.scrollTo(0, document.body.scrollHeight)

    try {
      const connectionParams = config.connectionParams || {}
      const rtcConfig = {
        ...config,
        ...{
          subscriptionId: 'subscriber-' + instanceId,
          liveSeek: {
            enabled: true,
            // Point to CDN which will store the HLS DVR files...
            baseURL,
            fullURL,
            usePlaybackControlsUI: !useCustomControls,
            options: { debug: true, backBufferLength: 0 },
          },
          app: preferWhipWhep ? app : proxy,
          connectionParams: preferWhipWhep
            ? connectionParams
            : {
                ...connectionParams,
                host: serverAddress,
                app: scope,
              },
        },
      }
      subscriber = preferWhipWhep ? new WHEPClient() : new RTCSubscriber()
      await subscriber.init(rtcConfig)
      subscriber.on('*', onSubscriberEvent)
      controls = new CustomControls(subscriber)

      streamTitle.innerText = configuration.stream1
      await subscriber.subscribe()
      onSubscribeSuccess(subscriber)
    } catch (error) {
      var jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      console.error(
        '[Red5ProSubscriber] :: Error in subscribing - ' + jsonError
      )
      onSubscribeFail(jsonError)
      subscribeButton.disabled = false
      urlInput.disabled = false
      window.scrollTo(0, 0)
    }
  }

  // Clean up.
  let shuttingDown = false
  const shutdown = async () => {
    if (shuttingDown) return
    shuttingDown = true
    window.untrackBitrate()
    try {
      await unsubscribe()
    } catch (e) {
      console.warn(e)
    }
  }
  window.addEventListener('pagehide', shutdown)
  window.addEventListener('beforeunload', shutdown)

  let retryCount = 0
  let retryLimit = 3
  const respondToEdgeFailure = (
    error,
    config,
    baseURL,
    fullURL,
    useCustomControls
  ) => {
    if (retryCount++ < retryLimit) {
      var retryTimer = setTimeout(function () {
        clearTimeout(retryTimer)
        startup(config, baseURL, fullURL, useCustomControls)
      }, 1000)
    } else {
      var jsonError =
        typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      console.error(
        '[Red5ProSubscriber] :: Retry timeout in subscribing - ' + jsonError
      )
    }
  }

  // Start
  const startup = (config, baseURL, fullURL, useCustomControls) => {
    requestEdge(config)
      .then((response) => {
        const { scope, serverAddress } = response
        subscribe(serverAddress, scope, baseURL, fullURL, useCustomControls)
      })
      .catch((error) => {
        respondToEdgeFailure(error, config, baseURL, fullURL, useCustomControls)
      })
  }

  baseCheck.onchange = () => {
    if (baseCheck.checked) {
      fullCheck.checked = false
    }
  }
  fullCheck.onchange = () => {
    if (fullCheck.checked) {
      baseCheck.checked = false
    }
  }

  // Start
  // Define tech specific configurations for each failover item.
  const config = {
    ...configuration,
    ...defaultConfiguration,
    ...getAuthenticationParams(),
    ...{
      streamName: configuration.stream1,
    },
  }

  subscribeButton.addEventListener('click', () => {
    const useCustomControls = controlsCheck.checked
    const baseURL = baseCheck.checked ? urlInput.value : undefined
    const fullURL = fullCheck.checked ? urlInput.value : undefined
    if (!baseURL && !fullURL) {
      return
    }
    startup(config, baseURL, fullURL, useCustomControls)
  })
})(this, document, window.red5prosdk, window.CustomControls)
