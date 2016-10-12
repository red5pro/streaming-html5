import React from 'react'
import { PropTypes } from 'react'
import Red5ProSubscriber from '../../Red5ProSubscriber' // eslint-disable-line no-unused-vars
import BackLink from '../../BackLink' // eslint-disable-line no-unused-vars

class SubscriberStreamManagerTest extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      targetHost: undefined,
      status: 'On Hold.'
    }
  }

  requestEdge () {
    const host = this.props.settings.host
    const app = this.props.settings.app
    const streamName = this.props.settings.stream1
    const url = `http://${host}:5080/streammanager/api/1.0/event/${app}/${streamName}?action=subscribe`
    this.setState(state => {
      state.status = `Requesting Edge from ${url}...`
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
          console.error(`[SubscriberStreamManagerTest] :: Error - Could not request Edge IP from Stream Manager. ${jsonError}`)
          reject(error)
        })
    })
  }

  componentDidMount () {
    const comp = this
    this.requestEdge()
      .then(host => {
        comp.setState(state => {
          state.targetHost = host
          return state
        })
      })
      .catch(() => {
        comp.setState(state => {
          state.status = 'Error - Could not start subscribing session.'
          return state
        })
        console.error('[SubscriberStreamManagerTest] :: Error - Could not start subscribing session.')
      })
  }

  subscriberEstablished (subscriber, view) {
    console.log(`[SubscriberStreamManagerTest] subscriber: ${subscriber}, ${view}`)
  }

  render () {
    const canSubscribe = this.state.targetHost != undefined
    return (
      <div>
        <BackLink onClick={this.props.onBackClick} />
        <h1 className="centered">Subscriber StreamManager Test</h1>
        <hr />
        <h2 className="centered"><em>stream</em>: {this.props.settings.stream1}</h2>
        <p className="centered subscriber-status-field">STATUS: {this.state.status}</p>
        <Red5ProSubscriber
          className="centered"
          mediaClassName="video-element"
          configuration={this.props.settings}
          streamName={this.props.settings.stream1}
          host={this.state.targetHost}
          autoSubscribe={canSubscribe}
          autoPlay={true}
          showControls={true}
          onSubscriberEstablished={this.subscriberEstablished.bind(this)}
          ref={c => this._red5ProSubscriber = c}
        />
      </div>
    )
  }

}

SubscriberStreamManagerTest.propTypes = {
  settings: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default SubscriberStreamManagerTest

