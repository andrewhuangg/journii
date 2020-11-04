import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import AlertMessage from '../layout/AlertMessage';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { Image, Button } from 'react-bootstrap';
import Moment from 'react-moment';
import {
  listPostDetails,
  likePost,
  unlikePost,
  followPost,
  unfollowPost,
  deletePost,
} from '../../actions/postAction';
import { POST_DETAILS_RESET } from '../../actions/types';

const PostShow = ({ match }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postDetails = useSelector((state) => state.postDetails);
  const { loading: loadingDetails, error: errorDetails, post } = postDetails;

  const postLikes = useSelector((state) => state.postLikes);
  const { success: successLikes, loading: loadingLikes, error: errorLikes, likes } = postLikes;

  const postFollows = useSelector((state) => state.postFollows);
  const {
    success: successFollows,
    loading: loadingFollows,
    error: errorFollows,
    follows,
  } = postFollows;

  const postDelete = useSelector((state) => state.postDelete);
  const { success: successDelete, error: errorDelete } = postDelete;

  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(listPostDetails(match.params.id));
    if (successLikes || successFollows) setMessage(null);
    if (successDelete) dispatch({ type: POST_DETAILS_RESET });
  }, [dispatch, match, likes, follows, successFollows, successLikes]);

  const postLikeHandler = (post, id) => {
    dispatch(likePost(post, id));
    if (errorLikes) setMessage(errorLikes);
  };

  const postUnlikeHandler = (post, id) => {
    dispatch(unlikePost(post, id));
    if (errorLikes) setMessage(errorLikes);
  };

  const postFollowHandler = (post, id) => {
    dispatch(followPost(post, id));
    if (errorFollows) setMessage(errorFollows);
  };

  const postUnfollowHandler = (post, id) => {
    dispatch(unfollowPost(post, id));
    if (errorFollows) setMessage(errorFollows);
  };

  const deleteHandler = (id) => {
    dispatch(deletePost(id));
    if (errorDelete) setMessage(errorDelete);
  };

  return (
    <>
      <Link to='/posts'>Back to Posts</Link>
      {loadingDetails && <Spinner />}
      {loadingLikes && <Spinner />}
      {message && <AlertMessage variant='danger'>{message}</AlertMessage>}
      {errorDetails && <AlertMessage variant='danger'>{errorDetails}</AlertMessage>}
      <div>
        {post.image && <Image src={post.image} alt={post.title} fluid />}
        <h6>{post.title}</h6>
        <p>{post.text}</p>
        <p>
          Publisher <Link to={`profiles/${post.user}`}>{post.name}</Link>
        </p>
        <p>
          Posted on <Moment format='MM/DD/YYYY'>{post.createdAt}</Moment>
        </p>
        <div>likes {post.likes.length > 0 && <span>{post.likes.length}</span>}</div>
        <div>Followers {post.follows.length > 0 && <span>{post.follows.length}</span>}</div>
        <div onClick={() => postLikeHandler(post, post._id)}>like post</div>
        <div onClick={() => postUnlikeHandler(post, post._id)}>unlike post</div>
        <div onClick={() => postFollowHandler(post, post._id)}>follow post</div>
        <div onClick={() => postUnfollowHandler(post, post._id)}>unfollow post</div>
        {post.user && userInfo.id === post.user._id && (
          <Button onClick={() => deleteHandler(post._id)}>
            <i className='fas fa-trash'></i>
          </Button>
        )}
      </div>
    </>
  );
};

export default PostShow;
