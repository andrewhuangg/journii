import { FETCH_PROFILE_LIST, FETCH_PROFILE_FOLLOWERS } from '../../actions/types';

const initialState = {
  profiles: [],
  loading: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_PROFILE_LIST:
    case FETCH_PROFILE_FOLLOWERS:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    default:
      return state;
  }
};
