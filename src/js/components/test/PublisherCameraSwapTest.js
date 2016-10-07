/* global red5prosdk */
import React from 'react'
// import red5prosdk from 'red5pro-sdk'
import { PropTypes } from 'react'
import BackLink from '../BackLink' // eslint-disable-line no-unused-vars

const FACING_MODE_FRONT = 'user'
const FACING_MODE_REAR = 'environment'

class PublisherCameraSwapTest extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      view: undefined,
      publisher: undefined,
      facingModeFront: true,
      status: 'On hold.',
      supported: false
    }
  }

  preview () {
    const comp = this
    return new Promise((resolve, reject) => {
      const publisher = new red5prosdk.RTCPublisher()
      const view = new red5prosdk.PublisherView('red5pro-publisher')
      navigator.getUserMedia({
        audio: !comp.props.settings.audioOn ? false : true,
        video: {
          facingMode: comp.state.facingModeFront ? FACING_MODE_FRONT : FACING_MODE_REAR
        }
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
        console.error(`[PublisherCameraSwapTest] :: Error - ${error}`)
        reject(error)
      })
    })
  }

  publish () {
    const comp = this
    const iceServers = this.props.settings.iceServers
    const publisher = this.state.publisher
    const view = this.state.view
    view.attachPublisher(publisher);

    comp.setState(state => {
      state.status = 'Establishing connection...'
    })

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
      comp.setState(state => {
        state.status = 'Starting publish session...'
      })
      return publisher.publish()
    })
    .then(() => {
      const facingMode = comp.state.facingModeFront ? FACING_MODE_FRONT : FACING_MODE_REAR
      comp.setState(state => {
        state.status = `Publishing started. You\'re Live! FacingMode=${facingMode}`
      })
    })
    .catch(error => {
      // A fault occurred while trying to initialize and publish the stream.
      const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      comp.setState(state => {
        state.status = `ERROR: ${jsonError}`
      })
      console.error(`[PublisherCameraSwapTest] :: Error - ${jsonError}`)
    })

  }

  unpublish () {
    const comp = this
    return new Promise((resolve, reject) => {
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
              state.selectedCamera = undefined
              return state
            })
            resolve()
          })
          .catch(error => {
            const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
            console.error(`[PublishTest] :: Unmount Error = ${jsonError}`)
            reject(error)
          })
      }
      else {
        resolve()
      }
    })
  }

  componentDidMount () {
    this.setState(state => {
      state.supported = navigator.mediaDevices.getSupportedConstraints()["facingMode"]
    })

    const pub = this.publish.bind(this)
    this.preview()
      .then(pub)
      .catch(() => {
        console.error('[PublishTest] :: Error - Could not start publishing session.')
      })
  }

  componentWillUnmount () {
    this.unpublish()
  }

  onCameraSwapRequest () {
    const comp = this
    const pub = this.publish.bind(this)
    const prev = this.preview.bind(this)

    this.setState(state => {
      state.facingModeFront = !state.facingModeFront
    })

    this.unpublish()
      .then(prev)
      .then(pub)
      .catch(() => {
        comp.setState(state => {
          state.status = 'Error: Could not start publishing session swap camera.'
        })
        console.error('[PublishCameraTest] :: Error - Could not start publishing session on camera swap.')
      })
  }

  render () {
    const videoStyle = {
      'width': '100%',
      'max-width': '640px'
    }
    const hintClass = ['hint-block', this.state.supported ? '' : 'hint-alert'].join(' ')
    const supportedStr = this.state.supported ? 'supports' : 'does not support'
    return (
      <div>
        <BackLink onClick={this.props.onBackClick} />
        <h1 className="centered">Publisher Camera Swap Test</h1>
        <hr />
        <h2 className="centered"><em>stream</em>: {this.props.settings.stream1}</h2>
        <p className={hintClass}><em>The browser you are using </em><strong>{supportedStr}</strong><em> the </em><code>facingMode</code><em> video constraint require for this test.</em></p>
        <p className="centered publish-status-field">STATUS: {this.state.status}</p>
        <div ref={c => this._videoContainer = c}
          id="video-container"
          className="centered"
          onClick={this.onCameraSwapRequest.bind(this)}>
          <video ref={c => this._red5ProPublisher = c}
            id="red5pro-publisher"
            style={videoStyle}
            controls autoplay disabled></video>
        </div>
      </div>
    )
  }

}

PublisherCameraSwapTest.propTypes = {
  settings: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default PublisherCameraSwapTest
