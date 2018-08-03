import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import RouterStack from './components/stack/router'
import { combineReducers } from 'redux-rubberstamp'
import initReactFastclick from 'react-fastclick'
import createApiRequest from 'redux-api-request'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader'
import PropTypes from 'prop-types'
import React from 'react'

import Categories from './pages/categories'
import Offerings from './pages/offerings'
import ThankYou from './pages/thankyou'
import Home from './pages/home'
import List from './pages/list'
import Show from './pages/show'

initReactFastclick()

class App extends React.Component {

  static propTypes = {
    reducers: PropTypes.array
  }

  constructor(props) {
    super(props)
    this.store = this._getStore()
  }

  render() {
    return (
      <Provider store={ this.store }>
        <Router>
          <RouterStack { ...this._getStack() } />
        </Router>
      </Provider>
    )
  }

  _getStore() {

    const reducers = combineReducers(this.props.reducers)

    const loggerMiddleware = createLogger({ collapsed: true })

    const apiRequestMiddleware = createApiRequest()

    const middleware = [
      thunkMiddleware,
      apiRequestMiddleware,
      ...(process.env.NODE_ENV !== 'production') ? [loggerMiddleware] : []
    ]

    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)

    return createStoreWithMiddleware(reducers)

  }

  _getStack() {
    return {
      routes: [
        { path: '/', component: Home },
        { path: '/categories', component: Categories },
        { path: '/attractions', component: List },
        { path: '/thankyou', component: ThankYou },
        { path: '/offerings', component: Offerings },
        { path: '/offerings/:slug', component: List },
        { path: '/:slug', component: Show }
      ]
    }
  }

}

export default hot(module)(App)
