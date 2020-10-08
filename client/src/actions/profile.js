import axios from 'axios';
import { setAlert } from './alert';
import { CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, DELETE_PROFILE } from './types';

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/profiles/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.data.error.split(','),
    });
  }
};

// Create profile
export const createProfile = (formData, history, userId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post(`/api/v1/users/${userId}/profiles`, formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Profile Created'));

    history.push('./dashboard');
  } catch (err) {
    let errors = err.response.data.error;
    if (errors) {
      errors = errors.split(',');
      errors.forEach((error) => dispatch(setAlert(error, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: errors,
    });
  }
};

export const editProfile = (formData, profileId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put(`/api/v1/profiles/${profileId}`, formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Profile Updated'));
  } catch (err) {
    let errors = err.response.data.error;
    if (errors) {
      errors = errors.split(',');
      errors.forEach((error) => dispatch(setAlert(error, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: errors,
    });
  }
};

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put(`/api/v1/profiles/experience`, formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Experience Added'));

    history.push('./dashboard');
  } catch (err) {
    let errors = err.response.data.error;
    if (errors) {
      errors = errors.split(',');
      errors.forEach((error) => dispatch(setAlert(error, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: errors,
    });
  }
};

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/profiles/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Experience Removed'));
  } catch (err) {
    let errors = err.response.data.error;
    if (errors) {
      errors = errors.split(',');
      errors.forEach((error) => dispatch(setAlert(error, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: errors,
    });
  }
};

export const deleteProfile = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/profiles/${id}`);
    dispatch({ type: DELETE_PROFILE });
    dispatch(setAlert('Profile has been removed'));
  } catch (err) {
    let errors = err.response.data.error;
    if (errors) {
      errors = errors.split(',');
      errors.forEach((error) => dispatch(setAlert(error, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: errors,
    });
  }
};
