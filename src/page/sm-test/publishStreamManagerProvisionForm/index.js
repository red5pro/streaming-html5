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

  var updateStatusFromEvent = window.red5proHandlePublisherEvent // defined in src/template/partial/status-field-publisher.hbs
  var streamTitle = document.getElementById('stream-title')
  var streamListing = document.getElementById('stream-listing')
  var submitButton = document.getElementById('submit-button')
  var transcoderTypes = ['high', 'mid', 'low']
  var transcoderForms = (function (types) {
    var list = []
    var i,
      length = types.length
    for (i = 0; i < length; i++) {
      list.push(document.getElementById(['transcoder', types[i]].join('-')))
    }
    return list
  })(transcoderTypes)
  var qualityContainer = document.getElementById('quality-container')

  submitButton.addEventListener('click', submitTranscode)
  streamTitle.innerText = configuration.stream1

  var auth = configuration.authentication
  var authName = auth.enabled ? auth.username : ''
  var authPass = auth.enabled ? auth.password : ''
  var authToken =
    auth.enabled && !window.isEmpty(auth.token) ? auth.token : undefined
  const { app, stream1 } = configuration
  var transcoderPOST = {
    provisionGuid: `${app}/${stream1}`,
    messageType: 'ProvisionCommand',
    credentials: auth.enabled
      ? {
          username: authName,
          password: authPass,
          token: authToken,
        }
      : undefined,
    streams: [],
  }

  const getOrigin = async (
    host,
    app,
    stream1,
    version,
    nodeGroup,
    transcoder = true
  ) => {
    try {
      const result = await streamManagerUtil.getOrigin(
        host,
        app,
        stream1,
        version,
        nodeGroup,
        transcoder
      )
      return result
    } catch (error) {
      return undefined
    }
  }

  const startup = async () => {
    const {
      host,
      app,
      stream1,
      streamManagerAPI: version,
      streamManagerNodeGroup: nodeGroup,
    } = configuration
    const { streamGuid, streams } = transcoderPOST

    let originResponse
    originResponse = await getOrigin(host, app, stream1, version, nodeGroup)
    if (!originResponse) {
      originResponse = await getOrigin(
        host,
        app,
        stream1,
        version,
        nodeGroup,
        false
      )
    }

    if (originResponse) {
      const { serverAddress } = originResponse
      const length = streams.length
      for (let i = 0; i < length; i++) {
        var p = document.createElement('p')
        p.style.margin = '10px 0'
        p.textContent = `rtmp://${serverAddress}:1935/${streams[i].streamGuid}`
        streamListing.appendChild(p)
      }
      qualityContainer.classList.remove('hidden')
    }
    // Provision Details.
    const url = `https://${host}/as/${version}/streams/provision/${nodeGroup}/${streamGuid}`
    document.getElementById('provision-link').href = url
  }

  function generateTranscoderPost(guid, forms) {
    var i = forms.length
    var formItem
    var bitrateField
    var widthField
    var heightField
    var setting
    var streams = []
    while (--i > -1) {
      const level = i + 1
      formItem = forms[i]
      bitrateField = formItem.getElementsByClassName('bitrate-field')[0]
      widthField = formItem.getElementsByClassName('width-field')[0]
      heightField = formItem.getElementsByClassName('height-field')[0]
      setting = {
        streamGuid: `${guid}_${level}`,
        abrLevel: level,
        videoParams: {
          videoWidth: parseInt(widthField.value, 10),
          videoHeight: parseInt(heightField.value, 10),
          videoBitRate: parseInt(bitrateField.value, 10),
        },
      }
      streams.push(setting)
    }
    return streams
  }

  async function submitTranscode() {
    try {
      const {
        host,
        streamManagerUser,
        streamManagerPassword,
        streamManagerAPI: version,
        streamManagerNodeGroup: nodeGroup,
      } = configuration
      const { streamGuid } = transcoderPOST
      const streams = generateTranscoderPost(streamGuid, transcoderForms)
      transcoderPOST.streams = streams
      const token = await streamManagerUtil.authenticate(
        host,
        streamManagerUser,
        streamManagerPassword
      )
      const response = await streamManagerUtil.postProvision(
        host,
        version,
        nodeGroup,
        token,
        [transcoderPOST]
      )
      if (response.errorMessage) {
        throw new Error(response.errorMessage)
      }
      let t = setTimeout(() => {
        clearTimeout(t)
        startup()
      }, 2000)
    } catch (error) {
      const { message } = error
      console.error(
        '[Red5ProPublisher] :: Error in POST of transcode configuration: ' +
          message
      )
      updateStatusFromEvent({
        type: red5prosdk.PublisherEventTypes.CONNECT_FAILURE,
      })
      alert('Error in POST of transcode configuration: ' + message)
    }
  }
})(this, document, window.red5prosdk, window.streamManagerUtil)
