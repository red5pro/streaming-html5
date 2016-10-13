/* global red5prosdk */
import React from 'react'
// import red5prosdk from 'red5pro-sdk'
import { PropTypes } from 'react'

class PublisherStatus extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      status: 'On hold.'
    }
  }

  updateStatusFromEvent (event) {
    console.log(`[PublisherStatus] event: ${event.type}`)
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
        status = 'Negotiation complete. Waiting Publish Start...'
        break
    }
    this.setState(state => {
      state.status = status
      return state
    })
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.event !== nextProps.event && nextProps.event) {
      this.updateStatusFromEvent(nextProps.event)
    }
  }

  render () {
    return (
      <p className="centered status-field">STATUS: {this.state.status}</p>
    )
  }

}

PublisherStatus.propTypes = {
  event: PropTypes.object
}

export default PublisherStatus

