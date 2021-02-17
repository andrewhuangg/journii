import React, { useEffect, useState, useRef } from 'react';
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
import AlertMessage from '../layout/AlertMessage';
import CreateComment from './CreateComment';
import ReviewSlider from './ReviewSlider';
import PostHero from './PostHero';
import CommentList from './CommentList';
import Meta from '../layout/Meta';
import PostFeature from './PostFeature';

const PostShow = ({ match, history }) => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postDetails = useSelector((state) => state.postDetails);
  const {
    loading: loadingDetails,
    error: errorDetails,
    error: errorLikes,
    error: errorFollows,
    post,
  } = postDetails;

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
    loading: loadingReviewCreate,
    loading: loadingReviewDelete,
    error: errorReviewDelete,
    success: successReviewCreate,
    success: successReviewDelete,
  } = postReview;

  useEffect(() => {
    if (!post || post._id !== match.params.id) {
      dispatch(listPostDetails(match.params.id));
    }
    if (successDelete) {
      dispatch({ type: POST_DETAILS_RESET });
      history.push('/posts');
    }
  }, [dispatch, match, history, post, successDelete]);

  useEffect(() => {
    if (
      successCommentCreate ||
      successCommentDelete ||
      successReviewCreate ||
      successReviewDelete
    ) {
      setMessage(null);
      dispatch(listPostDetails(match.params.id));
    }
  }, [successCommentCreate, successCommentDelete, successReviewCreate, successReviewDelete]);

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

  const deleteReviewHandler = (postId, reviewId) => {
    if (errorReviewDelete) setMessage(errorReviewDelete);
    dispatch(deletePostReview(postId, reviewId));
  };

  const sliderRef = useRef(null);

  useEffect(() => {
    const nav = document.querySelector('#review__slider');
    const hamburger = document.querySelector('#hamburger');
    const handler = (event) => {
      if (
        !sliderRef.current.contains(event.target) &&
        nav.classList.contains('review__slider--active')
      ) {
        setIsOpen(false);
        nav.classList.remove('review__slider--active');
        hamburger.classList.remove('hamburger--active');
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  const handleReviewSlider = () => {
    const nav = document.querySelector('#review__slider');
    const hamburger = document.querySelector('#hamburger');
    if (!nav.classList.contains('review__slider--active')) {
      setIsOpen((isOpen) => !isOpen);
      nav.classList.add('review__slider--active');
      hamburger.classList.add('hamburger--active');
    }
  };

  return (
    <>
      <Meta title={`journii | ${post.title}`} />
      {message && <AlertMessage variant='danger'>{message}</AlertMessage>}
      {errorDetails && <AlertMessage variant='danger'>{errorDetails}</AlertMessage>}
      <ReviewSlider
        post={post}
        handleReviewSlider={handleReviewSlider}
        deleteReviewHandler={deleteReviewHandler}
        userInfo={userInfo}
        sliderRef={sliderRef}
        isOpen={isOpen}
      />
      <PostHero
        post={post}
        handleReviewSlider={handleReviewSlider}
        deleteHandler={deleteHandler}
        userInfo={userInfo}
        postFollowHandler={postFollowHandler}
        postUnfollowHandler={postUnfollowHandler}
        isOpen={isOpen}
      />
      <PostFeature
        post={post}
        postLikeHandler={postLikeHandler}
        postUnlikeHandler={postUnlikeHandler}
        userInfo={userInfo}
      />
      <CreateComment postId={post && post._id} />
      <CommentList post={post} userInfo={userInfo} deleteCommentHandler={deleteCommentHandler} />
    </>
  );
};

export default PostShow;
