import { PropTypes } from 'react'
import TestListItem from './TestListItem' // eslint-disable-line no-unused-vars

const TestList = ({ tests, onTestListItemClick }) => (
  <ul id="test-list">
    {tests.map(test =>
      <TestListItem
        key={test.name}
        {...test}
        onClick={() => onTestListItemClick(test.name)}
      />
    )}
  </ul>
)

TestList.propTypes = {
  tests: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    module: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired).isRequired,
  onTestListItemClick: PropTypes.func.isRequired
}

export default TestList
