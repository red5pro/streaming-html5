import { LOG_LEVEL_CHANGE } from '../actions'

export const logLevel = (state = 'debug', action) => {
  switch (action.type) {
    case LOG_LEVEL_CHANGE:
      return action.level
    default:
      return state
  }
}
