import React from 'react'
import { PropTypes } from 'react'
import Red5ProPublisher from '../../Red5ProPublisher' // eslint-disable-line no-unused-vars
import BackLink from '../../BackLink' // eslint-disable-line no-unused-vars

class PublisherAudioOnlyTest extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
     status: 'On hold.'
    }
  }

  publisherEstablished (publisher, publisherView) {
    console.log(`publisher: ${publisher}, ${publisherView}`)
  }

  render () {
    const videoStyle = {
      'width': '100%',
      'max-width': '640px',
      'height': '40px'
    }
    return (
      <div>
        <BackLink onClick={this.props.onBackClick} />
        <h1 className="centered">Publisher Audio Only Test</h1>
        <hr />
        <h2 className="centered"><em>stream</em>: {this.props.settings.stream1}</h2>
        <p className="centered publish-status-field">STATUS: {this.state.status}</p>
        <Red5ProPublisher className="centered" style={videoStyle}
          configuration={this.props.settings}
          streamName={this.props.settings.stream1}
          showControls={true}
          onPublisherEstablished={this.publisherEstablished.bind(this)}
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

