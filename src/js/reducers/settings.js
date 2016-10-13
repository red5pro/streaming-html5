import { SETTINGS_UPDATE } from '../actions'

export const settings = (state = {}, action) => {
  switch(action.type) {
    case SETTINGS_UPDATE: {
      let settingsUpdate = state
      settingsUpdate[action.key] = action.value
      return {
        ...settingsUpdate
      }
    }
    default:
      return state
  }
}

export const tests = (state = {}, action) => {
  switch(action.type) {
    default:
      return state
  }
}

