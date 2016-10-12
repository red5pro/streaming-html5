import { connect } from 'react-redux'
import { changeView } from '../../actions'

export default (targetTest, settingsOverride) => {

  const mapStateToProps = (state) => {
    return {
      settings: Object.assign(state.settings, settingsOverride)
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      onBackClick: () => {
        dispatch(changeView('list'))
      }
    }
  }

  const PublisherContainer = connect( // eslint-disable-line no-unused-vars
    mapStateToProps,
    mapDispatchToProps
  )(targetTest)

  return <PublisherContainer />

}

