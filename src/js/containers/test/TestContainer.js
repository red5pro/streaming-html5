import { connect } from 'react-redux'
import { changeView } from '../../actions'

export default (targetTest) => {

  const mapStateToProps = (state) => {
    return {
      settings: state.settings
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      onBackClick: () => {
        dispatch(changeView('list'))
      }
    }
  }

  const TestContainer = connect( // eslint-disable-line no-unused-vars
    mapStateToProps,
    mapDispatchToProps
  )(targetTest)

  return <TestContainer />

}

