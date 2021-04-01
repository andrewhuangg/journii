import { combineReducers } from 'redux';
import postList from './postListReducer';
import post from './postReducer';

export default combineReducers({
  postList,
  post,
});
