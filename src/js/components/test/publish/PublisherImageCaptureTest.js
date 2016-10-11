import React from 'react'
import { PropTypes } from 'react'
import Red5ProPublisher from '../../Red5ProPublisher' // eslint-disable-line no-unused-vars
import BackLink from '../../BackLink' // eslint-disable-line no-unused-vars

class PublisherImageCaptureTest extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      status: 'On hold.',
      captureFilled: false
    }
  }

  onVideoImageCapture () {
    const videoElement = this._red5ProPublisher.getPublisherElement()
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

  publisherEstablished (publisher, view) {
    console.log(`[PublisherImageCaptureTest] publisher: ${publisher}, ${view}`)
  }

  componentDidMount () {
    this.clearCanvas(this._red5ProPublisher.getPublisherElement())
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
        <h1 className="centered">Publisher Image Capture Test</h1>
        <hr />
        <h2 className="centered"><em>stream</em>: {this.props.settings.stream1}</h2>
        <p className="centered publish-status-field">STATUS: {this.state.status}</p>
        <div onClick={this.onVideoImageCapture.bind(this)}>
          <Red5ProPublisher
            className="centered"
            mediaClassName="video-element"
            showControls={true}
            configuration={this.props.settings}
            streamName={this.props.settings.stream1}
            onPublisherEstablished={this.publisherEstablished.bind(this)}
            ref={c => this._red5ProPublisher = c}
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

PublisherImageCaptureTest.propTypes = {
  settings: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default PublisherImageCaptureTest

