import axios from 'axios';
import {
  FETCH_POST_LIST,
  FETCH_POST_DETAILS,
  UPDATE_POST_LIKES,
  UPDATE_POST_FOLLOWS,
  DESTROY_POST_REVIEW,
  CREATE_POST_REVIEW,
  DESTROY_POST_COMMENT,
  CREATE_POST_COMMENT,
  DESTROY_POST,
  CREATE_POST,
  FETCH_FOLLOWED_POSTS,
  FETCH_LIKED_POSTS,
  FETCH_TOP_POSTS,
  FETCH_LATEST_POSTS,
  FETCH_USER_POSTS,
} from './types';
import { setAlert } from './alertAction';

export const listFollowedPosts = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/users/${userId}/posts/followedposts`);

    dispatch({
      type: FETCH_FOLLOWED_POSTS,
      payload: data,
    });
    return Promise.resolve(data);
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const listLikedPosts = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/users/${userId}/posts/likedposts`);

    dispatch({
      type: FETCH_LIKED_POSTS,
      payload: data,
    });
    return Promise.resolve(data);
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const listLatestPosts = (limit, keyword = '') => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/posts/latest/${limit}?keyword=${keyword}`);

    dispatch({
      type: FETCH_LATEST_POSTS,
      payload: data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const listTopPosts = (limit) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/posts/top/${limit}`);

    dispatch({
      type: FETCH_TOP_POSTS,
      payload: data,
    });
    return Promise.resolve(data);
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const listPosts = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/v1/posts');

    dispatch({
      type: FETCH_POST_LIST,
      payload: data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const listUserPosts = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/posts/users/${userId}`);

    dispatch({
      type: FETCH_USER_POSTS,
      payload: data,
    });
    return Promise.resolve(data);
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const listPostDetails = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/posts/${id}`);
    dispatch({
      type: FETCH_POST_DETAILS,
      payload: data,
    });
    return Promise.resolve(data);
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const likePost = (post, id) => async (dispatch, getState) => {
  try {
    const {
      auth: {
        userAuth: { userInfo },
      },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/v1/posts/like/${id}`, post, config);

    dispatch({
      type: UPDATE_POST_LIKES,
      payload: data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const unlikePost = (post, id) => async (dispatch, getState) => {
  try {
    const {
      auth: {
        userAuth: { userInfo },
      },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/v1/posts/unlike/${id}`, post, config);

    dispatch({
      type: UPDATE_POST_LIKES,
      payload: data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const followPost = (post, id) => async (dispatch, getState) => {
  try {
    const {
      auth: {
        userAuth: { userInfo },
      },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/v1/posts/follow/${id}`, post, config);

    dispatch({
      type: UPDATE_POST_FOLLOWS,
      payload: data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const unfollowPost = (post, id) => async (dispatch, getState) => {
  try {
    const {
      auth: {
        userAuth: { userInfo },
      },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/v1/posts/unfollow/${id}`, post, config);

    dispatch({
      type: UPDATE_POST_FOLLOWS,
      payload: data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const deletePost = (id) => async (dispatch, getState) => {
  try {
    const {
      auth: {
        userAuth: { userInfo },
      },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/v1/posts/${id}`, config);

    dispatch({
      type: DESTROY_POST,
    });

    return Promise.resolve();
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const createPost = (post) => async (dispatch, getState) => {
  try {
    const {
      auth: {
        userAuth: { userInfo },
      },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/v1/posts`, post, config);

    dispatch({
      type: CREATE_POST,
      payload: data,
    });

    return Promise.resolve(data);
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const updatePost = (post, id) => async (dispatch, getState) => {
  try {
    const {
      auth: {
        userAuth: { userInfo },
      },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/v1/posts/${id}`, post, config);
    dispatch({
      type: FETCH_POST_DETAILS,
      payload: data,
    });

    return Promise.resolve(data);
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const createPostComment = (postId, comment) => async (dispatch, getState) => {
  try {
    const {
      auth: {
        userAuth: { userInfo },
      },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/v1/posts/comment/${postId}`, comment, config);

    dispatch({
      type: CREATE_POST_COMMENT,
      payload: data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const deletePostComment = (postId, commentId) => async (dispatch, getState) => {
  try {
    const {
      auth: {
        userAuth: { userInfo },
      },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/v1/posts/comment/${postId}/${commentId}`, config);

    dispatch({
      type: DESTROY_POST_COMMENT,
      payload: data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const createPostReview = (postId, review) => async (dispatch, getState) => {
  try {
    const {
      auth: {
        userAuth: { userInfo },
      },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/v1/posts/review/${postId}`, review, config);

    dispatch({
      type: CREATE_POST_REVIEW,
      payload: data,
    });

    return Promise.resolve(data);
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

export const deletePostReview = (postId, reviewId) => async (dispatch, getState) => {
  try {
    const {
      auth: {
        userAuth: { userInfo },
      },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/v1/posts/review/${postId}/${reviewId}`, config);

    dispatch({
      type: DESTROY_POST_REVIEW,
      payload: data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};
