import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listPosts, deletePost } from '../../actions/postAction';
import Spinner from '../layout/Spinner';
import AlertMessage from '../layout/AlertMessage';
import PostItem from './PostItem';
import Paginate from '../layout/Paginate';
import Meta from '../layout/Meta';

const PostList = ({ match }) => {
  const dispatch = useDispatch();
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const { loading: loadingList, error: errorList, posts, pages, page } = useSelector(
    (state) => state.postList
  );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postDelete = useSelector((state) => state.postDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = postDelete;

  useEffect(() => {
    dispatch(listPosts(keyword, pageNumber));
  }, [dispatch, successDelete, keyword, pageNumber, userInfo]);

  const deleteHandler = (id) => {
    dispatch(deletePost(id));
  };

  return (
    <>
      <Meta title='journii | Posts' />
      <h1>Posts</h1>
      <p>Welcome to the community</p>
      {loadingDelete && <Spinner />}
      {errorDelete && <AlertMessage>{errorDelete} </AlertMessage>}
      {loadingList && <Spinner />}
      {errorList && <AlertMessage variant='danger'>{errorList}</AlertMessage>}
      <>
        <section className='postsList'>
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </section>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
        </div>
      </>
    </>
  );
};

export default PostList;
