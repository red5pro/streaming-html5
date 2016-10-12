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
      subscriber: undefined,
      instanceId: Math.floor(Math.random() * 0x10000).toString(16)
    }
  }

  onSubscribeFail (message) {
    console.error(`[Red5ProSubscriber] :: ${message}`)
  }

  onSubscribeSuccess () {
  }

  onUnsubscribeFail (message) {
    console.error(`[Red5ProSubscriber] :: ${message}`)
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
    const view = new red5prosdk.PlaybackView(['red5pro-subscriber-video', this.state.instanceId].join('-'))
    const subscriber = new red5prosdk.RTCSubscriber()
    const origAttachStream = view.attachStream.bind(view)
    view.attachStream = (stream, autoplay) => {
      origAttachStream(stream, autoplay)
      view.attachStream = origAttachStream
    }
    view.attachSubscriber(subscriber)

    if (this.props.onSubscriberEvent) {
      subscriber.on('*', this.props.onSubscriberEvent)
    }
    else {
      subscriber.on('*', event => {
        console.log(`[Red5ProSubscriber] :: SubscriberEvent - ${event.type}`)
      })
    }

    const config = Object.assign({}, defaultConfiguration, this.props.configuration)
    config.port = config.rtcport || config.port
    config.host = this.props.host || config.host
    config.streamName = this.props.streamName || config.streamName
    config.subscriptionId = 'subscriber-' + this.state.instanceId

    console.log('[Red5ProSubscriber] config:: ' + JSON.stringify(config, null, 2))

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
        comp.onSubscribeFail(`Error - ${jsonError}`)
    })

  }

  unsubscribe () {
    const comp = this
    return new Promise((resolve, reject) => {
      const view = comp.state.view
      const subscriber = comp.state.subscriber
      if (subscriber) {
        subscriber.stop()
          .then(() => {
            view.view.src = ''
            subscriber.setView(undefined)
            subscriber.off('*', comp.props.onSubscriberEvent)
            comp.setState(state => {
              state.view = undefined
              state.subscriber = undefined
            })
            comp.onUnsubscribeSuccess()
            resolve()
          })
          .catch(error => {
            const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
            comp.onUnsubscribeFail(`Unmount Error = ${jsonError}`)
            reject(`Could not unsubscribe: ${error}`)
          })
      }
      else {
        resolve()
      }
    })
  }

  trySubscribe (auto) {
    if (auto) {
      this.subscribe()
    }
  }

  componentDidMount () {
    this.trySubscribe(this.props.autoSubscribe)
  }

  componentWillUnmount() {
    const subscriber = this.state.subscriber
    this.unsubscribe()
    if (subscriber && this.props.onSubscriberEvent) {
      subscriber.off('*', this.props.onSubscriberEvent)
    }
  }

  componentDidUpdate (prevProps) {
    const comp = this
    if (prevProps.autoSubscribe !== this.props.autoSubscribe) {
      const sub = this.trySubscribe.bind(this)
      const auto = this.props.autoSubscribe
      this.unsubscribe()
        .then(() => {
          sub(auto)
        })
        .catch(error => {
          comp.onSubscribeFail(`Could not start a subscription session: ${error}`)
        })
    }
  }

  getPlaybackElement () {
    return this._red5ProSubscriber
  }

  render () {
    const elementId = ['red5pro-subscriber-video', this.state.instanceId].join('-')
    let classNames = ['red5pro-subscriber-video-container']
    if (this.props.className) {
      classNames = classNames.concat(this.props.className)
    }
    let mediaClassNames = ['red5pro-subscriber-video']
    if (this.props.mediaClassName) {
      mediaClassNames = mediaClassNames.concat(this.props.mediaClassName)
    }
    const children = this.props.audioOnly
      ? (
        <audio ref={c => this._red5ProSubscriber = c}
          id={elementId}
          className={mediaClassNames.join(' ')}
          controls={this.props.showControls}
          autoplay={this.props.autoPlay}>
        </audio>
      )
      : (
        <video ref={c => this._red5ProSubscriber = c}
          id={elementId}
          className={mediaClassNames.join(' ')}
          controls={this.props.showControls}
          autoplay={this.props.autoPlay}>
        </video>
      )
    return (
      <div ref={c => this._videoContainer = c}
        style={this.props.style}
        className={classNames.join(' ')}>
        {children}
      </div>
    )
  }

}

Red5ProSubscriber.propTypes = {
  autoSubscribe: PropTypes.boolean,
  autoPlay: PropTypes.boolean,
  showControls: PropTypes.boolean,
  audioOnly: PropTypes.boolean,
  host: PropTypes.string,
  streamName: PropTypes.string.isRequired,
  configuration: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onSubscriberEstablished: PropTypes.func,
  onSubscriberEvent: PropTypes.func
}

Red5ProSubscriber.defaultProps = {
  autoSubscribe: true,
  autoPlay: true,
  showControls: true,
  audioOnly: false,
  host: undefined,
  streamName: undefined,
  configuration: defaultConfiguration
}

export default Red5ProSubscriber

