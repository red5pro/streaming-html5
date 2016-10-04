import { connect } from 'react-redux'
import { changeView } from '../../actions'
import PublisherFailoverTest from '../../components/test/PublisherFailoverTest'

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
const PublisherFailoverTestContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PublisherFailoverTest)

export default PublisherFailoverTestContainer

