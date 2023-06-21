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
/**
 * The SubscriberBlock is a self-contained manager for a subscriber that handles:
 *
 * * Setup an RTC Subscriber.
 * * Graceful retry connection on failure to connect or unpublish.
 *
 * [Note] :: The streamUtils.subscriber is an entry point to the subscriber map maintained in this script.
 */
;((window, document, red5prosdk, getIsAvailable) => {
  // Hold a Set mapping stream name to SubscriberBlock.
  let subscriberMap = {}
  const elementIdRegex = /(subscriber-).*(-container)/

  /**
   * Finds and returns SubscriberBlock associated with stream name.
   *
   * @param {String} name
   */
  const findByStreamName = (name) => {
    if (subscriberMap.hasOwnProperty(name)) {
      return subscriberMap[name]
    }
    return undefined
  }

  /**
   * Finds and returns the SubscriberBlock associated with the element id.
   *
   * @param {String} id
   */
  const findByElementId = (id) => {
    const name = getStreamNameFromSubscriberId(id)
    if (name) {
      return findByStreamName(name)
    }
    return undefined
  }

  /**
   * Request to cancel subscription of a SubscriberBlock from the mapping.
   *
   * @param {String} name
   *        The stream name to look up to access the corresponding SubscriberBlock.
   */
  const cancelSubscriberBlock = (name) => {
    // If wildcarded, remove all.
    if (name === '*') {
      Object.keys(subscriberMap).forEach((key) => {
        if (subscriberMap[key] instanceof SubscriberBlock) {
          subscriberMap[key].cancel()
          delete subscriberMap[key]
        }
      })
    } else {
      const subscriber = subscriberMap[name]
      if (subscriber instanceof SubscriberBlock) {
        subscriber.cancel()
        delete subscriberMap[name]
      }
    }
  }

  /**
   * Generic container HTML element for the subscriber block.
   */
  const subscriberTemplate = `<div class="subscriber-container">
      <div class="red5pro-media-container video-holder centered">
        <video muted autoplay controls playsinline class="red5pro-subscriber" style="width:100%; height:100%;"></video>
      </div>
      <div class="subscriber-notifications"></div>
      <div class="centered">
        <p class="subscriber-name-field"></span></p>
      </div>
    </div>`

  /**
   * Generates the template.
   */
  const templateContent = (templateHTML, streamName) => {
    var div = document.createElement('div')
    div.classList.add('subscriber-block')
    div.classList.add('flex-parent')
    div.innerHTML = templateHTML
    div.classList.add(`${getSubscriberElementId(streamName)}-container`)
    return div
  }

  /**
   * Utility to generate a subscriber element id based on streamName.
   */
  const getSubscriberElementId = (streamName) => {
    return ['red5pro', 'subscriber', streamName].join('-')
  }

  /**
   * Utility to get the stream name from the subscriber element id.
   */
  const getStreamNameFromSubscriberId = (id) => {
    const match = id.match(elementIdRegex)
    if (match && match.length > 0) {
      const split = match[0].split('-')
      return split[1]
    }
    return undefined
  }

  /**
   * Generates the encapsulating DOM element for the subscriber.
   */
  const generateNewSubscriberDOM = (streamName, subId, parent) => {
    const card = templateContent(subscriberTemplate, streamName)
    parent.appendChild(card)
    const videoId = subId
    const videoElement = card.querySelector('.red5pro-subscriber')
    const subscriberNameField = card.querySelector('.subscriber-name-field')
    subscriberNameField.innerText = streamName
    videoElement.id = videoId
    card.id = [videoId, 'container'].join('-')
    return card
  }

  /**
   * Generates Red5 Pro URL to check for stream availability
   */
  const getAvailableUrl = (streamManagerHost = null) => {
    if (streamManagerHost != null) {
      const protocol = 'https'
      const host = streamManagerHost
      const port = 443
      return `${protocol}://${host}:${port}/streammanager/api/4.0/event/list`
    }

    return `http://127.0.0.1:5080/live/streams.jsp`
  }

  /**
   * Breaks string into room and stream name
   */
  function getRoomAndStreamFromStreamName(streamName) {
    if (streamName.charAt(0) === '/') {
      streamName = streamName.substring(1)
    }

    let parts = streamName.split('/')
    parts.splice(0, 1)
    let stream = parts[parts.length - 1]
    parts.splice(parts.length - 1, 1)
    let room = parts.join('/')
    return { room, stream }
  }

  /**
   * The SubscriberBlock is a self-managed subscriber that consumes and plays back a target stream.
   */
  class SubscriberBlock {
    /**
     * @param {String} streamName
     *        The unique name of the stream to subscribe to.
     * @param {HTMLNode} containerOrVideoElement
     *        Can be either the parenting container to append a generated subscriber UI to, or
     *          the target `video` element to assign the stream to.
     * @param {Boolean} forceMute
     *        Flag to force the subscriber to mute or unmute.
     * @param {Boolean} debug
     *        Flag to display debug information in UI.
     * @param {Object} client
     *        Optional delegate that receieves method/event invocations for publisher muting.
     */
    constructor(
      streamName,
      containerOrVideoElement,
      retryDelay,
      forceMute = true,
      debug = true,
      client = undefined
    ) {
      this.retryDelay = retryDelay
      const { room, stream } = getRoomAndStreamFromStreamName(streamName)
      const uid = Math.floor(Math.random() * 0x10000).toString(16)
      this.subscriptionId = [stream, 'sub', uid].join('-')
      this.streamName = stream
      this.roomName = room
      this.subscriber = undefined
      this.baseConfiguration = undefined
      this.requiresStreamManager = false
      this.streamManagerHost = undefined
      this.preferWhipWhep = false
      this.retryConnectTimeout = 0
      this.forceMute = forceMute
      this.next = undefined
      this.client = client
      this.currentStreamMode = 'Video/Audio'
      this.parent = containerOrVideoElement
      const tagname = this.parent.tagName.toUpperCase()
      this.parentIsElement = tagname === 'VIDEO' || tagname === 'AUDIO'

      // If the provided parent container IS NOT an `audio` or `video` element, we will generate one within the container.
      if (!this.parentIsElement) {
        this.card = generateNewSubscriberDOM(
          this.streamName,
          this.subscriptionId,
          this.parent
        )
        this.subscriberNameField = this.card.querySelector(
          '.subscriber-name-field'
        )
        this.notificationContainer = this.card.querySelector(
          '.subscriber-notifications'
        )
        if (!debug) {
          this.subscriberNameField.classList.add('hidden')
          this.notificationContainer.classList.add('hidden')
        }
      }

      this.onSubscriberEvent = this.respond.bind(this)
      this.cancelled = false
      this.closing = false
      this.closed = false
      this.unpublished = false

      // Delegate callbacks
      this.onevent = undefined

      subscriberMap[this.streamName] = this
    }

    /**
     * Optionally displays status info in custom UI.
     */
    displayInfo(message) {
      if (!this.parentIsElement) {
        this.subscriberNameField.classList.remove('error-field')
        this.subscriberNameField.innerText = message
      }
    }

    /**
     * Optionally displays error info in custom UI.
     */
    displayError(message) {
      if (!this.parentIsElement) {
        this.subscriberNameField.classList.add('error-field')
        this.subscriberNameField.innerText = message
      }
    }

    /**
     * Optionally displays information about audio mute from publisher.
     */
    showAudioMuteNotification(flag, streamName) {
      if (!this.parentIsElement) {
        let notification = this.notificationContainer.querySelector(
          '.audio-notification'
        )
        if (flag && !notification) {
          notification = document.createElement('p')
          notification.classList.add('audio-notification')
          notification.innerText = `${streamName} has turned off audio.`
          this.notificationContainer.appendChild(notification)
        } else if (!flag && notification) {
          this.notificationContainer.removeChild(notification)
        }
      }

      if (this.client && this.client.onaudiomute) {
        this.client.onaudiomute.call(null, flag, streamName, this)
      }
    }

    /**
     * Optionally displays information about video mute from publisher.
     */
    showVideoMuteNotification(flag, streamName) {
      if (!this.parentIsElement) {
        let notification = this.notificationContainer.querySelector(
          '.video-notification'
        )
        if (flag && !notification) {
          notification = document.createElement('p')
          notification.classList.add('video-notification')
          notification.innerText = `${streamName} has turned off video.`
          this.notificationContainer.appendChild(notification)
        } else if (!flag && notification) {
          this.notificationContainer.removeChild(notification)
        }
      }

      if (this.client && this.client.onvideomute) {
        this.client.onvideomute.call(null, flag, streamName, this)
      }
    }

    /**
     * Invoked when subscriber session is determined sufficient enough to pass on setup to
     * another SubscriberBlock in a linked list.
     */
    resolve() {
      if (this.next) {
        this.next.start(
          this.baseConfiguration,
          this.streamManagerHost,
          this.preferWhipWhep
        )
      }
      this.next = undefined
    }

    /**
     * Invoked when subscriber session has failed but to pass on setup to another
     * SubscriberBlock in a linked list.
     */
    reject(event) {
      if (event) {
        console.error(event)
      }
      if (this.next) {
        this.next.start(
          this.baseConfiguration,
          this.streamManagerHost,
          this.preferWhipWhep
        )
      }
      this.next = undefined
    }

    mergeAudioStreams() {
      var streams = []
      Object.keys(window.connectedSubscribers).forEach((s) => {
        if (
          window.connectedSubscribers[s] &&
          !window.connectedSubscribers[s].forceMute
        ) {
          const theStream =
            window.connectedSubscribers[s].subscriber.getMediaStream()
          console.log(theStream)
          if (theStream) {
            streams.push(theStream)
          }
        }
      })

      console.log(streams)
      this.combineStreams(streams)
    }

    combineStreams(streams) {
      if (streams === undefined) {
        console.error('No Stream Available!')
        return
      }
      try {
        if (window.audioContext) {
          window.audioContext.close()
          window.audioContext = undefined
        }

        if (streams.length <= 0) {
          return
        }
        // Initialize AudioContext object
        window.audioContext = new AudioContext()
        // Adding an AudioWorkletProcessor
        // from another script with addModule method
        // await audioContext.audioWorklet.addModule("/javascripts/vumeters_worklet.js");
        // Creating a MediaStreamSource object
        // and sending a MediaStream object granted by
        // the user
        var gainNode = window.audioContext.createGain()
        window.gainNode = gainNode
        gainNode.gain.value = 0.45
        var merger = window.audioContext.createChannelMerger(streams.length)
        for (var ii = 0; ii < streams.length; ii++) {
          var stream = window.audioContext.createMediaStreamSource(streams[ii])
          stream.connect(merger)
        }
        merger.connect(gainNode)
        gainNode.connect(window.audioContext.destination)

        console.log(window.audioContext.destination)

        console.log('setup audio context')
      } catch (e) {
        console.log('We got an error connecting VU Meters!')
        console.log(e)
        return
      }
    }

    /**
     * Event listener for the Subscriber.
     */
    respond(event) {
      if (event.type === 'Subscribe.Time.Update') return
      console.log('[subscriber:' + this.streamName + '] ' + event.type)
      if (event.type !== 'Subscribe.Stop') {
        this.displayInfo(`${this.streamName} - ${event.type}`)
      }

      if (
        event.type === 'Connect.Failure' ||
        event.type === 'Subscribe.Fail' ||
        event.type === 'Subscribe.InvalidName'
      ) {
        this.reject(event)
        this.displayError(`${this.streamName} - ${event.type}`)
      } else if (event.type === 'Subscribe.Start') {
        console.log(`Set window.connectedSubscribers for ${this.streamName}`)
        window.connectedSubscribers[this.streamName] = this
        this.mergeAudioStreams()
        this.resolve()
      } else if (event.type === 'Subscribe.Play.Unpublish') {
        //        this.unpublished = true
        this.stop()
        console.log(
          `Subscribe.Play.Unpublish, delete window.connectedSubscribers for ${this.streamName}`
        )
        delete window.connectedSubscribers[this.streamName]
        this.mergeAudioStreams()
        this.start(
          this.baseConfiguration,
          this.streamManagerHost,
          this.preferWhipWhep
        )
      } else if (event.type === 'Subscribe.Metadata') {
        const { streamingMode } = event.data
        if (streamingMode && streamingMode !== this.currentStreamMode) {
          if (streamingMode.match(/Video\/Audio/)) {
            this.showAudioMuteNotification(false, this.streamName)
            this.showVideoMuteNotification(false, this.streamName)
          } else if (streamingMode.match(/Audio/)) {
            this.showAudioMuteNotification(false, this.streamName)
            this.showVideoMuteNotification(true, this.streamName)
          } else if (streamingMode.match(/Video/)) {
            this.showAudioMuteNotification(true, this.streamName)
            this.showVideoMuteNotification(false, this.streamName)
          } else if (streamingMode.match(/Empty/)) {
            this.showVideoMuteNotification(true, this.streamName)
            this.showAudioMuteNotification(true, this.streamName)
          }
          this.currentStreamMode = streamingMode
        }
      } else if (event.type === 'Subscribe.Stop') {
        delete window.connectedSubscribers[this.streamName]
      } else if (event.type === 'Subscribe.Connection.Closed') {
        delete window.connectedSubscribers[this.streamName]
        if (!this.unpublished) {
          this.retryConnection()
        }
      }

      if (this.onevent) {
        this.onevent.call(null, event, this)
      }
    }

    /**
     * Request to shutdown and remove Subscriber from UI.
     */
    cancel() {
      this.cancelled = true
      this.remove()
    }

    /**
     * Shuts down playback and removes element from UI.
     */
    async remove() {
      if (this.closing) return
      this.closing = true
      try {
        await this.stop()
      } catch (e) {
        console.error(`Error unsubscribing from ${this.streamName}`)
        console.error(e)
      } finally {
        if (!this.parentIsElement) {
          const el = this.parent.querySelector(
            `.${getSubscriberElementId(this.streamName)}-container`
          )
          if (el) {
            el.parentNode.removeChild(el)
          }
        }
        delete subscriberMap[this.streamName]
        this.closing = false
        this.closed = true
        this.next = undefined
        this.client = undefined
      }
    }

    /**
     * Request to stop subscribing.
     */
    async stop() {
      try {
        //        this.unpublished = true
        if (this.subscriber) {
          this.subscriber.off('*', this.respond)
          await this.subscriber.unsubscribe()
          this.subscriber = undefined
        }
        return true
      } catch (e) {
        console.error(`Error unsubscribing from ${this.streamName}`)
        console.error(e)
        return false
      }
    }

    /**
     * Request to start a subscriber session.
     *
     * @param {Object} config
     *        The configuration object for initialization.
     * @param {String} streamManagerHost
     *        Hostname of Stream Manager if used.
     * @param {Boolean} preferWhipWhep
     *        Flag to use WHIP/WHEP protocol.
     */
    async start(config, streamManagerHost = null, preferWhipWhep = false) {
      const { WHEPClient, RTCSubscriber } = red5prosdk
      this.streamManagerHost = streamManagerHost
      this.preferWhipWhep = preferWhipWhep
      this.cancelled = false
      this.unpublished = false
      this.baseConfiguration = JSON.parse(JSON.stringify(config))
      this.baseConfiguration.app = this.baseConfiguration.app + this.roomName

      // generate unique id for each time in case reconnect.
      const uid = Math.floor(Math.random() * 0x10000).toString(16)
      const newid = [this.streamName, 'sub', uid].join('-')
      const rtcConfig = {
        ...this.baseConfiguration,
        ...{
          streamName: this.streamName,
          subscriptionId: newid,
        },
      }

      // If we have generated our own UI for the subscriber, assign the unique mediaElementId to config.
      if (!this.parentIsElement) {
        rtcConfig.mediaElementId = this.subscriptionId
      } else {
        rtcConfig.mediaElementId = this.parent.id
      }

      this.subscriber = preferWhipWhep ? new WHEPClient() : new RTCSubscriber()
      this.subscriber.on('*', this.onSubscriberEvent)

      this.displayInfo(`Requesting ${this.streamName}...`)
      try {
        let availableUrlLocal = getAvailableUrl()
        const availableLocal = await getIsAvailable(
          availableUrlLocal,
          this.streamName,
          false
        )
        if (!availableLocal) {
          console.log(
            'Stream not available locally, searching on Stream Manager'
          )
          let availableUrlSM = getAvailableUrl(this.streamManagerHost)
          const availableSM = await getIsAvailable(
            availableUrlSM,
            this.streamName,
            true
          )
          if (!availableSM) {
            throw new Error(`${this.streamName} Not Available`)
          }
          this.requiresStreamManager = true
        }

        if (this.requiresStreamManager) {
          rtcConfig.protocol = 'wss'
          rtcConfig.port = '443'
          rtcConfig.host = this.streamManagerHost

          const subscriberSM = await window.streamManagerUtil.getEdge(
            rtcConfig.host,
            this.baseConfiguration.app,
            this.streamName
          )
          const { serverAddress, scope } = subscriberSM
          rtcConfig.app = preferWhipWhep
            ? this.baseConfiguration.app
            : 'streammanager'
          rtcConfig.connectionParams = config.connectionParams
          if (!preferWhipWhep) {
            rtcConfig.connectionParams = {
              ...config.connectionParams,
              host: serverAddress,
              app: scope,
            }
          } else {
            const { token } = rtcConfig.connectionParams
            delete rtcConfig.connectionParams.host
            delete rtcConfig.connectionParams.app
            if (token) {
              rtcConfig.connectionParams.token = encodeURIComponent(token)
            }
          }
        }

        await this.subscriber.init(rtcConfig)
        await this.subscriber.subscribe()
        if (this.forceMute) {
          console.log('force mute for stream', this.streamName)
          this.forceMuteOnSubscriber()
        } else {
          console.log('force unmute for stream', this.streamName)
          this.forceUnmuteOnSubscriber()
        }
      } catch (e) {
        console.error(e)
        this.reject()
        this.displayError(typeof e === 'string' ? e : e.message)
        this.retryConnection(
          config,
          this.streamManagerHost,
          this.preferWhipWhep
        )
      }
    }

    /**
     * Request to continue trying reconnect on loss of stream.
     *
     * @param {Object} config
     *        The configuration to use in initialization of subscriber.
     * @param {String} streamManagerHost
     *        Hostname of Stream Manager.
     * @param {Boolean} preferWhipWhep
     */
    async retryConnection(
      config,
      streamManagerHost = null,
      preferWhipWhep = false
    ) {
      try {
        clearTimeout(this.retryConnectTimeout)
        if (this.closing || this.closed || this.cancelled) return

        if (this.subscriber) {
          await this.subscriber.unsubscribe()
          this.subscriber = undefined
        }
        this.retryConnectTimeout = setTimeout(() => {
          this.displayInfo(`Retrying Connection for ${this.streamName}...`)
          clearTimeout(this.retryConnectTimeout)
          this.start(config, streamManagerHost, preferWhipWhep)
        }, this.retryDelay)
      } catch (e) {
        console.error(e)
        this.displayError(typeof e === 'string' ? e : e.message)
        this.retryConnection(config, streamManagerHost, preferWhipWhep)
      }
    }

    /**
     * Returns the top-level DOM element of the subscriber.
     */
    getElementContainer() {
      return this.card
    }

    /**
     * Returns the stream name subscribing to.
     */
    getStreamName() {
      if (this.roomName && this.roomName.length > 0) {
        return `${this.roomName}/${this.streamName}`
      }

      return this.streamName
    }

    /**
     * Request to force mute of audio playback.
     */
    forceMuteOnSubscriber() {
      this.forceMute = true
      if (this.subscriber) {
        this.subscriber.mute()
        this.mergeAudioStreams()
      }
    }

    /**
     * Request to force unmute of audio playback.
     */
    forceUnmuteOnSubscriber() {
      this.forceMute = false
      if (this.subscriber) {
        this.subscriber.unmute()
        this.mergeAudioStreams()
      }
    }
  }

  window.SubscriberBlock = SubscriberBlock
  window.streamsUtil = {
    ...window.streamsUtil,
    ...{
      subscribers: {
        stop: cancelSubscriberBlock,
        find: findByStreamName,
        findByElementId: findByElementId,
      },
    },
  }
})(window, document, window.red5prosdk, window.getIsStreamAvailable)
