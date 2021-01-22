import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  listPostDetails,
  likePost,
  unlikePost,
  followPost,
  unfollowPost,
  deletePost,
  deletePostComment,
  deletePostReview,
} from '../../actions/postAction';
import { POST_DETAILS_RESET } from '../../actions/types';
import Spinner from '../layout/Spinner';
import AlertMessage from '../layout/AlertMessage';
import CreateComment from './CreateComment';
import CommentItem from './CommentItem';
import CreateReview from './CreateReview';
import ReviewItem from './ReviewItem';
import Moment from 'react-moment';
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

  const postReview = useSelector((state) => state.postReview);
  const {
    success: successReview,
    loading: loadingReviewCreate,
    loading: loadingReviewDelete,
    error: errorReviewDelete,
    success: successReviewDelete,
  } = postReview;

  useEffect(() => {
    if (!post._id || post._id !== match.params.id) {
      dispatch(listPostDetails(match.params.id));
    }
    if (
      successLikes ||
      successFollows ||
      successCommentCreate ||
      successCommentDelete ||
      successReview ||
      successReviewDelete
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
    history,
    successFollows,
    successLikes,
    successDelete,
    post._id,
    successCommentCreate,
    successCommentDelete,
    successReview,
    successReview,
    userInfo,
  ]);

  const postLikeHandler = (post, id) => {
    if (errorLikes) setMessage(errorLikes);
    dispatch(likePost(post, id));
  };

  const postUnlikeHandler = (post, id) => {
    if (errorLikes) setMessage(errorLikes);
    dispatch(unlikePost(post, id));
  };

  const renderCallAction = () => {
    if (!loadingLikes && post.user) {
      return post.likes.map((like) => like.user).includes(userInfo.id) ? (
        <aside className='post-feature__cta'>
          <div className='post-feature__cta-grid-parent'>
            <div className='post-feature__cta-grid-child'>
              <div className='post-feature__cta-like'>
                <i
                  className='fas fa-heart'
                  onClick={() => {
                    postUnlikeHandler(post, post._id);
                  }}
                />
                {post.likes.length > 0 && (
                  <div className='post-feature__like-count'>{post.likes.length}</div>
                )}
              </div>
              <div className='post-feature__cta-follow'>
                <i className='fas fa-users' />{' '}
                {post.follows.length > 0 && (
                  <div className='post-feature__follow-count'>{post.follows.length}</div>
                )}
              </div>
            </div>
          </div>
        </aside>
      ) : (
        <aside className='post-feature__cta'>
          <div className='post-feature__cta-grid-parent'>
            <div className='post-feature__cta-grid-child'>
              <div className='post-feature__cta-like'>
                <i
                  className='fas fa-heart'
                  onClick={() => {
                    postLikeHandler(post, post._id);
                  }}
                />
                {post.likes.length > 0 && (
                  <div className='post-feature__cta-like-count'>{post.likes.length}</div>
                )}
              </div>
              <div className='post-feature__cta-follow'>
                <i className='fas fa-users' />{' '}
                {post.follows.length > 0 && (
                  <div className='post-feature__cta-follow-count'>{post.follows.length}</div>
                )}
              </div>
            </div>
          </div>
        </aside>
      );
    }
  };

  const postFollowHandler = (post, id) => {
    if (errorFollows) setMessage(errorFollows);
    dispatch(followPost(post, id));
  };

  const postUnfollowHandler = (post, id) => {
    if (errorFollows) setMessage(errorFollows);
    dispatch(unfollowPost(post, id));
  };

  const renderFollowButton = () => {
    if (!loadingFollows && post.user && post.user._id !== userInfo.id) {
      return post.follows.map((follow) => follow.user).includes(userInfo.id) ? (
        <button
          className='post-hero__follow-btn'
          onClick={() => postUnfollowHandler(post, post._id)}
        >
          Unfollow
        </button>
      ) : (
        <button className='post-hero__follow-btn' onClick={() => postFollowHandler(post, post._id)}>
          Follow
        </button>
      );
    }
  };

  const deleteHandler = (id) => {
    if (errorDelete) setMessage(errorDelete);
    dispatch(deletePost(id));
  };

  const deleteCommentHandler = (postId, commentId) => {
    if (errorCommentDelete) setMessage(errorCommentDelete);
    dispatch(deletePostComment(postId, commentId));
  };

  const deleteReviewHandler = (postId, reviewId) => {
    if (errorReviewDelete) setMessage(errorReviewDelete);
    dispatch(deletePostReview(postId, reviewId));
  };

  // Random Photo Generator
  const unsplashURL = 'https://source.unsplash.com/collection/289662/';
  const getRandomNumber = () => {
    const num = Math.floor(Math.random() * 10) + 900;
    return num;
  };
  const getRandomSize = () => {
    return `${getRandomNumber()}x${getRandomNumber()}`;
  };

  // Random Photo Generator
  const unsplashImage = `${unsplashURL}${getRandomSize()}`;
  const randomDefaultImage = {
    backgroundImage: `url(${post.image ? post.image : unsplashImage})`,
  };

  const handleReviewSlider = () => {
    const nav = document.querySelector('#review__slider');
    const hamburger = document.querySelector('#hamburger');

    if (nav.classList.contains('review__slider--active')) {
      nav.classList.remove('review__slider--active');
      hamburger.classList.remove('hamburger--active');
    } else {
      nav.classList.add('review__slider--active');
      hamburger.classList.add('hamburger--active');
    }
  };

  return (
    <>
      <Meta title={`journii | ${post.title}`} />
      {loadingDetails && <Spinner />}
      {loadingFollows && <Spinner />}
      {loadingLikes && <Spinner />}
      {loadingCommentCreate && <Spinner />}
      {loadingCommentDelete && <Spinner />}
      {loadingReviewCreate && <Spinner />}
      {loadingReviewDelete && <Spinner />}
      {message && <AlertMessage variant='danger'>{message}</AlertMessage>}
      {errorDetails && <AlertMessage variant='danger'>{errorDetails}</AlertMessage>}

      <nav className='review__slider' id='review__slider'>
        <div
          className='hamburger hamburger--active'
          id='hamburger'
          onClick={handleReviewSlider}
        ></div>
        <div className='review__slider-header'>
          <h6>Reviews ({post.reviews && post.reviews.length})</h6>
        </div>

        <CreateReview postId={post._id} />

        <section className='reviews'>
          <div className='reviews__grid'>
            {post.reviews.map((review) => (
              <ReviewItem
                key={review._id}
                review={review}
                postId={post._id}
                deleteReviewHandler={deleteReviewHandler}
                userInfo={userInfo}
              />
            ))}
          </div>
        </section>
      </nav>

      <section className='post-hero container'>
        <div className='container'>
          <div className='post-hero__image' style={randomDefaultImage}></div>
          <div className='post-hero__header container--pall'>
            <h1>{post.title}</h1>
            <p>
              Publisher <Link to={`profiles/${post.user && post.user._id}`}>{post.name}</Link>
            </p>
            <Moment format='MM/DD/YYYY'>{post.createdAt}</Moment>
            <div className='post-hero__cta'>
              {renderFollowButton()}
              <button className='review-btn hide-for-mobile' onClick={handleReviewSlider}>
                Reviews
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className='post-feature container'>
        {renderCallAction()}
        <div className='post-feature__text'>{post.text}</div>
      </section>

      <CreateComment postId={post._id} />
      <section className='comments container'>
        <div className='comments__grid'>
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
      </section>
    </>
  );
};

export default PostShow;
