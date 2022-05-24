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
 * The SubscriberBlock is a self-contained manager for a subscriber.
 * The streamUtils.subscriber is an entry point to the subscriber map maintained in this script.
 */
((window, document, red5prosdk) => {

    const RETRY_DELAY = 3000

    // Hold a Set mapping stream name to SubscriberBlock.
    let subscriberMap = {}

    /**
     * Finds and returns SubscriberBlock associated with stream name.
     *
     * @param {String} name
     */
    const findByStreamName = name => {
        console.log(subscriberMap)
        if (subscriberMap.hasOwnProperty(name)) {
            return subscriberMap[name]
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
        console.log('cancel subscriber ' + name)
        // If wildcarded, remove all.
        if (name === '*') {
            Object.keys(subscriberMap).forEach(key => {
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

    // Generic container HTML element for the subscriber block.
    const subscriberTemplate = `<div class="subscriber-container flex-parent">
        <div class="red5pro-media-container video-holder centered">
          <video autoplay controls playsinline class="red5pro-subscriber"></video>
        </div>
        <div class="subscriber-notifications"></div>
        <div class="centered">
          <p class="subscriber-name-field"></span></p>
        </div>
      </div>`

    // Generates the template.
    const templateContent = (templateHTML, streamName) => {
        var div = document.createElement('div')
        div.classList.add('subscriber-block')
        div.classList.add('flex-parent')
        div.innerHTML = templateHTML
        div.id = getSubscriberElementId(streamName) + '-container'
        return div
    }

    // Utility to generate a subscriber element id based on streamName.
    const getSubscriberElementId = (streamName) => {
        return ['red5pro', 'subscriber', streamName].join('-')
    }

    /**
     * Generates the encapsulating DOM element for the subscriber.
     */
    const generateNewSubscriberDOM = (streamName, subId, parent) => {
        const card = templateContent(subscriberTemplate, streamName)
        parent.appendChild(card)
        const videoId = getSubscriberElementId(streamName)
        const videoElement = card.querySelector('.red5pro-subscriber')
        const subscriberNameField = card.querySelector('.subscriber-name-field')
        subscriberNameField.innerText = streamName
        videoElement.id = videoId
        card.id = [videoId, 'container'].join('-')
        return card
    }

    /**
     * The SubscriberBlock is a self-managed subscriber that consumes and plays back a target stream.
     */
    class SubscriberBlock {

        constructor(streamName, parent) {
            this.subscriptionId = [streamName, 'sub'].join('-')
            this.streamName = streamName
            this.room = undefined
            this.subscriber = undefined
            this.baseConfiguration = undefined
            this.requiresStreamManager = false
            this.retryConnectTimeout = 0
            this._forceMute = false
            this.next = undefined
            this.parent = parent
            this.currentStreamMode = 'Video/Audio'
            this.card = generateNewSubscriberDOM(this.streamName, this.subscriptionId, this.parent)
            this.subscriberNameField = this.card.querySelector('.subscriber-name-field')
            this.notificationContainer = this.card.querySelector('.subscriber-notifications')
            this.onSubscriberEvent = this.respond.bind(this)
            this.cancelled = false
            subscriberMap[this.streamName] = this
        }

        displayInfo(message) {
            this.subscriberNameField.classList.remove('hidden')
            this.subscriberNameField.classList.remove('error-field')
            this.subscriberNameField.innerText = message
        }

        displayError(message) {
            this.subscriberNameField.classList.remove('hidden')
            this.subscriberNameField.classList.add('error-field')
            this.subscriberNameField.innerText = message
        }

        showAudioMuteNotification(flag, streamName) {
            let notification = this.notificationContainer.querySelector('.audio-notification')
            if (flag && !notification) {
                notification = document.createElement('p')
                notification.classList.add('audio-notification')
                notification.innerText = `${streamName} has turned off audio.`
                this.notificationContainer.appendChild(notification)
            } else if (!flag && notification) {
                this.notificationContainer.removeChild(notification)
            }
        }

        showVideoMuteNotification(flag, streamName) {
            let notification = this.notificationContainer.querySelector('.video-notification')
            if (flag && !notification) {
                notification = document.createElement('p')
                notification.classList.add('video-notification')
                notification.innerText = `${streamName} has turned off video.`
                this.notificationContainer.appendChild(notification)
            } else if (!flag && notification) {
                this.notificationContainer.removeChild(notification)
            }
        }

        /**
         * Invoked when subscriber session is determined sufficient enough to pass on setup to 
         * another SubscriberBlock in a linked list.
         */
        resolve() {
            if (this.next) {
                this.next.execute(this.baseConfiguration, this.requiresStreamManager)
                this.next = undefined
            }
        }

        /**
         * Invoked when subscriber session has failed but to pass on setup to another
         * SubscriberBlock in a linked list.
         */
        reject(event) {
            console.error(event)
            if (this.next) {
                this.next.execute(this.baseConfiguration, this.requiresStreamManager)
                this.next = undefined
            }
        }

        /**
         * Event listener for the Subscriber.
         */
        respond(event) {
            if (event.type === 'Subscribe.Time.Update') return
            //const id = this.subscriber ? this.subscriber.subscriptionId : 'UNKNOWN'
            let displayName = `${this.streamName}`
            if (this.room && this.room != '') {
                displayName = `${this.room}/${displayName}`
            }
            console.log(`[subscriber:${displayName}] + ${event.type}`)
            if (event.type !== 'Subscribe.Stop') {
                this.displayInfo(`${displayName} - ${event.type}`)
            }
            if (event.type === 'Connect.Failure' ||
                event.type === 'Subscribe.Fail' ||
                event.type === 'Subscribe.InvalidName') {
                this.reject(event)
                this.displayError(`${displayName} - ${event.type}`)
            } else if (event.type === 'Subscribe.Start') {
                this.resolve()
            } else if (event.type === 'Subscribe.Play.Unpublish' ||
                event.type === 'Subscribe.Connection.Closed') {
                this.remove()
            } else if (event.type === 'Subscribe.Metadata') {
                const {
                    streamingMode
                } = event.data
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
                if (this.subscriber) {
                    this.subscriber.off('*', this.respond)
                    await this.subscriber.unsubscribe()
                    this.subscriber = undefined
                }
            } catch (e) {
                console.error(`Error unscribing from ${this.streamName}`)
                console.error(e)
            } finally {
                const el = document.getElementById(getSubscriberElementId(this.streamName) + '-container')
                el.parentNode.removeChild(el)
                delete subscriberMap[this.streamName]
                this.closing = false
            }
        }

        /**
         * Request to start a subscriber session.
         *
         * @param {Object} config
         *        The configuration object for initialization.
         * @param {Boolean} requiresStreamManager
         *        Flag to intergate with Stream Manager for subscription.
         */
        async execute(config, requiresStreamManager) {

            this.baseConfiguration = config
            this.requiresStreamManager = requiresStreamManager
            const uid = Math.floor(Math.random() * 0x10000).toString(16);
            const rtcConfig = {
                ...config, ...{
                    streamName: this.streamName,
                    subscriptionId: [this.subscriptionId, uid].join('-'),
                    mediaElementId: getSubscriberElementId(this.streamName)
                }
            }

            this.room = config.app.substring(config.app.indexOf('/') + 1)
            this.subscriber = new red5prosdk.RTCSubscriber()
            this.subscriber.on('*', this.onSubscriberEvent)

            this.displayInfo(`Requesting ${this.streamName}...`)
            try {
                if (requiresStreamManager) {
                    const subscriberSM = await window.streamManagerUtil.getEdge(config.host, config.app, this.streamName)
                    const {
                        serverAddress,
                        scope
                    } = subscriberSM
                    rtcConfig.app = 'streammanager'
                    rtcConfig.connectionParams = {
                        ...config.connectionParams, ...{
                            host: serverAddress,
                            app: scope
                        }
                    }
                }

                await this.subscriber.init(rtcConfig)
                await this.subscriber.subscribe()
                if (this._forceMute) {
                    this.subscriber.mute()
                }

            } catch (e) {
                console.error(e)
                this.displayError(typeof e === 'string' ? e : e.message)
                this.retryConnection(config, requiresStreamManager)
            }
        }

        /**
         * Request to continue trying reconnect on loss of stream.
         *
         * @param {Object} config
         *        The configuration to use in initialization of subscriber.
         * @param {Boolean} requiresStreamManager
         *        Flag to use Stream Manager integration.
         */
        async retryConnection(config, requiresStreamManager) {
            try {
                clearTimeout(this.retryConnectTimeout)
                if (this.cancelled) return
                if (this.subscriber) {
                    await this.subscriber.unsubscribe()
                    this.subscriber = undefined
                }
                this.retryConnectTimeout = setTimeout(() => {
                    this.displayInfo(`Retrying Connection for ${this.streamName}...`)
                    clearTimeout(this.retryConnectTimeout)
                    this.execute(config, requiresStreamManager)
                }, RETRY_DELAY)
            } catch (e) {
                console.error(e)
                this.displayError(typeof e === 'string' ? e : e.message)
                this.retryConnection(config, requiresStreamManager)
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
            return this.streamName
        }

        /**
         * Request to force mute of audio playback.
         */
        forceMute() {
            this._forceMute = true
            if (this.subscriber) {
                this.subscriber.mute()
            }
        }

    }

    window.SubscriberBlock = SubscriberBlock
    window.streamsUtil = {
        ...window.streamsUtil, ...{
            subscribers: {
                stop: cancelSubscriberBlock,
                find: findByStreamName
            }
        }
    }

})(window, document, window.red5prosdk)
