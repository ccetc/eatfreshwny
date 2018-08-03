import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import filter from './filter'
import * as actions from './actions'

const Filter = Factory({
  namespace: 'filter',
  component: filter,
  reducer,
  actions
})

export default Filter
