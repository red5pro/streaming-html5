/* global red5prosdk */
import React from 'react'
// import red5prosdk from 'red5pro-sdk'
import { PropTypes } from 'react'
import BackLink from '../BackLink' // eslint-disable-line no-unused-vars

class PublisherStreamManagerTest extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      view: undefined,
      publisher: undefined,
      status: 'On hold.'
    }
  }

  requestOrigin () {
    const host = this.props.settings.host
    const context = this.props.settings.context
    const streamName = this.props.settings.stream1
    const url = `http://${host}:5080/streammanager/api/1.0/event/${context}/${streamName}?action=broadcast`
    this.setState(state => {
      state.status = `Requesting Origin from ${url}...`
    })
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => {
          if (res.headers.get("content-type") &&
            res.headers.get("content-type").toLowerCase().indexOf("application/json") >= 0) {
              return res.json()
          }
          else {
            throw new TypeError('Could not properly parse response.')
          }
        })
        .then(json => {
          resolve(json.serverAddress)
        })
        .catch(error => {
          const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
          console.error(`[PublisherStreamManagerTest] :: Error - Could not request Origin IP from Stream Manager. ${jsonError}`)
          reject(error)
        })
    })
  }

  preview () {
    const comp = this
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
        console.error(`[PublisherStreamManagerTest] :: Error - ${error}`)
        reject(error)
      })
    })
  }

  publish (serverHost) {
    const comp = this
    const iceServers = this.props.settings.iceServers
    const publisher = this.state.publisher
    const view = this.state.view
    view.attachPublisher(publisher);

    comp.setState(state => {
      state.status = `Establishing connection on ${serverHost}...`
    })

    // Initialize
    publisher.init({
      protocol: 'ws',
      host: serverHost,
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
      comp.setState(state => {
        state.status = 'Publishing started. You\'re Live!'
      })
    })
    .catch(error => {
      // A fault occurred while trying to initialize and publish the stream.
      const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      comp.setState(state => {
        state.status = `ERROR: ${jsonError}`
      })
      console.error(`[PublisherStreamManagerTest] :: Error - ${jsonError}`)
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
    const comp = this
    const pub = this.publish.bind(this)
    const getOrigin = this.requestOrigin.bind(this)
    this.preview()
      .then(getOrigin)
      .then(pub)
      .catch(() => {
        comp.setState(state => {
          state.status = 'Error - Could not start publishing session.'
        })
        console.error('[PublishTest] :: Error - Could not start publishing session.')
      })
  }

  componentWillUnmount () {
    this.unpublish()
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
        <p className="centered publish-status-field">STATUS: {this.state.status}</p>
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

PublisherStreamManagerTest.propTypes = {
  settings: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default PublisherStreamManagerTest

