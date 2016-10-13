/* global red5prosdk */
import React from 'react'
// import red5prosdk from 'red5pro-sdk'
import { PropTypes } from 'react'

class SubscriberStatus extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      status: 'On hold.'
    }
  }

  updateStatusFromEvent (event) {
    console.log(`[SubscriberStatus] event: ${event.type}`)
    const subTypes = red5prosdk.SubscriberEventTypes
    const rtcTypes = red5prosdk.RTCSubscriberEventTypes
    let answer
    let candidate
    let status = this.state.status
    switch (event.type) {
      case subTypes.CONNECT_SUCCESS:
        status = 'Connection established...'
        break
      case subTypes.CONNECT_FAILURE:
        status = 'Error - Could not establish connection.'
        break
      case subTypes.SUBSCRIBE_START:
        status = 'Started subscribing session.'
        break
      case subTypes.SUBSCRIBE_FAIL:
        status = 'Error - Could not start a subscribing session.'
        break
      case subTypes.SUBSCRIBE_INVALID_NAME:
        status = 'Error - Stream name not in use.'
        break
      case rtcTypes.OFFER_START:
        status = 'Begin offer...'
        break
      case rtcTypes.OFFER_END:
        status = 'Offer accepted...'
        break
      case rtcTypes.ANSWER_START:
        status = 'Sending answer...'
        answer = JSON.stringify(event.data, null, 2)
        console.log(`[SubscriberStatus] ${event.type}: ${answer}`)
        break
      case rtcTypes.ANSWER_END:
        status = 'Answer received...'
        break
      case rtcTypes.CANDIDATE_START:
        status = 'Sending candidate...'
        candidate = JSON.stringify(event.data, null, 2)
        console.log(`[SubscriberStatus] ${event.type}: ${candidate}`)
        break
      case rtcTypes.CANDIDATE_END:
        status = 'Candidate received...'
        break
      case rtcTypes.ICE_TRICKLE_COMPLETE:
        status = 'Negotiation complete. Waiting Subscription Start...'
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

SubscriberStatus.propTypes = {
  event: PropTypes.object
}

export default SubscriberStatus

