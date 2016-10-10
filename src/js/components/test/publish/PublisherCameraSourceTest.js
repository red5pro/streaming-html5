import React from 'react'
import { PropTypes } from 'react'
import Red5ProPublisher from '../../Red5ProPublisher' // eslint-disable-line no-unused-vars
import BackLink from '../../BackLink' // eslint-disable-line no-unused-vars

const SELECT_DEFAULT = 'Select a camera...'

class PublisherCameraSourceTest extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      cameras: [{
        label: SELECT_DEFAULT
      }],
      selectedCamera: undefined,
      publishAllowed: false,
      status: 'On hold.'
    }
  }

  waitForSelect () {
    const comp = this
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        let videoCameras = devices.filter(item => {
          return item.kind === 'videoinput'
        })
        const cameras = [{
          label: SELECT_DEFAULT
        }].concat(videoCameras)
        comp.setState(state => {
          state.cameras = cameras
          return state
        })
      })
  }

  preview (mediaDeviceId) {
    this.setState(state => {
      state.selectedCamera = mediaDeviceId
      state.publishAllowed = true
      return state
    })
  }

  onCameraSelect () {
    const cameraSelected = this._cameraSelect.value
    if (this.state.selectedCamera !== cameraSelected &&
      (cameraSelected && cameraSelected !== SELECT_DEFAULT)) {
      this.preview(cameraSelected)
    }
  }

  componentDidMount () {
    this.waitForSelect()
  }

  publisherEstablished (publisher, view) {
    console.log(`publisher: ${publisher}, ${view}`)
  }

  render () {
    const videoStyle = {
      'width': '100%',
      'max-width': '640px'
    }
    const labelStyle = {
      'margin-right': '0.5rem'
    }
    const cameraSelectField = {
      'background-color': '#ffffff',
      'padding': '0.8rem'
    }
    const canPublish = this.state.publishAllowed
    const userMedia = {
      video: {
        optional: [{
          sourceId: this.state.selectedCamera
        }]
      }
    }
    return (
      <div>
        <BackLink onClick={this.props.onBackClick} />
        <h1 className="centered">Publisher Camera Source Test</h1>
        <hr />
        <h2 className="centered"><em>stream</em>: {this.props.settings.stream1}</h2>
        <div className="instructions-block">
          <p>To begin this test, first select a camera from the following selections:</p>
          <p style={cameraSelectField}>
            <label for="camera-select" style={labelStyle}>Camera Source:</label>
            <select ref={c => this._cameraSelect = c}
              id="camera-select"
              onChange={this.onCameraSelect.bind(this)}>
              {this.state.cameras.map(camera =>
                (this.state.selectedCamera === camera.deviceId)
                  ? <option value={camera.deviceId} selected>{camera.label}</option>
                  : <option value={camera.deviceId}>{camera.label}</option>
              )}
            </select>
          </p>
        </div>
        <p className="centered publish-status-field">STATUS: {this.state.status}</p>
        <Red5ProPublisher
          className="centered"
          style={videoStyle}
          autoPublish={canPublish}
          showControls={true}
          userMedia={userMedia}
          configuration={this.props.settings}
          streamName={this.props.settings.stream1}
          onPublisherEstablished={this.publisherEstablished.bind(this)}
          ref={c => this._red5ProPublisher = c}
          />
      </div>
    )
  }

}

PublisherCameraSourceTest.propTypes = {
  settings: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default PublisherCameraSourceTest
