/* global red5prosdk */
import React from 'react'
// import red5prosdk from 'red5pro-sdk'
import { PropTypes } from 'react'
import BackLink from '../BackLink' // eslint-disable-line no-unused-vars

class PublisherCameraSourceTest extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      view: undefined,
      publisher: undefined,
      cameras: []
    }
  }

  preview () {
    const comp = this
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        const cameras = devices.filter(item => {
          return item.kind === 'videoinput'
        })
        comp.setState(state => {
          state.cameras = cameras
        })
      })
    return new Promise((resolve, reject) => {
      const publisher = new red5prosdk.RTCPublisher()
      const view = new red5prosdk.PublisherView('red5pro-publisher')
      navigator.getUserMedia({
        audio: !comp.props.settings.audioOn ? false : true,
        video: !comp.props.settings.videoOn ? false : true
      }, media => {

        // Upon access of user media,
        // 1. Attach the stream to the publisher.
        // 2. Show the stream as preview in view instance.
        publisher.attachStream(media)
        view.preview(media, true)

        comp.setState(state => {
          state.publisher = publisher
          state.view = view
          return state
        })

        resolve()

      }, error => {
        console.error(`[PublisherCameraSourceTest] :: Error - ${error}`)
        reject(error)
      })
    })
  }

  publish () {
    const iceServers = [{urls: 'stun:stun2.l.google.com:19302'}]
    const publisher = this.state.publisher
    const view = this.state.view
    const statusField = this._statusField
    view.attachPublisher(publisher);

    statusField.innerText = 'STATUS: Establishing connection...'
    // Initialize
    publisher.init({
      protocol: 'ws',
      host: this.props.settings.host,
      port: this.props.settings.rtcport,
      app: this.props.settings.context,
      streamName: this.props.settings.stream1,
      streamType: 'webrtc',
      iceServers: iceServers
    })
    .then(() => {
      // Invoke the publish action
      statusField.innerText = 'STATUS: Starting publish session...'
      return publisher.publish()
    })
    .then(() => {
      statusField.innerText = 'STATUS: Publishing started. You\'re Live!'
    })
    .catch(error => {
      // A fault occurred while trying to initialize and publish the stream.
      const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      statusField.innerText = `ERROR: ${jsonError}`
      console.error(`[PublisherCameraSourceTest] :: Error - ${jsonError}`)
    })

  }

  componentDidMount () {
    const pub = this.publish.bind(this)
    this.preview()
      .then(pub)
      .catch(() => {
        console.error('[PublishTest] :: Error - Could not start publishing session.')
      })
  }

  componentWillUnmount () {
    const comp = this
    const view = comp.state.view
    const publisher = comp.state.publisher
    if (publisher) {
      publisher.unpublish()
      .then(() => {
          view.view.src = ''
          publisher.setView(undefined)
          comp.setState(state => {
            state.publisher = undefined
            state.view = undefined
            return state
          })
        })
        .catch(error => {
          const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
          console.error(`[PublishTest] :: Unmount Error = ${jsonError}`)
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
        <h1 className="centered">Publisher Test</h1>
        <hr />
        <h2 className="centered"><em>stream</em>: {this.props.settings.stream1}</h2>
        <div>
          <p>
            <label for="camera-select">Camera Source</label>
            <select ref={c => this._cameraSelect = c}
              id="camera-select">
              {this.state.cameras.map(camera =>
                <option value={camera.label}>{camera.label}</option>
              )}
            </select>
          </p>
        </div>
        <p className="centered publish-status-field" ref={c => this._statusField = c}>STATUS: On Hold.</p>
        <div ref={c => this._videoContainer = c}
          id="video-container"
          className="centered">
          <video ref={c => this._red5ProPublisher = c}
            id="red5pro-publisher"
            style={videoStyle}
            controls autoplay disabled></video>
        </div>
      </div>
    )
  }

}

PublisherCameraSourceTest.propTypes = {
  settings: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default PublisherCameraSourceTest
