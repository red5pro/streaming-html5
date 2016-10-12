/* global red5prosdk */
import React from 'react'
// import red5prosdk from 'red5pro-sdk'
import { PropTypes } from 'react'
import isEqual from 'lodash/isEqual'

const defaultConfiguration = {
  protocol: 'ws',
  port: 8081,
  app: 'live',
  streamType: 'webrtc',
  audioOn: true,
  videoOn: true
}

class Red5ProPublisher extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      view: undefined,
      publisher: undefined,
      instanceId: Math.floor(Math.random() * 0x10000).toString(16)
    }
  }

  onPublishFail (message) {
    console.error(`[Red5ProPublisher] :: ${message}`)
  }

  onPublishSuccess () {
  }

  onUnpublishFail (message) {
    console.error(`[Red5ProPublisher] :: ${message}`)
  }

  onUnpublishSuccess () {
  }

  getUserMediaConfiguration () {
    const defaultMedia = {
      audio: !this.props.configuration.audio || defaultConfiguration.audioOn,
      video: !this.props.configuration.video || defaultConfiguration.videoOn
    }
    const definedMedia = this.props.userMedia || {}
    return Object.assign(defaultMedia, definedMedia)
  }

  notifyPublisherEstablished (publisher, view) {
    if (this.props.onPublisherEstablished) {
      this.props.onPublisherEstablished(publisher, view)
    }
  }

  preview () {
    const comp = this
    const gUM = this.getUserMediaConfiguration.bind(this)
    return new Promise((resolve, reject) => {
      const elementId = ['red5pro-publisher-video', this.state.instanceId].join('-')
      const publisher = new red5prosdk.RTCPublisher()
      const view = new red5prosdk.PublisherView(elementId)
      const gmd = navigator.mediaDevice || navigator

      if (this.props.onPublisherEvent) {
        publisher.on('*', this.props.onPublisherEvent)
      }
      else {
        publisher.on('*', event => {
          console.log(`[Red5ProPublisher] :: PublisherEvent - ${event.type}`)
        })
      }

      console.log('[Red5ProPublisher] gUM:: ' + JSON.stringify(gUM(), null, 2))

      gmd.getUserMedia(gUM(), media => {

        // Upon access of user media,
        // 1. Attach the stream to the publisher.
        // 2. Show the stream as preview in view instance.
        publisher.attachStream(media)
        view.preview(media, true)

        comp.setState(state => {
          state.publisher = publisher
          state.view = view
          return state
        })
        resolve(publisher, view)

      }, error => {

        comp.onPublishFail(`Error - ${error}`)
        reject(error)

      })
    })
  }

  publish () {
    const comp = this
    const publisher = this.state.publisher
    const view = this.state.view
    view.attachPublisher(publisher);

    const config = Object.assign({}, defaultConfiguration, this.props.configuration)
    config.port = config.rtcport || config.port
    config.host = this.props.host || config.host
    config.streamName = this.props.streamName || config.streamName

    console.log('[Red5ProPublisher] config:: ' + JSON.stringify(config, null, 2))

    // Initialize
    publisher.init(config)
      .then((pub) => {
        // Invoke the publish action
        comp.notifyPublisherEstablished(pub, view)
        return publisher.publish()
      })
      .then(() => {
        comp.onPublishSuccess()
      })
      .catch(error => {
        // A fault occurred while trying to initialize and publish the stream.
        const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
        comp.onPublishFail(`Error - ${jsonError}`)
      })

  }

  unpublish () {
    const comp = this
    return new Promise((resolve, reject) => {
      const view = comp.state.view
      const publisher = comp.state.publisher
      if (publisher) {
        publisher.unpublish()
          .then(() => {

            view.view.src = ''
            publisher.setView(undefined)
            comp.setState(state => {
              state.publisher = undefined
              state.view = undefined
              return state
            })
            comp.onUnpublishSuccess()
            comp.notifyPublisherEstablished(undefined, undefined)
            resolve()

          })
          .catch(error => {

            const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
            comp.onUnpublishFailed(`Unmount Error = ${jsonError}`)
            reject(error)

          })
      }
      else {

        comp.onUnpublishSuccess()
        resolve()

      }
    })
  }

  tryPublish (auto) {
    const comp = this
    const pub = this.publish.bind(this)
    if (auto) {
      this.preview()
        .then(pub).catch(() => {
          comp.onPublishFail('Error - Could not start publishing session.')
        })
    }
  }

  componentDidMount () {
    this.tryPublish(this.props.autoPublish)
  }

  componentWillUnmount () {
    this.unpublish()
  }

  componentDidUpdate (prevProps) {
    const p = this.props
    const pUM = p.userMedia
    const prevUM = prevProps.userMedia
    if (!isEqual(prevUM, pUM)) {
      const pub = this.tryPublish.bind(this)
      const auto = this.props.autoPublish
      this.unpublish()
        .then(() => {
          pub(auto)
        })
    }
  }

  getPublisherElement () {
    return this._red5ProPublisher
  }

  render () {
    const elementId = ['red5pro-publisher-video', this.state.instanceId].join('-')
    let classNames = ['red5pro-publisher-video-container']
    if (this.props.className) {
      classNames = classNames.concat(this.props.className)
    }
    let mediaClassNames = []
    if (this.props.mediaClassName) {
      mediaClassNames = mediaClassNames.concat(this.props.mediaClassName)
    }
    return (
      <div ref={c => this._videoContainer = c}
        style={this.props.style}
        className={classNames.join(' ')}>
        <video ref={c => this._red5ProPublisher = c}
          id={elementId}
          controls={this.props.showControls}
          className={mediaClassNames.join(' ')}>
        </video>
      </div>
    )
  }

}

Red5ProPublisher.propTypes = {
  autoPublish: PropTypes.boolean,
  showControls: PropTypes.boolean,
  host: PropTypes.string,
  userMedia: PropTypes.object,
  streamName: PropTypes.string.isRequired,
  configuration: PropTypes.object.isRequired,
  onPublisherEstablished: PropTypes.func,
  onPublisherEvent: PropTypes.func
}

Red5ProPublisher.defaultProps = {
  autoPublish: true,
  showControls: true,
  host: undefined,
  userMedia: undefined,
  streamName: undefined,
  configuration: defaultConfiguration
}

export default Red5ProPublisher

