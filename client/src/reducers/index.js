import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import { postDetailsReducer, postListReducer } from './postReducer';
import { userLoginReducer } from './authReducer';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  postList: postListReducer,
  postDetails: postDetailsReducer,
  userLogin: userLoginReducer,
});
