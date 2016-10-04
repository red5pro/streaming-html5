import { connect } from 'react-redux'
import { changeView } from '../../actions'
import SubscriberFailoverTest from '../../components/test/SubscriberFailoverTest'

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
const SubscriberFailoverTestContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriberFailoverTest)

export default SubscriberFailoverTestContainer

