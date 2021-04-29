import {
  CREATE_PROFILE,
  FETCH_PROFILE_DETAILS,
  FETCH_GITHUB_LIST,
  UPDATE_PROFILE_FOLLOWS,
  FETCH_PROFILE_EXPERIENCE,
  UPDATE_PROFILE_EXPERIENCE,
  FETCH_PROFILE_PROJECT,
  UPDATE_PROFILE_PROJECT,
  DESTROY_PROFILE,
  RESET_PROFILE_DETAILS,
  ERROR_FETCH_GITHUB,
} from '../../actions/types';

const initialState = {
  profile: {
    experiences: [],
    projects: [],
    follows: [],
    social: {},
  },
  experience: {},
  project: {},
  loading: true,
  githubList: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PROFILE:
    case FETCH_PROFILE_DETAILS:
      return { ...state, profile: payload, loading: false };

    case UPDATE_PROFILE_FOLLOWS:
      return {
        ...state,
        profile: { ...state.profile, follows: payload },
      };

    case FETCH_PROFILE_EXPERIENCE:
      return {
        ...state,
        experience: payload,
      };

    case UPDATE_PROFILE_EXPERIENCE:
      return {
        ...state,
        profile: { ...state.profile, experiences: payload },
      };

    case FETCH_PROFILE_PROJECT:
      return {
        ...state,
        project: payload,
      };

    case UPDATE_PROFILE_PROJECT:
      return {
        ...state,
        profile: { ...state.profile, projects: payload },
      };

    case FETCH_GITHUB_LIST:
      return {
        ...state,
        githubList: payload.data,
      };

    case ERROR_FETCH_GITHUB:
      return {
        ...state,
        githubList: [],
      };

    case DESTROY_PROFILE:
    case RESET_PROFILE_DETAILS:
      return {};

    default:
      return state;
  }
};
