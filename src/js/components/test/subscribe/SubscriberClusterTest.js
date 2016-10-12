import React from 'react'
import { PropTypes } from 'react'
import Red5ProSubscriber from '../../Red5ProSubscriber' // eslint-disable-line no-unused-vars
import SubscriberStatus from '../SubscriberStatus' // eslint-disable-line no-unused-vars
import BackLink from '../../BackLink' // eslint-disable-line no-unused-vars

class SubscriberClusterTest extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      targetHost: undefined,
      statusEvent: undefined
    }
  }

  requestEdge () {
    const host = this.props.settings.host
    const url = `http://${host}:5080/cluster`
    this.setState(state => {
      state.status = `Requesting Edge from ${url}...`
      return state
    })
    return new Promise((resolve, reject) => {
      fetch(url)
      .then(res => {
        if (res.headers.get("content-type") &&
            res.headers.get("content-type").toLowerCase().indexOf("text/plain") >= 0) {
          res.text().then(value => {
            resolve(value.substring(0, value.indexOf(':')))
          })
        }
        else {
          reject(res)
        }
      })
      .catch(error => {
        const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
        console.error(`[SubscriberClusterTest] :: Error - Could not requst Edge IP. ${jsonError}`)
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
      .catch(error => {
        comp.setState(state => {
          state.status = 'Could not start a subscription session.'
          return state
        })
        const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
        console.error(`[SubscriberClusterTest] :: Error - ${jsonError}`)
      })
  }

  handleSubscriberEvent (event) {
    this.setState(state => {
      state.statusEvent = event
      return state
    })
  }

  subscriberEstablished (subscriber, view) {
    console.log(`[SubscriberClusterTest] subscriber: ${subscriber}, ${view}`)
  }

  render () {
    return (
      <div>
        <BackLink onClick={this.props.onBackClick} />
        <h1 className="centered">Subscriber Cluster Test</h1>
        <hr />
        <h2 className="centered"><em>stream</em>: {this.props.settings.stream1}</h2>
        <SubscriberStatus event={this.state.statusEvent} />
        <Red5ProSubscriber
          className="centered"
          mediaClassName="video-element"
          configuration={this.props.settings}
          streamName={this.props.settings.stream1}
          host={this.state.targetHost}
          autoPlay={true}
          showControls={true}
          onSubscriberEstablished={this.subscriberEstablished.bind(this)}
          onSubscriberEvent={this.handleSubscriberEvent.bind(this)}
          ref={c => this._red5ProSubscriber = c}
        />
      </div>
    )
  }

}

SubscriberClusterTest.propTypes = {
  settings: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default SubscriberClusterTest

