import axios from 'axios';
import {
  FETCH_PROFILE_LIST,
  FETCH_PROFILE_DETAILS,
  CREATE_PROFILE,
  DESTROY_PROFILE,
  FETCH_PROFILE_EXPERIENCE,
  UPDATE_PROFILE_EXPERIENCE,
  FETCH_PROFILE_PROJECT,
  UPDATE_PROFILE_PROJECT,
  UPDATE_PROFILE_FOLLOWS,
  FETCH_GITHUB_LIST,
  FETCH_PROFILE_FOLLOWERS,
  ERROR_FETCH_GITHUB,
} from './types';
import { setAlert } from './alertAction';

export const listFollowedProfiles = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/users/${userId}/profiles/followedprofiles`);

    dispatch({
      type: FETCH_PROFILE_FOLLOWERS,
      payload: data,
    });
    return Promise.resolve(data);
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const getOwnProfileDetails = () => async (dispatch, getState) => {
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
    const { data } = await axios.get(`/api/v1/profiles/me`, config);
    dispatch({
      type: FETCH_PROFILE_DETAILS,
      payload: data,
    });

    return Promise.resolve(data);
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const getProfileDetails = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/profiles/users/${userId}`);

    dispatch({
      type: FETCH_PROFILE_DETAILS,
      payload: data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const listProfiles = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/profiles`);

    dispatch({
      type: FETCH_PROFILE_LIST,
      payload: data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const createProfile = (profile) => async (dispatch, getState) => {
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
    const { data } = await axios.post(`/api/v1/profiles`, profile, config);
    dispatch({
      type: CREATE_PROFILE,
      payload: data,
    });

    return Promise.resolve();
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const updateProfile = (profile, id) => async (dispatch, getState) => {
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
    const { data } = await axios.put(`/api/v1/profiles/${id}`, profile, config);

    dispatch({
      type: FETCH_PROFILE_DETAILS,
      payload: data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const deleteProfile = (id) => async (dispatch, getState) => {
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
    await axios.delete(`/api/v1/profiles/${id}`, config);
    dispatch({
      type: DESTROY_PROFILE,
    });

    return Promise.resolve();
  } catch (error) {
    dispatch(setAlert('unable to delete profile', 'error'));
  }
};

export const addExperience = (experience) => async (dispatch, getState) => {
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
    const { data } = await axios.put(`/api/v1/profiles/experience`, experience, config);

    dispatch({
      type: UPDATE_PROFILE_EXPERIENCE,
      payload: data,
    });

    return Promise.resolve();
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const deleteExperience = (id) => async (dispatch, getState) => {
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

    const { data } = await axios.delete(`/api/v1/profiles/experience/${id}`, config);

    dispatch({
      type: UPDATE_PROFILE_EXPERIENCE,
      payload: data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const updateExperience = (experience, profileId, experienceId) => async (
  dispatch,
  getState
) => {
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

    const { data } = await axios.put(
      `/api/v1/profiles/${profileId}/experience/${experienceId}`,
      experience,
      config
    );

    dispatch({
      type: UPDATE_PROFILE_EXPERIENCE,
      payload: data,
    });

    return Promise.resolve(data);
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const getExperience = (profileId, experienceId) => async (dispatch, getState) => {
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

    const { data } = await axios.get(
      `/api/v1/profiles/${profileId}/profileexperience/${experienceId}`,
      config
    );

    dispatch({
      type: FETCH_PROFILE_EXPERIENCE,
      payload: data,
    });

    return Promise.resolve(data);
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const addProject = (project) => async (dispatch, getState) => {
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
    const { data } = await axios.put(`/api/v1/profiles/project`, project, config);

    dispatch({
      type: UPDATE_PROFILE_PROJECT,
      payload: data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const updateProject = (project, profileId, projectId) => async (dispatch, getState) => {
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

    const { data } = await axios.put(
      `/api/v1/profiles/${profileId}/project/${projectId}`,
      project,
      config
    );

    dispatch({
      type: UPDATE_PROFILE_PROJECT,
      payload: data,
    });

    return Promise.resolve(data);
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const deleteProject = (id) => async (dispatch, getState) => {
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

    const { data } = await axios.delete(`/api/v1/profiles/project/${id}`, config);

    dispatch({
      type: UPDATE_PROFILE_PROJECT,
      payload: data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const getProject = (profileId, projectId) => async (dispatch, getState) => {
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

    const { data } = await axios.get(
      `/api/v1/profiles/${profileId}/profileproject/${projectId}`,
      config
    );

    dispatch({
      type: FETCH_PROFILE_PROJECT,
      payload: data,
    });

    return Promise.resolve(data);
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const followProfile = (profile, id) => async (dispatch, getState) => {
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

    const { data } = await axios.put(`/api/v1/profiles/follow/${id}`, profile, config);

    dispatch({
      type: UPDATE_PROFILE_FOLLOWS,
      payload: data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const unfollowProfile = (profile, id) => async (dispatch, getState) => {
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

    const { data } = await axios.put(`/api/v1/profiles/unfollow/${id}`, profile, config);

    dispatch({
      type: UPDATE_PROFILE_FOLLOWS,
      payload: data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const listGithubRepos = (username) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/profiles/github/${username}`);

    dispatch({
      type: FETCH_GITHUB_LIST,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_FETCH_GITHUB,
    });
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};
