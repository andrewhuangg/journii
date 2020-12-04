import axios from 'axios';
import {
  POST_LIST_SUCCESS,
  POST_LIST_REQUEST,
  POST_LIST_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
  POST_CREATE_COMMENT_REQUEST,
  POST_CREATE_COMMENT_SUCCESS,
  POST_CREATE_COMMENT_FAIL,
  POST_CREATE_REVIEW_REQUEST,
  POST_CREATE_REVIEW_SUCCESS,
  POST_CREATE_REVIEW_FAIL,
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
  POST_DELETE_COMMENT_REQUEST,
  POST_DELETE_COMMENT_SUCCESS,
  POST_DELETE_COMMENT_FAIL,
  POST_TOP_REQUEST,
  POST_TOP_SUCCESS,
  POST_TOP_FAIL,
} from './types';

export const listTopPosts = () => async (dispatch) => {
  try {
    dispatch({ type: POST_TOP_REQUEST });

    const { data } = await axios.get('/api/v1/posts/top');

    dispatch({
      type: POST_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message.split(',').join(' ')
          : error.message,
    });
  }
};

export const listPosts = (keyword = '', pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: POST_LIST_REQUEST });

    const { data } = await axios.get(`/api/v1/posts?keyword=${keyword}&pageNumber=${pageNumber}`);

    dispatch({
      type: POST_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message.split(',').join(' ')
          : error.message,
    });
  }
};

export const listPostDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/v1/posts/${id}`, config);
    dispatch({
      type: POST_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message.split(',').join(' ')
          : error.message,
    });
  }
};

export const likePost = (post, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_UPDATE_LIKES_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/v1/posts/like/${id}`, post, config);

    dispatch({
      type: POST_UPDATE_LIKES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_UPDATE_LIKES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message.split(',').join(' ')
          : error.message,
    });
  }
};

export const unlikePost = (post, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_UPDATE_LIKES_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/v1/posts/unlike/${id}`, post, config);

    dispatch({
      type: POST_UPDATE_LIKES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_UPDATE_LIKES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message.split(',').join(' ')
          : error.message,
    });
  }
};

export const followPost = (post, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_UPDATE_FOLLOWS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/v1/posts/follow/${id}`, post, config);

    dispatch({
      type: POST_UPDATE_FOLLOWS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_UPDATE_FOLLOWS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message.split(',').join(' ')
          : error.message,
    });
  }
};

export const unfollowPost = (post, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_UPDATE_FOLLOWS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/v1/posts/unfollow/${id}`, post, config);

    dispatch({
      type: POST_UPDATE_FOLLOWS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_UPDATE_FOLLOWS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message.split(',').join(' ')
          : error.message,
    });
  }
};

export const deletePost = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/v1/posts/${id}`, config);

    dispatch({
      type: POST_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: POST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message.split(',').join(' ')
          : error.message,
    });
  }
};

export const createPost = (post) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/v1/posts`, post, config);

    dispatch({
      type: POST_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message.split(',').join(' ')
          : error.message,
    });
  }
};

export const updatePost = (post, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/v1/posts/${id}`, post, config);
    dispatch({
      type: POST_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message.split(',').join(' ')
          : error.message,
    });
  }
};

export const createPostComment = (postId, comment) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_CREATE_COMMENT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/v1/posts/comment/${postId}`, comment, config);

    dispatch({
      type: POST_CREATE_COMMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_CREATE_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message.split(',').join(' ')
          : error.message,
    });
  }
};

export const deletePostComment = (postId, commentId) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_DELETE_COMMENT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/v1/posts/comment/${postId}/${commentId}`, config);

    dispatch({
      type: POST_DELETE_COMMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_DELETE_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message.split(',').join(' ')
          : error.message,
    });
  }
};

export const createPostReview = (postId, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_CREATE_REVIEW_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/v1/posts/review/${postId}`, review, config);

    dispatch({
      type: POST_CREATE_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message.split(',').join(' ')
          : error.message,
    });
  }
};
