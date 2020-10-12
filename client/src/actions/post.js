import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, UPDATE_FOLLOWS } from './types';

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
  } catch (err) {}
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
  } catch (err) {}
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
  } catch (err) {}
};
