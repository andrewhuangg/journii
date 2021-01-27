import {
  PROFILE_CREATE_REQUEST,
  PROFILE_CREATE_SUCCESS,
  PROFILE_CREATE_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_RESET,
  PROFILE_DETAILS_REQUEST,
  PROFILE_DETAILS_SUCCESS,
  PROFILE_DETAILS_FAIL,
  PROFILE_DETAILS_RESET,
  PROFILE_LIST_REQUEST,
  PROFILE_LIST_SUCCESS,
  PROFILE_LIST_FAIL,
  PROFILE_LIST_RESET,
  PROFILE_UPDATE_FOLLOWS_REQUEST,
  PROFILE_UPDATE_FOLLOWS_SUCCESS,
  PROFILE_UPDATE_FOLLOWS_FAIL,
  PROFILE_UPDATE_EXPERIENCES_REQUEST,
  PROFILE_UPDATE_EXPERIENCES_SUCCESS,
  PROFILE_UPDATE_EXPERIENCES_FAIL,
  PROFILE_UPDATE_PROJECTS_REQUEST,
  PROFILE_UPDATE_PROJECTS_SUCCESS,
  PROFILE_UPDATE_PROJECTS_FAIL,
  PROFILE_LIST_GITHUB_REQUEST,
  PROFILE_LIST_GITHUB_SUCCESS,
  PROFILE_LIST_GITHUB_FAIL,
  PROFILE_UPDATE_EXPERIENCES_RESET,
  PROFILE_UPDATE_PROJECTS_RESET,
  PROFILE_DELETE_REQUEST,
  PROFILE_DELETE_SUCCESS,
  PROFILE_DELETE_FAIL,
} from '../actions/types';

export const profileCreateReducer = (state = {}, action) => {
  const { payload, type } = action;
  switch (type) {
    case PROFILE_CREATE_REQUEST:
      return {
        loading: true,
      };
    case PROFILE_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        profileInfo: payload,
      };
    case PROFILE_CREATE_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const profileDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_DELETE_REQUEST:
      return { loading: true };
    case PROFILE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PROFILE_DELETE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const profileDetailsReducer = (
  state = {
    profile: {
      follows: [],
      projects: [],
      experiences: [],
    },
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PROFILE_DETAILS_SUCCESS:
      return { loading: false, profile: payload };
    case PROFILE_DETAILS_FAIL:
      return { loading: false, error: payload };
    case PROFILE_DETAILS_RESET:
      return {
        profile: null,
      };

    case PROFILE_UPDATE_FOLLOWS_REQUEST:
      return { loading: true, ...state };
    case PROFILE_UPDATE_FOLLOWS_SUCCESS:
      return { loading: false, profile: payload, success: true };
    case PROFILE_UPDATE_FOLLOWS_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const profileUpdateReducer = (state = { profile: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_UPDATE_REQUEST:
      return { loading: true };
    case PROFILE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PROFILE_UPDATE_FAIL:
      return { loading: false, error: payload };
    case PROFILE_UPDATE_RESET:
      return { profile: {} };
    default:
      return state;
  }
};

export const profileListReducer = (state = { profiles: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_LIST_REQUEST:
      return { loading: true, profiles: [] };
    case PROFILE_LIST_SUCCESS:
      // return { loading: false, profiles: payload.data };
      return { loading: false, profiles: payload };
    case PROFILE_LIST_FAIL:
      return { loading: false, error: payload };
    case PROFILE_LIST_RESET:
      return { profiles: [] };
    default:
      return state;
  }
};

export const profileExperienceReducer = (state = { experiences: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_UPDATE_EXPERIENCES_REQUEST:
      return { loading: true };
    case PROFILE_UPDATE_EXPERIENCES_SUCCESS:
      return { loading: false, experiences: payload, success: true };
    case PROFILE_UPDATE_EXPERIENCES_FAIL:
      return { loading: false, error: payload };
    case PROFILE_UPDATE_EXPERIENCES_RESET:
      return {};
    default:
      return state;
  }
};

export const profileProjectReducer = (state = { projects: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_UPDATE_PROJECTS_REQUEST:
      return { loading: true };
    case PROFILE_UPDATE_PROJECTS_SUCCESS:
      return { loading: false, projects: payload, success: true };
    case PROFILE_UPDATE_PROJECTS_FAIL:
      return { loading: false, error: payload };
    case PROFILE_UPDATE_PROJECTS_RESET:
      return {};
    default:
      return state;
  }
};

export const profileGithubReducer = (state = { github: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_LIST_GITHUB_REQUEST:
      return { loading: true };
    case PROFILE_LIST_GITHUB_SUCCESS:
      return { loading: false, github: payload, success: true };
    case PROFILE_LIST_GITHUB_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
