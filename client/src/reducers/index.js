import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import { postDetailsReducer, postListReducer } from './postReducer';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  postList: postListReducer,
  postDetails: postDetailsReducer,
});
