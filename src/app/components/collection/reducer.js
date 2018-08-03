import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  all: null,
  filtering: false,
  filter: null,
  q: '',
  records: [],
  status: 'pending',
  total: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.FETCH_REQUEST:
    return {
      ...state,
      status: 'loading'
    }

  case actionTypes.FETCH_SUCCESS:
    return {
      ...state,
      all: action.result.pagination.all,
      records: action.result.data,
      status: 'loaded',
      total: action.result.pagination.total
    }

  case actionTypes.FETCH_FAILURE:
    return {
      ...state,
      status: 'failure'
    }

  case actionTypes.SET_FILTER:
    return {
      ...state,
      filter: action.filter
    }

  case actionTypes.SET_QUERY:
    return {
      ...state,
      q: action.q
    }

  case actionTypes.SET_RECORDS:
    return {
      ...state,
      all: action.records.length,
      records: action.records,
      status: 'loaded',
      total: action.records.length
    }

  case actionTypes.TOGGLE_FILTER:
    return {
      ...state,
      filtering: !state.filtering
    }

  default:
    return state

  }
}
