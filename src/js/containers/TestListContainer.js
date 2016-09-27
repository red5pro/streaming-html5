import { connect } from 'react-redux'
import { changeView } from '../actions'
import TestList from '../components/TestList'

const mapStateToProps = (state) => {
  return {
    tests: state.tests
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTestListItemClick: (name) => {
      dispatch(changeView(name))
    }
  }
}

const TestListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestList)

export default TestListContainer
