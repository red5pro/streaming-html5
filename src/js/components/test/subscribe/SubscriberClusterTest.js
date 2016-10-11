/* global red5prosdk */
import React from 'react'
// import red5prosdk from 'red5pro-sdk'
import { PropTypes } from 'react'
import BackLink from '../../BackLink' // eslint-disable-line no-unused-vars

class SubscriberClusterTest extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      view: undefined,
      subscriber: undefined,
      status: 'On Hold.'
    }
  }

  requestEdge () {
    const host = this.props.settings.host
    const url = `http://${host}:5080/cluster`
    this.setState(state => {
      state.status = `Requesting Edge from ${url}...`
    })
    return new Promise((resolve, reject) => {
      fetch(url)
      .then(res => {
        if (res.headers.get("content-type") &&
            res.headers.get("content-type").toLowerCase().indexOf("text/plain") >= 0) {
          res.text().then(value => {
            resolve(value.substring(0, value.indexOf(':')))
          })
        }
        else {
          reject(res)
        }
      })
      .catch(error => {
        const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
        console.error(`[SubscriberClusterTest] :: Error - Could not requst Edge IP. ${jsonError}`)
        reject(error)
      })
    })
  }

  subscribe (serverAddress) {
    const comp = this
    const view = new red5prosdk.PlaybackView('red5pro-subscriber')
    const subscriber = new red5prosdk.RTCSubscriber()
    const iceServers = [{urls: 'stun:stun2.l.google.com:19302'}]

    const origAttachStream = view.attachStream.bind(view)
    view.attachStream = (stream, autoplay) => {
      comp.setState(state => {
        state.status = `Subscribed on ${serverAddress}. They're Live!`
      })
      origAttachStream(stream, autoplay)
      view.attachStream = origAttachStream
    }

    comp.setState(state => {
      state.status = `Establishing connection to ${serverAddress}...`
    })
    view.attachSubscriber(subscriber)
    subscriber.init({
      protocol: 'ws',
      host: serverAddress,
      port: this.props.settings.rtcport,
      app: this.props.settings.app,
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
      comp.setState(state => {
        state.status = 'Negotating connection...'
      })
      return player.play()
    })
    .then(() => {
      comp.setState(state => {
        state.status = `Requesting stream for playback on ${serverAddress}...`
      })
    })
    .catch(error => {
      const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      console.error(`[SubscriberClusterTest] :: Error - ${jsonError}`)
    })

  }

  componentDidMount () {
    const comp = this
    const sub = this.subscribe.bind(this)
    this.requestEdge()
      .then(sub)
      .catch(error => {
        comp.setState(state => {
          state.status = 'Could not start a subscription session.'
        })
        const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
        console.error(`[SubscriberClusterTest] :: Error - ${jsonError}`)
      })
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
          console.error(`[SubscriberClusterTest] :: Unmount Error = ${jsonError}`)
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
        <h1 className="centered">Subscriber Cluster Test</h1>
        <hr />
        <h2 className="centered"><em>stream</em>: {this.props.settings.stream1}</h2>
        <p className="centered subscriber-status-field">STATUS: {this.state.status}</p>
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

SubscriberClusterTest.propTypes = {
  settings: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default SubscriberClusterTest

