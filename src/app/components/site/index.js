import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import site from './site'
import * as actions from './actions'

export default Singleton({
  namespace: 'site',
  component: site,
  reducer,
  actions
})
