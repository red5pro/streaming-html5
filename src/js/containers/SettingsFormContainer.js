import { connect } from 'react-redux'
import { changeView } from '../actions'
import SettingsForm from '../components/SettingsForm'

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

const SettingsFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsForm)

export default SettingsFormContainer
