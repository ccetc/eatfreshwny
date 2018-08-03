import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import page from './page'
import * as actions from './actions'

export const Page = (pageResources, pageProps, BodyComponent) => {

  return Factory({
    namespace: 'page',
    component: page(pageResources, pageProps, BodyComponent),
    reducer,
    actions
  })

}

export default {
  reducer: {
    'function': reducer,
    'namespace': 'page'
  }
}
