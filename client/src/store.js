import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const preloadedState = { auth: { userAuth: { userInfo: userInfoFromStorage } } };

const middleware = [thunk];

const store = createStore(
  rootReducer,
  preloadedState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
