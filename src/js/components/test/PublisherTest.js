import { PropTypes } from 'react'
import BackLink from '../BackLink' // eslint-disable-line no-unused-vars

const PublisherTest = ({ onBackClick, settings }) => ( // eslint-disable-line no-unused-vars
  <div>
    <BackLink onClick={onBackClick} />
    <h1>Publisher Test</h1>
  </div>
)

PublisherTest.propTypes = {
  settings: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default PublisherTest
