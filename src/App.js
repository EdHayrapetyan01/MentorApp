import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Profile from './components/profile';
import Signup from './components/Auth';
import ManageProfiles from './components/Manage';
import Home from './components/Home/Home';

import PrivateRoute from './components/private-route';

export default function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Route exact path='/' component={Home} />
        <Route path='/sign-up' exact component={Signup} />
        <PrivateRoute path='/manage-profiles' component={ManageProfiles} />
        <PrivateRoute path='/profile' component={Profile} />
      </Router>
    </>
  );
}
