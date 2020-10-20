import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LOGOUT } from './actions/types';
import Header from './components/layout/Header';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserProfile from './components/auth/UserProfile';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <>
          <Header />
          <Route exact path='/' component={Landing} />
          <main>
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:id' component={Profile} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/userprofile' component={UserProfile} />
              <Route exact path='/createprofile' component={CreateProfile} />
              <Route exact path='/editprofile' component={EditProfile} />
              <Route exact path='/addexperience' component={AddExperience} />
              <Route exact path='/posts' component={Posts} />
              <Route exact path='/posts/:id' component={Post} />
            </Switch>
          </main>
        </>
      </Router>
    </Provider>
  );
};
export default App;
