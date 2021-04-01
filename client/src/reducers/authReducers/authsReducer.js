import { combineReducers } from 'redux';
import userAuth from './authReducer';
import userShow from './userShowReducer';

export default combineReducers({
  userAuth,
  userShow,
});
