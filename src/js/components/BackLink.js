import { PropTypes } from 'react'

const BackLink = ({ onClick }) => (
  <li onClick={onClick}>Return to Menu</li>
)

BackLink.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default BackLink

