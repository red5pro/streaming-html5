import { combineReducers } from 'redux'
import { settings, tests } from './settings'
import viewFilter from './view-filter'

const testbedApp = combineReducers({
  settings,
  tests,
  viewFilter
})

export default testbedApp

