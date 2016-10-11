/* global red5prosdk */
import React from 'react'
// import red5prosdk from 'red5pro-sdk'
import { PropTypes } from 'react'

const defaultConfiguration = {
  protocol: 'ws',
  port: 8081,
  app: 'live',
  bandwidth: {
    audio: 50,
    video: 256,
    data: 30 * 1000 * 1000
  }
}

class Red5ProSubscriber extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      view: undefined,
      subscriber: undefined
    }
  }

  onSubscribeFail (message) {
    console.error(message)
  }

  onSubscribeSuccess () {
  }

  onUnsubscribeFail (message) {
    console.error(message)
  }

  onUnsubscribeSuccess () {
  }

  notifySubscriberEstablished (subscriber, view) {
    if (this.props.onSubscriberEstablished) {
      this.props.onSubscriberEstablished(subscriber, view)
    }
  }

  subscribe () {
    const comp = this
    const view = new red5prosdk.PlaybackView('red5pro-subscriber-video')
    const subscriber = new red5prosdk.RTCSubscriber()

    const origAttachStream = view.attachStream.bind(view)
    view.attachStream = (stream, autoplay) => {
      origAttachStream(stream, autoplay)
      view.attachStream = origAttachStream
    }

    view.attachSubscriber(subscriber)

    const config = Object.assign(defaultConfiguration, this.props.configuration)
    config.port = config.rtcport || config.port
    config.streamName = this.props.streamName || this.config.streamName
    config.subscriptionId = 'subscriber-' + Math.floor(Math.random() * 0x10000).toString(16)

    subscriber.init(config)
      .then(player => {
        comp.setState(state => {
          state.view = view
          state.subscriber = subscriber
        })
        return player.play()
      })
      .then(() => {
        comp.onSubscribeSuccess()
        comp.notifySubscriberEstablished(subscriber, view)
      })
      .catch(error => {
        const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
        comp.onSubscribeFail(`[Red5ProSubscriber] :: Error - ${jsonError}`)
    })

  }

  unsubscribe () {
    const comp = this;
    const view = comp.state.view;
    const subscriber = comp.state.subscriber;
    if (subscriber) {
      subscriber.stop()
        .then(() => {
          view.view.src = ''
          subscriber.setView(undefined)
          comp.setState(state => {
            state.view = undefined
            state.subscriber = undefined
          })
          comp.onUnsubscribeSuccess()
        })
        .catch(error => {
          const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
          comp.onUnsubscribeFail(`[Red5ProSubscriber] :: Unmount Error = ${jsonError}`)
        })
    }  }

  componentDidMount () {
    this.subscribe()
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render () {
    const children = this.props.audioOnly
      ? (
        <audio ref={c => this._red5ProSubscriber = c}
          id="red5pro-subscriber-video"
          controls={this.props.showControls}
          autoplay={this.props.autoPlay}>
        </audio>
      )
      : (
        <video ref={c => this._red5ProSubscriber = c}
          id="red5pro-subscriber-video"
          controls={this.props.showControls}
          autoplay={this.props.autoPlay}>
        </video>
      )
    return (
      <div ref={c => this._videoContainer = c}
        id="red5pro-subscriber-video-container">
        {children}
      </div>
    )
  }

}

Red5ProSubscriber.propTypes = {
  autoPlay: PropTypes.boolean,
  showControls: PropTypes.boolean,
  audioOnly: PropTypes.boolean,
  streamName: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onSubscriberEstablished: PropTypes.func
}

Red5ProSubscriber.defaultProps = {
  autoPlay: true,
  showControls: true,
  audioOnly: false,
  streamName: undefined,
  consfiguration: defaultConfiguration
}

export default Red5ProSubscriber

