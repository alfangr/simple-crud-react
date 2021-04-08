import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { ContactList } from './components/contacts/ContactList'

export default function App () {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/'>
            <ContactList />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
