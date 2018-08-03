import * as actionTypes from './action_types'

export const fetch = (endpoint, $filter) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `http://eatfreshwny.com${endpoint}`,
  query: { $filter },
  request: actionTypes.FETCH_REQUEST,
  success: actionTypes.FETCH_SUCCESS,
  failure: actionTypes.FETCH_FAILURE
})

export const setRecords = (records) => ({
  type: actionTypes.SET_RECORDS,
  records
})

export const setFilter = (filter) => ({
  type: actionTypes.SET_FILTER,
  filter
})

export const setQuery = (q) => ({
  type: actionTypes.SET_QUERY,
  q
})

export const toggleFilter = (records) => ({
  type: actionTypes.TOGGLE_FILTER
})
