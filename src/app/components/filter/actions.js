import * as actionTypes from './action_types'

export const change = (name, value) => ({
  type: actionTypes.CHANGE,
  name,
  value
})

export const addPanel = (panel) => ({
  type: actionTypes.ADD_PANEL,
  panel
})

export const removePanel = () => ({
  type: actionTypes.REMOVE_PANEL
})

export const reset = () => ({
  type: actionTypes.RESET
})
