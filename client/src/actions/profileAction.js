import axios from 'axios';
import {
  PROFILE_CREATE_REQUEST,
  PROFILE_CREATE_FAIL,
  PROFILE_CREATE_SUCCESS,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_DETAILS_SUCCESS,
  PROFILE_DETAILS_FAIL,
  PROFILE_DETAILS_REQUEST,
  PROFILE_DETAILS_RESET,
  PROFILE_LIST_REQUEST,
  PROFILE_LIST_SUCCESS,
  PROFILE_LIST_FAIL,
  PROFILE_UPDATE_EXPERIENCES_REQUEST,
  PROFILE_UPDATE_EXPERIENCES_SUCCESS,
  PROFILE_UPDATE_EXPERIENCES_FAIL,
  PROFILE_UPDATE_PROJECTS_REQUEST,
  PROFILE_UPDATE_PROJECTS_SUCCESS,
  PROFILE_UPDATE_PROJECTS_FAIL,
  PROFILE_UPDATE_FOLLOWS_REQUEST,
  PROFILE_UPDATE_FOLLOWS_SUCCESS,
  PROFILE_UPDATE_FOLLOWS_FAIL,
  PROFILE_LIST_GITHUB_REQUEST,
  PROFILE_LIST_GITHUB_SUCCESS,
  PROFILE_LIST_GITHUB_FAIL,
  PROFILE_DELETE_REQUEST,
  PROFILE_DELETE_SUCCESS,
  PROFILE_DELETE_FAIL,
} from './types';

// export const getFollowedProfiles = () => async (dispatch) => {
//   try {
//     const res = await axios.get('/api/v1/profiles/followedprofiles');

//     dispatch({
//       type: GET_FOLLOWED_PROFILES,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: err,
//     });
//   }
// };

export const getOwnProfileDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/v1/profiles/me`, config);
    dispatch({
      type: PROFILE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: PROFILE_DETAILS_RESET });
    dispatch({
      type: PROFILE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message.split(',').join(' ')
          : error.message,
    });
  }
};

export const getProfileDetails = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: PROFILE_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/profiles/users/${userId}`);

    dispatch({
      type: PROFILE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: PROFILE_DETAILS_RESET });
    dispatch({
      type: PROFILE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message.split(',').join(' ')
          : error.message,
    });
  }
};

export const listProfiles = () => async (dispatch) => {
  try {
    dispatch({
      type: PROFILE_LIST_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/profiles`);

    dispatch({
      type: PROFILE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message.split(',').join(' ')
          : error.message,
    });
  }
};

export const createProfile = (profile) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/v1/profiles`, profile, config);
    dispatch({
      type: PROFILE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message.split(',').join(' ')
          : error.message,
    });
  }
};

export const updateProfile = (profile, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/v1/profiles/${id}`, profile, config);
    dispatch({ type: PROFILE_UPDATE_SUCCESS });
    dispatch({ type: PROFILE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message.split(',').join(' ')
          : error.message,
    });
  }
};

export const deleteProfile = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/v1/profiles/${id}`, config);
    dispatch({
      type: PROFILE_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message.split(',').join(' ')
          : error.message,
    });
  }
};

export const addExperience = (experience) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_UPDATE_EXPERIENCES_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/v1/profiles/experience`, experience, config);
    dispatch({
      type: PROFILE_UPDATE_EXPERIENCES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_UPDATE_EXPERIENCES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message.split(',').join(' ')
          : error.message,
    });
  }
};

export const deleteExperience = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROFILE_UPDATE_EXPERIENCES_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/v1/profiles/experience/${id}`, config);

    dispatch({
      type: PROFILE_UPDATE_EXPERIENCES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_UPDATE_EXPERIENCES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message.split(',').join(' ')
          : error.message,
    });
  }
};

export const addProject = (project) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_UPDATE_PROJECTS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/v1/profiles/project`, project, config);
    dispatch({
      type: PROFILE_UPDATE_PROJECTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_UPDATE_PROJECTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message.split(',').join(' ')
          : error.message,
    });
  }
};

export const deleteProject = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROFILE_UPDATE_PROJECTS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/v1/profiles/projects/${id}`, config);

    dispatch({
      type: PROFILE_UPDATE_PROJECTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_UPDATE_PROJECTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message.split(',').join(' ')
          : error.message,
    });
  }
};

export const followProfile = (profile, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROFILE_UPDATE_FOLLOWS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/v1/profiles/follow/${id}`, profile, config);

    dispatch({
      type: PROFILE_UPDATE_FOLLOWS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_UPDATE_FOLLOWS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message.split(',').join(' ')
          : error.message,
    });
  }
};

export const unfollowProfile = (profile, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROFILE_UPDATE_FOLLOWS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/v1/profiles/unfollow/${id}`, profile, config);

    dispatch({
      type: PROFILE_UPDATE_FOLLOWS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_UPDATE_FOLLOWS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message.split(',').join(' ')
          : error.message,
    });
  }
};

export const listGithubRepos = (username) => async (dispatch) => {
  try {
    dispatch({
      type: PROFILE_LIST_GITHUB_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/profiles/github/${username}`);

    dispatch({
      type: PROFILE_LIST_GITHUB_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_LIST_GITHUB_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message.split(',').join(' ')
          : error.message,
    });
  }
};
