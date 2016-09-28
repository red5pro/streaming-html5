import { connect } from 'react-redux'
import { changeView, changeSetting } from '../actions'
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
    },
    onFieldChange: (key, value) => {
      dispatch(changeSetting(key, value))
    }
  }
}

const SettingsFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsForm)

export default SettingsFormContainer
