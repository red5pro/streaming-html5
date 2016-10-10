/* global red5prosdk */
import React from 'react'
// import red5prosdk from 'red5pro-sdk'
import { PropTypes } from 'react'

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
      publisher: undefined
    }
  }

  onPublishFail (message) {
    console.error(message)
  }

  onPublishSuccess () {
  }

  onUnpublishFail (message) {
    console.error(message)
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
      const publisher = new red5prosdk.RTCPublisher()
      const view = new red5prosdk.PublisherView('red5pro-publisher-video')
      const gmd = navigator.mediaDevice || navigator
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

        comp.onPublishFail(`[PublisherTest] :: Error - ${error}`)
        reject(error)

      })
    })
  }

  publish () {
    const comp = this
    const publisher = this.state.publisher
    const view = this.state.view
    view.attachPublisher(publisher);

    const config = Object.assign(defaultConfiguration, this.props.configuration)
    config.port = config.rtcport || config.port
    config.streamName = this.props.streamName || this.config.streamName

    // Initialize
    publisher.init(config)
      .then((pub, view) => {
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
        comp.onPublishFail(`[PublisherTest] :: Error - ${jsonError}`)
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
            comp.onUnpublishFailed(`[PublishTest] :: Unmount Error = ${jsonError}`)
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
      this.preview().then(pub).catch(() => {
        comp.onPublishFail('[PublishTest] :: Error - Could not start publishing session.')
      })
    }
  }

  componentDidMount () {
    this.tryPublish(this.props.autoPublish)
  }

  componentWillUnmount () {
    this.unpublish()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.autoPublish && !this.props.autoPublish) {
      this.tryPublish(nextProps.autoPublish)
    }
    else if (nextProps.userMedia !== this.props.userMedia) {
      const pub = this.tryPublish.bind(this)
      const auto = this.props.autoPublish
      this.unpublish()
        .then(() => {
          pub(auto)
        })
    }
  }

  render () {
    return (
      <div ref={c => this._videoContainer = c}
        id="red5pro-publisher-video-container">
        <video ref={c => this._red5ProPublisher = c}
          id="red5pro-publisher-video"
          controls={this.props.showControls}>
        </video>
      </div>
    )
  }

}

Red5ProPublisher.propTypes = {
  autoPublish: PropTypes.boolean,
  showControls: PropTypes.boolean,
  userMedia: PropTypes.object,
  streamName: PropTypes.string.isRequired,
  configuration: PropTypes.object.isRequired,
  onPublisherEstablished: PropTypes.func
}

Red5ProPublisher.defaultProps = {
  autoPublish: true,
  showControls: true,
  userMedia: undefined,
  streamName: undefined,
  configuration: defaultConfiguration
}

export default Red5ProPublisher

