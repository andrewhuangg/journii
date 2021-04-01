import { CREATE_USER, LOGIN_USER, LOGOUT_USER, DESTROY_USER } from '../../actions/types';

const initialState = {
  userInfo: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_USER:
    case LOGIN_USER:
      return {
        ...state,
        userInfo: payload,
      };

    case LOGOUT_USER:
    case DESTROY_USER:
      return {};

    default:
      return state;
  }
};
