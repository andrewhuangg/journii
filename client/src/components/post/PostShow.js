import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Image, Button } from 'react-bootstrap';
import {
  listPostDetails,
  likePost,
  unlikePost,
  followPost,
  unfollowPost,
  deletePost,
  deletePostComment,
} from '../../actions/postAction';
import { POST_DETAILS_RESET } from '../../actions/types';
import Spinner from '../layout/Spinner';
import AlertMessage from '../layout/AlertMessage';
import CreateComment from './CreateComment';
import CommentItem from './CommentItem';
import Moment from 'react-moment';
import Rating from '../layout/Rating';
import CreateReview from './CreateReview';
import Meta from '../layout/Meta';

const PostShow = ({ match, history }) => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postDetails = useSelector((state) => state.postDetails);
  const { loading: loadingDetails, error: errorDetails, post } = postDetails;

  const postLikes = useSelector((state) => state.postLikes);
  const { success: successLikes, loading: loadingLikes, error: errorLikes } = postLikes;

  const postFollows = useSelector((state) => state.postFollows);
  const { success: successFollows, loading: loadingFollows, error: errorFollows } = postFollows;

  const postDelete = useSelector((state) => state.postDelete);
  const { success: successDelete, error: errorDelete } = postDelete;

  const postComment = useSelector((state) => state.postComment);
  const {
    loading: loadingCommentCreate,
    loading: loadingCommentDelete,
    error: errorCommentDelete,
    success: successCommentCreate,
    success: successCommentDelete,
  } = postComment;

  const postReviewCreate = useSelector((state) => state.postReviewCreate);
  const { success: successReview } = postReviewCreate;

  useEffect(() => {
    if (!post._id || post._id !== match.params.id) {
      dispatch(listPostDetails(match.params.id));
    }
    if (
      successLikes ||
      successFollows ||
      successCommentCreate ||
      successCommentDelete ||
      successReview
    ) {
      setMessage(null);
      dispatch(listPostDetails(match.params.id));
    }
    if (successDelete) {
      dispatch({ type: POST_DETAILS_RESET });
      history.push('/posts');
    }
  }, [
    dispatch,
    match,
    successFollows,
    successLikes,
    successDelete,
    history,
    post._id,
    successCommentCreate,
    successCommentDelete,
    successReview,
  ]);

  const postLikeHandler = (post, id) => {
    if (errorLikes) setMessage(errorLikes);
    dispatch(likePost(post, id));
  };

  const postUnlikeHandler = (post, id) => {
    if (errorLikes) setMessage(errorLikes);
    dispatch(unlikePost(post, id));
  };

  const postFollowHandler = (post, id) => {
    if (errorFollows) setMessage(errorFollows);
    dispatch(followPost(post, id));
  };

  const postUnfollowHandler = (post, id) => {
    if (errorFollows) setMessage(errorFollows);
    dispatch(unfollowPost(post, id));
  };

  const deleteHandler = (id) => {
    if (errorDelete) setMessage(errorDelete);
    dispatch(deletePost(id));
  };

  const deleteCommentHandler = (postId, commentId) => {
    if (errorCommentDelete) setMessage(errorCommentDelete);
    dispatch(deletePostComment(postId, commentId));
  };

  const unsplashURL = 'https://source.unsplash.com/collection/289662/';

  const getRandomNumber = () => {
    const num = Math.floor(Math.random() * 10) + 900;
    return num;
  };
  const getRandomSize = () => {
    return `${getRandomNumber()}x${getRandomNumber()}`;
  };

  const unsplashImage = `${unsplashURL}${getRandomSize()}`;

  return (
    <>
      <Meta title={`journii | ${post.title}`} />
      <Link to='/posts'>Back to Posts</Link>
      {loadingDetails && <Spinner />}
      {loadingFollows && <Spinner />}
      {loadingLikes && <Spinner />}
      {loadingCommentCreate && <Spinner />}
      {loadingCommentDelete && <Spinner />}
      {message && <AlertMessage variant='danger'>{message}</AlertMessage>}
      {errorDetails && <AlertMessage variant='danger'>{errorDetails}</AlertMessage>}

      <div className='postShow'>
        <div className='postShow__left-slide'>
          <CreateReview postId={post._id} />
          <div className='postShow__reviews'>
            {post.reviews.map((review) => (
              <div key={review._id}>
                <p>review: {review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='postShow__right-slide'>
          <img
            src={post.image ? post.image : unsplashImage}
            alt={post.title}
            className='postShow__image'
          />
          <div className='postShow__header'>
            <h6>{post.title}</h6>
            <p>{post.text}</p>
            <p>
              Publisher <Link to={`profiles/${post.user}`}>{post.name}</Link>
            </p>
            <p>
              Posted on <Moment format='MM/DD/YYYY'>{post.createdAt}</Moment>
            </p>
          </div>
          <div className='postShow__stats'>
            <div>likes {post.likes.length > 0 && <span>{post.likes.length}</span>}</div>
            <div>Followers {post.follows.length > 0 && <span>{post.follows.length}</span>}</div>
          </div>
          <div className='postShow__cta'>
            <div onClick={() => postLikeHandler(post, post._id)} className='postShow__like'>
              like post
            </div>
            <div onClick={() => postUnlikeHandler(post, post._id)} className='postShow__unlike'>
              unlike post
            </div>
            {post.user && userInfo.id !== post.user._id && (
              <>
                <div onClick={() => postFollowHandler(post, post._id)} className='postShow__follow'>
                  follow post
                </div>
                <div
                  onClick={() => postUnfollowHandler(post, post._id)}
                  className='postShow__unfollow'
                >
                  unfollow post
                </div>
              </>
            )}
            {post.user && userInfo.id === post.user._id && (
              <button onClick={() => deleteHandler(post._id)} className='postShow__delete'>
                <i className='fas fa-trash'></i>
              </button>
            )}
          </div>
          <CreateComment postId={post._id} />
          <div className='comments'>
            {post.comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={post._id}
                deleteCommentHandler={deleteCommentHandler}
                userInfo={userInfo}
              />
            ))}
          </div>
        </div>

        <div className='postShow__buttons'>
          <button className='postShow__down-button'>
            <i className='fas fa-arrow-down' />
          </button>
          <button className='postShow__up-button'>
            <i className='fas fa-arrow-up' />
          </button>
        </div>
      </div>
    </>
  );
};

export default PostShow;
