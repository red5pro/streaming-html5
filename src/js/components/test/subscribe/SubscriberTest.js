import React from 'react'
import { PropTypes } from 'react'
import Red5ProSubscriber from '../../Red5ProSubscriber' // eslint-disable-line no-unused-vars
import SubscriberStatus from '../SubscriberStatus' // eslint-disable-line no-unused-vars
import BackLink from '../../BackLink' // eslint-disable-line no-unused-vars

class SubscriberTest extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      statusEvent: undefined
    }
  }

  handleSubscriberEvent (event) {
    this.setState(state => {
      state.statusEvent = event
      return state
    })
  }

  subscriberEstablished (subscriber, view) {
    console.log(`[SubscriberTest] subscriber: ${subscriber}, ${view}`)
  }

  render () {
    return (
      <div>
        <BackLink onClick={this.props.onBackClick} />
        <h1 className="centered">Subscriber Test</h1>
        <hr />
        <h2 className="centered"><em>stream</em>: {this.props.settings.stream1}</h2>
        <SubscriberStatus event={this.state.statusEvent} />
        <Red5ProSubscriber
          className="centered"
          mediaClassName="video-element"
          configuration={this.props.settings}
          streamName={this.props.settings.stream1}
          autoPlay={true}
          showControls={true}
          onSubscriberEstablished={this.subscriberEstablished.bind(this)}
          onSubscriberEvent={this.handleSubscriberEvent.bind(this)}
        />
      </div>
    )
  }

}

SubscriberTest.propTypes = {
  settings: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default SubscriberTest

