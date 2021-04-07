import {
  RESET_POST_LIST,
  FETCH_POST_LIST,
  FETCH_FOLLOWED_POSTS,
  FETCH_LIKED_POSTS,
  FETCH_LATEST_POSTS,
  FETCH_TOP_POSTS,
  FETCH_USER_POSTS,
} from '../../actions/types';

const initialState = {
  posts: [],
  userPosts: [],
  followedPosts: [],
  likedPosts: [],
  latestPosts: [],
  topPosts: [],
  pages: 0,
  page: 0,
  loading: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_POST_LIST:
      return {
        ...state,
        posts: payload.posts,
        pages: payload.pages,
        page: payload.page,
        loading: false,
      };

    case FETCH_USER_POSTS:
      return {
        ...state,
        userPosts: payload,
        loading: false,
      };

    case FETCH_FOLLOWED_POSTS:
      return {
        ...state,
        followedPosts: payload,
        loading: false,
      };

    case FETCH_LIKED_POSTS:
      return {
        ...state,
        likedPosts: payload,
        loading: false,
      };

    case FETCH_LATEST_POSTS:
      return {
        ...state,
        latestPosts: payload,
        loading: false,
      };

    case FETCH_TOP_POSTS:
      return {
        ...state,
        topPosts: payload,
        loading: false,
      };

    case RESET_POST_LIST:
      return {};

    default:
      return state;
  }
};
