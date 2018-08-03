import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  active: false,
  q: ''
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.TYPE:
    return {
      ...state,
      q: action.q
    }

  case actionTypes.BEGIN:
    return {
      ...state,
      active: true
    }

  case actionTypes.END:
    return {
      ...state,
      active: false
    }

  case actionTypes.ABORT:
    return {
      ...state,
      q: ''
    }

  default:
    return state
  }

}
