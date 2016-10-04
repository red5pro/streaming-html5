import { connect } from 'react-redux'
import { changeView } from '../../actions'
import PublisherCameraSourceTest from '../../components/test/PublisherCameraSourceTest'

const mapStateToProps = (state) => {
  return {
    settings: state.settings,
    cameras: []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBackClick: () => {
      dispatch(changeView('list'))
    }
  }
}
const PublisherCameraSourceTestContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PublisherCameraSourceTest)

export default PublisherCameraSourceTestContainer

