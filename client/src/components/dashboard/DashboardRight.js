import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUserPosts, listTopPosts } from '../../actions/postAction';
import { Link } from 'react-router-dom';
import Rating from '../layout/Rating';
import { MODAL_USER_POSTS, MODAL_TOP_POSTS } from '../../actions/types';

const DashboardRight = ({ userInfo, toggleModalState }) => {
  const dispatch = useDispatch();

  const dashboardPosts = useSelector((state) => state.posts.postList);
  const { topPosts, userPosts } = dashboardPosts;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(listUserPosts(userInfo.id)).then((data) => data && setLoading(false));
    dispatch(listTopPosts(10)).then((data) => data && setLoading(false));
  }, [dispatch, userInfo.id]);

  return (
    <aside className='dashboard__right'>
      <div className='dashboard__right-container'>
        <h6 onClick={() => toggleModalState(MODAL_USER_POSTS)}>My Posts</h6>
        {!loading &&
          userPosts.map((post) => (
            <div className='dashboard__post-container' key={post._id}>
              <Link to={`/posts/${post._id}`}>
                <p>{post.title}</p>
              </Link>
            </div>
          ))}
      </div>
      <div className='dashboard__right-container'>
        <h6 onClick={() => toggleModalState(MODAL_TOP_POSTS)}>Top 10 Posts</h6>
        {!loading &&
          topPosts.map((post) => (
            <div className='dashboard__post-container' key={post._id}>
              <Link to={`/posts/${post._id}`}>
                <p>{post.title}</p>
                <Rating value={post.rating} />
              </Link>
            </div>
          ))}
      </div>
    </aside>
  );
};

export default DashboardRight;
