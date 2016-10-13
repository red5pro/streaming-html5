import { combineReducers } from 'redux'
import { settings, tests } from './settings'
import { viewFilter } from './view-filter'
import { logLevel } from './log-level'

const testbedApp = combineReducers({
  settings,
  tests,
  viewFilter,
  logLevel
})

export default testbedApp

