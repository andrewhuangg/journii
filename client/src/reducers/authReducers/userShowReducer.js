import { FETCH_USER_DETAILS, FETCH_OWN_DETAILS, RESET_USER_DETAILS } from '../../actions/types';

const initialState = {
  user: {},
  currentUser: {
    ownProfile: {},
  },
  loading: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_OWN_DETAILS:
      return {
        ...state,
        currentUser: payload,
        loading: false,
      };

    case FETCH_USER_DETAILS:
      return {
        ...state,
        user: payload,
        loading: false,
      };

    case RESET_USER_DETAILS:
      return {};

    default:
      return state;
  }
};
