import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_ERROR } from './types';

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
