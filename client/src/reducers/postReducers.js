import {
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
  POST_CREATE_RESET,
  POST_CREATE_COMMENT_REQUEST,
  POST_CREATE_COMMENT_SUCCESS,
  POST_CREATE_COMMENT_FAIL,
  POST_CREATE_REVIEW_REQUEST,
  POST_CREATE_REVIEW_SUCCESS,
  POST_CREATE_REVIEW_FAIL,
  POST_CREATE_REVIEW_RESET,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAIL,
  POST_UPDATE_LIKES_REQUEST,
  POST_UPDATE_LIKES_SUCCESS,
  POST_UPDATE_LIKES_FAIL,
  POST_UPDATE_FOLLOWS_REQUEST,
  POST_UPDATE_FOLLOWS_SUCCESS,
  POST_UPDATE_FOLLOWS_FAIL,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
  POST_UPDATE_FAIL,
  POST_UPDATE_RESET,
  POST_DETAILS_RESET,
  POST_LIST_RESET,
  POST_DELETE_COMMENT_REQUEST,
  POST_DELETE_COMMENT_SUCCESS,
  POST_DELETE_COMMENT_FAIL,
  POST_TOP_REQUEST,
  POST_TOP_SUCCESS,
  POST_TOP_FAIL,
} from '../actions/types';

export const postListReducer = (state = { posts: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case POST_LIST_REQUEST:
      return { loading: true, posts: [] };
    case POST_LIST_SUCCESS:
      return { loading: false, posts: payload.posts, pages: payload.pages, page: payload.page };
    case POST_LIST_FAIL:
      return { loading: false, error: payload };
    case POST_LIST_RESET:
      return { post: [] };
    default:
      return state;
  }
};

export const postDetailsReducer = (
  state = {
    post: {
      likes: [],
      follows: [],
      comments: [],
      reviews: [],
    },
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case POST_DETAILS_REQUEST:
      return { loading: true, ...state };
    case POST_DETAILS_SUCCESS:
      return { loading: false, post: payload };
    case POST_DETAILS_FAIL:
      return { loading: false, error: payload };
    case POST_DETAILS_RESET:
      return {
        post: {
          likes: [],
          follows: [],
          comments: [],
          reviews: [],
        },
      };
    default:
      return state;
  }
};

export const postCreateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case POST_CREATE_REQUEST:
      return { loading: true };
    case POST_CREATE_SUCCESS:
      return { loading: false, post: payload, success: true };
    case POST_CREATE_FAIL:
      return { loading: false, error: payload };
    case POST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const postUpdateReducer = (state = { post: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case POST_UPDATE_REQUEST:
      return { loading: true };
    case POST_UPDATE_SUCCESS:
      return { loading: false, post: payload, success: true };
    case POST_UPDATE_FAIL:
      return { loading: false, error: payload };
    case POST_UPDATE_RESET:
      return { post: {} };
    default:
      return state;
  }
};

export const postDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case POST_DELETE_REQUEST:
      return { loading: true };
    case POST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case POST_DELETE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const postCommentReducer = (state = { comments: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case POST_CREATE_COMMENT_REQUEST:
      return { loading: true };
    case POST_CREATE_COMMENT_SUCCESS:
      return { loading: false, comments: payload, success: true };
    case POST_CREATE_COMMENT_FAIL:
      return { loading: false, error: payload };

    case POST_DELETE_COMMENT_REQUEST:
      return { loading: true };
    case POST_DELETE_COMMENT_SUCCESS:
      return { loading: false, comments: payload, success: true };
    case POST_DELETE_COMMENT_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const postReviewCreateReducer = (state = { reviews: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case POST_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case POST_CREATE_REVIEW_SUCCESS:
      return { loading: false, reviews: payload, success: true };
    case POST_CREATE_REVIEW_FAIL:
      return { loading: false, error: payload };
    case POST_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const postLikeReducer = (state = { likes: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case POST_UPDATE_LIKES_REQUEST:
      return { loading: true };
    case POST_UPDATE_LIKES_SUCCESS:
      return { loading: false, likes: payload, success: true };
    case POST_UPDATE_LIKES_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const postFollowReducer = (state = { follows: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case POST_UPDATE_FOLLOWS_REQUEST:
      return { loading: true };
    case POST_UPDATE_FOLLOWS_SUCCESS:
      return { loading: false, follows: payload, success: true };
    case POST_UPDATE_FOLLOWS_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const postTopRatedReducer = (state = { posts: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case POST_TOP_REQUEST:
      return { loading: true, posts: [] };
    case POST_TOP_SUCCESS:
      return { loading: false, posts: payload };
    case POST_TOP_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
