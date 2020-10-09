import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  DELETE_ACCOUNT,
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/v1/auth/me');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/v1/auth/register', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    let errors = err.response.data.error;
    if (errors) {
      errors = errors.split(',');
      errors.forEach((error) => dispatch(setAlert(error, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/v1/auth/login', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    let errors = err.response.data.error;
    if (errors) {
      errors = errors.split(',');
      errors.forEach((error) => dispatch(setAlert(error, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout / Clear profile
export const logout = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: LOGOUT,
  });
};

export const deleteAccount = (id) => async (dispatch) => {
  if (window.confirm('Are you sure? This can Not be undoned!')) {
    try {
      await axios.delete(`/api/v1/auth/${id}`);
      dispatch({ type: DELETE_ACCOUNT });
      dispatch(setAlert('Account was permanently removed'));
    } catch (err) {
      let errors = err.response.data.error;
      if (errors) {
        errors = errors.split(',');
        errors.forEach((error) => dispatch(setAlert(error, 'danger')));
      }

      dispatch({
        type: AUTH_ERROR,
        payload: errors,
      });
    }
  }
};
