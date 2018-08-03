import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import search from './search'
import * as actions from './actions'

const Search = Factory({
  namespace: 'search',
  component: search,
  reducer,
  actions
})

export default Search
