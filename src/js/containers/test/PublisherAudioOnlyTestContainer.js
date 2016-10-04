import { connect } from 'react-redux'
import { changeView } from '../../actions'
import PublisherAudioOnlyTest from '../../components/test/PublisherAudioOnlyTest'

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
const PublisherAudioOnlyTestContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PublisherAudioOnlyTest)

export default PublisherAudioOnlyTestContainer

