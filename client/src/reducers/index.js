import { combineReducers } from 'redux';
import posts from './postReducers/postsReducer';
import profiles from './profileReducers/profilesReducer';
import auth from './authReducers/authsReducer';
import common from './UiReducer.js/commonReducer';

export default combineReducers({
  auth,
  posts,
  profiles,
  common,
});
