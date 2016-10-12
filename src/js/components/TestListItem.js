import { PropTypes } from 'react'

const TestListItem = ({ onClick, name }) => (
  <li onClick={onClick}>{name}</li>
)

TestListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}

export default TestListItem
