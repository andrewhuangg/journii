import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listPosts } from '../../actions/postAction';
import Spinner from '../layout/Spinner';
import AlertMessage from '../layout/AlertMessage';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = () => {
  const dispatch = useDispatch();
  const { loading, posts, error } = useSelector((state) => state.postList);

  useEffect(() => {
    dispatch(listPosts());
  }, [dispatch]);

  return (
    <>
      <h1>Posts</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <AlertMessage variant='danger'>{error}</AlertMessage>
      ) : (
        <>
          <p>Welcome to the community</p>
          <PostForm />
          <div>
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Posts;
