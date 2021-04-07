import {
  RESET_POST_DETAILS,
  FETCH_POST_DETAILS,
  CREATE_POST,
  UPDATE_POST_LIKES,
  UPDATE_POST_FOLLOWS,
  DESTROY_POST,
  CREATE_POST_COMMENT,
  CREATE_POST_REVIEW,
  DESTROY_POST_COMMENT,
  DESTROY_POST_REVIEW,
} from '../../actions/types';

const initialState = {
  post: {
    comments: [],
    reviews: [],
    likes: [],
    follows: [],
  },
  loading: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_POST:
    case FETCH_POST_DETAILS:
      return { ...state, post: payload, loading: false };

    case UPDATE_POST_LIKES:
      return {
        ...state,
        post: { ...state.post, likes: payload },
      };

    case UPDATE_POST_FOLLOWS:
      return {
        ...state,
        post: { ...state.post, follows: payload },
      };

    case CREATE_POST_COMMENT:
    case DESTROY_POST_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };

    case CREATE_POST_REVIEW:
    case DESTROY_POST_REVIEW:
      return {
        ...state,
        post: { ...state.post, reviews: payload },
        loading: false,
      };

    case DESTROY_POST:
    case RESET_POST_DETAILS:
      return {};

    default:
      return state;
  }
};
