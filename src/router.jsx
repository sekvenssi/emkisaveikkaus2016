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
import UsersPage from './pages/UsersPage'
import UserPage from './pages/UserPage'

const RootRouter = (
  <Router history={hashHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={FrontPage} />
      <Route path="users" component={UsersPage} />
      <Route path="user/:userId" component={UserPage} />
    </Route>
  </Router>
)

export default RootRouter
