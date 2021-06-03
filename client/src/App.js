import './App.scss';
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
import UpdateExperience from './components/profile-forms/UpdateExperience';
import AddProject from './components/profile-forms/AddProject';
import UpdateProject from './components/profile-forms/UpdateProject';
import ProfileList from './components/profiles/ProfileList';
import ProfileShow from './components/profile/ProfileShow';
import PostList from './components/posts/PostList';
import PostShow from './components/post/PostShow';
import CreatePost from './components/post-forms/CreatePost';
import EditPost from './components/post-forms/EditPost';
import PrivateRoute from './components/routing/PrivateRoute';
import About from './components/landing/About';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import UpdatePassword from './components/auth/UpdatePassword';
import ScrollToTop from './components/layout/ScrollToTop';

import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <>
          <ScrollToTop />
          <Route path='/' component={Header} />
          <Route exact path='/' component={Landing} />
          <Switch>
            <Route exact path='/about' component={About} />
            <Route exact path='/contact' component={About} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />

            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/forgotpassword' component={ForgotPassword} />
            <Route exact path='/resetpassword' component={ResetPassword} />
            <PrivateRoute exact path='/userinfo' component={UserProfile} />
            <PrivateRoute exact path='/updatepassword' component={UpdatePassword} />

            <PrivateRoute exact path='/createprofile' component={CreateProfile} />
            <PrivateRoute exact path='/editprofile' component={EditProfile} />
            <PrivateRoute exact path='/profiles' component={ProfileList} />
            <PrivateRoute exact path='/profile/:id' component={ProfileShow} />
            <PrivateRoute exact path='/addexperience' component={AddExperience} />
            <PrivateRoute exact path='/updateexperience/:id' component={UpdateExperience} />
            <PrivateRoute exact path='/addproject' component={AddProject} />
            <PrivateRoute exact path='/updateproject/:id' component={UpdateProject} />

            <PrivateRoute exact path='/createpost' component={CreatePost} />
            <PrivateRoute exact path='/editpost/:id' component={EditPost} />
            <PrivateRoute exact path='/posts' component={PostList} />
            <PrivateRoute exact path='/posts/:id' component={PostShow} />
            <PrivateRoute exact path='/search/:keyword' component={Dashboard} />
          </Switch>
        </>
      </Router>
    </Provider>
  );
};
export default App;
