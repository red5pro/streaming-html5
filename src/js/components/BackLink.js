import { PropTypes } from 'react'

const BackLink = ({ onClick }) => (
  <div id="back-link-container">
    <a id="back-link" onClick={onClick}>Return to Menu</a>
  </div>
)

BackLink.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default BackLink

