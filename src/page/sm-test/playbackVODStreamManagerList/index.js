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
;(function (window, document, red5prosdk, streamManagerUtil) {
  'use strict'

  var serverSettings = (function () {
    var settings = sessionStorage.getItem('r5proServerSettings')
    try {
      return JSON.parse(settings)
    } catch (e) {
      console.error(
        'Could not read server settings from sessionstorage: ' + e.message
      )
    }
    return {}
  })()

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

  var videoContainer = document.getElementById('video-container')
  var errorNotification = document.getElementById('error-notification')
  var mediaListing = document.getElementById('media-file-listing')
  var playlistListing = document.getElementById('playlist-listing')
  var useCloudStorageCheckbox = document.getElementById(
    'use-cloudstorage-checkbox'
  )
  useCloudStorageCheckbox.addEventListener('change', refreshList)

  var subscriberNode =
    '<video id="red5pro-subscriber" controls autoplay playsinline class="red5pro-subscriber red5pro-media red5pro-media-background" width="640" height="480"></video>'

  function isMP4File(url) {
    return url.indexOf('.mp4') !== -1
  }

  function useMP4Fallback(url) {
    if (configuration.authentication.enabled) {
      url += `?${getAuthQueryParams()}`
    }
    console.log('[subscribe] Playback MP4: ' + url)
    var element = document.getElementById('red5pro-subscriber')
    var source = document.createElement('source')
    source.type = 'video/mp4;codecs="avc1.42E01E, mp4a.40.2"'
    source.src = url
    element.appendChild(source)
  }

  function useVideoJSFallback(url) {
    if (configuration.authentication.enabled) {
      url += `?${getAuthQueryParams()}`
    }
    console.log('[subscribe] Playback HLS: ' + url)
    var videoElement = document.getElementById('red5pro-subscriber')
    videoElement.classList.add('video-js')
    var source = document.createElement('source')
    source.type = 'application/x-mpegURL'
    source.src = url
    videoElement.appendChild(source)
    var v = new window.videojs(
      'red5pro-subscriber',
      {
        techOrder: ['html5'],
      },
      function () {
        // success.
      }
    )
    v.play()
  }

  function showErrorNotification(message) {
    errorNotification.innerText = message
    errorNotification.classList.remove('hidden')
  }
  function hideErrorNotification() {
    errorNotification.classList.add('hidden')
  }

  function getAuthQueryParams() {
    var auth = configuration.authentication
    var kv = []
    for (var key in auth) {
      if (key === 'enabled' || auth[key] === '') continue
      kv.push(`${key}=${auth[key]}`)
    }
    return kv.join('&')
  }

  function isHlsSupported() {
    var video = document.createElement('video')
    return video.canPlayType('application/vnd.apple.mpegurl') !== ''
  }

  async function requestVOD(
    configuration,
    vodType /* mediafiles | playlists */,
    useCloudStorage = false
  ) {
    try {
      const {
        host,
        app,
        streamManagerAPI: version,
        streamManagerNodeGroup: nodeGroup,
      } = configuration
      const origin = await streamManagerUtil.getOrigin(
        host,
        app,
        `vod-test`,
        version,
        nodeGroup
      )
      const { serverAddress } = origin
      const url = `http://${serverAddress}:${serverSettings.hlsport}/${app}/${vodType}?useCloud=${useCloudStorage}`
      const payload = await streamManagerUtil.forward(host, version, url)
      if (payload[vodType] === undefined) {
        throw new Error(`No ${vodType} found.`)
      }
      const files = payload[vodType]
      files.map((item) => {
        item.host = serverAddress
        item.app = app
      })
      return files
    } catch (error) {
      console.error(
        '[SubscribeStreamManagerTest] :: Error - Could not request Playlists from Stream Manager. ' +
          error.message
      )
      showErrorNotification(error.message)
      throw error
    }
  }

  var mediafiles = []
  var playlists = []

  function handlePlaylistSelect(event) {
    unsubscribe()
    hideErrorNotification()
    var el = event.target
    var index = parseInt(el.dataset.index, 10)
    if (!isNaN(index) && playlists.length > index) {
      respondToPlaylist(playlists[index])
    }
  }

  function handleMediafileSelect(event) {
    unsubscribe()
    hideErrorNotification()
    var el = event.target
    var index = parseInt(el.dataset.index, 10)
    if (!isNaN(index) && mediafiles.length > index) {
      var f = mediafiles[index]
      var url = f.url
      var location = url.split('/')
      mediafiles[index] = Object.assign({}, f, {
        serverAddress: location[2],
        scope: [location[3], location[4]].join('/'),
        name: location[5],
      })
      var mediafile = mediafiles[index]
      if (isMP4File(mediafile.url)) {
        useMP4Fallback(mediafile.url)
      } else {
        copyFLVLocationToClipboard(mediafile)
      }
    }
  }

  function displayPlaylists(list) {
    playlists = list
    var i,
      length = list.length
    var element
    var textNode
    while (playlistListing.firstChild) {
      playlistListing.removeChild(playlistListing.firstChild)
    }
    if (length > 0) {
      for (i = 0; i < length; i++) {
        element = document.createElement('p')
        textNode = document.createTextNode(list[i].name)
        element.dataset.index = i
        element.appendChild(textNode)
        playlistListing.appendChild(element)
        if (i < length - 1) {
          element.classList.add('item-separator')
        }
        element.addEventListener('click', handlePlaylistSelect)
      }
    } else {
      element = document.createElement('p')
      element.classList.add('load-listing')
      textNode = document.createTextNode('None found.')
      element.appendChild(textNode)
      playlistListing.appendChild(element)
    }
  }

  function displayMediaFiles(list) {
    mediafiles = list
    var i,
      length = list.length
    var element
    var textNode
    while (mediaListing.firstChild) {
      mediaListing.removeChild(mediaListing.firstChild)
    }
    if (length > 0) {
      for (i = 0; i < length; i++) {
        element = document.createElement('p')
        textNode = document.createTextNode(list[i].name)
        element.dataset.index = i
        element.appendChild(textNode)
        mediaListing.appendChild(element)
        if (i < length - 1) {
          element.classList.add('item-separator')
        }
        element.addEventListener('click', handleMediafileSelect)
      }
    } else {
      element = document.createElement('p')
      element.classList.add('load-listing')
      textNode = document.createTextNode('None found.')
      element.appendChild(textNode)
      mediaListing.appendChild(element)
    }
  }

  async function respondToPlaylist(response) {
    try {
      const { url } = response
      if (isHlsSupported()) {
        const source = `<source src="${url}" type="application/x-mpegURL">`
        document.getElementById('red5pro-subscriber').appendChild(source)
      } else {
        useVideoJSFallback(url)
      }
    } catch (error) {
      console.error(`Could not playback: ${error.message}`)
    }
  }

  function copyFLVLocationToClipboard(response) {
    console.log(response)
    try {
      navigator.clipboard
        .writeText(response.url)
        .then(function () {
          alert(response.url + ' add to clipboard!')
        })
        .catch(function (e) {
          console.error(e)
        })
    } catch (e) {
      console.error(e)
    }
  }

  function unsubscribe() {
    try {
      document.getElementById('red5pro-subscriber').pause()
    } catch (e) {
      console.log('WARN: tried to stop playback. ' + e.message)
    } finally {
      while (videoContainer.firstChild) {
        videoContainer.removeChild(videoContainer.firstChild)
      }
      videoContainer.innerHTML = subscriberNode
    }
  }

  function getPlaylists() {
    requestVOD(configuration, 'playlists', false)
      .then(function (listing) {
        displayPlaylists(listing)
      })
      .catch(function (error) {
        displayPlaylists([])
        console.info(error)
      })
  }

  function getMediaFiles() {
    requestVOD(configuration, 'mediafiles', false)
      .then(function (listing) {
        displayMediaFiles(listing)
        getPlaylists()
      })
      .catch(function (error) {
        displayMediaFiles([])
        getPlaylists()
        console.info(error)
      })
  }

  function refreshList() {
    getMediaFiles()
  }

  // start.
  getMediaFiles()
})(this, document, window.red5prosdk, window.streamManagerUtil)
