import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/layout/Header';
import Landing from './components/landing/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserProfile from './components/auth/UserProfile';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddProject from './components/profile-forms/AddProject';
import ProfileList from './components/profiles/ProfileList';
import ProfileShow from './components/profile/ProfileShow';
import PostList from './components/posts/PostList';
import PostShow from './components/post/PostShow';
import CreatePost from './components/post-forms/CreatePost';
import EditPost from './components/post-forms/EditPost';
import PrivateRoute from './components/routing/PrivateRoute';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.scss';

// CREATE AN ERROR PAGE INCASE A PAGE DOESNT EXIST

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <>
          <Route path='/' component={Header} />
          <Route exact path='/' component={Landing} />
          <Switch>
            <PrivateRoute exact path='/dashboard' component={Dashboard} />

            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <PrivateRoute exact path='/userinfo' component={UserProfile} />

            <PrivateRoute exact path='/createprofile' component={CreateProfile} />
            <PrivateRoute exact path='/editprofile' component={EditProfile} />
            <Route exact path='/profiles' component={ProfileList} />
            <Route exact path='/profile/:id' component={ProfileShow} />
            <Route exact path='/addexperience' component={AddExperience} />
            <Route exact path='/addproject' component={AddProject} />

            <PrivateRoute exact path='/createpost' component={CreatePost} />
            <PrivateRoute exact path='/editpost/:id' component={EditPost} />
            <Route exact path='/posts' component={PostList} />
            <Route exact path='/posts/:id' component={PostShow} />

            <Route exact path='/search/:keyword' component={PostList} />
            {/* remember to switch postlist back to dashboard */}
            <Route exact path='/page/:pageNumber' component={PostList} />
            {/* remember to switch postlist back to dashboard */}
            <Route exact path='/search/:keyword/page/:pageNumber' component={PostList} />
          </Switch>
        </>
      </Router>
    </Provider>
  );
};
export default App;
