import React from 'react'
import { PropTypes } from 'react'
import Red5ProPublisher from '../../Red5ProPublisher' // eslint-disable-line no-unused-vars
import PublisherStatus from '../PublisherStatus' // eslint-disable-line no-unused-vars
import BackLink from '../../BackLink' // eslint-disable-line no-unused-vars

class PublisherTest extends React.Component {

  _watchStatsInterval

  constructor (props) {
    super(props)
    this.state = {
      statusEvent: undefined
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
    this.setState(state => {
      state.statusEvent = event
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
        <PublisherStatus event={this.state.statusEvent} />
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

