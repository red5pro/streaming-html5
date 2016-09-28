import { PropTypes } from 'react'
import BackLink from './BackLink' // eslint-disable-line no-unused-vars

const SettingsForm = ({ onBackClick, settings }) => (
  <div>
    <BackLink onClick={onBackClick} />
    <h1>Settings</h1>
  </div>
)

SettingsForm.propTypes = {
  settings: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default SettingsForm
