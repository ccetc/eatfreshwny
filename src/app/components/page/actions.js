import * as actionTypes from './action_types'

export const fetchResource = (prop, endpoint) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `http://eatfreshwny.com${endpoint}`,
  meta: {
    prop,
    endpoint: `http://eatfreshwny.com${endpoint}`
  },
  request: actionTypes.FETCH_RESOURCE_REQUEST,
  success: actionTypes.FETCH_RESOURCE_SUCCESS,
  failure: actionTypes.FETCH_RESOURCE_FAILURE
})

export const setLoaded = (prop) => ({
  type: actionTypes.SET_LOADED
})

export const clearResource = (prop) => ({
  type: actionTypes.CLEAR_RESOURCE,
  prop
})
