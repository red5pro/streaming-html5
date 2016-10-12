/* global red5prosdk */
import React from 'react'
// import red5prosdk from 'red5pro-sdk'
import { PropTypes } from 'react'
import Red5ProPublisher from '../../Red5ProPublisher' // eslint-disable-line no-unused-vars
import PublisherStatus from '../PublisherStatus' // eslint-disable-line no-unused-vars
import BackLink from '../../BackLink' // eslint-disable-line no-unused-vars

const USER_MEDIA_SETTING = {
  audio: true,
  video: false
}

class PublisherAudioOnlyTest extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      statusEvent: undefined
    }
  }

  handlePublisherEvent (event) {
    // update state with event
    this.setState(state => {
      state.statusEvent = event
      return state
    })
    // shutdown playback
    const videoElement = this._red5ProPublisher.getPublisherElement()
    const pubTypes = red5prosdk.PublisherEventTypes
    switch (event.type) {
      case pubTypes.CONNECT_FAILURE:
      case pubTypes.PUBLISH_FAIL:
        videoElement.pause()
        videoElement.src = ''
        break
    }
  }

  publisherEstablished (publisher, publisherView) {
    console.log(`[PublisherAudioOnlyTest] publisher: ${publisher}, ${publisherView}`)
  }

  render () {
    return (
      <div>
        <BackLink onClick={this.props.onBackClick} />
        <h1 className="centered">Publisher Audio Only Test</h1>
        <hr />
        <h2 className="centered"><em>stream</em>: {this.props.settings.stream1}</h2>
        <PublisherStatus event={this.state.statusEvent} />
        <Red5ProPublisher
          ref={c => this._red5ProPublisher = c}
          className="centered"
          mediaClassName="video-element audio-only-element"
          configuration={this.props.settings}
          userMedia={USER_MEDIA_SETTING}
          streamName={this.props.settings.stream1}
          showControls={true}
          onPublisherEstablished={this.publisherEstablished.bind(this)}
          onPublisherEvent={this.handlePublisherEvent.bind(this)}
          />
      </div>
    )
  }

}

PublisherAudioOnlyTest.propTypes = {
  settings: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default PublisherAudioOnlyTest

