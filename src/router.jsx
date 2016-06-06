import React from 'react'
import {
  Router,
  Route,
  IndexRoute,
  //IndexRedirect,
  hashHistory
} from 'react-router'

import MainLayout from './components/layout/MainLayout'
import FrontPage from './pages/FrontPage'

const RootRouter = (
  <Router history={hashHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={FrontPage} />
    </Route>
  </Router>
)

export default RootRouter
