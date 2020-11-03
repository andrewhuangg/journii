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

// export const followProfile = (id) => async (dispatch) => {
//   try {
//     const res = await axios.get(`/api/v1/profiles/follow/${id}`);
//     dispatch({
//       type: FOLLOW_PROFILE,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: err,
//     });
//   }
// };

// export const unFollowProfile = (id) => async (dispatch) => {
//   try {
//     const res = await axios.get(`/api/v1/profiles/unfollow/${id}`);
//     dispatch({
//       type: UNFOLLOW_PROFILE,
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
    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data,
    });
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

// export const addExperience = (formData, history) => async (dispatch) => {
//   try {
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     };
//     const res = await axios.put(`/api/v1/profiles/experience`, formData, config);

//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data,
//     });

//     history.push('./dashboard');
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: err,
//     });
//   }
// };

// export const deleteExperience = (id) => async (dispatch) => {
//   try {
//     const res = await axios.delete(`/api/v1/profiles/experience/${id}`);
//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: err,
//     });
//   }
// };

// export const deleteProfile = (id) => async (dispatch) => {
//   try {
//     await axios.delete(`/api/v1/profiles/${id}`);
//     dispatch({ type: DELETE_PROFILE });
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: err,
//     });
//   }
// };

// export const getGithubRepos = (username) => async (dispatch) => {
//   try {
//     const res = await axios.get(`/api/v1/profiles/github/${username}`);

//     dispatch({
//       type: GET_REPOS,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: err,
//     });
//   }
// };
