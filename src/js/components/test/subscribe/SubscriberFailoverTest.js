/* global red5prosdk */
import React from 'react'
// import red5prosdk from 'red5pro-sdk'
import { PropTypes } from 'react'
import autoBind from 'react-class/autoBind'
import SubscriberStatus from '../SubscriberStatus' // eslint-disable-line no-unused-vars
import BackLink from '../../BackLink' // eslint-disable-line no-unused-vars

class SubscriberFailoverTest extends React.Component {

  constructor (props) {
    super(props)
    autoBind(this)
    this.state = {
      view: undefined,
      subscriber: undefined,
      statusEvent: undefined
    }
    this._subscriberEntry = undefined
  }

  subscribe () {
    const comp = this
    const view = new red5prosdk.PlaybackView('red5pro-subscriber')
    const subscriber = new red5prosdk.Red5ProSubscriber()
    const subscribeOrder = this.props.settings.subscriberFailoverOrder.split(',').map(item => {
        return item.trim()
    })

    this._subscriberEntry = subscriber
    this._subscriberEntry.on('*', this.handleSubscriberEvent)

    const origAttachStream = view.attachStream.bind(view)
    view.attachStream = (stream, autoplay) => {
      origAttachStream(stream, autoplay)
      view.attachStream = origAttachStream
    }

    const rtcConfig = Object.assign({}, this.props.settings, {
      protocol: 'ws',
      port: this.props.settings.rtcport,
      subscriptionId: 'subscriber-' + Math.floor(Math.random() * 0x10000).toString(16),
      streamName: this.props.settings.stream1,
      bandwidth: {
        audio: 50,
        video: 256,
        data: 30 * 1000 * 1000
      }
    })
    const rtmpConfig = Object.assign({}, this.props.settings, {
      protocol: 'rtmp',
      port: this.props.settings.rtmpport,
      streamName: this.props.settings.stream1,
      mimeType: 'rtmp/flv',
      useVideoJS: false,
      swf: 'lib/red5pro/red5pro-subscriber.swf'
    })
    const hlsConfig = Object.assign({}, this.props.settings, {
      protocol: 'http',
      port: this.props.settings.hlsport,
      streamName: this.props.settings.stream1,
      mimeType: 'application/x-mpegURL',
      swf: 'lib/red5pro/red5pro-video-js.swf'
    })

    view.attachSubscriber(subscriber)

    subscriber
      .setPlaybackOrder(subscribeOrder)
      .init({
        rtc: rtcConfig,
        rtmp: rtmpConfig,
        hls: hlsConfig
      })
      .then(player => {
        comp.setState(state => {
          state.view = view
          state.subscriber = player
          return state
        })
        return player.play()
      })
      .then(() => {
      })
      .catch(error => {
        const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
        console.error(`[SubscriberFailoverTest] :: Error - ${jsonError}`)
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
            return state
          })
        })
        .catch(error => {
          const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
          console.error(`[SubscriberFailoverTest] :: Unmount Error = ${jsonError}`)
        })
    }
  }

  componentDidMount () {
    this.subscribe()
  }

  componentWillUnmount() {
    this.unsubscribe()
    if (this._subscriberEntry) {
      this._subscriberEntry.off('*', this.handleSubscriberEvent)
      this._subscriberEntry = undefined
    }
  }

  handleSubscriberEvent (event) {
    this.setState(state => {
      state.statusEvent = event
      return state
    })
  }

  render () {
    return (
      <div>
        <BackLink onClick={this.props.onBackClick} />
        <h1 className="centered">Subscriber Failover Test</h1>
        <hr />
        <h2 className="centered"><em>stream</em>: {this.props.settings.stream1}</h2>
        <SubscriberStatus event={this.state.statusEvent} />
        <div className="centered" ref={c => this._videoContainer = c}
          id="video-container"
          className="centered">
          <video className="video-js vjs-default-skin" ref={c => this._red5ProSubscriber = c}
            id="red5pro-subscriber"
            className="video-element"
            controls autoplay></video>
        </div>
      </div>
    )
  }

}

SubscriberFailoverTest.propTypes = {
  settings: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default SubscriberFailoverTest

