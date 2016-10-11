import React from 'react'
import { PropTypes } from 'react'
import Red5ProPublisher from '../../Red5ProPublisher' // eslint-disable-line no-unused-vars
import BackLink from '../../BackLink' // eslint-disable-line no-unused-vars

const USER_MEDIA_SETTING = {
  video: {
    width: 1920,
    height: 1080
  }
}

class Publisher1080pTest extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
     status: 'On hold.'
    }
  }

  publisherEstablished (publisher, publisherView) {
    console.log(`[Publisher1080pTest] publisher: ${publisher}, ${publisherView}`)
  }

  render ()  {
    return (
      <div>
        <BackLink onClick={this.props.onBackClick} />
        <h1 className="centered">Publisher 1080p Test</h1>
        <hr />
        <h2 className="centered"><em>stream</em>: {this.props.settings.stream1}</h2>
        <p className="centered publish-status-field">STATUS: {this.state.status}</p>
        <Red5ProPublisher
          className="centered"
          mediaClassName="video-element"
          configuration={this.props.settings}
          userMedia={USER_MEDIA_SETTING}
          streamName={this.props.settings.stream1}
          showControls={true}
          onPublisherEstablished={this.publisherEstablished.bind(this)}
          />
      </div>
    )
  }

}

Publisher1080pTest.propTypes = {
  settings: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default Publisher1080pTest

