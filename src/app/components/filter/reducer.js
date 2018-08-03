import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  panels: [],
  values: {
    category_id: null,
    county_id: [],
    offering_id: [],
    is_grassfed: null,
    is_vegan: null,
    is_vegetarian: null,
    is_organic: null
  }
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.CHANGE:
    return {
      ...state,
      values: {
        ...state.values,
        [action.name]: action.value
      }
    }

  case actionTypes.ADD_PANEL:
    return {
      ...state,
      panels: [
        ...state.panels,
        action.panel
      ]
    }

  case actionTypes.REMOVE_PANEL:
    return {
      ...state,
      panels: state.panels.slice(0, state.panels - 1)
    }

  case actionTypes.RESET:
    return {
      ...state,
      values: INITIAL_STATE.values
    }

  default:
    return state

  }
}
