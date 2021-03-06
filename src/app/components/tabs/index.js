import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import tabs from './tabs'
import * as actions from './actions'

export default Factory({
  namespace: 'tabs',
  component: tabs,
  reducer,
  actions
})
