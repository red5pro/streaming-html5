import { PropTypes } from 'react'

const BackLink = ({ onClick }) => (
  <div id="back-link-container" onClick={onClick}>
    <a id="back-link">Return to Menu</a>
  </div>
)

BackLink.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default BackLink

