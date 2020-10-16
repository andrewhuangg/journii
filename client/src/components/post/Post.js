import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import AlertMessage from '../layout/AlertMessage';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { listPostDetails } from '../../actions/postAction';

const Post = ({ match }) => {
  const dispatch = useDispatch();
  const postDetails = useSelector((state) => state.postDetails);
  const { loading, error, post } = postDetails;

  useEffect(() => {
    dispatch(listPostDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      <Link to='/posts'>Back to Posts</Link>
      {loading ? (
        <Spinner />
      ) : error ? (
        <AlertMessage variant='danger'>{error}</AlertMessage>
      ) : (
        <>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <div>
            {post.comments.map((comment) => (
              <CommentItem key={comment._id} comment={comment} postId={post._id} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Post;
