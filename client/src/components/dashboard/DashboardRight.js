import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../layout/Rating';

const DashboardRight = ({ topPosts }) => {
  return (
    <aside className='dashboard__right'>
      <div className='dashboard__top-posts'>
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
    </aside>
  );
};

export default DashboardRight;
