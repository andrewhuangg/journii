import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listPosts } from '../../actions/postAction';
import PostItem from './PostItem';
import Meta from '../layout/Meta';
import Spinner from '../layout/Spinner';
import AlertMessage from '../layout/AlertMessage';

const PostList = () => {
  const dispatch = useDispatch();

  const postList = useSelector((state) => state.posts.postList);
  const { posts, loading } = postList;

  useEffect(() => {
    dispatch(listPosts());
  }, [dispatch]);

  return (
    <>
      {!loading ? (
        <section className='post-list container'>
          <Meta title='journii | Posts' />
          <AlertMessage />
          <div className='post-list__header'>
            <h1 className='post-list__title'>Posts</h1>
            <div className='post-list__text'>Welcome to the community</div>
          </div>
          <section className='post-list__grid'>
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </section>
        </section>
      ) : (
        <>
          <Spinner />
          <AlertMessage />
        </>
      )}
    </>
  );
};

export default PostList;
