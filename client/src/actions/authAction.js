import axios from 'axios';
import {
  RESET_POST_LIST,
  RESET_POST_DETAILS,
  RESET_PROFILE_LIST,
  RESET_PROFILE_DETAILS,
  RESET_USER_DETAILS,
  CREATE_USER,
  LOGIN_USER,
  FETCH_OWN_DETAILS,
  FETCH_USER_DETAILS,
  LOGOUT_USER,
  DESTROY_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from './types';

export const register = (user) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/v1/auth/register', user, config);
    dispatch({
      type: CREATE_USER,
      payload: data,
    });
    dispatch({
      type: LOGIN_USER,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    console.log(error);
    // dispatch({
    //   type: USER_REGISTER_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message.split(',').join(' ')
    //       : error.message,
    // });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/v1/auth/login', { email, password }, config);
    dispatch({
      type: LOGIN_USER,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    console.log(error);
    // dispatch({
    //   type: USER_LOGIN_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message.split(',').join(' ')
    //       : error.message,
    // });
  }
};

// Logout / Clear profile
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: RESET_USER_DETAILS });
  dispatch({ type: RESET_POST_DETAILS });
  dispatch({ type: RESET_POST_LIST });
  dispatch({ type: RESET_PROFILE_DETAILS });
  dispatch({ type: RESET_PROFILE_LIST });
  dispatch({ type: LOGOUT_USER });
  document.location.href = '/';
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    const {
      auth: {
        userAuth: { userInfo },
      },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/v1/auth/${id}`, config);
    dispatch({
      type: FETCH_USER_DETAILS,
      payload: data,
    });
    return Promise.resolve(data);
  } catch (error) {
    console.log(error);
    // dispatch({
    //   type: USER_DETAILS_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message.split(',').join(' ')
    //       : error.message,
    // });
  }
};

export const getMe = () => async (dispatch, getState) => {
  try {
    const {
      auth: {
        userAuth: { userInfo },
      },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/v1/auth/me`, config);

    dispatch({
      type: FETCH_OWN_DETAILS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    // dispatch({
    //   type: USER_DETAILS_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message.split(',').join(' ')
    //       : error.message,
    // });
  }
};

export const updateUserInfo = (user) => async (dispatch, getState) => {
  try {
    const {
      auth: {
        userAuth: { userInfo },
      },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/v1/auth/updatedetails`, user, config);

    dispatch({
      type: FETCH_USER_DETAILS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    // dispatch({
    //   type: USER_UPDATE_INFO_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message.split(',').join(' ')
    //       : error.message,
    // });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.post(`/api/v1/auth/forgotpassword`, { email }, config);

    dispatch({
      type: FORGOT_PASSWORD,
    });

    return Promise.resolve();
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = (password, resettoken) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.put(`/api/v1/auth/resetpassword/${resettoken}`, { password }, config);

    dispatch({
      type: RESET_PASSWORD,
    });

    return Promise.resolve();
  } catch (error) {}
};
