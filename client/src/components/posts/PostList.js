import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listPosts } from '../../actions/postAction';
import Spinner from '../layout/Spinner';
import AlertMessage from '../layout/AlertMessage';
import PostItem from './PostItem';
import Paginate from '../layout/Paginate';
import Meta from '../layout/Meta';

const PostList = ({ match }) => {
  const dispatch = useDispatch();
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const postList = useSelector((state) => state.posts.postList);
  const { posts, pages, page, loading } = postList;

  useEffect(() => {
    dispatch(listPosts(keyword, pageNumber));
    // }, [dispatch, successDelete, keyword, pageNumber, userInfo]);
  }, [keyword, pageNumber]);

  return (
    <>
      {!loading && (
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
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
          </div>
        </section>
      )}
    </>
  );
};

export default PostList;
