import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listPosts } from '../../actions/postAction';
import PostItem from './PostItem';
import Meta from '../layout/Meta';
import Spinner from '../layout/Spinner';

const PostList = () => {
  const dispatch = useDispatch();

  const postList = useSelector((state) => state.posts.postList);
  const { posts, loading } = postList;

  useEffect(() => {
    dispatch(listPosts());
  }, []);

  return (
    <>
      {!loading ? (
        <section className='post-list container'>
          <Meta title='journii | Posts' />
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
        <Spinner />
      )}
    </>
  );
};

export default PostList;
