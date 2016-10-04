/* global red5prosdk */
import React from 'react'
// import red5prosdk from 'red5pro-sdk'
import { PropTypes } from 'react'
import BackLink from '../BackLink' // eslint-disable-line no-unused-vars

class SubscriberTest extends React.Component {

  getInitialState () {
    return {
      view: undefined,
      subscriber: undefined
    }
  }

  subscribe () {
    const comp = this
    const view = new red5prosdk.PlaybackView('red5pro-subscriber')
    const subscriber = new red5prosdk.RTCSubscriber()
    const statusField = this._statusField
    const iceServers = [{urls: 'stun:stun2.l.google.com:19302'}]

    const origAttachStream = view.attachStream.bind(view)
    view.attachStream = (stream, autoplay) => {
      statusField.innerText = 'STATUS: Subscribed. They\'re Live!'
      origAttachStream(stream, autoplay)
      view.attachStream = origAttachStream
    }

    statusField.innerText = 'STATUS: Establshing connection...'
    view.attachSubscriber(subscriber)
    subscriber.init({
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
    })
    .then(player => {
      comp.setState(state => {
        state.view = view
        state.subscriber = subscriber
      })
      statusField.innerText = 'STATUS: Negotating connection...'
      return player.play()
    })
    .then(() => {
      statusField.innerText = 'STATUS: Requesting stream for playback...'
    })
    .catch(error => {
      const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
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
      'max-width': '640px'
    }
    return (
      <div>
        <BackLink onClick={this.props.onBackClick} />
        <h1 className="centered">Subscriber Test</h1>
        <hr />
        <h2 className="centered"><em>stream</em>: {this.props.settings.stream1}</h2>
        <p className="centered subscriber-status-field" ref={c => this._statusField = c}>STATUS: On Hold.</p>
        <div ref={c => this._videoContainer = c}
          id="video-container"
          className="centered">
          <video ref={c => this._red5ProSubscriber = c}
            id="red5pro-subscriber"
            style={videoStyle}
            controls autoplay></video>
        </div>
      </div>
    )
  }

}

SubscriberTest.propTypes = {
  settings: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default SubscriberTest

