/* global red5prosdk */
import React from 'react'
// import red5prosdk from 'red5pro-sdk'
import { PropTypes } from 'react'
import BackLink from '../../BackLink' // eslint-disable-line no-unused-vars

class SubscriberImageCaptureTest extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      view: undefined,
      subscriber: undefined,
      status: 'On Hold.',
      captureFilled: false
    }
  }

  subscribe () {
    const comp = this
    const view = new red5prosdk.PlaybackView('red5pro-subscriber')
    const subscriber = new red5prosdk.RTCSubscriber()
    const iceServers = [{urls: 'stun:stun2.l.google.com:19302'}]

    const origAttachStream = view.attachStream.bind(view)
    view.attachStream = (stream, autoplay) => {
      comp.setState(state => {
        state.status = 'Subscribed. They\'re Live!'
      })
      origAttachStream(stream, autoplay)
      view.attachStream = origAttachStream
    }

    comp.setState(state => {
      state.status = 'Establishing connection...'
    })
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
      comp.setState(state => {
        state.status = 'Negotating connection...'
      })
      return player.play()
    })
    .then(() => {
      comp.setState(state => {
        state.status = 'Requesting stream for playback...'
      })
    })
    .catch(error => {
      const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      console.error(`[SubscriberImageCaptureTest] :: Error - ${jsonError}`)
    })

  }

  componentDidMount () {
    this.clearCanvas()
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
          console.error(`[SubscriberImageCaptureTest] :: Unmount Error = ${jsonError}`)
        })
    }
  }

  onVideoImageCapture () {
    this.clearCanvas()
    this.drawOnCanvas(this._red5ProSubscriber)
  }

  clearCanvas () {
    const video = this._red5ProSubscriber
    const canvas = this._captureCanvas
    const context = canvas.getContext('2d')
    context.fillStyle = "#aaaaaa"
    context.fillRect(0, 0, video.offsetWidth, video.offsetHeight)
    this.setState(state => {
      state.captureFilled = false
    })
  }

  drawOnCanvas (targetElement) {
    const canvas = this._captureCanvas
    const context = canvas.getContext('2d')
    canvas.width = targetElement.offsetWidth
    canvas.height = targetElement.offsetHeight
    context.drawImage(targetElement, 0, 0, targetElement.offsetWidth, targetElement.offsetHeight)
    this.setState(state => {
      state.captureFilled = true
    })
  }

  render () {
    const videoStyle = {
      'width': '100%',
      'max-width': '640px'
    }
    const visible = this.state.captureFilled ? 'hidden' : 'visible'
    const captureTextStyle = {
      'visibility': visible,
      'position': 'absolute',
      'padding': '1rem',
      'color': '#333333',
      'width': '100%',
      'text-align': 'center'
    }
    return (
      <div>
        <BackLink onClick={this.props.onBackClick} />
        <h1 className="centered">Subscriber Image Capture Test</h1>
        <hr />
        <h2 className="centered"><em>stream</em>: {this.props.settings.stream1}</h2>
        <p className="centered subscriber-status-field">STATUS: {this.state.status}</p>
        <div ref={c => this._videoContainer = c}
          id="video-container"
          className="centered">
          <video ref={c => this._red5ProSubscriber = c}
            id="red5pro-subscriber"
            style={videoStyle}
            onClick={this.onVideoImageCapture.bind(this)}
            controls autoplay></video>
        </div>
        <div className="centered">
          <p style={captureTextStyle}><span>Click video to capture image.</span><br/><span>Your Image will appear here.</span></p>
          <canvas ref={c => this._captureCanvas = c}></canvas>
        </div>
      </div>
    )
  }

}

SubscriberImageCaptureTest.propTypes = {
  settings: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default SubscriberImageCaptureTest

