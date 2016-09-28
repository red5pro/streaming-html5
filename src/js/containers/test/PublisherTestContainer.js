import { connect } from 'react-redux'
import { changeView } from '../../actions'
import PublisherTest from '../../components/test/PublisherTest'

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
const PublisherTestContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PublisherTest)

export default PublisherTestContainer
