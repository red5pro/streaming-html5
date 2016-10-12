/* global red5prosdk */
import React from 'react'
// import red5prosdk from 'red5pro-sdk'
import { PropTypes } from 'react'
import BackLink from '../../BackLink' // eslint-disable-line no-unused-vars

const FILTER_SELECT = 'Select filter...'

class PublisherFiltersTest extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      view: undefined,
      publisher: undefined,
      status: 'On hold.',
      filters: [FILTER_SELECT, 'grayscale', 'sepia', 'blur'],
      videoClassList: ''
    }
  }

  preview () {
    const comp = this
    return new Promise((resolve, reject) => {
      const publisher = new red5prosdk.RTCPublisher()
      const view = new red5prosdk.PublisherView('red5pro-publisher')
      navigator.getUserMedia({
        audio: !comp.props.settings.audio ? false : true,
        video: !comp.props.settings.video ? false : true
      }, media => {

        // Upon access of user media,
        // 1. Attach the stream to the publisher.
        // 2. Show the stream as preview in view instance.
        publisher.attachStream(media)
        view.preview(media, true)

        comp.setState(state => {
          state.publisher = publisher
          state.view = view
          return state
        })

        resolve()

      }, error => {
        console.error(`[PublisherFiltersTest] :: Error - ${error}`)
        reject(error)
      })
    })
  }

  publish () {
    const comp = this
    const publisher = this.state.publisher
    const view = this.state.view
    view.attachPublisher(publisher);

    comp.setState(state => {
      state.status = 'Establishing connection...'
      return state
    })

    // Initialize
    publisher.init(Object.assign({}, this.props.settings, {
      protocol: 'ws',
      port: this.props.settings.rtcport,
      streamName: this.props.settings.stream1,
      streamType: 'webrtc'
    }))
    .then(() => {
      // Invoke the publish action
      comp.setState(state => {
        state.status = 'Starting publish session...'
        return state
      })
      return publisher.publish()
    })
    .then(() => {
      comp.setState(state => {
        state.status = 'Publishing started. You\'re Live!'
        return state
      })
    })
    .catch(error => {
      // A fault occurred while trying to initialize and publish the stream.
      const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      comp.setState(state => {
        state.status = `ERROR: ${jsonError}`
        return state
      })
      console.error(`[PublisherFiltersTest] :: Error - ${jsonError}`)
    })

  }

  unpublish () {
    const comp = this
    return new Promise((resolve, reject) => {
      const view = comp.state.view
      const publisher = comp.state.publisher
      if (publisher) {
        publisher.unpublish()
          .then(() => {
            view.view.src = ''
            publisher.setView(undefined)
            comp.setState(state => {
              state.publisher = undefined
              state.view = undefined
              state.selectedCamera = undefined
              return state
            })
            resolve()
          })
          .catch(error => {
            const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
            console.error(`[PublisherFiltersTest] :: Unmount Error = ${jsonError}`)
            reject(error)
          })
      }
      else {
        resolve()
      }
    })
  }

  componentDidMount () {
    const pub = this.publish.bind(this)
    this.preview()
      .then(pub)
      .catch(() => {
        console.error('[PublisherFilterTest] :: Error - Could not start publishing session.')
      })
  }

  componentWillUnmount () {
    this.unpublish()
  }

  onFilterSelect () {
    const selectedFilter = this._filterSelect.value
    let classList = selectedFilter === FILTER_SELECT ? '' : selectedFilter
    this.setState(state => {
      state.videoClassList = classList
      return state
    })
  }

  render () {
    const labelStyle = {
      'margin-right': '0.5rem'
    }
    const filterSelectField = {
      'background-color': '#ffffff',
      'padding': '0.8rem'
    }
    const videoClassList = this.state.videoClassList.concat(['video-element'])
    return (
      <div>
        <BackLink onClick={this.props.onBackClick} />
        <h1 className="centered">Publisher Filters Test</h1>
        <hr />
        <h2 className="centered"><em>stream</em>: {this.props.settings.stream1}</h2>
        <div className="instructions-block">
          <p>To begin this test, once streaming has started, select a filter to apply:</p>
          <p style={filterSelectField}>
            <label for="filter-select" style={labelStyle}>Camera Filter:</label>
            <select ref={c => this._filterSelect = c}
              id="filter-select"
              onChange={this.onFilterSelect.bind(this)}>
              {this.state.filters.map(filter =>
                <option value={filter}>{filter}</option>
              )}
            </select>
          </p>
        </div>
        <p className="centered publish-status-field">STATUS: {this.state.status}</p>
        <div ref={c => this._videoContainer = c}
          id="video-container"
          className="centered">
          <video ref={c => this._red5ProPublisher = c}
            id="red5pro-publisher"
            className={videoClassList}
            controls autoplay disabled></video>
        </div>
      </div>
    )
  }

}

PublisherFiltersTest.propTypes = {
  settings: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default PublisherFiltersTest

