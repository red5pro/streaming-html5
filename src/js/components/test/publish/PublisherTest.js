/* global red5prosdk */
import React from 'react'
// import red5prosdk from 'red5pro-sdk'
import { PropTypes } from 'react'
import Red5ProPublisher from '../../Red5ProPublisher' // eslint-disable-line no-unused-vars
import BackLink from '../../BackLink' // eslint-disable-line no-unused-vars

class PublisherTest extends React.Component {

  _watchStatsInterval

  constructor (props) {
    super(props)
    this.state = {
      status: 'On hold.'
    }
  }

  watchStats (connection) {
    this._watchStatsInterval = window.setInterval(() => {
        connection.getStats(null).then(res => {
          Object.keys(res).forEach(key => {
            console.log(JSON.stringify(res[key], null, 2))
          })
        })
      }, 1000)
  }

  unwatchStats () {
    window.clearInterval(this._watchStatsInterval)
  }

  componentWillUnmount () {
    this.unwatchStats()
  }

  handlePublisherEvent (event) {
    console.log(`[PublisherTest] event: ${event.type}`)
    const pubTypes = red5prosdk.PublisherEventTypes
    const rtcTypes = red5prosdk.RTCPublisherEventTypes
    let status = this.state.status
    switch (event.type) {
      case pubTypes.CONNECT_SUCCESS:
        status = 'Connection established...'
        break
      case pubTypes.CONNECT_FAILURE:
        status = 'Error - Could not establish connection.'
        break
      case pubTypes.PUBLISH_START:
        status = 'Started publishing session.'
        break
      case pubTypes.PUBLISH_FAIL:
        status = 'Error - Could not start a publishing session.'
        break
      case pubTypes.PUBLISH_INVALID_NAME:
        status = 'Error - Stream name already in use.'
        break
      case rtcTypes.MEDIA_STREAM_AVAILABLE:
        status = 'Stream available...'
        break
      case rtcTypes.PEER_CONNECTION_AVAILABLE:
        status = 'Peer Connection available...'
        break
      case rtcTypes.OFFER_START:
        status = 'Begin offer...'
        break
      case rtcTypes.OFFER_END:
        status = 'Offer accepted...'
        break
      case rtcTypes.ICE_TRICKLE_COMPLETE:
        status = 'Negotation complete. Waiting Publish Start...'
        break
    }
    this.setState(state => {
      state.status = status
      return state
    })
  }

  publisherEstablished (publisher, publisherView) {
    console.log(`[PublisherTest] publisher: ${publisher}, ${publisherView}`)
    //    this.watchStats(publisher.getConnection())
  }

  render () {
    return (
      <div>
        <BackLink onClick={this.props.onBackClick} />
        <h1 className="centered">Publisher Test</h1>
        <hr />
        <h2 className="centered"><em>stream</em>: {this.props.settings.stream1}</h2>
        <p className="centered publish-status-field">STATUS: {this.state.status}</p>
        <Red5ProPublisher
          className="centered"
          mediaClassName="video-element"
          configuration={this.props.settings}
          streamName={this.props.settings.stream1}
          showControls={true}
          onPublisherEstablished={this.publisherEstablished.bind(this)}
          onPublisherEvent={this.handlePublisherEvent.bind(this)}
          />
      </div>
    )
  }

}

PublisherTest.propTypes = {
  settings: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default PublisherTest

