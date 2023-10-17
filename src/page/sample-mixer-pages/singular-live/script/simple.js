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
/* global Hls, SingularGraphics, red5prosdk */
import { query, isHostAnIPAddress } from './url-util.js'

const { host, app, name, fit, vod, overlayToken, vodURL } = query()
const container = document.querySelector('#app')

const red5pro = window.red5prosdk
const singular = window.SingularGraphics
red5pro.setLogLevel('debug')

let retryTimeout = 0
const RETRY_DELAY = 1000

const options = {
  class: 'overlay',
  endpoint: 'http://app.singular.live',
  interactive: false,
  syncGraphics: true,
  showPreloader: true,
  aspect: '',
}

// > Quick and Simple
const loadLive = async () => {
  clearTimeout(retryTimeout)
  try {
    document.querySelector('#red5pro-subscriber').style['object-fit'] = fit
    const isSecure = !isHostAnIPAddress(host)
    const subscriber = new red5pro.WHEPClient()
    subscriber.on('*', (event) => {
      const { type } = event
      if (type !== 'Subscribe.Time.Update') {
        console.log(type)
        if (
          type === 'Subscribe.Connection.Closed' ||
          type === 'Subscribe.Play.Unpublish'
        ) {
          subscriber.unsubscribe()
          retryTimeout = setTimeout(loadLive, RETRY_DELAY)
        }
      }
    })
    await subscriber.init({
      host,
      protocol: isSecure ? 'wss' : 'ws',
      port: isSecure ? 443 : 5080,
      app: app || 'live',
      streamName: name,
    })
    await subscriber.subscribe()
  } catch (e) {
    console.error(e)
    if (!vod) {
      retryTimeout = setTimeout(loadLive, RETRY_DELAY)
    }
  }
}

const loadVOD = async () => {
  const element = document.getElementById('red5pro-subscriber')
  const isSecure = !isHostAnIPAddress(host)
  const protocol = isSecure ? 'https' : 'http'
  const port = isSecure ? 443 : 5080
  const url =
    vodURL || `${protocol}://${host}:${port}/${app || 'live'}/${name}.m3u8`
  if (Hls.isSupported()) {
    const hls = new Hls()
    hls.attachMedia(element)
    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      hls.loadSource(url)
    })
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      try {
        element.play()
      } catch (e) {
        console.error(e)
      }
    })
    hls.on(Hls.Events.ERROR, function (err, info) {
      showError(`[Error]:: ${err}, ${JSON.stringify(info)}`)
    })
  } else if (element.canPlayType('application/vnd.apple.mpegurl')) {
    element.src = url
    element.addEventListener('loadedmetadata', function () {
      try {
        element.play()
      } catch (e) {
        console.error(e)
      }
    })
  } else {
    showError('Your browser does not support HLS video playback.')
  }
}

const showError = (message) => {
  const container = document.querySelector('#error-container')
  const error = document.querySelector('#error-message')
  container.classList.remove('hidden')
  error.textContent = message
}

const load = async () => {
  try {
    const url = `https://app.singular.live/apiv2/controlapps/${overlayToken}`
    const response = await fetch(url, {
      method: 'GET',
    })
    const json = await response.json()
    const contentURL = json.outputUrl
    const iframe = document.createElement('iframe')
    iframe.onload = vod || vodURL ? loadVOD : loadLive
    iframe.classList.add('overlay')
    iframe.setAttribute('src', contentURL)
    iframe.setAttribute('width', '100%')
    iframe.setAttribute('height', '100%')
    iframe.setAttribute('frameborder', '0')
    iframe.setAttribute('scrolling', 'no')
    iframe.setAttribute('allowfullscreen', 'true')
    container.appendChild(iframe)
  } catch (e) {
    console.error(e)
    showError(e.message)
  }
}

load()
