import { POST_LIST_REQUEST, POST_LIST_SUCCESS, POST_LIST_FAIL } from '../actions/types';

export const postListReducer = (state = { posts: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case POST_LIST_REQUEST:
      return { loading: true, posts: [] };
    case POST_LIST_SUCCESS:
      return { loading: false, posts: payload };
    case POST_LIST_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
