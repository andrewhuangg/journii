import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUserPosts, listTopPosts } from '../../actions/postAction';
import { Link } from 'react-router-dom';
import Rating from '../layout/Rating';

const DashboardRight = ({ userInfo }) => {
  const dispatch = useDispatch();
  const dashboardPosts = useSelector((state) => state.posts.postList);
  const { topPosts, userPosts } = dashboardPosts;

  useEffect(() => {
    dispatch(listUserPosts(userInfo.id));
    dispatch(listTopPosts(10));
  }, [userInfo]);

  return (
    <aside className='dashboard__right'>
      <div className='dashboard__right-container'>
        <h6>Top Posts</h6>
        {topPosts.map((post) => (
          <div className='dashboard__post-container' key={post._id}>
            <Link to={`posts/${post._id}`}>
              <p>{post.title}</p>
              <Rating value={post.rating} />
            </Link>
          </div>
        ))}
      </div>
      <div className='dashboard__right-container'>
        <h6>My Posts</h6>
        {userPosts.map((post) => (
          <div className='dashboard__post-container' key={post._id}>
            <Link to={`posts/${post._id}`}>
              <p>{post.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default DashboardRight;
