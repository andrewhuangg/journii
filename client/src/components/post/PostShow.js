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

  return (
    <>
      <Link to='/posts'>Back to Posts</Link>
      {loadingDetails ||
        loadingFollows ||
        loadingLikes ||
        loadingCommentCreate ||
        (loadingCommentDelete && <Spinner />)}
      {message && <AlertMessage variant='danger'>{message}</AlertMessage>}
      {errorDetails && <AlertMessage variant='danger'>{errorDetails}</AlertMessage>}
      <div>
        <Meta title={`journii | ${post.title}`} />
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
        {post.user && userInfo.id !== post.user._id && (
          <>
            <div onClick={() => postFollowHandler(post, post._id)}>follow post</div>
            <div onClick={() => postUnfollowHandler(post, post._id)}>unfollow post</div>
          </>
        )}
        {post.user && userInfo.id === post.user._id && (
          <Button onClick={() => deleteHandler(post._id)}>
            <i className='fas fa-trash'></i>
          </Button>
        )}
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
        <CreateReview postId={post._id} />
        <div className='reviews'>
          {post.reviews.map((review) => (
            <div key={review._id}>
              <p>review: {review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostShow;
