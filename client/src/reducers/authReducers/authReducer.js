import {
  CREATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
  DESTROY_USER,
  FORGOT_PASSWORD,
} from '../../actions/types';

const initialState = {
  userInfo: {},
  passwordResponse: {},
  loading: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_USER:
    case LOGIN_USER:
      return {
        ...state,
        userInfo: payload,
        loading: false,
      };

    case FORGOT_PASSWORD:
      return {
        ...state,
        passwordResponse: payload,
        loading: false,
      };

    case LOGOUT_USER:
    case DESTROY_USER:
      return {};

    default:
      return state;
  }
};
