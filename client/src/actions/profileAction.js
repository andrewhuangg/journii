import axios from 'axios';
import {
  FETCH_PROFILE_LIST,
  FETCH_PROFILE_DETAILS,
  CREATE_PROFILE,
  DESTROY_PROFILE,
  UPDATE_PROFILE_EXPERIENCE,
  UPDATE_PROFILE_PROJECT,
  UPDATE_PROFILE_FOLLOWS,
  FETCH_GITHUB_LIST,
  FETCH_PROFILE_FOLLOWERS,
  ERROR_FETCH_GITHUB,
} from './types';

export const listFollowedProfiles = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/users/${userId}/profiles/followedprofiles`);

    dispatch({
      type: FETCH_PROFILE_FOLLOWERS,
      payload: data,
    });
    return Promise.resolve(data);
  } catch (error) {
    console.log(error);
    // dispatch({
    //   type: PROFILE_LIST_FOLLOWED_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message.split(',').join(' ')
    //       : error.message,
    // });
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
    console.log(error);
    // dispatch({
    //   type: PROFILE_DETAILS_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message.split(',').join(' ')
    //       : error.message,
    // });
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
    console.log(error);
    // dispatch({
    //   type: PROFILE_DETAILS_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message.split(',').join(' ')
    //       : error.message,
    // });
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
    console.log(error);
    // dispatch({
    //   type: PROFILE_LIST_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message.split(',').join(' ')
    //       : error.message,
    // });
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
    // dispatch({
    //   type: PROFILE_CREATE_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message.split(',').join(' ')
    //       : error.message,
    // });
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
    console.log(error);
    // dispatch({
    //   type: PROFILE_UPDATE_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message.split(',').join(' ')
    //       : error.message,
    // });
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
    console.log(error);
    // dispatch({
    //   type: PROFILE_DELETE_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message.split(',').join(' ')
    //       : error.message,
    // });
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
  } catch (error) {
    console.log(error);
    //   dispatch({
    //     type: PROFILE_UPDATE_EXPERIENCES_FAIL,
    //     payload:
    //       error.response && error.response.data.message
    //         ? error.response.data.message.split(',').join(' ')
    //         : error.message,
    //   });
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
    console.log(error);
    // dispatch({
    //   type: PROFILE_UPDATE_EXPERIENCES_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message.split(',').join(' ')
    //       : error.message,
    // });
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
    console.log(error);
    // dispatch({
    //   type: PROFILE_UPDATE_PROJECTS_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message.split(',').join(' ')
    //       : error.message,
    // });
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
    console.log(error);
    // dispatch({
    //   type: PROFILE_UPDATE_PROJECTS_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message.split(',').join(' ')
    //       : error.message,
    // });
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
    console.log(error);
    // dispatch({
    //   type: PROFILE_UPDATE_FOLLOWS_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message.split(',').join(' ')
    //       : error.message,
    // });
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
    console.log(error);
    // dispatch({
    //   type: PROFILE_UPDATE_FOLLOWS_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message.split(',').join(' ')
    //       : error.message,
    // });
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
  }
};
