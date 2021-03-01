import React from 'react';
import { Link } from 'react-router-dom';

const DashboardLeft = ({ likedPosts, profilesFollowing, postsFollowing }) => {
  return (
    <aside className='dashboard__left'>
      <div className='dashboard__user-stats'>
        <h6>Liked Posts</h6>
        {likedPosts.map((post) => (
          <div className='dashboard__liked-container' key={post._id}>
            <Link to={`posts/${post._id}`}>
              <p>{post.title}</p>
              &nbsp;
              <i className='fas fa-heart'>
                &nbsp;
                {post.likes.length}
              </i>
            </Link>
          </div>
        ))}
      </div>
      <div className='dashboard__user-stats'>
        <h6>Followed Posts</h6>
        {postsFollowing.map((post) => (
          <div className='dashboard__post-following-container' key={post._id}>
            <Link to={`posts/${post._id}`}>{post.title}</Link>
          </div>
        ))}
      </div>
      <div className='dashboard__user-stats'>
        <h6>Followed Profiles</h6>
        {profilesFollowing &&
          profilesFollowing.map((follower) => (
            <div className='dashboard__follower-container' key={follower._id}>
              <Link to={`profile/${follower.user}`}>{follower.username}</Link>
            </div>
          ))}
      </div>
    </aside>
  );
};

export default DashboardLeft;
