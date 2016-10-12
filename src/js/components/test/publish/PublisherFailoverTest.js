/* global red5prosdk */
import React from 'react'
// import red5prosdk from 'red5pro-sdk'
import { PropTypes } from 'react'
import PublisherStatus from '../PublisherStatus' // eslint-disable-line no-unused-vars
import BackLink from '../../BackLink' // eslint-disable-line no-unused-vars

class PublisherFailoverTest extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      view: undefined,
      publisher: undefined,
      selectedPublisherType: undefined,
      statusEvent: undefined
    }
    this._publisherEntry = undefined
    this._boundPublisherEventHandler = this.handlePublisherEvent.bind(this)
  }

  preview () {
    const comp = this

    return new Promise((resolve, reject) => {

      const publisher = new red5prosdk.Red5ProPublisher()
      const view = new red5prosdk.PublisherView('red5pro-publisher')
      view.attachPublisher(publisher)

      // Establish event handling.
      this._publisherEntry = publisher
      this._publisherEntry.on('*', this._boundPublisherEventHandler)

      const rtcConfig = Object.assign({}, this.props.settings, {
        protocol: 'ws',
        port: this.props.settings.rtcport,
        streamName: this.props.settings.stream1,
        streamType: 'webrtc'
      })
      const rtmpConfig = Object.assign({}, this.props.settings, {
        protocol: 'rtmp',
        port: this.props.settings.rtmpport,
        streamName: this.props.settings.stream1,
        swf: 'lib/red5pro/red5pro-publisher.swf'
      })
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
          const type = selectedPublisher ? selectedPublisher.getType() : undefined
          if (type.toLowerCase() === publisher.publishTypes.RTC) {
            const gmd = navigator.mediaDevice || navigator
            gmd.getUserMedia({
              audio: !comp.props.settings.audio ? false : true,
              video: !comp.props.settings.video ? false : true
            }, media => {

              // Upon access of user media,
              // 1. Attach the stream to the publisher.
              // 2. Show the stream as preview in view instance.
              selectedPublisher.attachStream(media)
              view.preview(media, true)

              comp.setState(state => {
                state.publisher = selectedPublisher
                state.view = view
                state.selectedPublisherType = type
                return state
              })
              resolve()
            }, error => {
              console.error(`[PublisherFailoverTest] :: Error - ${error}`)
              reject(error)
            })
          }
          else {
            comp.setState(state => {
              state.publisher = selectedPublisher
              state.view = view
              state.selectedPublisherType = type
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
    // Initialize
    publisher.publish()
      .then(() => {
        console.log('[PublisherFailoverTest] :: Publishing.')
      })
      .catch(error => {
        // A fault occurred while trying to initialize and publish the stream.
        const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
        console.error(`[PublisherFailoverTest] :: Error - ${jsonError}`)
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
            console.error(`[PublishFailoverTest] :: Unmount Error = ${jsonError}`)
            reject(error)
          })
      }
      else {
        resolve()
      }
    })
  }

  componentDidMount () {
    const pub = this.publish.bind(this)
    this.preview()
      .then(pub)
      .catch(error => {
        console.error(`[PublishFailoverTest] :: Error - Could not start publishing session: ${error}`)
      })
  }

  componentWillUnmount () {
    this.unpublish()
    if (this._publisherEntry) {
      this._publisherEntry.off('*', this._boundPublisherEventHandler)
      this._publisherEntry = undefined
    }
  }

  handlePublisherEvent (event) {
    this.setState(state => {
      state.statusEvent = event
      return state
    })
  }

  render () {
    return (
      <div>
        <BackLink onClick={this.props.onBackClick} />
        <h1 className="centered">Publisher Failover Test</h1>
        <hr />
        <h2 className="centered"><em>stream</em>: {this.props.settings.stream1}</h2>
        <p className="centered failover-detected-field">Detected Supported Publisher: {this.state.selectedPublisherType}</p>
        <PublisherStatus event={this.state.statusEvent} />
        <div ref={c => this._videoContainer = c}
          id="video-container"
          className="centered">
          <video ref={c => this._red5ProPublisher = c}
            id="red5pro-publisher"
            className="video-element"
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

