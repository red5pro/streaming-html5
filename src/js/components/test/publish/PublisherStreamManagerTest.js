import React from 'react'
import { PropTypes } from 'react'
import Red5ProPublisher from '../../Red5ProPublisher' // eslint-disable-line no-unused-vars
import BackLink from '../../BackLink' // eslint-disable-line no-unused-vars

class PublisherStreamManagerTest extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      targetHost: undefined,
      status: 'On hold.'
    }
  }

  requestOrigin () {
    const host = this.props.settings.host
    const app = this.props.settings.app
    const streamName = this.props.settings.stream1
    const url = `http://${host}:5080/streammanager/api/1.0/event/${app}/${streamName}?action=broadcast`
    this.setState(state => {
      state.status = `Requesting Origin from ${url}...`
      return state
    })
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => {
          if (res.headers.get("content-type") &&
            res.headers.get("content-type").toLowerCase().indexOf("application/json") >= 0) {
              return res.json()
          }
          else {
            throw new TypeError('Could not properly parse response.')
          }
        })
        .then(json => {
          resolve(json.serverAddress)
        })
        .catch(error => {
          const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
          console.error(`[PublisherStreamManagerTest] :: Error - Could not request Origin IP from Stream Manager. ${jsonError}`)
          reject(error)
        })
    })
  }

  componentDidMount () {
    const comp = this
    this.requestOrigin()
      .then(host => {
        comp.setState(state => {
          state.targetHost = host
          return state
        })
      })
      .catch(error => {
        comp.setState(state => {
          state.status = 'Could not start a broadcast session.'
          return state
        })
        const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
        console.error(`[PublisherStreamManagerTest] :: Error - ${jsonError}`)
      })
  }

  publisherEstablished (publisher, view) {
    console.log(`[PublisherStreamManagerTest] publisher: ${publisher}, ${view}`)
  }

  render () {
    const canPublish = this.state.targetHost !== undefined
    return (
      <div>
        <BackLink onClick={this.props.onBackClick} />
        <h1 className="centered">Publisher StreamManager Test</h1>
        <hr />
        <h2 className="centered"><em>stream</em>: {this.props.settings.stream1}</h2>
        <p className="centered publish-status-field">STATUS: {this.state.status}</p>
        <Red5ProPublisher
          className="centered"
          mediaClassName="video-element"
          configuration={this.props.settings}
          streamName={this.props.settings.stream1}
          host={this.state.targetHost}
          showControls={true}
          autoPublish={canPublish}
          onPublisherEstablished={this.publisherEstablished.bind(this)}
          />
      </div>
    )
  }

}

PublisherStreamManagerTest.propTypes = {
  settings: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default PublisherStreamManagerTest

