import { combineReducers } from 'redux';
import quotes from './quoteReducer';
import alerts from './alertReducer';

export default combineReducers({
  quotes,
  alerts,
});
