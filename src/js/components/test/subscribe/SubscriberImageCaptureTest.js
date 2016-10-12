import React from 'react'
import { PropTypes } from 'react'
import Red5ProSubscriber from '../../Red5ProSubscriber' // eslint-disable-line no-unused-vars
import SubscriberStatus from '../SubscriberStatus' // eslint-disable-line no-unused-vars
import BackLink from '../../BackLink' // eslint-disable-line no-unused-vars

class SubscriberImageCaptureTest extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      captureFilled: false,
      statusEvent: undefined
    }
  }

  onVideoImageCapture () {
    const videoElement = this._red5ProSubscriber.getPlaybackElement()
    this.clearCanvas(videoElement)
    this.drawOnCanvas(videoElement)
  }

  clearCanvas (targetElement) {
    const canvas = this._captureCanvas
    const context = canvas.getContext('2d')
    context.fillStyle = "#aaaaaa"
    context.fillRect(0, 0, targetElement.offsetWidth, targetElement.offsetHeight)
    this.setState(state => {
      state.captureFilled = false
      return state
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
      return state
    })
  }

  handleSubscriberEvent (event) {
    this.setState(state => {
      state.statusEvent = event
      return state
    })
  }

  subscriberEstablished (subscriber, view) {
    console.log(`[SubscriberImageCaptureTest] subscriber: ${subscriber}, ${view}`)
  }

  componentDidMount () {
    this.clearCanvas(this._red5ProSubscriber.getPlaybackElement())
  }

  render () {
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
        <SubscriberStatus event={this.state.statusEvent} />
        <div onClick={this.onVideoImageCapture.bind(this)}>
          <Red5ProSubscriber
            className="centered"
            mediaClassName="video-element"
            configuration={this.props.settings}
            streamName={this.props.settings.stream1}
            host={this.state.targetHost}
            autoPlay={true}
            showControls={true}
            onSubscriberEstablished={this.subscriberEstablished.bind(this)}
            onSubscriberEvent={this.handleSubscriberEvent.bind(this)}
            ref={c => this._red5ProSubscriber = c}
          />
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

