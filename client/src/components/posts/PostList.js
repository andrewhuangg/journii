import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listPosts, deletePost } from '../../actions/postAction';
import Spinner from '../layout/Spinner';
import AlertMessage from '../layout/AlertMessage';
import PostItem from './PostItem';

const PostList = () => {
  const dispatch = useDispatch();

  const { loading: loadingList, error: errorList, posts } = useSelector((state) => state.postList);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postDelete = useSelector((state) => state.postDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = postDelete;

  useEffect(() => {
    dispatch(listPosts());
  }, [dispatch, successDelete]);

  const deleteHandler = (id) => {
    dispatch(deletePost(id));
  };

  return (
    <>
      <h1>Posts</h1>
      <p>Welcome to the community</p>
      {loadingDelete && <Spinner />}
      {errorDelete && <AlertMessage>{errorDelete} </AlertMessage>}
      {loadingList && <Spinner />}
      {errorList && <AlertMessage variant='danger'>{errorList}</AlertMessage>}
      <>
        <div>
          {posts.map((post) => (
            <PostItem
              key={post._id}
              post={post}
              currentUserId={userInfo.id}
              deleteHandler={deleteHandler}
            />
          ))}
        </div>
      </>
      )
    </>
  );
};

export default PostList;
