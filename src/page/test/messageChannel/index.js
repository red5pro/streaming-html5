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
;((window, red5prosdk) => {

  const configuration = (function () {
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

  const { MessageChannel } = red5prosdk
  let messageChannel
  let defaultChannelId = 'red5pro'
  let defaultUserId = `dc-${Math.floor(Math.random() * 0x10000).toString(16)}`

  const streamTitle = document.getElementById('stream-title')
  const updateStatusFromEvent = window.red5proHandleMessageChannelEvent // defined in src/template/partial/status-field-message-channel.hbs

  const startButton = document.getElementById('start-button')
  const dcInput = document.getElementById('dc-input')
  const sendMessageButton = document.getElementById('send-message-button')
  const sendDataButton = document.getElementById('send-data-button')
  const messageInput = document.getElementById('message-input')

  function getAuthenticationParams() {
    var auth = configuration.authentication
    return auth && auth.enabled
      ? {
          connectionParams: {
            username: auth.username,
            password: auth.password,
            token: auth.token
          }
        }
      : {}
  }

  const showModal = (content) => {
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

  const closePreviousModal = () => {
    const modal = document.querySelector('.modal')
    if (modal) {
      modal.parentNode.removeChild(modal)
    }
  }

  const createMessageContent = (json) => {
    closePreviousModal()
    const data = json.data || json
    const style = 'padding: 10px'
    const content = document.createElement('div')
    const p = document.createElement('p')
    const from = data.sender_id || data.sender || data.username || data.user || data.name || 'UNKNOWN'
    const header = document.createTextNode(
      'Message Received from ' + from + ':'
    )
    p.appendChild(header)
    const messageP = document.createElement('p')
    messageP.style = style
    const timestampP = document.createElement('p')
    timestampP.style = style
    const message = document.createTextNode('message: ' + data.message)
    messageP.appendChild(message)
    const timestamp = document.createTextNode(
      'timestamp: ' + new Date(data.timestamp || data.send_timestamp)
    )
    timestampP.appendChild(timestamp)
    content.appendChild(p)
    content.appendChild(messageP)
    content.appendChild(timestampP)
    return content
  }

  const onMessageChannelEvent = (event) => {
    const { type, data } = event
    updateStatusFromEvent(event)
    console.log(`[MessageChannel] ${type}.`)
    if (type === 'WebRTC.Stats.Report') {
      console.log(JSON.stringify(event.data, null, 2))
    } else if (type === 'WebRTC.DataChannel.Message') {
      console.log(data)
      // Non-descript data coming in to handle.
      // event.data.message.data will be either a String or ArrayBuffer/Blob
      const {
        message
      } = data
      const { data: messageData } = message
      if (typeof messageData === 'string') {
        try {
          var json = JSON.parse(messageData)
          // Otherwise is an invoke.
          if (json && !json.send) {
            showModal(createMessageContent(json))
          }
        } catch (e) {
          // drop.
        }
      } else {
        // showModal(createAudioPlaybackContent(data))
      }
    }
  }

  const updateState = () => {
    startButton.innerText = messageChannel ? 'Close Message Channel' : 'Open Message Channel'
    sendMessageButton.disabled = !messageChannel
    sendDataButton.disabled = !messageChannel
    messageInput.value = ''
  }

  const startDataSend = () => {
    if (messageChannel) {
      messageChannel.sendData(messageInput.value)
      messageInput.value = ''
    }
  }

  const start = async () => {
    shutdown()
    try {
      startButton.disabled = true

      defaultChannelId = dcInput.value
      defaultUserId = `dc-${Math.floor(Math.random() * 0x10000).toString(16)}`
      const streamName = `${defaultChannelId}-${defaultUserId}`
      const config = {
        ...configuration,
        ...getAuthenticationParams(),
        streamName,
        dataChannelConfiguration: { name: defaultChannelId }
      }
      messageChannel = new MessageChannel()
      messageChannel.on('*', onMessageChannelEvent)
      await messageChannel.init(config)
      await messageChannel.open()
      streamTitle.innerText = streamName
    } catch (error) {
      console.error(error)
      alert(error.message)
      shutdown()
    } finally {
      updateState()
      startButton.disabled = false
    }
  }

  startButton.disabled = false
  startButton.addEventListener('click', () => {
    if (messageChannel) {
      shutdown()
    } else {
      start()
    }
  })
  sendMessageButton.addEventListener('click', () => {
    if (messageChannel) {
      messageChannel.sendMessage(messageInput.value)
      messageInput.value = ''
    }
  })
  sendDataButton.addEventListener('click', () => {
    if (messageChannel) {
      startDataSend()
    }
  })

  const shutdown = async () => {
    if (messageChannel) {
      await messageChannel.close()
      messageChannel.off('*', onMessageChannelEvent)
    }
    messageChannel = null
    updateState()
  }

  window.addEventListener('pagehide', shutdown)
  window.addEventListener('beforeunload', shutdown)

})(window, window.red5prosdk)
