import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
//  Child components
import Header from './components/Header'
import Loan from './screens/Loan'
import Login from './screens/LoginScreen'
import Register from './screens/RegisterScreen'
import Dashboard from './screens/Dashboard'
import Profile from './screens/ProfileScreen'

//  Root component - App
const App = () => {
  return (
    <Router>
      <Header />
      <Route path='/' component={Loan} exact />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/profile' component={Profile} />
    </Router>
  )
}
//  default export
export default App
