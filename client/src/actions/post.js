import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  UPDATE_FOLLOWS,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './types';

export const getPosts = (userId) => async (dispatch) => {
  try {
    const res = !userId
      ? await axios.get('/api/v1/posts')
      : await axios.get(`/api/v1/users/${userId}/posts`);

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};

export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/v1/posts/like/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: {
        postId,
        likes: res.data,
      },
    });
  } catch (err) {}
};

export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/v1/posts/unlike/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: {
        postId,
        likes: res.data,
      },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};

export const followPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/v1/posts/follow/${postId}`);
    dispatch({
      type: UPDATE_FOLLOWS,
      payload: {
        postId,
        follows: res.data,
      },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};

export const unFollowPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/v1/posts/unfollow/${postId}`);
    dispatch({
      type: UPDATE_FOLLOWS,
      payload: {
        postId,
        follows: res.data,
      },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/posts/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: postId,
    });
    dispatch(setAlert('Post removed'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};

export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(`/api/v1/posts`, formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert('Post created'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};

export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(`/api/v1/posts/comment/${postId}`, formData, config);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert('Comment added'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert('Comment removed'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};
