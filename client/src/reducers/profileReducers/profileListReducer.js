import { FETCH_PROFILE_LIST, FETCH_PROFILE_FOLLOWERS } from '../../actions/types';

const initialState = {
  profiles: [],
  profilesFollowed: [],
  loading: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_PROFILE_LIST:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };

    case FETCH_PROFILE_FOLLOWERS:
      return {
        ...state,
        profilesFollowed: payload,
        loading: false,
      };

    default:
      return state;
  }
};
