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
  red5prosdk.setLogLevel('debug')

  const { PubNubClient } = red5prosdk
  const pubnubClient = new PubNubClient()

  const radios = document.querySelectorAll('input[type="radio"]')
  const inputFields = document.querySelectorAll('.auth-option')
  const connectButton = document.getElementById('connect-button')
  const defaultChannelId = 'room1' // 'red5'
  const defaultPublishKey = 'pub-c-50a08250-5a2b-4162-b19d-13381203ddaa'
  const defaultSubscribeKey = 'sub-c-cc708362-3d7b-4df9-a2e5-44f6a7ae60f6'
  const defaultUserId = 'subscriber-50a0'
  // const defaultUserId = `user-${Math.floor(Math.random() * 0x10000).toString(
  //   16
  // )}`

  const authOptions = {
    cloudEndpoint: undefined,
    backendUrl: undefined,
    authToken: undefined
  }

  const onPubNubEvent = event => {
    const { type, data } = event
    console.log(`[PubNub]:: ${type}`, data)
    if (type === 'PubNub.AuthToken.Generation.Error') {
      alert('Error generating authentication token.')
      enableForm()
    }
  }

  const toggleInputs = selectedRadio => {
    const selectedIndex = Array.from(radios).indexOf(selectedRadio)
    inputFields.forEach((input, index) => {
      input.disabled = index !== selectedIndex
    })
  }

  const getAuthOptions = () => {
    // Find the selected radio button
    const selectedRadio = document.querySelector('input[type="radio"]:checked')
    if (!selectedRadio) {
      alert('Please select an authentication option.')
      return undefined
    }
    // Find the input field value for the selected radio button and return the value
    const selectedInput = Array.from(inputFields).find(
      input => input.id === selectedRadio.value
    )
    if (!selectedInput || selectedInput.value === '') {
      alert('Please enter a value for the selected authentication option.')
      return undefined
    }
    const value = selectedInput.value
    return {
      ...authOptions,
      [selectedRadio.value]: value
    }
  }

  const getConfigurationOptions = () => {
    const channelId = document.getElementById('channel-id-input').value
    if (!channelId || channelId === '') {
      alert('Please enter a value for the channel ID.')
      return undefined
    }
    const publishKey = document.getElementById('publish-key-input').value
    if (!publishKey || publishKey === '') {
      alert('Please enter a value for the publish key.')
      return undefined
    }
    const subscribeKey = document.getElementById('subscribe-key-input').value
    if (!subscribeKey || subscribeKey === '') {
      alert('Please enter a value for the subscribe key.')
      return undefined
    }
    const userId = document.getElementById('user-id-input').value
    if (!userId || userId === '') {
      alert('Please enter a value for the user ID.')
      return undefined
    }
    return {
      channelId,
      publishKey,
      subscribeKey,
      userId
    }
  }

  const disableForm = () => {
    Array.from(radios).forEach(radio => {
      radio.disabled = true
    })
    Array.from(inputFields).forEach(input => {
      input.disabled = true
    })
    connectButton.disabled = true
  }

  const enableForm = () => {
    Array.from(radios).forEach(radio => {
      radio.disabled = false
    })
    Array.from(inputFields).forEach(input => {
      input.disabled = false
    })
    connectButton.disabled = false
  }

  const start = async () => {
    try {
      const { channelId, publishKey, subscribeKey, userId } =
        getConfigurationOptions()
      if (!channelId || !publishKey || !subscribeKey || !userId) {
        throw new Error('Invalid configuration options.')
      }
      disableForm()
      const authOptions = getAuthOptions()
      if (!authOptions) {
        throw new Error('Invalid authentication options.')
      }
      pubnubClient.on('*', onPubNubEvent)
      await pubnubClient.init({
        ...authOptions,
        publishKey,
        subscribeKey,
        channelId,
        userId
      })
      await pubnubClient.subscribe(channelId)
    } catch (error) {
      console.error(error)
      alert(error.message)
      enableForm()
    }
  }

  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      toggleInputs(radio)
      connectButton.disabled = !radio.checked
    })
  })

  connectButton.addEventListener('click', start)
  document.getElementById('user-id-input').value = defaultUserId
  document.getElementById('channel-id-input').value = defaultChannelId
  document.getElementById('publish-key-input').value = defaultPublishKey
  document.getElementById('subscribe-key-input').value = defaultSubscribeKey

  const shutdown = () => {
    pubnubClient.destroy()
  }
  window.addEventListener('pagehide', shutdown)
  window.addEventListener('beforeunload', shutdown)
})(this, window.red5prosdk)
