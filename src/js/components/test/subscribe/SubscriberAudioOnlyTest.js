import React from 'react'
import { PropTypes } from 'react'
import Red5ProSubscriber from '../../Red5ProSubscriber' // eslint-disable-line no-unused-vars
import BackLink from '../../BackLink' // eslint-disable-line no-unused-vars

class SubscriberAudioOnlyTest extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      status: 'On Hold.'
    }
  }

  subscriberEstablished (subscriber, view) {
    console.log(`subscriber: ${subscriber}, ${view}`)
  }

  render () {
    const videoStyle = {
      'width': '100%',
      'max-width': '640px'
    }
    return (
      <div>
        <BackLink onClick={this.props.onBackClick} />
        <h1 className="centered">Subscriber Audio Only Test</h1>
        <hr />
        <h2 className="centered"><em>stream</em>: {this.props.settings.stream1}</h2>
        <p className="centered subscriber-status-field">STATUS: {this.state.status}</p>
        <Red5ProSubscriber className="centered" style={videoStyle}
          configuration={this.props.settings}
          streamName={this.props.settings.stream1}
          autoPlay={true}
          audioOnly={true}
          showControls={true}
          onSubscriberEstablished={this.subscriberEstablished.bind(this)}
        />
      </div>
    )
  }

}

SubscriberAudioOnlyTest.propTypes = {
  settings: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default SubscriberAudioOnlyTest

