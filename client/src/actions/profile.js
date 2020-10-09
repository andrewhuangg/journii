import axios from 'axios';
import { setAlert } from './alert';
import {
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  DELETE_PROFILE,
  GET_REPOS,
  GET_FOLLOWED_PROFILES,
  FOLLOW_PROFILE,
  UNFOLLOW_PROFILE,
} from './types';

export const getFollowedProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/profiles/followedprofiles');

    dispatch({
      type: GET_FOLLOWED_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err,
    });
  }
};

export const followProfile = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/profiles/follow/${id}`);
    dispatch({
      type: FOLLOW_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err,
    });
  }
};

export const unFollowProfile = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/profiles/unfollow/${id}`);
    dispatch({
      type: UNFOLLOW_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err,
    });
  }
};

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/profiles/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({type: CLEAR_PROFILE })
    dispatch({
      type: PROFILE_ERROR,
      payload: err,
    });
  }
};

export const getProfileByUserId = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/profiles/users/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err,
    });
  }
};

export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get('/api/v1/profiles');

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err,
    });
  }
};

export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/profiles/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err,
    });
  }
};

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
    dispatch({
      type: PROFILE_ERROR,
      payload: err,
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
    dispatch({
      type: PROFILE_ERROR,
      payload: err,
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
    dispatch({
      type: PROFILE_ERROR,
      payload: err,
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
    dispatch({
      type: PROFILE_ERROR,
      payload: err,
    });
  }
};

export const deleteProfile = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/profiles/${id}`);
    dispatch({ type: DELETE_PROFILE });
    dispatch(setAlert('Profile has been removed'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err,
    });
  }
};
