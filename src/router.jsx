import React from 'react'
import {
  Router,
  Route,
  IndexRoute,
  //IndexRedirect,
  hashHistory
} from 'react-router'

import MainLayout from './components/layout/MainLayout'
import App from './components/App'

const RootRouter = (
  <Router history={hashHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={App} />
    </Route>
  </Router>
)

export default RootRouter
