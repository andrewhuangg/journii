import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/layout/Header';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserProfile from './components/auth/UserProfile';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import ProfileList from './components/profiles/ProfileList';
import ProfileShow from './components/profile/ProfileShow';
import PostList from './components/posts/PostList';
import Post from './components/post/Post';
import CreatePost from './components/post-forms/CreatePost';
import EditPost from './components/post-forms/EditPost';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.scss';

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
              <Route exact path='/profiles' component={ProfileList} />
              <Route exact path='/profile/:id' component={ProfileShow} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/userprofile' component={UserProfile} />
              <Route exact path='/createprofile' component={CreateProfile} />
              <Route exact path='/editprofile' component={EditProfile} />
              {/* <Route exact path='/addexperience' component={AddExperience} /> */}
              <Route exact path='/createpost' component={CreatePost} />
              <Route exact path='/editpost/:id' component={EditPost} />
              <Route exact path='/posts' component={PostList} />
              <Route exact path='/posts/:id' component={Post} />
            </Switch>
          </main>
        </>
      </Router>
    </Provider>
  );
};
export default App;
