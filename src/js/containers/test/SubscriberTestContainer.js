import { connect } from 'react-redux'
import { changeView } from '../../actions'
import SubscriberTest from '../../components/test/SubscriberTest'

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
const SubscriberTestContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriberTest)

export default SubscriberTestContainer

