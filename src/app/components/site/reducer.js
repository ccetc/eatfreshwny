export const INITIAL_STATE = {
  active: false
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'TOGGLE_MENU':
    return {
      ...state,
      active: !state.active
    }

  default:
    return state

  }
}
