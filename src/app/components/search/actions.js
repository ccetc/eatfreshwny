import * as actionTypes from './action_types'

export const begin = () => ({
  type: actionTypes.BEGIN
})

export const end = () => ({
  type: actionTypes.END
})

export const type = (q) => ({
  type: actionTypes.TYPE,
  q
})

export const abort = () => ({
  type: actionTypes.ABORT
})
