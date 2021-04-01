import { combineReducers } from 'redux';
import profileList from './profileListReducer';
import profile from './profileReducer';

export default combineReducers({
  profileList,
  profile,
});
