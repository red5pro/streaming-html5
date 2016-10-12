import { VIEW_CHANGE } from '../actions'

export const viewFilter = (state = 'Home', action) => {
  switch(action.type) {
    case VIEW_CHANGE:
      return action.filter
    default:
      return state
  }
}

