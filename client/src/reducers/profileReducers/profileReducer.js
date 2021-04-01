import {
  CREATE_PROFILE,
  FETCH_PROFILE_DETAILS,
  FETCH_GITHUB_LIST,
  UPDATE_PROFILE_FOLLOWS,
  UPDATE_PROFILE_EXPERIENCE,
  UPDATE_PROFILE_PROJECT,
  DESTROY_PROFILE,
  RESET_PROFILE_DETAILS,
  RESET_POST_DETAILS,
} from '../../actions/types';

const initialState = {
  profile: {
    experiences: [],
    projects: [],
    follows: [],
    social: {},
  },
  githubList: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PROFILE:
    case FETCH_PROFILE_DETAILS:
      return { ...state, profile: payload };

    case UPDATE_PROFILE_FOLLOWS:
      return {
        ...state,
        profile: { ...state.profile, follows: payload },
      };

    case UPDATE_PROFILE_EXPERIENCE:
      return {
        ...state,
        profile: { ...state.profile, experiences: payload },
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

    case DESTROY_PROFILE:
    case RESET_POST_DETAILS:
      return {};

    default:
      return state;
  }
};
