/* global red5prosdk */
import React from 'react'
// import red5prosdk from 'red5pro-sdk'
import { PropTypes } from 'react'
import BackLink from '../BackLink' // eslint-disable-line no-unused-vars

class PublisherFailoverTest extends React.Component {

  getInitialState () {
    return {
      view: undefined,
      publisher: undefined
    }
  }

  preview () {
    const comp = this
    const statusField = comp._statusField

    return new Promise((resolve, reject) => {

      const publisher = new red5prosdk.Red5ProPublisher()
      const view = new red5prosdk.PublisherView('red5pro-publisher')
      view.attachPublisher(publisher);

      const iceServers = [{urls: 'stun:stun2.l.google.com:19302'}]
      const rtcConfig = {
        protocol: 'ws',
        host: this.props.settings.host,
        port: this.props.settings.rtcport,
        app: this.props.settings.context,
        streamName: this.props.settings.stream1,
        streamType: 'webrtc',
        iceServers: iceServers
      }
      const rtmpConfig = {
        protocol: 'rtmp',
        host: this.props.settings.host,
        port: this.props.settings.rtmpport,
        app: this.props.settings.context,
        streamName: this.props.settings.stream1,
        swf: 'lib/red5pro/red5pro-publisher.swf'
      }
      const publishOrder = this.props.settings.publisherFailoverOrder.split(',').map(item => {
        return item.trim()
      })

      publisher.setPublishOrder(publishOrder)
      .init({
        rtc: rtcConfig,
        rtmp: rtmpConfig
      })
      .then((selectedPublisher) => {

        // Invoke the publish action
        const type = selectedPublisher.getType()
        statusField.innerText = `STATUS: Starting publish session with ${type}...`

        if (type.toLowerCase() === publisher.publishTypes.RTC) {
          navigator.getUserMedia({
            audio: !comp.props.settings.audioOn ? false : true,
            video: !comp.props.settings.videoOn ? false : true
          }, media => {

            // Upon access of user media,
            // 1. Attach the stream to the publisher.
            // 2. Show the stream as preview in view instance.
            selectedPublisher.attachStream(media)
            view.preview(media, true)

            comp.setState(state => {
              state.publisher = selectedPublisher
              state.view = view
              return state
            })
            resolve()
          }, error => {
            console.error(`[PublisherTest] :: Error - ${error}`)
            reject(error)
          })
        }
        else {
          comp.setState(state => {
            state.publisher = selectedPublisher
            state.view = view
            return state
          })
          selectedPublisher ? resolve() : reject('Could not find publisher.')
        }
        // End if/clause for publisher type.
      })
      // End Promise declaration.
    })
  }

  publish () {
    const publisher = this.state.publisher
    const statusField = this._statusField

    const type = publisher.getType()
    statusField.innerText = `STATUS: Establishing connection with ${type} publisher...`
    // Initialize
    publisher.publish()
    .then(() => {
      statusField.innerText = `STATUS: ${type} publishing started. You're Live!`
    })
    .catch(error => {
      // A fault occurred while trying to initialize and publish the stream.
      const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      statusField.innerText = `ERROR: ${jsonError}`
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

PublisherFailoverTest.propTypes = {
  settings: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default PublisherFailoverTest
