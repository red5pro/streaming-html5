/* global red5prosdk */
import React from 'react'
// import red5prosdk from 'red5pro-sdk'
import { PropTypes } from 'react'
import BackLink from '../../BackLink' // eslint-disable-line no-unused-vars

class SubscriberFailoverTest extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      view: undefined,
      subscriber: undefined,
      status: 'On hold.'
    }
  }

  subscribe () {
    const comp = this
    const view = new red5prosdk.PlaybackView('red5pro-subscriber')
    const subscriber = new red5prosdk.Red5ProSubscriber()
    const iceServers = [{urls: 'stun:stun2.l.google.com:19302'}]
    const subscribeOrder = this.props.settings.subscriberFailoverOrder.split(',').map(item => {
        return item.trim()
      })

    const origAttachStream = view.attachStream.bind(view)
    view.attachStream = (stream, autoplay) => {
      const type = comp.state.subscriber.getType()
      comp.setState(state => {
        state.status = `${type} Subscribed. They're Live!`
      })
      origAttachStream(stream, autoplay)
      view.attachStream = origAttachStream
    }

    const rtcConfig = {
      protocol: 'ws',
      host: this.props.settings.host,
      port: this.props.settings.rtcport,
      app: this.props.settings.context,
      subscriptionId: 'subscriber-' + Math.floor(Math.random() * 0x10000).toString(16),
      streamName: this.props.settings.stream1,
      iceServers: iceServers,
      bandwidth: {
        audio: 50,
        video: 256,
        data: 30 * 1000 * 1000
      }
    }
    const rtmpConfig = {
      protocol: 'rtmp',
      host: this.props.settings.host,
      port: this.props.settings.rtmpport,
      app: this.props.settings.context,
      streamName: this.props.settings.stream1,
      mimeType: 'rtmp/flv',
      useVideoJS: false,
      swf: 'lib/red5pro/red5pro-subscriber.swf'
    }
    const hlsConfig = {
      protocol: 'http',
      host: this.props.settings.host,
      port: this.props.settings.hlsport,
      app: this.props.settings.context,
      streamName: this.props.settings.stream1,
      mimeType: 'application/x-mpegURL',
      swf: 'lib/red5pro/red5pro-video-js.swf'
    }

    comp.setState(state => {
      state.status = 'Establishing connection...'
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
        })
        const type = player.getType()
        comp.setState(state => {
          state.status = `Negotating ${type} connection...`
        })
        return player.play()
      })
      .then(() => {
        const type = comp.state.subscriber.getType()
        comp.setState(state => {
          state.status = `Requesting ${type} stream for playback...`
        })
      })
      .catch(error => {
        const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
        comp.setState(state => {
          state.status = `Error: ${jsonError}`
        })
        console.error(`[SubscriberTest] :: Error - ${jsonError}`)
      })

  }

  componentDidMount () {
    this.subscribe()
  }

  componentWillUnmount() {
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
        })
        .catch(error => {
          const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
          console.error(`[SubscriberTest] :: Unmount Error = ${jsonError}`)
        })
    }
  }

  render () {
    const videoStyle = {
      'width': '100%',
      'max-width': '640px',
      'height': '300px'
    }
    return (
      <div>
        <BackLink onClick={this.props.onBackClick} />
        <h1 className="centered">Subscriber Failover Test</h1>
        <hr />
        <h2 className="centered"><em>stream</em>: {this.props.settings.stream1}</h2>
        <p className="centered subscriber-status-field">STATUS: {this.state.status}</p>
        <div className="centered" ref={c => this._videoContainer = c}
          id="video-container"
          className="centered">
          <video className="video-js vjs-default-skin" ref={c => this._red5ProSubscriber = c}
            id="red5pro-subscriber"
            style={videoStyle}
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

