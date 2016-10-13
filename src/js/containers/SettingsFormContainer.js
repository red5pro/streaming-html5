import { connect } from 'react-redux'
import { changeView, changeSetting, changeLogLevel } from '../actions'
import SettingsForm from '../components/SettingsForm'

const mapStateToProps = (state) => {
  return {
    settings: state.settings,
    logLevel: state.logLevel
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBackClick: () => {
      dispatch(changeView('list'))
    },
    onFieldChange: (key, value) => {
      dispatch(changeSetting(key, value))
    },
    onLogLevelChange: (level) => {
      dispatch(changeLogLevel(level))
    }
  }
}

const SettingsFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsForm)

export default SettingsFormContainer
