/* global red5prosdk */
import React from 'react'
// import red5prosdk from 'red5pro-sdk'
import { PropTypes } from 'react'
import BackLink from '../BackLink' // eslint-disable-line no-unused-vars

class PublisherTest extends React.Component {

  getInitialState () {
    return {
      view: undefined,
      publisher: undefined
    }
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
        console.error(`[PublisherTest] :: Error - ${error}`)
        reject(error)
      })
    })
  }

  publish () {
    const iceServers = [{urls: 'stun:stun2.l.google.com:19302'}]
    const publisher = this.state.publisher
    const view = this.state.view
    view.attachPublisher(publisher);

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
      return publisher.publish()
    })
    .catch(error => {
      // A fault occurred while trying to initialize and publish the stream.
      const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      console.error(`[PublisherTest] :: Error - ${jsonError}`)
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
    const publisher = comp.state.publisher
    if (publisher) {
      publisher.unpublish()
      .then(() => {
          comp.state.view.view.src = ''
          comp.state.publisher.setView(undefined)
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
        <h2 className="centered"><em>stream</em>: {this.props.settings.stream1}</h2>
        <div ref={c => this._videoContainer = c}
          id="video-container"
          className="centered">
          <video ref={c => this._red5ProPublisher = c}
            id="red5pro-publisher"
            style={videoStyle}
            controls autoplay></video>
        </div>
      </div>
    )
  }

}

PublisherTest.propTypes = {
  settings: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default PublisherTest
