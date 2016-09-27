import { VIEW_SET } from '../actions'

const viewFilter = (state = 'HOME', action) => {
  switch(action.type) {
    case VIEW_SET:
      return action.filter
    default:
      return state
  }
}

export default viewFilter

