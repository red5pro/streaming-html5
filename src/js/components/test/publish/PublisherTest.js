import React from 'react'
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

  componentDidMount () {
  }

  componentWillUnmount () {
  }

  publisherEstablished (publisher, publisherView) {
    console.log(`publisher: ${publisher}, ${publisherView}`)
    //    this.watchStats(publisher.getConnection())
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

PublisherTest.propTypes = {
  settings: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default PublisherTest

