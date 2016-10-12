import { connect } from 'react-redux'
import { getCurrentPage } from '../selectors'
import App from '../components/App'

const mapStateToProps = (state) => {
  return {
    page: getCurrentPage(state),
    state: state
  }
}

const AppContainer = connect(
  mapStateToProps
)(App)

export default AppContainer
