import {
  PROFILE_CREATE_REQUEST,
  PROFILE_CREATE_SUCCESS,
  PROFILE_CREATE_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_DETAILS_REQUEST,
  PROFILE_DETAILS_SUCCESS,
  PROFILE_DETAILS_FAIL,
  PROFILE_DETAILS_RESET,
  PROFILE_LIST_REQUEST,
  PROFILE_LIST_SUCCESS,
  PROFILE_LIST_FAIL,
  PROFILE_LIST_RESET,
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

export const profileDetailsReducer = (state = { profile: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PROFILE_DETAILS_SUCCESS:
      return { loading: false, profile: payload };
    case PROFILE_DETAILS_FAIL:
      return { loading: false, error: payload };
    case PROFILE_DETAILS_RESET:
      return {
        profile: {},
      };
    default:
      return state;
  }
};

export const profileUpdateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_UPDATE_REQUEST:
      return { loading: true };
    case PROFILE_UPDATE_SUCCESS:
      return { loading: false, profileInfo: payload, success: true };
    case PROFILE_UPDATE_FAIL:
      return { loading: false, error: payload };
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
      return { loading: false, profiles: payload.data };
    case PROFILE_LIST_FAIL:
      return { loading: false, error: payload };
    case PROFILE_LIST_RESET:
      return { profiles: [] };
    default:
      return state;
  }
};
